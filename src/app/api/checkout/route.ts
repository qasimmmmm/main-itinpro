import { NextResponse } from "next/server";
import { computeOrder } from "@/lib/checkout";
import { company } from "@/lib/content";
import { RESTRICTED } from "@/lib/geo";
import { rateLimit } from "@/lib/ratelimit";
import { recordOrder } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CheckoutBody {
  payment_token?: string;
  idempotencyKey?: string;
  serviceSlug?: string;
  stateName?: string;
  addOnIds?: string[];
  customer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    country?: string;
  };
  billing?: {
    address1?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Reject cross-site browser requests. Same-origin fetches and non-browser callers
// (no Origin header) fall through to rate limiting rather than being blocked.
function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = new URL(origin).host;
    const allowed = new URL(company.url).host;
    return (
      host === allowed ||
      host.endsWith(".vercel.app") ||
      host.startsWith("localhost") ||
      host.startsWith("127.0.0.1")
    );
  } catch {
    return false;
  }
}

// Never echo raw gateway text to the browser — map NMI codes to safe messages.
// (response: 1 = approved, 2 = declined, 3 = error/invalid.)
function friendlyDecline(code: string | null): string {
  if (code === "2") return "Your card was declined. Please try another card or contact your bank.";
  return "We couldn't process that card. Please check the details or try a different card.";
}

export async function POST(req: Request) {
  // 1. Cross-site guard.
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ success: false, message: "Request blocked." }, { status: 403 });
  }

  // 2. Rate limit per IP — slows scripted card-testing against the public endpoint.
  const rl = rateLimit(`checkout:${clientIp(req)}`, 8, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, message: "Too many attempts. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const { payment_token, idempotencyKey, serviceSlug, stateName, addOnIds, customer, billing } = body;

  if (!payment_token) {
    return NextResponse.json(
      { success: false, message: "Missing payment information. Please re-enter your card." },
      { status: 400 }
    );
  }

  // SECURITY: never trust an amount from the browser — recompute it here.
  const order = computeOrder({
    serviceSlug: serviceSlug || "",
    stateName,
    addOnIds: Array.isArray(addOnIds) ? addOnIds : [],
  });

  // Fail closed on invalid inputs rather than charging a fallback/undercut amount.
  if (!order.serviceResolved) {
    return NextResponse.json({ success: false, message: "Unknown service selected." }, { status: 400 });
  }
  if (!order.total || order.total <= 0) {
    return NextResponse.json({ success: false, message: "Your cart is empty." }, { status: 400 });
  }
  if (order.hasStateFee && !order.stateApplied) {
    return NextResponse.json(
      { success: false, message: "Please select a valid formation state." },
      { status: 400 }
    );
  }

  // Basic server-side validation (the endpoint is publicly callable, not only via our UI).
  const email = customer?.email?.trim() || "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!billing?.address1?.trim() || !billing?.zip?.trim()) {
    return NextResponse.json(
      { success: false, message: "Please complete your billing address." },
      { status: 400 }
    );
  }

  // Sanctions enforcement — the homepage advertises this restriction; enforce it
  // where money actually changes hands. Check both the edge IP country and the
  // (user-selected) billing country.
  const ipCountry = (req.headers.get("x-vercel-ip-country") || "").toUpperCase();
  const billCountry = (billing?.country || "").toUpperCase();
  if (RESTRICTED.has(ipCountry) || RESTRICTED.has(billCountry)) {
    return NextResponse.json(
      {
        success: false,
        message:
          "We're unable to process payments for your country due to US sanctions. Please contact us before paying.",
      },
      { status: 403 }
    );
  }

  const securityKey = process.env.NMI_SECURITY_KEY;
  if (!securityKey) {
    // Helps during setup: clear message instead of a silent failure.
    console.error("[checkout] NMI_SECURITY_KEY is not set — see CHECKOUT-SETUP.md");
    return NextResponse.json(
      { success: false, message: "Payments aren't configured on the server yet." },
      { status: 500 }
    );
  }

  const gateway = (process.env.NMI_GATEWAY_URL || "https://secure.nmi.com").replace(/\/$/, "");

  // Idempotency: use the client-supplied per-attempt key as the orderid so a retry
  // of the SAME attempt (e.g. after an ambiguous network failure) collides at the
  // gateway instead of charging twice. Fall back to a timestamp if absent/invalid.
  const safeKey = idempotencyKey && /^[A-Za-z0-9_-]{8,64}$/.test(idempotencyKey) ? idempotencyKey : "";
  const orderId = `ITINPRO-${safeKey || Date.now()}`;

  const params = new URLSearchParams();
  params.set("security_key", securityKey);
  params.set("type", "sale");
  params.set("payment_token", payment_token);
  params.set("amount", order.total.toFixed(2));
  params.set("currency", "USD");
  params.set("orderid", orderId);
  // Gateway-side duplicate protection within a short window as a second layer.
  params.set("dup_seconds", "120");
  params.set("order_description", order.lines.map((l) => l.label).join(" + ").slice(0, 250));
  // Dynamic statement descriptor — what appears on the customer's card statement.
  params.set("descriptor", company.statementDescriptor);

  if (customer?.firstName) params.set("first_name", customer.firstName);
  if (customer?.lastName) params.set("last_name", customer.lastName);
  if (customer?.email) params.set("email", customer.email);
  if (customer?.phone) params.set("phone", customer.phone);
  if (customer?.country) params.set("merchant_defined_field_1", customer.country);

  // Billing — used for AVS (address/ZIP verification), strongest for US/CA cards.
  if (billing?.address1) params.set("address1", billing.address1);
  if (billing?.city) params.set("city", billing.city);
  if (billing?.state) params.set("state", billing.state);
  if (billing?.zip) params.set("zip", billing.zip);
  if (billing?.country) params.set("country", billing.country);

  try {
    const nmiRes = await fetch(`${gateway}/api/transact.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      // NMI can be slow; give it room but don't hang forever.
      signal: AbortSignal.timeout(25000),
    });

    const text = await nmiRes.text();
    const resp = new URLSearchParams(text);
    const code = resp.get("response"); // 1 = approved, 2 = declined, 3 = error
    const transactionId = resp.get("transactionid") || "";
    const authCode = resp.get("authcode") || "";

    if (code === "1") {
      // Persist the order server-side BEFORE returning, so fulfillment never
      // depends on the browser reaching the success page. Best-effort, non-throwing.
      await recordOrder({
        orderId,
        transactionId,
        authCode,
        amount: order.total,
        lines: order.lines,
        customer,
        billing,
        ipCountry,
      });

      return NextResponse.json({
        success: true,
        transactionId,
        authCode,
        amount: order.total,
      });
    }

    // Declined or gateway error — log full detail server-side, return a safe message.
    console.warn("[checkout] not approved", {
      code,
      responsetext: resp.get("responsetext"),
      orderId,
    });
    return NextResponse.json({ success: false, message: friendlyDecline(code) }, { status: 200 });
  } catch (err) {
    console.error("[checkout] NMI request failed", err);
    return NextResponse.json(
      { success: false, message: "We couldn't reach the payment processor. Please try again." },
      { status: 502 }
    );
  }
}

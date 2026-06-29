import { NextResponse } from "next/server";
import { computeOrder } from "@/lib/checkout";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CheckoutBody {
  payment_token?: string;
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

export async function POST(req: Request) {
  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const { payment_token, serviceSlug, stateName, addOnIds, customer, billing } = body;

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

  if (!order.total || order.total <= 0) {
    return NextResponse.json({ success: false, message: "Your cart is empty." }, { status: 400 });
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

  const params = new URLSearchParams();
  params.set("security_key", securityKey);
  params.set("type", "sale");
  params.set("payment_token", payment_token);
  params.set("amount", order.total.toFixed(2));
  params.set("currency", "USD");
  params.set("orderid", `ITINPRO-${Date.now()}`);
  params.set("order_description", order.lines.map((l) => l.label).join(" + ").slice(0, 250));

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
    const responseText = resp.get("responsetext") || "Your payment could not be processed.";
    const transactionId = resp.get("transactionid") || "";
    const authCode = resp.get("authcode") || "";

    if (code === "1") {
      return NextResponse.json({
        success: true,
        transactionId,
        authCode,
        amount: order.total,
      });
    }

    // Declined or gateway error — surface a friendly message.
    return NextResponse.json(
      { success: false, message: responseText, code: code || "3" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[checkout] NMI request failed", err);
    return NextResponse.json(
      { success: false, message: "We couldn't reach the payment processor. Please try again." },
      { status: 502 }
    );
  }
}

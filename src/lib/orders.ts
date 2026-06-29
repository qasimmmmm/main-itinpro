// ─────────────────────────────────────────────────────────────────────────────
// Order recording. A successful charge must leave a durable trail server-side so
// fulfillment never depends on the browser reaching the success page.
//
// This is best-effort and NEVER throws — a notification failure must not turn an
// already-successful charge into an error for the customer. It does three things,
// each independently optional via env:
//   1. Always writes a structured server log (visible in platform logs).
//   2. POSTs to ORDER_WEBHOOK_URL if set (Slack / Zapier / CRM intake).
//   3. Emails an internal notification + customer receipt via Resend if keyed.
// ─────────────────────────────────────────────────────────────────────────────

import { company } from "./content";
import type { OrderLine } from "./checkout";

export interface OrderRecord {
  orderId: string;
  transactionId: string;
  authCode: string;
  amount: number;
  lines: OrderLine[];
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
  ipCountry?: string;
}

function summarize(rec: OrderRecord): string {
  return rec.lines.map((l) => `${l.label} ($${l.amount})`).join(", ");
}

async function postWebhook(url: string, rec: OrderRecord): Promise<void> {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `New ${company.brand} order ${rec.orderId} — $${rec.amount} (txn ${rec.transactionId})`,
      order: rec,
    }),
    signal: AbortSignal.timeout(8000),
  });
}

async function sendEmail(to: string, from: string, subject: string, html: string, apiKey: string): Promise<void> {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
    signal: AbortSignal.timeout(8000),
  });
}

export async function recordOrder(rec: OrderRecord): Promise<void> {
  // 1. Structured log — the always-on fallback trail (never contains card data).
  try {
    console.info("[order]", JSON.stringify({
      orderId: rec.orderId,
      transactionId: rec.transactionId,
      authCode: rec.authCode,
      amount: rec.amount,
      summary: summarize(rec),
      customer: {
        name: [rec.customer?.firstName, rec.customer?.lastName].filter(Boolean).join(" "),
        email: rec.customer?.email,
        phone: rec.customer?.phone,
        country: rec.customer?.country,
      },
      billing: rec.billing,
      ipCountry: rec.ipCountry,
    }));
  } catch {
    /* logging must never break the response */
  }

  // 2. Webhook (best-effort).
  const webhook = process.env.ORDER_WEBHOOK_URL;
  if (webhook) {
    try {
      await postWebhook(webhook, rec);
    } catch (err) {
      console.error("[order] webhook delivery failed", err);
    }
  }

  // 3. Email notification + customer receipt via Resend (best-effort).
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_FROM_EMAIL;
  const notify = process.env.ORDER_NOTIFY_EMAIL;
  if (apiKey && from) {
    const itemsHtml = rec.lines.map((l) => `<li>${l.label} — $${l.amount}</li>`).join("");

    if (notify) {
      const internalHtml =
        `<h2>New order ${rec.orderId}</h2>` +
        `<p><strong>Amount:</strong> $${rec.amount} &middot; <strong>Txn:</strong> ${rec.transactionId}</p>` +
        `<ul>${itemsHtml}</ul>` +
        `<p><strong>Customer:</strong> ${[rec.customer?.firstName, rec.customer?.lastName].filter(Boolean).join(" ")} &lt;${rec.customer?.email || ""}&gt; (${rec.customer?.country || "?"})</p>` +
        `<p><strong>Phone:</strong> ${rec.customer?.phone || "—"}</p>`;
      void sendEmail(notify, from, `New order — ${rec.orderId} ($${rec.amount})`, internalHtml, apiKey).catch((err) =>
        console.error("[order] internal email failed", err)
      );
    }

    const email = rec.customer?.email;
    if (email) {
      const receiptHtml =
        `<h2>Thank you for your order</h2>` +
        `<p>We've received your payment and a specialist will reach out shortly to begin onboarding.</p>` +
        `<p><strong>Order reference:</strong> ${rec.orderId}<br/><strong>Amount paid:</strong> $${rec.amount}</p>` +
        `<ul>${itemsHtml}</ul>` +
        `<p>Questions? Reply to this email or message us on WhatsApp at ${company.whatsappDisplay}.</p>` +
        `<p>— ${company.brand}</p>`;
      void sendEmail(email, from, `Your ${company.brand} order confirmation`, receiptHtml, apiKey).catch((err) =>
        console.error("[order] receipt email failed", err)
      );
    }
  }
}

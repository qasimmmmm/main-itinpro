# CHECKOUT-SETUP.md — getting paid with NMI, step by step

This guide takes you from the code you have now to a **live, paid checkout** and a
complete, conversion-ready site. Follow it top to bottom.

---

## What was just added

- **`/checkout`** — a real checkout page: order summary, **state selector**, **add-on upsells**
  (priority processing, add ITIN / add LLC, bank-account assistance, extra agent year),
  contact + billing fields, and **NMI Collect.js** card fields (card data is entered in
  secure iframes, so it never touches your server → simplest PCI level, SAQ A).
- **`/api/checkout`** — the server endpoint that charges the card via NMI's Payment API.
  It **recomputes the price on the server**, so the amount can never be changed in the browser.
- **`/checkout/success`** — order confirmation + next steps, and it fires your Google Ads /
  GA purchase conversion.
- Every "Get started / Apply / Order" button now goes to `/checkout?service=…`.
- **Card logos + "Secure SSL checkout"** in the footer.

---

## Step 1 — Get your NMI keys (5 min)

Log into your NMI gateway dashboard and grab **two** keys:

1. **Tokenization (public) key** — used by Collect.js in the browser. Safe to expose.
   - In NMI: **Settings → Security Keys** (or **Options → Settings → Security Keys**).
   - Create / copy the **Public / Tokenization** key (sometimes labeled "Collect.js key").
2. **Security (private) key** — used only on the server to charge cards. **Keep secret.**
   - Same Security Keys screen — copy your **Private** API security key.

> If your account was set up by a reseller, the gateway URL may not be `secure.nmi.com`.
> If so, note it (e.g. `secure.yourgateway.com`) for the optional gateway env vars.

---

## Step 2 — Add the keys as environment variables

**Locally:** copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_NMI_TOKENIZATION_KEY=your_public_tokenization_key
NMI_SECURITY_KEY=your_private_security_key
```

**On Vercel:** Project → **Settings → Environment Variables**, add the same two
(set them for Production + Preview). Then redeploy.

- `NEXT_PUBLIC_NMI_TOKENIZATION_KEY` **must** keep the `NEXT_PUBLIC_` prefix (the browser needs it).
- `NMI_SECURITY_KEY` **must NOT** have that prefix (it stays server-only — never shipped to the browser).

Until both are set, `/checkout` shows a yellow "Setup needed" banner and the Pay button is
disabled — that's expected.

---

## Step 3 — Test in NMI test mode

Put your NMI account (or a test account) in **test mode**, then on `/checkout`:

- **Card:** `4111 1111 1111 1111`
- **Expiry:** any future date (e.g. `12 / 30`)
- **CVV:** `123`
- Fill the contact + billing fields, then **Pay**.

A successful test sends you to `/checkout/success` with a transaction reference.
To test a decline, use NMI's documented decline amounts/cards from their test-mode docs.

**Common gotchas**
- "Payments aren't configured on the server yet" → `NMI_SECURITY_KEY` isn't set on the server (re-check Vercel env + redeploy).
- Card fields don't appear → `NEXT_PUBLIC_NMI_TOKENIZATION_KEY` is missing/wrong, or your gateway URL differs (set `NEXT_PUBLIC_NMI_GATEWAY_URL`).
- Declined in test → expected for certain test amounts; try a round amount like the ITIN ($348).

---

## Step 4 — Go live

1. Switch your NMI account to **live mode** and swap in the **live** keys (repeat Step 2 with production keys).
2. In NMI, tighten fraud controls: **Settings → Processing Options** → enable **CVV** and **AVS**
   rejection rules (e.g. reject on CVV mismatch). The checkout already collects billing
   address + ZIP and passes them for AVS — strongest for US/CA cards.
3. Turn on NMI's **email receipt** to the customer: **Settings → Receipts** (so buyers get a
   payment receipt automatically).
4. Do one **real** low-value live transaction yourself, confirm it appears in NMI, then refund it.

---

## Step 5 — Recommended: 3-D Secure (for international cards)

International cards have higher fraud/chargeback risk. NMI supports **3DS via Collect.js
(Cardinal)**. To enable later:

- Turn on **3-D Secure** in your NMI account (they provision Cardinal for you).
- Add the 3DS config to the `CollectJS.configure({ … })` call in
  `src/app/checkout/page.tsx` (NMI gives you the exact `threeDSecure` block).
- This shifts most chargeback liability to the card issuer on authenticated transactions.

(You've integrated NMI 3DS before, so this will be familiar — it's intentionally left as a
clean add-on so the base checkout works first.)

---

## Step 6 — Recommended: capture the order so onboarding can start

Right now a successful charge confirms to the customer, but the order details only live in
NMI. Pick **one** of these so your team gets notified and can begin onboarding:

- **Email (simplest):** add [Resend](https://resend.com) and, in `/api/checkout` after a
  successful charge, send yourself + the customer a branded confirmation (you've used Resend
  before — `npm i resend`, set `RESEND_API_KEY`, send on `code === "1"`).
- **Slack/CRM webhook:** POST the order JSON to a Slack incoming webhook or your CRM.
- **Database:** write the order to Supabase/Postgres if you want a dashboard later.

---

## Step 7 — Finish "complete + professional" (market best practices)

Quick wins, roughly in priority order:

1. **Real reviews** — replace the placeholder testimonials and any star ratings with genuine
   Trustpilot/Google reviews (also required for Google Ads). Edit `src/lib/content.ts`.
2. **Analytics & pixels** — you already have Google Ads. Add **GA4** and, if you advertise on
   Meta, the **Meta Pixel** (fire `Purchase` on `/checkout/success`).
3. **Live chat** — add a WhatsApp/Crisp/Tawk widget (the floating WhatsApp button is already
   there; a chat widget converts hesitant buyers).
4. **Trust near the button** — the checkout already shows the guarantee, SSL line and card
   marks; keep them.
5. **Abandoned checkout follow-up** — if you capture email (Step 6) before payment, you can
   email people who don't finish.
6. **Speed & SEO** — already handled by Next.js SSR, sitemap, robots, and metadata. After you
   add real content, submit your sitemap in Google Search Console.
7. **Legal** — Terms, Privacy, Refund and Disclaimer pages are done and linked in the footer
   (important for Google Ads "Government documents and services" approval).

---

## How the money flow works (for reference)

```
Customer on /checkout
  → enters card in Collect.js iframes (NMI-hosted; your server never sees the PAN)
  → Collect.js returns a one-time payment TOKEN
  → browser POSTs { token, service, state, add-ons, billing } to /api/checkout
  → server RECOMPUTES the amount from src/lib/checkout.ts (tamper-proof)
  → server calls NMI Payment API with your SECURITY key + token + amount
  → NMI approves → success → /checkout/success → Google Ads conversion fires
```

Pricing/upsells are all defined in `src/lib/content.ts` (`pricing`, `addOns`) and
`src/lib/states.ts` (state fees). Change them there and both the UI and the server stay in sync.

# ITIN-Pro

Conversion-focused marketing site for **ITIN-Pro** — US ITIN, LLC and EIN services for non-residents. Built with **Next.js 14 (App Router)**, TypeScript and Tailwind CSS. Designed to deploy to **Vercel** with zero configuration, including IP-based country personalization in the hero.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build locally
```

Requires Node.js 18.17+ (Next.js 14).

---

## Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. In Vercel, click **Add New → Project** and import the repo.
3. Framework preset is auto-detected as **Next.js** — leave the defaults.
4. Add the environment variable below (optional but recommended), then **Deploy**.

That's it. Country personalization works automatically on Vercel because Vercel injects the `x-vercel-ip-country` header at the edge, which `src/middleware.ts` reads.

### Environment variables

| Variable | Purpose | Example |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads / gtag conversion ID. Falls back to the value in `src/lib/content.ts` if unset. | `AW-17487871342` |
| `NEXT_PUBLIC_NMI_TOKENIZATION_KEY` | **Public** NMI Collect.js key (browser). Enables card fields on `/checkout`. | `...` |
| `NMI_SECURITY_KEY` | **Private** NMI security key (server only — never prefix with `NEXT_PUBLIC_`). Charges cards. | `...` |

**Payments:** the checkout uses NMI (Collect.js + Payment API). Full setup, testing and
go-live steps are in **`CHECKOUT-SETUP.md`**. Until the two NMI keys are set, `/checkout`
shows a "setup needed" banner and the rest of the site works normally.

A `.env.example` is included. Copy it to `.env.local` for local development.

### Custom domain

Add `itin-pro.com` in Vercel → Project → **Settings → Domains** and point your DNS as instructed. The site's canonical URLs, sitemap and Open Graph tags already use `https://itin-pro.com` (set in `src/lib/content.ts` → `company.url`).

---

## How country personalization works

```
Visitor → Vercel edge (adds x-vercel-ip-country)
        → src/middleware.ts (forwards it as x-user-country + cookie)
        → src/app/page.tsx (reads header, resolveGeo())
        → src/components/Hero.tsx (headline: "Start your US business from {Country}")
```

- Unknown / local visitors gracefully fall back to neutral copy ("from anywhere").
- Sanctioned/restricted countries (defined in `src/lib/geo.ts`) see an eligibility notice instead of a checkout push.
- Locally there is no geo header, so you'll always see the neutral version — that's expected. To test a specific country locally, send the header manually, e.g.
  `curl -H "x-vercel-ip-country: PK" http://localhost:3000/`.

---

## Editing content

Almost everything is driven from a few files — no need to touch components for copy or pricing changes:

| File | Controls |
|---|---|
| `src/lib/content.ts` | Company details, contact info, **pricing**, services, FAQs, testimonials, trust numbers, Google Ads ID. |
| `src/lib/states.ts` | Per-state filing fees and turnaround times (powers the pricing calculator and the all-in state table). |
| `src/lib/geo.ts` | Restricted-country list and friendly country-name overrides. |

### ⚠️ Before you go live

The trust/review figures in `src/lib/content.ts` (`trust` object: rating, review count, number of founders, etc.) are **placeholders**. Replace them with your **real, verifiable Trustpilot numbers** before running Google Ads — Google's "Government documents and services" policy is strict about unverifiable claims, and inflated review stats can get a campaign disapproved.

Also review the testimonials in the same file — swap them for genuine, attributable client reviews.

---

## Project structure

```
src/
  app/
    layout.tsx            # fonts, SEO metadata, JSON-LD, Google Ads tag, header/footer shell
    page.tsx              # homepage (server component, reads geo)
    pricing/              # pricing page + full state-fee table
    services/
      itin/  llc/  ein/  llc-ein-itin/
    about/  contact/  faq/  apply/
    privacy-policy/  terms/  refund-policy/  disclaimer/   # legal (Ads compliance)
    sitemap.ts  robots.ts  not-found.tsx
    icon.svg  apple-icon.png   # favicons (Next serves automatically)
  components/             # Hero, Services, Pricing, Comparison, FAQ, DocumentCard, etc.
  lib/                    # content.ts, states.ts, geo.ts
  middleware.ts           # forwards Vercel geo header
public/                   # logo, OG image, PNG icons
```

## Google Ads / compliance notes

- The mandatory IRS non-affiliation disclaimer appears in the footer **and** on a dedicated `/disclaimer` page, with full original Terms, Privacy and Refund pages — all linked in the footer.
- Pricing is shown transparently (service fee + state fee = all-in total) on the pricing page.
- The guarantee is framed honestly as a money-back refund (110% of the service fee if the ITIN is rejected), not as guaranteed government approval.
- `eslint.ignoreDuringBuilds` is enabled so a lint warning never blocks a Vercel deploy.

## Tech

Next.js 14.2 · React 18 · TypeScript · Tailwind CSS 3.4 · `next/font` (Hanken Grotesk, Inter, IBM Plex Mono). No database — the apply form opens a pre-filled WhatsApp chat and an email fallback, and fires a Google Ads conversion event on submit.

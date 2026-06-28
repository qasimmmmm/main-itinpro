// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all site copy, pricing and company details.
// Edit values here and they update across the whole site.
// ─────────────────────────────────────────────────────────────────────────────

export const company = {
  brand: "ITIN-Pro",
  legalEntity: "Tax Filing Corp",
  addressLine1: "97 Newkirk St, Suite 308",
  addressLine2: "Jersey City, NJ 07306",
  country: "United States",
  email: "support@itin-pro.com",
  whatsappDisplay: "+1 (551) 380-0279",
  whatsappE164: "15513800279", // used to build wa.me links — digits only
  domain: "itin-pro.com",
  url: "https://itin-pro.com",
};

// Analytics — set in .env as NEXT_PUBLIC_GOOGLE_ADS_ID, falls back to this.
export const googleAdsId = "AW-17487871342";

// ── Trust signals ────────────────────────────────────────────────────────────
// IMPORTANT: replace these with your REAL Trustpilot numbers before going live.
export const trust = {
  rating: "4.9",
  reviewCount: "120+",
  reviewPlatform: "Trustpilot",
  reviewUrl: "https://www.trustpilot.com/review/itin-pro.com",
  founders: "7,000+",
  countries: "150+",
  languages: "8",
  since: "2017",
};

// ── Pricing (matches the market-standard pricing model) ──────────────────────
export const pricing = {
  itin: {
    price: 348,
    label: "ITIN Application",
  },
  llc: {
    price: 298,
    label: "LLC + EIN + Business Address",
    note: "plus state filing fee",
    renewal: 298,
  },
  bundle: {
    price: 646,
    label: "LLC + EIN + ITIN",
    note: "everything you need to operate, plus state filing fee",
  },
  registeredAgentRenewal: 298,
};

export type ServiceKey = "itin" | "llc" | "bundle";

export const services = [
  {
    key: "itin" as ServiceKey,
    slug: "itin",
    name: "ITIN Application",
    tagline: "Your US Tax ID — no SSN required",
    price: pricing.itin.price,
    priceNote: "one-time",
    summary:
      "We prepare your Form W-7, certify your passport as IRS Certifying Acceptance Agents, and submit your application — so you can pass identity checks on Stripe, PayPal, Amazon and US banks.",
    includes: [
      "Form W-7 prepared and reviewed by a Certifying Acceptance Agent",
      "Passport certification — nothing original mailed to the US",
      "Direct submission to the IRS on your behalf",
      "Status updates from filing to issuance",
      "Help using your ITIN on Stripe, PayPal, Amazon and banks",
    ],
    bestFor: "Anyone who needs a US Tax ID but cannot get a Social Security Number.",
  },
  {
    key: "llc" as ServiceKey,
    slug: "llc",
    name: "US LLC + EIN + Business Address",
    tagline: "A real US company, formed remotely",
    price: pricing.llc.price,
    priceNote: "plus state fee · renews $298/yr",
    summary:
      "Form your LLC in any of the 50 states, get your EIN from the IRS, and receive a US business address with unlimited mail scans — all without leaving your country.",
    includes: [
      "LLC or C-Corp formation in any US state",
      "Articles of Organization / Certificate of Formation",
      "EIN (Employer Identification Number) from the IRS",
      "US business address with unlimited mail scans for a year",
      "Registered agent service included for the first year",
    ],
    bestFor: "Founders and sellers who need a US entity to open banking and accept payments.",
  },
  {
    key: "bundle" as ServiceKey,
    slug: "llc-ein-itin",
    name: "LLC + EIN + ITIN — Complete",
    tagline: "Everything you need to launch and get paid",
    price: pricing.bundle.price,
    priceNote: "plus state fee",
    summary:
      "The full package: a US company, your federal tax IDs (EIN + ITIN), and a business address. The fastest route from your country to a US business that can bank and accept payments.",
    includes: [
      "Everything in the LLC + EIN + Business Address package",
      "ITIN application prepared and certified by a CAA",
      "Coordinated filing so your documents arrive in the right order",
      "Priority support across the whole process",
      "Guidance on banking and payment-platform applications",
    ],
    bestFor: "New founders who want one provider to handle the entire US setup end to end.",
  },
];

// ── Why an ITIN matters ──────────────────────────────────────────────────────
export const reasons = [
  {
    title: "Get paid on Stripe, PayPal & Amazon",
    body:
      "These platforms ask for an SSN or ITIN to verify your identity and release payouts. An ITIN lets you complete that step and start getting paid. We can even file the applications for you.",
  },
  {
    title: "File your US federal taxes",
    body:
      "Non-residents can't file a 1040-NR federal return without an ITIN. If you earn US-sourced income, the ITIN is what makes you compliant with the IRS.",
  },
  {
    title: "Open a real US bank account",
    body:
      "Most US business and corporate bank accounts require a federal Tax ID. With an ITIN (and an EIN for your company) you can open accounts and hold USD properly.",
  },
];

// ── How it works ─────────────────────────────────────────────────────────────
export const steps = [
  {
    n: 1,
    title: "Tell us what you need",
    body: "Choose ITIN, an LLC, or the complete package, and fill out a short form in your client portal.",
  },
  {
    n: 2,
    title: "We prepare your documents",
    body: "Our Certifying Acceptance Agents draft your W-7, formation papers and EIN filing, then send them to you to review.",
  },
  {
    n: 3,
    title: "You sign — online",
    body: "Sign electronically. Your passport is certified by our CAAs, so you never mail original documents to the US.",
  },
  {
    n: 4,
    title: "We file with the IRS & state",
    body: "We submit everything on your behalf and track it through to issuance, keeping you updated at each stage.",
  },
  {
    n: 5,
    title: "You start getting paid",
    body: "Use your EIN, ITIN and US address to open banking and accept payments on Stripe, PayPal, Amazon and more.",
  },
];

// ── Comparison: us vs. doing it yourself vs. a generic agent ─────────────────
export const comparison = {
  columns: ["ITIN-Pro", "Do it yourself", "Generic agent"],
  rows: [
    { label: "IRS Certifying Acceptance Agent", values: [true, false, "Sometimes"] },
    { label: "Passport certified — no originals mailed", values: [true, false, false] },
    { label: "100% online from your country", values: [true, "Partly", "Partly"] },
    { label: "LLC, EIN and ITIN under one roof", values: [true, false, "Rarely"] },
    { label: "Transparent, all-in state pricing", values: [true, "—", false] },
    { label: "Status tracking to issuance", values: [true, false, "Sometimes"] },
    { label: "Money-back guarantee on the ITIN", values: [true, false, false] },
  ],
};

// ── Testimonials (replace with your own verified reviews before launch) ──────
export const testimonials = [
  {
    quote:
      "I run an Amazon store from Lahore. They handled my LLC, EIN and ITIN together and walked me through the Payoneer and Stripe setup. Everything just worked.",
    name: "Bilal R.",
    role: "Amazon seller · Pakistan",
  },
  {
    quote:
      "I'd been stuck for months because PayPal kept asking for a tax ID. ITIN-Pro got my ITIN issued and I was finally able to withdraw. Clear communication the whole way.",
    name: "Marie L.",
    role: "Freelancer · France",
  },
  {
    quote:
      "As a non-resident I had no idea where to start. They explained each step, certified my passport so I didn't have to post anything, and kept me updated until it arrived.",
    name: "Daniel S.",
    role: "Founder · Brazil",
  },
  {
    quote:
      "Fast, professional and honest about timelines. The all-in price for my state was shown upfront — no surprises at checkout. Highly recommend.",
    name: "Omar K.",
    role: "E-commerce · UAE",
  },
];

// ── FAQ (our own answers, covering the topics buyers actually ask) ───────────
export const faqs = [
  {
    q: "Is my ITIN guaranteed? What is your refund policy?",
    a: "We stand behind our work with a money-back guarantee: if your ITIN application is rejected after we submit it, we refund 110% of the service fee you paid us. Our success rate is extremely high because our Certifying Acceptance Agents review every application before it's filed. Government fees (where applicable) are outside our control.",
  },
  {
    q: "Can I get an ITIN without a US company or EIN?",
    a: "Yes. An ITIN can be obtained for several reasons. If you don't have a US company, we can secure your ITIN by filing a US federal tax return for your US-sourced income. If your goal is to sell or get paid in the US, we usually recommend forming a US LLC as well — it makes banking and payment platforms much easier.",
  },
  {
    q: "Which should I choose — LLC or C-Corp? And which state?",
    a: "If you're an individual founder or seller just getting started, an LLC is usually the simplest and most cost-effective choice. A C-Corp makes more sense if you plan to raise investment or have multiple shareholders. For state, low-cost filing states are popular for non-residents — we'll recommend the right one for your situation during onboarding.",
  },
  {
    q: "How much does it cost to keep the company running each year?",
    a: "After the first year, the registered agent and US business address renew at $298/year. That keeps your company in good standing and your mail address active with unlimited scans. State franchise/annual fees (where a state charges them) are separate and depend on the state you choose.",
  },
  {
    q: "Do you open my Stripe, PayPal or US bank account?",
    a: "We can prepare and submit the applications to your chosen bank or payment platform for free as part of the process. Approval is always the platform's own decision — no provider can guarantee it — but having an EIN, ITIN and proper US setup gives you the best possible chance.",
  },
  {
    q: "How long does the whole process take?",
    a: "Company formation typically takes 2–7 business days depending on the state, then the EIN follows (currently around 15–30 business days due to IRS processing times). For the ITIN, after you sign your W-7 we file with the IRS and issuance usually takes about 6–8 weeks, though the IRS can take longer in peak periods.",
  },
  {
    q: "What languages do you support?",
    a: "Our team can assist you in English, Spanish, Portuguese, Arabic, Chinese, Russian, Turkish and Italian, so you can complete everything comfortably in your own language.",
  },
  {
    q: "Are there countries you can't serve?",
    a: "Due to US government sanctions and restrictions, we're unable to form companies or file ITIN applications for residents of certain countries, including Iran, North Korea, Sudan, South Sudan, Syria, and a small number of others. If you're unsure, message us and we'll confirm before you pay.",
  },
];

// ── Partner / referral logos (only list ones you genuinely work with) ────────
export const partnersNote =
  "Trusted by founders who also use Stripe, Payoneer, Mercury, Wise and Amazon.";

// ── Upsell add-ons (order bumps shown on checkout) ───────────────────────────
export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  appliesTo: ServiceKey[]; // which base services this add-on is offered for
}

export const addOns: AddOn[] = [
  {
    id: "expedited",
    name: "Priority processing",
    description:
      "Skip the queue. We prepare and file your documents ahead of standard orders, with priority support.",
    price: 99,
    badge: "Most added",
    appliesTo: ["itin", "llc", "bundle"],
  },
  {
    id: "add-itin",
    name: "Add ITIN application",
    description:
      "Get your personal US Tax ID alongside your company — prepared and certified by a CAA.",
    price: pricing.itin.price,
    appliesTo: ["llc"],
  },
  {
    id: "add-llc",
    name: "Add US LLC + EIN + Business Address",
    description:
      "Form a real US company so banking and payment platforms are far easier to approve.",
    price: pricing.llc.price,
    appliesTo: ["itin"],
  },
  {
    id: "bank",
    name: "US bank account setup assistance",
    description:
      "We prepare and submit your Mercury, Wise or US bank applications so you can hold USD.",
    price: 99,
    appliesTo: ["itin", "llc", "bundle"],
  },
  {
    id: "agent-year",
    name: "Extra year of registered agent + address",
    description:
      "Add a second year of registered agent service and US business address up front and lock today's rate.",
    price: pricing.registeredAgentRenewal,
    appliesTo: ["llc", "bundle"],
  },
];

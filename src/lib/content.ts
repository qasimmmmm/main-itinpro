// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all site copy, pricing and company details.
// Edit values here and they update across the whole site.
// ─────────────────────────────────────────────────────────────────────────────

// Canonical site origin. Driven by env so preview/staging deployments and any
// future domain rename self-canonicalize instead of pointing at the production
// host. Falls back to production. No trailing slash.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://itin-pro.com").replace(/\/$/, "");

export const company = {
  brand: "ITIN-Pro",
  // Shows on customers' card statements (NMI dynamic descriptor). Keep <= 25 chars.
  statementDescriptor: "ITIN Pro",
  legalEntity: "Tax Filing Corp",
  addressLine1: "97 Newkirk St, Suite 308",
  addressLine2: "Jersey City, NJ 07306",
  country: "United States",
  email: "support@itin-pro.com",
  whatsappDisplay: "+1 (551) 380-0279",
  whatsappE164: "15513800279", // used to build wa.me links — digits only
  domain: SITE_URL.replace(/^https?:\/\//, ""),
  url: SITE_URL,
};

// Analytics — set in .env as NEXT_PUBLIC_GOOGLE_ADS_ID, falls back to this.
export const googleAdsId = "AW-17487871342";


// ── Pricing (matches the market-standard pricing model) ──────────────────────
// Single annual-renewal constant so the agent + address renewal price has exactly
// one definition across the Hero, calculator and pricing/service pages.
const ANNUAL_RENEWAL = 298;

export const pricing = {
  itin: {
    price: 348,
  },
  llc: {
    price: 298,
    renewal: ANNUAL_RENEWAL,
  },
  bundle: {
    price: 646,
  },
  registeredAgentRenewal: ANNUAL_RENEWAL,
};

export type ServiceKey = "itin" | "llc" | "bundle";

export const services = [
  {
    key: "itin" as ServiceKey,
    slug: "itin",
    name: "ITIN Application",
    tagline: "Your personal US Tax ID — no SSN needed",
    price: pricing.itin.price,
    priceNote: "one-time",
    summary:
      "We prepare your Form W-7, verify your passport over a video call as IRS Certifying Acceptance Agents, and file it for you — so platforms like Stripe, PayPal and Amazon can verify you and release your money.",
    includes: [
      "Form W-7 prepared and reviewed by a Certifying Acceptance Agent",
      "Passport verified by video — your original never leaves your hands",
      "Filed directly with the IRS on your behalf",
      "Claim your tax-treaty rate so platforms don't hold back up to 30%",
      "Status updates from filing all the way to issuance",
    ],
    bestFor: "Anyone who personally needs a US Tax ID but can't get a Social Security Number.",
  },
  {
    key: "llc" as ServiceKey,
    slug: "llc",
    name: "US LLC + EIN + Business Address",
    tagline: "A real US company, formed 100% online",
    price: pricing.llc.price,
    priceNote: `+ state fee · renews $${pricing.llc.renewal}/yr`,
    summary:
      "Form your LLC in any of the 50 states, get your EIN from the IRS without an SSN, and receive a US business address with unlimited mail scans — all without leaving your country.",
    includes: [
      "LLC formation in any US state",
      "EIN from the IRS — no SSN or ITIN required",
      "US business address with unlimited mail scans for a year",
      "Registered agent service included for the first year",
      "Help applying for US business banking (Mercury, Wise, Relay)",
    ],
    bestFor: "Founders and sellers who need a US company to open banking and accept payments.",
  },
  {
    key: "bundle" as ServiceKey,
    slug: "llc-ein-itin",
    name: "LLC + EIN + ITIN — Complete",
    tagline: "Everything to launch, bank and get paid",
    price: pricing.bundle.price,
    priceNote: "+ state fee",
    summary:
      "The full setup: a US company, your federal tax IDs (EIN + ITIN), and a US business address — sequenced in the right order so you reach a US business that can bank and accept payments, faster.",
    includes: [
      "Everything in the LLC + EIN + Business Address package",
      "ITIN prepared and verified by a Certifying Acceptance Agent",
      "Coordinated filing so your EIN, ITIN and formation arrive in order",
      "Priority support across the whole process",
      "Guidance on banking and payment-platform applications",
    ],
    bestFor: "New founders who want one provider to handle the entire US setup, end to end.",
  },
];

// ── What a US setup unlocks (homepage "Why it matters") ──────────────────────
export const reasons = [
  {
    title: "Get paid on Stripe, PayPal & Amazon",
    body:
      "These platforms ask for a US tax ID before they verify you and release your money. With an EIN for your company — or an ITIN for you — you pass their checks and start getting paid.",
  },
  {
    title: "Open a real US bank account",
    body:
      "A US company with an EIN lets you apply for US business banking like Mercury, Wise and Relay, hold USD, and pay or get paid worldwide. We prepare and submit your application — approval is the bank's decision, and we tell you your realistic odds before you pay.",
  },
  {
    title: "Keep more of your money at tax time",
    body:
      "Without a US tax ID, US platforms can hold back up to 30% of your payouts. An ITIN lets you claim your tax-treaty rate on Form W-8BEN, so you keep more of what you earn.",
  },
];

// ── How it works ─────────────────────────────────────────────────────────────
export const steps = [
  {
    n: 1,
    title: "Tell us what you need",
    body: "Pick ITIN, an LLC, or the complete package and fill a short form — about 5 minutes. We confirm your exact, all-in price for your country and state first.",
  },
  {
    n: 2,
    title: "We prepare everything",
    body: "Our team drafts your LLC papers, EIN (Form SS-4) and W-7, and a Certifying Acceptance Agent reviews your ITIN application before anything is filed.",
  },
  {
    n: 3,
    title: "You verify online and sign",
    body: "A CAA verifies your passport over a quick video call — it never leaves your hands. You sign electronically. Nothing original is ever mailed to the US.",
  },
  {
    n: 4,
    title: "We file with the IRS and state",
    body: "We submit everything and track it. LLC: 1–3 business days. EIN: usually 1–4 weeks. ITIN: about 7 weeks (9–11 in the Jan–Apr peak season).",
  },
  {
    n: 5,
    title: "You bank and get paid",
    body: "Use your EIN, ITIN and US address to apply for banking and get verified on Stripe, PayPal, Amazon and more.",
  },
];

// ── Comparison: us vs. doing it yourself vs. a generic agent ─────────────────
export const comparison = {
  columns: ["ITIN-Pro", "Do it yourself", "Generic agent"],
  rows: [
    { label: "IRS Certifying Acceptance Agent", values: [true, false, "Sometimes"] },
    { label: "Passport verified by video — never mailed", values: [true, false, false] },
    { label: "EIN without an SSN or ITIN", values: [true, "Hard", "Sometimes"] },
    { label: "LLC, EIN, ITIN and banking help in one place", values: [true, false, "Rarely"] },
    { label: "All-in price with state fees shown upfront", values: [true, "—", false] },
    { label: "Honest about your bank-approval odds", values: [true, "—", false] },
    { label: "Status tracking to issuance", values: [true, false, "Sometimes"] },
    { label: "110% money-back guarantee on your ITIN", values: [true, false, false] },
  ],
};


// ── FAQ (our own answers, covering the topics buyers actually ask) ───────────
export const faqs = [
  {
    q: "ITIN, EIN or LLC — which one do I actually need?",
    a: "They get mixed up a lot. An LLC is your US company. An EIN is your company's tax number (you need it to bank and get paid — no SSN required). An ITIN is your personal tax number, for when a platform asks for your personal ID or you have to file a US return. Most non-residents start with an LLC + EIN and add an ITIN only if they personally need it. Tell us your situation and we'll point you to the right one — free.",
  },
  {
    q: "Can I really do this without being a US citizen or living in the US?",
    a: "Yes. Any non-resident can own 100% of a US LLC. There's no requirement to be a citizen, to have a visa, or to ever visit the US. The whole process is completed online from wherever you live.",
  },
  {
    q: "Do I need an SSN to get an EIN?",
    a: "No. This is the most common myth. We obtain your EIN directly from the IRS using Form SS-4 — no Social Security Number and no ITIN required. We handle the paperwork the IRS asks of foreign owners so you don't get stuck.",
  },
  {
    q: "Do I have to mail my original passport?",
    a: "Never. As IRS Certifying Acceptance Agents we're authorized to verify your passport over a quick video call. Your original document never leaves your hands and is never mailed to the IRS — a real risk people take doing this alone.",
  },
  {
    q: "How long does everything take?",
    a: "Your LLC is usually formed in 1–3 business days. Your EIN typically follows in about 1–4 weeks. For the ITIN, the IRS takes around 7 weeks, and 9–11 weeks during the January–April peak season. We track each step and tell you the moment it's ready.",
  },
  {
    q: "Will I be able to open a US bank account?",
    a: "A US LLC with an EIN lets you apply to banks like Mercury, Wise and Relay. We prepare and submit your application and keep it moving — but approval is always the bank's own decision, and some banks restrict certain countries. We'll tell you your realistic options before you pay, instead of promising something no one can guarantee.",
  },
  {
    q: "Do I owe US taxes?",
    a: "Most non-resident owners with no US staff and no US operations owe no US federal income tax. But a foreign-owned US LLC must still file IRS Form 5472 every year — skipping it carries a $25,000 penalty. We can handle that filing for you. (We're not your lawyer or accountant, and we'll refer you to one if your case is complex.)",
  },
  {
    q: "Is my company affected by the new BOI ownership report?",
    a: "As of 2025, FinCEN exempts US-formed companies — like a Wyoming or New Mexico LLC — from Beneficial Ownership (BOI) reporting. These rules can change, so we keep an eye on FinCEN and let you know if anything affects you.",
  },
  {
    q: "Which state should I form my company in?",
    a: "For most non-residents, low-cost states like Wyoming and New Mexico are the simplest and cheapest to run. The best choice depends on your situation — we'll recommend the right one and show the all-in cost for every state before you pay.",
  },
  {
    q: "What is your guarantee and refund policy?",
    a: "Every ITIN application is reviewed by a Certifying Acceptance Agent before it's filed, which is why our success rate is so high. If the IRS still rejects an application we prepared, we refund 110% of the service fee you paid us. Government fees are outside our control, and no honest provider can guarantee IRS approval — but we stand fully behind our work.",
  },
  {
    q: "How much does it cost to keep my company each year?",
    a: `After the first year, the registered agent and US business address renew at $${pricing.registeredAgentRenewal}/year, which keeps your company in good standing and your mail address active with unlimited scans. State annual fees (where a state charges them) are separate and always shown upfront.`,
  },
  {
    q: "What languages do you support?",
    a: "Our specialists can help you in English, Spanish, Portuguese, Arabic, Chinese, Russian, Turkish and Italian — before you pay and the whole way through.",
  },
  {
    q: "Are there countries you can't serve?",
    a: "Due to US government sanctions, we're unable to form companies or file ITIN applications for residents of certain countries, including Iran, North Korea, Sudan, South Sudan, Syria and a few others. If you're unsure, message us and we'll confirm before you pay.",
  },
];


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
      "Get your personal US Tax ID alongside your company — prepared and verified by a CAA.",
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
    name: "US bank account application help",
    description:
      "We prepare and submit your Mercury, Wise or US bank applications so you can hold USD. Approval is the bank's decision.",
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

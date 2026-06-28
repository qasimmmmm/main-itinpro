import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";
import { pricing } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get an EIN for Your US Company — Non-Residents Welcome",
  description:
    "Get your EIN (Employer Identification Number) from the IRS as a non-resident, with or without an SSN. Required to open US bank accounts and register on Stripe, PayPal and Amazon.",
  alternates: { canonical: "/services/ein" },
};

export default function EinPage() {
  return (
    <ServiceDetail
      eyebrow="EIN Registration"
      title="Get your company's EIN from the IRS"
      intro="An EIN is your US company's federal tax ID — and you don't need an SSN to get one. It's required to open a US bank account, register on payment platforms, and file business taxes. We obtain it directly from the IRS for you."
      price={pricing.llc.price}
      priceNote="included with LLC formation"
      cardKey="llc"
      applySlug="llc"
      includes={[
        "EIN obtained directly from the IRS, no SSN required",
        "Filed correctly the first time by experienced specialists",
        "Official IRS EIN confirmation document for your records",
        "Works with US banks, Stripe, PayPal, Amazon and Mercury",
        "Included free when you form your LLC with us",
        "Guidance on using your EIN to open banking and accept payments",
      ]}
      bestFor="Non-residents who already have (or are forming) a US company and need its federal tax ID."
      sections={[
        {
          heading: "What is an EIN?",
          body: "An Employer Identification Number (EIN) is a nine-digit number the IRS assigns to your business — essentially a Social Security Number for your company. Banks and payment platforms use it to identify your business and verify that it's a real, registered US entity.",
        },
        {
          heading: "Can I get an EIN without an SSN?",
          body: "Yes. Many non-residents assume they need a Social Security Number to get an EIN — you don't. There's a specific IRS process for foreign owners without an SSN, and our specialists handle it correctly so you don't get stuck in long IRS queues or rejected filings.",
        },
        {
          heading: "Do I need an EIN and an ITIN?",
          body: "They serve different purposes. An EIN identifies your company; an ITIN identifies you as an individual taxpayer. Depending on your goals you may need one or both. If you want to both run a US company and personally verify your identity on payment platforms, the complete LLC + EIN + ITIN bundle covers everything.",
        },
        {
          heading: "How is the EIN delivered?",
          body: "Once the IRS issues your EIN, we provide your official confirmation document. You can then use the number immediately to open a US bank account and complete payment-platform applications. Current IRS processing for non-resident EINs is typically around 15–30 business days.",
        },
      ]}
    />
  );
}

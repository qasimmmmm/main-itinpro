import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";
import { pricing } from "@/lib/content";

export const metadata: Metadata = {
  title: "ITIN Application for Non-Residents — $348",
  description:
    "Get your US Individual Taxpayer Identification Number (ITIN) without an SSN. Prepared and certified by IRS Certifying Acceptance Agents, 100% online — no need to mail your original passport.",
  alternates: { canonical: "/services/itin" },
};

export default function ItinPage() {
  return (
    <ServiceDetail
      eyebrow="ITIN Application"
      title="Get your US Tax ID (ITIN) — no SSN required"
      intro="An ITIN lets non-residents verify their identity with the IRS, get paid on Stripe, PayPal and Amazon, file US taxes, and open US bank accounts. We prepare, certify and submit everything for you."
      price={pricing.itin.price}
      priceNote="one-time"
      cardKey="itin"
      applySlug="itin"
      includes={[
        "Form W-7 prepared and reviewed by a Certifying Acceptance Agent",
        "Passport certification — you never mail original documents to the US",
        "Direct submission to the IRS on your behalf",
        "Status tracking from filing all the way to issuance",
        "Guidance on using your ITIN with Stripe, PayPal, Amazon and US banks",
        "Money-back guarantee: 110% of your fee if the ITIN is rejected",
      ]}
      bestFor="Anyone outside the US who needs a federal Tax ID but is not eligible for a Social Security Number."
      sections={[
        {
          heading: "What is an ITIN, and why might you need one?",
          body: "An Individual Taxpayer Identification Number (ITIN) is a tax-processing number the IRS issues to people who need a US Tax ID but aren't eligible for a Social Security Number. For non-residents, it's the key that unlocks the US financial system: payment platforms like Stripe, PayPal and Amazon ask for it to verify identity and release payouts, and you need one to file a US federal tax return if you have US-sourced income.",
        },
        {
          heading: "Why use a Certifying Acceptance Agent?",
          body: "The IRS authorizes Certifying Acceptance Agents (CAAs) to verify your identity documents and certify them on the agency's behalf. That means you don't have to mail your original passport to the US or visit a US consulate. Our CAAs review every W-7 before it's filed, which dramatically reduces the chance of rejection and speeds the whole process up.",
        },
        {
          heading: "How long does it take?",
          body: "After you sign your W-7, we file with the IRS and issuance typically takes around 6–8 weeks, though processing times can be longer during the IRS's peak season. We keep you updated at each stage so you always know where your application stands.",
        },
        {
          heading: "Can I get an ITIN without a US company?",
          body: "Yes. If you have US-sourced income, we can secure your ITIN by filing the appropriate US federal tax return. That said, if your goal is to sell or get paid in the US, forming a US LLC alongside your ITIN usually makes banking and payment-platform approval far smoother — which is why many of our clients choose the complete bundle.",
        },
      ]}
    />
  );
}

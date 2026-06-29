import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";
import { pricing } from "@/lib/content";

export const metadata: Metadata = {
  title: `Form a US LLC + EIN + Business Address — $${pricing.llc.price}`,
  description:
    "Form a US LLC in any state as a non-resident, get your EIN from the IRS, and receive a US business address with unlimited mail scans. 100% online, registered agent included for year one.",
  alternates: { canonical: "/services/llc" },
};

export default function LlcPage() {
  return (
    <ServiceDetail
      eyebrow="US LLC + EIN"
      title="Form a real US company — remotely, in any state"
      intro="Launch a US LLC without leaving your country. You get the formation paperwork, your EIN from the IRS, a US business address with unlimited mail scans, and registered agent service for the first year."
      price={pricing.llc.price}
      priceNote={`+ state fee · renews $${pricing.llc.renewal}/yr`}
      cardKey="llc"
      applySlug="llc"
      includes={[
        "LLC or C-Corp formation in any of the 50 US states",
        "Articles of Organization / Certificate of Formation filed with the state",
        "EIN (Employer Identification Number) obtained from the IRS",
        "US business address with unlimited mail scans for a year",
        "Registered agent service included for the first year",
        "Help preparing your bank and payment-platform applications",
      ]}
      bestFor="Founders and online sellers who need a US entity to open banking and accept payments worldwide."
      sections={[
        {
          heading: "Why form a US LLC as a non-resident?",
          body: "A US LLC gives you a credible, recognized business entity that the world's payment platforms and banks already trust. With a US company you can apply for Stripe, PayPal, Amazon, Mercury and more, hold and receive USD, and present a professional face to US customers — all without being a US citizen or resident.",
        },
        {
          heading: "What's an EIN, and why is it included?",
          body: "An EIN is your company's federal tax ID — think of it as a Social Security Number for your business. You need it to open a US bank account, register on payment platforms, and file business taxes. We obtain it directly from the IRS as part of your formation, so you're ready to operate from day one.",
        },
        {
          heading: "Which state should you choose?",
          body: "Low-cost filing states are popular with non-residents because they keep your formation and ongoing costs down. The right choice depends on where your customers are and how you plan to operate. We show the all-in cost for every state on our pricing page and recommend the best fit for your situation during onboarding.",
        },
        {
          heading: "What does it cost to keep the company running?",
          body: `After year one, the registered agent and US business address renew at $${pricing.registeredAgentRenewal}/year — that keeps your company in good standing and your mail address active. Some states also charge their own annual or franchise fee, which is separate and depends on the state you pick.`,
        },
      ]}
    />
  );
}

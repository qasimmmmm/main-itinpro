import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";
import { pricing } from "@/lib/content";

export const metadata: Metadata = {
  title: "LLC + EIN + ITIN Complete Package — $646",
  description:
    "The complete US setup for non-residents: a US LLC, your EIN and ITIN, and a US business address — handled end to end by Certifying Acceptance Agents so you can bank and accept payments worldwide.",
  alternates: { canonical: "/services/llc-ein-itin" },
};

export default function BundlePage() {
  return (
    <ServiceDetail
      eyebrow="Complete Package"
      title="LLC + EIN + ITIN — your entire US setup, handled"
      intro="The fastest route from your country to a fully operational US business. One provider coordinates your company formation, federal tax IDs and business address so every document arrives in the right order — and you can start getting paid."
      price={pricing.bundle.price}
      priceNote="+ state fee"
      cardKey="bundle"
      applySlug="llc-ein-itin"
      includes={[
        "Everything in the LLC + EIN + Business Address package",
        "ITIN application prepared and certified by a Certifying Acceptance Agent",
        "Coordinated filing so your EIN, ITIN and formation arrive in order",
        "US business address with unlimited mail scans for a year",
        "Priority support across the entire process",
        "Guidance on banking, Stripe, PayPal and Amazon applications",
        "Money-back guarantee: 110% of your fee if the ITIN is rejected",
      ]}
      bestFor="New founders who want one team to handle the complete US setup from start to finish."
      sections={[
        {
          heading: "Why choose the complete package?",
          body: "Doing this piecemeal — a company here, an EIN there, an ITIN somewhere else — creates delays and ordering problems, because each step often depends on the one before it. The bundle solves that: we sequence everything correctly, so your company is formed, your EIN is issued, and your ITIN is filed in the right order, with no wasted time.",
        },
        {
          heading: "What can you do once it's all set up?",
          body: "With a US LLC, an EIN for the company, an ITIN for you, and a US business address, you have everything platforms ask for. You can open US business banking, get approved on Stripe, PayPal, Amazon and Mercury, hold and receive USD, and operate as a legitimate US business from anywhere in the world.",
        },
        {
          heading: "Why bundle instead of buying separately?",
          body: `The complete package is the same total as ordering the ITIN ($${pricing.itin.price}) and the LLC + EIN + Address ($${pricing.llc.price}) on their own — $${pricing.bundle.price} plus your state's filing fee. What you gain is coordination: one team sequences your formation, EIN and ITIN in the right order, so steps that depend on each other never stall — and you reach a fully operational US business faster, with a single point of contact.`,
        },
        {
          heading: "What happens after year one?",
          body: `Your ITIN doesn't have an annual fee. To keep the company itself in good standing, the registered agent and US business address renew at $${pricing.registeredAgentRenewal}/year, plus any annual fee your chosen state charges. We'll remind you well ahead of any renewal so nothing lapses.`,
        },
      ]}
    />
  );
}

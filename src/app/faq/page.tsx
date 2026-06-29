import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ — ITIN, LLC, EIN Questions Answered",
  description:
    "Answers to the most common questions about getting an ITIN, forming a US LLC, obtaining an EIN, timelines, costs, refunds and country eligibility.",
  alternates: { canonical: "/faq" },
};

// FAQPage structured data — built from the same `faqs` source the page renders,
// so the markup can never drift from the visible answers.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        eyebrow="FAQ"
        title="Your questions, answered clearly"
        intro="The things non-residents most often ask us about ITINs, LLCs, EINs, timelines and costs. Still unsure? Message us and we'll help before you pay."
      />
      <FAQ />
      <CTA />
    </>
  );
}

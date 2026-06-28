import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "FAQ — ITIN, LLC, EIN Questions Answered",
  description:
    "Answers to the most common questions about getting an ITIN, forming a US LLC, obtaining an EIN, timelines, costs, refunds and country eligibility.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
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

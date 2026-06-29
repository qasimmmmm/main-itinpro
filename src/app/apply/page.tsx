import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ApplyForm from "@/components/ApplyForm";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Start Your Application — ITIN, US LLC & EIN",
  description:
    "Begin your ITIN, US LLC or EIN application. Share a few details and we'll confirm your exact, all-in price and continue on WhatsApp or email. No payment taken on this page.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get started"
        title="Start your application"
        intro="A few quick details and we'll take it from there. No payment is taken on this page — we'll confirm your exact price first."
        cta={false}
      />
      <section className="bg-white py-16 lg:py-20">
        <div className="container-x">
          <Suspense fallback={<div className="py-10 text-center text-slate">Loading…</div>}>
            <ApplyForm />
          </Suspense>
          <Reveal>
            <p className="mt-10 text-center text-[13px] text-slate">
              Looking for a specific service?{" "}
              {services.map((s, i) => (
                <span key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="font-semibold text-emerald-deep underline">
                    {s.name.split("—")[0].trim()}
                  </Link>
                  {i < services.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

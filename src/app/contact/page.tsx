import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact ITIN-Pro",
  description:
    "Get in touch with ITIN-Pro. Message us on WhatsApp or email and a specialist will help with your ITIN, LLC or EIN questions before you pay.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const wa = `https://wa.me/${company.whatsappE164}?text=${encodeURIComponent(
    "Hi ITIN-Pro, I have a question before getting started."
  )}`;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a specialist before you commit"
        intro="Have a question about your situation, your country, or which service you need? Reach out — we'll give you a straight answer, no obligation."
        cta={false}
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex h-full flex-col p-7 transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-tint">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#0F9D6E" aria-hidden="true">
                    <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.8.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7 7 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.2.2-.4 0-.1 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4 0-.6.3a2.6 2.6 0 00-.8 1.9c0 1.1.8 2.2 1 2.4.1.2 1.7 2.6 4 3.6.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z" />
                  </svg>
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-ink">WhatsApp</h3>
                <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-slate">
                  The fastest way to reach us. Message us and a specialist usually replies within
                  working hours.
                </p>
                <span className="mt-4 font-mono text-[14px] font-semibold text-emerald-deep">
                  {company.whatsappDisplay}
                </span>
              </a>
            </Reveal>

            <Reveal delay={80}>
              <a
                href={`mailto:${company.email}`}
                className="card flex h-full flex-col p-7 transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-tint">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#0F9D6E" strokeWidth="2" />
                    <path d="M4 7l8 5 8-5" stroke="#0F9D6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-ink">Email</h3>
                <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-slate">
                  Prefer to write it all out? Email us your situation and questions and we&apos;ll
                  reply with clear next steps.
                </p>
                <span className="mt-4 text-[14px] font-semibold text-emerald-deep">
                  {company.email}
                </span>
              </a>
            </Reveal>

            <Reveal delay={160}>
              <div className="card flex h-full flex-col p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-tint">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" stroke="#0F9D6E" strokeWidth="2" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.5" stroke="#0F9D6E" strokeWidth="2" />
                  </svg>
                </span>
                <h3 className="mt-5 text-[17px] font-bold text-ink">Office</h3>
                <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-slate">
                  {company.legalEntity}
                  <br />
                  {company.addressLine1}
                  <br />
                  {company.addressLine2}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-12 rounded-xl2 bg-ink p-8 text-center lg:p-10">
              <h3 className="text-[1.4rem] font-extrabold text-white">Ready to start instead?</h3>
              <p className="mx-auto mt-2 max-w-md text-[15px] text-white/60">
                Skip the back-and-forth — begin your application and we&apos;ll confirm your exact
                price first.
              </p>
              <Link href="/apply?service=llc-ein-itin" className="btn-primary mt-6 inline-flex">
                Start your application
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

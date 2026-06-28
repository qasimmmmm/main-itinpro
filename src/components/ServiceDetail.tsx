import Link from "next/link";
import PageHeader from "./PageHeader";
import Reveal from "./Reveal";
import Process from "./Process";
import Guarantee from "./Guarantee";
import CTA from "./CTA";
import DocumentCard from "./DocumentCard";
import type { ServiceKey } from "@/lib/content";

export interface ServiceSection {
  heading: string;
  body: string;
}

export default function ServiceDetail({
  eyebrow,
  title,
  intro,
  price,
  priceNote,
  cardKey,
  includes,
  bestFor,
  sections,
  applySlug,
  showGuarantee = true,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  price: number;
  priceNote: string;
  cardKey: ServiceKey;
  includes: string[];
  bestFor: string;
  sections: ServiceSection[];
  applySlug: string;
  showGuarantee?: boolean;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} cta={false} />

      {/* Overview: includes + live document card + price */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div>
              <span className="eyebrow">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald" />
                What&apos;s included
              </span>
              <h2 className="mt-3 text-[1.8rem] font-extrabold leading-tight text-ink">
                Done for you, end to end
              </h2>
              <ul className="mt-7 space-y-4">
                {includes.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-tint">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12l5 5 9-11" stroke="#0B7A55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[15px] leading-snug text-ink/85">{it}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl2 border border-mist bg-paper p-5">
                <div className="text-[13px] font-semibold uppercase tracking-wide text-slate">
                  Best for
                </div>
                <p className="mt-1.5 text-[15px] text-ink/85">{bestFor}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="lg:sticky lg:top-24">
              <DocumentCard service={cardKey} />
              <div className="mt-6 rounded-xl2 border border-mist bg-white p-6 shadow-card">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold text-ink">${price}</span>
                  <span className="font-mono text-[13px] text-slate">{priceNote}</span>
                </div>
                <Link href={`/apply?service=${applySlug}`} className="btn-primary mt-5 w-full">
                  Get started
                </Link>
                <Link href="/pricing" className="btn-ghost mt-2.5 w-full">
                  Compare all pricing
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEO prose sections */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl space-y-10">
            {sections.map((s) => (
              <Reveal key={s.heading}>
                <div>
                  <h2 className="text-[1.5rem] font-extrabold leading-tight text-ink">{s.heading}</h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-slate">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />
      {showGuarantee && <Guarantee />}
      <CTA />
    </>
  );
}

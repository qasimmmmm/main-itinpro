import Link from "next/link";
import DocumentCard from "./DocumentCard";
import { pricing } from "@/lib/content";
import { GeoPlace, GeoFlag, GeoRestrictedNote } from "./geo-client";

export default function Hero() {
  return (
    <section className="section-navy section">
      {/* atmosphere */}
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-100" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-navy-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-emerald/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-52 -left-32 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-x relative z-10">
        {/* Top: badge + headline + subhead */}
        <div className="mx-auto max-w-3xl animate-fade-up text-center">
          <div className="chip-navy mb-6">
            <span className="text-base leading-none"><GeoFlag /></span>
            <span className="text-emerald-tint">IRS Certifying Acceptance Agents</span>
          </div>

          <h1 className="font-display text-[2.4rem] font-extrabold leading-[1.06] sm:text-[3.1rem] lg:text-[3.5rem]">
            Start your US business
            <br />
            <span className="text-emerald"><GeoPlace />.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">
            Form your US LLC, get your EIN and ITIN, and apply for US banking — 100% online,
            no SSN and no US visit. Done for you by IRS Certifying Acceptance Agents, for
            founders who&apos;ve never done this before.
          </p>

          {/* Objection-killer chips — the four things non-residents worry about */}
          <ul className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
            {[
              "No US visit required",
              "No SSN needed",
              "100% online",
              "Works from 150+ countries",
            ].map((chip) => (
              <li key={chip} className="chip-feature">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M5 12l5 5 9-11" stroke="#0F9D6E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <GeoRestrictedNote />

        {/* Two offers, lower prices forward — LLC is the dominant path */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* LLC + EIN + Address — PRIMARY path */}
          <div className="surface-navy relative flex flex-col p-5 shadow-lift ring-1 ring-emerald/30 animate-fade-up [animation-delay:80ms]">
            <span className="absolute -top-3 left-5 inline-flex items-center gap-1.5 rounded-full bg-emerald px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-emerald-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
              Most popular
            </span>
            <h2 className="mt-1 text-[16px] font-bold text-white">LLC + EIN + Business Address</h2>
            <div className="mb-4 mt-1.5 flex items-baseline gap-2">
              <span className="font-display text-[2.1rem] font-extrabold leading-none text-white">
                ${pricing.llc.price}
              </span>
              <span className="font-mono text-[12px] text-white/70">
                + state fee · renews ${pricing.llc.renewal}/yr
              </span>
            </div>
            <DocumentCard service="llc" />
            <Link href="/checkout?service=llc" className="btn-primary mt-5 w-full">
              Form your US company →
            </Link>
            <p className="secure-note-dark mt-3 justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" stroke="#0F9D6E" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="#0F9D6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Secure checkout
            </p>
          </div>

          {/* ITIN — secondary path */}
          <div className="surface-navy flex flex-col p-5 animate-fade-up [animation-delay:160ms]">
            <h2 className="mt-1 text-[16px] font-bold text-white">ITIN Application</h2>
            <div className="mb-4 mt-1.5 flex items-baseline gap-2">
              <span className="font-display text-[2.1rem] font-extrabold leading-none text-white">
                ${pricing.itin.price}
              </span>
              <span className="font-mono text-[12px] text-white/70">one-time</span>
            </div>
            <DocumentCard service="itin" />
            <Link href="/checkout?service=itin" className="btn-ink mt-5 w-full">
              Get your ITIN →
            </Link>
            <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
              Need a tax ID only
            </p>
          </div>
        </div>

        {/* Guarantee line (replaces review stats) */}
        <p className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-2 text-center text-[14px] text-white/80">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
            <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" stroke="#0F9D6E" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" stroke="#0F9D6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          One-time fee. No surprise charges. 110% money-back guarantee on your ITIN.
        </p>

        {/* Bundle as an option, not the lead */}
        <p className="mt-3 text-center text-[14px] text-white/70">
          Need everything?{" "}
          <Link
            href="/checkout?service=llc-ein-itin"
            className="font-semibold text-emerald underline-offset-2 hover:underline"
          >
            Get the complete LLC + EIN + ITIN package for ${pricing.bundle.price}
          </Link>
          , coordinated end to end.
        </p>
      </div>
    </section>
  );
}

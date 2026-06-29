import Link from "next/link";
import DocumentCard from "./DocumentCard";
import { pricing } from "@/lib/content";
import type { GeoInfo } from "@/lib/geo";

export default function Hero({ geo }: { geo: GeoInfo }) {
  const place = geo.known && !geo.restricted ? `from ${geo.name}` : "from anywhere";

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* atmosphere */}
      <div className="grid-texture absolute inset-0 opacity-100" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-emerald/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-52 -left-32 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-x relative py-16 lg:py-24">
        {/* Top: badge + headline + subhead */}
        <div className="mx-auto max-w-3xl animate-fade-up text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5">
            <span className="text-base leading-none">{geo.known ? geo.flag : "🌍"}</span>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-tint">
              IRS Certifying Acceptance Agents
            </span>
          </div>

          <h1 className="font-display text-[2.4rem] font-extrabold leading-[1.06] sm:text-[3.1rem] lg:text-[3.5rem]">
            Start your US business
            <br />
            <span className="text-emerald">{place}.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/65">
            Get your ITIN, form a US LLC and get your EIN — 100% online. Access US banking,
            launch your store, and get paid on Stripe, Amazon and PayPal. Nothing original
            ever mailed to the US.
          </p>

          {/* Objection-killer chips — the four things non-residents worry about */}
          <ul className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
            {[
              "No US visit required",
              "No SSN needed",
              "100% online",
              "Works from 150+ countries",
            ].map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 text-[13px] font-medium text-white/85"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M5 12l5 5 9-11" stroke="#0F9D6E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {geo.restricted && (
          <div className="mx-auto mt-6 max-w-xl rounded-xl border border-gold/30 bg-gold/10 p-4 text-center text-sm text-gold-soft">
            Due to US sanctions we may be unable to serve your country directly. Message us
            first and we&apos;ll confirm your eligibility before you pay.
          </div>
        )}

        {/* Two offers, lower prices forward */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* LLC + EIN + Address */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 animate-fade-up [animation-delay:80ms]">
            <h2 className="text-[16px] font-bold text-white">LLC + EIN + Business Address</h2>
            <div className="mb-4 mt-1.5 flex items-baseline gap-2">
              <span className="font-display text-[2.1rem] font-extrabold leading-none text-white">
                ${pricing.llc.price}
              </span>
              <span className="font-mono text-[12px] text-white/45">
                + state fee · renews ${pricing.llc.renewal}/yr
              </span>
            </div>
            <DocumentCard service="llc" />
            <Link href="/checkout?service=llc" className="btn-primary mt-5 w-full">
              Form your US company →
            </Link>
          </div>

          {/* ITIN */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 animate-fade-up [animation-delay:160ms]">
            <h2 className="text-[16px] font-bold text-white">ITIN Application</h2>
            <div className="mb-4 mt-1.5 flex items-baseline gap-2">
              <span className="font-display text-[2.1rem] font-extrabold leading-none text-white">
                ${pricing.itin.price}
              </span>
              <span className="font-mono text-[12px] text-white/45">one-time</span>
            </div>
            <DocumentCard service="itin" />
            <Link href="/checkout?service=itin" className="btn-primary mt-5 w-full">
              Get your ITIN →
            </Link>
          </div>
        </div>

        {/* Guarantee line (replaces review stats) */}
        <p className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 text-center text-[14px] text-white/65">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
            <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" stroke="#0F9D6E" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" stroke="#0F9D6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          One-time fee. No surprise charges. 110% money-back guarantee on your ITIN.
        </p>

        {/* Bundle as an option, not the lead */}
        <p className="mt-3 text-center text-[14px] text-white/55">
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

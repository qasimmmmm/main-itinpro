"use client";

import { useState } from "react";
import Link from "next/link";
import DocumentCard from "./DocumentCard";
import { services, pricing, trust, type ServiceKey } from "@/lib/content";
import type { GeoInfo } from "@/lib/geo";

const TABS: { key: ServiceKey; label: string }[] = [
  { key: "itin", label: "ITIN" },
  { key: "llc", label: "LLC + EIN" },
  { key: "bundle", label: "Both" },
];

function priceFor(key: ServiceKey) {
  if (key === "itin") return { amount: pricing.itin.price, note: "one-time" };
  if (key === "llc") return { amount: pricing.llc.price, note: "+ state fee · renews $298/yr" };
  return { amount: pricing.bundle.price, note: "+ state fee" };
}

export default function Hero({ geo }: { geo: GeoInfo }) {
  const [active, setActive] = useState<ServiceKey>("bundle");
  const svc = services.find((s) => s.key === active)!;
  const price = priceFor(active);

  const place =
    geo.known && !geo.restricted ? `from ${geo.name}` : "from anywhere";

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

      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5">
            {geo.known ? (
              <span className="text-base leading-none">{geo.flag}</span>
            ) : (
              <span className="text-base leading-none">🌍</span>
            )}
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-tint">
              IRS Certifying Acceptance Agents
            </span>
          </div>

          <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.05] sm:text-[3.25rem] lg:text-[3.6rem]">
            Start your US business
            <br />
            <span className="text-emerald">{place}.</span>
          </h1>

          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/65">
            Get your ITIN, form a US LLC and get your EIN — 100% online. Access US
            banking, launch your store, and get paid on Stripe, Amazon and PayPal.
            Nothing original ever mailed to the US.
          </p>

          {geo.restricted && (
            <div className="mt-5 max-w-lg rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm text-gold-soft">
              Due to US sanctions we may be unable to serve your country directly.
              Message us first and we&apos;ll confirm your eligibility before you pay.
            </div>
          )}

          {/* Service selector */}
          <div className="mt-8 max-w-lg">
            <div
              role="tablist"
              aria-label="Choose a service"
              className="inline-flex rounded-full border border-white/12 bg-white/[0.04] p-1"
            >
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={active === t.key}
                  onClick={() => setActive(t.key)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                    active === t.key
                      ? "bg-emerald text-white shadow-[0_6px_16px_-6px_rgba(15,157,110,0.8)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3">
              <div>
                <p className="text-[13px] text-white/50">{svc.name}</p>
                <p className="mt-0.5 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-extrabold">
                    ${price.amount}
                  </span>
                  <span className="font-mono text-[12px] text-white/45">
                    {price.note}
                  </span>
                </p>
              </div>
              <Link
                href={`/apply?service=${svc.slug}`}
                className="btn-primary"
              >
                Apply now →
              </Link>
            </div>
          </div>

          {/* trust row */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55">
            <span className="inline-flex items-center gap-1.5">
              <span className="text-gold">★★★★★</span>
              <span className="font-semibold text-white">{trust.rating}</span>
              <span>· {trust.reviewCount} reviews</span>
            </span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span>
              <span className="font-semibold text-white">{trust.founders}</span>{" "}
              founders served
            </span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span>
              <span className="font-semibold text-white">{trust.countries}</span>{" "}
              countries
            </span>
          </div>
        </div>

        {/* Right: live document preview */}
        <div className="animate-fade-up [animation-delay:120ms]">
          <div className="relative mx-auto max-w-sm lg:max-w-md">
            <DocumentCard service={active} />
            <div className="mt-4 flex items-center justify-center gap-2 text-center text-[12px] text-white/45">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2l7 3v6c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V5l7-3z" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              Prepared &amp; certified by IRS Certifying Acceptance Agents
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

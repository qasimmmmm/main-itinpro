import Link from "next/link";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import PricingCalculator from "./PricingCalculator";
import { pricing } from "@/lib/content";

const headline = [
  {
    name: "ITIN Application",
    price: pricing.itin.price,
    note: "one-time",
    href: "/checkout?service=itin",
    desc: "Your US Tax ID, no SSN needed.",
  },
  {
    name: "LLC + EIN + Address",
    price: pricing.llc.price,
    note: "+ state fee",
    href: "/checkout?service=llc",
    desc: "A real US company, formed remotely.",
  },
  {
    name: "LLC + EIN + ITIN",
    price: pricing.bundle.price,
    note: "+ state fee",
    href: "/checkout?service=llc-ein-itin",
    desc: "Everything to launch and get paid.",
    best: true,
  },
];

const trustCues = [
  {
    label: "IRS Certifying Acceptance Agent",
    icon: (
      <path
        d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "All-in pricing, no surprise fees",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M9.5 8.5h3.2a1.8 1.8 0 010 3.6H10m0 0v3.4m0-3.4h2.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    label: "110% money-back guarantee",
    icon: (
      <>
        <path
          d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section scroll-mt-20 bg-paper">
      <div className="container-x">
        <SectionHead
          eyebrow="Pricing"
          title="Clear prices. No surprises."
          intro="The same transparent pricing for everyone, with government fees always shown separately. Pay once for ITIN; the LLC renews annually only for the agent and address."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {headline.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div
                className={`flex h-full flex-col rounded-xl2 border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                  p.best
                    ? "border-emerald/40 bg-white shadow-lift ring-1 ring-emerald/20"
                    : "border-mist bg-white shadow-card"
                }`}
              >
                {/* Reserved badge row keeps all three price figures + CTAs on a shared baseline */}
                <div className="mb-3 h-6">
                  {p.best && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-tint px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-deep">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-emerald"
                        aria-hidden="true"
                      />
                      Most popular
                    </span>
                  )}
                </div>

                <h3 className="text-[15px] font-semibold text-ink">{p.name}</h3>
                <p className="mt-1 text-[13px] leading-snug text-slate">{p.desc}</p>

                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-extrabold leading-none text-ink sm:text-[2.1rem]">
                    ${p.price}
                  </span>
                  <span className="font-mono text-[12px] text-slate">{p.note}</span>
                </p>

                <div className="flex-1" />

                <Link
                  href={p.href}
                  className={`mt-6 w-full ${p.best ? "btn-primary" : "btn-ghost"}`}
                >
                  Choose
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Compact trust reinforcement row — reuses existing trust signal labels, no new claims */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {trustCues.map((cue) => (
            <li
              key={cue.label}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-slate"
            >
              <span className="text-emerald-deep">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  {cue.icon}
                </svg>
              </span>
              {cue.label}
            </li>
          ))}
        </ul>

        <Reveal className="mt-8" delay={60}>
          <PricingCalculator />
        </Reveal>
      </div>
    </section>
  );
}

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

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-paper py-20 lg:py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="Pricing"
          title="Clear prices. No surprises."
          intro="The same transparent pricing for everyone, with government fees always shown separately. Pay once for ITIN; the LLC renews annually only for the agent and address."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {headline.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div
                className={`flex h-full flex-col rounded-xl2 border p-6 ${
                  p.best
                    ? "border-emerald/40 bg-white shadow-card ring-1 ring-emerald/20"
                    : "border-mist bg-white"
                }`}
              >
                {p.best && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-emerald-tint px-2.5 py-1 text-[11px] font-semibold text-emerald-deep">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-[15px] font-semibold text-ink">{p.name}</h3>
                <p className="mt-1 text-[13px] text-slate">{p.desc}</p>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-extrabold text-ink">
                    ${p.price}
                  </span>
                  <span className="font-mono text-[12px] text-slate">{p.note}</span>
                </p>
                <Link
                  href={p.href}
                  className={`mt-5 w-full ${p.best ? "btn-primary" : "btn-ghost"}`}
                >
                  Choose
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8" delay={60}>
          <PricingCalculator />
        </Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Pricing from "@/components/Pricing";
import Guarantee from "@/components/Guarantee";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { STATE_FEES } from "@/lib/states";
import { pricing } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing — ITIN, LLC & EIN, all-in state costs",
  description:
    "Transparent pricing for ITIN ($348), LLC + EIN + Business Address ($298 + state fee), and the complete LLC + EIN + ITIN bundle ($646). See the all-in cost for all 50 states.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Honest pricing, with every state fee shown upfront"
        intro="No surprises at checkout. Choose a service, see exactly what it costs in your state, and know that the registered agent renews at a flat $298/year."
        cta={false}
      />

      <Pricing />

      {/* Full state fee table */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <span className="eyebrow">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald" />
                State filing fees
              </span>
              <h2 className="mt-3 text-[2rem] font-extrabold leading-tight text-ink">
                All-in LLC cost by state
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-slate">
                Your LLC + EIN + Business Address service is ${pricing.llc.price}. On top of that,
                each state charges its own filing fee — shown below, along with a typical turnaround.
                The total is everything you pay to get your company formed.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10 overflow-hidden rounded-xl2 border border-mist shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                  <thead className="bg-paper">
                    <tr className="border-b border-mist">
                      <th className="px-6 py-4 font-semibold text-ink">State</th>
                      <th className="px-6 py-4 text-right font-semibold text-ink">State fee</th>
                      <th className="px-6 py-4 text-right font-semibold text-ink">Service</th>
                      <th className="px-6 py-4 text-right font-semibold text-ink">All-in total</th>
                      <th className="px-6 py-4 text-right font-semibold text-ink">Typical time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STATE_FEES.map((s, i) => (
                      <tr
                        key={s.name}
                        className={`border-b border-mist/60 last:border-0 ${
                          i % 2 === 1 ? "bg-paper/40" : "bg-white"
                        }`}
                      >
                        <td className="px-6 py-3.5 font-medium text-ink/85">
                          {s.name}
                          {s.popular && (
                            <span className="ml-2 rounded-full bg-emerald-tint px-2 py-0.5 text-[10px] font-semibold text-emerald-deep">
                              Popular
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-3.5 text-right font-mono text-[13px] text-slate">
                          {s.fee === 0 ? "$0" : `+$${s.fee}`}
                        </td>
                        <td className="px-6 py-3.5 text-right font-mono text-[13px] text-slate">
                          ${pricing.llc.price}
                        </td>
                        <td className="px-6 py-3.5 text-right font-mono text-[13px] font-semibold text-ink">
                          ${pricing.llc.price + s.fee}
                        </td>
                        <td className="px-6 py-3.5 text-right text-[13px] text-slate">
                          {s.days} {s.days === 1 ? "day" : "days"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-5 text-[13px] leading-relaxed text-slate">
              State fees are set by each state and can change. After year one, the registered agent
              and US business address renew at ${pricing.registeredAgentRenewal}/year to keep your
              company in good standing. Some states also charge their own annual/franchise fee, which
              is separate. We&apos;ll confirm the exact figures for your state during onboarding.{" "}
              <Link href="/apply?service=llc" className="font-semibold text-emerald-deep underline">
                Start your LLC
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <Guarantee />
      <CTA />
    </>
  );
}

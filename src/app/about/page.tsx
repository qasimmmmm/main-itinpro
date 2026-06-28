import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { company, trust } from "@/lib/content";

export const metadata: Metadata = {
  title: "About ITIN-Pro — US Tax IDs & Company Formation for Non-Residents",
  description:
    "ITIN-Pro helps founders and sellers around the world set up in the US — ITINs, LLCs and EINs — handled by IRS Certifying Acceptance Agents, 100% online.",
  alternates: { canonical: "/about" },
};

const stats = [
  { value: trust.founders, label: "founders served" },
  { value: trust.countries, label: "countries" },
  { value: trust.since, label: "helping since" },
  { value: trust.languages, label: "languages supported" },
];

const values = [
  {
    title: "Certified, not improvised",
    body: "Our applications are prepared and certified by IRS Certifying Acceptance Agents. That's the difference between a form that gets accepted and one that bounces.",
  },
  {
    title: "Transparent pricing",
    body: "We show the all-in cost — including each state's filing fee — before you pay. No fees hidden in a final checkout step.",
  },
  {
    title: "Truly online",
    body: "You never mail an original passport or visit a US office. Everything is done remotely, from wherever you are in the world.",
  },
  {
    title: "Support in your language",
    body: "Our team assists in eight languages so you can complete the entire process comfortably, without anything getting lost in translation.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="We make US business setup simple for the rest of the world"
        intro="For most non-residents, the US system feels like a locked door — confusing forms, mailed passports, and platforms asking for tax IDs you can't get. We exist to open that door."
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="rounded-xl2 border border-mist bg-paper p-6 text-center">
                  <div className="font-display text-4xl font-extrabold text-ink">{s.value}</div>
                  <div className="mt-1 text-[13px] font-medium text-slate">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl space-y-6">
            <Reveal>
              <h2 className="text-[1.7rem] font-extrabold leading-tight text-ink">Our story</h2>
            </Reveal>
            <Reveal>
              <p className="text-[16px] leading-relaxed text-slate">
                ITIN-Pro was built around a simple frustration: talented founders and sellers were
                being shut out of the US economy by paperwork. Someone with a thriving store would
                hit a wall the moment Stripe or PayPal asked for a tax ID — or spend months mailing
                documents back and forth, hoping nothing got lost.
              </p>
            </Reveal>
            <Reveal>
              <p className="text-[16px] leading-relaxed text-slate">
                We brought the whole process under one roof: company formation, EINs, and ITINs,
                handled by Certifying Acceptance Agents who can verify your identity without you ever
                posting an original passport. Today we&apos;ve helped {trust.founders} founders across{" "}
                {trust.countries} countries get set up and get paid — and we treat every new client
                with the same care.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="card h-full p-7">
                  <h3 className="text-[17px] font-bold text-ink">{v.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-slate">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mx-auto mt-16 max-w-2xl rounded-xl2 border border-mist bg-paper p-8 text-center">
              <h3 className="text-[15px] font-bold text-ink">Our company</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-slate">
                {company.brand} is a service of {company.legalEntity}
                <br />
                {company.addressLine1}, {company.addressLine2}
                <br />
                {company.email}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}

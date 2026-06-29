import Link from "next/link";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const cards = [
  {
    tag: "The company",
    name: "US LLC",
    plain: "Your US business itself.",
    body:
      "A legal US company that lets you operate, sign contracts and look professional to US customers. It keeps your business and personal money separate. (An LLC is not a tax number.)",
    need: "You want a real US company to sell, get paid, or build a brand.",
    href: "/checkout?service=llc",
    cta: "Form an LLC",
  },
  {
    tag: "The company tax ID",
    name: "EIN",
    plain: "Your company's tax number.",
    body:
      "Like a Social Security Number, but for your business. You need it to open a US bank account, get on Stripe or Amazon, and file business taxes. You do NOT need an SSN or ITIN to get one.",
    need: "You have (or are forming) a US company and need to bank and get paid.",
    href: "/checkout?service=llc",
    cta: "Get LLC + EIN",
    featured: true,
  },
  {
    tag: "Your personal tax ID",
    name: "ITIN",
    plain: "Your personal US tax number.",
    body:
      "For you as an individual, when you personally have to report or file US taxes — or when a platform like PayPal asks for a personal tax ID to release your money.",
    need: "A platform needs your personal tax ID, or you must file a US return.",
    href: "/checkout?service=itin",
    cta: "Apply for an ITIN",
  },
];

export default function WhichService() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="Not sure where to start?"
          title="ITIN, EIN or LLC — which one do you need?"
          intro="These three get mixed up all the time. Here's each one in plain English, so you only pay for what actually applies to you."
          center
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.name} delay={i * 90}>
              <div
                className={`flex h-full flex-col rounded-xl2 border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift ${
                  c.featured ? "border-emerald/40 bg-white shadow-card ring-1 ring-emerald/20" : "border-mist bg-white"
                }`}
              >
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-deep">
                  {c.tag}
                </span>
                <h3 className="mt-2 text-2xl font-extrabold text-ink">{c.name}</h3>
                <p className="mt-1 text-[15px] font-semibold text-ink/80">{c.plain}</p>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-slate">{c.body}</p>
                <div className="mt-5 rounded-xl bg-paper p-3.5">
                  <p className="text-[13px] leading-snug text-ink/75">
                    <span className="font-semibold text-ink">Choose this if:</span> {c.need}
                  </p>
                </div>
                <Link href={c.href} className={`mt-5 w-full ${c.featured ? "btn-primary" : "btn-ghost"}`}>
                  {c.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[15px] leading-relaxed text-slate">
            <span className="font-semibold text-ink">Most non-residents start with an LLC + EIN</span>, and add
            an ITIN later only if they personally need to file US taxes. Still unsure?{" "}
            <Link href="/apply" className="font-semibold text-emerald-deep link-underline">
              Tell us your situation
            </Link>{" "}
            and we&apos;ll point you to the right one — free.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

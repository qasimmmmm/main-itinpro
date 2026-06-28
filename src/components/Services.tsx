import Link from "next/link";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="Our services"
          title="LLC, ITIN, or both — pick what you need"
          intro="Whether you just need a Tax ID or a complete US company that can bank and accept payments, we handle the paperwork end to end."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((s, i) => {
            const featured = s.key === "bundle";
            return (
              <Reveal key={s.key} delay={i * 90}>
                <div
                  className={`relative flex h-full flex-col rounded-xl2 p-7 transition-all duration-300 hover:-translate-y-1 ${
                    featured
                      ? "bg-ink text-white shadow-lift ring-1 ring-emerald/30"
                      : "card hover:shadow-lift"
                  }`}
                >
                  {featured && (
                    <span className="absolute right-6 top-7 rounded-full bg-emerald px-3 py-1 text-[11px] font-semibold text-white">
                      MOST POPULAR
                    </span>
                  )}
                  <h3
                    className={`text-xl font-bold ${featured ? "text-white" : "text-ink"}`}
                  >
                    {s.name}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      featured ? "text-white/55" : "text-slate"
                    }`}
                  >
                    {s.tagline}
                  </p>

                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span
                      className={`font-display text-3xl font-extrabold ${
                        featured ? "text-white" : "text-ink"
                      }`}
                    >
                      ${s.price}
                    </span>
                    <span
                      className={`font-mono text-[12px] ${
                        featured ? "text-white/45" : "text-slate"
                      }`}
                    >
                      {s.priceNote}
                    </span>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {s.includes.map((it) => (
                      <li key={it} className="flex items-start gap-2.5">
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                            featured ? "bg-emerald" : "bg-emerald-tint"
                          }`}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                              d="M5 12l5 5 9-11"
                              stroke={featured ? "#fff" : "#0B7A55"}
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span
                          className={`text-[14px] leading-snug ${
                            featured ? "text-white/80" : "text-ink/80"
                          }`}
                        >
                          {it}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/apply?service=${s.slug}`}
                    className={`mt-7 w-full ${featured ? "btn-primary" : "btn-ink"}`}
                  >
                    Get started
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

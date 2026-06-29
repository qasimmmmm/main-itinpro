import Link from "next/link";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="section scroll-mt-20 bg-white">
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
                  className={`group relative flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                    featured
                      ? "bg-ink text-white shadow-lift ring-1 ring-emerald/30"
                      : "card hover:shadow-lift"
                  }`}
                >
                  {featured && (
                    <>
                      {/* subtle navy atmosphere on the featured card */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                      >
                        <div className="absolute inset-0 grid-texture opacity-60" />
                        <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-emerald/20 blur-3xl" />
                      </div>
                      <span className="badge-seal absolute right-6 top-6 z-10">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-emerald"
                          aria-hidden="true"
                        />
                        Most popular
                      </span>
                    </>
                  )}

                  <div className="relative z-10 flex h-full flex-col">
                    <h3
                      className={`text-xl font-bold leading-snug ${
                        featured ? "text-white" : "text-ink"
                      }`}
                    >
                      {s.name}
                    </h3>
                    <p
                      className={`mt-1.5 text-[14px] leading-snug ${
                        featured ? "text-white/70" : "text-slate"
                      }`}
                    >
                      {s.tagline}
                    </p>

                    <div className="mt-5 flex items-baseline gap-1.5">
                      <span
                        className={`font-display text-3xl font-extrabold leading-none sm:text-[2.1rem] ${
                          featured ? "text-white" : "text-ink"
                        }`}
                      >
                        ${s.price}
                      </span>
                      <span
                        className={`font-mono text-[12px] ${
                          featured ? "text-white/70" : "text-slate"
                        }`}
                      >
                        {s.priceNote}
                      </span>
                    </div>

                    <div
                      className={`mt-6 mb-5 ${
                        featured ? "divider-light" : "divider"
                      }`}
                      aria-hidden="true"
                    />

                    <ul className="flex-1 space-y-3">
                      {s.includes.map((it) => (
                        <li key={it} className="flex items-start gap-2.5">
                          <span
                            className={`mt-0.5 ${featured ? "check-on-dark" : "check"}`}
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M5 12l5 5 9-11"
                                stroke="currentColor"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={`text-[14px] leading-snug ${
                              featured ? "text-white/85" : "text-ink/80"
                            }`}
                          >
                            {it}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/checkout?service=${s.slug}`}
                      className={`mt-7 w-full ${featured ? "btn-primary" : "btn-ink"}`}
                    >
                      Get started
                    </Link>

                    {featured && (
                      <span className="secure-note-dark mt-3 justify-center">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 12l2 2 4-4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Secure checkout
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

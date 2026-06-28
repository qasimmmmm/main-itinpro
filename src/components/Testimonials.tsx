import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { testimonials, trust } from "@/lib/content";

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C79A3E" aria-hidden="true">
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 18.6 5.9 21.4l1.4-6.8L2.2 9.9l6.9-.8L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow="Client stories"
            title="Founders in 150+ countries trust us with their US setup"
            intro="From Amazon sellers to freelancers and SaaS founders — here's what people say after we've handled their ITIN, LLC and EIN."
          />
          <Reveal delay={120}>
            <a
              href={trust.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-3 rounded-xl2 border border-mist bg-paper px-5 py-4 transition-colors hover:border-emerald/40"
            >
              <div className="flex flex-col">
                <span className="font-display text-2xl font-extrabold text-ink">{trust.rating}</span>
                <Stars />
              </div>
              <div className="border-l border-mist pl-3 text-[13px] leading-tight text-slate">
                <span className="font-semibold text-ink">{trust.reviewCount}</span> reviews
                <br />
                on {trust.reviewPlatform}
              </div>
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="card flex h-full flex-col p-6">
                <Stars />
                <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-ink/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-mist pt-4">
                  <div className="text-sm font-semibold text-ink">{t.name}</div>
                  <div className="text-[12px] text-slate">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

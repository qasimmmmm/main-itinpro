import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { testimonials } from "@/lib/content";

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
        <SectionHead
          eyebrow="Client stories"
          title="What founders say about working with us"
          intro="From Amazon sellers to freelancers and SaaS founders — here's what people say after we've handled their ITIN, LLC and EIN."
        />

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

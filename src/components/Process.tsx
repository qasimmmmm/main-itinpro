import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { steps } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="section scroll-mt-20 bg-white">
      <div className="container-x">
        <SectionHead
          eyebrow="How it works"
          title="It's easier than you thought"
          intro="Five steps, all online. You fill in a short form and sign — we handle the IRS, the state and the certification."
        />

        <ol className="relative mt-12 space-y-4">
          {/* connecting spine */}
          <div
            className="absolute left-[1.125rem] top-9 bottom-9 hidden w-px bg-mist sm:block"
            aria-hidden="true"
          />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i < 4 ? i * 80 : 0}>
              <li className="relative">
                <div className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <span className="badge-num relative z-10 ring-4 ring-white">
                      {s.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold leading-snug text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-slate">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

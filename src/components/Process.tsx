import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { steps } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="How it works"
          title="It's easier than you thought"
          intro="Five steps, all online. You fill in a short form and sign — we handle the IRS, the state and the certification."
        />

        <div className="relative mt-14">
          {/* spine */}
          <div
            className="absolute left-[19px] top-2 hidden h-[calc(100%-2rem)] w-px bg-mist md:left-1/2 md:block"
            aria-hidden="true"
          />
          <ol className="space-y-8 md:space-y-0">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <li
                  className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${
                    i % 2 === 1 ? "md:[direction:rtl]" : ""
                  }`}
                >
                  <div
                    className={`flex items-start gap-4 md:[direction:ltr] ${
                      i % 2 === 1 ? "md:justify-start" : "md:justify-end"
                    } ${i % 2 === 1 ? "" : "md:text-right"}`}
                  >
                    <div
                      className={`order-1 ${i % 2 === 1 ? "" : "md:order-2"}`}
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono text-sm font-semibold text-white ring-4 ring-paper">
                        {s.n}
                      </span>
                    </div>
                    <div
                      className={`order-2 max-w-sm pb-8 ${
                        i % 2 === 1 ? "" : "md:order-1"
                      }`}
                    >
                      <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-slate">
                        {s.body}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

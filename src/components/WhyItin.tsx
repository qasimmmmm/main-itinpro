import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { reasons } from "@/lib/content";

const icons = [
  // payments (card)
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
    <path d="M2.5 9.5h19" stroke="currentColor" strokeWidth="1.7" />
    <path d="M6 14.5h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>,
  // banking (bank building)
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 9.5L12 4l9 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M5 10v8M19 10v8M9.5 10v8M14.5 10v8M3.5 20.5h17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>,
  // savings (percent)
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 18L18 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="7.5" cy="7.5" r="2.4" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="16.5" cy="16.5" r="2.4" stroke="currentColor" strokeWidth="1.7" />
  </svg>,
];

export default function WhyItin() {
  return (
    <section className="bg-paper py-20 lg:py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="Why it matters"
          title="What your US setup actually unlocks"
          intro="Banks and payment platforms need a US tax ID before they'll verify you and release your money. Here's what a US company — and your tax IDs — let you do."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 90}>
              <div className="card h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-tint text-emerald-deep">
                  {icons[i]}
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink">{r.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slate">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";

export default function Guarantee() {
  return (
    <section className="bg-paper py-16">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl2 border border-gold-soft bg-gradient-to-br from-white to-gold-soft/30 p-8 lg:p-12">
            <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center">
              {/* Seal */}
              <div className="shrink-0">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-gold/30 bg-white shadow-card">
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-gold text-white">
                    <span className="font-display text-xl font-extrabold leading-none">110%</span>
                    <span className="text-[8px] font-bold uppercase tracking-wide">Back</span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <span className="eyebrow text-gold">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                  Our guarantee
                </span>
                <h2 className="mt-3 text-[1.7rem] font-extrabold leading-tight text-ink">
                  If the IRS rejects your ITIN, you get 110% of your fee back
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate">
                  Every application is reviewed by a Certifying Acceptance Agent before it&apos;s
                  filed, which is why our success rate is so high. But if your ITIN is ever rejected
                  after we submit it, we refund 110% of the service fee you paid us — no arguments.
                  That&apos;s how confident we are in our work.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

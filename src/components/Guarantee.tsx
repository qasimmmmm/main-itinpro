import Reveal from "./Reveal";

export default function Guarantee() {
  return (
    <section className="section-tight bg-paper">
      <div className="container-x">
        <Reveal>
          <div className="panel-navy relative overflow-hidden p-8 text-white lg:p-12">
            {/* atmosphere */}
            <div className="pointer-events-none absolute inset-0 grid-texture opacity-100" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-emerald/15 blur-3xl" aria-hidden="true" />

            <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:gap-12 lg:text-left">
              {/* Gold seal — the one place gold leads */}
              <div className="shrink-0">
                <div className="relative flex h-28 w-28 items-center justify-center">
                  <svg
                    width="112"
                    height="112"
                    viewBox="0 0 112 112"
                    fill="none"
                    className="absolute inset-0"
                    aria-hidden="true"
                  >
                    {/* shield seal */}
                    <path
                      d="M56 8l38 14v26c0 24-16 40-38 48-22-8-38-24-38-48V22L56 8z"
                      fill="#EFE3C4"
                      fillOpacity="0.12"
                      stroke="#C79A3E"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M56 18l28 10.3v19.2C84 66 72.5 78.5 56 85 39.5 78.5 28 66 28 47.5V28.3L56 18z"
                      stroke="#C79A3E"
                      strokeOpacity="0.45"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="relative flex flex-col items-center justify-center text-gold">
                    <span className="font-display text-2xl font-extrabold leading-none">110%</span>
                    <span className="mt-1 font-mono text-[9px] font-semibold uppercase tracking-[0.2em]">
                      Back
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <span className="badge-seal">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                  Our guarantee
                </span>
                <h2 className="mt-4 text-balance text-[1.8rem] font-extrabold leading-tight text-white sm:text-[2.1rem]">
                  If the IRS rejects your ITIN, you get 110% of your fee back
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80 lg:mx-0">
                  Every application is reviewed by a Certifying Acceptance Agent before it&apos;s
                  filed, which is why our success rate is so high. But if your ITIN is ever rejected
                  after we submit it, we refund 110% of the service fee you paid us — no arguments.
                  That&apos;s how confident we are in our work.
                </p>

                <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row lg:items-center">
                  <a
                    href="/checkout?service=llc-ein-itin"
                    className="btn-primary w-full sm:w-auto"
                  >
                    Get started, fully covered
                  </a>
                  <span className="secure-note-dark">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                    Secure checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const platforms = ["Stripe", "PayPal", "Amazon", "Mercury", "Wise", "Payoneer"];

export default function TrustBand() {
  return (
    <section className="section-strip border-b border-mist bg-white">
      <div className="container-x">
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:gap-8">
          <p className="shrink-0 text-center font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-slate lg:max-w-[15rem] lg:text-left">
            Set up to work with the platforms and banks you already use
          </p>
          <span
            aria-hidden="true"
            className="hidden h-8 w-px shrink-0 bg-mist lg:block"
          />
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10 lg:justify-between">
            {platforms.map((p) => (
              <li key={p}>
                <span className="font-display text-[1.05rem] font-bold leading-none tracking-[-0.01em] text-ink/45 transition-colors duration-200 hover:text-ink/70">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

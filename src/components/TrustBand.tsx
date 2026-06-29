const platforms = ["Stripe", "PayPal", "Amazon", "Mercury", "Wise", "Payoneer"];

export default function TrustBand() {
  return (
    <section className="border-b border-mist bg-white">
      <div className="container-x py-7">
        <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-slate">
          Set up to work with the platforms and banks you already use
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {platforms.map((p) => (
            <span
              key={p}
              className="font-display text-lg font-bold text-ink/35 transition-colors hover:text-ink/60"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

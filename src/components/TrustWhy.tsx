import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const pillars = [
  {
    title: "IRS Certifying Acceptance Agents",
    body:
      "We're federally authorized by the IRS to verify your identity and certify your documents for your ITIN — a credential most agents don't hold.",
    icon: (
      <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
  {
    title: "Your passport never leaves your hands",
    body:
      "Because we certify your documents ourselves, you never mail your original passport overseas to the IRS — a real risk people take doing this alone.",
    icon: (
      <path d="M5 4h11l3 3v13H5z M5 4v16 M9 9h6 M9 13h6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
  {
    title: "110% money-back guarantee",
    body:
      "If the IRS rejects your ITIN after we file it, we refund 110% of the service fee you paid us. We can do this because we review every application first.",
    icon: (
      <path d="M12 3v18 M16 7a4 3 0 00-4-2c-2.2 0-4 1.1-4 2.6 0 3.8 8 2 8 5.8 0 1.6-1.9 2.6-4 2.6a4.3 3 0 01-4-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "100% online, from any country",
    body:
      "No trip to the US, no US visa and no Social Security Number required. The entire process is completed from wherever you live.",
    icon: (
      <path d="M12 3a9 9 0 100 18 9 9 0 000-18z M3 12h18 M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
  {
    title: "One all-in price, shown upfront",
    body:
      "Your government fees are always shown separately and your total is fixed before you pay. No fake $0 offers and no surprise charges at checkout.",
    icon: (
      <path d="M4 7h16v10H4z M4 11h16 M8 15h3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
  {
    title: "Real people, in your language",
    body:
      "Talk to a specialist in English, Spanish, Portuguese, Arabic, Chinese, Russian, Turkish or Italian — before you pay and the whole way through.",
    icon: (
      <path d="M4 5h16v11H9l-4 4v-4H4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
];

export default function TrustWhy() {
  return (
    <section className="section-navy section">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-texture" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-navy-glow" />
      <div className="container-x relative z-10">
        <SectionHead
          eyebrow="Why founders trust us"
          title="Built to be trusted, not just hired"
          intro="No reviews to take our word for it yet — so here's what actually protects you when you work with us."
          center
          light
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i < 3 ? i * 80 : 0}>
              <div className="surface-navy flex h-full flex-col p-5">
                <span className="icon-chip-dark h-11 w-11">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {p.icon}
                  </svg>
                </span>
                <h3 className="mt-5 text-[17px] font-bold leading-snug text-white">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/80">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Credential / trust strip placed directly under the hero. In a scam-wary niche
// with no customer reviews yet, authority + guarantees + transparency do the
// trust-building that testimonials normally would.

const items = [
  {
    label: "IRS Certifying Acceptance Agents",
    icon: (
      <path
        d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    ),
  },
  {
    label: "Passport verified by video — never mailed",
    icon: (
      <path
        d="M5 4h11l3 3v13H5z M5 4v16 M9 9h6 M9 12.5h6 M9 16h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    ),
  },
  {
    label: "110% money-back guarantee",
    icon: (
      <path
        d="M12 3v18 M16 7a4 3 0 00-4-2c-2.2 0-4 1.1-4 2.6 0 3.8 8 2 8 5.8 0 1.6-1.9 2.6-4 2.6a4.3 3 0 01-4-2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "All-in price, no surprise fees",
    icon: (
      <path
        d="M4 7h16v10H4z M4 11h16 M8 15h3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    ),
  },
  {
    label: "Real specialists, in your language",
    icon: (
      <path
        d="M4 5h16v11H9l-4 4v-4H4z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    ),
  },
];

export default function Assurance() {
  return (
    <section className="section-strip border-b border-mist bg-white">
      <div className="container-x">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0 lg:divide-x lg:divide-mist">
          {items.map((it, i) => {
            const isCredential = i === 0;
            return (
              <li
                key={it.label}
                className="flex items-center gap-3 lg:px-5 lg:first:pl-0 lg:last:pr-0"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    isCredential
                      ? "bg-gold/10 text-gold ring-1 ring-gold/30"
                      : "bg-emerald-tint text-emerald-deep"
                  }`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {it.icon}
                  </svg>
                </span>
                <span className="flex flex-col gap-1">
                  {isCredential && (
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                      Official credential
                    </span>
                  )}
                  <span className="text-[13px] font-semibold leading-snug text-ink">{it.label}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

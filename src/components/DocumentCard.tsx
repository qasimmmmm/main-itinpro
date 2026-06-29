import type { ServiceKey } from "@/lib/content";

function Eagle() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l1.6 3.2 3.5.5-2.5 2.5.6 3.5L12 14.6 8.8 16.2l.6-3.5L6.9 7.2l3.5-.5L12 3z"
          fill="#EAF7F1"
        />
        <path d="M5 18.5c2.8 1.6 4.7 2 7 2s4.2-.4 7-2" stroke="#EAF7F1" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ItinCard() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-emerald to-emerald-deep p-6 shadow-doc ring-1 ring-emerald-deep/40">
      <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
      <div className="relative flex items-start gap-3">
        <Eagle />
        <div className="pt-0.5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            Department of the Treasury
          </p>
          <p className="text-[12px] text-emerald-tint/90">Internal Revenue Service</p>
        </div>
      </div>
      <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-tint/80">
        Individual Taxpayer Identification Number
      </p>
      <p className="mt-1.5 font-mono text-[27px] font-semibold tracking-[0.12em] text-white">
        9XX-7X-XXXX
      </p>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-emerald-tint/70">Name</p>
          <p className="text-[15px] font-semibold text-white">Your Name Here</p>
        </div>
        <div className="rounded-md bg-white/15 px-2 py-1 font-mono text-[10px] font-medium text-white">
          ISSUED
        </div>
      </div>
    </div>
  );
}

function LlcCard() {
  const lines = [
    { k: "Entity", v: "Your Company LLC" },
    { k: "State", v: "Delaware · USA" },
    { k: "EIN", v: "9X-XXXXXXX" },
    { k: "Status", v: "Active · Good standing" },
  ];
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-deep to-ink p-6 shadow-doc ring-1 ring-gold/20">
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-2xl" />
      <div className="relative flex items-center justify-between">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
          Certificate of Formation
        </p>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12l5 5 9-11" stroke="#C79A3E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {lines.map((l) => (
          <div key={l.k} className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <span className="text-[12px] text-white/45">{l.k}</span>
            <span className="font-mono text-[13px] font-medium text-white">{l.v}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-white/40">
        + US business address with unlimited mail scans
      </p>
    </div>
  );
}

function BundleCard() {
  const items = ["US LLC formed", "EIN issued by IRS", "ITIN application filed", "US business address", "Registered agent (1 yr)"];
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-white p-6 shadow-doc ring-1 ring-mist">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-deep">
          Complete US setup
        </p>
        <span className="rounded-full bg-emerald-tint px-2.5 py-1 text-[10px] font-semibold text-emerald-deep">
          COMPLETE SETUP
        </span>
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12l5 5 9-11" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[14px] font-medium text-ink">{it}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-between border-t border-mist pt-4">
        <span className="text-[12px] text-slate">Everything, one provider</span>
        <span className="font-mono text-[13px] font-semibold text-ink">Ready to bank</span>
      </div>
    </div>
  );
}

export default function DocumentCard({ service }: { service: ServiceKey }) {
  if (service === "llc") return <LlcCard />;
  if (service === "bundle") return <BundleCard />;
  return <ItinCard />;
}

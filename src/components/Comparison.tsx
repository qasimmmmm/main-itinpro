import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { comparison } from "@/lib/content";

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-emerald-tint">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12l5 5 9-11" stroke="#0B7A55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-mist/70">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="#94A3AC" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return <span className="text-[13px] font-medium text-slate">{value}</span>;
}

export default function Comparison() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHead
          eyebrow="Why ITIN-Pro"
          title="The difference a Certifying Acceptance Agent makes"
          intro="Doing it yourself means mailing original passports and guessing at IRS forms. A generic agent often outsources the hard part. Here's how we compare."
        />

        <Reveal>
          <div className="surface mt-12 overflow-hidden">
            {/* swipe affordance on mobile */}
            <div className="flex items-center justify-end px-5 pt-4 sm:hidden">
              <span className="secure-note normal-case tracking-[0.12em]">
                Swipe to compare
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="relative">
              {/* right scroll-shadow cue */}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:hidden"
                aria-hidden="true"
              />
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-mist">
                      <th className="px-6 py-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate">
                        What matters
                      </th>
                      {comparison.columns.map((c, i) => (
                        <th
                          key={c}
                          className={`px-6 py-5 text-center align-bottom ${
                            i === 0
                              ? "rounded-t-lg bg-emerald-tint/40 text-ink"
                              : "text-slate"
                          }`}
                        >
                          {i === 0 ? (
                            <span className="inline-flex items-center gap-1.5 text-sm font-bold">
                              <span className="h-2 w-2 rounded-full bg-emerald" aria-hidden="true" />
                              {c}
                            </span>
                          ) : (
                            <span className="text-[13px] font-semibold">{c}</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.rows.map((row, ri) => (
                      <tr
                        key={row.label}
                        className={`border-b border-mist/70 last:border-0 ${
                          ri % 2 === 1 ? "bg-paper/50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 text-[14px] font-medium leading-snug text-ink/85">
                          {row.label}
                        </td>
                        {row.values.map((v, vi) => (
                          <td
                            key={vi}
                            className={`px-6 py-4 text-center ${
                              vi === 0 ? "bg-emerald-tint/40" : ""
                            }`}
                          >
                            <Cell value={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>

        {/* peak-conviction close */}
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <a href="/checkout?service=llc-ein-itin" className="btn-primary w-full sm:w-auto">
            Get the complete package
          </a>
          <span className="secure-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            Secure checkout
          </span>
        </div>
      </div>
    </section>
  );
}

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
    <section className="bg-paper py-20 lg:py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="Why ITIN-Pro"
          title="The difference a Certifying Acceptance Agent makes"
          intro="Doing it yourself means mailing original passports and guessing at IRS forms. A generic agent often outsources the hard part. Here's how we compare."
        />

        <Reveal>
          <div className="mt-12 overflow-hidden rounded-xl2 border border-mist bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-mist">
                    <th className="px-6 py-5 text-sm font-semibold text-slate">What matters</th>
                    {comparison.columns.map((c, i) => (
                      <th
                        key={c}
                        className={`px-6 py-5 text-center text-sm font-bold ${
                          i === 0 ? "text-ink" : "text-slate"
                        }`}
                      >
                        {i === 0 ? (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald" />
                            {c}
                          </span>
                        ) : (
                          c
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
                        ri % 2 === 1 ? "bg-paper/40" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-[14px] font-medium text-ink/85">{row.label}</td>
                      {row.values.map((v, vi) => (
                        <td
                          key={vi}
                          className={`px-6 py-4 text-center ${
                            vi === 0 ? "bg-emerald-tint/30" : ""
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
        </Reveal>
      </div>
    </section>
  );
}

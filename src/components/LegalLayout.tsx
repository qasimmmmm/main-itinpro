import Link from "next/link";
import type { ReactNode } from "react";
import { company } from "@/lib/content";

export interface LegalBlock {
  heading: string;
  paras: string[];
  bullets?: string[];
}

export default function LegalLayout({
  title,
  updated,
  intro,
  blocks,
  footnote,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  blocks: LegalBlock[];
  footnote?: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-mist bg-paper">
        <div className="container-x py-14 lg:py-20">
          <nav className="mb-5 flex items-center gap-2 text-[13px] text-slate">
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink/70">{title}</span>
          </nav>
          <h1 className="text-[2rem] font-extrabold leading-tight text-ink sm:text-[2.6rem]">
            {title}
          </h1>
          <p className="mt-3 text-[13px] font-medium text-slate">Last updated: {updated}</p>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <div className="text-[16px] leading-relaxed text-slate">{intro}</div>

            <div className="mt-10 space-y-9">
              {blocks.map((b, i) => (
                <div key={b.heading}>
                  <h2 className="text-[1.25rem] font-bold text-ink">
                    {i + 1}. {b.heading}
                  </h2>
                  {b.paras.map((p, j) => (
                    <p key={j} className="mt-3 text-[15px] leading-relaxed text-slate">
                      {p}
                    </p>
                  ))}
                  {b.bullets && (
                    <ul className="mt-3 space-y-2">
                      {b.bullets.map((bul, k) => (
                        <li key={k} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                          <span>{bul}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {footnote && (
              <div className="mt-12 rounded-xl2 border border-mist bg-paper p-6 text-[14px] leading-relaxed text-slate">
                {footnote}
              </div>
            )}

            <div className="mt-10 border-t border-mist pt-6 text-[14px] leading-relaxed text-slate">
              Questions about this policy? Contact us at{" "}
              <a href={`mailto:${company.email}`} className="font-semibold text-emerald-deep underline">
                {company.email}
              </a>
              , or by post at {company.legalEntity}, {company.addressLine1}, {company.addressLine2}.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

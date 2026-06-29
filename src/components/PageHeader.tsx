import Link from "next/link";
import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  intro,
  cta = true,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  cta?: boolean;
}) {
  return (
    <section className="section-navy">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-texture" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-navy-glow" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-emerald/20 blur-[120px]"
      />
      <div className="container-x relative z-10 py-16 lg:py-24">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[13px] text-white/65">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span aria-hidden="true" className="text-white/30">/</span>
          <span className="text-white/80">{eyebrow}</span>
        </nav>
        <span className="eyebrow-light">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden="true" />
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl text-balance text-[2.4rem] font-extrabold leading-[1.06] sm:text-[3rem] lg:text-[3.5rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/80">{intro}</p>
        )}
        {cta && (
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/checkout?service=llc-ein-itin" className="btn-primary w-full sm:w-auto">
              Get started
            </Link>
            <Link href="/pricing" className="btn-ghost-light w-full sm:w-auto">
              See pricing
            </Link>
            <span className="secure-note-dark mt-1 sm:mt-0 sm:ml-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              Secure checkout
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

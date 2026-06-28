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
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="grid-texture absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-emerald/20 blur-[120px]"
        aria-hidden="true"
      />
      <div className="container-x relative py-16 lg:py-24">
        <nav className="mb-5 flex items-center gap-2 text-[13px] text-white/45">
          <Link href="/" className="transition-colors hover:text-white/80">
            Home
          </Link>
          <span>/</span>
          <span className="text-white/70">{eyebrow}</span>
        </nav>
        <span className="eyebrow text-emerald-tint">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald" />
          {eyebrow}
        </span>
        <h1 className="mt-3 max-w-3xl text-balance text-[2.2rem] font-extrabold leading-[1.08] sm:text-[3rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65">{intro}</p>
        )}
        {cta && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/apply?service=llc-ein-itin" className="btn-primary">
              Get started
            </Link>
            <Link href="/pricing" className="btn-ghost-light">
              See pricing
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

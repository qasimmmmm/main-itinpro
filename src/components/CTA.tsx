import Link from "next/link";
import Reveal from "./Reveal";
import { company } from "@/lib/content";

export default function CTA() {
  const wa = `https://wa.me/${company.whatsappE164}?text=${encodeURIComponent(
    "Hi ITIN-Pro, I'd like to get started with my US business setup."
  )}`;

  return (
    <section className="bg-paper py-section-tight lg:py-20">
      <div className="container-x">
        <Reveal>
          <div className="panel-navy section-navy px-8 py-14 text-center lg:px-16 lg:py-20">
            {/* atmosphere */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-texture" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-navy-glow" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald/20 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden="true" />
                Ready when you are
              </span>
              <h2 className="mx-auto mt-5 max-w-2xl text-balance text-[2rem] font-extrabold leading-[1.12] text-white sm:text-[2.6rem]">
                Launch your US business and start getting paid
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-white/80">
                Your ITIN, LLC and EIN — handled by Certifying Acceptance Agents, 100% online, with
                a money-back guarantee. No US travel, no mailing originals.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/checkout?service=llc-ein-itin" className="btn-primary w-full sm:w-auto">
                  Get started now
                </Link>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-light w-full sm:w-auto"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="mt-6 flex justify-center">
                <span className="secure-note-dark">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                  Secure checkout
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

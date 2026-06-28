import Link from "next/link";
import Reveal from "./Reveal";
import { company } from "@/lib/content";

export default function CTA() {
  const wa = `https://wa.me/${company.whatsappE164}?text=${encodeURIComponent(
    "Hi ITIN-Pro, I'd like to get started with my US business setup."
  )}`;

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-ink px-8 py-14 text-center lg:px-16 lg:py-20">
            {/* subtle decorative grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                Ready when you are
              </span>
              <h2 className="mx-auto mt-5 max-w-2xl text-balance text-[2rem] font-extrabold leading-[1.12] text-white sm:text-[2.6rem]">
                Launch your US business and start getting paid
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-white/65">
                Your ITIN, LLC and EIN — handled by Certifying Acceptance Agents, 100% online, with
                a money-back guarantee. No US travel, no mailing originals.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/apply?service=llc-ein-itin" className="btn-primary w-full sm:w-auto">
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
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

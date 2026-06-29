import Link from "next/link";
import Logo from "./Logo";
import CardLogos from "./CardLogos";
import { company } from "@/lib/content";

const cols = [
  {
    title: "Services",
    links: [
      { label: "ITIN Application", href: "/services/itin" },
      { label: "US LLC + EIN", href: "/services/llc" },
      { label: "EIN Application", href: "/services/ein" },
      { label: "Complete package", href: "/services/llc-ein-itin" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "How it works", href: "/#process" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Apply now", href: "/apply" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

export default function Footer() {
  const wa = `https://wa.me/${company.whatsappE164}`;
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-navy-glow opacity-60" />
      <div className="container-x relative z-10 pb-12 pt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-6">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              ITIN, US LLC and EIN services for non-residents — prepared and
              certified by IRS Certifying Acceptance Agents, 100% online.
            </p>

            {/* IRS-CAA credential line */}
            <p className="badge-seal mt-5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              IRS Certifying Acceptance Agent
            </p>

            <div className="mt-6 space-y-2 text-sm text-white/70">
              <p className="font-semibold text-white">{company.legalEntity}</p>
              <p className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-tint">
                  <path d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>
                  {company.addressLine1}
                  <br />
                  {company.addressLine2}
                </span>
              </p>
              <p>
                <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-emerald-tint">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  {company.email}
                </a>
              </p>
              <p>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0 text-emerald-tint">
                    <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.05-1.36A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.2c-1.62 0-3.13-.44-4.43-1.2l-.32-.19-2.99.81.8-2.92-.21-.33A8.16 8.16 0 0 1 3.8 12c0-4.52 3.68-8.2 8.2-8.2 4.52 0 8.2 3.68 8.2 8.2 0 4.52-3.68 8.2-8.2 8.2z" />
                  </svg>
                  WhatsApp {company.whatsappDisplay}
                </a>
              </p>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mandatory compliance disclaimer */}
        <div className="mt-14 rounded-xl2 border border-white/10 bg-white/[0.03] p-6 text-[13px] leading-relaxed text-white/70">
          <p>
            <strong className="font-semibold text-white">Disclaimer:</strong> This website is
            operated by {company.legalEntity}, a private third-party agency. We are
            not affiliated with, nor endorsed by, the Internal Revenue Service
            (IRS), the U.S. Department of the Treasury, or any other United States
            government agency. We charge a service fee for professional review,
            application assistance, and submission support for Individual Taxpayer
            Identification Number (ITIN) applications, US company formation, and
            related services. ITIN applications can be submitted directly for FREE
            (excluding any applicable government requirements) through the official
            IRS website at{" "}
            <a
              href="https://www.irs.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              irs.gov
            </a>
            .
          </p>
        </div>

        <div className="divider-light mt-8 flex flex-col items-start justify-between gap-5 pt-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <CardLogos />
            <p className="secure-note-dark">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              Secure SSL checkout
            </p>
          </div>
          <p className="text-sm text-white/65">
            © {new Date().getFullYear()} {company.legalEntity}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

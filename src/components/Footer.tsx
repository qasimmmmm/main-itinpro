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
    <footer className="bg-ink text-white">
      <div className="container-x py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              ITIN, US LLC and EIN services for non-residents — prepared and
              certified by IRS Certifying Acceptance Agents, 100% online.
            </p>
            <div className="mt-5 space-y-1 text-sm text-white/60">
              <p className="font-semibold text-white/80">{company.legalEntity}</p>
              <p>{company.addressLine1}</p>
              <p>{company.addressLine2}</p>
              <p>
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </p>
              <p>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp {company.whatsappDisplay}
                </a>
              </p>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="md:col-span-1">
              <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
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
        <div className="mt-14 rounded-xl2 border border-white/10 bg-white/[0.03] p-6 text-[13px] leading-relaxed text-white/55">
          <p>
            <strong className="text-white/70">Disclaimer:</strong> This website is
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

        <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <CardLogos />
            <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              Secure SSL checkout
            </p>
          </div>
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} {company.legalEntity}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

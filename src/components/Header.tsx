"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { company } from "@/lib/content";

const nav = [
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const wa = `https://wa.me/${company.whatsappE164}`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-mist bg-white/95 shadow-[0_1px_0_rgba(11,34,56,0.04)] backdrop-blur-md"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[15px] font-medium text-slate transition-colors hover:bg-ink/[0.04] hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[15px] font-semibold text-ink transition-colors hover:text-emerald-deep"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.05-1.36A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.2c-1.62 0-3.13-.44-4.43-1.2l-.32-.19-2.99.81.8-2.92-.21-.33A8.16 8.16 0 0 1 3.8 12c0-4.52 3.68-8.2 8.2-8.2 4.52 0 8.2 3.68 8.2 8.2 0 4.52-3.68 8.2-8.2 8.2z" />
            </svg>
            WhatsApp
          </a>
          <Link href="/apply" className="btn-primary !py-2.5 !px-5">
            Apply now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-mist bg-white lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-5 flex-col gap-[5px]">
            <span
              className={`h-[2px] w-full rounded bg-ink transition-all duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full rounded bg-ink transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full rounded bg-ink transition-all duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-16 z-40 overflow-y-auto bg-paper transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="container-x flex flex-col pt-2">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="divider flex items-center justify-between py-4 text-lg font-semibold text-ink transition-colors first:border-t-0 hover:text-emerald-deep"
            >
              {item.label}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-slate">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          ))}
          <div className="mt-7 flex flex-col gap-3">
            <Link
              href="/apply"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Apply now
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full"
              onClick={() => setOpen(false)}
            >
              Chat on WhatsApp
            </a>
          </div>
          <p className="secure-note mt-6 justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            IRS Certifying Acceptance Agents
          </p>
        </div>
      </div>
    </header>
  );
}

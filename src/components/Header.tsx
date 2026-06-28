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
          ? "border-b border-mist bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[15px] font-medium text-slate transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-semibold text-ink transition-colors hover:text-emerald"
          >
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
        className={`fixed inset-0 top-16 z-40 bg-paper transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="container-x flex flex-col gap-1 pt-6">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-mist py-4 text-lg font-semibold text-ink"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
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
        </div>
      </div>
    </header>
  );
}

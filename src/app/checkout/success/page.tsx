"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { company } from "@/lib/content";
import { formatUSD } from "@/lib/money";

function SuccessInner() {
  const params = useSearchParams();
  // These come from the URL and are display-only — sanitize so a crafted link
  // can't render arbitrary markup/values as an official-looking receipt.
  const tx = (params.get("tx") || "").replace(/[^A-Za-z0-9-]/g, "").slice(0, 40);
  const amtNum = Number(params.get("amt"));
  const amt = Number.isFinite(amtNum) && amtNum > 0 ? formatUSD(amtNum) : "";

  const wa = `https://wa.me/${company.whatsappE164}?text=${encodeURIComponent(
    `Hi ITIN-Pro, I just completed my order${tx ? ` (ref ${tx})` : ""} and I'm ready to start onboarding.`
  )}`;

  return (
    <div className="mx-auto max-w-xl text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-tint">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12l5 5 9-11" stroke="#0B7A55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-6 text-[2rem] font-extrabold leading-tight text-ink">Payment received 🎉</h1>
      <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-slate">
        Thank you — your order is confirmed. A receipt is on its way to your email, and a
        specialist will reach out shortly to begin your onboarding.
      </p>

      <div className="mt-7 rounded-xl2 border border-mist bg-paper p-6 text-left">
        <div className="flex items-center justify-between border-b border-mist pb-3">
          <span className="text-[13px] font-semibold uppercase tracking-wide text-slate">Order reference</span>
          <span className="font-mono text-[14px] font-semibold text-ink">{tx || "—"}</span>
        </div>
        {amt && (
          <div className="flex items-center justify-between pt-3">
            <span className="text-[13px] font-semibold uppercase tracking-wide text-slate">Amount paid</span>
            <span className="font-mono text-[14px] font-semibold text-ink">{amt}</span>
          </div>
        )}
      </div>

      <div className="mt-7 rounded-xl2 bg-ink p-6 text-left">
        <h2 className="text-[15px] font-bold text-white">What happens next</h2>
        <ol className="mt-4 space-y-3">
          {[
            "We email your receipt and a short onboarding form to collect the details we need.",
            "Our Certifying Acceptance Agents prepare your documents and send them for your e-signature.",
            "We file with the IRS and state, then track everything through to issuance.",
          ].map((t, i) => (
            <li key={i} className="flex gap-3 text-[14px] text-white/80">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald text-[12px] font-bold text-white">
                {i + 1}
              </span>
              {t}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Start onboarding on WhatsApp
        </a>
        <Link href="/" className="btn-ink">
          Back to home
        </Link>
      </div>

      <p className="mt-6 text-[13px] text-slate">
        Need help? Email{" "}
        <a href={`mailto:${company.email}`} className="font-semibold text-emerald-deep underline">
          {company.email}
        </a>
      </p>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-x">
        <Suspense fallback={<div className="py-16 text-center text-slate">Loading…</div>}>
          <SuccessInner />
        </Suspense>
      </div>
    </section>
  );
}

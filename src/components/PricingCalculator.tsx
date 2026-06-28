"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { STATE_FEES } from "@/lib/states";
import { pricing } from "@/lib/content";

export default function PricingCalculator() {
  const popular = STATE_FEES.filter((s) => s.popular);
  const [state, setState] = useState(popular[0].name);

  const selected = useMemo(
    () => STATE_FEES.find((s) => s.name === state) || STATE_FEES[0],
    [state]
  );
  const total = pricing.llc.price + selected.fee;

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-mist bg-paper px-6 py-5 sm:px-8">
        <h3 className="text-lg font-bold text-ink">
          See your all-in price before you pay
        </h3>
        <p className="mt-1 text-sm text-slate">
          No fees hidden in a dropdown. Pick your state and we&apos;ll show the
          full LLC + EIN + Address cost.
        </p>
      </div>

      <div className="grid gap-0 sm:grid-cols-[1fr_auto]">
        <div className="px-6 py-6 sm:px-8">
          <label
            htmlFor="state"
            className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-slate"
          >
            Formation state
          </label>
          <div className="relative mt-2">
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full appearance-none rounded-xl border border-mist bg-white px-4 py-3 pr-10 text-[15px] font-medium text-ink outline-none transition-colors focus:border-emerald"
            >
              <optgroup label="Popular for non-residents">
                {popular.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} {s.fee === 0 ? "(no state fee)" : `(+$${s.fee})`}
                  </option>
                ))}
              </optgroup>
              <optgroup label="All states">
                {STATE_FEES.filter((s) => !s.popular).map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} {s.fee === 0 ? "(no state fee)" : `(+$${s.fee})`}
                  </option>
                ))}
              </optgroup>
            </select>
            <svg
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <dl className="mt-6 space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-slate">LLC + EIN + Business Address</dt>
              <dd className="font-mono font-medium text-ink">${pricing.llc.price}</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-slate">{selected.name} state fee</dt>
              <dd className="font-mono font-medium text-ink">
                {selected.fee === 0 ? "$0" : `+$${selected.fee}`}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-mist pt-2.5 text-sm text-slate">
              <dt>Typical filing time</dt>
              <dd className="font-medium text-ink">~{selected.days} business days</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col justify-center border-t border-mist bg-emerald-tint/60 px-6 py-6 sm:min-w-[260px] sm:border-l sm:border-t-0 sm:px-8">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-deep">
            Total today
          </p>
          <p className="mt-1 font-display text-4xl font-extrabold text-ink">
            ${total}
          </p>
          <p className="mt-1 text-[13px] text-slate">
            Renews at ${pricing.llc.renewal}/yr for the agent &amp; address.
          </p>
          <Link href="/checkout?service=llc" className="btn-primary mt-4 w-full">
            Form my LLC →
          </Link>
          <p className="mt-3 text-center text-[12px] text-slate">
            Need a Tax ID too?{" "}
            <Link href="/checkout?service=llc-ein-itin" className="link-underline">
              Add ITIN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

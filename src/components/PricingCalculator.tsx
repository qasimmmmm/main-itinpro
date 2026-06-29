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
    <div className="surface overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-mist bg-paper px-6 py-5 sm:px-8">
        <div>
          <h3 className="text-lg font-bold text-ink">
            See your all-in price before you pay
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate">
            No fees hidden in a dropdown. Pick your state and we&apos;ll show the
            full LLC + EIN + Address cost.
          </p>
        </div>
        <span className="secure-note shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Transparent pricing
        </span>
      </div>

      <div className="grid gap-0 sm:grid-cols-[1fr_auto]">
        <div className="px-6 py-6 sm:px-8">
          <label
            htmlFor="pc-state"
            className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-slate"
          >
            Formation state
          </label>
          <div className="relative mt-2">
            <select
              id="pc-state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="min-h-[44px] w-full appearance-none rounded-xl border border-mist bg-white px-4 py-3 pr-10 text-base font-medium text-ink outline-none transition-colors hover:border-ink/30 focus:border-emerald"
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
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="mt-2 text-[12px] leading-snug text-slate">
            The state fee is the government&apos;s charge — we pass it through at
            cost, never marked up.
          </p>

          <dl className="mt-6 space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-slate">LLC + EIN + Business Address</dt>
              <dd className="font-mono font-medium text-ink">
                ${pricing.llc.price}
              </dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-slate">{selected.name} state fee</dt>
              <dd className="font-mono font-medium text-ink">
                {selected.fee === 0 ? "$0" : `+$${selected.fee}`}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-mist pt-2.5 text-sm text-slate">
              <dt>Typical filing time</dt>
              <dd className="font-medium text-ink">
                ~{selected.days} business days
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative flex flex-col justify-center overflow-hidden border-t border-mist bg-emerald-tint px-6 py-7 sm:min-w-[272px] sm:border-l sm:border-t-0 sm:px-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-emerald/10 blur-2xl"
          />
          <div className="relative">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-deep">
              Total today
            </p>
            <p className="mt-1 font-display text-4xl font-extrabold leading-none text-ink">
              ${total}
            </p>
            <p className="mt-2 text-[13px] leading-snug text-slate">
              Renews at ${pricing.llc.renewal}/yr for the agent &amp; address.
            </p>
            <Link
              href="/checkout?service=llc"
              className="btn-primary mt-5 w-full bg-emerald-deep hover:bg-ink"
            >
              Form my LLC →
            </Link>
            <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[12px] font-medium text-emerald-deep">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              110% money-back guarantee
            </p>
            <p className="mt-3 text-center text-[12px] text-slate">
              Need a Tax ID too?{" "}
              <Link
                href="/checkout?service=llc-ein-itin"
                className="link-underline"
              >
                Add ITIN
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

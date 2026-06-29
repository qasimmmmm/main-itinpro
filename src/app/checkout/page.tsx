"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import {
  computeOrder,
  addOnsFor,
  baseFor,
  SLUG_TO_KEY,
  COUNTRIES,
} from "@/lib/checkout";
import { STATE_FEES } from "@/lib/states";
import { company, googleAdsId } from "@/lib/content";
import { RESTRICTED } from "@/lib/geo";
import { formatUSD } from "@/lib/money";

const TOKEN_KEY = process.env.NEXT_PUBLIC_NMI_TOKENIZATION_KEY || "";
const GATEWAY = process.env.NEXT_PUBLIC_NMI_GATEWAY_URL || "https://secure.nmi.com";

declare global {
  interface Window {
    CollectJS?: any;
    gtag?: (...args: any[]) => void;
  }
}

const inputCls =
  "w-full rounded-lg border border-mist bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-slate/55 focus:border-emerald focus:ring-2 focus:ring-emerald/15";
const labelCls = "mb-1.5 block text-[13px] font-semibold text-ink";

function SectionTitle({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-2.5 text-[16px] font-bold text-ink">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[12px] font-bold text-white">
        {n}
      </span>
      {children}
    </h2>
  );
}

function CheckoutInner() {
  const params = useSearchParams();
  const router = useRouter();

  const rawSlug = params.get("service") || "llc-ein-itin";
  const serviceSlug = SLUG_TO_KEY[rawSlug] ? rawSlug : "llc-ein-itin";
  const serviceKey = SLUG_TO_KEY[serviceSlug];
  const base = baseFor(serviceKey);
  const availableAddOns = useMemo(() => addOnsFor(serviceKey), [serviceKey]);
  const popularStates = useMemo(() => STATE_FEES.filter((s) => s.popular), []);

  const [stateName, setStateName] = useState(popularStates[0]?.name || STATE_FEES[0].name);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
  });
  const [billing, setBilling] = useState({
    address1: "",
    city: "",
    state: "",
    zip: "",
    country: "PK",
  });
  const [nameOnCard, setNameOnCard] = useState("");

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [collectReady, setCollectReady] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const chargeRef = useRef<((token: string) => void) | null>(null);
  // Per-attempt idempotency key (stable across an ambiguous retry, rotated after a
  // definitive decline), a guard so Collect.js is configured exactly once, and a
  // flag tracking whether a payment request is mid-flight.
  const idemRef = useRef("");
  const configuredRef = useRef(false);
  const inFlightRef = useRef(false);

  // Country from the middleware-set cookie, used to block sanctioned geographies
  // client-side (the server check is authoritative).
  const [ipCountry, setIpCountry] = useState("");
  useEffect(() => {
    const m =
      typeof document !== "undefined" && document.cookie.match(/(?:^|;\s*)user-country=([^;]+)/);
    if (m) setIpCountry(decodeURIComponent(m[1]).toUpperCase());
  }, []);
  const restricted = RESTRICTED.has(ipCountry) || RESTRICTED.has((billing.country || "").toUpperCase());

  const order = useMemo(
    () =>
      computeOrder({
        serviceSlug,
        stateName: base.hasStateFee ? stateName : undefined,
        addOnIds,
      }),
    [serviceSlug, stateName, addOnIds, base.hasStateFee]
  );

  // Configure Collect.js once the script is ready.
  useEffect(() => {
    if (!scriptLoaded || !TOKEN_KEY || !window.CollectJS) return;
    // Configure exactly once (React 18 StrictMode runs effects twice in dev, and
    // re-configuring already-mounted iframes throws).
    if (configuredRef.current) return;
    configuredRef.current = true;
    try {
      window.CollectJS.configure({
        variant: "inline",
        styleSniffer: false,
        fields: {
          ccnumber: { selector: "#cc-number", placeholder: "1234 5678 9012 3456" },
          ccexp: { selector: "#cc-exp", placeholder: "MM / YY" },
          cvv: { selector: "#cc-cvv", placeholder: "CVV" },
        },
        customCss: {
          color: "#0B2238",
          "font-size": "15px",
          "font-family": "Inter, system-ui, sans-serif",
        },
        placeholderCss: { color: "#94a3ac" },
        invalidCss: { color: "#b91c1c" },
        focusCss: { color: "#0B2238" },
        timeoutDuration: 10000,
        timeoutCallback: () => {
          inFlightRef.current = false;
          setProcessing(false);
          setError("Please double-check your card number, expiry date and CVV.");
        },
        // Fires when a hosted field's validity changes. Critically, when the user
        // presses Pay with empty/invalid card fields, Collect.js validates and
        // short-circuits WITHOUT firing callback or timeoutCallback — so without
        // this, the button would be stuck on "Processing…" forever.
        validationCallback: (_field: string, status: boolean, message: string) => {
          if (inFlightRef.current && !status) {
            inFlightRef.current = false;
            setProcessing(false);
            setError(message ? `Please check your card details: ${message}` : "Please check your card number, expiry date and CVV.");
          }
        },
        fieldsAvailableCallback: () => setCollectReady(true),
        callback: (response: any) => {
          inFlightRef.current = false;
          if (response?.token && chargeRef.current) {
            chargeRef.current(response.token);
          } else {
            setProcessing(false);
            setError("Your card couldn't be validated. Please check the details and try again.");
          }
        },
      });
    } catch (err) {
      // A real configure failure leaves the card fields stuck on "Loading…" — make
      // it observable instead of swallowing it silently.
      console.error("[checkout] Collect.js configure failed", err);
    }
  }, [scriptLoaded]);

  function toggleAddOn(id: string) {
    setAddOnIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const detailsValid =
    customer.firstName.trim() &&
    customer.lastName.trim() &&
    customer.email.trim() &&
    customer.country.trim() &&
    billing.address1.trim() &&
    billing.city.trim() &&
    billing.zip.trim() &&
    nameOnCard.trim();

  const configured = Boolean(TOKEN_KEY);

  function handlePay() {
    setError("");
    if (!configured) {
      setError("The payment gateway isn't configured yet.");
      return;
    }
    if (restricted) {
      setError("We're unable to process payments for your country due to US sanctions. Please contact us first.");
      return;
    }
    if (!detailsValid) {
      setError("Please complete your contact, billing and cardholder details.");
      return;
    }
    if (!collectReady || !window.CollectJS) {
      setError("Card fields are still loading — please wait a moment and try again.");
      return;
    }

    // One idempotency key per attempt; (re)generate only when starting a fresh one.
    if (!idemRef.current) {
      idemRef.current =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    }

    inFlightRef.current = true;
    setProcessing(true);
    chargeRef.current = async (token: string) => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payment_token: token,
            idempotencyKey: idemRef.current,
            serviceSlug,
            stateName: base.hasStateFee ? stateName : undefined,
            addOnIds,
            customer,
            billing,
          }),
        });
        const data = await res.json();
        if (data.success) {
          // Only fire the conversion with a real transaction id so Google can
          // de-duplicate it.
          if (typeof window !== "undefined" && window.gtag && data.transactionId) {
            window.gtag("event", "conversion", {
              send_to: googleAdsId,
              value: data.amount,
              currency: "USD",
              transaction_id: data.transactionId,
            });
            window.gtag("event", "purchase", {
              value: data.amount,
              currency: "USD",
              transaction_id: data.transactionId,
            });
          }
          router.push(
            `/checkout/success?tx=${encodeURIComponent(data.transactionId || "")}&amt=${data.amount}`
          );
        } else {
          // Definitive decline — rotate the key so the next attempt is a new charge.
          idemRef.current = "";
          inFlightRef.current = false;
          setProcessing(false);
          setError(data.message || "Your payment was declined. Please try a different card.");
        }
      } catch {
        // Ambiguous failure — KEEP the key so a retry de-duplicates instead of
        // risking a double charge.
        inFlightRef.current = false;
        setProcessing(false);
        setError("We couldn't complete the payment. Please try again.");
      }
    };

    try {
      window.CollectJS.startPaymentRequest();
    } catch {
      inFlightRef.current = false;
      setProcessing(false);
      setError("Something went wrong starting the payment. Please refresh and try again.");
    }
  }

  const wa = `https://wa.me/${company.whatsappE164}?text=${encodeURIComponent(
    "Hi ITIN-Pro, I have a question about checkout."
  )}`;

  return (
    <>
      {configured && (
        <Script
          src={`${GATEWAY}/token/Collect.js`}
          data-tokenization-key={TOKEN_KEY}
          strategy="afterInteractive"
          onLoad={() => setScriptLoaded(true)}
        />
      )}

      <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* LEFT: configurator + payment. The fieldset disables every input while a
            charge is in flight, so the on-screen total can never diverge from the
            amount actually being charged. */}
        <fieldset disabled={processing} className="m-0 min-w-0 space-y-6 border-0 p-0 disabled:opacity-100">
          {!configured && (
            <div className="rounded-xl2 border border-gold/40 bg-gold-soft/40 p-5 text-[14px] leading-relaxed text-ink">
              <strong className="font-semibold">Setup needed:</strong> add your NMI keys
              (<code className="font-mono text-[13px]">NEXT_PUBLIC_NMI_TOKENIZATION_KEY</code> and{" "}
              <code className="font-mono text-[13px]">NMI_SECURITY_KEY</code>) to enable live card
              payments. See <span className="font-semibold">CHECKOUT-SETUP.md</span>. Everything else
              on this page already works.
            </div>
          )}

          {restricted && (
            <div className="rounded-xl2 border border-gold/40 bg-gold-soft/40 p-5 text-[14px] leading-relaxed text-ink">
              <strong className="font-semibold">We may be unable to serve your country.</strong> Due
              to US sanctions we can&apos;t process this payment automatically. Please{" "}
              <a href={wa} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-deep underline">
                message us on WhatsApp
              </a>{" "}
              and we&apos;ll confirm your eligibility before any payment.
            </div>
          )}

          {/* Your order */}
          <div className="card p-6 lg:p-7">
            <SectionTitle n={1}>Your order</SectionTitle>
            <div className="flex items-start justify-between gap-4 rounded-lg bg-paper p-4">
              <div>
                <p className="text-[15px] font-bold text-ink">{base.label}</p>
                <p className="mt-0.5 text-[13px] text-slate">
                  {serviceKey === "itin"
                    ? "Your US Tax ID, prepared and certified by a CAA."
                    : serviceKey === "llc"
                    ? "A real US company with EIN and business address."
                    : "Company, EIN, ITIN and address — the complete setup."}
                </p>
              </div>
              <span className="font-mono text-[15px] font-semibold text-ink">{formatUSD(base.amount)}</span>
            </div>

            {base.hasStateFee && (
              <div className="mt-5">
                <label className={labelCls} htmlFor="state">
                  State of formation
                </label>
                <select
                  id="state"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className={inputCls}
                >
                  <optgroup label="Popular for non-residents">
                    {popularStates.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name} — {s.fee === 0 ? "no state fee" : `+$${s.fee}`} · ~{s.days}{" "}
                        {s.days === 1 ? "day" : "days"}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="All states">
                    {STATE_FEES.filter((s) => !s.popular).map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name} — {s.fee === 0 ? "no state fee" : `+$${s.fee}`} · ~{s.days}{" "}
                        {s.days === 1 ? "day" : "days"}
                      </option>
                    ))}
                  </optgroup>
                </select>
                <p className="mt-1.5 text-[12px] text-slate">
                  The state sets this filing fee — it&apos;s added to your total below.
                </p>
              </div>
            )}
          </div>

          {/* Add-ons */}
          {availableAddOns.length > 0 && (
            <div className="card p-6 lg:p-7">
              <SectionTitle n={2}>Recommended add-ons</SectionTitle>
              <div className="space-y-3">
                {availableAddOns.map((a) => {
                  const checked = addOnIds.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      role="checkbox"
                      aria-checked={checked}
                      aria-label={`${a.name} — adds ${formatUSD(a.price)}`}
                      onClick={() => toggleAddOn(a.id)}
                      className={`flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition-all ${
                        checked
                          ? "border-emerald bg-emerald-tint/40 ring-1 ring-emerald/30"
                          : "border-mist bg-white hover:border-emerald/40"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                          checked ? "border-emerald bg-emerald" : "border-slate/40 bg-white"
                        }`}
                      >
                        {checked && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12l5 5 9-11" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-[14px] font-semibold text-ink">{a.name}</span>
                          {a.badge && (
                            <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[10px] font-semibold text-gold">
                              {a.badge}
                            </span>
                          )}
                        </span>
                        <span className="mt-1 block text-[13px] leading-snug text-slate">
                          {a.description}
                        </span>
                      </span>
                      <span className="shrink-0 font-mono text-[14px] font-semibold text-emerald-deep">
                        +${a.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Contact details */}
          <div className="card p-6 lg:p-7">
            <SectionTitle n={availableAddOns.length > 0 ? 3 : 2}>Contact details</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="fn">First name</label>
                <input id="fn" className={inputCls} value={customer.firstName}
                  onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })} placeholder="First name" />
              </div>
              <div>
                <label className={labelCls} htmlFor="ln">Last name</label>
                <input id="ln" className={inputCls} value={customer.lastName}
                  onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })} placeholder="Last name" />
              </div>
              <div>
                <label className={labelCls} htmlFor="em">Email</label>
                <input id="em" type="email" className={inputCls} value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="you@email.com" />
              </div>
              <div>
                <label className={labelCls} htmlFor="ph">WhatsApp / phone</label>
                <input id="ph" className={inputCls} value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="+__ ___ _______" />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="ct">Country of residence</label>
                <input id="ct" className={inputCls} value={customer.country}
                  onChange={(e) => setCustomer({ ...customer, country: e.target.value })} placeholder="Where you live" />
              </div>
            </div>
          </div>

          {/* Billing + card */}
          <div className="card p-6 lg:p-7">
            <SectionTitle n={availableAddOns.length > 0 ? 4 : 3}>Billing &amp; payment</SectionTitle>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="ad">Billing address</label>
                <input id="ad" className={inputCls} value={billing.address1}
                  onChange={(e) => setBilling({ ...billing, address1: e.target.value })} placeholder="Street address" />
              </div>
              <div>
                <label className={labelCls} htmlFor="cy">City</label>
                <input id="cy" className={inputCls} value={billing.city}
                  onChange={(e) => setBilling({ ...billing, city: e.target.value })} placeholder="City" />
              </div>
              <div>
                <label className={labelCls} htmlFor="zp">ZIP / postal code</label>
                <input id="zp" className={inputCls} value={billing.zip}
                  onChange={(e) => setBilling({ ...billing, zip: e.target.value })} placeholder="ZIP / postal" />
              </div>
              <div>
                <label className={labelCls} htmlFor="bs">State / province</label>
                <input id="bs" className={inputCls} value={billing.state}
                  onChange={(e) => setBilling({ ...billing, state: e.target.value })} placeholder="State / province" />
              </div>
              <div>
                <label className={labelCls} htmlFor="bc">Billing country</label>
                <select id="bc" className={inputCls} value={billing.country}
                  onChange={(e) => setBilling({ ...billing, country: e.target.value })}>
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className={labelCls} htmlFor="noc">Name on card</label>
              <input id="noc" className={inputCls} value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)} placeholder="Exactly as printed on the card" />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-[1.5fr_1fr_1fr]">
              <div className="sm:col-span-3">
                <label className={labelCls}>Card number</label>
                <div id="cc-number" className={`${inputCls} flex items-center !py-0 h-[46px]`} />
              </div>
              <div>
                <label className={labelCls}>Expiry</label>
                <div id="cc-exp" className={`${inputCls} flex items-center !py-0 h-[46px]`} />
              </div>
              <div>
                <label className={labelCls}>CVV</label>
                <div id="cc-cvv" className={`${inputCls} flex items-center !py-0 h-[46px]`} />
              </div>
              {configured && !collectReady && (
                <p className="sm:col-span-3 text-[12px] text-slate">Loading secure card fields…</p>
              )}
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
                {error}
              </div>
            )}

            <button
              onClick={handlePay}
              disabled={processing || !configured || restricted}
              className="btn-primary mt-5 w-full justify-center text-[15px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {processing ? "Processing…" : `Pay ${formatUSD(order.total)} securely`}
            </button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] text-slate">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" stroke="#566571" strokeWidth="1.7" />
                <path d="M8 11V8a4 4 0 018 0v3" stroke="#566571" strokeWidth="1.7" />
              </svg>
              Card details are encrypted and processed securely. We never see or store your full card number.
            </p>
          </div>
        </fieldset>

        {/* RIGHT: order summary */}
        <div className="lg:sticky lg:top-24">
          <div className="card overflow-hidden">
            <div className="border-b border-mist bg-paper px-6 py-5">
              <h3 className="text-[15px] font-bold text-ink">Order summary</h3>
            </div>
            <div className="px-6 py-5">
              <ul className="space-y-3">
                {order.lines.map((l) => (
                  <li key={l.id} className="flex items-start justify-between gap-3 text-[14px]">
                    <span className="text-ink/80">{l.label}</span>
                    <span className="shrink-0 font-mono font-medium text-ink">
                      {formatUSD(l.amount)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between border-t border-mist pt-4">
                <span className="text-[15px] font-bold text-ink">Total due today</span>
                <span className="font-display text-2xl font-extrabold text-ink">{formatUSD(order.total)}</span>
              </div>
            </div>

            <div className="space-y-3 border-t border-mist px-6 py-5">
              <div className="flex items-center gap-2 text-[13px] text-slate">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" stroke="#0F9D6E" strokeWidth="1.7" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" stroke="#0F9D6E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                110% money-back guarantee on your ITIN
              </div>
              <div className="flex items-center gap-2 text-[13px] text-slate">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="5" y="11" width="14" height="9" rx="2" stroke="#566571" strokeWidth="1.7" />
                  <path d="M8 11V8a4 4 0 018 0v3" stroke="#566571" strokeWidth="1.7" />
                </svg>
                256-bit SSL encrypted checkout
              </div>
              <div className="flex items-center gap-2 pt-1">
                <CardMarks />
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[13px] text-slate">
            Questions before paying?{" "}
            <a href={wa} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-deep underline">
              Chat on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

// Small inline card-brand marks (accepted payment methods).
function CardMarks() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex h-6 w-9 items-center justify-center rounded border border-mist bg-white text-[9px] font-extrabold italic tracking-tight text-[#1A1F71]">
        VISA
      </span>
      <span className="flex h-6 w-9 items-center justify-center rounded border border-mist bg-white">
        <span className="relative flex">
          <span className="h-3 w-3 rounded-full bg-[#EB001B]" />
          <span className="-ml-1.5 h-3 w-3 rounded-full bg-[#F79E1B] opacity-90" />
        </span>
      </span>
      <span className="flex h-6 w-9 items-center justify-center rounded border border-mist bg-[#1F72CD] text-[7px] font-bold text-white">
        AMEX
      </span>
      <span className="flex h-6 w-9 items-center justify-center rounded border border-mist bg-white text-[7px] font-bold text-[#FF6000]">
        DISC<span className="text-ink">OVER</span>
      </span>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <section className="bg-paper py-12 lg:py-16">
      <div className="container-x">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className="text-[13px] font-semibold text-slate transition-colors hover:text-ink">
              ← Back to site
            </Link>
            <h1 className="mt-2 text-[1.9rem] font-extrabold leading-tight text-ink sm:text-[2.3rem]">
              Secure checkout
            </h1>
          </div>
          <p className="flex items-center gap-2 text-[13px] font-medium text-slate">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="5" y="11" width="14" height="9" rx="2" stroke="#0F9D6E" strokeWidth="1.8" />
              <path d="M8 11V8a4 4 0 018 0v3" stroke="#0F9D6E" strokeWidth="1.8" />
            </svg>
            Encrypted &amp; PCI-compliant payment
          </p>
        </div>

        <Suspense fallback={<div className="py-16 text-center text-slate">Loading checkout…</div>}>
          <CheckoutInner />
        </Suspense>
      </div>
    </section>
  );
}

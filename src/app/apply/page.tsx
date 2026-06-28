"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { company, services, googleAdsId } from "@/lib/content";

const SERVICE_OPTIONS = [
  { slug: "llc-ein-itin", label: "Complete package — LLC + EIN + ITIN ($646 + state fee)" },
  { slug: "llc", label: "US LLC + EIN + Business Address ($298 + state fee)" },
  { slug: "itin", label: "ITIN Application ($348)" },
  { slug: "ein", label: "EIN only (with my existing company)" },
  { slug: "not-sure", label: "I'm not sure yet — help me choose" },
];

function labelForSlug(slug: string) {
  return SERVICE_OPTIONS.find((s) => s.slug === slug)?.label || SERVICE_OPTIONS[0].label;
}

function ApplyForm() {
  const params = useSearchParams();
  const initial = params.get("service") || "llc-ein-itin";
  const validInitial = SERVICE_OPTIONS.some((s) => s.slug === initial)
    ? initial
    : "llc-ein-itin";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    service: validInitial,
    notes: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const message = useMemo(() => {
    const lines = [
      "Hi ITIN-Pro, I'd like to get started.",
      "",
      `Service: ${labelForSlug(form.service)}`,
      form.name && `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      form.country && `Country: ${form.country}`,
      form.notes && `Notes: ${form.notes}`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [form]);

  const waHref = `https://wa.me/${company.whatsappE164}?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${company.email}?subject=${encodeURIComponent(
    "New enquiry — " + labelForSlug(form.service)
  )}&body=${encodeURIComponent(message)}`;

  const valid = form.name.trim() && form.email.trim() && form.country.trim();

  function handleSubmit() {
    if (!valid) return;
    // Fire Google Ads conversion if gtag is present.
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: googleAdsId,
        event_category: "lead",
        event_label: form.service,
      });
      (window as any).gtag("event", "generate_lead", { service: form.service });
    }
    setSent(true);
    window.open(waHref, "_blank", "noopener,noreferrer");
  }

  const inputCls =
    "w-full rounded-lg border border-mist bg-white px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-slate/60 focus:border-emerald focus:ring-2 focus:ring-emerald/15";
  const labelCls = "mb-1.5 block text-[13px] font-semibold text-ink";

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.85fr]">
      {/* Form */}
      <Reveal>
        <div className="card p-7 lg:p-8">
          {sent ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-tint">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12l5 5 9-11" stroke="#0B7A55" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="mt-4 text-xl font-bold text-ink">You&apos;re almost there</h2>
              <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-slate">
                We&apos;ve opened WhatsApp with your details pre-filled. Just hit send and a
                specialist will reply shortly. If WhatsApp didn&apos;t open, use one of the buttons
                below.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Open WhatsApp
                </a>
                <a href={mailHref} className="btn-ink">
                  Send by email instead
                </a>
              </div>
              <button
                onClick={() => setSent(false)}
                className="mt-5 text-[13px] font-semibold text-slate underline"
              >
                Edit my details
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-ink">Tell us what you need</h2>
              <p className="mt-1.5 text-[14px] text-slate">
                Fill this in and we&apos;ll continue on WhatsApp or email — whichever you prefer. No
                payment is taken here.
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className={labelCls} htmlFor="service">
                    Which service?
                  </label>
                  <select id="service" value={form.service} onChange={set("service")} className={inputCls}>
                    {SERVICE_OPTIONS.map((o) => (
                      <option key={o.slug} value={o.slug}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="name">
                      Full name
                    </label>
                    <input id="name" value={form.name} onChange={set("name")} className={inputCls} placeholder="Your name" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="country">
                      Country
                    </label>
                    <input id="country" value={form.country} onChange={set("country")} className={inputCls} placeholder="Where you live" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="email">
                      Email
                    </label>
                    <input id="email" type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="you@email.com" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="phone">
                      WhatsApp number <span className="font-normal text-slate">(optional)</span>
                    </label>
                    <input id="phone" value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+__ ___ _______" />
                  </div>
                </div>

                <div>
                  <label className={labelCls} htmlFor="notes">
                    Anything we should know? <span className="font-normal text-slate">(optional)</span>
                  </label>
                  <textarea id="notes" value={form.notes} onChange={set("notes")} rows={3} className={inputCls} placeholder="e.g. I sell on Amazon and need Stripe access" />
                </div>

                <button onClick={handleSubmit} disabled={!valid} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
                  Continue on WhatsApp
                </button>
                <p className="text-center text-[12px] text-slate">
                  Prefer email?{" "}
                  <a href={mailHref} className="font-semibold text-emerald-deep underline">
                    Send your details to {company.email}
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </Reveal>

      {/* Reassurance sidebar */}
      <Reveal delay={120}>
        <div className="lg:sticky lg:top-24">
          <div className="rounded-xl2 border border-mist bg-paper p-7">
            <h3 className="text-[15px] font-bold text-ink">What happens next</h3>
            <ol className="mt-4 space-y-4">
              {[
                "A specialist reviews your details and confirms the right service and all-in price for your country and state.",
                "You complete a short onboarding form and we prepare your documents for review.",
                "You sign online, we file with the IRS and state, and we track everything to issuance.",
              ].map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[12px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[14px] leading-snug text-ink/80">{t}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-5 rounded-xl2 border border-mist bg-white p-6 shadow-card">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" stroke="#0F9D6E" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="#0F9D6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[14px] font-semibold text-ink">Money-back guarantee</span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-slate">
              If the IRS rejects your ITIN after we file it, you get 110% of your service fee back.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get started"
        title="Start your application"
        intro="A few quick details and we'll take it from there. No payment is taken on this page — we'll confirm your exact price first."
        cta={false}
      />
      <section className="bg-white py-16 lg:py-20">
        <div className="container-x">
          <Suspense fallback={<div className="py-10 text-center text-slate">Loading…</div>}>
            <ApplyForm />
          </Suspense>
          <Reveal>
            <p className="mt-10 text-center text-[13px] text-slate">
              Looking for a specific service?{" "}
              {services.map((s, i) => (
                <span key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="font-semibold text-emerald-deep underline">
                    {s.name.split("—")[0].trim()}
                  </Link>
                  {i < services.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

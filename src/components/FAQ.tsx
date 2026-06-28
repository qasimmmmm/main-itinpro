"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { faqs } from "@/lib/content";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-20 lg:py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="Questions & answers"
          title="Everything you need to know before you start"
          intro="Still unsure about something? Message us on WhatsApp and a specialist will answer before you pay."
          center
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 40}>
                <div
                  className={`overflow-hidden rounded-xl2 border bg-white transition-colors ${
                    isOpen ? "border-emerald/40 shadow-card" : "border-mist"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-semibold text-ink">{f.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                        isOpen ? "rotate-45 bg-emerald text-white" : "bg-paper text-slate"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[14px] leading-relaxed text-slate">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

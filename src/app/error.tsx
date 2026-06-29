"use client";

import { useEffect } from "react";
import Link from "next/link";
import { company } from "@/lib/content";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surface the error for monitoring; in production this reaches platform logs.
    console.error("[app error]", error);
  }, [error]);

  const wa = `https://wa.me/${company.whatsappE164}?text=${encodeURIComponent(
    "Hi ITIN-Pro, I hit an error on the site and need help."
  )}`;

  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-[2rem] font-extrabold leading-tight text-ink">Something went wrong</h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate">
            Sorry — an unexpected error interrupted this page. If you were in the middle of paying,
            you have <strong>not</strong> been charged unless you saw a confirmation screen.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={reset} className="btn-primary">
              Try again
            </button>
            <Link href="/" className="btn-ink">
              Back to home
            </Link>
          </div>
          <p className="mt-6 text-[13px] text-slate">
            Still stuck?{" "}
            <a href={wa} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-deep underline">
              Message us on WhatsApp
            </a>{" "}
            or email{" "}
            <a href={`mailto:${company.email}`} className="font-semibold text-emerald-deep underline">
              {company.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

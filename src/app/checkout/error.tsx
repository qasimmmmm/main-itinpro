"use client";

import { useEffect } from "react";
import Link from "next/link";
import { company } from "@/lib/content";

// Checkout-scoped boundary: the priority message here is reassurance that an
// error during checkout does NOT mean a charge went through.
export default function CheckoutError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[checkout error]", error);
  }, [error]);

  const wa = `https://wa.me/${company.whatsappE164}?text=${encodeURIComponent(
    "Hi ITIN-Pro, I hit an error during checkout and want to confirm I wasn't charged."
  )}`;

  return (
    <section className="bg-paper py-20 lg:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-[2rem] font-extrabold leading-tight text-ink">Checkout was interrupted</h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate">
            An error stopped the checkout before it finished. You have <strong>not</strong> been
            charged — a payment is only taken when you reach the confirmation page. You can safely
            try again.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={reset} className="btn-primary">
              Return to checkout
            </button>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ink">
              Confirm on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

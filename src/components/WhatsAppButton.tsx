"use client";

import { company } from "@/lib/content";

export default function WhatsAppButton() {
  const href = `https://wa.me/${company.whatsappE164}?text=${encodeURIComponent(
    "Hi ITIN-Pro, I'd like help getting started."
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-[5.5rem] right-5 z-40 flex min-h-[44px] items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lift ring-1 ring-black/5 transition-transform duration-200 ease-out hover:-translate-y-0.5 sm:bottom-5"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.05-1.36A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.2c-1.62 0-3.13-.44-4.43-1.2l-.32-.19-2.99.81.8-2.92-.21-.33A8.16 8.16 0 0 1 3.8 12c0-4.52 3.68-8.2 8.2-8.2 4.52 0 8.2 3.68 8.2 8.2 0 4.52-3.68 8.2-8.2 8.2z" />
      </svg>
      <span className="hidden text-sm font-semibold sm:inline">Chat with us</span>
    </a>
  );
}

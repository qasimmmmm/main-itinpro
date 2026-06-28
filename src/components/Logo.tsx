import Link from "next/link";

export default function Logo({
  light = false,
  className = "",
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="ITIN-Pro home"
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="hn" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0E2C44" />
            <stop offset="1" stopColor="#0B2238" />
          </linearGradient>
          <linearGradient id="hc" x1="18" y1="24" x2="46" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#16B981" />
            <stop offset="1" stopColor="#0F9D6E" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="56" height="56" rx="15" fill="url(#hn)" />
        <rect
          x="7.5"
          y="7.5"
          width="49"
          height="49"
          rx="11.5"
          fill="none"
          stroke="#C79A3E"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
        <path
          d="M19 33.5L28 42.5L45.5 22.5"
          stroke="url(#hc)"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M45.5 13.5c0.6 3.4 1.4 4.2 4.8 4.8-3.4 0.6-4.2 1.4-4.8 4.8-0.6-3.4-1.4-4.2-4.8-4.8 3.4-0.6 4.2-1.4 4.8-4.8Z"
          fill="#C79A3E"
        />
      </svg>
      <span
        className={`font-display text-[20px] font-extrabold tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        ITIN<span className="text-emerald">-Pro</span>
      </span>
    </Link>
  );
}

// Accepted payment method marks. Simplified, recognizable brand chips on a white
// background so they read on both light and dark surfaces. Shown to indicate
// accepted cards (nominative use).
export default function CardLogos({ className = "" }: { className?: string }) {
  const chip = "flex h-7 w-11 items-center justify-center rounded-md bg-white shadow-sm";
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Accepted cards: Visa, Mastercard, American Express, Discover">
      <span className={chip}>
        <span className="text-[11px] font-extrabold italic tracking-tight text-[#1A1F71]">VISA</span>
      </span>
      <span className={chip}>
        <span className="relative flex">
          <span className="h-3.5 w-3.5 rounded-full bg-[#EB001B]" />
          <span className="-ml-1.5 h-3.5 w-3.5 rounded-full bg-[#F79E1B] opacity-90" />
        </span>
      </span>
      <span className={`${chip} bg-[#1F72CD]`}>
        <span className="text-[8px] font-bold leading-none text-white">AMEX</span>
      </span>
      <span className={chip}>
        <span className="text-[8px] font-bold leading-none text-[#FF6000]">
          DISC<span className="text-ink">VER</span>
        </span>
      </span>
    </div>
  );
}

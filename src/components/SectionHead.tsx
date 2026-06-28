import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHead({
  eyebrow,
  title,
  intro,
  center = false,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <Reveal>
      <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
        <span className="eyebrow">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald" />
          {eyebrow}
        </span>
        <h2
          className={`mt-3 text-balance text-[2rem] font-extrabold leading-[1.1] sm:text-[2.5rem] ${
            light ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p
            className={`mt-4 text-[17px] leading-relaxed ${
              light ? "text-white/65" : "text-slate"
            }`}
          >
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}

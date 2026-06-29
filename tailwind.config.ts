import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B2238",       // deep authoritative navy
        deep: "#0E2C44",      // layered navy
        paper: "#F5F7F8",     // cool off-white page
        mist: "#E5EBEE",      // borders / dividers
        slate: "#566571",     // secondary text
        emerald: {
          DEFAULT: "#0F9D6E", // money / action / success
          deep: "#0B7A55",    // hover
          tint: "#E7F4EF",    // light green wash
        },
        gold: {
          DEFAULT: "#C79A3E", // official seal / premium
          soft: "#EFE3C4",    // light gold wash
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      spacing: {
        section: "5rem",        // 80px  (mobile section pad)
        "section-lg": "6rem",   // 96px  (desktop section pad)
        "section-tight": "4rem",// 64px  (band/CTA mobile)
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",       // large navy panels (Hero shell, CTA, Guarantee, PageHeader)
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,34,56,0.04), 0 12px 32px -12px rgba(11,34,56,0.12)",
        lift: "0 2px 4px rgba(11,34,56,0.05), 0 24px 48px -16px rgba(11,34,56,0.22)",
        doc: "0 24px 60px -20px rgba(11,34,56,0.45)",
        hair: "inset 0 0 0 1px rgba(11,34,56,0.06)",            // crisp edge ring on paper
        "emerald-glow": "0 8px 20px -8px rgba(15,157,110,0.7)", // codifies the btn-primary signature shadow
      },
      backgroundImage: {
        // single reusable navy atmosphere so navy sections stop hand-rolling blobs
        "navy-glow":
          "radial-gradient(60% 50% at 20% 0%, rgba(15,157,110,0.18) 0%, transparent 60%), radial-gradient(50% 45% at 95% 10%, rgba(199,154,62,0.10) 0%, transparent 55%)",
      },
      maxWidth: {
        container: "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.6s ease both",
        shimmer: "shimmer 2s linear infinite",  // keyframe existed but was dead
      },
    },
  },
  plugins: [],
};

export default config;

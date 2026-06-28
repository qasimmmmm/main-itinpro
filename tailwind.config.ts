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
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,34,56,0.04), 0 12px 32px -12px rgba(11,34,56,0.12)",
        lift: "0 2px 4px rgba(11,34,56,0.05), 0 24px 48px -16px rgba(11,34,56,0.22)",
        doc: "0 24px 60px -20px rgba(11,34,56,0.45)",
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
      },
    },
  },
  plugins: [],
};

export default config;

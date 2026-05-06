import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#fbfbfd",
          soft: "#f4f4f7",
          card: "#ffffff",
          border: "#e8e8ee",
        },
        ink: {
          DEFAULT: "#0a0a0a",
          dim: "#52525b",
          mute: "#a1a1aa",
        },
        accent: {
          DEFAULT: "#7c5cff",
          soft: "#a78bfa",
          glow: "#3b82f6",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans-latin)",
          "var(--font-sans-jp)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "var(--font-display-latin)",
          "var(--font-display-jp)",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20,20,30,.04), 0 4px 12px rgba(20,20,30,.04)",
        lift: "0 1px 2px rgba(20,20,30,.05), 0 14px 28px -10px rgba(20,20,30,.10)",
        ring: "0 0 0 1px rgba(20,20,30,.06)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease both",
        "shine": "shine 2.6s linear infinite",
        "marquee": "marquee 28s linear infinite",
        "spin-slow": "spin 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient-pan": "gradientPan 12s ease infinite",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradientPan: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F5F3EF",
        surface: "#FFFFFF",
        "surface-alt": "#FAF9F7",
        border: "#E8E5E0",
        "border-strong": "#D1CCC4",
        text: {
          DEFAULT: "#2D2D2D",
          secondary: "#6B6B6B",
          muted: "#9B9B9B",
          inverse: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#4A4A4A",
          warm: "#8B7355",
          cool: "#5A6B7A",
          subtle: "#A0937D",
        },
        status: {
          ok: "#5C8A5C",
          warn: "#B89B5E",
          err: "#B85C5C",
          info: "#5C7A8A",
        },
      },
      fontFamily: {
        display: ["Macondo", "cursive"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        panel: "16px",
        widget: "12px",
        badge: "8px",
      },
      boxShadow: {
        panel: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
        "panel-hover": "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
        widget: "0 1px 2px rgba(0,0,0,0.03)",
        inset: "inset 0 1px 2px rgba(0,0,0,0.04)",
      },
      spacing: {
        "4.5": "18px",
        "13": "52px",
        "15": "60px",
        "18": "72px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

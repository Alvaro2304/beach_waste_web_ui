import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      "0": "0px",
      "1": "4px",
      "2": "8px",
      "3": "12px",
      "4": "16px",
      "5": "20px",
      "6": "24px",
      "8": "32px",
      "10": "40px",
      "12": "48px",
      "16": "64px",
      "20": "80px",
      "24": "96px",
      "px": "1px",
      "0.5": "2px",
      "1.5": "6px",
    },
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#8B5CF6",
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
        surface: "#FFFFFF",
        text: "#111827",
        // Extended retro palette
        cream: "#FFF8E7",
        sand: "#F5E6C8",
        vintage: {
          brown: "#8B4513",
          gold: "#DAA520",
          navy: "#1B3A5C",
          red: "#B22222",
          green: "#2E8B57",
          blue: "#4169E1",
        },
      },
      fontFamily: {
        display: ["Macondo", "cursive"],
        body: ["Macondo", "cursive"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderWidth: {
        "3": "3px",
      },
      boxShadow: {
        retro: "4px 4px 0px 0px #111827",
        "retro-sm": "2px 2px 0px 0px #111827",
        "retro-primary": "4px 4px 0px 0px #3B82F6",
        "retro-danger": "4px 4px 0px 0px #DC2626",
        "retro-warning": "4px 4px 0px 0px #D97706",
        "retro-success": "4px 4px 0px 0px #16A34A",
        "retro-inset": "inset 2px 2px 0px 0px rgba(0,0,0,0.1)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        blink: "blink 1s step-end infinite",
        needle: "needle 2s ease-in-out infinite alternate",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        needle: {
          "0%": { transform: "rotate(-10deg)" },
          "100%": { transform: "rotate(10deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          header: "#075E54",
          accent: "#25D366",
          teal: "#128C7E",
          "bubble-own": "#DCF8C6",
          "bubble-other": "#FFFFFF",
          background: "#ECE5DD",
          check: "#34B7F1",
        },
      },
      animation: {
        "bounce-dot": "bounce-dot 1.2s infinite ease-in-out",
      },
      keyframes: {
        "bounce-dot": {
          "0%, 80%, 100%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

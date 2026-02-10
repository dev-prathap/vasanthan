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
        matrix: "#00ff41",
        "matrix-dark": "#003b00",
        space: "#0a0a0a",
        viral: "#ff007a",
      },
      fontFamily: {
        display: ["var(--font-display)", "Bebas Neue", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        glitch: "glitch 1s infinite linear alternate-reverse",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin-slow 10s linear infinite",
      },
      keyframes: {
        glitch: {
          "0%": { textShadow: "2px 0 0 #ff00c1, -2px 0 0 #00fff9" },
          "25%": { textShadow: "-2px 0 0 #ff00c1, 2px 0 0 #00fff9" },
          "50%": { textShadow: "2px 0 0 #ff00c1, -2px 0 0 #00fff9" },
          "75%": { textShadow: "-2px 0 0 #ff00c1, 2px 0 0 #00fff9" },
          "100%": { textShadow: "2px 0 0 #ff00c1, -2px 0 0 #00fff9" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 5px #00ff41)" },
          "50%": { opacity: "0.5", filter: "drop-shadow(0 0 20px #00ff41)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

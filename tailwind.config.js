/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: "#8f1420",
          50: "#fdf2f3",
          100: "#fbe4e6",
          200: "#f7cdd1",
          300: "#f0a6ae",
          400: "#e5737f",
          500: "#d43d4e",
          600: "#b81f33",
          700: "#8f1420",
          800: "#6b0f19",
          900: "#4a0a11",
          950: "#2b060a",
        },
        ink: {
          DEFAULT: "#0b0b0f",
          soft: "#16161d",
          mute: "#23232e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        marquee: "marquee 30s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "scan-line": "scan-line 6s linear infinite",
      },
    },
  },
  plugins: [],
};

// tailwind.config.js (CJS murni)
const { heroui } = require("@heroui/theme");
const tailwindScrollbar = require("tailwind-scrollbar");

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",   // jangan pakai "./@/..."
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      spacing: { 30: "120px", 7.5: "30px", 92.5: "23.125rem" },
      screens: {
        xs: "425px",
        xss: "525px",
        sm: "640px",
        400: "400px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1610px",
        "3xl": "1640px",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(), tailwindScrollbar],
};

module.exports = config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#4F46E5",
        dark: "#0F172A",
        muted: "#64748B",
        border: "#E2E8F0",
        softBg: "#F8FAFC",
      },
    },
  },
  plugins: [],
};
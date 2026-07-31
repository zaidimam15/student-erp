/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b0d12",
          900: "#12141c",
          800: "#1a1d28",
          700: "#242836",
          600: "#333849",
          500: "#4b5164",
        },
        paper: "#f6f5f2",
        accent: {
          DEFAULT: "#1fb08a",
          light: "#e6f6f1",
          dark: "#158a6c",
        },
        gold: "#c9a24b",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,13,18,0.04), 0 4px 12px rgba(11,13,18,0.05)",
      },
    },
  },
  plugins: [],
}


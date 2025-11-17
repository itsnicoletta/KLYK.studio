/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // se vuoi tema scuro di default
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
        display: ["Clash Display", "sans-serif"],
      },
      colors: {
        base: {
          50: "#f5f5f5",
          100: "#e0e0e0",
          200: "#bdbdbd",
          300: "#9e9e9e",
          400: "#757575",
          500: "#616161",
          600: "#424242",
          700: "#2c2c2c",
          800: "#1e1e1e",
          900: "#141414", // colore principale per background
          950: "#0a0a0a",
        },
        accent: {
          DEFAULT: "#019cd9",
        },
      },
    },
  },
  plugins: [],
};
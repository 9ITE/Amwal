/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "",
          200: "#03a6ff",
        },
        gray: { 100: "#f7f9f9", 600: "#243640" },
        yellow: { 500: "#f2b818", 600: "#f59b42" },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        concert: ["Concert One", "sans-serif"],
      },
    },
  },
  plugins: [],
};

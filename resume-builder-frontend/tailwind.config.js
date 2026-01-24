/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "background-light": "#ffffff",
        "background-dark": "#0f0f0f",
        primary: "#dc2626", // red
      },
      fontFamily: {
        display: ["Manrope", "system-ui", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

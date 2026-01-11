/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Permite alternar tema dark/light
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#135bec",
        "primary-hover": "#1d64f2",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
        "surface-dark": "#1a202c",
        "surface-light": "#ffffff",
      },
      fontFamily: {
        "display": ["Lexend", "sans-serif"]
      },
    },
  },
  plugins: [],
}
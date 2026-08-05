/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./public/**/*.html",
    "./src/universo/**/*.{cljs,cljc,clj}",
    "./src/**/*.{cljs,cljc,clj}",
    // Agrega la ruta específica donde veo que tienes tu archivo
    "./src/universo/components/**/*.{cljs,cljc,clj}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
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
    safelist: [
    { pattern: /katex/ },  // Preserva todas las clases de KaTeX
  ],
  plugins: [],
}

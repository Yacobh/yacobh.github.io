/** @type {import('tailwindcss').Config} */

/*
 * IDENTIDAD VISUAL — "tinta y pergamino" (ADR-020)
 *
 * Hasta el 2026-08-13 este archivo tenía `theme: { extend: {} }`: cero tokens
 * propios. Todo el color, la tipografía y los radios del sitio eran los valores
 * de fábrica de Tailwind, y esa es la razón técnica de que la página se viera
 * como cualquier otra hecha con Tailwind — no "la IA le da el mismo código a
 * todos", sino que nunca se definió una identidad y quedó el default.
 *
 * ── La decisión que evita reescribir 15 componentes ──────────────────────────
 * `colors.indigo` se REDEFINE con la escala del azul tinta. Los componentes ya
 * tienen escritos cientos de `bg-indigo-600`, `text-indigo-700`,
 * `border-indigo-200`… y todos pasan a ser el color de marca sin editar un solo
 * .cljs. Es exactamente el argumento de ADR-012 (remapear el vocabulario que ya
 * existe en vez de anotar clase por clase), aplicado acá al tema claro.
 *
 * Sí, el token se llama `indigo` y ya no es índigo. Es deuda de nombre asumida
 * a conciencia: renombrarlo obligaría a tocar los ~15 componentes, que es
 * justamente el costo que este enfoque evita. Para código NUEVO existe el alias
 * `tinta`, que apunta a la misma escala y no miente.
 *
 * ── Tipografía sin dependencia de red ───────────────────────────────────────
 * `font-display` usa el serif del sistema, no una fuente web. Una Google Font
 * daría más carácter, pero agrega un origen externo nuevo (hoy solo se depende
 * de jsDelivr para el CSS de KaTeX), un pedido de red bloqueante en cada carga
 * y una decisión que registrar en DEPENDENCIES. El serif del sistema ya da el
 * aire de tratado que la paleta busca, gratis y sin latencia.
 */

// Azul tinta. Escala construida alrededor de #1B2A4A, que es el 800: los tonos
// oscuros mandan porque es un color de texto y de superficie profunda, no un
// color de botón brillante.
const tinta = {
  50: '#F2F5FA',
  100: '#E2E8F2',
  200: '#C6D2E5',
  300: '#9DB0D0',
  400: '#6E87B4',
  500: '#4C6699',
  600: '#3A4F7A',
  700: '#2A3B5C',
  800: '#1B2A4A', // ← el color de marca
  900: '#141F38',
  950: '#0E1524', // ← fondo del tema oscuro
};

// Ámbar/ocre. Es el acento: medallas de la línea del tiempo, hitos
// descubiertos, destacados puntuales. Alrededor de #C9873A como 500.
const acento = {
  50: '#FDF8F1',
  100: '#F9EDDC',
  200: '#F2D9B6',
  300: '#E7BF87',
  400: '#D9A25C',
  500: '#C9873A', // ← el acento
  600: '#A96C2C',
  700: '#855224',
  800: '#5F3B1B',
  900: '#3E2712',
  950: '#24160A',
};

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
    extend: {
      colors: {
        // Redefinición: cubre todo el vocabulario `indigo-*` ya escrito.
        indigo: tinta,
        // Alias honesto para código nuevo. Misma escala, otro nombre.
        tinta: tinta,
        acento: acento,
        // Superficie clara cálida. Reemplaza al blanco puro como fondo de
        // página: el papel del pergamino, no la hoja de un formulario.
        //
        // Bajada un escalón de luz el 2026-08-13 a pedido del owner ("me gusta,
        // pero un poco menos claro"). El matiz se conserva; lo que cambia es la
        // luminosidad. Contraste reverificado: texto principal 12.31, texto
        // secundario 7.05, medalla 3.73 — todos por encima de su umbral.
        pergamino: {
          DEFAULT: '#F4EEE2',
          50: '#FBF7F0',
          100: '#F4EEE2',
          200: '#EBE3D3',
          300: '#DCD1BA',
        },
      },
      fontFamily: {
        // Títulos: serif del sistema, sin fuente web (ver cabecera).
        display: ['Georgia', 'ui-serif', 'Cambria', '"Times New Roman"', 'serif'],
      },
      borderRadius: {
        // Un punto menos redondeado que el default de Tailwind: el borde muy
        // redondo es una de las marcas visuales del template genérico.
        DEFAULT: '0.25rem',
        lg: '0.375rem',
        xl: '0.5rem',
        '2xl': '0.75rem',
      },
      boxShadow: {
        // Sombras teñidas de tinta en vez del negro puro, que sobre superficie
        // cálida se ve sucio.
        sm: '0 1px 2px 0 rgb(27 42 74 / 0.06)',
        DEFAULT: '0 1px 3px 0 rgb(27 42 74 / 0.10), 0 1px 2px -1px rgb(27 42 74 / 0.08)',
        md: '0 4px 6px -1px rgb(27 42 74 / 0.10), 0 2px 4px -2px rgb(27 42 74 / 0.08)',
        lg: '0 10px 15px -3px rgb(27 42 74 / 0.10), 0 4px 6px -4px rgb(27 42 74 / 0.08)',
        xl: '0 20px 25px -5px rgb(27 42 74 / 0.12), 0 8px 10px -6px rgb(27 42 74 / 0.08)',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */

/*
 * IDENTIDAD VISUAL — lenguaje Braun / Dieter Rams (ADR-022)
 *
 * Reemplaza a "tinta y pergamino" (ADR-020, vivió un día). El owner pidió que
 * el sitio "parezca un diseño de Dieter Rams Braun", y eso no es una paleta:
 * es una manera de decidir. Los tres principios que mandan acá:
 *
 *   · «Weniger, aber besser». Una escala neutra y UN color. Nada más.
 *   · El color es señal, no decoración. El naranja marca lo accionable; si
 *     aparece en un adorno, deja de significar algo cuando aparece en un botón.
 *   · Buen diseño es discreto. Sin degradados, sin sombras difusas, sin bordes
 *     redondos: el producto se calla para que se lea el contenido.
 *
 * ── Por qué `indigo` es gris ────────────────────────────────────────────────
 * Los componentes tienen escritos cientos de `bg-indigo-600` y `text-indigo-700`
 * (ver ADR-020). Redefinir esa escala como **grafito** convierte todo ese
 * vocabulario heredado en neutro de un solo golpe, que es exactamente lo que
 * Rams querría: el botón secundario no compite. El naranja se pone **a mano y
 * de a uno**, solo donde hay una acción principal de verdad.
 *
 * ── Texto oscuro sobre el naranja, no blanco ────────────────────────────────
 * El naranja Braun auténtico (#E85D0D) con texto blanco da 3.50 de contraste:
 * reprueba AA. Con `grafito-900` da 4.83. Y resulta que esa es también la
 * solución histórica: Braun ponía glifos oscuros sobre las teclas naranjas.
 * La respuesta accesible y la correcta eran la misma.
 */

// Escala neutra cálida. Es TODO el gris del sistema: superficies, texto,
// bordes, botones secundarios. El calor viene del matiz (nunca gris azulado),
// que es lo que separa un plástico Braun de una caja de software.
const grafito = {
  50: '#FAFAF8',   // tarjeta en claro
  100: '#F2F0EB',  // página en claro — el "snow white" del SK4
  200: '#E7E4DD',
  300: '#D3CFC6',  // hairline decorativo
  400: '#A8A49B',
  500: '#7D7A72',  // borde funcional (3.76 sobre la página: delimita de verdad)
  600: '#5C5A54',  // texto secundario
  700: '#423F3B',
  800: '#2E2C29',  // botón secundario, tarjeta en oscuro
  900: '#1D1D1B',  // texto principal
  950: '#121211',  // página en oscuro
};

// El único color. Naranja Braun (ET66, T3). Se usa en la acción principal de
// cada pantalla y en las medallas de la línea del tiempo. En ningún otro lado.
const senal = {
  50: '#FDF0E9',
  100: '#FADCCB',
  200: '#F5B99B',
  300: '#F0956B',
  400: '#EE7A45',  // señal sobre fondo oscuro
  500: '#E85D0D',  // ← la señal
  600: '#C74C0A',  // hover, y foco visible en ambos temas
  700: '#9E3C08',  // señal como texto sobre fondo claro
  800: '#762D06',
  900: '#4E1E04',
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
        grafito: grafito,
        senal: senal,
        // Vocabulario heredado: todo `indigo-*` de los componentes se vuelve
        // neutro. Ver la cabecera.
        indigo: grafito,
      },
      fontFamily: {
        // UNA familia para todo. En Rams la jerarquía se hace con tamaño y
        // peso, no cambiando de letra. Grotesca neutra, y del sistema: no hay
        // fuente web que descargar (misma razón que en ADR-020).
        sans: ['Helvetica Neue', 'Helvetica', 'Inter', 'ui-sans-serif',
               'system-ui', 'Arial', 'sans-serif'],
        display: ['Helvetica Neue', 'Helvetica', 'Inter', 'ui-sans-serif',
                  'system-ui', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        // Casi cero. El radio grande es la firma del template genérico; Braun
        // redondeaba lo justo para que no corte, y nada más.
        none: '0',
        DEFAULT: '2px',
        sm: '1px',
        md: '2px',
        lg: '2px',
        xl: '3px',
        '2xl': '3px',
        '3xl': '4px',
        full: '9999px',   // se conserva: los puntos de la línea del tiempo
      },
      boxShadow: {
        // Sin sombras difusas. La separación se hace con una línea, que es
        // honesta sobre dónde termina una superficie. `shadow-lg` y compañía
        // siguen existiendo para no romper el markup, pero ya casi no pintan.
        none: 'none',
        sm: '0 0 0 1px rgb(29 29 27 / 0.06)',
        DEFAULT: '0 0 0 1px rgb(29 29 27 / 0.08)',
        md: '0 0 0 1px rgb(29 29 27 / 0.10)',
        lg: '0 0 0 1px rgb(29 29 27 / 0.12)',
        xl: '0 0 0 1px rgb(29 29 27 / 0.14)',
        '2xl': '0 0 0 1px rgb(29 29 27 / 0.16)',
      },
    },
  },
  plugins: [],
}

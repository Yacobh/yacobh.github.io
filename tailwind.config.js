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
//
// Qué tono usar, que no es libre:
//   · relleno de acción → 400 (el owner vio el 500 demasiado oscuro, y como
//     encima va texto grafito, aclararlo SUBE el contraste: 4.83 → 6.03)
//   · texto o regla sobre fondo claro → 700 (el 500 da 2.75 y no alcanza)
//   · el símbolo ∫ sobre la nav clara → 700 (en 500 daba 2.02)
// Todos los cortes están declarados en scripts/audit_contraste.py.
const senal = {
  50: '#FDF0E9',
  100: '#FADCCB',
  200: '#F5B99B',
  300: '#F0956B',
  400: '#EE7A45',  // ← el relleno de la acción principal, en ambos temas
  500: '#E85D0D',  // el naranja Braun puro; queda para el ∫ sobre fondo oscuro
  600: '#C74C0A',  // hover, y foco visible en ambos temas
  700: '#9E3C08',  // señal como texto sobre fondo claro
  800: '#762D06',
  900: '#4E1E04',
};

// El panel del instrumento. Gris medio, como la carcasa de un SK4 o de una mesa
// de audio: NO es un fondo blanco de documento, es la cara de un aparato.
//
// Consecuencia medida que define todo lo demás: sobre gris medio **no resalta
// nada**. El cian da 1.04 de contraste, el naranja 1.68, el rojo 2.61 — los tres
// por debajo del 3:1 que exige un objeto gráfico. En la foto de referencia pasa
// lo mismo y está resuelto igual: ningún LED está sobre el panel, todos viven
// dentro de un alojamiento oscuro. El gris es el fondo; el contraste lo pone el
// control. Por eso el relieve es funcional y no adorno (ADR-023).
const panel = {
  50: '#E4E4E1',
  100: '#D6D6D2',
  200: '#C5C5C1',
  300: '#B5B4B0',  // ← la cara del panel en claro
  400: '#9E9E9A',
  500: '#7A7A76',
  600: '#565652',
  700: '#3A3A37',  // ← alojamiento oscuro: el fondo que hace visible un LED
  800: '#2B2B28',  // ← la cara del panel en oscuro
  900: '#1F1F1D',
  950: '#151513',
};

// LED. Estado, nunca acción: encendido significa "esto es verdad ahora"
// (un hito descubierto, un nivel alcanzado). Solo se usa dentro de un
// alojamiento oscuro — sobre el panel claro sería invisible.
const led = {
  300: '#7BF2DA',
  400: '#4CEBCC',
  500: '#2EE6C5',  // ← el LED
  600: '#16C79A',
  700: '#0E9E7A',
  // 800 no es un LED: es el mismo verde llevado a un tono que **sí** se puede
  // usar como regla o texto sobre una superficie clara (5.31 sobre blanco,
  // 3.64 sobre panel-100). El 700 daba 2.33 sobre panel-100 y no delimitaba.
  800: '#0A7A5E',
};

// LED de alarma. El mismo diodo que `led`, con la otra corriente: rojo de
// instrumento, no el rojo de "error de formulario" de Tailwind.
//
// Existe porque el diagnóstico tenía que decir "acertaste" y "fallaste", y lo
// estaba diciendo con `green-50`/`red-50` de fábrica — superficies pintadas de
// color, que es justo lo que la carcasa de un aparato nunca hace (ADR-033). El
// estado se dice con un diodo dentro de su alojamiento; la superficie no cambia.
//
// Cortes medidos (scripts/audit_contraste.py):
//   · 500 sobre el alojamiento claro = 3.43 · sobre el oscuro = 5.50  → el LED
//   · 700 sobre blanco = 6.97 · sobre panel-100 = 4.78                → la regla
const alarma = {
  300: '#FF9F91',
  400: '#FF7361',
  500: '#FF4B38',  // ← el diodo encendido
  600: '#D93724',
  700: '#A82A1B',  // ← regla lateral y texto sobre fondo claro
  800: '#7C1F14',
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
        panel: panel,
        led: led,
        alarma: alarma,
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

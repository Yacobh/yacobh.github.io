# ADR-028: Toda entrada social pasa por la declaración de edad, y el redirect de OAuth es una sola URL fija

## Estado

Aprobada

## Fecha

2026-08-17

## Contexto

`sign-in-with-google` existía en `src/universo/supabase.cljs` desde F0 y **ningún botón la
llamaba**. T-92 pedía conectarla: es gratis en las tres capas y quita fricción del paso más caro del
embudo (el registro, T-20).

Al conectarla aparecieron dos cosas que el ticket no había previsto y que no son de UX.

**1. Un botón social es también un registro.** Supabase Auth **da de alta** al usuario que entra por
OAuth y todavía no existe; la fila en `profiles` la crea el trigger `handle_new_user()` sobre
`auth.users` (migración `008`, `security definer`). Es decir: el botón crea cuentas, y las crea
**también en `/ingresar`**, cuya única lógica hasta ahora era autenticar a alguien que ya existía.

Eso choca de frente con **D-21**: la declaración *"He leído y acepto el Aviso de Privacidad. Declaro
tener 14 años o más, o contar con la autorización de mi madre, padre o tutor"*, atada a la
**Ley 21.719** y a [[../project-memory/RISKS]] R-06. Esa declaración vivía **dentro del `<form>` de
correo y solo en `/registrarse`**. Un botón de Google puesto al lado —el patrón por defecto de
cualquier tutorial— la esquiva en silencio, sobre un público **mayoritariamente menor de edad**.
No es un descuido cosmético: es la única evidencia de que la declaración se hizo.

**2. El `redirectTo` dinámico se volvió peligroso al existir el router.** Era
`(.-href js/window.location)`. Cuando casi todo vivía en `/` eso daba una sola URL en la práctica;
con ADR-026 da **una URL distinta por cada ruta desde la que alguien pulse el botón**. Cada una hay
que declararla en la allowlist de Redirect URLs de Supabase, y el modo de fallo cuando falta **no es
un error**: Supabase sustituye el destino por la Site URL sin avisar. Un fallo silencioso en el
punto exacto donde se pierde al usuario.

## Decisión

**(a) Toda entrada social pasa por la declaración de edad.** La declaración vive en un bloque
reutilizable (`consent-block` en `components/login.cljs`), se dibuja **antes** del botón social en
**las dos rutas** (`/ingresar` y `/registrarse`), y el botón social permanece **inhabilitado hasta
que esté marcada**, con la razón visible debajo. En registro por correo el bloque va **dentro** del
`<form>`, para conservar la validación nativa del navegador; en login va **fuera**, porque ahí el
formulario de correo no debe pedirla y el botón social sí.

Esto aplica a **cualquier proveedor que se agregue en el futuro** (Apple, Microsoft, Google
Workspace del colegio): si crea cuentas, pasa por la declaración.

**(b) El `redirectTo` de OAuth es una sola URL fija**, construida como
`origin + (router/section->path :dashboard)` — derivada de la tabla de `universo.router`, nunca
escrita a mano. La allowlist de Supabase tiene **una** entrada.

**(c) El aterrizaje del callback no lleva código propio.** Reutiliza el mecanismo de deep link a
sección protegida de T-05: `404.html` arranca la aplicación → `[:router :pending]` →
`:auth/session-established` la consume y navega con `:history :replace`.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Botón de Google solo en `/registrarse`, dejando `/ingresar` sin él | No resuelve nada: el usuario que llega a `/ingresar` sin cuenta es exactamente el que hay que capturar, y mandarlo a otra ruta reintroduce la fricción que T-92 venía a quitar |
| Botón habilitado siempre, y pedir la declaración **después** de volver de Google | La cuenta ya existiría al momento de preguntar. La declaración dejaría de ser una condición y pasaría a ser un trámite posterior — que es justo lo que D-21 no permite |
| Registrar el consentimiento en una columna de `profiles` en vez de bloquear el botón | No es alternativa sino complemento, y es **más** trabajo: requiere migración y no evita el alta sin declarar. Queda como mejora posible, no como sustituto |
| Dejar `redirectTo` dinámico y declarar todas las rutas en la allowlist | Lista que hay que mantener a mano cada vez que se agregue una ruta, con fallo **silencioso** si se olvida. La ruta fija elimina la clase entera de error |
| Redirect fijo a `/` en vez de `/tablero` | Funciona, pero deja al usuario recién autenticado mirando la landing. `/tablero` aterriza donde corresponde **sin código nuevo**, porque el mecanismo de T-05 ya existía |

## Consecuencias

**Positivas**

- D-21 se cumple en **todos** los caminos de alta, no solo en el del correo.
- La allowlist de Supabase tiene una sola entrada y renombrar la ruta del tablero no rompe el login
  (el path sale de la tabla del router).
- Cero código nuevo de callback: menos superficie que mantener.
- La regla queda escrita para el próximo proveedor, que es cuando el error sería fácil de repetir.

**Negativas / costos aceptados**

- **Un clic más** antes de poder usar el botón social, justo donde se quería reducir fricción. Es
  deliberado: el costo legal y ético de no tenerlo es mayor que el costo de conversión de tenerlo.
- El botón inhabilitado depende del re-render de React: marcar la casilla y pulsar en el mismo gesto
  puede sentirse como que "no responde" (visto en la verificación). No se corrigió.
- La declaración se registra como **gate de UI**, no como dato persistido. Es evidencia más débil que
  una columna con marca de tiempo.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| La pantalla de Google nombra a `supabase.co` y no a la marca; sobre menores y apoderados tiene forma de phishing | Custom domain de Supabase (**de pago**); decidir con el dato de conversión de G-5, no por intuición | RISKS **R-33** |
| El consentimiento no queda persistido: si alguien lo discute, la evidencia es el código de la UI en ese commit | Persistir `consent_at` en `profiles` cuando haya migración a mano | RISKS R-06 · BACKLOG **T-95** |
| Un proveedor nuevo se agrega copiando un tutorial y se salta el gate | Esta ADR + la nota en `ARCHITECTURE` §4.1.b | LESSONS_LEARNED **L-42** |

## Seguimiento

- **Se reconsidera (a)** si aparece un canal institucional donde el colegio ya tiene el
  consentimiento de los apoderados por contrato (Q-37): ahí la declaración individual puede sobrar,
  pero **la decisión la toma el contrato, no el código**.
- **Se reconsidera (b)** si alguna vez hace falta volver a la ruta de origen tras el login. Si pasa,
  la forma correcta es un parámetro propio en el `state`, **no** volver al `href` dinámico.
- **Revisar tras T-91/G-5:** si el registro por Google convierte sensiblemente peor que el registro
  por correo, el sospechoso número uno es R-33 y no este gate.

---

Relacionado: [[../project-memory/ARCHITECTURE]] · [[../project-memory/DECISIONS]] ·
[[../project-memory/RISKS]] · [[../project-memory/BACKLOG]] ·
[[ADR-026-router-de-url-con-history-api]] · [[ADR-027-un-solo-index-html]]

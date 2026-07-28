# ADR-001: ClojureScript + re-frame + shadow-cljs como stack de frontend

## Estado

Aprobada

## Fecha

2025-05-03 (documentada retroactivamente el 2026-07-26)

## Contexto

> **Contexto reconstruido.** Esta decisión se tomó de facto al iniciar el proyecto, antes de existir
> este registro. Se reconstruye desde `deps.edn`, `shadow-cljs.edn`, la estructura de `src/` y el
> historial de commits. Si el owner recuerda motivaciones distintas, corregir este ADR sin borrarlo.

El proyecto nace como sitio personal que evoluciona hacia una plataforma educativa con estado
complejo: un test adaptativo con estimación estadística incremental, un perfil derivado de las
respuestas, un plan que depende de ese perfil, y un panel de administración con múltiples secciones
que cargan datos de forma independiente.

Restricciones del momento:

- Un solo desarrollador, con experiencia y preferencia por Clojure (el repositorio incluye
  configuración de Calva, clj-kondo y LSP desde el inicio).
- Hosting estático (GitHub Pages): no hay servidor donde renderizar.
- Sin presupuesto: todo el toolchain debe ser gratuito.
- El dominio tiene lógica matemática con invariantes (estimación de θ, bandas, reglas de cupos) que
  conviene expresar como transformaciones de datos puras y testeables.

## Decisión

Se usa **ClojureScript** como lenguaje de la aplicación, con:

- **re-frame** como arquitectura de estado: un único `app-db`, eventos como única forma de mutarlo,
  efectos como única frontera con el exterior, suscripciones como única forma de leer.
- **Reagent** (sobre React 17) para los componentes, escritos en Hiccup.
- **shadow-cljs** como compilador y servidor de desarrollo, con un solo módulo de salida cuya entrada
  es `universo.core`.
- **Tailwind CSS** para estilos, con PostCSS y Autoprefixer.

La forma canónica del estado se declara y documenta en `universo.db/default-db`.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| React + TypeScript | Ecosistema más grande y contratación más fácil, pero pierde la ventaja principal: estructuras inmutables y funciones puras para expresar el dominio matemático. La preferencia del único desarrollador pesaba más que la contratabilidad |
| Vue / Svelte | Mismo argumento; además menos afinidad con el modelo de datos inmutable |
| ClojureScript con Om / Rum / Helix | re-frame tiene la disciplina de estado más explícita y mejor documentada, y su vocabulario (evento / efecto / suscripción) hace legible el código de otros |
| Reagent sin re-frame (átomos locales) | Suficiente para un sitio personal, insuficiente para el estado del test adaptativo, la sesión y siete secciones de admin coordinadas |
| Figwheel / Lein-cljsbuild | shadow-cljs integra npm de forma nativa, tiene mejor DX y un target `:node-test` listo para la suite |
| CSS a mano o Bootstrap | Tailwind permite iterar la landing rápido sin salir del Hiccup |

## Consecuencias

**Positivas**

- El dominio se expresa como funciones puras de datos a datos: `universo.profile`,
  `universo.slots.logic`, `universo.irt.progress` y `universo.components.tetha` son testeables sin
  DOM, sin red y sin mocks. Esa es la razón de que existan 34 tests significativos con esfuerzo mínimo.
- La disciplina de re-frame impide accidentes comunes: ningún componente hace I/O, ningún estado vive
  fuera del `app-db`, todo cambio es rastreable a un evento.
- El estado de UI por sección (`[:admin :status <tab>]`) es natural con un `app-db` único: un spinner
  o un error de una pestaña no contamina a las demás.
- Hot reload con `:after-load universo.core/mount-root`: iteración rápida sin perder estado.
- Un `default-db` documentado sirve como especificación legible de todo el estado del sistema.

**Negativas / costos aceptados**

- **Ecosistema pequeño:** el bus factor del proyecto (R-01) se agrava porque el número de personas que
  pueden mantenerlo es reducido.
- **Fallos silenciosos propios de re-frame:** si un namespace de eventos no se requiere en
  `universo.core`, sus handlers no se registran y el `dispatch` no hace nada, sin excepción (solo un
  warning en consola). Es la trampa más costosa del stack (L-03).
- **Interoperabilidad con JS ruidosa:** los objetos de `supabase-js` no tienen tipos inferibles, lo que
  produce `:infer-warning` permanentes en `events/auth.cljs` (L-04).
- **Reagent 1.2 ata el proyecto a React 17.** Actualizar a React 18+ es un cambio mayor que requiere
  su propio ADR.
- **Correspondencia namespace/archivo** estricta (guion → guion bajo): fuente recurrente de errores de
  build (L-01).
- **Sin code splitting** en la configuración actual: un solo módulo, así que un estudiante en móvil
  descarga también todo el panel de administración (R-22).

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| El proyecto solo puede mantenerlo alguien con ClojureScript | La memoria PMF documenta el sistema de forma independiente del lenguaje; la lógica está concentrada en cuatro namespaces puros y legibles | R-01 |
| Handlers no registrados por olvido en `core.cljs` | Regla explícita en `CLAUDE.md` §5 y `AGENT_INSTRUCTIONS` §2 | L-03 |
| Componentes monolíticos (`admin.cljs` 1060 líneas) | Tarea de descomposición T-15 | R-07 |
| Bundle creciente sin code splitting | Aceptado; revisar si el peso se vuelve medible | R-22 |

## Seguimiento

Reconsiderar si:

- Se incorporan desarrolladores sin experiencia en Clojure y la velocidad se ve afectada de forma
  medible.
- Se necesita renderizado en servidor (SEO más allá del JSON-LD estático, o contenido indexable
  generado dinámicamente).
- Reagent deja de recibir mantenimiento o el bloqueo en React 17 impide una dependencia necesaria.

Revisar en cada actualización mayor de dependencias: React 17→18, Tailwind 3→4, shadow-cljs mayor
(ver [[../project-memory/DEPENDENCIES]] §6).

---

Relacionado: [[../project-memory/TECH_STACK]] · [[../project-memory/ARCHITECTURE]] ·
[[ADR-009-logica-pura-testeable]] · [[../project-memory/LESSONS_LEARNED]]

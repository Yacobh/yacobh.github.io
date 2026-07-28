# ADR-009: Las reglas de negocio viven en namespaces puros y testeados

## Estado

Aprobada

## Fecha

2026-07-25 (documentada retroactivamente el 2026-07-26)

## Contexto

> **Contexto reconstruido** desde la existencia y los docstrings de `universo.profile`
> ("Funciones puras: responses + questions → perfil de aprendizaje"), `universo.slots.logic`
> ("Funciones puras para cupos e inscripción (espejo de reglas DB)"), `universo.irt.progress`
> ("Helpers puros para evolución IRT…"), sus tests, y los commits `6cf0dc9` ("Filtrar cupos por banda
> con lógica pura") y `c5ee6bc` ("Endurecimiento: `universo.slots.logic` + tests").

El sistema no tiene entorno de pruebas: se trabaja contra la base de producción (R-02), no hay CI
(R-04) y no hay staging. En ese contexto, la única forma barata de tener confianza en un cambio es que
las reglas que importan sean **verificables sin red, sin base de datos y sin navegador**.

Las reglas que importan son concretas:

- Cómo se re-estima θ y cuándo para el diagnóstico (si esto falla, el producto miente).
- Cómo se derivan banda, déficits y misconceptions (si esto falla, el plan es inútil).
- Qué cupos ve un estudiante y cuándo se confirma un grupo (si esto falla, alguien se inscribe donde
  no debe o espera para siempre).

En el commit `6cf0dc9` se resolvió un bug real de este tipo — la lista de cupos aparecía vacía por un
filtro incorrecto — y la solución fue **extraer el filtro a una función pura y testearla**, no parchear
el handler.

## Decisión

**Toda regla de negocio vive en un namespace puro y tiene test.**

Concretamente:

1. **Namespaces puros del dominio** (sin I/O, sin estado, sin `js/`* salvo `Math`):
   - `universo.components.tetha` — modelo 1PL, MAP, Newton-Raphson, clamps
   - `universo.irt.progress` — información de Fisher, SE, selección de ítem, regla de parada
   - `universo.profile` — banda, déficits, misconceptions, track, estabilidad
   - `universo.slots.logic` — filtro por banda, conteo de activos, faltantes, confirmación

2. **Los `reg-event-fx` orquestan, no deciden.** Un handler lee del `app-db`, llama a funciones puras,
   escribe el resultado y dispara efectos. Si un handler contiene un `cond` con lógica de negocio, esa
   lógica está en el lugar equivocado.

3. **Todo el I/O pasa por `universo.db.crud`**, que devuelve `{:success … :data … :error …}` sobre
   `core.async`. Los componentes nunca llaman a Supabase.

4. **Los componentes no calculan.** Reciben datos de suscripciones y renderizan.

5. **Test obligatorio** para cada función pura nueva o modificada, en `test/**/…_test.cljs` con
   namespace terminado en `-test` (el build `:test` los descubre con `:ns-regexp "-test$"`).

6. **Reglas espejo:** cuando una regla también existe en SQL (confirmación de cupo, bandas), la versión
   ClojureScript se documenta como *espejo* y la fuente de verdad es la base de datos.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **Lógica dentro de los handlers de re-frame** | Es el camino natural y el más rápido de escribir, pero testear un `reg-event-fx` exige montar `app-db`, interceptores y efectos. En la práctica, no se testea |
| **Tests de integración contra Supabase** | Valiosos, pero necesitan un entorno de pruebas (que no existe, R-02), son lentos y frágiles. No sustituyen la verificación de las reglas |
| **Tests end-to-end en navegador** (Playwright/Cypress) | Cubren el flujo real, pero costosos de escribir y mantener para un solo desarrollador, y no verifican la corrección numérica del IRT |
| **Toda la lógica en SQL** (funciones y triggers) | Autoritativo y sin duplicación, pero la UI no podría anticipar resultados sin round-trip, y probar SQL requiere una base de pruebas |
| **Confiar en clj-kondo y el compilador** | Detectan errores de forma, no de lógica. Que `theta-band` compile no dice que 0,99 caiga en `basico` |
| **Sin tests** (verificación manual) | Con un solo desarrollador y sin CI, el primer refactor rompe algo silenciosamente. Ya ocurrió (`6cf0dc9`) |

## Consecuencias

**Positivas**

- **34 tests / 129 assertions con esfuerzo mínimo**, cubriendo exactamente las reglas que más duelen si
  se rompen. No hay mocks, ni fixtures, ni setup: son funciones de datos a datos.
- **La suite corre en un comando** (`clj -M:test`) y en segundos: no hay excusa para no correrla.
- **Las reglas son legibles como especificación.** `filter-slots-for-band` y `theta-band` se entienden
  sin contexto; sirven de documentación ejecutable del negocio.
- **Los casos borde están cubiertos donde importan:** banda `nil` (sin diagnóstico ⇒ ningún cupo),
  bordes exactos de banda, listas vacías, conteos en 0, el umbral exacto de confirmación.
- **Refactorizar es viable.** Con la lógica aislada, mover código de sitio no requiere probar la
  aplicación entera a mano.
- **Facilita el trabajo de agentes de IA:** un agente puede cambiar una regla y verificarla al instante,
  sin desplegar ni conectarse a nada.
- **Portabilidad:** si algún día hay que reimplementar el cliente, estas cuatro funciones son la
  especificación del dominio.

**Negativas / costos aceptados**

- **Duplicación deliberada con SQL** en las reglas espejo. Cambiar una obliga a cambiar la otra
  (R-08). Es el costo de que la UI pueda anticipar sin round-trip.
- **La cobertura es desigual por diseño:** `db/crud.cljs` (975 líneas), `events/admin.cljs` (738),
  `components/admin.cljs` (1060) y los efectos de `events/test.cljs` **no tienen tests**. Son
  precisamente los archivos más grandes (R-07).
- **Nada verifica la integración:** que `profile/build` sea correcto no garantiza que el resultado se
  persista bien en `student_profiles`. El contrato JSONB no está validado (R-09).
- **Cero cobertura de policies RLS**, que es donde vive la seguridad (R-14, T-11).
- **Requiere disciplina sostenida:** la ruta corta siempre será escribir el `cond` dentro del handler.
  Sin CI, nada lo impide mecánicamente.
- Los tests actuales son de casos elegidos a mano; no hay *property-based testing* (que encajaría muy
  bien con funciones puras y `test.check`).

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Se escribe lógica nueva dentro de handlers | Regla explícita en `CLAUDE.md` §5 y `AGENT_INSTRUCTIONS` §2; revisión en el cierre de sesión | — |
| Los tests dejan de correrse (sin CI) | T-06 (workflow que ejecute `clj -M:test`); regla dura antes de commitear | R-04 |
| Regla espejo desincronizada con SQL | Documentado en `ARCHITECTURE` §2.3; cambiar ambas en el mismo commit | R-08 |
| Falsa sensación de seguridad ("hay tests, está cubierto") | `AGENT_INSTRUCTIONS` §5.6 lista explícitamente lo que **no** está cubierto y exige prueba manual | R-07 |
| Monolitos sin cobertura acumulan regresiones | T-15: extraer lógica pura de `admin` y `crud` antes de descomponerlos | R-07 |

## Seguimiento

1. **T-06:** automatizar `clj -M:test` en CI. Es lo que convierte esta decisión de disciplina personal
   en garantía mecánica.
2. **T-15:** al descomponer los monolitos, extraer primero la lógica pura y testearla; el refactor se
   apoya en esos tests.
3. **T-11:** cubrir las policies RLS con verificación automatizada — es el hueco de cobertura más
   peligroso, porque ahí vive la seguridad.
4. Considerar **property-based testing** (`clojure.test.check`) para las funciones numéricas del IRT:
   invariantes naturales como "θ nunca sale de `[-3,3]`", "`|Δθ| ≤ 0,4` siempre", "más respuestas
   correctas nunca bajan θ", "`remaining-to-confirm` nunca es negativo".
5. Validar el contrato JSONB de `student_profiles.profile` (malli o `clojure.spec`) para cerrar R-09.

**Métrica de salud de esta decisión:** que cada regla de negocio de
[[../project-memory/REQUIREMENTS]] §3 tenga un test identificable. Hoy se cumple para RN-01..RN-08;
no para las reglas de admin y contenido.

---

Relacionado: [[../project-memory/ARCHITECTURE]] §2.2 · [[../project-memory/REQUIREMENTS]] §3 ·
[[../project-memory/TECH_STACK]] §5 · [[../project-memory/RISKS]] R-07, R-08 ·
[[ADR-001-clojurescript-re-frame-shadow-cljs]] · [[ADR-004-irt-1pl-map-y-regla-de-parada]]

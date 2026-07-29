# SESSION-003

## Fecha

2026-07-29

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Sonnet 5)

## Objetivo de la sesión

Identificar la siguiente tarea ejecutable del backlog y resolverla. Se determinó que era T-03
(control de capacidad en la inscripción a cupos), pendiente de verificación desde
[[../project-memory/OPEN_QUESTIONS]] Q-04. El objetivo no cambió durante la sesión.

## Contexto de entrada

- **Rama:** `visual-fixes`
- **Commit inicial:** `520ff79`
- **Estado del árbol al empezar:** limpio
- **Documentos de la memoria leídos:** `CLAUDE.md`, [[../project-memory/CURRENT_STATUS]],
  [[../project-memory/BACKLOG]], [[../project-memory/OPEN_QUESTIONS]] Q-04
- **Bloqueos vigentes al empezar:** ninguno para T-03 (a diferencia de T-01/T-02/T-04, no dependía
  de humano/acceso/negocio)

## Actividades realizadas

1. **Diagnóstico ("¿cuál es la siguiente tarea?"):** se leyeron `CURRENT_STATUS.md` y
   `BACKLOG.md`; de las tareas P0, T-03 era la única `abierto` sin bloqueo externo.
2. **Verificación de estado del repo:** `git log main..visual-fixes` mostró un solo commit
   (`520ff79`) y árbol limpio — se corrigió de paso una afirmación desactualizada en
   `CURRENT_STATUS.md` sobre `public/js/app.js` sin commitear (BL-04/T-08), que ya no aplicaba.
3. **Lectura de `001_mvp_schema.sql` completo** para responder Q-04: confirmado que el único
   trigger sobre `enrollments` (`enrollments_confirm_threshold`) corre `AFTER INSERT/UPDATE OF
   status` y solo confirma el cupo al llegar a `min_enrollments` — no bloquea nada. La policy
   `enrollments_insert_own` no valida `capacity`. El único límite era de UI
   (`components/slots.cljs`, `full? (>= active cap)`).
4. **Actualización de memoria con el hallazgo** (antes de implementar, a pedido del usuario en dos
   turnos separados): [[../project-memory/OPEN_QUESTIONS]] Q-04 marcada respondida,
   [[../project-memory/BACKLOG]] T-03 detallada, [[../project-memory/CURRENT_STATUS]] con nota
   fechada.
5. **Implementación de T-03:**
   - `supabase/migrations/011_enrollments_capacity_check.sql`: función
     `enforce_slot_capacity()` + trigger `enrollments_enforce_capacity`
     (`BEFORE INSERT OR UPDATE OF status`), que cuenta enrollments `pending|confirmed` del cupo
     (excluyendo la propia fila vía `id is distinct from new.id`) y rechaza con
     `raise exception 'Cupo lleno'` si ya alcanzó `capacity`.
   - `universo.slots.logic/capacity-reached?`: espejo puro (`active-count >= capacity`).
   - `test/universo/slots/logic_test.cljs`: 4 assertions nuevas para `capacity-reached?`.
   - `components/slots.cljs`: refactorizado para llamar a `logic/capacity-reached?` en vez de
     calcular `full?` inline (regla del proyecto — lógica de negocio en namespace puro).
   - No se tocó `crud/enroll-in-slot!` ni `:slots/enroll-fail`: ya propagaban `error.message` del
     backend de forma genérica, así que el mensaje `'Cupo lleno'` del `raise exception` llega a la
     UI sin cambios adicionales.
6. **Verificación:** `clj -M:test` → 34 tests / **133** assertions (antes 129) / 0 failures /
   0 errors.
7. **Documentación de la migración:** `supabase/SCHEMA.md` — nueva sección "Control de capacidad
   en inscripciones" + entrada 13 en "Orden de aplicación".
8. **Memoria actualizada tras implementar:** [[../project-memory/BACKLOG]] T-03 pasó a `en curso`
   (código listo, falta aplicar en Supabase real), [[../project-memory/CURRENT_STATUS]] con el
   resumen de lo implementado y un ítem nuevo en el checklist de go-live (§3).

Lo que **no se hizo** y queda pendiente: aplicar la migración `011` en el proyecto Supabase real
(se aplican a mano, no hay `supabase db push` en el flujo actual — `CLAUDE.md` §9). No se probó en
vivo la inscripción N+1 porque requiere acceso al proyecto real, igual que T-02.

## Archivos revisados

- `project-memory/CURRENT_STATUS.md`, `project-memory/BACKLOG.md`, `project-memory/OPEN_QUESTIONS.md`
- `supabase/migrations/001_mvp_schema.sql` (completo)
- `supabase/SCHEMA.md`
- `src/universo/slots/logic.cljs`, `src/universo/components/slots.cljs`
- `src/universo/db/crud.cljs` (`enroll-in-slot!`), `src/universo/events/slots.cljs`
  (`:slots/enroll!`, `:slots/enroll-fail`)
- `test/universo/slots/logic_test.cljs`, `test/universo/events/slots_test.cljs`
- `supabase/migrations/` (listado completo, para confirmar que no había migración posterior a `001`
  que ya cubriera esto)

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `supabase/migrations/011_enrollments_capacity_check.sql` | **Nuevo.** Trigger `BEFORE INSERT OR UPDATE OF status` que rechaza inscripciones que superen `capacity` |
| `src/universo/slots/logic.cljs` | Nueva función pura `capacity-reached?` |
| `src/universo/components/slots.cljs` | `full?` ahora usa `logic/capacity-reached?` en vez de calcular inline |
| `test/universo/slots/logic_test.cljs` | 4 assertions nuevas para `capacity-reached?` |
| `supabase/SCHEMA.md` | Nueva sección de la migración `011` + entrada en "Orden de aplicación" |
| `project-memory/OPEN_QUESTIONS.md` | Q-04 marcada como respondida, con la causa raíz |
| `project-memory/BACKLOG.md` | T-03 actualizada: hallazgo, luego `en curso` con detalle de lo implementado y lo pendiente |
| `project-memory/CURRENT_STATUS.md` | Nota fechada con el hallazgo y la implementación; corrección de BL-04/T-08 (árbol ya no sucio); nuevo ítem en checklist de go-live §3 |

## Comandos ejecutados y resultados

```
clj -M:test        → 34 tests / 133 assertions / 0 failures / 0 errors (antes 129 assertions)
npx shadow-cljs release app → no ejecutado (no se tocó nada que afecte el bundle de producción vía ClojureScript compilado; el cambio en slots.cljs sí lo afecta — pendiente antes de publicar)
npm run build:css  → no ejecutado (sin cambios de Tailwind)
graphify update .  → no ejecutado (pendiente, ver Pendientes)
git log main..visual-fixes --oneline → 520ff79 (un commit, árbol limpio)
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Excluir la propia fila por `id` en el conteo de capacidad (`id is distinct from new.id`), para que un `UPDATE` de `pending → confirmed` sobre la misma fila no se cuente dos veces | No (detalle de implementación, no de dominio) | `011_enrollments_capacity_check.sql`, este archivo |
| No agregar manejo de error especial en `crud.cljs`/`events/slots.cljs`: el `raise exception` del trigger ya se propaga como `error.message` con el mecanismo genérico existente | No | Este archivo |

## Riesgos identificados

Ninguno nuevo. Reduce parcialmente R-XX de "inscripción sin control de capacidad" (no tenía ID de
riesgo propio en [[../project-memory/RISKS]] — quedaba implícito en Q-04).

## Bloqueos

Aplicar la migración `011` en el proyecto Supabase real requiere acceso (mismo tipo de bloqueo que
T-02, BL-02) — humano: Jacobo Córdova.

## Preguntas abiertas nuevas

Ninguna. Q-04 quedó respondida (no cerrada del todo como tarea, porque falta aplicar en producción).

## Supuestos aplicados

Se asumió que el mensaje de error `'Cupo lleno'` del `raise exception` es aceptable como texto de
cara al usuario (coincide literalmente con el texto que ya mostraba la UI cuando el cupo estaba
lleno vía `full?`, así que no introduce un mensaje nuevo sin precedente).

## Próximos pasos

1. ~~Aplicar `011` y verificar en vivo~~ — aplicada por el owner; queda pendiente que alguien (owner
   o agente con acceso) confirme el rechazo N+1 contra el proyecto real, aunque no bloquea cerrar
   T-03.
2. **Decidir cuándo mergear `visual-fixes` → `main`** y republicar (recompilar release + build:css
   ya están hechos en el HEAD de `visual-fixes`, así que el merge sería directo) — cierra la brecha
   nueva detectada entre lo que hay en la DB (trigger activo) y lo que sirve GitHub Pages.
3. Seguir con T-19 (verificar qué versión sirve realmente `jacobocordova.com` hoy) para cerrar Q-13
   del todo.
4. Seguir con el resto de la lista de "Próximos pasos inmediatos" de
   [[../project-memory/CURRENT_STATUS]] §8 (T-01, T-02, T-04 siguen bloqueadas por humano/acceso/negocio).

## Pendientes

- ~~Migración `011` sin aplicar en Supabase real~~ — **resuelto**: el owner confirmó haberla
  aplicado el 2026-07-29 (mismo día, más tarde en la sesión). No verificado en vivo por el agente.
- ~~Bundle de producción no recompilado~~ — **resuelto**: se detectó que un `shadow-cljs watch app`
  corriendo en background había sobrescrito `public/js/app.js` con un build de desarrollo (8,5 MB)
  al guardar los cambios en `.cljs`; se corrigió con `npx shadow-cljs release app` +
  `npm run build:css` antes de commitear.
- `graphify update .` corrido (898 nodos, 1121 edges, 65 comunidades) y snapshot copiado a
  `project-memory/graph/`.
- Commit `0fd5f79` creado y pusheado por el usuario a `origin/visual-fixes`.
- **Nuevo pendiente:** rama `visual-fixes` (`520ff79` + `0fd5f79`) no está mergeada a `main` —
  el trabajo de UI ("minor fixes") y el refactor de T-03 no están en producción todavía, aunque el
  trigger de capacidad sí está activo en la DB real. Ver [[../project-memory/CURRENT_STATUS]] y T-19.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [ ] `project-memory/RISKS.md` — no se creó un ID de riesgo nuevo; se consideró que Q-04/T-03 ya lo cubrían suficientemente
- [ ] `project-memory/DECISIONS.md` — no aplicó, sin decisiones de nivel ADR
- [ ] `adr/ADR-0NN-….md` (nuevo) — no aplicó
- [ ] `project-memory/ARCHITECTURE.md` — no aplicó, no cambia el flujo general, solo endurece una regla ya documentada
- [ ] `project-memory/ROADMAP.md` — no aplicó
- [ ] `project-memory/REQUIREMENTS.md` — RF-5.10 ya referenciaba esto, no requirió cambio de texto
- [x] `project-memory/OPEN_QUESTIONS.md`
- [ ] `project-memory/ASSUMPTIONS.md` — no aplicó
- [ ] `project-memory/LESSONS_LEARNED.md` — no aplicó
- [ ] `project-memory/TERMINOLOGY.md` — no aplicó
- [ ] `project-memory/graph/` (snapshot de Graphify) — pendiente, ver "Pendientes"

## Notas

`graphify query` no aportó nada útil para "trigger que controla capacity en class_slots
enrollments" — devolvió ruido de `public/js/app.js` (nodos genéricos de un event bus, sin relación)
y las preguntas de `OPEN_QUESTIONS.md` ya conocidas. Confirma la limitación ya documentada en
[[../project-memory/GRAPHIFY_INTEGRATION_GUIDE]]: el grafo no indexa `.cljs` ni tiene granularidad
útil sobre el contenido de archivos `.sql` individuales — para este tipo de pregunta hace falta leer
la migración directamente.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../project-memory/BACKLOG]] · [[../project-memory/OPEN_QUESTIONS]] ·
`../prompts/session-close-memory-update.md`

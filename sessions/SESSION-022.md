# SESSION-022

## Fecha

2026-08-12

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

"Actualiza la documentación del proyecto." Sesión de **sincronización de memoria**, sin cambios de
código: poner `project-memory/`, `CLAUDE.md` y el snapshot del grafo al día con lo que efectivamente
está en `main` después del merge de PR #36 (eje de fluidez).

## Contexto de entrada

- Rama: `experimento-cuantica` @ `5207882`, idéntica a `origin/main` (`52afdae`, merge de PR #36).
- Estado del árbol al empezar: **limpio**.
- Documentos de la memoria leídos: `CLAUDE.md`, `CURRENT_STATUS`, `HANDOFF`, `ARCHITECTURE`,
  `DECISIONS`, `TERMINOLOGY`, `RISKS`, `OPEN_QUESTIONS`, `ROADMAP`, `REQUIREMENTS`, `TECH_STACK`,
  `PROJECT_BRIEF`, `VISION_LIBRO_PROYECTO`, `LESSONS_LEARNED`, `INDEX`, `BACKLOG` (T-63/T-65),
  `graph/README`, `sessions/SESSION-021`.
- Bloqueos vigentes al empezar: ninguno de código. ⏳ migración `041` sin aplicar.

## Actividades realizadas

1. **Verificación del estado real antes de escribir nada** (no se dio por buena ninguna afirmación
   de la memoria): `git diff origin/main experimento-cuantica` vacío, `origin/main` con el bundle que
   contiene `fluency`, `clj -M:test` corrido de verdad → **74 tests / 410 assertions / 0 failures**
   (la memoria decía 58/332, y `CLAUDE.md` seguía en 34/133 de julio).
2. **`ARCHITECTURE.md` era el documento más desactualizado:** no mencionaba `universo.irt.fluency`
   en ninguna parte. Se agregó el namespace, el recorrido del dato, las columnas de `041`, las
   claves nuevas del JSONB, y se completó la tabla de ADRs, que se había quedado en ADR-010 (faltaban
   nueve).
3. **Se resolvió una contradicción real, no cosmética:** `TERMINOLOGY` definía λ como
   `n_respuestas / Δt_sesión` (la fórmula del libro) mientras el código implementa la mediana de
   `t_rel` por ítem. Se marcó la definición del libro como histórica y se documentó la implementada,
   con la razón del cambio.
4. **Se registró lo que no estaba registrado:** D-43 (umbrales por banco) y D-44 (recálculo en el
   cliente + estado explícito de "no alcanza"), R-24 (etiquetar con umbrales sin calibrar) y Q-27
   (¿`min-responses = 4` es correcto, y sirve la misma medida en bancos difíciles?).
5. **Se corrigieron afirmaciones caducas encontradas de paso**, no solo lo relacionado con fluidez:
   R-23 faltaba en la tabla resumen de `RISKS`; `A-03` de `ARCHITECTURE` afirmaba que "hoy mismo hay
   un `app.js` sin commitear"; `RF-2.2` y `TERMINOLOGY`/`D-07` decían que θ arranca en 0,0 cuando
   D-39 la bajó a −1,0 el 11-08; `INDEX` no listaba tres archivos que existen.
6. **Snapshot del grafo refrescado** (`graphify update .` + copia a `project-memory/graph/`). El
   `README` de esa carpeta describía el snapshot de julio (105 nodos) aunque el reporte que tenía al
   lado era de agosto (2 376): se corrigió y se dejó el historial de tamaños explicado, porque el
   número sube y baja por qué archivos indexa el manifest, no por crecimiento del proyecto.

**Lo que no se hizo, a propósito:** no se tocó `BACKLOG.md` (T-63/T-65 ya estaban al día, escritos en
la sesión anterior) ni `SESSION-021.md` (es el registro de esa sesión, no de esta). Tampoco se
reescribió el cuerpo histórico de `CURRENT_STATUS`: se agregó la capa nueva arriba, como venía
haciéndose, en vez de inventar certeza sobre secciones no re-verificadas.

## Archivos revisados

- `src/universo/irt/fluency.cljs`, `src/universo/profile.cljs`, `src/universo/events/plan.cljs`,
  `src/universo/events/test.cljs`, `src/universo/db/crud.cljs`, `src/universo/components/plan.cljs`,
  `src/universo/components/admin_test_configs.cljs` — para describir el eje sin inventar.
- `supabase/SCHEMA.md` (estado de `041`), `supabase/migrations/041_*.sql`.
- `sessions/SESSION-021.md` (los dos addenda son la fuente de casi todo lo registrado acá).

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `CLAUDE.md` | Resumen ejecutivo con el segundo eje; lista de ns puros; tablas del diagrama; test count 74/410 |
| `project-memory/ARCHITECTURE.md` | `irt.fluency` en §1/§2.2/§2.3, columnas de `041` en §3.1, JSONB en §3.2, flujos §4.2/§4.4, tabla de ADRs completa (011–019), A-03 corregido, §11 con el snapshot nuevo |
| `project-memory/CURRENT_STATUS.md` | Cabecera al corte real (`52afdae`/`main`); nota de cierre del 12-08; tablero §1 (tests, perfil de dos ejes, migraciones con `041` ⏳, árbol/rama) |
| `project-memory/HANDOFF.md` | Cabecera, perfil de dos ejes, ns puros, migraciones, tests, tabla de estado, ADR-018/019, pendientes y próximos pasos reordenados |
| `project-memory/DECISIONS.md` | D-43, D-44; D-07 marcada como revisada por D-39 |
| `project-memory/RISKS.md` | R-24 nuevo; R-23 agregado a la tabla resumen |
| `project-memory/OPEN_QUESTIONS.md` | Q-27 nueva |
| `project-memory/TERMINOLOGY.md` | Fluidez (λ), `t_rel`, banda de fluidez, cuadrante θ × λ; aviso en "Frecuencia (λ)"; θ inicial −1,0 |
| `project-memory/REQUIREMENTS.md` | RF-3.8–3.11, RF-4.7–4.8; RF-2.2 corregido |
| `project-memory/ROADMAP.md` | Cabecera, F2 con el eje agregado post-cierre, F11 con la calibración de umbrales |
| `project-memory/PROJECT_BRIEF.md` | Perfil de dos ejes en §2 y en "Incluido y operativo"; S-07 con los tests reales |
| `project-memory/VISION_LIBRO_PROYECTO.md` | Recuadro "Estado real de §3.3": Eje 2 implementado con otra fórmula, Eje 3 descartado (D-41) |
| `project-memory/LESSONS_LEARNED.md` | Cuatro lecciones de SESSION-021 |
| `project-memory/TECH_STACK.md` | §5 con el listado real de tests y 74/410 |
| `project-memory/AGENT_INSTRUCTIONS.md` | Estado de referencia de tests |
| `project-memory/INDEX.md` | Tres archivos que faltaban en el mapa |
| `project-memory/graph/` | Snapshot refrescado (`GRAPH_REPORT.md`, `graph.json`, `graph.html`) + `README` corregido |

## Comandos ejecutados y resultados

```
clj -M:test                 → Ran 74 tests containing 410 assertions. 0 failures, 0 errors.
npx shadow-cljs release app → no se ejecutó (no cambió ClojureScript)
npm run build:css           → no se ejecutó (no cambiaron clases Tailwind)
graphify update .           → 1560 nodos, 1898 aristas, 144 comunidades (commit 5207882a)
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Umbrales de fluidez por banco, con fallback a los defaults del código | No (cubierta por ADR-019) | [[../project-memory/DECISIONS]] D-43 |
| Recalcular el eje en el cliente en vez de backfill; estado explícito cuando no alcanza la muestra | No (cubierta por ADR-019) | [[../project-memory/DECISIONS]] D-44 |
| La contradicción VISION §3.3 (Eje 3 como diferenciador) se resuelve a favor de D-41, anotándola en VISION en vez de editar la visión del owner | No | [[../project-memory/VISION_LIBRO_PROYECTO]] §3.3 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| El eje de fluidez etiqueta al estudiante con umbrales que nadie midió | Media | RISKS R-24 |

## Bloqueos

Ninguno. El único pendiente operativo es de **acceso**: aplicar `041` en el SQL Editor de Supabase
solo lo puede hacer el owner.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| ¿`min-responses = 4` es el mínimo correcto, y sirve la misma medida de fluidez en bancos difíciles? | OPEN_QUESTIONS Q-27 |

## Supuestos aplicados

Ninguno nuevo. Cada afirmación agregada se verificó contra el código, la base o `git`; lo que no se
pudo verificar quedó marcado con ⏳ (`041`) o pasó a Q-27.

## Próximos pasos

1. **Aplicar `041`** en el SQL Editor (T-65). Es idempotente y ya se probó contra un PostgreSQL 14
   desechable.
2. **Difundir el cupo del 2026-08-15** y revisarlo el día 14 (R-19, R-11).
3. **Calibrar los umbrales de fluidez con datos** (`fluency/calibration-report`) — T-65, R-24.
4. **Instrumentar el embudo** (T-20).

## Pendientes

- `041` sin aplicar en producción. Hasta entonces `test_configs` no tiene las columnas y el cliente
  usa `fluency/default-thresholds` — funciona, pero los cortes no son editables desde el panel.
- La calibración real de los umbrales sigue esperando volumen de diagnósticos con tiempo medido.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [ ] `project-memory/BACKLOG.md` — sin cambios necesarios: T-63/T-65 ya estaban al día
- [x] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [ ] `adr/ADR-0NN-….md` (nuevo) — ninguno: D-43/D-44 caen dentro de ADR-019
- [x] `project-memory/ARCHITECTURE.md`
- [x] `project-memory/ROADMAP.md`
- [x] `project-memory/REQUIREMENTS.md`
- [x] `project-memory/OPEN_QUESTIONS.md`
- [ ] `project-memory/ASSUMPTIONS.md` — sin supuestos nuevos
- [x] `project-memory/LESSONS_LEARNED.md`
- [x] `project-memory/TERMINOLOGY.md`
- [x] `project-memory/graph/` (snapshot de Graphify)

## Notas

El patrón que más rindió en esta sesión: **buscar contradicciones entre documentos en vez de
agregar texto nuevo**. Las tres cosas más útiles que salieron —λ definida de dos formas distintas,
θ inicial documentada en un valor que ya no rige, R-23 ausente de su propia tabla resumen— no eran
huecos, eran afirmaciones vigentes y falsas, que es la clase de error que la memoria del proyecto
propaga sin que nadie lo note.

---

Relacionado: [[SESSION-021]] · [[../project-memory/CURRENT_STATUS]] ·
[[../project-memory/AGENT_INSTRUCTIONS]] · `../prompts/session-close-memory-update.md`

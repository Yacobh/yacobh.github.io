# SESSION-044

## Fecha

2026-09-17 y **2026-09-18** (dos días, una sesión)

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code — Claude Opus 5

## Objetivo de la sesión

Estudiar **cómo está configurado hoy el flujo del estudiante** —el orden de los diagnósticos, los
distintos ejes, qué se decidió a medias— y construir una **skill** que le diga a una IA que entra en
frío **todos los lugares** donde hay que poner información al dar de alta un contenido.

El objetivo se cumplió y **creció dos veces**, las dos por hallazgos medidos:

1. El owner preguntó por `order_index` en `questions`, y eso terminó en **dos decisiones más**
   (empates de `next_question` y tiempo esperado por ítem).
2. El estudio del flujo destapó **un defecto en producción** que nadie había visto.

**Día 1: documentación y decisión, sin implementación.** Dos ADR aprobados, una skill con su
verificador, y memoria.

**Día 2 (2026-09-18): el owner pidió acceso a la base, y eso cambió la sesión.** Acceso real, las dos
primeras migraciones aplicadas por el agente, y **cuatro defectos que la documentación ocultaba** —
tres de ellos en cosas escritas el día anterior, incluida una de esta misma ficha. Ver el bloque
«Día 2» al final.

## Contexto de entrada

- Rama: `main`
- Commit inicial: `4314ebe`
- Estado del árbol al empezar: **limpio**
- Documentos de la memoria leídos: `CLAUDE.md`, `CURRENT_STATUS`, `BACKLOG` (T-101, T-105…T-124,
  T-128…T-149), `RISKS` (R-24, R-30, R-37…R-44), `OPEN_QUESTIONS` (Q-42, Q-47), `DECISIONS`,
  `adr/ADR-004`, `ADR-014`, `ADR-019`, `ADR-029`, `ADR-034`, `ADR-035`, `supabase/SCHEMA.md`,
  skill `banco-de-items` completa
- Bloqueos vigentes al empezar: ninguno. **T-118 figuraba como la P0 que encabezaba el backlog**
  (resultó estar cumplida desde hacía 20 días)

## Actividades realizadas

1. **Mapeo del flujo real del estudiante**, leyendo el código y no la memoria. Estado medido: la
   unidad rendible es **el eje** (4 `test_configs`, `059`); `next_question` filtra **solo por
   `topic`** y el módulo no participa; las bandas de módulo **no seleccionan ítems**, solo leen θ;
   `min_theta` es **`NULL`** en los cuatro ejes (basta *haber rendido*, no haber alcanzado);
   **después del diagnóstico no hay nada que rendir**.
2. ⭐ **Hallazgo en producción:** `universo.topics/module-slugs` (`topics.cljs:64`) lista **20
   slugs** y **no incluye los seis `probabilidad/*`** que creó `055`, ni electrotecnia. Cadena
   verificada en el código, no supuesta: `question-select-cols` (`crud.cljs:597`) trae `module_id`
   pero **no `module_slug`** → `profile/module-slug-for` (`profile.cljs:36-48`) cae a
   `topics/module-slug-for` → `nil` → déficit `unknown/probabilidad` →
   `plan/resources-for-deficits` (`plan.cljs:43`) devuelve `:general`. **Los 102 ítems de
   probabilidad y los 116 de electrotecnia no pueden producir un plan personalizado.** La migración
   estaba perfecta, el build en verde, los seis auditores en verde.
   > ⚠️ **Corregido el 2026-09-18 con acceso a la base: esa última frase es FALSA.** La cadena existe
   > y el fallback está roto, pero `events/test.cljs:35` copia `module_slug` del RPC a cada ítem, y
   > **100 % de las respuestas del motor v2 lo traen** (0 % en v1). Desde el 2026-08-28 `profile` lo
   > encuentra en el primer `or` y nunca llega al fallback. El defecto era **latente**. Se verificó
   > la cadena en el código y se dio por hecha la consecuencia sin medirla. Ver T-152 y el día 2.
3. **Skill `unidad-de-contenido`** (SKILL.md + 3 referencias + plantilla + verificador). La
   referencia central es el **mapa de los 18 lugares**, cada uno con *qué pasa si no lo tocás* —
   todos fallan en silencio salvo uno.
4. **`scripts/verificar_unidad.py`**, séptimo auditor. **Lee el código en vez de copiarlo**: saca
   los tracks válidos de la constraint real de las migraciones y los slugs del `def` de
   `topics.cljs`, y avisa si no pudo mirar en vez de dar verde.
5. **Probado contra una unidad real de producción** (`probabilidad/posicion`): reprodujo el defecto
   del punto 2. La prueba **encontró además un bug propio** — el regex de slug aceptaba `_` pero no
   `-`, y `probabilidad/tendencia-central` es real. Corregido.
6. **A pedido del owner, referencia nueva `las-tablas-y-su-sentido.md`**: qué significa cada tabla
   **hoy** (🟢 portante / 🟡 semántica corrida / 🔴 vacía), el diagrama de relaciones, y **las tres
   juntas flojas**. `module_prerequisites` y `resource_misconceptions` están 🔴: bien diseñadas,
   cero filas, nadie las lee.
7. **ADR-038 — el módulo es rendible** (decisión del owner). El eje ubica, el módulo mide.
8. **Estudio de `order_index`**, a pedido del owner. Medido que **es el rango de dificultad dentro
   del módulo** (2 inversiones en 476 pares consecutivos) y no aporta nada. Pero la pregunta destapó
   dos cosas reales que entraron a los ADR.
9. **ADR-039 — `expected_seconds` por ítem.**
10. **T-118 cerrada** con la evidencia de `SCHEMA.md`.

**Lo que NO funcionó / se descartó, para que no se repita:**

- **Repurposear `order_index`** como segunda dimensión. Se midió antes de opinar y no aporta
  información sobre `difficulty`. Se descartó además por la lección de L-46/T-51: una columna cuyo
  nombre significa otra cosa es la próxima entrada de `LESSONS_LEARNED`.
- **Desempatar por el ítem menos servido**, que es lo que más ayudaría a G-2: hoy **no se puede**,
  el conteo por ítem está enterrado en el `jsonb` de `tests.test` (T-144). Se optó por `random()`.
- **Una afirmación propia que hubo que corregir a mitad de sesión:** se dijo que λ compara contra
  «una vara de 3 segundos». **Falso en el mecanismo** — λ normaliza por `largo/20`. Se midió y el
  resultado fue más preciso *y* más grave: el normalizador es **plano en los cuatro tramos de
  abajo**, así que es un tiempo absoluto disfrazado de razón para **81 de 100 ítems**. La corrección
  quedó dentro de ADR-039.

## Archivos revisados

- `src/universo/topics.cljs`, `profile.cljs`, `plan.cljs`, `bands.cljs`, `access.cljs`
- `src/universo/irt/fluency.cljs`, `irt/effort.cljs`
- `src/universo/db/crud.cljs` (`question-select-cols`, `next-question`, `fetch-test-configs`)
- `src/universo/events/test.cljs`, `components/diagnostic_test.cljs`, `components/admin_questions.cljs`
- `supabase/migrations/001`, `020`, `021`, `022`, `024`, `027`, `028`, `041`, `045`, `046`, `048`,
  `049`, `055`, `057`, `059`, `060`, `062`, `067`
- `contenido/items/*.json` (los seis bancos, medidos con Python)
- `.claude/skills/banco-de-items/` completa

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `.claude/skills/unidad-de-contenido/SKILL.md` | **nuevo** — flujo, diferencia con `banco-de-items`, el módulo rendible |
| `.claude/skills/unidad-de-contenido/referencias/mapa-de-la-unidad.md` | **nuevo** — los 18 lugares y su modo de fallo |
| `.claude/skills/unidad-de-contenido/referencias/las-tablas-y-su-sentido.md` | **nuevo** — qué significa cada tabla hoy, relaciones, las tres juntas flojas |
| `.claude/skills/unidad-de-contenido/referencias/preguntas-de-alta.md` | **nuevo** — 22 preguntas en 7 bloques |
| `.claude/skills/unidad-de-contenido/referencias/metricas-de-la-unidad.md` | **nuevo** — 11 métricas de completitud + 5 de salud + lo no medible |
| `.claude/skills/unidad-de-contenido/plantilla-unidad.json` | **nuevo** — el molde, con el porqué de cada campo |
| `scripts/verificar_unidad.py` | **nuevo** — séptimo auditor, 466 líneas |
| `adr/ADR-038-el-modulo-es-rendible.md` | **nuevo** |
| `adr/ADR-039-tiempo-esperado-por-item.md` | **nuevo** |
| `CLAUDE.md` | §5: la skill nueva y su verificador |
| `project-memory/BACKLOG.md` | **T-118 cerrada** y fuera de la fila P0; **T-149** y **T-150** nuevas |
| `project-memory/DECISIONS.md` | **D-69** y **D-70** |
| `project-memory/OPEN_QUESTIONS.md` | **Q-47** anotada — sigue abierta, ya no trabada |
| `project-memory/CURRENT_STATUS.md` | bloque de la sesión |
| `sessions/SESSION-044.md` | este archivo |

## Comandos ejecutados y resultados

```
python3 scripts/verificar_unidad.py <plantilla>       → ✓ 0 errores, 3 avisos
python3 scripts/verificar_unidad.py <posicion.json>   → ✗ 1 error (el defecto real de producción)
python3 scripts/verificar_unidad.py <caso hostil>     → ✗ 5 errores, 12 avisos (todas las rutas)
python3 scripts/audit_{dark_theme,contraste,movil,html,paleta}.py → los cinco OK
clj -M:test                → NO se corrió: no se tocó ClojureScript
npx shadow-cljs release app→ NO aplica: no se tocó ClojureScript
npm run build:css          → NO aplica
graphify update .          → pendiente (ver Pendientes)
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| El módulo pasa a ser rendible: el eje ubica, el módulo mide. `test_configs` gana `item_topic` + `module_id`; `next_question` una sobrecarga con `p_module_id` | **ADR-038** | D-69, T-149 |
| El empate de `next_question` se rompe con `random()` | ADR-038 §Empates | D-69, T-149 |
| Los cortes de λ se fijan **por módulo**, aprovechando las 26 filas nuevas de `test_configs` | ADR-038 §Fluidez | D-69, T-149, T-116 |
| `questions` gana `expected_seconds`, nullable con fallback a `reading-seconds` | **ADR-039** | D-70, T-150 |
| **No** se repurposea `order_index`: es el rango de dificultad con otro nombre | ADR-039 §Alternativas | D-70 |
| Un contenido nuevo entra por la skill `unidad-de-contenido` | — | `CLAUDE.md` §5 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Un módulo nuevo sin su slug en `universo.topics` deja el plan sin personalizar, en silencio | 🔺 alto | **No se abrió R- nuevo**: es una instancia concreta de **R-41/R-17** y la mitigación quedó en `verificar_unidad.py` + el mapa. **Ver Pendientes** |
| El selector pasa de 4 a ~30 filas con los bancos muertos todavía dentro | 🔸 medio | ADR-038 §Riesgos; T-122 y T-138 suben a **precondición dura** de T-149 |
| λ clasifica invertido en los extremos | 🔺 alto | ADR-039 §Contexto; **no se abrió R- nuevo** — ver Pendientes |

## Bloqueos

Ninguno. Las dos decisiones son del owner y las tomó en la sesión.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| Ninguna nueva | — |

**Q-47 se anotó, no se cerró:** sigue abierta, pero deja de estar trabada — ADR-039 le da el lugar
donde resolverse y ADR-038 §Fluidez una mitigación mientras tanto.

## Supuestos aplicados

Ninguno nuevo. **Regla que se siguió y conviene dejar escrita:** cada afirmación cuantitativa de esta
sesión se midió sobre el repo antes de escribirse. Dos veces el resultado **contradijo** lo que el
agente iba a afirmar (el «piso del banco funciona» y la «vara de 3 segundos»), y las dos quedaron
corregidas en el documento, no en la conversación.

## Próximos pasos

1. **T-131** — el café con el colega, con el mapa de errores en pantalla. **No espera a nada de
   esta sesión** y es lo único que mide el negocio (R-30).
2. **Arreglar `universo.topics/module-slugs`** — 6 slugs de probabilidad + electrotecnia, `release
   app` y commit de `app.js`. Es el defecto de producción del punto 2, y es de una línea.
3. **T-122 + T-138** — precondición dura de T-149.
4. **T-149** — implementar ADR-038.
5. **T-150** — implementar ADR-039, empezando por **un** módulo.

## Pendientes

- **`graphify update .` no se corrió.** Se agregaron 9 archivos Markdown/JSON que el grafo sí indexa.
  Falta correrlo y refrescar `project-memory/graph/`.
- **El defecto de `module-slugs` no tiene ficha de backlog propia.** Está documentado en la skill, en
  el ADR y en esta sesión, y el verificador lo atrapa — pero **no está en `BACKLOG.md` como tarea**,
  así que no aparece en ninguna lista de prioridades. Falta abrirle una T-.
- **No se abrió riesgo nuevo en `RISKS.md`** para los dos hallazgos 🔺 de la tabla de arriba. Se
  decidió no inventar numeración a esta altura de la sesión; falta decidir si son R- propios o
  instancias de R-41/R-24.
- **T-117 sigue sin medirse.** El reparto por eje se adoptó hace 20 días y nadie comprobó si movió el
  37 %. Hay 40 tests reales para hacerlo.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [ ] `project-memory/RISKS.md` — **pendiente**, ver Pendientes
- [x] `project-memory/DECISIONS.md`
- [x] `adr/ADR-038-el-modulo-es-rendible.md` (nuevo)
- [x] `adr/ADR-039-tiempo-esperado-por-item.md` (nuevo)
- [ ] `project-memory/ARCHITECTURE.md` — no cambió el esquema todavía; cambia con T-149/T-150
- [ ] `project-memory/ROADMAP.md` — sin cambio de fase
- [ ] `project-memory/REQUIREMENTS.md`
- [x] `project-memory/OPEN_QUESTIONS.md`
- [ ] `project-memory/ASSUMPTIONS.md`
- [ ] `project-memory/LESSONS_LEARNED.md` — **candidata clara**: la lección de T-118 (una ficha que
      describe su cierre en futuro no se entera cuando el futuro llega). Ver Pendientes
- [ ] `project-memory/TERMINOLOGY.md`
- [ ] `project-memory/graph/` — **pendiente**

## Notas

**La sesión produjo cero código y encontró un defecto de producción.** Vale anotarlo porque va en
contra del reflejo: el hallazgo de `module-slugs` no salió de correr nada ni de un test, sino de
**seguir una cadena de lecturas hasta el final** —`crud` → `profile` → `topics` → `plan`— en vez de
parar en la primera que parecía responder.

**Y el verificador encontró un bug propio al primer uso real.** `verificar_unidad.py` pasó contra su
propia plantilla y falló contra `probabilidad/posicion`, una unidad que existe en producción: el
regex de slug aceptaba `_` pero no `-`. **Una herramienta probada solo contra su propio ejemplo está
probada contra nada.**

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../adr/ADR-038-el-modulo-es-rendible]] · [[../adr/ADR-039-tiempo-esperado-por-item]] ·
`../prompts/session-close-memory-update.md`

---

# Día 2 — 2026-09-18

## Objetivo

El owner preguntó **cómo darle al agente acceso al SQL Editor**. Terminó en acceso real a la base,
las dos primeras migraciones aplicadas por el agente, y **cuatro defectos que la documentación
ocultaba** — tres de ellos en cosas escritas el día anterior.

## Actividades

1. **ADR-040 + `supabase/acceso_del_agente.sql`** — dos roles de PostgreSQL. `claude_ro` (default,
   solo lectura) y `claude_ddl` (migraciones de contenido, a pedido). Corregidos `CLAUDE.md` §9, la
   skill `banco-de-items` y el paso 8 de `unidad-de-contenido`, que decían lo contrario.
2. **El `grant` que Supabase rechazó, y que mejoró el diseño.** `grant postgres to claude_ddl` →
   `42501`: en PG16+ el `postgres` de Supabase no tiene ADMIN OPTION sobre sí mismo. Obligó a un
   **límite técnico real** (`claude_ddl` no es dueño de nada → contenido sí, esquema no) en vez de
   la «separación de flujo de trabajo» que no contenía nada.
3. **Conexión, dos trabas:** la contraseña de `openssl rand -base64 32` trae `/` y rompe la URL (hay
   que percent-encodearla); y la conexión directa es **solo IPv6**, así que va el **pooler en modo
   sesión** con el ref pegado al usuario (`claude_ro.<project-ref>`).
4. ⭐ **`tests` tenía `email-user` poblada en las 350 filas.** ADR-040 afirmaba lo contrario. El rol
   de lectura podía ver los correos de estudiantes menores. Corregido con `tests_sin_identidad`,
   verificado en **0 correos y 0 arrobas**. Es **R-45**.
5. **M1…M11 sobre la base real, por primera vez.** M1 tenía un bug propio (no excluía `cuantica`).
6. **T-117 corrida: no es medible todavía**, y el porqué vale más que el número.
7. **068 y 069 aplicadas** — las primeras del agente bajo ADR-040.
8. **T-152 abierta, corregida y cerrada** el mismo día.
9. **`comparar_module_slugs.py`** — octavo auditor.

## Los cuatro defectos que el acceso destapó

| # | Defecto | Dónde estaba escrito lo contrario |
|---|---|---|
| 1 | `difficulty` es `real` y `band_min` es `numeric`: compararlos da falsos positivos en los bordes | M3 de la skill, escrita el día anterior |
| 2 | Dos ítems de `068` con las cuatro `misconception_*` en null — no diagnosticaban nada | el JSON de la tanda, verificado en verde |
| 3 | M1 contaba `cuantica` y «contradecía» a `CURRENT_STATUS` | M1 de la skill |
| 4 | ⭐ `tests.email-user` poblada en 350 filas | ADR-040, escrito esa misma mañana |

**Tres de los cuatro son de cosas escritas en esta misma sesión, y ninguno lo vio un script.**

## Lo que NO funcionó, y es lo más útil para la próxima

⚠️ **Afirmé daño sin medir el camino completo.** La ficha de T-152 decía *«cinco personas reales ya
rindieron un diagnóstico cuyo plan no se pudo personalizar»*. **Falso.** `events/test.cljs:35` copia
`module_slug` del RPC a cada ítem: **0 % de las respuestas del motor v1 lo traen y 100 % de las de
v2**, así que desde el 2026-08-28 `profile` nunca llega al fallback roto. El defecto era **latente**.
Verifiqué la cadena en el código y **di por hecha la consecuencia** — el error exacto contra el que
la propia sesión venía advirtiendo.

⚠️ **Y el arreglo que propuse tampoco era el arreglo.** Agregar los 18 slugs no resuelve nada:
`suffix-match` compara el *topic* con el sufijo, y ningún módulo tiene sufijo `probabilidad`. Lo que
cierra T-152 es `catch-all-topics`.

⚠️ **Un trinquete que no trinca.** El test fijaba `(= 20 (count module-slugs))` y **nadie lo movió
mientras el banco crecía a 53 módulos**, porque no falla si el `def` tampoco crece. Un trinquete que
solo se actualiza cuando alguien ya hizo el trabajo no avisa de nada.

⚠️ **Fragmento de contraseña en la conversación.** El primer error de psql imprimió 13 de los 44
caracteres de la de `claude_ro`. Rotarla es `alter role claude_ro password '...'` + recargar `.env`.

## Comandos

```
clj -M:test                → 213 tests / 2843 assertions / 0 failures
npx shadow-cljs release app→ 250 archivos, 178 compilados, 0 warnings
comparar_module_slugs.py   → ✓ verde tras T-152
068 y 069                  → aplicadas en producción, 9 controles en cero
graphify update .          → ver Pendientes
```

## Decisiones

| Decisión | ADR | Dónde |
|---|---|---|
| El agente accede con dos roles y aplica migraciones de contenido | **ADR-040** | D-71, T-151 |
| `tests` sale del alcance; se ve por `tests_sin_identidad` | ADR-040 (corregido) | D-71, `SCHEMA.md`, R-45 |
| Los bancos de eje van a `catch-all-topics` | — | T-152 |
| `cuantica` queda fuera de `module-slugs` | ADR-018 (vigente) | T-152, `TRACKS_TOLERADOS` |

## Riesgos

| Riesgo | Severidad | Dónde |
|---|---|---|
| El acceso del agente se diseña leyendo la doc, no la base | 🔺 alto | **R-45 (nuevo)** |
| El banco no llega al suelo: **4 de 22 (18 %)** en el clamp, era 2 de 12 | 🔺 alto | **R-44 actualizado** |

## Pendientes del día 2

- **`graphify update .`** sin correr después de los últimos commits.
- **Rotar la contraseña de `claude_ro`** (decisión del owner).
- **`numeros`, `algebra`, `geometria` NO están en `catch-all-topics`** y atribuyen los 100 ítems del
  eje a un solo módulo. Anterior a T-152, hoy inofensivo, anotado en el código y **sin ficha**.
- **R-44 sigue sin mitigación** y empeoró.
- **T-131** —el café con el colega— **sigue sin moverse**, y es lo único que mide el negocio.

## Nota para la próxima sesión

**El acceso a la base cambia cómo hay que trabajar acá.** En dos días encontró cuatro defectos que
ninguna cantidad de lectura había encontrado en meses. La regla que sale de eso, y que conviene
tratar como norma: **antes de afirmar un número o una consecuencia, correr la consulta.** Tres de
los cuatro defectos eran afirmaciones escritas con confianza el día anterior.

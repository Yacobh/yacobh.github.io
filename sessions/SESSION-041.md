# SESSION-041

## Fecha

2026-09-09

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code · Opus 5

## Objetivo de la sesión

Llenar la base con contenido de **Electrotecnia** —circuitos de continua y de alterna— de la misma
forma en que se generó el contenido de Mecánica Cuántica y el de los cuatro ejes PAES, para un
alumno que quiere empezar a usar la plataforma. El material de partida fue una foto de una prueba
real de la asignatura (reactancia, impedancia, leyes de Kirchhoff en circuitos de CA).

El objetivo **no** cambió, pero apareció una decisión que el pedido no anticipaba y que hubo que
resolver antes de escribir nada: ver «Contexto de entrada» y ADR-035.

## Contexto de entrada

- Rama: `track-electrotecnia`, creada desde `main` (`4beb81f`)
- Commit inicial: `4beb81f` — «Registrar que 060 quedó aplicada»
- Estado del árbol al empezar: **sucio**, y no por esta sesión —
  `M supabase/migrations/029_topic_normalization.sql` (una edición que descomenta una consulta de
  verificación) y `?? supabase/migrations/061_visitor_fuente.sql` (sin commitear). **No se tocaron**;
  quedan anotados en CURRENT_STATUS.
- Documentos de la memoria leídos: `CLAUDE.md`, `ADR-018`, `CURRENT_STATUS`, `SCHEMA.md`,
  `DECISIONS`, `RISKS`, `BACKLOG`, `LESSONS_LEARNED`, la skill `banco-de-items` con sus dos
  referencias, y las migraciones `033`–`041`, `046`, `048`, `055`–`060`.
- Bloqueos vigentes al empezar: ninguno técnico. Uno de decisión, que se resolvió preguntando (ver
  abajo).

## Actividades realizadas

1. **Orientación con el grafo y lectura del precedente.** `graphify query` sobre el track de
   cuántica, y después lectura directa de `033`–`041` para el patrón concreto (dollar-quoting, CTE +
   `left join` por slug, idempotencia por `where not exists`, batería de control y reversión al pie).

2. **Se detectó el problema que el pedido no anticipaba, antes de escribir código.** El aislamiento
   de `cuantica` (`test_configs.active = false`) **no es reusable acá**: la policy
   `test_configs_select` de `020` es `using (active = true or public.is_admin())` —dos estados y
   ninguno intermedio— y el destinatario de este track no es admin. Se le presentaron al owner las
   tres opciones reales (apagado, publicado, publicado con migración de encendido aparte) junto con
   el alcance y la capa 1.

3. **Decisiones del owner:** publicar con `active = true` aceptando el ruido en el selector de todo
   estudiante de PAES; curso completo (~12 módulos); e incluir recursos de capa 1.

4. **Se verificó qué ata el motor al temario.** `grep` sobre `src/`: el único namespace que nombra
   tracks es `universo.bands` (`track-order`, `product-tracks`). Consecuencia que decidió el diseño:
   un track desconocido **no recibe banda derivada**, así que los 12 módulos llevan banda
   **explícita** y con eso el track entra sin recompilar el bundle **y sin mover** las bandas de los
   26 módulos del producto (lo que `060` acababa de estabilizar).

5. **`062` — track y módulos.** Doce módulos con `historical_blurb` verificable, `order_index`
   2010–2120 y bandas explícitas de −3,0 a 2,6. Amplía los `check` de `modules.track` **y de
   `class_slots.track`** (esto último es la lección explícita de `046`).

6. **Los 116 ítems, por la skill `banco-de-items` y sin tocarle una línea.** Dos tandas JSON en
   `contenido/items/`, verificadas con `verificar_items.py` y convertidas a migración con
   `generar_migracion_items.py`. El reparto de claves se equilibró permutando alternativas **antes**
   de que nada estuviera aplicado (L-56 no aplica: no hay histórico que romper).

7. **`065` — las dos configuraciones, con dos guardas.** Se niega a correr si faltan los doce
   módulos y si algún banco no llega a 20 ítems activos. Es T-125 al revés: allá hubo ítems sin
   config; el defecto simétrico —config sin banco— deja al estudiante sin preguntas a mitad del
   diagnóstico.

8. **`066` — 24 recursos**, guía + práctica guiada por módulo, todos `published = false`.

9. **Verificación contra un PostgreSQL 14 desechable.** Lo que **no funcionó** y por qué vale
   documentarlo: el primer intento fue replicar la historia entera aplicando `001`…`061` sobre una
   base vacía, y **`001` falla en su tercera sentencia** porque `public.questions`, `profiles`,
   `tests`, `class_slots`, `visitor`, `contacto` y `guestbook` **preexisten al MVP** — se crearon
   desde el dashboard y ninguna migración las crea. El segundo intento —arrancar postgres con socket
   Unix en el scratchpad— tampoco: la ruta supera los 103 bytes que permite el socket, hubo que
   levantarlo por TCP. Lo que sí funcionó: fixture a mano **solo** para las tablas previas al MVP
   (más `auth.uid()` e `is_admin()`, que viven fuera de la cadena) y **las migraciones reales del
   repositorio para todo lo demás**. Ese matiz importa: es la lección de la 7ª pasada del 2026-08-28
   —un fixture escrito desde la creencia del agente no prueba nada— y por eso se escribió lo mínimo.

10. **Batería completa sobre esa base:** aplicación limpia en orden; las dos guardas de `065`
    frenando con el mensaje correcto (probadas a propósito, aplicándola antes de tiempo);
    idempotencia verificada **por hash** de todo el contenido tras una segunda corrida de las cinco;
    `next_question` devolviendo ítem en los dos bancos y en θ = −2, 0 y +2, con el módulo que
    corresponde a esa altura de la escala; doce ítems consecutivos sin agotar ninguno de los dos
    bancos; un ítem marcado `active = false` dejando de servirse; y la reversión completa dejando la
    base exactamente como estaba.

11. **Memoria del proyecto actualizada** según §11 de `CLAUDE.md`.

## Archivos revisados

- `CLAUDE.md`, `adr/ADR-018-track-experimental-cuantica.md`
- `supabase/migrations/033`, `034`, `036`, `039`, `040`, `041`, `046`, `048`, `055`, `057`, `059`, `060`
- `supabase/SCHEMA.md`, `supabase/migrations/001_mvp_schema.sql`, `020`, `024`, `027`, `029`
- `src/universo/bands.cljs`, `src/universo/profile.cljs`, `src/universo/topics.cljs`
- `scripts/verificar_items.py`, `scripts/generar_migracion_items.py`
- `.claude/skills/banco-de-items/SKILL.md` y sus referencias
- `contenido/items/probabilidad.json` (para el formato de tanda)
- `project-memory/CURRENT_STATUS.md`, `DECISIONS.md`, `RISKS.md`, `BACKLOG.md`, `LESSONS_LEARNED.md`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `supabase/migrations/062_electrotecnia_track_y_modulos.sql` | **nuevo** · track, 12 módulos con banda explícita, los dos `check` ampliados |
| `supabase/migrations/063_banco_de_electrotecnia.sql` | **nuevo, generado** · 74 ítems, 54 ideas erróneas |
| `supabase/migrations/064_banco_de_electrotecnia_ca.sql` | **nuevo, generado** · 42 ítems, 6 ideas erróneas |
| `supabase/migrations/065_test_configs_de_electrotecnia.sql` | **nuevo** · las 2 configs con `active = true`, dos guardas, batería y reversión |
| `supabase/migrations/066_electrotecnia_resources.sql` | **nuevo** · 24 recursos, `published = false` |
| `contenido/items/electrotecnia.json` | **nuevo** · fuente de verdad del banco general |
| `contenido/items/electrotecnia_ca.json` | **nuevo** · fuente de verdad del banco de alterna |
| `adr/ADR-035-track-electrotecnia-visible.md` | **nuevo** |
| `project-memory/CURRENT_STATUS.md` | bloque del 2026-09-09 y fecha de corte |
| `project-memory/DECISIONS.md` | D-66 |
| `project-memory/RISKS.md` | R-42 (resumen + detalle) |
| `project-memory/BACKLOG.md` | T-127, T-128, T-129 y las tablas de prioridad |
| `project-memory/LESSONS_LEARNED.md` | L-57 |
| `project-memory/ARCHITECTURE.md` | `track` admite `electrotecnia`; ADR-035 en la tabla de ADRs |
| `supabase/SCHEMA.md` | entradas 63–67, sección del track y nota sobre `061` sin registrar |
| `sessions/SESSION-041.md` | este archivo |

**No se tocó una sola línea de ClojureScript, CSS ni HTML.**

## Comandos ejecutados y resultados

```
python3 scripts/verificar_items.py contenido/items/electrotecnia.json
                                   contenido/items/electrotecnia_ca.json
                                     → ✓ sin errores · 116 ítems
                                       electrotecnia:    A 21 · B 14 · C 20 · D 19
                                       electrotecnia_ca: A 12 · B  7 · C 13 · D 10
python3 scripts/generar_migracion_items.py … → ✓ 063 (74/54) y 064 (42/6)
clj -M:test                                  → 181 tests / 2677 assertions / 0 failures / 0 errors
python3 scripts/audit_dark_theme.py          → OK
python3 scripts/audit_contraste.py           → OK
python3 scripts/audit_movil.py               → OK
python3 scripts/audit_html.py                → OK
python3 scripts/audit_paleta.py              → OK
npx shadow-cljs release app                  → NO CORRIDO (no cambió ClojureScript)
npm run build:css                            → NO CORRIDO (no cambiaron clases Tailwind)
graphify update .                            → corrido al cerrar
psql (PostgreSQL 14 desechable)              → 062…066 limpio · guardas OK · idempotente (hash)
                                               next_question OK en 2 bancos × 3 alturas de θ
                                               12 ítems seguidos sin agotarse · inactivo no se sirve
                                               reversión completa OK
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| El track `electrotecnia` se publica con `active = true`, visible para todo estudiante | **ADR-035** | [[../project-memory/DECISIONS]] D-66 |
| Dos bancos (entrada + profundización en CA) y no uno por módulo | ADR-035 §4 | ídem |
| Cada módulo lleva banda explícita, para no tocar `bands.cljs` ni mover las del producto | ADR-035 §2 | ídem |
| Los ítems entran por la skill `banco-de-items`, con el JSON como fuente de verdad | ADR-035 §6 | ídem |
| No se construye visibilidad por usuario ahora | ADR-035, alternativas | [[../project-memory/BACKLOG]] T-129 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| El track es visible para todo estudiante de PAES | Media (impacto bajo, probabilidad confirmada) | RISKS R-42 |
| 116 ítems asistidos por IA delante de un alumno que no puede detectar un error | Media-alta | RISKS R-41 (misma familia) · BACKLOG T-128 |
| Aplicar `064` antes que `063` deja 42 ítems sin idea errónea, en silencio | Media, sin guarda | Pie de `065` · BACKLOG T-127 |

## Bloqueos

Ninguno. El único bloqueo de la sesión fue **de decisión** (qué hacer con `active`) y lo resolvió el
owner en el momento.

## Preguntas abiertas nuevas

Ninguna. La pregunta que apareció —cómo mostrarle un banco a un usuario y no a los demás— no es una
incógnita sino una funcionalidad que no existe, y por eso quedó como tarea (T-129) y no como Q-NN.

## Supuestos aplicados

- Que el temario de Electrotecnia relevante es el de un curso estándar de circuitos de continua y
  alterna. Se dedujo de la prueba fotografiada (reactancia, impedancia, Kirchhoff en CA) y se cubrió
  el curso completo, con los tres módulos de la prueba marcados ★ y con más ítems.
- Que las `difficulty` y las bandas son **hipótesis editoriales** y no mediciones. Está dicho en
  cada migración y no hace falta un supuesto nuevo en `ASSUMPTIONS.md`: es R-17.

## Próximos pasos

1. ~~Aplicar `062` → `063` → `064` → `065` → `066`~~ ✅ **hecho el 2026-09-09** por el owner, y
   anotado en `supabase/SCHEMA.md`.
2. **Correr la batería de control del pie de `065`** (T-127, lo que queda). Sirve además para
   descartar de una vez que el orden `063`/`064` se haya invertido: eso no falla, deja los 42 ítems
   del banco de CA sin ninguna idea errónea y en silencio.
3. **Que el alumno rinda `electrotecnia`** y anotar qué ideas erróneas aparecen. Es el dato que este
   track existe para producir.
4. Revisar el contenido rehaciendo las cuentas y publicar los 24 recursos (T-128, P1).
5. Actualizar la consulta de medición de la skill `banco-de-items`, que excluye `mq\_%` pero no
   `electrotecnia%`.

## Pendientes

- ✅ **Las cinco aplicadas por el owner el 2026-09-09**, al cierre de la sesión. **Falta la batería
  de control del pie de `065`**, que es lo único que contrasta contra la base real y no contra el
  fixture — el mismo pendiente que ADR-018 dejó abierto con `040` y nunca se cerró.
- **La revisión de contenido no se hizo** (T-128). `verificar_items.py` valida estructura, no física.
- **`061_visitor_fuente.sql` sigue sin commitear** y sin registrar en `SCHEMA.md`. No es de esta
  sesión y no se tocó; queda anotado en `SCHEMA.md` para que la numeración no lo tape.
- **`029_topic_normalization.sql` tiene una edición sin commitear** que descomenta una consulta de
  verificación. Tampoco es de esta sesión. Si alguien reaplica `029`, ejecutaría un `select` suelto
  en vez de dejarlo como comentario — inocuo, pero conviene revertirlo o commitearlo a conciencia.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [x] `adr/ADR-035-track-electrotecnia-visible.md` (nuevo)
- [x] `project-memory/ARCHITECTURE.md`
- [ ] `project-memory/ROADMAP.md` — no aplica: no cambió ninguna fase ni hito
- [ ] `project-memory/REQUIREMENTS.md` — no aplica: no cambió ningún RF/RNF
- [ ] `project-memory/OPEN_QUESTIONS.md` — no aplica: sin preguntas nuevas
- [ ] `project-memory/ASSUMPTIONS.md` — no aplica: los supuestos usados ya estaban registrados (R-17)
- [x] `project-memory/LESSONS_LEARNED.md`
- [ ] `project-memory/TERMINOLOGY.md` — no aplica: sin términos nuevos del dominio del producto
- [x] `project-memory/graph/` (snapshot de Graphify)
- [x] `supabase/SCHEMA.md`

## Notas

**El precedente de ADR-018 sirvió para casi todo menos para lo único que importaba decidir.** El
patrón de migración, los prefijos, la reversión escrita antes de aplicar y la verificación contra un
PostgreSQL desechable se reusaron tal cual. Lo que no se pudo reusar fue el aislamiento, porque
dependía de una propiedad del destinatario —ser admin— que nadie había escrito como precondición.
Eso quedó como L-57.

**El tooling de la skill `banco-de-items` aguantó un dominio que no es PAES sin una sola
modificación.** `verificar_items.py` y `generar_migracion_items.py` corrieron tal cual sobre
electrotecnia. Es evidencia barata pero real de que ese pipeline no estaba atado al temario, igual
que ADR-018 lo demostró para el motor IRT.

**Lo que este track no prueba.** Que 116 ítems entren sin tocar código no dice nada sobre si el
contenido es correcto. La parte cara sigue siendo la misma que en los cuatro ejes PAES: alguien
tiene que rehacer las cuentas.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../adr/ADR-035-track-electrotecnia-visible]] · [[../adr/ADR-018-track-experimental-cuantica]] ·
`../prompts/session-close-memory-update.md`

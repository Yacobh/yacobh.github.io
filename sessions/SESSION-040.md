# SESSION-040

## Fecha

2026-08-28

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Terminar el eje de **geometría** —que había quedado a medio camino en archivos sin commitear— y
seguir con el de **probabilidad y estadística**, el último que faltaba del temario.

**El objetivo cambió dos veces, y las dos veces por información del owner:**

1. A mitad del eje de probabilidad llegaron dos reglas de contenido (convención de cuartiles del
   DEMRE, y que varianza y desviación estándar **no** entran en M1 de Admisión 2027). La segunda
   invalidó 12 de los 17 ítems de un módulo entero.
2. Después apareció que el owner **ya había aplicado** las migraciones, incluidas las dos del eje de
   probabilidad en su versión anterior al recorte. La sesión pasó de escribir contenido a **reparar
   producción**, y ahí salieron dos defectos de esquema que no tenían nada que ver con el contenido.

## Contexto de entrada

- Rama: `main`
- Commit inicial: `c9540b8`
- Estado del árbol al empezar: **sucio**, con dos archivos sin seguimiento —
  `contenido/items/geometria.json` (100 ítems ya escritos) y
  `supabase/migrations/053_bandas_explicitas_del_eje_de_geometria.sql`
- Documentos de la memoria leídos: `CLAUDE.md`, `CURRENT_STATUS`, `BACKLOG` (T-119…T-124),
  `SCHEMA.md`, skill `banco-de-items` y sus dos referencias, `SESSION-019` y `SESSION-039`
- Bloqueos vigentes al empezar: el eje de probabilidad estaba **bloqueado por T-119** — no tenía
  módulos, y su lista es decisión de contenido del owner

## Actividades realizadas

1. **Geometría, cierre (`053` + `054`).** Se revisaron los 100 ítems uno por uno contra su clave; la
   matemática estaba bien en los 100. Se corrigieron **seis defectos editoriales**: un distractor que
   contradecía su propio enunciado (dos rectángulos de igual perímetro), cuatro explicaciones que
   decían «ese valor no corresponde a nada» en vez de nombrar el error, y un ítem donde la correcta
   era la más larga con holgura (R-35).
2. **Probabilidad, apertura.** Se preguntó al owner la lista de módulos —regla de §6, no se inventa—
   y se creó `055` con los seis aprobados, con banda explícita desde el nacimiento. Cierra T-119.
3. **Probabilidad, banco (`056`).** 102 ítems y 45 ideas erróneas nuevas, el catálogo más grande de
   las cuatro tandas.
4. **Dos reglas de contenido del owner, incorporadas.** Cuartiles con la posición localizadora
   $P = k \cdot n / 4$; y fuera varianza y desviación estándar, lo que convirtió el módulo 340 en
   `probabilidad/conteo` y mudó los cinco ítems de rango a `probabilidad/posicion`.
5. **Reparación de producción (`058`)** al descubrir que todo estaba aplicado, y **`057`** al
   descubrir que la columna en la que se apoyaba la reparación no existía.
6. **`059`**: los cuatro bancos no tenían fila en `test_configs` — 414 ítems inalcanzables.

**Lo que no funcionó, y por qué está acá:**

- **El fixture del PostgreSQL de prueba se escribió desde el supuesto que debía refutar.** Es
  **L-46 por tercera vez**, con la lección ya escrita en el repositorio hace nueve días. La cadena
  entera se probó y pasó; contra la base real, `P0001: public.questions no tiene columna active`. Lo
  único que preguntó de verdad fue una **guarda dentro de la migración**, seis líneas contra
  `information_schema`. Quedó como L-54 y como addendum de L-46.
- **La memoria del proyecto documentaba una capacidad inexistente.** T-122 recomendaba
  «`active = false` en vez de `delete`» y la skill medía el banco con `where active`: la columna no
  existía y `next_question` tampoco filtraba por nada equivalente. **Dos tareas se planificaron
  encima de eso.** L-54.
- **Reaplicar `056` corregida no arreglaba nada:** es idempotente por `(topic, question)`, o sea una
  migración de altas, no de sincronía. De ahí `058`, con el delta **calculado** por diff entre el
  JSON aplicado y el nuevo — 8 `update`, ninguno escrito a mano. L-55.
- **Agregar dos ítems movió la letra correcta de 50 ítems ya cargados.** Como `tests` guarda la
  respuesta **por letra**, repermutarlos habría cambiado el significado del histórico sin que nada
  fallara. Se hizo al revés: el JSON se fijó al orden aplicado, mapeando por el texto de cada
  alternativa. L-56.
- **Un intento descartado:** publicar el banco de probabilidad antes de retirar los 12 ítems fuera de
  temario. No se descartó por criterio sino porque **la guarda de `059` lo impidió** en la máquina
  del owner, que es donde tenía que impedirlo.

## Archivos revisados

- `src/universo/bands.cljs` (`default-bands`, `product-modules` — de ahí salió la aritmética de que
  crear módulos corre las bandas derivadas de todos los demás)
- `src/universo/db/crud.cljs` (`question-select-cols`: la fuente más cercana a las columnas reales de
  `questions`, que preexiste al esquema versionado)
- `supabase/migrations/024_questions_rpc.sql` (`next_question`: se descubrió que no filtra por
  `active`), `020_test_configs.sql`, `002_seed_modules.sql`, `031_modulos_canonicos.sql`,
  `046_bandas_de_conocimiento_y_theta_inicial.sql`, `027_misconceptions.sql`
- `scripts/verificar_items.py` y `scripts/generar_migracion_items.py`
- `.claude/skills/banco-de-items/` (SKILL.md y las dos referencias)
- `sessions/SESSION-019.md` (de ahí salió el control cruzado de slugs: el `left join` que pone `null`
  en silencio)

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `contenido/items/geometria.json` | **Nuevo.** 100 ítems, 33 ideas erróneas, 7 módulos |
| `contenido/items/probabilidad.json` | **Nuevo.** 102 ítems, 45 ideas erróneas, 6 módulos. Fijado al orden de alternativas ya aplicado en producción |
| `supabase/migrations/053_*.sql` | **Nueva.** Bandas explícitas de los 7 módulos de geometría |
| `supabase/migrations/054_*.sql` | **Nueva.** Banco de geometría (generada) |
| `supabase/migrations/055_*.sql` | **Nueva.** Los 6 módulos del eje de probabilidad (cierra T-119) |
| `supabase/migrations/056_*.sql` | **Nueva.** Banco de probabilidad (generada) |
| `supabase/migrations/057_*.sql` | **Nueva.** Crea `questions.active` y hace que `next_question` la respete |
| `supabase/migrations/058_*.sql` | **Nueva.** Delta de reparación sobre lo ya aplicado |
| `supabase/migrations/059_*.sql` | **Nueva.** `test_configs` de los cuatro bancos (cierra T-125) |
| `supabase/migrations/060_*.sql` | **Nueva.** Banda explícita para los dos módulos que no la tenían |
| `project-memory/ARCHITECTURE.md` | `modules` 20 → 26, `questions.active`, `misconceptions` ya no vacío, `test_configs` y el filtro de `next_question` |
| `.claude/skills/banco-de-items/SKILL.md` | La consulta de cobertura usaba `where active`: no podía haber corrido nunca |
| `.claude/skills/banco-de-items/referencias/ejes-y-bandas.md` | El eje 4 ya no «no existe»; y las dos reglas de contenido del temario, escritas para las tandas siguientes |
| `project-memory/CURRENT_STATUS.md` | Pasadas 5ª, 6ª y 7ª |
| `project-memory/BACKLOG.md` | T-119, T-125, T-126 cerradas · T-123, T-124, T-125, T-126 nuevas · nota en T-122 y en T-56 |
| `project-memory/RISKS.md` | **R-41 nuevo** |
| `project-memory/LESSONS_LEARNED.md` | **L-54, L-55, L-56 nuevas** · L-46 con su tercera repetición |
| `supabase/SCHEMA.md` | Entradas 55 a 61, todas marcadas como aplicadas |

## Comandos ejecutados y resultados

```
python3 scripts/verificar_items.py contenido/items/geometria.json     → 100 ítems · claves 25/26/24/25 · sin errores
python3 scripts/verificar_items.py contenido/items/probabilidad.json  → 102 ítems · claves 26/26/25/25 · sin errores
python3 scripts/generar_migracion_items.py …                          → 054 y 056 generadas
PostgreSQL 14 desechable                                              → ver abajo
graphify update .                                                     → 3581 nodos, 8485 aristas
clj -M:test                                                           → NO se corrió: no se tocó una línea de CLJS
npx shadow-cljs release app / npm run build:css                       → NO aplican: el bundle no cambia
```

**Contra el PostgreSQL desechable**, en tres réplicas distintas:

| Réplica | Resultado |
|---|---|
| Base limpia + `053`→`054` | 100 ítems, 0 sin módulo, todos dentro de la banda de su módulo, reaplicar no duplica, reversión limpia |
| Base limpia + `055`→`056` | 102 ítems, 0 sin módulo, 198 referencias a ideas erróneas resueltas una por una contra el JSON |
| **Estado real del owner** (`055`/`056` viejas, **sin** `active`) + `055`→`056`→`057`→`058`→`059` | 102 activos y 12 inactivos, los 102 idénticos al JSON campo por campo, `next_question` sin servir ninguno de los 12 (que sí caen en su ventana), y las tres guardas negándose a correr cuando corresponde |

Con `049`…`059` aplicadas, `next_question` devuelve ítem en los cuatro ejes en θ = −2, 0 y +2, y
desde el módulo que corresponde a esa altura de la escala.

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Los seis módulos del eje de probabilidad y su reparto de bandas | No | `055`, [[../project-memory/BACKLOG]] T-119 |
| Cuartiles con la posición localizadora $P = k \cdot n / 4$ (convención DEMRE) | No | `referencias/ejes-y-bandas.md`, T-124 |
| Varianza y desviación estándar fuera del banco (no entran en M1 Admisión 2027) | No | `referencias/ejes-y-bandas.md`, `055`, `058` |
| El módulo 340 pasa a ser `conteo`; el rango se muda a `posicion` | No | `055`, `058` |
| Los cuatro bancos se publican (`active = true`) y encadenados desde números | No | `059`, T-125 |
| El orden de alternativas de un ítem publicado es inmutable: manda la base | No | [[../project-memory/LESSONS_LEARNED]] L-56 |

Ninguna llegó a ADR: son decisiones de contenido y de reparación, no de arquitectura.

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| 414 ítems sin revisión pedagógica ya llegan a estudiantes | 🟠 media-alta | RISKS **R-41** |
| Crear módulos corre las bandas derivadas de todos los que no tengan explícita | mitigado | cabecera de `055`, `referencias/ejes-y-bandas.md` |
| Los 6 módulos nuevos no tienen ningún recurso: el plan puede diagnosticar sin qué estudiar | abierto | nota en [[../project-memory/BACKLOG]] T-56 |

## Bloqueos

**Ninguno vigente.** Los tres de la sesión se resolvieron dentro de ella, y los tres eran del mismo
tipo —**decisión del owner**—: la lista de módulos del eje (T-119), la convención de cuartiles y el
alcance de varianza/desviación (T-124), y publicar o no los bancos (T-125). Los tres se preguntaron
en vez de asumirse, que es lo que pedía §6 de `CLAUDE.md`.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| Ninguna nueva sin registrar | — |

Las dos que existían sobre el eje (convención de cuartiles y alcance de la dispersión) quedaron
**respondidas** por el owner y escritas en la referencia de la skill.

## Supuestos aplicados

**Uno, y resultó falso:** que `public.questions` tenía columna `active`, tomado de T-122 y de la
consulta de la skill. No estaba registrado en `ASSUMPTIONS.md` porque no se reconoció como supuesto
— se leyó como hecho. Esa es exactamente la lección L-54.

Ninguno más: las tres decisiones de contenido se preguntaron en vez de suponerse.

## Próximos pasos

1. **Revisar los ítems, eje por eje** — T-120 (números), T-121 (álgebra), T-123 (geometría),
   T-124 (probabilidad). Es lo único que ningún script verifica y ahora llega a estudiantes (R-41).
   Se puede hacer incremental: un ítem malo sale de circulación con un `update`.
2. **Retirar los bancos viejos duplicados** — T-122. Recién ahora es ejecutable de verdad, y el
   selector hoy muestra el diagnóstico nuevo junto a `numbers_v1`, `polinomios` y sus fragmentos.
3. **Recursos para los seis módulos nuevos** — extensión de T-56: el criterio L-2 pasó de 18/18 a
   26/26 módulos con recurso.
4. **Aplicar `060`** — le da banda explícita a `aritmetica/operaciones_fundamentales` y
   `algebra/inecuaciones`, los dos últimos que dependían de un reparto derivado que se mueve solo.
   Escrita y verificada al cierre de la sesión; es la única migración pendiente de aplicar.
5. **Pushear.** Los commits de la sesión están en `main` local, sin subir.

## Pendientes

- **Migraciones:** `053`…`059` aplicadas y verificadas. Queda **`060` sin aplicar** (bandas de los
  dos módulos sueltos), escrita y probada contra la réplica al cierre. El estado de las anteriores a
  `049` no se re-verificó en esta sesión.
- **Sin pushear:** siete commits (`3f6ef68`…`8c6cd36`).
- **`clj -M:test` no se corrió** porque no se tocó ClojureScript. El estado de referencia sigue
  siendo el de SESSION-039: 181 tests / 2677 assertions / 0 failures.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md`
- [ ] `project-memory/DECISIONS.md` — no aplica: ninguna decisión llegó a ADR
- [ ] `adr/ADR-0NN-….md` (nuevo) — ninguno
- [x] `project-memory/ARCHITECTURE.md` — hecho al cierre: `modules` 20 → **26 módulos PAES** con
      `probabilidad` en el check de `track` y las columnas de banda; `questions` con **`active`** y
      su tamaño medido; `misconceptions` deja de estar «vacío para el producto» (159 filas);
      `test_configs` explica por qué cuatro bancos estuvieron aplicados e inalcanzables
- [ ] `project-memory/ROADMAP.md` — no aplica
- [ ] `project-memory/REQUIREMENTS.md` — no aplica
- [x] `project-memory/OPEN_QUESTIONS.md` — no había preguntas nuevas; las dos del eje quedaron
      respondidas en la referencia de la skill
- [ ] `project-memory/ASSUMPTIONS.md` — no aplica (ver "Supuestos aplicados")
- [x] `project-memory/LESSONS_LEARNED.md`
- [ ] `project-memory/TERMINOLOGY.md` — no aplica
- [x] `project-memory/graph/` — `graphify update .` corrido en cada commit

## Notas

**Se agregaron 414 ítems a un banco cuyo contenido revisado a mano eran los 306 de T-105.** Medido
el 2026-08-28, `questions` tiene **910 filas** en total, incluidas las 123 del experimento de
cuántica, que no son producto. Es mucho contenido nuevo en un día y conviene decirlo sin adornos: `difficulty` sigue siendo **hipótesis
autoral, no medición** (R-17), y ahora hay 414 ítems apostando esa hipótesis delante de estudiantes
reales. La calibración (G-2) no está más cerca por esto — al contrario, cada ítem nuevo es otro ítem
esperando sus ~30 respuestas.

**Lo más valioso de la sesión no fue el contenido, fueron los dos defectos de esquema.** Ninguno se
buscaba: `questions.active` inexistente y los cuatro bancos sin `test_configs` aparecieron mientras
se intentaba otra cosa. El segundo llevaba desde `050` —cuatro tandas— dejando contenido aplicado e
inalcanzable, y nadie lo habría notado sin la consulta que se corrió para diagnosticar otra cosa.

**Y una advertencia para la próxima tanda:** la skill `banco-de-items` dice que el cuello de botella
es la revisión humana, no la redacción. Esta sesión escribió 202 ítems y revisó 0 con ojo de
profesor. Escribir un quinto banco antes de revisar los cuatro que ya están publicados sería
exactamente el patrón que R-30 describe.

---

Relacionado: [[SESSION-039]] · [[../project-memory/CURRENT_STATUS]] · [[../project-memory/BACKLOG]] ·
[[../project-memory/LESSONS_LEARNED]] · [[../project-memory/RISKS]]

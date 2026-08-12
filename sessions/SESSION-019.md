# SESSION-019

## Fecha

2026-08-11

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Construir, sobre el motor IRT del producto, un **paquete de contenido completo de Mecánica
Cuántica** para que el autor estudie su propio examen universitario: preguntas, misconceptions y
recursos, partiendo de unos apuntes propios en LaTeX que cubren solo el Tema 3 (momento angular) y
quedan incompletos. Todo en una rama nueva, sin tocar el producto.

El objetivo no cambió durante la sesión, pero el alcance se precisó al leer la memoria: quedó claro
enseguida que la decisión difícil no era escribir física, sino **dónde poner el contenido sin
contaminar la base de producción**. Eso pasó a ser el eje de la sesión y produjo un ADR.

## Contexto de entrada

- Rama: `main` → se creó `experimento-cuantica`
- Commit inicial: `4eae6e9`
- Estado del árbol al empezar: limpio
- Documentos de la memoria leídos: `CLAUDE.md`, `supabase/SCHEMA.md`, `supabase/CONTENT.md`,
  `adr/ADR-016`, migraciones `001`, `019`, `020`, `024`, `027`, `029`, `031`, `src/universo/topics.cljs`,
  `src/universo/profile.cljs`, `src/universo/db/crud.cljs`, `src/universo/components/math_render.cljs`
- Bloqueos vigentes al empezar: ninguno relevante para esta tarea

## Actividades realizadas

1. **Orientación con el grafo y lectura del esquema real.** Antes de escribir nada había que saber
   qué columnas tiene `questions` (no está versionada: los tipos salen de la cabecera de `024`),
   cómo se insertan ítems desde el panel (`crud/question-payload`, sin `id` → hay identity), qué
   delimitadores de KaTeX soporta el cliente (`math_render/split-by-latex-improved`: `$...$` y
   `$$...$$`, más `**bold**`), y qué restricciones hay (`modules.track` con lista cerrada de tres
   valores, `misconceptions.slug` con regex sin guion bajo, trigger `normalize_topic`).
2. **Decisión de aislamiento** → ADR-018. La barrera es `test_configs.active = false` + la policy
   `test_configs_select` de `020`. Se descartó un proyecto Supabase aparte (costo permanente de
   sincronizar dos esquemas) y una tabla `questions_experimental` (obligaría a tocar
   `next_question`/`score_answer`, o sea el camino crítico del producto).
3. **Ocho migraciones, `033`–`040`.** 15 módulos, 77 misconceptions, 123 ítems, 32 recursos, 15
   configuraciones de banco.
4. **Verificación contra PostgreSQL 14 desechable**, con un fixture del esquema real. Cuatro
   pruebas: aplicación limpia, idempotencia, no contaminación del contenido PAES, y reversión.
5. **Actualización de la memoria del proyecto** (ADR, DECISIONS, RISKS, SCHEMA, CONTENT,
   CURRENT_STATUS, BACKLOG, esta sesión).

**Lo que no funcionó / lo que hubo que corregir:**

- **Primer intento de arranque del PostgreSQL desechable falló:** el socket Unix en el scratchpad
  excede los 103 bytes que permite macOS. Se resolvió arrancando por TCP (`-h 127.0.0.1`) con el
  datadir igual en el scratchpad.
- **El `left join` por slug oculta errores en silencio.** La primera corrida de `035` insertó los 36
  ítems sin queja, pero **6 slugs de misconception referenciados no existían** en `034`: el join
  simplemente puso `null`. Se detectó recién al comparar los slugs del archivo contra la tabla. De
  ahí salió la consulta de control cruzado que ahora está en la batería de `040`, y las 6
  misconceptions faltantes se agregaron al catálogo. **Es exactamente el modo de fallo que
  ADR-017 describe: nada falla, nada se registra, el contenido simplemente queda peor.**
- **La convención `E'...'` de `018`/`019` se descartó** tras evaluarla: con 123 ítems llenos de
  `\hbar` y `\epsilon_{ijk}`, obliga a duplicar cada backslash, y un `\neq` sin duplicar se guarda
  como salto de línea + "eq" sin que nada avise. Se usó dollar-quoting `$qm$...$qm$` (D-38).
- **Se decidió NO poner prerequisito a `mq_momento_angular`**, contra lo que pedía la progresión
  natural del curso. Es el tema del examen: obligar a rendir cuatro bancos antes de llegar a él
  habría hecho la herramienta inútil para lo que se necesita.

## Archivos revisados

- `supabase/SCHEMA.md`, `supabase/CONTENT.md`
- `supabase/migrations/001_mvp_schema.sql` (DDL de `modules`, `resources`, RLS)
- `supabase/migrations/019_baldor_algebra_resources.sql` (patrón de carga de contenido + criterio de
  derechos de autor)
- `supabase/migrations/020_test_configs.sql` (policy `active = true or is_admin()` — la salvaguarda)
- `supabase/migrations/024_questions_rpc.sql` (tipos reales de `questions`; `security definer`)
- `supabase/migrations/027_misconceptions.sql` (regex del slug, heurística del tamaño del catálogo)
- `supabase/migrations/029_topic_normalization.sql`, `031_modulos_*.sql`
- `src/universo/topics.cljs`, `src/universo/profile.cljs` (por qué no hace falta tocar CLJS)
- `src/universo/db/crud.cljs` (`question-payload`, `question-select-cols`)
- `src/universo/components/math_render.cljs` (delimitadores de KaTeX soportados)
- `adr/ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime.md`
- `test/universo/topics_test.cljs` (confirmar que no se rompe al no tocar `module-slugs`)
- `docs/libros mecanica cuantica/` (listado, para citar solo bibliografía realmente disponible)

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `supabase/migrations/033_cuantica_track_y_modulos.sql` | **Nuevo.** Amplía el `check` de `modules.track` a `cuantica` + 15 módulos con blurb histórico |
| `supabase/migrations/034_cuantica_misconceptions.sql` | **Nuevo.** 77 misconceptions con prefijo `mq/` |
| `supabase/migrations/035_cuantica_questions_fundamentos.sql` | **Nuevo.** 36 ítems (orígenes, formalismo, postulados, incertidumbre, Schrödinger) + la cabecera que explica el patrón de inserción |
| `supabase/migrations/036_cuantica_questions_sistemas.sql` | **Nuevo.** 16 ítems (pozos, oscilador) |
| `supabase/migrations/037_cuantica_questions_momento_angular.sql` | **Nuevo.** 43 ítems (momento angular 15, armónicos 8, espín 10, suma 10) — el bloque del examen |
| `supabase/migrations/038_cuantica_questions_aplicaciones.sql` | **Nuevo.** 28 ítems (hidrógeno, perturbaciones, idénticas, interpretación) |
| `supabase/migrations/039_cuantica_resources.sql` | **Nuevo.** 32 recursos, `published = false` |
| `supabase/migrations/040_cuantica_test_configs.sql` | **Nuevo.** 15 configuraciones `active = false` + batería de control + reversión |
| `adr/ADR-018-track-experimental-cuantica.md` | **Nuevo.** La decisión completa |
| `project-memory/DECISIONS.md` | Fila de ADR-018 en §1 + D-38 (dollar-quoting y prefijos) |
| `project-memory/RISKS.md` | R-23 nuevo (contenido experimental visible si `active = true`) |
| `project-memory/BACKLOG.md` | T-61 nuevo; nota de contradicción sobre `027` en T-57 |
| `project-memory/CURRENT_STATUS.md` | Nota fechada 2026-08-11 |
| `supabase/SCHEMA.md` | `033`–`040` en el orden de aplicación + sección "Track experimental `cuantica`" |
| `supabase/CONTENT.md` | Fila en la tabla de migraciones + nota de separación de dominios |
| `sessions/SESSION-019.md` | Este archivo |

## Comandos ejecutados y resultados

```
clj -M:test                 → 0 failures, 0 errors (corrido igual, para probar que no se rompió nada)
npx shadow-cljs release app → no aplica: el experimento es 100 % datos, el bundle no cambia
npm run build:css           → no aplica: no se agregó ninguna clase de Tailwind
graphify update .           → 1495 nodos, 1805 aristas, 139 comunidades

# Verificación contra PostgreSQL 14 desechable (127.0.0.1:55432, datadir en scratchpad):
initdb + pg_ctl start                         → PostgreSQL 14.18 arriba
psql -f fixture.sql                           → esquema mínimo (questions, modules, resources,
                                                test_configs, misconceptions, normalize_topic)
psql -f 033..040 (base vacía)                 → 8/8 sin error
  modules(cuantica)=15 · misconceptions=77 · questions=123 · resources=32 · test_configs=15
  ítems sin module_id = 0 · misconceptions sin módulo = 0
  alternativa correcta con misconception = 0 filas
  slugs referenciados e inexistentes = 0 (después de corregir los 6 iniciales)
  recursos publicados = 0 · configs activas = 0
  holgura banco − max_items ≥ 2 en los 15 bancos
2ª corrida de las 8 migraciones                → 15|77|123|32|15 idéntico · 0 diferencias
psql -f 033..040 (base con datos PAES simulados) → PAES intacto: modules=3, questions=1,
                                                   configs=1, recursos publicados=1
reversión documentada en 040                   → base vuelve exactamente al estado PAES original
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Reusar el motor IRT para un track experimental en la misma base, aislado por `test_configs.active = false` | **Sí** | [[../adr/ADR-018-track-experimental-cuantica]], [[../project-memory/DECISIONS]] §1 |
| Dollar-quoting `$qm$...$qm$` en vez de `E'...'`; prefijos `mq_`/`mq/`/`cuantica/` como única marca de dominio (sin columna nueva) | No | [[../project-memory/DECISIONS]] D-38 |
| `mq_momento_angular` sin prerequisito, contra la progresión natural del curso | No (queda en el archivo) | Cabecera de `040_cuantica_test_configs.sql` |
| `min_response_seconds = 3` por criterio y no por calibración, y decirlo explícitamente | No | Cabecera de `040` |
| No tocar `universo.topics/module-slugs` ni ningún `.cljs` | No | Cabecera de `033` |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Poner `active = true` expone los 15 bancos al selector de un estudiante de PAES | Medio / probabilidad baja | [[../project-memory/RISKS]] R-23 |
| Contenido de física asistido por IA y **sin auditar**: una explicación errónea enseña el error | Medio | ADR-018 §Riesgos; mismo criterio que [[../adr/ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]] |
| `difficulty` es una apuesta inicial, no una medición: no sirve para calibrar nada todavía | Bajo | Cabecera de `035`, punto 4 |
| El fixture de verificación no es el esquema real (T-48 abierto) | Bajo | ADR-018 §Riesgos |

## Bloqueos

Ninguno técnico. Queda una **dependencia de confirmación**: `034`–`038` insertan en
`public.misconceptions` y en las columnas `misconception_*_id`, que crea `027`. [[../supabase/SCHEMA]]
la da por aplicada el 2026-08-10; [[../project-memory/BACKLOG]] T-57 dice que falta. Es una
contradicción de la memoria, no del código, y la resuelve el owner en diez segundos:
`select count(*) from public.misconceptions;`.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| ¿`027` está aplicada o no? (contradicción SCHEMA vs. BACKLOG T-57) | Nota dentro de [[../project-memory/BACKLOG]] T-57 |

No se abrió una Q- nueva en OPEN_QUESTIONS: no es una pregunta de producto sin responder, es un dato
verificable con una consulta.

## Supuestos aplicados

1. **`questions.id` tiene default (identity o serial).** No está versionada, pero
   `crud/insert-admin-question!` inserta sin `id` y funciona en producción. Las migraciones tampoco
   lo especifican.
2. **`correct_option` es `character`** — tomado de la cabecera de `024`, que lo dice explícitamente.
   Insertar `text` funciona por el cast de asignación.
3. **No hacía falta correr `clj -M:test`** porque no se tocó ningún `.cljs` — se corrió igual y dio
   **0 failures / 0 errors**. El test que podría verse afectado (`topics_test.cljs`, que afirma
   `(= 20 (count module-slugs))`) sigue siendo verdadero precisamente porque se decidió **no**
   agregar los módulos nuevos a ese set.

## Próximos pasos

1. **Confirmar que `027` está aplicada** (`select count(*) from public.misconceptions;`) y corregir
   el documento que esté mal — T-57 o SCHEMA.
2. Correr `supabase/queries/verificacion_esquema.sql` antes de tocar nada (T-48: el repo afirma
   cosas del esquema que no están verificadas contra la base real).
3. Aplicar `033`–`040` **en orden** en el SQL Editor de Supabase.
4. Correr la batería de control del final de `040` y contrastar con los valores esperados.
5. Entrar con la cuenta de admin, verificar que "MC · Momento angular ★" aparece en el selector, y
   **rendirlo**. Verificar con una cuenta de estudiante que **no** aparece.
6. Anotar qué misconceptions salen: es el dato que la herramienta existe para producir (T-61).

## Pendientes

- **Las migraciones no se aplicaron a producción.** Están verificadas contra un PostgreSQL local,
  no contra Supabase.
- **El contenido no está auditado.** 123 ítems × 4 explicaciones y 32 recursos escritos con
  asistencia de IA, sin que nadie haya rehecho las cuentas. ADR-016 §2 exige esa auditoría antes de
  publicar; acá se difiere a propósito porque el auditor y el destinatario son la misma persona y la
  revisión ocurre al estudiar. **Si aparece un error, corregirlo en la migración**, no solo en el
  panel: el archivo es la fuente de verdad.
- **32 de las 77 misconceptions aparecen en un solo ítem**, por debajo de la heurística de `027`.
  Está medido y documentado en la cabecera de `034` con la consulta para volver a medirlo. El
  arreglo es agregar ítems al topic correspondiente, no borrar entradas del catálogo.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md` (T-61 + nota en T-57)
- [x] `project-memory/RISKS.md` (R-23)
- [x] `project-memory/DECISIONS.md` (ADR-018 en §1, D-38)
- [x] `adr/ADR-018-track-experimental-cuantica.md` (nuevo)
- [ ] `project-memory/ARCHITECTURE.md` — **no hace falta**: no cambió ningún componente, flujo ni
      integración. El único cambio de esquema es ampliar un `check`, documentado en SCHEMA
- [ ] `project-memory/ROADMAP.md` — no hace falta: no cambia ninguna fase ni hito del producto
- [ ] `project-memory/REQUIREMENTS.md` — no hace falta: no es un requisito del producto
- [ ] `project-memory/OPEN_QUESTIONS.md` — ver §Preguntas abiertas nuevas
- [ ] `project-memory/ASSUMPTIONS.md` — los tres supuestos son locales a estas migraciones y están
      escritos en ellas; no son supuestos vigentes del proyecto
- [x] `project-memory/LESSONS_LEARNED.md` — lección del `left join` que oculta slugs inexistentes,
      con el control cruzado que la detecta
- [ ] `project-memory/TERMINOLOGY.md` — no hace falta: el glosario es del dominio PAES
- [x] `project-memory/graph/` — `graphify update .` corrido (1495 nodos / 1805 aristas / 139 comunidades)
- [x] `supabase/SCHEMA.md`, `supabase/CONTENT.md`

## Hallazgo colateral: dos archivos modificados que NO son de esta sesión

Al cerrar, `git status` mostró modificados `src/universo/events/test.cljs` y `public/js/app.js`, que
esta sesión **no tocó**. Sus `mtime` son del **2026-08-10 22:52**, anteriores a esta sesión, así que
son trabajo del owner posterior al último commit (`4eae6e9`) y quedaron sin commitear.

- `src/universo/events/test.cljs`: el θ inicial del diagnóstico pasa de `0.0` a **`-3.0`**
  (`(assoc-in [:test :theta] -3.0)`). No es cosmético: cambia con qué dificultad arranca el test
  para **todos** los estudiantes, porque `next_question` elige por cercanía a θ. Con `-3.0` el
  primer ítem es el más fácil del banco en vez de uno de dificultad media.
- `public/js/app.js`: recompilado (1716 inserciones / 2629 borrados), coherente con haber
  construido el bundle para probar ese cambio.

**No se commitearon ni se revirtieron**: no son parte de este trabajo y la decisión es del owner.
Quedan en el árbol tal como estaban. Si el cambio de θ inicial es intencional, merece su propia
entrada (arranca el diagnóstico desde el piso de la escala, lo que afecta la trayectoria de
estimación y probablemente el número de ítems hasta converger).

## Notas

- **El experimento le devuelve algo al producto aunque se revierta.** Es la primera vez que el motor
  IRT se carga con un temario completamente ajeno, y entró sin tocar una línea de ClojureScript. La
  separación motor/contenido era hasta hoy una afirmación de diseño; ahora hay evidencia.
- También es la primera vez que la tabla `misconceptions` de `027` tiene datos: se sembró vacía a
  propósito, y este experimento la ejercita con 77 entradas y 218 distractores enlazados.
- El patrón de inserción de `035` (dollar-quoting, CTE con `values` + `left join` por slug,
  idempotencia por `where not exists`, control cruzado de slugs) está pensado para reusarse en
  T-27, T-56 y T-60. La cabecera de ese archivo lo explica entero y es el mejor punto de entrada
  para quien vaya a cargar contenido PAES en volumen.
- Los apuntes LaTeX de origen del owner cubrían el Tema 3 con cuatro demostraciones. El banco
  `mq_momento_angular` las contiene todas como ítems: la regla de índices mudos, el truco del signo
  de Levi-Civita, la cancelación $S = -S$ de $[L_i,P^2]$, y la degeneración vía $[L^2,L_\pm]=0$. Los
  recursos `Recetario de índices` y `Práctica guiada — [L_i, R_j], [L_i, P_j] y [L_i, P²] paso a
  paso` son la versión desarrollada de esas mismas demostraciones.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../adr/ADR-018-track-experimental-cuantica]] ·
[[../project-memory/BACKLOG]] T-61 · [[../project-memory/RISKS]] R-23 · [[../supabase/SCHEMA]]

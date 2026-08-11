# SESSION-018

## Fecha

2026-08-10

## Participantes

- Humano: Jacobo Córdova (encargó los dos tickets y se fue a dormir una siesta; autorizó
  explícitamente trabajo autónomo hasta terminar)
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Levantar el panorama del proyecto tras la migración `027`, y después implementar **T-44** (filtro de
respuestas no esforzadas, Fase 1 de ADR-014) y **T-51** (higiene de `topic` y `module_id`),
elegidos por el owner desde ese panorama.

**La sesión creció bastante más que eso.** Una crítica del owner a T-44 abrió **T-59** y destapó que
una premisa de ADR-014 era falsa; medir los datos reales llevó a corregir el propio T-44 y a
replantear T-59 dos veces; cerrar T-51 exigió dos migraciones más y dos módulos nuevos; y el owner
pidió al final una auditoría completa de la memoria y un verificador del esquema. Cinco migraciones
(`028`–`032`), un ADR, dos tickets nuevos y ocho commits.

## Contexto de entrada

- Rama: `main` @ `8a9db53`, árbol limpio, todo mergeado y en producción.
- `clj -M:test` de partida: **46 tests / 186 assertions / 0 failures** (verificado en vivo).
- El owner confirmó que **`027` ya está aplicada**: la tabla `misconceptions` existe y está vacía.
- El paso 2 de T-57 sigue en pausa: requiere una consulta del owner contra el proyecto real (qué
  módulo se falla más) que quedó sin enviar.

## Actividades realizadas

### 1. Panorama del proyecto (pedido inicial)

Lectura de `CURRENT_STATUS`, `HANDOFF`, `BACKLOG` y `SESSION-017`, con verificación en vivo del
estado del árbol y de la suite. Se le presentaron al owner cuatro frentes: el reloj de R-19 (un solo
cupo real publicado para el 2026-08-15, sin analytics para medir el tráfico que ya llega), las dos
afirmaciones falsas del FAQ, la cadena de datos T-51 → T-57 → T-54, y el endurecimiento pendiente
(T-48, T-49). El owner eligió T-44 y T-51.

**Aclaración pedida por el owner durante el panorama:** cuándo corresponde `graphify`, cuándo
`clj-kondo` y cuándo `grep`. Quedó explicado que el grafo orienta (indexa Markdown/SQL/JSON/HTML/TS,
no `.cljs`), `clj-kondo` es el índice real de símbolos ClojureScript, y `grep`/`Read` extraen el
texto literal una vez que ya se sabe dónde mirar. Se reconoció un atajo propio: una consulta al
grafo salió truncada (73 de 306 nodos) y correspondía acotarla antes de saltar a `grep`.

### 2. T-44 · Filtro de respuestas no esforzadas

- **`src/universo/irt/effort.cljs`** (nuevo, puro): `reading-seconds`, `min-response-seconds`
  (umbral `max(piso, largo / 20)`), `response-weight`, `weigh-response`, `weight-of`,
  `discarded-count`.
- **`components/tetha.cljs`**: el peso entra en `first-derivative` y `second-derivative`.
- **`irt/progress.cljs`**: `fisher-information` lo hereda de `second-derivative` — el punto que el
  ADR marca como fácil de olvidar. `default-stop-config` suma `:min-response-seconds`.
- **`events/test.cljs`**: el peso se calcula en `:test/answer-scored`, una sola vez, y viaja con la
  respuesta a `tests.test`. `:test/start` lee el piso desde `test_configs`.
- **`028_test_config_min_response_seconds.sql`**: columna `not null default 3`, check 0–120.
- **`db/crud.cljs`**, **`events/admin.cljs`**, **`components/admin_test_configs.cljs`**: campo
  "Segundos mínimos por respuesta" en el editor y columna "Mín. resp." en la tabla.

### 3. T-51 · Higiene de `topic` y `module_id`

- **`src/universo/topics.cljs`** (nuevo, puro): `normalize` (espejo de la función SQL),
  `same-topic?`, `duplicate-groups`, `module-slugs` (los 18 de `002`),
  `explicit-topic->module-slug`, `catch-all-topics`, `module-slug-for` (explícito → sufijo único),
  `track-for`, `unmapped`.
- **`profile.cljs`**: pierde los dos diccionarios literales (`topic->module-slug`, `topic->track`) y
  delega en `universo.topics`; el fallback `unknown/…` ahora normaliza para no generar dos huecos
  distintos por el mismo banco mal escrito.
- **`029_topic_normalization.sql`**: `normalize_topic()`, fusión de `test_configs` respetando la
  auto-FK, normalización de `questions.topic` y `tests.topic`, backfill de `module_id` en dos reglas
  (equivalencia explícita + sufijo único), y triggers en las tres tablas.
- **`adr/ADR-017-topic-canonico-por-trigger.md`**: por qué trigger y no `check` ni tabla `topics`.

### 4. Verificación de `029` contra un PostgreSQL real

`029` toca una clave primaria con auto-FK, un historial de usuarios y el banco de ítems, y se aplica
contra producción **sin staging** (R-02). Revisarla a ojo no alcanzaba. Se aprovechó el
PostgreSQL 14 que ya corre en la máquina del owner (Docker está instalado pero su demonio —colima—
no estaba levantado) para montar una base desechable `t51_probe` con un fixture que reproduce el
desorden medido el 2026-08-09.

### 5. Revisión del owner a T-44 → T-59 (después de entregar los dos tickets)

El owner cuestionó el enfoque de T-44: para él el tiempo de respuesta es el que tarda en leer y
responder, ya se guarda por pregunta, y **fijar el umbral con un valor decidido por el autor aumenta
el esfuerzo de mantenimiento**. Propuso que cada ítem guarde su tiempo promedio, actualizado cada
vez que alguien termina un test, y mencionó ponderarlo por el nivel del estudiante (aceptando que
"probablemente el promedio simple es suficiente por ahora").

**La crítica es correcta**, y al verificarla apareció algo más grande: ADR-014 difirió el modelo
empírico sobre la premisa *"el proyecto tiene cero estudiantes reales"*, escrita el 2026-08-08.
**El 2026-08-09 T-01 midió 80 usuarios y 252 diagnósticos rendidos**, y `git log -S ":time-ms"`
sitúa la instrumentación del cronómetro el **2025-09-09**, anterior al piloto UNAP. La precondición
de ≥30 tests de la Fase 2 probablemente estaba cumplida hacía casi un año.

También se corrigió un detalle del planteamiento del owner: `time-ms` es el **delta** por pregunta,
no un par de timestamps de inicio/fin — lo que no se instrumente ahora no se recupera.

Tres objeciones técnicas quedaron registradas en el ticket, no descartan la propuesta pero la
condicionan: (1) el promedio se **contamina** con las mismas respuestas que el filtro debe eliminar
(realimentación positiva; el owner ya intuyó la salida: estimador robusto); (2) la constante autoral
**no desaparece, se muda** — pasa de dos números arbitrarios a uno interpretable; (3) ponderar por θ
tiene una **circularidad** (θ se estima de las respuestas que el filtro valida) y la variable natural
a descontar es la velocidad τ, no la habilidad θ.

**Decisión del owner: opción (a)** — mergear T-44 como capa de caso frío y abrir el trabajo empírico
como ticket propio. Se creó **T-59** (`P1`), **Q-26**, la nota de corrección en ADR-014 §Contexto
(sin borrar el párrafo original) y `supabase/queries/T-59_calibracion_tiempos.sql`: 9 consultas de
solo lectura, **validadas contra un PostgreSQL desechable** antes de entregarlas, que responden
cobertura de datos, forma de la distribución, tiempo típico por ítem con tres estimadores, cuántos
ítems ya pueden calibrarse solos, **qué fracción del histórico habría descartado el umbral de T-44**
y la correlación θ↔tiempo.

Al validarlas contra el fixture apareció una hipótesis a medir con datos reales: con enunciados de
40–200 caracteres, la parte proporcional (`largo/20` = 2–10 s) **domina al piso de 3 s casi
siempre**, con lo que el campo configurable por banco de T-44 casi no actuaría. Si se confirma, ese
campo del panel sobra. Hay una consulta dedicada a responderlo.

### 6. Cierre del backfill de T-51 con la medición real (`030`, `031`)

El owner aplicó `028` y `029` y corrió las verificaciones: **0 topics fuera de forma canónica**, e
ítems sin `module_id` de 199 → **156**. De esos 156, **28 sí eran mapeables**: faltaban
equivalencias explícitas para topics que no se llaman como el sufijo de su módulo
(`sistemas_ecuaciones`, `potenciacion`, `numeros_relativos`) y para variantes con espacio.

`030` agregó las 11 equivalencias. Las 4 ambigüedades restantes las decidió el profesor, y **dos de
ellas creando módulo** (D-37): `algebra/inecuaciones` y `aritmetica/operaciones_fundamentales` —
meter inecuaciones dentro de `algebra/ecuaciones` habría producido el mismo defecto que T-53 acababa
de arreglar. `031` los crea (18 → 20 módulos) y cierra las 3 preguntas. Verificado sobre la
distribución real: **156 → 128**, idempotente; quedan solo `diagnostico` (84) y `paes_m1` (44).

**Corrección de una afirmación propia del mismo día:** se había escrito que la decisión de ADR-017
de no unificar espacios con guiones bajos "se había caído" y que fue "conservadurismo sin datos". Se
midió con la consulta de duplicados y **devolvió cero filas**: ningún banco está partido por espacio
vs. guion bajo. La decisión se sostiene; el hueco era de *mapeo*, no de *normalización*.

### 7. T-59: se corrieron las consultas y el resultado cambia el ticket

**El hallazgo que ordena todo lo demás: solo el 9 % del histórico tiene tiempo real.** 2178
respuestas en 209 tests, todas con el campo `time-ms` presente, **195 con valor > 0**. El cronómetro
no estaba midiendo.

**Segunda corrección al agente:** al abrir T-59 se argumentó que, como la instrumentación data de
2025-09-09 (anterior al piloto UNAP), los tiempos "deberían estar ahí". Se marcó como pendiente de
verificar, y la verificación dice que no. Que el campo exista en el código no implica que midiera.

De ahí, cinco consecuencias registradas en T-59: (a) **0 ítems con ≥30 respuestas** de 387 — nada
calibrable; (b) el **promedio simple queda refutado con los datos del propio proyecto** (ítem 361:
media 78,7 s vs mediana 4,8 s), confirmando la objeción de contaminación por outliers; (c) el piso
autoral de **3 s descartaba respuestas con 34 % de acierto** cuando el azar es 25 % — se corrigió a
**2 s** con `032`, apoyado en el barrido completo; (d) **tercera corrección al agente**: la conjetura
de que el campo del panel sobraba era falsa — con enunciado mediano de **50 caracteres**, el piso
manda en **234 de 387 ítems**, y que fuera configurable es lo que hizo que (c) sea un `update` de
una línea; (e) ρ(θ, tiempo) **no calculable** (n = 17, 12 en una sola banda).

T-59 pasa de `abierto` a **`bloqueado`**, y el bloqueo cambia de naturaleza: no es "acumular tests",
es **arreglar la instrumentación**. Se agregó la consulta 6 al archivo de queries para determinar si
el cronómetro registra hoy. Q-26 abierta y respondida el mismo día.

> **⚠ Corregido más tarde en esta misma sesión (§11): el cronómetro sí registra.** No había bug
> vivo; los ceros eran históricos. El bloqueo de T-59 volvió a ser de volumen de datos.

### 8. Migraciones aplicadas y auditoría de memoria (cierre)

El owner aplicó `030`, `031` y `032`. **No queda ninguna migración pendiente** — repo y base
alineados por primera vez desde que se lleva el registro. Pidió después revisar toda la
documentación. Hallazgos corregidos:

- **`HANDOFF.md` estaba congelado en el 2026-07-26.** El archivo que existe justamente para retomar
  el proyecto sin contexto afirmaba que el árbol estaba sucio, que no se sabía qué versión servía
  producción, que faltaba publicar contenido y verificar el email, y listaba como bloqueantes seis
  tareas cerradas hace días. Es el peor lugar donde puede haber información vieja. Reescritas sus
  secciones de estado, pendientes, riesgos, preguntas abiertas, decisiones y próximos pasos.
- **Conteo de tests desactualizado en cuatro archivos**, incluido `AGENT_INSTRUCTIONS` §7, que lo usa
  como "estado de referencia" contra el que un agente debe comparar — decía 34/133 cuando la suite
  está en 58/332. Un agente siguiendo esa instrucción habría concluido que sobraban tests.
- **`TECH_STACK` y `DEPENDENCIES` marcaban con ⚠️ un desajuste ya resuelto**: shadow-cljs
  `2.19.2` vs `3.0.4` y KaTeX `0.16.9` vs `0.16.22`, que T-13 alineó el 2026-08-09. Verificado
  contra `package.json` e `index.html` antes de corregir, no asumido.
- **`ARCHITECTURE`** no tenía `test_configs` ni `misconceptions` en el diagrama, ni
  `normalize_topic()`, ni los triggers de canonicalización. Se agregó además una tabla de
  **invariantes que impone la base** con su espejo puro cuando existe.
- **`TERMINOLOGY`** no tenía el vocabulario que el propio ADR-014 se había comprometido a reflejar
  (τ, intensidad temporal). Se agregaron cinco entradas.
- **`RISKS` R-17** ahora distingue lo que T-44 mitiga de lo que no, y advierte que T-29 hereda el
  problema de cobertura de datos descubierto en T-59.

**T-51 se cerró con una nota, no en silencio:** su criterio decía "todo ítem tiene `module_id`" y
128 no lo tienen. Esa mitad se trasladó explícitamente a **T-60** en vez de darla por cumplida.

### 9. Merge, publicación y verificación en producción (cierre real)

El owner mergeó **PR #34** y publicó. Verificado con el patrón de la casa: MD5 del bundle
`ef97d814d66efd61d08d90711431aca9`, idéntico en `origin/main` y en el dominio, `age: 0`.
`clj -M:test` en `main`: 58/332/0.

Se comprobó en vivo con `curl` que la frase del FAQ **sigue publicada**, que es justamente lo que se
quería: **X-01 se resuelve sin borrar el copy, cambiando el sistema para que la afirmación sea
cierta.** Era la contradicción más antigua registrada en la memoria del proyecto.

Queda **X-02** como la única afirmación falsa publicada.

### 10. Verificador de esquema (pedido del owner: "¿está claro el esquema?")

La respuesta honesta era **no**, y por dos motivos distintos que conviene no confundir: `SCHEMA.md`
describe bien las 16 tablas, pero es **prosa mantenida a mano** que puede haberse desviado sin que
nada avise, y sobre todo **el repo no puede reconstruir el esquema** (T-48). El precedente que lo
justifica está en la propia memoria: la auditoría de T-47 encontró ocho policies creadas desde el
dashboard que el repo no conocía, y una dejaba el banco de ítems descargable.

Se escribió **`supabase/queries/verificacion_esquema.sql`**, de solo lectura, con siete bloques:
inventario con RLS; **semáforo de seguridad** (tablas sin RLS = expuestas, y tablas con RLS y cero
policies = producto roto en silencio, porque Postgres devuelve 0 filas y no un error); columnas
esperadas por migración; funciones y triggers esperados; huérfanos que las FK no atrapan;
invariantes de datos con el valor esperado al lado; y un **volcado del DDL real** de las tablas no
versionadas, que es justo lo que faltaba para escribir `000_baseline.sql`. Con eso **T-48 pasa de
"averiguar qué hay" a "pegar el resultado"**.

Validado contra un Postgres desechable, y no solo que corriera: se le montó un fixture **con
problemas a propósito** —13 tablas sin RLS, una con RLS y sin policies, seis funciones y triggers
ausentes— y los reportó todos.

### 11. El cronómetro sí registra: T-59 replanteado (cierre)

El owner corrió el seguimiento y confirmó que el diagnóstico **guarda `time-ms` hoy**. No hay bug
vivo: los ceros son de tests anteriores al arreglo del flujo (`9e622d9`, 2026-07-18). *(Cierre por
reporte del owner, sin verificación del agente.)* **Q-26 cerrada del todo** y T-59 vuelve a estar
bloqueado por **volumen de datos**, como decía ADR-014 originalmente.

Consecuencia buena: cada diagnóstico nuevo es dato utilizable sin trabajo extra, así que difundir el
cupo **construye el dataset**. Consecuencia irreversible: las 2178 respuestas históricas no sirven
para tiempos y nunca van a servir.

**Y un cálculo que replantea el ticket por segunda vez.** Las 195 respuestas útiles se reparten en 84
ítems, a **2,3 por ítem**. Llegar a 30 respuestas por ítem en los 387 del banco pide ~11.600
respuestas ≈ **1.200–1.400 diagnósticos completos**: otro orden de magnitud de tráfico, y el banco
además sigue creciendo bajo ADR-016. Así que T-59 se reformuló como **escalera jerárquica** en vez
del salto al extremo caro:

```
constante autoral  →  distribución global  →  por topic  →  por ítem
   (en producción)      (~200 respuestas)     (~30/topic)   (~30/ítem)
                          ✅ ya alcanzable        🟡            🔴
```

Es la forma que ADR-014 §Fase 2 ya insinuaba: el ítem hereda del topic y el topic del global. La
consecuencia de diseño que conviene aceptar de entrada es que **la capa autoral de T-44 no es un
parche transitorio sino el piso permanente de esa jerarquía** — siempre habrá ítems nuevos sin datos.

## Archivos revisados

- Toda `project-memory/` (auditoría del punto 8), con lectura detenida de `HANDOFF`,
  `CURRENT_STATUS`, `BACKLOG`, `OPEN_QUESTIONS`, `DECISIONS`, `TECH_STACK`, `DEPENDENCIES`,
  `ARCHITECTURE`, `TERMINOLOGY`, `RISKS`, `AGENT_INSTRUCTIONS`, `PROJECT_BRIEF`, `LESSONS_LEARNED`
- `sessions/SESSION-017.md`, `adr/ADR-014-tiempo-de-respuesta-como-eje-separado.md`
- `src/universo/{profile,components/tetha,irt/progress,events/test,db/crud,events/admin}.cljs`,
  `components/{admin_test_configs,diagnostic_test}.cljs`
- `supabase/migrations/{002_seed_modules,020_test_configs}.sql`, `supabase/SCHEMA.md`
- `package.json`, `index.html`, `public/index.html` (para verificar el desajuste de versiones
  antes de corregir la documentación, no asumirlo)

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/irt/effort.cljs` | **Nuevo** — peso por respuesta (T-44) |
| `src/universo/topics.cljs` | **Nuevo** — forma canónica y mapeo a módulo (T-51) |
| `src/universo/components/tetha.cljs` | El peso entra en las dos derivadas |
| `src/universo/irt/progress.cljs` | `:min-response-seconds` en la config; doc de Fisher |
| `src/universo/events/test.cljs` | Calcula y persiste `:weight`; lee el piso del banco |
| `src/universo/profile.cljs` | Delega el mapeo de topics en `universo.topics` |
| `src/universo/db/crud.cljs` | `min_response_seconds` en el payload de `test_configs` |
| `src/universo/events/admin.cljs` | Campo nuevo en el draft por defecto |
| `src/universo/components/admin_test_configs.cljs` | Campo y columna nuevos |
| `supabase/migrations/028_…sql` | **Nueva** — umbral de esfuerzo por banco |
| `supabase/migrations/029_…sql` | **Nueva** — normalización de topics + backfill + triggers |
| `supabase/migrations/030_…sql` | **Nueva** — 11 equivalencias que faltaban (156 → 132) |
| `supabase/migrations/031_…sql` | **Nueva** — dos módulos nuevos (18 → 20) y las últimas 3 preguntas (132 → 128) |
| `supabase/migrations/032_…sql` | **Nueva** — piso de esfuerzo 3 s → 2 s, calibrado con datos |
| `supabase/queries/T-59_calibracion_tiempos.sql` | **Nuevo** — 10 consultas de solo lectura + resumen del resultado |
| `supabase/queries/verificacion_esquema.sql` | **Nuevo** — 7 bloques de contraste base ↔ repo |
| `test/universo/irt/effort_test.cljs` | **Nuevo** |
| `test/universo/topics_test.cljs` | **Nuevo** |
| `adr/ADR-017-topic-canonico-por-trigger.md` | **Nuevo** |
| `adr/ADR-014-…md` | Nota de corrección en §Contexto (premisa "cero estudiantes") y en §Alternativas (espacios, medido) |
| `public/js/app.js` | Recompilado (`release app`, 0 warnings) |
| `project-memory/HANDOFF.md` | **Reescrito** — estado, pendientes, riesgos, preguntas, decisiones (faltaban 7 ADRs) y próximos pasos |
| `project-memory/{CURRENT_STATUS,BACKLOG,DECISIONS,OPEN_QUESTIONS,RISKS,ARCHITECTURE,TERMINOLOGY,TECH_STACK,DEPENDENCIES,AGENT_INSTRUCTIONS,PROJECT_BRIEF,LESSONS_LEARNED}.md` | Auditados y corregidos |
| `supabase/SCHEMA.md` | Migraciones marcadas, dos secciones nuevas y la guía de verificación |

## Comandos ejecutados y resultados

```
clj -M:test                 → 58 tests / 332 assertions / 0 failures  (entrada: 46/186)
npx shadow-cljs release app → 0 warnings (recompilado en cada tanda)
npm run build:css           → sin cambios (se reusó vocabulario de clases existente)
clj-kondo --lint <tocados>  → 0 errors, 0 warnings
clj-kondo (analysis + jq)   → quién llama a topic->module-slug / las derivadas, antes de refactorizar
git log -S ":time-ms"       → sitúa la instrumentación en 2025-09-09 (dato que después resultó
                              insuficiente: el campo existía pero no medía)
psql (bases desechables)    → 028+029; 030+031; las 10 consultas de T-59; el verificador de esquema
                              con un fixture defectuoso a propósito. Idempotencia comprobada en todas
curl + md5 vs origin/main   → producción sirve ef97d814d66efd61d08d90711431aca9 (age: 0)
curl a la landing           → la frase del FAQ sigue publicada, y ahora es cierta
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Forma canónica de `topic` garantizada por **trigger**, no por `check` ni convención | **Sí** | [[../adr/ADR-017-topic-canonico-por-trigger]], D-36 vecina |
| El peso de esfuerzo se **guarda en la respuesta**, no se recalcula | No | D-36 |
| `min_response_seconds` **`not null default`**, no nullable | No | D-36, cabecera de `028` |
| El default pasa de 3 s a **2 s**, elegido por los datos y no por el autor | No | Cabecera de `032`, T-59 hallazgo 4 |
| `inecuaciones` y `operaciones_fundamentales` van a **módulos nuevos**, no a uno parecido | No | **D-37**, cabecera de `031` |
| T-51 se cierra trasladando a **T-60** la mitad del criterio que no puede cumplir | No | T-51 §nota de cierre |
| T-59 se reformula como **escalera jerárquica**, no como salto a estimación por ítem | No | T-59 §replanteo |
| `:time-ms = 0` **no** descarta la respuesta (es "no medido") | No | Docstring de `effort/measured-ms`, T-44 |
| Sin backfill de pesos sobre `tests` ya rendidos | No | Cabecera de `028` |
| `normalize` **no** unifica `_`, `-` ni espacios | No | ADR-017 §Alternativas |
| Los bancos mezclados (`diagnostico`, `paes_m1`) quedan **sin módulo** a propósito | No | Cabecera de `029`, T-51 |
| Un solo branch para los dos tickets | No | Acá — dos ramas garantizaban conflicto en `public/js/app.js`, que es un artefacto compilado |

## Riesgos identificados

- **Regla duplicada en dos lenguajes.** `public.normalize_topic()` y `universo.topics/normalize`
  pueden divergir y **nada lo verifica automáticamente**. Es la misma deuda que ya existe entre
  `universo.slots.logic` y el trigger de confirmación de cupos. Registrado en ADR-017 §Riesgos.
- **La base modifica el dato en silencio.** Un admin que escriba "Álgebra" verá "algebra" guardado
  sin aviso, y un alta con una variante de un topic existente ahora falla con violación de clave
  primaria sin explicar por qué. Aceptado en ADR-017, sin señal en el panel todavía.
- **Los dos módulos nuevos de `031` nacen sin recursos publicados.** Un déficit ahí muestra el estado
  vacío de T-24. Se aceptó a propósito (mejor que ofrecer material de otro tema), pero es contenido
  pendiente que se suma a T-27/T-56.
- **T-29 hereda el problema de cobertura de datos.** Calibrar `difficulty` usaría los mismos tests
  cuyo tiempo resultó estar casi todo en cero; conviene verificar la cobertura antes de darla por
  viable. Anotado en R-17.
- Ningún riesgo nuevo para [[../project-memory/RISKS]]: T-44 **mitiga parcialmente R-17** (θ sesgada)
  al sacar del cálculo las respuestas al azar, sin cerrarlo — la calibración de `difficulty` (T-29)
  sigue pendiente.

## Bloqueos

Ninguno. Todo lo de esta sesión quedó aplicado, mergeado (PR #34) y verificado en producción.
Lo que sigue abierto son tickets nuevos (T-59, T-60), no bloqueos de este trabajo.

## Preguntas abiertas nuevas

- **Q-26 · ¿Cuántos diagnósticos rendidos traen `time-ms` utilizable?** Abierta y **respondida el
  mismo día**: 195 de 2178 (9 %), y el cronómetro sí registra hoy.
- Sin número formal, pero pendientes de decisión del owner: **qué módulo le corresponde a cada uno
  de los 128 ítems** de `diagnostico`/`paes_m1` (T-60), y **si al clasificarlos conviene renombrarles
  el topic** o dejarlo y usar solo `module_id` — no es cosmético, `topic` es la clave de
  `test_configs` y de la progresión por prerequisitos.

## Supuestos aplicados

- El fixture de prueba **no es el esquema real** (T-48: el repo no puede reconstruirlo). Reproduce
  las columnas y restricciones que tocan `028`/`029`, así que la verificación cubre la lógica de las
  migraciones, **no** el estado real de la base del owner.
- El mapeo `explicit-topic->module-slug` incluye algunas equivalencias (`ecuaciones_lineales`,
  `productos_notables`, `raices`, `pitagoras`) para las que no se verificó que el topic exista en el
  banco. Son **no-ops** si no existen, y cada una es correcta si existe; ninguna se inventó contra
  evidencia. *(La medición posterior mostró que `ecuaciones_lineales` efectivamente no existe: la
  variante real usa espacio.)*
- Las 195 respuestas con tiempo real **probablemente no son una muestra representativa** de
  estudiantes: casi seguro vienen de tests recientes, posiblemente de pruebas del propio owner. El
  piso de 2 s de `032` se apoya en ellas por ser la única evidencia disponible, **no** porque sean
  una calibración sólida. Está dicho en la cabecera de la migración.
- El cierre de "el cronómetro registra hoy" es **por reporte del owner**, sin verificación del
  agente (mismo patrón que T-03/T-25/T-36/T-50).

## Próximos pasos

Todo lo de esta sesión quedó aplicado, mergeado y verificado en producción. Lo que sigue:

1. **Difundir el cupo del 2026-08-15** y **revisarlo el viernes 14** (R-19, R-11). No es código y es
   lo que más mueve la aguja: el producto está listo y el cuello de botella es que alguien lo use.
   Con el cronómetro funcionando, difundir además **construye el dataset de T-59**.
2. **Correr `supabase/queries/verificacion_esquema.sql`**, bloques B y F, contra producción. Nunca se
   corrió contra el estado real después de las cinco migraciones de hoy.
3. **Cerrar T-48** pegando la salida del bloque G del verificador: es lo único que falta para
   escribir `000_baseline.sql` y que el repo pueda reconstruir el esquema.
4. **T-60** (clasificar los 128 ítems de los bancos mezclados) y **T-20** (instrumentar el embudo:
   hay tráfico y no se mide nada).
5. **X-02** es ahora la única afirmación falsa publicada. Depende de Q-07/T-26. La materia prima
   existe —`tests` guarda un intento por fila y `universo.access` ya agrega por topic—: falta decidir
   la semántica del re-diagnóstico, no instrumentar.

## Pendientes

- 128 ítems de bancos mezclados sin `module_id` (contenido, no SQL) → T-60.
- Los dos módulos nuevos nacen **sin recursos publicados**.
- T-59 bloqueado por **volumen de datos**; el escalón "umbral global" ya es alcanzable con las 195
  respuestas actuales.
- X-02 publicada y falsa.
- La consulta del módulo más fallado (paso 2 de T-57) sigue sin llegar.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md` (T-44 hecho y en producción, T-51 hecha, T-59 y T-60 nuevas)
- [x] `project-memory/DECISIONS.md` (ADR-017, D-36, D-37)
- [x] `adr/ADR-017-topic-canonico-por-trigger.md` (nuevo) y `ADR-014` (dos notas de corrección)
- [x] `project-memory/OPEN_QUESTIONS.md` (**X-01 resuelta**, Q-26 abierta y respondida, Q-06 y X-02
      actualizadas)
- [x] `supabase/SCHEMA.md` (`027`–`032` marcadas aplicadas, dos secciones nuevas, guía de verificación)
- [x] `project-memory/graph/` — refrescado con `graphify update .`
- [x] `project-memory/RISKS.md` — R-17 con nota de T-44/T-59
- [x] `project-memory/ARCHITECTURE.md` — namespaces puros nuevos, tablas, funciones, triggers e
      invariantes que impone la base
- [x] `project-memory/HANDOFF.md` — **reescrito**, estaba congelado en el 2026-07-26
- [x] `project-memory/{TERMINOLOGY,TECH_STACK,DEPENDENCIES,AGENT_INSTRUCTIONS,PROJECT_BRIEF,LESSONS_LEARNED}.md`

## Notas

La lección de la sesión es de método, no de código: **`029` se entregó con un defecto que solo
apareció al aplicarla contra un Postgres de verdad.** La versión revisada a ojo hacía ganar, al
fusionar dos variantes de un topic, a la fila que ya estaba bien escrita — y con eso borraba en
silencio un prerequisito configurado con θ mínimo, que no es cosmética sino quién puede rendir el
test. El fixture costó unos minutos y la máquina ya tenía PostgreSQL corriendo. Para migraciones que
tocan claves primarias con auto-FK y datos de usuarios, y que se aplican contra producción sin
staging, **conviene que sea el procedimiento por defecto y no un extra**.

**La segunda lección es sobre inferir en vez de medir, y el agente la repitió tres veces.** Las tres
correcciones de esta sesión tienen la misma forma: una conclusión razonable sacada de evidencia
indirecta, que el dato real desmintió.

| Se afirmó | Con qué evidencia | Qué mostró el dato |
|---|---|---|
| "Los 252 tests deberían tener tiempos" | `git log -S ":time-ms"` databa la instrumentación en 2025 | El campo existía pero valía 0 en el 91 % |
| "El campo del panel de T-44 sobra" | Largos de enunciado **inventados** para un fixture | El enunciado mediano real es de 50 caracteres: el piso manda en 234 de 387 ítems |
| "La decisión de ADR-017 sobre espacios se cayó" | Aparecieron topics con espacio | Ninguno duplicaba a una variante con guion bajo: la decisión se sostenía |

En los tres casos la afirmación se marcó como pendiente de verificar y se verificó, que es lo que
evitó que quedaran como hechos en la memoria. Pero **dos de ellas llegaron a escribirse en archivos
del repositorio antes de medirse**, y hubo que corregirlas dejando constancia. El patrón a repetir es
el marcado explícito; el patrón a evitar es escribir la inferencia con el tono de un hallazgo.

---

## Commits de la sesión

| Commit | Qué cerró |
|--------|-----------|
| `b44357a` | T-44 · el tiempo de respuesta entra en la estimación |
| `9bf4152` | T-51 · topics canónicos por trigger + ADR-017 |
| `eb27e29` | T-59 abierto · corrección de la premisa de ADR-014 |
| `9c8a2db` | `030` · 24 ítems más con módulo |
| `6888361` | `031` · dos módulos nuevos + corrección sobre los espacios |
| `b428f8a` | T-59 medido · `032`, piso calibrado a 2 s |
| `3504ef2` | Auditoría de memoria · `HANDOFF` reescrito |
| `c8ecc2d` | **PR #34 mergeado a `main`** |
| `4db5d31` | **X-01 cerrada** · verificada en producción por hash |
| `a5b8ada` | Verificador de esquema |
| `64a7e92` | T-59 replanteado · el cronómetro sí registra |

---

Relacionado: [[../project-memory/BACKLOG]] T-44, T-51, T-59, T-60 ·
[[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]] ·
[[../adr/ADR-017-topic-canonico-por-trigger]] · [[../project-memory/OPEN_QUESTIONS]] X-01, Q-26 ·
`../supabase/SCHEMA.md` · `../supabase/queries/verificacion_esquema.sql` · `SESSION-017.md`

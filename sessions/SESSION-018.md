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

## Archivos revisados

- `project-memory/{CURRENT_STATUS,HANDOFF,BACKLOG,OPEN_QUESTIONS,DECISIONS}.md`,
  `sessions/SESSION-017.md`
- `adr/ADR-014-tiempo-de-respuesta-como-eje-separado.md`
- `src/universo/{profile,components/tetha,irt/progress,events/test,db/crud,events/admin}.cljs`,
  `components/{admin_test_configs,diagnostic_test}.cljs`
- `supabase/migrations/{002_seed_modules,020_test_configs}.sql`, `supabase/SCHEMA.md`

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
| `test/universo/irt/effort_test.cljs` | **Nuevo** |
| `test/universo/topics_test.cljs` | **Nuevo** |
| `adr/ADR-017-topic-canonico-por-trigger.md` | **Nuevo** |
| `public/js/app.js` | Recompilado (`release app`, 0 warnings) |
| `supabase/SCHEMA.md`, `project-memory/{CURRENT_STATUS,BACKLOG,DECISIONS,OPEN_QUESTIONS}.md` | Actualizados |

## Comandos ejecutados y resultados

```
clj -M:test                → 58 tests / 332 assertions / 0 failures  (entrada: 46/186)
npx shadow-cljs release app → 0 warnings (recompilado en cada tanda)
npm run build:css           → sin cambios (se reusó vocabulario de clases existente)
clj-kondo --lint <tocados>  → 0 errors, 0 warnings
psql (bases desechables)    → 028+029, luego 030+031: verificación por bloques e idempotencia OK
psql (fixture sintético)    → las 9 consultas de T-59 corridas antes de entregarlas
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Forma canónica de `topic` garantizada por **trigger**, no por `check` ni convención | **Sí** | [[../adr/ADR-017-topic-canonico-por-trigger]], D-36 vecina |
| El peso de esfuerzo se **guarda en la respuesta**, no se recalcula | No | D-36 |
| `min_response_seconds` **`not null default 3`**, no nullable | No | D-36, cabecera de `028` |
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
- Ningún riesgo nuevo para [[../project-memory/RISKS]]: T-44 **mitiga parcialmente R-17** (θ sesgada)
  al sacar del cálculo las respuestas al azar, sin cerrarlo — la calibración de `difficulty` (T-29)
  sigue pendiente.

## Bloqueos

Ninguno técnico. **Depende del owner:** aplicar `028` y después `029` (el agente no aplica
migraciones, [[../CLAUDE]] §9), y mergear la rama.

## Preguntas abiertas nuevas

Ninguna formal. Queda la pregunta de contenido que T-51 no puede responder: **qué módulo le
corresponde a cada uno de los 128 ítems de `diagnostico` y `PAES_M1`**.

## Supuestos aplicados

- El fixture de prueba **no es el esquema real** (T-48: el repo no puede reconstruirlo). Reproduce
  las columnas y restricciones que tocan `028`/`029`, así que la verificación cubre la lógica de las
  migraciones, **no** el estado real de la base del owner.
- El mapeo `explicit-topic->module-slug` incluye algunas equivalencias (`ecuaciones_lineales`,
  `productos_notables`, `raices`, `pitagoras`) para las que no se verificó que el topic exista en el
  banco. Son **no-ops** si no existen, y cada una es correcta si existe; ninguna se inventó contra
  evidencia.

## Próximos pasos

1. **Aplicar `030` → `031` → `032`** (las dos primeras en ese orden; `032` es independiente) y
   verificar que queden 128 ítems sin `module_id`.
2. **Correr la consulta 6 de T-59.** Es lo más urgente de esta lista: dice si el cronómetro está
   registrando **hoy**. Cada diagnóstico que se rinda sin tiempo es un dato que no se recupera, y el
   cupo del 2026-08-15 va a traer los primeros estudiantes externos.
3. **Mergear la rama y publicar el bundle.** Recién ahí la frase de la FAQ sobre el tiempo de
   respuesta (X-01) deja de ser falsa. **X-02** ("te muestra cómo se movió tu nivel") **sigue
   falsa** y no la toca este trabajo: depende de Q-07/T-26.
4. Lo que más importa y no es código: **difundir el cupo del 2026-08-15** (R-19) y **revisarlo el
   viernes 14** por R-11.

## Pendientes

- `030`, `031` y `032` sin aplicar; rama sin mergear.
- 128 ítems de bancos mezclados sin `module_id` (contenido, no SQL).
- Los dos módulos nuevos nacen **sin recursos publicados**.
- T-59 bloqueado por instrumentación, no por volumen de datos.
- La consulta del módulo más fallado (paso 2 de T-57) sigue sin llegar.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md` (T-44 hecho, T-51 en curso)
- [x] `project-memory/DECISIONS.md` (ADR-017, D-36)
- [x] `adr/ADR-017-topic-canonico-por-trigger.md`
- [x] `project-memory/OPEN_QUESTIONS.md` (X-01 y Q-06 actualizadas, ninguna cerrada)
- [x] `supabase/SCHEMA.md` (`027` marcada aplicada; `028`/`029` documentadas)
- [x] `project-memory/graph/` — refrescado con `graphify update .`
- [ ] `project-memory/RISKS.md` — sin riesgo nuevo; R-17 queda parcialmente mitigado, no cerrado
- [ ] `project-memory/ARCHITECTURE.md` — actualizado el diagrama de lógica pura; sin cambio de flujo

## Notas

La lección de la sesión es de método, no de código: **`029` se entregó con un defecto que solo
apareció al aplicarla contra un Postgres de verdad.** La versión revisada a ojo hacía ganar, al
fusionar dos variantes de un topic, a la fila que ya estaba bien escrita — y con eso borraba en
silencio un prerequisito configurado con θ mínimo, que no es cosmética sino quién puede rendir el
test. El fixture costó unos minutos y la máquina ya tenía PostgreSQL corriendo. Para migraciones que
tocan claves primarias con auto-FK y datos de usuarios, y que se aplican contra producción sin
staging, **conviene que sea el procedimiento por defecto y no un extra**.

---

Relacionado: [[../project-memory/BACKLOG]] T-44, T-51 ·
[[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]] ·
[[../adr/ADR-017-topic-canonico-por-trigger]] · `../supabase/SCHEMA.md` · `SESSION-017.md`

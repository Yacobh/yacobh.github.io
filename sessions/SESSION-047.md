# SESSION-047

## Fecha

2026-09-19

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code — Opus 5

## Objetivo de la sesión

Dos cosas pedidas explícitamente: **(1) T-134**, que un diagnóstico abandonado deje rastro, y
**(2) empezar un plan** para las migraciones de un curso de electrónica —electricidad desde cero en
circuitos: notación científica, ley de Ohm, potencia, capacitores y leyes de Kirchhoff— como un
corpus relacionado.

El objetivo no cambió. Cambiaron dos cosas de fondo:

- **Cómo se resuelve T-134**: su ficha proponía dos opciones y **se eligió una tercera**.
- **Para quién es el curso de electrónica.** El owner lo aclaró después de que el plan estuviera
  escrito: es **su propio curso de técnico en electrónica**, chicos de 16–17 años con muchas fallas
  de base, para quienes `electrotecnia` queda muy alto; **solo continua**, y con `C = Q/V` adentro.
  Ese dato **invalidó el análisis de valor del plan**, no lo matizó (ver Notas).

## Contexto de entrada

- Rama: `main`
- Commit inicial: `db186b6` (cierre de SESSION-046)
- Estado del árbol al empezar: **limpio**
- Documentos de la memoria leídos: `CLAUDE.md`, `BACKLOG` (T-134, T-133, T-135, la tabla de
  prioridades), `SCHEMA.md` (entradas 63–71 y la vista `tests_sin_identidad`), `ADR-035`, `ADR-038`,
  `ADR-040`, `sessions/SESSION-043` (procedimiento de PostgreSQL desechable),
  `.claude/skills/unidad-de-contenido/referencias/mapa-de-la-unidad.md`
- Bloqueos vigentes al empezar: ninguno

## Actividades realizadas

1. **Lectura del estado real antes de decidir.** `tests` tiene exactamente dos policies (`023`:
   `tests_insert_own`, `tests_select_own`) y **ninguna de UPDATE ni de DELETE**. El único `insert`
   sale de `:test/complete`. El trigger de `067` es `before insert`.
2. **El hallazgo que decidió el diseño:** al menos **seis lectores de `tests` asumen «fila =
   medición terminada»**, y el peor es `access/best-theta-by-topic`, que toma el **máximo** θ del
   historial — un intento abandonado con θ parcial inflado desbloquearía un topic no ganado. Eso
   descartó la opción (a) de la ficha.
3. **Tres preguntas al owner**, con recomendación: dónde vive el intento en curso, si el curso de
   electrónica es track nuevo o piso de `electrotecnia`, y con cuántos módulos. Las tres se
   respondieron por la opción recomendada.
4. **`070_intentos.sql` escrita**, y **verificada contra un PostgreSQL 14.18 desechable** con
   réplica del estado previo, en TCP porque el socket Unix del scratchpad excede los 103 bytes.
5. **Verificada también contra PostgREST 12.0.3 real**, con JWT firmados. Es lo único que prueba que
   policies y privilegios se alinean con un `PATCH`, y **es lo que encontró los dos defectos** (ver
   abajo).
6. **Mitad cliente:** `universo.rastro` (puro, 13 tests), `crud/abrir-intento!` y
   `crud/latir-intento!`, los tres efectos en `events/test.cljs`, y el `intento_id` en `:save-test`
   con su reintento.
7. **Reescritura de un contrato:** el comentario de `:test/reintentar-ultimo` decía *«es seguro
   porque nada se persiste por ítem… si algún día se guarda respuesta por respuesta, este evento
   deja de ser solo estado local»*. Ese día llegó; el evento pasó a `reg-event-fx` y late.
8. **Plan del track `electronica`** en `project-memory/PLAN_TRACK_ELECTRONICA.md`, con épica **E10**
   y **T-155…T-162**. **Reescrito** al llegar el destinatario real: cambió la justificación, la
   cadena de prerrequisitos, las bandas, `initial_theta` y el propio T-155.
9. **Corrección del mapa de la unidad** (L-22 contra el propio mapa, ver Notas).
10. **Intento de aplicar `070` con `claude_ddl`** (ADR-040), a pedido del owner. **No se pudo, y el
    intento encontró dos cosas** (ver «Lo que no funcionó»): que la migración excede el rol a
    propósito, y que **producción es PostgreSQL 17.6 mientras la verificación se había hecho contra
    14.18**.
11. **Re-verificación completa contra PostgreSQL 17.11** (instalado con `brew install
    postgresql@17`, keg-only, no pisa al 14). Comportamiento idéntico.
12. **El owner aplicó `070` en producción** desde el SQL Editor, y el agente **la verificó contra la
    base real** con `claude_ddl` en solo lectura: los 12 controles en verde (ver abajo).
13. **Hallazgo lateral de esa verificación:** **18 de las 19 tablas de `public` le dan a `anon`
    DELETE y TRUNCATE**. Registrado como **R-46** y **T-163**.
14. **El track `electronica` escrito entero** (2026-09-20): `072`…`076` con sus ítems y 30 ideas
    erróneas por la skill `banco-de-items`, y `077` con las cinco `test_configs`. Las siete
    migraciones aplicadas **en orden** sobre PostgreSQL 17.11, nueve controles en verde,
    idempotentes, y las dos guardas de `077` probadas disparando.
15. **Los cinco bancos de 12 a 16 ítems** (T-164), porque el reintento es la remediación del track y
    con 12 dos intentos compartían al menos 4 ítems. 20 ítems nuevos, apuntados a las ideas erróneas
    **menos usadas** de cada catálogo. Re-verificado todo: 80 ítems, claves 25 % exacto en las cuatro.
16. **Aplicación en producción de las siete migraciones de E10** (2026-09-20): `071` la había aplicado
    el owner; `072`…`077` las aplicó el agente con `claude_ddl`. Verificación contra la base real:
    5 módulos, **80 ítems**, 30 ideas erróneas, 0 sin módulo, 0 sin diagnosticar, 0 fuera de banda,
    claves 20/20/20/20, 5 `test_configs` encadenadas.
17. Desmontaje de los clusters y del PostgREST desechables.

### Lo que no funcionó, y por qué vale anotarlo

- **La primera versión mandaba `cerrado_en` desde el cliente** (`(.toISOString (js/Date.))`).
  Contra PostgREST, con una hora anterior a `iniciado_en`, el `PATCH` devuelve **400** por el check
  `intentos_cierre_posterior`: **el intento no se cierra nunca y quien terminó su diagnóstico cuenta
  como abandono**. Corregido: el cliente manda una intención y el trigger pone `now()`.
- **La primera versión apagaba el rastro leyendo el mensaje del error.** Con la tabla ausente,
  PostgREST 12.0.3 responde **`404` con el cuerpo vacío**: ni `PGRST205`, ni mensaje, ni nada.
  Habría quedado reintentando en cada respuesta contra una fila inexistente. Corregido con una regla
  que no depende del texto: **si la apertura falla, por lo que sea, se apaga**.
- Un `(:require [clojure.set])` que quedó sin usar en `rastro.cljs` y una coerción booleana
  redundante que marcó `clj-kondo`. Los dos removidos.

- ⛔ **`claude_ddl` no puede aplicar `070`, y eso es correcto.** Medido contra producción, tres
  sentencias fallan:

  ```
  alter table public.tests add column intento_id  → must be owner of table tests
  references auth.users(id)                       → permission denied for schema auth
  create or replace view tests_sin_identidad      → must be owner of view
  ```

  Es la línea que ADR-040 trazó entre **agregar contenido** y **cambiar la forma de la base**. Hay
  además un segundo motivo para que no la aplique aunque pudiera: `claude_ddl` sí tiene `create`
  sobre `public`, así que crearía `intentos` y quedaría como **dueño de la tabla** — y el dueño está
  **exento de su propia RLS** salvo `force row level security`. El rastro de los estudiantes tendría
  un rol de agente capaz de leerlo entero.

- ⭐ **Un ítem salió con la alternativa correcta equivocada, y lo atrapó releerlo — no el
  verificador.** En el banco de Ohm, la opción marcada como correcta decía «alrededor de 50 ohm»
  cuando la cuenta da 20, y su explicación se contradecía a mitad de frase. `verificar_items.py`
  comprueba que haya **exactamente una** alternativa correcta, no que el número esté bien: es T-105
  (3 ítems sin ninguna correcta, 7 con dos) en la versión que **ningún script alcanza**. El
  cuello de botella que la skill declara —la revisión humana— es exactamente esto.

- **El verificador rebota por punto flotante en los bordes de tramo.** Con `min = -2,8` y
  `ancho = 0,6`, el borde se calcula como `-2,2000000000000002`, así que un ítem en `-2,2` cae en el
  tramo de abajo y el de arriba queda con 5 de 6. Pasó en **dos de los cinco bancos**. Se corrige
  corriendo la dificultad unas centésimas; la regla práctica es no poner ítems justo en el borde.

- ⭐ **La verificación estaba hecha contra la versión mayor equivocada.** Producción es **PostgreSQL
  17.6**; el cluster desechable era **14.18**, que es lo que había instalado. Se descubrió al
  conectarse para aplicar, no al verificar. Se instaló `postgresql@17` y se repitió la batería
  completa: **comportamiento idéntico** —aplicación, idempotencia, triggers, policies, privilegios,
  sellado del cierre con `now()`, reversión—, pero **eso no se sabía antes de medirlo**.

## Archivos revisados

- `src/universo/events/test.cljs` (825 líneas: `:test/start`, `register-response`, `:test/complete`,
  el efecto `:save-test`, `:test/reintentar-ultimo`)
- `src/universo/access.cljs` — `best-theta-by-topic` y su `max`, que es el argumento central
- `src/universo/db.cljs` (`default-db`, el mapa `:test`), `src/universo/db/crud.cljs`,
  `src/universo/motor.cljs`, `src/universo/irt/escape.cljs`, `src/universo/topics.cljs`,
  `src/universo/bands.cljs`
- `supabase/migrations/067_tests_origin.sql`, `023_rls_limpieza.sql`, `062_electrotecnia_*.sql`,
  `065_test_configs_de_electrotecnia.sql`, `supabase/acceso_correccion_tests_pii.sql`
- `adr/ADR-035`, `adr/ADR-038`, `.claude/skills/unidad-de-contenido/referencias/mapa-de-la-unidad.md`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `supabase/migrations/070_intentos.sql` | **Nuevo.** Tabla `intentos`, `intento_abandonado()`, dos triggers, tres policies, privilegios explícitos, dos índices, `tests.intento_id`, vista recreada |
| `src/universo/rastro.cljs` | **Nuevo.** Lógica pura: qué viaja, las tres filas, la ventana de abandono, la degradación |
| `test/universo/rastro_test.cljs` | **Nuevo.** 13 tests |
| `src/universo/db/crud.cljs` | `abrir-intento!` y `latir-intento!` |
| `src/universo/events/test.cljs` | `:rastro/abrir` · `:rastro/latir` · `:rastro/cerrar` · `:rastro/apagar`; latido en `register-response`; `intento_id` y su reintento en `:save-test`; `:test/reintentar-ultimo` a `reg-event-fx` |
| `src/universo/db.cljs` | `:test :rastro {:id nil :off? false}` |
| `public/js/app.js` | Recompilado (ADR-003) |
| `adr/ADR-036-el-intento-en-curso-vive-en-su-propia-tabla.md` | **Nuevo** |
| `project-memory/PLAN_TRACK_ELECTRONICA.md` | **Nuevo** |
| `project-memory/{BACKLOG,CURRENT_STATUS,DECISIONS,RISKS,ARCHITECTURE}.md` | T-134 cerrada, épica E10, D-72, R-39 tercera instancia, tabla `intentos` |
| `supabase/SCHEMA.md` | Entrada 72 (`070`) con su verificación |
| `.claude/skills/unidad-de-contenido/referencias/mapa-de-la-unidad.md` | B1 estaba desactualizado (ver Notas) |

## Comandos ejecutados y resultados

```
clj -M:test                 → 228 tests / 2907 assertions / 0 failures, 0 errors
clj-kondo --lint src test   → 0 errors, 1 warning (los dos hallazgos son previos y en otros archivos)
npx shadow-cljs release app → Build completed, 0 warnings
npm run build:css           → no corrido (ningún cambio de clases Tailwind; no hay cambio de UI)
graphify update .           → corrido al cierre

initdb + pg_ctl + psql (PostgreSQL 14.18 desechable, TCP 127.0.0.1:54399) + PostgREST 12.0.3
  → 070 aplica limpia con ON_ERROR_STOP=1 e **idempotente**; reversión del pie OK y re-aplica
  → el trigger pisa `origin` aunque el cliente mande 'admin_preview'
  → `email` y `email-user` no entran al jsonb, ni por SQL ni por HTTP
  → dueño, topic, origen y fecha de inicio no se mueven en un update
  → otro estudiante: 0 filas visibles, 0 filas afectadas; anon: permission denied
  → DELETE → 42501 permission denied **por privilegio**, no solo por falta de policy
  → intento cerrado: no se reescribe (policy desde el cliente, excepción desde el SQL Editor)
  → ciclo HTTP completo: abrir 201 · latir 204 · cerrar 204 · test con intento_id 201
  → DEFECTO 1: `cerrado_en` del cliente → PATCH 400 y el intento queda abierto para siempre
  → DEFECTO 2: tabla ausente → 404 con cuerpo VACÍO (sin PGRST205, sin mensaje)
  → ORDEN INVERTIDO (R-39, 3ª instancia): insert de tests con intento_id → PGRST204;
    el reintento sin la columna → 201
  → bundle: `intentos` ×8, `intento_id` ×5, `cerrado_en` ×1 en public/js/app.js

psql contra PRODUCCIÓN (PostgreSQL 17.6), rol claude_ddl, solo lectura — tras aplicar 070:
  → tabla `intentos`: dueño postgres, rls = t, force = f  (misma postura que `tests`)
  → 10 columnas con sus defaults · 6 constraints, incluida la FK a auth.users
  → triggers: intentos_marcar_origen (solo INSERT) · intentos_sellar (INSERT OR UPDATE)
  → security definer SOLO en intentos_marcar_origen, con search_path = public
  → 3 policies con el using/with check de cada verbo · 2 índices (uno parcial)
  → intento_abandonado(): f / t / f en los tres casos de la regla
  → tests.intento_id + tests_intento_fk … ON DELETE SET NULL
  → `tests` intacta: 351 filas, 280 de origin='student', 0 con intento_id
  → vista: 9 columnas con intento_id al final, 0 claves `email`, 0 arrobas
  → pg_class.relacl: authenticated=arw (SIN delete/truncate), anon SIN NADA
  → y de verdad: select sobre intentos con claude_ro y claude_ddl → permission denied
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| El intento en curso vive en su propia tabla (`intentos`); `tests` sigue siendo la de mediciones terminadas; el abandono se deriva, no se escribe | **Sí — ADR-036** | [[../project-memory/DECISIONS]] **D-72** |
| El track `electronica` se publica **visible para todos** (activos 14 → 19) y el **reintento es su mecanismo de remediación** | No — repite D-66/ADR-035 y no lo cambia | [[../project-memory/DECISIONS]] **D-73**, cierra T-159 |
| El curso de electrónica es un **track nuevo `electronica`, visible**, con **cinco módulos** encadenados | Pendiente — **ADR-042** es T-155 | [[../project-memory/PLAN_TRACK_ELECTRONICA]], [[../project-memory/BACKLOG]] E10 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| **Un reintento sirve casi los mismos ítems, así que mide memoria** — y el reintento es la remediación declarada del track | Media, **mitigada a medias el mismo día** | RISKS **R-47** *(nuevo)*, BACKLOG **T-164** *(cerrada)* |
| **18 de las 19 tablas de `public` le dan a `anon` DELETE y TRUNCATE**; todo el esquema descansa solo en RLS | Media, **latente y no explotable hoy** | RISKS **R-46** *(nuevo)*, BACKLOG **T-163** |
| El bundle puede llegar antes que la migración — **tercera instancia**, ahora con el agregado de que **el error puede no tener texto** | Media, **mitigada en código** | RISKS **R-39** |
| La épica E10 llevaría el selector del estudiante de PAES de 12 bancos ajenos a 17 | Media | RISKS **R-42** (anotado, decide **T-159**) |

**R-46 es nuevo, y no lo encontró una auditoría: salió de comparar** los privilegios de la tabla
nueva con los de `tests`. Es el argumento a favor de escribir grants explícitos aunque el default
«ya funcione»: sin `070` al lado, nadie tenía con qué comparar.

## Bloqueos

**Ninguno al cierre.** Hubo uno durante la sesión y se resolvió: `070` no podía aplicarla el agente
—se intentó a pedido del owner y se midió que tres de sus sentencias exceden a `claude_ddl`
(ADR-040), por ser una migración **estructural** y no de contenido—, y **la aplicó el owner desde el
SQL Editor el mismo día**.

Queda un paso, que no es bloqueo sino secuencia: **publicar el bundle**. El orden de R-39 ya está
cumplido.

## Preguntas abiertas nuevas

Ninguna.

## Supuestos aplicados

- **La ventana de abandono son 2 horas**, derivada de los 5,8 minutos de mediana medidos en
  SESSION-046 (≈20×). No es una medición del abandono: es una cota deliberadamente ancha. Si alguna
  vez hay datos de cuánto tarda alguien en volver a una pestaña, se recalibra — y se cambia **primero
  en SQL**, que es la fuente de verdad.

## Próximos pasos

1. **Aplicar `070`** en producción, **antes** de publicar el bundle (R-39). Correr la verificación
   (a)–(e) del pie de la migración.
2. Correr la consulta **(c)** —el ítem en el que se van— en cuanto haya intentos reales. Es la
   primera vez que esa pregunta tiene respuesta.
3. **T-163**: acotar los privilegios de tabla, empezando por las que guardan datos personales y por
   `questions`. Dos líneas de SQL por tabla, sin tocar ninguna policy.
3. **T-133** (agregado del mapa de errores) ya puede incluir «cuántos empezaron y cuántos
   terminaron».
4. Para E10: **T-155** primero (la frontera con `electrotecnia`), que bloquea todo lo demás.

## Pendientes

- ~~**Publicar el bundle.**~~ ✅ Hecho al cierre: las siete migraciones aplicadas y el push a `main`.
- **`078` (recursos de capa 1) y la revisión pedagógica de los 80 ítems** siguen abiertos (T-161,
  T-162). Ninguno bloquea que el curso rinda.
- **La verificación de comportamiento en producción no está completa**, y no puede estarlo todavía:
  no hay ninguna fila. Se completa cuando alguien rinda un diagnóstico — ahí valen las consultas
  (b), (c) y (d) del pie de la migración.
- **`071`…`077` sin aplicar.** Son siete, y el orden importa: `071` primero (los ítems referencian
  `module_id`), después `072`…`076`, y `077` al final porque su guarda cuenta los ítems. Las dos
  guardas están probadas, así que aplicarlas fuera de orden **falla ruidosamente** en vez de dejar
  algo a medias.
- ✅ **T-159 decidida** (D-73): que todo estudiante de PAES vea los cinco. `active = true`.
- ✅ **T-164 cerrada**: los bancos subieron a **16 ítems (80 en total)** y el solapamiento forzado de
  un reintento cayó de 4 a **0**. **R-47 sigue abierto**: que sea posible no es que sea seguro —los
  dos intentos arrancan en el mismo `initial_theta`— y afecta a todo el banco, no solo a electrónica.
  El arreglo de fondo va con **T-149**.
- **El catálogo de errores volvió sin marcas.** Las 31 ideas quedan como hipótesis **revisadas en
  bloque**, no confirmadas una por una. Está dicho en la cabecera de cada banco.
- El plan de E10 **no tiene una sola línea escrita**: es plan, no implementación.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [x] `adr/ADR-036-el-intento-en-curso-vive-en-su-propia-tabla.md` (nuevo)
- [x] `project-memory/ARCHITECTURE.md`
- [ ] `project-memory/ROADMAP.md` — **no se tocó**: T-134 era precondición de F12 y sigue siéndolo
      hasta que `070` esté aplicada. Se actualiza cuando lo esté.
- [ ] `project-memory/REQUIREMENTS.md` — no aplica
- [ ] `project-memory/OPEN_QUESTIONS.md` — ninguna nueva
- [ ] `project-memory/ASSUMPTIONS.md` — el supuesto de la ventana está en este archivo y en la
      migración; no se abrió fila propia porque no es un supuesto de negocio
- [ ] `project-memory/LESSONS_LEARNED.md` — ver Notas: hay material para una L nueva, no se escribió
- [ ] `project-memory/TERMINOLOGY.md`
- [x] `project-memory/graph/` (snapshot de Graphify)

## Notas

### Lo que esta sesión enseñó y todavía no es una lección escrita

Son **dos**, y las dos son sobre qué significa «verificado»:

1. **Verificar contra SQL no es verificar.** Los dos defectos de `070` pasaron todas las pruebas en
   `psql` y aparecieron en el primer minuto contra PostgREST. `psql` deja mandar cualquier cosa como
   superusuario y con relojes coherentes; el cliente real manda JSON, con su propio reloj, y recibe
   errores que **pueden no tener texto**.
2. **Verificar contra otra versión mayor tampoco es verificar.** El cluster desechable se armó con
   el Postgres que había instalado (14.18) y producción es 17.6. En este caso no cambió nada, pero
   eso se supo **después** de repetir la batería, y el procedimiento de SESSION-043 —que es el que
   se venía copiando— no dice en ninguna parte que haya que igualar la versión. **La versión mayor
   de producción es parte del fixture**, como lo son `auth.uid()` o `is_admin()`.

Si salen L nuevas, son éstas dos.

Y una que no es de método sino de higiene, y que casi se publica: **un número medido contra el
fixture no es un número medido.** Estas notas dijeron tres veces que el selector pasaba de **18 a 23**
bancos activos. Ese 18 venía del `generate_series(1,18)` de mi propio fixture de prueba. **En
producción son 14, y quedan 19.** El riesgo R-42 no cambia de naturaleza, pero la cifra era del
entorno de verificación y se estaba citando como si fuera de la base.

Y una cuarta, de las de andar: **`zsh` no hace word-splitting de una variable sin comillas.** Un
`for m in $MIGS` tomó las siete migraciones como un solo nombre de archivo y reportó `✗` en todas.
Parecía un fallo de las migraciones y era del bucle. Vale para cualquier script de esta sesión en
adelante: listar los elementos, o usar un array.

Y una tercera de la misma familia que las dos primeras, que salió al cerrar la decisión del reintento: **una mitigación no
está verificada hasta que se hace su aritmética.** «Si no pasa, que repita» suena completo y no lo
es: `next_question` no excluye los ítems de intentos anteriores, así que con banco de 12 y
`max_items = 8` dos intentos comparten **al menos 4 ítems** —pigeonhole, no estimación— y el primero
es siempre el mismo porque arrancan en el mismo `initial_theta`. El mecanismo existía, estaba bien
elegido, y **medía otra cosa de la que se creía**.

### Corrección de memoria (L-22, esta vez contra el propio mapa)

`mapa-de-la-unidad.md` decía en **B1** que `universo.topics/module-slugs` tenía «20 slugs, sin
probabilidad ni electrotecnia». **Son 38**: T-152 los agregó el 2026-09-18, el día anterior a esta
sesión, y el mapa no se actualizó. Se corrigió en el mismo commit, se conservó el ejemplo del modo de
fallo (sigue vigente para el próximo slug que alguien olvide) y se agregó el puntero a
`catch-all-topics`, que es lo que de verdad corresponde para un banco **de eje**.

Es exactamente lo que el encabezado del mapa advierte que va a pasar. La instrucción de
re-verificarlo con `grep` **antes de usarlo** funcionó.

### Sobre E10: el destinatario llegó tarde en la sesión y corrigió el análisis

El plan se escribió primero **sin saber para quién era**, y con esa carencia se anotó como *«R-30 en
estado puro: ~100 ítems de autor que no calibran nada, no miden funnel y no acercan una licencia»*.

El owner aclaró después: es **su propio curso de técnico en electrónica**, chicos de 16–17 años con
muchas fallas de base, para quienes `electrotecnia` queda muy alto; **solo continua**, y hay que
agregar `C = Q/V`.

**Eso invalidó el análisis, no lo matizó.** Un curso entero rindiendo un diagnóstico con el profesor
mirando el resultado es lo más parecido a un cliente institucional que el proyecto ha tenido: ensaya
T-130/T-133 contra un curso real —que es literalmente lo que T-82 pide—, produce Δθ medido (G-4) y
cierra la observación que dejó T-90/T-131 a medias. Lo que sigue siendo cierto es que **no calibra el
banco PAES**, que es lo que G-2 necesita.

⚠️ **Lección de proceso, más útil que la de contenido:** el plan se escribió con tres preguntas de
*forma* contestadas (track nuevo / visible / cinco módulos) y **ninguna de destinatario**. Con la
forma decidida y el destinatario desconocido, el análisis de valor salió al revés. **La pregunta
«¿quién lo va a usar?» tendría que haber ido primero**, antes que «¿track nuevo o ampliar el que
hay?».

Tres cosas del plan cambiaron con el dato, y son el argumento de que la pregunta importaba:

1. **La cadena de prerrequisitos.** `capacitores` colgaba de `ley_de_ohm`; cuelga de
   `notacion_cientifica`, porque `C = Q/V` no necesita Ohm y sí necesita µF/nF.
2. **`initial_theta` explícito por módulo.** Con el −1,0 por defecto, la mitad de un test de 10 se
   gasta viajando hasta el nivel del alumno — y este curso es exactamente la población que lo paga
   (ADR-038, R-44).
3. **La frontera con `electrotecnia`** dejó de ser un ADR abstracto y pasó a ser cuatro reglas
   verificables, de las cuales la que separa de verdad —**cada distractor nombra un error visto en
   el aula**— no se escribe: se cataloga. Por eso T-155 cambió de «escribir un ADR» a «catalogar los
   errores reales del curso».

# SESSION-039

## Fecha

2026-08-28

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Publicar el trabajo de SESSION-037/038, que llevaba cinco días sin commitear, y **atacar el sesgo de
θ** — elegido por el owner con una frase que ordenó toda la sesión: *«yo quiero poder encontrar la
falla del estudiante, sin eso todo lo demás es solo un producto cosmético muy bonito».*

## Contexto de entrada

- Rama: `main` @ `c67c202`, **igual a `origin/main`**; árbol sucio con dos sesiones sin commitear
- Bloqueos vigentes al empezar: la verificación en vivo con cuenta de admin (el owner la hizo en
  esta sesión: abrió el diagnóstico y aprobó el diodo «por ahora»)
- Documentos leídos: `CLAUDE.md`, `CURRENT_STATUS`, `BACKLOG`, `RISKS`, `OPEN_QUESTIONS`, `ADR-004`,
  `ADR-014`, `ADR-019`, `ADR-032`, `ADR-033`, `bands.cljs`, `topics.cljs`, `access.cljs`,
  `components/tetha.cljs`, `irt/progress.cljs`, `events/test.cljs`, migración `046`

## Actividades realizadas

1. **Se publicó SESSION-037/038** en tres commits (`e133d2f`, `3f894fa`, `0a70d09`) y se pushearon.
   Los dos ADR viajan juntos en el primero porque separarlos exigía partir hunks dentro de
   `feedback_modal.cljs` y dejar un estado intermedio que nunca se compiló.
2. **Se midió el motor antes de tocarlo**, simulando su cadena real sobre la distribución medida de
   `numbers_v1`. Ocho simulaciones.
3. **Se implementó ADR-034 / D-65**: azar fijo `c = 0,25`, prior a N(0, 2²), los dos configurables
   por evaluación, y `tests.engine_version`.
4. **Migración `048`**, aditiva, con backfill a 1 y verificación al pie. **Aplicada por el owner al
   cierre de la sesión, antes del push** —el orden que exigía R-39— y verificada: 283 filas
   backfilleadas a v1, 0 sin versión.
5. Se respondió, sin tocar código, la pregunta del owner sobre tiempo de respuesta y sobre repetir
   nivel antes de subir (van der Linden 2007; testlets / MST).

## Lo que no funcionó, y por qué está acá

**Tres hipótesis mías se cayeron midiendo. Las tres eran la explicación «obvia».**

- **El tope de paso de 0,4 no era el problema.** T-112 y yo dábamos por grave que arrancando en −1,0
  hicieran falta ≥7 ítems para llegar a θ = 1,5. Es cierto sobre la *capacidad* del tope, pero el
  tope **no llega a apretar**: quitarlo mueve θ entre 0,00 y 0,06 logits. El MAP se movía despacio
  por el prior, no por el tope.
- **Apuntar los ítems al corte de banda no ayudó** (78 % contra 79 %), pese a ser lo que recomienda
  la teoría de tests de clasificación. Hipótesis mía, refutada por su propia simulación.
- **El agujero del banco no explicaba nada.** `numbers_v1` tiene 4 ítems entre −1 y 0 y rinde igual
  que un banco uniforme y denso: con 12 preguntas bastan ~12 ítems bien ubicados.

**La lección práctica: tres explicaciones plausibles y las tres falsas.** Lo que quedó en pie
—prior contra azar— sobrevivió a cuatro simulaciones distintas, y esa insistencia es la única razón
para creerle.

**Un error de diseño de test, encontrado por el test mismo.** El primero que escribí para el prior
configurable comparaba σ = 1 contra σ = 3 sobre seis aciertos seguidos y daba `1.4 == 1.4`: el tope
saturaba en los dos casos y el test no medía lo que decía medir. Se partió en dos —el MAP sin tope
por un lado, el tope por otro— porque estaban midiendo cosas distintas.

**Un riesgo que casi se despacha sin ver (R-39).** El cliente empezó a escribir una columna que crea
`048`, y acá las migraciones se aplican a mano: si el bundle llega antes, PostgREST rechaza el
`insert` **entero** y el diagnóstico completo del estudiante se pierde. Se agregó reintento sin la
columna, con test para el caso que **no** debe reintentarse (un fallo de RLS).

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/motor.cljs` | **Nuevo.** Versión del motor, defaults con guardas, detección de `048` sin aplicar |
| `src/universo/components/tetha.cljs` | `probability` con azar; derivadas por información esperada (Fisher scoring: con c > 0 la verosimilitud deja de ser log-cóncava); prior y `c` configurables |
| `src/universo/irt/progress.cljs` | `fisher-information` y `standard-error` con `c`; `posterior-standard-error` nueva; `guessing-c` en `default-stop-config` |
| `src/universo/events/test.cljs` | `:guessing_c`/`:prior_sd` al `stop-config`; `engine_version` en la fila; reintento si `048` no está |
| `src/universo/db/crud.cljs`, `events/admin.cljs`, `components/admin_test_configs.cljs` | Los dos parámetros, editables desde el panel |
| `supabase/migrations/048_*.sql` | **Nueva.** `tests.engine_version` + `test_configs.prior_sd`/`guessing_c` |
| `test/universo/motor_test.cljs` | **Nuevo.** Incluye simulación determinista (LCG) del sesgo contra el motor real |
| `test/universo/components/tetha_test.cljs`, `test/universo/irt/progress_test.cljs` | Reducción a c = 0, mecanismo del azar, R-38 clavado |

## Resultado

**181 tests / 2677 assertions / 0 failures** · **5/5 auditores** · build de release sin warnings.

| θ real | sesgo v1 | sesgo v2 | banda v1 | banda v2 |
|---|---|---|---|---|
| −1,5 | +1,00 | **+0,31** | 80 % | **95 %** |
| −0,5 | +0,61 | **+0,16** | 42 % | **71 %** |
| 2,0 | −0,40 | **−0,24** | 18 % | **37 %** |

## Pendiente para el owner

1. ~~Aplicar `048`~~ — ✅ **hecho al cierre de la sesión**, antes del push (283 filas en v1).
2. **Verificar en vivo** un diagnóstico completo con el motor nuevo: el primer test que entre debe
   quedar con `engine_version = 2`. Es la comprobación de que el estampado funciona de punta a
   punta, y es lo único de esta sesión que no está verificado.
3. **T-117**: el 37 % del estudiante fuerte. El techo son 12 ítems, no el estimador.
4. **T-111**: la parada por precisión, ahora con la aritmética peor.

## Decisiones registradas

- **D-65 / [[../adr/ADR-034-azar-fijo-prior-suelto-y-version-del-motor]]**
- Cierra **X-10**, **T-112**, **T-114** · Abre **R-39**, **R-40**, **T-116**, **T-117**

---

Relacionado: [[SESSION-038]] · [[../project-memory/CURRENT_STATUS]] · [[../project-memory/BACKLOG]]

# SESSION-048

## Fecha

2026-09-21

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code (Opus 5)

## Objetivo de la sesión

El owner llegó con una noticia y un pedido. **La noticia:** ese mismo día aplicó el sistema a **dos
cursos reales de electrónica** —un 3º y un 4º medio— y habló con colegas de matemática que quieren
usarlo. **El pedido:** un rol de profesor con cuenta propia, una forma de agrupar los diagnósticos
por curso, un panel docente, y —idea suya— poder **elegir la pregunta que más equivocaciones tuvo
para dar la retroalimentación completa**.

El objetivo no cambió, pero **se partió en dos fases** con el owner: primero la pantalla funcionando
sobre los datos de hoy con su cuenta admin (sin rol nuevo, sin migración), y el rol y las cuentas
después, sobre una pantalla ya validada. Esta sesión entrega la **fase 1 completa**.

## Contexto de entrada

- Rama: `main`
- Commit inicial: `62f74d5` (Cerrar SESSION-047: qué significa «verificado»)
- Estado del árbol al empezar: **limpio**
- Documentos de la memoria leídos: `CLAUDE.md`, `CURRENT_STATUS`, `BACKLOG` (T-79, T-82, T-130,
  T-132, T-133, T-134), `OPEN_QUESTIONS` (Q-36, Q-37, Q-46), `RISKS` (R-07, R-28, R-30, R-37, R-44),
  `supabase/SCHEMA.md`, `supabase/queries/T-130_mapa_de_errores_de_un_curso.sql`, `admin_rls.sql`,
  `023_rls_limpieza.sql`, `025_questions_revoke_lectura_directa.sql`, `067_tests_origin.sql`
- Bloqueos vigentes al empezar: **T-79 dependía de T-81** (multi-tenant), que a su vez depende de
  Q-36, abierta desde el 2026-08-16. Por ese camino, el rol de profesor no se podía hacer.

## Actividades realizadas

1. **Se midió la base antes de diseñar nada**, con el rol `claude_ro` sobre `tests_sin_identidad`.
   Eso fue lo que decidió el diseño: los 143 diagnósticos del día **se separan solos por hora de
   Chile** (26 personas de 10:35 a 11:41, 21 de 14:08 a 15:17, **cero personas en los dos bloques**).
   También apareció que hay **8 corridas `admin_preview`** del owner esa misma mañana (08:29–08:45),
   que sin `067` se habrían contado como alumnos.
2. **Se verificaron contra producción dos supuestos que fallan en silencio**, antes de escribir los
   tests: que `questions[].id` y `responses[].question-id` son **ambos números** (un desajuste de
   tipo habría dejado todas las alternativas sin texto, sin error), y que `selected-option` viene en
   mayúscula.
3. **ADR-042 / D-74:** un curso es una **ventana de tiempo con nombre**, no una tabla `cursos`. Lo
   importante no es que evite una migración, sino que **una ventana con dueño alcanza para escribir
   el aislamiento en RLS**: eso desbloquea T-79 sin responder Q-36.
4. `universo.cohorte` (puro, ADR-009) + 21 tests. Las reglas de conteo **no se reescribieron**: se
   llaman desde `universo.intento`, donde `cuenta-como-error?` ya era el criterio de T-130.
5. `components/panel_docente.cljs` (módulo propio, R-07), sección `:aula` en `/aula`,
   `events/aula.cljs` y `crud/fetch-tests-en-ventana`.
6. **Segunda tanda, a pedido del owner tras ver la pantalla:** ranking de participantes ordenable
   (acierto, θ, velocidad, fluidez, intentos, ítems), análisis de qué pasa con los reintentos, y un
   cuadrante velocidad × acierto. ⭐ **Medir los reintentos antes de dibujarlos fue lo que más
   valió** — ver «Notas».
7. **Tercera tanda, tras la segunda lectura del owner** (*«hay muchos juicios de valor»* y *«no
   entiendo qué hace esta caja»*): se quitaron los juicios de toda la pantalla, se **corrigió un
   defecto de ordenamiento** en el acierto por módulo, y se agregaron tres gráficos más. Mirar la
   tira de θ destapó **R-48**.
8. **Cuarta tanda: resultados por banco de preguntas.** En una hora de clase se rinden varios
   diagnósticos (seis en la mañana, siete en la tarde), y la pantalla solo agrupaba por módulo.
   Nace la sección «Por banco» y el banco pasa a ser filtro de toda la pantalla.
9. **Quinta tanda: el tema oscuro.** El owner: *«con el tema oscuro las gráficas no se ven bien, y
   se pierde la nomenclatura que explica los puntos»*. Reproducido renderizando los componentes con
   el **CSS real** dentro de un `<div class="dark">`, al lado del mismo contenido en claro.
   **L-70**: el `.visor` no se invierte y el texto encima sí. Arreglado en el CSS —no componente por
   componente— y de paso apareció que `.visor .grabado` llevaba **meses invisible en ambos temas**
   con los dos auditores en verde.
10. **Sexta tanda: el rol `profesor`.** `080` escrita y **verificada contra PostgreSQL 17.11
    desechable** con seis controles de aislamiento, idempotencia y reversión. Cliente completo:
    `rol-alcanza?`, cohortes en el aula, alta desde el admin y tres roles en el panel de usuarios.
    **T-168 cerrada sin escribir nada.**
11. **La verificación que cierra T-133:** se compiló `universo.cohorte` como script de node
   (build temporal, ya retirado) y se corrió sobre los **147 diagnósticos reales** del día. Contra
   el SQL de T-130 sobre la misma ventana: **61 ideas erróneas, mismo orden, mismos conteos**.

**Lo que no funcionó, y vale anotar:**

- **Un test propio estaba mal planteado**, no el código: afirmaba que ordenar por estudiantes pone
  arriba el error de media sala, pero el escenario tenía **dos errores empatados en 2 estudiantes**,
  donde el desempate por frecuencia es correcto. Se reescribió el escenario (un alumno solo que
  repite cinco veces un error que nadie más comete) para que demuestre lo que dice demostrar.
- **`set!` es forma especial en ClojureScript.** Un local llamado `set!` en el selector no compila
  (`set! target must be a field or a symbol naming a var`).
- ⚠️ **`npx shadow-cljs compile app` sobrescribe `public/js/app.js` con el build de desarrollo**,
  que es el artefacto versionado que ADR-003 publica. Hubo que reconstruir con `release`. Conviene
  no correr `compile app` en un árbol que se va a commitear.
- **La primera comparación SQL↔CLJS pareció diferir** en el 4º y 5º lugar del ranking. No difería:
  la primera consulta agrupaba por `left(idea,58)` y dejaba los empates en orden arbitrario. Con
  las dos listas completas y el mismo criterio de orden, coinciden.

## Archivos revisados

- `src/universo/intento.cljs` — de acá salen `categoria`, `cuenta-como-error?`,
  `alternativas-por-id` y `censurado?`; el namespace nuevo es su versión agregada
- `src/universo/profile.cljs` — `theta-band`, `band-label`, `deficits-from-responses`
- `src/universo/db/crud.cljs` — `fetch-admin-tests` y su respaldo sin `origin`
- `src/universo/events/auth.cljs` — `protected-sections` y los **dos** guards de rol
- `src/universo/router.cljs`, `src/universo/home.cljs`, `src/universo/core.cljs`, `src/universo/db.cljs`
- `src/universo/components/admin_test_detail.cljs` — el lenguaje visual a seguir
- `src/css/app.css` y `tailwind.config.js` — `.control`, `.alojamiento`, `.led`, `.placa`, `.visor`,
  `.grabado`, `.fondo-graticule` y las cinco familias de color
- `supabase/queries/T-130_mapa_de_errores_de_un_curso.sql` — la fuente de verdad de los conteos

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/components/graficos_aula.cljs` | **Nuevo.** Tira de θ, pequeños múltiples de los intentos y barras de acierto por módulo. Dos defectos de geometría corregidos **mirándolos renderizados**: la pila de θ se salía del lienzo por arriba (el alto se fijaba antes de apilar) y un rótulo directo chocaba con el título |
| `src/universo/components/cuadrante_aula.cljs` | **Nuevo.** Velocidad × acierto, un punto por estudiante. SVG con literales dentro de un `.visor`, como `irt_chart.cljs` (ADR-023): **no introduce ningún par de color nuevo** |
| `src/universo/cohorte.cljs` | **Nuevo.** Agregación de muchos intentos: ventana, ranking de ideas erróneas, déficit por módulo, ítems fallados, ítem más fallado con su retroalimentación, distribución de θ. **Segunda tanda:** `con-numero-de-intento`, `progreso-por-intento`, `repeticion-entre-intentos`, `delta-theta`, `ranking` con `bases-de-comparacion` y `criterios` |
| `test/universo/cohorte_test.cljs` | **Nuevo.** 39 tests, con las formas de dato **verificadas contra producción** |
| `src/universo/components/panel_docente.cljs` | **Nuevo.** La pantalla `/aula` (R-07: módulo propio) |
| `src/universo/events/aula.cljs` | **Nuevo.** Eventos, efectos y subs del aula; conversión `datetime-local` ↔ instante |
| `src/universo/db/crud.cljs` | `fetch-tests-en-ventana`: filtro por ventana **en el servidor**, con el mismo respaldo sin `origin` |
| `src/universo/db.cljs` | Estado `:aula` con `:loading?`/`:error` propios |
| `src/universo/events/auth.cljs` | `:aula` en `protected-sections`; nace `staff-sections` y **los dos guards dejan de repetir `(= section :admin)`** |
| `src/universo/router.cljs` | `:aula → /aula`. **No `/profesor`: ya es el currículum** |
| `src/universo/home.cljs` | `case` de `main-content` y enlace «Aula» en la barra |
| `src/universo/core.cljs` | Require de `universo.events.aula` |
| `supabase/migrations/080_cohortes_y_rol_profesor.sql` | **Nueva.** `public.cohortes` + rol `profesor` + `tests_select_profesor`. ✅ **Aplicada por el owner el 2026-09-21** y verificada contra producción |
| `supabase/SCHEMA.md` | Entrada 78 con la verificación completa, y `role` pasa a `user\|profesor\|admin` |
| `src/universo/db/crud.cljs` | `fetch-cohortes` (degrada a lista vacía si `080` no está, R-39), `insert-cohorte!`, `delete-cohorte!` |
| `src/universo/events/auth.cljs` | `rol-alcanza?` reemplaza el `(= section :admin)` repetido; subs `:auth/profesor?` y `:auth/ve-aula?` |
| `src/universo/components/admin.cljs` | El conmutador de dos estados pasa a **tres roles**, un botón por destino |
| `src/css/app.css` | **`.dark .visor .text-gray-*` vuelve a la tinta del tema claro** (el visor no se invierte, ADR-023), y **`.alojamiento .grabado` deja de compartir regla con `.visor .grabado`**: eran dos superficies opuestas con el mismo selector |
| `scripts/audit_contraste.py` | Par nuevo **«visor · etiqueta grabada»** (49 pares). El contrato solo declaraba el caso del alojamiento |
| `adr/ADR-042-…md` | **Nuevo.** La cohorte es una ventana de tiempo |
| `project-memory/DECISIONS.md` | **D-74** |
| `project-memory/RISKS.md` | **R-47 deja de ser aritmética y pasa a estar medido**; **R-48 nuevo y alto** |
| `project-memory/LESSONS_LEARNED.md` | **L-70** — la superficie que no se invierte, y por qué los dos auditores estaban en verde |
| `project-memory/BACKLOG.md` | **T-133 cerrada**; T-79 actualizada (deja de depender de T-81); **T-167…T-170 nuevas** |
| `project-memory/CURRENT_STATUS.md` | Fecha de corte y bloque de la sesión |
| `project-memory/ARCHITECTURE.md` | La sección `:aula` y `universo.cohorte` en el diagrama |
| `public/js/app.js`, `public/css/app.css` | Build de producción (ADR-003) |

## Comandos ejecutados y resultados

```
clj -M:test                 → 272 tests / 3072 assertions / 0 failures / 0 errors
npx shadow-cljs release app → Build completed (254 files, 27 compiled, 0 warnings)
npm run build:css           → Done (las 5 clases nuevas existen en el CSS construido)
clj-kondo --lint src test   → 0 errors, 1 warning (preexistente, opciones_test)
audit_paleta.py             → ✓ Ningún color nuevo fuera de la paleta
audit_contraste.py          → ✓ Los 49 pares cumplen su umbral WCAG (48 antes de L-70)
audit_movil.py              → ✓ Sin problemas en las pantallas del estudiante
audit_dark_theme.py         → ✓ Sin texto oscuro ni fondo claro sin mapear
audit_html.py               → ✓ index.html y 404.html arrancan igual
graphify update .           → (ver «Pendientes» si quedó sin correr)
verificación node ↔ SQL     → 61 ideas erróneas, mismo orden, mismos conteos
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Un curso es una **ventana de tiempo con nombre**, no una tabla `cursos` | **Sí, ADR-042** | [[DECISIONS]] D-74 |
| La visibilidad de `tests` para un profesor vive en una **función `security definer`**, no en un `exists` dentro de la policy | No | `080`, cabecera §3 |
| **T-168 no se hace**: el aula no lee `questions`, así que no hay que abrirle el banco a nadie | No | T-168, cerrada sin trabajo |
| El profesor verá **el correo** de sus estudiantes, no un pseudónimo | No | Acá y en T-79 |
| **Las cohortes las crea el owner**; el profesor solo lee | No | ADR-042 §Consecuencias, T-79 |
| Orden: **pantalla primero con cuenta admin**, rol y cuentas después | No | Esta sesión |
| La ruta es `/aula`, no `/profesor` | No | `router.cljs` (comentario), T-133 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Dos cursos simultáneos en salas distintas se mezclan en una misma ventana | Media | ADR-042 §Consecuencias, T-81 |
| Dar cuenta a un profesor = otra persona con acceso a datos de menores | Alta | RISKS **R-28** (ya existía); no se dan cuentas antes de F9 |
| Quien crea la ventana define lo que ve (profesor con autoservicio vería cursos ajenos) | Media | ADR-042; mitigado por «las crea el owner» |
| `shadow-cljs compile app` pisa el artefacto versionado con un build de desarrollo | Baja | Acá; ver «Notas» |

## Bloqueos

Ninguno. La migración la aplicó el owner el mismo día (es suya por ADR-040: toca `profiles`), y el
encuadre de R-28 quedó precisado —los colegas son **profesores del mismo colegio** y son sus propios
alumnos, no un tercero cargando una matrícula—. Lo que queda son tareas, no bloqueos: **T-07**,
**T-09** y **T-11**, que no dependen del régimen legal.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| Ninguna nueva. La sesión **no respondió** Q-46 (cuál θ vale con varios intentos) y la pantalla lo dice en voz alta en vez de esconderlo detrás de un promedio | OPEN_QUESTIONS Q-46 |

## Supuestos aplicados

- **Que las clases del owner no se solapan en el tiempo.** No es un supuesto ciego: está **medido**
  sobre los datos del 2026-09-21 (cero personas en los dos bloques). Deja de valer el día que dos
  cursos rindan a la misma hora, y está escrito como condición de revisión en ADR-042.

## Próximos pasos

1. **Publicar el bundle.** `public/js/app.js` y `public/css/app.css` ya están construidos; la
   migración ya está aplicada, así que el orden de R-39 se cumple.
2. **Crear la primera cohorte, dar el rol a un colega y que entre de verdad.** Es lo que cierra
   T-79. Comprobar con **su** cuenta que ve solo su ventana y que `/admin` le queda cerrado.
3. **T-170 (P0)** — por qué el banco se agota a los 6 ítems y qué hace θ mientras tanto (**R-48**:
   44 de 106 mediciones no miden). Es lo más serio que quedó abierto hoy.
4. **T-07 / T-09 / T-11** — respaldo, staging y verificación automatizada de RLS. Ahora hay datos
   reales de dos cursos y una segunda persona a punto de mirarlos.
5. **T-90 / T-131**: la observación del aula, que por fin tiene con qué hacerse.
6. **T-169**: elegir una cohorte ya funciona; lo que falta es poder editarla sin borrarla y crearla.

## Pendientes

- **Nadie ha entrado como `profesor`.** El aislamiento está verificado contra una base desechable y
  las piezas están en producción, pero la prueba real es una cuenta de profesor abriendo `/aula`.
- **La sección de cursos del selector no se ha visto montada.** Usa controles ya verificados en los
  dos temas (`campo`, `boton-chip`), pero no se renderizó: depende de suscripciones.
- **Falta publicar** (push). El bundle está construido y commiteado.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md` — **R-47 con la medición**
- [x] `project-memory/DECISIONS.md`
- [x] `adr/ADR-042-la-cohorte-es-una-ventana-de-tiempo.md` (nuevo)
- [x] `project-memory/ARCHITECTURE.md`
- [ ] `project-memory/ROADMAP.md` — F13 no cambia de fase todavía; cambia cuando T-167 se aplique
- [ ] `project-memory/REQUIREMENTS.md`
- [x] `supabase/SCHEMA.md` — entrada 78 (`080`)
- [ ] `project-memory/OPEN_QUESTIONS.md` — sin preguntas nuevas
- [ ] `project-memory/ASSUMPTIONS.md` — el supuesto está medido y vive en ADR-042
- [x] `project-memory/LESSONS_LEARNED.md` — **L-70**
- [ ] `project-memory/TERMINOLOGY.md` — «cohorte» convendría agregarlo
- [x] `project-memory/graph/` (snapshot de Graphify)

## Notas

- ⭐ **El hallazgo con más valor comercial de la sesión no es código:** los **dos cursos comparten el
  error dominante**. «Sumaste las mantisas» lo cometen **8 de 24** en la mañana (33 %) y **9 de 21**
  en la tarde (43 %). Eso es exactamente la frase que T-82 dice que hay que poder decirle a un
  colegio, y ahora sale de datos propios y no de un ejemplo inventado.
- El ítem más fallado de cada curso es distinto y los dos son de notación científica: **#1108**
  (división de potencias, 63 % de acierto, 8 fallaron) en la mañana y **#1112** (multiplicación,
  52 %, 11 fallaron) en la tarde. En el #1112 **9 de los 11** marcaron la misma alternativa.
- 🔺 **La segunda tanda encontró algo que vale más que la función que la motivó.** El owner pidió un
  ranking «por tiempo, por porcentaje, etc.». Medir los reintentos **antes** de dibujarlos mostró que
  un ranking ingenuo habría sido falso: el tiempo por ítem cae de **22,2 s a 1,7 s** entre el primer
  y el sexto intento mientras el acierto llega a 100 %, y se repiten **67 % de los ítems** entre
  intentos consecutivos. Ordenar por acierto sobre el último intento pone arriba a quien tenía
  **15 intentos**. Por eso el ranking compara el **primer intento** por defecto. Está en **R-47**.
- **El filtro de esfuerzo no protege de esto**, y conviene tenerlo claro: ADR-014 descarta por
  debajo de 2 s, así que una correcta en 4 s entra a θ. Está calibrado contra el click-through, no
  contra el recuerdo.
- **La velocidad se mide solo sobre aciertos con esfuerzo válido** (`fluency/usable?`). Cronometrar
  los errores haría que el «más rápido» del curso fuera quien clickea sin leer — medido en el test
  `la-velocidad-se-mide-solo-sobre-aciertos-con-esfuerzo-valido`.
- **El gráfico se miró renderizado, no solo compilado.** Se serializó el hiccup a HTML con datos
  reales y se abrió en el navegador: la primera versión tenía la etiqueta «rápido y bien»
  **encima de un punto**. Ninguna validación de color ve eso.
- 🔺 **La tercera pasada encontró el defecto más serio del día, y lo encontró el owner leyendo.** Su
  *«no entiendo qué hace esta caja»* no era confusión: el acierto por módulo se ordenaba por
  porcentaje sin mirar la evidencia, así que ponía arriba a un módulo con **un** estudiante y dejaba
  cuarto al que rindieron **23 de 24**. Lección: **el mismo error se puede evitar en un sitio y
  colarse en el de al lado** — en el ranking de ideas erróneas sí se había cuidado ordenar por
  estudiantes y no por frecuencia.
- 🔺 **Y mirar un gráfico destapó R-48.** La tira de θ mostró una pila donde debía haber dispersión:
  **44 de 106 mediciones** son de estudiantes sin ningún error a los que se les acabó el banco a los
  6 ítems, con θ avanzando en **pasos fijos de 0,4**. Ninguna tabla de las que ya existían lo
  mostraba. Es **T-170**.
- **Sobre los juicios de valor:** la primera versión del panel decidía por el profesor («dónde poner
  la próxima clase», «la pregunta para empezar la próxima clase», «por eso la subida no se lee como
  aprendizaje»). Se reemplazaron por **definiciones del conteo** — qué entra, qué no y bajo qué
  regla — que sí hacen falta para leer un número, y las conclusiones se dejaron al que enseña.
- **Módulo y banco no son lo mismo, y la relación cambia según el track:** en `electronica` cada
  banco es un módulo; en el producto PAES un banco (`numeros`) cubre varios. Agrupar solo por módulo
  dejaba sin responder «¿cómo le fue al curso en el diagnóstico que rindió?».
- ⚠️ **Al verificar la tabla de bancos renderizada, dos de los tres «defectos» eran del verificador**,
  no de la aplicación: el serializador no traducía el mapa `:style` de hiccup a CSS, y a la hoja de
  estilos de prueba le faltaba `.h-full`. Los dos hacían ver todos los rieles del mismo largo.
  **Cuando la prueba dice que algo está mal, hay que descartar primero la prueba.** El defecto real
  era otro: «100 %» partido en dos líneas por una columna de 40 px.
- 🔺 **El tema oscuro es el default desde SESSION-046, y tres componentes nuevos se escribieron
  mirando solo el claro.** El modo de fallo no era el gráfico —el SVG está bien— sino **el texto
  encima del visor**, que es la única superficie que no se invierte. Está en **L-70**, junto con lo
  que más vale: **los dos auditores estaban en verde** y por qué no podían verlo.
- ⭐ **Recorrer el código antes de escribir el RPC ahorró el RPC entero.** T-168 existía porque su
  ficha suponía que la pantalla leía `questions`. No lo hace: las alternativas salen del JSON del
  propio intento. **Una tarea del backlog puede describir un problema que ya no existe**, y la forma
  de saberlo es mirar, no razonar desde la ficha.
- **Para levantar un PostgreSQL desechable en esta máquina:** hay `postgresql@17` por Homebrew
  (docker no está corriendo). ⚠️ El socket Unix **no cabe** en la ruta del scratchpad (límite de 103
  bytes), así que hay que arrancar por TCP:
  `pg_ctl -D <dir> -o "-p 5599 -c listen_addresses=127.0.0.1 -c unix_socket_directories=''"`.
- **Para la próxima sesión:** si hay que volver a correr lógica pura sobre datos reales, el camino
  que funcionó es un build `:node-script` temporal en `shadow-cljs.edn` leyendo un JSON volcado
  desde `tests_sin_identidad` con `psql`. Se retiró al terminar; reconstruirlo cuesta cinco minutos
  y es la única forma de verificar una agregación sin cuenta en la aplicación.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../adr/ADR-042-la-cohorte-es-una-ventana-de-tiempo]] · [[../project-memory/BACKLOG]] T-133, T-79

# SESSION-042

## Fecha

2026-09-13

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

El owner pidió una **conversación de mentoría de negocio** sobre el proyecto, no trabajo de código.
A mitad de camino el objetivo se concretó: **actualizar la planificación de los tickets por venir**
a partir de hechos nuevos que la memoria no registraba.

El objetivo cambió una vez más al final, y por una razón que vale documentar: la pregunta del owner
—*"¿puedes ver los resultados de los exámenes?"*— resultó tener una respuesta técnica concreta y
barata, así que la sesión produjo además **un entregable ejecutable** (`T-130`).

## Contexto de entrada

- Rama: `main`
- Commit inicial: `60fbc69` (Merge: track de electrotecnia, aplicado y verificado)
- Estado del árbol al empezar: **sucio** — `029_topic_normalization.sql` modificado sin commitear y
  `061_visitor_fuente.sql` sin trackear.
- Documentos de la memoria leídos: `CLAUDE.md`, `TESIS_DE_CRECIMIENTO`, `CURRENT_STATUS`, `RISKS`
  (R-19, R-27…R-32, R-37, R-42), `BACKLOG` (E8 completa, T-87, T-90, T-91, T-93, T-110, T-129),
  `ROADMAP` (F12–F16), `BUSINESS_CONTEXT` §1.1, `DECISIONS`, `OPEN_QUESTIONS`.
- Bloqueos vigentes al empezar: ninguno técnico. El bloqueo declarado por el owner era **personal**:
  no sentirse listo para que otras personas influyan en el rumbo del producto.

## Actividades realizadas

1. **Lectura de la memoria de negocio completa** y contraste con el `git log` desde el pivote del
   2026-08-16.
2. **Un error de lectura que conviene dejar escrito**, porque es la lección de la sesión: se
   concluyó "66 commits y cero distribución en cuatro semanas" mirando solo el `git log`. **Era
   falso.** El owner había aplicado el diagnóstico a un curso real y tenía una campaña de tarjetas
   QR preparada con su migración escrita — pero sin commitear, así que el `git log` no la veía. La
   propia ficha de E8 advertía que *"buena parte de su trabajo no es de repositorio"*. Ver L-58.
3. **Exploración del esquema y del panel de administración** para responder por qué el owner no
   puede ver los resultados de su curso. Resultado: son **dos problemas distintos** (ver Hallazgos).
4. **Exploración del camino del usuario hasta la primera pregunta** y del grado de acoplamiento del
   sitio a la PAES, a partir de que un alumno real de electrotecnia no encontró las evaluaciones.
5. **Escritura y verificación de `supabase/queries/T-130_mapa_de_errores_de_un_curso.sql`**, la
   consulta que produce el mapa de errores de un curso sin desplegar nada.
6. **Repriorización del backlog** con once tareas nuevas y nueve cambios de prioridad.

### Lo que no funcionó

- **`graphify query` no sirvió para esta sesión.** La pregunta era de negocio y el grafo devolvió
  210 nodos truncados a 69, la mitad símbolos minificados de `public/js/app.js`. Se leyeron los
  `.md` directamente. No es un defecto del grafo: es que la pregunta no era estructural.
- **Primera versión de la consulta 2 de T-130 con las categorías solapadas:** el escape se contaba a
  la vez como "escape" y como "desestimada por esfuerzo", y el control no sumaba el total.
  Corregido y re-verificado.
- **Primeros cortes de banda θ escritos de memoria y equivocados** (`-1 / 0 / 1`). Los reales son
  `0 / 1 / 2` (`src/universo/profile.cljs:13-21`). Corregido.

## Archivos revisados

- `src/universo/components/admin.cljs` (pestañas, tabla de diagnósticos L425-478)
- `src/universo/events/test.cljs` (L668-724 el único `insert`, L760-764 el contrato de diseño)
- `src/universo/db/crud.cljs` (L49-66 `track-visitor`, L948 `fetch-admin-tests`)
- `src/universo/profile.cljs`, `src/universo/history.cljs`, `src/universo/irt/effort.cljs`
- `src/universo/components/diagnostic_test.cljs` (selector L28-78), `login.cljs`, `landing.cljs`,
  `home.cljs`, `router.cljs`, `plan.cljs`, `math_render.cljs`, `irt_chart.cljs`
- `src/universo/bands.cljs`, `src/universo/topics.cljs`
- `supabase/migrations/001`, `021`, `048`, `061`, `066`; `supabase/queries/T-59_…sql`
- `index.html`, `404.html`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `supabase/queries/T-130_mapa_de_errores_de_un_curso.sql` | **Nuevo.** Seis bloques de solo lectura |
| `project-memory/BACKLOG.md` | T-130…T-140 nuevas; nueve cambios de prioridad |
| `project-memory/CURRENT_STATUS.md` | Los seis hechos nuevos |
| `project-memory/DECISIONS.md` | D-67 |
| `project-memory/OPEN_QUESTIONS.md` | Q-43, Q-44, Q-45 |
| `project-memory/RISKS.md` | R-43 |
| `project-memory/LESSONS_LEARNED.md` | L-58, L-59 |
| `project-memory/TESIS_DE_CRECIMIENTO.md` | §3: la meta real |
| `project-memory/BUSINESS_CONTEXT.md` | El portafolio docente real del owner |
| `project-memory/ROADMAP.md` | F16 baja de urgencia |

## Comandos ejecutados y resultados

```
clj -M:test                 → no corrido (no se tocó ClojureScript)
npx shadow-cljs release app → no corrido (sin cambios de código)
npm run build:css           → no corrido
graphify update .           → no corrido (sin cambios de código)

initdb + psql (PostgreSQL 14.18 desechable, fixture a mano)
  → T-130 corre completa con ON_ERROR_STOP=1, **cero errores**
  → verificado con datos de prueba: las corridas del owner quedan excluidas,
    el escape no se cuenta como idea errónea, la respuesta de peso 0 se
    desestima, y las cinco categorías del control suman el total.
```

## Hallazgos técnicos

### 1. "Ver los resultados" son dos problemas, no uno

**🟡 El dato existe y el panel no lo muestra.** `tests.test` ya guarda, por ítem: `selected-option`,
`correct-option`, `selected-error` (el texto de la idea errónea del distractor), `question-id`,
`question-text`, `difficulty`, `module-slug`, `time-ms`, `weight` (ADR-014) y `escape` (ADR-029);
más `theta-history`, `stop-reason` y `stop-config`. La pestaña "Diagnósticos" muestra **seis
columnas** y **las filas no son clickeables**. `fetch-admin-tests` ni siquiera selecciona
`tests.topic`, `tests.theta` ni `engine_version`.

**🔴 El abandono no se captura.** Un test cerrado a mitad **no deja ninguna fila**: el único `insert`
es `:save-test`, disparado solo desde `:test/complete`. El propio código lo declara por escrito
(`events/test.cljs:760-764`). No hay `beforeunload`, ni autosave, ni heartbeat.

⇒ *"dónde se equivocaron"* es renderizado (T-132/T-133). *"cuáles no lo hicieron"* es captura
(T-134, con ADR).

### 2. Por qué el alumno de electrotecnia no encontró las evaluaciones

- El catálogo es **invisible sin cuenta**: `/diagnostico` es sección protegida y el selector vive
  solo ahí. Ninguna ruta pública lista `test_configs`.
- El corte más caro del embudo es la **confirmación por correo**, que expulsa al usuario del sitio
  entre el registro y la primera pregunta.
- El selector es una **lista plana** sin agrupar, sin descripción, sin duración, sin conteo.
  `test_configs` no tiene columna `track`; lo único que agrupa es el prefijo del `display_name`.
- **Electrotecnia no tiene ni una cadena en el frontend**: cero menciones en `src/`, `index.html` y
  `404.html`. El track existe solo como datos — que es lo que ADR-035 celebra y también por qué nada
  orienta al alumno.
- **No existe soporte de imagen en ninguna capa**: `resources.type` es un `check` cerrado sin
  `image_url`, el parser no reconoce `![alt](url)`, y **no hay una sola etiqueta `[:img` en todo
  `src/universo/`**. KaTeX no incluye TikZ: no hay atajo por LaTeX para dibujar un circuito.

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| La meta de ingreso es **CLP 48M/año**, no USD 1M | No | `DECISIONS` D-67, `TESIS_DE_CRECIMIENTO` §3 |
| El mapa de errores se entrega primero por SQL, no por pantalla | No | `BACKLOG` T-130 |
| No se decide el segmento (PAES vs. técnico): se registra | Pendiente | `OPEN_QUESTIONS` Q-43 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| El trabajo de distribución ocurre y no queda registrado, así que no compone | Alto | `RISKS` R-43 |

## Bloqueos

- **Decisión / humano:** el owner declaró no sentirse listo para que otras personas influyan en el
  rumbo del producto. Se abordó mostrando que la meta real (CLP 48M ≈ **20 colegios**) **no exige
  capital externo ni socios**, y que un cliente de licencia no dirige el roadmap. El bloqueo no está
  cerrado, pero su premisa cambió.
- **Acceso:** el agente no tiene acceso a la base de Supabase. T-130 la tiene que correr el owner.
- **Documental:** el **contrato del liceo sigue sin leerse** (T-93 a medias) y bloquea hablar con la
  dirección. El de Cpech cierra ese canal hasta el **2026-11-21**.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| ¿La línea principal es PAES o física/electricidad/electrónica? | `OPEN_QUESTIONS` Q-43 |
| ¿La IA vuelve obsoleto el producto? | `OPEN_QUESTIONS` Q-44 |
| ¿La marca pública es Jacobo Córdova o Academia Integral? | `OPEN_QUESTIONS` Q-45 |

## Supuestos aplicados

- Que los tests del curso están en `topic = 'numeros'` y en septiembre de 2026. **No verificado
  contra la base**: por eso T-130 arranca con un bloque 0 de preparación que hace al owner
  confirmar tema, fechas y participantes antes de correr el resto.
- Que los 24 recursos de electrotecnia están publicados: **afirmado por el owner**, contra lo que
  dice la migración `066` (`published = false`). Ver L-59.

## Próximos pasos

1. **T-130** — correr los seis bloques contra la base y pegar el resultado acá abajo. *Cero código.*
2. **T-131** — volver al curso con el mapa de errores y anotar las tres observaciones de T-90.
3. **T-93 (mitad del liceo)** — leer el contrato antes de hablar con la dirección.
4. **T-135** — cerrar el circuito de `061` **antes** de imprimir las tarjetas QR.
5. **T-110 → T-132 → T-133** — el panel deja de esconder lo que la base ya tiene.
6. **T-134** (con ADR-036) — que el abandono deje rastro.

## Pendientes

- **T-130 no se ha corrido contra datos reales.** Está verificada contra un PostgreSQL 14 desechable
  con fixture a mano: la sintaxis y la lógica de filtros están probadas, **los números del curso
  no**. Falta exactamente eso: llenar los parámetros del bloque 0 y correr los seis bloques.
- `029_topic_normalization.sql` sigue modificado sin commitear (T-136).
- `061_visitor_fuente.sql` sigue sin commitear y sin aplicar (T-135).
- ADR-036 (rastro del abandono) y ADR-037 (ayudas visuales) **no escritos**, solo previstos.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [ ] `adr/ADR-036-….md` y `adr/ADR-037-….md` (previstos, no escritos — ver Pendientes)
- [ ] `project-memory/ARCHITECTURE.md` (sin cambios de estructura todavía)
- [x] `project-memory/ROADMAP.md`
- [ ] `project-memory/REQUIREMENTS.md` (sin cambios)
- [x] `project-memory/OPEN_QUESTIONS.md`
- [ ] `project-memory/ASSUMPTIONS.md` (los supuestos de arriba son de sesión, no vigentes)
- [x] `project-memory/LESSONS_LEARNED.md`
- [ ] `project-memory/TERMINOLOGY.md` (sin términos nuevos)
- [ ] `project-memory/graph/` (no hubo cambios de código)

## Notas

Tres hechos que el owner aportó en conversación y que **no estaban en ninguna parte de la memoria**:

1. **El owner no es profesor de matemática.** Enseña física, mecánica, electricidad y electrónica, y
   **sus cursos de 3º y 4º medio son de electrónica**. El diagnóstico de números se aplicó a su
   propio curso, como prerrequisito matemático. Eso reordena Q-43 por completo.
2. **El alumno de electrotecnia paga USD 20/h** ≈ CLP 19.000, casi el doble de la tarifa PAES de
   D-32. Es la línea de mayor margen del proyecto y no estaba registrada.
3. **Hay tres audiencias cautivas disponibles**, no una: su 3º medio, su 4º medio, y el 4º medio de
   matemática que una profesora del liceo ya ofreció y todavía no se usa.

Y una observación sobre calibración que conviene no perder: el banco pasó de 387 a **530 ítems**
(414 del producto + 116 de electrotecnia) mientras los diagnósticos siguen en **252**. Con ~20 ítems
por test son del orden de **~12 respuestas por ítem**, uno o dos órdenes de magnitud por debajo de
lo que 1PL necesita. **Cada ítem nuevo diluye la N de calibración en vez de acercarla.** Escribir
ítems y calibrar el banco no son la misma tarea, y hoy compiten.

---

# ⭐ Resultado de T-130 — corrido el 2026-09-13 sobre la sesión del 2026-09-10

**T-130 queda CERRADA.** 17 intentos, 12 estudiantes, banco `numeros`, motor **v2** en las diecisiete
filas. **195 respuestas · 104 correctas (53,3 %) · 6 escapes · 9 desestimadas por esfuerzo · 76
usadas en el ranking · las cinco categorías suman 195.**

> **Nota de privacidad:** los correos de los doce estudiantes **no se transcriben**. Son menores del
> establecimiento donde trabaja el owner, el repositorio es público y la Ley 21.719 entra en plena
> vigencia el 2026-12-01. Acá van agregados y casos anonimizados (R-06, R-26, R-28).

## 1. El entregable, en una frase

> **7 de 12 estudiantes (58 %) suman numeradores por un lado y denominadores por el otro.**

Seguido de: **4 de 12 (33 %)** no dejan la notación científica entre 1 y 10 · **4 de 12 (33 %)**
calculan la fracción de un resto como si fuera del total · **3 de 12 (25 %)** dejan la razón sin
simplificar.

**Concentración por módulo:** `aritmetica/fracciones` y `aritmetica/potencias` se llevan la sesión.
Y dentro de potencias el patrón no es una regla fallada sino **el mapa entero de reglas**: sumar
exponentes al dividir, restarlos al elevar potencia de potencia, dividirlos, sumar base + exponente,
multiplicar base × exponente. No es que no sepan *una* regla: es que no saben **cuál aplica a qué
operación**. Eso es una clase, no doce.

## 2. ⭐ El activo defendible quedó medido: `sin_idea_catalogada = 0`

**Las 76 respuestas incorrectas con esfuerzo válido tenían las 76 su idea errónea nombrada.** Cero
huecos. Es la primera medición real de lo que [[TESIS_DE_CRECIMIENTO]] G-2 llama el foso —*"un banco
de ítems en español de Chile con cada distractor mapeado a un error conceptual nombrado"*— y hasta
hoy era una afirmación de diseño, no un dato. **Es citable ante una UTP.**

## 3. ✏️ Corrección: el abandono tiene DOS formas, y una sí deja fila

Lo que esta sesión afirmó más arriba —*"un test abandonado no deja ninguna fila"*— **es demasiado
amplio y el dato lo corrige**:

| Forma de abandonar | ¿Deja fila? | Evidencia |
|---|---|---|
| **Botón de salir** → `:test/complete` sin `stop-reason` | **Sí**, con `parada = null` | 2 de 17 filas |
| **Cerrar la pestaña** | **No**, se pierde todo | El único `insert` es `:save-test` |

**T-134 no se cae, se afina:** lo invisible es el cierre de pestaña, y el `parada = null` ya es un
marcador utilizable **hoy** para detectar el abandono deliberado. La pregunta del ADR-036 cambia de
*"¿cómo capturamos el abandono?"* a *"¿cuánto vale capturar además el cierre de pestaña, sabiendo que
el deliberado ya se captura?"*.

## 4. 🔺 Dos estudiantes en el suelo de la escala, y NO es click-through

Era la hipótesis que más importaba distinguir, y el dato la resuelve:

| Caso | θ | Ítems | Aciertos | Descartadas | Minutos |
|---|---|---|---|---|---|
| A | **−3,00** (clamp) | 12 | 4 | 1 | **16,5** ← el test más largo de la sesión |
| B | **−3,00** (clamp) | 12 | 3 | **0** | 10,8 |
| C | −2,93 | 12 | 3 | 3 | 10,1 |

**A y B trabajaron.** Dieciséis minutos y medio no es clickear. **El motor no los midió: chocó contra
su propio límite.** θ = −3,00 exacto en dos filas distintas es el clamp de `[-3, 3]`, no una
estimación — y significa que **el banco `numeros` no baja lo suficiente para estos estudiantes**, que
son exactamente a quienes el producto existe para ayudar (el mismo argumento de ADR-034). Con los dos
en el suelo **no se pueden distinguir entre sí, ni ubicar en una banda, ni armarles un plan
calibrado**. Riesgo nuevo: **R-44**.

## 5. ⚠️ Lo que un solo intento habría dicho mal

Un estudiante rindió **dos veces el mismo día**: primero **0 aciertos de 8, abandonado** (θ = −3,00);
después **7 de 12** (θ = **+0,60**), en tres minutos. Con el primer intento se le habría clasificado
como el más débil del curso; **está por sobre la mediana.**

Y al revés: otro rindió **tres veces**, y el tercero fue **7 ítems en 1,5 minutos con 4 de 7
desestimadas por esfuerzo** — θ = −0,85 contra los +0,80 y +0,67 de sus dos intentos serios.
**Repetir degrada:** el tercer intento es ruido y entraría a la calibración como si no lo fuera.

**Consecuencia para G-2 y G-4:** el θ que vale no es "el último" ni "el mejor" — hay que decidir la
regla y escribirla. Se abre **Q-46**.

## 6. 📏 El diagnóstico NO dura 20 minutos

| | Valor |
|---|---|
| Mediana | **5,8 min** |
| Media | 7,5 min |
| Mínimo / Máximo | 1,5 / 16,5 min |
| Bajo 10 minutos | **10 de 17** |

El copy publicado promete ~20 minutos y la ficha de **T-91** se construye sobre la premisa de que
*"20 min consumen la hora completa y no dejan espacio para usar el resultado"*. **La premisa está
refutada por los datos: ya caben con holgura en una hora de clase, con tiempo de sobra para
proyectar el mapa.** Acortar el test deja de ser parte de T-91. Corregir el copy pasa a ser tarea:
**T-141**.

## 7. ✅ La parada por precisión no se disparó ni una vez

**15 de 17 pararon por `max-items`; 2 por abandono; 0 por precisión.** R-38 y T-111 quedan
**confirmados con estudiantes reales**, no con simulación. El copy y el argumento de venta apoyados
en "el test termina cuando ya sabe lo suficiente" describen una regla que **no corre**.

## 8. ⚠️ El filtro de esfuerzo está botando respuestas correctas

**29 de 195 respuestas (14,9 %) tienen `weight = 0`.** De esas, 9 son incorrectas y 6 son escapes —
**las otras ~14 son respuestas CORRECTAS descartadas por rápidas**, o sea **el 13,5 % de todos los
aciertos de la sesión**.

**Y ahí hay una tensión real entre dos ADR del propio proyecto:** para ADR-014 una respuesta muy
rápida es sospechosa; para ADR-019 **rápido y correcto es la definición de fluidez (λ)**. Hoy el
filtro de esfuerzo se aplica antes y borra justo la evidencia que el eje λ necesita. No es un bug —
es una decisión que nunca se tomó explícitamente. Se abre **Q-47**.

## 9. La sesión no se quedó en un banco

Ese día se rindieron **40 tests en siete bancos**: `numeros` (17), **`diagnostico` (10)**,
**`ecuaciones_simples` (5)**, `electrotecnia` (5), `geometria`, `algebra`, **`polinomios` (1)**.

**Casi la mitad cayó en bancos viejos duplicados** que T-122 quiere retirar. Es tiempo de clase
gastado en bancos que la memoria da por muertos, y es **T-122 y T-138 confirmadas con datos** en vez
de con argumento. Además **4 personas rindieron `electrotecnia` ese día**, lo que hay que aclarar:
o es el curso de electrónica del owner, o **R-42 se materializó** con estudiantes de PAES entrando
al track por el selector.

## 10. Milestone que la memoria daba por pendiente

`CURRENT_STATUS` decía *"el motor v2 está en producción; **no se ha rendido un diagnóstico real con
él todavía**"*. Se rindieron **17** (40 contando los otros bancos), todos con `engine_version = 2`.
**Esa frase queda obsoleta.**


---

# ✅ Cierre — 2026-09-13

**Mergeado a `main` por el owner.** Nueve commits.

| Tarea | Estado final |
|---|---|
| **T-130** consulta del mapa de errores | ✅ cerrada, **corrida** sobre 17 intentos reales |
| **T-110** `tests.origin` | ✅ cerrada — `067` **aplicada**: 275 `student` / 70 `admin_preview` |
| **T-132** detalle del intento en el panel | ✅ cerrada, **verificada en vivo** |
| **T-92** login con Google | ✅ cerrada por confirmación del owner |
| **T-90** diagnóstico en un curso real | `a medias` → cierra con **T-131** |
| **Q-49** segunda cuenta admin | ✅ respondida (el socio) |

**Abiertas que dejó esta sesión:** Q-43 (segmento: PAES vs. técnico) · Q-44 (IA) · Q-45 (marca) ·
Q-46 (qué θ vale) · Q-47 (esfuerzo vs. fluidez) · Q-48 (¿notas?) · Q-50 (el 1 % por escrito) ·
R-43 · R-44 · T-131, T-133…T-145.

**Verificación final:** `clj -M:test` → **197 tests / 2744 assertions / 0 failures** (se entró con
181/2677) · `shadow-cljs release app` → 0 warnings · los cinco auditores en verde · `067` verificada
contra PostgreSQL 14 desechable **y** aplicada en producción.

**Lo que quedó fuera y por qué:** `061_visitor_fuente.sql` sin commitear (T-135 — se cierra **antes**
de imprimir las tarjetas QR, que todavía no se imprimen) y `029_topic_normalization.sql` con una
edición sin decidir (T-136).

**El único paso siguiente que mueve el negocio: T-131.** Café con el colega, con el detalle del
intento proyectado. Todo lo construido hoy existe para hacer esa conversación posible.

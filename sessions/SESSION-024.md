# SESSION-024

## Fecha

2026-08-13

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code CLI — Opus 5

## Objetivo de la sesión

Empezó como una pregunta de negocio: *"¿la publicidad califica como fuente de ingresos coherente con
este sitio?"*. A mitad de sesión el owner cambió el alcance al aportar `docs/tesis.md` y revelar que
**el proyecto no nació con el convenio UNAP**, sino como su tesis de grado de 2010, dentro de una
línea que llamaba **"Sistema Llovizna"**; pidió reorientar la documentación integrando esa raíz con
la visión de largo plazo. Ya avanzada la sesión aportó un segundo documento
(`docs/sistema_llovizna.md`, 2012) que ubicó el nombre y amplió el alcance otra vez.

## Contexto de entrada

- Rama: `main`
- Commit inicial: `9d9c86a`
- Estado del árbol al empezar: limpio (`docs/tesis.md` ya presente, sin trackear en la memoria)
- Documentos de la memoria leídos: `BUSINESS_CONTEXT`, `PROJECT_BRIEF`, `VISION_LIBRO_PROYECTO`,
  `RISKS` (R-06, R-19), `OPEN_QUESTIONS` (Q-01, Q-02, Q-03, Q-21…Q-27, X-08),
  `AVISO_PRIVACIDAD_BORRADOR`, `DECISIONS`, `CURRENT_STATUS` (extractos), `INDEX`, `TERMINOLOGY`
- Bloqueos vigentes al empezar: ninguno para esta tarea (trabajo de documentación)

## Actividades realizadas

1. **Evaluación de la publicidad como fuente de ingresos** contra la memoria del proyecto. Resultado:
   no califica. Cuatro razones independientes (promesa de privacidad ya publicada, menores + Ley
   21.719, aritmética de RPM contra $10.000/hora, credibilidad del método). Registrada como Q-28 y
   D-46.
2. **Lectura de `docs/tesis.md`** (1.725 líneas): portada, capítulo I (planteamiento), capítulo IV
   (diseño), Conclusiones, Recomendaciones y bibliografía. Los anexos son código en ensamblador y
   Python, revisados por encima.
3. **Verificación del relato de origen contra Git.** `git log --reverse` da primer commit
   **2025-05-03**; el convenio UNAP fue oct–nov 2025 (Q-01). El copy publicado era ya incorrecto
   antes de conocer la tesis. Este fue el hallazgo que convirtió una anécdota en decisión.
4. **Búsqueda de "llovizna"** en `docs/tesis.md` y en todo el repositorio: **cero coincidencias**. Se
   registró como testimonio del owner, no como dato del documento (Q-29). No se inventó atribución.
5. Redacción de [[../project-memory/RAIZ_SISTEMA_LLOVIZNA]] con la tabla de linaje, lo que quedó
   atrás y su costo, y la bibliografía de CRS aprovechable.
6. Redacción de [[../adr/ADR-024-raiz-en-la-tesis-2010]] y propagación a los documentos afectados.
7. **Segundo aporte del owner: `docs/sistema_llovizna.md`** (propuesta de financiamiento al Estado
   venezolano, 2012, que no prosperó). **Responde Q-29**: el nombre es de 2012, no de la tesis. El
   archivo de memoria se renombró de `RAIZ_TESIS_2010.md` a `RAIZ_SISTEMA_LLOVIZNA.md` —barato
   porque aún no estaba commiteado— y se le agregó §2 con el linaje 2012, incluido el encuadre
   político del formulario, que es dato a sopesar en Q-30.
8. **Detectados datos personales del owner** (cédula, teléfono, fecha de nacimiento, estado civil) en
   los dos documentos fuente, sobre un repositorio público. Se verificó con `git ls-files` que
   ninguno estaba trackeado todavía —la exposición **no había ocurrido**— y se frenó el commit. El
   owner optó por **redactar y versionar**: los seis campos pasaron a `xxxxx` antes del primer
   `git add`, verificado con `grep` (0 coincidencias). **R-26 abierto y cerrado el mismo día**, sin
   necesidad de reescribir historial.

9. **Tercer aporte del owner: el blog `jacobocordova.blogspot.com`.** No cargaba por WebFetch (Blogger
   renderiza con JS); se obtuvo por el **feed JSON** (`/feeds/posts/default?alt=json`), que sí es
   estático. 21 entradas, jul 2010 – feb 2012. Verificado explícitamente que **no hay entradas
   posteriores a feb 2012** (un primer resumen sugería 2024 y era incorrecto). De ahí salieron los
   tres hallazgos que más cambian la memoria: el nombre "Academia Integral" es de 2010, el software
   se construyó en 2011–2012 con tablas `preguntas`/`distractores`, y hubo equipo. Abierta **T-74**
   para archivarlo.

10. **Cuarto aporte del owner: el certificado del II Congreso Venezolano de Ciencia, Tecnología e
    Innovación** (PDF, Caracas, nov. 2013). `pdftotext` solo extrajo la capa de texto (nombre,
    calidad de participación y título de la ponencia); el resto —institución, fecha, firmantes—
    estaba en la imagen de fondo, así que se renderizó con `pdftoppm` y se leyó visualmente.
    **Corrige una afirmación previa de esta misma sesión:** la propuesta de 2012 no "no prosperó" a
    secas — no consiguió financiamiento, pero fue aceptada por un comité científico y presentada como
    **ponencia oral**. El hueco documental bajó de 13 años a ~11 años y medio.
    **No se versionó el PDF:** lleva la cédula en la capa de texto *y* en la imagen, así que no es
    redactable limpiamente; se registró el contenido en la memoria y el original queda con el owner.

11. **Difusión pública de 2011 (Q-31).** El owner aportó un video de esa época y las críticas que
    recibió, para ver si contenían señal de producto. **Sí, dos objeciones sustantivas** — la de
    fondo (*"¿para qué medir si puedo preguntar?"*) pasó a **T-75**; la otra (costo del hardware de
    aula) era correcta y ya está resuelta por diseño. El resto no era información de producto y
    **no se documentó**. También quedó claro que aquel alcance **no fue audiencia calificada**, así
    que la premisa de R-19 se mantiene.

13. **T-75 implementada a pedido del owner: la objeción de 2011 respondida en el FAQ.** Nueva
    pregunta *"¿Por qué no me preguntan directamente qué no entiendo?"*, sincronizada en los tres
    lugares (`landing.cljs`, `index.html`, `public/index.html`), con los tres argumentos de la tesis
    en lenguaje de estudiante. Suite en verde (**83/454/0**), `release app` sin warnings con la frase
    verificada dentro de `public/js/app.js`, `build:css`, y ambos audits en verde. **Primera vez que
    una crítica recibida en 2011 se convierte en código publicado.**
14. **Kahoot/AhaSlides registrados** ([[../project-memory/RAIZ_SISTEMA_LLOVIZNA]] §2.5) por
    observación del owner: el teléfono resolvió la limitación de alimentación que dejó la tesis en
    prototipo, y el mercado validó el mecanismo. Documentado **con su cautela**: validan el
    mecanismo, **no** el producto actual — Kahoot mide al grupo, no estima θ ni produce un plan.

**Lo que no se hizo, y por qué:** no se tocó **el copy de origen** (`"se originó en 2025 a partir de
un convenio…"`) en ninguno de los tres lugares. Es distinto del copy que sí se agregó en T-75: qué
contar del origen es decisión del owner, y sigue en Q-30 / X-09.

## Archivos revisados

- `docs/tesis.md` (fuente primaria nueva)
- `src/universo/components/privacidad.cljs` (línea 54, la promesa que la publicidad rompería)
- `project-memory/BUSINESS_CONTEXT.md`, `PROJECT_BRIEF.md`, `VISION_LIBRO_PROYECTO.md`,
  `OPEN_QUESTIONS.md`, `RISKS.md`, `DECISIONS.md`, `AVISO_PRIVACIDAD_BORRADOR.md`, `INDEX.md`,
  `TERMINOLOGY.md`, `CURRENT_STATUS.md`
- `git log` (historial completo, para fechar el primer commit)

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `project-memory/RAIZ_SISTEMA_LLOVIZNA.md` | **Nuevo** (primero `RAIZ_TESIS_2010.md`, renombrado tras el segundo documento). Fuente única del origen. **Podado al cierre a ~160 líneas**: solo lo que informa una decisión de hoy |
| `adr/ADR-024-raiz-en-la-tesis-2010.md` | **Nuevo.** La decisión de reanclar la genealogía, de versionar las fuentes redactadas y de no tocar el copy público todavía |
| `docs/tesis.md`, `docs/sistema_llovizna.md` | Fuentes primarias, con cédula/teléfono/fecha de nacimiento/estado civil reemplazados por `xxxxx` |
| `sessions/SESSION-024.md` | **Nuevo.** Este archivo |
| `project-memory/OPEN_QUESTIONS.md` | Q-28 (publicidad, evaluada), Q-29 (nombre "Llovizna", **respondida**), Q-30 (copy público de origen), X-09 (contradicción memoria vs. producción) |
| `project-memory/RISKS.md` | **R-26 nuevo**: datos personales del owner en las fuentes, sobre repo público |
| `project-memory/BACKLOG.md` | **T-74 nueva**: archivar el blog antes de que Blogger lo pierda |
| `project-memory/DECISIONS.md` | Fila de ADR-024 en §1; D-45 (raíz en la tesis) y D-46 (publicidad descartada) en §2 |
| `project-memory/PROJECT_BRIEF.md` | Recuadro de raíz; §7 con dos filas nuevas (origen intelectual UNEXPO / UNAP como episodio de financiamiento); nota de corrección a D-18 |
| `project-memory/BUSINESS_CONTEXT.md` | §1 reescrita con el origen real; B-07 gana el respaldo propio de 2010; §5 incorpora la exclusión de publicidad y el antecedente de 2010 del cuello de botella humano |
| `project-memory/VISION_LIBRO_PROYECTO.md` | Recuadro en §3.2 (el control retroalimentado viene de 2010) + nota de encabezado "el libro es el norte, la tesis es la raíz". **No se editó el texto del owner** |
| `project-memory/TERMINOLOGY.md` | Sección nueva "Raíz histórica": Sistema Llovizna, CRS, período de muestreo, medición ≠ evaluación, η = 5/8,2 |
| `project-memory/CURRENT_STATUS.md` | Nota de cabecera con el hallazgo, lo hecho y lo deliberadamente no hecho |
| `project-memory/INDEX.md` | `RAIZ_SISTEMA_LLOVIZNA` en el mapa |
| `CLAUDE.md` | §1 reescrita (raíz 2010, UNAP como episodio, publicidad descartada) + aviso de no tocar el copy; §10 con la fila nueva |

## Comandos ejecutados y resultados

```
git log --reverse --format="%ad %s" --date=short | head  →  primer commit 2025-05-03
grep -rn -i "llovizna" docs/ project-memory/ adr/ src/   →  0 coincidencias (antes del 2do doc)
pdftotext -layout Certificado + pdftoppm -png          →  certificado del congreso 2013 leido
WebFetch feeds/posts/default?alt=json                  →  21 entradas del blog, jul 2010 - feb 2012
graphify query "modelo de negocio, ingresos…"            →  18 nodos, sin cobertura del tema
graphify update .                                        →  2693 nodos, 6875 aristas, 187 comunidades
cp graphify-out/{GRAPH_REPORT.md,graph.json,graph.html} project-memory/graph/  →  snapshot refrescado
clj -M:test                 → 83 tests / 454 assertions / 0 failures (tras T-75)
npx shadow-cljs release app → 229 files, 4 compiled, 0 warnings
npm run build:css           → Done in 476ms
audit_contraste.py          → los 38 pares cumplen su umbral WCAG
audit_movil.py              → sin problemas en pantallas del estudiante
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| La raíz del proyecto es la tesis UNEXPO 2010; la UNAP fue un episodio de financiamiento | **ADR-024** | `DECISIONS` D-45 |
| La publicidad queda descartada como fuente de ingresos | No (no cambia arquitectura ni es difícil de revertir) | `DECISIONS` D-46, `OPEN_QUESTIONS` Q-28 |
| El copy de producción no se toca en esta sesión: lo decide el owner | Parte de ADR-024 | `OPEN_QUESTIONS` Q-30, X-09 |
| `docs/tesis.md` y `docs/sistema_llovizna.md` se versionan como fuentes primarias, **con los datos personales redactados antes del primer commit** (owner, 2026-08-13) | Parte de ADR-024 | `RISKS` R-26 (cerrado) |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Cédula, teléfono y fecha de nacimiento del owner en `docs/*.md`, sobre un repo público | Alta | **`RISKS` R-26 (nuevo, ✅ cerrado el mismo día: redactados antes del primer commit)** |
| El copy publicado afirma un origen incorrecto mientras Q-30 espera | Medio | X-09 + `RISKS` R-05 (divergencia de copy, ya existente) |
| Usar la bibliografía de la tesis (2005–2008) como respaldo público sin verificar vigencia | Bajo-medio | ADR-024 §Riesgos, `RAIZ_SISTEMA_LLOVIZNA` §7 |
| Contar el origen en público arrastra el encuadre político del formulario de 2012 | Bajo | Q-30 |

## Bloqueos

Ninguno técnico. **Bloqueo de decisión:** Q-30 (qué contar públicamente del origen) solo la puede
responder el owner; hasta entonces X-09 sigue activa.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| ¿De dónde sale el nombre "Sistema Llovizna"? | `OPEN_QUESTIONS` Q-29 — **abierta y respondida el mismo día** con el segundo documento |
| ¿Cómo se cuenta públicamente el origen ahora? | `OPEN_QUESTIONS` Q-30 |
| ¿La publicidad califica como ingreso? (evaluada, no es del owner) | `OPEN_QUESTIONS` Q-28 |

## Supuestos aplicados

Ninguno nuevo en `ASSUMPTIONS.md`. Se evitó asumir tres cosas: (a) que "Sistema Llovizna" era el
nombre de la tesis — no lo es, y registrarlo como pregunta en vez de darlo por bueno fue lo que hizo
que el owner aportara el documento que lo resolvía; (b) que el owner quiere publicar el origen — no
está dicho, por eso Q-30; (c) que el tramo 2012–2025 tuvo continuidad: no hay documento, no se
afirma nada.

## Próximos pasos

1. ~~R-26: redactar los datos personales~~ ✅ **hecho en esta sesión** — `docs/tesis.md` y
   `docs/sistema_llovizna.md` quedaron redactados y versionados sin datos personales.
2. **Owner:** responder Q-30 (redacción del origen público) → cierra X-09. Si autoriza, el cambio
   toca los tres lugares (R-05) + `npx shadow-cljs release app` + commit de `app.js` (ADR-003).

4. Evaluar Beatty et al. (2008), *Designing Effective Questions for CRS*, como referencia de autoría
   de ítems para `BACKLOG` T-01 / la capa autoral de T-44.
5. Retomar lo que sí genera ingreso: **T-04** (pasarela / cobro de clases) y la captación de
   estudiantes antes de la temporada PAES — es la contracara de D-46.

## Pendientes

- Q-29 y Q-30 sin responder — es lo único que queda a medias, y depende del owner.
- Nada más: los tres archivos nuevos ya están indexados en el grafo (verificado con
  `graphify query "raiz del proyecto tesis 2010 sistema llovizna"`, que devuelve
  `RAIZ_SISTEMA_LLOVIZNA.md`, `docs/tesis.md` y Q-29).

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md` (T-74 nueva)
- [x] `project-memory/RISKS.md` (R-26 nuevo)
- [x] `project-memory/DECISIONS.md`
- [x] `adr/ADR-024-raiz-en-la-tesis-2010.md` (nuevo)
- [ ] `project-memory/ARCHITECTURE.md` *(no aplica: no cambió estructura, tabla ni flujo)*
- [ ] `project-memory/ROADMAP.md` *(no aplica: no cambió fase ni hito)*
- [ ] `project-memory/REQUIREMENTS.md` *(no aplica)*
- [x] `project-memory/OPEN_QUESTIONS.md`
- [ ] `project-memory/ASSUMPTIONS.md` *(no aplica: no se asumió nada)*
- [ ] `project-memory/LESSONS_LEARNED.md` *(candidato: "un relato de origen puede contradecir al
  propio `git log`; verificar fechas antes de fijar una narrativa" — no escrito aún)*
- [x] `project-memory/TERMINOLOGY.md`
- [x] `project-memory/graph/` (snapshot de Graphify)

## Notas

**Dos autocorrecciones de la propia sesión, y conviene que queden a la vista.**

1. Se afirmó en R-19, a partir de una métrica de alcance de 2011, que *"la premisa de que el proyecto
   nunca llegó a la gente es falsa"*. Al conocer el origen de ese alcance quedó claro que no era
   audiencia calificada, y se corrigió. **Regla que deja: una métrica sin su contexto de origen no es
   evidencia.**
2. **Se documentó de más.** El encargo del owner era dimensionar el alcance y la visión del producto,
   no levantar un archivo histórico; y parte de lo escrito sobre la recepción del video de 2011 no
   aportaba a ninguna decisión, sobre un repositorio **público**. Al cierre de la sesión se podó:
   `RAIZ_SISTEMA_LLOVIZNA` pasó de 528 a ~160 líneas y se eliminó todo el material sobre críticas
   personales. **Criterio adoptado, aplicable a lo que venga: en la memoria entra lo que informa una
   decisión del producto; el resto no se documenta, aunque sea cierto.**

La lección más útil de esta sesión para la siguiente: **la memoria del proyecto puede estar
internamente consistente y aun así ser falsa.** El relato "se originó en 2025 con la UNAP" se
propagó a cinco documentos y a tres lugares de producción sin que nadie lo contrastara con
`git log`, que lo desmentía desde el principio. Cuando un hecho fundacional entra a PMF, conviene
buscarle una fuente verificable en el propio repositorio antes de propagarlo.

Segunda nota: el owner pidió "cambiar un poco el sentido" a la documentación. El cambio de sentido
real no es que haya un documento más, sino que el proyecto deja de ser *una plataforma web con una
visión de negocio* y pasa a ser *una línea de investigación de dieciséis años cuya encarnación actual
es una plataforma web*. Eso cambia qué es defendible decir en público sobre credibilidad (B-07) sin
apoyarse en ninguna institución vigente.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/RAIZ_SISTEMA_LLOVIZNA]] ·
[[../adr/ADR-024-raiz-en-la-tesis-2010]] · [[../project-memory/AGENT_INSTRUCTIONS]]

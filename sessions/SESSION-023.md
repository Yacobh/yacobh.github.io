# SESSION-023

## Fecha

2026-08-13

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Trabajo de UI/UX, con tres entradas del owner: (1) el tema oscuro deja letras negras ilegibles en
partes del panel, (2) la página se ve genérica, "se parece mucho a otras", (3) una idea que lo
persigue: una **"regla del tiempo"** al pie del tablero, donde los recursos aparezcan como medallas
que se van descubriendo.

Antes de eso, en la misma sesión: verificar la migración `041`, que el owner había aplicado.

## Contexto de entrada

- Rama inicial: `main` @ `988c37e`; se abrió `ui-identidad-y-linea-del-tiempo`.
- Árbol limpio. `041` recién aplicada por el owner.
- Documentos leídos: ADR-012, ADR-016, ADR-009, BACKLOG (épica E4, T-38, T-41, T-62),
  SESSION-021, ARCHITECTURE §2, `src/css/app.css`, `tailwind.config.js`, `dashboard.cljs`,
  `events/dashboard.cljs`, `access.cljs`, `topics.cljs`, `crud.cljs`.

## Actividades realizadas

**1. Verificación de `041` (antes del trabajo de UI).** Se comprobó desde fuera, con la anon key
pública y sin sesión, que las columnas existen — comparando el código de respuesta de PostgREST
contra un control positivo (`min_response_seconds`, columna conocida) y uno negativo (una columna
inventada, que da `42703`). Sin los dos controles el `200` no habría probado nada. El resto —
`not null`, defaults, el check y los valores— lo corrió el owner con el **bloque H** que se agregó a
`supabase/queries/verificacion_esquema.sql`: **37 bancos, todos en 3/6**, ninguno invertido.

Dato que importa más de lo que parece: con los 37 bancos en el mismo valor que ya usaba
`fluency/default-thresholds`, **el comportamiento observable no cambió**. `041` no calibró nada;
habilitó calibrar.

**2. Diagnóstico del tema oscuro — la hipótesis inicial era incorrecta.** Se audit­aron las 164
clases de color de los componentes contra las 91 mapeadas en `app.css`: la cobertura por clase
estaba bien. El agujero era que **el tema oscuro nunca definió un color de texto base**, así que
todo elemento sin clase `text-*` heredaba el negro del navegador. Eso explica el patrón que lo hacía
difícil de encontrar: fallaba en "algunas partes" y no en toda la app. Segundo hallazgo: las
`<option>` no heredan el color del `<select>`, y el panel usa desplegables por todos lados.

**3. La causa de lo genérico resultó literal.** `tailwind.config.js` tenía `theme: { extend: {} }`:
cero tokens propios. Todo el color, la tipografía y los radios eran valores de fábrica. Contradice
la sospecha del owner de SESSION-021 ("la IA no comprende las ideas propias y le da el mismo código
a todos"): **nunca se definió una identidad y quedó el default**.

**4. Decisiones del owner, pedidas antes de construir.** Cinco preguntas con alternativas y
compensaciones explícitas: eje cronológico agrupado por épocas · medallas derivadas solo de lo ya
registrado · arreglar el oscuro **y** dar identidad propia · barra fija al pie solo en el tablero ·
paleta **"tinta y pergamino"**. La paleta era justo el detalle que T-41 llevaba cinco días
esperando, y que por gobernanza no se podía inventar.

**5. Implementación en tres fases**, cada una con su commit y su verificación.

**Lo que no se hizo, y por qué:**
- **No se migraron los componentes de `indigo-*` a `tinta-*`.** Sería lo limpio y son cientos de
  reemplazos en 15 archivos, incluido `admin.cljs` (1239 líneas) — el costo exacto que ADR-012 ya
  había decidido no pagar. Se asume la deuda de nombre y se documenta.
- **No se agregó fuente web.** Un origen externo nuevo, un pedido bloqueante por carga y una
  decisión que registrar, a cambio de tipografía. El serif del sistema da el mismo carácter gratis.
- **No se aplicó `042`.** Los años son contenido; los audita el profesor.
- **No se verificó visualmente nada.** Ver "Pendientes": es la deuda real de esta sesión.

## Archivos revisados

`src/css/app.css` · `tailwind.config.js` · `src/universo/home.cljs` ·
`src/universo/components/{dashboard,plan,admin,admin_test_configs,feedback_modal}.cljs` ·
`src/universo/{access,topics,profile}.cljs` · `src/universo/events/dashboard.cljs` ·
`src/universo/db/crud.cljs` · `supabase/migrations/{002,031,033,041}*.sql` ·
`supabase/queries/verificacion_esquema.sql` · `adr/ADR-012` · `sessions/SESSION-021`.

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/css/app.css` | Color de texto base en `.dark body`, `option`/`optgroup`, tonos de texto faltantes, superficies oscuras a tinta |
| `tailwind.config.js` | De `extend: {}` a la paleta completa: `indigo` redefinido, `tinta`, `acento`, `pergamino`, `font-display`, radios y sombras |
| `src/universo/home.cljs` | Las dos excepciones `dark:` de ADR-012, con los tokens nuevos |
| `scripts/audit_dark_theme.py` · `scripts/audit_contraste.py` | Nuevos: los dos chequeos versionados |
| `supabase/migrations/042_*.sql` | Nueva, sin aplicar |
| `src/universo/timeline.cljs` · `test/universo/timeline_test.cljs` | Lógica pura + 10 tests |
| `src/universo/components/timeline.cljs` | Nuevo componente |
| `src/universo/components/dashboard.cljs` | Monta la línea; `pb-40` para el alto de la barra fija |
| `src/universo/events/dashboard.cljs` | Carga de módulos, subs `:dashboard/hitos` y `:dashboard/hitos-progreso` |
| `supabase/queries/verificacion_esquema.sql` | Bloque H (041) y las dos columnas en el bloque C |
| `adr/ADR-020`, `adr/ADR-021` | Nuevos |
| Memoria | CURRENT_STATUS, HANDOFF, ARCHITECTURE, DECISIONS, RISKS, BACKLOG, TERMINOLOGY, SCHEMA |

## Comandos ejecutados y resultados

```
clj -M:test                 → 83 tests / 454 assertions / 0 failures (eran 74/410)
npx shadow-cljs release app → 229 archivos, 0 warnings
npm run build:css           → ok; verificado que bg-indigo-600 = rgb(58 79 122)
python3 scripts/audit_dark_theme.py → ✓ (probado con control negativo: detecta una regla borrada)
python3 scripts/audit_contraste.py  → ✓ 15/15 pares, 12 en AAA
psql (PostgreSQL 14 desechable)     → 042 aplica limpia, idempotente, 35/0, checks ok
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Identidad por tokens, redefiniendo la escala `indigo` en vez de reescribir componentes | Sí | [[../adr/ADR-020-identidad-visual-por-tokens]] |
| Línea del tiempo histórica, con medallas derivadas de `tests` | Sí | [[../adr/ADR-021-linea-del-tiempo-historica]] |
| Serif del sistema en vez de fuente web | Dentro de ADR-020 | `tailwind.config.js` |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Cambio visual amplio sin verificación en vivo, sobre un sitio con tráfico en plena ventana PAES | Media | RISKS R-25 |

## Bloqueos

Dos, ambos del owner y ninguno técnico:

1. **Auditar los 35 años de `042`** antes de aplicarla. Es contenido, no código.
2. **Mirar las pantallas.** El tablero exige sesión y el agente no tiene credenciales; además la
   extensión de navegador solo controla Chrome y el owner usa Comet (nota de método de SESSION-021).

## Preguntas abiertas nuevas

Ninguna. Las cinco decisiones abiertas se resolvieron preguntando antes de construir.

## Supuestos aplicados

- Los años de `042` son **propuestas del agente**, marcadas como tales, con sus tres puntos débiles
  declarados. No son un supuesto silencioso: son un borrador que espera auditoría.

## Próximos pasos

1. **Mirar la rama en `http://127.0.0.1:3000`** en claro y oscuro (T-67). No en producción.
2. **Auditar los años y aplicar `042`** (T-66). Recién ahí la línea se dibuja.
3. Mergear a `main` si convence, y recompilar no hace falta: el bundle ya está en el commit.
4. Difundir el cupo del 2026-08-15 — sigue siendo lo más urgente del proyecto (R-19).

## Pendientes

- **Cero verificación visual.** Todo lo verificado es indirecto: tests, compilación, audits y CSS
  compilado. Ninguno de esos ve un botón mal contrastado sobre un fondo imprevisto.
- La línea del tiempo **no se ha visto funcionando** ni una vez: sin `042` aplicada no hay hitos.
- La rama sigue sin mergear.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md` (T-41 cerrada; T-66 y T-67 nuevas)
- [x] `project-memory/RISKS.md` (R-25)
- [x] `project-memory/DECISIONS.md`
- [x] `adr/ADR-020-identidad-visual-por-tokens.md` (reemplazada el mismo día), `adr/ADR-021-linea-del-tiempo-historica.md`, `adr/ADR-022-lenguaje-braun-rams.md`
- [x] `project-memory/ARCHITECTURE.md`
- [ ] `project-memory/ROADMAP.md` — sin cambio de fase: es trabajo dentro de F2/F6
- [x] `project-memory/REQUIREMENTS.md`
- [ ] `project-memory/OPEN_QUESTIONS.md` — ninguna nueva
- [ ] `project-memory/ASSUMPTIONS.md` — ninguno nuevo
- [x] `project-memory/TERMINOLOGY.md` (hito, era, medalla)
- [x] `project-memory/graph/` (snapshot de Graphify)

## Notas

**Lo que más rindió: buscar la causa en vez de la clase.** El reflejo ante "hay letras negras" es
buscar qué clase falta y mapearla. El audit mostró que no faltaba ninguna, y ahí apareció la causa
real —que no había color base— que ninguna cantidad de mapeo habría resuelto. Vale para la próxima:
cuando el síntoma es intermitente ("en algunos casos"), la causa suele estar en lo que **no** está
escrito, no en lo que está mal escrito.

**Y una que conviene no perder:** el owner llevaba desde el 2026-08-08 con T-41 abierta porque el
detalle faltaba, y la memoria hizo bien en no inventarlo. Pero cinco días es mucho para una tarea
bloqueada por una pregunta de una línea. Cuando algo quede en `idea (sin especificar)`, vale la pena
preguntar en la sesión siguiente en vez de esperar a que el tema vuelva solo.

## Addendum — el owner probó la paleta y pidió Dieter Rams (mismo día)

Levantó el sitio en `localhost:3000` y dio tres señales:

1. **El pergamino le gustó, pero lo quería menos claro.** Se bajó un escalón de luminosidad
   (`#FBF7F0` → `#F4EEE2`), contraste reverificado.
2. **Aplicó `042`.** Control en producción: **35 ubicados / 0 sin ubicar** — los 35 slugs
   coincidieron. La línea del tiempo ya tiene con qué dibujarse.
3. **Pidió otra dirección entera:** mencionó el sistema de color de IBM y después precisó —
   *"que el sitio parezca un diseño de Dieter Rams Braun, eso quiero"*.

**ADR-020 duró un día.** No es un fracaso del proceso: es lo que pasa cuando alguien elige una
paleta viendo muestras de color y después la ve aplicada. El tokenizado hizo que corregir costara
un archivo, que era exactamente su promesa.

**Lo que obligó a un ADR nuevo en vez de cambiar valores:** Rams contradice a ADR-020 en su propio
terreno — serif contra grotesca, acento cálido decorativo contra un solo color funcional, degradado
contra superficie plana. Y algo más grande que ninguna paleta arreglaba: **el tablero usaba emojis
como iconografía** (📝 ✅ 📈 🚀 📊), lo más lejano al referente que tenía el producto, y que no se
veía como problema de color.

**Hallazgo que vale guardar:** el naranja Braun auténtico con texto blanco da **3.50** y reprueba
AA; con `grafito-900` da **4.83**. Y resulta que Braun ponía glifos oscuros sobre las teclas
naranjas. La solución accesible y la históricamente correcta eran la misma — queda como combinación
prohibida explícita en el audit, porque el reflejo de cualquiera es poner texto blanco.

**Sobre la configuración desde el panel:** el owner pidió a la vez que Braun *reemplace* a pergamino
("un producto con una identidad, no un selector de skins") y un selector de temas en el admin. Con
un solo tema el selector no tiene qué elegir, así que lo que se construyó configura **qué apariencia
ve un visitante nuevo** (claro/oscuro/sistema, tabla `site_settings`, migración `043`), con la
preferencia local de cada persona ganando por encima. Eso también evitó el refactor a variables CSS:
solo se justifica con dos paletas vivas, y construirlo para una sería maquinaria sin uso.

**Verificado en esta pasada:** `clj -M:test` 83/454/0 · compilación 0 warnings · audit de tema
oscuro en verde · **16/16 pares de contraste** · `043` probada contra PostgreSQL 14 (aplica limpia,
idempotente, una fila, los dos checks rechazan, 2 policies).

**Sigue sin verificarse visualmente**, y ahora la superficie es mucho mayor: 7 degradados eliminados
solo en la landing, más el fondo, el logotipo, el footer, las tarjetas y los botones del tablero.

## Addendum 2 — el panel de instrumento (mismo día)

El owner probó Braun ("está bien") y trajo una referencia: un kit skeuomórfico de perillas,
conmutadores y LEDs cian sobre panel gris. Pidió mezclarlo con los principios de Rams.

**No son opuestos.** El SK4, el T3 y el regie 308 de Braun son exactamente eso — controles sobre una
carcasa gris. La UI skeuomórfica de equipos de audio salió de ahí. Chocan en un solo punto: Rams
pide "tan poco diseño como sea posible", y un botón que finge ser plástico es decoración.

**Lo que resolvió la discusión no fue una opinión de diseño, fue una medición.** Sobre el gris medio
del panel, el LED cian da **1.04** de contraste, el naranja 1.68 y el rojo 2.61: ninguno llega al
3:1 que exige un objeto gráfico. Y mirando la foto otra vez, ahí estaba la respuesta — **ningún LED
de la referencia está sobre el panel gris**; todos viven dentro de perillas negras o alojamientos
hundidos.

Eso convierte el relieve de decorativo en **funcional**: es lo que hace visible el control sobre una
superficie que no contrasta. Con ese argumento el híbrido deja de ser un compromiso y pasa a ser una
consecuencia. Regla resultante, en ADR-023:

> El panel es plano y callado. Solo los controles tienen física. La luz viene de arriba, siempre.
> El color solo se enciende donde algo es verdad.

**El audit hizo su trabajo, y esa es la noticia:** al medir la paleta nueva encontró **dos fallas
reales** que se habrían publicado sin él — la etiqueta grabada daba 3.55 (reprobaba AA) y el borde
de las placas 1.30 sobre el panel. La primera se corrigió subiendo un tono; la segunda mostró que el
color no era la herramienta: una placa sobre un panel se delimita con **luz**, no con borde, que es
como se delimita en el aparato real. Quedó en 27/27 pares.

**Dos colores con sentidos que no se pisan:** naranja = acción ("hacé esto"), cian = estado ("esto
es verdad ahora"). Es lo que hace la referencia, donde el cian marca estado y el rojo la acción
peligrosa.

**Advertencia honesta que quedó en el ADR:** es la tercera dirección visual del día
(ADR-020 → ADR-022 → ADR-023). El costo de cada giro fue bajo porque todo vive en tokens y cinco
clases de CSS, pero conviene parar y mirar antes de seguir iterando.

## Addendum 3 — feedback del owner sobre el panel (mismo día)

Probó lo construido y salieron cuatro cosas. Tres se registraron como tickets en vez de improvisar,
y una se hizo.

**T-68 — el modal de feedback.** El owner lo reportó como un problema; al mirarlo son **tres**, con
causas independientes: (1) un bug de CSS clásico —`flex items-center` junto a `overflow-y-auto` en
el mismo elemento deja contenido inalcanzable cuando el ítem es más alto que la ventana—, (2) es el
único componente que no heredó el lenguaje visual, porque ADR-012 lo dejó como excepción con `dark:`
propio y quedó fuera de las tres pasadas de identidad, y (3) que la explicación sea un modal sobre
el enunciado es una decisión de producto discutible, no un defecto. Separarlos importa: el primero
es un arreglo de diez minutos, el tercero es una decisión.

**T-69 — la recta real y los hitos como distribuciones.** Idea del owner para cuando haya más hitos:
que la línea se parezca a la recta real, con desplazamiento y acercamiento, y que un acontecimiento
largo se dibuje como una campana en vez de un punto. Vale la pena anotar **por qué es mejor y no
solo más lindo**: la fecha exacta de un hito matemático casi siempre es una convención —los tres
puntos débiles que declara la migración `042` son justamente eso—, y una campana **muestra esa
incertidumbre en vez de esconderla detrás de un punto**. Precondición: decidir de dónde sale la
anchura, que es contenido y lo audita el profesor.

**T-70 — agrupar el historial por evaluación**, con «rendir de nuevo» y evolución de θ por topic.
Se anotó lo que ya existe para no reescribirlo (`access/best-theta-by-topic`, una fila por intento
en `tests`, `irt_chart`) y una advertencia: roza Q-07 (qué significa repetir el diagnóstico), que
sigue sin decidir. La tarjeta puede hacerse sin resolverla porque solo **muestra** lo que ya está en
`tests`, pero conviene no cerrar Q-07 en contra de lo que la pantalla muestre.

**T-71 — hecho:** fuera el botón flotante de contacto. Detalle que evitó romper algo en silencio:
**el panel se conserva**, porque *Cupos* lo abre desde "Avisarme cuando haya cupo"; borrar el
componente entero habría matado ese flujo sin ningún error visible. El formulario del footer salió
de la columna estrecha —era 1 de 4— y pasó a ser una placa de ancho completo.

---

Relacionado: [[SESSION-021]] · [[../adr/ADR-020-identidad-visual-por-tokens]] ·
[[../adr/ADR-021-linea-del-tiempo-historica]] · [[../project-memory/CURRENT_STATUS]] ·
[[../project-memory/BACKLOG]] T-41, T-66, T-67

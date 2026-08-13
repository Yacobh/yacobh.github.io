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
- [x] `adr/ADR-020-identidad-visual-por-tokens.md`, `adr/ADR-021-linea-del-tiempo-historica.md`
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

---

Relacionado: [[SESSION-021]] · [[../adr/ADR-020-identidad-visual-por-tokens]] ·
[[../adr/ADR-021-linea-del-tiempo-historica]] · [[../project-memory/CURRENT_STATUS]] ·
[[../project-memory/BACKLOG]] T-41, T-66, T-67

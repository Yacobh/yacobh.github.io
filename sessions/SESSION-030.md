# SESSION-030

## Fecha

2026-08-17 (trabajo) · cerrada el 2026-08-18

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Conectar el **login con Google** (T-92). El owner lo planteó como pregunta de viabilidad —"¿se puede
en una sesión?"— y no como orden de ejecución; la respuesta fue sí, con la salvedad de que la parte
manual (Google Cloud + Supabase) no la puede hacer un agente. El objetivo **no cambió**, pero creció
en dos direcciones no previstas por el ticket: una decisión legal (D-21 sobre el botón social) y un
hallazgo de confianza encontrado al verificar en producción (R-33).

## Contexto de entrada

- **Rama:** al abrir, `t-56-geometria` con árbol sucio (trabajo de T-56: migración `044`,
  `L-2_cobertura_de_recursos.sql`, `SESSION-029.md` sin commitear). El owner commiteó y consolidó ese
  trabajo en `main` durante la sesión (`e5f2f57`); todo el trabajo de T-92 se hizo sobre **`main`**.
- **Commit inicial de T-92:** `e5f2f57` (Agregar migracion de recursos de geometria).
- **Estado del árbol al empezar el trabajo propio:** limpio.
- **Documentos de la memoria leídos:** `CLAUDE.md`, `BACKLOG` (T-92, T-93), `RISKS`,
  `CURRENT_STATUS`, `OPEN_QUESTIONS`, `DECISIONS`, `ARCHITECTURE`, `LESSONS_LEARNED`,
  `ASSUMPTIONS`, `prompts/session-close-memory-update.md`, `sessions/SESSION_TEMPLATE.md`.
- **Bloqueos vigentes al empezar:** BL-05 (preguntas abiertas de producto). T-92 estaba `abierto`.

## Actividades realizadas

1. **Orientación con el grafo antes de grepear.** `graphify query "autenticacion login supabase
   auth"` devolvió directamente el nodo de **T-92** en `BACKLOG.md`, incluida la frase "existe pero
   nadie lo llama". El ticket ya traía el análisis hecho de una sesión anterior — se ahorró
   re-descubrirlo.
2. **Verificación de las tres piezas que suelen romper un OAuth**, antes de escribir nada:
   rehidratación de sesión (`events/auth.cljs:248-293`, `getSession` + `onAuthStateChange`), fila en
   `profiles` (trigger `handle_new_user()`, migración `008`) y aterrizaje del callback. **Ninguna
   había que construirla.**
3. **Hallazgo de D-21** al leer `components/login.cljs`: Supabase da de alta al usuario OAuth que no
   existe, o sea que el botón crea cuentas **también en `/ingresar`**, donde el formulario de correo
   no pide la declaración de edad. Se planteó al owner como decisión suya antes de implementar; la
   aprobó ("con la declaración antes del botón").
4. **Implementación:** `consent-block` reutilizable, botón de Google inhabilitado hasta marcar la
   declaración en las dos rutas, `google-logo` SVG en línea, `redirectTo` fijo derivado de
   `universo.router/section->path`.
5. **Verificación local** con un servidor Python **que imita el fallback de GitHub Pages** (sirve
   `404.html` para toda ruta inexistente). Sin eso, `python3 -m http.server` devuelve 404 seco y
   `/registrarse` no carga — **el primer intento falló por esto**.
6. **Verificación del aterrizaje del callback sin tener sesión:** se navegó a `/tablero` sin login;
   la app arrancó vía `404.html`, quedó en `[:router :pending]` y el guard desvió a `/ingresar`.
   Es exactamente el camino que recorre la vuelta de Google.
7. **El owner configuró Google Cloud + Supabase.** Durante ese paso terminó en un formulario de
   **información fiscal de Chile**, irreversible, que **no hace falta** para OAuth → **L-43**.
8. **Verificación de la configuración sin credenciales**, antes de publicar: `curl` a
   `/auth/v1/authorize` → **302 a `accounts.google.com`** con el `redirect_to` **intacto**, que es la
   prueba de que la URL está en la allowlist (si no lo estuviera, Supabase la habría sustituido por
   la Site URL **en silencio**).
9. **Commit + push a `main`** (= despliegue) y espera activa de la propagación de GitHub Pages: el
   bundle nuevo tardó **~4 intentos de 20 s** en aparecer en producción.
10. **Verificación en producción con navegador**, hasta el selector de cuenta de Google. **Se paró
    ahí a propósito**: elegir cuenta habría creado el alta, que es acto del owner.
11. **Hallazgo R-33** en esa pantalla: Google dice *"Ir a jmnqklhxcdccvdhuuiji.supabase.co"*, no
    "Academia Integral".
12. Cierre de memoria: ADR-028, D-56, R-33, L-42, L-43, Q-39, A-36, T-95, `ARCHITECTURE` §4.1.b.

**Lo que no funcionó:**

- `python3 -m http.server` como servidor de verificación: no imita el fallback de `404.html`, así que
  ninguna ruta del router carga. Hubo que escribir un handler de ~10 líneas en el scratchpad.
- **Primer clic al botón de Google en producción: no pasó nada.** El clic llegó antes de que React
  re-renderizara el botón como habilitado tras marcar la casilla. El segundo funcionó. Es el
  comportamiento correcto del `disabled`, pero **es una trampa de UX real** — un usuario que marca y
  pulsa en el mismo gesto siente que el botón no responde. **No se corrigió** (ver Pendientes).
- Los `grep -oE "^### L-[0-9]+"` para averiguar el numeral siguiente de lecciones/preguntas fallaron
  por el formato real de los encabezados; hubo que caer a `grep -oE "L-[0-9]+" | sort -t- -k2 -n`.

## Archivos revisados

- `src/universo/supabase.cljs` — dónde vivía `sign-in-with-google` sin llamador.
- `src/universo/components/login.cljs` — el `<form>` y, en las líneas 139-161 originales, el checkbox
  de D-21 que había que preservar.
- `src/universo/events/auth.cljs` — `:auth/get-session`, `:auth/listen`, `:auth/session-established`,
  `post-session-target`, `guard-section`. **Acá está la razón de que el callback no necesite código.**
- `src/universo/router.cljs` — tabla `section->path-table` y `entry` (el `:kind :pending`).
- `src/universo/events/router.cljs` — `:router/init` y dónde se escribe `[:router :pending]`.
- `src/css/app.css` — mapeo de `text-gray-700` / `text-gray-400` / `border-gray-300` en tema oscuro.
- `project-memory/BACKLOG.md` (T-92 completo), `RISKS.md`, `ARCHITECTURE.md`, `DECISIONS.md`.

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/supabase.cljs` | `oauth-redirect-url` privada nueva; `redirectTo` pasa de `window.location.href` a `origin + (router/section->path :dashboard)`; `:require` de `universo.router` |
| `src/universo/components/login.cljs` | `google-logo` y `consent-block` nuevos; el checkbox de D-21 sale del `<form>` a un bloque reutilizable; separador "o"; botón "Continuar con Google" con gate por consentimiento y texto explicativo |
| `public/js/app.js` | Bundle recompilado (artefacto versionado, ADR-003) |
| `public/css/app.css` | Recompilado: clases nuevas (`h-px`, `flex-1`, `tracking-wide`, `gap-3`…) |
| `project-memory/BACKLOG.md` | T-92 → `hecho` con lo verificado y lo no verificado; **T-95 nueva**; bullet del `redirectTo` marcado como resuelto sin borrarlo |
| `project-memory/CURRENT_STATUS.md` | Bloque de sesión al inicio; **BL-06** abierto y cerrado el mismo día |
| `project-memory/RISKS.md` | **R-33 nuevo** (tabla + detalle) |
| `project-memory/DECISIONS.md` | **D-56** + encabezado |
| `adr/ADR-028-toda-entrada-social-pasa-por-d-21.md` | **Nuevo** |
| `project-memory/ARCHITECTURE.md` | 3 referencias a "OAuth sin UI / código muerto" corregidas; **§4.1.b** nueva con el flujo de vuelta |
| `project-memory/LESSONS_LEARNED.md` | **L-42** y **L-43** |
| `project-memory/OPEN_QUESTIONS.md` | **Q-39** |
| `project-memory/ASSUMPTIONS.md` | **A-36** |
| `project-memory/graph/` | Snapshot refrescado |

## Comandos ejecutados y resultados

```
clj -M:test                 → 97 tests / 530 assertions / 0 failures, 0 errors
                              (solo los :infer-warning conocidos de events/auth.cljs)
npx shadow-cljs release app → Build completed. (231 files, 20 compiled, 0 warnings, 9.10s)
npm run build:css           → Done in 412ms
python3 scripts/audit_dark_theme.py → ✓ sin texto oscuro sin mapear en componentes alcanzables
python3 scripts/audit_contraste.py  → ✓ los 38 pares cumplen su umbral WCAG
python3 scripts/audit_movil.py      → ✓ sin problemas en las 15 pantallas del estudiante
python3 scripts/audit_html.py       → ✓ index.html y 404.html arrancan igual
graphify update .           → 2941 nodes, 7332 edges, 204 communities
curl /auth/v1/authorize     → HTTP/2 302 → accounts.google.com, redirect_to INTACTO
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Todo botón social pasa por la declaración de edad y queda inhabilitado hasta marcarla, en las dos rutas | **Sí, ADR-028** | [[../project-memory/DECISIONS]] **D-56** |
| El `redirectTo` de OAuth es una sola URL fija derivada de la tabla del router | Sí, misma ADR-028 | D-56 |
| El aterrizaje del callback reutiliza el mecanismo de deep link de T-05 en vez de una ruta propia | Sí, misma ADR-028 | D-56 · `ARCHITECTURE` §4.1.b |
| No contratar el custom domain de Supabase por iniciativa del agente | No (queda como pregunta) | **Q-39** · R-33 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| La pantalla de Google nombra a `supabase.co` y no a la marca, ante un público de menores y apoderados | Media (impacto bajo, probabilidad **confirmada**) | RISKS **R-33** |
| El consentimiento de D-21 no queda persistido: la evidencia es el código de UI del commit vigente | — (agravante de R-06/R-28) | BACKLOG **T-95**, ADR-028 §Riesgos |

## Bloqueos

- **BL-06 abierto y cerrado el mismo día** (acceso/operación): el botón estaba en el bundle antes de
  que el proveedor existiera. Se manejó **no commiteando** hasta que el owner confirmó la
  configuración — el orden importaba y por eso se dejó explícito en `CURRENT_STATUS`.
- Ninguno vigente al cerrar.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| ¿Se paga el custom domain de Supabase para que Google muestre la marca? | OPEN_QUESTIONS **Q-39** |

## Supuestos aplicados

- **A-36**: el custom domain de Supabase cuesta del orden de **USD 10/mes**. Cifra **citada de
  memoria por el agente y no verificada** contra la página de precios. Está marcada 🔴 en
  `ASSUMPTIONS` y no debe usarse en ningún material ni presupuesto sin comprobarla.

## Próximos pasos

1. **Completar un login real con Google** y confirmar el último tramo (callback → fila en `profiles`
   → rehidratación al recargar → aterrizaje en `/tablero`). Es un clic del owner. — T-92.
2. **Revisar en Google Cloud** que el nombre de la app sea `Academia Integral` (no `academia`) y
   subir logo: es gratis y recupera parte de la confianza que pierde R-33. — R-33 / Q-39.
3. **Verificar el precio real** del custom domain de Supabase y cerrar A-36. — Q-39.
4. **No adelantar la decisión de R-33**: esperar el dato de conversión de G-5. — T-91.
5. Seguir con lo que ya mandaba antes de esta sesión: **G-2 (calibración) y G-5 (funnel)**, que son
   las que mueven el negocio. Esta sesión fue producto, y **R-30 sigue siendo el riesgo dominante**.

## Pendientes

- **Login real con Google sin ejecutar.** Falta exactamente: abrir `jacobocordova.com/ingresar`,
  marcar la declaración, pulsar "Continuar con Google", elegir cuenta y confirmar que se aterriza en
  `/tablero` con sesión. El agente llegó al selector de cuenta y **se detuvo a propósito**.
- **Nombre y logo de la app en Google Cloud sin verificar.** La pantalla de consentimiento —la
  siguiente al selector de cuenta— no se llegó a ver.
- **El botón "no responde" al primer clic** si se marca la casilla y se pulsa en el mismo gesto
  (espera un re-render de React). Reproducido en producción. No se corrigió porque no está claro que
  valga un cambio; si molesta, la salida es no deshabilitar el botón y mostrar el error al pulsarlo.
- **T-95** (persistir `consent_at`) abierta, P2, sin empezar.
- **T-93 sigue a medias**: falta leer el contrato del liceo. No se tocó en esta sesión.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [x] `adr/ADR-028-toda-entrada-social-pasa-por-d-21.md` (nuevo)
- [x] `project-memory/ARCHITECTURE.md`
- [ ] `project-memory/ROADMAP.md` — **no aplica**: T-92 no mueve fase ni hito (F12–F16 siguen igual)
- [ ] `project-memory/REQUIREMENTS.md` — **no aplica**: no cambió ningún RF/RNF; D-21 ya estaba
- [x] `project-memory/OPEN_QUESTIONS.md`
- [x] `project-memory/ASSUMPTIONS.md`
- [x] `project-memory/LESSONS_LEARNED.md`
- [ ] `project-memory/TERMINOLOGY.md` — **no aplica**: no hay término nuevo
- [x] `project-memory/graph/` (snapshot de Graphify)

## Notas

- **El ticket ya venía resuelto en el papel.** El análisis de T-92 escrito el 2026-08-16 acertó en lo
  técnico (las tres piezas ya estaban) y **acertó en la advertencia de D-21**, que era lo único capaz
  de convertir esta tarea en un problema. Que el grafo devolviera ese nodo como primer resultado
  ahorró la mitad de la sesión. Es el mejor caso de PMF que ha tenido el proyecto hasta ahora.
- **Lo que el ticket no vio** fue R-33 — y solo apareció por **mirar la pantalla real en producción**,
  no por leer código. La lección de fondo se parece a L-25/L-41: hay defectos que solo existen a los
  ojos del usuario.
- **Sobre el ritmo del negocio:** esta sesión fue enteramente de producto. Es defendible (T-92 era
  P1, gratis y de horas) pero **no mueve G-2 ni G-5**, que son las que deciden el año. Si la próxima
  sesión también es solo código, **R-30 se está materializando** y hay que decirlo en voz alta.
- **Sobre el árbol al empezar:** la sesión arrancó con trabajo ajeno sin commitear en
  `t-56-geometria`. No se tocó nada de eso; el owner lo consolidó por su cuenta. Conviene no asumir
  que el `gitStatus` del arranque sigue siendo válido a mitad de sesión — cambió dos veces.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../adr/ADR-028-toda-entrada-social-pasa-por-d-21]] · [[../project-memory/BACKLOG]] ·
`../prompts/session-close-memory-update.md`

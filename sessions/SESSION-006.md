# SESSION-006

## Fecha

2026-08-03

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Sonnet 5)

## Objetivo de la sesión

Continuación interactiva de la misma fecha que SESSION-005 (el bloque autónomo de 8h), después de
que el owner regresara y mergeara ese trabajo a `main`. El objetivo cambió varias veces a pedido
explícito del owner, en orden: (1) diagnosticar y arreglar un bug real que reportó en vivo ("Mi
plan" en blanco), (2) diagnosticar y arreglar el primer fallo real de la CI recién creada, (3)
identificar y ejecutar el siguiente ticket del backlog (T-24), en una rama nueva.

## Contexto de entrada

- **Rama al empezar:** `main` (el owner ya había mergeado el PR #20 con todo SESSION-004/005)
- **Commit inicial:** `4350428` (merge de PR #20)
- **Estado del árbol al empezar:** limpio
- **Documentos de la memoria leídos:** `BACKLOG` (T-24, T-06, T-07, T-12), `LESSONS_LEARNED` L-28,
  `RISKS` R-10
- **Bloqueos vigentes al empezar:** los de siempre; ninguno nuevo

## Actividades realizadas

1. **Bug en vivo: "Mi plan" en blanco.** El owner lo reportó sin más detalle. Se investigó por
   código (no había navegador conectado): se leyó `components/plan.cljs`,
   `components/math_render.cljs` completo, y se razonó sobre la cadena de renderizado. Hipótesis:
   como admin, el owner sí ve los 39 recursos de `018`/`019` (`published=false`, pero
   `resources_select_published` permite `is_admin()`), y alguno de esos `body` con montos en pesos
   escapados (`\$8.000`) rompía el parser de LaTeX. **Se reprodujo fuera del navegador antes de
   tocar código:** se extrajeron los 39 `body` reales (des-escapando el SQL a mano en Python), se
   reimplementó `split-by-latex-improved` en Node, y se corrió contra el `katex` real del proyecto
   -- confirmó que 2 de los 39 recursos producían `katex-error` sin `.katex-mathml`, que es
   justo lo que `render-latex-math` no sabía manejar (`(.-outerHTML nil)` explota sin capturar).
   **Arreglo doble:** (a) el parser ahora reconoce `\$` como peso literal, nunca abre matemática;
   (b) `render-latex-math` ya no asume que el nodo existe -- si KaTeX no puede parsear algo, se
   muestra su HTML de error en vez de reventar. Se volvió a correr la simulación con el fix
   aplicado: 0 fallos en los 39 recursos. Documentado como [[LESSONS_LEARNED]] L-34.
2. **Primer fallo real de CI (T-06).** El primer push disparó el workflow y falló:
   `Please install rlwrap for command editing or use "clojure" instead.` -- exactamente el mismo
   mensaje que ya estaba documentado en L-28, pero con causa distinta (el runner de GitHub nunca
   tuvo `rlwrap`, no es que se lo hayan sacado). Arreglo: usar `clojure -M:test` en vez de
   `clj -M:test` en el workflow -- verificado localmente que da el mismo resultado antes de
   pushear. Se amplió L-28 con esta recurrencia.
3. **Selección del siguiente ticket:** se revisó el estado completo de `BACKLOG.md` (todas las
   épicas) para recomendar T-24 (P1, sin bloqueos de decisión ni de acceso, atiende R-10 -- el
   riesgo de producto marcado como "el más urgente"). El owner lo confirmó.
4. **Rama nueva `t-24-estado-vacio-honesto`**, creada desde `main` ya actualizado.
5. **Implementación de T-24:** se leyó `components/slots.cljs` completo para encontrar el estado
   vacío real de "Cupos" (una sola línea genérica, sin CTA). En `plan.cljs`, la capa 0 ya se
   mostraba siempre -- solo se pulió el mensaje de la sección de recursos. En `slots.cljs`, se
   reescribió el estado vacío para explicar qué es un cupo y por qué necesita mínimo de inscritos,
   más un botón "Avisarme cuando haya cupo" que reutiliza `[:contacto/abrir-panel]` (evento ya
   existente, panel montado globalmente en `home.cljs`) -- sin tabla ni backend nuevo, usando el
   fallback "o al menos contacto" que el propio ticket permitía.
6. **Verificación en cada paso:** `clj -M:test` (34/133/0/0) y `npx shadow-cljs release app`
   (0 warnings) después de cada cambio de código, no solo al final. Se detectó que había un
   `shadow-cljs watch app` corriendo en background desde antes de esta sesión (proceso del propio
   owner, no del agente) -- riesgo conocido de L-30; se verificó explícitamente que no había
   clobbereado `public/js/app.js` con un build de desarrollo antes de commitear (el segundo
   `release app` reportó "0 compiled", confirmando que el bundle ya estaba al día).
7. **Intento de verificación visual:** se intentó usar las herramientas de navegador
   (`claude-in-chrome`) para al menos cargar la app y revisar la consola; la extensión no estaba
   conectada. Se lo dijo explícitamente al owner en vez de asumir que la UI se ve bien -- ninguna
   de las pantallas tocadas (Mi plan, Cupos) se verificó visualmente en esta sesión, solo por
   código + tests + recompilación limpia.
8. **Commits y push**, uno por cada pieza de trabajo, a pedido explícito del owner en cada caso (no
   por iniciativa del agente): el fix de la pantalla en blanco, el fix de CI, y T-24 en su propia
   rama.
9. **Refresco del grafo de Graphify** al cerrar la sesión (cambiaron `.cljs`): saltó de ~1008 a
   1967 nodos / 5654 edges / 125 comunidades -- un salto más grande de lo esperado solo por 3
   archivos `.cljs`; no se investigó la causa exacta por tiempo, queda como nota para revisar si
   se repite (posible indexación de contenido adicional tras el merge a `main`, no confirmado).

## Archivos revisados

`components/plan.cljs`, `components/math_render.cljs` (completo), `components/slots.cljs`
(completo), `events/contacto.cljs`, `events/ui.cljs`, `home.cljs` (montaje de `contacto-fab`/
`contacto-panel`), `BACKLOG.md` (todas las épicas, para elegir el siguiente ticket),
`LESSONS_LEARNED.md` L-28, `RISKS.md` R-10, `db.cljs` (default de `:contacto`).

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/components/math_render.cljs` | `\$` ya no abre matemática; `render-latex-math` no asume `.katex-mathml` |
| `src/universo/components/plan.cljs` | Mensaje de "sin recursos" más explícito (T-24) |
| `src/universo/components/slots.cljs` | Estado vacío de "Cupos" reescrito + botón de contacto (T-24) |
| `.github/workflows/test.yml` | `clj -M:test` → `clojure -M:test` |
| `public/js/app.js` | Recompilado (release) tras cada cambio de `.cljs` |
| `public/css/app.css` | Rebuild de rutina (sin diff, clases ya existían) |
| `project-memory/LESSONS_LEARNED.md` | L-34 nueva; L-28 ampliada con la recurrencia en CI |
| `project-memory/BACKLOG.md` | T-06 (fallo real + fix), T-24 → `hecho` (sin verificar en vivo) |
| `project-memory/graph/{GRAPH_REPORT.md,graph.json,graph.html}` | Snapshot refrescado |
| `sessions/SESSION-006.md` | **Nuevo**, este archivo |

## Comandos ejecutados y resultados

```
clj -M:test              → 34/133/0/0 (varias veces, antes y después de cada fix)
clojure -M:test           → idéntico, verificado antes de cambiar el workflow
npx shadow-cljs release app → 0 warnings (tres veces: fix de pantalla blanca, T-24, verificación final)
npm run build:css         → sin diff, clases ya existían
node check_math.js (scratchpad) → 2 fallos antes del fix, 0 después (simulación parser+KaTeX real)
git push (×3)              → fix pantalla blanca, fix CI, T-24 -- cada uno a pedido explícito
graphify update . / cluster-only → 1967 nodos, 5654 edges, 125 comunidades
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Arreglar el bug de `$` en dos capas (parser + render defensivo), no solo una | No (implementación, no arquitectura) | [[LESSONS_LEARNED]] L-34 |
| Usar `clojure` en vez de `clj` en CI, no instalar `rlwrap` como alternativa | No | [[LESSONS_LEARNED]] L-28, `.github/workflows/test.yml` |
| Reutilizar el panel de contacto existente para T-24 en vez de construir un mecanismo de "avisos por banda" nuevo | No | `components/slots.cljs`, [[BACKLOG]] T-24 |

## Riesgos identificados

Ninguno nuevo con ID propio. El bug de la pantalla en blanco fue severo (cualquier LaTeX inválido
podía tumbar toda la app) pero ya está mitigado con la defensa en dos capas; no se abrió un R-NN
porque ya quedó resuelto y documentado en L-34 antes de cerrar la sesión.

## Bloqueos

Ninguno nuevo. La verificación visual de T-24 sigue pendiente de que el owner la revise con sesión
real (no hay credenciales de prueba disponibles para el agente).

## Preguntas abiertas nuevas

Ninguna Q-NN nueva.

## Supuestos aplicados

Se asumió que las herramientas de navegador (`claude-in-chrome`) estarían disponibles para
verificación visual; no lo estaban, y se lo comunicó directamente al owner en vez de reportar T-24
como "verificado" sin serlo.

## Próximos pasos

1. **El owner revisa visualmente T-24** (Mi plan y Cupos) con su propia sesión antes de mergear
   `t-24-estado-vacio-honesto` a `main`.
2. Confirmar que el segundo run de CI (con `clojure -M:test`) pasó en verde en GitHub Actions.
3. Seguir con T-12 (duplicación `index.html`) como siguiente candidato P1 sin bloqueos, o retomar
   T-01 (revisión pedagógica del contenido de Baldor, sigue siendo el bloqueo más importante).
4. Investigar, si se repite, por qué el salto de nodos de Graphify fue mayor al esperado tras
   cambiar solo 3 archivos `.cljs` (ver nota en "Actividades realizadas" #9).

## Pendientes

- Verificación visual de T-24 (Mi plan, Cupos) -- no hecha, requiere al owner.
- Confirmación de que el CI corregido pasó en GitHub Actions real -- no verificable por el agente
  sin `gh` CLI instalado ni acceso al navegador.
- Merge de `t-24-estado-vacio-honesto` a `main` -- pendiente de que el owner lo apruebe.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [ ] `project-memory/RISKS.md` — no aplicó, el riesgo del bug ya quedó resuelto y documentado en LESSONS_LEARNED sin necesitar un R-NN nuevo
- [ ] `project-memory/DECISIONS.md` — no aplicó, ninguna decisión de nivel suficiente
- [ ] `adr/ADR-0NN-….md` (nuevo) — no aplicó
- [ ] `project-memory/ARCHITECTURE.md` — no aplicó, el fix de `math_render.cljs` es un detalle de implementación, no cambia el flujo documentado
- [ ] `project-memory/ROADMAP.md` — no aplicó, T-24 no tiene entrega propia en las tablas de fase
- [ ] `project-memory/REQUIREMENTS.md` — no aplicó
- [ ] `project-memory/OPEN_QUESTIONS.md` — no aplicó
- [ ] `project-memory/ASSUMPTIONS.md` — no aplicó
- [x] `project-memory/LESSONS_LEARNED.md`
- [ ] `project-memory/TERMINOLOGY.md` — no aplicó
- [x] `project-memory/graph/` (snapshot de Graphify)

## Notas

Tres commits, tres pushes, todos a pedido explícito del owner turno por turno -- ninguno por
iniciativa propia del agente, incluso cuando el contexto hacía obvio que el owner querría el
cambio en remoto. Vale la pena mantener este patrón: preguntar en cada punto de "esto ya está listo
para subir", no asumir que una aprobación anterior (ej. el commit del fix de pantalla en blanco)
cubre las siguientes.

El bug de la pantalla en blanco es un buen ejemplo de por qué vale la pena reproducir un bug fuera
del navegador cuando no hay uno conectado: escribir la simulación del parser en Node y correrla
contra el `katex` real del propio proyecto dio una confirmación mecánica de la causa raíz y del fix,
sin necesitar credenciales de prueba ni una sesión de navegador -- algo que no siempre es posible,
pero que acá sí lo fue porque el bug estaba enteramente en lógica pura (parseo de texto + una
librería de terceros determinística).

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../project-memory/BACKLOG]] · [[../project-memory/LESSONS_LEARNED]] ·
`../prompts/session-close-memory-update.md`

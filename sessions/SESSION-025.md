# SESSION-025

## Fecha

2026-08-16

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code CLI (Opus 5), en rol de **CTO** por pedido explícito del owner

## Objetivo de la sesión

El owner pidió una lectura de la documentación completa desde la perspectiva de un CTO acostumbrado
a mover decenas de miles de dólares en software, con dos entregables: (1) **las cinco cosas que
harían de esto un negocio millonario**, y (2) **reescribir la documentación** para que refleje una
intención conjunta de desarrollar esos cinco elementos. Declaró explícitamente que "todo es
negociable" y abrió la puerta a rondas de preguntas.

El objetivo no cambió. Antes de reescribir se hizo **una ronda de cuatro preguntas** al owner, porque
las respuestas cambiaban materialmente el contenido de ~12 archivos.

## Contexto de entrada

- Rama: `main`
- Estado del árbol al empezar: sucio — `M public/js/app.js` (preexistente, **no tocado en esta
  sesión**)
- Documentos de la memoria leídos: `CLAUDE.md`, `BUSINESS_CONTEXT`, `PROJECT_BRIEF`,
  `VISION_LIBRO_PROYECTO`, `ROADMAP`, `RISKS` (tabla + R-01/R-19), `DECISIONS` (D-01…D-46 + P-*),
  `OPEN_QUESTIONS` (índice + Q-05/Q-07/Q-30), `CURRENT_STATUS` (cabecera + datos de uso),
  `ASSUMPTIONS`, `INDEX`, `HANDOFF`, `ADR-TEMPLATE`, `SESSION_TEMPLATE`
- Bloqueos vigentes al empezar: Q-30 (origen en el copy público, X-09), Q-05 (calibración), F10 en 0 %

## Actividades realizadas

1. Lectura de la memoria de negocio y extracción de los activos reales verificados (motor IRT, 387
   ítems con misconceptions, 252 diagnósticos, 80 usuarios, infra $0, raíz de 16 años).
2. **Diagnóstico central:** el modelo de ingreso vigente (clases a $10.000 CLP/hora, D-32) tiene un
   techo aritmético de ≈ USD 16.000/año que no depende de la ejecución, porque le pone precio al
   calendario del fundador. Se cobra por lo caro (horas) y se regala lo gratis (diagnóstico).
3. Formulación de los cinco vectores **G-1…G-5**.
4. **Ronda de preguntas al owner** (4 preguntas). Respuestas: mix **híbrido B2B base + B2C funnel**;
   **buscar capital** (CORFO / Start-Up Chile / semilla); alcance de reescritura **completo**;
   estatus **decisión tomada hoy**, no propuesta.
5. Reescritura de la memoria alineando todo a G-1…G-5.
6. **Corrección de una colisión de IDs detectada a mitad de camino:** los supuestos nuevos se habían
   numerado A-14…A-18, que ya existían en `ASSUMPTIONS`. Se renumeraron a **A-31…A-35** y se
   actualizaron las cuatro referencias cruzadas. *(Lección: verificar el ID máximo de cada serie
   antes de escribir, no después — las series `A-`, `D-`, `P-`, `T-`, `Q-`, `R-` viven en archivos
   distintos y avanzan a ritmos distintos. `P-12`/`P-13` ya estaban usadas y resueltas, por eso las
   pendientes nuevas arrancan en `P-14`.)*

**Lo que se decidió NO hacer:** tocar el copy publicado (`index.html`, `public/index.html`,
`landing.cljs`). Sigue diciendo que el proyecto "se originó en 2025 a partir de un convenio con la
UNAP" (X-09) y `CLAUDE.md` §1 lo prohíbe expresamente sin decisión del owner (Q-30). **Sí** se
corrigió esa misma afirmación en `HANDOFF.md`, que es memoria interna y ya contradecía a D-45.

## Archivos revisados

- `CLAUDE.md`, `project-memory/INDEX.md`, `project-memory/HANDOFF.md`
- `project-memory/BUSINESS_CONTEXT.md`, `PROJECT_BRIEF.md`, `VISION_LIBRO_PROYECTO.md`
- `project-memory/ROADMAP.md`, `BACKLOG.md`, `RISKS.md`, `DECISIONS.md`, `OPEN_QUESTIONS.md`
- `project-memory/CURRENT_STATUS.md`, `ASSUMPTIONS.md`
- `adr/ADR-TEMPLATE.md`, `sessions/SESSION_TEMPLATE.md`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `project-memory/TESIS_DE_CRECIMIENTO.md` | **Nuevo.** Archivo canónico de G-1…G-5, aritmética del millón, tesis de inversión, orden de ejecución y precondiciones |
| `adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores.md` | **Nuevo.** Decisión, 6 alternativas evaluadas, consecuencias, riesgos y condiciones de revisión |
| `project-memory/BUSINESS_CONTEXT.md` | Objetivos B-08…B-11; §3.1 valor por segmento; §4.1 funnel B2B; §5 modelo económico híbrido; §6.1 métricas M-10…M-16; §7 restricciones nuevas; §9 precedencia de los tres documentos de dirección |
| `project-memory/PROJECT_BRIEF.md` | §3 objetivo de negocio; §5 "comprometido y no empezado"; §6 rol `profesor` deja de ser exclusión; §7 stakeholders nuevos (colegios, profesores de red, inversionistas); §8 criterios S-11…S-18 |
| `project-memory/ROADMAP.md` | Fases **F12–F16**; F9 a requisito contractual; F10 a precondición dura; F11 postergada; hitos H12–H18 |
| `project-memory/BACKLOG.md` | **Épica E8** con T-76…T-89; resumen por prioridad actualizado |
| `project-memory/RISKS.md` | **R-27…R-30** nuevos; R-01 y R-19 reencuadrados (no cambian de severidad) |
| `project-memory/OPEN_QUESTIONS.md` | **Q-07 respondida**; **Q-32…Q-36** nuevas; Q-05 y Q-30 suben a bloqueantes |
| `project-memory/DECISIONS.md` | **D-47…D-51**; P-01 y P-11 cerradas; **P-14…P-16** nuevas |
| `project-memory/ASSUMPTIONS.md` | **A-31…A-35** (supuestos de mercado); actualización de "los tres que más importan" |
| `project-memory/CURRENT_STATUS.md` | Nota de corte 2026-08-16 con el pivote completo |
| `project-memory/HANDOFF.md` | Resumen del pivote; corrección del origen (D-45) en el executive summary |
| `project-memory/INDEX.md` | `TESIS_DE_CRECIMIENTO` enlazado; grafo de relaciones actualizado |
| `CLAUDE.md` | §1 recuadro con G-1…G-5 y tres reglas para agentes; §2 objetivos de negocio 5–9; §10 tabla de referencias |

## Comandos ejecutados y resultados

```
clj -M:test        → no ejecutado (sesión sin cambios de código)
npx shadow-cljs release app → no ejecutado (sin cambios de código)
npm run build:css  → no ejecutado (sin cambios de CSS)
graphify update .  → ejecutado al cierre
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| G-1 · Licencia institucional B2B como línea de ingreso principal | Sí | ADR-025, D-47 |
| G-2 · Calibración como activo defendible y precondición de venta | Sí | ADR-025, D-48 |
| G-3 · Ingreso desacoplado de las horas del fundador | Sí | ADR-025, D-49 |
| G-4 · Se vende Δθ; histórico versionado, nunca sobrescribir | Sí | ADR-025, D-50 (**cierra Q-07 y P-01**) |
| G-5 · Distribución medida + búsqueda de capital externo | Sí | ADR-025, D-51 |
| Abrir épica de negocio E8 **y** track de fases F12–F16 (ambas, no una u otra) | No | DECISIONS P-11 ✅ |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Cuarta repetición del patrón histórico: producto sin distribución | **Alta — dominante** | RISKS R-30 |
| Ciclo de venta institucional más largo que la caja | Alta | RISKS R-27 |
| Datos de menores a escala institucional bajo Ley 21.719 | Alta | RISKS R-28 |
| Vender B2B con el banco sin calibrar y perder credibilidad | Alta | RISKS R-29 |

## Bloqueos

- **Q-30 (decisión del owner):** el copy publicado afirma un origen falso. Bloquea el componente
  "marca personal como motor de contenido" de G-5 y es criterio de éxito S-18. Solo el owner puede
  desbloquearlo.
- **Q-32 / T-80 (humano, externo):** ningún precio institucional está testeado con un comprador. Se
  desbloquea hablando con 5–10 jefes de UTP, no analizando más.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| ¿Precio y unidad de la licencia institucional? | OPEN_QUESTIONS Q-32 (P-14) |
| ¿El B2C cobra suscripción o queda 100 % gratuito? | Q-33 (P-15) |
| ¿Qué fondos vigentes, con qué montos y ventanas? | Q-34 |
| ¿Un colegio exige asistencia/notas/certificación? | Q-35 |
| ¿Cómo se modela el multi-tenant por establecimiento? | Q-36 (P-16) |

## Supuestos aplicados

Toda la aritmética de `TESIS_DE_CRECIMIENTO` §3 descansa en **A-31…A-35**, ninguno validado:
tipo de cambio, tamaño de mercado (~3.300 establecimientos), precio por alumno (CLP 6.000), encaje
con SEP/PIE, y disposición a pagar suscripción B2C. **Están marcados como los supuestos más frágiles
de toda la memoria** y su validación es T-80. Se escribieron como hipótesis explícitas, nunca como
proyección validada.

## Próximos pasos

1. **T-76** — pipeline de calibración de `difficulty` sobre los 252 diagnósticos reales *(G-2)*.
2. **T-78** — instrumentar el funnel con CAC/LTV; requiere decidir **P-04** primero *(G-5)*.
3. **T-77** — reporte técnico de calibración publicable *(G-2)*. Es el entregable de venta.
4. **T-80** — validar precio y mercado con 5–10 jefes de UTP. **No es trabajo de repositorio.**
5. **Q-30** — decisión del owner sobre cómo se cuenta públicamente el origen.

T-76/T-78 van primero y en paralelo. Nada del resto del track de negocio arranca antes.

## Pendientes

- Ninguno de esta sesión. Todo lo planificado quedó escrito.
- **Preexistente, no tocado:** `public/js/app.js` aparecía modificado en el árbol al empezar y sigue
  igual. Verificar `git status` antes de commitear (ver LESSONS_LEARNED L-30: los `watch` en
  background reescriben ese archivo con builds de desarrollo).

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [x] `adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores.md` (nuevo)
- [ ] `project-memory/ARCHITECTURE.md` — **pendiente y esperado**: el multi-tenant institucional
      (T-81) todavía no tiene diseño, así que no hay qué documentar. Se actualiza al cerrar P-16/Q-36
- [x] `project-memory/ROADMAP.md`
- [ ] `project-memory/REQUIREMENTS.md` — pendiente: los RF del panel docente (T-79) y del histórico
      de θ (T-83) se escriben cuando esas tareas se tomen
- [x] `project-memory/OPEN_QUESTIONS.md`
- [x] `project-memory/ASSUMPTIONS.md`
- [ ] `project-memory/LESSONS_LEARNED.md` — pendiente menor: la lección sobre verificar el ID máximo
      de cada serie antes de numerar (ver Actividades §6)
- [ ] `project-memory/TERMINOLOGY.md` — pendiente: faltan CAC, LTV, Δθ, licencia institucional,
      multi-tenant, sostenedor, UTP, SEP/PIE
- [x] `project-memory/graph/` (snapshot de Graphify)

## Notas

- **El tono de la reescritura es deliberado.** El owner pidió una lectura de CTO, no una animación:
  la memoria ahora dice explícitamente que el producto está terminado y el negocio no está empezado,
  que van tres intentos fallidos en el mismo punto, y que los números del plan son hipótesis. Esa
  franqueza es funcional — el mismo texto sirve de due diligence, y una due diligence encuentra esas
  cosas igual.
- **`VISION_LIBRO_PROYECTO` no se editó**, siguiendo el precedente de D-41: se anota, no se
  reescribe el texto del owner. Las contradicciones con la tesis quedaron registradas en
  `BUSINESS_CONTEXT` §9.1 y en la nota del `ROADMAP`.
- **Regla de precedencia nueva:** en modelo de negocio manda `TESIS_DE_CRECIMIENTO`; en pedagogía
  manda `VISION_LIBRO_PROYECTO`; el origen histórico es `RAIZ_SISTEMA_LLOVIZNA`.
- **Lo que más conviene no perder de vista:** R-30. La tentación natural después de esta sesión es
  ponerse a construir el panel docente, que es lo entretenido. Es exactamente el error de las tres
  veces anteriores.

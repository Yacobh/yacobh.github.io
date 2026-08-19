# SESSION-033

## Fecha

2026-08-18

## Participantes

- Humano: Jacobo Córdova (aplicó la migración `045`, publicó `main`, dejó abierta su sesión de admin
  en un Chrome controlado y un `shadow-cljs watch` en `localhost:3000`)
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Dos encargos en secuencia. Primero **mergear `escape-no-se` a `main`**. Después, con el sitio ya en
vivo: **entrar por el navegador con la cuenta de admin, revisar que la plataforma esté operativa en
todas sus ramas, mirar los paneles de edición desde el punto de vista de quien edita, y arreglar o
agregar lo que hiciera falta.**

## Contexto de entrada

- Rama: `escape-no-se` → mergeada a `main`
- Commit inicial: `29db48d` (rama), `cb9b3fb` (main)
- Estado del árbol al empezar: limpio
- Documentos leídos: los de SESSION-032 más `components/admin.cljs`, `admin_questions.cljs`,
  `admin_test_configs.cljs`, `events/admin.cljs`, `events/slots.cljs`
- Bloqueos vigentes al empezar: ninguno

## Actividades realizadas

1. **Merge a `main` con commit de merge**, siguiendo el estilo de los merges anteriores, y
   **compilando el release una vez por commit** para que ninguno quede con el `app.js` desfasado de
   su propio fuente. Verificado **después** del merge, sobre `main`: 130 tests, `app.js` de 1,32 MB
   sin `devtools` dentro, y los cuatro `audit_*.py` en verde.
2. **Recorrido del panel con la cuenta de admin**, pestaña por pestaña, contra `localhost:3000` y la
   base **real**. El diagnóstico cabe en una frase: **el editor de recursos ya tenía el tratamiento
   de D-58 y el del banco no**, siendo el flujo más frecuente del panel.
3. **Tres huecos concretos encontrados** (ninguno era una suposición: los tres se vieron en pantalla):
   - **El editor de preguntas no tenía campo de módulo.** De `module_id` salen «Mi plan» y el
     material que entrega el escape (ADR-029); un tercio del banco no lo tiene (T-60) y **no existía
     ninguna forma de arreglarlo desde el panel**.
   - **El catálogo de ideas erróneas no tenía interfaz** — el cableado de SESSION-032 seguía sin
     consumidor, o sea que `027` seguía sin lector en la práctica.
   - **Fricción de edición**: formulario de quince campos con los botones solo arriba, nueve cajas de
     «Vista previa» que repetían el texto cuando no había fórmulas, y un «no se puede guardar» que
     no decía qué faltaba.
4. **Editor de preguntas, cuatro arreglos**: selector de módulo (agrupado por track, con aviso cuando
   queda vacío), barra de acciones `sticky`, ⌘/Ctrl+Enter y Esc, lista de faltantes **antes** de
   pulsar Guardar, y vista previa solo cuando cambia algo.
5. **Pestaña «Ideas erróneas» (T-103)**: alta, edición, búsqueda y baja; slug propuesto desde el
   nombre y validado contra el check de `027` antes de viajar; el veredicto de `health` arriba y
   visible. Y **cada distractor puede apuntar a una idea errónea** desde el editor de preguntas, que
   es exactamente lo que `027` existía para permitir.
6. **Lógica pura nueva y deduplicación**: `universo.editor` (con test) y
   `misconceptions/health-from-usage` como **única** definición del veredicto, con un test que prueba
   que no puede divergir de `health`. `question-draft-valid?` dejó de estar duplicado en
   `events/admin`: la vista y el evento usan la misma función, que es lo que permite que el
   formulario diga *qué* falta.

### Verificado en vivo, no deducido

- **El arreglo de `module_id` de `3e0ef20` funciona contra la base real.** Se asignó «Operaciones
  fundamentales» al ítem **#31**, se guardó con ⌘+Enter y **persistió tras recargar**. Con el
  `js/parseInt` anterior ese mismo guardado habría mandado `38324…` a una columna `uuid`. Es el
  único cambio de datos que dejó esta sesión y se revierte desde el mismo selector.
- **Alta y baja del catálogo**: se creó una entrada de prueba, se comprobó que aparece con su badge
  «sin usar» y que la búsqueda la encuentra, y **se borró**. El catálogo quedó en 77, como estaba.
- **Tema oscuro** del panel nuevo, revisado en pantalla además de con el auditor.

### El hallazgo que más pesa

**Q-40 dejó de ser una nota en un archivo.** El panel muestra **77 ideas y las 77 son del
experimento de cuántica**: el veredicto salía «Catálogo sano · 6,6 ítems por idea» cuando el
producto tiene **cero** distractores catalogados. Un instrumento que dice «sano» sobre algo que no
existe es peor que no tenerlo. El banner ahora lo declara explícitamente. **Qué hacer con esas 77 no
se decidió** — depende de si el track de cuántica sigue vivo, y eso es del owner.

## Archivos revisados

- `src/universo/components/admin.cljs` (pestañas, editor de recursos como referencia de lo que sí
  funciona), `admin_questions.cljs`, `admin_test_configs.cljs`
- `src/universo/events/admin.cljs` y `events/slots.cljs` (de dónde salían los módulos: **solo** de la
  pestaña de recursos, por eso el selector nuevo aparecía vacío si no se pasaba antes por ahí)
- `src/css/app.css` (mapeo de color del tema oscuro, ADR-012)

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/editor.cljs` | **Nuevo**. `modules-by-track`, `module-label`, `renderable?`, `question-missing-fields`, `question-draft-valid?` |
| `test/universo/editor_test.cljs` | **Nuevo**. 4 deftests |
| `src/universo/components/admin_misconceptions.cljs` | **Nuevo**. La pestaña del catálogo |
| `src/universo/components/admin_questions.cljs` | Módulo, barra sticky, atajos, faltantes, previa condicional, selector de idea errónea por distractor |
| `src/universo/events/admin.cljs` | Sección `:misconceptions` completa; carga de módulos y catálogo en la pestaña de preguntas; validación unificada |
| `src/universo/components/admin.cljs` | Pestaña registrada; `modules-by-track` movida al ns puro |
| `src/universo/misconceptions.cljs` | `health-from-usage`, `split-experimento`, `del-experimento?` |
| `src/css/app.css` | Mapeo oscuro del verde del veredicto (ADR-012) |

## Comandos ejecutados y resultados

```
clj -M:test                 → 136 tests / 761 assertions / 0 failures (antes: 130/716)
clj-kondo --lint            → 0 errors / 0 warnings
npx shadow-cljs release app → 0 warnings (×3: uno por commit del merge, uno al cierre)
npm run build:css           → sí, tres veces: las clases nuevas (sticky, top-14, emerald) no existían
python3 scripts/audit_*.py  → los cuatro en verde; `audit_dark_theme` **falló primero** y por eso
                              el verde quedó mapeado en app.css
graphify update .           → corrido
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| El módulo se pide en el editor de preguntas pero **no se exige**: con un tercio del banco sin él, exigirlo bloquearía editar esos ítems | No | Comentado en `editor/question-missing-fields` |
| El veredicto de `health` se muestra **siempre** e incluye el experimento de cuántica, **declarándolo** en el banner, en vez de filtrarlo por cuenta propia | No | `admin_misconceptions.cljs`; la decisión de fondo sigue en Q-40 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Ninguno nuevo | — | — |

**R-30 sigue siendo el riesgo dominante y esta sesión tampoco lo mueve.** Tres sesiones seguidas de
producto. Lo único que lo compensa: el panel es la herramienta con la que se produce el contenido que
G-2 necesita, así que esto **habilita** trabajo de calibración en vez de sustituirlo.

## Bloqueos

Ninguno técnico. El paso 2 de T-57 (catalogar el módulo más fallado) sigue esperando la consulta del
owner al proyecto real: ahora ya hay dónde escribir el resultado.

## Preguntas abiertas nuevas

Ninguna nueva. **Q-40 se enriqueció con la medición**: las 77 entradas del catálogo son 77 de 77 del
experimento; el producto tiene cero.

## Supuestos aplicados

Ninguno nuevo.

## Próximos pasos

1. **Paso 2 de T-57** — el owner consulta cuál es el módulo más fallado y cataloga **uno solo** desde
   la pestaña nueva. Es lo primero que convierte todo esto en algo con datos.
2. **T-104** (nueva) — panel de Módulos: hoy los 35 módulos solo existen por SQL.
3. **T-90 / T-99** — distribución y calibración. Lo que de verdad mueve R-30.

## Pendientes

- **No hay panel de Módulos** (T-104): crear, renombrar o reordenar un módulo sigue siendo una
  migración a mano, y de los módulos cuelgan el plan, los recursos y los prerrequisitos.
- **El catálogo del producto sigue vacío**, a propósito: `027` es explícita en que sembrarlo
  automáticamente reproduce el problema que la tabla existe para resolver.
- `admin_questions.cljs` usa indigo y utilidades sueltas, no las primitivas del panel Braun
  (ADR-023). Es el mismo problema que **T-100** registra para el diagnóstico; no se mezcló con esto.
- Sigue pendiente de SESSION-031: probar el escape con una cuenta que **no** sea admin.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md` (T-103 cerrada, T-104 nueva, nota en T-100)
- [ ] `project-memory/RISKS.md` — sin cambios
- [ ] `project-memory/DECISIONS.md` — las dos decisiones de esta sesión no llegan a fila de tabla
- [ ] `adr/` — no aplica
- [x] `project-memory/ARCHITECTURE.md`
- [ ] `project-memory/ROADMAP.md` — sin cambio de fase
- [ ] `project-memory/REQUIREMENTS.md` — sin cambios
- [x] `project-memory/OPEN_QUESTIONS.md` (Q-40 con la medición)
- [ ] `project-memory/ASSUMPTIONS.md` — sin cambios
- [ ] `project-memory/LESSONS_LEARNED.md` — sin lección nueva; L-30 volvió a cumplirse y ya está escrita
- [x] `project-memory/graph/`

## Notas

**Sobre revisar usando la herramienta de verdad.** Los tres huecos de la actividad 3 no salieron de
leer el código: salieron de abrir el formulario y querer asignar un módulo. Es el mismo patrón que
SESSION-031 (el escape que hacía el test más difícil) — **lo que la revisión de código no ve, la
sesión de uso real lo encuentra en diez minutos**. Vale como método, no como anécdota.

**Sobre el `watch` y `app.js`.** Volvió a pasar lo de L-30 durante la sesión: el `watch` del owner
pisó el `release` con el build de desarrollo al guardar un fuente. Al cierre el artefacto commiteado
es el `release` (1.357.487 bytes, sin `devtools`), pero **en cuanto se toque un fuente con el watch
vivo volverá a ensuciarse**.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[SESSION-032]] · [[../project-memory/BACKLOG]]
(T-57, T-100, T-103, T-104) · [[../project-memory/OPEN_QUESTIONS]] Q-40

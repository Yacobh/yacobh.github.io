# SESSION-046

## Fecha

2026-09-18 / 2026-09-19

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code (Opus 5)

## Objetivo de la sesión

Revisar el flujo desde que el estudiante se inscribe hasta que rinde el diagnóstico, y arreglar lo
que apareciera.

**El objetivo cambió dos veces.** Empezó como una revisión pedida por el owner («qué observaciones
tienes tú»), derivó a una discusión de posicionamiento (¿sigue siendo esto un producto de PAES?) y
terminó en tres arreglos concretos más **un hallazgo que vale más que los tres**: el flujo no es
poco claro, es **poco interesante**, y eso no lo arregla ninguno de los siete auditores.

## Contexto de entrada

- Rama: `main`
- Commit inicial: `221b570`
- Estado del árbol al empezar: limpio
- Documentos de la memoria leídos: `CLAUDE.md`, `ARCHITECTURE` §4, `BUSINESS_CONTEXT` §4,
  `BACKLOG` (T-90, T-91, T-134, T-137…T-141, T-152), `supabase/SCHEMA.md`, `.env.example`
- Bloqueos vigentes al empezar: sin credenciales de cuenta de estudiante (el agente no puede
  recorrer el embudo)

## Actividades realizadas

1. **Revisión del embudo leyendo el código**, de `:landing/start` a la primera pregunta. Ocho
   observaciones entregadas al owner, de las cuales cuatro ya estaban en el backlog (T-137, T-138,
   T-140, T-141) y cuatro no.
2. **Discusión de posicionamiento.** El owner planteó que el MVP trascendió a la PAES y propuso
   cadenas de conocimiento entre materias. Conclusión compartida: el producto **ya es multi-track**
   (`modules.track` admite seis valores) y el sitio finge que no — es un problema de *copy*, no de
   contenido, y las fichas ya existían.
3. **Arreglo del mapa de la unidad (A10).** Ver commit `10a1ec1`.
4. **Tres correcciones de honestidad en el embudo.** Ver commit `073576a`.
5. **La antesala del diagnóstico: construida, revisada y aparcada.** Ver «Lo que no funcionó».

### Lo que no funcionó

**La antesala (`universo.intro` + `:test/preview` + `intro-component`).** Estaba bien construida —
lógica pura derivada de `test_configs`, 7 tests, contraste declarado, todos los auditores en verde —
y el owner la miró y dijo que el flujo seguía sintiéndose genérico. **Tenía razón.**

El error no fue de ejecución sino de diagnóstico: la sesión optimizó **honestidad** (que el número
publicado sea el medido, que no se muestren slugs) cuando el problema era **interés**. Y la forma
elegida —seis reglas numeradas en una caja— es la más genérica que existe: *dice* en vez de
*mostrar*, justo al revés de lo que apuntaba el feedback real de los usuarios.

Queda en la rama **`antesala-del-diagnostico`** (commit `a570ac3`), como registro y no como
propuesta. Si T-153 decide que el camino es «mostrar», esa pantalla se reemplaza entera.

## Archivos revisados

- `src/universo/events/{landing,test,auth,plan}.cljs` — el embudo completo
- `src/universo/components/{login,diagnostic_test,landing,plan}.cljs`
- `src/universo/{access,plan,profile,timeline}.cljs`, `src/universo/irt/{escape,effort,progress}.cljs`
- `src/universo/db/crud.cljs` (`fetch-published-resources`, `fetch-modules`)
- `src/css/app.css` (`.control`, `.alojamiento`, `.placa`, `.visor`, `.grabado`)
- `supabase/migrations/042_modules_historical_timeline.sql` — completa
- `scripts/{audit_paleta,audit_contraste,verificar_unidad}.py`
- `.claude/skills/unidad-de-contenido/` — los cinco archivos

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `scripts/verificar_unidad.py` | `revisar_historia` (A10) + lectura de eras y cortes desde el SQL de `042` |
| `.claude/skills/unidad-de-contenido/referencias/mapa-de-la-unidad.md` | Sección A10, A1 corregida, fila en la tabla final |
| `.claude/skills/unidad-de-contenido/referencias/metricas-de-la-unidad.md` | **M12** (módulos sin año por track) |
| `.claude/skills/unidad-de-contenido/referencias/las-tablas-y-su-sentido.md` | `modules.historical_*` y la distinción relato ≠ ruta |
| `.claude/skills/unidad-de-contenido/plantilla-unidad.json` | Bloque `historia` |
| `.claude/skills/unidad-de-contenido/SKILL.md` | Paso 4 menciona el chequeo nuevo |
| `CLAUDE.md`, `project-memory/CURRENT_STATUS.md` | Eran 18 lugares, son 19 |
| `index.html` | FAQ: ~20 min → ~6 min medidos |
| `src/universo/components/landing.cljs` | Perfil de ejemplo alineado con `plan.cljs`; copy de duración en 4 lugares |
| `src/universo/plan.cljs` | `module-titles`, `deficit-label` |
| `src/universo/events/plan.cljs` | Sub `:plan/module-titles` |
| `src/universo/components/plan.cljs` | Déficits con título real en vez de slug crudo |
| `test/universo/plan_test.cljs` | 4 deftests nuevos |
| `scripts/audit_paleta.py` | Línea base `landing.cljs` 3 → 1 |
| `public/js/app.js`, `public/css/app.css` | Recompilados (ADR-003) |

## Comandos ejecutados y resultados

```
clj -M:test                 → 217 tests / 2857 assertions / 0 failures / 0 errors
npx shadow-cljs release app → Build completed, 0 warnings
npm run build:css           → Done
graphify update .           → 4051 nodos, 9353 aristas, 280 comunidades
audit_dark_theme            → ✓    audit_contraste → ✓ (49 pares)
audit_movil                 → ✓    audit_html      → ✓
audit_paleta                → ✓    embudo 92 → 90
verificar_unidad.py         → ✓ sobre la plantilla y 12 fixtures de `historia`
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| El tema por defecto del sitio pasa a **oscuro** | No | Lo aplicó el owner en el panel (`site_settings.theme_default`, `043`) |
| La antesala se aparca en rama en vez de commitearse o descartarse | No | Rama `antesala-del-diagnostico`, commit `a570ac3` |
| Quedar fuera de la línea del tiempo es válido **si está dicho** (`sin_year_porque`) | No | `verificar_unidad.py`, mismo idioma que `rendible: false` |
| La tensión austeridad vs. interés necesita decidirse, no describirse | **Sí, ADR-041 pendiente** | [[../project-memory/BACKLOG]] T-153 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Una cuenta de estudiante de prueba ensucia la calibración y `067` no la marcaría (usa `is_admin()`) | Media | Nota en T-145 / pendiente abajo |

## Bloqueos

- **Acceso (sin resolver):** el agente no tiene cuenta de estudiante, así que **la antesala nunca se
  vio renderizada** y el embudo sigue sin recorrerse de punta a punta por nadie. El owner ofreció
  crear una cuenta; se acordó que **él inicia sesión y el agente maneja la pestaña autenticada**,
  porque el agente no puede escribir contraseñas en un formulario. No se llegó a hacer.
- **Decisión (sin resolver):** T-153. Nadie puede desbloquearlo salvo el owner, y conviene que sea
  después de T-90.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| ¿Cómo se marca el diagnóstico rendido por una cuenta de prueba, si `067` se guía por `is_admin()`? | OPEN_QUESTIONS Q-51 |

## Supuestos aplicados

Ninguno. El único número que se publicó (6 min) sale de la medición de T-141, no de una estimación.

## Próximos pasos

1. **T-90** — aplicar el diagnóstico en un curso real y observar. Es precondición honesta de T-153 y
   de la regla de escape (`irt/escape.cljs` calcula `escape-rate` y **no decide nada** a propósito,
   esperando este dato).
2. **T-153** — el ADR de austeridad vs. interés. Después de T-90.
3. **T-139 escalón 0** — enlazar una simulación externa en `media_url` de los módulos con más
   escape. Cuesta una fila en la base y mide si el material visual se usa.
4. **T-154** — confirmar con M12 y decidir si se llenan los 33 años.
5. **T-91** — corregir en su ficha la premisa que T-141 refutó.

## Pendientes

- **La premisa de T-91 sigue sin corregir.** T-141 cerró su mitad de copy; la ficha de T-91 todavía
  dice que «20 min consumen la hora completa», y eso es falso: la mediana es 5,8.
- **M12 no se corrió contra la base.** El conteo de T-154 sale del `grep` sobre migraciones.
- **La antesala no se vio renderizada nunca**, ni siquiera para decidir si valía la pena. Se
  descartó por su forma, que se puede juzgar del código; pero nadie la vio.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md` (T-141 cerrada; T-153 y T-154 nuevas)
- [ ] `project-memory/RISKS.md` — el riesgo de la cuenta de prueba quedó solo acá
- [ ] `project-memory/DECISIONS.md`
- [ ] `adr/ADR-041-….md` (lo abre T-153, con el owner)
- [ ] `project-memory/ARCHITECTURE.md`
- [ ] `project-memory/ROADMAP.md`
- [ ] `project-memory/REQUIREMENTS.md`
- [x] `project-memory/OPEN_QUESTIONS.md` (Q-51)
- [ ] `project-memory/ASSUMPTIONS.md`
- [ ] `project-memory/LESSONS_LEARNED.md` — **ver Notas**
- [ ] `project-memory/TERMINOLOGY.md`
- [x] `project-memory/graph/` (`graphify update .`)

## Notas

**Una lección candidata que no se escribió como L-**, porque conviene que la escriba el owner con
sus palabras o que salga del ADR-041:

> *Siete auditores en verde y 0 failures no dicen nada sobre si el producto vale la pena usarlo.*
> Todo lo verificable de esta sesión pasó, y el owner miró el resultado y dijo que era genérico. Los
> auditores miden corrección, contraste, tamaño táctil y pertenencia al sistema de color. **Ninguno
> mide interés**, y no hay forma de que lo midan. Es pariente de L-50 («tres auditores en verde no
> significan que la pieza pertenezca al sistema»), un escalón más arriba: pertenecer al sistema
> tampoco significa que el sistema sea el correcto.

**Contradicción encontrada y corregida de paso:** `CLAUDE.md` §4 decía que las migraciones
`062`–`066` estaban «sin aplicar»; `SCHEMA.md` las da por aplicadas el 2026-09-09. Gana `SCHEMA.md`.
Consecuencia vigente: **todo estudiante de PAES ve «Electrotecnia» en su selector** (D-66, R-42,
T-129).

**Dato útil que nadie había usado:** `crud/fetch-published-resources` ya selecciona
`modules(slug, title, track)`. Los títulos de módulo están en `app-db` desde siempre; para dejar de
mostrar slugs crudos no hizo falta ninguna consulta nueva.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
`../prompts/session-close-memory-update.md`

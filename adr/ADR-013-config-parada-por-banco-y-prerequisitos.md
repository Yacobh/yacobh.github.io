# ADR-013: Configuración de parada por banco de preguntas y prerequisitos de tests

## Estado

Aprobada

## Fecha

2026-08-08

## Contexto

La regla de parada del diagnóstico IRT (`min-items 5 / max-items 12 / SE ≤ 0,35`, ADR-004) era un
único valor global (`universo.irt.progress/default-stop-config`), aplicado sin importar qué banco
de preguntas (`questions.topic`) se estuviera evaluando. El owner identificó que hay bancos con
pocas preguntas (donde ese criterio puede ser inalcanzable o forzar a agotar el banco) y bancos
robustos donde se podría exigir más precisión — necesitaba poder ajustar esos parámetros **por
banco**, incluyendo un límite de tiempo explícito que **no existía en el código** (el "5 minutos"
mencionado en el pedido original resultó ser una lectura del roadmap; el ADR-004 real nunca tuvo
componente temporal, solo `min-items`/`max-items`/`SE`).

Además, hoy cualquier usuario logueado ve y puede iniciar cualquier `topic` desde el selector de
evaluaciones (`diagnostic_test.cljs`) — no existe ningún concepto de progresión entre tests. El
owner pidió que un usuario nuevo solo tenga acceso al diagnóstico, y que completar un test
desbloquee otros según el resultado.

El diseño pasó por tres rondas con el owner. La primera proponía una tabla de "accesos otorgados"
(`user_topic_access`) que el cliente escribe explícitamente tras completar el diagnóstico,
desbloqueando topics donde hubo al menos un error. El owner la rechazó: pidió un enfoque **más
funcional y basado en RLS**, donde el avance del usuario se derive de **qué tests ya rindió**
(tabla `tests`), no de una tabla de permisos separada — y reemplazó el criterio "topics con error"
por una **cadena de prerequisitos** (`test_configs.prerequisite_topic`, self-referencing) con un
**θ mínimo** exigido en el prerequisito, más un flag `active` para poder tener tests en borrador
en el panel de admin.

`questions` no tiene tabla de "banco" propia — `topic` (string libre) es hoy el único
identificador real y completo de un banco (ver ADR-005). El mapeo `topic → module-slug` en
`universo.profile` está documentado como parcial ([[../project-memory/OPEN_QUESTIONS]] Q-06), así
que cualquier diseño que dependiera de él para decidir accesos heredaría esa brecha.

## Decisión

1. **Config de parada por banco**: nueva tabla `test_configs`, keyed por `topic` (no por
   `modules`, para no depender del mapeo parcial Q-06), con `min_items`, `max_items`,
   `se_threshold` y `max_minutes` (nullable = sin límite, preserva el comportamiento previo).
   `universo.irt.progress/stop-reason` gana una 4.ª aridad `[responses theta elapsed-minutes
   config]` que evalúa `:time-limit` además de `:max-items`/`:precision`; las aridades de 2 y 3
   argumentos quedan intactas (compatibilidad hacia atrás, sin romper los tests existentes de
   ADR-004).
2. **Progresión por prerequisitos + θ, sin tabla de permisos**: `test_configs.prerequisite_topic`
   (self-FK nullable) marca de qué topic depende un test; `test_configs.min_theta` (escala interna
   -3..3, igual que `tests.theta`) exige un nivel mínimo en ese prerequisito. Un test sin
   prerequisito es un diagnóstico, siempre accesible. `test_configs.active` permite borradores.
   **El avance del usuario se deriva 100% de `tests`** (qué topics rindió y con qué θ, tomando el
   **mejor** intento por topic — el diagnóstico se puede repetir, y mejorar el θ es el incentivo
   explícito para desbloquear más contenido) vía la función pura
   `universo.access/unlocked-topics`. No hay dispatch de "unlock": el desbloqueo es un cálculo de
   lectura, no una escritura.
3. `tests` gana columnas propias `topic`/`theta` (antes solo dentro del JSON de la columna `test`)
   y una policy `tests_select_own` — **no existía ninguna policy de SELECT propia del usuario
   sobre `tests`** (solo `tests_select_admin`), ni evidencia versionada de que la tabla tuviera RLS
   habilitado; ambas cosas se agregan en la misma migración.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Tabla `user_topic_access` con grants explícitos escritos por el cliente al completar un test | Primera propuesta; el owner la rechazó por preferir que el avance se derive del historial real (`tests`) en vez de una segunda fuente de verdad que puede desincronizarse |
| Desbloqueo por "topics con al menos un error" en el diagnóstico | Segunda propuesta, también reemplazada — el owner prefirió una cadena de prerequisitos con θ mínimo, más simple de razonar como currícula (A → B → C) y con incentivo directo a repetir el diagnóstico |
| Guardar `min_theta` en la escala de display (0–100) | Se descartó guardar así en la DB: mezclar escalas con `tests.theta`/`student_profiles.theta` (-3..3) habría obligado a convertir en cada comparación. Se guarda en la escala interna; la conversión ×100/÷100 vive solo en el formulario de admin, seams la convención ya usada en `dashboard.cljs` |
| Backfill completo de `theta` histórico en `tests` (cast desde el JSON) | Un cast numérico masivo sobre datos ya guardados en producción es más riesgoso que el valor que aporta; se omite a propósito — los tests rendidos antes de este deploy no cuentan para gates de θ hasta que se repitan |
| Fortificar `:test/start` con una policy RLS adicional sobre `questions` | La policy real de lectura estudiantil de `questions` no está en ningún archivo de migración versionado; tocarla a ciegas es más riesgoso que el problema que resuelve (practicar un test no desbloqueado es de bajo daño) |

## Consecuencias

**Positivas**
- Ningún usuario pierde acceso el día del deploy: el seed de `020_test_configs.sql` no asigna
  ningún `prerequisite_topic`, así que todo sigue "abierto" como hoy hasta que un admin configure
  una cadena real.
- El límite de tiempo, ausente hasta ahora, queda disponible por banco sin tocar el modelo IRT.
- El "avance del usuario" queda como un dato derivado y siempre consistente con `tests`, sin
  duplicación de estado ni riesgo de desincronización.
- Reduce indirectamente el riesgo de Q-12 (RLS de lectura de `questions` no versionada): al normalizar
  `tests_select_own`, quedó en evidencia que `tests` tampoco tenía RLS habilitado en ningún archivo
  versionado — se corrige en la misma migración.

**Negativas / costos aceptados**
- El límite de tiempo se evalúa por checkpoint (al enviar cada respuesta), no con un reloj en vivo;
  un estudiante detenido en una pregunta puede exceder el tiempo configurado sin que el test corte
  hasta que responda. Un countdown visual con auto-envío queda como mejora de UI futura sobre el
  mismo `max_minutes`.
- El backfill de `theta` histórico se omite; el historial previo al deploy no participa en gates
  de θ hasta que el usuario repita ese topic.
- La guarda de acceso en `:test/start` compara contra estado cacheado en `app-db` (modificable vía
  devtools) — no es una fortificación real, es una guarda honesta para el flujo normal.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Cambiar `is_diagnostic`/prerequisito de un topic con usuarios ya activos no es retroactivo salvo que rindan de nuevo | Aceptado: el desbloqueo se recalcula en cada carga del selector con datos frescos de `tests`, así que no requiere backfill — solo un test previo no cuenta hasta que se repite | [[../project-memory/RISKS]] |
| Tipo real de la columna `test` en `tests` sin confirmar (`json`/`jsonb` vs `text`) | El backfill de `topic` en `021` usa `test::jsonb`; verificar el tipo real antes de aplicar en producción | — |
| `tests` podía no tener RLS habilitado en ningún archivo versionado | `021_tests_topic_theta_rls.sql` agrega `alter table ... enable row level security` de forma idempotente | [[../project-memory/RISKS]] |

## Seguimiento

Revisar si el desbloqueo por prerequisito/θ debería extenderse a permitir **más de un**
prerequisito por test (hoy es una sola columna self-FK, cadena lineal/árbol, no DAG) si el
catálogo de tests crece lo suficiente como para necesitarlo. Reconsiderar también si conviene un
countdown visual con auto-envío para `max_minutes`, y si el backfill de `theta` histórico se
vuelve necesario una vez que haya suficiente volumen de tests previos al deploy.

---

Relacionado: [[../project-memory/ARCHITECTURE]] · [[../project-memory/DECISIONS]] ·
[[../adr/ADR-004-irt-1pl-map-y-regla-de-parada]] · [[../adr/ADR-005-banco-de-items-en-vez-de-cms]] ·
[[../project-memory/OPEN_QUESTIONS]] Q-06, Q-07

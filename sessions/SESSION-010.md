# SESSION-010

## Fecha

2026-08-08 / 2026-08-09 (sesión continua que cruzó medianoche)

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Empezó con una evaluación técnica y de negocio del proyecto completa a pedido del owner. De ahí
salieron dos hilos que se ejecutaron enteros: **ADR-014** (el tiempo de respuesta como eje separado
de θ) y, tras auditar RLS, **ADR-015 + T-47** (cerrar la lectura directa del banco de ítems), que
pasó a ser lo urgente.

## Contexto de entrada

- Rama inicial: `t-40-t-42-catalogo-evaluaciones` → luego `adr-014-tiempo-como-eje-separado` →
  finalmente `t-47-cerrar-lectura-banco-items` (desde `main`, que el owner había avanzado a `ad9712b`).
- Estado del árbol: sucio con `project-memory/AVISO_PRIVACIDAD_BORRADOR.md` (trabajo del owner,
  **nunca se tocó ni se commiteó en toda la sesión**).
- Bloqueos vigentes al empezar: BL-01 (contenido), BL-02 (email), BL-03 (cupos reales).

## Actividades realizadas

1. **Evaluación completa del proyecto** (leída toda `project-memory/`, verificada contra el código).
   Conclusión central: la ingeniería va muy por delante del negocio — 9 tareas cerradas en dos
   semanas mientras T-01/T-02/T-04 seguían intactas, con los 39 recursos ya cargados en producción
   y `published = false`. Entregada como artifact.
2. **Dos afirmaciones falsas publicadas, verificadas contra el código:** la FAQ dice que el tiempo
   de respuesta entra en la estimación (el 1PL solo usa dificultad y acierto) y promete ver "cómo se
   movió tu nivel" (el perfil se sobrescribe).
3. **ADR-014** — el owner eligió arreglar el modelo en vez de borrar la frase. Se diseñó el tiempo
   como **eje separado de θ**, en tres fases con precondición de datos (T-44/45/46). Argumento
   central: fundir velocidad en θ haría desaparecer el perfil "sabe pero lento" que la visión de
   largo plazo quiere detectar.
4. **Auditoría de RLS completa** (las 15 tablas, `pg_policies` + `relrowsecurity`), a partir de
   Q-12. Confirmó el peor caso de R-16 y destapó cuatro hallazgos más (ver abajo).
5. **ADR-015 + migraciones `023`–`026` + T-47** — el cliente dejó de leer `questions`. Ejecutada la
   secuencia completa de despliegue en el orden correcto, con verificación en cada paso.
6. **Dos bugs graves encontrados de paso** (ver "Lo que no funcionó").

### Hallazgos de la auditoría de RLS

| Hallazgo | Estado |
|---|---|
| `questions` con policy permisiva del dashboard (`using true`) → 387 ítems descargables con `correct_option` | ✅ cerrado (ADR-015) |
| Tabla huérfana `dashboard`, SELECT/INSERT abiertos, 0 filas, sin referencias en código | ✅ eliminada en `023` |
| **`public.questions` no se crea en ninguna migración** — el repo no puede reconstruir el esquema | ⛔ T-48 |
| La banda del estudiante no está protegida: puede reescribir su `theta_band` e inscribirse en cualquier cupo | ⛔ T-49 |
| ≥8 policies creadas desde el dashboard: **el repo no era la fuente de verdad de RLS** | ✅ versionadas en `023` |
| RLS habilitado en las 15 tablas (`relrowsecurity = true`) | ✅ sin problema |

### Lo que no funcionó / se descubrió roto

- **🚨 El CTA principal de la landing llevaba a una pantalla muerta.** `:landing/start` solo hacía
  `[:navigate-to :diagnostic-test]` sin cargar el catálogo. **Verificado por inspección de red que
  nunca se llamaba a `test_configs`**: todo usuario que entraba por "Comenzar mi diagnóstico"
  —logueado o recién registrado— veía *"No hay evaluaciones disponibles por ahora"* y ahí moría el
  embudo. Solo funcionaba entrando por "Mi tablero", que es como se probaba siempre. **Estuvo roto
  en producción sin que nadie lo detectara.** Arreglado en dos capas (el evento + carga al montar
  el componente, que cubre el redirect post-registro y deep links futuros de T-05).
- **El banco de ítems está peor de lo documentado** (medido sobre las 387 preguntas reales):
  `difficulty` en tres escalas incompatibles — `enteros` va de **10 a 90**, con lo que ningún ítem
  es alcanzable y ese test muere al instante; 51% sin `module_id`; 26 topics con duplicados por
  acento. → **T-50 (P0)** y **T-51**.
- **Una afirmación de la memoria resultó falsa:** la nota de T-39 decía que `tests` "no tenía
  ninguna policy de SELECT propia del usuario". Sí la tenía (`Enable users to view their own data
  only`), creada desde la UI. `tests_select_own` de `021` fue redundante, no un arreglo. Corregido
  sin borrar la nota original.
- **Primer intento de diseño descartado:** privilegios de columna de Postgres (`grant select (cols)`)
  parecían la solución obvia para ocultar `correct_option`, pero se conceden por **rol de Postgres**
  y estudiantes y admins comparten `authenticated` (el rol de admin vive en `profiles.role`). Habría
  roto el editor de preguntas del panel. Registrado en las alternativas de ADR-015.

## Archivos revisados

- Toda `project-memory/` (para la evaluación), `supabase/SCHEMA.md`, `supabase/migrations/*`
- `src/universo/components/tetha.cljs` (modelo 1PL, para ADR-014)
- `src/universo/events/test.cljs`, `db/crud.cljs`, `access.cljs`, `db.cljs`
- `src/universo/components/{diagnostic_test,feedback_modal}.cljs`, `events/landing.cljs`
- `supabase/admin_rls.sql` (roles: solo `user`/`admin`), `001_mvp_schema.sql`, `014_visitor_track_rpc.sql`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `adr/ADR-014-…`, `adr/ADR-015-…` | **Nuevos.** Tiempo como eje separado; ítem sin respuesta en el cliente |
| `supabase/migrations/023`–`026` | **Nuevas.** Limpieza RLS · RPC · revocación · correcta en `score_answer` |
| `src/universo/events/test.cljs` | `fetch-candidates` → `next-question`; respuesta asíncrona (`:test/answer-scored`, `:test/score-failed`); `normalize-question` sin secretos; subs `scoring?`/`score-error` |
| `src/universo/db/crud.cljs` | `next-question`, `score-answer` |
| `src/universo/components/diagnostic_test.cljs` | El botón ya no decide el acierto; bloqueo mientras corrige; banner de error; **carga del catálogo al montar** |
| `src/universo/components/feedback_modal.cljs` | Respuesta correcta y explicación vienen de la respuesta, no de la pregunta |
| `src/universo/events/landing.cljs` | **Fix del CTA**: despacha `:test/open-selection` además de navegar |
| `src/universo/db.cljs` | `:scoring?`, `:score-error` |
| `project-memory/*`, `supabase/SCHEMA.md` | Q-12 y X-03 cerradas, R-16 cerrado, T-47 hecho, T-44/45/46/48/49/50/51 abiertas |

## Comandos ejecutados y resultados

```
clj -M:test                 → 42 tests / 162 assertions / 0 failures
npx shadow-cljs release app → 0 warnings
npm run build:css           → OK (clases disabled:* nuevas)
clj-kondo                   → 0 errors; 1 warning preexistente (T-43)
hash producción vs main     → 1fd4f92320486b71d1f4981e0f77de0d, idénticos
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde |
|---|---|---|
| El tiempo de respuesta es un eje separado de θ, en 3 fases con precondición de datos | Sí | ADR-014 |
| El cliente no lee `questions`; corrección en servidor | Sí | ADR-015 |
| `score_answer` devuelve también la alternativa correcta | Nota fechada dentro de ADR-015 | `026` |
| Se acepta el sondeo ítem por ítem como riesgo residual | No | ADR-015 §Consecuencias |

## Riesgos identificados

| Riesgo | Severidad | Registrado |
|---|---|---|
| Banco descargable | Alta → **cerrado** | R-16 |
| `difficulty` fuera de escala rompe topics enteros | Alta | T-50 (P0) |
| θ se calcula y escribe en el cliente: no es registro confiable | Media | T-49, ADR-015 |
| El esquema no se puede reconstruir desde el repo | Media | T-48 |

## Bloqueos

- **T-50** es el próximo bloqueante real: `enteros`, `Ecuaciones cuadráticas` y `Polinomios` están
  muertos por escala de `difficulty`. Hoy inactivos en `test_configs`, así que el daño está
  contenido — **no activarlos sin arreglar la escala**.
- Sigue todo lo de siempre: BL-01 (publicar los 39 recursos), BL-03 (cupos reales).

## Preguntas abiertas nuevas

Ninguna. Se **cerraron** Q-12 y las contradicciones X-01 (vía decidida) y X-03 (resuelta).

## Supuestos aplicados

Ninguno relevante: todo lo afirmado sobre policies, esquema y banco se midió contra el proyecto real.

## Próximos pasos

1. **T-50** — arreglar las escalas de `difficulty` (P0).
2. **Cambiar la contraseña de la cuenta de prueba** (era trivial y estuvo en un historial).
3. **T-01/T-04** — publicar los 39 recursos y agendar cupos. Sigue sin ser trabajo de código, y
   ahora el embudo por fin funciona de punta a punta.
4. T-44 (filtro de esfuerzo) para que la frase de la FAQ deje de ser falsa.

## Pendientes

Nada a medias del lado del agente.

## Actualizaciones requeridas en Project Memory

- [x] `CURRENT_STATUS.md` · [x] `BACKLOG.md` · [x] `RISKS.md` · [x] `DECISIONS.md`
- [x] `adr/ADR-014`, `adr/ADR-015` · [x] `OPEN_QUESTIONS.md` · [x] `supabase/SCHEMA.md`
- [x] `graph/` (snapshot de Graphify)
- [x] `ARCHITECTURE.md` — RLS de `questions`, tabla del esquema y §7.5 superficie de ataque
- [ ] `ROADMAP.md`, `PROJECT_BRIEF.md` — siguen con la deriva señalada en la evaluación (conteo de
      tests, fases desactualizadas). No se tocaron en esta sesión

## Notas

- **Sobre verificar:** el hash de `public/js/app.js` y el tamaño del archivo (1,2 MB release vs
  ~8,4 MB del watcher de desarrollo) siguen siendo el chequeo más confiable. `git status` no basta.
- **L-30 reincidió por cuarta vez, con un efecto nuevo:** al cerrar la memoria, el watcher había
  sobreescrito `app.js` con el build de desarrollo (8,8 MB). Se detectó por tamaño y se corrigió con
  `git restore`. **Lo nuevo:** el snapshot de Graphify se había generado sobre ese bundle equivocado
  y reportaba **1229 nodos** en vez de 2168 — casi la mitad. Si alguna vez el conteo de nodos cae
  bruscamente sin explicación, sospechar del bundle antes que del grafo, y regenerar después de
  restaurar.
- **Sobre el repositorio público:** se escribió el correo de la cuenta de prueba en
  `CURRENT_STATUS` y se retiró antes de commitear. Este repo es público: no nombrar cuentas.
- **Para la próxima auditoría de seguridad:** `pg_policies` sola no basta — hay que mirar también
  `relrowsecurity`, porque una tabla con policies perfectas y RLS apagado se ve idéntica en ese
  listado.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]] ·
[[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]]

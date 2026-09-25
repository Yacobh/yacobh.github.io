# SESSION-051

## Fecha

2026-09-25

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code (Claude Opus 5.5)

## Objetivo de la sesión

Retomar el traspaso de SESSION-050: guardar la conversación de Q-46, verificar `084` y el merge.
Después el owner respondió las cuatro preguntas de Q-46 y pidió: mergear, implementar la exclusión
de ítems vistos, medir person-fit, escribir el ADR de ítems generativos, revisar los logs de R-49
y avanzar con la lista de pendientes.

## Contexto de entrada

- Rama: `trabajo-autonomo-g2`, commit `4e554f2`, 12 commits delante de `main` y `origin/main`.
- Árbol: `public/js/app.js` modificado por un `shadow-cljs watch` que seguía corriendo desde el
  2026-09-23 (build de desarrollo de 10 MB). **No se commiteó.**
- Leídos: CLAUDE.md, el traspaso pegado por el owner, HANDOFF, OPEN_QUESTIONS (Q-46).

## Actividades realizadas

1. **`084` verificada, ahora sí con efecto:** HEAD anónimo → **HTTP 401**; `relacl` sin `anon` ni
   `authenticated`; `claude_ro` lee 661 filas. R-49 baja a 🔶, T-173 cerrada salvo los logs.
2. **Q-46:** anotada la conversación perdida del 2026-09-24 y, después, las respuestas del owner
   → **D-77** (θ inmutable por intento; cuál cuenta, por evaluación multidimensional).
3. **Merge:** suite (291/3133/0) y auditores en verde; `main` es ancestro de la rama (fast-forward).
   **El push a `main` lo bloqueó el control de permisos** (despliegue a producción). Queda para el
   owner.
4. **T-174 — exclusión de ítems vistos**, sin migración: `universo.vistos` + `crud/fetch-ids-vistos`
   + tres eventos. Si el banco se agota, sigue con los vistos y guarda `:repetidos`. Se comprobó que
   PostgREST acepta `responses:test->responses` (la respuesta fue de permiso, no de sintaxis).
   **No se probó con un estudiante real en vivo**: requiere iniciar sesión con una cuenta.
5. **T-175 — person-fit.** Hallazgo: **no detecta la trampa total** (su patrón es el de un
   estudiante fuerte). La huella está en el tiempo. En electrónica Guttman ≈ 0,5: las etiquetas no
   ordenan los ítems. Informe en `docs/person_fit/`.
6. **ADR-043** (Propuesta) y **D-78**: ítems generativos generados y corregidos en SQL, instancia
   guardada, verificador que sí comprueba la cuenta, piloto de una plantilla (T-176).
7. **Logs de R-49: no se pudieron revisar.** La CLI 2.113.0 no tiene comando de logs y el dashboard
   pide iniciar sesión. Consulta escrita en `supabase/queries/R-49_logs_de_la_vista.sql`.
8. Bundle de release compilado con T-174; 301 tests / 3164 assertions / 0 fallos; cinco auditores
   en verde; `clj-kondo` sin errores en los archivos tocados.

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/vistos.cljs` + test | Nuevo: ítems vistos, exclusión, repetidos |
| `src/universo/db/crud.cljs` | `fetch-ids-vistos` |
| `src/universo/events/test.cljs` | Carga de vistos antes del primer ítem, reintento con vistos, `:repetidos` al guardar |
| `src/universo/rastro.cljs` | `:repetidos` en la lista blanca de `tests.test` |
| `src/universo/irt/person_fit.cljs` + CLI + test | Nuevo |
| `shadow-cljs.edn` | Build `:person-fit` |
| `scripts/medir_person_fit.sh`, `supabase/queries/T-175_…sql`, `supabase/queries/R-49_…sql` | Nuevos |
| `adr/ADR-043-items-generativos.md` | Nuevo |
| `docs/person_fit/T-175_primera_medicion_2026-09-25.md` | Nuevo |
| memoria | SCHEMA, RISKS, BACKLOG (T-174…T-177), DECISIONS (D-77, D-78), OPEN_QUESTIONS, CURRENT_STATUS, HANDOFF, CLAUDE.md |

## Pendientes para el owner

- **Push a `main`** (despliega T-144, T-62 y T-174).
- Pegar la consulta de R-49 en el Logs Explorer y anotar el resultado.
- Visto bueno para T-176 (piloto generativo) y para T-177 (el agente propone la regla).
- Lo que ya estaba: Q-43, T-153, T-172, T-171, privilegios por defecto (`085`), T-79, T-145, T-131.

## Lecciones

- **Un `watch` olvidado ensucia el artefacto versionado.** El `app.js` del árbol era de
  desarrollo; commitearlo habría publicado 10 MB de build dev. Antes de commitear `app.js`, mirar
  la primera línea (`CLOSURE_BASE_PATH` = dev).
- **Una señal estadística responde la pregunta que mide, no la que uno quiere.** Person-fit mide
  coherencia; la trampa total es coherente.

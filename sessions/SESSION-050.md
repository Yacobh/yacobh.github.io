# SESSION-050

## Fecha

2026-09-23

## Participantes

- Humano: Jacobo Córdova (owner), solo al principio
- Agente / modelo: Claude Code (Opus 5.5), sin supervisión

## Objetivo de la sesión

El owner pidió leer la documentación y decir qué tareas podía hacer el agente sin supervisión. El
agente propuso diez, con cuatro condiciones: trabajar en una rama, no aplicar migraciones, no tomar
decisiones del owner, y que todo fuera verificable. El owner respondió *«dale hasta el 10»*.

## Contexto de entrada

- Rama: `main`, al día con `origin/main`. Commit inicial: `abc22ec` (Cerrar SESSION-049).
- Árbol limpio. Suite de referencia: **272 tests / 3072 assertions / 0 failures**.
- Documentos leídos: `CLAUDE.md`, `HANDOFF` (congelado en el 2026-08-16), `AGENT_INSTRUCTIONS`,
  `CURRENT_STATUS` (bloques fechados), `SESSION-049`, las fichas de `BACKLOG` de las diez tareas,
  ADR-030, ADR-034, ADR-040, `supabase/SCHEMA.md`.
- Bloqueos al empezar: ninguno.

## Actividades realizadas

Todo en la rama **`trabajo-autonomo-g2`**, un commit por intención.

1. **T-170 (1), medida.** `next_question` sirve solo ítems a ≤ 2 logits de θ, y cada banco de
   `electronica` tiene sus 16 etiquetas en ~1,1 logits. En los cinco bancos, el θ final de las
   corridas agotadas es `max(b) + 2` menos una décima. Sin el tope de 0,4, el MAP de seis aciertos
   daría 0,87 ± 1,48: el paso fijo no es la causa de fondo.
2. **T-76, cerrada (D-76).** `universo.irt.calibracion` (JML penalizado, prior en la etiqueta),
   ejecutable de node, consulta con exclusiones escritas y documento de la corrida en
   `docs/calibracion/`. Dos defectos que destapó la primera corrida real: un ciclo de Fisher scoring
   en `electronica_notacion` (arreglado con ascenso garantizado) y etiquetas buscadas por el banco del
   test en vez de por id. La comprobación cruzada salió bien: #1108 y #1112 son los que más suben, y
   son los mismos que `/aula` mostró como más fallados.
3. **T-171, mitad.** `contenido/items/diagnostico.json` como espejo de la base. Los auditores
   encontraron 50 de 64 claves en A, 60 Bonus fuera de ADR-033 y el tramo [2, 3) con un ítem. El
   generador de migraciones ahora rechaza un espejo.
4. 🔺 **R-49.** Al medir `relacl` para T-163 apareció la vista del agente con los privilegios por
   defecto y sin RLS. Se confirmó con un `HEAD` de solo conteo como `anon` (635 filas; `tests`
   directo, 0). Se escribió `084` y **se avisó al owner con una notificación en el momento**.
5. **T-163.** `085`: cada rol con los verbos que sus policies contemplan. Se verificó en
   PostgreSQL 17 con los `relacl` reales (idempotente, reversión exacta).
6. **T-106.** `086`: 28 copias duplicadas con `active = false`. Se verificó sobre una copia de
   `questions`.
7. **T-48, cerrada.** `000_baseline.sql`, stub de Supabase, huella del catálogo y
   `reconstruir_esquema.sh`: **442 de 442** hechos iguales a producción, y la comparación detecta una
   columna plantada.
8. **T-11, cerrada.** `supabase/pruebas/rls.sql` + `verificar_rls.sh`, con ocho invariantes y dos
   regresiones plantadas que la hacen fallar. El filtro de cupos por banda se informa como
   pendiente (T-49), porque no existe en la base.
9. **T-144, cerrada.** `rastro/claves-del-diagnostico`. Deja fuera la clave `email` del
   `default-db`, que había dejado el correo en 348 jsonb.
10. **T-62, cerrada.** `universo.tablas-md` + `resource-card`: 10 recursos publicados con tablas.
11. **T-43** estaba resuelta desde `648e444` (la ficha nombraba mal la función). **T-33**:
    `PROJECT_SUMMARY.md` archivado en `docs/historico/`.
12. Bundle y CSS compilados y commiteados (T-144 y T-62 no dependen de ninguna migración).
13. **HANDOFF reescrito** como foto del 2026-09-23.

**Lo que no funcionó, y vale anotar:**

- **Un heredoc sin comillas se volvió a comer backticks**, dos veces: en un comentario de test y en
  las notas del JSON. Es lo mismo que anotó SESSION-049; pasa cuando el heredoc necesita interpolar
  una variable. La salida fue pasar la variable por el entorno y citar el heredoc.
- **El primer test de regresión del ciclo era sintético y pasaba sin el arreglo** (L-73).
- **Un `git add` con una ruta vieja y el `stderr` redirigido** dejó un commit con solo el
  renombrado (L-74). Se completó con `--amend`, porque la rama es local.
- **Dos afirmaciones mías eran falsas y se corrigieron antes de cerrar.** «Quien marca siempre A
  acierta 3 de 4» (ADR-030 baraja las alternativas en pantalla) y «cuatro cursos» (fueron tres).
- `pg_dump --schema-only` no funciona con `claude_ro`: necesita bloquear tablas que ese rol no
  lee. El baseline se reconstruyó desde el catálogo.
- `initdb` falla con el locale del sistema y con una ruta de socket de más de 103 bytes. Funcionó
  con `--locale=C` y `unix_socket_directories=''`.

## Archivos revisados

- `src/universo/components/tetha.cljs`, `motor.cljs`, `events/test.cljs` (flujo de selección y de
  guardado), `db/crud.cljs` (`next-question`), `irt/progress.cljs` (ventanas 1,0 y 2,0)
- `supabase/migrations/057` (`next_question` vigente), `080` (policies del profesor), `006`
  (trigger del último admin)
- `supabase/admin_rls.sql`, `guestbook_tri_state.sql`, `acceso_del_agente.sql`,
  `acceso_correccion_tests_pii.sql` — el origen de lo que el baseline absorbe
- `src/universo/rastro.cljs` (lista blanca que se reutilizó), `intento.cljs`, `cohorte.cljs`,
  `events/{dashboard,admin,plan}.cljs` (quién lee `tests.test`)
- `components/math_render.cljs`, `components/plan.cljs`, `adr/ADR-030`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/irt/calibracion.cljs`, `calibracion_cli.cljs` + test | **Nuevos** (T-76) |
| `shadow-cljs.edn` | Build `:calibracion` (node-script, fuera del bundle) |
| `scripts/calibrar_banco.sh`, `supabase/queries/T-76_datos_de_calibracion.sql` | **Nuevos** |
| `docs/calibracion/T-76_primera_corrida_2026-09-23.md` | **Nuevo** |
| `contenido/items/diagnostico.json` | **Nuevo**, espejo (T-171) |
| `scripts/generar_migracion_items.py` | Rechaza espejos |
| `supabase/migrations/084`, `085`, `086` | **Nuevas, sin aplicar** |
| `supabase/migrations/000_baseline.sql`, `supabase/baseline/stub_supabase.sql`, `supabase/queries/huella_del_esquema.sql`, `scripts/reconstruir_esquema.sh` | **Nuevos** (T-48) |
| `supabase/pruebas/rls.sql`, `scripts/verificar_rls.sh` | **Nuevos** (T-11) |
| `src/universo/rastro.cljs`, `events/test.cljs` + test | Lista blanca de `tests.test` (T-144) |
| `src/universo/tablas_md.cljs` + test, `components/plan.cljs` | Tablas en recursos (T-62) |
| `public/js/app.js`, `public/css/app.css` | Compilados |
| `PROJECT_SUMMARY.md` → `docs/historico/` | Archivado (T-33) |
| `supabase/SCHEMA.md` | `000`, `084`, `085`, `086` y las claves de `tests.test` |
| `project-memory/*` | HANDOFF, CURRENT_STATUS, BACKLOG, RISKS (R-49, R-48), DECISIONS (D-76, P-10), LESSONS (L-72…L-74), OPEN_QUESTIONS (X-07), AGENT_INSTRUCTIONS, `docs/README.md` |

## Comandos ejecutados y resultados

```
clj -M:test (inicio)                     → 272 tests / 3072 assertions / 0 failures
clj -M:test (cierre)                     → 291 tests / 3133 assertions / 0 failures
scripts/calibrar_banco.sh <dir>          → 14 bancos, todos convergen (notacion en 34 iteraciones)
HEAD /rest/v1/tests_sin_identidad (anon) → content-range 0-634/635      ← R-49
HEAD /rest/v1/tests (anon)               → content-range */0
084+085 ×2 sobre PG17 desechable         → idempotentes, sin D/x/t, reversión exacta
086 ×2 sobre copia de questions (1.138)  → 28 inactivas, 0 repetidos, reversión idéntica
scripts/reconstruir_esquema.sh 5599      → 89 archivos aplicados; 442/442 hechos iguales
scripts/verificar_rls.sh 5599            → 8 ok · 1 pendiente (T-49)
  con 2 regresiones plantadas            → falla en las dos, con el mensaje correcto
audit_paleta · dark_theme · movil · contraste → verdes
npx shadow-cljs release app              → 0 warnings
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Calibración por JML penalizado con prior en la etiqueta | No (D-76) | [[../project-memory/DECISIONS]] D-76 |
| `084` va separada de `085` para que el owner la aplique en diez segundos | No | cabecera de `084` |
| Cortar los privilegios por defecto del esquema **no** se incluye | No | `085`, decisión del owner |
| `PROJECT_SUMMARY.md` se archiva (no puntero) | No (P-10) | DECISIONS P-10 |
| Las tablas se resuelven en el renderizador, no reescribiendo 10 cuerpos | No | `universo.tablas-md` |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| R-49: la vista del agente se lee con la anon key | 🔺 Alta hasta `084` | [[../project-memory/RISKS]] R-49 |
| El techo de θ en `electronica` es del banco | Alta (ya era R-48) | R-48, nota 2026-09-23 |

## Bloqueos

Ninguno para el agente. `084`, `085` y el merge son del owner.

## Preguntas abiertas nuevas

Ninguna nueva en OPEN_QUESTIONS. Queda anotada en R-49 una cosa a decidir: si la ventana del
2026-09-18 a la aplicación de `084` amerita revisar los logs de la API.

## Supuestos aplicados

- σ_b = 1 como ancho del prior de la etiqueta (D-76). La corrida con σ_b = 2 conserva la dirección
  en 58 de 59 ítems de `diagnostico`.
- Que el orden de aplicación fue el de `SCHEMA.md` con los dos scripts de acceso entre `067` y
  `068`. La reconstrucción idéntica lo respalda.

## Próximos pasos

1. **Aplicar `084`** (T-173).
2. Revisar y mergear `trabajo-autonomo-g2`; el bundle ya está compilado.
3. Aplicar `085` y recorrer el funnel una vez.
4. Aplicar `086`.
5. T-172: abrir el rango de `electronica` con criterio.

## Pendientes

- **Nada está pusheado.** La rama existe solo en esta máquina.
- T-62 no se miró renderizado en un navegador.

## Actualizaciones requeridas en Project Memory

Hechas en esta misma sesión: CURRENT_STATUS, BACKLOG, RISKS, DECISIONS, LESSONS_LEARNED,
OPEN_QUESTIONS, HANDOFF, AGENT_INSTRUCTIONS, `supabase/SCHEMA.md`, `graphify update .` y el snapshot
en `project-memory/graph/`.

## Notas

- ⭐ **El hallazgo más importante salió de una tarea de higiene.** T-163 era «acotar privilegios que
  no son explotables hoy», y listar `relacl` de todo `public` mostró la única relación en la que sí
  lo eran. Misma familia que L-46: el acceso del agente vuelve a destapar lo que la documentación
  del esquema no decía.
- **El baseline hace posible staging (T-09).** Antes, un proyecto Supabase nuevo no se podía
  poblar desde el repositorio; ahora el esquema sí (el contenido todavía no).

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/HANDOFF]] ·
[[../project-memory/BACKLOG]] T-76, T-170, T-171, T-172, T-173, T-163, T-106, T-48, T-11, T-144, T-62 ·
[[../project-memory/RISKS]] R-48, R-49 · [[../project-memory/DECISIONS]] D-76

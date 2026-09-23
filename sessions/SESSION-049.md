# SESSION-049

## Fecha

2026-09-22

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code (Opus 5.5)

## Objetivo de la sesión

El owner llegó con una noticia: *«hoy otro curso presentó el diagnóstico»*. No pidió nada concreto.
La sesión fue medir ese curso, y lo que salió de medirlo fueron **cuatro defectos del banco
`diagnostico`**. El owner los fue aprobando uno por uno: «avanza con el punto 1», con el 2 y con el 3.

## Contexto de entrada

- Rama: `main`
- Commit inicial: `f86f13d` (Cerrar SESSION-048)
- Estado del árbol al empezar: **limpio**
- Documentos de la memoria leídos: `CLAUDE.md`, `sessions/SESSION-048.md`, `CURRENT_STATUS`,
  `BACKLOG` (T-170, T-76, T-82, T-90, T-131, T-142, T-143, T-145, T-155), `RISKS` (R-47, R-48),
  `supabase/SCHEMA.md`, `supabase/acceso_correccion_tests_pii.sql`,
  `supabase/queries/T-130_mapa_de_errores_de_un_curso.sql`, `079`, `030`, skill `banco-de-items`
  y su `ejes-y-bandas.md`.
- Bloqueos vigentes al empezar: ninguno.

## Actividades realizadas

1. **Se midió el curso** con `claude_ro` sobre `tests_sin_identidad`: 28 estudiantes, 46
   diagnósticos, 12:27–13:05, banco `diagnostico`, 0 personas en común con los cursos del
   2026-09-21. La ventana salió limpia; **el owner creó la cohorte y le asignó profesora**.
2. **`081` — tres ítems le decían «Correcta» a quien se equivocaba.** En 55, 56 y 109 las `error_*`
   estaban corridas de letra. Barrido del banco activo completo: solo esos tres. Afectó a 7
   estudiantes del curso (10 en el histórico), y en `/aula` «Correcta» salía como la segunda idea
   errónea. Además de reescribir las 12 explicaciones, **se cambiaron cinco alternativas** cuyo
   número no sale de ningún error nombrable (defecto B de `079`). **Aplicada por el owner.**
3. **`082` — 28 de 64 ítems sin módulo**, entre ellos todo el álgebra: 485 de las 781 respuestas
   del curso no movían el plan. Se asignó ítem por ítem siguiendo cómo el banco ya clasifica ítems
   iguales (cuadrática → `ecuaciones` como `030`, factorizar → `polinomios` como `algebra.json`).
   **Aplicada por el owner.**
4. **Punto 3 medido antes de proponer nada.** 10 de 28 terminaron entre 2,3 y 3,0. Recalculado sin
   el clamp y con la posterior completa: el clamp solo explica 2 casos; el resto es un MAP legítimo
   con **intervalo del 95 % de ~[1,3, 4,9]**, porque arriba de 1,2 había 3 ítems. Frente a los
   bancos nuevos, `diagnostico` tenía **0 y 1 ítems** en los tramos −1..0 y 0..1.
5. **`083` — dificultad rehecha (D-75).** Las etiquetas eran un correlativo (1,00 · 1,01 · … ·
   1,20; «3x4» en 2,9). Escala de diagnóstico mixto, ordenada por contenido y pasos, comparada con
   ítems equivalentes de `algebra.json`/`numeros.json`, y **contrastada con un `b` estimado con θ
   fijo** sobre 978 respuestas, usado solo como alerta. Corrige de paso el enunciado 33.
   **Aplicada por el agente con `claude_ddl`, a pedido explícito del owner.**
6. **Simulación antes de aplicar** (150 corridas por nivel): el error típico baja en el medio
   (0,87 → 0,69 en θ = −1; 0,71 → 0,59 en θ = 0) y **no mejora arriba de 1**. Se entregó así, sin
   redondear a favor.
7. **Barrido del backlog con los datos del curso** (pedido del owner al cerrar): T-131 observación
   (1) medida, T-142 con reintentos, T-82 con el tercer error dominante, T-76 con el primer ensayo
   de estimación, T-143 con el uso del banco viejo. Nace **T-171**.

**Lo que no funcionó, y vale anotar:**

- **Un heredoc sin comillas ejecutó los backticks** de los comentarios SQL al generar `083`
  (`command not found: difficulty`…) y dejó comas dentro de comentarios. Se rehízo con
  `<<'EOF'`. Para generar SQL con backticks en los comentarios, el heredoc va **siempre citado**.
- La primera consulta por estudiante usó una columna que no existe (`student_key`); la vista
  expone `user_id`.

## Archivos revisados

- `src/universo/components/tetha.cljs` — MAP con Fisher scoring, tope de paso 0,4, clamp ±3
- `src/universo/motor.cljs` — qué define una versión del motor (modelo, prior, parada)
- `src/universo/intento.cljs` — `alternativas-por-id`: los intentos guardan su copia de las
  alternativas, así que cambiar opciones no reescribe el histórico
- `src/universo/topics.cljs` — `module-slugs` ya contenía los seis módulos que usa `082`
- `contenido/items/algebra.json`, `numeros.json` — la escala de referencia para `083`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `supabase/migrations/081_reparacion_de_tres_items_de_diagnostico.sql` | **Nueva.** `error_*` de 55, 56, 109 y cinco alternativas. ✅ aplicada (owner) |
| `supabase/migrations/082_modulo_de_los_items_de_diagnostico.sql` | **Nueva.** `module_id` de 28 ítems. ✅ aplicada (owner) |
| `supabase/migrations/083_dificultad_del_banco_diagnostico.sql` | **Nueva.** `difficulty` de los 64 ítems + enunciado 33. ✅ aplicada (agente) |
| `supabase/SCHEMA.md` | Entradas 79, 80 y 81 con verificación y estado |
| `project-memory/DECISIONS.md` | **D-75** |
| `project-memory/RISKS.md` | R-48: medición en `diagnostico` |
| `project-memory/LESSONS_LEARNED.md` | **L-71** |
| `project-memory/BACKLOG.md` | **T-171 nueva**; notas en T-170, T-131, T-142, T-82, T-76, T-143 |
| `project-memory/CURRENT_STATUS.md` | Fecha de corte y bloque de la sesión |

## Comandos ejecutados y resultados

```
081, 082, 083 contra PostgreSQL 17 desechable (datos copiados de producción)
  → dos pasadas idénticas en las tres; 0 filas fuera de `diagnostico`;
    reversión escrita al pie deja todo idéntico en las tres
revisar_redaccion_items.py (081, vía JSON temporal) → 0 errores, 3 avisos de enunciado imperativo
psql claude_ddl -1 -f 083   → UPDATE 64, UPDATE 1
verificación en producción  → reparto 26 · 10 · 6 · 8 · 13 · 1; 0 ítems sin módulo;
                              0 distractores activos que digan «Correcta»
```

Sin cambios de código: no se corrió `clj -M:test` ni se construyó el bundle.

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| `diagnostico` usa escala de diagnóstico mixto, no por eje | No (D-75) | [[DECISIONS]] D-75, `083` |
| `universo.motor/version` no sube por cambiar etiquetas de ítems | No | D-75 (ADR-034 ya lo define así) |
| Reemplazar alternativas que no diagnostican un error, en vez de explicarlas | No | `081` cabecera |
| El histórico no se reescribe: los intentos de hoy siguen mostrando «Correcta» | No | `081`, T-82 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| θ de `diagnostico` antes y después de `083` no comparable | Media | D-75, R-48 |
| Bancos sin JSON quedan fuera de todos los auditores | Media | L-71, T-171 |

## Bloqueos

Ninguno.

## Preguntas abiertas nuevas

Ninguna. Q-46 (qué θ vale con varios intentos) recibió datos nuevos en T-142, no respuesta.

## Supuestos aplicados

- Que `diagnostico` elige ítems por topic y no por módulo, así que `082` no cambia qué ítems ve un
  test. Verificado en `test_configs` y en la selección.

## Próximos pasos

1. **T-171** — `contenido/items/diagnostico.json` con los 64 ítems, para que entre a los auditores,
   y ítems en [2, 3].
2. **T-131** — escribir las observaciones (2) y (3) de este curso: qué cara puso la profesora y qué
   preguntaron los estudiantes. Solo el owner puede.
3. **Verificar que la profesora entra a `/aula`** y ve solo su cohorte (cierra T-79).
4. **T-170 (2)** — el paso fijo de 0,4 sigue sin decidir.

## Pendientes

- **Falta publicar** (push) los commits de esta sesión.

## Notas

- ⭐ **El valor de la sesión salió de leer los resultados del curso, no de ningún auditor** (L-71).
  Los tres defectos de contenido estaban en producción desde antes de SESSION-048 y ninguno de los
  ocho auditores podía verlos.
- **Separar el estimador del banco fue lo que evitó el arreglo equivocado.** El pedido natural era
  «ampliar el clamp» o «quitar el tope de paso»: recalcular sin clamp mostró que solo movía 2 de 10
  casos y que ninguna de las dos cosas agrega información. Es la advertencia de T-170 («no cerrar
  esto con subamos `max_items`») aplicada a otra perilla.
- **El `b` con θ fijo es circular** —θ salió de las etiquetas viejas— y por eso se usó para mover
  valores hacia el dato y nunca para adoptarlo. En un test adaptativo el porcentaje de acierto
  crudo por ítem no sirve para ordenar dificultades: el test apunta a que todos acierten ~60 %.
- **Para levantar un PostgreSQL desechable**, el camino de SESSION-048 sigue valiendo (TCP en 5599,
  socket vacío). Para migraciones de contenido basta copiar las columnas que tocan con
  `copy ... to stdout | copy ... from stdin` desde `claude_ro`.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/BACKLOG]] T-170, T-171 ·
[[../project-memory/RISKS]] R-48 · [[../project-memory/DECISIONS]] D-75 ·
[[../project-memory/LESSONS_LEARNED]] L-71

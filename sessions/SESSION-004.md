# SESSION-004

## Fecha

2026-08-02

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Sonnet 5)

## Objetivo de la sesión

Empezó como continuación de contenido pedagógico (T-01/BL-01): convertir la numeración de los
libros de Baldor (Aritmética, luego Álgebra) en recursos originales para "Mi plan". Se extendió,
a pedido del usuario, a una auditoría completa de `project-memory/` en busca de incoherencias
entre lo documentado y la realidad (código y decisiones ya tomadas), y terminó con una revisión
del precio de las clases ($6.000 → $10.000 CLP/hora, D-32). El objetivo cambió dos veces, ambas
a pedido explícito del usuario, no por deriva del agente.

## Contexto de entrada

- **Rama:** `fix-scroll-transicion-navegacion`
- **Commit inicial:** `ac9295b`
- **Estado del árbol al empezar:** limpio
- **Documentos de la memoria leídos:** prácticamente toda `project-memory/` a lo largo de la
  sesión (ver "Archivos revisados")
- **Bloqueos vigentes al empezar:** BL-01 (contenido pedagógico), como en sesiones anteriores

## Actividades realizadas

1. **Migración `018_baldor_resources.sql`** (track `aritmetica`, 20 recursos): el usuario subió
   el PDF de la Aritmética de Baldor al scratchpad. Se estableció como regla dura, tras discusión
   explícita con el usuario, **no transcribir** el libro (derechos de autor vigentes) — solo usar
   su numeración de apartados como cita bibliográfica, y redactar contenido original calibrado a
   PAES M1. Se instaló `poppler` para poder leer el PDF, se extrajo el índice vía `pdftotext` +
   verificación visual de páginas ancla, se mapeó a los 6 módulos `aritmetica/*`, y se redactó el
   contenido con KaTeX (confirmado que `plan.cljs` lo renderiza vía `math/latex`).
2. **Migración `019_baldor_algebra_resources.sql`** (track `algebra`, 19 recursos): mismo proceso
   con el PDF de Álgebra, subido después. Cierra un hueco que había quedado abierto en `018`: la
   Aritmética de Baldor no cubre números con signo (solo "enteros" en el sentido de no
   fraccionarios); el Álgebra sí trae esa sección, así que se agregó como recurso de
   `aritmetica/enteros` y se corrigió el `historical_blurb` del módulo. El usuario dio
   autonomía explícita ("toma las decisiones por mi que hagan falta") para este segundo tramo.
3. **Correcciones de contenido pedidas por el usuario tras revisar `018`:** quitar todas las
   menciones a "PAES" del `body`/título de los recursos (el banco de ítems es un activo que debe
   poder reutilizarse fuera del contexto de un examen chileno específico — se mantuvieron en
   comentarios internos de la migración, que sí documentan el motivo de alcance); corregir
   separador de miles (punto, no coma, en español) en varios números; una frase puntual
   ("más se olvida" → "debemos recordar"). Se aplicaron a ambas migraciones.
4. **Contexto histórico investigado y agregado a los 33 recursos que no lo tenían:** a pedido del
   usuario, se usó `WebSearch` para verificar ~15 datos históricos (símbolos +/−/×/÷, Al-Juarismi,
   Diofanto, Brahmagupta, Fibonacci, Simon Stevin, tablilla YBC 7289, Apolonio de Perga, Nicolás de
   Oresme, Nine Chapters/fangcheng, Eudoxo, Servois/conmutatividad, etc.) antes de escribirlos,
   para no inventar fechas o atribuciones. Se documentó como idea futura (T-37, BACKLOG) llevar
   esto a un campo estructurado (fecha/época) para una línea de tiempo, distinto del texto libre
   actual de `historical_context`.
5. **Auditoría de coherencia de `project-memory/`** (a pedido explícito del usuario, en dos
   rondas): se encontraron y corrigieron, en ~20 archivos:
   - Conteos incorrectos que el propio agente había escrito (19 vs 21 recursos en `019`, 39 vs 41
     total, 7 vs 6 módulos de geometría sin fuente).
   - `012_slot_cancellation_notification.sql`/`013_profile_contact_preference.sql` marcadas como
     no aplicadas en el checklist de go-live y en `BACKLOG` T-25/T-36, pese a que `CURRENT_STATUS`
     ya registraba que el owner las había aplicado el 2026-07-30 — desincronización preexistente,
     no causada por esta sesión.
   - **Google OAuth** (`sign-in-with-google`) descrito como funcional en 7 archivos, cuando el
     código confirma que es una función sin ningún llamador — código muerto. Corregido en todos.
   - **UNAP**: varios archivos (`CLAUDE.md`, `BUSINESS_CONTEXT`, `PROJECT_BRIEF`, `DEPENDENCIES`,
     `CURRENT_STATUS`, `RISKS`, `ASSUMPTIONS`) seguían describiendo a la UNAP como iniciativa
     académica activa / patrocinador, pese a que D-18 (2026-07-28) ya la había bajado a nota
     histórica de un convenio terminado. El usuario confirmó que D-18 sigue vigente y se propagó
     esa caracterización a todos.
   - **Precio de las clases**: `PROJECT_BRIEF` §6 y `BUSINESS_CONTEXT` §5 seguían diciendo "no hay
     pagos ni intención de agregarlos", cuando D-19/D-26 (2026-07-28/30) ya habían fijado un
     precio. Se corrigió en 8 archivos, incluida `VISION_LIBRO_PROYECTO` §4.4 (que decía
     explícitamente "no se marca como resuelta" sobre una tensión que ya estaba resuelta).
   - Número de referencia de tests desactualizado ("129 assertions") en 6 archivos — verificado
     en vivo con `clj -M:test`: son **133**.
   - Lista de migraciones duplicada y desactualizada en `TECH_STACK.md` (llegaba solo hasta `007`)
     y `HANDOFF.md` (decía "9 scripts", van 19) — ambas reemplazadas por un puntero a
     `supabase/SCHEMA.md`, que es la lista que sí se mantiene al día.
6. **P-11 (¿abrir épica de negocio nueva para roadmapear la visión de largo plazo?):** se
   presentó al usuario, que decidió dejarla pendiente por ahora ("todavía no, quiero seguir
   revisando incoherencias primero"). Sigue sin decidir, correctamente registrada en
   `DECISIONS.md` §3.
7. **Revisión de precio (D-32):** el usuario preguntó si $6.000 CLP/hora era muy bajo. Se
   argumentó que el número original (D-26) se había anclado contra el benchmark equivocado
   (clases particulares 1:1, ~$8.000–$20.000/hora) en vez del comparable real para un formato
   grupal (preuniversitario tradicional, ~$80.000–$120.000/mes ≈ $7.000–$15.000/hora
   equivalente). El usuario confirmó subirlo a **$10.000 CLP/hora**. Se registró como D-32 (nueva
   decisión, sin borrar ni editar D-26 — se marcó como revisada) y se propagó a los 8 archivos que
   ya mencionaban el precio anterior, más el nuevo número en `OPEN_QUESTIONS` Q-02 y X-08.

Lo que **no se hizo**: aplicar `018`/`019` en Supabase real (eso lo hizo el usuario mismo durante
la sesión, confirmado por él, no por el agente); publicar ningún recurso (siguen todos
`published = false`, pendientes de revisión pedagógica); implementar el cobro de $10.000/hora en
el código (sigue sin pasarela de pago, T-04); resolver P-11.

## Archivos revisados

Prácticamente todo `project-memory/` (`PROJECT_BRIEF`, `BUSINESS_CONTEXT`, `CURRENT_STATUS`,
`RISKS`, `BACKLOG`, `ROADMAP`, `ARCHITECTURE`, `DEPENDENCIES`, `HANDOFF`, `REQUIREMENTS`,
`ASSUMPTIONS`, `OPEN_QUESTIONS`, `DECISIONS`, `TECH_STACK`, `LESSONS_LEARNED`, `TERMINOLOGY`,
`AGENT_INSTRUCTIONS`, `INDEX`, `VISION_LIBRO_PROYECTO`, `AVISO_PRIVACIDAD_BORRADOR`,
`OBSIDIAN_WORKSPACE_GUIDE`, `GRAPHIFY_INTEGRATION_GUIDE`, `RTK_INTEGRATION_GUIDE`), más
`supabase/SCHEMA.md`, `supabase/CONTENT.md`, `supabase/migrations/002_seed_modules.sql`,
`src/universo/components/login.cljs`, `src/universo/supabase.cljs`, `src/universo/components/plan.cljs`,
`src/universo/components/math_render.cljs`, `index.html`, `public/index.html`,
`src/universo/components/landing.cljs`, `src/universo/home.cljs`.

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `supabase/migrations/018_baldor_resources.sql` | **Nuevo.** 20 recursos originales, track `aritmetica` |
| `supabase/migrations/019_baldor_algebra_resources.sql` | **Nuevo.** 19 recursos originales, track `algebra` + cierre de hueco de enteros con signo |
| `supabase/SCHEMA.md` | Documentación de `018`/`019`; orden de aplicación |
| `supabase/CONTENT.md` | Fila nueva para `018`/`019` |
| `CLAUDE.md` | UNAP reescrito (proyecto personal, no iniciativa activa); conteo de tests corregido |
| `project-memory/PROJECT_BRIEF.md` | Google OAuth, UNAP, exclusión de pagos, conteo de tests |
| `project-memory/BUSINESS_CONTEXT.md` | UNAP (§1, B-07, §7, §8), modelo económico (§5), Google OAuth |
| `project-memory/CURRENT_STATUS.md` | Notas de sesión (Baldor, conteos), checklist go-live (012/013), BL-03 (UNAP/D-27) |
| `project-memory/BACKLOG.md` | T-01 (nota de progreso), T-25/T-36 (`hecho`), T-37 (nueva, idea de línea de tiempo), conteos |
| `project-memory/DECISIONS.md` | D-26 marcada revisada; **D-32 nueva** (precio $10.000) |
| `project-memory/OPEN_QUESTIONS.md` | Q-02 (revisión de precio), Q-09 (cruce con Q-24), X-08 (parcialmente resuelta) |
| `project-memory/ARCHITECTURE.md` | Google OAuth (×3 lugares) |
| `project-memory/DEPENDENCIES.md` | Google OAuth (×2), UNAP |
| `project-memory/HANDOFF.md` | Google OAuth, UNAP, pagos, conteo de migraciones, conteo de tests |
| `project-memory/REQUIREMENTS.md` | RF-1.2 (Google OAuth, 🟡→⛔), CU-01, C-10 (pagos) |
| `project-memory/ROADMAP.md` | F0 (Google OAuth), F8 (Q-02/Q-04 respondidas) |
| `project-memory/TECH_STACK.md` | Lista de migraciones duplicada → puntero a SCHEMA.md; conteo de tests |
| `project-memory/TERMINOLOGY.md` | Definición de "Freemium" (ya hay tramo de pago) |
| `project-memory/LESSONS_LEARNED.md` | Conteo de tests |
| `project-memory/AGENT_INSTRUCTIONS.md` | Conteo de tests |
| `project-memory/RISKS.md` | R-05 (framing UNAP) |
| `project-memory/ASSUMPTIONS.md` | A-03 (badge UNAP ya no activo) |
| `project-memory/VISION_LIBRO_PROYECTO.md` | §4.4 marcada resuelta (precio); precio actualizado a $10.000 |
| `sessions/SESSION-004.md` | **Nuevo**, este archivo |

## Comandos ejecutados y resultados

```
clj -M:test         → 34 tests / 133 assertions / 0 failures / 0 errors (verificado en vivo, no solo citado)
brew install poppler → instalado (pdftotext/pdfinfo, necesario para leer los PDF de Baldor)
graphify update .    → no ejecutado (no cambió código .cljs esta sesión, solo SQL y Markdown)
npx shadow-cljs release app → no ejecutado (sin cambios de ClojureScript)
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| No transcribir los libros de Baldor; usar solo su numeración como cita bibliográfica | No (política de contenido, no arquitectura) | Cabecera de `018_baldor_resources.sql` |
| Alcance de `019` acotado a PAES M1 (sin radicales complejos, ecuaciones de grado superior ni logaritmos) | No | Cabecera de `019_baldor_algebra_resources.sql` |
| Precio de clase revisado de $6.000 a $10.000 CLP/hora | Sí — decisión menor con razonamiento extenso | `DECISIONS.md` D-32 |
| P-11 (épica de visión de largo plazo) queda sin decidir por ahora | No es una decisión, es aplazar una | `DECISIONS.md` §3, sin cambios |

## Riesgos identificados

Ninguno nuevo con ID propio. La auditoría de coherencia reduce indirectamente el riesgo de que un
agente futuro (o el propio owner) actúe sobre información desactualizada — no había un R-NN que
cubriera "la memoria puede desincronizarse de las decisiones ya tomadas" como riesgo explícito;
podría valer la pena uno si esto vuelve a pasar.

## Bloqueos

Ninguno nuevo. Los de siempre (BL-01 contenido, BL-02 email, BL-03 cupos reales) siguen vigentes;
T-01 avanzó (contenido redactado) pero sigue bloqueada por revisión humana pendiente.

## Preguntas abiertas nuevas

Ninguna pregunta nueva en el sentido de Q-NN. Se resolvió parcialmente X-08 (contradicción del
libro vs. MVP) en la tabla de contradicciones de `OPEN_QUESTIONS.md`.

## Supuestos aplicados

Ninguno relevante para `ASSUMPTIONS.md` — todas las correcciones de esta sesión se verificaron
contra código real (`grep`/`Read`), contra `clj -M:test` en vivo, o contra confirmación explícita
del usuario (D-18 vigente, precio $10.000, P-11 pendiente). Donde faltó certeza (algunos datos
históricos de contexto), se investigó con `WebSearch` antes de escribir, no se asumió.

## Próximos pasos

1. **Revisar el contenido pedagógico de `018`/`019` línea por línea** (matemática y ahora también
   precisión histórica) y publicar selectivamente desde Admin → Recursos — T-01 sigue sin cerrar
   hasta que esto pase.
2. Si aparece el volumen de **Geometría de Baldor**, repetir el mismo proceso para los 7 módulos
   `geometria/*` que siguen sin fuente.
3. Implementar el cobro de $10.000 CLP/hora en copy/UI (T-04) — sigue sin pasarela de pago.
4. Decidir P-11 cuando el usuario quiera retomarlo (épica de negocio para la visión de largo
   plazo, o seguir fase por fase).
5. Seguir con lo que ya estaba en la lista de "Próximos pasos inmediatos" de `CURRENT_STATUS.md`
   §8 (T-02 email, T-04 cupos reales, endurecimiento T-06/T-07).

## Pendientes

- `graphify update .` no se corrió — no hubo cambios de código ClojureScript esta sesión (solo SQL
  nuevo y Markdown), así que no hay nada nuevo que el grafo deba indexar salvo las dos migraciones
  SQL nuevas y los `.md` (que sí indexa). Recomendado correrlo en la próxima sesión igual, por
  higiene.
- `public/js/app.js` aparece modificado en `git status` (1 línea) con timestamp anterior al inicio
  de esta sesión — no se investigó a fondo el origen porque no se tocó ningún `.cljs`; no parece
  causado por este trabajo. Verificar con `git status` antes de cualquier commit que lo incluya
  (regla L-30).
- Ningún archivo modificado en esta sesión fue commiteado — todo sigue en el árbol de trabajo.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [ ] `project-memory/RISKS.md` — se tocó un framing (R-05), pero no se abrió un riesgo nuevo con ID propio; ver "Riesgos identificados"
- [x] `project-memory/DECISIONS.md`
- [ ] `adr/ADR-0NN-….md` (nuevo) — D-32 se consideró decisión menor, no ameritó ADR propio
- [ ] `project-memory/ARCHITECTURE.md` — se corrigió Google OAuth pero no cambió estructura ni flujo, solo precisión de estado
- [x] `project-memory/ROADMAP.md`
- [x] `project-memory/REQUIREMENTS.md`
- [x] `project-memory/OPEN_QUESTIONS.md`
- [x] `project-memory/ASSUMPTIONS.md`
- [ ] `project-memory/LESSONS_LEARNED.md` — se corrigió un número, no hay lección nueva que extraer de esta sesión más allá de lo ya registrado
- [x] `project-memory/TERMINOLOGY.md`
- [ ] `project-memory/graph/` (snapshot de Graphify) — pendiente, ver "Pendientes"

## Notas

Dos decisiones de esta sesión vinieron de que el propio agente cometiera errores en sesiones/turnos
anteriores dentro de la misma conversación (conteos de recursos mal sumados, framing de PAES sin
pedirlo el usuario) y el usuario los detectara al revisar. Vale la pena, en sesiones futuras que
generen contenido en volumen (varios `insert` en una migración, varios archivos tocados en
paralelo), contar programáticamente (`grep -c`) en vez de sumar de memoria antes de escribir el
número en la documentación — así se habría evitado el error de 19 vs. 21 desde el principio.

La auditoría de coherencia mostró un patrón repetido: cuando el owner toma una decisión de negocio
en una sesión (UNAP, precio, plataforma de videollamada), esa decisión queda bien registrada en
`DECISIONS.md`/`OPEN_QUESTIONS.md`, pero no siempre se propaga a los documentos "descriptivos"
(`PROJECT_BRIEF`, `BUSINESS_CONTEXT`, `HANDOFF`, `ROADMAP`...) que la citan. Ninguno de estos casos
era una decisión mal tomada — todos eran de propagación incompleta. Sugerencia para el futuro: al
cerrar una decisión nueva en `DECISIONS.md`, `grep` el tema (ej. "UNAP", "pago") en el resto de
`project-memory/` antes de dar la sesión por cerrada, no solo actualizar el archivo donde se
originó la decisión.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../project-memory/BACKLOG]] · [[../project-memory/OPEN_QUESTIONS]] · [[../project-memory/DECISIONS]] ·
`../prompts/session-close-memory-update.md`

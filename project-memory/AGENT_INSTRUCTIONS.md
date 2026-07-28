# AGENT_INSTRUCTIONS

Última actualización: **2026-07-26**

Reglas obligatorias para **cualquier** agente de IA que trabaje en este repositorio (Claude Code
CLI, Cursor, u otro). Un humano también puede seguirlas: no hay nada aquí que sea específico de una
herramienta.

---

## 0. Regla fundamental: Project Memory First

> **La memoria del proyecto es la fuente de verdad. Se lee antes de actuar y se actualiza al
> terminar. Un cambio sin memoria actualizada es un cambio incompleto.**

De esto se derivan cuatro consecuencias que no son negociables:

1. **Antes de actuar, leer.** Nunca deducir el estado del proyecto solo del código: el código no dice
   qué está decidido, qué está bloqueado ni qué se probó y falló.
2. **No inventar.** Si falta un dato, va a [[OPEN_QUESTIONS]] como pregunta concreta. Un supuesto
   necesario va a [[ASSUMPTIONS]] marcado como supuesto.
3. **No borrar contexto.** La memoria se corrige y se anota, no se reescribe para que parezca que
   siempre supimos lo correcto. Los ADRs son inmutables: se reemplazan, no se editan.
4. **Terminar incluye documentar.** [[CURRENT_STATUS]] + `sessions/SESSION-XXX.md` como mínimo.

---

## 1. Reglas generales

1. **Orden de lectura obligatorio** al iniciar sesión (usa `../prompts/session-bootstrap.md`):
   `../CLAUDE.md` → [[HANDOFF]] → [[CURRENT_STATUS]] → [[ARCHITECTURE]] → [[DECISIONS]] →
   este archivo. Si el cambio es estructural, además `graph/GRAPH_REPORT.md`.
2. **Idioma:** documentación, comentarios y mensajes de commit en **español**. Los nombres de
   archivo de la memoria en `MAYUSCULA_CON_GUION_BAJO.md`, sin acentos ni espacios.
3. **Alcance:** haz lo pedido. Si detectas otro problema, regístralo en [[BACKLOG]] o
   [[OPEN_QUESTIONS]] en lugar de arreglarlo sin que te lo pidan.
4. **Cuando dos documentos se contradigan**, no elijas en silencio: registra la contradicción en
   [[OPEN_QUESTIONS]] §Contradicciones y sigue con lo que no dependa de esa ambigüedad.
5. **Precedencia de fuentes:** para *estado* gana [[CURRENT_STATUS]]; para *cómo está construido*
   gana [[ARCHITECTURE]]; para *por qué* gana el ADR; para *qué hace el código ahora mismo* gana el
   código. `PROJECT_SUMMARY.md` es histórico y **no** gana nunca.
6. **Reporta con honestidad.** Si un test falla, muestra la salida. Si no verificaste algo, dilo. Si
   no llegaste a terminar, di exactamente qué quedó fuera. No hay ningún valor en un informe
   optimista.
7. **No pushear ni mergear** a `main` sin que te lo pidan explícitamente: `main` es producción.

---

## 2. Antes de modificar código

**Obligatorio, en este orden:**

1. `git status` y `git log --oneline -5` — saber sobre qué estás construyendo. **Hoy el árbol está
   sucio** (`public/js/app.js`): no lo ignores.
2. Leer [[CURRENT_STATUS]] y los bloqueos activos.
3. Buscar si hay un ADR que cubra el área que vas a tocar ([[DECISIONS]] §1). **Si tu cambio
   contradice un ADR, no lo hagas: propón un ADR nuevo que lo reemplace.**
4. Revisar [[LESSONS_LEARNED]] — hay una alta probabilidad de que la trampa que vas a pisar esté
   descrita ahí.
5. Orientarse con `graphify query "<pregunta>"` (los hooks del repo lo exigen), sabiendo que
   **el grafo no indexa `.cljs`**: para lógica ClojureScript, usar [[ARCHITECTURE]] §2 como mapa y
   leer `src/` dirigidamente.
6. `clj -M:test` **antes** de tocar nada, para saber que partes de un estado verde.

**Reglas de implementación:**

- **Lógica pura primero.** Toda regla de negocio nueva va a un namespace puro y testeable
  (`universo.profile`, `universo.slots.logic`, `universo.irt.progress`,
  `universo.components.tetha`), **nunca** dentro de un `reg-event-fx` ni de un componente.
- **re-frame ortodoxo:** `reg-event-db` para estado puro, `reg-event-fx` + `reg-fx` para I/O,
  `reg-sub` para lectura. **Ningún componente llama a Supabase.**
- **Todo I/O nuevo va a `universo.db.crud`**, devolviendo `{:success … :data … :error …}`.
- **Namespace = ruta de archivo** (guion → guion bajo). shadow-cljs falla si no coincide.
- **Si creas un `events/*` nuevo, agrégalo al `:require` de `src/universo/core.cljs`** — si no, sus
  handlers no se registran y el `dispatch` falla **en silencio** (L-03).
- **Si agregas estado, agrégalo a `universo.db/default-db`** con un comentario de qué es.
- **Si agregas una sección de UI**, toca `home/main-content`, `db.cljs` y —si es privada—
  `protected-sections` en `events/auth.cljs`.
- **Escribe como el código de al lado:** misma densidad de comentarios, mismos nombres, mismos
  idiomas. Los comentarios explican el *por qué* (invariantes, salvaguardas), no el *qué*.
- **Nunca edites `public/js/app.js` a mano** (L-05).
- **No agregues dependencias** npm o maven sin registrar la decisión ([[DECISIONS]] §2 o un ADR).

**Al terminar:**

1. `clj -M:test` → **0 failures / 0 errors**. Si algo falla, arréglalo o repórtalo con la salida.
2. `graphify update .` si cambió código.
3. Actualizar la memoria (§7).

---

## 3. Antes de modificar infraestructura o base de datos

**Este es el área de mayor riesgo del proyecto: se trabaja sobre producción (R-02).**

1. **Leer `supabase/SCHEMA.md` completo**, en especial el orden de aplicación.
2. **Leer la migración existente** que toca las mismas tablas o policies. No escribir una nueva sin
   entender la anterior.
3. **Migraciones idempotentes, sin excepción** (L-12): `create table if not exists`,
   `create index if not exists`, `drop policy if exists` antes de `create policy`, upsert por clave
   natural. Numeración consecutiva `00N_descripcion.sql`.
4. **RLS en la misma migración que la tabla.** Toda tabla nueva:
   `alter table … enable row level security` + sus policies. Sin policy no hay acceso; con la policy
   equivocada hay fuga.
5. **Documentar en `supabase/SCHEMA.md`**: qué hace la migración, qué requiere y qué se rompe si no
   se aplica (el archivo ya tiene ese estilo — mantenerlo).
6. **Nunca poner secretos en el cliente.** `service_role`, `RESEND_API_KEY` y similares solo como
   Supabase secrets. La anon key en `src/universo/supabase.cljs` es pública **a propósito**.
7. **Cambios de policy → verificación manual mínima**: con una cuenta `user`, comprobar que no lee
   perfiles ajenos, no escribe `questions` y no ve cupos de otra banda; con una cuenta `admin`,
   comprobar que no puede degradarse a sí misma.
8. **"0 filas afectadas" es un síntoma de policy, no un éxito** (L-09). Verificar conteos.
9. **Cualquier cambio de esquema, policy o trigger → revisar [[ARCHITECTURE]] §3 y §7** y
   actualizarlo si corresponde.
10. **Cambios en Edge Functions:** probar la degradación (sin `RESEND_API_KEY` debe responder 503 y
    dejar la cola intacta) además del camino feliz.

---

## 4. Reglas de documentación

1. **Un hecho, un archivo.** Los demás lo referencian con `[[ENLACE]]`. Si te encuentras copiando un
   párrafo, enlaza en su lugar.
2. **Enlaces internos `[[ARCHIVO]]`** (compatibles con Obsidian y legibles en GitHub). Para archivos
   fuera de `project-memory/`: `[[../adr/ADR-001-…]]`.
3. **Fechas absolutas** (`2026-07-26`). Nunca "la semana pasada" ni "recientemente".
4. **Evidencia o marca de incertidumbre.** Toda afirmación técnica debe apuntar a un archivo, un
   commit o una tabla. Lo que no puedas evidenciar, márcalo explícitamente como supuesto o pregunta.
5. **No borres información desactualizada:** márcala (`✅ resuelto 2026-MM-DD`, `⛔ obsoleto`) para que
   se entienda la evolución.
6. **Actualiza el índice** ([[INDEX]]) si creas un documento nuevo de memoria.
7. **Si cambias copy de la landing o de la FAQ, cámbialo en los tres lugares** (`index.html`,
   `public/index.html`, `landing.cljs`) en el mismo commit (L-22). Y recuerda: **el copy es un
   requisito** (L-20).

---

## 5. Reglas de testing

1. `clj -M:test` **antes de commitear**. Sin CI, ese comando es la única red de seguridad (R-04).
2. **Toda función pura nueva o modificada necesita test.** Archivo `test/**/…_test.cljs`, namespace
   terminado en `-test` (el build `:test` los descubre con `:ns-regexp "-test$"`).
3. **Casos borde obligatorios** en lo que ya está probado así: bordes de banda de θ (−0,01 / 0 / 1 /
   2), `nil` en entradas (`filter-slots-for-band` con banda `nil` devuelve `[]`), listas vacías,
   conteos en 0.
4. **Reglas espejo:** si cambias una regla que también vive en SQL (confirmación de cupo, bandas),
   actualiza el test del namespace puro **y** anota en el código que la fuente de verdad es el
   trigger.
5. **Los warnings `:infer-warning` de `events/auth.cljs` son conocidos y benignos** (L-04). No los
   confundas con fallos ni silencies los warnings globalmente para taparlos.
6. Lo que **no** está cubierto y por lo tanto exige prueba manual: componentes de UI, `db/crud`,
   `events/admin`, efectos de `events/test`, la Edge Function y las policies RLS.
7. Estado de referencia: **34 tests / 129 assertions / 0 failures** (2026-07-26). Si el número baja,
   explica por qué.

---

## 6. Reglas de seguridad

1. **RLS es el único control de autorización.** Cualquier control en el cliente es UX.
2. **Nunca** un secreto en el bundle. La anon key y la URL de Supabase son la excepción deliberada
   (son públicas por diseño).
3. **Toda tabla nueva con RLS habilitada y sus policies en la misma migración.**
4. **No amplíes la recolección de datos personales** sin registrar la decisión y el riesgo: el
   público es mayoritariamente menor de edad y no hay aviso de privacidad publicado (R-06).
5. **No expongas `questions.correct_option` ni `error_*` más allá de lo necesario**: el banco de
   ítems es el activo del proyecto (R-16, Q-12).
6. **No commitees `.env`** ni credenciales. `.gitignore` ya las bloquea; no lo debilites.
7. **Antes de un cambio de permisos**, verifica los dos invariantes: "un estudiante solo ve lo suyo"
   y "nunca queda el sistema sin admin".
8. Si encuentras una vulnerabilidad, **no la publiques en un commit descriptivo**: regístrala en
   [[RISKS]] con lenguaje sobrio y arréglala.

---

## 7. Reglas de actualización de memoria

Al cerrar cualquier sesión con cambios (prompt completo en
`../prompts/session-close-memory-update.md`):

| Documento | Cuándo actualizarlo |
|-----------|---------------------|
| [[CURRENT_STATUS]] | **Siempre** que algo haya cambiado |
| `sessions/SESSION-XXX.md` | **Siempre**, desde `sessions/SESSION_TEMPLATE.md` |
| [[DECISIONS]] + `../adr/ADR-0NN-*.md` | Si se decidió algo con consecuencias (§8) |
| [[BACKLOG]] | Si se abrió, movió o cerró una tarea |
| [[RISKS]] | Todo riesgo nuevo o cambio de severidad |
| [[ARCHITECTURE]] | Si cambió estructura, tabla, integración, flujo o dependencia interna |
| [[ROADMAP]] | Si cambió una fase o un hito |
| [[OPEN_QUESTIONS]] | Preguntas nuevas; las respondidas se **marcan**, no se borran |
| [[ASSUMPTIONS]] | Supuestos nuevos; los validados/refutados se marcan con evidencia |
| [[LESSONS_LEARNED]] | Si algo costó más de 15 minutos de depuración |
| [[REQUIREMENTS]] | Si cambió un requisito o su estado de implementación |
| [[TERMINOLOGY]] | Si apareció un término nuevo del dominio o del código |
| `graph/` | Si cambió código: `graphify update .` + `cluster-only` + copiar el snapshot |

**Prohibido:** borrar contexto histórico, inventar datos, dejar dos documentos con versiones
contradictorias del mismo hecho, marcar algo como hecho sin haberlo verificado.

---

## 8. Reglas para crear ADRs

**Crea un ADR si la decisión** (a) cambia la arquitectura, (b) es difícil de revertir, (c) descarta
alternativas relevantes, o (d) alguien podría cuestionarla en seis meses. Si no cumple ninguna, va a
[[DECISIONS]] §2 como decisión menor.

**Procedimiento:**

1. Copiar `../adr/ADR-TEMPLATE.md` a `../adr/ADR-0NN-slug-descriptivo.md`.
2. Numeración consecutiva, **sin reutilizar números** (ni siquiera de ADRs rechazados).
3. Completar **todas** las secciones: Estado, Fecha, Contexto, Decisión, Alternativas Evaluadas
   (con la razón real del descarte), Consecuencias (buenas **y** malas), Riesgos, Seguimiento.
4. **Escribe el contexto como si el lector no supiera nada**: qué problema había, qué restricciones
   existían, qué se sabía y qué no.
5. Agregar la fila en [[DECISIONS]] §1.
6. Enlazar desde los documentos afectados.
7. **Nunca edites un ADR aprobado para cambiar la decisión**: crea uno nuevo y marca el anterior como
   `Reemplazada por ADR-0NN`.
8. Si documentas una decisión **retroactiva** (tomada antes de existir el registro), dilo
   explícitamente y marca el contexto como reconstruido.

---

## 9. Reglas para session logs

1. Un archivo por sesión: `sessions/SESSION-XXX.md`, numeración consecutiva de tres dígitos, desde
   `sessions/SESSION_TEMPLATE.md`.
2. **Se escribe al cerrar**, no durante (pero anota decisiones a medida que ocurren para no perderlas).
3. Completar todas las secciones de la plantilla. Si una no aplica, escribir "ninguna" — no borrarla.
4. **Lista los archivos revisados, no solo los modificados**: le ahorra a la siguiente sesión el
   trabajo de re-descubrir dónde está lo relevante.
5. **Registra lo que no funcionó.** Un intento fallido documentado vale tanto como un cambio exitoso.
6. Cierra con "Actualizaciones requeridas en Project Memory" y **ejecútalas** antes de terminar.

---

## 10. Reglas específicas de este repositorio

1. **`graphify` primero** (los hooks de `.claude/settings.json` lo exigen antes de `Bash|Grep` y
   `Read|Glob`), pero recuerda que **el grafo no indexa `.cljs`**: si una query devuelve "No matching
   nodes found", eso **no** significa que el código no exista (L-23).
2. **El bundle es el deploy.** Un cambio en `src/` sin `npx shadow-cljs release app` + commit del
   `app.js` **no llega a producción** (ADR-003).
3. **CSS:** `npm run build:css` si cambiaron clases de Tailwind. Cuidado con clases construidas
   dinámicamente: mantenlas como literales completos (L-06).
4. **`main` es producción.** Trabaja en rama y no mergees sin autorización explícita.
5. **No extiendas el código archivado** (`mathacademy*`, `improved_math_academy`) ni los namespaces no
   alcanzables (`jardin`, `particulas`, `physics`, `voz`, `battery`, `animations`, `test_subs`).
   Tampoco los borres sin decisión (P-09).
6. **`universo` es el nombre interno; "Academia Integral" el del producto.** No los mezcles en texto
   de cara al usuario.
7. **Migraciones idempotentes siempre** — se aplican a mano sobre producción.
8. **`clj -M:test`, no `npm test`** (este último está sin configurar y falla por diseño).

---

## 11. Checklist de cierre de sesión

- [ ] `clj -M:test` en verde (o el fallo reportado con su salida)
- [ ] Si cambió código: `npx shadow-cljs release app` y/o `npm run build:css` según corresponda
- [ ] `graphify update .` ejecutado
- [ ] [[CURRENT_STATUS]] actualizado
- [ ] `sessions/SESSION-XXX.md` creado y completo
- [ ] ADR creado si hubo una decisión relevante, y [[DECISIONS]] §1 actualizado
- [ ] [[BACKLOG]] / [[RISKS]] / [[ARCHITECTURE]] / [[ROADMAP]] actualizados si corresponde
- [ ] Preguntas nuevas en [[OPEN_QUESTIONS]]; supuestos nuevos en [[ASSUMPTIONS]]
- [ ] Sin secretos en el diff
- [ ] Enlaces `[[…]]` nuevos apuntan a archivos que existen
- [ ] Reporte final honesto: qué se hizo, qué se verificó, qué quedó pendiente y por qué

---

Relacionado: [[../CLAUDE]] · [[HANDOFF]] · [[LESSONS_LEARNED]] · [[DECISIONS]] ·
`../prompts/session-bootstrap.md` · `../prompts/session-close-memory-update.md`

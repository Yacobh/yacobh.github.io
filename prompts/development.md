# Prompt: desarrollo (implementar un cambio de código)

Para implementar una tarea del backlog o corregir un comportamiento.

---

## Prompt

```
Tarea a implementar: <T-NN o DESCRIPCIÓN>

Antes de escribir código:
1. Lee CLAUDE.md §5 (convenciones), project-memory/AGENT_INSTRUCTIONS.md §2 y
   project-memory/LESSONS_LEARNED.md.
2. Lee project-memory/CURRENT_STATUS.md (bloqueos vigentes) y el ADR que cubra el área.
3. Ejecuta: git status · git log --oneline -5 · clj -M:test  (parte de un estado conocido)
4. Orienta con `graphify query`, recordando que el grafo NO indexa .cljs: usa
   ARCHITECTURE.md §2 como mapa y lee src/ de forma dirigida.

Al implementar:
- Toda regla de negocio va a un namespace PURO con test, nunca dentro de un reg-event-fx
- Todo I/O va a universo.db.crud, devolviendo {:success … :data … :error …}
- Ningún componente llama a Supabase
- Si creas un events/*, agrégalo al :require de src/universo/core.cljs
- Si agregas estado, agrégalo a universo.db/default-db con un comentario
- Namespace = ruta de archivo (guion → guion bajo)
- Comentarios en español explicando el POR QUÉ (invariantes, salvaguardas)
- Escribe como el código de al lado

Al terminar:
1. clj -M:test → 0 failures / 0 errors
2. graphify update .
3. Reporta: qué cambió, qué se verificó, qué quedó pendiente

No commitees ni pushees sin que te lo pida.
```

---

## Notas

### Las cinco trampas de este repositorio

| Síntoma | Causa | Ref. |
|---------|-------|------|
| Un `dispatch` no hace nada | El namespace de eventos no está en el `:require` de `core.cljs`; los handlers no se registraron | L-03 |
| El build falla por el namespace | Namespace y ruta de archivo no coinciden (guion vs guion bajo) | L-01 |
| Un `reg-fx` recibe `nil` | Los efectos reciben **un solo** argumento: usa un mapa o un vector | L-02 |
| Un estilo funciona en dev y no en producción | Falta `npm run build:css`, o la clase se construyó dinámicamente y Tailwind no la detectó | L-06 |
| El cambio no aparece en producción | Falta `npx shadow-cljs release app` + commit del bundle | L-05, ADR-003 |

### Estructura mental antes de escribir

```
¿Es una regla de negocio?     → namespace puro + test
¿Es I/O?                       → universo.db.crud
¿Es orquestación?              → reg-event-fx (lee db, llama funciones puras, dispara efectos)
¿Es estado nuevo?              → universo.db/default-db
¿Es presentación?              → components/* (solo suscripciones y Hiccup)
¿Es una regla que también vive en SQL? → cambiar AMBAS en el mismo commit (R-08)
```

### Comandos

```bash
clojure -M:shadow-cljs watch app   # dev en http://localhost:3000
npm run watch:css                  # Tailwind en watch
clj -M:test                        # suite completa
npx shadow-cljs browser-repl       # REPL
npx shadow-cljs release app        # bundle de producción (solo al publicar)
npm run build:css                  # CSS minificado (solo al publicar)
```

Referencia: **34 tests / 129 assertions / 0 failures** (2026-07-26). Si el número baja, explica por qué.
Los `:infer-warning` de `events/auth.cljs` son conocidos y benignos (L-04).

### Archivos grandes: entrar con cuidado

`components/admin.cljs` (1060), `db/crud.cljs` (975), `events/admin.cljs` (738),
`components/resume.cljs` (515), `events/test.cljs` (485), `events/slots.cljs` (458),
`components/landing.cljs` (425). **Sin tests.** Si tienes que tocarlos, extrae primero la lógica a un
namespace puro y testéala; el cambio se apoya en ese test (T-15).

### Qué no tocar

- `public/js/app.js` a mano (es generado).
- Código archivado: `mathacademy*`, `improved_math_academy`.
- Namespaces no alcanzables: `jardin`, `particulas`, `physics`, `voz`, `battery`, `animations`,
  `test_subs`, `components/tailwind`, `components/supabase_test`. Ni extenderlos ni borrarlos (P-09).
- Cualquier cosa que contradiga un ADR sin haber escrito el ADR que lo reemplaza.

### Al terminar

Si el cambio es relevante: `CURRENT_STATUS.md`, `BACKLOG.md` (mover la tarea), session log, y
`LESSONS_LEARNED.md` si algo costó más de 15 minutos de depuración. Ver
`prompts/session-close-memory-update.md`.

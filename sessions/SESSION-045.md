# SESSION-045

## Fecha

2026-09-18

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code — Opus 5

## Objetivo de la sesión

Cerrar el incidente de credenciales que dejó abierto SESSION-044 día 2: las contraseñas reales de
`claude_ro` y `claude_ddl` habían quedado escritas en `.env.example`, que sí está versionado. Rotar,
limpiar el historial y publicar.

## Contexto de entrada

- Rama: `main`
- Commit inicial: `3632c1b`
- Estado del árbol al empezar: **sucio** — `.env.example` modificado (ya con los placeholders puestos,
  sin commitear)
- Documentos de la memoria leídos: `CLAUDE.md`, `BACKLOG.md` (T-151), `LESSONS_LEARNED.md`,
  `CURRENT_STATUS.md`, `SESSION-044.md`, `supabase/acceso_del_agente.sql`
- Bloqueos vigentes al empezar: **el proceso perdió el acceso a `~/Documents`** (TCC de macOS, no
  permisos POSIX). Todo comando fallaba con `Operation not permitted`. Se resolvió del lado del owner
  antes de retomar.

## Actividades realizadas

1. **Verificar el estado real en vez de asumirlo.** El resumen previo a la caída de acceso afirmaba
   que **no se había creado rama de respaldo**. Falso a medias: existía `respaldo-pre-squash`, pero
   apuntaba a `778fc18`, un commit viejo sin relación con estos 13. No era respaldo de nada relevante.
2. **Acotar la exposición.** `git log --all -S` sobre los dos secretos: **solo `6556e86`** los
   contenía. `23a4a53` toca `.env.example` pero con placeholders. `origin/main` estaba en `77ddcba`
   y el local **ahead 13**: nunca se pusheó. `.env` intacto, no trackeado, ignorado en `.gitignore:38`.
3. **El owner rotó las dos contraseñas** en el SQL Editor (`alter role … password …`), generadas con
   `openssl rand -hex 32`. El agente no las vio en ningún momento.
4. **Respaldo real** (`respaldo-pre-reescritura` sobre `3632c1b`) y **reescritura** de los 7 commits
   `6556e86..3632c1b` con `git filter-branch --tree-filter` y un filtro en Perl. No hay
   `git-filter-repo` instalado; `rebase -i` no está disponible en este entorno.
5. **Verificar la reescritura, no confiar en ella.** `git diff --stat respaldo main` → **solo
   `.env.example`, 2 líneas**. Autor, fecha y mensaje de los 7 commits **idénticos** (`diff` sobre
   `%an|%ae|%ad|%s`). Cero ocurrencias del secreto en `origin/main..main`, por `-S` y por `git grep`
   sobre el árbol completo de cada commit del rango.
6. **Push.** `git merge-base --is-ancestor origin/main main` confirmó **fast-forward**: no se
   reescribió nada ya publicado, así que fue `git push` normal, sin `--force`. `77ddcba..16e2800`.
7. **Purga**, con producción ya verificada por el owner: borrada la rama de respaldo, expirados los
   reflogs y `git gc --prune=now`. Los tres commits viejos quedaron **purgados**, no solo
   desreferenciados (`git cat-file -e` falla sobre los tres).
8. **Corregir el origen del defecto, no solo el síntoma** — ver "Notas".

### Lo que no funcionó / lo que casi sale mal

- **`git reflog expire --expire=now --all` habría borrado 13 stashes del owner.** Es el comando que
  el propio agente había propuesto un turno antes. Los stashes de GitHub Desktop viven en el reflog
  de `refs/stash`, y `--all` los incluye. Se acotó a `refs/heads/main HEAD` y se verificó el conteo
  antes y después: **13 → 13**. Ver **L-64**.
- **La tabla de estado que el agente escribió antes de la caída de acceso tenía datos incorrectos**
  (la rama de respaldo). Se detectó porque el primer paso al recuperar el acceso fue **medir**, no
  continuar desde lo escrito.

## Archivos revisados

- `.env.example`
- `supabase/acceso_del_agente.sql` (avisos de las partes 1 y 2)
- `project-memory/BACKLOG.md` (T-151, y los dos tropiezos del 2026-09-18)
- `sessions/SESSION-044.md` (pendientes del día 2)
- `project-memory/CURRENT_STATUS.md`
- `project-memory/LESSONS_LEARNED.md`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `.env.example` | Placeholders `…-URL-ENCODED` → `…-HEX`, y aviso de generar con `openssl rand -hex 32`. Además, reescrito en 7 commits del historial para sacar las contraseñas reales |
| `supabase/acceso_del_agente.sql` | El aviso recomendaba `openssl rand -base64 32`, que es lo que metió el `/`. Ahora recomienda `-hex 32` y dice por qué |
| `project-memory/LESSONS_LEARNED.md` | **L-63** y **L-64** nuevas |
| `project-memory/CURRENT_STATUS.md` | La rotación de `claude_ro` deja de ser pendiente |
| `sessions/SESSION-045.md` | Este archivo |

## Comandos ejecutados y resultados

```
git log --all -S<secreto>    → solo 6556e86; tras la reescritura, 0
git filter-branch            → 7 commits reescritos, Ref 'refs/heads/main' was rewritten
git diff --stat respaldo main→ .env.example | 4 ++--  (nada más)
git push origin main         → 77ddcba..16e2800  (fast-forward, sin --force)
git gc --prune=now           → 6556e86/539c302/3632c1b purgados; stashes 13 → 13
clj -M:test                  → 213 tests / 2843 assertions / 0 failures
graphify update .            → ver abajo
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Las contraseñas de los roles del agente se generan en **hex**, no en base64 | — | `.env.example`, `supabase/acceso_del_agente.sql`, **L-63** |
| El historial se reescribe **solo** mientras no esté pusheado; una vez publicado, se rota y se acepta | — | Esta sesión; **L-63** |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Ninguno nuevo. El incidente no llegó a exponer nada fuera de la máquina | — | — |

## Bloqueos

**Técnico, resuelto:** el proceso perdió el acceso a `~/Documents` por TCC de macOS a mitad de la
sesión anterior. Lo desbloquea el owner desde Ajustes del Sistema → Privacidad y seguridad. Ningún
binario podía leer el repo; los permisos POSIX estaban bien, que es lo que despista.

## Preguntas abiertas nuevas

Ninguna.

## Supuestos aplicados

Ninguno. Todo lo afirmado acá se verificó con un comando en esta sesión.

## Próximos pasos

1. **T-131** —el café con el colega— sigue sin moverse, y es lo único que mide el negocio.
2. **R-44 sin mitigación** y empeoró (4 de 22 en el clamp).
3. `numeros`, `algebra` y `geometria` atribuyen los 100 ítems del eje a un solo módulo. Sin ficha.

## Pendientes

Ninguno de esta sesión. El incidente queda cerrado y verificado.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [ ] `project-memory/BACKLOG.md` — sin cambios: no hubo tarea asociada, T-151 ya estaba cerrada
- [ ] `project-memory/RISKS.md` — sin cambios: ningún riesgo nuevo ni cambio de severidad
- [ ] `project-memory/DECISIONS.md` — sin cambios: ninguna decisión con consecuencias arquitectónicas
- [x] `project-memory/LESSONS_LEARNED.md`
- [x] `project-memory/graph/` (snapshot de Graphify)

## Notas

**La lección de fondo no es "no pongas secretos en Git".** Es cómo entró: `.env.example` es un
archivo cuyo trabajo es tener valores falsos, y por eso nadie lo mira con desconfianza. La contraseña
real llegó ahí **depurando** — la de base64 traía `/`, la URL no conectaba, y se probó la cadena
completa en el archivo que estaba abierto en vez de en `.env`. El arreglo verdadero no es recordar
mejor: es que la contraseña **no tenga caracteres que obliguen a pelearse con la URL**. Por eso el
commit `35a0465` toca `acceso_del_agente.sql` y no solo el placeholder.

**Y una observación de método, tercera vez en dos sesiones.** El agente escribió un resumen del
estado —qué se había pusheado, si había respaldo— sin medirlo, y salió mal. Es exactamente la
"Nota para la próxima sesión" de SESSION-044: *antes de afirmar un número o una consecuencia, correr
la consulta*. Acá la consulta costaba un `git log`.

**Un hueco que quedó anotado y no corregido:** `.env.example` documenta que hay que usar el pooler en
modo sesión, pero **no** dice que ahí el usuario lleva el ref pegado (`claude_ro.<project-ref>`).
Está en `BACKLOG.md:1478` y en SESSION-044, no en el archivo que uno abre para configurar.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/LESSONS_LEARNED]] ·
[[../adr/ADR-040-el-agente-accede-a-la-base]] · `sessions/SESSION-044.md`

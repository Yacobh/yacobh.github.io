# SESSION-002

## Fecha

2026-07-27

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Sonnet 5)

## Objetivo de la sesión

Verificar, instalar y configurar herramientas de ahorro de tokens/contexto para el agente en este
repositorio: `graphify` (ya presente), `rtk` (nuevo), Obsidian (workspace humano), y detectar otras
oportunidades. El objetivo no cambió durante la sesión.

## Contexto de entrada

- **Rama:** `cursor/mvp-operable-funnel`
- **Commit inicial:** `48bf525`
- **Estado del árbol al empezar:** sucio — `public/js/app.js` modificado sin commitear;
  `.claude/`, `.cursor/`, `CLAUDE.md`, `adr/`, `docs/`, `graphify-out/`, `project-memory/`,
  `prompts/`, `sessions/` sin trackear (toda la estructura PMF de [[../sessions/SESSION-001]] nunca
  se había commiteado)
- **Documentos de la memoria leídos:** `CLAUDE.md` §§1–13, [[GRAPHIFY_INTEGRATION_GUIDE]],
  [[OBSIDIAN_WORKSPACE_GUIDE]], [[DECISIONS]], [[CURRENT_STATUS]] (parcial)
- **Bloqueos vigentes al empezar:** ninguno relevante para esta tarea

## Actividades realizadas

1. **Auditoría del estado actual:** `graphify` ya estaba instalado (Anaconda, v0.9.27) y con hooks
   `PreToolUse` activos en `.claude/settings.json`; `rtk` no existía; Obsidian.app estaba instalado
   pero nunca se había abierto (sin `~/Library/Application Support/obsidian/`); `.gitignore` no
   excluía `graphify-out/` ni `.obsidian/` pese a que la documentación dice que no deben versionarse.
2. **Instalación de rtk:** `brew install rtk` (v0.44.0). Investigado con `WebFetch` sobre el
   repositorio y probado en vivo con `rtk init --dry-run` (local vs. global) antes de decidir.
3. **Decisión de alcance con el usuario:** el hook de reescritura automática de rtk solo existe a
   nivel global (`~/.claude/settings.json`), no por-repositorio. Se preguntó explícitamente y el
   usuario eligió el hook global (`rtk init -g --auto-patch`).
4. **Verificación de compatibilidad:** confirmado que el hook global de rtk (matcher `Bash`) y los
   hooks de graphify del proyecto (`Bash|Grep`, `Read|Glob`) coexisten sin conflicto — son archivos
   de settings distintos (`~/.claude/settings.json` vs. `.claude/settings.json`) y matchers
   complementarios.
5. **Efecto colateral detectado y corregido:** `brew install rtk` disparó `brew cleanup`, que
   desinstaló `rlwrap` (marcado como huérfano por Homebrew, pero usado por `clj`). `clj -M:test`
   empezó a fallar; corregido con `brew install rlwrap`. Documentado en [[LESSONS_LEARNED]] L-28.
6. **Filtro propio del proyecto:** creado `.rtk/filters.toml` con `[filters.clj-test]` para
   `clj -M:test`. Primer intento con `max_lines = 60` **ocultaba el resultado real** de los tests
   (la línea `Ran N tests… / N failures, N errors.` cae al final de la salida cruda). Corregido
   quitando el tope de líneas y verificado con corridas reales (`rtk clj -M:test`) hasta confirmar
   que el resumen sobrevive. Documentado en [[LESSONS_LEARNED]] L-29 y [[RTK_INTEGRATION_GUIDE]] §4.
7. **Limitación descubierta:** rtk filtra `stdout` pero no `stderr`; el ruido de SLF4J y de los
   warnings de re-frame (que salen por `stderr`) no se recorta pese a estar en
   `strip_lines_matching`. No tiene solución desde el TOML del proyecto — queda documentado, no
   "arreglado".
8. **`.gitignore`:** agregadas las entradas `graphify-out/` y `.obsidian/`, que la documentación
   (D-14, §3 de [[OBSIDIAN_WORKSPACE_GUIDE]]) ya exigía pero nunca se habían escrito.
9. **Obsidian:** creado `.obsidian/app.json` (wikilinks, `alwaysUpdateLinks: false`, exclusión de
   `src/`, `test/`, `graphify-out/`, `node_modules/`, etc.) y `.obsidian/templates.json`
   (`folder: "sessions"`) según lo ya especificado en [[OBSIDIAN_WORKSPACE_GUIDE]] §2–§3, para que el
   Vault quede listo apenas el usuario lo abra. **No se lanzó la app** (primer uso, tendría flujo de
   onboarding que requiere interacción humana) — queda pendiente que el usuario abra la raíz del
   repo como Vault y confirme visualmente.
10. **Verificado `rg` (ripgrep)** ya estaba instalado (v14.1.1) — algunos filtros de rtk dependen de
    él; no hizo falta instalarlo.
11. **Memoria actualizada:** este archivo, [[CURRENT_STATUS]], [[DECISIONS]] (D-17),
    [[LESSONS_LEARNED]] (L-28, L-29), `CLAUDE.md` §10 y §14 (nueva), nuevo
    [[RTK_INTEGRATION_GUIDE]].

Lo que **no funcionó** y se descartó: dejar que `rtk init` (modo local, sin `-g`) inyectara su
bloque de ~120 líneas en inglés dentro de `CLAUDE.md` — se probó en un directorio temporal
(`/private/tmp/.../rtk-init-test`) para inspeccionar el resultado antes de decidir, y se descartó
por (a) ser redundante con el hook global ya activo y (b) romper la convención de este `CLAUDE.md`
(español, estructurado, sin bloques autogenerados). En su lugar se escribió a mano un §14 breve
siguiendo el estilo del §13 de graphify.

## Archivos revisados

- `.claude/settings.json`, `.claude/settings.local.json`, `~/.claude/settings.json` (antes/después)
- `.gitignore`
- `project-memory/GRAPHIFY_INTEGRATION_GUIDE.md`, `project-memory/OBSIDIAN_WORKSPACE_GUIDE.md`,
  `project-memory/DECISIONS.md`, `project-memory/LESSONS_LEARNED.md`,
  `project-memory/CURRENT_STATUS.md`, `sessions/SESSION_TEMPLATE.md`, `sessions/SESSION-001.md`
- Salida completa (raw) de `clj -M:test`, para diseñar el filtro `clj-test`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `.gitignore` | Se agregaron `graphify-out/` y `.obsidian/` |
| `.rtk/filters.toml` | **Nuevo.** Filtro `clj-test` para compactar `clj -M:test` sin ocultar el resultado |
| `.obsidian/app.json` | **Nuevo.** Config del Vault (wikilinks, exclusiones, sin auto-update de links) |
| `.obsidian/templates.json` | **Nuevo.** Carpeta de templates apuntando a `sessions/` |
| `~/.claude/settings.json` | Hook global `PreToolUse` (`Bash` → `rtk hook claude`); respaldo en `.bak` creado por `rtk` |
| `~/.claude/CLAUDE.md` | `rtk` agregó `@RTK.md` (fuera de este repo) |
| `~/.claude/RTK.md` | **Nuevo** (fuera de este repo), creado por `rtk init -g` |
| `CLAUDE.md` | Nueva fila en §10, nueva sección §14 (rtk) |
| `project-memory/RTK_INTEGRATION_GUIDE.md` | **Nuevo** |
| `project-memory/DECISIONS.md` | Nueva fila D-17 |
| `project-memory/LESSONS_LEARNED.md` | Nuevas L-28, L-29 |
| `project-memory/CURRENT_STATUS.md` | §9 actualizado con estado del tooling |

## Comandos ejecutados y resultados

```
brew install rtk                 → instalado v0.44.0 (disparó brew cleanup, ver L-28)
brew install rlwrap              → reinstalado tras el cleanup accidental
rtk init -g --auto-patch         → hook global instalado en ~/.claude/settings.json
rtk trust -y                     → .rtk/filters.toml confiado
clj -M:test                      → 13+34 tests, 30+129 assertions, 0 failures, 0 errors (2 veces, antes y después de reinstalar rlwrap)
rtk clj -M:test                  → verificado que el resumen de tests sobrevive al filtro
rtk gain                         → confirmó 81,8 % de ahorro con el filtro propio vs. 64,9 % del genérico
graphify update .                → pendiente de ejecutar al cerrar (ver Pendientes)
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Adoptar rtk con hook global (no solo local) | No (decisión menor) | [[DECISIONS]] D-17, [[RTK_INTEGRATION_GUIDE]] |
| No auto-inyectar el bloque estándar de `rtk init` en `CLAUDE.md`; escribir §14 a mano | No | Este archivo, `CLAUDE.md` §14 |
| Filtro de `clj -M:test` sin `max_lines` | No | [[LESSONS_LEARNED]] L-29, [[RTK_INTEGRATION_GUIDE]] §4 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| El hook global de rtk vive fuera del repo (`~/.claude/`); no viaja al clonar ni queda en el historial de Git | Baja | [[RTK_INTEGRATION_GUIDE]] §5 (nota de portabilidad) |
| rtk no filtra `stderr`; parte del ruido de `clj -M:test` persiste | Baja | [[RTK_INTEGRATION_GUIDE]] §4 |

## Bloqueos

Ninguno.

## Preguntas abiertas nuevas

Ninguna.

## Supuestos aplicados

Se asumió que el usuario prefiere el hook **global** de rtk (ahorro automático en todas sus
sesiones de Claude Code) sobre uno puramente local — pero esto **no fue un supuesto silencioso**:
se preguntó explícitamente antes de instalar, dado que modifica configuración fuera de este
repositorio.

## Próximos pasos

1. Abrir la raíz del repositorio como Vault en Obsidian y confirmar visualmente que la config
   pre-sembrada (exclusiones, wikilinks) quedó bien aplicada ([[OBSIDIAN_WORKSPACE_GUIDE]] §2).
2. Correr `graphify update .` y refrescar `project-memory/graph/` (nuevos archivos de memoria desde
   esta sesión) — ver [[GRAPHIFY_INTEGRATION_GUIDE]] §2.
3. Decidir si se commitea toda la estructura PMF (`.claude/`, `CLAUDE.md`, `adr/`, `docs/`,
   `project-memory/`, `prompts/`, `sessions/`) más los cambios de esta sesión (`.gitignore`,
   `.rtk/filters.toml`, `CLAUDE.md`) — sigue sin commitear desde SESSION-001 ([[BACKLOG]] si aplica).
4. Reiniciar Claude Code para que el hook global de rtk tome efecto en la próxima sesión.

## Pendientes

- `graphify update .` no se corrió en esta sesión (los cambios fueron mayormente Markdown/config,
  no ClojureScript, pero incluyen un archivo nuevo — `RTK_INTEGRATION_GUIDE.md` — que sí debería
  indexarse). Falta correrlo y copiar el snapshot a `project-memory/graph/`.
- Nadie verificó visualmente el Vault de Obsidian abriéndolo (ver Próximos pasos #1).

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [ ] `project-memory/BACKLOG.md`
- [ ] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [ ] `adr/ADR-0NN-….md` (nuevo) — no aplicó, decisión menor sin ADR propio
- [ ] `project-memory/ARCHITECTURE.md` — no aplicó, no es un cambio de arquitectura del producto
- [ ] `project-memory/ROADMAP.md`
- [ ] `project-memory/REQUIREMENTS.md`
- [ ] `project-memory/OPEN_QUESTIONS.md`
- [ ] `project-memory/ASSUMPTIONS.md`
- [x] `project-memory/LESSONS_LEARNED.md`
- [ ] `project-memory/TERMINOLOGY.md`
- [ ] `project-memory/graph/` (snapshot de Graphify) — pendiente, ver "Pendientes"

## Notas

`rtk gain` mostraba comandos ya contabilizados (`rtk grep`, `rtk ls -la .`, `rtk find`,
`rtk git status`, `rtk wc -l`) desde la primera consulta en esta sesión, antes de que el agente
ejecutara nada con el prefijo `rtk`. El historial de rtk es **global** (no por-proyecto), así que
esas cifras probablemente venían de un uso previo de la herramienta en esta máquina, no de esta
sesión — no se investigó más a fondo por no ser relevante para la tarea.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../project-memory/RTK_INTEGRATION_GUIDE]] · `../prompts/session-close-memory-update.md`

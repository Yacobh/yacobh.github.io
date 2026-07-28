# RTK_INTEGRATION_GUIDE

Última actualización: **2026-07-27**

Cómo usar **rtk** (Rust Token Killer) como *compresor de salida de comandos* dentro del framework
**Project Memory First**. Complementa a [[GRAPHIFY_INTEGRATION_GUIDE]] (que ahorra tokens de
*exploración*): rtk ahorra tokens de **salida de comandos de shell** (git, tests, grep, build…).

> Repositorio de la herramienta: <https://github.com/rtk-ai/rtk>.

---

## 1. Qué es y qué no es

rtk es un binario Rust que intercepta comandos de shell y filtra/comprime su salida antes de que
llegue al contexto del agente (hasta ~90 % menos en comandos ruidosos). **No** sustituye a
Graphify: Graphify evita leer/grepear código de más; rtk evita que un comando que sí hay que
ejecutar (`clj -M:test`, `git diff`, `grep`…) devuelva más texto del necesario.

---

## 2. Qué se instaló y dónde

| Pieza | Alcance | Ubicación |
|-------|---------|-----------|
| Binario `rtk` | Máquina (Homebrew) | `/opt/homebrew/bin/rtk`, v0.44.0 |
| Hook de reescritura automática | **Global**, todas las sesiones de Claude Code Chat de esta máquina, no solo este repo | `~/.claude/settings.json` → `hooks.PreToolUse` matcher `Bash` → `rtk hook claude` |
| Instrucciones para el agente | Global | `~/.claude/RTK.md` (referenciado con `@RTK.md` desde `~/.claude/CLAUDE.md`) |
| Filtros de usuario | Global, aplican a todos los proyectos | `~/Library/Application Support/rtk/filters.toml` (plantilla vacía, sin filtros propios aún) |
| Filtro **específico de este proyecto** | Este repo únicamente, versionado en Git | [[../.rtk/filters.toml]] → filtro `clj-test` |
| Config general | Global | `~/Library/Application Support/rtk/config.toml` (valores por defecto, no tocado) |

**Por qué el hook es global y no por-repo:** el mecanismo de reescritura transparente de rtk
(`git status` → `rtk git status` sin que el agente lo escriba) solo existe a nivel de la config de
Claude Code del usuario (`~/.claude/settings.json`), no hay equivalente por-proyecto. La única
pieza que vive **dentro** de este repositorio es `.rtk/filters.toml`, con filtros a medida para
comandos de este proyecto. Decisión completa: [[DECISIONS]] D-17.

---

## 3. Cómo verificar que está activo

```bash
rtk --version              # rtk 0.44.0
cat ~/.claude/settings.json | grep -A3 '"Bash"'   # debe mostrar "rtk hook claude"
rtk gain                   # estadísticas de ahorro acumuladas (todas las sesiones/proyectos)
rtk trust --list           # debe listar .rtk/filters.toml de este repo como confiado
```

Tras instalar o modificar el hook, **hay que reiniciar Claude Code** para que tome efecto.

---

## 4. El filtro propio de este proyecto: `clj-test`

`clj -M:test` (shadow-cljs `:node-test`) no es un framework que rtk reconozca de forma nativa (a
diferencia de `jest`/`vitest`/`cargo test`). Sin filtro, el *fallback* genérico (`rtk test <cmd>`)
no logra aislar bien la señal real: el resumen (`Ran N tests… / N failures, N errors.`) queda
enterrado bajo:

- 3 líneas de boilerplate de SLF4J.
- ~10 repeticiones de la advertencia de re-frame "Subscribe was called outside of a reactive
  context." (más su URL).
- El volcado completo del objeto `SupabaseClient` (~60 líneas) que imprime la carga de
  `universo.supabase` en cada test run.
- Los bloques `WARNING #N - :infer-warning` con el código fuente completo alrededor de cada
  advertencia (ver [[LESSONS_LEARNED]] sobre estos warnings conocidos).

El filtro `[filters.clj-test]` en `.rtk/filters.toml` recorta ese ruido con `strip_lines_matching`
y **deliberadamente no usa `max_lines`**: el resumen de tests va al final de la salida cruda, y un
tope de líneas lo habría cortado antes de llegar — ese fue el primer intento y falló (ver
[[../sessions/SESSION-002]]). Ahorro medido: **81,8 %** vs. 64,9 % del *fallback* genérico
(`rtk gain`, 2026-07-27).

**Limitación conocida:** rtk filtra `stdout` pero deja pasar `stderr` sin tocar. Las líneas de
SLF4J y de re-frame llegan por `stderr` (logging Java / `console.warn` de Node), así que
**siguen apareciendo** pese a estar en `strip_lines_matching`. No es un error del filtro: es un
límite de la arquitectura de rtk (proceso hijo con stdout/stderr capturados por separado). No hay
forma de arreglarlo desde el TOML del proyecto.

---

## 5. Mantenimiento

| Cuándo | Acción |
|--------|--------|
| Cambia el comportamiento de `clj -M:test` (nuevas líneas de log, nuevo warning masivo) | Revisar y ajustar `.rtk/filters.toml` → `[filters.clj-test]` |
| Se agrega un comando propio del proyecto muy verboso (ej. una migración SQL a mano) | Agregar un nuevo `[filters.<nombre>]` en `.rtk/filters.toml`, correr `rtk trust -y`, verificar con `rtk <comando>` antes de confiar en el ahorro |
| Se actualiza `rtk` (`brew upgrade rtk`) | Revisar `rtk gain` y `rtk verify` por si cambió el schema de filtros |
| Alguien clona el repo en otra máquina | El hook global **no viaja con el repo** (vive en `~/.claude/`); debe correr `brew install rtk && rtk init -g --auto-patch` si quiere el ahorro automático. `.rtk/filters.toml` sí viaja con el repo y se activa solo tras `rtk trust -y` (medida de seguridad: TOML no confiable no se ejecuta) |
| Se quiere revertir | `rtk init -g --uninstall` (quita el hook global); borrar `.rtk/` si se quiere abandonar el filtro del proyecto |

**Nota de portabilidad** (mismo problema que documenta [[GRAPHIFY_INTEGRATION_GUIDE]] §13 para
`graphify`): el hook usa el nombre bare `rtk`, no una ruta absoluta — más portable que el hook de
graphify (que sí usa `/opt/anaconda3/bin/graphify`), siempre que `rtk` esté en el `PATH` de quien
clone el repo.

---

## 6. Efecto colateral detectado y corregido en esta sesión

`brew install rtk` disparó un `brew cleanup` automático que **desinstaló `rlwrap`** (marcado como
"dependencia no usada" por Homebrew, pero en realidad usado por el comando `clj` de Clojure CLI
para edición de línea interactiva). Se detectó porque `clj -M:test` empezó a fallar con
`Please install rlwrap for command editing or use "clojure" instead.` y se corrigió con
`brew install rlwrap`. Ver [[LESSONS_LEARNED]] y [[../sessions/SESSION-002]].

---

Relacionado: [[GRAPHIFY_INTEGRATION_GUIDE]] · [[OBSIDIAN_WORKSPACE_GUIDE]] · [[DECISIONS]] D-17 ·
[[../sessions/SESSION-002]] · `../.rtk/filters.toml`

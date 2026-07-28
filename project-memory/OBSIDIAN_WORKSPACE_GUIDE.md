# OBSIDIAN_WORKSPACE_GUIDE

Última actualización: **2026-07-26**

Cómo usar **Obsidian** como *Knowledge Workspace* humano sobre la memoria del proyecto, dentro del
framework **Project Memory First**.

> **Regla de gobernanza número 2:** Obsidian es una **interfaz de navegación**, no la fuente de
> verdad. La fuente de verdad es el Markdown versionado en Git. Obsidian lee y escribe esos mismos
> archivos; no debe introducir nada que solo exista dentro de Obsidian.

---

## 1. Qué aporta Obsidian aquí (y qué no)

| Aporta | No aporta |
|--------|-----------|
| Navegación por enlaces `[[…]]` en dos direcciones (backlinks) | Ninguna capacidad que Git no tenga: no versiona por sí solo |
| **Graph View**: ver visualmente que un riesgo está conectado a una decisión y a una tarea | Autoridad: si Obsidian y Git difieren, gana Git |
| **Canvas**: diagramar arquitectura, roadmap y flujos sobre las notas reales | Un lugar para guardar información nueva que no esté en los archivos |
| Búsqueda rápida sobre toda la memoria | Reemplazo de `CLAUDE.md` ni de los prompts |
| Vista previa de tablas y bloques de código | Nada que un agente de IA necesite (los agentes leen Markdown crudo) |

**Prueba de fuego:** si borras la carpeta `.obsidian/`, **no debe perderse nada** del proyecto.

---

## 2. Qué abrir como Vault

**Recomendación: abrir la raíz del repositorio (`project-root`) como Vault.**

Razón: los enlaces cruzan carpetas (`project-memory/` → `adr/` → `sessions/` → `CLAUDE.md`), y si
abres solo `project-memory/` esos enlaces quedan fuera del Vault y no resuelven.

```
yacobh.github.io/          ← abrir ESTO como Vault
├── CLAUDE.md
├── project-memory/
├── adr/
├── sessions/
├── prompts/
├── docs/
├── supabase/              (SCHEMA.md y CONTENT.md también son documentación útil)
└── src/ public/ …         (código: se ignora en Obsidian, ver §3)
```

**Alternativa aceptable:** abrir solo `project-memory/` si te molesta el ruido, aceptando que los
enlaces a `../adr/` y `../sessions/` no funcionarán como enlaces internos.

### Configuración inicial

1. Obsidian → *Open folder as vault* → la raíz del repositorio.
2. **Settings → Files & Links:**
   - *Automatically update internal links*: **OFF** ⚠️ (ver §6: renombrar debe ser una decisión
     consciente, y un rename automático puede tocar decenas de archivos y ensuciar el diff)
   - *Use [[Wikilinks]]*: **ON** (es el formato que usa esta memoria)
   - *New link format*: **Shortest path when possible**
   - *Default location for new notes*: `project-memory`
   - *Excluded files*: ver §3
3. **Settings → Editor:** *Readable line length* ON, *Strict line breaks* OFF.
4. **Settings → Appearance:** el tema que quieras; no afecta a nadie más.

---

## 3. Excluir el código del Vault

Sin excluir, Obsidian indexa `node_modules/`, `public/js/app.js` (un bundle enorme) y `graphify-out/`,
y el Graph View se vuelve inútil.

**Settings → Files & Links → Excluded files**, agregar:

```
node_modules
public/js
.shadow-cljs
.cpcache
out
graphify-out
src
test
.git
```

> Nota: `graphify-out/` se excluye porque es el directorio de trabajo de la herramienta. El snapshot
> versionado que **sí** interesa navegar es `project-memory/graph/GRAPH_REPORT.md`.

Y añade a `.gitignore` (si decides no compartir tu configuración personal):

```
.obsidian/
```

**Decisión pendiente:** versionar `.obsidian/` permite compartir Canvas y configuración con el
equipo, pero mete conflictos de merge por preferencias personales. Hoy el proyecto tiene un solo
desarrollador: **no versionarlo** es lo simple. Si en el futuro hay equipo, versionar solo
`.obsidian/canvas/` (o mover los Canvas a `docs/`) es el punto medio.

---

## 4. Convenciones de enlaces

Esta memoria usa **wikilinks** en todas partes:

```markdown
[[ARCHITECTURE]]                        dentro de project-memory/
[[../adr/ADR-004-irt-1pl-map-y-regla-de-parada]]    a otra carpeta
[[OPEN_QUESTIONS]] Q-07                 enlace + ancla textual
`../sessions/SESSION-001.md`            ruta literal cuando el enlace no aporta
```

**Por qué wikilinks y no Markdown estándar `[texto](ruta.md)`:** son más cortos, se escriben con
autocompletado, generan backlinks y siguen siendo perfectamente legibles como texto plano en GitHub
(no se renderizan como enlaces, pero se entienden). El costo es aceptable; la decisión está registrada
en [[DECISIONS]] D-16.

**Reglas:**

1. Un enlace a un archivo que **aún no existe** es válido: marca algo por escribir. Obsidian lo
   muestra en gris.
2. **Nombres de archivo sin acentos ni espacios** — para que las rutas funcionen igual en macOS,
   Linux, Windows y URLs de GitHub.
3. **No dependas de features exclusivas de Obsidian** en el contenido: nada de embeds `![[archivo]]`,
   ni bloques de referencia `^bloque`, ni propiedades de Dataview. Un agente que lea el Markdown crudo
   debe entender todo.
4. Los **enlaces a código** van como ruta literal en backticks (`src/universo/profile.cljs`), no como
   wikilink: el código está excluido del Vault y además así son clicables en la terminal.

---

## 5. Cómo trabajar día a día

### Rutina de inicio

1. Abrir [[INDEX]] — es el mapa de contenidos.
2. [[CURRENT_STATUS]] — qué pasa hoy.
3. Desde ahí, seguir enlaces según la tarea.

### Graph View (Settings → *Graph view* en el panel izquierdo)

Filtro recomendado para ver la estructura de gobernanza:

```
path:project-memory OR path:adr OR path:sessions
```

Lo que deberías **ver**, y que revela problemas cuando falta:

- Un cúmulo denso: `PROJECT_BRIEF` ↔ `BUSINESS_CONTEXT` ↔ `REQUIREMENTS` ↔ `ARCHITECTURE`.
- Los ADRs colgando de `DECISIONS` y de `ARCHITECTURE`.
- `RISKS`, `BACKLOG` y `OPEN_QUESTIONS` cruzándose entre sí (los riesgos apuntan a tareas y las
  tareas a preguntas).
- Los `SESSION-XXX` como hojas que apuntan hacia dentro.

**Un nodo aislado es una señal de alarma**, no un detalle estético: significa una decisión sin
consecuencia documentada, un riesgo sin mitigación, o una tarea que nadie pidió.

Colores por grupo (Graph view → *Groups*), útiles:

| Grupo | Query | Color sugerido |
|-------|-------|----------------|
| Decisiones | `path:adr` | azul |
| Riesgos y preguntas | `file:RISKS OR file:OPEN_QUESTIONS OR file:ASSUMPTIONS` | rojo |
| Ejecución | `file:BACKLOG OR file:ROADMAP OR file:CURRENT_STATUS` | verde |
| Sesiones | `path:sessions` | gris |

### Canvas

Tres Canvas valen la pena. Guárdalos en `docs/` (así se versionan como contenido del proyecto, no
como configuración personal):

1. **`docs/arquitectura.canvas`** — cajas para navegador, re-frame, lógica pura, `db.crud`, Supabase,
   triggers, Edge Function, Resend; con las notas [[ARCHITECTURE]] y los ADRs relevantes ancladas al
   lado. Sirve para explicarle el sistema a alguien en cinco minutos.
2. **`docs/roadmap.canvas`** — las fases F0–F11 de [[ROADMAP]] en columnas, con las tarjetas de
   [[BACKLOG]] que las componen y los riesgos que las amenazan.
3. **`docs/funnel.canvas`** — el recorrido del estudiante (landing → login → diagnóstico → perfil →
   plan → cupos → inscripción → confirmación), marcando los puntos de fuga y qué falta en cada paso.

**Regla:** un Canvas **ilustra**, no decide. Si en un Canvas aparece información nueva (un riesgo, una
dependencia), esa información debe escribirse en el `.md` correspondiente. El Canvas es la vista, el
Markdown es el dato.

---

## 6. Plugins: uso moderado

**Plugins del core que conviene activar:** Backlinks, Outgoing links, Outline, Graph view, Canvas,
Search, Command palette, Templates (apuntando a `sessions/SESSION_TEMPLATE.md`), Daily notes solo si
te sirve para pensar (**no** como bitácora del proyecto: eso son los `SESSION-XXX.md`).

**Plugins de comunidad: por defecto, ninguno.**

Si aun así quieres alguno, el criterio es: *¿el archivo `.md` sigue siendo comprensible sin el
plugin?*

| Plugin | Veredicto | Razón |
|--------|-----------|-------|
| **Dataview** | ⚠️ solo en notas desechables | Sus queries no significan nada fuera de Obsidian. Si un `BACKLOG.md` es una query de Dataview, un agente ve un bloque de código en lugar de las tareas. **Nunca** en los archivos de memoria |
| **Templater** | ✅ aceptable | Solo genera texto; el resultado es Markdown normal |
| **Kanban** | ⚠️ | Produce Markdown legible, pero duplicaría [[BACKLOG]]. Un solo lugar para las tareas |
| **Git** | ✅ útil | Commits desde Obsidian. Ojo: los mensajes deben seguir la convención del repo (español, imperativo) — un "vault backup" automático es basura en el historial |
| **Excalidraw** | ⚠️ | Canvas nativo alcanza y es más portable |
| **Tag Wrangler / Advanced Tables** | ✅ inocuos | Solo editan texto |

**Nunca:** plugins que muevan archivos automáticamente, que reescriban frontmatter, o que sincronicen
con un servicio externo. Git es la sincronización.

---

## 7. Reglas para evitar dependencia excesiva de Obsidian

Las cinco reglas que mantienen la memoria portable:

1. **Prueba de la carpeta borrada.** Si borras `.obsidian/`, no se pierde nada del proyecto. Si se
   pierde algo, ese algo estaba en el lugar equivocado.
2. **Prueba del `cat`.** Cualquier archivo de memoria debe entenderse leyéndolo con `cat` en una
   terminal. Si necesita renderizado o un plugin para tener sentido, está mal escrito.
3. **Prueba del agente.** Claude Code CLI lee Markdown crudo. Todo lo que un humano necesite saber
   debe estar en el texto, no en la vista.
4. **Nada de contenido solo-Obsidian.** Sin embeds de bloque, sin queries dinámicas, sin propiedades
   de plugin en los archivos de memoria. (Los Canvas son la excepción tolerada, porque son
   *ilustración* y no *dato*.)
5. **Git manda.** Si el Vault y el repositorio difieren, el repositorio tiene razón. Haz commit
   seguido; no dejes trabajo solo en el Vault local.

---

## 8. Convenciones de nombres compatibles con Markdown y Git

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Memoria del proyecto | `MAYUSCULA_CON_GUION_BAJO.md` | `CURRENT_STATUS.md` |
| ADR | `ADR-0NN-slug-en-minusculas.md` | `ADR-004-irt-1pl-map-y-regla-de-parada.md` |
| Sesión | `SESSION-0NN.md` | `SESSION-001.md` |
| Prompt | `minusculas-con-guion.md` | `session-bootstrap.md` |
| Canvas | `minusculas.canvas` en `docs/` | `docs/arquitectura.canvas` |

**Prohibido en nombres de archivo:** acentos y ñ (rompen rutas entre sistemas y en URLs), espacios
(obligan a escapar en la terminal), `:` `/` `\` `?` `*` `|` `<` `>` `"`, y nombres que difieran solo
en mayúsculas (macOS es insensible a mayúsculas y Linux no: `Adr-001.md` y `ADR-001.md` colisionan).

**Al renombrar:** hazlo con `git mv`, actualiza los `[[enlaces]]` a mano (por eso *auto-update links*
está apagado) y revisa el diff antes de commitear. Si el archivo renombrado es un ADR, **no** lo
renombres: los ADRs son inmutables.

---

## 9. Flujo con Git desde Obsidian

Obsidian no gestiona ramas ni conflictos bien. El flujo seguro:

1. Editar en Obsidian.
2. Revisar el diff en la terminal (`git diff`) — Obsidian a veces añade líneas en blanco al final o
   normaliza espacios.
3. Commitear con mensaje en español y en imperativo, describiendo el cambio de memoria:
   `docs(memoria): registrar decisión de capacidad de cupos y actualizar estado`.
4. Nunca commitear un `.obsidian/workspace.json` si decidiste versionar `.obsidian/`: cambia en cada
   sesión y solo genera ruido.

---

## 10. Cómo se relaciona esto con Graphify

Son dos grafos distintos y complementarios; no los confundas:

| | **Obsidian Graph View** | **Graphify** |
|---|---|---|
| Grafo de | los **documentos** de la memoria y sus enlaces `[[…]]` | el **repositorio** (código, SQL, docs) y sus relaciones extraídas |
| Lo construye | tú, al escribir enlaces | la herramienta, al analizar archivos |
| Responde | "¿este riesgo está conectado a una decisión y a una tarea?" | "¿qué archivos toca un cambio en esta tabla?" |
| Autoridad | ninguna: refleja lo que escribiste | ninguna: es evidencia de apoyo |
| Actualización | instantánea al guardar | `graphify update .` |

Uso combinado típico: Graphify te dice **qué** partes del repositorio están relacionadas; Obsidian te
dice **qué decidimos y por qué** sobre esas partes. Ver [[GRAPHIFY_INTEGRATION_GUIDE]].

---

Relacionado: [[INDEX]] · [[GRAPHIFY_INTEGRATION_GUIDE]] · [[AGENT_INSTRUCTIONS]] · [[DECISIONS]] D-16

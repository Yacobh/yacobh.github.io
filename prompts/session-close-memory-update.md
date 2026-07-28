# Prompt: cierre de sesión y actualización de memoria

Prompt estándar para **cerrar** cualquier sesión de trabajo. Cópialo tal cual como último mensaje de la
sesión.

---

```
Actualiza la memoria del proyecto bajo Project Memory First.

Revisa todo lo realizado en esta sesión y actualiza:

- project-memory/CURRENT_STATUS.md
- project-memory/DECISIONS.md
- project-memory/BACKLOG.md
- project-memory/RISKS.md
- project-memory/ROADMAP.md, si aplica
- project-memory/ARCHITECTURE.md, si aplica
- sessions/SESSION-XXX.md
- ADR nuevo, si hubo decisión relevante

Si se usó Graphify, actualiza o referencia:

- project-memory/graph/GRAPH_REPORT.md

Si se usó Obsidian, asegúrate de que los enlaces internos sigan siendo válidos.

No elimines contexto relevante.
No inventes información faltante.
Marca supuestos y preguntas abiertas de forma explícita.
```

---

## Notas para quien use este prompt

### Qué debe pasar, en orden

1. **Verificación técnica primero** (no se documenta un estado que no se comprobó):

```bash
clj -M:test                          # debe quedar en 0 failures / 0 errors
npx shadow-cljs release app          # solo si cambió ClojureScript y hay que publicar
npm run build:css                    # solo si cambiaron clases de Tailwind
graphify update .                    # si cambió código
git status                           # ¿queda algo sin commitear a propósito?
```

2. **Session log**: copiar `sessions/SESSION_TEMPLATE.md` al siguiente número consecutivo y completarlo
   entero. Las secciones que más valor tienen para la próxima sesión son **"Archivos revisados"**
   (ahorra re-descubrir dónde está lo relevante) y **"Pendientes"** (qué quedó a medias y qué falta
   exactamente).

3. **Actualizar la memoria** según la tabla de `project-memory/AGENT_INSTRUCTIONS.md` §7.

4. **Refrescar el snapshot del grafo** si cambió código:

```bash
graphify cluster-only . --no-label
cp graphify-out/{GRAPH_REPORT.md,graph.json,graph.html} project-memory/graph/
git rev-parse HEAD    # debe coincidir con "Built from commit" del reporte
```

### Checklist de cierre

- [ ] `clj -M:test` en verde, o el fallo reportado **con su salida**
- [ ] Bundle y/o CSS recompilados si correspondía
- [ ] `sessions/SESSION-XXX.md` creado y completo
- [ ] `CURRENT_STATUS.md` refleja la realidad de ahora (incluido el estado del árbol)
- [ ] ADR creado si hubo decisión relevante, con su fila en `DECISIONS.md` §1
- [ ] `BACKLOG.md`: tareas abiertas / movidas / cerradas
- [ ] `RISKS.md`: riesgos nuevos o cambios de severidad
- [ ] `ARCHITECTURE.md` si cambió estructura, tabla, integración o flujo
- [ ] `OPEN_QUESTIONS.md`: preguntas nuevas; las respondidas **marcadas**, no borradas
- [ ] `ASSUMPTIONS.md`: supuestos aplicados para poder avanzar
- [ ] `LESSONS_LEARNED.md` si algo costó más de 15 minutos de depuración
- [ ] Snapshot de `project-memory/graph/` refrescado si cambió código
- [ ] Enlaces `[[…]]` nuevos apuntan a archivos que existen
- [ ] Sin secretos en el diff
- [ ] Reporte final honesto: qué se hizo, qué se **verificó**, qué quedó pendiente y por qué

### Errores frecuentes al cerrar

| Error | Por qué importa |
|-------|-----------------|
| Actualizar `CURRENT_STATUS` y olvidar `BACKLOG` | Quedan dos versiones distintas del estado de la misma tarea |
| Marcar una tarea como hecha sin verificarla | Es la forma más rápida de que la memoria deje de ser confiable |
| Borrar una pregunta al responderla | Se pierde la trazabilidad de qué se decidió y cuándo |
| **Editar** un ADR aprobado para cambiar la decisión | Un ADR es un registro histórico: se **reemplaza** con uno nuevo |
| Session log genérico ("se hicieron cambios en la app") | No sirve a nadie; sé específico con archivos y comandos |
| Omitir lo que no funcionó | La próxima sesión repetirá el mismo intento fallido |
| Refrescar el grafo pero no copiar el snapshot | `graphify-out/` no se versiona: el snapshot queda viejo |

### Regla de fondo

> Una tarea no está terminada hasta que la memoria refleja su efecto. Si la sesión se corta antes,
> el session log debe decir exactamente qué quedó sin documentar.

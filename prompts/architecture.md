# Prompt: arquitectura

Para cambios estructurales: nuevo componente, nueva tabla, nueva integración, refactor de un módulo,
cambio de flujo de datos.

---

## Prompt

```
Cambio arquitectónico propuesto: <DESCRIPCIÓN>

Antes de responder:
1. Lee project-memory/ARCHITECTURE.md completo.
2. Lee project-memory/DECISIONS.md y TODOS los ADRs que toquen esta área.
3. Lee project-memory/graph/GRAPH_REPORT.md (god nodes, hiperaristas, comunidades).
4. Lee project-memory/DEPENDENCIES.md §3 (acoplamientos internos) y RISKS.md.
5. Orienta con `graphify query` / `path` / `explain`, sabiendo que el grafo NO indexa .cljs.

Entrega:

1. Análisis de impacto: qué componentes, tablas, policies, flujos y archivos se afectan
2. ¿Contradice algún ADR? Si sí, propón el ADR que lo reemplace ANTES de implementar
3. Al menos dos alternativas de diseño, con sus costos
4. Recomendación con justificación
5. Riesgos que introduce y cómo mitigarlos
6. Plan de implementación en pasos verificables (cada paso con su forma de comprobarlo)
7. Qué documentación hay que actualizar
8. Qué NO se puede determinar sin más información

No implementes hasta que la decisión esté registrada.
```

---

## Notas

### Restricciones estructurales que no se negocian sin ADR nuevo

| Restricción | ADR |
|-------------|-----|
| No hay backend propio: el cliente habla directo con Supabase | ADR-002 |
| RLS es el único control de autorización | ADR-002 |
| Todo I/O pasa por `universo.db.crud` | ADR-009 |
| Las reglas de negocio viven en namespaces puros con test | ADR-009 |
| El bundle compilado se versiona y su commit es el deploy | ADR-003 |
| Hosting estático: sin SSR, sin rutas de servidor, sin variables de entorno en build | ADR-003 |
| El contenido vive en el banco de ítems, no en un CMS | ADR-005 |
| Las cohortes se agrupan por banda de θ con mínimo de inscritos | ADR-006 |
| El modelo IRT es 1PL con MAP, Δθ acotado y parada por SE | ADR-004 |

### Checklist de impacto (de `GRAPHIFY_INTEGRATION_GUIDE` §11)

- [ ] ¿El nodo afectado está en alguna **hiperarista**? Entonces el cambio afecta un flujo completo,
      no una pieza.
- [ ] ¿Es un **god node** (`Schema Supabase`, `class_slots`, `modules`, `index.html`)? Radio de impacto
      amplio: cambio más pequeño, más verificación.
- [ ] ¿Hay una regla **espejo** (cliente + SQL) en juego? (R-08)
- [ ] ¿Qué parte del impacto es ClojureScript y por lo tanto **invisible** en el grafo? Esa se revisa a
      mano con `ARCHITECTURE` §2 y §8.
- [ ] ¿Afecta al contrato JSONB de `student_profiles.profile`? Es un contrato sin validación (R-09).
- [ ] ¿Requiere migración SQL? Entonces: idempotente, con RLS, documentada en `supabase/SCHEMA.md`.
- [ ] ¿Agrega una sección de UI? Toca `home.cljs`, `db.cljs` y `protected-sections`.
- [ ] ¿Agrega un `events/*`? Va al `:require` de `core.cljs` o los handlers no existen (L-03).

### Riesgos arquitectónicos ya conocidos

No hace falta redescubrirlos; están en `ARCHITECTURE` §10: RLS como único control, un solo entorno,
deploy manual del bundle, reglas duplicadas, contrato JSONB implícito, componentes monolíticos, sin
router de URL, sin code splitting, `index.html` duplicado, grafo ciego a `.cljs`.

Si tu cambio **agrava** uno de estos, dilo explícitamente y justifícalo. Si lo **mitiga**, dilo también:
es un argumento a favor.

### Al terminar

`ARCHITECTURE.md` actualizado, ADR creado si correspondía, `DEPENDENCIES.md` §3 si aparecieron
acoplamientos nuevos, `RISKS.md` si el cambio introduce o cierra un riesgo, y el snapshot del grafo
refrescado.

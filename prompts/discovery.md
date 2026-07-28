# Prompt: discovery / entendimiento

Para cuando hay que **entender** algo del proyecto antes de tocarlo: un subsistema, un flujo, un bug
reportado, o el proyecto completo desde cero.

---

## Prompt

```
Objetivo de discovery: <QUÉ QUIERO ENTENDER>

Antes de responder:
1. Lee CLAUDE.md, project-memory/HANDOFF.md, project-memory/CURRENT_STATUS.md,
   project-memory/ARCHITECTURE.md y project-memory/AGENT_INSTRUCTIONS.md.
2. Consulta project-memory/DECISIONS.md y busca el ADR que cubra esta área.
3. Revisa project-memory/OPEN_QUESTIONS.md y ASSUMPTIONS.md para no re-asumir lo ya
   marcado como incierto.
4. Orienta con `graphify query "<pregunta>"` / `explain` / `path`. Recuerda que el grafo
   NO indexa .cljs: para lógica ClojureScript usa ARCHITECTURE.md §2 como mapa y lee
   src/ de forma dirigida.

Entrega:

1. Qué es y para qué existe (en el contexto del producto, no solo del código)
2. Cómo funciona hoy: componentes, flujo de datos, dónde vive cada pieza (con rutas de archivo)
3. Qué reglas de negocio implementa y dónde están (¿namespace puro? ¿SQL? ¿ambos?)
4. Qué está testeado y qué no
5. Qué decisiones documentadas lo afectan (ADRs)
6. Riesgos y deuda que encuentres
7. Qué NO pude determinar, como preguntas concretas

No modifiques nada.
Si algo contradice la documentación, dilo explícitamente en lugar de elegir en silencio.
```

---

## Notas

**El objetivo del discovery no es describir el código, es poder decidir.** Una respuesta útil termina
con "para cambiar X hay que tocar A, B y C, y cuidar D".

**Puntos ciegos conocidos** que conviene verificar en cualquier discovery de este repositorio:

| Área | Qué verificar |
|------|---------------|
| Un `dispatch` que "no hace nada" | ¿Está el namespace de eventos en el `:require` de `src/universo/core.cljs`? (L-03) |
| Una regla de negocio | ¿Está duplicada en SQL? Las bandas de θ y la confirmación de cupo lo están (R-08) |
| Un namespace | ¿Es alcanzable desde `core.cljs`? Hay ~12 que no lo son (`ARCHITECTURE` §2.6) |
| Algo que "no aparece en el grafo" | El grafo no indexa `.cljs`. Verifica en `src/` antes de concluir |
| Lo que hace producción | El bundle versionado puede estar desalineado del fuente (R-13, Q-13) |
| Una policy RLS | El comportamiento real está en el proyecto Supabase, no solo en los `.sql` (A-17) |

**Comandos útiles de orientación:**

```bash
graphify query "<pregunta>"
graphify explain "<concepto>"
graphify path "<A>" "<B>"
grep -rn "reg-event-\|reg-sub\|reg-fx" src/universo/events/   # inventario de handlers
grep -rn "universo\.<ns>" src/                                # quién requiere qué
wc -l src/universo/**/*.cljs | sort -n                        # dónde está el volumen
```

**Al terminar:** si el discovery produjo entendimiento nuevo que no estaba escrito, **agrégalo a la
memoria** (típicamente `ARCHITECTURE.md`, `TERMINOLOGY.md` o `LESSONS_LEARNED.md`). Un discovery que
solo vive en el chat se pierde: es exactamente el problema que PMF resuelve.

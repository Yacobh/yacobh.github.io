# ADR-008: Archivar MathAcademy y mantener un funnel único

## Estado

Aprobada

## Fecha

2026-07-24 (documentada retroactivamente el 2026-07-26)

## Contexto

> **Contexto reconstruido** desde `src/universo/components/mathacademy/ARCHIVE.md`,
> `src/universo/views.cljs` (con el comentario explícito *";; :math (MathAcademy) archivado — funnel
> único en home"*), el commit `c5ee6bc` y la nota "MathAcademy fuera del build" en `PROJECT_SUMMARY.md`.

El repositorio contenía dos experiencias en paralelo:

1. **MathAcademy** — `components/mathacademy.cljs`, `components/improved_math_academy.cljs`,
   `components/mathacademy/{events,subs}.cljs`: una propuesta de plataforma de práctica, accesible como
   página `:math` desde `views/pages`.
2. **El funnel de diagnóstico** — landing → diagnóstico IRT → perfil → plan → cupos, la propuesta que
   se consolidó como producto.

Problemas concretos:

- **Dos CTA compitiendo:** la portada tenía que decidir a dónde mandar al visitante, y cualquier
  mensaje que explicara ambas cosas era más largo y menos convincente.
- **Dos superficies que mantener** con un solo desarrollador: cada cambio de estado, de autenticación o
  de estilo había que considerarlo dos veces.
- **Dos modelos mentales** en el mismo `app-db`, con eventos y suscripciones propios.
- El commit `38fbb96` rehizo la portada específicamente **para captación** del funnel de diagnóstico,
  lo que dejó a MathAcademy sin lugar en la navegación.

## Decisión

**MathAcademy se archiva.** Concretamente:

1. `universo.views/pages` resuelve **solo** `:home`; la entrada `:math` queda comentada con una nota
   explícita del motivo.
2. Los namespaces de MathAcademy **dejan de ser alcanzables** desde `universo.core`, por lo que no
   entran al bundle (`:modules {:app {:entries [universo.core]}}`).
3. El código **se conserva en `src/`** con un `ARCHIVE.md` que documenta qué era.
4. **La portada tiene un CTA único:** "Comenzar mi diagnóstico".

**Regla derivada:** no se extiende el código archivado. Tampoco se borra sin una decisión explícita.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **Mantener ambos productos** | Duplica el mantenimiento y divide el mensaje de la landing, con un solo desarrollador y sin tiempo para ninguno de los dos |
| **Borrar el código** | Pierde trabajo que podría reutilizarse (la práctica de ejercicios es un candidato natural para la capa 1 del plan). Borrar es reversible solo vía Git, pero entonces nadie recuerda que existió |
| **Mover a otra rama** | El código quedaría fuera de la vista y se desincronizaría con el resto (cambios de API de re-frame, de Supabase, de estilos). Una rama vieja es código muerto con fecha de caducidad |
| **Mover a un directorio `lab/` fuera de `:source-paths`** | Es la opción más limpia y sigue disponible (P-09, T-23). No se hizo por costo/beneficio inmediato: dejar de requerirlo ya lo saca del bundle |
| **Integrar MathAcademy dentro del funnel** como capa de práctica | Atractivo a futuro, pero era una decisión de producto que no estaba tomada y habría retrasado el MVP |

## Consecuencias

**Positivas**

- **Un solo funnel, un solo CTA:** la landing puede ser específica y convincente ("Prepara la PAES de
  Matemática estudiando solo lo que te falta").
- **Menos superficie que mantener:** el estado, la navegación y la autenticación solo consideran un
  recorrido.
- **El bundle no crece** con código que nadie usa (los namespaces no alcanzables no se compilan).
- **El trabajo no se pierde:** `ARCHIVE.md` explica qué era y dónde está, para quien quiera retomarlo.
- **El ruteo se simplificó** a un `case` sobre secciones dentro de `home`.

**Negativas / costos aceptados**

- **Código muerto en `src/`:** `mathacademy.cljs` (200 líneas), `improved_math_academy.cljs` (209),
  más `events.cljs` y `subs.cljs` del subdirectorio. Se lee en las búsquedas, aparece en el árbol y
  puede confundir a quien llegue nuevo.
- **Deuda de decisión abierta:** ni borrado ni movido; el estado "archivado en su lugar" exige que la
  documentación lo diga (y por eso este ADR existe).
- **Se degrada con el tiempo:** al no compilarse ni testearse, el código archivado se romperá
  silenciosamente con cualquier actualización de dependencias. Retomarlo costará más cada mes.
- El caso sienta un precedente que se extendió a otros namespaces no alcanzables (`jardin`,
  `particulas`, `physics`, `voz`, `battery`, `animations`, `test_subs`, `components/tailwind`,
  `components/supabase_test`), más el archivo huérfano
  `src/universo/components/math_render_2` (sin extensión). El repositorio acumula laboratorio personal
  mezclado con producto.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Confusión de quien llegue nuevo al ver dos productos en `src/` | `ARCHIVE.md`; exclusión explícita en `PROJECT_BRIEF` §6; `ARCHITECTURE` §2.6 lista todos los namespaces no alcanzables; regla en `AGENT_INSTRUCTIONS` §10 | R-20 |
| Un agente "arregla" o extiende código archivado | Prohibición explícita en `AGENT_INSTRUCTIONS` §10.5 | — |
| Código archivado que se rompe y nadie nota | Aceptado: no está en el build ni en los tests | — |
| Acumulación de laboratorio personal en el repo del producto | T-23: decidir si mover a `lab/`, borrar o documentar como intencional | — |

## Seguimiento

**Decisión pendiente P-09 / tarea T-23:** definir el destino final del código no alcanzable. Tres
salidas posibles, y cualquiera es mejor que el limbo actual:

1. Mover a `lab/` fuera de `:source-paths` (mantiene el trabajo, saca el ruido del árbol del producto).
2. Borrar (Git lo conserva; `ARCHIVE.md` documenta que existió).
3. Declarar explícitamente que se conserva como laboratorio personal y dejar constancia en `docs/`.

**Reconsiderar la decisión de archivo** si se decide que la práctica de ejercicios entra en el
producto (por ejemplo, como parte de la capa 1 del plan, ADR-005). En ese caso, evaluar si el código de
MathAcademy sirve de base o si conviene reescribirlo — probablemente lo segundo, dado el tiempo que
llevará sin compilarse.

---

Relacionado: [[../project-memory/PROJECT_BRIEF]] §6 · [[../project-memory/ARCHITECTURE]] §2.6 ·
[[../project-memory/BACKLOG]] T-23 · [[../project-memory/LESSONS_LEARNED]] L-19 ·
`../src/universo/components/mathacademy/ARCHIVE.md`

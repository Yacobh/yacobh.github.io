# ADR-011: La visión del "Libro del Proyecto" es el norte estratégico; el MVP es una fase intermedia

## Estado

Aprobada

## Fecha

2026-07-30

## Contexto

En 2026-07-27 el owner (Jacobo Córdova) compartió un documento LaTeX interno, "Academia Online de
Matemáticas — Libro del Proyecto" (borrador v0.1), documentado en
[[../project-memory/VISION_LIBRO_PROYECTO]]. Ese documento propone un modelo de negocio de pago,
narrativa histórica como método pedagógico, múltiples ejes de personalización (nivel, frecuencia,
estilo de aprendizaje), expansión multi-materia e internacionalización — bastante más allá del
alcance del MVP actual descrito en [[../project-memory/PROJECT_BRIEF]] y
[[../project-memory/BUSINESS_CONTEXT]] (una sola materia — Matemática 1 PAES —, diagnóstico/perfil/
plan gratuitos, alcance acotado a Iquique/UNAP).

Esa tensión quedó registrada explícitamente como [[../project-memory/OPEN_QUESTIONS]] Q-21, sin
resolver: no estaba claro si el libro era una aspiración informal del fundador o la dirección real
del producto, y eso importaba porque define si el roadmap (F8 en adelante) sigue siendo el único
horizonte de planificación o si hace falta una épica de negocio nueva.

## Decisión

Se confirma [[../project-memory/VISION_LIBRO_PROYECTO]] como el **norte estratégico de largo
plazo** del proyecto. El MVP actual **es una versión menor que busca llegar a ese objetivo** — no
es una alternativa al libro ni un producto final en sí mismo. La visión **se debe nutrir aún más**
con el tiempo, no tratarse como un techo ya alcanzado por el borrador v0.1.

En consecuencia: [[../project-memory/PROJECT_BRIEF]] y [[../project-memory/BUSINESS_CONTEXT]]
describen el alcance **actual** del producto, no su alcance **final** — cualquier exclusión que
mencionen (una sola materia, sin pago automatizado, sin internacionalización) es una restricción
del MVP, no del proyecto.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Tratar el libro como aspiración informal, sin valor normativo sobre el roadmap | El owner lo confirmó explícitamente como dirección, no como una idea suelta — ignorarlo dejaría la memoria del proyecto desalineada con la intención real de quien lo dirige |
| Reescribir `PROJECT_BRIEF`/`BUSINESS_CONTEXT` de inmediato para reflejar el alcance final del libro | Prematuro: el libro es v0.1, sin números ni secuencia de fases decidida; reescribir el alcance actual como si ya fuera el final generaría documentación que promete más de lo que el código y el negocio pueden sostener hoy |

## Consecuencias

**Positivas**
- La memoria del proyecto deja de tener una contradicción sin resolver entre "qué es esto" (MVP) y
  "hacia dónde va" (libro); ambas cosas pueden coexistir sin que una desautorice a la otra.
- Las decisiones de alcance futuras (¿multi-materia?, ¿narrativa histórica?, ¿pago automatizado?)
  tienen ahora un criterio explícito para evaluarse: ¿acerca al proyecto a la visión del libro?

**Negativas / costos aceptados**
- No resuelve el **cómo ni el cuándo**: no hay todavía una secuencia de fases entre el MVP actual y
  la visión completa, ni una épica de negocio en [[../project-memory/BACKLOG]] que la roadmapee
  (queda como decisión pendiente P-11 en [[../project-memory/DECISIONS]]).
- Tensiones puntuales del libro con el código actual (Q-22: bandas de θ vs. "grupos de
  conocimiento"; Q-23: nombre de marca "Academia Online de Matemáticas" vs. "Academia Integral")
  siguen sin resolverse — esta decisión confirma la dirección general, no cada detalle del libro.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Scope creep: usar la visión de largo plazo para justificar trabajo que no sirve al MVP actual (contenido, cupos reales, email) | Toda tarea nueva sigue evaluándose por [[../project-memory/BACKLOG]] con criterio de terminado verificable; el libro orienta prioridad, no reemplaza la disciplina de alcance del MVP | [[../project-memory/RISKS]] |
| Un solo responsable (bus factor = 1, R-01) ahora con un horizonte más ambicioso que sostener | Sin mitigación nueva — riesgo preexistente, ver [[../project-memory/RISKS]] R-01 | R-01 |

## Seguimiento

Reconsiderar si: (a) el owner decide acotar el alcance de vuelta al MVP actual sin intención de
expandir, o (b) se abre efectivamente la épica de negocio de P-11 y esta ADR debería referenciarla
como su implementación concreta.

---

Relacionado: [[../project-memory/VISION_LIBRO_PROYECTO]] · [[../project-memory/PROJECT_BRIEF]] ·
[[../project-memory/BUSINESS_CONTEXT]] · [[../project-memory/OPEN_QUESTIONS]] Q-21, Q-22, Q-23 ·
[[../project-memory/DECISIONS]] P-11

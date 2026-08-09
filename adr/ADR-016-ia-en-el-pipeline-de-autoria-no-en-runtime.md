# ADR-016: La IA produce contenido en el pipeline de autoría, nunca en runtime

## Estado

Aprobada

## Fecha

2026-08-09

## Contexto

El producto necesita contenido pedagógico en dos capas ([[ADR-005-banco-de-items-en-vez-de-cms]]):
la **capa 0** (`questions.error_a..d`, la idea errónea nombrable por distractor, que es el
diferencial declarado) y la **capa 1** (`resources` por módulo). ADR-005 dejó dicho que el cuello
de botella es humano y no delegable, y aceptó explícitamente vivir sin versionado de contenido, sin
previsualización y con calidad heterogénea.

Estado medido al abrir esta decisión (2026-08-09):

- 61 recursos, 58 publicados; **~40 de tipo `text`, 1 `exercise`, 1 `video_url`**.
- Cobertura de 11 de 18 módulos; los 7 de `geometria` sin fuente.
- 387 preguntas en el banco, con ~1.548 explicaciones de distractor posibles si se completaran
  todas. A mano, a ritmo humano, eso no se termina.
- Ya existen **80 usuarios y 252 diagnósticos rendidos** (hallazgo colateral de T-01), o sea hay
  datos reales de error para priorizar qué escribir primero.

**Precedente que ya ocurrió, y que esta decisión formaliza en vez de inventar:** las migraciones
`018_baldor_resources.sql` y `019_baldor_algebra_resources.sql` son **39 recursos redactados por
IA** y auditados después matemáticamente uno por uno junto al owner (T-01), verificando cada
ejemplo numérico y no solo leyendo el texto — resultado: cero errores, 29 de 32 publicados. El
flujo ya está probado en este repositorio; lo que faltaba era declararlo como el flujo oficial y
fijar sus límites.

La pregunta que fuerza la decisión es doble: **¿se usa IA para producir contenido?** y, sobre todo,
**¿dónde se ejecuta esa IA?** — porque la segunda parte tiene consecuencias de arquitectura y de
costo que la primera no tiene.

## Decisión

**La IA se usa para producir contenido pedagógico únicamente en el pipeline de autoría, fuera del
producto en ejecución. El producto no llama a ningún modelo en runtime.**

En concreto:

1. **Todo contenido generado con asistencia de IA nace como migración SQL versionada** en
   `supabase/migrations/`, con `published = false`. Nunca se escribe directo a la base ni se
   publica sin pasar por el repositorio.
2. **Toda migración de contenido se audita antes de publicar**, con el estándar ya usado en T-01:
   verificar cada afirmación y **rehacer cada cuenta**, no solo leer el texto. La publicación se
   hace desde Admin → Recursos, y es un acto humano.
3. **Solo se genera lo que se puede auditar.** El cuello de botella es la verificación, no la
   generación: la auditoría de 32 recursos ocupó una sesión completa. La prioridad de qué generar
   se decide con **datos de error reales** (los 252 diagnósticos), no por intuición ni por cubrir
   el temario completo.
4. **No hay llamadas a modelos de IA desde el cliente ni desde Edge Functions del producto.** El
   estudiante nunca dispara una inferencia.
5. La capa 0 (`error_*`) tiene prioridad sobre la capa 1 para el esfuerzo asistido por IA, en
   coherencia con ADR-005: son 1–2 frases, baratas de generar y —lo que importa— **baratas de
   verificar**.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **IA en runtime dentro del producto** (tutor conversacional, explicación generada al vuelo para el error del estudiante) | Rompe dos decisiones vigentes a la vez. [[ADR-002-supabase-como-unico-backend]] no deja **dónde poner una API key**: el bundle es público por diseño, así que exigiría una Edge Function nueva. Y agrega **costo por estudiante**, que contradice el objetivo declarado de infraestructura ≈ $0 ([[../CLAUDE]] §2). Además haría el contenido no auditable: nadie revisa lo que se genera en el momento en que un menor de edad lo lee |
| **Escribir todo a mano, sin IA** | Es el estado que produjo R-10 y bloqueó el go-live durante semanas. ~1.548 explicaciones de distractor a ritmo de un solo autor no es un plan, es una intención |
| **Generar con IA y publicar sin auditar** | El producto se vende sobre "te digo exactamente qué error cometiste". Una explicación de error incorrecta no es contenido mediocre: es el producto mintiendo en su única promesa. Y contaminaría la calibración futura de `difficulty` (T-29, T-45) |
| **Generar con IA directo en la base (panel o SQL suelto), sin migración** | Pierde lo único que hoy da versionado al contenido. ADR-005 aceptó "sin versionado" cuando el volumen era humano; con volumen asistido por IA, un sobrescrito sin historial ni diff pasa de incomodidad a pérdida real |
| **CMS con flujo de aprobación** | Ya descartado en ADR-005 por la misma razón: es un producto completo y consumiría el tiempo que debe ir al contenido. La migración + auditoría cumple la función de "flujo de aprobación" sin construir nada |

## Consecuencias

**Positivas**

- **Le tapa a ADR-005 el costo que había aceptado:** el contenido que nace como migración está en
  Git, con historial, diff y revisión. El versionado deja de faltar sin construir nada nuevo.
- **Costo marginal cero en producción.** La generación ocurre en la máquina del autor, una vez; el
  estudiante descarga filas de Postgres como siempre.
- **El flujo ya está probado** (018/019 + auditoría de T-01), no es una apuesta.
- Permite atacar T-27 (enriquecer `error_*`) a una escala que a mano estaba fuera de alcance.
- Mantiene intacto el límite de seguridad: no aparece ningún secreto nuevo ni ningún tercero que
  reciba datos de estudiantes (relevante por R-06, público mayoritariamente menor de edad).

**Negativas / costos aceptados**

- **La verificación humana sigue siendo el cuello de botella**, solo que ahora es el único. Esta
  decisión no elimina el trabajo del owner: lo concentra en revisar en vez de redactar.
- **El contenido asistido por IA es más rápido de producir que de revisar**, así que existe una
  tentación permanente de publicar sin auditar. La regla 3 existe precisamente contra eso, y no hay
  mecanismo técnico que la imponga — es disciplina.
- No hay previsualización de KaTeX antes de publicar (limitación heredada de ADR-005, sin cambios).
- Renunciar a la IA en runtime cierra, por ahora, funcionalidades que la visión de largo plazo
  contempla ([[../project-memory/VISION_LIBRO_PROYECTO]] §6, "IA generativa para personalización",
  horizonte 18+ meses). Se acepta conscientemente: esa puerta se reabre con un ADR nuevo cuando
  exista modelo de ingresos que pague el costo por estudiante.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| **Alucinación en contenido histórico.** La visión (§3.1) quiere narrativa histórica y T-37 quiere fechas de origen; las anécdotas matemáticas apócrifas (Gauss sumando 1–100, la noche previa al duelo de Galois) son abundantes, suenan creíbles y se propagan | Tratar toda afirmación histórica como dato a verificar contra fuente, con el mismo estándar que una cuenta matemática. Ante duda no resuelta, se omite el dato antes que publicarlo | [[../project-memory/BACKLOG]] T-37 |
| Error matemático publicado en una explicación de error | Auditoría obligatoria rehaciendo cada cuenta (regla 2). Precedente: T-01 auditó 32 recursos y encontró cero errores, pero el valor estuvo en haber revisado, no en el resultado | R-10 |
| Volumen generado que nunca se alcanza a auditar y queda en `published = false` para siempre | Regla 3: generar por lotes priorizados con datos de error reales, no por cubrir temario. Un lote sin auditar bloquea el siguiente | T-27 |
| Presión futura por meter IA en runtime "porque es fácil" | Esta decisión es explícita al respecto; cambiarla exige ADR que la reemplace y que resuelva antes el costo por estudiante y la auditabilidad | [[ADR-002-supabase-como-unico-backend]] |

## Seguimiento

Reconsiderar (con un ADR nuevo que reemplace esta decisión) si:

- Aparece un modelo de ingresos que absorba un costo por inferencia y por estudiante, **y** una
  forma de auditar contenido generado en el momento — las dos condiciones, no una.
- El volumen de contenido auditado supera lo que una persona puede revisar, y se incorpora un
  redactor pedagógico (rol ya previsto en [[../project-memory/VISION_LIBRO_PROYECTO]] §5): ahí la
  pregunta pasa a ser de flujo de revisión entre varias personas, no de generación.

**Métrica que indicaría el momento de revisar:** si el contenido generado y no auditado se acumula
sesión tras sesión, la regla 3 no se está cumpliendo y el pipeline se volvió una fábrica de deuda
en vez de una de contenido.

---

Relacionado: [[ADR-005-banco-de-items-en-vez-de-cms]] · [[ADR-002-supabase-como-unico-backend]] ·
[[../project-memory/VISION_LIBRO_PROYECTO]] §3.1, §6 · [[../project-memory/BACKLOG]] T-27, T-37,
T-54, T-55, T-56 · [[../project-memory/DECISIONS]] D-35 · `../supabase/CONTENT.md`

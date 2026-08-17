# SESSION-029

## Fecha

2026-08-17

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Tres cosas encadenadas, ninguna prevista al empezar: **(1)** resolver la discusión sobre R-30 con el
argumento que trajo el owner; **(2)** ejecutar **T-93** (leer el contrato de Cpech) con el documento
que aportó; **(3)** definir qué significa *"listo para promocionar"* y empezar por el criterio
**L-2** (contenido de geometría, T-56).

## Contexto de entrada

- Rama: `main` @ `54f4d55` (T-05 y T-12 ya en producción)
- Estado del árbol: **limpio**
- Bloqueos al empezar: T-93 era P0 y bloqueante de dos de los tres canales de distribución

## Actividades realizadas

### 1. El owner refutó parcialmente R-30, y tenía razón

Llevaba tres sesiones cerrando con la misma advertencia (*"esto fue producto, no distribución"*). El
owner respondió con tres argumentos, y **el primero es correcto y obliga a corregir la memoria**:

- Los tres "intentos" que R-30 usa como evidencia fueron **financiamiento estatal (2012, nunca se
  lanzó)** y un **convenio de desarrollo (UNAP, 2025, le pagaron por construir)**. **Ninguno fue un
  intento de promoción de este producto.** *"Murió tres veces en distribución"* sobreestima la
  evidencia; lo correcto es *"tres veces no se llegó a intentar"*.
- Cambió una condición material: antes tenía poca experiencia de programación, hoy es desarrollador
  senior y trabaja asistido. El rendimiento de estas dos sesiones lo respalda.
- Su objeción de producto es la correcta y coincide con la memoria: el banco **no está calibrado**
  (R-17, y D-48 lo pone como precondición dura de G-1), y el producto **no está diseñado para una
  clase** (L-36 / R-31) — aplicarlo a un curso obliga a que 40 personas se registren e individualmente
  rindan.

**Lo que se mantiene, dicho una vez y no más:** el riesgo no es la semana de producto, es que la
semana no tenga condición de término. De ahí salió el punto 3.

### 2. T-93 ejecutada: contrato de Cpech leído

Ver la sección de resultados. **Respuesta principal buena, hallazgo secundario malo.**

### 3. Definidos los criterios L-1…L-5 y empezado L-2

Registrados en `PROJECT_BRIEF` §6, deliberadamente **separados** de S-11…S-18 (esos son criterios de
éxito del negocio e incluyen "primer contrato pagado"; L-1…L-5 es una barrera anterior: *¿puedo
mandar tráfico a esto sin quemarlo?*). El owner eligió empezar por **L-2**.

Al abrir T-56 apareció una advertencia suya: *"subordinada a T-51 y T-54; generar contenido antes de
que el plan sepa entregarlo es echar agua en un balde perforado"*. **Se verificó y ya no aplica:**
T-51 y T-53 están hechas. T-54 sigue abierta pero es una mejora para los 18 módulos, no un
impedimento para geometría.

## Resultados

### T-93 — contrato de Cpech

**Lo que se buscaba (cesión de PI): no existe.** Ninguna cláusula cede al empleador lo que el
trabajador crea; la única cláusula de PI protege el material que la empresa **entrega**. Tampoco hay
exclusividad. Dos refuerzos independientes: la función contratada es **docente**, no desarrollo de
software (relevante para el art. 8 de la Ley 17.336, que solo alcanza al software hecho *en el
desempeño de las funciones laborales*), y **el primer commit del repo es diez meses anterior al
inicio del contrato**, con fechas verificables en un historial público. **R-32 baja de "muy alto" a
"medio"** y la titularidad del proyecto deja de estar en discusión.

**Lo que no se buscaba y apareció: el canal Cpech está cerrado por contrato.** Cuatro cláusulas
concurrentes prohíben derivar alumnos a servicios de preuniversitario ajenos —redactado como causal
justificada de despido y vigente **fuera de jornada**—, crear grupos de estudio con sistemas no
autorizados (que es la función de cupos) y usar material propio en clases. **No se arregla con un
deslinde por escrito.** El contrato es de plazo fijo y vence el **2026-11-21**; después no hay
restricción. **T-87 queda marcada como no viable en Cpech hasta esa fecha.**

**El canal del liceo no está alcanzado** (las prohibiciones son sobre los alumnos de Cpech), pero
**su contrato es otro y no se ha leído**: Q-38 queda respondida a medias.

> ⚠️ **Decisión de privacidad del owner:** el repo es público y el contrato tiene sus datos
> personales y los de terceros. Se registró **solo la conclusión operativa** — sin montos, sin RUT,
> sin domicilios, sin nombres, sin citas textuales. El texto **no está en el repositorio y no debe
> agregarse**; si una sesión futura lo necesita, se lo pide al owner. Mismo criterio que R-26.

### L-2 — contenido de geometría (T-56)

`supabase/migrations/044_geometria_resources.sql`, **18 recursos**, `published = false`:

| Módulo | Recursos |
|---|---|
| `geometria/angulos` | 3 — pares notables · paralelas y transversal · ángulos de un polígono |
| `geometria/triangulos` | 4 — suma 180° · semejanza (con $k^2$ en áreas) · área y cuál es la altura · desigualdad triangular |
| `geometria/circulo` | 3 — perímetro/área y el error radio-diámetro · ángulo del centro e inscrito · sector y arco |
| `geometria/areas` | 4 — cuadriláteros · figuras compuestas · efecto de escalar · unidades (factor 10.000) |
| `geometria/volumenes` | 4 — prisma y cilindro · pirámide y cono · esfera · volumen y capacidad |

**Auditoría numérica (ADR-016): 72 comprobaciones, 0 fallas.** Se recalculó **cada** ejemplo de los
18 recursos con un script aparte, más las cotas de π de Arquímedes que aparecen en un contexto
histórico ($3+\\frac{10}{71}$ y $3+\\frac{1}{7}$). **Eso certifica las cuentas, no la pedagogía.**

## Lo que no funcionó / se corrigió sobre la marcha

- **Escribí "20 recursos" en la cabecera de la migración cuando son 18.** Lo detectó la validación
  estructural, no la lectura. Corregido — es exactamente el tipo de número que la memoria no debe
  inventar (mismo patrón que L-22).
- **Dejé siete `historical_context` sin acentos** ("uso" por "usó", "Arquimedes"…), inconsistentes
  con el resto del archivo y con `018`/`019`. Corregidos.
- **Un `\\n\\n` de más partía en dos una lista** en el recurso de triángulos. Corregido.
- **Verifiqué el renderizador antes de dar el formato por bueno**, en vez de asumirlo: `math_render`
  soporta `$…$`, `$$…$$` y `**negrita**`; las listas con `-` **no** se convierten en `<ul>`
  (limitación conocida, D-40) pero se leen igual y es el mismo estilo del contenido ya publicado.

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `supabase/migrations/044_geometria_resources.sql` | **Nuevo.** 18 recursos, `published = false`, idempotente |
| `supabase/SCHEMA.md` | Entrada 46: aplicada 2026-08-17, con la advertencia de que aplicarla no cumple L-2 |
| `supabase/queries/L-2_cobertura_de_recursos.sql` | **Nuevo.** Cinco bloques de solo lectura que miden L-2 y atajan el fallo silencioso de `insert … select` |
| `project-memory/PROJECT_BRIEF.md` | **Criterios L-1…L-5** de "listo para promocionar" + el encuadre de la discusión sobre R-30 |
| `project-memory/BACKLOG.md` | T-93 → `hecho a medias`; T-87 marcada ⛔ hasta 2026-11-21; T-56 → P0 `en curso`, con la nota de dependencia revisada |
| `project-memory/RISKS.md` | R-32 rebajado de "muy alto" a "medio", con el anexo de T-93 |
| `project-memory/OPEN_QUESTIONS.md` | Q-38 respondida a medias |

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde |
|---|---|---|
| Criterios L-1…L-5 de "listo para promocionar"; una semana de producto contra ellos y después promoción | No (es un criterio, no arquitectura) | `PROJECT_BRIEF` §6 |
| Del contrato solo se registra la conclusión operativa; el texto no entra al repo público | No | Este archivo, `BACKLOG` T-93 |
| Geometría se redacta sin fuente bibliográfica, y sin crear módulos nuevos | No | Cabecera de `044` |

## Riesgos

| Riesgo | Cambio | Dónde |
|---|---|---|
| R-32 (PI y conflicto de interés) | 🔻 **de "muy alto" a "medio"**: no hay cesión de PI. Queda el conflicto de interés, con fecha de término | `RISKS` R-32 |
| Canal Cpech inutilizable hasta 2026-11-21 | **Nuevo, contractual** | `BACKLOG` T-87, T-93 |
| Contrato del liceo sin leer | Sigue abierto | `OPEN_QUESTIONS` Q-38 |

## Pendientes

1. ✅ **`044` aplicada por el owner el mismo día.** ⏳ **Falta publicar**, que es lo que realmente
   cierra L-2: los 18 entraron con `published = false` y un recurso sin publicar **no existe para el
   estudiante** (policy `resources_select_published`). Se dejó
   `supabase/queries/L-2_cobertura_de_recursos.sql` para medirlo, en vez de darlo por hecho.
2. **Del owner:** leer el contrato del liceo (segunda mitad de T-93 / Q-38).
3. **L-1** es el otro criterio que un desconocido nota: X-02, la FAQ promete ver el progreso al
   repetir el diagnóstico y no hay histórico. Dos vías: implementar T-26 (que además es G-4/D-50) o
   ajustar el copy.
4. Snapshot de `project-memory/graph/`: no refrescado (esta sesión no toca código ClojureScript).

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/PROJECT_BRIEF.md` (criterios L-1…L-5)
- [x] `project-memory/BACKLOG.md` (T-93, T-87, T-56)
- [x] `project-memory/RISKS.md` (R-32)
- [x] `project-memory/OPEN_QUESTIONS.md` (Q-38)
- [x] `supabase/SCHEMA.md`
- [ ] `project-memory/CURRENT_STATUS.md` — **pendiente**, se actualiza al cerrar la semana
- [ ] `project-memory/DECISIONS.md` — sin decisión con ADR
- [ ] `project-memory/graph/` — sin cambios de código

## Notas

- **Lo más importante de esta sesión no es el contenido, es que R-30 se calibró con evidencia.** La
  memoria afirmaba más de lo que la evidencia sostenía, y el owner lo detectó. Queda anotado en
  `PROJECT_BRIEF` §6 para que ninguna sesión futura vuelva a usar "murió tres veces en distribución"
  como hecho establecido.
- **Y el hallazgo caro es el de T-93 al revés de como se esperaba:** se fue a buscar un riesgo de
  propiedad intelectual que no existía, y se encontró que el canal comercial está cerrado por
  contrato. Vale la pena recordarlo la próxima vez que un riesgo se dé por entendido sin leer la
  fuente.

---

Relacionado: [[../project-memory/PROJECT_BRIEF]] · [[../project-memory/RISKS]] R-32 ·
[[../project-memory/BACKLOG]] T-56/T-87/T-93 · [[SESSION-028]]

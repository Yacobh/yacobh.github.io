# ADR-006: Cohortes por banda de θ con confirmación al alcanzar un mínimo de inscritos

## Estado

Aprobada

## Fecha

2026-07-24 (documentada retroactivamente el 2026-07-26)

## Contexto

> **Contexto reconstruido** desde `supabase/migrations/001_mvp_schema.sql`,
> `src/universo/slots/logic.cljs` y sus tests, y los commits `b40e741` y `6cf0dc9`.

El diagnóstico produce un θ continuo y un perfil de errores. Eso responde "qué estudiar", pero el
producto también promete "con quién estudiarlo": grupos de preparación online y presenciales en
Iquique.

Dos problemas de negocio:

1. **¿Cómo agrupar?** Un grupo con niveles muy dispares reproduce el problema del preuniversitario
   tradicional: unos quedan atrás, otros se aburren. Pero θ es continuo: no se puede formar un grupo
   por valor exacto de θ.
2. **¿Cuándo dictar la clase?** Con volumen bajo de estudiantes, un grupo puede quedar con 2 inscritos.
   Dictar una clase para 2 personas no es viable para el único profesor; anunciar un grupo y luego
   cancelarlo daña la confianza.

Restricciones:

- Un solo profesor dicta las clases: su tiempo es el recurso escaso.
- Sala presencial en Iquique sujeta a disponibilidad.
- Sin pagos: no hay señal económica de compromiso, solo la inscripción.
- El estudiante debe entender el estado de su inscripción sin tener que preguntar.

## Decisión

### Agrupación por banda de θ

θ se discretiza en **cuatro bandas** que definen la elegibilidad para un cupo:

| Banda | Rango de θ |
|-------|-----------|
| `inicial` | θ < 0 |
| `basico` | 0 ≤ θ < 1 |
| `intermedio` | 1 ≤ θ < 2 |
| `avanzado` | θ ≥ 2 |

Un estudiante **solo ve** cupos de su banda, en estado `open` o `confirmed`. **Sin diagnóstico previo
no ve ningún cupo** (sin banda ⇒ lista vacía, con mensaje que invita a diagnosticarse).

### Confirmación por mínimo de inscritos

Cada `class_slots` declara `capacity` y **`min_enrollments`**. El cupo nace `open`. Cuando los
enrollments **activos** (`pending` ∪ `confirmed`) alcanzan `min_enrollments`, un **trigger de
PostgreSQL** cambia el cupo a `confirmed` e inserta una `notifications` por inscrito.

**La fuente de verdad de la confirmación es el trigger en la base de datos.** El cliente implementa un
**espejo puro** (`universo.slots.logic`) para mostrar el resultado esperado sin esperar al servidor:

- `filter-slots-for-band` — qué cupos son visibles
- `active-enrollment-count` — cuántos cuentan
- `remaining-to-confirm` — cuántos faltan
- `should-confirm-slot?` / `after-enrollment` — qué pasará al inscribirse

Mientras no se alcance el mínimo, la UI muestra explícitamente **cuántos inscritos faltan**.

### Modalidad

Cada cupo declara `modality` (`online` | `presencial`), `starts_at` y `location_or_link` (enlace de
videollamada o sala en Iquique).

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Agrupar por **curso o nivel escolar** | Es lo que hace el preuniversitario tradicional y precisamente el problema que el producto dice resolver: dos estudiantes de 4º medio pueden tener niveles opuestos |
| Agrupar por **θ continuo** (algoritmo de clustering) | Grupos óptimos en teoría, pero imposibles de publicar por anticipado: el estudiante no puede inscribirse en un grupo que aún no existe |
| **Más bandas** (6–8 niveles) | Grupos más homogéneos, pero cada banda tendría menos candidatos y ningún cupo alcanzaría su mínimo. Cuatro bandas es el compromiso entre homogeneidad y viabilidad |
| **Menos bandas** (2: básico/avanzado) | Más fácil de llenar, pero pierde el argumento de "nadie queda atrás" |
| Agrupar por **déficit de módulo** en lugar de por nivel | Pedagógicamente atractivo (un grupo de "fracciones"), pero fragmenta aún más la demanda y complica el calendario del profesor. Candidato futuro cuando haya volumen |
| **Confirmar siempre** (sin mínimo) | Riesgo de dictar clases para 2 personas o de cancelar a última hora |
| **Confirmación manual** por el admin | Más control, pero introduce latencia y trabajo manual; el estudiante queda esperando una decisión humana |
| Confirmar por **pago** en lugar de por inscripción | No hay pagos en el MVP (exclusión explícita) |
| Regla de confirmación **solo en el cliente** | Manipulable y no autoritativa: dos estudiantes podrían ver estados distintos |
| Regla **solo en la base de datos**, sin espejo | Correcto pero peor experiencia: la UI no podría anticipar "con tu inscripción el grupo se confirma" sin un round-trip |

## Consecuencias

**Positivas**

- **La banda conecta el diagnóstico con la acción:** el resultado del test no es un número decorativo,
  determina en qué grupo puede entrar. Eso da propósito a completar el diagnóstico.
- **El profesor no dicta clases inviables:** el mínimo protege su tiempo, que es el recurso escaso.
- **El estudiante entiende el estado** sin preguntar: "faltan N inscritos" o "grupo confirmado".
- **La confirmación es automática y auditable**: ocurre en la base de datos, en el mismo lugar que los
  datos, sin proceso externo ni intervención humana.
- **El espejo puro es testeable**: `slots.logic` tiene tests para banda incorrecta, banda `nil`,
  conteos en 0 y el umbral exacto de confirmación.
- **Un incentivo social útil:** ver "falta 1 inscrito" motiva a compartir el enlace.

**Negativas / costos aceptados**

- **Regla duplicada a propósito** (SQL + ClojureScript). Si se cambia una y no la otra, la UI miente o
  la base rechaza. Es deuda deliberada, documentada (R-08).
- **Los bordes de banda son duros:** θ = 0,99 y θ = 1,01 van a grupos distintos, aunque la diferencia
  esté dentro del error de medición (SE ≈ 0,35). Un estudiante en un borde puede quedar mal ubicado
  (A-11).
- **Con el límite `|Δθ| ≤ 0,4` y máximo 12 ítems, la banda `avanzado` es difícil de alcanzar** en un
  test corto: puede quedar sin candidatos y por tanto sin cupos viables (ADR-004).
- **Un cupo que no alcanza el mínimo deja a los inscritos esperando** sin plazo ni comunicación
  definida (R-11, Q-16). Es la consecuencia negativa más visible para el estudiante.
- **Sin diagnóstico no hay cupos visibles:** correcto conceptualmente, pero significa que un
  estudiante que solo quiere clases debe pasar por el test.
- **`capacity` puede no estar controlada:** no está verificado si existe check o trigger que impida
  superarla (Q-04, T-03).
- **Bandas definidas en dos lenguajes** (`profile/theta-band` y el `check` de `class_slots.theta_band`),
  con la trampa adicional de que en la base van sin acento (`basico`).

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Cupos que nunca alcanzan el mínimo | T-25 (comunicar faltantes y plazo); definir política de cancelación o fusión de bandas (Q-16); usar mínimos bajos al inicio | R-11 |
| Regla espejo desincronizada | Documentado en `ARCHITECTURE` §2.3; regla: cambiar una implica cambiar la otra en el mismo commit, con test | R-08 |
| Estudiante mal clasificado en un borde de banda | Validar con datos cuántos casos ocurren; considerar permitir inscribirse en la banda contigua | A-11 |
| Sobrepasar la capacidad del cupo | T-03: verificar y, si falta, agregar control con test espejo | Q-04 |
| Bandas divergentes entre cliente y base | Ambas definiciones enlazadas en la documentación; test de `theta-band` cubre los cuatro bordes | R-08 |

## Seguimiento

Revisar cuando haya datos reales de inscripción:

1. **Distribución de estudiantes por banda** vs cupos publicados: si una banda concentra a casi todos,
   quizá haga falta subdividirla; si otra queda vacía, no publicar cupos ahí.
2. **Tasa de confirmación** (cupos confirmados / publicados). Baja ⇒ los mínimos son demasiado altos.
3. **Tiempo medio hasta la confirmación.** Largo ⇒ hace falta comunicar el estado activamente (T-25).
4. **Casos en bordes de banda:** cuántos estudiantes quedan a menos de un SE de un borde.
5. Evaluar si conviene un segundo criterio de agrupación (por `track` o por déficit) además de la banda.

Cualquier cambio en el número de bandas o en la semántica de la confirmación requiere **un ADR nuevo**
que reemplace a este, porque afecta a datos ya existentes (`student_profiles.theta_band`,
`class_slots.theta_band`).

---

Relacionado: [[../project-memory/REQUIREMENTS]] RF-5, RN-06..RN-09 ·
[[../project-memory/ARCHITECTURE]] §2.3, §4.3 · [[../project-memory/RISKS]] R-08, R-11 ·
[[ADR-004-irt-1pl-map-y-regla-de-parada]] · [[ADR-007-email-outbox-con-edge-function]]

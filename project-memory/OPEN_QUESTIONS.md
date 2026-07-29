# OPEN_QUESTIONS

Última actualización: **2026-07-28**

> **Regla fundamental de PMF: si falta información, no se asume — se registra aquí.**
> Ninguna pregunta se borra: cuando se responde, se marca ✅ con la fecha y la respuesta, y si
> genera una decisión se crea el ADR correspondiente.

Estado: 🔴 abierta y bloqueante · 🟠 abierta e importante · 🟡 abierta menor · ✅ respondida

---

## Producto y negocio

### ✅ Q-01 · ¿Cuál es el vínculo formal con la UNAP?
**Respondida 2026-07-28 (owner):** hubo un convenio a honorarios entre el owner y la Universidad
Arturo Prat (oct–nov 2025, ya terminado), de alcance acotado: diseño de una plataforma de tutorías
para la comunidad universitaria, como Proyecto de Desarrollo Institucional. No es un convenio de
marca ni una alianza institucional vigente; el convenio terminó sin que la plataforma quedara
finalizada, aunque fue dado por aprobado. No hay autorización de uso de marca ni vínculo activo hoy.
**Decisión:** ver D-18 en [[DECISIONS]] — se bajó la mención de UNAP de "iniciativa" (badge del
hero, stat del hero, CTA banner) a nota histórica en el FAQ y el footer ("proyecto personal...
que se originó en 2025 a partir de un convenio de desarrollo con la Universidad Arturo Prat").
El detalle del convenio (folio, montos, datos personales) no se documenta aquí por ser un
repositorio público — queda solo con el owner.
**Impacto:** el copy publicado ya no afirma un vínculo institucional vigente; revisar R-06 si
cambian las obligaciones de privacidad derivadas de esta afirmación.

### 🟠 Q-02 · ¿Las clases de los cupos tienen costo?
**Respondida (política) 2026-07-28 (owner):** sí, las clases tendrán costo, **salvo la primera
clase** después de rendir el diagnóstico, que es gratuita. El precio de las clases pagadas debe
quedar **significativamente por debajo** de alternativas comparables (preuniversitario tradicional
o clases particulares).
**Referencia de mercado (2026-07-28, búsqueda web, no vinculante):** preuniversitario presencial
tradicional en Chile ≈ $80.000–$120.000 CLP/mes; clases particulares de matemática por hora ≈
$8.000–$20.000 CLP (online más barato, $8.000–$12.000; presencial hasta $30.000 en algunas
ciudades); planes online tipo preu desde ≈ $19.900 CLP/mes. Grupos pequeños presenciales (p. ej.
Preuniversitario Tesla, máx. 12 alumnos) se mueven dentro del rango de preu tradicional, no del de
clase particular 1:1. Fuentes: [2x3.cl](https://www.2x3.cl/p/precios-clases-particulares-matematicas),
[Cronoshare](https://www.cronoshare.cl/cuanto-cuesta/clases-particulares-matematicas),
[Tutorali](https://tutorali.cl/que-valor-tiene-un-preuniversitario-en-chile/),
[Superprof](https://www.superprof.cl/blog/precio-clases-particulares-matematicas/).
**Aún pendiente (P-03 sigue abierta para esto):** el número exacto (precio por clase vs. paquete
mensual), y si se cobra por sesión o por banda/cupo completo. **Bloquea:** copy definitivo, JSON-LD,
[[BACKLOG]] T-04.
**Nota 2026-07-27:** [[VISION_LIBRO_PROYECTO]] §4.4 ya proponía pago por clase o paquete; esta
respuesta del owner confirma esa dirección general (con la primera clase gratis como matiz nuevo),
pero el número aún no está fijado.

### ✅ Q-03 · ¿Hay requisito de consentimiento o aviso de privacidad?
Público mayoritariamente menor de edad + recolección de datos personales (email, IP, geo,
dispositivo, respuestas). Ya no hay respaldo universitario vigente que mostrar (ver Q-01).
**Bloquea moralmente:** apertura a estudiantes reales (F8). **Relacionado:** R-06, T-10, Q-08.
**Nota 2026-07-28:** la **Ley 21.719** (nueva ley chilena de protección de datos) entra en plena
vigencia el **1 de diciembre de 2026** — ~4 meses desde hoy — con reglas escalonadas por edad
(consentimiento parental obligatorio <14 años; solo para datos sensibles entre 14–15; reglas
generales ≥16). El signup actual no pide edad, así que no hay forma de distinguir a un usuario
<14. Se dejó un primer borrador de Aviso de Privacidad + checklist de decisiones pendientes en
[[AVISO_PRIVACIDAD_BORRADOR]] (no publicado, no revisado legalmente). **Respondida 2026-07-28 (owner):** (1) canal de solicitudes = flujo en la app: el usuario pide la
eliminación desde una sección propia "Configuración de cuenta", un admin la ve como alerta en
Admin → Usuarios (no un email dedicado); (2) retención = 12 meses de inactividad, luego se borran
los datos identificables y se conservan solo estadísticas ya anonimizadas — política publicada,
pero el job automático que la ejecuta **no existe todavía** (ticket [[BACKLOG]] T-34); (3) edad =
declaración propia al registrarse ("tengo 14 años o más, o cuento con autorización de mi
representante"), sin campo de fecha de nacimiento ni bloqueo duro — cualquier caso especial se
deriva al formulario de contacto; (4) revisión legal = el owner mismo por ahora, se contratará
abogado cuando el negocio crezca — **riesgo aceptado explícitamente**, no un olvido.
**Implementado 2026-07-28:** Aviso de Privacidad publicado (`universo.components.privacidad`,
enlazado desde el footer), checkbox obligatorio + declaración de edad en el registro
(`login.cljs`), y sección **Configuración de cuenta** (`:cuenta`, `components/cuenta.cljs`,
protegida por sesión, enlazada desde la navegación — no una tarjeta dentro del tablero) con dos
cosas: editar `full_name`/`phone` en `profiles` (migración `010`) y solicitar la eliminación de
cuenta (→ notificación → alerta en Admin/Usuarios, migración `009`). Ver [[BACKLOG]] T-10 (qué
falta para cerrarlo del todo) y T-34 (automatizar la retención).

### 🟠 Q-09 · ¿Qué `capacity` y `min_enrollments` corresponden a un cupo real?
Los datos demo usan capacidad 6–8 y mínimo 3, valores elegidos para probar. No hay criterio de
negocio (tamaño de sala, carga docente, viabilidad del grupo).
**Bloquea:** T-04.

### 🟡 Q-10 · ¿Qué define un "módulo prioritario" más allá de la lista de `supabase/CONTENT.md`?
La lista actual (`aritmetica/enteros`, `fracciones`, `potencias`, `algebra/ecuaciones`,
`expresiones`, `geometria/basica`, `pitagoras`) dice estar basada en "déficits reales de tus tests",
pero no hay consulta ni dato que lo respalde en el repo.
**Relacionado:** T-01, T-21.

### 🟠 Q-16 · ¿Qué pasa con un cupo que no alcanza el mínimo?
No hay plazo, cancelación automática ni comunicación definida. El estudiante queda esperando.
**Bloquea:** T-25. **Decisión pendiente:** P-08. **Relacionado:** R-11.

### 🟠 Q-21 · ¿El owner confirma la visión de negocio del "Libro del Proyecto"?
[[VISION_LIBRO_PROYECTO]] (2026-07-27) propone un modelo de negocio de pago, expansión
multi-materia e internacionalización que contradice el alcance y las exclusiones ya decididas en
[[PROJECT_BRIEF]] y [[BUSINESS_CONTEXT]]. Es un borrador v0.1, no una decisión.
**Por qué importa:** define si F8–F11 siguen siendo el único horizonte o si corresponde abrir una
épica de negocio nueva en [[BACKLOG]]. **Para quién:** owner.

### 🟡 Q-22 · ¿"Grupos de conocimiento" (3, libro) reemplazan a las bandas de θ (4, código)?
El libro clasifica en Básico/Medio/Avanzado; el código ya implementado usa
`inicial/basico/intermedio/avanzado`. No está dicho si son la misma idea con nombres distintos, si
el libro simplifica a propósito, o si se espera migrar `class_slots.theta_band` a un esquema nuevo.
**Bloquea:** cualquier trabajo futuro sobre el Eje 2 (frecuencia λ) o el Eje 3 (estilo de
aprendizaje). **Relacionado:** [[VISION_LIBRO_PROYECTO]] §3.4.

### 🟡 Q-23 · ¿"Academia Online de Matemáticas" y "Academia Integral" son el mismo proyecto?
El libro usa un nombre de marca distinto al ya publicado en producción (landing, JSON-LD, footer).
No está dicho si es un rebranding planeado, un nombre de trabajo interno, o dos iniciativas
relacionadas pero separadas (una académica/UNAP, otra comercial/startup).
**Por qué importa:** afecta copy, dominio, JSON-LD y la relación declarada con UNAP (Q-01) si el
proyecto se reposiciona como startup con inversión externa.

---

## Dominio (IRT y contenido)

### 🟠 Q-05 · ¿Están calibradas las `difficulty` del banco de ítems?
El modelo 1PL depende enteramente del parámetro `b`. Si las dificultades fueron asignadas a
criterio y no estimadas con respuestas reales, θ (y con ella la banda y el cupo asignado) puede
estar sesgada. Tampoco se sabe cuántos ítems hay por topic.
**Cómo responderla:** `select topic, count(*), min(difficulty), max(difficulty), avg(difficulty)
from questions group by topic;`
**Relacionado:** R-17, T-29.

### 🟠 Q-06 · ¿Los topics del banco cubren los ejes reales de la PAES M1?
`universo.profile/topic->module-slug` mapea solo un subconjunto (`numbers_V1`, `numeros`, `enteros`,
`fracciones`, `potencias`, `algebra`, `geometria` y variantes con acento). Todo topic no mapeado cae
en `unknown/<topic>`, lo que produce un déficit **sin módulo** y por lo tanto **sin recursos**.
**Cómo responderla:** `select distinct topic from questions;` y comparar con `modules.slug`.
**Bloquea:** T-28.

### 🔴 Q-07 · ¿Qué semántica tiene repetir el diagnóstico?
`student_profiles` es una materialización única por estudiante. La FAQ promete explícitamente que
repetir el diagnóstico "te muestra cómo se movió tu nivel", lo que **requiere histórico** — hoy
probablemente se sobrescribe.
**Bloquea:** T-26. **Decisión pendiente:** P-01. **Nota:** hay una posible contradicción entre lo
prometido en la FAQ y lo implementado; registrada aquí por la regla 14 de gobernanza.

### 🟡 Q-17 · ¿El tiempo de respuesta influye en la estimación?
La FAQ afirma: "El tiempo de respuesta también se considera en la estimación". El modelo 1PL
implementado usa **solo** dificultad y acierto; `time-ms` se registra pero no entra en el cálculo de
θ.
**Contradicción documentada** entre copy e implementación. Resolver: corregir el copy o incorporar
el tiempo al modelo (lo segundo es un cambio de dominio → ADR).

---

## Técnicas

### ✅ Q-04 · ¿La inscripción respeta `capacity`? — Respondida 2026-07-29
**No.** `001_mvp_schema.sql` solo define un trigger `enrollments_confirm_threshold`
(`AFTER INSERT OR UPDATE OF status ON enrollments`) que ejecuta
`confirm_slot_if_threshold()`: recalcula `active_enrollments` y confirma el cupo cuando llega a
`min_enrollments`. No hay ningún `BEFORE INSERT` ni `CHECK` que impida que los enrollments activos
superen `class_slots.capacity`. La policy `enrollments_insert_own` (`001`) solo exige
`user_id = auth.uid()`, sin condición de cupo. El único límite es de UI:
`components/slots.cljs` oculta el botón "Inscribirme" cuando `active >= capacity` (muestra "Cupo
lleno"), pero eso no es un control de seguridad — una llamada directa a la API de Supabase con un
usuario autenticado puede insertar el enrollment N+1 sin error.
**Bloquea:** T-03, cierre de F3 → **sigue bloqueando**, ahora con causa raíz confirmada.

### 🟠 Q-12 · ¿Qué policy usa el estudiante para leer `questions`?
`007_questions_admin_rls.sql` restringe SELECT a `is_admin()`, pero el diagnóstico necesita leer
preguntas como estudiante. O existe otra policy previa más permisiva, o el flujo usa otra vía.
**Por qué importa:** si `authenticated` puede hacer SELECT sobre `questions`, el banco completo
—incluidas `correct_option` y las explicaciones— es descargable (R-16).
**Cómo responderla:** revisar todas las policies de `questions` en el proyecto real
(`select * from pg_policies where tablename = 'questions';`).

### ✅ Q-13 · ¿Qué versión está realmente en producción? — Respondida 2026-07-29
`git log main..cursor/mvp-operable-funnel` está vacío: esa rama quedó **completamente mergeada** a
`main` (PR #14, luego PR #15 "Configuracion"). Verificado además por hash: se descargó
`https://jacobocordova.com/public/js/app.js` (`curl`, el `index.html` real referencia
`./public/js/app.js`, no `./js/app.js`) y su MD5 (`da3cd5e1de8717d10bbc9bf602baf1c1`) coincide
byte a byte con `git show origin/main:public/js/app.js`. **Producción sirve exactamente
`origin/main` @ `4998785`**, sin desfase.

**Pero surge una brecha nueva:** la rama `visual-fixes` (`520ff79` "minor fixes" — unifica estilos
en varios componentes — y `0fd5f79`, el fix de capacidad de T-03) está pusheada a
`origin/visual-fixes` pero **no mergeada a `main`**, así que ese trabajo todavía no está en
producción. La migración `011` sí está aplicada en la base real (T-03), así que el control de
capacidad ya protege en producción independientemente del frontend desplegado — pero el resto de
`visual-fixes` (unificación de estilos, refactor de UI) no.
**Tarea:** T-19 sigue abierta como seguimiento de "cuándo mergear `visual-fixes` → `main`".

### 🟡 Q-11 · ¿En qué región está el proyecto Supabase y en qué plan?
Afecta latencia para usuarios en Iquique, límites del free tier y política de respaldos.
**Relacionado:** R-03, R-15.

### 🟡 Q-15 · ¿Instrumentación propia o herramienta externa?
Una solución propia en Postgres mantiene los datos en casa (mejor para privacidad de menores) pero
hay que construirla; una herramienta externa es inmediata pero agrega un tercero que recibe datos.
**Bloquea:** T-20. **Decisión pendiente:** P-04.

### 🟡 Q-18 · ¿Se usó alguna vez `bookings` en el `app-db`?
`universo.db/default-db` define `:bookings {:by-id {} :all-ids []}` pero no hay tabla, evento ni
componente que lo use. ¿Resto de un diseño anterior o preparación de algo?
**Impacto:** bajo; limpieza.

### 🟡 Q-19 · ¿`visitor_tracker` sigue siendo necesario y proporcionado?
Recolecta IP, geolocalización, idioma, navegador y SO en cada carga. Sin analytics ni reporte que lo
consuma, el dato se acumula sin uso mientras suma riesgo de privacidad.
**Relacionado:** R-06, T-10.

---

## Proceso

### 🟠 Q-14 · ¿La fase F11 (escala pedagógica) refleja la intención real del owner?
Las fases F0–F7 están reconstruidas del historial y son verificables; F8–F10 son consecuencia
directa de los bloqueos actuales; **F11 es una propuesta** hecha al documentar, no una decisión.
**Cómo responderla:** el owner confirma, reordena o descarta en la próxima sesión y se actualiza
[[ROADMAP]].

### 🟡 Q-20 · ¿Se conservan las 12 ramas locales / 11 remotas por alguna razón?
Ninguna está documentada. Puede haber trabajo valioso sin mergear.
**Tarea:** T-18. **Relacionado:** R-21.

---

## Contradicciones detectadas (regla de gobernanza 14)

| # | Contradicción | Documentos implicados | Resolución propuesta |
|---|---------------|----------------------|----------------------|
| X-01 | La FAQ dice que el tiempo de respuesta se considera en la estimación; el modelo 1PL no lo usa | `index.html`, `landing.cljs` vs `components/tetha.cljs` | Q-17: corregir copy **o** cambiar el modelo (ADR) |
| X-02 | La FAQ promete ver "cómo se movió tu nivel" al repetir el diagnóstico; `student_profiles` no guarda histórico | FAQ vs `001_mvp_schema.sql` | Q-07 / P-01 |
| X-03 | `007` restringe SELECT de `questions` a admin, pero el estudiante debe leer preguntas | `007_questions_admin_rls.sql` vs flujo de `events/test.cljs` | Q-12: auditar policies reales |
| X-04 | `.gitignore` ignora `src/universo/user.cljs`, pero el archivo está trackeado en Git | `.gitignore` vs `git ls-files` | T-16 |
| X-05 | `shadow-cljs` 3.0.4 en `deps.edn` vs `^2.19.2` en `package.json` | `deps.edn` vs `package.json` | T-13 |
| X-06 | KaTeX `^0.16.22` por npm vs CSS 0.16.9 por CDN | `package.json` vs `index.html` | T-13 |
| X-07 | `PROJECT_SUMMARY.md` describe una estructura de módulos previa al MVP (menciona `views.cljs` con componentes principales, `jardin`, `voz`… como parte del producto) que ya no refleja el sistema | `PROJECT_SUMMARY.md` vs [[ARCHITECTURE]] | T-33: reducir a puntero o archivar |
| X-08 | El "Libro del Proyecto" propone pago por clase, multi-materia e internacionalización | [[VISION_LIBRO_PROYECTO]] vs [[PROJECT_BRIEF]] §6, [[BUSINESS_CONTEXT]] §5 | Q-21: confirmación del owner antes de tocar copy, JSON-LD o alcance |

---

## Preguntas respondidas

*(vacío — la primera respuesta se registra aquí con fecha, respuesta y ADR si corresponde)*

Formato:

```
### ✅ Q-NN · Pregunta  — respondida 2026-MM-DD
**Respuesta:** …
**Consecuencia:** ADR-0NN / tarea T-NN / cambio en [[ARCHIVO]]
```

---

Relacionado: [[ASSUMPTIONS]] · [[DECISIONS]] · [[RISKS]] · [[REQUIREMENTS]] §7 · [[CURRENT_STATUS]] ·
[[VISION_LIBRO_PROYECTO]]

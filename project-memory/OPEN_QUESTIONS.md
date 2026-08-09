# OPEN_QUESTIONS

Última actualización: **2026-08-09** (Q-20 respondida; X-04/X-05/X-06 resueltas)

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

### ✅ Q-02 · ¿Las clases de los cupos tienen costo? — Número fijado 2026-07-30
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
**Número fijado 2026-07-30 (owner):** **$6.000 CLP por hora de clase**, después de la primera
videollamada gratuita. Se cobra **por hora**, no por paquete mensual. Queda por debajo de todo el
rango de referencia de mercado relevado arriba (mínimo observado ≈ $8.000/hora).
**Falta para implementar:** el precio no está en ningún lado del copy/UI/JSON-LD todavía — falta
decidir dónde mostrarlo (landing, cupos, plan) y cómo se cobra en la práctica (no hay pasarela de
pago; ver [[BACKLOG]] T-04 y el nuevo punto de cobro manual/transferencia a definir).
**Nota 2026-07-27:** [[VISION_LIBRO_PROYECTO]] §4.4 ya proponía pago por clase o paquete; esta
respuesta del owner confirma esa dirección general (con la primera clase gratis como matiz nuevo).
**Precio revisado 2026-08-02 (D-32):** el número de $6.000 se había anclado contra el piso de
clases particulares 1:1 (~$8.000/hora) relevado arriba; el comparable correcto para un formato
**grupal** es el preuniversitario tradicional (~$80.000–$120.000 CLP/mes ≈ $7.000–$15.000/hora
equivalente), contra el cual $6.000 quedaba barato. Nuevo precio: **$10.000 CLP por hora**, misma
estructura (por hora, primera videollamada gratis). Ver [[DECISIONS]] D-32.

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

### ✅ Q-09 · ¿Qué `capacity` y `min_enrollments` corresponden a un cupo real? — Respondida 2026-07-30
**Respondida (owner):** para cupos **virtuales**, `min_enrollments = 3`, `capacity = 12`. Días:
sábado o domingo. El owner define y agenda las fechas concretas él mismo — no hay problema
logístico en hacerlas 100% virtuales (a diferencia de lo que sugería `class_slots.modality =
'presencial'` como opción separada; no se descarta presencial a futuro, pero los primeros cupos
reales serán virtuales).
**Videollamada:** el owner generará el enlace y lo pegará en `location_or_link` al crear el cupo
desde el panel de administración (no requiere código nuevo, el campo ya es texto libre).
**Plataforma default resuelta en Q-24: Jitsi** (no Google Meet) — ya no es una decisión pendiente.
**Bloquea:** T-04 → **desbloqueada** para crear los primeros cupos reales.

### 🟡 Q-10 · ¿Qué define un "módulo prioritario" más allá de la lista de `supabase/CONTENT.md`?
La lista actual (`aritmetica/enteros`, `fracciones`, `potencias`, `algebra/ecuaciones`,
`expresiones`, `geometria/basica`, `pitagoras`) dice estar basada en "déficits reales de tus tests",
pero no hay consulta ni dato que lo respalde en el repo.
**Relacionado:** T-01, T-21.

### ✅ Q-16 · ¿Qué pasa con un cupo que no alcanza el mínimo? — Respondida del todo 2026-07-30
**Respondida (owner):** el cupo se puede cancelar con **un día de anticipación** a la fecha de la
clase si no alcanzó `min_enrollments`. **Quién dispara la cancelación (P-13, respondida):**
**manual** — el admin cancela a mano desde el panel cuando corresponda, no un proceso automático.
Esto simplifica el trabajo: no hace falta ningún mecanismo temporal nuevo (cron/Edge Function),
solo usar el botón de cancelar cupo que **ya existe** en `components/admin.cljs`
(`:admin/set-slot-status` → `"cancelled"`).
**Lo que sí falta:** cuando el admin cancela un cupo así, hoy **no se avisa a nadie** — el único
trigger de `notifications` es para "cupo confirmado" (`confirm_slot_if_threshold` en `001`), no
existe el equivalente para cancelación. Ver [[BACKLOG]] T-25 (alcance reducido a esto).
**Relacionado:** R-11, [[DECISIONS]] D-28, D-31.

### ✅ Q-21 · ¿El owner confirma la visión de negocio del "Libro del Proyecto"? — Respondida 2026-07-30
**Respondida (owner):** sí, confirmada como la dirección de largo plazo — **"esa es la
dirección"**. El owner es explícito: **"el MVP es solo una versión menor que busca llegar a ese
objetivo"**, y pide que la visión **"se debe nutrir aún más"** (no es un techo, es un punto de
partida a expandir). Ver ADR-011.
**Consecuencia:** [[VISION_LIBRO_PROYECTO]] deja de ser un borrador en tensión con el alcance del
MVP y pasa a ser el **norte declarado**; el MVP actual (una materia, gratuito en diagnóstico/plan,
alcance Iquique/UNAP) es una fase intermedia explícita, no el destino. Esto no cambia nada del
código hoy, pero sí cómo se deben leer [[PROJECT_BRIEF]]/[[BUSINESS_CONTEXT]] (alcance **actual**,
no alcance **final**) y abre la pregunta de si conviene una épica de negocio nueva en [[BACKLOG]]
para roadmapear el camino hacia esa visión — **todavía sin decidir el cómo**, solo el hacia dónde.
**Relacionado:** Q-22, Q-23 (siguen abiertas — nombre de marca y taxonomía de bandas del libro vs.
el código no se resolvieron con esta confirmación, son decisiones de implementación separadas).

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

### ✅ Q-24 · ¿Google Meet o Jitsi para las videollamadas de los cupos? — Respondida 2026-07-30
**Jitsi**, elegido por ser la opción más fácil de implementar: sala ad-hoc por URL
(`meet.jit.si/<nombre-sala>` o self-hosted a futuro), sin cuenta de Google ni límite de
participantes de la capa gratuita de Meet, y sin fricción de login para el estudiante. Ver D-30.
**Implementación:** sigue siendo `location_or_link` como texto libre — no requiere código nuevo,
solo que el owner use consistentemente Jitsi al crear los cupos reales de T-04.
**Relacionado:** Q-09, T-04.

### ✅ Q-25 · ¿Cómo se implementa la preferencia de canal de contacto del estudiante? — Alcance de WhatsApp respondida 2026-07-30
**Respondida (owner, P-12):** WhatsApp se implementa como **enlace manual `wa.me`**, no como
integración automática — "la sencillez es clave, porque aún no tenemos muchos estudiantes". Ver
D-30. Esto reduce el alcance de [[BACKLOG]] T-36 a: columna `contact_preference` en `profiles`,
selector en `components/cuenta.cljs`, y que el admin vea el `wa.me/<phone>` del estudiante al
gestionar cupos/notificaciones — sin proveedor de WhatsApp Business, sin secret nuevo, sin ramificar
`email_outbox`.
**Relacionado:** [[BACKLOG]] T-36.

---

## Dominio (IRT y contenido)

### 🟠 Q-05 · ¿Están calibradas las `difficulty` del banco de ítems?
El modelo 1PL depende enteramente del parámetro `b`. Si las dificultades fueron asignadas a
criterio y no estimadas con respuestas reales, θ (y con ella la banda y el cupo asignado) puede
estar sesgada. Tampoco se sabe cuántos ítems hay por topic.
**Cómo responderla:** `select topic, count(*), min(difficulty), max(difficulty), avg(difficulty)
from questions group by topic;`
**Relacionado:** R-17, T-29.
**Nota 2026-08-09:** la medición de T-50 (ver [[BACKLOG]]) confirmó que no estaban calibradas
—de hecho ni siquiera en una escala compatible entre topics— y el owner las reescaló a mano por
orden relativo de dificultad, no con datos de respuesta real. **Sigue sin responderse** la
pregunta de fondo (calibración estadística); solo se cerró el síntoma agudo (topics inalcanzables).

### 🟠 Q-06 · ¿Los topics del banco cubren los ejes reales de la PAES M1?
`universo.profile/topic->module-slug` mapea solo un subconjunto (`numbers_V1`, `numeros`, `enteros`,
`fracciones`, `potencias`, `algebra`, `geometria` y variantes con acento). Todo topic no mapeado cae
en `unknown/<topic>`, lo que produce un déficit **sin módulo** y por lo tanto **sin recursos**.
**Cómo responderla:** `select distinct topic from questions;` y comparar con `modules.slug`.
**Bloquea:** T-28.
**Nota (2026-08-08, ADR-013):** el desbloqueo de tests por prerequisito (T-39) se diseñó
deliberadamente **por `topic` directo**, no por `module-slug`, precisamente para no heredar esta
brecha — no la resuelve, solo evita depender de ella.

### 🔴 Q-07 · ¿Qué semántica tiene repetir el diagnóstico?
`student_profiles` es una materialización única por estudiante. La FAQ promete explícitamente que
repetir el diagnóstico "te muestra cómo se movió tu nivel", lo que **requiere histórico** — hoy
probablemente se sobrescribe.
**Bloquea:** T-26. **Decisión pendiente:** P-01. **Nota:** hay una posible contradicción entre lo
prometido en la FAQ y lo implementado; registrada aquí por la regla 14 de gobernanza.
**Nota (2026-08-08, ADR-013):** T-39 usa el **mejor θ histórico por topic** (agregado sobre las
filas ya existentes en `tests`, cada intento es su propia fila) para decidir desbloqueos — es una
señal de que "histórico por intento" ya existe de facto en `tests`, pero no resuelve esta pregunta:
`student_profiles` (el perfil que ve el estudiante) sigue siendo una materialización única.

### ✅ Q-17 · ¿El tiempo de respuesta influye en la estimación? — Respondida 2026-08-08 (ADR-014)
La FAQ afirma: "El tiempo de respuesta también se considera en la estimación". El modelo 1PL
implementado usa **solo** dificultad y acierto; `time-ms` se registra pero no entra en el cálculo de
θ.
**Contradicción documentada** entre copy e implementación. Resolver: corregir el copy o incorporar
el tiempo al modelo (lo segundo es un cambio de dominio → ADR).

**Respondida 2026-08-08 (owner + [[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]]):** se
**incorpora el tiempo**, no se borra la frase. Pero **no dentro del 1PL**: el tiempo se modela como
un **eje separado de θ**, porque fundir velocidad en θ haría desaparecer justo el perfil "sabe pero
lento" que [[VISION_LIBRO_PROYECTO]] §3.3 quiere detectar (θ alto + velocidad baja).

Tres fases con precondición de datos: (1) **filtro de respuestas no esforzadas** — descartar
evidencia que no es evidencia, sin necesidad de calibración, y con eso la frase pasa a ser cierta
(T-44); (2) **velocidad τ como segundo eje** reportado por cuadrantes, ≥ 30 tests (T-45);
(3) **prior de θ condicional a τ**, ≥ 200 tests y ADR propio que reemplace la cláusula del prior de
ADR-004 (T-46).

**Verificado al responder:** `:time-ms` ya se captura y se persiste dentro de `tests.test`
(`events/test.cljs:357` y `:test/complete`), junto con `:start-time`/`:end-time` — **no hay que
instrumentar nada**, el histórico queda disponible para calibración retroactiva desde el primer
test rendido.

**Sigue pendiente:** hasta que T-44 esté en producción, la frase publicada **sigue siendo falsa**.
El ADR deja el plan de respaldo explícito (ajustar el copy en el intertanto si T-44 se demora):
primero que sea verdad, después dejarla publicada.

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

### ✅ Q-12 · ¿Qué policy usa el estudiante para leer `questions`? — Respondida 2026-08-08
`007_questions_admin_rls.sql` restringe SELECT a `is_admin()`, pero el diagnóstico necesita leer
preguntas como estudiante. O existe otra policy previa más permisiva, o el flujo usa otra vía.
**Por qué importa:** si `authenticated` puede hacer SELECT sobre `questions`, el banco completo
—incluidas `correct_option` y las explicaciones— es descargable (R-16).
**Cómo responderla:** revisar todas las policies de `questions` en el proyecto real
(`select * from pg_policies where tablename = 'questions';`).

**Respondida 2026-08-08 (el owner ejecutó la consulta): existe una policy permisiva creada desde
el dashboard de Supabase.**

```
questions | "Enable read access for all users" | SELECT | {authenticated} | using: true
```

Como las policies son PERMISSIVE y se combinan con **OR**, la regla efectiva es `true OR is_admin()`
= **`true`**, y `questions_select_admin` es **inerte**. Es decir: **el peor caso de R-16 está
confirmado y vivo en producción** — cualquier cuenta autenticada puede descargar el banco completo
con `correct_option` y `error_a..d`.

**Consecuencia:** [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]] (el cliente deja de leer
`questions`; ítem sin respuesta + corrección en servidor vía `security definer`), migraciones
`023`–`026` y [[BACKLOG]] T-47.

**✅ Cerrado 2026-08-09.** Migraciones aplicadas, bundle publicado y verificado en producción con
cuenta de rol `user`: anónimo → `permission denied for table questions`; estudiante → **0 filas**
(antes 387); los RPC sirven el ítem sin `correct_option` ni `error_*`; el diagnóstico funciona
igual. [[RISKS]] R-16 cerrado, contradicción X-03 resuelta.

**Hallazgos colaterales de la misma auditoría** (se auditaron las 15 tablas, no solo `questions`):
- **RLS está habilitado en las 15 tablas** (`relrowsecurity = true`), así que ninguna está abierta
  por RLS apagado.
- Tabla huérfana **`dashboard`** con SELECT/INSERT `true` para `authenticated`: 0 filas, sin
  referencias en el código ni en migraciones. Eliminada en `023`.
- **`public.questions` no se crea en ninguna migración** — un entorno nuevo no se puede reconstruir
  desde el repo (→ T-48).
- La banda del estudiante **no está protegida en la base**: puede reescribir su propia
  `theta_band` e inscribirse en cualquier cupo (→ T-49).
- Al menos ocho policies vienen del dashboard: **el repositorio no es la fuente de verdad de RLS**.
  Regla nueva en `023`: ninguna policy se crea desde la UI.

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

### ✅ Q-20 · ¿Se conservan las 12 ramas locales / 11 remotas por alguna razón? — Respondida 2026-08-09
**No.** Auditadas una por una (`git rev-list --count main..<rama>`): la deuda había crecido a
27 locales / 24 remotas, y todas menos dos estaban ya mergeadas a `main` (0 commits propios). Las
dos con contenido único (`Dashboard-pro`, `visual-fixes`) resultaron ser trabajo superado por
implementaciones posteriores, no algo que rescatar. El owner confirmó borrar todo. Ver [[BACKLOG]]
T-18 (cerrada), [[RISKS]] R-21 (cerrado).

---

## Contradicciones detectadas (regla de gobernanza 14)

| # | Contradicción | Documentos implicados | Resolución propuesta |
|---|---------------|----------------------|----------------------|
| X-01 | La FAQ dice que el tiempo de respuesta se considera en la estimación; el modelo 1PL no lo usa | `index.html`, `landing.cljs` vs `components/tetha.cljs` | *(Vía decidida 2026-08-08)* Se cambia el modelo, no el copy: [[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]], Q-17 respondida. **La contradicción sigue viva en producción** hasta que T-44 se despliegue |
| X-02 | La FAQ promete ver "cómo se movió tu nivel" al repetir el diagnóstico; `student_profiles` no guarda histórico | FAQ vs `001_mvp_schema.sql` | Q-07 / P-01 |
| X-03 | `007` restringe SELECT de `questions` a admin, pero el estudiante debe leer preguntas | `007_questions_admin_rls.sql` vs flujo de `events/test.cljs` | ✅ *Resuelta 2026-08-09:* había una policy permisiva del dashboard (`using true`) que anulaba a `007` por OR. Eliminada en `025`; el estudiante ya no lee `questions` sino los RPC de ADR-015. **Cerrada y verificada en producción** — ver Q-12, T-47 |
| X-04 | *(Resuelta 2026-08-09)* `.gitignore` ignoraba `src/universo/user.cljs`, pero el archivo estaba trackeado en Git | `.gitignore` vs `git ls-files` | Era código roto sin `ns`/requires, no compilado ni usado en ningún lado — borrado, `.gitignore` limpiado. Ver [[BACKLOG]] T-16 |
| X-05 | *(Resuelta 2026-08-09)* `shadow-cljs` 3.0.4 en `deps.edn` vs `^2.19.2` en `package.json` | `deps.edn` vs `package.json` | `package.json` → `^3.0.4`, `npm install` corrido, `npx shadow-cljs release app` verificado en verde. Ver [[BACKLOG]] T-13 |
| X-06 | *(Resuelta 2026-08-09)* KaTeX `^0.16.22` por npm vs CSS 0.16.9 por CDN | `package.json` vs `index.html` | CDN de `index.html`/`public/index.html` → `0.16.22`. Ver [[BACKLOG]] T-13 |
| X-07 | `PROJECT_SUMMARY.md` describe una estructura de módulos previa al MVP (menciona `views.cljs` con componentes principales, `jardin`, `voz`… como parte del producto) que ya no refleja el sistema | `PROJECT_SUMMARY.md` vs [[ARCHITECTURE]] | T-33: reducir a puntero o archivar |
| X-08 | *(Parcialmente resuelta 2026-07-30)* El "Libro del Proyecto" proponía pago por clase, multi-materia e internacionalización | [[VISION_LIBRO_PROYECTO]] §4.4 vs [[PROJECT_BRIEF]] §6, [[BUSINESS_CONTEXT]] §5 | **Pago por clase: resuelto** (D-19/D-26/D-32, $10.000 CLP/hora). **Multi-materia e internacionalización: siguen sin decidir** -- Q-21 confirmó la dirección general, pero no estas decisiones puntuales |

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

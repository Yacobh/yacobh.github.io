# OPEN_QUESTIONS

Última actualización: **2026-07-26**

> **Regla fundamental de PMF: si falta información, no se asume — se registra aquí.**
> Ninguna pregunta se borra: cuando se responde, se marca ✅ con la fecha y la respuesta, y si
> genera una decisión se crea el ADR correspondiente.

Estado: 🔴 abierta y bloqueante · 🟠 abierta e importante · 🟡 abierta menor · ✅ respondida

---

## Producto y negocio

### 🟠 Q-01 · ¿Cuál es el vínculo formal con la UNAP?
La landing, el JSON-LD y el footer afirman que es una "iniciativa de la Universidad Arturo Prat".
No hay en el repositorio evidencia de un contacto institucional, un convenio ni una autorización de
uso de marca.
**Por qué importa:** el respaldo institucional es el principal argumento de credibilidad y de
gratuidad; también condiciona las obligaciones de privacidad (R-06).
**Para quién:** owner. **Impacto si se ignora:** reputacional/institucional.

### 🔴 Q-02 · ¿Las clases de los cupos tienen costo?
El commit `b6ae903` acotó deliberadamente la gratuidad al diagnóstico, perfil y plan. No está dicho
qué ocurre con las clases.
**Bloquea:** copy definitivo, JSON-LD, [[BACKLOG]] T-04. **Decisión pendiente:** P-03.

### 🟠 Q-03 · ¿Hay requisito de consentimiento o aviso de privacidad?
Público mayoritariamente menor de edad + respaldo universitario + recolección de datos personales
(email, IP, geo, dispositivo, respuestas).
**Bloquea moralmente:** apertura a estudiantes reales (F8). **Relacionado:** R-06, T-10, Q-08.

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

### 🔴 Q-04 · ¿La inscripción respeta `capacity`?
`class_slots.capacity` existe, pero no está verificado si hay check o trigger que impida superarla.
**Bloquea:** T-03, cierre de F3. **Cómo responderla:** leer los triggers de
`001_mvp_schema.sql` sobre `enrollments`.

### 🟠 Q-12 · ¿Qué policy usa el estudiante para leer `questions`?
`007_questions_admin_rls.sql` restringe SELECT a `is_admin()`, pero el diagnóstico necesita leer
preguntas como estudiante. O existe otra policy previa más permisiva, o el flujo usa otra vía.
**Por qué importa:** si `authenticated` puede hacer SELECT sobre `questions`, el banco completo
—incluidas `correct_option` y las explicaciones— es descargable (R-16).
**Cómo responderla:** revisar todas las policies de `questions` en el proyecto real
(`select * from pg_policies where tablename = 'questions';`).

### 🔴 Q-13 · ¿Qué versión está realmente en producción?
El trabajo del MVP operable está en `cursor/mvp-operable-funnel`; no se ha verificado que esté
mergeado a `main` (la rama que GitHub Pages sirve). Además `public/js/app.js` tiene cambios sin
commitear.
**Bloquea:** cualquier afirmación sobre el estado de producción. **Tarea:** T-19.

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

Relacionado: [[ASSUMPTIONS]] · [[DECISIONS]] · [[RISKS]] · [[REQUIREMENTS]] §7 · [[CURRENT_STATUS]]

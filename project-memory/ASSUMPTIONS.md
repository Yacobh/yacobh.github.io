# ASSUMPTIONS

Última actualización: **2026-08-05**

> Un supuesto es algo que **damos por cierto sin haberlo verificado**. Se documenta para que nadie
> —humano o agente— lo confunda con un hecho. Cada supuesto indica cómo validarlo y qué pasa si es
> falso. Al validarse, se mueve al documento correspondiente (o a [[OPEN_QUESTIONS]] como
> respondida) y se marca aquí.

Estado: 🟡 vigente sin validar · ✅ validado · ❌ refutado

---

## Supuestos de negocio

| ID | Supuesto | Cómo validarlo | Si es falso | Estado |
|----|----------|----------------|-------------|--------|
| A-01 | Existe demanda real de preparación PAES M1 en Iquique / online que se activará con una oferta gratuita | Publicar y medir (T-20); contar cuentas creadas y diagnósticos completados | Todo el esfuerzo de producto no tiene destinatario; habría que revisar canal y mensaje antes que producto | 🟡 |
| A-02 | Un estudiante está dispuesto a invertir ~20 min sin calculadora antes de recibir cualquier valor | Medir tasa de finalización del diagnóstico (M-03) | Hay que entregar valor antes (diagnóstico más corto, resultado parcial, o preview sin cuenta) | 🟡 |
| A-03 | *(Parcialmente superada por D-18)* El badge UNAP era un argumento de credibilidad suficiente para crear cuenta -- ya no existe como badge activo, solo como nota histórica en footer/FAQ | Comparar conversión antes/después de bajar el badge (D-18); validar si testimonios/resultados sostienen la credibilidad sin él | El mensaje debe apoyarse en otra prueba (testimonios, resultados) -- ya es la situación actual, no solo un riesgo hipotético | 🟡 |
| A-04 | Agrupar por banda de θ produce mejores clases que agrupar por curso | Feedback de las primeras cohortes | La segmentación por banda es la base del modelo de cupos; habría que repensar F3 | 🟡 |
| A-05 | Habrá suficientes estudiantes por banda para alcanzar `min_enrollments` | Contar `student_profiles` por banda vs `class_slots` | Los cupos no confirman nunca (R-11); habría que bajar mínimos o fusionar bandas | 🟡 |
| A-06 | La gratuidad del diagnóstico/plan es sostenible con el tiempo del profesor | Registrar horas reales de autoría y de clases | El modelo necesita otra fuente de esfuerzo (ayudantes, contenido reutilizable) | 🟡 |
| A-07 | Los free tiers de Supabase, Resend y GitHub Pages alcanzan para el volumen esperado | Vigilar cuotas del dashboard al crecer | Aparece un costo no presupuestado (R-15) | 🟡 |

## Supuestos de dominio (IRT y contenido)

| ID | Supuesto | Cómo validarlo | Si es falso | Estado |
|----|----------|----------------|-------------|--------|
| A-08 | Las `difficulty` del banco reflejan la dificultad real de los ítems | Calibración empírica con respuestas acumuladas (T-29) | θ, banda y cupo asignado quedan sesgados: el diagnóstico es plausible pero incorrecto (R-17) | 🟡 crítico |
| A-09 | El modelo 1PL es suficiente: los ítems no difieren mucho en discriminación ni hay azar relevante | Ajustar 2PL/3PL con datos y comparar | Se necesita un modelo con más parámetros y muchos más datos (ADR-004 §Seguimiento) | 🟡 |
| A-10 | Un prior N(0,1) es apropiado para esta población | Comparar la distribución empírica de θ con el prior | El prior encoge mal las estimaciones (sesgo sistemático hacia 0) | 🟡 |
| A-11 | SE ≤ 0,35 es precisión suficiente para asignar banda | Verificar cuántos estudiantes quedan cerca de un borde de banda (0, 1, 2) con SE alto | Estudiantes mal clasificados justo en los bordes; habría que exigir más precisión o suavizar bordes | 🟡 |
| A-12 | 5–12 ítems bastan para cubrir los ejes del topic | Revisar cobertura de módulos por test | El perfil detecta déficits en muy pocos módulos y el plan queda estrecho | 🟡 |
| A-13 | Cada alternativa incorrecta corresponde a **una** idea errónea identificable | Revisión pedagógica de los ítems (T-27) | La capa 0 pierde precisión y el diferencial del producto se diluye | 🟡 |
| A-14 | Los módulos tipo Baldor son una descomposición adecuada del contenido PAES M1 | Comparar con el temario oficial DEMRE | El mapeo módulo→déficit no coincide con lo que la prueba evalúa | 🟡 |
| A-15 | Los `topic` presentes en `questions` están mapeados a un módulo | `select distinct topic from questions` vs `topic->module-slug` (Q-06) | Los déficits caen en `unknown/*` y no generan recursos (T-28) | 🟡 probablemente falso |

## Supuestos técnicos

| ID | Supuesto | Cómo validarlo | Si es falso | Estado |
|----|----------|----------------|-------------|--------|
| A-16 | Las policies RLS actuales son correctas y suficientes | Suite de verificación con dos usuarios de prueba (T-11) | Fuga o bloqueo de datos (R-14) | 🟡 crítico |
| A-17 | Las migraciones aplicadas en producción corresponden exactamente a los archivos del repo | Comparar `pg_policies`, `information_schema.tables` y triggers contra los `.sql` | El código asume estructuras que no existen; fallos en runtime difíciles de diagnosticar | 🟡 |
| A-18 | `public/js/app.js` en `main` corresponde al fuente de `main` | Recompilar y comparar (T-08) | Producción se comporta distinto del código que se lee (R-13) | 🟡 hoy dudoso |
| A-19 | El trigger de confirmación de cupo hace exactamente lo mismo que `slots.logic/should-confirm-slot?` | Leer el trigger y comparar con el test espejo | La UI promete algo que la DB no hace (R-08) | 🟡 |
| A-20 | Los respaldos por defecto de Supabase existen y son restaurables | Ejecutar una restauración de prueba (T-07) | Pérdida definitiva del banco de ítems y de los perfiles (R-03) | 🟡 crítico |
| A-21 | La anon key en el bundle no representa un riesgo porque RLS limita su poder | Depende de A-16 | Si RLS falla, la anon key pública amplifica el impacto | 🟡 (correcto **si** A-16 se cumple) |
| A-22 | Los namespaces no alcanzables desde `core.cljs` no llegan al bundle | Inspeccionar `public/js/app.js` o el reporte de build | El bundle es más grande de lo necesario y contiene código muerto activo | 🟡 |
| A-23 | El CDN de jsDelivr para el CSS de KaTeX estará disponible | Monitoreo / probar sin red al CDN | Fórmulas sin estilo (degradación aceptable) | 🟡 aceptado |
| A-24 | Los tests actuales cubren las reglas de negocio que más importan | Revisar cobertura por regla de [[REQUIREMENTS]] §3 | Regresiones silenciosas en reglas no cubiertas (I/O, admin, policies) | 🟡 parcial |

## Supuestos de proceso y memoria

| ID | Supuesto | Cómo validarlo | Si es falso | Estado |
|----|----------|----------------|-------------|--------|
| A-25 | La reconstrucción histórica de fases y ADRs refleja la intención original del owner | El owner revisa [[ROADMAP]] y los ADRs retroactivos (Q-14) | Los ADRs documentan un razonamiento que no ocurrió; hay que corregirlos (no borrarlos) | 🟡 |
| A-26 | Los agentes futuros leerán `CLAUDE.md` y `project-memory/` antes de modificar código | Revisar en cada sesión si el `SESSION-XXX` cita la memoria | PMF deja de funcionar y la memoria se vuelve documentación muerta | 🟡 |
| A-27 | El snapshot de Graphify se mantendrá actualizado tras cambios de código | Comparar el commit de `GRAPH_REPORT.md` con `HEAD` (T-31) | El grafo desinforma en lugar de orientar | 🟡 |
| A-28 | Graphify seguirá sin indexar `.cljs` | Reejecutar `graphify update .` y revisar el manifest | Si empieza a indexarlos, gran parte de las advertencias del §6 de la guía dejan de aplicar | 🟡 |
| A-29 | El owner es la única persona con permisos de escritura en el repo y en Supabase | Revisar colaboradores en GitHub y miembros del proyecto Supabase | Hay otros actores cuyas acciones no están documentadas | 🟡 |

## Supuestos de UI

| ID | Supuesto | Cómo validarlo | Si es falso | Estado |
|----|----------|----------------|-------------|--------|
| A-30 | La paleta oscura exacta elegida por el agente (grises → slate, índigo/semánticos aclarados, ver [[../adr/ADR-012-tema-oscuro-mapeo-css-global]]) es aceptable para el owner; no hubo aprobación explícita de los tonos concretos, solo del alcance ("toda la app") | El owner revisa la app en oscuro, en particular las secciones protegidas no verificadas en vivo por el agente (dashboard, plan, cupos, admin, cuenta, diagnóstico) | Hay que ajustar tonos puntuales en `src/css/app.css` — el mapeo centralizado hace que el ajuste sea barato | 🟡 |

---

## Supuestos validados o refutados

*(vacío — al validar o refutar un supuesto, moverlo aquí con fecha y evidencia)*

Formato:

```
| A-NN | Supuesto | ✅/❌ 2026-MM-DD | Evidencia | Consecuencia (ADR / tarea / cambio) |
```

---

## Los tres supuestos que más importan

Si solo se puede validar tres, son estos:

1. **A-16 / A-20** — que RLS sea correcta y que exista un respaldo restaurable. Son los dos únicos
   supuestos cuya falsedad produce un daño **irreversible** (fuga o pérdida de datos de estudiantes).
2. **A-08** — que las dificultades estén calibradas. De él depende que el producto haga lo que
   promete; si es falso, todo el motor IRT entrega un resultado equivocado con apariencia de rigor.
3. **A-01 / A-02** — que exista demanda y disposición a completar el diagnóstico. Determinan si el
   proyecto tiene destinatario.

---

Relacionado: [[OPEN_QUESTIONS]] · [[RISKS]] · [[DECISIONS]] · [[REQUIREMENTS]] · [[ROADMAP]]

# ASSUMPTIONS

Última actualización: **2026-08-17** — **A-36 nuevo**: el precio del custom domain de Supabase
se citó de memoria y no está verificado (R-33).
Antes: 2026-08-16 — **A-31…A-35 nuevos**: los supuestos de mercado del pivote a
B2B ([[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]]). Son **los más frágiles de toda la
memoria** y sostienen la aritmética completa de [[TESIS_DE_CRECIMIENTO]] §3. Antes: 2026-08-05.

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

### Supuestos del pivote a B2B (2026-08-16) — **los más frágiles de toda la memoria**

> Estos cinco sostienen **toda la aritmética** de [[TESIS_DE_CRECIMIENTO]] §3, y **ninguno fue
> testeado con un comprador real**. Se validan hablando con colegios (**T-80**), no analizando más.
> **Prohibido citarlos como hechos** en una propuesta comercial o una postulación a fondos antes de
> cerrar T-80 y T-89.

| ID | Supuesto | Cómo validarlo | Si es falso | Estado |
|----|----------|----------------|-------------|--------|
| A-31 | El tipo de cambio de referencia es ~950 CLP/USD, así que "USD 1M" ≈ CLP 950M/año | Tipo de cambio observado al momento de usar la cifra | La meta en pesos se mueve; no cambia ninguna conclusión estructural (es el supuesto menos grave de los cinco) | 🟡 |
| A-32 | Hay ~3.300 establecimientos con enseñanza media en Chile, y ~250.000 personas rinden PAES M1 al año | Fuentes oficiales MINEDUC y DEMRE (T-80) | Cambia la penetración necesaria (~11,5 % de colegios) y la credibilidad del plan ante un fondo. **Desde el 2026-08-16 pesa más:** la cifra de 250.000 es el denominador de toda la aritmética de D-52 (por qué no hay modelo por volumen). Si fuera mucho mayor, habría que rehacer §3.1 de [[TESIS_DE_CRECIMIENTO]] — aunque el margen es tan grande (factor 10) que la conclusión aguanta un error considerable | 🟡 **sin verificar** |
| A-33 | Un colegio paga del orden de CLP 6.000 por alumno de EM/año, con piso de CLP 1.500.000 | Conversación con 5–10 jefes de UTP / sostenedores (T-80, Q-32) | Se cae la vía B2B tal como está dimensionada: hay que rehacer §3 entera, o cambiar la unidad de cobro | 🟡 **crítico, sin testear** |
| A-34 | La compra cabe en fondos ya asignados (SEP / PIE) y el decisor es UTP + sostenedor, con ciclo en marzo | Preguntarlo en T-80; revisar normativa de uso de SEP | Si es presupuesto discrecional, el ciclo se alarga y R-27 (caja) se agrava; si el decisor es otro, el guion de venta de T-87 apunta a la persona equivocada | 🟡 **sin verificar** |
| A-35 | Existe disposición a pagar una suscripción B2C (~CLP 9.900/mes de temporada) sobre un producto cuyo núcleo es gratis (D-01) | Probar el precio con estudiantes ya diagnosticados; medir conversión (T-78) | Se cae el ~30 % B2C del mix; la alternativa limpia es **B2C 100 % gratuito financiado por B2B**, que no está descartada (Q-33, P-15) | 🟡 **sin testear** |
| A-36 | El **custom domain de Supabase** —lo único que quitaría `jmnqklhxcdccvdhuuiji.supabase.co` de la pantalla de Google (R-33)— cuesta del orden de **USD 10/mes**. La cifra viene de memoria del agente, **no se verificó en el sitio de Supabase** | Abrir la página de precios de Supabase y leer el precio vigente del add-on antes de presupuestarlo o citarlo | Si es materialmente más caro, la decisión de R-33 cambia de "esperar el dato de conversión" a "descartado mientras el ingreso sea ~0"; si es más barato, se adelanta | 🔴 **sin verificar** |

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

> **Actualización 2026-08-16.** Los tres siguen siendo los correctos, y el pivote a B2B
> ([[TESIS_DE_CRECIMIENTO]]) **le sube la apuesta a cada uno**:
>
> - **A-16/A-20** dejan de ser higiene y pasan a ser **requisito contractual** en cuanto un colegio
>   suba su matrícula ([[RISKS]] R-28).
> - **A-08** deja de ser un problema de calidad interna y pasa a ser **lo primero que pregunta el
>   comprador** (R-29). Validarlo es el vector G-2 y la fase F12.
> - **A-01/A-02** se duplican: ahora hay que validar demanda en **dos** mercados, y el nuevo
>   (institucional) tiene sus propios supuestos sin testear — **A-33 y A-34, que son hoy los más
>   frágiles de toda la memoria**. Si A-33 es falso, no se ajusta un número: se rehace el plan.

---

Relacionado: [[OPEN_QUESTIONS]] · [[RISKS]] · [[DECISIONS]] · [[REQUIREMENTS]] · [[ROADMAP]]

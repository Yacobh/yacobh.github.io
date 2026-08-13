# BUSINESS_CONTEXT

Última actualización: **2026-08-13** (origen corregido: la raíz es la tesis UNEXPO 2010, no el
convenio UNAP — D-45; publicidad descartada como ingreso — D-46)

## 1. Contexto

En Chile el acceso a la educación superior se define por la **PAES** (Prueba de Acceso a la
Educación Superior). **Matemática 1 (M1)** cubre números, álgebra y funciones, geometría y
probabilidad, y es la prueba obligatoria para la mayoría de las carreras. La preparación se
concentra en preuniversitarios pagados que agrupan por curso y avanzan a un ritmo único.

**Academia Integral** es un **proyecto personal del profesor Jacobo Córdova**, en **Iquique,
región de Tarapacá**. La propuesta es aplicar psicometría (IRT) para personalizar el punto de
partida de cada estudiante y agrupar a los estudiantes por **nivel real de habilidad**, no por
curso ni por colegio.

**Origen (corregido 2026-08-13, D-45 / [[../adr/ADR-024-raiz-en-la-tesis-2010]]).** El proyecto **no
nació en 2025 ni en Chile**: viene de la tesis de grado del owner (**UNEXPO, Venezuela, 2010**) y de
la línea **Sistema Llovizna**, que llegó hasta una ponencia en el II Congreso Venezolano de Ciencia,
Tecnología e Innovación (2013). El **convenio con la UNAP** (oct–nov 2025, terminado, sin alianza ni
marca vigente — [[OPEN_QUESTIONS]] Q-01, [[DECISIONS]] D-18) fue un **episodio de financiamiento**,
no el origen: el primer commit del repo es del **2025-05-03**, anterior al convenio. El copy
publicado todavía dice lo contrario; corregirlo está pendiente de decisión del owner (Q-30, X-09).

Lo que de esa historia importa para dimensionar el producto —el nombre, la escala que ya se intentó,
el diferencial y el patrón de tres etapas sin llegar a estudiantes— está en
[[RAIZ_SISTEMA_LLOVIZNA]], que se mantiene breve a propósito.

**Patrón que conviene tener presente antes de cualquier plan de financiamiento o contratación:** van
**dos intentos institucionales sin fondos** (2012–13 Estado venezolano; 2025 convenio UNAP) y **un
intento de equipo en 2012** que no se sostuvo. Lo que sostuvo el proyecto dieciséis años fue el
trabajo de una sola persona: [[RISKS]] R-01 no es un estado transitorio del MVP, es el patrón
histórico — y el proyecto **ya intentó salir de él**. Lo que nunca se logró, en ninguna etapa, es
llegar a los estudiantes de forma **sostenida** ([[RISKS]] R-19).

**La objeción de fondo a esta propuesta de valor, presente en todo material de captación:** *¿para
qué medir, si el estudiante puede decir qué no entiende?* Es la primera pregunta que se hace
cualquiera —ya se la hacían en 2011— y la respuesta existe desde la tesis de 2010: el estudiante que
no sabe qué le falta no puede decirlo, la presión social hace que ni siquiera pregunte, y nombrar las
dudas no las prioriza. **Publicada en el FAQ el 2026-08-13** ([[BACKLOG]] T-75, Q-31).

**Competencia adyacente: Kahoot! y AhaSlides.** Hacen con el teléfono lo que la tesis describía con
hardware, pero **no son competencia directa**: miden al grupo para animar la clase; no estiman
habilidad por persona, no nombran el error conceptual y no producen un plan — los tres pilares de
esta propuesta. Encuadre ante un colegio que ya conoce Kahoot: *"Kahoot mide a la clase; esto mide a
cada estudiante y le dice qué estudiar"*. Ver [[RAIZ_SISTEMA_LLOVIZNA]] §2.5.

## 2. Objetivos de negocio

| # | Objetivo | Cómo se materializa en el producto |
|---|----------|------------------------------------|
| B-01 | Captar estudiantes de la región y online con una oferta gratuita y diferenciada | Landing de conversión con CTA único "Comenzar mi diagnóstico" |
| B-02 | Reducir a cero la fricción de entrada | Solo email; el diagnóstico corre en el navegador, móvil o desktop, ~20 min |
| B-03 | Demostrar valor **antes** de pedir compromiso | El perfil (θ + errores) y el plan se entregan inmediatamente y sin costo |
| B-04 | Convertir estudiantes diagnosticados en **cohortes viables** | Cupos por banda con `min_enrollments`; el grupo no arranca sin masa crítica |
| B-05 | Operar con costo marginal ≈ 0 | GitHub Pages + Supabase free tier + Resend free tier |
| B-06 | Construir un activo reutilizable: el **banco de ítems calibrado** | `questions` con `difficulty` y `error_a..d` mapeados a misconceptions |
| B-07 | Credibilidad académica del método frente al estudiante y su familia (ya no se apoya en un respaldo institucional vigente, ver D-18) | Método IRT explícito, datos de θ y déficits por cohorte. **Desde 2026-08-13** hay además respaldo propio que no depende de ninguna institución vigente: tesis aprobada (UNEXPO, 2010) y ponencia en el II Congreso Venezolano de Ciencia, Tecnología e Innovación (2013). Cautelas y decisión de si se comunica: Q-30 |

## 3. Propuesta de valor

> "Prepara la PAES de Matemática estudiando solo lo que te falta."

Cuatro pilares, tal como se comunican en la landing (`src/universo/components/landing.cljs`):

1. **Mide lo que importa** — IRT, el mismo enfoque psicométrico de las pruebas estandarizadas: la
   dificultad se adapta y la estimación es precisa con muchas menos preguntas.
2. **Ataca la causa, no el síntoma** — cada alternativa incorrecta está asociada a un error
   conceptual específico; el plan explica *por qué* se equivocó.
3. **Contenido con estructura** — progresión clásica (aritmética → álgebra → geometría), alineada
   a módulos tipo Baldor.
4. **Grupos por nivel** — nadie queda atrás ni se aburre esperando.

## 4. Recorrido del usuario (funnel)

```
Landing (pública)
  └─ CTA "Comenzar mi diagnóstico"
       └─ Login / registro (email+password -- Google OAuth existe en el código pero sin botón en la UI)
            └─ Diagnóstico adaptativo IRT  (~20 min, 5–12 ítems)
                 └─ Perfil: θ, banda, déficits, misconceptions
                      └─ "Mi plan": errores explicados + recursos por módulo
                           └─ "Cupos": grupos de su banda (online / presencial Iquique)
                                └─ Inscripción (enrollment: pending)
                                     └─ ¿se alcanzó min_enrollments?
                                          ├─ no → "faltan N inscritos"
                                          └─ sí → cupo confirmed
                                                   ├─ notificación in-app
                                                   └─ email (outbox → Resend)
```

Puntos de fuga conocidos, **no instrumentados**:

- Landing → login (requiere crear cuenta antes de ver valor).
- Login → diagnóstico completo (~20 min sin calculadora es exigente).
- Perfil → inscripción (si no hay cupos publicados en su banda, la pantalla queda vacía).

## 5. Modelo económico

- **Ingresos:** ninguno **operativo todavía**, pero ya hay una decisión de precio tomada
  (D-19/D-26, 2026-07-28/30): las clases de los cupos costarán **$10.000 CLP/hora**, con la primera
  videollamada gratis tras el diagnóstico. El diagnóstico/perfil/plan siguen gratis (JSON-LD
  `isAccessibleForFree: true` acotado a eso -- sigue siendo cierto, ese alcance no incluye las
  clases). Falta implementar el cobro (sin pasarela hoy; ver [[PROJECT_BRIEF]] §6,
  [[OPEN_QUESTIONS]] Q-02, [[BACKLOG]] T-04).
- **Costos directos:** $0 en el tier actual (GitHub Pages, Supabase free, Resend free,
  dominio `jacobocordova.com`).
- **Costo real dominante:** el **tiempo del profesor** para (a) escribir y calibrar ítems con sus
  `error_*`, (b) publicar recursos, (c) dictar las clases de los cupos confirmados.
- **Riesgo económico:** el cuello de botella es humano, no técnico. Ver [[RISKS]] R-01. **No es
  nuevo:** la tesis de 2010 ya identificaba ese mismo cuello — muestrear más seguido *"ameritaría por
  parte del profesor una cantidad de trabajo superior"* ([[RAIZ_SISTEMA_LLOVIZNA]] §3). Es la restricción
  estructural del proyecto, no una limitación de esta etapa.
- **Publicidad: descartada como fuente de ingresos (D-46, 2026-08-13).** No por preferencia estética:
  contradice el aviso de privacidad ya publicado, sube [[RISKS]] R-06 con menores y la Ley 21.719 a
  la vuelta, y la aritmética no da (haría falta decenas de miles de vistas para igualar una hora de
  clase, en un producto de ~20 min por persona y sin analítica). Vías admitidas si se busca ingreso
  de terceros: **patrocinio nombrado sin tracking** o **B2B a colegios**. Evaluación completa en
  [[OPEN_QUESTIONS]] Q-28.

> **Nota deliberada sobre la gratuidad:** el commit `b6ae903` acotó la gratuidad en el JSON-LD al
> *diagnóstico, perfil y plan de estudio*; los cupos se publican por separado. No afirmar que las
> clases son gratuitas sin confirmarlo con el owner ([[OPEN_QUESTIONS]] Q-02).

## 6. Métricas propuestas (aún no instrumentadas)

| # | Métrica | Fuente posible | Estado |
|---|---------|----------------|--------|
| M-01 | Visitantes únicos de la landing | `visitor` (tracking propio) | parcial, sin reporte |
| M-02 | Tasa landing → cuenta creada | `auth.users` vs `visitor` | no medida |
| M-03 | Tasa de finalización del diagnóstico | `tests` / `student_profiles` | no medida |
| M-04 | Distribución de θ y de bandas | `student_profiles.theta_band` | consultable a mano |
| M-05 | Top de módulos deficitarios | `student_profiles.profile->deficits` | consultable a mano |
| M-06 | Tasa perfil → inscripción | `enrollments` vs `student_profiles` | no medida |
| M-07 | Cupos confirmados / publicados | `class_slots.status` | consultable a mano |
| M-08 | Emails enviados vs fallidos | `email_outbox.status` | consultable a mano |
| M-09 | Repetición del diagnóstico y movimiento de θ | `tests` histórico + `theta-history` | no medida |

Tarea de instrumentación: [[BACKLOG]] T-20. Hasta entonces, cualquier afirmación cuantitativa
sobre uso del producto es un supuesto ([[ASSUMPTIONS]]).

## 7. Restricciones de negocio

- La UNAP se menciona en producción solo como **nota histórica de origen** (footer/FAQ, no como
  badge activo -- D-18); el tono y las afirmaciones deben ser **defendibles académicamente** (no
  prometer puntajes ni resultados garantizados) y no dar a entender un respaldo institucional
  vigente que no existe.
- Público **menor de edad** en su mayoría (estudiantes de enseñanza media): la recolección de
  datos personales debe ser mínima y justificada. Hoy se recolecta email, IP, ciudad/país,
  idioma, navegador, SO y nivel de batería. Ver [[RISKS]] R-06 y [[OPEN_QUESTIONS]] Q-03.
- El diagnóstico **no es una nota ni un registro académico** — así se comunica en la FAQ y debe
  seguir siendo cierto.
- Los cupos presenciales dependen de disponibilidad de sala en Iquique (hoy "sala a confirmar" en
  los datos demo).
- Estacionalidad fuerte: la demanda se concentra en los meses previos a la PAES (rendición en
  noviembre/diciembre en Chile). Cualquier plan de captación debe considerarla.

## 8. Comunicación oficial y mensajes clave

Estos textos existen en tres lugares (`index.html` JSON-LD FAQ, `public/index.html` y
`landing.cljs`). **Si cambia uno, deben cambiar los tres** — es una de las duplicaciones activas
del repositorio ([[RISKS]] R-05):

- Costo: "El diagnóstico, tu perfil y el plan de estudio no tienen costo. Es un proyecto personal
  del profesor Jacobo Córdova, que se originó en 2025 a partir de un convenio de desarrollo con la
  Universidad Arturo Prat." (copy vigente desde D-18, 2026-07-28)
- Requisito: "Solo una cuenta con tu correo… toma alrededor de 20 minutos."
- Calculadora: "No… El tiempo de respuesta también se considera en la estimación."
- Mal resultado: "No es una nota ni queda en ningún registro académico."
- Modalidad: "Ambas… Los cupos presenciales se realizan en Iquique."
- Cupo pendiente: "Cada grupo necesita un mínimo de inscritos para funcionar."
- Repetir diagnóstico: "Sí, y es recomendable."

## 9. Visión de negocio ampliada (no implementada)

El fundador redactó un documento de visión de largo plazo — "Libro del Proyecto", borrador v0.1,
2026-07-27 — con un modelo de negocio **más amplio y en tensión** con lo descrito arriba. Detalle
completo en [[VISION_LIBRO_PROYECTO]]; resumen de la tensión:

| Aquí (MVP, implementado) | Libro del Proyecto (visión, no implementado) |
|---|---|
| Sin ingresos; pagos fuera de alcance por definición (§5, [[PROJECT_BRIEF]] §6) | Pago por clase o paquete; suscripción evaluada en una fase 3 propia |
| Una sola materia (PAES Matemática 1) | Expansión a otras materias y, a largo plazo, otros países hispanohablantes |
| Cuatro bandas de θ (`inicial/basico/intermedio/avanzado`) | Tres "grupos de conocimiento" + un eje de frecuencia (λ) + un eje futuro de estilo de aprendizaje |
| Iniciativa académica (UNAP) | Startup con tesis de inversión, uso de fondos y roles a contratar |

**No se resuelve esta tensión aquí.** Ver [[OPEN_QUESTIONS]] Q-21 y Q-22, y la decisión pendiente
**P-03** en [[DECISIONS]] (a la que el libro propone una respuesta, sin que esté aplicada).

---

Relacionado: [[PROJECT_BRIEF]] · [[REQUIREMENTS]] · [[RISKS]] · [[ROADMAP]] · [[OPEN_QUESTIONS]] ·
[[VISION_LIBRO_PROYECTO]]

# BUSINESS_CONTEXT

Última actualización: **2026-07-27**

## 1. Contexto

En Chile el acceso a la educación superior se define por la **PAES** (Prueba de Acceso a la
Educación Superior). **Matemática 1 (M1)** cubre números, álgebra y funciones, geometría y
probabilidad, y es la prueba obligatoria para la mayoría de las carreras. La preparación se
concentra en preuniversitarios pagados que agrupan por curso y avanzan a un ritmo único.

**Academia Integral** nace como **iniciativa académica de la Universidad Arturo Prat (UNAP)**
junto al profesor **Jacobo Córdova**, en **Iquique, región de Tarapacá**. La propuesta es aplicar
psicometría (IRT) para personalizar el punto de partida de cada estudiante y agrupar a los
estudiantes por **nivel real de habilidad**, no por curso ni por colegio.

## 2. Objetivos de negocio

| # | Objetivo | Cómo se materializa en el producto |
|---|----------|------------------------------------|
| B-01 | Captar estudiantes de la región y online con una oferta gratuita y diferenciada | Landing de conversión con CTA único "Comenzar mi diagnóstico" |
| B-02 | Reducir a cero la fricción de entrada | Solo email; el diagnóstico corre en el navegador, móvil o desktop, ~20 min |
| B-03 | Demostrar valor **antes** de pedir compromiso | El perfil (θ + errores) y el plan se entregan inmediatamente y sin costo |
| B-04 | Convertir estudiantes diagnosticados en **cohortes viables** | Cupos por banda con `min_enrollments`; el grupo no arranca sin masa crítica |
| B-05 | Operar con costo marginal ≈ 0 | GitHub Pages + Supabase free tier + Resend free tier |
| B-06 | Construir un activo reutilizable: el **banco de ítems calibrado** | `questions` con `difficulty` y `error_a..d` mapeados a misconceptions |
| B-07 | Prestigio y evidencia académica para la iniciativa UNAP | Método IRT explícito, datos de θ y déficits por cohorte |

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
       └─ Login / registro (email+password o Google)
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

- **Ingresos:** ninguno. No hay pagos ni intención de agregarlos en el MVP
  (ver [[PROJECT_BRIEF]] §6 y `index.html` JSON-LD `isAccessibleForFree: true` acotado al
  diagnóstico/perfil/plan).
- **Costos directos:** $0 en el tier actual (GitHub Pages, Supabase free, Resend free,
  dominio `jacobocordova.com`).
- **Costo real dominante:** el **tiempo del profesor** para (a) escribir y calibrar ítems con sus
  `error_*`, (b) publicar recursos, (c) dictar las clases de los cupos confirmados.
- **Riesgo económico:** el cuello de botella es humano, no técnico. Ver [[RISKS]] R-01.

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

- La marca UNAP aparece en producción; el tono y las afirmaciones deben ser **defendibles
  académicamente** (no prometer puntajes ni resultados garantizados).
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

- Costo: "El diagnóstico, tu perfil y el plan de estudio no tienen costo. Es una iniciativa
  académica de la Universidad Arturo Prat junto al profesor Jacobo Córdova."
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

# RAIZ_SISTEMA_LLOVIZNA — de dónde viene este producto

Última actualización: **2026-08-13**

> **Para qué existe este archivo, y para qué no.**
> **Sí:** corregir el relato de origen, que era falso, y dimensionar el alcance y la visión del
> producto sabiendo qué se intentó antes, qué funcionó y qué no.
> **No:** ser un archivo histórico. Lo que no informa una decisión de hoy no se documenta aquí.
>
> **La raíz es contexto, no mandato.** Que una idea venga de 2010 no la hace correcta ni obliga a
> conservarla — este producto es otro, en otro país, con otro público y otra tecnología, y **puede
> llegar a respuestas distintas a propósito**. El caso ya ocurrido: [[DECISIONS]] D-41 descartó el
> eje de estilos de aprendizaje que el proyecto arrastraba desde 2012, porque la evidencia no lo
> sostiene. La antigüedad de una idea no es un argumento a su favor.

---

## 1. El origen real, en una línea

**El proyecto no nació del convenio con la Universidad Arturo Prat.** Nació como el trabajo de grado
del owner en Ingeniería Electrónica —**UNEXPO, Puerto Ordaz, Venezuela, agosto de 2010**, *"Diseño de
un sistema digital interactivo de apoyo al proceso de enseñanza-aprendizaje"*, aprobado— y continuó
en Venezuela hasta 2013 bajo el nombre **Sistema Llovizna**.

El relato anterior (*"se originó en 2025 a partir de un convenio de desarrollo con la Universidad
Arturo Prat"*) era **verificablemente falso contra el propio repositorio**: el primer commit es del
**2025-05-03**, cinco meses *antes* del convenio (oct–nov 2025). Ver
[[../adr/ADR-024-raiz-en-la-tesis-2010]] y [[OPEN_QUESTIONS]] Q-01.

```
2010 · UNEXPO          Tesis aprobada: sistema de respuesta en el aula (CRS) por hardware
2010–2012              Blog "Academia Integral" + el sistema construido en web (PHP/MySQL)
2012                   Propuesta "Sistema Llovizna" al Estado venezolano — sin financiamiento
2013-11 · Caracas      Ponencia oral en el II Congreso Venezolano de Ciencia, Tecnología e Innovación
   ⋯ ~11 años sin registro documental — no se rellena con suposiciones ⋯
2025-05 · Chile        Primer commit del repo actual
2025-10/11             Convenio UNAP: episodio de financiamiento, terminado. NO es el origen
2026                   Academia Integral MVP (IRT, θ, misconceptions, cupos por banda)
```

**Fuentes:** `docs/tesis.md` · `docs/sistema_llovizna.md` · el blog
<https://jacobocordova.blogspot.com/> ([[BACKLOG]] T-74, archivarlo) · certificado del congreso de
2013 (en poder del owner; no se versiona por llevar datos personales, [[RISKS]] R-26).

## 2. Lo que hay que sincerar sobre el alcance

Estos son los puntos que cambian cómo se dimensiona el producto hoy. El resto de la historia no está
documentado a propósito.

### 2.1 El nombre y el léxico no son de esta etapa

- **"Academia Integral" es de julio de 2010** (título del blog), con justificación escrita. No es un
  nombre comercial chileno reciente. Esto reencuadra [[OPEN_QUESTIONS]] Q-23: el nombre publicado
  tiene dieciséis años, así que el que debe justificarse es el nombre nuevo del
  [[VISION_LIBRO_PROYECTO]], no al revés. **No decide** cuál usar: "Integral" promete un alcance que
  el MVP de una sola materia no entrega, y eso sigue abierto.
- **"Distractor"** —el término central del producto— se fijó en una conversación con un pedagogo el
  **2011-11-30**, junto con "reactivos". En diciembre de 2011 ya existía una tabla `distractores` en
  MySQL. El vocabulario no se eligió en 2025.

### 2.2 La ambición original era mucho mayor que el MVP

La propuesta de 2012 planteaba: base de datos nacional de preguntas alineada al currículo, contenido
aportado por profesores y reutilizable entre aulas, teleeducación entre salones, y hardware de aula
completo. El MVP de hoy es **una materia, un profesor, una ciudad**.

Eso importa para leer [[VISION_LIBRO_PROYECTO]]: la visión de largo plazo del owner **no es una
ambición nueva**, es la de 2012 reformulada. Y ya se intentó a esa escala, sin conseguirlo. La
pregunta útil para hoy no es *"¿podemos volver a ser tan ambiciosos?"* sino **"¿qué hizo que esa
escala no se sostuviera, y qué cambió?"**.

### 2.3 Lo que sí se ejecutó, y es el diferencial

La tesis dejó escrita una **Recomendación** que no implementó: *"identificar de dónde proviene cada
respuesta de manera que la evaluación pueda ser individualizada"*. Eso es exactamente lo que hace el
producto actual y **lo que no hacen los sistemas equivalentes del mercado** (§2.5). Es el diferencial
real, y tiene quince años de antigüedad conceptual.

De la propuesta de 2012 sobreviven, ya implementados: el ciclo de ~20 minutos con ítems de cuatro
alternativas, la identificación de qué contenido reforzar (`deficits`), la recomendación automática
de un recurso a quien falla (capa 1 de "Mi plan") y la base de datos de preguntas y recursos como
activo central (**B-06** de [[BUSINESS_CONTEXT]]).

### 2.4 Tres intentos, ninguno llegó a estudiantes de forma sostenida

| Etapa | Qué se logró | Qué faltó |
|---|---|---|
| 2010–2013 (Venezuela) | Tesis aprobada · software funcionando · ponencia en congreso nacional | Financiamiento; y nunca operó con alumnos reales de forma continua |
| 2012 (equipo) | Un pedagogo interesado, familiares y colegas sumados | No se sostuvo — el proyecto volvió a ser de una persona |
| 2025–2026 (Chile) | Plataforma en producción, banco de ítems, cupos | **Estudiantes.** Es [[RISKS]] R-19, hoy |

**La conclusión que sirve:** el cuello de botella nunca fue la idea ni la capacidad técnica. Fue
siempre lo mismo — llegar a los estudiantes y sostener el esfuerzo con una sola persona
([[RISKS]] R-01). Cualquier plan que agregue producto sin resolver eso repite el patrón por cuarta
vez.

### 2.5 Kahoot y AhaSlides: el mercado validó el mecanismo, no este producto

La limitación que dejó la tesis en prototipo era física —alimentar un dispositivo por pupitre— y el
costo del hardware era prohibitivo. **Ese obstáculo lo resolvió el mercado poniendo el dispositivo en
el bolsillo del estudiante:** Kahoot! y AhaSlides hacen hoy, con el teléfono, lo que la tesis
describía.

**Pero no hacen lo mismo que este producto,** y la distinción es la que hay que usar:

> **Kahoot mide a la clase, en el momento, para hacerla interactiva.
> Esto mide a cada estudiante, nombra su error y le dice qué estudiar.**

Cautela: que el mercado validara el **mecanismo** respalda el criterio técnico del owner
([[BUSINESS_CONTEXT]] B-07), pero **no valida el producto actual**, que es otra cosa. Afirmar lo
segundo con evidencia de lo primero es el tipo de exageración que el tono defendible del proyecto
prohíbe.

### 2.6 La objeción que el producto lleva quince años recibiendo

*"¿Para qué medir, si el estudiante puede decir qué no entiende?"* — es la primera objeción que
levanta la propuesta, y ya la levantaba en 2011. La respuesta está en la tesis y **hoy está publicada
en el FAQ** ([[BACKLOG]] T-75): el déficit no es consciente, la presión social suprime la pregunta
(Fies 2005), y nombrar dudas no las prioriza.

Se registra porque es información de producto reutilizable: cualquier material de captación de esta
temporada debería responderla.

## 3. De dónde vienen algunas decisiones vigentes

Útil cuando alguien pregunte "¿por qué está hecho así?".

| Decisión de hoy | Origen |
|---|---|
| El diagnóstico dura ~20 min | El ciclo de 15–25 min del CRS (propuesta de 2012) |
| Los ítems tienen cuatro alternativas | Los cuatro botones del pupitre (tesis, 2010) |
| El diagnóstico **no es una nota** ni queda en registro | *"Es un dispositivo de medición, no de evaluación"* (conclusiones de la tesis, siguiendo a Coll) |
| El error se nombra en vez de penalizarse | El anonimato como protección del estudiante (tesis, vía Fies 2005) |
| El objetivo es tiempo hasta la competencia, no puntaje | La métrica fundacional η = 5/8,2 (tesis §1.1) |
| Infraestructura de costo ≈ 0 | Criterio de costo unitario ya presente en el diseño de 2010 |
| λ definida al principio como "respuestas por minuto" | El *período de muestreo* de la teoría de control (tesis §1.1.1) — reemplazada por otra fórmula en [[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]] |

El marco conceptual completo de la tesis —el aula como planta bajo control discreto, la evaluación
como problema de frecuencia de muestreo— es el mismo que [[VISION_LIBRO_PROYECTO]] §3.2 presenta
citando a Ogata. No es una idea de 2026: está en el capítulo I de 2010. Eso la respalda, no la
debilita.

## 4. Bibliografía aprovechable

De la tesis, y aplicable hoy al banco de ítems:

- **Beatty, Gerace, Leonard & Dufresne (2008)**, *Designing Effective Questions for Classroom
  Response System Teaching* — **diseño de ítems y distractores**. Es literatura directa sobre el
  activo central del producto ([[BACKLOG]] T-01).
- **Fies (2005)** — el anonimato y la respuesta errónea sin costo social. Sostiene el copy del FAQ.
- **Coll**, *La evaluación en el proceso de enseñanza/aprendizaje* — medición ≠ evaluación.

Son referencias de 2005–2008: verificar vigencia antes de usarlas como respaldo público. El proyecto
ya descartó una hipótesis pedagógica popular por falta de evidencia (D-41) y ese estándar aplica
igual hacia atrás.

---

Relacionado: [[../adr/ADR-024-raiz-en-la-tesis-2010]] · [[PROJECT_BRIEF]] · [[BUSINESS_CONTEXT]] ·
[[VISION_LIBRO_PROYECTO]] · [[OPEN_QUESTIONS]] Q-23, Q-30 · [[RISKS]] R-01, R-19

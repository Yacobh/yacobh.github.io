# ADR-019: El segundo eje del perfil mide fluidez, no estilo de aprendizaje

## Estado

Aprobada — implementada en `universo.irt.fluency` (2026-08-12).

## Fecha

2026-08-12

## Contexto

[[../project-memory/VISION_LIBRO_PROYECTO]] §3.3 propone una huella cognitiva de tres ejes:

1. **Conocimiento (θ)** — implementado desde el principio (ADR-004).
2. **Frecuencia (λ)** — respuestas por minuto, comparado explícitamente con la fluidez lectora.
   Declarado no implementado.
3. **Estilo de aprendizaje** — canal preferente (visual / auditivo / kinestésico) más un eje
   conductual. Declarado *"fase futura, sin diseño técnico"*, y presentado en el libro como
   **diferenciador competitivo**.

El owner planteó (2026-08-12) que estas ideas "se han ido perdiendo". La revisión del código le da
la razón parcialmente, y de forma verificable: `:traits {:logical :visual :verbal :exploratory}`
existe en `universo.db/default-db` y **aparece en un solo lugar de todo el repositorio**. Nada la
calcula, nada la lee, ningún test la toca. Es un stub que lleva ahí desde antes del registro de
memoria y que hace parecer que existe una funcionalidad que nunca se construyó.

O sea: no se perdió una implementación, se dejó una promesa a medio escribir. Y hay que decidir qué
hacer con ella, porque el producto se está posicionando sobre rigor psicométrico.

## Decisión

**El segundo eje del perfil mide fluidez (automatización), y el eje de "estilo de aprendizaje" no
se implementa.**

1. **Se construye el Eje 2**, en un namespace puro `universo.irt.fluency`, con la medida
   normalizada por largo de enunciado:

       t_rel = segundos observados / segundos de lectura del enunciado

   reusando `universo.irt.effort/reading-seconds` en vez de definir una segunda constante de
   velocidad de lectura.

2. **Solo cuentan respuestas correctas, medidas y esforzadas** (peso 1.0 según
   [[ADR-014-tiempo-de-respuesta-como-eje-separado]]). Fluidez es hacerlo bien *y* rápido; promediar
   tiempos de respuestas incorrectas produce un número sin interpretación.

3. **Mediana, no promedio.** El test es autoadministrado: un ítem de ocho minutos porque alguien
   fue a buscar agua arrastra cualquier media.

4. **El cruce θ × λ produce cuatro perfiles con acciones distintas**, que es la razón de existir del
   eje. En particular `:sabe-pero-lento` (θ alto, λ baja) recibe *práctica de fluidez, no más
   teoría* — el caso que el propio libro usa para justificar el eje.

5. **El Eje 3 no se implementa**, y el stub `:traits` queda anotado como muerto en vez de
   silenciosamente presente.

## Por qué no se implementa el eje de estilos de aprendizaje

No es una decisión de prioridad, es de evidencia. La hipótesis de los estilos de aprendizaje —que
enseñar en el "canal preferente" de cada estudiante mejora su aprendizaje— es de las más puestas a
prueba de la investigación educativa y de las que menos apoyo empírico ha reunido. Los estudiantes
sí declaran preferencias de canal; lo que falla reproduciblemente es la *hipótesis de emparejamiento*
(que alinear la enseñanza con esa preferencia mejore resultados).

Lo decisivo para este proyecto no es el debate académico, es la asimetría de riesgo:

- Todo el resto del producto se apoya en cosas defendibles: IRT, error estándar, errores
  conceptuales nombrados uno por uno. Es lo que le permite decirle a un apoderado "esto no es una
  nota, es un mapa".
- Un solo componente sin respaldo es el que un profesor informado, un colegio evaluando compra
  (segmento B2B declarado en VISION §4.3) o un competidor usaría para desarmar la credibilidad del
  conjunto.

Un diferenciador que no se puede defender no es un diferenciador: es una superficie de ataque.

**La fluidez conserva la intuición y la vuelve defendible.** Lo que el owner quería capturar —que
dos estudiantes con la misma nota no son el mismo estudiante— es correcto y valioso. La
automatización sí es un constructo con respaldo, sí distingue esos dos casos, y sí se puede medir
con datos que **ya estamos guardando** desde ADR-014.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **Implementar el Eje 3 tal como está en el libro** (cuestionario de canal preferente) | Ver arriba. Además exigiría un instrumento nuevo —un cuestionario— que alarga el diagnóstico de 20 minutos, cuando el argumento de venta es que dura una sola sesión |
| **λ como "respuestas por minuto" crudas**, literal del libro | Confunde velocidad con largo de enunciado: un banco con enunciados largos daría λ baja para todos. La normalización por tiempo de lectura cuesta lo mismo y sí es comparable entre bancos |
| **Contar todas las respuestas, no solo las correctas** | Un incorrecto rápido y un incorrecto lento significan lo mismo (no tiene la herramienta). Mezclarlos produce una media sin interpretación posible |
| **Umbrales absolutos en segundos** | Es el error que `028` cometió con `min_response_seconds = 3` y que `032` corrigió midiendo. Un número en segundos depende del banco; un múltiplo del tiempo de lectura, no |
| **Esperar a tener datos antes de construir nada** | El eje no se puede calibrar sin datos, pero tampoco se generan datos sin el eje. Se entrega con umbrales autorales **declarados como tales** y con `calibration-report` incluida para reemplazarlos, que es el mismo camino que recorrió T-59 |
| **Eliminar `:traits` del app-db** | Cambiar la forma de `app-db` sin necesidad. Anotarlo como muerto informa igual y no toca nada |

## Consecuencias

**Buenas**

- Dos estudiantes con la misma θ dejan de ser el mismo estudiante para el sistema.
- Es un diferenciador real frente a las plataformas que solo reportan porcentaje de acierto, y es
  defendible ante alguien que pregunte en qué se basa.
- Reusa datos ya capturados: cero cambios de esquema, cero migraciones, cero costo de
  infraestructura.
- Cierra la ambigüedad de `:traits`, que llevaba tiempo prometiendo algo inexistente.

**Malas / costos aceptados**

- **Los umbrales (3 y 6 tiempos de lectura) son autorales y no están calibrados.** Es exactamente la
  situación que `032` corrigió para el filtro de esfuerzo. Están como constante con nombre y como
  parámetro de `classify` para que recalibrar sea cambiar un argumento.
- **La muestra va a ser chica.** Con `max_items` entre 4 y 12 y contando solo correctas, muchos
  diagnósticos no van a alcanzar `min-responses`. En esos casos no se muestra nada, que es lo
  correcto pero significa que el eje no aparecerá siempre.
- **Contradice al libro del proyecto en un punto declarado como diferenciador.** VISION queda con
  una tensión abierta respecto de su §3.3, igual que las que ya registran Q-22/Q-23.
- El cuadrante `:rapido-sin-base` (θ bajo, λ alta) puede ser un artefacto: alguien adivinando rápido
  que el filtro de esfuerzo no alcanzó a descartar. Su texto de acción lo dice explícitamente en vez
  de presentarlo como diagnóstico.

## Riesgos

| Riesgo | Mitigación |
|--------|-----------|
| Etiquetar a un estudiante con evidencia insuficiente | `min-responses` = 4, y sin banda no hay cuadrante ni tarjeta. `profile-for` devuelve nil y la UI no muestra nada |
| Los umbrales autorales resultan estar del lado equivocado, como el 3 de `028` | `calibration-report` entrega mediana y deciles del histórico para corregirlos con datos. Se cruza con T-59 |
| El perfil viaja por JSONB y las keywords vuelven como strings | `profile-for` acepta ambas formas, con test que lo cubre. Sin eso el cuadrante se vería al terminar el test y desaparecería al recargar |

## Seguimiento

- Acumular diagnósticos con tiempo real y correr `calibration-report` antes de defender los
  umbrales ante nadie.
- Cuando haya datos, decidir si `:media` sigue cayendo del lado no fluido.
- Registrar en [[../project-memory/OPEN_QUESTIONS]] la tensión con VISION §3.3, que esta ADR abre y
  no cierra: el libro declara el Eje 3 como diferenciador y acá se decide no construirlo.

---

Relacionado: [[ADR-004-irt-1pl-map-y-regla-de-parada]] ·
[[ADR-014-tiempo-de-respuesta-como-eje-separado]] ·
[[../project-memory/VISION_LIBRO_PROYECTO]] §3.3 · [[../project-memory/BACKLOG]] T-59, T-63

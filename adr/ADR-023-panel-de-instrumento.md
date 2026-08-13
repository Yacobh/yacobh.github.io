# ADR-023: Panel de instrumento — la física está en los controles, no en la superficie

## Estado

Aprobada. **Extiende a [[ADR-022-lenguaje-braun-rams]]**, no la reemplaza: los principios siguen
siendo los mismos, cambia la materialidad.

## Fecha

2026-08-13

## Contexto

El owner probó el lenguaje Braun de ADR-022 ("está bien") y trajo una referencia visual: un kit de
interfaz **skeuomórfica** —perillas, conmutadores, botoneras y LEDs cian sobre un panel gris medio,
con un botón rojo de encendido. Pidió mezclarlo con los principios de Rams.

**La referencia no contradice a Braun: es su descendencia.** El SK4, el T3 y el regie 308 son
exactamente eso — perillas y conmutadores sobre una carcasa gris. La UI skeuomórfica de equipos de
audio salió de ahí.

Donde sí chocan es en un punto, y hay que decirlo: Rams pide "tan poco diseño como sea posible", y
un botón de pantalla que finge ser plástico moldeado es decoración.

**Lo que resolvió la discusión no fue una opinión de diseño, fue una medición.** Sobre el gris medio
del panel:

| Elemento | Contraste sobre el panel | Necesita |
|---|---|---|
| LED cian | **1.04** | 3.0 |
| Naranja de acción | **1.68** | 3.0 |
| Rojo | **2.61** | 3.0 |

Ninguno llega. Y mirando la referencia otra vez, ahí está la solución: **ningún LED de la foto está
sobre el panel gris.** Todos viven dentro de perillas negras, botoneras oscuras o alojamientos
hundidos. El gris es el fondo; el contraste lo pone el control.

Eso convierte el relieve de decorativo en **funcional**: es lo que hace visible un control sobre una
superficie que no contrasta con nada. Rams §4 —buen diseño hace comprensible al producto— no tiene
nada que objetar.

## Decisión

**La regla, en cuatro líneas:**

> El panel es plano y callado.
> Solo los **controles** tienen física.
> La luz viene de arriba, siempre.
> El color solo se enciende donde algo **es verdad**.

**1. La página es la cara del aparato**, gris medio (`panel-300` en claro, `panel-800` en oscuro).
No es la hoja blanca de un documento. Es lo que hace que las placas y los controles se lean como
piezas montadas encima.

**2. Cuatro piezas, definidas una sola vez en `src/css/app.css`:**

| Pieza | Qué es | Por qué existe |
|---|---|---|
| `.control` | Bisel: filo claro arriba, sombra propia abajo, proyectada sobre el panel. Se hunde al presionar | Es lo único que delimita un botón sobre un panel que no contrasta |
| `.alojamiento` | Hueco oscuro y hundido | Sin él un LED da 1.04 de contraste; dentro, 7.20 |
| `.led` / `.led--on` | Diodo. Apagado se ve, encendido tiene halo | El estado vacío también informa: "esto podría encenderse" |
| `.placa` | Módulo montado sobre el panel | La superficie blanca sobre gris da 1.99: se lee como pieza aparte pero no alcanza como único delimitador, así que se delimita con luz |
| `.grabado` | Leyenda impresa en la carcasa | Como el "mono / stereo" de la referencia: mismo material, un tono más oscuro, nunca un color |

**3. Dos colores con significados que no se pisan.** `senal` (naranja) = **acción**: "hacé esto".
`led` (cian) = **estado**: "esto es verdad ahora". Es lo que hace la referencia — LEDs cian para
estado, rojo para la acción peligrosa. Un tercer color decorativo rompería las dos lecturas.

**4. El LED solo existe dentro de un alojamiento.** No es una convención estética: fuera de él es
invisible. Queda como combinación prohibida explícita en `scripts/audit_contraste.py`.

**5. Se aplica donde hay estado que mostrar, no en todas partes.** Hoy: el nivel de θ (cuatro LEDs
en regleta) y las medallas de la línea del tiempo (un diodo por hito, tres grados = misma corriente
en tres intensidades). No se convierte cada elemento en una perilla.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Skeuomorfismo completo, como la referencia | Perillas y conmutadores reales exigen gestos de arrastre, cuestan accesibilidad y no aportan a un formulario. La referencia es un kit de demostración, no un producto en uso |
| Rams puro, como quedó en ADR-022 | Al owner "está bien" pero le faltaba carácter, y sobre panel gris la falta de relieve deja los controles sin delimitar |
| Mantener el fondo casi blanco y solo agregar biseles | El bisel sobre blanco es exactamente el skeuomorfismo decorativo de 2010: sin panel gris no tiene de dónde levantarse |
| Un solo color (cian o naranja) | Se pierde la distinción acción/estado, que es lo que hace legible un panel de instrumentos |
| LEDs sueltos sobre el panel, sin alojamiento | Medido: 1.04 de contraste. Invisible |

## Consecuencias

**Positivas**

- El sitio deja de parecerse a cualquier otra cosa: es una superficie con identidad propia.
- El relieve es defendible ante el propio criterio de Rams porque **es lo que vuelve visible al
  control**, no un adorno.
- Las medallas de la línea del tiempo ganan el lenguaje que les faltaba: un hito descubierto es un
  diodo encendido, y eso se entiende sin leyenda.
- **27/27 pares de contraste** cumplen su umbral, con dos combinaciones prohibidas documentadas.
- El vocabulario es chico —cinco clases— y está centralizado, como exige ADR-012.

**Negativas / costos aceptados**

- **Es un híbrido, y un purista de Rams objetaría los biseles.** La defensa es la medición, no el
  gusto; si alguien no la acepta, la discusión es legítima.
- El gris medio como fondo es **mucho más notorio** que un casi blanco: si no gusta, no es un ajuste
  menor.
- Las sombras y gradientes de `.control` son CSS que hay que mantener a mano; no salen de tokens.
- El cian LED tiene un aire "consola de audio" que puede chocar con el registro académico del
  producto. Es la apuesta que el owner quiso hacer.
- Tercera dirección visual en un día (ADR-020 → ADR-022 → ADR-023). El costo real es bajo porque
  todo vive en tokens y cinco clases, pero conviene parar y mirar antes de seguir iterando.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Nada de esto se ha visto con ojos, y ya van tres direcciones | T-67 sigue abierta; la rama no está en `main` | [[../project-memory/RISKS]] R-25 |
| Alguien pone un LED fuera de un alojamiento y queda invisible | Combinación prohibida explícita en el audit, con el número | §4 |
| El relieve crece hasta volverse decoración | La regla está escrita en la cabecera del bloque CSS, que es lo primero que se lee al tocarlo | §Decisión |
| Contraste insuficiente en pantallas de bajo brillo por el gris medio | 27/27 pares verificados; el texto principal da 8.14 sobre el panel | `scripts/audit_contraste.py` |

## Seguimiento

- **Mirarlo.** Es la tercera iteración visual sin verificación y la más material de las tres.
- Si el cian resulta demasiado "consola", el punto de ajuste es el tono del LED, no volver a planos.
- Si aparece un tercer estado que mostrar (por ejemplo, cupos confirmados), usar el mismo diodo
  antes que inventar otro lenguaje.

---

Relacionado: [[ADR-022-lenguaje-braun-rams]] · [[ADR-012-tema-oscuro-mapeo-css-global]] ·
[[ADR-021-linea-del-tiempo-historica]] · [[../project-memory/DECISIONS]] ·
[[../project-memory/BACKLOG]] T-67

# Plan — track `electronica`: circuitos de continua, desde cero y para corregir errores

> Estado: ✅ **aplicado en producción el 2026-09-20.** El track existe: 5 módulos, 80 ítems, 30 ideas
> erróneas, 5 tests encadenados y **10 recursos publicados** con sus 60 enlaces a ideas erróneas.
> Los cinco JSON de unidad pasan el séptimo auditor con 0 errores. **Queda la revisión pedagógica de
> los 80 ítems**, que es lo único pendiente. Épica **E10** en [[BACKLOG]], tareas **T-155…T-162**.
>
> Decidido por el owner: **track nuevo `electronica`, visible**, con **cinco módulos** encadenados
> por prerrequisito.

---

## 1. Quién lo va a usar, y por qué eso decide todo lo demás

**No es un track especulativo.** El destinatario es un curso real:

> **Alumnos de 16–17 años de la especialidad de técnico en electrónica, que el owner le hace clase.
> Llegan con muchas fallas de base, y el nivel de `electrotecnia` les queda muy alto.**

De ahí salen las cuatro restricciones que gobiernan el resto del documento, y ninguna es de gusto:

| # | Restricción | Consecuencia concreta |
|---|---|---|
| 1 | **Solo corriente continua** | Nada de fasores, valor eficaz, reactancia, impedancia ni trifásico. Eso ya es `electrotecnia` y es justo lo que les queda alto |
| 2 | **Es un track correctivo, no de cobertura** | El producto entregable no es «pasar la materia»: es el **mapa de errores**. Los distractores no se inventan — salen de los errores que el profesor ya ve en el aula |
| 3 | **Aritmética de cabeza** | Una magnitud por vez, un despeje por vez, dos pasos como máximo. Si un ítem necesita calculadora, es de `electrotecnia` |
| 4 | **Entra `C = Q/V` explícita** | La definición de capacitancia como carga por unidad de tensión, antes de cualquier asociación serie/paralelo |

### ⭐ Esto cambia por qué vale la pena hacerlo

La primera versión de este plan lo anotaba como **R-30 en estado puro**: *«~100 ítems de autor que
no avanzan G-1, G-2 ni G-5»*. **Con el destinatario a la vista, eso era un error de análisis.**

> **Un curso completo de alumnos reales, rindiendo un diagnóstico, con el profesor mirando el
> resultado, es lo más parecido a un cliente institucional que este proyecto ha tenido.**

Concretamente:

- **G-1** — T-82 dice *«si esta pantalla no impresiona, no hay venta»*. **T-130** (mapa de errores
  por SQL) y **T-133** (la pantalla) nunca se probaron contra un curso entero con un profesor que
  necesita el resultado. Acá el profesor y el cliente son la misma persona, así que el ensayo es
  gratis y el veredicto es honesto.
- **G-4** — un curso que rinde al empezar y vuelve a rendir después es **Δθ medido**, que es
  literalmente lo que G-4 promete vender. El histórico nunca se sobrescribe.
- **T-90 / T-131** — quedaron «a medias» esperando la observación de un curso real. Este es uno.
- **G-2** — ⚠️ **no.** Calibrar `electronica` no calibra el banco PAES, que es lo que G-2 necesita.
  Lo que sí aporta es **práctica del procedimiento** de calibración sobre un banco chico y propio.

**Lo que sigue siendo cierto de la advertencia original:** son ~100 ítems de autor y es mucho
trabajo. La diferencia es que ahora tiene destinatario, fecha y un resultado observable, que es
exactamente lo que R-43 dice que hay que registrar para no confundirlo con «solo código».

⚠️ **R-28 aplica igual.** Son **menores**. No hace falta contrato —es su propio curso, no una
institución tercera— pero los datos son datos de menores: **T-07 (respaldo) deja de ser higiene y
pasa a ser lo mínimo** antes de que el curso rinda.

---

## 2. La frontera con `electrotecnia`, escrita para poder aplicarla

El track `electrotecnia` (`062`–`066`, **aplicado** el 2026-09-09) ya tiene cuatro de los cinco
contenidos. Eso no es un problema si la frontera se puede verificar ítem por ítem, y con las
restricciones de §1 se puede:

| Regla | Un ítem pertenece a `electronica` solo si… |
|---|---|
| **F1 · Continua** | No aparece corriente alterna, fasor, valor eficaz, reactancia, impedancia, frecuencia ni régimen transitorio |
| **F2 · Un paso** | Se resuelve con **un** despeje y a lo sumo **dos** operaciones aritméticas |
| **F3 · Una magnitud** | No mezcla dos leyes en el mismo enunciado (Ohm **y** potencia juntas es `electrotecnia/magnitudes`) |
| **F4 · Error observado** | Sus cuatro `error_*` nombran errores que el profesor **vio en el aula**, no errores plausibles |

**F4 es la que de verdad separa los dos tracks.** `electrotecnia` es un track de cobertura de
temario; `electronica` es un track de corrección de errores concretos. Si un ítem de `electronica`
no corrige nada que haya pasado en clase, sobra.

Comparación con lo que ya existe, para que se vea el corte:

| `electrotecnia` (existe, aplicado) | Banda | Por qué queda alto |
|---|---|---|
| `electrotecnia/magnitudes` | −3,0 · −1,7 | Mezcla **Ohm y potencia** en un módulo (viola F3) |
| `electrotecnia/dc_series_paralelo` | −2,7 · −1,3 | Divisores: dos pasos mínimo (viola F2) |
| `electrotecnia/kirchhoff` | −2,3 · −0,9 | Mallas con dos fuentes (viola F2) |
| `electrotecnia/capacitancia` | −1,5 · −0,1 | Incluye **transitorio RC** (viola F1) |
| `ca_senales`, `reactancia`, `impedancia`, `potencia_ca`, `resonancia`, `trifasico` | −0,8 · 2,6 | **Alterna entera** (viola F1) |

Y lo único que **no existe en ninguna parte del repositorio**, verificado con `grep` el 2026-09-19:
**notación científica**. Aparece en prosa de recursos de Baldor y en ningún módulo ni banco.

---

## 3. Los cinco módulos

| # | slug | Título | Contenido |
|---|---|---|---|
| 1 | `electronica/notacion_cientifica` | Notación científica y prefijos | Potencias de diez; **p, n, µ, m, k, M, G**; convertir entre prefijos; orden de magnitud |
| 2 | `electronica/ley_de_ohm` | Ley de Ohm | V = I·R en sus **tres** despejes, uno por vez, con unidades |
| 3 | `electronica/potencia` | Potencia y energía | P = V·I, P = I²R, P = V²/R; disipación en un resistor; energía y consumo |
| 4 | `electronica/capacitores` | Capacitancia y capacitores | **C = Q/V**; µF/nF/pF; serie y paralelo; energía almacenada. **Sin transitorio RC** |
| 5 | `electronica/leyes_de_kirchhoff` | Leyes de Kirchhoff en continua | LCK en un nodo, LVK en una malla. Una fuente, dos o tres resistores |

> ⚠️ **`leyes_de_kirchhoff` y no `kirchhoff`.** `electrotecnia/kirchhoff` ya existe, y
> `universo.topics/suffix-match` exige coincidencia **única**: con dos candidatos devuelve `nil`. El
> choque habría dejado de resolver **el módulo de electrotecnia que ya está aplicado**, en silencio.
> Detectado antes de escribir el SQL, comprobando los sufijos contra el `def` real.

### La cadena de prerrequisitos, corregida

La primera versión colgaba **los cuatro** de `ley_de_ohm`. **Está mal para capacitores**: `C = Q/V`
no necesita la ley de Ohm para nada; lo que sí necesita —y mucho— es saber qué es un µF y qué es un
nF, o sea el módulo 1.

```
electronica_notacion   (sin prerrequisito)   ← la puerta de entrada
   ├── electronica_ohm
   │      ├── electronica_potencia
   │      └── electronica_kirchhoff
   └── electronica_capacitores
```

`prerequisite_topic` de `test_configs` es **de un solo valor**, así que esta es exactamente la forma
que el esquema permite hoy. Y tiene una ventaja práctica: **un alumno trabado en Ohm igual puede
avanzar en capacitores**, en vez de quedarse sin nada que rendir.

### Convenciones de escritura

**Las cuatro están cerradas.** Viven en `supabase/CONTENT.md` §Convenciones de notación por track,
que es donde manda: *si un ítem las contradice, el ítem está mal* (P5.1 de la skill).

| Convención | Estado |
|---|---|
| Decimal **con coma** (`2,2 kΩ`) | ✅ decidida |
| Resultados **siempre con unidad y prefijo** del taller (mA, kΩ, µF), nunca en unidades base | ✅ decidida — es lo que hace que notación científica sea prerrequisito real y no decorativo |
| Kirchhoff: **sentido de malla horario** fijo en todos los ítems | ✅ decidida — así el error de signo es diagnosticable en vez de ambiguo |
| **«tensión»** y **«corriente»**, no «voltaje» ni «intensidad» | ✅ decidida (2026-09-20) — un distractor que falla por vocabulario no diagnostica física |

### `min_theta`: el centro de la banda del prerrequisito

Decidido el 2026-09-19, **en contra del default**: los cuatro ejes del producto usan `null` —basta
*haber rendido*— y acá la cadena exige alcanzar el centro de la banda previa.

⚠️ **Con una salvedad que hay que resolver al escribir `077`.** El centro de `notacion_cientifica`
es **−2,4** y el estimador **clampea en −3,0**; **R-44** midió dos de doce estudiantes reales
clavados en −3,00 **habiendo trabajado**. Ese alumno no abriría ningún módulo. Lo acota que
`notacion_cientifica` no tiene prerrequisito y que el desbloqueo mira el **máximo** histórico —puede
reintentar—, pero se queda con **una sola** cosa que hacer. **Recomendación: ≈ −2,7 para las dos
aristas que salen de la raíz, y el centro para las demás.**

### Por qué un `topic` por módulo, y no un banco de eje

**ADR-038 («el módulo es rendible») está aprobado y sin implementar** (T-149). Con el esquema de hoy
`test_configs.topic` es **primary key** y `next_question` filtra `where q.topic = p_topic`, **sin
mirar `module_id`**. Un banco de eje —como `electrotecnia`, cuyos 116 ítems comparten
`topic = 'electrotecnia'`— **no puede servir el test de un solo módulo**: habría un test de cinco
temas y «Mi plan» no podría decir cuál repasar. Que es justamente lo que un curso con fallas de base
necesita que diga.

El precedente ya está aplicado: **`cuantica`**, donde `040` creó una fila de `test_configs` por
módulo. Se copia eso. **Cuando T-149 llegue, este track migra sin dolor**: sus `topic` ya son por
módulo.

### Bandas propuestas (hipótesis autorales, no mediciones)

Vale lo que dicen `046` y `062`: **una banda es una hipótesis editorial** y se valida calibrando
(**G-2**, R-17, Q-05). Bajan respecto de la primera versión del plan, porque el curso llega con
fallas de base y el piso tiene que ser real.

| slug | `order_index` | `band_min` | `band_max` | centro (= `initial_theta`) |
|---|---|---|---|---|
| `electronica/notacion_cientifica` | 3010 | −3,0 | −1,8 | **−2,4** |
| `electronica/ley_de_ohm` | 3020 | −2,8 | −1,6 | **−2,2** |
| `electronica/potencia` | 3030 | −2,4 | −1,2 | **−1,8** |
| `electronica/capacitores` | 3040 | −2,2 | −1,0 | **−1,6** |
| `electronica/leyes_de_kirchhoff` | 3050 | −1,8 | −0,6 | **−1,2** |

`order_index` arranca en 3010 para no chocar con `electrotecnia` (2010–2120).

### ⭐ `initial_theta` explícito por test — lo que `065` no hizo

`065` dejó los dos bancos de `electrotecnia` con `initial_theta` en null, o sea el **−1,0** por
defecto de `048`. Para este track eso sería un error caro, y ADR-038 ya escribió la aritmética:

> con `initial_theta = −1,0` y `|Δθ| ≤ 0,4` por ítem, llegar a −2,8 cuesta **mínimo 5 ítems solo de
> viaje**. En un test de 10, **la mitad se gasta en llegar al nivel del alumno** — y el costo lo
> paga justo el más débil, que es todo este curso.

Es también la causa (b) de **R-44**, donde dos estudiantes reales quedaron clavados en θ = −3,00,
que es el *clamp* del estimador y no una medición.

**Cada fila de `077` lleva `initial_theta` = el centro de la banda de su módulo.** El test arranca
donde el contenido vive y **los diez ítems son medición**.

---

## 4. Las migraciones

Van después de `070`. **Ninguna se aplica sin verificarla contra un PostgreSQL desechable, con
segunda pasada de idempotencia y reversión escrita** (CLAUDE.md §9).

| # | Archivo | Qué hace |
|---|---|---|
| `071` | `electronica_track_y_modulos.sql` | Check de `track` ampliado (A2, el único lugar ruidoso); cinco filas de `modules` con **banda explícita**, `historical_*` y `historical_blurb`; `module_prerequisites` |
| `072`…`076` | `banco_de_electronica_<modulo>.sql` | **16** ítems activos + sus ideas erróneas, generadas por `scripts/generar_migracion_items.py` |
| `077` | `test_configs_de_electronica.sql` | Cinco filas con `prerequisite_topic`, **`initial_theta` explícito** y la **guarda de `065`** adaptada: se niega si algún banco no llega a **16** ítems activos |
| `078` | `electronica_resources.sql` | Una guía y una práctica por módulo, `published = false` (ADR-016 §1) |

**Orden duro:** `071` antes que los bancos (los ítems referencian `module_id`); los bancos antes de
`077` (la guarda los cuenta). `078` en cualquier momento.

Parámetros sugeridos para `077`, más angostos que los 5/12 de `065` porque cada test es **un solo
módulo** y ya no tiene que viajar: `min_items = 4`, `max_items = 8`, `se_threshold = 0.35`,
`min_response_seconds = 3`. Es el rango que ADR-038 propone para un test de módulo, y el que hace que
un banco de 12 ítems alcance con margen.

⚠️ `se_threshold = 0.35` **sigue siendo inalcanzable** (R-38, T-111: el piso del SE con azar es
≈0,73). Se deja por coherencia con el resto y sabiendo que la parada real será `max_items`. Que
ahora los 10 ítems sean todos medición es lo que **puede** empezar a moverlo, y **este curso es la
primera oportunidad de comprobarlo con datos**.

### El cliente: exactamente dos cosas, y las dos obligan a recompilar

| Lugar | Qué va | Si falta |
|---|---|---|
| **B1** `universo.topics/module-slugs` | Los cinco slugs nuevos | ⭐ déficit `unknown/*` → **«Mi plan» no puede personalizarse**, con todo en verde. Es lo que le pasó a 218 ítems hasta T-152 |
| **B2** `universo.topics/explicit-topic->module-slug` | `electronica_notacion → electronica/notacion_cientifica` y sus cuatro hermanos | ídem: el topic **no** coincide con el sufijo del slug (`electronica_ohm` ≠ `ley_de_ohm`) |

**No** se toca `bands/product-tracks` ni `track-order`: el track no es del producto y lleva banda
explícita. Tocarlos movería las bandas de los 26 módulos del producto.

`npx shadow-cljs release app` + commit de `public/js/app.js` (ADR-003), **y test en
`topics_test.cljs` leyendo el `def` real, no de memoria** (L-59).

---

## 5. Lo que de verdad cuesta: los ítems, y antes que ellos los errores

**80 ítems** (16 × 5), con la skill `banco-de-items`: una sola alternativa correcta, clave
repartida entre las cuatro letras (R-35), las **cuatro** `error_*` escritas, LaTeX con escape simple
(`047`), cobertura de dificultad sin huecos.

> ⚠️ **Corrección sobre la primera versión de este plan, que decía 100 (20 × 5).** Ese 20 era una
> copia de la guarda de `065`, y `065` protegía **dos bancos que cubren doce módulos**. Acá cada
> banco es **un módulo de 1,2 logits**, y la regla de la skill es **≥6 ítems por cada tramo de 1,0
> logit**: son ~8 para cobertura. Con `max_items = 8` y margen para que un reintento no sirva los
> mismos ítems, **12 por banco** es el piso honesto. Escribir 100 no habría hecho mejor el
> diagnóstico; habría hecho más lenta la revisión, que es el cuello de botella real (P0.2 de la
> skill: hay 402 ítems activos **sin revisión pedagógica** delante de estudiantes).

**Pero el primer entregable no son los ítems: es el catálogo de errores.** Por F4, cada distractor
tiene que nombrar un error observado. Eso es **T-155**, y es lo único que nadie más que el owner
puede producir — ni el agente ni un libro. Sirve de insumo directo a `misconceptions` (A5) y decide
cuántos ítems merece cada módulo.

Errores que este plan **supone** que van a aparecer, listados solo para arrancar la conversación, no
para darlos por ciertos:

- despejar mal V = I·R (dividir cuando toca multiplicar);
- mezclar prefijos sin convertir (sumar 2,2 kΩ con 470 Ω como si fueran el mismo número);
- **capacitores en serie/paralelo al revés que resistores** — el error clásico y la razón de que
  `C = Q/V` vaya antes que la asociación;
- confundir carga (Q) con corriente (I) porque las dos «son electricidad»;
- signos en LVK al recorrer la malla;
- tratar la potencia como si fuera proporcional a la tensión sola.

📌 `contenido/unidades/` está **vacío**: ninguna unidad se dio de alta todavía por la skill
`unidad-de-contenido`. Este track sería la primera, y conviene correr `verificar_unidad.py` desde el
primer módulo en vez de descubrir al final qué faltó.

---

## 6. Riesgos

### R-42 empeora, y hay que decidirlo con el número a la vista

ADR-035 dejó escrito el precio de un track **visible**: `test_configs_select` (`020`) es
`active = true or public.is_admin()` — **visible para nadie salvo el admin, o visible para todos**.
No hay tercer estado.

Hoy un estudiante de PAES ve **12 bancos de electrotecnia** que no le sirven. Con esto ve **17**.

✅ **Decidido el 2026-09-20 (D-73): que los vean.** Activos: **14 → 19**. Es la misma decisión que
D-66/ADR-035 tomó para `electrotecnia`, y por la misma razón. **T-129 no se cierra con esto: se
vuelve más urgente**, porque el estudiante de PAES pasa a tener 14 bancos ajenos de 19.

### ⚠️ El reintento es la remediación, y hoy mide inflado (R-47)

`min_theta` exige el centro de la banda previa, y quien no llega **vuelve a rendir** — es la decisión
del owner y el mecanismo existe. Pero `next_question` **no excluye los ítems de intentos
anteriores**: con banco de 12 y `max_items = 8`, dos intentos comparten **al menos 4 ítems**, y el
primero es siempre el mismo. El alumno además ya vio la explicación correcta.

✅ **Resuelto el 2026-09-20 (T-164): los bancos subieron a 16 = `2 × max_items`**, y el solapamiento
forzado cayó a **0**. Sigue abierto que el primer ítem tiende a repetirse (los dos intentos arrancan
en el mismo `initial_theta`) y que afecta a todo el banco: el arreglo de fondo va con T-149.

### Los demás

| Riesgo | Mitigación |
|---|---|
| **Los ítems terminan siendo `electrotecnia` más fácil** y los dos tracks se estorban | F1–F4 se aplican ítem por ítem en T-158. F4 —error observado en el aula— es la que no se puede fingir |
| **R-28** — son menores, de un curso real | **T-07 (respaldo) antes de que el curso rinda.** No hace falta contrato porque es su propio curso, pero el dato es el mismo |
| **R-44** — el estimador se clava en el clamp | `initial_theta` por módulo (§3) ataca la causa (b). La (a) —cobertura en el extremo bajo— se ataca redactando ítems fáciles de verdad |
| **R-39** — bundle antes que migración | `071`…`077` primero, `release app` después |
| **R-17 / Q-05** — las bandas son autorales | Escrito en la cabecera de `071`. Este curso es la primera oportunidad de contrastarlas |
| **R-41** — ítems publicados sin revisión pedagógica | Acá **no aplica del mismo modo**: los revisa quien les hace clase, antes de que las rindan |

---

## 7. Orden de trabajo

1. ⏳ **T-155** — **Catalogar los errores reales del curso.** Lo único que nadie más puede hacer, y
   el insumo de todo lo demás. *Bloquea T-158.*
   **Borrador entregado el 2026-09-19**: `contenido/unidades/electronica_errores_para_revisar.md`,
   31 hipótesis con su `cuándo SÍ / cuándo NO`, para tachar y corregir. **Ninguna es un dato hasta
   que el owner la marque.**
2. ✅ **T-156** — `071`: track, cinco módulos con banda explícita, `historical_*`, prerrequisitos.
   **Escrita y verificada contra PostgreSQL 17.11 el 2026-09-19. Falta aplicarla.**
3. ✅ **T-157** — B1 + B2 en `universo.topics`, test (`t-156-los-cinco-modulos-de-electronica`),
   `release app` y bundle recompilado. **Hecho el 2026-09-19.**
4. ✅ **T-158** — Los cinco bancos. **Hechos el 2026-09-20**: `072`…`076`, 60 ítems y 30 ideas
   erróneas, nueve controles en verde. Sin aplicar.
5. ✅ **T-159** — **Decidido el 2026-09-20 (D-73): que todo estudiante de PAES vea los cinco.**
   Activos: **14 → 19**. T-129 no se cierra, se vuelve más urgente.
6. ✅ **T-160** — `077`: `test_configs` con la cadena, `initial_theta` por módulo y la guarda de los
   12. **Hecha el 2026-09-20**, con las dos guardas probadas disparando. Sin aplicar.
7. ✅ **T-161** — `078`: 10 recursos `published = false`, **y las primeras 60 filas de
   `resource_misconceptions`** que existieron en el proyecto. Aplicada el 2026-09-20.
8. ✅ **T-162** — los cinco `contenido/unidades/*.json` existen y el auditor pasa con **0 errores**.
   De paso encontró una idea errónea sin criterio de exclusión y **cinco falsos positivos del propio
   auditor** (T-165), los dos corregidos.

**Y uno que no es del plan pero lo condiciona:** **T-07 (respaldo)** antes de que el curso rinda
(R-28).

---

## Relacionado

- [[BACKLOG]] épica **E10**, T-155…T-162 · T-129 · T-149 · T-07 · T-82 / T-130 / T-133 · T-90 / T-131
- [[../adr/ADR-035-track-electrotecnia-visible]] — el precedente y su precio
- [[../adr/ADR-018-track-experimental-cuantica]] — un `topic` por módulo, el patrón que se copia
- [[../adr/ADR-038-el-modulo-es-rendible]] — la aritmética de `initial_theta` y por qué un banco de
  eje no sirve para medir un módulo
- [[RISKS]] R-42, R-44, R-28, R-39, R-41, R-17 · [[OPEN_QUESTIONS]] Q-05
- [[TESIS_DE_CRECIMIENTO]] G-1, G-4 — por qué un curso propio es el ensayo de la venta
- `.claude/skills/unidad-de-contenido/referencias/mapa-de-la-unidad.md` — los 19 lugares

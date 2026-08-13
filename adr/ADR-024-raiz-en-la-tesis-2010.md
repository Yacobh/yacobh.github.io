# ADR-024: La raíz del proyecto es la tesis de 2010, no el convenio UNAP de 2025

## Estado

Aprobada

## Fecha

2026-08-13

## Contexto

Desde el 2026-07-28 (D-18, [[../project-memory/OPEN_QUESTIONS]] Q-01) toda la memoria del proyecto y
el copy publicado en producción cuentan el origen con esta frase:

> *"Es un proyecto personal del profesor Jacobo Córdova, que se originó en 2025 a partir de un
> convenio de desarrollo con la Universidad Arturo Prat."*

Esa frase entró para **corregir un problema real**: antes se mostraba a la UNAP como respaldo
institucional vigente, y no lo es. D-18 hizo bien en bajarla a nota histórica. Lo que D-18 no supo es
que, al hacerlo, fijó como **origen** lo que era solo el episodio más reciente.

El 2026-08-13 el owner aportó **dos documentos**:

1. `docs/tesis.md` — su trabajo de grado de Ingeniería Electrónica, **UNEXPO Puerto Ordaz
   (Venezuela), agosto de 2010**: *"Diseño de un sistema digital interactivo de apoyo al proceso de
   enseñanza-aprendizaje"*, un Classroom Response System por hardware.
2. `docs/sistema_llovizna.md` — **"Sistema Llovizna"**, una **propuesta de financiamiento al Estado
   venezolano de 2012** que toma la tesis y diseña alrededor de ella el sistema completo. **No
   prosperó.** Es el documento que bautiza la línea de trabajo (el nombre no está en la tesis, Q-29)
   y que declara su propio linaje en §8: *"La propuesta se inició como propuesta de tesis para la
   UNEXPO"*.

3. **El blog `jacobocordova.blogspot.com`** (aportado más tarde el mismo día) — 21 entradas entre
   julio de 2010 y febrero de 2012, tituladas bajo el nombre **"Academia Integral"**. Documenta que
   el sistema **se construyó en software** (PHP, MySQL, jQuery, Moodle) y que el **2011-12-26** ya
   existían las tablas `preguntas` y `distractores`. Es también donde nace el nombre que el producto
   usa hoy, y donde el léxico del dominio ("reactivos", "distractores") se acuerda con un pedagogo el
   2011-11-30.

El segundo es el más revelador de los dos primeros para el producto actual: especifica el ciclo de 15–25
minutos con quizz de cuatro alternativas, la identificación de *"cuál contenido es necesario aclarar,
fortalecer, ejemplificar o ampliar"*, la base de datos de preguntas y recursos del pensum, y —textual—
*"localizar los alumnos que no han entendido bien el significado y **automáticamente apoyar con un
recurso adicional**"*, que es la capa 1 de "Mi plan" descrita catorce años antes de existir.

Dos hechos verificables obligan a corregir el relato:

1. **La tesis contiene el planteamiento entero del producto actual**, quince años antes: el aula como
   planta y la evaluación como muestreo (§1.1, §1.1.1), la distinción medición ≠ evaluación
   (Conclusiones), el anonimato para que el error no dañe al estudiante (Conclusiones, citando Fies
   2005), la métrica de eficiencia temporal η = 5/8,2 (§1.1) y el costo dominante del tiempo del
   profesor (§1.1.1). Su sección **Recomendaciones** propone exactamente el salto que este proyecto
   ejecutó: *"identificar de dónde proviene cada respuesta de manera que la evaluación pueda ser
   individualizada"*.
2. **El repositorio contradice por sí solo la frase publicada**: el primer commit es del
   **2025-05-03**, cinco meses *antes* del convenio UNAP (oct–nov 2025). El código no pudo originarse
   en un convenio que todavía no existía.

Efecto colateral relevante: [[../project-memory/VISION_LIBRO_PROYECTO]] §3.2 presenta el "control
retroalimentado aplicado a la pedagogía" (citando a Ogata, 2010) como marco conceptual nuevo del
fundador, y ADR-011 lo consagró como norte estratégico. Con la tesis a la vista, ese marco **no es
una idea de 2026**: es el capítulo I de 2010 reformulado. Eso no lo debilita — lo respalda, porque
deja de ser una analogía retórica y pasa a ser una línea de trabajo sostenida.

## Decisión

1. **La genealogía del proyecto se ancla en la tesis de 2010.** La cadena canónica es:
   `tesis UNEXPO 2010 → blog "Academia Integral" y software Llovizna (2010-07 → 2012-02) →
   propuesta de financiamiento 2012 → ponencia oral en el II Congreso Venezolano de Ciencia,
   Tecnología e Innovación (Caracas, nov. 2013) → repo (2025-05) → convenio UNAP (2025-10/11) →
   Academia Integral MVP (2026) → [[../project-memory/VISION_LIBRO_PROYECTO]]`. El período
   **nov 2013 – may 2025 no está documentado** y no se rellena con suposiciones.
   **Precisión importante:** lo que no prosperó en 2012 fue el **financiamiento**. El software se
   construyó y funcionó, y la propuesta fue aceptada por el comité científico de un congreso nacional
   y expuesta ante el ministerio del ramo.
2. **El convenio UNAP se documenta como episodio de financiamiento**, no como origen. D-18 sigue
   vigente en lo que decidió (la UNAP no se muestra como respaldo institucional vigente); lo que
   cambia es la palabra *"se originó"*.
3. El hecho vive en **un solo archivo**: [[../project-memory/RAIZ_SISTEMA_LLOVIZNA]]. Los demás documentos
   lo referencian, no lo reescriben (regla de [[../CLAUDE]] §6).
4. **`docs/tesis.md` y `docs/sistema_llovizna.md` quedan versionados como fuentes primarias, con los
   datos personales redactados.** Ambos traían cédula, teléfono y fecha de nacimiento del owner sobre
   un repo público (D-42); se reemplazaron por `xxxxx` **antes del primer commit**, así que nunca
   entraron al historial ([[../project-memory/RISKS]] R-26, cerrado). Se descartó no versionarlos: la
   trazabilidad a la fuente es justamente lo que esta decisión busca, y no depende de la cédula. El
   proyecto ya tenía el precedente (Q-01 dejó fuera los datos personales del convenio UNAP).
5. [[../project-memory/VISION_LIBRO_PROYECTO]] §3.2 se anota indicando su antecedente de 2010. **No
   se edita el texto del owner** — se anota, igual que se hizo con el Eje 3 en D-41.
6. **El copy publicado en producción no se cambia en esta decisión.** Es texto de cara al público,
   está triplicado (`index.html`, `public/index.html`, `landing.cljs`, [[../project-memory/RISKS]]
   R-05) y afecta el JSON-LD; la redacción concreta la decide el owner. Queda registrado como
   [[../project-memory/OPEN_QUESTIONS]] Q-30 y como contradicción X-09.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Dejar el relato como está y anexar la tesis como curiosidad histórica | El relato actual es **incorrecto**, no solo incompleto, y el propio historial de Git lo desmiente. PMF prohíbe dejar dos versiones contradictorias del mismo hecho ([[../CLAUDE]] §11) |
| Reescribir el origen dentro de `PROJECT_BRIEF` y `BUSINESS_CONTEXT` | Duplicaría el mismo hecho en dos archivos. Un hecho, un archivo |
| Cambiar también el copy de producción en este mismo commit | Es cara al público y afecta el JSON-LD; la decisión de qué contar y cuánto es del owner, no del agente. Se propone redacción en Q-30 y se espera su visto bueno |
| Borrar o reemplazar D-18 / ADR-011 | Un ADR es registro histórico: no se edita ni se borra. Se complementa |
| Tratar la tesis como el norte estratégico en lugar de [[../project-memory/VISION_LIBRO_PROYECTO]] | La tesis es la **raíz** (de dónde viene), no el destino. ADR-011 sigue vigente: el norte es el Libro del Proyecto. Son ejes distintos, no competidores |

## Consecuencias

**Positivas**

- El proyecto gana una **profundidad de 16 años** que no estaba documentada, y con ella un respaldo
  académico propio que no depende de ninguna institución vigente — justo el vacío que D-18 abrió al
  bajar el badge de la UNAP ([[../project-memory/BUSINESS_CONTEXT]] B-07).
- El marco de control retroalimentado deja de ser una analogía reciente y pasa a ser una línea
  sostenida, con tesis aprobada y bibliografía revisada por pares detrás.
- Aparece bibliografía de CRS **directamente aplicable hoy** y que la visión no citaba: Beatty et al.
  (2008) sobre diseño de ítems para CRS es literatura sobre distractores, es decir sobre el activo
  central del producto ([[../project-memory/BUSINESS_CONTEXT]] B-06).
- Explica de dónde vienen decisiones que parecían arbitrarias: las cuatro alternativas del ítem
  vienen de los cuatro botones del pupitre; λ como "frecuencia" viene del período de muestreo.
- Deja explícito el costo que el salto de 2010 a hoy trajo: individualizar la medición **es** lo que
  crea el problema de datos personales de menores ([[../project-memory/RISKS]] R-06). Antes era un
  riesgo suelto; ahora es una consecuencia entendida de la decisión fundacional.

**Negativas / costos aceptados**

- El copy de producción queda temporalmente **desalineado con la memoria** — una contradicción
  conocida y registrada (X-09), no silenciosa. Se acepta hasta que el owner decida la redacción.
- `docs/tesis.md` son ~103 KB de Markdown con las imágenes ausentes: es fuente primaria fiel pero
  incómoda de leer; por eso [[../project-memory/RAIZ_SISTEMA_LLOVIZNA]] existe como destilado.
- El nombre "Sistema Llovizna" queda documentado como testimonio no atestiguado en el documento.
  Se prefiere esa asimetría a inventar una atribución (Q-29).

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| ~~Datos personales del owner en las dos fuentes primarias, sobre un repo público~~ | ✅ **Resuelto 2026-08-13:** redactados con `xxxxx` antes del primer commit; nunca entraron al historial | **RISKS R-26 (cerrado)** |
| El copy publicado sigue afirmando un origen incorrecto mientras la decisión espera al owner | Registrado como contradicción abierta y con redacción ya propuesta; es el mismo patrón con que se manejó X-01 | RISKS R-05, OPEN_QUESTIONS Q-30, X-09 |
| Contar públicamente el origen arrastra el encuadre político del formulario de 2012 | Q-30 lo pone explícito como decisión consciente del owner: 2010 puede contarse sin exhibir 2012 | OPEN_QUESTIONS Q-30 |
| Usar la tesis como respaldo académico de cara al público sin verificar que su bibliografía (2005–2008) siga vigente | Advertencia explícita en [[../project-memory/RAIZ_SISTEMA_LLOVIZNA]] §4; mismo estándar de evidencia que D-41 aplicó a los estilos de aprendizaje | RISKS R-06 (reputacional) |
| Confundir raíz con norte: creer que el producto debe volver al CRS de aula | La decisión dice explícitamente que la tesis es de dónde viene, no a dónde va. ADR-011 sigue rigiendo el destino | ADR-011 |

## Seguimiento

- **[[../project-memory/BACKLOG]] T-74:** archivar el blog. Es la única de las tres fuentes que **no
  está bajo control del proyecto** — vive en Blogger y no hay documento original que reponerla.
- **Q-30** (redacción del copy público de origen) debe cerrarse con el owner.
- **Q-23** cambia de forma con este hallazgo: "Academia Integral" resultó ser el nombre fundacional
  de 2010, no un nombre comercial reciente. Revisar antes de cualquier decisión de rebranding. Mientras siga abierta,
  X-09 permanece como contradicción activa entre la memoria y producción.
- Si el owner autoriza cambiar el copy: el cambio toca los **tres** lugares (R-05) e implica
  `npx shadow-cljs release app` + commit del `app.js` (ADR-003).
- Revisar si Beatty et al. (2008) debe incorporarse como referencia de autoría de ítems en
  [[../project-memory/BACKLOG]] T-01 / la capa autoral de T-44.
- Si aparecen artefactos de la tesis (código Python, esquemáticos, fotos), evaluar versionarlos junto
  a `docs/tesis.md`.

---

Relacionado: [[../project-memory/RAIZ_SISTEMA_LLOVIZNA]] · [[../project-memory/DECISIONS]] D-18, D-45 ·
[[ADR-011-vision-libro-como-norte-estrategico]] · [[ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]] ·
[[../project-memory/OPEN_QUESTIONS]] Q-01, Q-29, Q-30

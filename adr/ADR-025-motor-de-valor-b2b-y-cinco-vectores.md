# ADR-025: Motor de valor B2B y los cinco vectores de crecimiento (G-1 … G-5)

## Estado

Aprobada

## Fecha

2026-08-16

## Contexto

Al 2026-08-16 el proyecto tiene un producto técnico en producción y **ningún ingreso operativo**.
La memoria describe con precisión el estado técnico, pero el modelo de negocio vigente hasta esta
decisión (D-19/D-26/D-32: clases a **$10.000 CLP/hora**) tiene un techo que no depende de la
calidad de la ejecución:

```
1.500 horas facturables/año × $10.000 CLP = CLP 15.000.000/año ≈ USD 16.000/año
```

Y ese máximo optimista supone que el fundador deja de programar, de escribir ítems y de calibrar —
es decir, que deja de construir el activo. Es un negocio de servicios profesionales con
infraestructura de software encima, no un negocio de software.

El desbalance de fondo: **se cobra por lo que tiene costo marginal alto** (las horas del profesor)
y **se regala lo que tiene costo marginal cero** (diagnóstico, mapa de errores, plan). Al mismo
tiempo, la memoria registra que ese costo marginal cero ya está construido y verificado
([[../project-memory/ROADMAP]] F8 cerrada) y que la infraestructura cuesta $0 (B-05).

Tres hechos más, ya documentados, que condicionan cualquier plan:

1. **[[../project-memory/RISKS]] R-19 es el riesgo dominante y es histórico, no del MVP.** Van tres
   intentos de escalar (2012–13 Estado venezolano, 2012 equipo, 2025 convenio UNAP) y los tres
   murieron en el mismo punto: llegar a los estudiantes de forma sostenida
   ([[../project-memory/RAIZ_SISTEMA_LLOVIZNA]], D-45).
2. **El banco no está calibrado estadísticamente** (R-17, Q-05): la afirmación psicométrica que
   sostiene todo el pitch está respaldada por el motor pero no por sus parámetros de entrada.
3. **F10 (medición) está en 0%**: no hay CAC, ni LTV, ni funnel instrumentado, así que ninguna
   afirmación cuantitativa de negocio es hoy verificable ([[../project-memory/ASSUMPTIONS]]).

El owner decidió el 2026-08-16, en sesión de trabajo, redefinir el modelo de negocio y alinear
toda la memoria a esa dirección, incluyendo la búsqueda de capital externo.

## Decisión

Se adoptan **cinco vectores de valor (G-1 … G-5)** como marco único del negocio. Su archivo
canónico es [[../project-memory/TESIS_DE_CRECIMIENTO]]; ningún otro documento los redefine.

| # | Vector | Decisión asociada |
|---|--------|-------------------|
| **G-1** | **Licencia institucional B2B como línea de ingreso principal.** El colegio/sostenedor/preuniversitario paga por diagnóstico, mapa de errores agregado y panel docente sobre su matrícula. El B2C se conserva como embudo, marca y fuente de datos. | D-47 |
| **G-2** | **Calibrar el banco y convertirlo en el activo defendible.** La calibración estadística pasa de deuda técnica postergable a entregable de negocio de máxima prioridad, con reporte técnico publicable. | D-48 |
| **G-3** | **Romper el acoplamiento ingreso ↔ horas del fundador.** Toda línea de ingreso nueva debe pasar la prueba de que su margen no depende de una hora adicional de Jacobo Córdova. | D-49 |
| **G-4** | **Vender progreso medido (Δθ), no acceso.** El producto vendido es la evidencia de mejora. Repetir el diagnóstico **nunca sobrescribe** el perfil anterior. | D-50 |
| **G-5** | **Construir la máquina de distribución y medirla.** Instrumentación del funnel y canal de adquisición repetible como condición de existencia del negocio, no como fase posterior. | D-51 |

**Orden de ejecución decidido** (no son paralelos):

```
G-2 (calibrar)  ──┐
                  ├──►  G-1 (vender B2B)  ──►  G-4 (Δθ)  ──►  G-3 (escala sin horas)
G-5 (medir)     ──┘
```

**Se decide además buscar capital externo** (CORFO / Start-Up Chile / semilla), y que la memoria
del proyecto se escriba también como material de inversión, con sus debilidades declaradas
explícitamente.

**Alcance del cambio en la memoria:** [[../project-memory/BUSINESS_CONTEXT]],
[[../project-memory/PROJECT_BRIEF]], [[../project-memory/ROADMAP]] (fases F12–F16),
[[../project-memory/BACKLOG]] (épica E8), [[../project-memory/RISKS]] (R-27…R-30),
[[../project-memory/OPEN_QUESTIONS]] (Q-32…Q-36, Q-07 respondida),
[[../project-memory/ASSUMPTIONS]] (A-31…A-35), [[../CLAUDE]] §1–§2 y §10.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **Mantener clases por hora como ingreso principal** (statu quo, D-32) | Techo aritmético ≈ USD 16.000/año, alcanzable solo si el fundador deja de construir el producto. No es un problema de ejecución sino de estructura: el ingreso está atado a un calendario personal. |
| **B2C suscripción pura** (sin venta institucional) | Requiere ~12.000 suscriptores (≈5 % de quienes rinden PAES M1) y una máquina de adquisición masiva que el proyecto **nunca logró construir en tres intentos** (R-19). Además concentra el riesgo en la ventana estacional de noviembre. Se conserva como complemento (~30 %), no como línea principal. |
| **B2B institucional puro** (descontinuar B2C de pago) | Elimina el embudo que genera los datos de calibración de G-2 y los testimonios que hacen vendible el B2B. El diagnóstico gratuito masivo **es** el generador del activo de datos; apagarlo sería apagar G-2. |
| **Licenciar el motor a un preuniversitario o editorial existente** | Resuelve la distribución de un plumazo, pero entrega el activo defendible (banco + calibración) a quien ya tiene el canal, dejando al proyecto como proveedor sustituible. Se descarta como estrategia principal; queda disponible como salida. |
| **Publicidad como ingreso** | Ya descartada por D-46 (2026-08-13) por cuatro razones independientes. Esta ADR no la reabre. |
| **Bootstrap estricto sin capital** | Compatible con la dirección, pero incompatible con el calendario: G-2 (calibración) y G-5 (venta) requieren personas distintas del fundador, y R-01 lleva 16 años sin resolverse por voluntad. Se decide buscar capital. |

## Consecuencias

**Positivas**

- El ingreso deja de estar acotado por el calendario del fundador: un alumno más cuesta ~$0.
- La calibración (R-17) deja de ser deuda perpetua y adquiere un dueño y una urgencia comercial.
- La estacionalidad PAES (R-19) deja de ser un riesgo estructural: la venta institucional ocurre en
  **marzo**, no en el pánico de noviembre.
- El histórico de θ pasa de "pregunta abierta incómoda" (Q-07, en rojo desde hace semanas) a
  **activo central del producto**, con semántica decidida.
- La memoria del proyecto queda utilizable como material de due diligence, con sus debilidades
  declaradas en vez de escondidas.
- R-01 (bus factor) obtiene, por primera vez, un plan estructural (G-3 + contratación de 2028) en
  vez de una mitigación por disciplina.

**Negativas / costos aceptados**

- **El ciclo de venta se alarga.** Un colegio decide en meses y con más de un decisor; un estudiante
  decide en minutos. Los primeros ingresos llegan más tarde que con el modelo por hora.
- **Aparece trabajo que no es de repositorio:** venta, pilotos, relación institucional. El fundador
  es hoy el único que puede hacerlo, lo que **agrava R-01 antes de aliviarlo**.
- **Obligaciones nuevas de datos.** Un colegio subiendo su matrícula convierte F9 (endurecimiento)
  en requisito contractual y agrava R-06 (menores de edad, Ley 21.719 en plena vigencia desde el
  2026-12-01). Ver R-28.
- **Multi-tenant institucional es trabajo técnico real** (rol `profesor`, agregación por curso,
  aislamiento por establecimiento) sobre un esquema pensado para estudiantes individuales.
- **Los números del plan son supuestos sin validar.** Se aceptan como hipótesis explícitas y
  quedan marcados como tales en [[../project-memory/ASSUMPTIONS]] A-31…A-35.
- **Se posterga la expansión multi-materia** hasta que el primer mercado funcione (§5 de la tesis),
  lo que difiere parte de la visión de [[../project-memory/VISION_LIBRO_PROYECTO]].

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Vender B2B con banco sin calibrar y perder credibilidad ante un jefe de UTP | G-2 es precondición dura de G-1; no se vende antes del reporte de calibración | RISKS R-17, R-29 |
| Ciclo de venta institucional más largo que la caja disponible | Escalera de §3 con pilotos gratuitos acotados; capital externo como puente | RISKS R-27 |
| El fundador absorbe además el rol comercial y colapsa | G-3 + primera contratación en cuanto haya ingreso recurrente | RISKS R-01 |
| Datos de menores a escala institucional bajo Ley 21.719 | F9 pasa a requisito contractual (T-07/T-09/T-11) antes del primer contrato | RISKS R-06, R-28 |
| Cuarta repetición del patrón histórico: producto nuevo sin resolver distribución | G-5 es precondición dura, no fase posterior; ninguna meta es afirmable sin CAC/LTV | RISKS R-19, R-30 |
| Δθ comunicado sin su error asociado ⇒ afirmación no defendible | Se comunica con banda de confianza o no se comunica | RISKS R-24 |

## Seguimiento

Esta decisión se revisa si ocurre cualquiera de estas condiciones:

1. **Doce meses sin el primer contrato institucional pagado** desde el primer piloto iniciado. Sería
   evidencia de que el canal B2B tampoco resuelve la distribución, y obligaría a reconsiderar la
   alternativa de licenciar el motor a quien ya tiene canal.
2. **La calibración (G-2) muestra que el banco no sostiene el modelo** — por ejemplo, ítems sin
   discriminación utilizable. Eso cambiaría el activo defendible y por lo tanto el pitch entero.
3. **CAC medido por encima del LTV** en el canal B2C una vez cerrada F10. Implicaría apagar el
   embudo pagado y reconsiderar el mix 60/30/10.
4. **Se levanta capital** — el uso de fondos de §4 de la tesis pasa a ser compromiso y esta ADR
   debería complementarse con una ADR de gobernanza.

Revisión ordinaria: al cierre de cada temporada PAES (diciembre de cada año).

---

Relacionado: [[../project-memory/TESIS_DE_CRECIMIENTO]] · [[../project-memory/BUSINESS_CONTEXT]] ·
[[../project-memory/DECISIONS]] · [[../project-memory/ROADMAP]] · [[../project-memory/RISKS]] ·
[[ADR-011-vision-libro-como-norte-estrategico]] · [[ADR-024-raiz-en-la-tesis-2010]]

# SESSION-026

## Fecha

2026-08-16 (continuación de [[SESSION-025]], mismo día)

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code CLI (Opus 5), en rol de CTO

## Objetivo de la sesión

Continuación de la sesión del pivote. El owner preguntó por el plan de negocios, la proyección ante
un panel de inversionistas, la competencia y si estaba apuntando bien. **En el curso de esa
conversación planteó que no cree mucho en el producto y que sospecha que el funnel no está bien
planteado.** El objetivo final terminó siendo registrar en la memoria los dos hallazgos que salieron
de ahí.

## Contexto de entrada

- Rama: `main`
- Estado del árbol: los 15 archivos de SESSION-025 sin commitear, más `public/js/app.js` preexistente
- Documentos leídos: `CURRENT_STATUS` (secciones de datos de uso), `LESSONS_LEARNED`, `BACKLOG`,
  `RISKS`, `DECISIONS`, `OPEN_QUESTIONS`

## Actividades realizadas

1. Análisis del plan de negocios, la etapa real de financiamiento (**pre-seed, pre-revenue**; el
   interlocutor correcto hoy es CORFO/Start-Up Chile, no equity), la competencia y la matemática
   unitaria (LTV/CAC, sensibilidad al precio, capacidad de venta, ventana de marzo).
2. **Verificación de un dato material** que un panel preguntaría de inmediato: la naturaleza de los
   252 diagnósticos. Resultado: son **estudiantes reales**, casi todos `@estudiantesunap.cl`, del
   piloto UNAP de oct–nov 2025. **De la landing no llegó prácticamente nadie.**
3. **Corrección de la escalera de ingresos de [[TESIS_DE_CRECIMIENTO]] §3** (escrita en
   SESSION-025): 380 colegios / USD 1M en 2030 es el caso "todo sale bien", no el caso base. Con la
   restricción de una sola ventana de compra al año, el caso base llega a ~USD 340–500k en 2030 y
   USD 1M hacia 2031–2032. *(Pendiente de reflejar en el archivo — ver Pendientes.)*
4. **Corrección del análisis competitivo**, que era el punto más débil de la memoria: "no hay
   competencia directa" es falso. Falta al menos **DIA** (Agencia de Calidad, diagnóstico **gratis**
   para colegios — la objeción letal de G-1), **Aptus**, **Webclass/Lirmi/Napsis**, **Cpech /
   Puntaje Nacional**, adaptativos globales, y la **IA genérica gratuita**. *(Pendiente de
   registrar — ver Pendientes.)*
5. El owner planteó su duda sobre el producto y el funnel. Se separó el componente subjetivo del
   verificable, y **el componente verificable resultó correcto**. De ahí salieron L-36 y L-37.

**Lo que no se hizo, a propósito:** no se tocó código, no se rediseñó el funnel y no se decidió el
mecanismo de entrada sin cuenta. Todo eso está bloqueado detrás de T-90 — mirar una sala real antes
de rediseñar.

## Archivos revisados

- `project-memory/CURRENT_STATUS.md` (naturaleza de los 252 diagnósticos)
- `project-memory/LESSONS_LEARNED.md`, `BACKLOG.md`, `RISKS.md`, `DECISIONS.md`, `OPEN_QUESTIONS.md`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `project-memory/LESSONS_LEARNED.md` | **L-36** (funnel para el canal equivocado) y **L-37** (cohortes automatizadas sin demanda) |
| `project-memory/RISKS.md` | **R-31** — el funnel sirve a un canal que nunca produjo un usuario. Probabilidad *confirmada*, no *alta*: ya ocurrió |
| `project-memory/BUSINESS_CONTEXT.md` | §4.2 nueva con el hallazgo y su lectura estratégica |
| `project-memory/BACKLOG.md` | **T-90** (aplicar en un curso real y observar) y **T-91** (funnel de aula sin cuenta), ambas P0 |
| `project-memory/OPEN_QUESTIONS.md` | **Q-37** — entrar sin cuenta sin romper RLS, con tres opciones no evaluadas |
| `project-memory/DECISIONS.md` | **P-17** pendiente, explícitamente no decidible antes de T-90 |
| `project-memory/CURRENT_STATUS.md` | Nota de 2ª pasada del 2026-08-16 |

## Comandos ejecutados y resultados

```
clj -M:test                 → 83 tests / 454 assertions / 0 failures, 0 errors ✅
npx shadow-cljs release app → Build completed (229 files, 157 compiled, 0 warnings) ✅
                              app.js: 8,6 MB (build de dev residual) → 1,2 MB ✅
npm run build:css           → NO ejecutado, a propósito: no cambió ninguna clase
                              Tailwind, solo cadenas de texto. `git status` confirma
                              public/css/app.css sin tocar
python3 scripts/audit_contraste.py    → los 38 pares cumplen su umbral WCAG ✅
python3 scripts/audit_dark_theme.py   → sin texto oscuro sin mapear ✅
python3 scripts/audit_movil.py        → sin problemas en pantallas del estudiante ✅
graphify update .           → ejecutado tras cada pasada ✅
```

**Verificación específica del copy (D-53):**

```
grep -rn "se originó en 2025" index.html public/index.html src/   → 0 ✅
grep -c "UNEXPO" public/js/app.js                                 → 4 ✅
grep -c "10.000 por hora" public/js/app.js                        → 1 ✅
JSON-LD parseado con json.load en ambos index.html                → válido ✅
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| T-90 (curso real) va antes que T-91 y antes de rediseñar nada | No | BACKLOG T-90/T-91 |
| El mecanismo de entrada sin cuenta no se decide antes de T-90 | No | DECISIONS P-17, OPEN_QUESTIONS Q-37 |
| No se desmantelan los cupos: L-37 es sobre qué construir después, no sobre qué borrar | No | LESSONS_LEARNED L-37 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| El funnel está diseñado para el canal que nunca produjo un usuario | **Alta — confirmada** | RISKS R-31 |

## Bloqueos

- **T-90 depende de conseguir un curso** (humano, externo): un profesor conocido y una hora de
  clase. Solo el owner puede desbloquearlo, y es la dependencia más barata del proyecto.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| ¿Cómo entra un curso completo sin crear cuentas, sin romper RLS? | OPEN_QUESTIONS Q-37 (P-17) |

## Supuestos aplicados

Ninguno nuevo. Al contrario: esta sesión **quitó** un supuesto tácito que nadie había escrito —que
el funnel B2C era correcto y solo faltaba difusión— y lo reemplazó por evidencia (R-31).

## Próximos pasos

1. **T-90** — conseguir un curso, aplicarlo, observar tres cosas. Cero pesos, una hora.
2. **T-80** — hablar con jefes de UTP. T-90 adelanta la mitad.
3. **T-76 / T-78** — calibración e instrumentación, **después** de saber si hay demanda.
4. Reflejar en `TESIS_DE_CRECIMIENTO` la corrección de la escalera y el análisis competitivo real.

**Orden invertido respecto de SESSION-025 a propósito:** ahí T-76 iba primero. Calibrar antes de
saber si alguien paga es construir el foso de un castillo que quizá no se levanta.

## Pendientes

- **`TESIS_DE_CRECIMIENTO` §3 sigue con la escalera optimista** (380 colegios / USD 1M en 2030). El
  caso base corregido (~USD 340–500k en 2030) está solo en esta bitácora. **Falta editarlo.**
- **`TESIS_DE_CRECIMIENTO` y `BUSINESS_CONTEXT` §1 no tienen el análisis competitivo real.** Hoy
  solo mencionan Kahoot/AhaSlides como adyacentes y concluyen que no hay competencia directa. Falta
  incorporar DIA, Aptus, Webclass/Lirmi, Cpech/Puntaje Nacional y la IA genérica — **con sus datos
  verificados antes de citarlos**, por la regla de no inventar. Es lo que más urge de los dos.
- Lo pendiente de SESSION-025 sigue igual (ARCHITECTURE, REQUIREMENTS, TERMINOLOGY).

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [x] `adr/` — ninguna ADR nueva **a propósito**: T-90 es observación, P-17 sigue sin decidir, y D-53 es una decisión de copy que no cambia arquitectura (regla de §2 de [[DECISIONS]])
- [ ] `project-memory/ARCHITECTURE.md` — pendiente hasta que se decida P-17
- [x] `project-memory/ROADMAP.md` — sin cambios: T-90/T-91 caben en F13 tal como está
- [ ] `project-memory/REQUIREMENTS.md` — pendiente
- [x] `project-memory/OPEN_QUESTIONS.md`
- [x] `project-memory/ASSUMPTIONS.md` — sin cambios necesarios
- [x] `project-memory/LESSONS_LEARNED.md`
- [ ] `project-memory/TERMINOLOGY.md` — pendiente
- [x] `project-memory/graph/` (snapshot de Graphify)

---

## Continuación (3ª pasada del mismo día) — la forma del mercado

**Pregunta del owner:** ¿qué distancia hay hasta un producto **sin clases en vivo**, con el
contenido **grabado por el profesor o automatizado en texto**, cuyo ingreso se conduzca por **número
de visitantes**? ¿Es un modelo viable?

**Hallazgo, y no estaba escrito en ninguna parte de la memoria:** el mercado PAES son ~250.000
personas al año que **se renuevan íntegramente cada temporada**. **Churn del 100 % anual, por
construcción** — no es retención mala, es la forma del mercado. Los modelos por volumen viven de
retención compuesta y este mercado la prohíbe.

**Aritmética que lo cierra:**

- **Publicidad:** a RPM ≈ USD 2/1.000 páginas vistas, igualar el techo actual de clases (≈ USD
  16.000/año) exige ~8.000.000 de páginas vistas ⇒ alcanzar a **cada** persona que rinde la PAES
  entre 2 y 6 veces. Imposible al 100 % de penetración nacional. Refuerza la 3ª razón de D-46.
- **Freemium masivo:** CLP 950M exige ~23.750 pagando ⇒ ~475.000 usuarios gratis ≈ **2× el mercado
  nacional**. Una meta modesta (CLP 100M) exige ~20 % de todos los que rinden PAES: durísimo, no
  imposible.
- **Factor 2026:** contenido de texto que *explica* compite con un LLM gratuito y mejor. Automatizar
  la explicación es automatizar **la mitad comoditizada** y dejar la defendible —la medición— como
  funcionalidad en vez de como producto.

**El corolario vale más que la negativa:** cero horas en vivo + contenido automatizado **es
exactamente lo que compra un colegio**. No es una alternativa a G-1, **es G-1 bien entregado** —
G-3 metido dentro de G-1. El mismo contenido rinde ~CLP 2 por página vista, o CLP 2.400.000 por
colegio/año. **Tres órdenes de magnitud, según a quién se le cobra.**

**Distancia medida:** código 2–4 semanas · contenido **4–7×** (58 → ~250–400 recursos, con la
auditoría de ADR-016 como cuello real) · tráfico, un muro. Dato útil que salió de la revisión: la
**capa 0 (`questions.error_a..d`) ya es enseñanza automatizada en texto**, disparada por el error
específico. El mecanismo existe; falta profundidad.

**Registrado en:** [[BUSINESS_CONTEXT]] §1.1 (hecho estructural) · [[TESIS_DE_CRECIMIENTO]] §3.1
(aritmética y distancia) · [[DECISIONS]] **D-52** · [[LESSONS_LEARNED]] **L-38** · nota en
[[ASSUMPTIONS]] A-32 · [[CURRENT_STATUS]].

**Nota de gobernanza:** se advirtió explícitamente al owner que D-46 ya había descartado la
publicidad, para que una eventual reapertura fuera deliberada y no por deriva. D-52 **amplía** D-46:
esta cubre todo modelo por volumen, no solo publicidad.

---

## Continuación (4ª pasada) — Google Auth gratuito, y una corrección a Q-37

**Pregunta del owner:** el Google Auth mencionado en F0, ¿se puede hacer con capa gratuita?

**Respuesta: sí, $0 en las tres capas.** Google Cloud (proyecto, pantalla de consentimiento,
credenciales OAuth 2.0), Supabase Auth con proveedor Google (los proveedores sociales están en el
tier gratuito), e infraestructura (corre en el navegador, GitHub Pages no cambia). Con scopes
básicos (`email`, `profile`, `openid`) **no se exige la evaluación de seguridad de Google**; sí hay
que **publicar la app**, porque en modo "Testing" el tope son 100 usuarios.

**Verificación en código (no se asumió lo que decía la memoria):**

- `sign-in-with-google` existe en `src/universo/supabase.cljs:21` y **ningún llamador** en todo
  `src/`. Código muerto confirmado, como decía [[PROJECT_BRIEF]] §5.
- **Pero la plomería sí está**, y eso la memoria no lo decía: `events/auth.cljs` ya tiene
  `getSession` + `onAuthStateChange` (rehidratación), que es justo lo que necesita el callback.
- **El riesgo que más me preocupaba no existe:** el `profiles` no se crea desde el cliente, lo crea
  el trigger `handle_new_user()` sobre `auth.users` (migración `008`, `security definer`). Un
  usuario que entre por OAuth obtiene su fila automáticamente.

**⚠️ Hallazgo de cumplimiento:** `components/login.cljs:141-157` tiene el checkbox de declaración de
edad (D-21, atado a Ley 21.719 y R-06). **Un botón de Google junto al formulario evitaría ese flujo
y desharía D-21 en silencio**, sobre público mayoritariamente menor de edad. Quedó como guarda
obligatoria dentro de **T-92**: la declaración va antes del botón, o la tarea no está terminada.

**El hallazgo mayor: Q-37 estaba mal planteada.** Se había escrito con un solo criterio (mínima
fricción sin romper RLS). Falta el segundo, y descalifica a una de las opciones:

> **La entrada anónima rompe G-4.** Δθ exige reconocer al mismo estudiante en dos diagnósticos
> separados por un semestre. Una sesión anónima no sobrevive a eso, y Δθ es el producto que se vende
> (D-50). **Optimizar la fricción al máximo destruye el vector que sostiene el ingreso.**

Q-37 se reescribió con una tabla de las **cuatro** opciones evaluadas contra ambos criterios, y se
agregó la cuarta: **cuenta Google del colegio (Workspace for Education)** — la única que reúne
fricción casi nula, identidad estable entre diagnósticos, y **el dominio del correo como llave
natural de multi-tenant** (responde en parte Q-36/P-16). Contrapesos anotados para no elegirla por
entusiasmo: no cierra R-31 por sí sola (sigue habiendo redirect y consentimiento, con 30 teléfonos
y wifi de colegio), el admin de Workspace **puede bloquear apps de terceros** —un paso más en la
venta, para el guion de T-87— y no todos los estudiantes tendrán cuenta del establecimiento.

**Se mantiene P-17 sin decidir, a propósito:** no antes de T-90. Una hora de clase dice si los
estudiantes tienen cuenta del colegio, y esa observación elige la opción. Es exactamente el tipo de
pregunta que no se responde analizando.

**Registrado en:** [[OPEN_QUESTIONS]] Q-37 (reescrita) · [[DECISIONS]] P-17 (segundo criterio) ·
[[BACKLOG]] **T-92** · [[CURRENT_STATUS]].

---

## Continuación (5ª pasada) — hay distribución, y el copy se corrigió y publicó

**Dos hechos del owner, y el primero invalida la premisa de toda la memoria anterior.**

**1. Tres canales disponibles hoy.** Liceo donde es profesor de electrónica (una profesora de
matemática **ya ofreció su 4º medio** — eso es T-90 literalmente), sede de Cpech donde trabaja
(relación con la dirección, software ya mencionado), y UNAP, que podría reactivarse. La memoria
decía *"ningún colegio contactado"* y *"depende de que alguien externo llegue al sitio"*.

Se advirtió lo que el propio historial enseña: **acceso ≠ distribución.** El piloto UNAP también
fue acceso, produjo 252 diagnósticos y **cero clientes**, porque estaba encuadrado como convenio de
desarrollo y no como venta → **L-39**. Y apareció **R-32**, el riesgo peor calibrado del proyecto:
dos de los tres canales son sus **empleadores**, con posible cláusula de cesión de PI. **T-93 (leer
el contrato, P0)** y **Q-38**.

**2. El owner autorizó corregir el copy publicado** (*"no dejemos que la página mienta ni un día
más"*), lo que desbloqueó Q-30 tras semanas. Se le presentaron dos decisiones de redacción —eran
suyas: es su biografía y toca el JSON-LD— y eligió: **nombrar a la UNEXPO sin la ponencia de 2013**,
y **sacar a la UNAP del FAQ de costo** dejándola en `resume.cljs`. → **D-53**.

**Hallazgo de ejecución:** el texto falso estaba en **cinco** lugares, no en los tres que la memoria
repetía desde hacía semanas — faltaban el `noscript` de `index.html` y el **footer de `home.cljs`**.
Corregido en **L-22**, con la regla de re-verificar la lista con `grep` en vez de confiar en el
número escrito. `resume.cljs` menciona a la UNAP pero ahí es experiencia docente real: **no se tocó**.

**Verificación:** `clj -M:test` **83/454/0** · `release app` **0 warnings** · JSON-LD válido en ambos
`index.html` · las tres auditorías en verde · `grep` de la frase vieja = **0** · el copy nuevo viaja
en el bundle.

**L-30 pagó dividendos:** `public/js/app.js` estaba en **8,6 MB** (build de desarrollo dejado por un
`watch`) contra 1,2 MB en HEAD. Se detectó **antes** de commitear; el `release` lo dejó en 1,2 MB.
Sin esa lección se habría publicado un bundle sin minificar.

**Efecto colateral registrado:** el precio de D-32 **quedó publicado por primera vez** (Q-02 dejaba
pendiente dónde mostrarlo). **No** se tocó `isAccessibleForFree` ni se agregó markup de `Offer`.

**Cierra:** Q-30, X-09, **S-18**.

## Notas

- **El hallazgo lo levantó el owner, no el agente.** Vale la pena dejarlo escrito porque contradice
  el patrón de las tres etapas anteriores: la duda sobre el producto, esta vez, apuntó a algo real y
  verificable en vez de derivar en más construcción.
- **El dato de los 252 diagnósticos lleva desde el 2026-08-09 en la memoria** anotado como "hallazgo
  colateral", y su consecuencia —que el único canal que funcionó no tiene funnel— no se había
  extraído en siete días de trabajo sobre esos mismos archivos. Lección meta: un dato registrado no
  es un dato entendido.
- **R-31 entra con probabilidad "confirmada", no "alta"**, porque no es un riesgo futuro: ya ocurrió.
- El análisis de negocio completo de esta conversación (etapa real, LTV/CAC, sensibilidad al precio,
  capacidad de venta, ventana de marzo, competencia) **no quedó escrito en ningún archivo de la
  memoria** — solo en el chat y parcialmente aquí. Es la deuda documental más grande que deja esta
  sesión.

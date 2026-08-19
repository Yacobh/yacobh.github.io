# OPEN_QUESTIONS

Última actualización: **2026-08-18 (noche)** — **Q-40 medida**: el catálogo es 77 de 77 del
experimento de cuántica y el producto tiene cero; el panel ya lo declara, pero la decisión sigue
abierta. · Antes: **2026-08-18** — **Q-40 nueva**: qué hace la pestaña del catálogo con las 77
entradas `mq/` del experimento de cuántica, que hoy `fetch-misconceptions` devuelve junto con las del
producto y que distorsionarían `health` (T-103). **Aviso de mantenimiento del mismo día:** hay **dos
preguntas numeradas Q-39** (tasa de escape y custom domain de Supabase); no se renumeró en silencio
porque romper las referencias existentes es peor que el duplicado — hay que resolverlo a propósito. ·
Antes: **2026-08-17** — **Q-39 nueva**: si se paga el custom domain de Supabase
para que la pantalla de Google muestre la marca en vez de `jmnqklhxcdccvdhuuiji.supabase.co`
(R-33). Depende de un precio sin verificar (A-36) y del dato de conversión de G-5. ·
Antes: **2026-08-16** — pivote de negocio
([[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]], [[TESIS_DE_CRECIMIENTO]]): **Q-07
respondida** (histórico versionado, D-50) y **Q-32…Q-36 nuevas** (precio institucional, suscripción
B2C, tamaño de mercado, fondos, multi-tenant). **Q-30 sube a bloqueante del canal de contenido**
(G-5). **Q-37 corregida el mismo día**: se evalúa contra dos criterios, no uno — la entrada anónima
rompe G-4 — y se agrega una cuarta opción (cuenta Google del colegio). **Cierre del día: ✅ Q-30
respondida y X-09 cerrada** (D-53, copy corregido y publicado en los 5 lugares); **Q-38 nueva**
(propiedad intelectual con los empleadores, bloqueante del canal Cpech). ·
Antes: 2026-08-13 (Q-28 evaluada: la publicidad **no** califica como ingreso;
Q-29 y Q-30 nuevas y **X-09 nueva**: la raíz del proyecto es la tesis de 2010, no el convenio UNAP —
ver [[RAIZ_SISTEMA_LLOVIZNA]] y [[../adr/ADR-024-raiz-en-la-tesis-2010]])

> **Regla fundamental de PMF: si falta información, no se asume — se registra aquí.**
> Ninguna pregunta se borra: cuando se responde, se marca ✅ con la fecha y la respuesta, y si
> genera una decisión se crea el ADR correspondiente.

Estado: 🔴 abierta y bloqueante · 🟠 abierta e importante · 🟡 abierta menor · ✅ respondida

---

## Producto y negocio

### ✅ Q-01 · ¿Cuál es el vínculo formal con la UNAP?
**Respondida 2026-07-28 (owner):** hubo un convenio a honorarios entre el owner y la Universidad
Arturo Prat (oct–nov 2025, ya terminado), de alcance acotado: diseño de una plataforma de tutorías
para la comunidad universitaria, como Proyecto de Desarrollo Institucional. No es un convenio de
marca ni una alianza institucional vigente; el convenio terminó sin que la plataforma quedara
finalizada, aunque fue dado por aprobado. No hay autorización de uso de marca ni vínculo activo hoy.
**Decisión:** ver D-18 en [[DECISIONS]] — se bajó la mención de UNAP de "iniciativa" (badge del
hero, stat del hero, CTA banner) a nota histórica en el FAQ y el footer ("proyecto personal...
que se originó en 2025 a partir de un convenio de desarrollo con la Universidad Arturo Prat").
El detalle del convenio (folio, montos, datos personales) no se documenta aquí por ser un
repositorio público — queda solo con el owner.
**Impacto:** el copy publicado ya no afirma un vínculo institucional vigente; revisar R-06 si
cambian las obligaciones de privacidad derivadas de esta afirmación.

### ✅ Q-02 · ¿Las clases de los cupos tienen costo? — Número fijado 2026-07-30
**Respondida (política) 2026-07-28 (owner):** sí, las clases tendrán costo, **salvo la primera
clase** después de rendir el diagnóstico, que es gratuita. El precio de las clases pagadas debe
quedar **significativamente por debajo** de alternativas comparables (preuniversitario tradicional
o clases particulares).
**Referencia de mercado (2026-07-28, búsqueda web, no vinculante):** preuniversitario presencial
tradicional en Chile ≈ $80.000–$120.000 CLP/mes; clases particulares de matemática por hora ≈
$8.000–$20.000 CLP (online más barato, $8.000–$12.000; presencial hasta $30.000 en algunas
ciudades); planes online tipo preu desde ≈ $19.900 CLP/mes. Grupos pequeños presenciales (p. ej.
Preuniversitario Tesla, máx. 12 alumnos) se mueven dentro del rango de preu tradicional, no del de
clase particular 1:1. Fuentes: [2x3.cl](https://www.2x3.cl/p/precios-clases-particulares-matematicas),
[Cronoshare](https://www.cronoshare.cl/cuanto-cuesta/clases-particulares-matematicas),
[Tutorali](https://tutorali.cl/que-valor-tiene-un-preuniversitario-en-chile/),
[Superprof](https://www.superprof.cl/blog/precio-clases-particulares-matematicas/).
**Número fijado 2026-07-30 (owner):** **$6.000 CLP por hora de clase**, después de la primera
videollamada gratuita. Se cobra **por hora**, no por paquete mensual. Queda por debajo de todo el
rango de referencia de mercado relevado arriba (mínimo observado ≈ $8.000/hora).
**Falta para implementar:** el precio no está en ningún lado del copy/UI/JSON-LD todavía — falta
decidir dónde mostrarlo (landing, cupos, plan) y cómo se cobra en la práctica (no hay pasarela de
pago; ver [[BACKLOG]] T-04 y el nuevo punto de cobro manual/transferencia a definir).
**Nota 2026-07-27:** [[VISION_LIBRO_PROYECTO]] §4.4 ya proponía pago por clase o paquete; esta
respuesta del owner confirma esa dirección general (con la primera clase gratis como matiz nuevo).
**Precio revisado 2026-08-02 (D-32):** el número de $6.000 se había anclado contra el piso de
clases particulares 1:1 (~$8.000/hora) relevado arriba; el comparable correcto para un formato
**grupal** es el preuniversitario tradicional (~$80.000–$120.000 CLP/mes ≈ $7.000–$15.000/hora
equivalente), contra el cual $6.000 quedaba barato. Nuevo precio: **$10.000 CLP por hora**, misma
estructura (por hora, primera videollamada gratis). Ver [[DECISIONS]] D-32.

### ✅ Q-03 · ¿Hay requisito de consentimiento o aviso de privacidad?
Público mayoritariamente menor de edad + recolección de datos personales (email, IP, geo,
dispositivo, respuestas). Ya no hay respaldo universitario vigente que mostrar (ver Q-01).
**Bloquea moralmente:** apertura a estudiantes reales (F8). **Relacionado:** R-06, T-10, Q-08.
**Nota 2026-07-28:** la **Ley 21.719** (nueva ley chilena de protección de datos) entra en plena
vigencia el **1 de diciembre de 2026** — ~4 meses desde hoy — con reglas escalonadas por edad
(consentimiento parental obligatorio <14 años; solo para datos sensibles entre 14–15; reglas
generales ≥16). El signup actual no pide edad, así que no hay forma de distinguir a un usuario
<14. Se dejó un primer borrador de Aviso de Privacidad + checklist de decisiones pendientes en
[[AVISO_PRIVACIDAD_BORRADOR]] (no publicado, no revisado legalmente). **Respondida 2026-07-28 (owner):** (1) canal de solicitudes = flujo en la app: el usuario pide la
eliminación desde una sección propia "Configuración de cuenta", un admin la ve como alerta en
Admin → Usuarios (no un email dedicado); (2) retención = 12 meses de inactividad, luego se borran
los datos identificables y se conservan solo estadísticas ya anonimizadas — política publicada,
pero el job automático que la ejecuta **no existe todavía** (ticket [[BACKLOG]] T-34); (3) edad =
declaración propia al registrarse ("tengo 14 años o más, o cuento con autorización de mi
representante"), sin campo de fecha de nacimiento ni bloqueo duro — cualquier caso especial se
deriva al formulario de contacto; (4) revisión legal = el owner mismo por ahora, se contratará
abogado cuando el negocio crezca — **riesgo aceptado explícitamente**, no un olvido.
**Implementado 2026-07-28:** Aviso de Privacidad publicado (`universo.components.privacidad`,
enlazado desde el footer), checkbox obligatorio + declaración de edad en el registro
(`login.cljs`), y sección **Configuración de cuenta** (`:cuenta`, `components/cuenta.cljs`,
protegida por sesión, enlazada desde la navegación — no una tarjeta dentro del tablero) con dos
cosas: editar `full_name`/`phone` en `profiles` (migración `010`) y solicitar la eliminación de
cuenta (→ notificación → alerta en Admin/Usuarios, migración `009`). Ver [[BACKLOG]] T-10 (qué
falta para cerrarlo del todo) y T-34 (automatizar la retención).

### ✅ Q-09 · ¿Qué `capacity` y `min_enrollments` corresponden a un cupo real? — Respondida 2026-07-30
**Respondida (owner):** para cupos **virtuales**, `min_enrollments = 3`, `capacity = 12`. Días:
sábado o domingo. El owner define y agenda las fechas concretas él mismo — no hay problema
logístico en hacerlas 100% virtuales (a diferencia de lo que sugería `class_slots.modality =
'presencial'` como opción separada; no se descarta presencial a futuro, pero los primeros cupos
reales serán virtuales).
**Videollamada:** el owner generará el enlace y lo pegará en `location_or_link` al crear el cupo
desde el panel de administración (no requiere código nuevo, el campo ya es texto libre).
**Plataforma default resuelta en Q-24: Jitsi** (no Google Meet) — ya no es una decisión pendiente.
**Bloquea:** T-04 → **desbloqueada** para crear los primeros cupos reales.

### 🟡 Q-10 · ¿Qué define un "módulo prioritario" más allá de la lista de `supabase/CONTENT.md`?
La lista actual (`aritmetica/enteros`, `fracciones`, `potencias`, `algebra/ecuaciones`,
`expresiones`, `geometria/basica`, `pitagoras`) dice estar basada en "déficits reales de tus tests",
pero no hay consulta ni dato que lo respalde en el repo.
**Relacionado:** T-01, T-21.

### ✅ Q-16 · ¿Qué pasa con un cupo que no alcanza el mínimo? — Respondida del todo 2026-07-30
**Respondida (owner):** el cupo se puede cancelar con **un día de anticipación** a la fecha de la
clase si no alcanzó `min_enrollments`. **Quién dispara la cancelación (P-13, respondida):**
**manual** — el admin cancela a mano desde el panel cuando corresponda, no un proceso automático.
Esto simplifica el trabajo: no hace falta ningún mecanismo temporal nuevo (cron/Edge Function),
solo usar el botón de cancelar cupo que **ya existe** en `components/admin.cljs`
(`:admin/set-slot-status` → `"cancelled"`).
**Lo que sí falta:** cuando el admin cancela un cupo así, hoy **no se avisa a nadie** — el único
trigger de `notifications` es para "cupo confirmado" (`confirm_slot_if_threshold` en `001`), no
existe el equivalente para cancelación. Ver [[BACKLOG]] T-25 (alcance reducido a esto).
**Relacionado:** R-11, [[DECISIONS]] D-28, D-31.

### ✅ Q-21 · ¿El owner confirma la visión de negocio del "Libro del Proyecto"? — Respondida 2026-07-30
**Respondida (owner):** sí, confirmada como la dirección de largo plazo — **"esa es la
dirección"**. El owner es explícito: **"el MVP es solo una versión menor que busca llegar a ese
objetivo"**, y pide que la visión **"se debe nutrir aún más"** (no es un techo, es un punto de
partida a expandir). Ver ADR-011.
**Consecuencia:** [[VISION_LIBRO_PROYECTO]] deja de ser un borrador en tensión con el alcance del
MVP y pasa a ser el **norte declarado**; el MVP actual (una materia, gratuito en diagnóstico/plan,
alcance Iquique/UNAP) es una fase intermedia explícita, no el destino. Esto no cambia nada del
código hoy, pero sí cómo se deben leer [[PROJECT_BRIEF]]/[[BUSINESS_CONTEXT]] (alcance **actual**,
no alcance **final**) y abre la pregunta de si conviene una épica de negocio nueva en [[BACKLOG]]
para roadmapear el camino hacia esa visión — **todavía sin decidir el cómo**, solo el hacia dónde.
**Relacionado:** Q-22, Q-23 (siguen abiertas — nombre de marca y taxonomía de bandas del libro vs.
el código no se resolvieron con esta confirmación, son decisiones de implementación separadas).

### ✅ Q-28 · ¿La publicidad califica como fuente de ingresos para este sitio? — Evaluada 2026-08-13
**Pregunta del owner (2026-08-13):** una página web puede ganar dinero con publicidad; ¿es coherente
con este sitio?
**Respuesta (evaluación del agente sobre la memoria del proyecto, **no** decisión del owner):
**no, hoy no califica.** Cuatro razones, ninguna de opinión:

1. **Contradice una promesa ya publicada.** `src/universo/components/privacidad.cljs:54` dice
   textualmente *"No vendemos tus datos a terceros ni los usamos con fines publicitarios"*. Toda red
   publicitaria inyecta scripts de terceros que perfilan al visitante. Ponerla obliga a retractar ese
   texto, que además está triplicado ([[RISKS]] R-05).
2. **Público mayoritariamente menor de edad, con plazo legal encima.** [[RISKS]] R-06 está en
   severidad **Alta y activa**; la **Ley 21.719** entra en plena vigencia el **1/12/2026** con
   consentimiento escalonado por edad, y el registro solo pide una declaración propia sin fecha de
   nacimiento (Q-03). Las propias redes publicitarias prohíben anuncios personalizados a menores de
   18. Sería subir el riesgo más crítico del proyecto justo dentro de la ventana de captación.
3. **La aritmética no da.** El producto es un embudo de **una sesión de ~20 min por persona**, con
   pocas páginas vistas por usuario y **sin analítica conectada** (M-01…M-09 sin instrumentar,
   [[BACKLOG]] T-20). Con RPM típicos de Chile (orden de US$0,5–3 por mil impresiones) harían falta
   decenas de miles de vistas para igualar **una hora de clase a $10.000 CLP** (D-32). Además los
   costos de infraestructura ya son **$0** (B-05, S-09): no hay déficit que cubrir, y el costo real
   dominante —el tiempo del profesor, [[RISKS]] R-01— la publicidad no lo paga a esta escala.
4. **Erosiona el único activo de credibilidad que queda.** Tras D-18 el proyecto ya no se apoya en
   respaldo institucional vigente y su credibilidad descansa en el método (B-07). Banners dentro de
   un diagnóstico psicométrico para menores destruyen eso, y contradicen el lenguaje visual adoptado
   en [[../adr/ADR-022-lenguaje-braun-rams]] / [[../adr/ADR-023-panel-de-instrumento]].

**Lo que sí es coherente:** (a) el ingreso ya decidido y **no implementado** — clases a $10.000
CLP/hora, falta pasarela, [[BACKLOG]] T-04; (b) **B2B a colegios / licencia institucional**
([[VISION_LIBRO_PROYECTO]] §4.3–4.4); (c) **patrocinio o auspicio nombrado** — mención estática de un
aliado, sin scripts de terceros ni tracking: no rompe la promesa de privacidad porque no hay
perfilamiento, y es distinto de publicidad programática. Nótese que la inversión que sí mueve la
aguja va en dirección contraria: **gastar** en publicidad para captar estudiantes antes de la
temporada PAES ([[BUSINESS_CONTEXT]] §7, estacionalidad), no vender espacio.
**Advertencia de capacidad:** integrar y mantener publicidad competiría por el mismo tiempo del único
desarrollador (R-01) que necesitan T-04 y la captación — exactamente la vía de fuga de [[RISKS]] R-19.
**Consecuencia:** [[DECISIONS]] D-46. Si el owner quiere revertir esto, la vía menos costosa es (c),
no una red publicitaria.

### ✅ Q-29 · ¿De dónde sale el nombre "Sistema Llovizna"? — Respondida 2026-08-13
**Planteada y respondida el mismo día.** Se registró como pregunta porque el nombre **no aparece en
ninguna parte de `docs/tesis.md`**; el owner aportó entonces `docs/sistema_llovizna.md`, que lo
resuelve.
**Respuesta:** el nombre es de **2012**, no de la tesis. Es el título de una **propuesta de
financiamiento presentada al Estado venezolano** — *"Sistema Llovizna: Diseño, fabricación y puesta
en marcha de un sistema de TIC para mejorar el rendimiento académico dentro de las aulas de clases"*
(Ciudad Guayana, estado Bolívar, 2012). El propio documento declara su linaje en §8: *"La propuesta
se inició como propuesta de tesis para la Universidad Nacional Experimental Politécnica Antonio José
de Sucre"*. **La postulación no prosperó** (testimonio del owner; el presupuesto del formulario quedó
en blanco). Es, además, un nombre clave usado en esa gestión de financiamiento.
**Consecuencia:** el archivo de memoria se renombró a **`RAIZ_SISTEMA_LLOVIZNA.md`** — la raíz no es
un documento sino una línea de trabajo con dos actos documentados (2010 y 2012). Ver
[[RAIZ_SISTEMA_LLOVIZNA]] §2 y [[../adr/ADR-024-raiz-en-la-tesis-2010]].
**Lo que sigue sin documentar (no se asume):** el período **2012–2025**, ~13 años sin registro en
este repositorio. **Relacionado:** Q-23 (el proyecto ya arrastra cuatro nombres: "Academia Integral",
"Academia Online de Matemáticas", `universo` y "Sistema Llovizna"), Q-30, [[RISKS]] R-26.

### ✅ Q-30 · ¿Cómo se cuenta públicamente el origen del proyecto? — **RESPONDIDA 2026-08-16 (D-53), copy publicado**

> **🔺 2026-08-16 — esta pregunta pasó de incómoda a bloqueante de negocio (D-51 / G-5).** La marca
> personal del fundador es uno de los cuatro componentes de la máquina de distribución, y funciona
> precisamente porque la historia de 16 años es **verificable** (tesis UNEXPO 2010 + ponencia en el
> II Congreso Venezolano de Ciencia, Tecnología e Innovación 2013). **No se puede construir un canal
> de contenido sobre un copy que la propia memoria declara falso**. Es también lo primero
> que verifica una due diligence. **Criterio de éxito S-18.**
>
> ### ✅ Respuesta del owner, 2026-08-16: *"no dejemos que la página mienta ni un día más"*
>
> **Decidido y ya publicado (D-53). Dos definiciones:**
>
> 1. **Se nombra a la UNEXPO, sin el congreso de 2013.** Razón del owner al elegir: decir dónde
>    estudió es **biografía factual y verificable**, no un aval institucional — es justo la
>    distinción que faltó con la UNAP, que se leía como respaldo vigente (Q-01, D-18). No requiere
>    autorización de marca. **La ponencia de 2013 queda fuera del copy de la landing**: es una
>    credencial de hace trece años con encuadre político venezolano impreso, y su lugar natural es
>    la página del profesor, no un FAQ sobre precios.
> 2. **La UNAP sale del FAQ de costo.** Una pregunta sobre precio no es el lugar de la historia
>    institucional. **No es borrarla:** sigue en `resume.cljs` como experiencia docente, con su
>    código de proyecto, que es donde corresponde.
>
> **Texto publicado — origen** (footer de `home.cljs` y noscript de `index.html`):
> *"Un proyecto del profesor Jacobo Córdova. Nace de su trabajo de grado en Ingeniería Electrónica
> (UNEXPO, Venezuela, 2010) sobre sistemas de respuesta en el aula, y se desarrolla desde 2025 en
> Iquique."*
>
> **Texto publicado — costo** (JSON-LD ×2 y `landing.cljs`):
> *"El diagnóstico, tu perfil y el plan de estudio no tienen costo. Es un proyecto personal del
> profesor Jacobo Córdova. Las clases de los grupos tienen un valor de $10.000 por hora; la primera
> videollamada después del diagnóstico es gratuita."*
>
> **Efecto colateral: responde en parte Q-02.** El precio de D-32 **nunca había estado publicado**;
> Q-02 dejaba pendiente "dónde mostrarlo". Ahora está en el FAQ de costo. **No se tocó
> `isAccessibleForFree`** (sigue acotado a diagnóstico/perfil/plan, D-01) **ni se agregó markup de
> `Offer`** — eso sería una decisión aparte.
>
> **Cierra:** X-09, y **S-18** de [[PROJECT_BRIEF]] §8. **Desbloquea:** la marca personal como canal
> de contenido (G-5), y sentarse de nuevo con la UNAP sin que el sitio cuente una historia falsa
> sobre ellos.

**Planteada 2026-08-13.** El copy publicado en los tres lugares (`index.html`, `public/index.html`,
`landing.cljs`) dice: *"Es un proyecto personal del profesor Jacobo Córdova, que se originó en 2025 a
partir de un convenio de desarrollo con la Universidad Arturo Prat."* Con
[[../adr/ADR-024-raiz-en-la-tesis-2010]] eso queda **incorrecto**, y ya lo era según el propio
repositorio: **el primer commit es del 2025-05-03**, cinco meses antes del convenio (oct–nov 2025).
**Por qué está sin decidir:** es texto de cara al público, afecta el JSON-LD y toca los tres lugares
(R-05) + recompilación (ADR-003). Qué contar del origen es decisión del owner, no del agente.
**Redacción propuesta (a validar):** *"Proyecto personal del profesor Jacobo Córdova. Nace de su
trabajo de grado en Ingeniería Electrónica (UNEXPO, 2010) sobre sistemas de respuesta en el aula, y
en 2025 tuvo una etapa de desarrollo a honorarios con la Universidad Arturo Prat, ya terminada."*
**Decisiones que dependen de esto:** si se menciona la UNEXPO como institución (¿hay que pedir
autorización de marca, como enseñó Q-01?), si se nombra "Sistema Llovizna" (Q-29, ya respondida: es
el nombre de una propuesta de financiamiento de 2012), y si el origen entra en el FAQ o solo en la
página del profesor (`:jacobocordova`).
**Dato nuevo del 2026-08-13 que hay que sopesar antes de responder:** la propuesta de 2012 está
redactada dentro del marco político que exigía el formulario estatal venezolano de la época
(*"Testamento político del comandante Hugo Chávez"*, *"Construcción del Socialismo Bolivariano del
siglo XXI […] como alternativa al modelo salvaje del capitalismo"*). No dice nada del producto de
hoy, pero **es parte del documento fuente**, y el repositorio es público (D-42). Contar el origen
"desde 2010" no obliga a exhibir 2012, ni exhibir 2012 obliga a citar su encuadre — pero conviene
que la decisión sea consciente y no un descuido. Ver [[RAIZ_SISTEMA_LLOVIZNA]] §2.
**Credencial disponible (2026-08-13):** el owner fue **ponente oral en el II Congreso Venezolano de
Ciencia, Tecnología e Innovación** (Caracas, 7–10 nov. 2013) con *"Sistema Llovizna, propuesta para
la instalación de un computador grupal para las aulas de clases"*, certificado por el Ministerio del
Poder Popular para Ciencia, Tecnología e Innovación. Es la validación externa más fuerte del proyecto
y **no depende de ninguna institución vigente** — pero el certificado lleva impresos "Gobierno
Bolivariano" y "Constructores del Socialismo", y es de hace trece años. Decidir si se cita, y cómo
(por ejemplo: *"ponencia en el II Congreso Venezolano de Ciencia, Tecnología e Innovación, 2013"*,
sin reproducir el certificado). Ver [[RAIZ_SISTEMA_LLOVIZNA]] §2.1.
**Antes de publicar cualquier cosa:** resolver [[RISKS]] **R-26** (cédula, teléfono y fecha de
nacimiento del owner en los documentos fuente; el certificado la lleva también, por eso no se
versiona).
**Resuelta:** X-09 dejó de ser contradicción activa el 2026-08-16.
**Relacionado:** Q-01, Q-29, [[RAIZ_SISTEMA_LLOVIZNA]], [[RISKS]] R-05.

### ✅ Q-31 · ¿Qué objeciones recibió la propuesta cuando se expuso al público? — Respondida 2026-08-13
**Contexto:** en 2011 el owner difundió el Sistema Llovizna en un video público y recibió críticas.
Se revisaron para ver si contenían señal aprovechable para el producto de hoy.

**Respuesta: sí, dos objeciones sustantivas.** El resto no era información de producto y **no se
documenta** — no aporta a ninguna decisión y este repositorio es público.

1. **"¿Para qué medir, si el estudiante puede decir qué no entiende?"** — planteada por varias
   personas. **Es la objeción de fondo a la propuesta**, entonces con botones y hoy con un
   diagnóstico. La respuesta está en la tesis de 2010 (el déficit no es consciente; la presión social
   suprime la pregunta, vía Fies 2005; nombrar dudas no las prioriza) y **ya está publicada en el
   FAQ** — [[BACKLOG]] T-75, implementada el 2026-08-13.
2. **El costo de intervenir el mobiliario de todas las aulas.** Era correcta: esa versión no podía
   escalar. El producto actual no tiene hardware y corre en el navegador del estudiante, así que la
   objeción está resuelta por diseño.

**Dato que sí cambia el plan:** aquel alcance **no fue audiencia calificada** — llegó por difusión
ajena al proyecto, no por interés en la propuesta. La premisa de [[RISKS]] **R-19** se mantiene
intacta: el proyecto **nunca** ha tenido alcance real ante estudiantes.
**Consecuencia para Q-30:** no apareció rechazo al encuadre político. Esa evidencia **no** respalda
el temor de que contar el origen levante ese tipo de objeción.
**Relacionado:** [[BACKLOG]] T-75, [[RISKS]] R-19, Q-30.

### 🔴 Q-32 · ¿Cuál es el precio y la unidad de la licencia institucional? — **abierta 2026-08-16**

[[TESIS_DE_CRECIMIENTO]] §3 usa **CLP 6.000 por alumno de enseñanza media/año** con un **piso de
CLP 1.500.000 por establecimiento**. **Ninguno de los dos números fue testeado con un comprador
real** — son la hipótesis con la que se construyó la aritmética del millón, no un precio validado.

Sub-preguntas que hay que responder juntas:

- ¿La unidad es por alumno, por establecimiento con piso, o por nivel (solo 3º y 4º medio)?
- ¿Cabe dentro de SEP/PIE, o compite con presupuesto discrecional del sostenedor? (afecta el
  decisor y el ciclo)
- ¿Cómo se compara contra lo que un colegio ya paga por herramientas de diagnóstico o por un
  preuniversitario institucional?

**Bloquea:** F13, la escalera de ingresos y cualquier postulación a fondos que cite ingresos
proyectados. **Decisión pendiente:** P-14. **Cómo se responde:** hablando con 5–10 jefes de UTP,
no con más análisis. Tarea T-80.

### 🟠 Q-33 · ¿El B2C cobra suscripción, o queda 100 % gratuito como puro embudo? — **abierta 2026-08-16**

D-47 fijó el mix objetivo en ~30 % B2C, con una suscripción de temporada de CLP 9.900/mes
(marzo–noviembre) como supuesto. Pero D-01 mantiene gratis el diagnóstico, el perfil y el plan —
que es casi todo lo que el producto entrega hoy. **Falta definir qué queda del otro lado del muro
de pago**, si es que hay muro.

Opciones no evaluadas todavía: histórico de Δθ y re-diagnósticos ilimitados como parte paga;
clases grabadas (G-3) como parte paga; o B2C 100 % gratuito, financiado enteramente por B2B, con la
suscripción descartada. **La última opción es más limpia y no está descartada.**

**Bloquea:** el mix de [[TESIS_DE_CRECIMIENTO]] §3. **Decisión pendiente:** P-15.

### 🟠 Q-34 · ¿Qué fondos y programas están vigentes, con qué montos y ventanas? — **abierta 2026-08-16**

[[TESIS_DE_CRECIMIENTO]] §4 nombra CORFO Semilla Inicia / Semilla Expande, Start-Up Chile,
SSAF-Desafío y fondos de innovación educativa. **Los montos y las ventanas de postulación no están
verificados** y no deben citarse hasta estarlo.

**Contexto que pesa:** el proyecto ya postuló a financiamiento estatal **dos veces sin éxito**
(2012–13 Venezuela, 2025 UNAP). Antes de postular una tercera, conviene saber qué pide cada
programa y si el proyecto califica — en particular si el requisito de constitución de sociedad, hoy
inexistente, es bloqueante.

**Bloquea:** F16.

### 🟡 Q-35 · ¿Un colegio exige asistencia, notas o certificación como requisito de compra? — **abierta 2026-08-16**

[[PROJECT_BRIEF]] §6 excluye asistencia, notas y certificación, y el producto insiste (con razón)
en que el diagnóstico *"no es una nota ni queda en ningún registro académico"* — es parte de por
qué el estudiante responde con honestidad.

**La tensión que aparece con G-1:** un colegio podría querer exactamente lo contrario. Si la
exclusión se levanta, hay que cuidar que no contamine el instrumento: un diagnóstico que "cuenta
para la nota" deja de medir lo que dice medir.

**Se responde en el primer piloto**, no antes.

### 🟠 Q-36 · ¿Cómo se modela el aislamiento multi-tenant por establecimiento? — **abierta 2026-08-16**

El esquema actual está pensado para estudiantes individuales. G-1 exige que el profesor del colegio
A vea a sus cursos y **solo** a sus cursos, y que eso lo garantice **RLS**, no la UI
([[../CLAUDE]] §7). Opciones no evaluadas: columna `establecimiento_id` en `profiles`, tabla
`establecimientos` + `cursos` con pertenencia, o claim en el JWT.

**Restricción dura:** ADR-002 sigue vigente — se resuelve con policies, **no** creando un backend
propio. **Decisión pendiente:** P-16. **Bloquea:** F13 y, por R-28, el primer contrato.

### 🔴 Q-37 · ¿Cómo entra un curso completo sin crear cuentas, sin romper RLS? — **abierta 2026-08-16**

El rediseño del funnel de aula (T-91, [[RISKS]] R-31) exige que ~30 estudiantes entren desde su
teléfono con un código de curso, **sin correo ni contraseña** — la creación de cuenta es la fuga
mayor del funnel actual y en una sala de clases es innecesaria.

**La tensión:** [[../CLAUDE]] §7 establece que **RLS es el único límite de autorización** y que
nunca se confía en checks de UI. Un usuario sin cuenta no tiene `auth.uid()`, que es sobre lo que
están escritas todas las policies actuales.

> ### ⚠️ Segundo criterio, detectado el 2026-08-16: **la entrada anónima rompe G-4**
>
> La pregunta se escribió como si el único criterio fuera *"menos fricción sin romper RLS"*. **No lo
> es.** Hay un segundo criterio que descalifica a una de las opciones:
>
> **Δθ exige identificar al mismo estudiante en dos diagnósticos separados por un semestre**
> (marzo → octubre). Una sesión anónima no sobrevive a eso: el estudiante vuelve y el sistema no
> sabe quién es. Y Δθ **es el producto que se vende** y el argumento de renovación de la licencia
> (D-50, G-4, [[TESIS_DE_CRECIMIENTO]] §2).
>
> Es decir: **optimizar la fricción de entrada al máximo destruye el vector que sostiene el
> ingreso.** Las opciones hay que evaluarlas contra **los dos** criterios, no contra uno.

**Las cuatro opciones, evaluadas contra ambos criterios:**

| Opción | Fricción | Identidad estable (G-4) | Notas |
|---|---|---|---|
| **Sesión anónima** (`signInAnonymously`) | Mínima | ❌ **Se pierde** | Da un `auth.uid()` real y desechable, así que las policies siguen casi igual. Pero sin vínculo a un correo, en octubre no hay a quién comparar. Solo viable si se ofrece "vincula tu correo para ver tu progreso" — que reintroduce la fricción justo cuando ya no molesta |
| **Token de curso** en la policy, sin usuario | Mínima | ❌ Se pierde | Obliga a reescribir policies y a resolver qué impide que alguien con el código lea las respuestas de otro |
| **Roster precargado** por el colegio | Baja | ✅ Sí | Lo más limpio en autorización, **pero mueve datos de menores con el colegio como cargador** — [[RISKS]] R-28, Ley 21.719 |
| **🆕 Cuenta Google del colegio** (Workspace for Education) | **Casi nula** | ✅ **Sí, y es la misma en marzo y en octubre** | Ver abajo |

### La cuarta opción: Google Workspace del establecimiento (agregada 2026-08-16)

La mayoría de los establecimientos chilenos usa **Google Workspace for Education**: el estudiante
**ya tiene cuenta y ya está con sesión iniciada en su teléfono**. Un toque, sin escribir nada.

Tres ventajas que ninguna otra opción reúne a la vez:

1. **Fricción casi nula** sin sacrificar identidad.
2. **Identidad estable** entre diagnósticos → G-4 funciona.
3. **El dominio del correo identifica al colegio** (`nombre@colegiox.cl` → establecimiento). Es una
   llave natural de multi-tenant y **responde en parte a Q-36 / P-16**.

**Estado técnico (verificado en código el 2026-08-16):** `sign-in-with-google` ya existe en
`src/universo/supabase.cljs:21` y **nadie la llama** (código muerto). La plomería sí está:
`events/auth.cljs` tiene `getSession` + `onAuthStateChange`, y el `profiles` lo crea el trigger
`handle_new_user()` sobre `auth.users` (migración `008`, `security definer`) — así que **un usuario
que entre por Google obtiene su fila automáticamente**. Costo: **$0** en las tres capas (Google
Cloud, Supabase Auth, infra). Tarea: **T-92**.

**Contrapesos honestos, para no elegirla por entusiasmo:**

- **No es fricción cero.** Sigue habiendo redirect, selector de cuenta y consentimiento. Con 30
  teléfonos y wifi de colegio hay modos de falla reales. **No cierra R-31 por sí sola.**
- **El admin de Workspace del colegio puede bloquear apps de terceros.** Probablemente haya que
  pedirle a TI del establecimiento que autorice la app: es **un paso más en la venta**, no un
  detalle técnico. Anotarlo en el guion de T-87.
- **No todos los estudiantes tendrán cuenta del colegio.** Hace falta un camino alternativo.

**Restricción dura (sin cambios):** se resuelve con policies, **no** creando un backend
([[../adr/ADR-002-supabase-como-unico-backend]] sigue vigente).

---

### 🔴 Q-38 · ¿Cuál es el grafo de prerrequisitos entre los 20 módulos? — **abierta 2026-08-18**

La migración `045` crea `module_prerequisites` **vacía a propósito**. La estructura está; el
contenido no, y **no puede deducirse del código ni inventarse desde fuera**: es una decisión
pedagógica del profesor.

**Por qué bloquea de verdad y no es un detalle de contenido:** es lo que le da destino al escape
`:resolucion` de [[../adr/ADR-029-escape-como-tercera-categoria-de-respuesta]]. Sin el grafo, un
«no sé cómo resolverlo» se registra pero no lleva a ninguna parte — el estudiante recibe una
explicación, no un remedio. Y es **el mismo dato** que dibuja el mapa de prerrequisitos.

**Lo que hay que decidir, concretamente:**

1. Para cada uno de los 20 módulos (`universo.topics/module-slugs`), qué módulos lo preceden.
2. Cuáles de esas aristas son **`duro`** (sin esto no se puede avanzar, y es a donde manda un
   escape) y cuáles **`blando`** (ayuda pero no bloquea). Sin la distinción, un grafo completo se
   vuelve una maraña donde todo depende de todo y no sirve para decidir nada.
3. El `rationale` de cada arista, aunque sea una línea. Es la lección de `027`: sin el criterio
   escrito, en tres meses nadie recuerda por qué está esa dependencia.

**Cómo NO responderla:** sembrando un orden plausible desde el `order_index` de `modules` o desde el
orden de Baldor. Se parecería a la respuesta correcta y no lo sería, y el error quedaría invisible —
exactamente el modo de fallo de T-51 con los topics.

**Sugerencia de alcance:** no hace falta el grafo completo para empezar a servir. Con las aristas
duras de los módulos donde más se escape en T-90 ya se puede probar el camino entero.

---

### 🟡 Q-40 · ¿La pestaña del catálogo muestra o filtra las 77 entradas `mq/` de cuántica? — **abierta 2026-08-18**

`fetch-misconceptions` (2026-08-18) devuelve el catálogo **completo**, y ahí adentro conviven dos
cosas que no son la misma: las misconceptions del producto y las **77 del experimento personal de
cuántica** (T-61, todas con prefijo `mq/`). Hoy las del producto son **cero**, así que la lista que
vería un admin es 100 % experimento.

**Por qué no es cosmético:** `misconceptions/health` calcula su veredicto sobre la lista que se le
pasa. Con las 77 dentro, el catálogo del producto se reportaría como `:disperso` por culpa de un
experimento que no es contenido del producto — el instrumento mentiría justo en la señal para la que
existe.

Opciones: (a) filtrar `mq/` en la consulta; (b) filtrar en la vista con un selector de «espacio de
nombres»; (c) no filtrar y calcular `health` solo sobre lo que no es `mq/`. **No se decidió** porque
depende de si el track de cuántica sigue vivo, que es del owner. Bloquea la parte de `health` de
**T-103**, no el CRUD.

> **Medido el 2026-08-18 (noche), con la pestaña ya construida:** el catálogo tiene **77 entradas y
> las 77 son del experimento** (`mq/…`). El producto tiene **cero** distractores catalogados, y aun
> así el veredicto de `health` salía **«Catálogo sano · 6,6 ítems por idea»** — porque medía el
> experimento. Un instrumento que dice «sano» sobre algo que no existe es peor que no tenerlo.
>
> **Mitigación aplicada, que no responde la pregunta:** el banner declara explícitamente cuántas de
> las que cuenta son del experimento (`misconceptions/split-experimento`). La decisión de fondo —si
> se filtran, si se separan en dos vistas, o si el track de cuántica se archiva— **sigue abierta y es
> del owner**.

**Relacionado:** [[BACKLOG]] T-103 (cerrada), T-61, T-57 · `sessions/SESSION-032.md`,
`sessions/SESSION-033.md`

---

### 🟡 Q-39 · ¿Qué tasa de escape marca un perfil como poco confiable? — **abierta 2026-08-18**

[[../adr/ADR-029-escape-como-tercera-categoria-de-respuesta]] deja `escape/escape-rate` calculada y
guardada, y **deliberadamente no fija ningún umbral**. La guarda que falta es: «si la tasa pasa X, no
parar por SE, parar por `max_items` y marcar el perfil como provisional».

**Por qué no se respondió al escribir el código:** X sale de mirar un curso real (T-90), no del
criterio del autor. Este proyecto ya se equivocó dos veces poniendo a mano un número razonable que
después resultó estar del lado equivocado: el piso de `min_response_seconds` en 3 s que los datos
bajaron a 2 s (T-59, D-36) y los cortes de fluidez 3,0/6,0, que **siguen sin calibrar** (T-65).

**Con qué datos se responde:** de T-90, la distribución de tasa de escape por estudiante en un curso
de ~30. La pregunta operativa es dónde se separa «escapó en los ítems que de verdad no sabía» de
«usó el botón como siguiente».

**Segunda pregunta pegada a esta:** ¿el escape debe pasar de `:weight 0.0` a un peso positivo? ADR-029
eligió 0.0 para no inventar constantes, y dejó dicho que el peso y el `:time-ms` quedan guardados por
respuesta, así que la alternativa se puede recomputar hacia atrás sobre los mismos datos. **Ojo:** si
se responde que sí, [[RISKS]] R-34 se reactiva con severidad alta y la guarda de confianza pasa a ser
precondición, no mejora.

**Bloquea:** T-91, y por lo tanto la puerta de entrada de G-1. **Decisión pendiente:** P-17.
**No responder antes de T-90:** una hora de clase dice si los estudiantes tienen cuenta del colegio
o no, y esa observación decide la opción. Es exactamente el tipo de pregunta que no se responde
analizando.

### 🔴 Q-39 · ¿Se paga el custom domain de Supabase para que la pantalla de Google diga "Academia Integral"? — **abierta 2026-08-17**

**Contexto.** Al verificar T-92 en producción, el selector de cuenta de Google muestra
*"Ir a jmnqklhxcdccvdhuuiji.supabase.co"*. Es el comportamiento normal de Supabase Auth sin dominio
propio: Google muestra el dominio del `redirect_uri`. Ver [[RISKS]] R-33.

**Por qué no se resuelve solo.** Chocan dos cosas que el proyecto ya decidió:

- el objetivo de producto n.º 4 de `CLAUDE.md`: **costo de infraestructura ≈ 0**;
- y el público real: **menores y apoderados**, a quienes se les pide entregar su cuenta de Google
  en una pantalla que tiene la forma exacta del phishing que se les enseña a evitar.

**Lo que falta para responderla, en orden:**

1. **El precio real** del add-on. Hoy es el supuesto **A-36** (~USD 10/mes, *sin verificar*).
2. **El dato de conversión** de T-91/G-5: ¿el registro por Google convierte peor que el registro por
   correo? Sin ese número la respuesta sería intuición.

**Criterio propuesto (no decidido):** no pagarlo hasta tener (2). Si el registro social convierte
sensiblemente peor, deja de ser estética y pasa a ser el cuello de botella medido del embudo.

**Lo que sí se puede hacer gratis mientras tanto** y está sin verificar: que el nombre de la app en
Google Cloud sea `Academia Integral` (no `academia`) y que tenga logo — la pantalla de
**consentimiento**, la siguiente al selector de cuenta, sí muestra el nombre de la app.

**Relacionado:** [[RISKS]] R-33 · [[ASSUMPTIONS]] A-36 · [[BACKLOG]] T-92, T-91 ·
[[../adr/ADR-028-toda-entrada-social-pasa-por-d-21]]

### 🟡 Q-38 · ¿Qué dicen los contratos laborales del owner sobre propiedad intelectual? — **respondida a medias 2026-08-17**

> ✅ **Cpech, leído el 2026-08-17:** **no hay cesión de PI ni exclusividad** — la titularidad del
> proyecto no está en discusión. **Pero** hay prohibición contractual de derivar alumnos a servicios
> de preuniversitario ajenos, de crear grupos de estudio con sistemas no autorizados y de usar
> material propio en clases: **el canal Cpech no es usable hasta que venza el contrato, el
> 2026-11-21**. Ver [[RISKS]] R-32 y [[BACKLOG]] T-93.
>
> 🔴 **Sigue abierta la parte del liceo:** ese contrato es otro y no se ha leído.
>
> El texto del contrato **no está en el repositorio a propósito** (datos personales, repo público —
> mismo criterio que R-26). Pedírselo al owner si hace falta.


El owner trabaja en **Cpech** (sede) y en un **liceo**, y ambos son además canales de distribución
disponibles para el producto. Antes de usarlos hay que saber si sus contratos incluyen **cláusulas
de cesión de propiedad intelectual o de invenciones**, de exclusividad, o de conflicto de interés.

**Por qué es bloqueante y no un trámite:** si existe una cláusula de cesión y el producto se
demuestra a la dirección **como empleado**, se abre una discusión sobre quién es dueño de dieciséis
años de trabajo. Es el único riesgo del registro capaz de terminar con el proyecto en una reunión
([[RISKS]] R-32).

**Matiz que ayuda:** el owner **ya les mencionó** que construye software, así que no hay ocultamiento
—eso reduce el problema de buena fe, pero **no resuelve la titularidad**, que depende del texto del
contrato y no de la conversación.

**Ambigüedad a aclarar:** el owner describió su vínculo con la dirección de Cpech como *"un trato"*.
No está claro si es un acuerdo formal o buena relación, y la diferencia cambia el análisis.

**Cómo se responde:** leyendo los contratos (T-93). Media hora. Si hay cláusula, la pregunta
siguiente es si conviene un deslinde por escrito o constituir sociedad antes de usar ese canal.

**Bloquea:** el canal Cpech completo, y por lo tanto parte de T-87.

### 🟡 Q-22 · ¿"Grupos de conocimiento" (3, libro) reemplazan a las bandas de θ (4, código)?
El libro clasifica en Básico/Medio/Avanzado; el código ya implementado usa
`inicial/basico/intermedio/avanzado`. No está dicho si son la misma idea con nombres distintos, si
el libro simplifica a propósito, o si se espera migrar `class_slots.theta_band` a un esquema nuevo.
**Bloquea:** cualquier trabajo futuro sobre el Eje 2 (frecuencia λ) o el Eje 3 (estilo de
aprendizaje). **Relacionado:** [[VISION_LIBRO_PROYECTO]] §3.4.

### 🟡 Q-23 · ¿"Academia Online de Matemáticas" y "Academia Integral" son el mismo proyecto?
El libro usa un nombre de marca distinto al ya publicado en producción (landing, JSON-LD, footer).
No está dicho si es un rebranding planeado, un nombre de trabajo interno, o dos iniciativas
relacionadas pero separadas (una académica/UNAP, otra comercial/startup).
**Por qué importa:** afecta copy, dominio, JSON-LD y la relación declarada con UNAP (Q-01) si el
proyecto se reposiciona como startup con inversión externa.
**Dato decisivo aparecido el 2026-08-13 (sigue abierta, pero cambia de forma):** **"Academia
Integral" es el nombre fundacional, de julio de 2010** — es el título del blog
<https://jacobocordova.blogspot.com/> (*"Bitácora del desarrollo de una academia que integre todo el
conocimiento humano…"*), y tiene una **justificación escrita** en la entrada *"¿Porqué Academia
integral?"* (2012-02-01), apoyada en el derecho constitucional a la educación y en la cita de Bolívar
sobre la ignorancia. No es un nombre comercial reciente: lleva **dieciséis años** y sobrevivió a tres
reescrituras técnicas. Esto **no decide** cuál usar —"Academia Online de Matemáticas" describe mejor
el alcance actual de una sola materia, y "Integral" promete algo que el MVP no entrega— pero sí
invierte la carga: el que tiene que justificarse ahora es el nombre nuevo, no el publicado.
Ver [[RAIZ_SISTEMA_LLOVIZNA]] §2.1. **Relacionado:** Q-30, Q-29.

### ✅ Q-24 · ¿Google Meet o Jitsi para las videollamadas de los cupos? — Respondida 2026-07-30
**Jitsi**, elegido por ser la opción más fácil de implementar: sala ad-hoc por URL
(`meet.jit.si/<nombre-sala>` o self-hosted a futuro), sin cuenta de Google ni límite de
participantes de la capa gratuita de Meet, y sin fricción de login para el estudiante. Ver D-30.
**Implementación:** sigue siendo `location_or_link` como texto libre — no requiere código nuevo,
solo que el owner use consistentemente Jitsi al crear los cupos reales de T-04.
**Relacionado:** Q-09, T-04.

### ✅ Q-25 · ¿Cómo se implementa la preferencia de canal de contacto del estudiante? — Alcance de WhatsApp respondida 2026-07-30
**Respondida (owner, P-12):** WhatsApp se implementa como **enlace manual `wa.me`**, no como
integración automática — "la sencillez es clave, porque aún no tenemos muchos estudiantes". Ver
D-30. Esto reduce el alcance de [[BACKLOG]] T-36 a: columna `contact_preference` en `profiles`,
selector en `components/cuenta.cljs`, y que el admin vea el `wa.me/<phone>` del estudiante al
gestionar cupos/notificaciones — sin proveedor de WhatsApp Business, sin secret nuevo, sin ramificar
`email_outbox`.
**Relacionado:** [[BACKLOG]] T-36.

---

## Dominio (IRT y contenido)

### 🟠 Q-05 · ¿Están calibradas las `difficulty` del banco de ítems?
El modelo 1PL depende enteramente del parámetro `b`. Si las dificultades fueron asignadas a
criterio y no estimadas con respuestas reales, θ (y con ella la banda y el cupo asignado) puede
estar sesgada. Tampoco se sabe cuántos ítems hay por topic.
**Cómo responderla:** `select topic, count(*), min(difficulty), max(difficulty), avg(difficulty)
from questions group by topic;`
**Relacionado:** R-17, T-29.
**Nota 2026-08-09:** la medición de T-50 (ver [[BACKLOG]]) confirmó que no estaban calibradas
—de hecho ni siquiera en una escala compatible entre topics— y el owner las reescaló a mano por
orden relativo de dificultad, no con datos de respuesta real. **Sigue sin responderse** la
pregunta de fondo (calibración estadística); solo se cerró el síntoma agudo (topics inalcanzables).
**🔺 Sube a bloqueante el 2026-08-16 (D-48 / G-2):** deja de ser una pregunta de calidad interna y
pasa a ser **precondición dura de la venta institucional** — es lo primero que pregunta un jefe de
UTP con formación en evaluación o una due diligence técnica. Responderla es el contenido de
[[ROADMAP]] **F12**, y su salida es un **reporte técnico publicable**. Ver [[RISKS]] R-29.

### 🟠 Q-06 · ¿Los topics del banco cubren los ejes reales de la PAES M1?
`universo.profile/topic->module-slug` mapea solo un subconjunto (`numbers_V1`, `numeros`, `enteros`,
`fracciones`, `potencias`, `algebra`, `geometria` y variantes con acento). Todo topic no mapeado cae
en `unknown/<topic>`, lo que produce un déficit **sin módulo** y por lo tanto **sin recursos**.
**Cómo responderla:** `select distinct topic from questions;` y comparar con `modules.slug`.
**Bloquea:** T-28.
**Nota (2026-08-08, ADR-013):** el desbloqueo de tests por prerequisito (T-39) se diseñó
deliberadamente **por `topic` directo**, no por `module-slug`, precisamente para no heredar esta
brecha — no la resuelve, solo evita depender de ella.
**Nota (2026-08-10, T-51/ADR-017):** el mapeo dejó de ser una lista de variantes: `universo.topics`
normaliza el topic antes de buscarlo y resuelve por **coincidencia de sufijo** con el slug del
módulo, así que ya no hace falta una entrada por cada topic que se llama igual que su módulo. La
pregunta **sigue abierta en su parte de fondo** (¿los topics cubren los ejes reales de la PAES M1?),
que es una pregunta de contenido, no de mapeo. `universo.topics/unmapped` responde la parte
mecánica sobre cualquier lista de topics, y la consulta (ii) de `029` la responde contra la base.

### ✅ Q-26 · ¿Cuántos de los diagnósticos ya rendidos traen `time-ms` utilizable? — Respondida 2026-08-10
> **Respuesta: casi ninguno. 195 de 2178 respuestas (9 %).** El campo `time-ms` está presente en el
> 100 % de las respuestas pero vale **0** en el 91 %: el cronómetro no estaba midiendo. De 387 ítems
> del banco, **0 tienen ≥30 respuestas con tiempo** y solo 13 tienen ≥5.
>
> **Corrige la inferencia con la que se abrió la pregunta:** que `git log -S ":time-ms"` situara la
> instrumentación en 2025-09-09 (anterior al piloto) hacía esperar que los tiempos estuvieran ahí.
> Se marcó como "falta confirmarlo" y la confirmación dio que no — el campo existía en el código,
> pero `diagnostic_test.cljs` manda `0` cuando el cronómetro no arrancó, y el flujo del diagnóstico
> se reparó recién en `9e622d9` (2026-07-18).
>
> **Cerrada del todo el mismo día:** el owner corrió el seguimiento y confirmó que **el cronómetro
> sí registra hoy**. No hay bug vivo; los ceros son históricos, de tests anteriores al arreglo del
> flujo del diagnóstico (`9e622d9`, 2026-07-18). Entonces T-59 vuelve a estar bloqueado **por
> volumen de datos**, como decía ADR-014 originalmente — con la diferencia de que ahora se sabe que
> el contador arranca casi de cero y que **cada diagnóstico nuevo suma**.
>
> **Lo que sí se pudo usar** con esas 195 respuestas: corregir el piso de esfuerzo de 3 s a 2 s con
> evidencia (migración `032`), y refutar el promedio simple como estimador.

Abierta 2026-08-10. **Es la pregunta que decide si T-59 se hace ahora o hay que esperar**, y de
paso si la precondición de datos de la Fase 2 de ADR-014 estaba cumplida hace un año sin que nadie
lo notara.

Lo que ya se sabe **sin consultar la base**: el panel mostró **80 usuarios y 252 diagnósticos**
rendidos (T-01, 2026-08-09), y `git log -S ":time-ms"` sitúa la instrumentación del cronómetro en
**2025-09-09**, o sea **anterior** al piloto UNAP (oct–nov 2025). Los tiempos *deberían* estar ahí.

Lo que **no** se sabe y solo responde una consulta: si esas filas efectivamente tienen `time-ms`
poblado y distinto de 0 dentro de `tests.test`, si aparece la moda izquierda de clickeo rápido que
ADR-014 predice, y cuántos ítems tienen ya suficientes respuestas para calibrarse solos.

**Cómo responderla:** `supabase/queries/T-59_calibracion_tiempos.sql` (solo lectura, validado
contra un Postgres real antes de entregarlo). Las consultas 1 y 3 responden esta pregunta; la 4
además contrasta el umbral autoral de T-44 contra el histórico.
**Ojo:** `time-ms` es el **delta** por pregunta, no un par de timestamps — lo que no se instrumente
ahora no se recupera después.
**Bloquea:** T-59, y desbloquea o confirma el bloqueo de T-45.
**Relacionado:** [[BACKLOG]] T-59, T-44, T-45, T-29 · [[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]]
§Corrección 2026-08-10 · [[RISKS]] R-17.

### 🟡 Q-27 · ¿`min-responses = 4` es el mínimo correcto para pronunciarse sobre fluidez, y sirve la misma medida en bancos difíciles?
Abierta 2026-08-12, al verificar ADR-019 con datos reales.

`universo.irt.fluency/min-responses` exige **4 respuestas correctas, medidas y esforzadas** para
asignar banda. El número no salió de datos: salió de que los bancos de este proyecto tienen
`max_items` entre 4 y 12, así que pedir más dejaría al eje mudo casi siempre. La verificación mostró
el borde: con 3 correctas de 10 el eje no se pronuncia, y **es justo el estudiante al que peor le
fue** el que se queda sin su segundo eje. (Se mitigó mostrando un tercer estado explícito en vez de
esconder la tarjeta, pero eso resuelve la UI, no la pregunta.)

Debajo hay una pregunta más de fondo: **la fluidez se mide solo sobre respuestas correctas** —a
propósito, porque una incorrecta rápida y una incorrecta lenta significan lo mismo—, y esa decisión
implica que cuanto peor le va a alguien, menos evidencia hay para hablar de su fluidez. Puede ser
correcto (sin la herramienta, la velocidad no informa) o puede estar dejando fuera un caso real:
quien falla **y** tarda muchísimo.

**Cómo responderla:** con volumen. `fluency/calibration-report` sobre el histórico dice cuántos
estudiantes quedan bajo el mínimo con cada valor de `min-responses`, y con qué tasa de acierto.
**No asumir** que 4 está bien porque hoy nadie se quejó: hoy casi no hay diagnósticos con tiempo real.
**Relacionado:** [[BACKLOG]] T-65 · [[RISKS]] R-24 ·
[[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]] · [[../sessions/SESSION-021]].

### ✅ Q-07 · ¿Qué semántica tiene repetir el diagnóstico? — **Respondida 2026-08-16 (D-50)**

**Respuesta: histórico versionado. Repetir el diagnóstico NUNCA sobrescribe el perfil anterior.**

**Por qué se decidió así, y por qué dejó de ser una pregunta técnica.** Con el pivote de negocio
del 2026-08-16 ([[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]], vector **G-4**), **el
histórico de θ es el producto que se vende**: Δθ entre diagnósticos es el bucle de retención en
B2C, el argumento de renovación de la licencia en B2B y la métrica de *outcome* que pide un fondo
educativo. Sobrescribir `student_profiles` no sería una simplificación: sería **destruir el
activo**.

**Consecuencias:**

- `student_profiles` deja de ser materialización única y pasa a versionarse por intento.
- Δθ se calcula por estudiante y agregado por cohorte, y **se comunica siempre con su error
  asociado (SE)** — sin banda de confianza no se comunica (regla de [[BUSINESS_CONTEXT]] §7).
- **Cierra la contradicción con la FAQ**, que ya prometía "te muestra cómo se movió tu nivel".
- **Cierra P-01.** Implementación: [[ROADMAP]] F14, [[BACKLOG]] T-26 y épica E8.

**Nota (2026-08-08, ADR-013):** T-39 usa el **mejor θ histórico por topic** (agregado sobre las
filas ya existentes en `tests`, cada intento es su propia fila) para decidir desbloqueos — el
histórico por intento **ya existe de facto en `tests`**, lo que abarata esta implementación: lo que
falta es versionar `student_profiles`, no capturar los datos.
**Nota (2026-08-08, ADR-013):** T-39 usa el **mejor θ histórico por topic** (agregado sobre las
filas ya existentes en `tests`, cada intento es su propia fila) para decidir desbloqueos — es una
señal de que "histórico por intento" ya existe de facto en `tests`, pero no resuelve esta pregunta:
`student_profiles` (el perfil que ve el estudiante) sigue siendo una materialización única.

### ✅ Q-17 · ¿El tiempo de respuesta influye en la estimación? — Respondida 2026-08-08 (ADR-014)
La FAQ afirma: "El tiempo de respuesta también se considera en la estimación". El modelo 1PL
implementado usa **solo** dificultad y acierto; `time-ms` se registra pero no entra en el cálculo de
θ.
**Contradicción documentada** entre copy e implementación. Resolver: corregir el copy o incorporar
el tiempo al modelo (lo segundo es un cambio de dominio → ADR).

**Respondida 2026-08-08 (owner + [[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]]):** se
**incorpora el tiempo**, no se borra la frase. Pero **no dentro del 1PL**: el tiempo se modela como
un **eje separado de θ**, porque fundir velocidad en θ haría desaparecer justo el perfil "sabe pero
lento" que [[VISION_LIBRO_PROYECTO]] §3.3 quiere detectar (θ alto + velocidad baja).

Tres fases con precondición de datos: (1) **filtro de respuestas no esforzadas** — descartar
evidencia que no es evidencia, sin necesidad de calibración, y con eso la frase pasa a ser cierta
(T-44); (2) **velocidad τ como segundo eje** reportado por cuadrantes, ≥ 30 tests (T-45);
(3) **prior de θ condicional a τ**, ≥ 200 tests y ADR propio que reemplace la cláusula del prior de
ADR-004 (T-46).

**Verificado al responder:** `:time-ms` ya se captura y se persiste dentro de `tests.test`
(`events/test.cljs:357` y `:test/complete`), junto con `:start-time`/`:end-time` — **no hay que
instrumentar nada**, el histórico queda disponible para calibración retroactiva desde el primer
test rendido.

**Sigue pendiente:** hasta que T-44 esté en producción, la frase publicada **sigue siendo falsa**.
El ADR deja el plan de respaldo explícito (ajustar el copy en el intertanto si T-44 se demora):
primero que sea verdad, después dejarla publicada.

---

## Técnicas

### ✅ Q-04 · ¿La inscripción respeta `capacity`? — Respondida 2026-07-29
**No.** `001_mvp_schema.sql` solo define un trigger `enrollments_confirm_threshold`
(`AFTER INSERT OR UPDATE OF status ON enrollments`) que ejecuta
`confirm_slot_if_threshold()`: recalcula `active_enrollments` y confirma el cupo cuando llega a
`min_enrollments`. No hay ningún `BEFORE INSERT` ni `CHECK` que impida que los enrollments activos
superen `class_slots.capacity`. La policy `enrollments_insert_own` (`001`) solo exige
`user_id = auth.uid()`, sin condición de cupo. El único límite es de UI:
`components/slots.cljs` oculta el botón "Inscribirme" cuando `active >= capacity` (muestra "Cupo
lleno"), pero eso no es un control de seguridad — una llamada directa a la API de Supabase con un
usuario autenticado puede insertar el enrollment N+1 sin error.
**Bloquea:** T-03, cierre de F3 → **sigue bloqueando**, ahora con causa raíz confirmada.

### ✅ Q-12 · ¿Qué policy usa el estudiante para leer `questions`? — Respondida 2026-08-08
`007_questions_admin_rls.sql` restringe SELECT a `is_admin()`, pero el diagnóstico necesita leer
preguntas como estudiante. O existe otra policy previa más permisiva, o el flujo usa otra vía.
**Por qué importa:** si `authenticated` puede hacer SELECT sobre `questions`, el banco completo
—incluidas `correct_option` y las explicaciones— es descargable (R-16).
**Cómo responderla:** revisar todas las policies de `questions` en el proyecto real
(`select * from pg_policies where tablename = 'questions';`).

**Respondida 2026-08-08 (el owner ejecutó la consulta): existe una policy permisiva creada desde
el dashboard de Supabase.**

```
questions | "Enable read access for all users" | SELECT | {authenticated} | using: true
```

Como las policies son PERMISSIVE y se combinan con **OR**, la regla efectiva es `true OR is_admin()`
= **`true`**, y `questions_select_admin` es **inerte**. Es decir: **el peor caso de R-16 está
confirmado y vivo en producción** — cualquier cuenta autenticada puede descargar el banco completo
con `correct_option` y `error_a..d`.

**Consecuencia:** [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]] (el cliente deja de leer
`questions`; ítem sin respuesta + corrección en servidor vía `security definer`), migraciones
`023`–`026` y [[BACKLOG]] T-47.

**✅ Cerrado 2026-08-09.** Migraciones aplicadas, bundle publicado y verificado en producción con
cuenta de rol `user`: anónimo → `permission denied for table questions`; estudiante → **0 filas**
(antes 387); los RPC sirven el ítem sin `correct_option` ni `error_*`; el diagnóstico funciona
igual. [[RISKS]] R-16 cerrado, contradicción X-03 resuelta.

**Hallazgos colaterales de la misma auditoría** (se auditaron las 15 tablas, no solo `questions`):
- **RLS está habilitado en las 15 tablas** (`relrowsecurity = true`), así que ninguna está abierta
  por RLS apagado.
- Tabla huérfana **`dashboard`** con SELECT/INSERT `true` para `authenticated`: 0 filas, sin
  referencias en el código ni en migraciones. Eliminada en `023`.
- **`public.questions` no se crea en ninguna migración** — un entorno nuevo no se puede reconstruir
  desde el repo (→ T-48).
- La banda del estudiante **no está protegida en la base**: puede reescribir su propia
  `theta_band` e inscribirse en cualquier cupo (→ T-49).
- Al menos ocho policies vienen del dashboard: **el repositorio no es la fuente de verdad de RLS**.
  Regla nueva en `023`: ninguna policy se crea desde la UI.

### ✅ Q-13 · ¿Qué versión está realmente en producción? — Respondida 2026-07-29
`git log main..cursor/mvp-operable-funnel` está vacío: esa rama quedó **completamente mergeada** a
`main` (PR #14, luego PR #15 "Configuracion"). Verificado además por hash: se descargó
`https://jacobocordova.com/public/js/app.js` (`curl`, el `index.html` real referencia
`./public/js/app.js`, no `./js/app.js`) y su MD5 (`da3cd5e1de8717d10bbc9bf602baf1c1`) coincide
byte a byte con `git show origin/main:public/js/app.js`. **Producción sirve exactamente
`origin/main` @ `4998785`**, sin desfase.

**Pero surge una brecha nueva:** la rama `visual-fixes` (`520ff79` "minor fixes" — unifica estilos
en varios componentes — y `0fd5f79`, el fix de capacidad de T-03) está pusheada a
`origin/visual-fixes` pero **no mergeada a `main`**, así que ese trabajo todavía no está en
producción. La migración `011` sí está aplicada en la base real (T-03), así que el control de
capacidad ya protege en producción independientemente del frontend desplegado — pero el resto de
`visual-fixes` (unificación de estilos, refactor de UI) no.
**Tarea:** T-19 sigue abierta como seguimiento de "cuándo mergear `visual-fixes` → `main`".

### 🟡 Q-11 · ¿En qué región está el proyecto Supabase y en qué plan?
Afecta latencia para usuarios en Iquique, límites del free tier y política de respaldos.
**Relacionado:** R-03, R-15.

### 🟡 Q-15 · ¿Instrumentación propia o herramienta externa?
Una solución propia en Postgres mantiene los datos en casa (mejor para privacidad de menores) pero
hay que construirla; una herramienta externa es inmediata pero agrega un tercero que recibe datos.
**Bloquea:** T-20. **Decisión pendiente:** P-04.

### 🟡 Q-18 · ¿Se usó alguna vez `bookings` en el `app-db`?
`universo.db/default-db` define `:bookings {:by-id {} :all-ids []}` pero no hay tabla, evento ni
componente que lo use. ¿Resto de un diseño anterior o preparación de algo?
**Impacto:** bajo; limpieza.

### 🟡 Q-19 · ¿`visitor_tracker` sigue siendo necesario y proporcionado?
Recolecta IP, geolocalización, idioma, navegador y SO en cada carga. Sin analytics ni reporte que lo
consuma, el dato se acumula sin uso mientras suma riesgo de privacidad.
**Relacionado:** R-06, T-10.

---

## Proceso

### 🟠 Q-14 · ¿La fase F11 (escala pedagógica) refleja la intención real del owner?
Las fases F0–F7 están reconstruidas del historial y son verificables; F8–F10 son consecuencia
directa de los bloqueos actuales; **F11 es una propuesta** hecha al documentar, no una decisión.
**Cómo responderla:** el owner confirma, reordena o descarta en la próxima sesión y se actualiza
[[ROADMAP]].

### ✅ Q-20 · ¿Se conservan las 12 ramas locales / 11 remotas por alguna razón? — Respondida 2026-08-09
**No.** Auditadas una por una (`git rev-list --count main..<rama>`): la deuda había crecido a
27 locales / 24 remotas, y todas menos dos estaban ya mergeadas a `main` (0 commits propios). Las
dos con contenido único (`Dashboard-pro`, `visual-fixes`) resultaron ser trabajo superado por
implementaciones posteriores, no algo que rescatar. El owner confirmó borrar todo. Ver [[BACKLOG]]
T-18 (cerrada), [[RISKS]] R-21 (cerrado).

---

## Contradicciones detectadas (regla de gobernanza 14)

| # | Contradicción | Documentos implicados | Resolución propuesta |
|---|---------------|----------------------|----------------------|
| X-01 | ~~La FAQ dice que el tiempo de respuesta se considera en la estimación; el modelo 1PL no lo usa~~ | `index.html`, `landing.cljs` vs `components/tetha.cljs` | ✅ **RESUELTA en producción 2026-08-10.** No se borró la frase: **se cambió el sistema para que fuera cierta**, que es lo que ADR-014 prescribía (*"primero que sea verdad, después dejarla publicada"*). T-44 en producción vía PR #34, verificado por hash (MD5 `ef97d814d66efd61d08d90711431aca9`, idéntico en `origin/main` y en el dominio) y con la frase confirmada aún publicada. El tiempo de respuesta hoy **sí** entra en la estimación, como criterio de validez: bajo el umbral la respuesta no aporta a θ ni a la información de Fisher (`universo.irt.effort`, `test_configs.min_response_seconds`) |
| X-02 | La FAQ promete ver "cómo se movió tu nivel" al repetir el diagnóstico; `student_profiles` no guarda histórico | FAQ vs `001_mvp_schema.sql` | 🔴 **Es ahora la única afirmación falsa publicada.** Q-07 / P-01 siguen sin decidir, y el sitio ya recibe tráfico. Dos vías, mismas que tuvo X-01: implementar el histórico (T-26, bloqueada por Q-07) o ajustar el copy mientras tanto. Ojo: `tests` **sí** guarda un intento por fila y `universo.access` ya agrega por topic, así que la materia prima existe — lo que falta es decidir la semántica, no instrumentar |
| X-03 | `007` restringe SELECT de `questions` a admin, pero el estudiante debe leer preguntas | `007_questions_admin_rls.sql` vs flujo de `events/test.cljs` | ✅ *Resuelta 2026-08-09:* había una policy permisiva del dashboard (`using true`) que anulaba a `007` por OR. Eliminada en `025`; el estudiante ya no lee `questions` sino los RPC de ADR-015. **Cerrada y verificada en producción** — ver Q-12, T-47 |
| X-04 | *(Resuelta 2026-08-09)* `.gitignore` ignoraba `src/universo/user.cljs`, pero el archivo estaba trackeado en Git | `.gitignore` vs `git ls-files` | Era código roto sin `ns`/requires, no compilado ni usado en ningún lado — borrado, `.gitignore` limpiado. Ver [[BACKLOG]] T-16 |
| X-05 | *(Resuelta 2026-08-09)* `shadow-cljs` 3.0.4 en `deps.edn` vs `^2.19.2` en `package.json` | `deps.edn` vs `package.json` | `package.json` → `^3.0.4`, `npm install` corrido, `npx shadow-cljs release app` verificado en verde. Ver [[BACKLOG]] T-13 |
| X-06 | *(Resuelta 2026-08-09)* KaTeX `^0.16.22` por npm vs CSS 0.16.9 por CDN | `package.json` vs `index.html` | CDN de `index.html`/`public/index.html` → `0.16.22`. Ver [[BACKLOG]] T-13 |
| X-07 | `PROJECT_SUMMARY.md` describe una estructura de módulos previa al MVP (menciona `views.cljs` con componentes principales, `jardin`, `voz`… como parte del producto) que ya no refleja el sistema | `PROJECT_SUMMARY.md` vs [[ARCHITECTURE]] | T-33: reducir a puntero o archivar |
| ~~X-09~~ | ~~El copy publicado dice que el proyecto *"se originó en 2025 a partir de un convenio con la Universidad Arturo Prat"*~~ | — | ✅ **RESUELTA 2026-08-16 (D-53).** El copy se corrigió y se publicó. **Nota que corrige la propia entrada:** decía tres lugares y eran **cinco** — `index.html` (JSON-LD **y** noscript), `public/index.html` (JSON-LD), `landing.cljs` y `home.cljs` (footer). `resume.cljs` menciona a la UNAP como experiencia docente real y **no se tocó, porque ahí es correcto**. Ver [[LESSONS_LEARNED]] L-22 |
| X-08 | *(Parcialmente resuelta 2026-07-30)* El "Libro del Proyecto" proponía pago por clase, multi-materia e internacionalización | [[VISION_LIBRO_PROYECTO]] §4.4 vs [[PROJECT_BRIEF]] §6, [[BUSINESS_CONTEXT]] §5 | **Pago por clase: resuelto** (D-19/D-26/D-32, $10.000 CLP/hora). **Multi-materia e internacionalización: siguen sin decidir** -- Q-21 confirmó la dirección general, pero no estas decisiones puntuales |

---

## Preguntas respondidas

*(vacío — la primera respuesta se registra aquí con fecha, respuesta y ADR si corresponde)*

Formato:

```
### ✅ Q-NN · Pregunta  — respondida 2026-MM-DD
**Respuesta:** …
**Consecuencia:** ADR-0NN / tarea T-NN / cambio en [[ARCHIVO]]
```

---

Relacionado: [[ASSUMPTIONS]] · [[DECISIONS]] · [[RISKS]] · [[REQUIREMENTS]] §7 · [[CURRENT_STATUS]] ·
[[VISION_LIBRO_PROYECTO]]

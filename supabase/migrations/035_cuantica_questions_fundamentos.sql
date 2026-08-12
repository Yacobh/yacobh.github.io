-- EXPERIMENTO · Banco de ítems, bloque I: fundamentos (36 ítems).
-- Topics: mq_origenes · mq_formalismo · mq_postulados · mq_incertidumbre · mq_schrodinger
--
-- ⚠ APLICAR DESPUÉS DE 033 (módulos) y 034 (misconceptions).
-- Contexto y salvaguardas: adr/ADR-018-track-experimental-cuantica.md.
--
-- ── El patrón de inserción (vale también para 036, 037 y 038) ───────────────
--
-- 1. **Cadenas con dollar-quoting `$qm$...$qm$` y no `E'...'`.** El resto de las
--    migraciones de contenido de este repo (018, 019) usa `E'...'`, donde cada
--    backslash de LaTeX hay que duplicarlo y donde un `\n` mal puesto convierte
--    `\neq` en un salto de línea seguido de "eq". Con 122 ítems cargados de
--    `\hbar`, `\epsilon_{ijk}` y `\dagger`, esa convención es una fábrica de
--    errores silenciosos: el ítem se guarda igual, y el error se ve recién
--    cuando KaTeX lo renderiza en pantalla. Dentro de `$qm$...$qm$` el texto va
--    literal -- backslashes y comillas simples incluidos -- y el `$` de KaTeX
--    no interfiere porque el cierre exige la secuencia exacta `$qm$`.
--
-- 2. **`error_*` de la alternativa correcta.** `score_answer` (024) devuelve la
--    explicación de la alternativa ELEGIDA, sea correcta o no. Por eso las
--    cuatro están escritas: la de la correcta confirma y cierra el razonamiento,
--    y su `misconception_*_id` queda `null` (no hay error que catalogar).
--
-- 3. **`misconception_*_id` puede quedar `null` en un distractor.** 027 definió
--    `null` como "sin catalogar", y es la respuesta honesta cuando el distractor
--    es un error factual aislado (una fecha, una atribución histórica) y no un
--    patrón de razonamiento reutilizable. Inventar una entrada de catálogo por
--    cada distractor sería exactamente lo que 034 dice que no hay que hacer.
--
-- 4. **`difficulty` en logits**, misma escala que θ (T-50 documenta el desorden
--    que produce mezclar escalas). Rango usado: -1,2 (lo pregunta cualquiera que
--    fue a clase) a 2,4 (separa al que entendió del que memorizó). La
--    calibración real solo puede salir de responder el banco: estos valores son
--    una apuesta inicial, no una medición.
--
-- 5. **Idempotente por `where not exists (topic, question)`.** Si hay que
--    corregir el texto de un ítem ya cargado, esta migración NO lo actualiza:
--    hay que borrar el ítem y volver a correrla, o editarlo en Admin → Preguntas.
--    Es deliberado -- reaplicar contenido no debe pisar una corrección hecha a
--    mano en el panel.
--
-- 6. `questions.topic` lo normaliza el trigger de 029 al insertar. Los topics de
--    acá ya están en forma canónica (minúsculas, sin acentos), así que el
--    trigger no cambia nada; se escriben así para que el archivo diga la verdad.

with items (topic, module_slug, difficulty, order_index,
            question, option_a, option_b, option_c, option_d, correct_option,
            error_a, error_b, error_c, error_d,
            mis_a, mis_b, mis_c, mis_d) as (
  values

  -- ===========================================================================
  -- mq_origenes · La crisis de la física clásica
  -- ===========================================================================

  ($qm$mq_origenes$qm$::text, $qm$cuantica/origenes$qm$::text,
   (-1.0)::double precision, 10::int,
   $qm$En un experimento fotoeléctrico se ilumina un metal con luz de frecuencia fija, por encima de la frecuencia umbral. Si se **duplica la intensidad** del haz sin cambiar su frecuencia, ¿qué ocurre?$qm$::text,
   $qm$Se duplica la energía cinética máxima de los electrones emitidos.$qm$::text,
   $qm$Se duplica el número de electrones emitidos por segundo, y su energía cinética máxima no cambia.$qm$::text,
   $qm$Los electrones empiezan a salir antes, porque acumulan más rápido la energía que necesitan para escapar.$qm$::text,
   $qm$Baja la frecuencia umbral del metal, que ahora emitiría incluso con luz roja.$qm$::text,
   $qm$B$qm$::text,
   $qm$Ese es justamente el resultado que la física clásica predecía y el experimento desmintió. La energía cinética máxima es $K_{max} = h\nu - W$: depende de la **frecuencia**, no de la intensidad.$qm$::text,
   $qm$Correcto. La intensidad cuenta cuántos fotones llegan por segundo, así que controla el **número** de electrones; la energía de cada uno depende solo de $\nu$ vía $K_{max} = h\nu - W$.$qm$::text,
   $qm$La imagen de "acumular energía" es la ondulatoria clásica, que predecía un retardo medible con luz débil. No se observa ningún retardo: o el fotón tiene $h\nu > W$ y el electrón sale de inmediato, o no sale.$qm$::text,
   $qm$La frecuencia umbral es $\nu_0 = W/h$, y $W$ (la función trabajo) es una propiedad **del metal**. Ninguna forma de iluminarlo la cambia.$qm$::text,
   $qm$mq/origenes/fotoelectrico-por-intensidad$qm$::text, null::text,
   $qm$mq/origenes/acumulacion-clasica-de-energia$qm$::text,
   $qm$mq/origenes/umbral-como-propiedad-de-la-luz$qm$::text),

  ($qm$mq_origenes$qm$, $qm$cuantica/origenes$qm$, -0.3, 20,
   $qm$La ley clásica de Rayleigh-Jeans para el cuerpo negro diverge a alta frecuencia (la "catástrofe ultravioleta"). ¿Qué supuso Planck en 1900 para evitar esa divergencia?$qm$,
   $qm$Que la luz está hecha de partículas, de modo que dentro de la cavidad no hay ondas.$qm$,
   $qm$Que los osciladores de las paredes solo pueden intercambiar energía en múltiplos de $h\nu$.$qm$,
   $qm$Que dentro de la cavidad solo caben frecuencias discretas, y por eso la integral divergente se vuelve una suma finita.$qm$,
   $qm$Que la radiación pierde energía en cada reflexión, lo que amortigua las frecuencias altas.$qm$,
   $qm$B$qm$,
   $qm$Ese es el cuanto de luz de **Einstein** (1905), cinco años posterior. Planck cuantizó el intercambio de energía de la materia y siguió tratando el campo como clásico; de hecho resistió la idea del fotón durante más de una década.$qm$,
   $qm$Correcto. $E = nh\nu$ para los osciladores: a frecuencia alta el cuanto $h\nu$ es tan grande comparado con $k_BT$ que esos modos casi no se excitan, y el espectro cae en vez de divergir.$qm$,
   $qm$Los modos de una cavidad ya eran discretos en la teoría clásica, y su número **crece** con la frecuencia: es precisamente de ahí que sale la divergencia. Discretizar los modos no arregla nada; lo que Planck cuantizó fue la energía de cada modo.$qm$,
   $qm$Es un parche clásico, del tipo que se intentó y no funciona: una cavidad en equilibrio térmico no pierde energía neta, por definición de equilibrio.$qm$,
   $qm$mq/origenes/planck-postulo-el-foton$qm$, null,
   $qm$mq/origenes/cuantizacion-es-discretizar-todo$qm$, null),

  ($qm$mq_origenes$qm$, $qm$cuantica/origenes$qm$, 0.2, 30,
   $qm$Un electrón y una pelota de tenis se mueven con la **misma velocidad**. Según de Broglie, $\lambda = h/p$. ¿Por qué solo el electrón muestra difracción apreciable?$qm$,
   $qm$Porque la relación de de Broglie no se aplica a objetos macroscópicos: son clásicos por naturaleza.$qm$,
   $qm$Porque su masa es muchísimo menor, así que con la misma $v$ su momentum es menor y $\lambda$ resulta comparable a distancias atómicas.$qm$,
   $qm$Porque el electrón tiene carga, y la difracción es un fenómeno electromagnético.$qm$,
   $qm$Porque la pelota tiene una $\lambda$ mucho **mayor**, y las ondas largas no difractan.$qm$,
   $qm$B$qm$,
   $qm$La relación se aplica a todo: la pelota también tiene $\lambda = h/p$. Lo que pasa es que da del orden de $10^{-34}$ m, inobservable con cualquier rendija concebible. No es una frontera de principio, es una diferencia de escala.$qm$,
   $qm$Correcto. Con $\lambda = h/(mv)$ y $m_e \approx 9\times 10^{-31}$ kg, un electrón lento tiene $\lambda$ del orden del ångström: exactamente el espaciado de un cristal, que es lo que usaron Davisson y Germer en 1927.$qm$,
   $qm$La difracción de de Broglie no necesita carga: se ha observado con neutrones (neutros), con átomos completos y con moléculas de decenas de átomos. Lo que importa es $p$, no $q$.$qm$,
   $qm$La relación está invertida. $\lambda = h/p$: **más** momentum es **menos** longitud de onda. La pelota tiene $p$ enorme y por lo tanto $\lambda$ minúscula.$qm$,
   $qm$mq/origenes/cuantica-solo-para-lo-pequeno$qm$, null, null,
   $qm$mq/origenes/de-broglie-relacion-invertida$qm$),

  ($qm$mq_origenes$qm$, $qm$cuantica/origenes$qm$, 0.8, 40,
   $qm$¿Cuál de estas afirmaciones sobre el modelo de Bohr (1913) es correcta a la luz de la mecánica cuántica actual?$qm$,
   $qm$Acierta en los niveles de energía del hidrógeno, pero su imagen de órbitas definidas es incompatible con la relación de incertidumbre.$qm$,
   $qm$Sigue siendo la descripción correcta del átomo; la ecuación de Schrödinger solo la reformula con otro lenguaje.$qm$,
   $qm$Se equivoca también en las energías: los niveles reales del hidrógeno no siguen $-13{,}6/n^2$ eV.$qm$,
   $qm$Su error fue cuantizar: hoy sabemos que el espectro del átomo de hidrógeno es continuo.$qm$,
   $qm$A$qm$,
   $qm$Correcto. Una órbita supone $r$ y $p$ definidos a la vez, que es justo lo que $\Delta x\,\Delta p \geq \hbar/2$ prohíbe. Bohr acertó el resultado con un modelo cuya imagen física no sobrevivió.$qm$,
   $qm$No es una reformulación: cambia el objeto. En Schrödinger el estado fundamental tiene $l = 0$, o sea **momento angular nulo**, mientras que Bohr le asignaba $L = \hbar$ y una órbita circular. Coinciden en la energía y difieren en casi todo lo demás.$qm$,
   $qm$Las energías sí son correctas para el hidrógeno: $E_n = -13{,}6\,\text{eV}/n^2$ es lo que da también la ecuación de Schrödinger con potencial de Coulomb (las correcciones finas son de orden $\alpha^2$, mucho menores).$qm$,
   $qm$Los estados **ligados** del hidrógeno tienen espectro discreto, y eso es lo que explica las líneas espectrales. Hay espectro continuo, pero recién por encima de la energía de ionización.$qm$,
   null, $qm$mq/origenes/bohr-como-teoria-vigente$qm$, null,
   $qm$mq/origenes/cuantizacion-es-discretizar-todo$qm$),

  ($qm$mq_origenes$qm$, $qm$cuantica/origenes$qm$, 1.4, 50,
   $qm$En una doble rendija con electrones, de a uno por vez, se instala un detector que registra por cuál rendija pasó cada electrón. ¿Qué se observa en la pantalla?$qm$,
   $qm$Desaparece el patrón de interferencia y queda la suma de las dos distribuciones de una rendija.$qm$,
   $qm$El patrón se mantiene intacto: detectar por dónde pasó no altera adónde llega.$qm$,
   $qm$El patrón se mantiene pero corrido, porque el detector le transfiere momentum al electrón.$qm$,
   $qm$Nunca hubo interferencia con electrones de a uno: el patrón solo aparece con haces intensos, donde los electrones interfieren entre sí.$qm$,
   $qm$A$qm$,
   $qm$Correcto. Obtener información de camino destruye la coherencia entre las dos alternativas: el estado deja de ser una superposición con fase relativa definida y las probabilidades se suman sin término de interferencia.$qm$,
   $qm$Detectar el camino no es un acto neutro: correlaciona el electrón con el detector, y esa correlación es exactamente lo que borra los términos cruzados. No hace falta un golpe físico para perder la interferencia.$qm$,
   $qm$Es la explicación de Heisenberg de 1927, y no es la razón profunda: existen esquemas de marcado de camino sin transferencia apreciable de momentum, y la interferencia desaparece igual. Lo que la destruye es la información disponible, no el retroceso.$qm$,
   $qm$El experimento con electrones de a uno se hizo (Merli-Missiroli-Pozzi 1976, Tonomura 1989) y el patrón aparece igual, punto a punto, tras acumular miles de impactos. Cada electrón interfiere consigo mismo.$qm$,
   null, $qm$mq/medida/colapso-reversible$qm$,
   $qm$mq/incertidumbre/es-limitacion-del-aparato$qm$,
   $qm$mq/interferencia/entre-particulas-distintas$qm$),

  ($qm$mq_origenes$qm$, $qm$cuantica/origenes$qm$, 2.0, 60,
   $qm$¿Cuál es la diferencia esencial entre lo que postuló Planck en 1900 y lo que postuló Einstein en 1905?$qm$,
   $qm$Planck cuantizó el intercambio de energía de los osciladores materiales; Einstein cuantizó el campo de radiación mismo.$qm$,
   $qm$Ninguna de fondo: ambos postularon el fotón, y Einstein solo lo aplicó a un fenómeno distinto.$qm$,
   $qm$Planck cuantizó la frecuencia de la radiación; Einstein, su energía.$qm$,
   $qm$Planck trabajó con electrones y Einstein con átomos completos.$qm$,
   $qm$A$qm$,
   $qm$Correcto. Es la diferencia entre "la materia solo puede entregar energía de a paquetes" y "la energía **viaja** en paquetes". Planck consideró lo segundo un exceso y se opuso durante años.$qm$,
   $qm$Es el error histórico más repetido del tema. Planck cuantizó los osciladores de las paredes, no la luz; el cuanto de luz es de Einstein, y en 1913 Planck todavía lo mencionaba como el desliz de un físico por lo demás brillante.$qm$,
   $qm$La frecuencia nunca se cuantizó en ninguno de los dos: es un parámetro continuo del campo. Lo que se cuantiza es la energía asociada a cada frecuencia, $E = h\nu$.$qm$,
   $qm$Ninguno de los dos trabajó así. Planck modeló osciladores materiales genéricos en equilibrio con la radiación, y Einstein, el campo electromagnético.$qm$,
   null, $qm$mq/origenes/planck-postulo-el-foton$qm$, null, null),

  -- ===========================================================================
  -- mq_formalismo · Espacio de Hilbert y notación de Dirac
  -- ===========================================================================

  ($qm$mq_formalismo$qm$, $qm$cuantica/formalismo$qm$, -0.9, 10,
   $qm$Sea $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$, con $|0\rangle$ y $|1\rangle$ ortonormales y $\alpha,\beta \in \mathbb{C}$. ¿Cuál es el bra correspondiente, $\langle\psi|$?$qm$,
   $qm$$\langle\psi| = \alpha\langle 0| + \beta\langle 1|$$qm$,
   $qm$$\langle\psi| = \alpha^{*}\langle 0| + \beta^{*}\langle 1|$$qm$,
   $qm$$\langle\psi| = |\alpha|\langle 0| + |\beta|\langle 1|$$qm$,
   $qm$$\langle\psi| = \beta^{*}\langle 0| + \alpha^{*}\langle 1|$$qm$,
   $qm$B$qm$,
   $qm$Falta la conjugación. La correspondencia ket $\to$ bra es **antilineal**: si $|\psi\rangle \to \langle\psi|$, entonces $\alpha|\psi\rangle \to \alpha^{*}\langle\psi|$. Sin eso, $\langle\psi|\psi\rangle$ podría salir complejo, y una norma no puede serlo.$qm$,
   $qm$Correcto. Con esto $\langle\psi|\psi\rangle = |\alpha|^2 + |\beta|^2$, real y no negativo, que es lo que hace del producto interno una norma legítima.$qm$,
   $qm$El módulo no es la conjugación: $|\alpha|$ pierde la fase de $\alpha$, y la fase **relativa** entre $\alpha$ y $\beta$ es física (es la que produce interferencia). Lo que corresponde es $\alpha^{*}$, que conserva esa información.$qm$,
   $qm$Los coeficientes también se intercambiaron. Pasar al bra conjuga cada coeficiente pero deja a cada uno con su vector: $\alpha$ acompaña a $\langle 0|$, no a $\langle 1|$.$qm$,
   $qm$mq/formalismo/bra-y-ket-intercambiables$qm$, null,
   $qm$mq/formalismo/producto-interno-sin-conjugar$qm$, null),

  ($qm$mq_formalismo$qm$, $qm$cuantica/formalismo$qm$, -0.4, 20,
   $qm$Un sistema está en $|\psi\rangle = 3|u_1\rangle - 4i|u_2\rangle$, con $|u_1\rangle, |u_2\rangle$ ortonormales y autovectores de un observable. ¿Cuál es la probabilidad de obtener el autovalor asociado a $|u_2\rangle$?$qm$,
   $qm$$16/25$$qm$,
   $qm$$4/7$$qm$,
   $qm$$16$$qm$,
   $qm$$-4i/5$$qm$,
   $qm$A$qm$,
   $qm$Correcto. $|{-4i}|^2 = 16$ y $\langle\psi|\psi\rangle = |3|^2 + |{-4i}|^2 = 9 + 16 = 25$, así que $P = 16/25 = 0{,}64$.$qm$,
   $qm$Se usaron las amplitudes ($3$ y $4$) en vez de sus cuadrados. La regla de Born pide $|c_n|^2$: con cuadrados el reparto es $9/25$ y $16/25$, no $3/7$ y $4/7$.$qm$,
   $qm$Falta normalizar. El estado dado no tiene norma 1: $\langle\psi|\psi\rangle = 25$. Una probabilidad nunca puede dar 16.$qm$,
   $qm$Una probabilidad es un número real entre 0 y 1, y esto es imaginario puro. El coeficiente no es la probabilidad: hay que tomar su módulo al cuadrado, que elimina la fase.$qm$,
   null, $qm$mq/medida/probabilidad-sin-modulo-cuadrado$qm$,
   $qm$mq/estados/normalizacion-omitida$qm$,
   $qm$mq/medida/probabilidad-sin-modulo-cuadrado$qm$),

  ($qm$mq_formalismo$qm$, $qm$cuantica/formalismo$qm$, 0.1, 30,
   $qm$¿Cuál de estos operadores puede representar un observable físico?$qm$,
   $qm$Un operador $U$ que cumple $U^{\dagger}U = I$.$qm$,
   $qm$Un operador $A$ que cumple $A^{\dagger} = A$.$qm$,
   $qm$El operador $a$ definido por $a|n\rangle = \sqrt{n}\,|n-1\rangle$.$qm$,
   $qm$Cualquier operador lineal: toda matriz tiene autovalores, y esos son los resultados posibles.$qm$,
   $qm$B$qm$,
   $qm$Esa es la condición de **unitariedad**, que caracteriza a las evoluciones temporales y a los cambios de base, no a los observables. Un operador unitario puede tener autovalores complejos de módulo 1, y un resultado de medición tiene que ser real.$qm$,
   $qm$Correcto. La hermiticidad garantiza las dos cosas que un observable necesita: autovalores reales y autovectores ortogonales que forman una base.$qm$,
   $qm$Ese es el operador de aniquilación del oscilador, y **no** es hermítico: su adjunto es $a^{\dagger}$, que sube el nivel en vez de bajarlo. El observable asociado es $N = a^{\dagger}a$, que sí lo es.$qm$,
   $qm$Tener autovalores no alcanza: hay que exigir que sean **reales** y que los autovectores formen una base ortonormal, y eso solo lo garantiza $A^{\dagger}=A$.$qm$,
   $qm$mq/formalismo/operador-hermitico-vs-unitario$qm$, null,
   $qm$mq/oscilador/escalera-hermitica$qm$,
   $qm$mq/formalismo/autovalores-complejos-observable$qm$),

  ($qm$mq_formalismo$qm$, $qm$cuantica/formalismo$qm$, 0.6, 40,
   $qm$Para una base ortonormal completa $\{|u_n\rangle\}$, ¿cuál expresión es la **relación de cierre** (completitud)?$qm$,
   $qm$$\sum_n \langle u_n|u_n\rangle = 1$$qm$,
   $qm$$\sum_n |u_n\rangle\langle u_n| = I$$qm$,
   $qm$$\langle u_n|u_m\rangle = \delta_{nm}$$qm$,
   $qm$$\sum_n |u_n\rangle |u_n\rangle = I$$qm$,
   $qm$B$qm$,
   $qm$Eso ni siquiera es cierto: cada término vale 1, así que la suma da el número de elementos de la base, no 1. Confunde normalización con completitud.$qm$,
   $qm$Correcto. Es la identidad más útil del formalismo: insertarla en cualquier punto de una expresión es lo que permite pasar de la notación abstracta a componentes, $|\psi\rangle = \sum_n |u_n\rangle\langle u_n|\psi\rangle$.$qm$,
   $qm$Eso es **ortonormalidad**, que es una condición distinta: dice que los vectores son unitarios y perpendiculares entre sí, pero no que sean suficientes para expandir cualquier estado. Un subconjunto de una base también la cumple.$qm$,
   $qm$Dos kets uno al lado del otro no forman un operador (a lo sumo un estado de un espacio producto). Un operador de proyección necesita la estructura ket-bra: $|u_n\rangle\langle u_n|$.$qm$,
   $qm$mq/formalismo/base-incompleta$qm$, null,
   $qm$mq/formalismo/base-incompleta$qm$,
   $qm$mq/formalismo/bra-y-ket-intercambiables$qm$),

  ($qm$mq_formalismo$qm$, $qm$cuantica/formalismo$qm$, 1.1, 50,
   $qm$Sea $P = |u\rangle\langle u|$ con $\langle u|u\rangle = 1$. ¿Cuál afirmación es verdadera?$qm$,
   $qm$$P^{2} = P$ y $P^{\dagger} = P$: es un proyector ortogonal.$qm$,
   $qm$$P$ es unitario, porque $\langle u|u\rangle = 1$.$qm$,
   $qm$$P$ no es un operador sino un número, por ser producto de un bra y un ket.$qm$,
   $qm$$P^{2} = 0$, salvo que $|u\rangle$ sea autovector de $P$.$qm$,
   $qm$A$qm$,
   $qm$Correcto. $P^2 = |u\rangle\langle u|u\rangle\langle u| = |u\rangle\langle u| = P$ usando $\langle u|u\rangle = 1$, y es hermítico por construcción. Sus autovalores son 1 (sobre $|u\rangle$) y 0 (sobre todo lo ortogonal), como corresponde a un "sí/no".$qm$,
   $qm$Un proyector no es unitario: aniquila todo el subespacio ortogonal a $|u\rangle$, y un operador unitario preserva la norma de **todos** los vectores. De hecho $P$ no es invertible.$qm$,
   $qm$El orden importa. $\langle u|u\rangle$ (bra-ket) es un número; $|u\rangle\langle u|$ (ket-bra) es un operador, porque aplicado a un ket devuelve un ket: $P|\psi\rangle = |u\rangle\,\langle u|\psi\rangle$.$qm$,
   $qm$$|u\rangle$ **es** autovector de $P$, con autovalor 1: $P|u\rangle = |u\rangle\langle u|u\rangle = |u\rangle$. Y $P^2 = P \neq 0$.$qm$,
   null, $qm$mq/formalismo/operador-hermitico-vs-unitario$qm$,
   $qm$mq/formalismo/bra-y-ket-intercambiables$qm$, null),

  ($qm$mq_formalismo$qm$, $qm$cuantica/formalismo$qm$, 1.5, 60,
   $qm$Un subsistema A tiene espacio de estados de dimensión 2 y uno B de dimensión 3. ¿Cuál es la dimensión del espacio de estados del sistema conjunto?$qm$,
   $qm$5$qm$,
   $qm$6$qm$,
   $qm$3, la del subsistema más grande$qm$,
   $qm$6 si están entrelazados, 5 si no$qm$,
   $qm$B$qm$,
   $qm$Se sumaron las dimensiones. Eso corresponde a la **suma directa** $\mathcal{H}_A \oplus \mathcal{H}_B$, que describe "el sistema es A o es B". Componer dos subsistemas que coexisten es un **producto tensorial**, y ahí las dimensiones se multiplican.$qm$,
   $qm$Correcto. $\dim(\mathcal{H}_A \otimes \mathcal{H}_B) = 2 \times 3 = 6$: una base es $\{|a_i\rangle \otimes |b_j\rangle\}$ con $i=1,2$ y $j=1,2,3$.$qm$,
   $qm$El subsistema B no determina a A. Los estados conjuntos incluyen todas las combinaciones de un estado de A con uno de B, y encima sus superposiciones.$qm$,
   $qm$El entrelazamiento no cambia la dimensión del espacio: es una propiedad de **algunos vectores** dentro de él. El espacio tiene dimensión 6 siempre, y los estados producto son un subconjunto (de medida nula) de sus vectores.$qm$,
   $qm$mq/suma/dimension-como-suma$qm$, null, null,
   $qm$mq/suma/dimension-como-suma$qm$),

  ($qm$mq_formalismo$qm$, $qm$cuantica/formalismo$qm$, 1.9, 70,
   $qm$Dos observables $A$ y $B$ cumplen $[A,B] = 0$, y el espectro de $A$ no es degenerado. ¿Qué se sigue?$qm$,
   $qm$Que $A$ y $B$ son el mismo operador salvo una constante multiplicativa.$qm$,
   $qm$Que existe una base ortonormal formada por autovectores comunes a $A$ y $B$.$qm$,
   $qm$Que medir $A$ y medir $B$ dan siempre el mismo número.$qm$,
   $qm$Que igual no pueden medirse ambos con precisión arbitraria: eso lo impide la relación de incertidumbre.$qm$,
   $qm$B$qm$,
   $qm$Conmutar es mucho más débil que ser proporcionales. $H$ conmuta con $L^2$ en un potencial central y no es proporcional a él; hasta la identidad conmuta con todo.$qm$,
   $qm$Correcto. Es el teorema que sostiene todo el uso de conjuntos completos de observables compatibles: si $A|a\rangle = a|a\rangle$ y $[A,B]=0$, entonces $B|a\rangle$ también es autovector de $A$ con autovalor $a$, y sin degeneración eso obliga a que $B|a\rangle \propto |a\rangle$.$qm$,
   $qm$Comparten autovectores, no autovalores. Sobre el mismo estado común $|a,b\rangle$, medir $A$ da $a$ y medir $B$ da $b$, y no hay ninguna razón para que $a = b$.$qm$,
   $qm$La cota de Robertson es $\Delta A\,\Delta B \geq \frac{1}{2}|\langle [A,B]\rangle|$. Con $[A,B]=0$ el lado derecho es cero: la desigualdad no prohíbe nada, y ese es exactamente el sentido de que sean compatibles.$qm$,
   null, null, null,
   $qm$mq/incertidumbre/compatibles-sin-conmutar$qm$),

  ($qm$mq_formalismo$qm$, $qm$cuantica/formalismo$qm$, 2.3, 80,
   $qm$¿Por qué el autoestado de posición $|x\rangle$ no representa un estado físico realizable?$qm$,
   $qm$Porque la posición no es un observable en mecánica cuántica.$qm$,
   $qm$Porque el operador $X$ no es hermítico cuando el espectro es continuo.$qm$,
   $qm$Porque no es normalizable: $\langle x|x'\rangle = \delta(x-x')$, y para $x = x'$ eso no es un número finito.$qm$,
   $qm$Porque el espectro de $X$ es en realidad discreto, y $|x\rangle$ supone lo contrario.$qm$,
   $qm$C$qm$,
   $qm$La posición sí es un observable, y de los más básicos. El problema no es el operador sino sus autovectores: pertenecen a un espacio más grande que el de Hilbert (distribuciones), y se usan como herramienta de cálculo, no como estados.$qm$,
   $qm$$X$ sí es hermítico (autoadjunto, con el cuidado de dominio que exige el caso continuo). Sus autovalores son reales: son las posiciones.$qm$,
   $qm$Correcto. Un estado físico tiene norma finita, y $|x\rangle$ no la tiene. Se lo usa como base generalizada -- de ahí sale $\psi(x) = \langle x|\psi\rangle$ -- pero un estado real es siempre un paquete con cierta extensión.$qm$,
   $qm$El espectro de la posición es continuo: una partícula libre puede estar en cualquier punto. La cuantización aparece por confinamiento y condiciones de contorno, no como propiedad universal de todo observable.$qm$,
   null, $qm$mq/formalismo/operador-hermitico-vs-unitario$qm$, null,
   $qm$mq/origenes/cuantizacion-es-discretizar-todo$qm$),

  -- ===========================================================================
  -- mq_postulados · Medida, regla de Born y proyección
  -- ===========================================================================

  ($qm$mq_postulados$qm$, $qm$cuantica/postulados$qm$, -1.0, 10,
   $qm$Un sistema está en $|\psi\rangle = \frac{1}{\sqrt{2}}(|a_1\rangle + |a_2\rangle)$, con $A|a_i\rangle = a_i|a_i\rangle$ y $a_1 \neq a_2$. Se mide $A$ y se obtiene $a_1$. Se mide $A$ **de inmediato** otra vez. ¿Qué se obtiene?$qm$,
   $qm$$a_1$ con certeza.$qm$,
   $qm$$a_1$ o $a_2$ con probabilidad $1/2$ cada uno, igual que la primera vez.$qm$,
   $qm$El promedio $(a_1+a_2)/2$.$qm$,
   $qm$$a_2$ con certeza: la primera medición ya "consumió" $a_1$.$qm$,
   $qm$A$qm$,
   $qm$Correcto. Es el postulado de proyección: tras obtener $a_1$ el estado **es** $|a_1\rangle$, y una medición inmediata de $A$ lo encuentra ahí con probabilidad 1. Sin esto ninguna medición sería reproducible.$qm$,
   $qm$Esas eran las probabilidades del estado **anterior** a la medición. Medir no es leer un valor preexistente sin tocar nada: reprepara el estado en el autovector correspondiente al resultado.$qm$,
   $qm$El promedio $(a_1+a_2)/2$ es el valor esperado de $A$ en el estado inicial, y en general no es ninguno de los resultados posibles. Una medición individual siempre entrega un autovalor.$qm$,
   $qm$Nada se consume. El postulado de proyección dice justo lo contrario: el resultado se **repite**, porque el estado quedó preparado en $|a_1\rangle$.$qm$,
   null, $qm$mq/medida/segunda-medida-vuelve-a-azar$qm$,
   $qm$mq/medida/valor-esperado-es-un-resultado$qm$,
   $qm$mq/medida/segunda-medida-vuelve-a-azar$qm$),

  ($qm$mq_postulados$qm$, $qm$cuantica/postulados$qm$, -0.5, 20,
   $qm$¿Qué diferencia hay entre los estados $|\psi_1\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$ y $|\psi_2\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)$?$qm$,
   $qm$Ninguna: difieren en una fase, y las fases no son observables.$qm$,
   $qm$Difieren en una fase **relativa**, que es observable: son ortogonales entre sí y se distinguen midiendo en la base adecuada.$qm$,
   $qm$Difieren solo en el signo de la probabilidad de medir $|1\rangle$.$qm$,
   $qm$$|\psi_2\rangle$ no es un estado válido, porque una amplitud negativa no da probabilidad positiva.$qm$,
   $qm$B$qm$,
   $qm$Lo que no es observable es la fase **global**: $|\psi\rangle$ y $e^{i\theta}|\psi\rangle$ son el mismo estado. Acá la fase afecta a un solo término, así que es relativa, y $\langle\psi_1|\psi_2\rangle = 0$ lo demuestra: son perfectamente distinguibles.$qm$,
   $qm$Correcto. Medir en la base $\{|0\rangle, |1\rangle\}$ da $1/2$ y $1/2$ para ambos, pero en la base $\{|\psi_1\rangle, |\psi_2\rangle\}$ se distinguen con certeza. La fase relativa es exactamente lo que produce interferencia.$qm$,
   $qm$Las probabilidades no tienen signo: $|-1/\sqrt{2}|^2 = 1/2$, igual que $|+1/\sqrt{2}|^2$. La diferencia entre ambos estados no aparece en esa base, y sí en otras.$qm$,
   $qm$Es válido y está normalizado: $|1/\sqrt{2}|^2 + |-1/\sqrt{2}|^2 = 1$. Las **amplitudes** pueden ser negativas o complejas; lo que debe ser positivo es su módulo al cuadrado.$qm$,
   $qm$mq/estados/fase-global-observable$qm$, null,
   $qm$mq/medida/probabilidad-sin-modulo-cuadrado$qm$,
   $qm$mq/medida/probabilidad-sin-modulo-cuadrado$qm$),

  ($qm$mq_postulados$qm$, $qm$cuantica/postulados$qm$, 0.0, 30,
   $qm$Un observable $A$ tiene autovalores $+1$ y $-1$. En cierto estado, $\langle A \rangle = 0{,}6$. ¿Qué significa?$qm$,
   $qm$Que una medición individual puede dar $0{,}6$.$qm$,
   $qm$Que el promedio de muchas mediciones sobre estados idénticamente preparados tiende a $0{,}6$; cada medición da $+1$ o $-1$.$qm$,
   $qm$Que el estado está a un $60\,\%$ del autovalor $+1$.$qm$,
   $qm$Que la probabilidad de medir $+1$ es $0{,}6$.$qm$,
   $qm$B$qm$,
   $qm$Los resultados posibles de una medición son los **autovalores**, y acá son solo $+1$ y $-1$. Ningún experimento individual entrega $0{,}6$; el valor esperado no pertenece al espectro salvo casualidad.$qm$,
   $qm$Correcto. $\langle A\rangle = (+1)P_+ + (-1)P_-$, y con $P_+ + P_- = 1$ eso da $P_+ = 0{,}8$ y $P_- = 0{,}2$. Es una estadística sobre un ensemble, no una propiedad de un sistema individual.$qm$,
   $qm$No hay "porcentaje de autovalor": los resultados son discretos. Lo que hay es una distribución de probabilidad sobre $\{+1,-1\}$ cuyo promedio da $0{,}6$.$qm$,
   $qm$Casi, pero no: si $P_+$ fuera $0{,}6$, entonces $\langle A\rangle = 0{,}6 - 0{,}4 = 0{,}2$. Resolviendo bien, $P_+ = 0{,}8$.$qm$,
   $qm$mq/medida/valor-esperado-es-un-resultado$qm$, null,
   $qm$mq/medida/valor-esperado-es-un-resultado$qm$,
   $qm$mq/medida/probabilidad-sin-modulo-cuadrado$qm$),

  ($qm$mq_postulados$qm$, $qm$cuantica/postulados$qm$, 0.5, 40,
   $qm$Se prepara un haz donde la **mitad** de las partículas están en $|0\rangle$ y la otra mitad en $|1\rangle$ (mezcla estadística), y otro haz donde **todas** están en $\frac{1}{\sqrt 2}(|0\rangle+|1\rangle)$ (superposición). ¿Cómo se distinguen?$qm$,
   $qm$No se distinguen: ambos dan $50\,\%$ y $50\,\%$ al medir en la base $\{|0\rangle,|1\rangle\}$.$qm$,
   $qm$Midiendo en la base $\{|0\rangle,|1\rangle\}$, donde la superposición da siempre el mismo resultado.$qm$,
   $qm$Midiendo en otra base: en $\{\frac{|0\rangle\pm|1\rangle}{\sqrt2}\}$ la superposición da un resultado con certeza y la mezcla sigue dando mitad y mitad.$qm$,
   $qm$Son el mismo estado descrito con dos lenguajes distintos.$qm$,
   $qm$C$qm$,
   $qm$Coinciden en **esa** base, que es justamente lo que hace interesante la pregunta. La diferencia es real y aparece en cuanto se cambia de base: la superposición tiene coherencia y la mezcla no.$qm$,
   $qm$En esa base la superposición da $50/50$, igual que la mezcla. Es el caso en el que **no** se distinguen.$qm$,
   $qm$Correcto. La superposición es autoestado de esa base y da $+$ con certeza; la mezcla, al ser 50 % $|0\rangle$ y 50 % $|1\rangle$, y como cada uno de ellos da $50/50$ en esa base, sigue dando mitad y mitad. Ahí se ve la coherencia.$qm$,
   $qm$No son el mismo objeto: la superposición es un estado puro (un vector) y la mezcla no se puede escribir como vector, necesita una matriz densidad. La distinción es experimental, no de lenguaje.$qm$,
   null, null, null,
   $qm$mq/estados/superposicion-como-mezcla$qm$),

  ($qm$mq_postulados$qm$, $qm$cuantica/postulados$qm$, 1.0, 50,
   $qm$Un observable $B$ tiene el autovalor $b$ **doblemente degenerado**, con autovectores ortonormales $|b,1\rangle$ y $|b,2\rangle$. Si el estado es $|\psi\rangle$, ¿cuál es la probabilidad de medir $b$?$qm$,
   $qm$$|\langle b,1|\psi\rangle|^2$, tomando cualquiera de los dos autovectores.$qm$,
   $qm$$|\langle b,1|\psi\rangle + \langle b,2|\psi\rangle|^2$$qm$,
   $qm$$|\langle b,1|\psi\rangle|^2 + |\langle b,2|\psi\rangle|^2$$qm$,
   $qm$Cero, porque un autovalor degenerado no se puede medir de forma unívoca.$qm$,
   $qm$C$qm$,
   $qm$Eso deja fuera la mitad del subespacio. El resultado $b$ ocurre si el sistema cae en **cualquier** dirección del subespacio degenerado, no solo en una.$qm$,
   $qm$Sumar amplitudes antes de elevar al cuadrado introduce un término de interferencia entre dos alternativas **distinguibles** (son ortogonales), que no corresponde. La interferencia solo aparece entre caminos que llevan al mismo estado final.$qm$,
   $qm$Correcto. Es la regla de Born en su forma general, $P(b) = \langle\psi|P_b|\psi\rangle$ con $P_b = |b,1\rangle\langle b,1| + |b,2\rangle\langle b,2|$: se proyecta sobre todo el subespacio y se suman las **probabilidades**.$qm$,
   $qm$Se mide perfectamente: se obtiene $b$. Lo que la degeneración impide es saber en qué estado quedó el sistema dentro del subespacio, y para eso se necesita un segundo observable compatible.$qm$,
   $qm$mq/formalismo/base-incompleta$qm$,
   $qm$mq/estados/superposicion-como-mezcla$qm$, null, null),

  ($qm$mq_postulados$qm$, $qm$cuantica/postulados$qm$, 1.5, 60,
   $qm$¿En qué se diferencian la evolución temporal de Schrödinger y el proceso de medición?$qm$,
   $qm$En nada de fondo: la medición es una evolución de Schrödinger con un Hamiltoniano de interacción complicado.$qm$,
   $qm$La evolución es unitaria, determinista y reversible; la medición es probabilística y no unitaria (proyecta el estado).$qm$,
   $qm$La evolución es probabilística y la medición determinista, porque entrega un resultado concreto.$qm$,
   $qm$Se diferencian solo en la escala de tiempo: la medición es una evolución muy rápida.$qm$,
   $qm$B$qm$,
   $qm$Ese es precisamente el problema de la medición, y decirlo así se salta la dificultad: una evolución unitaria del sistema más el aparato produce un estado **entrelazado**, no un resultado único. De ahí no sale, sin agregar algo, el colapso a un solo autovalor.$qm$,
   $qm$Correcto. Son los dos postulados dinámicos de la teoría, y son de naturaleza distinta. Que convivan dos reglas de evolución tan diferentes es lo que mantiene abierto el problema de la medición desde 1932 (von Neumann).$qm$,
   $qm$Está invertido. La ecuación de Schrödinger es determinista: dado $|\psi(0)\rangle$, queda fijado $|\psi(t)\rangle$. Lo probabilístico es qué resultado arroja la medición.$qm$,
   $qm$No es cuestión de velocidad. Una evolución unitaria, por rápida que sea, preserva la norma y es invertible; la proyección de la medida no lo es, y ahí es donde se pierde información.$qm$,
   $qm$mq/medida/colapso-reversible$qm$, null, null,
   $qm$mq/medida/colapso-reversible$qm$),

  ($qm$mq_postulados$qm$, $qm$cuantica/postulados$qm$, 2.0, 70,
   $qm$El estado $|\psi\rangle = \frac{1}{\sqrt{3}}|a_1\rangle + \sqrt{\frac{2}{3}}\,e^{i\varphi}|a_2\rangle$ depende de una fase $\varphi$. ¿Cómo afectan las probabilidades de medir $A$ al variar $\varphi$?$qm$,
   $qm$No cambian, porque $|e^{i\varphi}|=1$; pero sí cambian las de medir un observable que no conmute con $A$.$qm$,
   $qm$Cambian, porque $\varphi$ modifica la interferencia entre los dos términos.$qm$,
   $qm$No cambian nunca, para ningún observable: una fase no tiene efecto físico.$qm$,
   $qm$No están definidas hasta fijar $\varphi$, porque el estado no está completamente especificado.$qm$,
   $qm$A$qm$,
   $qm$Correcto. En la base propia de $A$ la fase relativa no aparece ($|c_i|^2$ la borra), pero no es una fase global: medir $B$ con $[A,B]\neq 0$ obliga a reexpresar el estado en otra base, y ahí los términos cruzados dependen de $\varphi$.$qm$,
   $qm$Para las probabilidades **de $A$** no hay interferencia posible: los $|a_i\rangle$ son ortogonales y $P_i = |c_i|^2$ elimina la fase. La interferencia aparece al medir en otra base.$qm$,
   $qm$Es la confusión entre fase global y relativa. Una fase global (un $e^{i\theta}$ multiplicando todo el estado) no tiene efecto; una fase relativa entre términos sí, y se detecta cambiando de base.$qm$,
   $qm$El estado está completamente especificado para cada $\varphi$, y las probabilidades de $A$ salen $1/3$ y $2/3$ sea cual sea su valor.$qm$,
   null, $qm$mq/estados/fase-global-observable$qm$,
   $qm$mq/estados/fase-global-observable$qm$, null),

  ($qm$mq_postulados$qm$, $qm$cuantica/postulados$qm$, 2.4, 80,
   $qm$Se mide $A$ sobre $|\psi\rangle$ y se obtiene $a_1$. ¿Cuál es el estado inmediatamente después, si $a_1$ es degenerado con subespacio propio $\mathcal{E}_1$ y proyector $P_1$?$qm$,
   $qm$$|a_1\rangle$, el primer autovector de la base de $\mathcal{E}_1$.$qm$,
   $qm$$P_1|\psi\rangle$, sin normalizar.$qm$,
   $qm$$\dfrac{P_1|\psi\rangle}{\sqrt{\langle\psi|P_1|\psi\rangle}}$$qm$,
   $qm$El mismo $|\psi\rangle$: la medición reveló un valor que ya estaba ahí.$qm$,
   $qm$C$qm$,
   $qm$La medición no elige un vector dentro del subespacio degenerado: proyecta sobre él y conserva la "dirección" que traía el estado. Colapsar a un autovector particular exige medir un segundo observable compatible que lo distinga.$qm$,
   $qm$Está en la dirección correcta, pero un estado físico debe tener norma 1, y $\|P_1|\psi\rangle\|^2 = \langle\psi|P_1|\psi\rangle = P(a_1) < 1$ en general.$qm$,
   $qm$Correcto. Es la regla de proyección de von Neumann-Lüders: proyectar sobre el subespacio del autovalor obtenido y renormalizar dividiendo por la raíz de la probabilidad de ese resultado.$qm$,
   $qm$Si el estado no cambiara, medir dos veces seguidas podría dar resultados distintos, y eso no se observa. Además, si $|\psi\rangle$ no era autovector, el valor no "estaba ahí" antes.$qm$,
   $qm$mq/formalismo/base-incompleta$qm$,
   $qm$mq/estados/normalizacion-omitida$qm$, null,
   $qm$mq/medida/colapso-reversible$qm$),

  -- ===========================================================================
  -- mq_incertidumbre · Conmutadores y compatibilidad
  -- ===========================================================================

  ($qm$mq_incertidumbre$qm$, $qm$cuantica/incertidumbre$qm$, -1.1, 10,
   $qm$¿Cuánto vale el conmutador canónico $[\hat{X},\hat{P}]$?$qm$,
   $qm$$0$$qm$,
   $qm$$i\hbar$$qm$,
   $qm$$\hbar$$qm$,
   $qm$$-i\hbar$$qm$,
   $qm$B$qm$,
   $qm$Si conmutaran, existiría una base común de autovectores y podrían tener valores definidos simultáneamente: no habría relación de incertidumbre. Todo el contenido no clásico de la teoría está en que esto **no** es cero.$qm$,
   $qm$Correcto. $[\hat X,\hat P] = i\hbar$, y de ahí sale por Robertson $\Delta x\,\Delta p \geq \frac{1}{2}|\langle[\hat X,\hat P]\rangle| = \hbar/2$.$qm$,
   $qm$Falta la unidad imaginaria. Es necesaria: $\hat X$ y $\hat P$ son hermíticos, y el conmutador de dos hermíticos es **antihermítico**, así que debe ser $i$ por algo real.$qm$,
   $qm$Ese es $[\hat P,\hat X]$. El conmutador es antisimétrico: $[A,B] = -[B,A]$, así que el orden fija el signo.$qm$,
   $qm$mq/conmutadores/canonico-sin-i$qm$, null,
   $qm$mq/conmutadores/canonico-sin-i$qm$,
   $qm$mq/conmutadores/signo-al-invertir$qm$),

  ($qm$mq_incertidumbre$qm$, $qm$cuantica/incertidumbre$qm$, -0.6, 20,
   $qm$¿Cuál es la interpretación correcta de $\Delta x\,\Delta p \geq \hbar/2$?$qm$,
   $qm$Que todo instrumento perturba lo que mide, y por eso no podemos conocer ambas magnitudes.$qm$,
   $qm$Que ningún estado cuántico tiene a la vez posición y momentum bien definidos: es una propiedad del estado, no del aparato.$qm$,
   $qm$Que si medimos la posición con mucha precisión, el momentum cambia de valor bruscamente.$qm$,
   $qm$Que hay un límite tecnológico que en el futuro podría superarse con mejores detectores.$qm$,
   $qm$B$qm$,
   $qm$Es la explicación del microscopio de Heisenberg (1927), pedagógica pero engañosa: $\Delta x$ y $\Delta p$ son **desviaciones estándar del estado**, calculables sin mencionar ningún aparato. La deducción de Robertson (1929) sale del conmutador y de la desigualdad de Cauchy-Schwarz, no de la física de la medición.$qm$,
   $qm$Correcto. Son dispersiones estadísticas sobre un ensemble de sistemas idénticamente preparados. Cada medición individual puede ser tan precisa como se quiera; lo que no existe es un estado que dé ambas distribuciones angostas a la vez.$qm$,
   $qm$Medir la posición sí reprepara el estado, pero eso no es lo que dice la desigualdad: la relación vale para un estado dado, **antes** de medir nada, y sigue valiendo aunque no se mida nunca.$qm$,
   $qm$No es una limitación instrumental sino una consecuencia matemática de $[\hat X,\hat P] = i\hbar$. Superarla exigiría cambiar la teoría, no el detector.$qm$,
   $qm$mq/incertidumbre/es-limitacion-del-aparato$qm$, null,
   $qm$mq/incertidumbre/es-limitacion-del-aparato$qm$,
   $qm$mq/incertidumbre/es-limitacion-del-aparato$qm$),

  ($qm$mq_incertidumbre$qm$, $qm$cuantica/incertidumbre$qm$, -0.1, 30,
   $qm$Usando $[A,BC] = [A,B]C + B[A,C]$, ¿cuánto vale $[\hat X, \hat P^2]$?$qm$,
   $qm$$2i\hbar \hat{P}$$qm$,
   $qm$$i\hbar \hat{P}$$qm$,
   $qm$$0$, porque $\hat P$ conmuta consigo mismo.$qm$,
   $qm$$(i\hbar)^2 = -\hbar^2$$qm$,
   $qm$A$qm$,
   $qm$Correcto. $[\hat X,\hat P\hat P] = [\hat X,\hat P]\hat P + \hat P[\hat X,\hat P] = i\hbar\hat P + \hat P\,i\hbar = 2i\hbar\hat P$, porque $i\hbar$ es un número y conmuta con todo.$qm$,
   $qm$Solo se contó un término de la regla del producto. La expansión genera **dos** sumandos, y como en este caso ambos dan lo mismo, el resultado lleva un factor 2.$qm$,
   $qm$$\hat P$ conmuta consigo mismo, pero el conmutador es con $\hat X$, no con $\hat P$. Que $\hat P^2$ sea una potencia de $\hat P$ no lo hace conmutar con otros operadores.$qm$,
   $qm$Se multiplicaron los dos conmutadores en vez de aplicar la regla del producto. $[A,BC] \neq [A,B][A,C]$: la expansión es una suma, y cada término conserva el operador que no participa.$qm$,
   null, $qm$mq/conmutadores/regla-del-producto-mal$qm$,
   $qm$mq/conmutadores/asume-conmutatividad$qm$,
   $qm$mq/conmutadores/regla-del-producto-mal$qm$),

  ($qm$mq_incertidumbre$qm$, $qm$cuantica/incertidumbre$qm$, 0.4, 40,
   $qm$¿Cuál de estas identidades de conmutadores es **falsa**?$qm$,
   $qm$$[A,B] = -[B,A]$$qm$,
   $qm$$[A,B+C] = [A,B] + [A,C]$$qm$,
   $qm$$[AB,C] = A[B,C] + [A,C]B$$qm$,
   $qm$$[AB,C] = [A,C][B,C]$$qm$,
   $qm$D$qm$,
   $qm$Es verdadera: la antisimetría sale directo de la definición $[A,B] = AB - BA$, y es la que hace que todo operador conmute consigo mismo.$qm$,
   $qm$Es verdadera: el conmutador es bilineal, y por eso se puede distribuir sobre sumas. Es lo que permite partir $[L_i, L_{1j}+L_{2j}]$ en dos.$qm$,
   $qm$Es verdadera: es la regla del producto, con cuidado de mantener a cada operador **del lado donde estaba**. Ese detalle importa porque los factores no conmutan.$qm$,
   $qm$Correcto: esta es la falsa. El conmutador no es multiplicativo. Basta un contraejemplo: con $A=B=\hat X$ y $C=\hat P$, el lado izquierdo da $2i\hbar\hat X$ y el derecho $(i\hbar)^2 = -\hbar^2$.$qm$,
   null, null, null, null),

  ($qm$mq_incertidumbre$qm$, $qm$cuantica/incertidumbre$qm$, 0.9, 50,
   $qm$Sea $[A,B] = i\hbar C$ con $A,B,C$ hermíticos. ¿Cuál es la relación de incertidumbre generalizada (Robertson)?$qm$,
   $qm$$\Delta A\,\Delta B \geq \hbar$$qm$,
   $qm$$\Delta A\,\Delta B \geq \frac{1}{2}\big|\langle [A,B]\rangle\big| = \frac{\hbar}{2}|\langle C\rangle|$$qm$,
   $qm$$\Delta A\,\Delta B \geq \frac{\hbar}{2}$, siempre y para cualquier par.$qm$,
   $qm$$\Delta A\,\Delta B \geq \langle [A,B]\rangle$$qm$,
   $qm$B$qm$,
   $qm$El factor está mal y falta la dependencia del estado. La cota es $\frac{1}{2}|\langle[A,B]\rangle|$: con $A=\hat X$, $B=\hat P$ da $\hbar/2$, no $\hbar$.$qm$,
   $qm$Correcto. La cota depende del **estado**, a través de $\langle C\rangle$: para pares como $L_x, L_y$ puede incluso anularse en ciertos estados (por ejemplo si $\langle L_z\rangle = 0$), y ahí la desigualdad no prohíbe nada.$qm$,
   $qm$El $\hbar/2$ es el caso particular $[\hat X,\hat P]=i\hbar$, donde el conmutador es un número y su valor esperado no depende del estado. En general la cota varía con el estado.$qm$,
   $qm$El lado derecho tiene que ser real y no negativo, y $\langle[A,B]\rangle$ es imaginario puro cuando $A$ y $B$ son hermíticos. De ahí el módulo y el factor $1/2$.$qm$,
   $qm$mq/incertidumbre/factor-numerico$qm$, null,
   $qm$mq/incertidumbre/factor-numerico$qm$,
   $qm$mq/formalismo/autovalores-complejos-observable$qm$),

  ($qm$mq_incertidumbre$qm$, $qm$cuantica/incertidumbre$qm$, 1.3, 60,
   $qm$¿Por qué el estado fundamental de un electrón en un átomo no puede tener energía arbitrariamente baja "cayendo" al núcleo?$qm$,
   $qm$Porque el núcleo lo repele a distancias cortas por la fuerza nuclear fuerte.$qm$,
   $qm$Porque confinarlo en $\Delta x$ pequeño obliga a $\Delta p \gtrsim \hbar/(2\Delta x)$, y la energía cinética asociada crece más rápido de lo que baja la potencial.$qm$,
   $qm$Porque el principio de exclusión de Pauli se lo impide.$qm$,
   $qm$Porque perdería energía por radiación hasta detenerse, y un electrón en reposo no puede caer.$qm$,
   $qm$B$qm$,
   $qm$La fuerza fuerte no actúa sobre electrones (no tienen carga de color), y el radio de Bohr es cinco órdenes de magnitud mayor que el núcleo: el electrón ni se acerca a esa escala.$qm$,
   $qm$Correcto. Es el argumento de estabilidad: $E \sim \frac{\hbar^2}{2m(\Delta x)^2} - \frac{e^2}{4\pi\epsilon_0 \Delta x}$. El primer término va como $1/(\Delta x)^2$ y el segundo como $1/\Delta x$, así que hay un mínimo a distancia finita -- que da, con los números, el radio de Bohr.$qm$,
   $qm$Pauli explica por qué no todos los electrones de un átomo con muchos electrones ocupan el nivel más bajo, pero no dice nada del hidrógeno, con un solo electrón, que igual es estable.$qm$,
   $qm$Ese es justamente el problema **clásico** del átomo: una carga acelerada radia y colapsaría en $10^{-11}$ s. La mecánica cuántica lo resuelve, no lo confirma: el estado fundamental no radia.$qm$,
   null, null, null,
   $qm$mq/origenes/bohr-como-teoria-vigente$qm$),

  ($qm$mq_incertidumbre$qm$, $qm$cuantica/incertidumbre$qm$, 1.8, 70,
   $qm$¿Cuál de estos conjuntos de observables **no** es compatible (no puede tener autovectores comunes)?$qm$,
   $qm$$\{H, L^2, L_z\}$ en un potencial central.$qm$,
   $qm$$\{L^2, L_x\}$$qm$,
   $qm$$\{L_x, L_y\}$$qm$,
   $qm$$\{\hat X, \hat P_y\}$$qm$,
   $qm$C$qm$,
   $qm$Sí es compatible: en un potencial central $[H,L^2]=[H,L_z]=[L^2,L_z]=0$, y ese trío es precisamente el conjunto completo que etiqueta los estados como $|n,l,m\rangle$.$qm$,
   $qm$Sí es compatible: $L^2$ conmuta con **todas** las componentes de $\vec L$, no solo con $L_z$. Elegir $z$ es una convención; con $L_x$ el álgebra funciona igual.$qm$,
   $qm$Correcto: $[L_x,L_y] = i\hbar L_z \neq 0$. Dos componentes distintas del momento angular no admiten base común de autovectores (salvo el caso trivial $l=0$), y por eso se elige **una sola** dirección para etiquetar los estados.$qm$,
   $qm$Sí es compatible: $[\hat X,\hat P_y]=0$ porque son de ejes distintos. La relación canónica solo vale para el mismo eje: $[\hat X_i,\hat P_j]=i\hbar\delta_{ij}$.$qm$,
   null, $qm$mq/momento-angular/l2-no-conmuta-con-lz$qm$, null,
   $qm$mq/conmutadores/canonico-sin-i$qm$),

  ($qm$mq_incertidumbre$qm$, $qm$cuantica/incertidumbre$qm$, 2.2, 80,
   $qm$Si $[A,H] = 0$ y $A$ no depende explícitamente del tiempo, ¿qué se concluye?$qm$,
   $qm$Que $\langle A\rangle$ es constante en el tiempo: $A$ es una constante de movimiento.$qm$,
   $qm$Que $A$ y $H$ tienen los mismos autovalores.$qm$,
   $qm$Que el estado del sistema no evoluciona.$qm$,
   $qm$Que $A$ es proporcional a la identidad.$qm$,
   $qm$A$qm$,
   $qm$Correcto. Por el teorema de Ehrenfest, $\frac{d\langle A\rangle}{dt} = \frac{1}{i\hbar}\langle[A,H]\rangle + \langle\partial_t A\rangle$, y ambos términos se anulan. Es el análogo cuántico de Noether: $[L_i,P^2]=0$ para la partícula libre es exactamente esto.$qm$,
   $qm$Comparten autovectores, no autovalores. Los autovalores de $A$ y de $H$ son magnitudes distintas (con unidades distintas, incluso).$qm$,
   $qm$El estado sí evoluciona: lo que no cambia es el valor esperado de $A$ y la distribución de probabilidad de sus resultados. Un estado que no evoluciona necesita ser autoestado de $H$, no de $A$.$qm$,
   $qm$Muchísimos operadores conmutan con $H$ sin ser triviales: en un potencial central, $L^2$ y $L_z$ lo hacen, y son los que dan los números cuánticos buenos.$qm$,
   null, null, $qm$mq/schrodinger/estacionario-es-inmovil$qm$, null),

  -- ===========================================================================
  -- mq_schrodinger · Evolución temporal
  -- ===========================================================================

  ($qm$mq_schrodinger$qm$, $qm$cuantica/schrodinger$qm$, -0.8, 10,
   $qm$Si $|\psi(0)\rangle = |E_n\rangle$ es autoestado de $H$ con autovalor $E_n$, ¿cómo evoluciona?$qm$,
   $qm$$|\psi(t)\rangle = |E_n\rangle$: no cambia en absoluto.$qm$,
   $qm$$|\psi(t)\rangle = e^{-iE_n t/\hbar}|E_n\rangle$: cambia solo en una fase global, así que ningún observable cambia.$qm$,
   $qm$$|\psi(t)\rangle = e^{-E_n t/\hbar}|E_n\rangle$: decae exponencialmente.$qm$,
   $qm$Deja de ser autoestado de $H$ apenas empieza a evolucionar.$qm$,
   $qm$B$qm$,
   $qm$Casi: el vector sí cambia, adquiere la fase $e^{-iE_nt/\hbar}$. Lo que no cambia es ninguna predicción física, porque es una fase **global**. Decir "no cambia en absoluto" pierde de vista de dónde sale la frecuencia de Bohr al superponer dos niveles.$qm$,
   $qm$Correcto. Por eso se llaman estados **estacionarios**: la densidad $|\psi(x,t)|^2$ y todos los valores esperados son independientes del tiempo, aunque el vector de estado gire en el espacio de Hilbert.$qm$,
   $qm$Falta la $i$. Sin ella la evolución no sería unitaria y la norma decaería, o sea la partícula desaparecería. La $i$ de la ecuación de Schrödinger es la que convierte un decaimiento en una rotación de fase.$qm$,
   $qm$Sigue siendo autoestado de $H$ para siempre. Como $[H,H]=0$, la energía es una constante de movimiento; la evolución solo multiplica por un número de módulo 1.$qm$,
   $qm$mq/schrodinger/estacionario-es-inmovil$qm$, null, null,
   $qm$mq/schrodinger/evolucion-de-probabilidades-fijas$qm$),

  ($qm$mq_schrodinger$qm$, $qm$cuantica/schrodinger$qm$, -0.2, 20,
   $qm$El estado es $|\psi(0)\rangle = \frac{1}{\sqrt2}(|E_1\rangle + |E_2\rangle)$ con $E_1 \neq E_2$. ¿Qué se puede decir de la energía del sistema?$qm$,
   $qm$Vale $(E_1+E_2)/2$, el promedio de las dos.$qm$,
   $qm$No tiene un valor definido: una medición da $E_1$ o $E_2$, cada uno con probabilidad $1/2$, y esas probabilidades no cambian con el tiempo.$qm$,
   $qm$No tiene valor definido, y además las probabilidades oscilan con el tiempo.$qm$,
   $qm$Vale $E_1 + E_2$, porque las energías se suman.$qm$,
   $qm$B$qm$,
   $qm$$(E_1+E_2)/2$ es el valor **esperado**, no la energía del sistema. Ninguna medición individual dará ese número si no coincide con $E_1$ o $E_2$.$qm$,
   $qm$Correcto. Cada término evoluciona con su propia fase $e^{-iE_kt/\hbar}$, así que los módulos $|c_k|$ quedan fijos: la distribución de energías es una constante de movimiento. Lo que sí evoluciona es la fase **relativa**, y con ella los observables que no conmutan con $H$.$qm$,
   $qm$La primera mitad está bien, la segunda no. La evolución multiplica cada $c_k$ por una fase de módulo 1, así que $|c_k|^2$ no cambia nunca. Si las probabilidades de energía cambiaran, la energía no se conservaría.$qm$,
   $qm$Las energías de los términos de una superposición no se suman: son resultados **alternativos** de una medición, no contribuciones simultáneas.$qm$,
   $qm$mq/schrodinger/superposicion-con-energia-definida$qm$, null,
   $qm$mq/schrodinger/evolucion-de-probabilidades-fijas$qm$,
   $qm$mq/schrodinger/superposicion-con-energia-definida$qm$),

  ($qm$mq_schrodinger$qm$, $qm$cuantica/schrodinger$qm$, 0.4, 30,
   $qm$En la superposición anterior, la densidad de probabilidad $|\psi(x,t)|^2$ oscila con cierta frecuencia. ¿Cuál?$qm$,
   $qm$$\omega = (E_1+E_2)/\hbar$$qm$,
   $qm$$\omega = |E_2-E_1|/\hbar$$qm$,
   $qm$No oscila: es una superposición de dos estados estacionarios, y una suma de constantes es constante.$qm$,
   $qm$$\omega = E_1E_2/\hbar^2$$qm$,
   $qm$B$qm$,
   $qm$Al calcular $|\psi|^2$ aparece el término cruzado $2\,\mathrm{Re}\{c_1^*c_2\,e^{-i(E_2-E_1)t/\hbar}\psi_1^*\psi_2\}$: lo que sobrevive es la **diferencia** de energías, no la suma. La fase común es global y se cancela.$qm$,
   $qm$Correcto. Es la frecuencia de Bohr $\omega_{21} = (E_2-E_1)/\hbar$, la misma que aparece en la línea espectral emitida en esa transición. Solo las diferencias de energía son observables.$qm$,
   $qm$Cada término es estacionario por separado, pero su **interferencia** no lo es: el término cruzado depende del tiempo. Es el mismo mecanismo por el que dos ondas de frecuencias distintas producen pulsaciones.$qm$,
   $qm$Dimensionalmente no cierra: $E^2/\hbar^2$ no tiene unidades de frecuencia. Al desarrollar $|\psi|^2$ las energías aparecen restadas, no multiplicadas.$qm$,
   null, null, $qm$mq/schrodinger/estacionario-es-inmovil$qm$, null),

  ($qm$mq_schrodinger$qm$, $qm$cuantica/schrodinger$qm$, 1.0, 40,
   $qm$¿Qué representa $|\psi(x,t)|^2\,dx$?$qm$,
   $qm$La cantidad de materia de la partícula contenida entre $x$ y $x+dx$.$qm$,
   $qm$La probabilidad de **encontrar** la partícula entre $x$ y $x+dx$ al medir su posición.$qm$,
   $qm$La energía de la partícula localizada en ese intervalo.$qm$,
   $qm$La fracción del tiempo que la partícula pasa en ese intervalo mientras se mueve.$qm$,
   $qm$B$qm$,
   $qm$La partícula no está desparramada: cuando se la detecta, se la detecta **entera** en un punto. $\psi$ es una amplitud de probabilidad, no una densidad de materia.$qm$,
   $qm$Correcto. Es la regla de Born (1926) en representación de posición, y la condición $\int|\psi|^2dx = 1$ dice simplemente que la partícula está en alguna parte.$qm$,
   $qm$Las unidades no son de energía, y además la energía de un estado estacionario no está localizada: es una propiedad global del estado.$qm$,
   $qm$Eso supone una trayectoria clásica que la partícula recorre y de la que tomamos un promedio temporal. No hay tal trayectoria: la probabilidad es sobre resultados de medición, no sobre el tiempo de permanencia.$qm$,
   $qm$mq/schrodinger/funcion-de-onda-es-la-particula$qm$, null, null,
   $qm$mq/origenes/bohr-como-teoria-vigente$qm$),

  ($qm$mq_schrodinger$qm$, $qm$cuantica/schrodinger$qm$, 1.6, 50,
   $qm$¿Por qué se exige que $\psi(x)$ y $\psi'(x)$ sean continuas donde el potencial tiene un salto finito?$qm$,
   $qm$Por elegancia matemática: sin continuidad las fórmulas quedan feas.$qm$,
   $qm$Porque la ecuación de Schrödinger es de segundo orden: si $\psi''$ ha de ser a lo sumo discontinua a saltos, $\psi'$ y $\psi$ deben ser continuas, y de ahí salen las condiciones que cuantizan la energía.$qm$,
   $qm$Porque la partícula no puede cambiar de dirección bruscamente.$qm$,
   $qm$Solo hace falta la continuidad de $\psi$; la de $\psi'$ es opcional.$qm$,
   $qm$B$qm$,
   $qm$No es estética: sin esas condiciones la corriente de probabilidad no se conserva en la interfaz, y aparecerían o desaparecerían partículas en el punto de empalme.$qm$,
   $qm$Correcto. Y es de donde sale todo lo demás: los niveles del pozo, los coeficientes de reflexión y transmisión de una barrera, la cuantización misma. Con potenciales **infinitos** (pozo infinito, delta) la derivada sí puede saltar.$qm$,
   $qm$El argumento es sobre la función de onda, no sobre trayectorias -- que no existen. La continuidad viene del orden de la ecuación diferencial.$qm$,
   $qm$Con $\psi'$ discontinua, $\psi''$ tendría una delta, lo que exigiría un potencial infinito en ese punto. Con salto **finito** de $V$ eso no puede pasar.$qm$,
   null, null, $qm$mq/schrodinger/funcion-de-onda-es-la-particula$qm$,
   $qm$mq/pozo/continuidad-ignorada$qm$),

  ($qm$mq_schrodinger$qm$, $qm$cuantica/schrodinger$qm$, 2.1, 60,
   $qm$El operador de evolución es $U(t) = e^{-iHt/\hbar}$ para $H$ independiente del tiempo. ¿Qué propiedad tiene?$qm$,
   $qm$Es hermítico, porque $H$ lo es.$qm$,
   $qm$Es unitario: $U^{\dagger}U = I$, lo que garantiza que la norma (y por tanto la probabilidad total) se conserva.$qm$,
   $qm$Es un proyector: aplicarlo dos veces da lo mismo que una.$qm$,
   $qm$No es lineal, porque la exponencial no lo es.$qm$,
   $qm$B$qm$,
   $qm$La exponencial de un hermítico multiplicado por $i$ es **unitaria**, no hermítica: $U^{\dagger} = e^{+iHt/\hbar} = U^{-1} \neq U$. Es el mismo patrón que en las rotaciones, donde $L_z$ es hermítico y $e^{-i\theta L_z/\hbar}$ es unitario.$qm$,
   $qm$Correcto. La unitariedad es la contracara matemática de la conservación de la probabilidad, y es lo que hace de la evolución un proceso reversible -- a diferencia de la medición.$qm$,
   $qm$Un proyector cumple $P^2=P$, pero $U(t)U(t) = U(2t) \neq U(t)$: evolucionar dos veces $t$ no es lo mismo que evolucionar $t$. Los proyectores aparecen en la medición, no en la evolución.$qm$,
   $qm$$U$ es lineal: es una serie de potencias de un operador lineal, $I - iHt/\hbar - H^2t^2/2\hbar^2 + \dots$. La linealidad de la evolución es lo que hace que una superposición evolucione término a término.$qm$,
   $qm$mq/formalismo/operador-hermitico-vs-unitario$qm$, null,
   $qm$mq/medida/colapso-reversible$qm$, null)

)
insert into public.questions
  (topic, module_id, difficulty, order_index,
   question, option_a, option_b, option_c, option_d, correct_option,
   error_a, error_b, error_c, error_d,
   misconception_a_id, misconception_b_id, misconception_c_id, misconception_d_id)
select i.topic, m.id, i.difficulty, i.order_index,
       i.question, i.option_a, i.option_b, i.option_c, i.option_d, i.correct_option,
       i.error_a, i.error_b, i.error_c, i.error_d,
       xa.id, xb.id, xc.id, xd.id
from items i
left join public.modules m       on m.slug  = i.module_slug
left join public.misconceptions xa on xa.slug = i.mis_a
left join public.misconceptions xb on xb.slug = i.mis_b
left join public.misconceptions xc on xc.slug = i.mis_c
left join public.misconceptions xd on xd.slug = i.mis_d
where not exists (
  select 1 from public.questions q
   where q.topic = i.topic and q.question = i.question
);

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select topic, count(*) from public.questions
--    where topic like 'mq\_%' group by topic order by topic;
--   -- mq_origenes 6 · mq_formalismo 8 · mq_postulados 8
--   -- mq_incertidumbre 8 · mq_schrodinger 6
--
--   -- Ningún ítem puede quedar sin módulo (delataría un slug mal escrito):
--   select id, topic from public.questions
--    where topic like 'mq\_%' and module_id is null;
--   -- 0 filas
--
--   -- La alternativa correcta nunca lleva misconception:
--   select id, topic, correct_option from public.questions
--    where topic like 'mq\_%'
--      and ((correct_option = 'A' and misconception_a_id is not null)
--        or (correct_option = 'B' and misconception_b_id is not null)
--        or (correct_option = 'C' and misconception_c_id is not null)
--        or (correct_option = 'D' and misconception_d_id is not null));
--   -- 0 filas
--
-- Reversión: delete from public.questions where topic like 'mq\_%';

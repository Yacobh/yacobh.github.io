-- EXPERIMENTO · Recursos de capa 1 para los 15 módulos de Mecánica Cuántica (32 recursos).
--
-- ⚠ APLICAR DESPUÉS DE 033 (los módulos tienen que existir).
--
-- ── Derechos de autor: mismo criterio que 018 y 019 ────────────────────────
-- Todo el texto de abajo está **redactado desde cero**. Las referencias
-- bibliográficas del `title` y del cuerpo funcionan como un "ver Griffiths cap.
-- 4" dicho en clase: apuntan a dónde ampliar, no reproducen contenido. Ninguno
-- de los libros de `docs/libros mecanica cuantica/` está transcrito, parafraseado
-- de cerca ni resumido capítulo a capítulo.
--
-- Los libros citados son los que efectivamente están en esa carpeta:
--   · Griffiths, *Introduction to Quantum Mechanics*
--   · Sakurai & Napolitano, *Modern Quantum Mechanics*
--   · Dirac, *The Principles of Quantum Mechanics*
--   · von Neumann, *Mathematical Foundations of Quantum Mechanics* (1955)
--   · Gottfried & Yan, *Quantum Mechanics: Fundamentals*
--   · Binney & Skinner, *The Physics of Quantum Mechanics*
--   · Nielsen & Chuang, *Quantum Computation and Quantum Information*
--   · Bell, *Speakable and Unspeakable in Quantum Mechanics*
--   · Weyl, *The Theory of Groups and Quantum Mechanics*
--   · Heisenberg (1925) y Born-Jordan (1925), los artículos fundacionales
--
-- Las citas van a nivel de **capítulo**, no de página ni de número de ecuación:
-- la paginación cambia entre ediciones y una referencia falsamente precisa es
-- peor que una general.
--
-- ── `published = false` en los 32 ─────────────────────────────────────────
-- ADR-016 §1-2: contenido asistido por IA nace despublicado y se publica a mano
-- después de auditarlo **rehaciendo cada cuenta**, no solo leyéndolo. Acá el
-- auditor y el destinatario son la misma persona, así que la revisión ocurre
-- naturalmente al estudiar -- pero la regla se respeta igual, y por la misma
-- razón: un recurso con un error de signo enseña el error.
--
-- Idempotente: `where not exists` por (módulo, título).

with recursos (module_slug, type, title, body, historical_context, order_index) as (
  values

  -- ========================= cuantica/origenes ==============================
  ($qm$cuantica/origenes$qm$::text, $qm$text$qm$::text,
   $qm$Guía — De la catástrofe ultravioleta a de Broglie (ver Griffiths, cap. 1; Sakurai, cap. 1)$qm$::text,
   $qm$Cuatro resultados, cada uno arreglando lo que el anterior dejaba roto.

**1. Planck (1900).** El espectro del cuerpo negro. La física clásica predecía $\rho(\nu) \propto \nu^{2}k_BT$, que diverge al integrar sobre $\nu$. Planck supuso que los osciladores de las paredes intercambian energía solo en múltiplos de $h\nu$. Consecuencia: a frecuencia alta el cuanto $h\nu \gg k_BT$ y esos modos quedan congelados. **No** postuló el fotón.

**2. Einstein (1905).** El efecto fotoeléctrico. $K_{max} = h\nu - W$, con $W$ la función trabajo del metal. Lo que la intensidad controla es el **número** de electrones; la frecuencia controla su **energía**. Acá sí se cuantiza el campo.

**3. Bohr (1913).** $E_n = -13{,}6\,\mathrm{eV}/n^{2}$ para el hidrógeno, postulando órbitas estacionarias que no radian. Acierta las energías y falla en la imagen: una órbita exige $r$ y $p$ definidos a la vez.

**4. De Broglie (1924).** $\lambda = h/p$ para **toda** partícula. Confirmado por Davisson y Germer (1927) difractando electrones en un cristal de níquel.

**Qué llevar al examen:** el orden lógico importa. Planck cuantiza el intercambio, Einstein el campo, Bohr el átomo, De Broglie devuelve la simetría onda-partícula. Confundir a Planck con Einstein es el error histórico más frecuente del tema.$qm$::text,
   $qm$Planck describió su propio postulado, en una carta de 1931 a Robert Wood, como "un acto de desesperación": había probado todo lo demás durante seis años. Einstein, en cambio, tomó el cuanto literalmente desde el principio, y por eso su artículo de 1905 -- no el de relatividad -- es el que la Academia Sueca citó al darle el Nobel en 1921.$qm$::text,
   10::int),

  ($qm$cuantica/origenes$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Fotoeléctrico y longitud de onda de de Broglie$qm$,
   $qm$**Problema 1.** Un metal tiene función trabajo $W = 2{,}3$ eV. Se lo ilumina con luz de $\lambda = 400$ nm. ¿Salen electrones? ¿Con qué energía cinética máxima?

*Solución.* La energía del fotón es $E = hc/\lambda$. Con el atajo $hc \approx 1240\ \mathrm{eV\cdot nm}$: $E = 1240/400 = 3{,}1$ eV. Como $3{,}1 > 2{,}3$, sí salen. $K_{max} = 3{,}1 - 2{,}3 = 0{,}8$ eV.

*Control:* la frecuencia umbral es $\nu_0 = W/h$, o sea $\lambda_0 = 1240/2{,}3 \approx 539$ nm. Cualquier $\lambda < 539$ nm arranca electrones; cualquier $\lambda$ mayor, ninguno, por intensa que sea la luz.

**Problema 2.** Un electrón acelerado por una diferencia de potencial de $54$ V (el valor de Davisson-Germer). ¿Cuál es su $\lambda$?

*Solución.* $K = 54$ eV, y como $K \ll m_ec^{2} = 511$ keV se puede usar la expresión no relativista $p = \sqrt{2m_eK}$. Con el atajo $\lambda[\mathrm{nm}] \approx 1{,}226/\sqrt{K[\mathrm{eV}]}$: $\lambda \approx 1{,}226/\sqrt{54} \approx 0{,}167$ nm $= 1{,}67$ Å.

*Por qué importa:* ese valor es del orden del espaciado atómico de un cristal ($\approx 2$ Å), y por eso el cristal funciona como red de difracción. Con una pelota de tenis el mismo cálculo da $\lambda \sim 10^{-34}$ m: la física es la misma, la escala no.

**Problema 3 (para pensar).** Si se duplica la intensidad del haz del problema 1, ¿qué cambia? Respuesta: se duplica la corriente de electrones y $K_{max}$ no se mueve ni un poco.$qm$,
   $qm$El experimento de Davisson y Germer (1927) fue un accidente: una botella de aire entró en su tubo de vacío, oxidó la muestra de níquel y, al recalentarla para limpiarla, la convirtieron sin querer en un monocristal. Recién entonces aparecieron los picos de difracción.$qm$,
   20),

  -- ========================= cuantica/formalismo ============================
  ($qm$cuantica/formalismo$qm$, $qm$text$qm$,
   $qm$Guía — Bras, kets y espacio de Hilbert (ver Dirac, caps. I-II; Sakurai, cap. 1)$qm$,
   $qm$**El espacio.** Los estados son vectores de un espacio de Hilbert complejo: vectores con producto interno, completo. "Complejo" no es decorativo -- la fase relativa entre términos es lo que produce interferencia.

**La notación.** Un ket $|\psi\rangle$ es el vector; el bra $\langle\psi|$ es el funcional asociado. La correspondencia es **antilineal**: $\alpha|\psi\rangle \leftrightarrow \alpha^{*}\langle\psi|$. Olvidar esa conjugación es el error más frecuente del tema.

**Las tres construcciones que hay que reconocer al vuelo:**

- $\langle\phi|\psi\rangle$ — un **número** complejo (bra-ket).
- $|\phi\rangle\langle\psi|$ — un **operador** (ket-bra). Con $|\phi\rangle = |\psi\rangle$ normalizado es un proyector: $P^{2}=P$, $P^{\dagger}=P$.
- $\sum_n |u_n\rangle\langle u_n| = I$ — la **relación de cierre**, la identidad más útil del formalismo: se la inserta en cualquier lugar de una expresión para pasar a componentes.

**Hermítico contra unitario.** $A^{\dagger}=A$ define un observable: autovalores reales, autovectores ortogonales que forman base. $U^{\dagger}U=I$ define una evolución o un cambio de base: preserva normas, autovalores de módulo 1. Son condiciones distintas y papeles distintos; confundirlas se paga caro.

**Sistemas compuestos.** Dos subsistemas se combinan con producto **tensorial**: las dimensiones se multiplican ($2\otimes3 = 6$), no se suman. La suma directa describe otra cosa.$qm$,
   $qm$Dirac introdujo la notación en 1939, partiendo la palabra inglesa bracket (corchete) en bra-c-ket. La estructura matemática que hay debajo la había fijado von Neumann siete años antes, y en su libro de 1932 criticó explícitamente el uso que Dirac hacía de la delta -- un objeto que no era una función y que solo la teoría de distribuciones de Schwartz, en 1945, hizo legítimo.$qm$,
   10),

  ($qm$cuantica/formalismo$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Productos internos, proyectores y cambio de base$qm$,
   $qm$Sea $\{|0\rangle, |1\rangle\}$ una base ortonormal y $|\psi\rangle = 3|0\rangle - 4i|1\rangle$.

**a) Norma.** $\langle\psi|\psi\rangle = |3|^{2} + |-4i|^{2} = 9 + 16 = 25$, así que $\||\psi\rangle\| = 5$ y el estado normalizado es $\frac{1}{5}(3|0\rangle - 4i|1\rangle)$.

*Trampa:* $(-4i)^{2} = -16$, pero $|-4i|^{2} = 16$. Lo que va en la norma es el **módulo** al cuadrado, no el cuadrado.

**b) Probabilidades.** $P(0) = 9/25 = 0{,}36$ y $P(1) = 16/25 = 0{,}64$. Suman 1, que es el control obligatorio.

**c) El bra.** $\langle\psi| = 3\langle0| + 4i\langle1|$. Notar el cambio de signo: $(-4i)^{*} = +4i$.

**d) Proyector.** $P_1 = |1\rangle\langle1|$ aplicado al estado normalizado da $\frac{-4i}{5}|1\rangle$, cuya norma al cuadrado es $16/25$: la misma probabilidad de (b). No es casualidad, es la regla de Born en forma de proyector.

**e) Cambio de base.** Sea $|\pm\rangle = \frac{1}{\sqrt2}(|0\rangle \pm |1\rangle)$. Entonces
$$\langle+|\psi\rangle = \tfrac{1}{\sqrt2}\left(3 - 4i\right),\qquad |\langle+|\psi\rangle|^{2} = \tfrac{1}{2}(9+16) = 12{,}5$$
y dividiendo por la norma $25$ queda $P(+) = 0{,}5$. Análogamente $P(-) = 0{,}5$.

*Lo que hay que ver acá:* en la base $\{|0\rangle,|1\rangle\}$ las probabilidades eran $0{,}36$ y $0{,}64$; en la base $\{|+\rangle,|-\rangle\}$ son $0{,}5$ y $0{,}5$. Las probabilidades **dependen de qué se mide**. No hay una lista de valores esperando ser leída.$qm$,
   null,
   20),

  -- ========================= cuantica/postulados ============================
  ($qm$cuantica/postulados$qm$, $qm$text$qm$,
   $qm$Guía — Los postulados en el orden en que se usan (ver Griffiths, cap. 3; von Neumann, cap. III)$qm$,
   $qm$**P1 · Estado.** El estado de un sistema es un vector normalizado $|\psi\rangle$ del espacio de Hilbert. Dos vectores que difieren en una fase global describen el mismo estado.

**P2 · Observables.** A cada magnitud medible le corresponde un operador **hermítico**. Los resultados posibles de una medición son sus autovalores, y solo esos.

**P3 · Born.** La probabilidad de obtener el autovalor $a_n$ es $P(a_n) = |\langle a_n|\psi\rangle|^{2}$; si $a_n$ es degenerado, $P(a_n) = \langle\psi|P_n|\psi\rangle$ con $P_n$ el proyector sobre todo el subespacio.

**P4 · Proyección.** Inmediatamente después de obtener $a_n$, el estado es $P_n|\psi\rangle$ **normalizado**. Sin este postulado ninguna medición sería reproducible.

**P5 · Evolución.** Entre mediciones, $i\hbar\,\partial_t|\psi\rangle = H|\psi\rangle$: unitaria, determinista, reversible.

**El punto que hay que tener claro.** P4 y P5 son dos reglas de evolución de naturaleza incompatible: una probabilística e irreversible, la otra determinista y reversible. Von Neumann las llamó "proceso 1" y "proceso 2" en 1932 y dejó explícito que la teoría no dice dónde termina uno y empieza el otro. Ese es el problema de la medición, y sigue abierto.

**Tres distinciones que se preguntan siempre:**

- Valor esperado $\langle A\rangle$ **no** es un resultado posible: es el promedio sobre un ensemble.
- Fase **global** (invisible) contra fase **relativa** (observable en interferencia).
- Superposición (un vector, con coherencia) contra mezcla estadística (necesita matriz densidad, sin coherencia).$qm$,
   $qm$La regla de Born apareció en 1926 como una nota al pie agregada durante la corrección de pruebas de un artículo sobre colisiones atómicas: en el cuerpo del texto Born había escrito la amplitud, y en la corrección añadió que lo que da la probabilidad es su módulo al cuadrado. Esa nota al pie le valió el Nobel en 1954.$qm$,
   10),

  ($qm$cuantica/postulados$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Born con degeneración y medidas sucesivas$qm$,
   $qm$Un observable $A$ tiene autovalores $a_1$ (no degenerado, autovector $|1\rangle$) y $a_2$ (doblemente degenerado, autovectores ortonormales $|2\rangle$ y $|3\rangle$). El estado es
$$|\psi\rangle = \tfrac{1}{\sqrt6}\left(|1\rangle + 2|2\rangle + |3\rangle\right).$$

**a) ¿Está normalizado?** $\frac{1}{6}(1 + 4 + 1) = 1$. Sí.

**b) $P(a_1)$.** $|\langle1|\psi\rangle|^{2} = 1/6$.

**c) $P(a_2)$.** Es un autovalor degenerado, así que hay que sumar **probabilidades** sobre todo el subespacio:
$$P(a_2) = |\langle2|\psi\rangle|^{2} + |\langle3|\psi\rangle|^{2} = \tfrac{4}{6} + \tfrac{1}{6} = \tfrac{5}{6}.$$

*Error clásico:* sumar las amplitudes primero, $|\frac{2}{\sqrt6}+\frac{1}{\sqrt6}|^{2} = 9/6 > 1$. Eso metería interferencia entre dos alternativas ortogonales, o sea distinguibles, donde no corresponde. Control inmediato: dio más que 1.

**d) Estado después de medir $a_2$.** Se proyecta y se renormaliza:
$$\frac{P_2|\psi\rangle}{\sqrt{\langle\psi|P_2|\psi\rangle}} = \frac{\frac{1}{\sqrt6}(2|2\rangle+|3\rangle)}{\sqrt{5/6}} = \frac{1}{\sqrt5}\left(2|2\rangle+|3\rangle\right).$$

Notar que **no** colapsa a $|2\rangle$ ni a $|3\rangle$: la medición de $A$ no distingue dentro del subespacio degenerado. Conserva la dirección relativa que traía el estado.

**e) Segunda medición de $A$, inmediata.** Da $a_2$ con probabilidad 1. Ese es el postulado de proyección.

**f) $\langle A\rangle$.** $\frac{1}{6}a_1 + \frac{5}{6}a_2$. Si $a_1 \neq a_2$, ese número **no** es un resultado posible de ninguna medición individual.$qm$,
   null,
   20),

  -- ======================= cuantica/incertidumbre ===========================
  ($qm$cuantica/incertidumbre$qm$, $qm$text$qm$,
   $qm$Guía — Del conmutador a la incertidumbre (ver Sakurai, cap. 1; Gottfried & Yan, cap. 2)$qm$,
   $qm$**La definición.** $[A,B] = AB - BA$. Es cero exactamente cuando el orden no importa.

**Las cuatro propiedades que se usan todo el tiempo:**

1. Antisimetría: $[A,B] = -[B,A]$. De ahí, $[A,A]=0$.
2. Bilinealidad: $[A, B+C] = [A,B] + [A,C]$.
3. Regla del producto: $[AB,C] = A[B,C] + [A,C]B$ y $[A,BC] = [A,B]C + B[A,C]$.
4. **No** es multiplicativo: $[AB,C] \neq [A,C][B,C]$. Contraejemplo: $A=B=\hat X$, $C=\hat P$.

En la regla del producto, cada operador queda **del lado donde estaba**. Ese detalle es todo el ejercicio: si conmutaran, no haría falta cuidarlo.

**El ladrillo fundamental.** $[\hat X_i, \hat P_j] = i\hbar\,\delta_{ij}$. La delta dice que solo el mismo eje no conmuta: $[\hat X, \hat P_y] = 0$.

**Robertson (1929).** Para $A$, $B$ hermíticos,
$$\Delta A\,\Delta B \;\geq\; \tfrac{1}{2}\big|\langle[A,B]\rangle\big|.$$
Con $[\hat X,\hat P]=i\hbar$ da el familiar $\hbar/2$. Tres observaciones que se preguntan:

- **La cota depende del estado**, salvo cuando el conmutador es un número. Para $L_x, L_y$ la cota es $\frac{\hbar}{2}|\langle L_z\rangle|$, que puede anularse.
- $\Delta A$ es una **desviación estándar del estado**, calculable sin mencionar ningún aparato. La relación no habla de perturbación experimental: eso es el microscopio de Heisenberg de 1927, una imagen pedagógica que la deducción de Robertson vuelve innecesaria.
- $[A,H]=0$ (con $A$ sin dependencia explícita del tiempo) $\Rightarrow$ $\langle A\rangle$ constante. Es Noether en versión cuántica.$qm$,
   $qm$Heisenberg publicó el principio en 1927 con el argumento del microscopio; Earle Kennard le dio ese mismo año la forma exacta con el $\hbar/2$, y Howard Robertson la generalizó en 1929 a un par cualquiera de observables. El camino va de "no se puede medir bien" a "la teoría no les asigna valores simultáneos": dos afirmaciones muy distintas que el nombre popular del principio sigue confundiendo.$qm$,
   10),

  ($qm$cuantica/incertidumbre$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Conmutadores con la regla del producto$qm$,
   $qm$**a) $[\hat X, \hat P^{2}]$.**
$$[\hat X,\hat P\hat P] = [\hat X,\hat P]\hat P + \hat P[\hat X,\hat P] = i\hbar\hat P + i\hbar\hat P = 2i\hbar\hat P.$$
El factor 2 sale de que la regla del producto genera **dos** términos. Como $i\hbar$ es un número, conmuta con todo y se puede sacar afuera.

**b) $[\hat X^{2}, \hat P]$.**
$$[\hat X\hat X,\hat P] = \hat X[\hat X,\hat P] + [\hat X,\hat P]\hat X = i\hbar\hat X + i\hbar\hat X = 2i\hbar\hat X.$$

**c) $[\hat X, H]$ con $H = \frac{\hat P^{2}}{2m} + V(\hat X)$.**
$$[\hat X,H] = \tfrac{1}{2m}[\hat X,\hat P^{2}] + [\hat X,V(\hat X)] = \tfrac{i\hbar}{m}\hat P + 0.$$
El potencial conmuta con $\hat X$ porque es una función de $\hat X$. Aplicando Ehrenfest, $\frac{d\langle \hat X\rangle}{dt} = \frac{\langle \hat P\rangle}{m}$: la velocidad es el momento sobre la masa, igual que en la mecánica clásica.

**d) $[\hat P, V(\hat X)]$.** En representación de posición, $\hat P = -i\hbar\,\partial_x$, y aplicando a una función de prueba $f$:
$$[\hat P, V]f = -i\hbar\big[\partial_x(Vf) - V\partial_x f\big] = -i\hbar\,(\partial_x V)\,f.$$
O sea $[\hat P,V] = -i\hbar\,V'(\hat X)$. Con esto, $\frac{d\langle \hat P\rangle}{dt} = -\langle V'(\hat X)\rangle$: la segunda ley de Newton para valores esperados.

**e) Control final.** Todo conmutador de dos hermíticos debe salir **$i$ por algo hermítico**. Si en algún paso aparece un resultado hermítico sin $i$, hay un error de signo o de factor en el camino.$qm$,
   null,
   20),

  -- ======================== cuantica/schrodinger =============================
  ($qm$cuantica/schrodinger$qm$, $qm$text$qm$,
   $qm$Guía — Evolución temporal: qué cambia y qué no (ver Griffiths, cap. 2; Binney & Skinner, cap. 2)$qm$,
   $qm$**La ecuación.** $i\hbar\,\partial_t|\psi\rangle = H|\psi\rangle$. Para $H$ independiente del tiempo, la solución formal es $|\psi(t)\rangle = U(t)|\psi(0)\rangle$ con $U(t) = e^{-iHt/\hbar}$, que es **unitario**: $U^{\dagger}U = I$. De ahí la conservación de la probabilidad total.

**La receta de tres pasos** (sirve para casi todo problema de evolución):

1. Expandir el estado inicial en autoestados de $H$: $|\psi(0)\rangle = \sum_n c_n|E_n\rangle$.
2. Poner una fase a cada término: $|\psi(t)\rangle = \sum_n c_n e^{-iE_nt/\hbar}|E_n\rangle$.
3. Calcular lo que se pida sobre eso.

**Qué NO cambia.** Los módulos $|c_n|^{2}$ son constantes: la distribución de probabilidad de la energía no evoluciona. Es la conservación de la energía en forma cuántica.

**Qué SÍ cambia.** Las fases relativas entre términos, y con ellas todo observable que no conmute con $H$. Para dos niveles, $|\psi(x,t)|^{2}$ oscila con la **frecuencia de Bohr** $\omega_{21} = (E_2-E_1)/\hbar$ -- la misma que la de la línea espectral emitida en esa transición. Solo las **diferencias** de energía son observables.

**Estado estacionario.** Un autoestado de $H$ evoluciona multiplicándose por una fase global: el vector cambia, ninguna predicción física lo hace. "Estacionario" significa eso, no que el estado esté congelado.

**Condiciones de empalme.** Donde $V$ salta de forma **finita**, $\psi$ y $\psi'$ son continuas (porque la ecuación es de segundo orden). Con $V$ infinito -- pozo infinito, potencial delta -- la derivada sí puede saltar. De estas condiciones sale la cuantización, no de un postulado extra.$qm$,
   $qm$Schrödinger publicó en 1926 cuatro artículos con el mismo título, "Quantisierung als Eigenwertproblem": la cuantización como problema de autovalores. El nombre resume el cambio de estatus de los números cuánticos, que dejaron de postularse como en Bohr y pasaron a salir de exigir soluciones aceptables a una ecuación diferencial, igual que los armónicos de una cuerda salen de fijar sus extremos.$qm$,
   10),

  ($qm$cuantica/schrodinger$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Superposición de dos niveles y frecuencia de Bohr$qm$,
   $qm$Un sistema arranca en $|\psi(0)\rangle = \frac{1}{\sqrt2}\left(|E_1\rangle + |E_2\rangle\right)$, con $E_1 \neq E_2$.

**a) Evolución.**
$$|\psi(t)\rangle = \tfrac{1}{\sqrt2}\left(e^{-iE_1t/\hbar}|E_1\rangle + e^{-iE_2t/\hbar}|E_2\rangle\right).$$

**b) Probabilidades de energía.** $P(E_1) = P(E_2) = 1/2$ **para todo $t$**: las fases tienen módulo 1 y no afectan a $|c_n|^{2}$. Si estas probabilidades cambiaran, la energía no se conservaría.

**c) Densidad de probabilidad en posición.** Sacando factor común la fase global $e^{-iE_1t/\hbar}$:
$$|\psi(x,t)|^{2} = \tfrac{1}{2}\left[|\psi_1|^{2} + |\psi_2|^{2} + 2\,\psi_1\psi_2\cos\!\left(\tfrac{(E_2-E_1)t}{\hbar}\right)\right]$$
(tomando $\psi_1,\psi_2$ reales). El término cruzado oscila con $\omega_{21} = (E_2-E_1)/\hbar$: la **diferencia**, no la suma. La fase global no aparece por ningún lado, como corresponde.

**d) Período.** $T = 2\pi\hbar/(E_2-E_1) = h/(E_2-E_1)$. Para $E_2-E_1 = 1$ eV eso da $T \approx 4\times10^{-15}$ s.

**e) Un observable que oscile.** Si $B$ conecta ambos niveles ($\langle E_1|B|E_2\rangle \neq 0$), entonces $\langle B\rangle(t)$ oscila con la misma $\omega_{21}$. Es el mecanismo de la emisión: un dipolo oscilante irradia a esa frecuencia.

**f) Control.** ¿Qué pasa si $E_1 = E_2$ (nivel degenerado)? El término cruzado deja de oscilar y el estado es estacionario. Coherente: la superposición de estados degenerados es autoestado de $H$.$qm$,
   null,
   20),

  -- =========================== cuantica/pozos ===============================
  ($qm$cuantica/pozos$qm$, $qm$text$qm$,
   $qm$Guía — Pozo infinito, pozo finito y barrera: el mismo método tres veces (ver Griffiths, cap. 2)$qm$,
   $qm$**El método, siempre igual:** partir el eje en regiones donde $V$ sea constante, resolver en cada una, y **empalmar** $\psi$ y $\psi'$ en cada frontera. De ahí sale todo.

**Pozo infinito de ancho $a$.** $\psi_n(x) = \sqrt{2/a}\,\sin(n\pi x/a)$ y
$$E_n = \frac{n^{2}\pi^{2}\hbar^{2}}{2ma^{2}},\qquad n=1,2,3,\dots$$
- $n=0$ está excluido porque daría $\psi \equiv 0$.
- Los niveles se **separan cada vez más**: $E_{n+1}-E_n \propto (2n+1)$. No confundir con el oscilador, que es equiespaciado.
- El $n$-ésimo estado tiene $n-1$ nodos **interiores**.

**Pozo finito.** Los estados ligados son un número finito, que crece con $V_0a^{2}$. En una dimensión **siempre hay al menos uno**, por poco profundo que sea el pozo (en tres dimensiones, no). $\psi$ decae exponencialmente fuera del pozo: penetra en la región clásicamente prohibida, y por eso la energía del fundamental es **menor** que la del pozo infinito equivalente.

**Escalón con $E > V_0$.** Clásicamente la partícula pasa siempre; cuánticamente hay reflexión parcial,
$$R = \left(\frac{k_1-k_2}{k_1+k_2}\right)^{2}, \qquad k_i = \frac{\sqrt{2m(E-V_i)}}{\hbar}.$$

**Barrera con $E < V_0$ (efecto túnel).**
$$T \approx e^{-2\kappa L}, \qquad \kappa = \frac{\sqrt{2m(V_0-E)}}{\hbar}.$$
La dependencia con el ancho es **exponencial**: duplicar $L$ eleva $T$ al cuadrado. Y la partícula transmitida sale con la **misma** energía $E$: el túnel no le cuesta energía, le cuesta probabilidad.$qm$,
   $qm$George Gamow explicó en 1928 la desintegración alfa como efecto túnel -- de forma independiente lo hicieron Gurney y Condon ese mismo año --, y con un solo mecanismo dio cuenta de vidas medias que varían en más de veinte órdenes de magnitud, desde microsegundos hasta miles de millones de años. Esa sensibilidad extrema es justamente la exponencial.$qm$,
   10),

  ($qm$cuantica/pozos$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Empalme, reflexión y sensibilidad del túnel$qm$,
   $qm$**Problema 1 · Escalón.** Una partícula de energía $E = 2V_0$ incide sobre un escalón de altura $V_0$. ¿Qué fracción se refleja?

*Solución.* $k_1 \propto \sqrt{E} = \sqrt{2V_0}$ y $k_2 \propto \sqrt{E-V_0} = \sqrt{V_0}$, así que $k_1/k_2 = \sqrt2$. Entonces
$$R = \left(\frac{\sqrt2-1}{\sqrt2+1}\right)^{2} \approx \left(\frac{0{,}414}{2{,}414}\right)^{2} \approx 0{,}029.$$
Cerca del $3\,\%$ se refleja, aunque la energía alcance de sobra. Clásicamente sería $0\,\%$.

*Control:* si $E \gg V_0$ entonces $k_1 \to k_2$ y $R \to 0$, que es el límite clásico. Bien.

**Problema 2 · Sensibilidad del túnel.** Una barrera da $T = 10^{-4}$. ¿Cuánto vale $T$ si se duplica el ancho? ¿Y si se aumenta un $10\,\%$?

*Solución.* Con $T \approx e^{-2\kappa L}$: al duplicar $L$, $T \to T^{2} = 10^{-8}$. Al aumentar $L$ un $10\,\%$, $T \to T^{1{,}1} = 10^{-4{,}4} \approx 4\times10^{-5}$: cae un $60\,\%$ con un cambio del $10\,\%$ en la geometría.

*Por qué importa:* el microscopio de efecto túnel resuelve átomos individuales exactamente por esto -- variaciones de fracciones de ångström en la distancia punta-muestra cambian la corriente en órdenes de magnitud.

**Problema 3 · Escala del pozo.** Un electrón en un pozo infinito de ancho $a = 1$ Å. Estimar $E_1$.

*Solución.* $E_1 = \frac{\pi^{2}\hbar^{2}}{2m_ea^{2}}$. Con el atajo $\frac{\hbar^{2}}{2m_e(1\,\mathrm{Å})^{2}} \approx 3{,}81$ eV: $E_1 \approx \pi^{2}\times3{,}81 \approx 37{,}6$ eV.

*Lectura:* confinar un electrón en un ångström cuesta decenas de eV. Es la escala de las energías atómicas, y explica por qué los átomos no son mucho más chicos.$qm$,
   null,
   20),

  -- ========================= cuantica/oscilador =============================
  ($qm$cuantica/oscilador$qm$, $qm$text$qm$,
   $qm$Guía — El método algebraico de Dirac (ver Dirac, cap. VI; Griffiths, cap. 2; Sakurai, cap. 2)$qm$,
   $qm$**Por qué importa.** Cualquier potencial suave, cerca de un mínimo, es aproximadamente cuadrático: $V(x) \approx V(x_0) + \frac{1}{2}V''(x_0)(x-x_0)^{2}$, sin término lineal por ser mínimo. Toda pequeña oscilación alrededor de un equilibrio estable es armónica en primera aproximación -- vibraciones moleculares, fonones, modos del campo electromagnético.

**Los operadores.** Se definen combinaciones adimensionales de $\hat X$ y $\hat P$ tales que
$$[a, a^{\dagger}] = 1, \qquad N = a^{\dagger}a, \qquad H = \hbar\omega\left(N + \tfrac{1}{2}\right).$$

**La escalera.** De $[N,a^{\dagger}] = a^{\dagger}$ y $[N,a] = -a$ sale todo:
$$a|n\rangle = \sqrt{n}\,|n-1\rangle, \qquad a^{\dagger}|n\rangle = \sqrt{n+1}\,|n+1\rangle.$$
Los factores no son adorno: garantizan la normalización, y $a|0\rangle = 0$ es lo que corta la escalera por abajo.

**El espectro.** $E_n = \left(n+\frac{1}{2}\right)\hbar\omega$, $n = 0,1,2,\dots$
- **Equiespaciado**: $E_{n+1}-E_n = \hbar\omega$ siempre. Contrasta con el pozo infinito ($\propto n^{2}$).
- **Energía de punto cero** $\hbar\omega/2$: el oscilador nunca está en reposo en el fondo. Es medible -- el helio no solidifica a presión ordinaria ni en el cero absoluto, por esa energía residual.

**Qué es y qué no es hermítico.** $a$ y $a^{\dagger}$ **no** lo son (son adjuntos entre sí), así que no son observables. $N = a^{\dagger}a$ sí. La combinación $a - a^{\dagger}$ es **anti**hermítica; $i(a^{\dagger}-a)$ sí es hermítica, y de hecho $\hat P \propto i(a^{\dagger}-a)$.

**El truco que ahorra integrales.** Como $\hat X \propto (a+a^{\dagger})$, aplicado a $|n\rangle$ da una combinación de $|n\pm1\rangle$, ortogonales a $|n\rangle$. Por lo tanto $\langle n|\hat X|n\rangle = 0$ sin calcular nada. Lo mismo con $\langle n|\hat P|n\rangle = 0$.$qm$,
   $qm$El oscilador anarmónico fue literalmente el primer problema de la mecánica cuántica: es el que Heisenberg calculó en Helgoland en 1925, en el artículo donde aparecen sin nombrarlas las matrices. Fueron Born y Jordan quienes reconocieron, semanas después, que esas tablas de números eran el álgebra matricial que ya existía en matemática.$qm$,
   10),

  ($qm$cuantica/oscilador$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Cuentas con a y a-daga, sin una sola integral$qm$,
   $qm$Se usan $\hat X = \sqrt{\frac{\hbar}{2m\omega}}(a+a^{\dagger})$ y $\hat P = i\sqrt{\frac{m\omega\hbar}{2}}(a^{\dagger}-a)$.

**a) $a^{\dagger}a^{\dagger}|1\rangle$.**
$$a^{\dagger}|1\rangle = \sqrt2\,|2\rangle \;\Rightarrow\; a^{\dagger}\left(\sqrt2|2\rangle\right) = \sqrt2\cdot\sqrt3\,|3\rangle = \sqrt6\,|3\rangle.$$
Los factores se multiplican paso a paso; el estado **normalizado** resultante es $|3\rangle$.

**b) $\langle n|\hat X|n\rangle$.** $\hat X|n\rangle \propto \sqrt{n}|n-1\rangle + \sqrt{n+1}|n+1\rangle$, y ambos son ortogonales a $|n\rangle$. Por lo tanto **0**, para todo $n$. Sin integrales, sin polinomios de Hermite.

**c) $\langle n|\hat X^{2}|n\rangle$.** Solo sobreviven los términos que vuelven a $|n\rangle$, o sea $aa^{\dagger}$ y $a^{\dagger}a$:
$$\langle n|(a+a^{\dagger})^{2}|n\rangle = \langle n|a a^{\dagger} + a^{\dagger}a|n\rangle = (n+1) + n = 2n+1.$$
$$\Rightarrow\ \langle \hat X^{2}\rangle = \frac{\hbar}{2m\omega}(2n+1).$$

**d) $\Delta x\,\Delta p$ en $|n\rangle$.** Análogamente $\langle \hat P^{2}\rangle = \frac{m\omega\hbar}{2}(2n+1)$. Como los valores esperados de $\hat X$ y $\hat P$ son nulos,
$$\Delta x\,\Delta p = \frac{\hbar}{2}(2n+1) = \hbar\left(n+\tfrac12\right).$$
Para $n=0$ da exactamente $\hbar/2$: **el estado fundamental satura la relación de incertidumbre**. Es el estado más "compacto" que la teoría permite.

**e) Control de energía.** $\langle H\rangle = \frac{\langle \hat P^{2}\rangle}{2m} + \frac{m\omega^{2}\langle \hat X^{2}\rangle}{2} = \frac{\hbar\omega}{4}(2n+1) + \frac{\hbar\omega}{4}(2n+1) = \hbar\omega\left(n+\frac12\right)$. Cierra, y de paso muestra que la energía se reparte mitad cinética y mitad potencial -- el teorema del virial para un potencial cuadrático.$qm$,
   null,
   20),

  -- ====================== cuantica/momento_angular ==========================
  ($qm$cuantica/momento_angular$qm$, $qm$text$qm$,
   $qm$Guía — Del álgebra a los autovalores, sin ecuaciones diferenciales (ver Sakurai, cap. 3; Griffiths, cap. 4)$qm$,
   $qm$**El punto de partida es uno solo:**
$$[L_i, L_j] = i\hbar\,\epsilon_{ijk}L_k.$$
Todo lo demás se deduce. Ninguna ecuación diferencial, ningún armónico esférico.

**Paso 1 · Qué conmuta con qué.** $[L^{2}, L_i] = 0$ para las **tres** componentes, pero $[L_x,L_y] = i\hbar L_z \neq 0$. Conclusión: se puede fijar el módulo y **una** proyección. Por convención, $L^{2}$ y $L_z$. La base común es $|l,m\rangle$.

**Paso 2 · Autovalores.**
$$L^{2}|l,m\rangle = \hbar^{2}l(l+1)|l,m\rangle, \qquad L_z|l,m\rangle = \hbar m|l,m\rangle.$$
Ojo con $l(l+1)$, no $l^{2}$: implica $|\vec L| = \hbar\sqrt{l(l+1)} > \hbar l$, o sea que el vector **nunca** se alinea del todo con $z$. Si lo hiciera, $L_x$ y $L_y$ serían ambos exactamente cero, y eso violaría la incertidumbre.

**Paso 3 · La escalera.** Con $L_{\pm} = L_x \pm iL_y$:
$$[L_z, L_{\pm}] = \pm\hbar L_{\pm}, \qquad [L^{2}, L_{\pm}] = 0.$$
El primero dice que $L_{\pm}$ mueve $m$ en $\pm1$. El segundo dice que **no toca $l$**: ahí está la degeneración.
$$L_{\pm}|l,m\rangle = \hbar\sqrt{l(l+1)-m(m\pm1)}\;|l,m\pm1\rangle.$$

**Paso 4 · Por qué se corta.** $L_x^{2}+L_y^{2} = L^{2}-L_z^{2}$ es suma de cuadrados de hermíticos, así que $\langle L^{2}-L_z^{2}\rangle = \hbar^{2}[l(l+1)-m^{2}] \geq 0$. Eso acota $|m| \leq l$, y como la escalera avanza de a 1 sin cambiar $l$, tiene que terminar exacto: $m = -l,\dots,+l$, o sea $2l+1$ estados. Y $2l$ debe ser entero.

**Paso 5 · Por qué $l$ orbital es entero.** El álgebra sola admite semienteros. La restricción extra viene de la representación en funciones del ángulo: $e^{im\varphi}$ debe ser univaluada, y eso fuerza $m \in \mathbb{Z}$. El espín no vive en funciones de posición, así que escapa a esa condición.$qm$,
   $qm$Que los autovalores del momento angular salgan del puro álgebra de conmutadores es el hallazgo de la Dreimännerarbeit -- el "trabajo de los tres hombres" de Born, Heisenberg y Jordan (1926). Pauli lo llevó ese mismo año al caso más duro: resolvió el espectro completo del hidrógeno usando solo relaciones de conmutación, antes de que existiera la ecuación de Schrödinger.$qm$,
   10),

  ($qm$cuantica/momento_angular$qm$, $qm$text$qm$,
   $qm$Recetario de índices — mudos, libres, Levi-Civita y delta$qm$,
   $qm$Casi todos los errores de este tema son de índices, no de física. Cuatro reglas y una rutina.

**Regla 1 · Libre contra mudo.** Un índice que aparece **una vez** en cada término es **libre**: identifica de qué componente se está hablando y debe aparecer igual en los dos lados de la igualdad. Un índice que aparece **dos veces** está sumado: es **mudo**, y su nombre no importa.

**Regla 2 · Nunca reusar un índice libre.** Si se está calculando $[L_i, R_j]$, entonces $i$ y $j$ ya están ocupados. Al sustituir $L_i$ hay que usar **letras nuevas**: $L_i = \epsilon_{ikl}R_kP_l$. Escribir $\epsilon_{ijk}R_jP_k$ ahí es el error número uno del tema, y produce una expresión donde $j$ aparece tres veces, que no significa nada.

**Regla 3 · Antisimetría de $\epsilon$.** Intercambiar **dos** índices cambia el signo; una permutación **cíclica** lo conserva.
$$\epsilon_{ijk} = \epsilon_{jki} = \epsilon_{kij} = -\epsilon_{ikj} = -\epsilon_{jik} = -\epsilon_{kji}.$$
Y $\epsilon_{ijk} = 0$ si dos índices toman el mismo valor.

**Regla 4 · La delta colapsa la suma.** $\delta_{lj}$ dentro de una suma sobre $l$ **no se queda escrita**: fija $l = j$ y desaparece.
$$\sum_l \epsilon_{ikl}\,\delta_{lj} = \epsilon_{ikj}.$$

**La rutina, en el orden en que se aplica:**

1. Identificar los índices libres del enunciado.
2. Sustituir las definiciones usando letras nuevas para los mudos.
3. Sacar afuera $\epsilon$ y las constantes ($i\hbar$ incluido): son números, conmutan con todo.
4. Aplicar la regla del producto, cuidando de qué lado queda cada operador.
5. Evaluar los conmutadores fundamentales ($[R_k,R_j]=0$, $[R_k,P_j]=i\hbar\delta_{kj}$, $[P_l,P_j]=0$).
6. Colapsar las deltas.
7. Acomodar el orden de los índices de $\epsilon$ con antisimetría, absorbiendo signos.
8. Renombrar los mudos que queden para que el resultado tenga la forma pedida.

**Control final:** los índices libres del resultado deben ser exactamente los del enunciado, ni uno más ni uno menos. Si sobra un índice sin aparear, hay un error en el camino.

**Identidad de contracción**, para cuando aparecen **dos** tensores $\epsilon$:
$$\sum_i \epsilon_{ijk}\,\epsilon_{imn} = \delta_{jm}\delta_{kn} - \delta_{jn}\delta_{km}.$$$qm$,
   null,
   20),

  ($qm$cuantica/momento_angular$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — [L_i, R_j], [L_i, P_j] y [L_i, P²] paso a paso$qm$,
   $qm$**Problema 1 · $[L_i, R_j] = i\hbar\,\epsilon_{ijk}R_k$.**

*Paso 1.* Los índices libres son $i$ y $j$, así que la sustitución usa mudos nuevos: $L_i = \epsilon_{ikl}R_kP_l$.

*Paso 2.* $\epsilon$ es un número y sale afuera:
$$[L_i,R_j] = \epsilon_{ikl}\,[R_kP_l, R_j].$$

*Paso 3.* Regla del producto, $[AB,C] = A[B,C] + [A,C]B$:
$$= \epsilon_{ikl}\left(R_k[P_l,R_j] + [R_k,R_j]P_l\right).$$

*Paso 4.* $[R_k,R_j] = 0$ y $[P_l,R_j] = -i\hbar\delta_{lj}$ (con el signo cambiado respecto del canónico, por el orden):
$$= -i\hbar\,\epsilon_{ikl}\,R_k\,\delta_{lj}.$$

*Paso 5.* La delta colapsa la suma sobre $l$, fijando $l=j$:
$$= -i\hbar\,\epsilon_{ikj}R_k.$$

*Paso 6.* Antisimetría: $\epsilon_{ikj} = -\epsilon_{ijk}$, y el signo se absorbe:
$$\boxed{[L_i,R_j] = i\hbar\,\epsilon_{ijk}R_k}$$

**Problema 2 · $[L_i,P_j] = i\hbar\,\epsilon_{ijk}P_k$.** Idéntico hasta el paso 4, pero ahora $[P_l,P_j]=0$ y $[R_k,P_j] = +i\hbar\delta_{kj}$ (orden canónico, signo positivo):
$$[L_i,P_j] = i\hbar\,\epsilon_{ikl}\,\delta_{kj}\,P_l = i\hbar\,\epsilon_{ijl}P_l = i\hbar\,\epsilon_{ijk}P_k,$$
donde el último paso es solo **renombrar** el mudo $l \to k$. Sin cambio de signo: la diferencia con el problema 1 es el orden en que aparecen $R$ y $P$.

**Problema 3 · $[L_i, P^{2}] = 0$.** Con $P^{2} = P_jP_j$ y la regla $[A,BC] = [A,B]C + B[A,C]$:
$$[L_i,P_jP_j] = [L_i,P_j]P_j + P_j[L_i,P_j] = i\hbar\,\epsilon_{ijk}\left(P_kP_j + P_jP_k\right) = 2i\hbar\,\epsilon_{ijk}P_jP_k,$$
usando que las componentes de $\vec P$ conmutan entre sí.

*El cierre.* Sea $S = \epsilon_{ijk}P_jP_k$. Renombrando los mudos $j \leftrightarrow k$ (permitido: están sumados):
$$S = \epsilon_{ikj}P_kP_j = (-\epsilon_{ijk})(P_jP_k) = -S \;\Rightarrow\; S = 0.$$
Es el argumento general: **la contracción de un objeto antisimétrico con uno simétrico siempre se anula.**

*Consecuencia física.* $H = P^{2}/2m$ para la partícula libre, así que $[L_i,H]=0$ y el momento angular se conserva. Es la isotropía del espacio.$qm$,
   null,
   30),

  ($qm$cuantica/momento_angular$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Escalera: acción, normas y corte$qm$,
   $qm$**Problema 1 · Deducir $[L_z, L_{\pm}] = \pm\hbar L_{\pm}$.**
$$[L_z, L_x \pm iL_y] = [L_z,L_x] \pm i[L_z,L_y] = i\hbar L_y \pm i(-i\hbar L_x) = i\hbar L_y \pm \hbar L_x.$$
Factorizando $\pm\hbar$: $= \pm\hbar\left(L_x \pm iL_y\right) = \pm\hbar L_{\pm}$. Las dos $i$ se combinan y desaparecen -- si en el resultado queda una $i$, hay un error.

**Problema 2 · Por qué $L_{\pm}$ sube o baja $m$.** Reordenando el conmutador: $L_zL_{\pm} = L_{\pm}L_z \pm \hbar L_{\pm} = L_{\pm}(L_z \pm \hbar)$. Aplicando a $|l,m\rangle$:
$$L_z\left(L_{\pm}|l,m\rangle\right) = \hbar(m\pm1)\left(L_{\pm}|l,m\rangle\right).$$
Y como $[L^{2},L_{\pm}]=0$, el mismo estado sigue teniendo autovalor $\hbar^{2}l(l+1)$ para $L^{2}$: **cambia $m$, no $l$**.

**Problema 3 · El factor de normalización.** Se usa la identidad
$$L_{\mp}L_{\pm} = L^{2} - L_z^{2} \mp \hbar L_z.$$
Entonces
$$\|L_{\pm}|l,m\rangle\|^{2} = \langle l,m|L_{\mp}L_{\pm}|l,m\rangle = \hbar^{2}\left[l(l+1) - m^{2} \mp m\right] = \hbar^{2}\left[l(l+1)-m(m\pm1)\right],$$
de donde $L_{\pm}|l,m\rangle = \hbar\sqrt{l(l+1)-m(m\pm1)}\,|l,m\pm1\rangle$.

*Verificación del corte:* con $m = l$ y signo $+$, el radicando es $l(l+1)-l(l+1) = 0$. La escalera se corta sola, sin postularlo. Con $m = -l$ y signo $-$, ídem.

**Problema 4 · Caso numérico, $l = 1$, $m = 0$.**
$$L_+|1,0\rangle = \hbar\sqrt{1\cdot2 - 0\cdot1}\;|1,1\rangle = \hbar\sqrt2\,|1,1\rangle.$$
$$L_+|1,1\rangle = \hbar\sqrt{2 - 1\cdot2}\;|1,2\rangle = 0. \quad\checkmark$$

**Problema 5 · La degeneración.** Para $l$ fijo hay $2l+1$ estados ($m=-l,\dots,l$) con el **mismo** autovalor $\hbar^{2}l(l+1)$ de $L^{2}$. Eso es la degeneración de $L^{2}$, y la escalera es la demostración constructiva: genera los $2l+1$ estados a partir de uno solo.$qm$,
   null,
   40),

  -- ==================== cuantica/armonicos_esfericos ========================
  ($qm$cuantica/armonicos_esfericos$qm$, $qm$text$qm$,
   $qm$Guía — Armónicos esféricos y el problema central (ver Griffiths, cap. 4; Weyl, cap. III)$qm$,
   $qm$**La separación.** Con $V = V(r)$, la ecuación de Schrödinger se separa como
$$\psi_{nlm}(r,\theta,\varphi) = R_{nl}(r)\,Y_l^m(\theta,\varphi).$$
La parte angular **no depende del potencial**: es la misma para el hidrógeno, para un oscilador isótropo y para un pozo esférico. Lo único que cambia es $R_{nl}$.

**Por qué.** Porque el operador angular que aparece al separar es siempre $L^{2}$, y $[H,L^{2}]=[H,L_z]=0$ para todo potencial central. Es simetría, no dinámica.

**Los $Y_l^m$ son autofunciones simultáneas** de $L^{2}$ (autovalor $\hbar^{2}l(l+1)$) y de $L_z$ (autovalor $\hbar m$). Los dos índices son exactamente esos dos números cuánticos.

**Ortonormalidad — con el jacobiano.**
$$\int_0^{2\pi}\!\!\int_0^{\pi} Y_{l'}^{m'*}\,Y_l^m \;\sin\theta\,d\theta\,d\varphi = \delta_{ll'}\,\delta_{mm'}.$$
El $\sin\theta$ es parte de $d\Omega$ y **no es opcional**: sin él se pierde la ortogonalidad. Es el error más caro del tema, porque no se nota hasta el final.

**Paridad.** Bajo $\vec r \to -\vec r$ (o sea $\theta\to\pi-\theta$, $\varphi\to\varphi+\pi$):
$$Y_l^m \to (-1)^{l}\,Y_l^m.$$
Depende de $l$, **no** de $m$. De ahí sale la regla de selección dipolar $\Delta l = \pm1$: la integral $\langle l'|z|l\rangle$ se anula por paridad salvo que $l$ y $l'$ tengan paridades opuestas.

**La barrera centrífuga.** La ecuación radial contiene
$$V_{ef}(r) = V(r) + \frac{l(l+1)\hbar^{2}}{2mr^{2}},$$
un término **repulsivo** que crece con $l$. Consecuencia directa: $R_{nl}(r) \sim r^{l}$ cerca del origen, así que solo los estados $s$ ($l=0$) tienen densidad no nula en $r=0$.

**Casos que conviene tener memorizados:** $Y_0^0 = \frac{1}{\sqrt{4\pi}}$ (constante, isótropo) y $Y_1^0 \propto \cos\theta$ (los dos lóbulos del orbital $p_z$).$qm$,
   $qm$Los armónicos esféricos son siglo y medio más viejos que la mecánica cuántica: Laplace y Legendre los introdujeron en la década de 1780 para el problema de la atracción gravitatoria de un esferoide. La teoría cuántica no los inventó, los heredó -- cualquier potencial que dependa solo de la distancia separa igual sus variables angulares, sea gravitatorio o de Coulomb.$qm$,
   10),

  ($qm$cuantica/armonicos_esfericos$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Probabilidades angulares y paridad$qm$,
   $qm$**Problema 1.** La parte angular de un estado es
$$\Phi(\theta,\varphi) = \frac{1}{\sqrt{14}}\left(2\,Y_1^{-1} + 3\,Y_1^{0} + Y_1^{1}\right).$$

*a) ¿Está normalizado?* $\frac{1}{14}(4+9+1) = 1$. Sí. (Esto ya usa la ortonormalidad con el $\sin\theta$; sin el jacobiano el cálculo no cerraría.)

*b) $P(L_z = -\hbar)$.* Corresponde a $m=-1$: $P = |2/\sqrt{14}|^{2} = 4/14 = 2/7$.

*c) $P(L^{2} = 2\hbar^{2})$.* $2\hbar^{2} = \hbar^{2}l(l+1)$ da $l=1$, y **los tres** términos tienen $l=1$. Por lo tanto $P = 1$: el estado tiene $L^{2}$ perfectamente definido, aunque $L_z$ no lo tenga.

*d) $\langle L_z\rangle$.* $= \frac{4}{14}(-\hbar) + \frac{9}{14}(0) + \frac{1}{14}(+\hbar) = -\frac{3}{14}\hbar$.

*Control:* $|\langle L_z\rangle| \leq \hbar l = \hbar$. Cumple.

*e) Estado después de medir $L_z = 0$.* Colapsa a $Y_1^{0}$, normalizado. Una segunda medición de $L_z$ da 0 con certeza.

**Problema 2 · Paridad.** ¿Se anula $\int Y_2^{0*}\,z\;Y_1^{0}\,d\Omega$ por paridad?

*Solución.* $Y_2^0$ tiene paridad $(-1)^{2} = +$, $z$ es impar, $Y_1^0$ tiene paridad $(-1)^{1} = -$. El producto es $(+)(-)(-) = +$: **par**, así que la integral **no** se anula por paridad. Coherente con la regla de selección $\Delta l = \pm1$, que acá se cumple ($2 \to 1$).

*Contraste:* $\int Y_2^{0*}\,z\;Y_0^{0}\,d\Omega$ da paridad $(+)(-)(+) = -$, impar, y por lo tanto **se anula**. Y en efecto $\Delta l = 2$, prohibido.

**Cómo usar esto en un examen:** antes de plantear cualquier integral angular, chequear la paridad. Si el integrando es impar, el resultado es cero y no hay nada que calcular.$qm$,
   null,
   20),

  -- ============================ cuantica/espin ==============================
  ($qm$cuantica/espin$qm$, $qm$text$qm$,
   $qm$Guía — Espín 1/2, matrices de Pauli y Stern-Gerlach (ver Griffiths, cap. 4; Sakurai, cap. 1)$qm$,
   $qm$**Qué es.** Un momento angular **intrínseco**, propiedad del tipo de partícula igual que la masa o la carga. No es rotación literal: para reproducir el valor observado, un electrón del tamaño clásico tendría que girar en su superficie a mucho más que $c$. Lorentz se lo señaló a Uhlenbeck y Goudsmit apenas lo propusieron, en 1925.

**Satisface la misma álgebra que $\vec L$:** $[S_i,S_j] = i\hbar\epsilon_{ijk}S_k$. Por eso toda la estructura deducida del álgebra vale igual: $S^{2}$ con autovalor $\hbar^{2}s(s+1)$, $S_z$ con $\hbar m_s$, escalera, multiplicidad $2s+1$.

**La diferencia:** $s$ puede ser **semientero**. La condición de univaluación de $e^{im\varphi}$ que obliga a $l$ entero no lo alcanza, porque el espín no vive en funciones de posición.

**Espín 1/2 en concreto.** $m_s = \pm1/2$, autovalores de $S_z$ iguales a $\pm\hbar/2$, y $S^{2} = \frac{3}{4}\hbar^{2}I$.
$$\vec S = \frac{\hbar}{2}\vec\sigma, \qquad \sigma_x = \begin{pmatrix}0&1\\1&0\end{pmatrix},\; \sigma_y = \begin{pmatrix}0&-i\\i&0\end{pmatrix},\; \sigma_z = \begin{pmatrix}1&0\\0&-1\end{pmatrix}.$$

**Propiedades de las Pauli que se piden de memoria:**
- $\sigma_i^{2} = I$ (autovalores $\pm1$).
- $[\sigma_i,\sigma_j] = 2i\,\epsilon_{ijk}\sigma_k$ — el $\hbar$ aparece recién al pasar a $\vec S$.
- $\{\sigma_i,\sigma_j\} = 2\delta_{ij}I$ (anticonmutan si $i\neq j$).
- $\sigma_x\sigma_y = i\sigma_z$ y cíclicas.
- Traza nula, hermíticas y unitarias a la vez.

**Autoestados de $S_x$** en la base de $S_z$: $|\pm x\rangle = \frac{1}{\sqrt2}\left(|{\uparrow}\rangle \pm |{\downarrow}\rangle\right)$.

**Stern-Gerlach en cadena.** Cada aparato **reprepara** el estado. Filtrar $+z$, después $+x$, y volver a medir $z$ da $50/50$: medir en $x$ destruye la información sobre $z$. No son filtros clásicos que se acumulan.

**Rotación de $2\pi$.** El operador es $e^{-i\theta\,\vec\sigma\cdot\hat n/2}$, y ese $1/2$ hace que una vuelta completa dé $-I$: hacen falta $4\pi$. No es una curiosidad formal -- se midió con interferometría de neutrones en 1975, y el patrón se invierte.$qm$,
   $qm$El experimento de Stern y Gerlach partió un haz de plata en dos en 1922, tres años antes de que existiera el concepto de espín, y se leyó como confirmación de la cuantización espacial de Bohr-Sommerfeld. Era la interpretación equivocada: un momento angular orbital da siempre un número impar de haces, 2l+1. El resultado correcto llegó por la razón incorrecta.$qm$,
   10),

  ($qm$cuantica/espin$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Pauli, Stern-Gerlach en cadena y precesión$qm$,
   $qm$**Problema 1 · Cadena de Stern-Gerlach.** Un haz no polarizado pasa por SG-$z$ y se queda con la salida $+z$. Ese haz entra en SG-$x$ y se queda con $+x$. Finalmente entra en SG-$z$. ¿Qué fracción sale por $+z$?

*Solución.* Tras el primer aparato el estado es $|{\uparrow}\rangle$. La probabilidad de pasar el segundo filtro es
$$\left|\langle +x|{\uparrow}\rangle\right|^{2} = \left|\tfrac{1}{\sqrt2}\right|^{2} = \tfrac12.$$
Tras el segundo, el estado es $|+x\rangle = \frac{1}{\sqrt2}(|{\uparrow}\rangle+|{\downarrow}\rangle)$. La probabilidad de salir por $+z$ es
$$\left|\langle{\uparrow}|+x\rangle\right|^{2} = \tfrac12.$$

**El punto:** el segundo aparato borró la información de $z$. Si se lo quita, el tercer aparato daría $100\,\%$ en $+z$. **Agregar** un filtro intermedio hace aparecer partículas en la salida $-z$, que antes no existían: eso no ocurre con polarizadores clásicos en configuraciones análogas sin ángulo intermedio.

**Problema 2 · Valor esperado.** Para $|\psi\rangle = \frac{1}{\sqrt5}\begin{pmatrix}1\\2i\end{pmatrix}$, calcular $\langle S_z\rangle$ y $\langle S_x\rangle$.

*Solución.* $\langle S_z\rangle = \frac{\hbar}{2}\left(|c_\uparrow|^{2} - |c_\downarrow|^{2}\right) = \frac{\hbar}{2}\left(\tfrac15 - \tfrac45\right) = -\tfrac{3\hbar}{10}$.

Para $S_x$: $\sigma_x|\psi\rangle = \frac{1}{\sqrt5}\begin{pmatrix}2i\\1\end{pmatrix}$, y
$$\langle\sigma_x\rangle = \tfrac{1}{5}\left(1^{*}\cdot 2i + (2i)^{*}\cdot 1\right) = \tfrac{1}{5}\left(2i - 2i\right) = 0 \;\Rightarrow\; \langle S_x\rangle = 0.$$

*Control:* $\langle S_x\rangle$, $\langle S_y\rangle$, $\langle S_z\rangle$ forman un vector de módulo $\leq \hbar/2$. Acá el módulo es $3\hbar/10 < \hbar/2$. Consistente.

**Problema 3 · Precesión de Larmor.** Con $H = -\gamma B_0 S_z$ y estado inicial $|+x\rangle$, ¿qué hace $\langle \vec S\rangle$?

*Solución.* Los autoestados de $H$ son $|{\uparrow}\rangle$ y $|{\downarrow}\rangle$, con energías $\mp\gamma B_0\hbar/2$. La fase relativa evoluciona con $\omega = \gamma B_0$, y el resultado es
$$\langle S_x\rangle = \tfrac{\hbar}{2}\cos\omega t, \quad \langle S_y\rangle = \tfrac{\hbar}{2}\sin\omega t, \quad \langle S_z\rangle = 0.$$
El vector precede alrededor de $z$ con la frecuencia de Larmor, exactamente como un trompo clásico. Es la base de la resonancia magnética.$qm$,
   null,
   20),

  -- ======================= cuantica/suma_momentos ============================
  ($qm$cuantica/suma_momentos$qm$, $qm$text$qm$,
   $qm$Guía — Suma de momentos angulares y Clebsch-Gordan (ver Sakurai, cap. 3; Weyl, cap. IV)$qm$,
   $qm$**La hipótesis clave.** $\vec J_1$ y $\vec J_2$ actúan sobre espacios de Hilbert **distintos**, así que
$$[J_{1i}, J_{2j}] = 0 \quad \text{para todo } i,j.$$
De ahí se sigue todo lo demás.

**El teorema.** Con $\vec J = \vec J_1 + \vec J_2$, expandiendo por bilinealidad:
$$[J_i,J_j] = [J_{1i},J_{1j}] + \underbrace{[J_{1i},J_{2j}]}_{0} + \underbrace{[J_{2i},J_{1j}]}_{0} + [J_{2i},J_{2j}] = i\hbar\epsilon_{ijk}\left(J_{1k}+J_{2k}\right) = i\hbar\epsilon_{ijk}J_k.$$
**La suma de dos momentos angulares es un momento angular.** No es un detalle técnico: significa que todo lo demostrado a partir del álgebra (autovalores, escalera, multiplicidad) vale automáticamente para $\vec J$, sin rehacer nada.

**Las dos bases.**

| | Base desacoplada | Base acoplada |
|---|---|---|
| Observables | $J_1^{2}, J_2^{2}, J_{1z}, J_{2z}$ | $J_1^{2}, J_2^{2}, J^{2}, J_z$ |
| Etiquetas | $|j_1 m_1; j_2 m_2\rangle$ | $|j_1 j_2; j\,m\rangle$ |
| Definido | $m_1$ y $m_2$ | $j$ y $m$ |

Los dos son conjuntos completos de observables compatibles del **mismo** espacio, así que tienen la misma dimensión y hay una matriz unitaria que los conecta: sus elementos son los coeficientes de Clebsch-Gordan $\langle j_1m_1\,j_2m_2|j\,m\rangle$. Son **amplitudes**, no probabilidades: pueden ser negativos.

**La regla de composición.**
$$|j_1 - j_2| \;\leq\; j \;\leq\; j_1+j_2, \qquad \text{de a saltos enteros.}$$
Con $m = m_1+m_2$ siempre.

**Control de dimensiones, obligatorio:**
$$(2j_1+1)(2j_2+1) = \sum_{j=|j_1-j_2|}^{j_1+j_2} (2j+1).$$
Ejemplo $j_1=1$, $j_2=1/2$: $3\times2 = 6 = 4 + 2$ ($j=3/2$ y $j=1/2$). Si no cierra, hay un error.

**El método constructivo.** El estado tope $|j_1+j_2, j_1+j_2\rangle$ es el **único** con ese $m$, así que coincide con el producto $|m_1=j_1\rangle|m_2=j_2\rangle$ y su coeficiente vale 1. Desde ahí se baja con $J_- = J_{1-}+J_{2-}$ para generar todo el multiplete, y el siguiente multiplete sale por ortogonalidad. Así se obtiene cualquier tabla sin memorizarla.

**Espín-órbita.** $\vec L\cdot\vec S = \frac{1}{2}\left(J^{2}-L^{2}-S^{2}\right)$, diagonal en la base acoplada, con autovalor $\frac{\hbar^{2}}{2}\left[j(j+1)-l(l+1)-s(s+1)\right]$. Con ese término en $H$, $L_z$ y $S_z$ dejan de conservarse; $J^{2}$, $J_z$, $L^{2}$ y $S^{2}$ siguen conservándose.$qm$,
   $qm$Los coeficientes llevan el nombre de Alfred Clebsch y Paul Gordan, dos matemáticos del siglo XIX que trabajaban en teoría de invariantes y nunca oyeron hablar de un átomo. Wigner mostró en 1931 que acoplar dos momentos angulares es descomponer un producto de representaciones del grupo de rotaciones: exactamente el mismo problema algebraico, con sesenta años de diferencia.$qm$,
   10),

  ($qm$cuantica/suma_momentos$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Dos espines 1/2: triplete, singlete y coeficientes a mano$qm$,
   $qm$Se acoplan $s_1 = s_2 = 1/2$. Dimensión del espacio producto: $2\times2 = 4$.

**a) Valores posibles de $s$.** $|1/2-1/2| \leq s \leq 1/2+1/2$, o sea $s = 0$ y $s = 1$.

*Control de dimensiones:* $(2\cdot1+1) + (2\cdot0+1) = 3+1 = 4$. Cierra.

**b) Estado tope.** El único estado con $m = +1$ es $|{\uparrow\uparrow}\rangle$, así que
$$|s=1, m=1\rangle = |{\uparrow\uparrow}\rangle.$$

**c) Bajar con $S_- = S_{1-} + S_{2-}$.** Usando $S_-|{\uparrow}\rangle = \hbar|{\downarrow}\rangle$ y $S_-|{\downarrow}\rangle = 0$:
$$S_-|{\uparrow\uparrow}\rangle = \hbar\left(|{\downarrow\uparrow}\rangle + |{\uparrow\downarrow}\rangle\right).$$
Del otro lado, con la fórmula general ($l\to s=1$, $m=1$):
$$S_-|1,1\rangle = \hbar\sqrt{1\cdot2 - 1\cdot0}\;|1,0\rangle = \hbar\sqrt2\,|1,0\rangle.$$
Igualando:
$$|1,0\rangle = \tfrac{1}{\sqrt2}\left(|{\uparrow\downarrow}\rangle + |{\downarrow\uparrow}\rangle\right).$$
Los coeficientes de Clebsch-Gordan salieron solos: valen $1/\sqrt2$ cada uno.

**d) Bajar una vez más.** $|1,-1\rangle = |{\downarrow\downarrow}\rangle$. El triplete está completo, y es **simétrico** bajo intercambio.

**e) El singlete, por ortogonalidad.** El estado que falta tiene $m=0$ y debe ser ortogonal a $|1,0\rangle$:
$$|0,0\rangle = \tfrac{1}{\sqrt2}\left(|{\uparrow\downarrow}\rangle - |{\downarrow\uparrow}\rangle\right),$$
**antisimétrico**. Notar el coeficiente negativo: por eso son amplitudes, no probabilidades.

**f) Verificación con $\vec S_1\cdot\vec S_2$.** De $S^{2} = S_1^{2}+S_2^{2}+2\vec S_1\cdot\vec S_2$:
$$\vec S_1\cdot\vec S_2 = \tfrac{\hbar^{2}}{2}\left[s(s+1) - \tfrac34 - \tfrac34\right] = \begin{cases}+\hbar^{2}/4 & (s=1)\\ -3\hbar^{2}/4 & (s=0)\end{cases}$$

**g) Para qué sirve.** En el helio, el triplete simétrico de espín obliga a una parte espacial **antisimétrica**, que mantiene a los electrones más separados y baja la repulsión: el ortohelio tiene menos energía que el parahelio. Y el singlete es el estado entrelazado que aparece en EPR y en las desigualdades de Bell.$qm$,
   null,
   20),

  -- ========================== cuantica/hidrogeno ============================
  ($qm$cuantica/hidrogeno$qm$, $qm$text$qm$,
   $qm$Guía — Átomo de hidrógeno (ver Griffiths, cap. 4; Gottfried & Yan, cap. 5)$qm$,
   $qm$**El espectro.**
$$E_n = -\frac{13{,}6\ \mathrm{eV}}{n^{2}}, \qquad n = 1,2,3,\dots$$
Depende **solo de $n$**. Ese es el rasgo excepcional del potencial de Coulomb.

**Los números cuánticos y sus rangos:**
- $n = 1,2,3,\dots$ (principal)
- $l = 0,1,\dots,n-1$ (nunca $l = n$)
- $m = -l,\dots,+l$
- $m_s = \pm1/2$

**Degeneración.** $\sum_{l=0}^{n-1}(2l+1) = n^{2}$ estados orbitales por nivel, o $2n^{2}$ contando el espín. Para $n=2$: 8 estados, el mismo 8 del segundo período de la tabla periódica.

**Las dos degeneraciones son de naturaleza distinta:**
- En $m$: la explica la **simetría rotacional**, y existe en todo potencial central.
- En $l$: es la llamada **degeneración accidental**, exclusiva del $1/r$ exacto. Fock mostró en 1935 que se debe a una simetría oculta más grande, la del grupo de rotaciones en cuatro dimensiones, asociada al vector de Runge-Lenz -- la misma cantidad que en mecánica celeste explica que las órbitas de Kepler no precesen.

**Qué rompe cada una:**
- La de $m$: un campo externo (efecto Zeeman con campo magnético, Stark con eléctrico), que destruye la isotropía.
- La de $l$: cualquier desviación del $1/r$ puro. En átomos multielectrónicos el apantallamiento la levanta, y de ahí sale la regla de llenado ($4s$ antes que $3d$) y la forma de la tabla periódica.
- El espín-órbita desdobla según $j$ (estructura fina) pero **no** rompe la degeneración en $m_j$.

**La parte radial.** $R_{nl}(r) \sim r^{l}$ cerca del origen por la barrera centrífuga: solo los estados $s$ ($l=0$) tienen densidad no nula en el núcleo. De ahí el desplazamiento isotópico y el acoplamiento hiperfino de contacto, responsable de la línea de 21 cm de la radioastronomía.$qm$,
   $qm$El hidrógeno se resolvió dos veces en 1926, por caminos que parecían incompatibles: Pauli en enero, con puro álgebra de operadores y el vector de Runge-Lenz heredado de la mecánica celeste; Schrödinger unas semanas después, como problema de autovalores de una ecuación diferencial. Que ambos dieran lo mismo fue uno de los primeros indicios de que matricial y ondulatoria eran la misma teoría.$qm$,
   10),

  ($qm$cuantica/hidrogeno$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Conteo de estados, transiciones e ionización$qm$,
   $qm$**Problema 1 · Conteo.** ¿Cuántos estados hay con $n=3$? Enumerarlos.

*Solución.* $l = 0,1,2$.
- $l=0$: $m=0$ → 1 estado (3s)
- $l=1$: $m=-1,0,1$ → 3 estados (3p)
- $l=2$: $m=-2,\dots,2$ → 5 estados (3d)

Total orbital: $1+3+5 = 9 = n^{2}$. Con espín: $18 = 2n^{2}$.

**Problema 2 · Ionización desde un estado excitado.** ¿Cuánta energía hace falta para ionizar hidrógeno en $n=3$?

*Solución.* $E_3 = -13{,}6/9 = -1{,}51$ eV. Ionizar es llevarlo a $E=0$: hacen falta $1{,}51$ eV.

*Trampa habitual:* responder $13{,}6$ eV, que es la ionización desde el **fundamental**.

**Problema 3 · Longitud de onda de una transición.** ¿Qué $\lambda$ emite la transición $n=3 \to n=2$ (H-alfa)?

*Solución.* $\Delta E = E_3 - E_2 = -1{,}51 - (-3{,}40) = 1{,}89$ eV. Con $hc \approx 1240\ \mathrm{eV\cdot nm}$:
$$\lambda = \frac{1240}{1{,}89} \approx 656\ \mathrm{nm}.$$
Es la línea roja característica de las nebulosas de hidrógeno. El valor tabulado es $656{,}3$ nm.

**Problema 4 · Orden de niveles.** ¿$3s$, $3p$ y $3d$ tienen la misma energía en hidrógeno? ¿Y en sodio?

*Solución.* En **hidrógeno**, sí: $E$ depende solo de $n$ (hasta correcciones finas de orden $10^{-4}$ eV). En **sodio**, no: los electrones internos apantallan el núcleo, el potencial deja de ser $1/r$ puro, y los estados de $l$ chico -- que penetran más cerca del núcleo y sienten menos apantallamiento -- bajan su energía. Por eso $E(3s) < E(3p) < E(3d)$, y por eso el $4s$ se llena antes que el $3d$.

**Problema 5 · Control conceptual.** ¿Cuál de estos estados no existe: $|n=2,l=1,m=-1\rangle$, $|n=2,l=2,m=0\rangle$, $|n=3,l=0,m=0\rangle$?

*Solución.* El segundo: exige $l = n$, y el máximo es $l = n-1 = 1$.$qm$,
   null,
   20),

  -- ======================= cuantica/perturbaciones ==========================
  ($qm$cuantica/perturbaciones$qm$, $qm$text$qm$,
   $qm$Guía — Perturbaciones estacionarias y método variacional (ver Griffiths, caps. 6-7; Sakurai, cap. 5)$qm$,
   $qm$**El planteo.** $H = H_0 + \lambda H'$, con $H_0$ resuelto.

**Caso NO degenerado.**
$$E_n^{(1)} = \langle n^{(0)}|H'|n^{(0)}\rangle$$
$$|n^{(1)}\rangle = \sum_{k\neq n} \frac{\langle k^{(0)}|H'|n^{(0)}\rangle}{E_n^{(0)}-E_k^{(0)}}\;|k^{(0)}\rangle$$
$$E_n^{(2)} = \sum_{k\neq n} \frac{\left|\langle k^{(0)}|H'|n^{(0)}\rangle\right|^{2}}{E_n^{(0)}-E_k^{(0)}}$$

Cómo distinguirlas de un vistazo: la corrección de primer orden a la **energía** es un número y no lleva suma; la de primer orden al **estado** es un ket; la de segundo orden a la energía lleva módulo al cuadrado y suma.

**Un resultado que sirve de control:** para el estado **fundamental**, $E_0^{(2)} \leq 0$ siempre. Los numeradores son no negativos y todos los denominadores $E_0-E_k$ son negativos. Si un cálculo da positivo, hay un error.

**Caso DEGENERADO.** La fórmula de arriba **explota** (denominadores nulos). El procedimiento correcto es otro:

1. Construir la matriz de $H'$ **restringida al subespacio degenerado**: $W_{ab} = \langle a|H'|b\rangle$.
2. Diagonalizarla.
3. Sus autovalores son las correcciones de primer orden, y sus autovectores son la base "buena".

La perturbación elige la base; usar la que uno traía es arbitrario, porque cualquier combinación dentro del subespacio degenerado era igual de válida. Este es el error de examen más frecuente del tema.

**Cuándo es confiable.** No basta con que $H'$ sea "chico": la condición es
$$\left|\langle k|H'|n\rangle\right| \;\ll\; \left|E_n^{(0)}-E_k^{(0)}\right|.$$
Es una comparación con las **separaciones entre niveles**, y explica por qué la degeneración rompe el método.

**Método variacional.** Para cualquier $|\phi\rangle$,
$$E[\phi] = \frac{\langle\phi|H|\phi\rangle}{\langle\phi|\phi\rangle} \;\geq\; E_0.$$
Siempre una cota **superior**, con igualdad solo si $|\phi\rangle$ es el fundamental. Se elige una familia con parámetros y se **minimiza**. Para estados excitados hay que exigir ortogonalidad a todos los de menor energía, y esa es su principal limitación.

**Cuándo usar cuál.** Perturbaciones cuando hay un problema exacto cercano y se buscan desdoblamientos finos. Variacional cuando no se parece a nada resuelto -- el helio es el ejemplo clásico.$qm$,
   $qm$El método se llama de Rayleigh-Schrödinger porque Lord Rayleigh lo había usado en su Theory of Sound (1877) para corregir las frecuencias de una cuerda de densidad no uniforme, y Schrödinger lo trasladó en 1926 a su ecuación. La idea es más vieja todavía: viene de la mecánica celeste, de calcular cuánto desvía Júpiter la órbita de un planeta que, sin él, sería una elipse exacta.$qm$,
   10),

  ($qm$cuantica/perturbaciones$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Un nivel degenerado, hecho bien y hecho mal$qm$,
   $qm$**El sistema.** $H_0$ tiene un nivel degenerado de energía $E^{(0)}$ con dos autoestados ortonormales $|1\rangle$ y $|2\rangle$. La perturbación, restringida a ese subespacio, tiene matriz
$$W = \begin{pmatrix} 0 & \delta \\ \delta & 0\end{pmatrix}, \qquad \delta > 0.$$

**El camino incorrecto.** Aplicar la fórmula no degenerada a cada estado:
$$E_1^{(1)} \overset{?}{=} \langle1|H'|1\rangle = 0, \qquad E_2^{(1)} \overset{?}{=} \langle2|H'|2\rangle = 0.$$
Conclusión: la perturbación no hace nada. **Es falso**, y el error es delatable: la respuesta depende de qué base se eligió dentro del subespacio degenerado, y esa elección era arbitraria.

**El camino correcto.** Diagonalizar $W$. Los autovalores salen de $\det(W - \varepsilon I) = 0$:
$$\varepsilon^{2} - \delta^{2} = 0 \;\Rightarrow\; \varepsilon = \pm\delta.$$
El nivel se **desdobla** en dos, separados por $2\delta$:
$$E_\pm = E^{(0)} \pm \delta.$$
Los autovectores son $|\pm\rangle = \frac{1}{\sqrt2}\left(|1\rangle \pm |2\rangle\right)$: esa es la base "buena", la que la perturbación elige.

**Control.** En la base buena, la fórmula no degenerada sí funciona: $\langle+|H'|+\rangle = +\delta$ y $\langle-|H'|-\rangle = -\delta$. Coincide. Es decir: la fórmula no degenerada no estaba mal, estaba aplicada en la base equivocada.

**Cómo reconocer el caso en un examen.** Dos señales:
1. El enunciado menciona un nivel degenerado (o un $l>0$, o cualquier simetría).
2. Los elementos **diagonales** de $H'$ en la base dada dan cero pero los de fuera de la diagonal no.

Ante cualquiera de las dos, hay que diagonalizar.

**Ejemplo real.** El efecto Stark lineal en $n=2$ del hidrógeno es exactamente esto: los estados $2s$ y $2p_0$ son degenerados, la perturbación $e\mathcal{E}z$ tiene diagonal nula (por paridad) y elemento cruzado no nulo (porque $2s$ y $2p$ tienen paridades opuestas). El nivel se desdobla **linealmente** en el campo. En el estado fundamental, en cambio, no hay degeneración, la corrección de primer orden se anula por paridad, y el efecto aparece recién a segundo orden: cuadrático.$qm$,
   null,
   20),

  -- ========================== cuantica/identicas ============================
  ($qm$cuantica/identicas$qm$, $qm$text$qm$,
   $qm$Guía — Partículas idénticas y exclusión (ver Griffiths, cap. 5; Sakurai & Napolitano, cap. 7)$qm$,
   $qm$**El argumento, en tres pasos.**

1. Si dos partículas son idénticas, ningún experimento las distingue: $|\psi(1,2)|^{2} = |\psi(2,1)|^{2}$.
2. Eso deja exactamente **dos** posibilidades para $\psi$: el factor de intercambio vale $+1$ o $-1$ (aplicar el intercambio dos veces debe devolver el original, así que el factor al cuadrado es 1).
3. La naturaleza usa las dos. **Bosones** (simétrica) y **fermiones** (antisimétrica).

**Teorema espín-estadística.** Espín entero $\Rightarrow$ bosón; espín semientero $\Rightarrow$ fermión. En mecánica cuántica no relativista funciona como postulado; Pauli lo **demostró** en 1940, ya dentro de la teoría cuántica de campos relativista, usando causalidad y positividad de la energía.

**Pauli, en su forma general.** El principio de exclusión no es "dos electrones no pueden estar en el mismo orbital" -- eso es la versión escolar, y es falsa tal cual: dos electrones **sí** comparten orbital si tienen espín opuesto. El enunciado correcto es que la función de onda **total** (espacial $\times$ espín) es antisimétrica; si dos fermiones ocuparan el mismo estado completo, intercambiarlos daría $\psi = -\psi$, o sea $\psi \equiv 0$.

**Determinante de Slater.** La forma automática de construir un estado antisimétrico de $N$ fermiones: intercambiar dos partículas equivale a intercambiar dos columnas, y un determinante cambia de signo. Y Pauli aparece solo: dos partículas en el mismo estado son dos filas iguales, y el determinante se anula. Para bosones se usa el **permanente**, igual pero con todos los signos positivos.

**El conteo, que es lo que se pregunta.** Dos partículas en dos estados $a$ y $b$:

| | Estados posibles |
|---|---|
| Distinguibles | 4 ($aa$, $ab$, $ba$, $bb$) |
| Bosones | 3 ($aa$, $bb$, y $ab$ simétrico) |
| Fermiones | 1 ($ab$ antisimétrico) |

Esas tres cuentas son Maxwell-Boltzmann, Bose-Einstein y Fermi-Dirac.

**La interacción de intercambio.** No hay ninguna fuerza nueva: la simetría obligatoria correlaciona las posiciones. Espín triplete (simétrico) $\Rightarrow$ parte espacial antisimétrica $\Rightarrow$ electrones más separados $\Rightarrow$ menos repulsión de Coulomb $\Rightarrow$ menos energía. Es por eso que el ortohelio está por debajo del parahelio, y es el mismo mecanismo detrás del ferromagnetismo.$qm$,
   $qm$Pauli formuló el principio de exclusión en 1925 como una regla empírica para salvar la tabla periódica, sin justificarla y sin que le gustara. Las dos estadísticas llegaron enseguida -- Bose y Einstein en 1924, Fermi y Dirac en 1926 -- y la conexión con el espín tardó quince años más, hasta que el propio Pauli la demostró en 1940.$qm$,
   10),

  ($qm$cuantica/identicas$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Simetrización y conteo de estados$qm$,
   $qm$**Problema 1 · Construir los estados.** Dos partículas en los estados de una partícula $\phi_a$ y $\phi_b$.

*Distinguibles:* $\phi_a(1)\phi_b(2)$ y $\phi_a(2)\phi_b(1)$ son estados **distintos**, más $\phi_a(1)\phi_a(2)$ y $\phi_b(1)\phi_b(2)$. Total: 4.

*Bosones:*
$$\phi_a(1)\phi_a(2), \qquad \phi_b(1)\phi_b(2), \qquad \tfrac{1}{\sqrt2}\left[\phi_a(1)\phi_b(2) + \phi_a(2)\phi_b(1)\right].$$
Total: 3.

*Fermiones:*
$$\tfrac{1}{\sqrt2}\left[\phi_a(1)\phi_b(2) - \phi_a(2)\phi_b(1)\right].$$
Total: 1. Los estados $aa$ y $bb$ se anulan idénticamente al antisimetrizar.

**Problema 2 · El caso del helio.** Dos electrones, uno en $1s$ y otro en $2s$. ¿Qué combinaciones de espín son posibles?

*Solución.* La función total debe ser antisimétrica, y se factoriza en espacial $\times$ espín:

- Espacial **simétrica** $\times$ espín **antisimétrico** (singlete, $s=0$) → parahelio.
- Espacial **antisimétrica** $\times$ espín **simétrico** (triplete, $s=1$) → ortohelio.

Cuatro estados en total ($1 + 3$), que es el conteo correcto de dos espines $1/2$.

*Cuál tiene menos energía:* el **ortohelio**. Su parte espacial antisimétrica se anula cuando $\vec r_1 = \vec r_2$, así que los electrones se evitan y la repulsión de Coulomb es menor. Ninguna interacción entre espines interviene: el espín solo impone la simetría.

**Problema 3 · Por qué no hay ortohelio fundamental.** El estado fundamental del helio es $1s^{2}$: ambos electrones en $1s$. Esa parte espacial es necesariamente **simétrica**, así que el espín debe ser el singlete. **No existe** un estado fundamental de ortohelio. Eso es Pauli en acción, y es la razón de que el helio sea químicamente inerte.

**Problema 4 · Control.** ¿Cuántos estados hay para tres fermiones en cuatro estados de una partícula?

*Solución.* Es elegir 3 de 4 sin repetición ni orden: $\binom{4}{3} = 4$. Para bosones sería $\binom{4+3-1}{3} = 20$, y para distinguibles $4^{3} = 64$.$qm$,
   null,
   20),

  -- ======================= cuantica/interpretacion ==========================
  ($qm$cuantica/interpretacion$qm$, $qm$text$qm$,
   $qm$Guía — EPR, Bell y el problema de la medición (ver Bell, *Speakable and Unspeakable*; Nielsen & Chuang, cap. 2)$qm$,
   $qm$**EPR (1935).** El argumento es un **condicional**, no una refutación: *si* se aceptan el criterio de realidad de EPR (si se puede predecir con certeza el valor de una magnitud sin perturbar el sistema, entonces ese valor es un elemento de realidad) *y* la localidad, *entonces* la descripción cuántica es **incompleta**. Einstein no decía que la teoría fuera falsa: decía que faltaba algo.

**Entrelazamiento.** El singlete
$$|\Psi^-\rangle = \tfrac{1}{\sqrt2}\left(|{\uparrow\downarrow}\rangle - |{\downarrow\uparrow}\rangle\right)$$
no se factoriza como producto de un estado de 1 por uno de 2. Cada partícula por separado está en un estado mixto máximamente desordenado, aunque el estado conjunto sea puro y perfectamente conocido. Lo definido es la **relación**: apuntan en sentidos opuestos, sea cual sea el eje.

**No-señalización.** Las correlaciones no permiten transmitir información: la estadística local de Bob es la misma mida Alice o no, y elija el eje que elija. Por eso el entrelazamiento convive sin conflicto con la relatividad. **Correlación no es comunicación.**

**Bell (1964).** El aporte decisivo: convertir treinta años de discusión interpretativa en una pregunta de laboratorio. Toda teoría de variables ocultas **locales** obedece una desigualdad; la mecánica cuántica la **viola**. La disputa dejó de ser filosófica.

Precisión importante: Bell excluye las teorías de variables ocultas **locales**. La teoría de De Broglie-Bohm es de variables ocultas, es explícitamente no local, reproduce todas las predicciones cuánticas y **no** está excluida.

**El veredicto experimental.** Clauser (años 70), Aspect (1982, cambiando la orientación de los analizadores con los fotones en vuelo) y Zeilinger (separaciones de kilómetros, elección de ajustes con fuentes astronómicas) fueron cerrando una a una las escapatorias. Nobel de Física 2022. La violación es masiva: decenas de desviaciones estándar.

**Decoherencia: qué explica y qué no.** Explica por qué las superposiciones macroscópicas se vuelven inobservables -- la coherencia se dispersa irreversiblemente en las correlaciones con el entorno -- y por qué ciertas bases "preferidas" sobreviven. **No** explica por qué se obtiene *un* resultado y no otro: es evolución unitaria, y una evolución unitaria no produce un resultado único. El problema de la medición sigue abierto.$qm$,
   $qm$Bell trabajaba en el CERN como físico de aceleradores; el teorema lo escribió en 1964 durante una licencia sabática, y lo publicó en una revista nueva y de poca circulación que quebró poco después -- de modo que durante años el artículo fue difícil de conseguir. Él mismo llamaba a estos temas su "trabajo de fin de semana".$qm$,
   10),

  ($qm$cuantica/interpretacion$qm$, $qm$exercise$qm$,
   $qm$Práctica guiada — Correlaciones del singlete y por qué no se puede señalizar$qm$,
   $qm$**El estado.** $|\Psi^-\rangle = \frac{1}{\sqrt2}\left(|{\uparrow\downarrow}\rangle - |{\downarrow\uparrow}\rangle\right)$. Alice mide la partícula 1, Bob la 2.

**a) Ambos miden en $z$.** Los resultados son perfectamente anticorrelacionados: si Alice obtiene $+$, Bob obtiene $-$ con certeza. Pero **cada uno por separado** ve $50/50$.

**b) ¿Puede Alice señalizar?** Supongamos que Alice mide en $x$ en vez de $z$. Después de su medición, desde el punto de vista de Bob el estado es una mezcla mitad $|{\uparrow}_x\rangle$ mitad $|{\downarrow}_x\rangle$ para él... que al medir en $z$ da $50/50$. Y si Alice **no mide nada**, Bob también ve $50/50$.

**Conclusión:** la estadística local de Bob es idéntica en los tres escenarios. No hay ningún experimento local que le diga si Alice midió, ni en qué eje. Eso es el teorema de no-señalización, y no es una limitación técnica: es una consecuencia de la estructura del formalismo.

**c) Dónde aparece la correlación.** Solo al **comparar** ambas listas de resultados, lo que exige un canal clásico -- teléfono, internet -- limitado por $c$. La correlación es real y no local en su naturaleza; el acceso a ella no viola la relatividad.

**d) El paso al teorema de Bell.** Si Alice y Bob miden en ejes que forman un ángulo $\theta$, la mecánica cuántica predice para el singlete
$$E(\theta) = -\cos\theta$$
para el promedio del producto de los resultados (con valores $\pm1$). Una teoría de variables ocultas locales, en cambio, no puede producir esa forma: está acotada por desigualdades del tipo
$$|E(a,b) - E(a,b')| + |E(a',b) + E(a',b')| \;\leq\; 2 \qquad \text{(CHSH)}.$$
Con las orientaciones adecuadas, la predicción cuántica da $2\sqrt2 \approx 2{,}83 > 2$. Es la violación que se mide.

**e) Lo que hay que entender del resultado.** El experimento no refuta "el realismo" ni "la localidad" por separado: refuta su **conjunción**. Qué se abandona -- y hay quien abandona una, quien abandona la otra, y quien discute la hipótesis de libertad de elección -- sigue siendo materia de discusión. Lo que ya no es discutible es que alguna de esas premisas es falsa.$qm$,
   null,
   20)

)
insert into public.resources
  (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, r.type, r.title, r.body, null, r.historical_context, r.order_index, false
from recursos r
join public.modules m on m.slug = r.module_slug
where not exists (
  select 1 from public.resources x
   where x.module_id = m.id and x.title = r.title
);

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select m.slug, count(*) as recursos
--     from public.resources r join public.modules m on m.id = r.module_id
--    where m.track = 'cuantica' group by m.slug order by m.slug;
--   -- 15 módulos, 32 recursos (momento_angular tiene 4)
--
--   -- Ninguno publicado (ADR-016 §1):
--   select count(*) from public.resources r
--     join public.modules m on m.id = r.module_id
--    where m.track = 'cuantica' and r.published;
--   -- 0
--
-- Reversión: borrar los módulos del track (el `on delete cascade` de
-- resources.module_id se lleva estos recursos), o bien:
--   delete from public.resources r using public.modules m
--    where m.id = r.module_id and m.track = 'cuantica';

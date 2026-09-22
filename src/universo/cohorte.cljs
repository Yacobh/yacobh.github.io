(ns universo.cohorte
  "Agregación de **muchos** intentos: el mapa de errores de un curso.

   ── El problema que resuelve ────────────────────────────────────────────────
   `universo.intento` lee un intento, ítem por ítem. Éste lee un **grupo** de
   intentos y responde la pregunta que hace un profesor con el curso adelante:
   *«¿en qué se equivocaron mis alumnos?»* — no *«¿qué nota sacaron?»*.

   Es la versión en pantalla de `supabase/queries/T-130_mapa_de_errores_de_un_curso.sql`,
   que hoy hay que pegar en el SQL Editor. Las reglas de conteo **no se
   reescriben acá**: se llaman desde `universo.intento`, que ya las define una
   sola vez (`cuenta-como-error?` es literalmente el criterio de la consulta 2 de
   T-130). Si divergieran, la pantalla y el SQL dirían números distintos del
   mismo curso y no habría forma de saber cuál miente.

   ── Qué es una cohorte, y por qué es una ventana de tiempo ─────────────────
   No existe tabla `cursos`, y no hace falta inventarla para esto. Un curso que
   rinde en la sala deja sus intentos **contiguos en el tiempo**: el 3º medio a
   las 10:30 y el 4º a las 14:00. Medido sobre los 143 diagnósticos del
   2026-09-21: 26 personas en el bloque de la mañana, 21 en el de la tarde, y
   **cero personas en los dos**.

   Así que una cohorte acá es `{:desde :hasta :topic-prefijo}` — un filtro con
   nombre. Es lo que pide [[../../project-memory/BACKLOG]] T-133: *«se agrupa por
   filtro, no por una tabla `courses` que no existe»*.

   ⚠️ **La ventana es en hora local, no en UTC.** Medirlo lo demostró: un intento
   del 2026-09-20 a las 21:34 de Chile cae dentro del día **21** en UTC. Por eso
   `desde` y `hasta` viajan como instantes (ms o ISO con zona), nunca como una
   fecha suelta.

   ── Las tres guardas que no son opcionales ─────────────────────────────────
   1. **Solo `origin = 'student'`** (`067`). Depurar un ítem significa rendirlo
      (ADR-032), así que cada depuración del owner deja una fila indistinguible
      de la de un alumno **y concentrada justo en los ítems más depurados**. El
      2026-09-21 hubo 8 de esas entre las 08:29 y las 08:45, antes de la clase.
      Contarlas sesga el mapa hacia la facilidad ([[../../project-memory/RISKS]] R-37).
   2. **El escape no es un error** (ADR-029). «No sé» es un dato distinto de
      «creyó que era B». Contarlo como idea errónea inventa un error que el
      estudiante nunca cometió.
   3. **El peso de esfuerzo** (ADR-014). Una respuesta clickeada en dos segundos
      no es evidencia de nada. Lo que el filtro descarta se **informa**
      (`descartadas`), para que no sea invisible.

   ── Lo que este namespace NO decide ────────────────────────────────────────
   **Cuál θ vale cuando alguien rindió tres veces** es [[../../project-memory/OPEN_QUESTIONS]]
   Q-46, y sigue abierta. Acá se usa **el último intento de cada estudiante en
   cada banco**, que es la misma regla que ya usa la consulta 6 de T-130, para no
   introducir una segunda. La pantalla lo dice en voz alta; no se esconde detrás
   de un promedio."
  (:require [clojure.string :as str]
            [universo.irt.effort :as effort]
            [universo.irt.fluency :as fluency]
            [universo.intento :as intento]
            [universo.profile :as profile]))

(def origen-estudiante
  "El valor de `tests.origin` que significa «una persona rindiendo de verdad»
   (`067`). Las filas sin `origin` son anteriores a esa migración."
  "student")

;; -----------------------------------------------------------------------------
;; Aritmética de andar por casa, compartida por todo el namespace
;; -----------------------------------------------------------------------------

(defn- mediana
  "Mediana de una colección de números, o nil si está vacía. Se usa en vez del
   promedio donde un solo caso extremo distorsionaría —tiempos, sobre todo."
  [xs]
  (let [v (vec (sort xs))
        n (count v)]
    (when (pos? n)
      (if (odd? n)
        (nth v (quot n 2))
        (/ (+ (nth v (dec (quot n 2))) (nth v (quot n 2))) 2.0)))))

(defn- redondear
  [x decimales]
  (when (number? x)
    (let [f (js/Math.pow 10 decimales)]
      (/ (js/Math.round (* x f)) f))))

;; -----------------------------------------------------------------------------
;; La ventana
;; -----------------------------------------------------------------------------

(defn instante
  "Un instante en milisegundos, venga como número, `js/Date` o texto ISO.

   Devuelve nil si no se puede interpretar, y **nil no es 0**: un `desde`
   ilegible tiene que dejar la ventana abierta por ese lado, no empezar en 1970."
  [v]
  (cond
    (number? v) v
    (instance? js/Date v) (.getTime ^js/Date v)
    (string? v) (let [ms (.parse js/Date v)]
                  (when-not (js/isNaN ms) ms))
    :else nil))

(defn- prefijo?
  [prefijo topic]
  (or (str/blank? (str prefijo))
      (str/starts-with? (str/lower-case (str topic))
                        (str/lower-case (str prefijo)))))

(defn en-ventana?
  "true si el test cae dentro de la cohorte.

   El intervalo es **cerrado por abajo y abierto por arriba** —`[desde, hasta)`—
   a propósito: dos ventanas consecutivas que comparten el borde no pueden
   contar el mismo intento dos veces.

   `:banco` es el `topic` **exacto** y `:topic-prefijo` una familia de bancos.
   Son dos cosas distintas y por eso no se colapsan en una: en una misma hora de
   clase se rinden varios bancos —el 2026-09-21 fueron **seis** en la mañana,
   incluidos `diagnostico` y `electrotecnia`—, y un prefijo no distingue
   `electronica_notacion` de `electronica_notacion_avanzada` si algún día
   existiera."
  [{:keys [desde hasta topic-prefijo banco]} test]
  (let [t (instante (:created_at test))
        d (instante desde)
        h (instante hasta)]
    (and (some? t)
         (or (nil? d) (>= t d))
         (or (nil? h) (< t h))
         (or (str/blank? (str banco)) (= (str banco) (str (:topic test))))
         (prefijo? topic-prefijo (:topic test)))))

(defn de-estudiante?
  "true si la fila la produjo un estudiante y no una corrida de depuración.

   Una fila **sin** `origin` es anterior a `067` y se acepta: en ese momento no
   existía la marca, y descartarla borraría el histórico entero del panel."
  [test]
  (let [o (:origin test)]
    (or (nil? o) (= origen-estudiante o))))

(defn de-la-cohorte
  "Los tests del grupo: dentro de la ventana y rendidos por estudiantes."
  [ventana tests]
  (vec (filter #(and (de-estudiante? %) (en-ventana? ventana %))
               (or tests []))))

;; -----------------------------------------------------------------------------
;; Quién es quién
;; -----------------------------------------------------------------------------

(defn clave-estudiante
  "Con qué se cuenta «una persona».

   `user_id` primero porque es estable aunque el correo cambie de mayúsculas;
   `email-user` de respaldo para las filas viejas que no lo traen. Si no hay
   ninguno, la fila se cuenta como persona propia por su id de test: preferible
   sobrecontar una fila anónima a fundir dos estudiantes distintos en uno."
  [test]
  (or (:user_id test)
      (some-> (:email-user test) str str/trim str/lower-case not-empty)
      (str "test-" (:id test))))

(defn correo
  [test]
  (or (some-> (:email-user test) str str/trim not-empty) "—"))

(defn- respuestas
  [test]
  (vec (or (get-in test [:test :responses]) [])))

(defn- respuestas-del-grupo
  "Todas las respuestas del grupo, cada una con el test del que salió.

   Se conserva el test porque casi todos los conteos son «cuántos
   **estudiantes**», no «cuántas respuestas», y para eso hay que poder volver de
   la respuesta a la persona."
  [tests]
  (vec (mapcat (fn [t] (map (fn [r] [t r]) (respuestas t))) tests)))

(defn estudiantes
  "Cuántas personas distintas hay en el grupo."
  [tests]
  (count (into #{} (map clave-estudiante) tests)))

;; -----------------------------------------------------------------------------
;; ⭐ El ranking de ideas erróneas — el entregable
;; -----------------------------------------------------------------------------

(defn ideas-erroneas
  "*«22 de 34 estudiantes confunden el signo al despejar»*.

   Ordena por **estudiantes distintos**, no por veces: un solo alumno que cae
   seis veces en el mismo error no es un problema de curso, y ordenar por
   frecuencia bruta lo pondría arriba de un error que cometió media sala."
  [tests]
  (let [total (estudiantes tests)]
    (->> (respuestas-del-grupo tests)
         (filter (fn [[_ r]] (intento/cuenta-como-error? r)))
         (group-by (fn [[_ r]] [(str/trim (str (:selected-error r)))
                                (:module-slug r)]))
         (map (fn [[[idea modulo] pares]]
                (let [quienes (into #{} (map (comp clave-estudiante first)) pares)]
                  {:idea-erronea idea
                   :modulo modulo
                   :estudiantes (count quienes)
                   :de-un-total-de total
                   :pct (when (pos? total)
                          (js/Math.round (* 100.0 (/ (count quienes) total))))
                   :veces (count pares)})))
         (sort-by (juxt (comp - :estudiantes) (comp - :veces) :idea-erronea))
         vec)))

(defn descartadas
  "Qué quedó fuera del ranking y por qué.

   Las categorías son **excluyentes y suman el total**. Existe para que los tres
   filtros de arriba no sean invisibles: un ranking corto puede significar «el
   curso anduvo bien» o «media sala clickeó sin leer», y sin estos números no se
   distinguen."
  [tests]
  (let [rs (map second (respuestas-del-grupo tests))
        por-categoria (frequencies (map intento/categoria rs))
        errores-reales (filter #(= :incorrecta (intento/categoria %)) rs)]
    {:respuestas (count rs)
     :correctas (+ (get por-categoria :correcta 0)
                   (get por-categoria :correcta-desestimada 0))
     :escapes (get por-categoria :escape 0)
     :desestimadas-por-esfuerzo (+ (get por-categoria :incorrecta-desestimada 0)
                                   (get por-categoria :correcta-desestimada 0))
     :sin-idea-catalogada (count (remove intento/cuenta-como-error? errores-reales))
     :usadas-en-el-ranking (count (filter intento/cuenta-como-error? rs))}))

;; -----------------------------------------------------------------------------
;; Déficit por módulo — dónde poner la próxima clase
;; -----------------------------------------------------------------------------

(def minimo-de-estudiantes-por-modulo
  "Debajo de esto, el porcentaje de acierto de un módulo describe a una o dos
   personas y no al curso.

   ⚠️ **Salió de un defecto medido, no de una preferencia.** Ordenando por
   porcentaje ascendente, el curso del 2026-09-21 mostraba arriba
   `aritmetica/fracciones` con 38 % —**un** estudiante que entró a un banco
   ajeno— y dejaba cuarto a `electronica/notacion_cientifica`, que es donde
   estaban **23 de 24**. El orden por porcentaje pone el ruido primero."
  3)

(defn acierto-por-modulo
  "Acierto por módulo, **ordenado por cuántos estudiantes lo rindieron**.

   El mismo cálculo que `profile/deficits-from-responses` hace para una persona,
   agregado sobre el curso. Cada fila trae `:evidencia-suficiente?` para que
   quien la pinte pueda separar lo que describe al curso de lo que describe a
   una persona: el dato no se esconde, se marca."
  [tests]
  (->> (respuestas-del-grupo tests)
       (remove (fn [[_ r]] (= :escape (intento/categoria r))))
       (group-by (fn [[_ r]] (or (:module-slug r) "(sin módulo)")))
       (map (fn [[modulo pares]]
              (let [n (count pares)
                    quienes (count (into #{} (map (comp clave-estudiante first)) pares))
                    aciertos (count (filter (fn [[_ r]] (:correct? r)) pares))]
                {:modulo modulo
                 :estudiantes quienes
                 :respuestas n
                 :aciertos aciertos
                 :evidencia-suficiente? (>= quienes minimo-de-estudiantes-por-modulo)
                 :pct-acierto (when (pos? n)
                                (js/Math.round (* 100.0 (/ aciertos n))))})))
       (sort-by (juxt (comp - :estudiantes) (comp - :respuestas) :pct-acierto))
       vec))


;; -----------------------------------------------------------------------------
;; ⭐ El ítem más fallado, con su retroalimentación completa
;; -----------------------------------------------------------------------------

(defn- alternativas-del-grupo
  "`{id-de-pregunta {\"A\" texto …}}` juntando lo que guardó cada intento.

   Cada fila de `tests` trae las preguntas que **a esa persona** le tocaron, así
   que el mapa completo de un ítem solo aparece uniendo las de todo el grupo."
  [tests]
  (reduce (fn [acc t]
            (merge acc (intento/alternativas-por-id (get-in t [:test :questions]))))
          {}
          tests))

(defn- idea-de-la-letra
  "El texto de la idea errónea de un distractor, sacado de quien lo marcó.

   ⭐ Esto es lo que permite proyectar la retroalimentación completa **sin leer
   `questions`**: desde `025` el banco no es legible para nadie que no sea admin,
   pero cada respuesta guardó el `selected-error` del distractor que eligió. Si
   alguien cayó en esa alternativa, su explicación está en el grupo."
  [pares letra]
  (->> pares
       (filter (fn [[_ r]] (= (str/upper-case (str (:selected-option r)))
                              (str/upper-case (str letra)))))
       (keep (fn [[_ r]] (not-empty (str/trim (str (:selected-error r))))))
       first))

(defn- estadistica-de-item
  [alternativas [question-id pares]]
  (let [n (count pares)
        por-categoria (frequencies (map (fn [[_ r]] (intento/categoria r)) pares))
        aciertos (+ (get por-categoria :correcta 0)
                    (get por-categoria :correcta-desestimada 0))
        errores (+ (get por-categoria :incorrecta 0)
                   (get por-categoria :incorrecta-desestimada 0))
        escapes (get por-categoria :escape 0)
        una (second (first pares))
        mapa (get alternativas question-id)
        correcta (some-> (:correct-option una) str str/upper-case not-empty)
        quienes-fallaron (into #{} (comp (filter (fn [[_ r]]
                                                   (contains? #{:incorrecta :incorrecta-desestimada}
                                                              (intento/categoria r))))
                                         (map (comp clave-estudiante first)))
                               pares)]
    {:question-id question-id
     :enunciado (:question-text una)
     :modulo (:module-slug una)
     :dificultad (:difficulty una)
     :veces n
     :aciertos aciertos
     :errores errores
     :escapes escapes
     :estudiantes-que-fallaron (count quienes-fallaron)
     :pct-acierto (when (pos? n) (js/Math.round (* 100.0 (/ aciertos n))))
     :correcta correcta
     :texto-correcta (get mapa correcta)
     :alternativas
     (vec (for [letra ["A" "B" "C" "D"]
                :let [texto (get mapa letra)]
                :when texto]
            (let [marcada (filter (fn [[_ r]]
                                    (= letra (str/upper-case (str (:selected-option r)))))
                                  pares)]
              {:letra letra
               :texto texto
               :correcta? (= letra correcta)
               :veces (count marcada)
               :estudiantes (count (into #{} (map (comp clave-estudiante first)) marcada))
               :idea-erronea (when-not (= letra correcta)
                               (idea-de-la-letra pares letra))})))}))

(defn items-fallados
  "Un renglón por ítem servido, ordenado por acierto ascendente.

   Sirve para dos cosas distintas que conviene no confundir: para el profesor,
   qué contenido reforzar; para el autor del banco, **qué ítem está mal
   escrito**. Un ítem con acierto ≈ 25 % (el azar en cuatro alternativas) y todo
   el curso marcando la misma alternativa incorrecta suele ser lo segundo."
  [tests]
  (let [alternativas (alternativas-del-grupo tests)]
    (->> (respuestas-del-grupo tests)
         (group-by (fn [[_ r]] (:question-id r)))
         (map #(estadistica-de-item alternativas %))
         (sort-by (juxt (comp - :estudiantes-que-fallaron) :pct-acierto))
         vec)))

(defn item-mas-fallado
  "El ítem en el que más estudiantes distintos se equivocaron, listo para
   proyectar: enunciado, las cuatro alternativas, cuántos cayeron en cada una y
   la idea errónea de cada distractor.

   `:minimo-servido` (por defecto 2) evita que un ítem que se sirvió una sola
   vez y salió mal encabece el ranking de un curso de treinta. Si ningún ítem
   llega al mínimo se devuelve el más fallado igual: mejor mostrar el dato
   flaco, diciendo cuántas veces se sirvió, que una pantalla vacía."
  ([tests] (item-mas-fallado tests {}))
  ([tests {:keys [minimo-servido] :or {minimo-servido 2}}]
   (let [todos (items-fallados tests)
         con-errores (filter #(pos? (:estudiantes-que-fallaron %)) todos)]
     (or (first (filter #(>= (:veces %) minimo-servido) con-errores))
         (first con-errores)))))

;; -----------------------------------------------------------------------------
;; θ del curso
;; -----------------------------------------------------------------------------

(defn ultimo-por-estudiante
  "El último intento de cada estudiante **en cada banco**.

   Por banco y no a secas porque un alumno que avanzó por los cinco módulos
   encadenados tiene cinco θ que no son comparables entre sí: son escalas
   distintas. Quedarse con «el último» a secas mezclaría el θ de Kirchhoff con el
   de notación científica y llamaría a eso «su nivel».

   Regla provisional mientras Q-46 siga abierta; es la misma que la consulta 6
   de T-130."
  [tests]
  (->> tests
       (filter #(number? (:theta %)))
       (group-by (juxt clave-estudiante :topic))
       (map (fn [[_ ts]] (last (sort-by #(or (instante (:created_at %)) 0) ts))))
       (sort-by #(or (instante (:created_at %)) 0))
       vec))

(defn theta-al-tope-del-banco?
  "true si esta medición se detuvo porque **se acabaron los ítems** sin que el
   estudiante fallara ninguno.

   ⚠️ **No es lo mismo que el clamp de R-44, y se descubrió mirando el gráfico.**
   El 2026-09-21, **50 de 106 mediciones** pararon con `stop-reason = exhausted`
   a los 6 ítems, y **44 de esas 50 no tuvieron ni un error**. Su historia de θ
   es literalmente `−2 → −1,6 → −1,2 → −0,8 → −0,4 → 0,0`: un paso fijo por
   acierto hasta que el banco se quedó sin preguntas.

   Un θ así dice «no falló ninguna de las 6 que alcanzó a ver», no «su nivel es
   0». El nivel real está **por encima** y no se midió. Marcarlo es la
   diferencia entre mostrar un dato y mostrar un artefacto del instrumento."
  [test]
  (let [rs (get-in test [:test :responses])
        parada (get-in test [:test :stop-reason])]
    (boolean
     (and (seq rs)
          (= "exhausted" (str parada))
          (every? :correct? rs)))))

(defn mediciones-de-theta
  "Las mediciones listas para dibujar: una por estudiante y banco, con las dos
   marcas que impiden leerlas como si todas significaran lo mismo."
  [tests]
  (->> (ultimo-por-estudiante tests)
       (map (fn [t]
              {:correo (correo t)
               :topic (:topic t)
               :theta (:theta t)
               :censurado? (intento/censurado? (:theta t))
               :tope-del-banco? (theta-al-tope-del-banco? t)}))
       vec))

(defn distribucion-theta
  "Cuántos estudiantes hay en cada banda, sobre el último intento de cada uno.

   Es lo que se proyecta en la sala: no una nota, sino dónde está cada uno en la
   escala y **cuánta dispersión hay**. Una desviación grande dentro de un mismo
   curso es el argumento entero del producto: *un curso no es un nivel*.

   `censurados` se cuenta aparte (R-44): un θ pegado al borde del clamp no es una
   medición, y promediarlo con los demás ensucia la media de todo el curso."
  [tests]
  (let [ultimos (ultimo-por-estudiante tests)
        por-banda (group-by #(profile/theta-band (:theta %)) ultimos)]
    {:intentos (count ultimos)
     :censurados (count (filter #(intento/censurado? (:theta %)) ultimos))
     :al-tope-del-banco (count (filter theta-al-tope-del-banco? ultimos))
     :bandas (vec (for [banda ["inicial" "basico" "intermedio" "avanzado"]
                        :let [ts (get por-banda banda)]]
                    {:banda banda
                     :etiqueta (profile/band-label banda)
                     :estudiantes (count ts)
                     :min (when (seq ts) (apply min (map :theta ts)))
                     :max (when (seq ts) (apply max (map :theta ts)))}))}))

;; -----------------------------------------------------------------------------
;; Resumen
;; -----------------------------------------------------------------------------

(defn por-banco
  "Un renglón por banco (`topic`) rendido, con sus métricas propias.

   ── Por qué el banco merece su propia vista ────────────────────────────────
   El módulo y el banco **no son lo mismo**, y en este proyecto la relación
   cambia según el track: en `electronica` cada banco es un módulo, pero en el
   producto PAES un banco (`numeros`) cubre varios. Agrupar solo por módulo deja
   sin responder *«¿cómo le fue al curso en el diagnóstico que rindió?»*.

   Y hay una razón más fuerte: **θ de bancos distintos está en escalas
   distintas** (ADR-034). El θ medio de una cohorte con seis bancos mezclados no
   significa gran cosa; **dentro de un banco sí es comparable**, y por eso acá se
   calcula por banco sobre el último intento de cada estudiante, igual que
   `distribucion-theta`."
  [tests]
  (->> tests
       (group-by :topic)
       (map (fn [[topic ts]]
              (let [rs (vec (mapcat #(get-in % [:test :responses]) ts))
                    n (count rs)
                    aciertos (count (filter :correct? rs))
                    ultimos (ultimo-por-estudiante ts)
                    thetas (keep :theta ultimos)]
                {:topic topic
                 :intentos (count ts)
                 :estudiantes (estudiantes ts)
                 :respuestas n
                 :aciertos aciertos
                 :pct-acierto (when (pos? n)
                                (js/Math.round (* 100.0 (/ aciertos n))))
                 :theta-medio (when (seq thetas)
                                (redondear (/ (reduce + thetas) (count thetas)) 2))
                 :al-tope-del-banco (count (filter theta-al-tope-del-banco? ultimos))
                 :ideas (count (into #{} (comp (filter intento/cuenta-como-error?)
                                               (map :selected-error))
                                     rs))})))
       (sort-by (juxt (comp - :estudiantes) (comp - :intentos) :topic))
       vec))

(defn resumen
  "Los números de cabecera del curso."
  [tests]
  (let [rs (map second (respuestas-del-grupo tests))
        instantes (keep #(instante (:created_at %)) tests)]
    {:intentos (count tests)
     :estudiantes (estudiantes tests)
     :respuestas (count rs)
     :bancos (count (into #{} (map :topic) tests))
     :primero (when (seq instantes) (apply min instantes))
     :ultimo (when (seq instantes) (apply max instantes))
     :errores-con-idea (count (filter intento/cuenta-como-error? rs))}))

;; -----------------------------------------------------------------------------
;; Los intentos: numerarlos es la condición para poder comparar a nadie
;; -----------------------------------------------------------------------------

(defn con-numero-de-intento
  "Cada test con `:intento-n` (1, 2, 3…) y `:intentos-totales` dentro de su par
   **(estudiante, banco)**.

   Es la pieza que hace posible todo lo de abajo, y el par es (estudiante,
   banco) y no solo estudiante porque rendir notación científica y después
   Kirchhoff no es reintentar: es avanzar."
  [tests]
  (->> tests
       (group-by (juxt clave-estudiante :topic))
       (mapcat (fn [[_ ts]]
                 (let [ordenados (sort-by #(or (instante (:created_at %)) 0) ts)
                       total (count ordenados)]
                   (map-indexed (fn [i t]
                                  (assoc t :intento-n (inc i) :intentos-totales total))
                                ordenados))))
       (sort-by #(or (instante (:created_at %)) 0))
       vec))

(defn progreso-por-intento
  "⭐ Qué pasa a medida que alguien reintenta: un renglón por número de intento.

   ── Por qué esta tabla existe y no es una curiosidad ───────────────────────
   Medido sobre los 143 diagnósticos del 2026-09-21, el tiempo por ítem cae de
   **43,9 s en el primer intento a 4,5 s en el cuarto** mientras el acierto sube
   de 48 % a 94 %. Nadie resuelve una potencia de diez en cuatro segundos: la
   recuerda. Y `repeticion-entre-intentos` muestra por qué puede recordarla —
   entre intentos consecutivos se repiten ~62 % de los ítems, y el estudiante ya
   vio la explicación correcta de cada uno.

   Es [[../../project-memory/RISKS]] R-47 hecho visible, y afecta a **G-4**: un
   Δθ entre dos intentos que comparten media prueba no mide progreso limpio.

   Solo mira a quien reintentó (`:intentos-totales > 1`): mezclar a los que
   rindieron una sola vez aplana la primera fila con gente que nunca volvió."
  [tests]
  (->> (con-numero-de-intento tests)
       (filter #(> (:intentos-totales %) 1))
       (group-by :intento-n)
       (map (fn [[n ts]]
              (let [rs (mapcat #(get-in % [:test :responses]) ts)
                    segs (keep intento/segundos rs)
                    thetas (keep :theta ts)]
                {:intento n
                 :casos (count ts)
                 :estudiantes (estudiantes ts)
                 :respuestas (count rs)
                 :seg-por-item (redondear (mediana segs) 1)
                 :pct-acierto (when (seq rs)
                                (js/Math.round (* 100.0 (/ (count (filter :correct? rs))
                                                           (count rs)))))
                 :theta-medio (when (seq thetas)
                                (redondear (/ (reduce + thetas) (count thetas)) 2))})))
       (sort-by :intento)
       vec))

(defn repeticion-entre-intentos
  "Cuántos ítems comparte un intento con el anterior del mismo estudiante y
   banco.

   `next_question` excluye los ítems del test **en curso**, no los de intentos
   anteriores (R-47). Esto lo mide en vez de suponerlo: es el número que dice si
   un reintento midió aprendizaje o memoria."
  [tests]
  (let [pares (->> (con-numero-de-intento tests)
                   (group-by (juxt clave-estudiante :topic))
                   (mapcat (fn [[_ ts]]
                             (let [ordenados (sort-by :intento-n ts)]
                               (map vector ordenados (rest ordenados))))))
        medidas (for [[a b] pares
                      :let [qa (into #{} (map :question-id) (get-in a [:test :responses]))
                            qb (into #{} (map :question-id) (get-in b [:test :responses]))]
                      :when (and (seq qa) (seq qb))]
                  {:repetidos (count (filter qa qb))
                   :items (count qb)})]
    (when (seq medidas)
      (let [repetidos (reduce + (map :repetidos medidas))
            items (reduce + (map :items medidas))]
        {:pares (count medidas)
         :repetidos-medio (redondear (/ repetidos (count medidas)) 1)
         :items-medio (redondear (/ items (count medidas)) 1)
         :pct (when (pos? items) (js/Math.round (* 100.0 (/ repetidos items))))}))))

(defn delta-theta
  "Δθ entre el primer y el último intento de cada (estudiante, banco) que
   reintentó.

   ⚠️ **No se lee como aprendizaje** mientras `repeticion-entre-intentos`
   diga lo que dice. Está acá porque es el dato que G-4 promete entregar y
   porque esconderlo no lo vuelve más limpio: se muestra **junto a** la
   repetición de ítems, nunca solo."
  [tests]
  (->> (con-numero-de-intento tests)
       (filter #(> (:intentos-totales %) 1))
       (group-by (juxt clave-estudiante :topic))
       (keep (fn [[[_ topic] ts]]
               (let [ordenados (sort-by :intento-n ts)
                     primero (first ordenados)
                     ultimo (last ordenados)]
                 (when (and (number? (:theta primero)) (number? (:theta ultimo)))
                   {:correo (correo primero)
                    :topic topic
                    :intentos (count ordenados)
                    :theta-inicial (:theta primero)
                    :theta-final (:theta ultimo)
                    :delta (redondear (- (:theta ultimo) (:theta primero)) 2)}))))
       (sort-by (comp - :delta))
       vec))

;; -----------------------------------------------------------------------------
;; ⭐ El ranking de quienes participaron
;; -----------------------------------------------------------------------------

(def bases-de-comparacion
  "Sobre qué intentos se calcula el renglón de cada estudiante.

   **`:primeros` es el default y no es un detalle.** Es la única base con la que
   dos estudiantes son comparables: el primer intento de cada banco es el único
   que nadie rindió habiendo visto ya las respuestas. Ordenar por acierto sobre
   `:todos` pone arriba a quien más veces repitió, que es lo contrario de un
   ranking."
  {:primeros "Primer intento de cada banco"
   :ultimos "Último intento de cada banco"
   :todos "Todo lo que rindió"})

(defn- seleccion-por-base
  [tests base]
  (let [numerados (con-numero-de-intento tests)]
    (case base
      :ultimos (filter #(= (:intento-n %) (:intentos-totales %)) numerados)
      :todos numerados
      (filter #(= 1 (:intento-n %)) numerados))))

(defn- fila-de-estudiante
  [[_ ts] todos-los-suyos]
  (let [rs (vec (mapcat #(get-in % [:test :responses]) ts))
        n (count rs)
        aciertos (count (filter :correct? rs))
        ;; La velocidad se mide **solo sobre respuestas correctas y con
        ;; esfuerzo válido**. Cronometrar los errores premia a quien clickea sin
        ;; leer, que es exactamente al revés de lo que un ranking de rapidez
        ;; debería decir (ADR-014 · ADR-019 `fluency/usable?`).
        utiles (filter fluency/usable? rs)
        segs-utiles (keep intento/segundos utiles)
        fluidez (fluency/classify rs)
        thetas (keep :theta ts)]
    {:correo (correo (first ts))
     :bancos (count (into #{} (map :topic) ts))
     :intentos (count todos-los-suyos)
     :reintento? (> (count todos-los-suyos) (count ts))
     :items n
     :aciertos aciertos
     :pct-acierto (when (pos? n) (js/Math.round (* 100.0 (/ aciertos n))))
     :theta-medio (when (seq thetas)
                    (redondear (/ (reduce + thetas) (count thetas)) 2))
     :theta-censurado? (boolean (some #(intento/censurado? (:theta %)) ts))
     :seg-por-acierto (redondear (mediana segs-utiles) 1)
     :t-rel (redondear (:t-rel fluidez) 2)
     :fluidez (:band fluidez)
     :evidencia (:n fluidez)
     :evidencia-suficiente? (:enough? fluidez)
     :desestimadas (effort/discarded-count rs)
     :escapes (count (filter #(= :escape (intento/categoria %)) rs))}))

(def criterios
  "Cómo se puede ordenar el ranking. El valor es `[fn-de-orden descendente?]`.

   `:velocidad` y `:fluidez` ordenan **ascendente** porque menos tiempo es
   mejor; el resto, descendente. Una fila sin el dato del criterio va al final
   en vez de colarse arriba como si fuera cero."
  {:acierto {:etiqueta "% de acierto" :clave :pct-acierto :desc? true}
   :theta {:etiqueta "θ" :clave :theta-medio :desc? true}
   :velocidad {:etiqueta "Más rápidos" :clave :seg-por-acierto :desc? false}
   :fluidez {:etiqueta "Fluidez" :clave :t-rel :desc? false}
   :intentos {:etiqueta "Intentos" :clave :intentos :desc? true}
   :items {:etiqueta "Ítems rendidos" :clave :items :desc? true}
   :correo {:etiqueta "Nombre" :clave :correo :desc? false}})

(defn ordenar
  "Ordena el ranking por uno de los `criterios`, dejando al final a quien no
   tiene ese dato."
  [filas criterio]
  (let [{:keys [clave desc?]} (get criterios criterio (get criterios :acierto))
        sin-dato? #(nil? (get % clave))
        con (remove sin-dato? filas)
        sin (filter sin-dato? filas)
        ordenadas (sort-by clave con)]
    (vec (concat (if desc? (reverse ordenadas) ordenadas) sin))))

(defn ranking
  "Un renglón por estudiante, listo para ordenar por cualquiera de `criterios`.

   `:base` elige **sobre qué intentos** se calcula (ver `bases-de-comparacion`); `:intentos`
   cuenta siempre **todos** los del estudiante, porque el número de intentos es
   justamente el dato que no hay que esconder al comparar a dos personas."
  ([tests] (ranking tests {}))
  ([tests {:keys [base ordenar-por] :or {base :primeros ordenar-por :acierto}}]
   (let [por-estudiante (group-by clave-estudiante (con-numero-de-intento tests))
         seleccion (group-by clave-estudiante (seleccion-por-base tests base))]
     (-> (for [[clave ts] seleccion]
           (fila-de-estudiante [clave ts] (get por-estudiante clave)))
         vec
         (ordenar ordenar-por)))))

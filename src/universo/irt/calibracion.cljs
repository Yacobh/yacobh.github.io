(ns universo.irt.calibracion
  "Estimación de la dificultad `b` de cada ítem a partir de respuestas reales
   (T-76, vector G-2).

   ── El problema que resuelve ────────────────────────────────────────────────
   Toda `questions.difficulty` del banco es **autoral**: la puso quien escribió
   el ítem (R-17). El argumento psicométrico del producto —«θ es una medición»—
   descansa en esas etiquetas, y ninguna salió de un dato. Este namespace estima
   `b` con las respuestas que ya están en `tests`, y dice cuánto de cada número
   viene del dato y cuánto de la etiqueta.

   ── Qué modelo y por qué ───────────────────────────────────────────────────
   Es **el mismo modelo del motor v2** (ADR-034): 1PL con azar fijo
   P = c + (1 − c)·L(θ − b), c = 0,25. Calibrar con un modelo y medir con otro
   produce números que no significan nada en ninguno de los dos.

   La estimación es **conjunta** (θ de cada persona y `b` de cada ítem a la vez,
   JML) y **penalizada** por dos priors:

   - θ ~ N(0, σ_θ²), el mismo prior del motor.
   - b ~ N(b_autoral, σ_b²): la etiqueta del autor es el punto de partida, y el
     dato la mueve **en proporción a cuánta información trae**.

   ⚠️ **Por qué no θ fijo.** El primer ensayo (SESSION-049) estimó `b` con el θ
   de cada estudiante congelado, y ese θ había salido de las mismas etiquetas
   que se querían corregir: circular. Acá los dos se mueven juntos.

   ⚠️ **Por qué un prior en `b` y no JML puro.** Con 8 de 64 ítems sobre 30
   respuestas, JML sin prior da `b` infinitos para todo ítem que nadie falló o
   nadie acertó, y errores de ±1,5 en el resto. Con prior, un ítem sin datos
   queda **exactamente** en su etiqueta y lo declara: `:peso-del-dato` = 0. No
   hay un número que parezca medido sin serlo.

   ⚠️ **Que el test sea adaptativo no sesga la estimación.** El ítem se eligió
   mirando respuestas anteriores, que están en los datos: la selección es
   ignorable para la verosimilitud (Mislevy & Chang, 2000). Lo que **sí** hace
   es que cada ítem se vea casi solo desde personas cercanas a su etiqueta, y
   por eso el `:se` de un ítem poco servido es grande.

   ── Qué entra y qué no ─────────────────────────────────────────────────────
   - **Solo el primer intento** de cada persona en cada banco. Del segundo en
     adelante se repiten 2 de cada 3 ítems con la explicación ya vista (R-47,
     medido el 2026-09-21): es memoria, no dificultad.
   - **Solo respuestas que contaron para θ**: fuera los escapes (ADR-029, no son
     un error de contenido) y las desestimadas por esfuerzo (ADR-014). Es el
     mismo criterio que `universo.intento/categoria`, reutilizado, no copiado.
   - **La persona es el par (estudiante, banco)**: θ de bancos distintos vive en
     escalas distintas (ADR-034), así que se calibra banco por banco.

   Nada de esto decide a quién excluir por identidad (cuentas de prueba, T-145):
   eso lo hace la consulta que arma los datos, donde queda escrito.")

;; ── Constantes ──────────────────────────────────────────────────────────────

;; Mismo σ que `universo.motor/default-prior-sd`. Se repite el número y no se
;; importa a propósito: si el motor cambia de prior, la calibración vieja no
;; debe cambiar en silencio con él — se recalibra y se anota.
(def default-theta-prior-sd 2.0)

;; σ del prior de `b` alrededor de la etiqueta. 1,0 logit dice «la etiqueta
;; puede estar errada en un logit sin que sea raro», que es lo que midió `083`
;; al rehacer `diagnostico`: movimientos de hasta ~1,5 sobre una escala de 6.
;; Configurable: con más datos se afloja.
(def default-b-prior-sd 1.0)

(def default-c 0.25)

;; La estimación no usa el clamp [−3, 3] del motor. Ese clamp es de
;; presentación; acá un θ de 3,4 es información (el ítem que esa persona acertó
;; es fácil para ella) y recortarlo sesgaría `b` hacia arriba. El límite de ±6
;; solo evita que un paso de Newton se vaya a infinito.
(def ^:private limite 6.0)

;; Paso máximo por iteración. No es el tope de 0,4 del motor (que es de
;; selección): solo amortigua las primeras iteraciones.
(def ^:private paso-maximo 1.0)

(def ^:private min-varianza 1e-12)

;; ── Selección de respuestas ─────────────────────────────────────────────────

(defn- escape? [r]
  (let [e (:escape r)]
    (and (some? e) (not (and (string? e) (= "" e))))))

(defn- peso [r]
  (let [w (:weight r)]
    (if (number? w) (double w) 1.0)))

(defn respuesta-calibrable?
  "true si la respuesta es evidencia de dificultad: no es un escape y el filtro
   de esfuerzo no la descartó.

   Es el criterio de `universo.intento/categoria` (`:correcta` o `:incorrecta`),
   escrito sin depender de ese namespace porque este se compila también como
   script de node sin el resto del cliente."
  [r]
  (and (some? (:question-id r))
       (not (escape? r))
       (pos? (peso r))))

(defn primeros-intentos
  "El primer intento de cada estudiante en cada banco, por `created_at`.

   Recibe filas con la forma de `tests_sin_identidad`: `:user_id`, `:topic`,
   `:created_at` (texto ISO, ordenable como texto) y `:test`."
  [filas]
  (->> filas
       (group-by (juxt :user_id :topic))
       vals
       (map #(first (sort-by (juxt :created_at :id) %)))
       (sort-by (juxt :topic :created_at :id))
       vec))

(defn observaciones
  "Las respuestas calibrables de los primeros intentos, como
   `{:persona [user topic] :item id :y 0|1}`.

   Si un mismo ítem aparece dos veces en un intento (no debería: `p_answered`
   lo impide) se queda la primera."
  [filas]
  (->> (primeros-intentos filas)
       (mapcat (fn [fila]
                 (let [persona [(:user_id fila) (:topic fila)]]
                   (->> (get-in fila [:test :responses])
                        (filter respuesta-calibrable?)
                        (reduce (fn [[vistos acc] r]
                                  (let [item (str (:question-id r))]
                                    (if (contains? vistos item)
                                      [vistos acc]
                                      [(conj vistos item)
                                       (conj acc {:persona persona
                                                  :item item
                                                  :y (if (:correct? r) 1 0)})])))
                                [#{} []])
                        second))))
       vec))

;; ── Modelo ──────────────────────────────────────────────────────────────────

(defn- logistica [x] (/ 1.0 (+ 1.0 (Math/exp (- x)))))

(defn- termino
  "Para una respuesta con θ y b dados: [dP/dθ, P]. dP/db = −dP/dθ."
  [theta b c]
  (let [l (logistica (- theta b))]
    [(* (- 1.0 c) l (- 1.0 l))
     (+ c (* (- 1.0 c) l))]))

(defn- acotar [x] (max (- limite) (min limite x)))

(defn- log-posterior
  "Log-posterior de **un** parámetro con los demás fijos: la suma de
   log-verosimilitudes de sus respuestas más su prior normal."
  [valor obs otro-valor signo c media precision]
  (- (reduce (fn [acc o]
               (let [[theta b] (if (pos? signo) [valor (otro-valor o)] [(otro-valor o) valor])
                     [_ p] (termino theta b c)
                     p (max min-varianza (min (- 1.0 min-varianza) p))]
                 (+ acc (if (= 1 (:y o)) (Math/log p) (Math/log (- 1.0 p))))))
             0.0
             obs)
     (* 0.5 precision (let [d (- valor media)] (* d d)))))

(defn- paso-newton
  "Un paso de Fisher scoring para un parámetro, dado su lado del par (θ o b).

   `signo` es +1 para θ y −1 para b: la derivada de P respecto de b es la de θ
   con el signo cambiado, y la información es la misma. Devuelve
   `[nuevo-valor informacion-del-dato]`.

   ⚠️ **El paso se acepta solo si la log-posterior sube**, y si no se parte a la
   mitad hasta diez veces. Con c > 0 la verosimilitud deja de ser cóncava y un
   paso de Fisher completo puede pasarse del máximo: medido en la primera
   corrida real, `electronica_notacion` quedaba en un ciclo y no convergía ni en
   3.000 iteraciones. Con el ascenso garantizado, cada barrido mejora el
   objetivo y el ciclo no puede ocurrir."
  [valor obs otro-valor signo c media precision]
  (let [[d1 info]
        (reduce (fn [[d1 info] {:keys [y otro]}]
                  (let [[theta b] (if (pos? signo) [valor otro] [otro valor])
                        [dp p] (termino theta b c)
                        v (* p (- 1.0 p))]
                    (if (< v min-varianza)
                      [d1 info]
                      [(+ d1 (* signo dp (/ (- y p) v)))
                       (+ info (/ (* dp dp) v))])))
                [0.0 0.0]
                (map (fn [o] {:y (:y o) :otro (otro-valor o)}) obs))
        d1 (- d1 (* precision (- valor media)))
        d2 (+ info precision)
        delta (/ d1 d2)
        delta (max (- paso-maximo) (min paso-maximo delta))
        actual (log-posterior valor obs otro-valor signo c media precision)]
    (loop [delta delta intentos 0]
      (let [nuevo (acotar (+ valor delta))]
        (cond
          (>= (log-posterior nuevo obs otro-valor signo c media precision) actual)
          [nuevo info]

          (>= intentos 10)
          [valor info]

          :else (recur (/ delta 2.0) (inc intentos)))))))

(defn- informacion
  [valor obs otro-valor signo c]
  (reduce (fn [info o]
            (let [[theta b] (if (pos? signo) [valor (otro-valor o)] [(otro-valor o) valor])
                  [dp p] (termino theta b c)
                  v (* p (- 1.0 p))]
              (if (< v min-varianza) info (+ info (/ (* dp dp) v)))))
          0.0
          obs))

(defn estimar
  "Estimación conjunta penalizada de θ por persona y `b` por ítem.

   - `obs`: salida de `observaciones`.
   - `etiquetas`: mapa `{item-id b-autoral}` (ids como string). Un ítem con
     respuestas y sin etiqueta usa 0,0 como media del prior.
   - `opts`: `:c`, `:theta-prior-sd`, `:b-prior-sd`, `:max-iter`, `:tol`.

   Devuelve `{:items {id {...}} :personas {persona θ} :iteraciones n
   :convergio? bool}`. Cada ítem trae `:n`, `:aciertos`, `:b-autoral`, `:b`,
   `:se` (posterior), `:delta` (b − b-autoral) y `:peso-del-dato`, la fracción
   de la precisión del `b` que viene de las respuestas y no del prior."
  ([obs etiquetas] (estimar obs etiquetas {}))
  ([obs etiquetas {:keys [c theta-prior-sd b-prior-sd max-iter tol]
                   :or {c default-c
                        theta-prior-sd default-theta-prior-sd
                        b-prior-sd default-b-prior-sd
                        max-iter 200
                        tol 1e-4}}]
   (let [c (double c)
         prec-theta (/ 1.0 (* theta-prior-sd theta-prior-sd))
         prec-b (/ 1.0 (* b-prior-sd b-prior-sd))
         por-persona (group-by :persona obs)
         por-item (group-by :item obs)
         b0 (into {} (map (fn [i] [i (double (get etiquetas i 0.0))]) (keys por-item)))]
     (loop [iter 0
            thetas (zipmap (keys por-persona) (repeat 0.0))
            bs b0]
       (let [thetas' (into {}
                           (map (fn [[p os]]
                                  [p (first (paso-newton (get thetas p) os
                                                         #(get bs (:item %))
                                                         1 c 0.0 prec-theta))]))
                           por-persona)
             bs' (into {}
                       (map (fn [[i os]]
                              [i (first (paso-newton (get bs i) os
                                                     #(get thetas' (:persona %))
                                                     -1 c (get b0 i) prec-b))]))
                       por-item)
             cambio (reduce max 0.0
                            (concat
                             (map #(Math/abs (- (get thetas' %) (get thetas %))) (keys thetas))
                             (map #(Math/abs (- (get bs' %) (get bs %))) (keys bs))))
             convergio? (< cambio tol)]
         (if (or convergio? (>= (inc iter) max-iter))
           {:iteraciones (inc iter)
            :convergio? convergio?
            :personas thetas'
            :items (into {}
                         (map (fn [[i os]]
                                (let [b (get bs' i)
                                      info (informacion b os #(get thetas' (:persona %)) -1 c)]
                                  [i {:n (count os)
                                      :aciertos (count (filter #(= 1 (:y %)) os))
                                      :b-autoral (get b0 i)
                                      :b b
                                      :se (/ 1.0 (Math/sqrt (+ info prec-b)))
                                      :delta (- b (get b0 i))
                                      :peso-del-dato (/ info (+ info prec-b))}])))
                         por-item)}
           (recur (inc iter) thetas' bs')))))))

;; ── Lectura del resultado ───────────────────────────────────────────────────

(defn resumen
  "Cifras de cabecera de una calibración: lo que el reporte de T-77 tiene que
   poder decir en una línea.

   `umbral-n` separa ítems con evidencia de ítems que solo repiten su etiqueta;
   `umbral-delta` es cuánto tiene que moverse un `b` para contarlo como
   «se movió», y solo cuenta si además el movimiento supera su propio `:se`."
  ([calibracion] (resumen calibracion {}))
  ([calibracion {:keys [umbral-n umbral-delta] :or {umbral-n 30 umbral-delta 0.5}}]
   (let [items (vals (:items calibracion))
         con-datos (filter #(>= (:n %) umbral-n) items)
         movidos (filter #(and (>= (Math/abs (:delta %)) umbral-delta)
                               (> (Math/abs (:delta %)) (:se %)))
                         items)]
     {:items (count items)
      :personas (count (:personas calibracion))
      :respuestas (reduce + 0 (map :n items))
      :items-con-n-suficiente (count con-datos)
      :umbral-n umbral-n
      :items-movidos (count movidos)
      :umbral-delta umbral-delta
      :peso-del-dato-mediano (let [ws (sort (map :peso-del-dato items))
                                   n (count ws)]
                               (when (pos? n) (nth ws (quot n 2))))
      :convergio? (:convergio? calibracion)
      :iteraciones (:iteraciones calibracion)})))

(defn filas-del-reporte
  "Los ítems ordenados por |delta| descendente, listos para una tabla."
  [calibracion]
  (->> (:items calibracion)
       (map (fn [[id m]] (assoc m :id id)))
       (sort-by (fn [m] [(- (Math/abs (:delta m))) (:id m)]))
       vec))

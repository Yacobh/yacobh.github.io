(ns universo.opciones
  "Orden de presentación de las alternativas de un ítem.

   **Por qué existe.** El 2026-08-19, revisando las claves de los cuatro bancos
   activos, apareció que 293 de 306 ítems tienen la alternativa correcta en la
   letra A (`numbers_v1`, `paes_m1` y `polinomios` al 100 %; `diagnostico` al
   80 %). El banco se generó dejando la correcta primero y nunca se barajó.

   La UI ya rotaba las opciones con `shift = id mod 4`, lo que reparte bien la
   posición visible —79/78/74/75 sobre los cuatro lugares— pero es una rotación
   *cíclica* y determinista: con la correcta siempre en A, la posición mostrada
   es exactamente `(4 - (id mod 4))`. Quien note esa regularidad acierta sin
   leer el enunciado, y θ deja de medir habilidad.

   Acá se reemplaza esa rotación por una **permutación** (Fisher-Yates sembrado
   con xorshift), que rompe el orden relativo de los distractores y no se deduce
   observando unos pocos ítems.

   **Lo que esto NO arregla.** El cliente es inspeccionable: la semilla y el
   algoritmo viajan en el bundle. Esto sube el costo de explotarlo, no lo hace
   imposible. La corrección de raíz es permutar el dato en `questions` para que
   `correct_option` quede repartida; mientras eso no pase, el banco sigue
   sesgado para cualquier otro consumidor (exportación, panel docente,
   calibración). Ver [[project-memory/RISKS]] R-35.

   **Invariante que el resto del sistema necesita:** barajar cambia el orden,
   nunca el `:value`. El servidor corrige con la letra original (ADR-015) y las
   explicaciones `error_a..error_d` se buscan por esa misma letra."
  (:require
   [clojure.string :as str]))

;; Sal fija: despega la permutación de la identidad para los ids chicos, de modo
;; que el ítem 1 no quede casi siempre en su orden original.
(def ^:private sal 1103515245)

(defn- u32
  "Fuerza el entero a 32 bits sin signo (`x >>> 0` en JS)."
  [x]
  (unsigned-bit-shift-right x 0))

(defn- xorshift
  "Un paso de xorshift32. Nunca devuelve 0 (sería un punto fijo)."
  [x]
  (let [x (u32 (if (zero? (u32 x)) 2463534242 x))
        x (u32 (bit-xor x (u32 (bit-shift-left x 13))))
        x (u32 (bit-xor x (unsigned-bit-shift-right x 17)))
        x (u32 (bit-xor x (u32 (bit-shift-left x 5))))]
    x))

(defn semilla
  "Semilla estable para un ítem. Acepta id numérico o string (uuid): de un
   string se toma un hash rodante, para que barajar siga funcionando si algún
   día `questions.id` deja de ser entero."
  [id]
  (let [base (cond
               (number? id) (long id)
               (string? id) (reduce (fn [h c] (u32 (+ (* 31 h) (.charCodeAt c 0))))
                                    7
                                    (str/split id #""))
               :else 0)]
    (xorshift (u32 (+ (u32 base) sal)))))

(defn permutacion
  "Vector de índices `0..n-1` permutados por Fisher-Yates con la semilla dada.
   Determinista: la misma semilla da siempre el mismo orden, que es lo que hace
   que un estudiante que recarga la página vea las alternativas igual que antes."
  [n id]
  (if (<= n 1)
    (vec (range n))
    (loop [i (dec n)
           idx (vec (range n))
           s (semilla id)]
      (if (pos? i)
        (let [s' (xorshift s)
              j (mod s' (inc i))]
          (recur (dec i)
                 (assoc idx i (nth idx j) j (nth idx i))
                 s'))
        idx))))

(defn barajar
  "Reordena las alternativas del ítem. Preserva cada elemento intacto —en
   particular su `:value`— y solo cambia la posición."
  [opciones id]
  (let [v (vec opciones)]
    (mapv #(nth v %) (permutacion (count v) id))))

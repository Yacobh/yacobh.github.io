(ns universo.irt.person-fit
  "Person-fit: qué tan creíble es el **patrón** de respuestas de un intento
   dado su propio θ (Q-46, T-175).

   ── Qué es ─────────────────────────────────────────────────────────────────
   θ resume cuántas acertó y de qué dificultad. El person-fit mira **cuáles**:
   el modelo predice que quien tiene θ = 0 acierta casi todas las fáciles y
   pocas difíciles. Un patrón al revés —acierta difíciles y falla fáciles— da
   el mismo θ con un patrón que el modelo considera improbable. Eso no prueba
   trampa: también lo producen el azar, el cansancio, un ítem mal etiquetado
   (el banco no está calibrado, R-17) o un estudiante que sabe un tema y no
   otro. Es **una variable más** de las que deciden qué intento cuenta, nunca
   una sentencia por sí sola.

   ── Las tres señales ───────────────────────────────────────────────────────
   1. `lz` (Drasgow, Levine y Williams, 1985): la log-verosimilitud del patrón,
      estandarizada. Cerca de 0 es lo esperado; muy negativa (< −1,645, el 5 %
      de una normal) es un patrón improbable. **Con 8 a 20 ítems su
      distribución no es normal** y el corte es orientativo.
   2. `guttman`: de los pares «falló uno, acertó otro» con dificultades
      distintas, qué fracción tiene el acierto en el **más difícil**. 0 es un
      patrón perfectamente ordenado; ~0,5 es lo que produce responder al azar.
      Es la versión que se le puede explicar a un profesor.
   3. `cv-tiempo`: coeficiente de variación del tiempo por ítem. Quien resuelve
      leyendo tarda distinto en cada ítem; un proceso mecánico igual para todos
      —fotografiar, pegar, copiar— tiende a tiempos parejos. Es la señal más
      débil de las tres y la que más depende del banco.

   Se calcula con **el mismo modelo que estimó θ** (`tetha/probability`, con el
   azar `c` del intento): medir el ajuste con otro modelo mediría la diferencia
   entre modelos, no al estudiante.

   ── Qué entra ──────────────────────────────────────────────────────────────
   Solo respuestas con `:correct?` booleano y `:difficulty` numérica, y **sin
   escapes** (ADR-029): un escape no es un fallo, es no haber respondido. El
   peso de esfuerzo (ADR-014) **no** filtra acá: una respuesta rápida y correcta
   es justo parte del patrón que se quiere mirar."
  (:require [universo.components.tetha :as tetha]
            [universo.irt.escape :as escape]))

(def corte-lz
  "Percentil 5 de una normal estándar. Orientativo con tests cortos."
  -1.645)

(def min-items
  "Debajo de esto no se reporta nada: con cinco ítems cualquier patrón cabe."
  6)

(defn respuestas-evaluables
  "Las respuestas que cuentan para el ajuste: con resultado y dificultad, sin
   escapes."
  [responses]
  (filterv (fn [r]
             (and (boolean? (:correct? r))
                  (number? (:difficulty r))
                  (not (escape/escape? r))))
           responses))

(defn- clamp-p [p] (-> p (max 1e-6) (min (- 1 1e-6))))

(defn lz
  "Log-verosimilitud estandarizada del patrón dado θ. `nil` si no hay ítems o
   si la varianza es cero (todos los P en los extremos)."
  [responses theta c]
  (let [ps (map (fn [r] [(if (:correct? r) 1 0)
                         (clamp-p (tetha/probability theta (:difficulty r) c))])
                responses)
        l0 (reduce + (map (fn [[u p]] (+ (* u (Math/log p)) (* (- 1 u) (Math/log (- 1 p))))) ps))
        e  (reduce + (map (fn [[_ p]] (+ (* p (Math/log p)) (* (- 1 p) (Math/log (- 1 p))))) ps))
        v  (reduce + (map (fn [[_ p]] (let [lg (Math/log (/ p (- 1 p)))] (* p (- 1 p) lg lg))) ps))]
    (when (and (seq ps) (pos? v))
      (/ (- l0 e) (Math/sqrt v)))))

(defn guttman
  "Fracción de pares (falló i, acertó j), con dificultades distintas, en que el
   acertado es el más difícil. `nil` si no hay ningún par así (acertó todo,
   falló todo, o todo a la misma dificultad)."
  [responses]
  (let [fallos   (map :difficulty (remove :correct? responses))
        aciertos (map :difficulty (filter :correct? responses))
        pares    (for [bf fallos, ba aciertos :when (not= bf ba)] (> ba bf))]
    (when (seq pares)
      (/ (count (filter true? pares)) (count pares)))))

(defn cv-tiempo
  "Coeficiente de variación de `:time-ms`. `nil` con menos de tres tiempos."
  [responses]
  (let [ts (keep (fn [r] (let [t (:time-ms r)] (when (and (number? t) (pos? t)) t))) responses)
        n  (count ts)]
    (when (>= n 3)
      (let [m   (/ (reduce + ts) n)
            var (/ (reduce + (map #(let [d (- % m)] (* d d)) ts)) (dec n))]
        (when (pos? m) (/ (Math/sqrt var) m))))))

(defn medir
  "Las tres señales de un intento. `theta` es el θ guardado del intento y `c`
   el azar con que se estimó (nil → el de `universo.motor`). Devuelve
   `{:n … :lz … :guttman … :cv-tiempo … :lz-bajo? …}`, o `{:n n}` solo si el
   intento tiene menos de `min-items` respuestas evaluables."
  [responses theta c]
  (let [rs (respuestas-evaluables responses)
        n  (count rs)]
    (if (or (< n min-items) (not (number? theta)))
      {:n n}
      (let [z (lz rs theta c)]
        {:n n
         :lz z
         :guttman (guttman rs)
         :cv-tiempo (cv-tiempo rs)
         :lz-bajo? (boolean (and z (< z corte-lz)))}))))

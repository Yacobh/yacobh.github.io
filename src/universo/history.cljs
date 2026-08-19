(ns universo.history
  "Agrupación del historial de evaluaciones del tablero.

   ── El problema que resuelve ────────────────────────────────────────────────
   El tablero listaba los 44 intentos en orden cronológico plano. Eso responde
   «¿qué hice el martes?», que casi nunca es la pregunta; la pregunta real es
   **«¿en qué evaluaciones estoy y cómo me fue mejorando en cada una?»**. Con
   `diagnostico` rendido doce veces intercalado con seis bancos de cuántica, la
   lista cronológica esconde exactamente lo que el estudiante vino a ver.

   ── Por qué no hay un solo gráfico con todo ────────────────────────────────
   Un único θ-vs-tiempo mezclando bancos sería **más bonito y falso**: θ se
   estima contra el banco que se rindió, con su propia calibración de
   `difficulty`, y esa calibración hoy es autoral y sin validar
   ([[RISKS]] R-17, Q-05). Un 2,5 en `diagnostico` y un 2,5 en
   `mq_armonicos_esfericos` no son el mismo logro y una línea que los une afirma
   que sí. Por eso: **una serie por evaluación**, nunca una sola línea global."
  (:require [clojure.string :as str]
            [universo.topics :as topics]))

(defn- ms [fecha]
  (let [t (.getTime (js/Date. (str fecha)))]
    (when-not (js/isNaN t) t)))

(defn- clave
  "Clave de agrupación: la forma canónica del topic (ADR-017).

   Sin esto, `términos_semejantes` y `terminos_semejantes` serían dos
   evaluaciones distintas en el tablero — es el mismo modo de fallo que T-51
   documentó en el banco, visto desde el otro lado."
  [tema]
  (or (topics/normalize tema)
      (some-> tema str str/trim not-empty)))

(defn attempt-points
  "Puntos graficables de una serie de intentos: `{:t ms :theta θ :fecha}`.

   Los intentos **sin θ** (un test abandonado antes de la primera respuesta) se
   descartan del gráfico pero no del conteo: existieron, y decir que no es
   falsear el historial. Ordenados del más viejo al más nuevo, que es como se
   lee una línea de tiempo."
  [intentos]
  (->> intentos
       (keep (fn [a]
               (when-let [t (ms (:fecha a))]
                 (when (number? (:theta a))
                   {:t t :theta (double (:theta a)) :fecha (:fecha a)}))))
       (sort-by :t)
       vec))

(defn- resumen [tema intentos]
  (let [ordenados (vec (sort-by #(or (ms (:fecha %)) 0) intentos))
        puntos (attempt-points intentos)
        thetas (mapv :theta puntos)
        ultimo (last ordenados)
        primera (first puntos)
        ultima (last puntos)]
    {:tema tema
     :clave (clave tema)
     :intentos (count intentos)
     :completados (count (filter :completado? intentos))
     :puntos puntos
     ;; Δθ entre el primer y el último intento **con θ**. Es la única medida de
     ;; progreso que este proyecto promete (G-4) y por eso se calcula acá y no
     ;; en la vista. `nil` con un solo punto: un delta contra sí mismo sería 0,0
     ;; y eso se leería como «no avanzaste», que no es lo mismo que «todavía no
     ;; hay con qué comparar».
     :delta (when (> (count thetas) 1)
              (- (:theta ultima) (:theta primera)))
     :theta-ultimo (:theta ultima)
     :theta-mejor (when (seq thetas) (apply max thetas))
     :ultima-fecha (:fecha ultimo)
     :ultimo-porcentaje (:porcentaje ultimo)
     :ultimo-id (:id ultimo)
     :historial (vec (reverse ordenados))}))

(defn group-attempts
  "Agrupa el historial por evaluación, la más reciente primero.

   Devuelve un vector de resúmenes con `:intentos`, `:puntos` (para el
   gráfico), `:delta` (Δθ), `:theta-ultimo`, `:theta-mejor` y el `:historial`
   completo del grupo — nada se pierde, solo se ordena."
  [historial]
  (->> (or historial [])
       (filter #(some? (clave (:tema %))))
       (group-by #(clave (:tema %)))
       (map (fn [[_ intentos]]
              ;; El nombre que se muestra es el del intento más reciente: si el
              ;; topic se renombró, el tablero habla el idioma de hoy.
              (let [mas-reciente (apply max-key #(or (ms (:fecha %)) 0) intentos)]
                (resumen (:tema mas-reciente) intentos))))
       (sort-by #(or (ms (:ultima-fecha %)) 0) >)
       vec))

(defn totals
  "Contadores de cabecera: cuántas evaluaciones distintas y cuántos intentos.

   La distinción importa y hoy el tablero no la hace: «44 evaluaciones» son en
   realidad 44 intentos sobre unas pocas evaluaciones."
  [grupos]
  {:evaluaciones (count grupos)
   :intentos (reduce + 0 (map :intentos grupos))
   :con-progreso (count (filter #(and (:delta %) (pos? (:delta %))) grupos))})

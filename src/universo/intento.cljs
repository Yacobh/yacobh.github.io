(ns universo.intento
  "Lectura de **un** intento de diagnóstico, ítem por ítem.

   ── El problema que resuelve ────────────────────────────────────────────────
   El panel de administración mostraba seis columnas —estudiante, fecha, tema,
   θ, aciertos, estado— y las filas no eran clickeables. O sea que la pregunta
   que un profesor hace primero, *«¿en qué se equivocó?»*, no tenía respuesta en
   la aplicación: había que abrir el SQL Editor de Supabase.

   Y el dato **ya estaba**. Cada respuesta guardada trae la alternativa que se
   marcó, cuál era la correcta, el texto de la idea errónea de ese distractor, el
   módulo, el tiempo y su peso de esfuerzo. Este namespace no calcula nada nuevo:
   **ordena para leer lo que ya se guardaba**.

   ── Por qué la categoría de una respuesta no es binaria ─────────────────────
   Parece que una respuesta es correcta o incorrecta, y no lo es: hay **tres
   dimensiones ortogonales** que el producto ya distingue por separado.

   1. **Acertó o no** (`:correct?`).
   2. **Se rindió** (`:escape`, ADR-029): declaró «no entiendo el enunciado» o
      «no sé resolverlo» en vez de adivinar. Eso **no es un error conceptual**, y
      contarlo como tal inventaría una idea errónea que el estudiante nunca tuvo.
   3. **Contó para θ** (`:weight`, ADR-014): una respuesta bajo el umbral de
      tiempo no aporta a la estimación.

   Cruzarlas da cinco categorías, no dos, y la que más sorprende es
   **`:correcta-desestimada`**: una respuesta *correcta* que el filtro de esfuerzo
   descartó por veloz. No es rara — en la sesión del 2026-09-10 fueron **14 de
   104 aciertos**. Mostrarla como un acierto más esconde que no contó; mostrarla
   como error es directamente falso. Por eso tiene nombre propio, y por eso está
   [[../../project-memory/OPEN_QUESTIONS]] Q-47: para ADR-019 rápido y correcto
   es la definición de **fluidez**, y el filtro de esfuerzo la borra antes de que
   el eje λ pueda verla.

   ── θ en el borde de la escala no es una medición ───────────────────────────
   El estimador vive acotado a [−3, 3]. Un θ **exactamente** en un extremo casi
   siempre significa que el MAP quería seguir y no pudo: es un valor
   **censurado**, no estimado. En la primera corrida real dos estudiantes de doce
   quedaron en −3,00 y **no fue click-through** (uno trabajó 16,5 minutos con una
   sola respuesta desestimada). Eso es [[../../project-memory/RISKS]] R-44, y por
   eso `censurado?` existe: un número así no se muestra como si fuera una
   medición más."
  (:require [clojure.string :as str]
            [universo.irt.effort :as effort]
            [universo.irt.escape :as escape]))

;; Los extremos del clamp del estimador (`universo.components.tetha`). Si alguna
;; vez la escala cambia allá, cambia acá: son el mismo número, no dos.
(def theta-min -3.0)
(def theta-max 3.0)

;; Tolerancia de comparación. El valor guardado viaja por JSON y vuelve como
;; double, así que `= -3.0` es frágil; lo que interesa es «pegado al borde».
(def ^:private epsilon 1e-6)

(defn en-el-suelo?
  "true si θ quedó pegado al extremo inferior de la escala."
  [theta]
  (and (number? theta) (<= (double theta) (+ theta-min epsilon))))

(defn en-el-techo?
  "true si θ quedó pegado al extremo superior."
  [theta]
  (and (number? theta) (>= (double theta) (- theta-max epsilon))))

(defn censurado?
  "true si θ está en un borde del clamp y por lo tanto **no es una estimación**
   sino un límite alcanzado. Ver R-44: no se reporta como medición ni entra a la
   calibración como si lo fuera."
  [theta]
  (or (en-el-suelo? theta) (en-el-techo? theta)))

(defn contada?
  "true si la respuesta aportó a la estimación de θ. Falso solo cuando el filtro
   de esfuerzo la desestimó (ADR-014). Las respuestas anteriores a ADR-014 no
   traen `:weight` y cuentan, que es lo que `effort/weight-of` ya resuelve."
  [respuesta]
  (pos? (effort/weight-of respuesta)))

(defn categoria
  "Una de cinco: `:escape` · `:correcta` · `:correcta-desestimada` ·
   `:incorrecta` · `:incorrecta-desestimada`.

   El escape se evalúa primero **a propósito**: una respuesta de escape también
   viene con `:correct? false` y `:weight 0`, así que si se preguntara por esas
   dos primero, todo «no sé» quedaría contado como error desestimado y se
   perdería la única categoría que dice algo distinto."
  [respuesta]
  (let [ok? (boolean (:correct? respuesta))
        cuenta? (contada? respuesta)]
    (cond
      (escape/escape? respuesta) :escape
      (and ok? cuenta?)          :correcta
      ok?                        :correcta-desestimada
      cuenta?                    :incorrecta
      :else                      :incorrecta-desestimada)))

(defn cuenta-como-error?
  "true si esta respuesta es evidencia de una idea errónea concreta.

   Es el mismo criterio que usa `supabase/queries/T-130_…sql` para el ranking del
   curso, y vive acá para que la pantalla y la consulta **no puedan divergir**:
   incorrecta, sin escape, con esfuerzo válido y con idea errónea escrita."
  [respuesta]
  (and (= :incorrecta (categoria respuesta))
       (not (str/blank? (str (:selected-error respuesta))))))

(defn segundos
  "Tiempo de la respuesta en segundos, o nil si no se midió.

   `time-ms` es 0 en casi todo el histórico (el cronómetro no registraba hasta
   2026-08; ver T-59), y 0 significa **«no se midió»**, no «respondió al
   instante». Devolver 0 haría que el panel mostrara «0 s» como si fuera un dato."
  [respuesta]
  (let [ms (:time-ms respuesta)]
    (when (and (number? ms) (pos? ms))
      (/ (double ms) 1000.0))))

(defn alternativas-por-id
  "`{id-de-pregunta {\"A\" texto, \"B\" texto, ...}}` a partir de las preguntas
   que el test guardó en `:questions`.

   **Por qué la letra alcanza para cruzar, aunque las alternativas se barajen.**
   ADR-030 baraja el orden de presentación **en el cliente**, y esa permutación
   no se persiste; pero `selected-option` y `correct-option` se guardan en la
   **letra canónica** —la de la columna `option_a`…`option_d`— porque
   `score_answer` corrige contra la base. Así que la letra de la respuesta y la
   letra de la columna son la misma, y el cruce es directo.

   Se reduce acá, al cargar, y no se guarda la pregunta entera: de un ítem solo
   interesan las cuatro alternativas, y quedarse con el resto multiplicaría por
   varios megas lo que el panel mantiene en memoria para 200 intentos."
  [questions]
  (into {}
        (keep (fn [q]
                (when-let [id (:id q)]
                  [id {"A" (:option_a q)
                       "B" (:option_b q)
                       "C" (:option_c q)
                       "D" (:option_d q)}]))
              (or questions []))))

(defn- texto-de
  "El texto de una alternativa, o nil.

   La letra se normaliza a mayúscula porque `selected-option` viaja a veces en
   minúscula. `alternativas` puede ser nil —un intento viejo sin `:questions`, o
   una pregunta que no quedó en el mapa— y por eso se usa `get` y no se invoca el
   mapa como función: llamar a nil revienta, y el modo de fallo correcto acá es
   quedarse sin texto, no tumbar la pantalla."
  [alternativas letra]
  (when (and (map? alternativas) (some? letra))
    (not-empty (get alternativas (str/upper-case (str letra))))))

(defn fila
  "Una respuesta lista para pintar, con su número de orden (1-indexado).

   `alternativas` es el mapa de esa pregunta (`{\"A\" texto …}`); puede faltar —
   un intento viejo sin `:questions`—, y en ese caso las letras quedan sin texto
   en vez de romper la vista."
  ([indice respuesta] (fila indice respuesta nil))
  ([indice respuesta alternativas]
   (let [marcada (:selected-option respuesta)
         correcta (:correct-option respuesta)]
     {:n (inc indice)
      :question-id (:question-id respuesta)
      :enunciado (:question-text respuesta)
      :modulo (:module-slug respuesta)
      :dificultad (:difficulty respuesta)
      :marcada marcada
      :correcta correcta
      :texto-marcada (texto-de alternativas marcada)
      :texto-correcta (texto-de alternativas correcta)
      :idea-erronea (when (cuenta-como-error? respuesta)
                      (:selected-error respuesta))
      :escape (escape/escape-of respuesta)
      :categoria (categoria respuesta)
      :segundos (segundos respuesta)})))

(defn filas
  "Las respuestas de un intento, en el orden en que se rindieron.

   `alternativas-por-pregunta` viene de `alternativas-por-id`."
  ([respuestas] (filas respuestas nil))
  ([respuestas alternativas-por-pregunta]
   (vec (map-indexed (fn [i r]
                       (fila i r (get alternativas-por-pregunta (:question-id r))))
                     (or respuestas [])))))

(defn resumen
  "Los números de cabecera de un intento.

   `duracion-min` se recibe ya calculada (la produce
   `universo.events.dashboard/duracion-test-min`) en vez de recalcularse acá: es
   el mismo dato y duplicar la fórmula es cómo dos pantallas terminan diciendo
   minutos distintos del mismo test."
  [{:keys [responses theta stop-reason engine-version origin duracion-min]}]
  (let [rs (vec (or responses []))
        por-categoria (frequencies (map categoria rs))
        n (count rs)
        contadas (count (filter contada? rs))]
    {:items n
     :aciertos (+ (get por-categoria :correcta 0)
                  (get por-categoria :correcta-desestimada 0))
     :porcentaje (when (pos? n)
                   (js/Math.round (* 100.0 (/ (+ (get por-categoria :correcta 0)
                                                 (get por-categoria :correcta-desestimada 0))
                                              n))))
     :escapes (get por-categoria :escape 0)
     :desestimadas (effort/discarded-count rs)
     ;; Se separa del total de desestimadas porque es la que sorprende (Q-47).
     :aciertos-desestimados (get por-categoria :correcta-desestimada 0)
     :contadas contadas
     :errores-con-idea (count (filter cuenta-como-error? rs))
     :theta theta
     :theta-censurado? (censurado? theta)
     :stop-reason stop-reason
     ;; Un intento sin razón de parada y con menos ítems de los configurados se
     ;; cerró con el botón de salir: **sí deja fila**, con `stop-reason` nulo.
     ;; Lo invisible es solo cerrar la pestaña (T-134).
     :abandonado? (nil? stop-reason)
     :engine-version engine-version
     :origin origin
     :duracion-min duracion-min
     :seg-por-item (when (and duracion-min (pos? n))
                     (/ (* 60.0 (double duracion-min)) n))}))

(defn razon-de-parada
  "La razón de parada como **keyword**, venga como venga.

   Un test releído desde Supabase la trae como string: `clj->js` serializa
   `:max-items` a `\"max-items\"` y al volver, `:keywordize-keys true` solo
   keywordiza las **claves**, no los valores. `irt-chart/stop-reason-label`
   compara con un `case` contra keywords, así que sin esta normalización la
   leyenda del gráfico simplemente no aparecía — fallaba en silencio, que es
   peor que fallar."
  [reason]
  (cond
    (keyword? reason) reason
    (and (string? reason) (seq reason)) (keyword reason)
    :else nil))

(defn puntos-del-grafico
  "Puntos para `irt-chart/irt-progress-chart`: θ estimado y dificultad del ítem,
   uno por respuesta.

   Se reconstruyen acá porque el gráfico del test se alimenta del `app-db` en
   vivo y un intento guardado no lo tiene.

   ⚠️ **`:n` no es decorativo: es la coordenada horizontal.** `irt-chart/x-scale`
   reparte los puntos con `(:n p)`, así que sin esa clave el cálculo da `NaN`, el
   SVG interpreta la coordenada inválida como 0 y **los puntos se apilan sobre el
   eje vertical**. Pasó exactamente eso la primera vez que se dibujó acá.

   `theta-history` y `responses` deberían ir parejos, pero **se recorren con `map`
   de dos colecciones a propósito**: si una quedó más corta —un test viejo, un
   guardado a medias— se dibuja lo que hay en vez de reventar o de inventar un
   punto."
  [{:keys [responses theta-history]}]
  (vec (map-indexed (fn [i [r th]]
                      {:n (inc i)
                       :theta th
                       :difficulty (:difficulty r)})
                    (map vector (or responses []) (or theta-history [])))))

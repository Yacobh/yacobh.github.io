(ns universo.editor
  "Reglas puras de los paneles de edición del admin.

   Existe porque las tres reglas que hay acá se necesitan en **dos lugares cada
   una** —la vista, para avisar antes de pulsar Guardar, y el evento, para no
   guardar basura— y tenerlas duplicadas es cómo se desincronizan. El caso
   testigo está en este mismo repositorio: `question-draft-valid?` vivía solo en
   `events/admin`, así que el editor no podía decir *qué* faltaba; lo único que
   sabía hacer era un toast después del clic."
  (:require [clojure.string :as str]))

;; -----------------------------------------------------------------------------
;; Módulos
;; -----------------------------------------------------------------------------

(defn modules-by-track
  "Módulos agrupados por track, para un `<select>` con `<optgroup>`.

   Con 35 módulos —20 de PAES y 15 del track experimental de cuántica
   (ADR-018)— una lista plana obliga a leerla entera cada vez. Agrupar por track
   es la diferencia entre buscar y elegir.

   Dentro de cada track van ordenados por `order_index` y no alfabéticamente: ese
   es el orden en que el estudiante recorre el módulo, y el autor piensa en ese
   orden, no en el del diccionario."
  [modules]
  (->> (or modules [])
       (group-by #(or (:track %) "otros"))
       (map (fn [[track ms]]
              [track (vec (sort-by (juxt #(or (:order_index %) 0)
                                         #(str (:title %)))
                                   ms))]))
       (sort-by first)
       vec))

(defn module-label
  "Etiqueta de un módulo en un `<select>`: título, con el slug como desempate.

   El slug va porque hay títulos que se repiten entre tracks (`Números` existe en
   PAES y en cuántica) y porque el resto del panel —la lista de recursos, los
   filtros— muestra slugs: si el selector mostrara solo el título, el autor
   tendría que traducir mentalmente entre dos vocabularios."
  [m]
  (let [titulo (str/trim (str (or (:title m) "")))
        slug (str/trim (str (or (:slug m) "")))]
    (cond
      (and (seq titulo) (seq slug)) (str titulo " · " slug)
      (seq titulo) titulo
      (seq slug) slug
      :else "(módulo sin nombre)")))

;; -----------------------------------------------------------------------------
;; Vista previa
;; -----------------------------------------------------------------------------

(defn renderable?
  "¿La vista previa de este texto muestra algo distinto de lo que se escribió?

   El editor de preguntas tiene **nueve** campos con vista previa (enunciado, 4
   opciones, 4 explicaciones). Cuando el contenido es «2» o «Sumó mal», la caja
   de previa repite el texto y lo único que hace es duplicar el largo del
   formulario. Se muestra solo cuando hay algo que renderizar.

   El `$` cuenta **aunque venga escapado** (`\\$8.000`): ver [[LESSONS_LEARNED]]
   L-34 — un peso mal escapado dejaba «Mi plan» en blanco, así que es justo el
   caso en que el autor más necesita ver el resultado."
  [text {:keys [markdown?]}]
  (let [s (str (or text ""))]
    (boolean
     (and (seq (str/trim s))
          (or (str/includes? s "$")
              (and markdown? (str/includes? s "*")))))))

;; -----------------------------------------------------------------------------
;; Validación del borrador de pregunta
;; -----------------------------------------------------------------------------

(def ^:private campos-obligatorios
  [[:question "el enunciado"]
   [:option_a "la opción A"]
   [:option_b "la opción B"]
   [:option_c "la opción C"]
   [:option_d "la opción D"]
   [:topic "el tema"]])

(defn question-missing-fields
  "Qué le falta a este borrador para poder guardarse, en palabras.

   Devuelve un vector de frases listas para mostrar; vacío significa válido. Se
   devuelve la lista y no un booleano porque «no se puede guardar» sin decir qué
   falta obliga al autor a comparar campo por campo — y este formulario tiene
   quince.

   **El módulo no está acá a propósito.** Un tercio del banco no lo tiene (T-60)
   y exigirlo bloquearía editar cualquiera de esos ítems; se pide, pero no se
   obliga."
  [draft]
  (let [falta? (fn [k] (str/blank? (str (get draft k))))
        base (into [] (comp (filter (fn [[k _]] (falta? k)))
                            (map second))
                   campos-obligatorios)]
    (cond-> base
      (not (#{"A" "B" "C" "D"} (str/trim (str (:correct_option draft)))))
      (conj "marcar la respuesta correcta"))))

(defn question-draft-valid?
  "¿Se puede guardar este borrador? Espejo exacto de `question-missing-fields`."
  [draft]
  (empty? (question-missing-fields draft)))

;; -----------------------------------------------------------------------------
;; Catalogación de distractores
;; -----------------------------------------------------------------------------

(def ^:private distractores
  [["A" :option_a :error_a :misconception_a_id]
   ["B" :option_b :error_b :misconception_b_id]
   ["C" :option_c :error_c :misconception_c_id]
   ["D" :option_d :error_d :misconception_d_id]])

(defn distractor-rows
  "Una fila por **distractor**, para catalogar de corrido en vez de ítem por ítem.

   ── La decisión que hay detrás ──────────────────────────────────────────────
   **La alternativa correcta no aparece.** Un distractor tiene una idea errónea
   detrás; la respuesta correcta no tiene ninguna, y ofrecer su selector invita a
   catalogar un acierto como si fuera un error. Es la clase de dato sucio que
   después nadie encuentra: la misconception quedaría contada entre los errores
   de estudiantes que en realidad respondieron bien.

   Si `correct_option` no es A–D —hay ítems así en el banco— no se puede saber
   cuál excluir, así que se muestran las cuatro y la fila queda marcada con
   `:correcta-desconocida? true`. Esconder las cuatro sería peor: el ítem
   desaparecería de la vista sin que nadie sepa por qué."
  [questions]
  (let [validas #{"A" "B" "C" "D"}]
    (vec
     (for [q (or questions [])
           :let [correcta (str/upper-case (str/trim (str (:correct_option q))))
                 conocida? (contains? validas correcta)]
           [letra opcion-k error-k mis-k] distractores
           :when (or (not conocida?) (not= letra correcta))]
       {:id (:id q)
        :question (:question q)
        :topic (:topic q)
        :module_id (:module_id q)
        :letra letra
        :opcion (get q opcion-k)
        :error-key error-k
        :error (get q error-k)
        :mis-key mis-k
        :mis-id (get q mis-k)
        :correcta-desconocida? (not conocida?)}))))

(defn catalog-progress
  "Cuántos distractores de este conjunto ya tienen idea errónea.

   Es el número que dice si catalogar un módulo está terminado o a medias, y el
   que hace visible que el avance existe: sin él, catalogar 40 distractores es
   una lista infinita sin fondo."
  [rows]
  (let [total (count rows)
        hechos (count (filter #(some? (:mis-id %)) rows))]
    {:total total
     :hechos hechos
     :faltan (- total hechos)
     :fraccion (if (pos? total) (/ (double hechos) total) 0.0)}))

;; -----------------------------------------------------------------------------
;; Delimitadores de LaTeX en las alternativas
;; -----------------------------------------------------------------------------

;; Un comando LaTeX (`\frac`, `\sqrt`, `\times`…) o un super/subíndice. Es lo
;; que distingue «una alternativa que es matemática» de «una alternativa que es
;; texto».
(def ^:private latex-crudo #"\\[a-zA-Z]+|[A-Za-z0-9\}\)][\^_][A-Za-z0-9\{]")

(defn necesita-delimitadores?
  "¿Este texto es LaTeX sin `$…$` alrededor?

   Medido el 2026-08-19: 40 de las 48 alternativas del módulo de fracciones están
   guardadas como `\\frac{2}{1}` **sin delimitadores**, y `math/latex` solo
   convierte lo que va entre `$`. O sea que el estudiante ve las barras y las
   llaves literales y no puede responder aunque sepa fracciones.

   Tres cosas que **no** toca, y cada una por una razón distinta:
   - lo que ya tiene un `$` en cualquier parte — incluido `\\$8.000`, el peso
     escapado de [[LESSONS_LEARNED]] L-34: envolverlo lo rompería;
   - el texto plano y los números sueltos («2», «Invirtió el divisor»);
   - lo vacío."
  [texto]
  (let [t (str (or texto ""))]
    (boolean
     (and (seq (str/trim t))
          (not (str/includes? t "$"))
          (re-find latex-crudo t)))))

(defn wrap-math
  "Envuelve en `$…$` si hace falta; si no, devuelve el texto tal cual.

   **Idempotente**: aplicarla dos veces da lo mismo que aplicarla una, porque la
   segunda vez ya hay un `$`. Eso importa: es una acción en lote sobre contenido
   y nadie recuerda si ya la corrió."
  [texto]
  (if (necesita-delimitadores? texto)
    (str "$" (str/trim (str texto)) "$")
    texto))

(defn option-wraps
  "Qué alternativas de este ítem hay que reescribir, y con qué.

   Devuelve solo las que cambian —`{}` si no cambia ninguna— para no mandar a la
   base 64 escrituras cuando hacen falta 40, y para poder decirle al autor
   cuántas van a cambiar **antes** de tocar nada."
  [question]
  (into {}
        (keep (fn [k]
                (let [antes (get question k)
                      despues (wrap-math antes)]
                  (when-not (= antes despues) [k despues]))))
        [:option_a :option_b :option_c :option_d]))

;; -----------------------------------------------------------------------------
;; Edición en vivo durante el diagnóstico (capa cero)
;; -----------------------------------------------------------------------------

(def campos-en-vivo
  "Lo que el editor del diagnóstico puede tocar sobre el ítem que está a la vista.

   Es un subconjunto deliberado del formulario del panel admin: la **capa cero**
   —las cuatro explicaciones de error y su idea errónea del catálogo—, el
   enunciado, y las dos palancas que deciden qué pasa después (`difficulty`
   elige el ítem siguiente, `module_id` decide qué material recibe el «no sé» y
   qué entra a «Mi plan»).

   Fuera quedan las cuatro alternativas y `correct_option`: cambiarlas a mitad de
   un test invalidaría la respuesta que el estudiante acaba de dar contra un ítem
   que ya no existe. Eso se hace en el panel, con el test cerrado."
  [:question :difficulty :module_id
   :error_a :error_b :error_c :error_d
   :misconception_a_id :misconception_b_id :misconception_c_id :misconception_d_id])

(defn- ->uuid-o-nil
  "`\"\"` y el string `\"null\"` de un `<select>` sin elegir tienen que llegar a
   Postgres como `null` y no como texto: un uuid mal formado no falla suave, la
   fila entera se rechaza. Misma regla que `crud/uuid-or-nil`."
  [v]
  (let [s (str/trim (str (or v "")))]
    (when-not (or (zero? (count s)) (= s "null")) s)))

(defn- ->numero-o-nil
  "Un `<input type=number>` entrega string; vacío es `nil` (borrar el valor), no 0."
  [v]
  (cond
    (number? v) v
    (nil? v) nil
    :else (let [s (str/trim (str v))]
            (when (pos? (count s))
              (let [n (js/parseFloat s)]
                (when-not (js/isNaN n) n))))))

(defn coercionar-campo
  "Valor de un campo del borrador, en el tipo que espera la columna.

   El caso que no es evidente son los textos: el formulario convierte los `nil`
   en `\"\"` para que React no suelte el `<textarea>`, así que **abrir el editor y
   cerrarlo sin tocar nada** proponía escribir `\"\"` en las columnas que estaban
   en nulo. Un `error_c` vacío y un `error_c` nulo no son lo mismo para nadie que
   lea la tabla después —«no tiene explicación» contra «tiene una explicación en
   blanco»— y ese ruido se acumula ítem por ítem. En blanco es nulo, siempre."
  [k v]
  (cond
    (= k :difficulty) (->numero-o-nil v)
    (contains? #{:module_id :misconception_a_id :misconception_b_id
                 :misconception_c_id :misconception_d_id} k)
    (->uuid-o-nil v)

    (nil? v) nil
    (string? v) (when-not (str/blank? v) v)
    :else v))

(defn campos-editados
  "Solo los campos que **de verdad** cambiaron, ya coercionados, listos para un
   patch parcial.

   Devolver el borrador entero sería reescribir la fila con lo que el formulario
   cree saber, y este formulario conoce once columnas de las veinte que tiene el
   ítem. Mandando la diferencia, guardar una explicación no puede descatalogar un
   distractor ni borrar un módulo por omisión — el mismo riesgo que
   `crud/question-payload` documenta para los `misconception_*_id`.

   `{}` (nada que guardar) es una respuesta legítima, no un error: es lo que
   pasa cuando el autor abre el editor, mira y cierra."
  ([original borrador] (campos-editados original borrador campos-en-vivo))
  ([original borrador claves]
   (reduce (fn [acc k]
             (if-not (contains? borrador k)
               acc
               (let [nuevo (coercionar-campo k (get borrador k))
                     viejo (coercionar-campo k (get original k))]
                 (if (= nuevo viejo)
                   acc
                   (assoc acc k nuevo)))))
           {}
           claves)))

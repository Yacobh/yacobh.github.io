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

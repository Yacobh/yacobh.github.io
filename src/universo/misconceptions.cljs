(ns universo.misconceptions
  "Funciones puras del catálogo de ideas erróneas (tabla `misconceptions`, 027).

   ── Qué es y qué no es ──────────────────────────────────────────────────────
   `questions.error_a..d` hace dos trabajos a la vez: la **identidad** del error
   («invierte el divisor al dividir fracciones»), que es reusable entre ítems, y
   la **explicación** para ese ítem, que menciona sus números concretos. Al estar
   fusionados en un `text`, la misconception no tiene identificador: dos ítems que
   evalúan el mismo error son dos cadenas sin relación. No se puede contar
   «¿cuántos estudiantes cometen el error X?», ni enlazarle un recurso, ni
   comparar entre diagnósticos.

   El catálogo le da identidad. **El texto de `error_*` se conserva**: el
   distractor apunta a una misconception (identidad) Y mantiene su explicación
   (contexto). Las dos cosas.

   ── La regla que define si esto está saliendo bien ──────────────────────────
   La escribió la propia migración `027` y vale repetirla, porque es la única
   defensa contra que el catálogo se vuelva inútil:

   > El catálogo debe crecer **mucho más lento** que el banco. Con 387 ítems y
   > ~300 misconceptions no se modeló nada; con ~40 hay taxonomía. Corolario: una
   > misconception que aparece en un solo ítem es sospechosa.

   Por eso `health` no es un adorno del panel: es el instrumento que avisa cuando
   se está construyendo una lista de strings con otra forma en vez de una
   taxonomía."
  (:require [clojure.string :as str]))

;; -----------------------------------------------------------------------------
;; Slug
;; -----------------------------------------------------------------------------

;; Espejo **exacto** del check de la migración `027`:
;;   slug ~ '^[a-z0-9]+([-/][a-z0-9]+)*$'
;; Si cambia uno, cambia el otro en el mismo commit — misma disciplina que
;; `universo.topics/normalize` con `029` y que `slots.logic` con su trigger.
(def slug-pattern #"^[a-z0-9]+([-/][a-z0-9]+)*$")

(defn slug-valid?
  "¿Este slug pasa el check de la base?

   Validarlo en el cliente no es seguridad —la base es la que manda— sino
   cortesía: sin esto, el único aviso de que el slug está mal es un error de
   Postgres al guardar, después de haber escrito el nombre y la descripción."
  [slug]
  (boolean (and (string? slug) (re-matches slug-pattern slug))))

(def ^:private accents
  {"á" "a" "é" "e" "í" "i" "ó" "o" "ú" "u" "ü" "u" "ñ" "n"
   "à" "a" "è" "e" "ì" "i" "ò" "o" "ù" "u" "â" "a" "ê" "e" "î" "i" "ô" "o" "û" "u"})

(defn suggest-slug
  "Slug propuesto a partir del nombre en prosa.

   Es la diferencia entre escribir dos campos y escribir uno: el autor tipea
   «Invierte el divisor al dividir fracciones» y obtiene
   `invierte-el-divisor-al-dividir-fracciones`, que puede recortar a mano.

   Deliberadamente **no** intenta ser inteligente (no quita artículos ni acorta):
   una sugerencia predecible se corrige de un vistazo; una sugerencia astuta hay
   que revisarla siempre. Devuelve nil si no queda nada utilizable, porque un
   slug vacío no pasa el check."
  [nombre]
  (when (string? nombre)
    (let [s (-> (str/lower-case (str/trim nombre))
                (as-> x (reduce-kv str/replace x accents))
                ;; Todo lo que no sea letra, dígito o barra pasa a ser separador.
                ;; La barra se conserva porque el check la admite y es útil para
                ;; namespaciar: `fracciones/invierte-divisor`.
                (str/replace #"[^a-z0-9/]+" "-")
                ;; Colapsa separadores repetidos y los quita de los bordes.
                (str/replace #"[-/]{2,}" "-")
                (str/replace #"^[-/]+" "")
                (str/replace #"[-/]+$" ""))]
      (when (seq s) s))))

;; -----------------------------------------------------------------------------
;; Consulta y orden
;; -----------------------------------------------------------------------------

(defn matches?
  "¿Esta misconception coincide con la búsqueda? Slug, nombre y descripción."
  [query m]
  (let [q (str/lower-case (str/trim (str query)))]
    (or (str/blank? q)
        (boolean (some #(str/includes? (str/lower-case (str %)) q)
                       [(:slug m) (:name m) (:description m)])))))

(defn usage-index
  "{misconception-id → cuántos distractores la referencian}, a partir de las
   preguntas del banco.

   Es el dato que convierte el catálogo en algo auditable: sin él no hay forma de
   saber si una idea errónea se está usando o si quedó huérfana al reorganizar."
  [questions]
  (reduce (fn [acc q]
            (reduce (fn [a k]
                      (if-let [id (get q k)]
                        (update a id (fnil inc 0))
                        a))
                    acc
                    [:misconception_a_id :misconception_b_id
                     :misconception_c_id :misconception_d_id]))
          {}
          (or questions [])))

(defn with-usage
  "Añade `:usage` a cada misconception y ordena por uso descendente.

   Las de uso 0 quedan al final y no ocultas: una misconception que no usa nadie
   es exactamente la que hay que revisar o borrar."
  [misconceptions usage]
  (->> (or misconceptions [])
       (mapv (fn [m] (assoc m :usage (get usage (:id m) 0))))
       (sort-by (juxt (comp - :usage) :slug))
       vec))

;; -----------------------------------------------------------------------------
;; Salud del catálogo — la heurística de 027, hecha función
;; -----------------------------------------------------------------------------

;; Cuántos ítems por misconception se consideran señal de que se está modelando
;; y no listando. Sale de la propia migración `027`: «con 387 ítems y ~300
;; misconceptions no se modeló nada; con ~40 hay taxonomía» — o sea del orden de
;; 10 ítems por idea errónea. Se declara con nombre para que recalibrarlo sea
;; cambiar un número y no editar lógica, y **está sin validar con datos**: es un
;; criterio editorial, no una medición (mismo estatus que los cortes de fluidez).
(def items-por-misconception-saludable 5)

(defn health
  "Diagnóstico del catálogo para un banco dado.

   - `:total` cuántas ideas erróneas hay
   - `:huerfanas` cuántas no las usa ningún distractor
   - `:singleton` cuántas aparecen en **un solo** ítem (sospechosas, dice 027)
   - `:cobertura` fracción de distractores catalogados, en [0,1]
   - `:ratio` ítems por misconception
   - `:veredicto` :vacio | :disperso | :sano

   `:disperso` es la señal que importa: significa que el catálogo está creciendo
   casi tan rápido como el banco, que es la forma de fracasar que 027 anticipó."
  [misconceptions questions]
  (let [uso (usage-index questions)
        total (count (or misconceptions []))
        n-items (count (or questions []))
        distractores (* 4 n-items)
        catalogados (reduce + 0 (vals uso))
        conteos (map #(get uso (:id %) 0) misconceptions)
        huerfanas (count (filter zero? conteos))
        singleton (count (filter #(= 1 %) conteos))
        ratio (when (pos? total) (/ (double n-items) total))]
    {:total total
     :huerfanas huerfanas
     :singleton singleton
     :cobertura (if (pos? distractores)
                  (/ (double catalogados) distractores)
                  0.0)
     :ratio ratio
     :veredicto (cond
                  (zero? total) :vacio
                  (and ratio (< ratio items-por-misconception-saludable)) :disperso
                  :else :sano)}))

(ns universo.topics
  "Higiene de `questions.topic` — T-51.

   `topic` es texto libre sin tabla propia y sin restricción, y eso ya produjo
   el fallo que motiva este namespace: 26 topics distintos donde varios son el
   mismo banco escrito de dos formas (`factorización`/`factorizacion`,
   `Polinomios`/`polinomios`). El sistema los trataba como bancos separados
   **sin avisar** — cada uno con su propia `test_configs`, su propio historial
   en `tests` y su propio conjunto de ítems.

   Este namespace define la forma canónica de un topic y cómo se traduce a un
   módulo. **La fuente de verdad de los datos es la migración 029**, que
   normaliza las tres tablas; `normalize` acá es su espejo, igual que
   `slots.logic` espeja el trigger de confirmación de cupos. Si una cambia, la
   otra tiene que cambiar en el mismo commit."
  (:require [clojure.string :as str]))

;; -----------------------------------------------------------------------------
;; Forma canónica
;; -----------------------------------------------------------------------------

;; Deliberadamente mínimo: minúsculas, sin acentos, sin espacios al borde. NO
;; unifica `_` con `-` ni con espacios, porque eso podría fusionar dos bancos
;; genuinamente distintos, y el fallo medido en T-51 fue solo de acento y
;; mayúscula. Ampliar esta regla exige volver a medir antes, no suponer.
(def ^:private accent-replacements
  {"á" "a" "é" "e" "í" "i" "ó" "o" "ú" "u" "ü" "u" "ñ" "n"})

(defn normalize
  "Forma canónica de un topic: minúsculas, sin acentos, sin bordes en blanco.
   Devuelve nil para nil o cadena vacía — un topic en blanco no es un banco."
  [topic]
  (when (string? topic)
    (let [base (str/lower-case (str/trim topic))
          sin-acentos (reduce-kv str/replace base accent-replacements)]
      (when (seq sin-acentos) sin-acentos))))

(defn same-topic?
  "true si dos topics son el mismo banco escrito distinto."
  [a b]
  (let [na (normalize a)]
    (and (some? na) (= na (normalize b)))))

(defn duplicate-groups
  "Agrupa una lista de topics por su forma canónica y devuelve solo los grupos
   con más de una escritura. Es la consulta de T-51 hecha función: sirve para
   detectar el problema de nuevo sin ir a la base."
  [topics]
  (->> (or topics [])
       (keep (fn [t] (when-let [n (normalize t)] [n t])))
       (reduce (fn [acc [n t]] (update acc n (fnil conj #{}) t)) {})
       (filter (fn [[_ variantes]] (> (count variantes) 1)))
       (into {})))

;; -----------------------------------------------------------------------------
;; Topic → módulo
;; -----------------------------------------------------------------------------

;; Los 18 módulos sembrados por 002_seed_modules.sql. Se listan acá para poder
;; verificar en un test que ningún mapeo apunte a un módulo inexistente: un
;; slug mal escrito no falla en ninguna parte, simplemente deja al estudiante
;; sin recursos y sin que nadie se entere.
(def module-slugs
  #{"aritmetica/numeros" "aritmetica/enteros" "aritmetica/fracciones"
    "aritmetica/potencias" "aritmetica/proporciones" "aritmetica/porcentajes"
    "algebra/expresiones" "algebra/ecuaciones" "algebra/sistemas"
    "algebra/polinomios" "algebra/funciones"
    "geometria/basica" "geometria/angulos" "geometria/triangulos"
    "geometria/circulo" "geometria/areas" "geometria/volumenes"
    "geometria/pitagoras"})

;; Solo los topics cuyo nombre NO coincide con el sufijo de su módulo. El resto
;; los resuelve `suffix-match` sin necesidad de listarlos, que es lo que evita
;; que esta tabla envejezca cada vez que aparece un topic nuevo.
;;
;; Una entrada para un topic que no existe en el banco es inofensiva (nunca
;; coincide); una entrada equivocada, en cambio, escribe un `module_id` falso.
;; Por eso acá solo van equivalencias que son ciertas por definición.
(def explicit-topic->module-slug
  {"numbers_v1" "aritmetica/numeros"
   "numbers" "aritmetica/numeros"
   "algebra" "algebra/ecuaciones"
   "ecuaciones" "algebra/ecuaciones"
   "ecuaciones_lineales" "algebra/ecuaciones"
   "geometria" "geometria/basica"
   "factorizacion" "algebra/polinomios"
   "productos_notables" "algebra/expresiones"
   "terminos_semejantes" "algebra/expresiones"
   "division_algebraica" "algebra/expresiones"
   "raices" "aritmetica/potencias"
   "pitagoras" "geometria/pitagoras"})

;; Bancos mezclados: agrupan ítems de varios módulos, así que asignarles un
;; módulo sería inventar el dato. `nil` es la respuesta honesta y deja el
;; hueco visible en vez de taparlo con una asignación plausible pero falsa.
(def catch-all-topics
  #{"diagnostico" "paes_m1"})

(defn- suffix-match
  "Módulo cuyo sufijo (lo que va después de `/`) es exactamente el topic:
   `triangulos` → `geometria/triangulos`. Solo resuelve si la coincidencia es
   única; con dos módulos candidatos devuelve nil en vez de elegir uno."
  [normalized]
  (let [matches (filter #(= normalized (second (str/split % #"/"))) module-slugs)]
    (when (= 1 (count matches))
      (first matches))))

(defn module-slug-for
  "Módulo al que pertenece un topic, o nil si no se puede saber sin inventar."
  [topic]
  (when-let [n (normalize topic)]
    (when-not (contains? catch-all-topics n)
      (or (get explicit-topic->module-slug n)
          (suffix-match n)))))

(defn track-for
  "Track (`aritmetica`/`algebra`/`geometria`) de un topic, vía su módulo."
  [topic]
  (when-let [slug (module-slug-for topic)]
    (first (str/split slug #"/"))))

(defn unmapped
  "Topics de la lista que no se pueden traducir a un módulo. La respuesta a
   '¿qué me falta para cerrar T-51?' sin consultar la base."
  [topics]
  (->> (or topics [])
       (keep normalize)
       distinct
       (remove module-slug-for)
       vec))

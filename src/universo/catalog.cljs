(ns universo.catalog
  "Funciones puras del catálogo de evaluaciones: cómo se llama un test de cara
   al estudiante y cuántas preguntas tiene su banco.

   El catálogo vive en `test_configs` (ver supabase/migrations/020 y 022) y el
   banco es `questions.topic` — no hay tabla de bancos, el `topic` es el único
   identificador real (misma razón que documenta la cabecera de 020)."
  (:require [clojure.string :as str]))

(def topic-labels
  "Nombres por defecto de los topics históricos, anteriores a que existiera
   `test_configs.display_name` (022). Solo actúan como respaldo: lo que el
   admin escribe en el panel manda por sobre este diccionario."
  {"numbers_V1" "Números"
   "enteros"    "Enteros"
   "algebra"    "Álgebra"
   "geometria"  "Geometría"
   "fracciones" "Fracciones"
   "potencias"  "Potencias"})

(defn topic-label
  "Nombre visible de un topic, en orden de precedencia:
   `display_name` del admin → diccionario estático → el propio topic con los
   guiones bajos convertidos en espacios (para que un topic nuevo sin nombre
   configurado nunca se muestre como identificador crudo)."
  ([topic] (topic-label topic nil))
  ([topic display-name]
   (or (when (string? display-name)
         (let [trimmed (str/trim display-name)]
           (when (seq trimmed) trimmed)))
       (get topic-labels topic)
       (str/replace (str topic) #"_" " "))))

(defn count-by-topic
  "rows: filas de `questions` con al menos `:topic` → {topic → cantidad}.
   Descarta topics nulos o vacíos con el mismo criterio que
   `crud/get-distinct-topics`, para no inventar un banco que no existe."
  [rows]
  (->> rows
       (map :topic)
       (remove #(or (nil? %) (= % "")))
       frequencies))

(defn counts-truncated?
  "¿El conteo se armó con menos filas de las que la tabla dice tener?
   PostgREST puede recortar la respuesta (`db-max-rows`), y un conteo recortado
   se vería como un banco más chico de lo real — justo el dato que el admin usa
   para fijar min/max ítems. Si esto es true, el número es un piso, no un total."
  [fetched total]
  (and (number? fetched) (number? total) (< fetched total)))

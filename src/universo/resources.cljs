(ns universo.resources
  "Funciones puras de la lista de recursos del panel de administración.

   ── Por qué existe este namespace ──────────────────────────────────────────
   Hasta ahora, guardar un recurso disparaba `:admin/load-resources`, que vuelve
   a pedir **los módulos y todos los recursos** —y encima en serie, uno esperando
   al otro— para reflejar el cambio de una fila. Editar recursos es uno de los dos
   flujos centrales del producto y ese ciclo lo vuelve lento sin necesidad:
   `crud/upsert-resource!` ya hace `.select(\"*\").single()`, o sea que **la fila
   guardada vuelve en la misma llamada**. Lo único que falta es saber ponerla en
   su lugar en la lista, y eso es una función pura.

   La regla de este repositorio es que la lógica va a un namespace testeable y no
   dentro de un `reg-event-fx` (ADR-009), así que acá viven las tres operaciones
   de lista y el handler queda siendo solo el pegamento."
  (:require [clojure.string :as str]))

;; -----------------------------------------------------------------------------
;; El join que el upsert no trae
;; -----------------------------------------------------------------------------

(defn attach-module
  "Re-adjunta `:modules {:slug :title :track}` a una fila de recurso.

   `fetch-admin-resources` pide `\"*, modules(slug, title, track)\"` y la lista lo
   usa para mostrar el slug; `upsert-resource!` pide solo `\"*\"`, así que la fila
   que devuelve **no trae el join**. Sin esto, guardar un recurso lo dejaría en la
   lista sin su módulo hasta el próximo refresco — un cambio invisible pero que se
   ve como un dato que se perdió.

   Los módulos ya están en `app-db`: no hace falta ir a la base a buscarlos."
  [row modules]
  (if-let [m (some (fn [m] (when (= (str (:id m)) (str (:module_id row))) m))
                   (or modules []))]
    (assoc row :modules (select-keys m [:slug :title :track]))
    ;; Sin módulo que adjuntar se deja la fila como vino en vez de poner un
    ;; `:modules nil`, que la UI leería igual pero borraría un join que quizá ya
    ;; estaba puesto por una carga anterior.
    row))

;; -----------------------------------------------------------------------------
;; Insertar o reemplazar en la lista
;; -----------------------------------------------------------------------------

(defn upsert-row
  "Devuelve `rows` con `row` puesta en su lugar.

   - Si el id ya está: **reemplaza en su posición**, para que la fila no salte de
     lugar mientras se la está editando.
   - Si no está: **al principio**, porque `fetch-admin-resources` ordena por
     `created_at` descendente y ahí es donde va a aparecer en el próximo refresco.
     La lista optimista y la lista real coinciden.

   `row` nil deja la lista intacta: un guardado que no devolvió fila no debe
   vaciar nada."
  [rows row]
  (let [rows (vec (or rows []))]
    (if (nil? row)
      rows
      (let [id (str (:id row))
            idx (first (keep-indexed (fn [i r] (when (= (str (:id r)) id) i)) rows))]
        (if idx
          (assoc rows idx row)
          (into [row] rows))))))

(defn remove-row
  "Devuelve `rows` sin la fila de ese id."
  [rows id]
  (let [target (str id)]
    (vec (remove #(= (str (:id %)) target) (or rows [])))))

(defn set-published
  "Cambia `:published` de una fila por id, sin tocar el resto de la lista.

   Se usa para el cambio optimista del botón Publicar/Despublicar **y** para
   revertirlo si el servidor lo rechaza, así que es su propia inversa."
  [rows id published?]
  (let [target (str id)]
    (mapv (fn [r]
            (if (= (str (:id r)) target)
              (assoc r :published (boolean published?))
              r))
          (or rows []))))

;; -----------------------------------------------------------------------------
;; Duplicar
;; -----------------------------------------------------------------------------

(def ^:private copy-suffix " (copia)")

(defn duplicate-draft
  "Borrador nuevo a partir de un recurso existente.

   La mayoría de los recursos de un módulo son variaciones del anterior, así que
   duplicar es el atajo que más rinde al escribir contenido. Tres decisiones:

   - **sin `:id`** — es un recurso nuevo, no una edición del original;
   - **`published false`** — una copia recién hecha no se publica sola. Publicar
     por accidente algo a medio escribir es el único error de este editor que ve
     un estudiante;
   - **título marcado** — para que las dos filas no sean indistinguibles en la
     lista. Si ya termina en el sufijo no se apila otro."
  [row]
  (let [titulo (str/trim (str (:title row)))]
    (-> (select-keys row [:title :type :module_id :body :media_url
                          :historical_context :order_index])
        (assoc :title (if (str/ends-with? titulo copy-suffix)
                        titulo
                        (str titulo copy-suffix))
               :published false
               :order_index (str (or (:order_index row) 1))))))

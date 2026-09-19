(ns universo.plan
  "Funciones puras del plan de estudio: qué recursos (capa 1) le corresponden al
   estudiante según los déficits que dejó su diagnóstico.

   Los `resources` cuelgan de un módulo (`resources.module_id` → `modules.slug`,
   ver 001_mvp_schema.sql) y los déficits vienen agrupados por `:module-slug`
   desde `universo.profile/deficits-from-responses`. El cruce entre ambos es lo
   único que convierte una biblioteca en un plan, y por eso vive acá y no dentro
   de un handler (ADR-009).

   **Invariante que este namespace existe para proteger:** nunca presentar la
   biblioteca completa como si fuera una recomendación personalizada. Cuando no
   se puede personalizar, se dice — ver `resources-for-deficits`.")

(defn resource-module-slug
  "El slug del módulo de un recurso puede venir aplanado (`:module_slug`, que
   `crud/fetch-published-resources` agrega) o dentro del join de PostgREST
   (`:modules {:slug ...}`). Se aceptan ambos para no depender de qué consulta
   trajo la fila."
  [resource]
  (or (:module_slug resource)
      (get-in resource [:modules :slug])))

(defn resources-for-deficits
  "Selecciona los recursos que corresponden a los déficits del estudiante.

   Devuelve `{:kind :personalized|:general :resources [...]}`:

   - `:personalized` — hay recursos publicados para los módulos donde el
     estudiante efectivamente falló. Salen **en orden de severidad del déficit**,
     porque `deficits-from-responses` ya los entrega de más a menos errores: el
     material del módulo peor evaluado queda primero.

   - `:general` — ningún recurso corresponde a sus déficits. El caso típico hoy
     no es falta de material sino falta de mapeo: si el ítem no tenía
     `module_id`, el déficit queda como `unknown/<topic>` y no cruza con ningún
     recurso (ver BACKLOG T-51). Se devuelve el material disponible, pero
     **marcado como general**: la UI debe rotularlo distinto y no llamarlo
     recomendación.

   El `:kind` es la razón de ser de esta función. Devolver solo la lista dejaría
   a la UI sin forma de distinguir «esto es tuyo» de «esto es todo lo que hay»,
   que es exactamente el defecto que se corrigió acá."
  [resources deficits]
  (let [resources (vec (or resources []))
        ;; Orden y unicidad de los slugs = orden de severidad de los déficits.
        slugs (->> deficits
                   (keep :module-slug)
                   distinct
                   vec)
        by-slug (group-by resource-module-slug resources)
        matched (into [] (mapcat #(get by-slug % []) slugs))]
    (if (seq matched)
      {:kind :personalized :resources matched}
      {:kind :general :resources resources})))

;; -----------------------------------------------------------------------------
;; Cómo se nombra un déficit delante del estudiante
;; -----------------------------------------------------------------------------
;;
;; Hasta acá «Dónde necesitas ayuda» imprimía `(:module-slug d)` crudo: el
;; estudiante leía `aritmetica/operaciones_fundamentales`. Es el identificador de
;; la base de datos, y es lo primero que ve después de rendir veinte minutos —el
;; momento en que el producto entrega lo que prometió.
;;
;; El título de verdad ya está en `app-db` y **no hace falta pedir nada nuevo**:
;; `crud/fetch-published-resources` selecciona `modules(slug, title, track)`, o
;; sea que cada fila de `[:plan :resources]` trae el título de su módulo. Lo
;; único que faltaba era usarlo.

(defn module-titles
  "Índice `slug -> title` armado con los recursos que ya están cargados.

   Solo conoce los módulos **que tienen al menos un recurso publicado**: el
   título viaja dentro del join del recurso. Un módulo sin material publicado no
   aparece acá, y para ése `deficit-label` cae al nombre derivado del slug. Es a
   propósito: es mejor una etiqueta legible imperfecta que una consulta más para
   una pantalla que ya carga tres."
  [resources]
  (reduce (fn [acc r]
            (let [slug (resource-module-slug r)
                  title (or (get-in r [:modules :title]) (:module_title r))]
              (if (and slug title (not (contains? acc slug)))
                (assoc acc slug title)
                acc)))
          {}
          (or resources [])))

(defn- humanizar
  "`aritmetica/operaciones_fundamentales` -> `Operaciones fundamentales`.

   Respaldo cuando no hay título real. No inventa acentos: los slugs no los
   tienen, así que `numeros` sale «Numeros». Es feo y es honesto — el arreglo de
   verdad es que el módulo tenga un recurso publicado, no adivinar ortografía."
  [slug]
  (let [i (.indexOf slug "/")
        nombre (if (neg? i) slug (subs slug (inc i)))
        palabras (-> nombre
                     (.replace (js/RegExp. "[-_]" "g") " ")
                     .trim)]
    (if (empty? palabras)
      slug
      (str (.toUpperCase (subs palabras 0 1)) (subs palabras 1)))))

(defn deficit-label
  "Cómo se nombra este déficit en «Mi plan».

   Devuelve `{:texto ... :mapeado? bool}` y no solo el texto, por la misma razón
   que `resources-for-deficits` devuelve `:kind`: la UI necesita poder
   distinguir **«fallaste en este módulo»** de **«fallaste en ítems que no
   pudimos ubicar en ningún módulo»**, y sin el dato no puede.

   El déficit `unknown/<topic>` es el segundo caso — lo produce
   `profile/module-slug-for` cuando el ítem no trae `module_id` o el slug no
   está en `topics/module-slugs` (T-51, T-60, y el defecto que le costó al eje
   de probabilidad sus 102 ítems). Se muestra por su tema, que es cierto, y
   **marcado**: decir «Probabilidad» a secas sería presentar como módulo
   diagnosticado algo que no se pudo ubicar."
  [slug titulos]
  (let [slug (str slug)]
    (if (.startsWith slug "unknown/")
      {:texto (humanizar slug) :mapeado? false}
      {:texto (or (get titulos slug) (humanizar slug)) :mapeado? true})))

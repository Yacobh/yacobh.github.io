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

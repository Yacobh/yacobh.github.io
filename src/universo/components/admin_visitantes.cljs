(ns universo.components.admin-visitantes
  "Panel admin: quién llegó al sitio, cuándo y desde dónde (tabla `visitor`).

   ── Esto no es una pestaña más ─────────────────────────────────────────────
   Es el primer trozo de **T-22** (panel interno de métricas), que es **F10**, que
   es **G-5**. [[../../project-memory/TESIS_DE_CRECIMIENTO]] llama a ese vector
   *«la condición de existencia del negocio»* y lo tiene en **0 %**; los tres
   intentos históricos de llevar esta idea a escala murieron ahí, no en producto.

   ── La honestidad del panel es parte del panel ─────────────────────────────
   Dos límites se dicen **en pantalla**, no en un comentario que nadie lee:

   1. Cada fila es **un navegador nuevo**, no una visita: el tracker inserta solo
      la primera vez (guarda de `localStorage`). Quien vuelve no suma.
   2. **De dónde vino cada quien no se sabe todavía.** Esa es la columna `fuente`
      de la migración `061` (**T-135**), escrita y sin aplicar. Mientras no esté,
      el panel lo declara en vez de dejar creer que el dato falta por casualidad.

   Un panel de métricas que no dice qué no puede medir es peor que no tenerlo:
   invita a concluir de más."
  (:require
   [re-frame.core :as re-frame]
   [universo.visitantes :as vis]))

(defn- cifra
  [etiqueta valor & [nota]]
  [:div {:class "placa rounded-xl bg-panel-100 p-4"}
   [:div {:class "grabado mb-1"} etiqueta]
   [:div {:class "font-mono text-2xl text-gray-900"} valor]
   (when nota [:div {:class "mt-1 text-xs text-gray-600"} nota])])

(defn- barra
  "Una fila de ranking: etiqueta, barra proporcional y conteo.

   La barra se escala contra **el máximo de la lista** y no contra el total: con
   un país al 95 % todas las demás serían invisibles, y lo que se quiere leer acá
   es el orden y la distancia relativa."
  [{:keys [valor n pct]} maximo]
  [:div {:class "flex items-center gap-3 py-1"}
   [:div {:class "w-32 shrink-0 truncate text-sm text-gray-700" :title valor} valor]
   [:div {:class "h-2 flex-1 overflow-hidden rounded-full bg-panel-200"}
    [:div {:class "h-full rounded-full bg-panel-600"
           :style {:width (str (max 2 (js/Math.round (* 100.0 (/ n (max maximo 1))))) "%")}}]]
   [:div {:class "w-20 shrink-0 text-right font-mono text-xs text-gray-600"}
    (str n (when pct (str " · " pct " %")))]])

(defn- lista
  [titulo filas k]
  (let [r (vis/ranking filas k)
        maximo (:n (first r))]
    [:div {:class "placa rounded-xl bg-panel-100 p-4"}
     [:div {:class "grabado mb-3"} titulo]
     (if (seq r)
       (into [:div] (for [f (take 8 r)]
                      ^{:key (:valor f)} [barra f maximo]))
       [:p {:class "text-sm text-gray-600"} "Sin datos."])]))

(defn- serie
  "Visitas por día como barras verticales. Catorce días es lo que cabe sin que
   las etiquetas se pisen y es el horizonte útil para una campaña."
  [filas]
  (let [dias (vis/por-dia filas 14)
        maximo (apply max 1 (map :n dias))]
    [:div {:class "placa rounded-xl bg-panel-100 p-4"}
     [:div {:class "grabado mb-3"} "Últimos 14 días"]
     (if (seq dias)
       [:div {:class "flex items-end gap-1" :style {:height "6rem"}}
        (for [{:keys [dia n]} dias]
          ^{:key dia}
          [:div {:class "flex flex-1 flex-col items-center justify-end gap-1"
                 :title (str dia ": " n)}
           [:div {:class "w-full rounded-t bg-panel-600"
                  :style {:height (str (js/Math.round (* 100.0 (/ n maximo))) "%")
                          ;; Un día en cero tiene que verse como cero y a la vez
                          ;; existir: sin altura mínima el eje parece cortado.
                          :min-height (if (pos? n) "3px" "1px")}}]
           [:div {:class "font-mono text-[10px] text-gray-500"}
            (subs dia 8)]])]
       [:p {:class "text-sm text-gray-600"} "Sin visitas registradas."])]))

(defn- tabla
  [filas con-fuente?]
  [:div {:class "overflow-x-auto rounded-xl border border-panel-500"}
   [:table {:class "w-full text-left text-sm"}
    [:thead {:class "bg-panel-200"}
     [:tr
      (for [h (cond-> ["Fecha" "País" "Ciudad" "Idioma" "Zona horaria" "Correo"]
                con-fuente? (conj "Canal"))]
        ^{:key h} [:th {:scope "col" :class "grabado px-3 py-2"} h])]]
    [:tbody {:class "divide-y divide-panel-400 bg-panel-50"}
     (for [v (take 100 filas)]
       ^{:key (:id v)}
       [:tr
        [:td {:class "whitespace-nowrap px-3 py-2 font-mono text-xs text-gray-600"}
         (or (vis/dia-local (:created_at v)) "—")]
        [:td {:class "px-3 py-2 text-gray-900"} (or (:pais v) "—")]
        [:td {:class "px-3 py-2 text-gray-700"} (or (:ciudad v) "—")]
        [:td {:class "px-3 py-2 text-gray-600"} (or (:idioma v) "—")]
        [:td {:class "px-3 py-2 text-xs text-gray-600"} (or (:timezone v) "—")]
        [:td {:class "px-3 py-2 text-xs text-gray-600"} (or (not-empty (str (:email v))) "—")]
        (when con-fuente?
          [:td {:class "px-3 py-2 text-xs text-gray-700"}
           (or (not-empty (str (:fuente v))) "—")])])]]])

(defn visitantes-panel []
  (let [filas @(re-frame/subscribe [:admin/visitantes])
        loading? @(re-frame/subscribe [:admin/section-loading? :visitantes])
        error @(re-frame/subscribe [:admin/section-error :visitantes])
        con-fuente? (vis/hay-fuente? filas)
        r (vis/resumen filas (.getTime (js/Date.)))]
    [:div {:class "space-y-4"}
     [:div {:class "mb-2"}
      [:h2 {:class "text-lg font-semibold text-gray-900"} "Visitantes"]
      [:p {:class "mt-0.5 text-sm text-gray-500"}
       "Quién llegó al sitio, cuándo y desde dónde. Cada fila es un "
       [:strong "navegador nuevo"]
       ", no una visita: el registro se hace solo la primera vez que alguien entra."]]

     (cond
       loading? [:p {:class "text-sm text-gray-500"} "Cargando…"]
       error [:p {:class "text-sm text-alarma-700"} error]

       (empty? filas)
       [:div {:class "placa rounded-xl bg-panel-100 p-6 text-center text-sm text-gray-600"}
        "Todavía no hay visitantes registrados."]

       :else
       [:div {:class "space-y-4"}
        [:div {:class "grid grid-cols-2 gap-3 sm:grid-cols-4"}
         [cifra "Total" (:total r) "navegadores distintos"]
         [cifra "Últimos 7 días" (:ultimos-7 r)]
         [cifra "Últimos 30 días" (:ultimos-30 r)]
         [cifra "Dejaron correo" (:con-email r)
          (when (:pct-con-email r) (str (:pct-con-email r) " % del total"))]]

        [serie filas]

        ;; El aviso va **arriba de los rankings** a propósito: es justo donde uno
        ;; empieza a sacar conclusiones de canal mirando países.
        (when-not con-fuente?
          [:div {:class "placa rounded-xl border-l-2 border-l-senal-700 bg-panel-100 p-4"}
           [:p {:class "text-sm text-gray-800"}
            [:strong "De dónde vino esta gente todavía no se puede responder."]
            " La columna que lo diría —la etiqueta de campaña de "
            [:code {:class "font-mono text-xs"} "?de=tarjeta"]
            "— llega con la migración "
            [:code {:class "font-mono text-xs"} "061"]
            ", que está escrita y sin aplicar (T-135). Hasta entonces, el país y la "
            "ciudad dicen dónde estaba alguien, no qué lo trajo."]])

        [:div {:class "grid gap-3 lg:grid-cols-2"}
         [lista "País" filas :pais]
         [lista "Ciudad" filas :ciudad]
         [lista "Idioma" filas :idioma]
         (if con-fuente?
           [lista "Canal" filas :fuente]
           [lista "Zona horaria" filas :timezone])]

        [:div
         [:div {:class "grabado mb-2"}
          (str "Últimos " (min 100 (count filas)) " de " (count filas))]
         [tabla filas con-fuente?]]])]))

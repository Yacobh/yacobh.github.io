(ns universo.components.admin-catalog
  "Banco de trabajo para catalogar distractores (T-57 paso 2).

   ── Por qué existe ─────────────────────────────────────────────────────────
   El editor de preguntas trabaja de a un ítem: para catalogar hay que abrirlo,
   desplegar «Explicaciones de error», elegir, guardar y volver. Son cuatro clics
   antes de leer nada, por ítem, y el banco del diagnóstico tiene 64. Con ese
   costo, catalogar no se hace — que es exactamente lo que pasó desde que `027`
   se aplicó el 2026-08-10.

   Acá la unidad es el **distractor**, no el ítem: se lee la alternativa y su
   explicación, se elige la idea errónea, y se sigue. El enunciado se muestra una
   vez arriba de sus tres distractores, porque es el contexto que hace falta para
   decidir y no hace falta repetirlo.

   ── Dos decisiones que se notan al usarlo ──────────────────────────────────
   1. **La alternativa correcta no aparece** (ver `editor/distractor-rows`).
   2. **Se escribe al instante**, sin borrador ni botón de guardar: cada cambio
      es una columna, y deshacer es volver a elegir. Un borrador pondría un paso
      entre leer y decidir, que es el paso que esta vista existe para quitar."
  (:require
   [clojure.string :as str]
   [re-frame.core :as re-frame]
   [reagent.core :as r]
   [universo.components.math-render :as math]
   [universo.editor :as editor]
   [universo.misconceptions :as mis]))

(def ^:private input-class
  (str "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 "
       "placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none "
       "focus:ring-1 focus:ring-indigo-500"))

(defn- progress-bar []
  (let [{:keys [total hechos faltan fraccion]} @(re-frame/subscribe [:admin/catalog-progress])]
    (when (pos? total)
      [:div {:class "mb-4"}
       [:div {:class "mb-1 flex flex-wrap items-baseline justify-between gap-2"}
        [:p {:class "text-sm font-medium text-gray-900"}
         (str hechos " de " total " distractores catalogados")]
        [:p {:class "text-xs text-gray-500"}
         (if (zero? faltan)
           "Módulo completo."
           (str "faltan " faltan))]]
       ;; La barra usa el alojamiento hundido del panel (ADR-023): sobre el gris
       ;; medio una barra plana no se lee, y acá el punto es ver el avance de un
       ;; vistazo mientras se barre el módulo.
       [:div {:class "alojamiento h-2 w-full overflow-hidden rounded"}
        [:div {:class "h-full rounded bg-senal-400 transition-all"
               :style {:width (str (js/Math.round (* 100 fraccion)) "%")}}]]])))

(defn- quick-create
  "Crear la idea errónea sin salir de la fila.

   Aparece cerrado: abierto siempre, compite con el selector y empuja a crear una
   idea nueva cuando probablemente ya existe una que sirve — que es justo el modo
   de fallo que `027` quiere evitar (un catálogo del tamaño del banco)."
  [_props]
  (let [abierto? (r/atom false)
        nombre (r/atom "")]
    (fn [{:keys [question-id campo module-id]}]
      (let [guardando? @(re-frame/subscribe [:admin/quick-mis-saving?])
            crear! (fn []
                     (when-not (str/blank? @nombre)
                       (re-frame/dispatch
                        [:admin/quick-misconception
                         {:nombre @nombre :question-id question-id
                          :campo campo :module-id module-id}])
                       (reset! nombre "")
                       (reset! abierto? false)))]
        (if-not @abierto?
          [:button {:type "button"
                    :class "shrink-0 text-xs text-gray-500 underline hover:text-gray-900"
                    :on-click #(reset! abierto? true)}
           "+ nueva"]
          [:div {:class "flex w-full flex-wrap items-center gap-1"}
           [:input {:class (str input-class " min-w-48 flex-1 py-1 text-xs")
                    :type "text"
                    :auto-focus true
                    :placeholder "Ej: Invierte el divisor al dividir"
                    :value @nombre
                    :disabled guardando?
                    :on-change #(reset! nombre (.. % -target -value))
                    :on-key-down (fn [e]
                                   (case (.-key e)
                                     "Enter" (do (.preventDefault e) (crear!))
                                     "Escape" (do (.preventDefault e)
                                                  (reset! abierto? false))
                                     nil))}]
           ;; El slug se muestra antes de crear: es lo único que después no se
           ;; puede cambiar sin romper referencias, y verlo evita el `mq/`-ismo
           ;; de descubrirlo cuando ya está guardado.
           (when-let [s (mis/suggest-slug @nombre)]
             [:code {:class "shrink-0 text-xs text-gray-400"} s])
           [:button {:type "button"
                     :class "shrink-0 rounded border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50"
                     :on-click crear!}
            "Crear"]])))))

(defn- misconception-select [{:keys [question-id campo valor]}]
  (let [rows @(re-frame/subscribe [:admin/misconceptions])
        {:keys [producto experimento]} (mis/split-experimento rows)]
    [:select {:class (str input-class " py-1 text-xs")
              :value (or valor "")
              :on-change #(re-frame/dispatch
                           [:admin/patch-question-field question-id campo
                            (let [v (.. % -target -value)]
                              (when (seq v) v))])}
     [:option {:value ""} "— sin catalogar —"]
     (when (seq producto)
       [:optgroup {:label "Catálogo"}
        (for [m (sort-by :slug producto)]
          ^{:key (:id m)} [:option {:value (:id m)} (:name m)])])
     (when (seq experimento)
       [:optgroup {:label "Experimento de cuántica"}
        (for [m (sort-by :slug experimento)]
          ^{:key (:id m)} [:option {:value (:id m)} (:name m)])])]))

(defn- error-input
  "Explicación del distractor, guardada al salir del campo.

   Se edita **acá y no solo en el editor completo** porque catalogar es el
   momento en que uno lee la explicación y ve que dice «Sumó mal»: obligar a
   abrir otra pantalla para arreglarla es garantizar que quede así."
  [_props]
  (let [local (r/atom nil)]
    (fn [{:keys [question-id campo valor]}]
      [:input {:class (str input-class " py-1 text-xs")
               :type "text"
               :placeholder "Por qué alguien elegiría esta alternativa…"
               :value (or @local valor "")
               :on-change #(reset! local (.. % -target -value))
               :on-blur (fn []
                          (when (and @local (not= @local valor))
                            (re-frame/dispatch
                             [:admin/patch-question-field question-id campo @local]))
                          (reset! local nil))}])))

(defn- item-card [[question-id filas]]
  (let [{:keys [question]} (first filas)]
    [:div {:class "rounded-xl border border-gray-200 bg-white p-4"}
     [:div {:class "mb-3 flex flex-wrap items-start justify-between gap-2"}
      [:div {:class "min-w-0"}
       [:p {:class "text-xs text-gray-400"} (str "#" question-id)]
       [:div {:class "text-sm text-gray-900"} [math/latex (str question)]]]
      [:button {:type "button"
                :class "shrink-0 text-xs text-gray-500 underline hover:text-gray-900"
                :on-click #(re-frame/dispatch
                            [:admin/edit-question-by-id question-id])}
       "Abrir el ítem"]]

     (when (:correcta-desconocida? (first filas))
       [:p {:class "mb-2 rounded border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-800"}
        "Este ítem no tiene marcada una alternativa correcta válida, así que se muestran las cuatro."])

     [:div {:class "space-y-2"}
      (for [{:keys [letra opcion error error-key mis-key mis-id module_id]} filas]
        ^{:key letra}
        [:div {:class "grid grid-cols-1 gap-2 border-t border-gray-100 pt-2 sm:grid-cols-4 sm:items-center"}
         [:div {:class "flex items-center gap-2"}
          [:span {:class (str "inline-flex h-6 w-6 items-center justify-center rounded "
                              "bg-gray-100 text-xs font-medium text-gray-700")}
           letra]
          (when (nil? mis-id)
            [:span {:class "h-1.5 w-1.5 rounded-full bg-senal-400 sm:hidden"}])]
         [:div {:class "text-sm text-gray-800"} [math/latex (str opcion)]]
         [error-input {:question-id question-id :campo error-key :valor error}]
         ;; En columna y no en fila: al abrir «+ nueva», el formulario necesita
         ;; ancho, y al lado del selector quedaba aplastado a nada — se vio al
         ;; usarlo. Debajo tiene toda la celda.
         [:div {:class "flex flex-col items-start gap-1"}
          [misconception-select {:question-id question-id :campo mis-key :valor mis-id}]
          [quick-create {:question-id question-id :campo mis-key :module-id module_id}]]])]]))

(defn catalog-panel []
  (r/with-let [_ (re-frame/dispatch [:admin/open-catalog])]
    (let [modules @(re-frame/subscribe [:admin/modules])
          module-id @(re-frame/subscribe [:admin/catalog-module])
          rows @(re-frame/subscribe [:admin/catalog-rows])
          por-item (group-by :id rows)]
      [:div {:class "space-y-4"}
       [:div {:class "mb-2"}
        [:h2 {:class "text-lg font-semibold text-gray-900"} "Catalogar distractores"]
        [:p {:class "mt-0.5 text-sm text-gray-500"}
         "Un módulo a la vez: se lee la alternativa y su explicación, y se le pone "
         "nombre al error que hay detrás. La respuesta correcta no aparece."]]

       [:div {:class "flex flex-wrap items-end gap-3"}
        [:label {:class "block"}
         [:span {:class "mb-1 block text-xs font-medium text-gray-600"} "Módulo"]
         [:select {:class (str input-class " min-w-72")
                   :value (or module-id "")
                   :on-change #(re-frame/dispatch
                                [:admin/set-catalog-module (.. % -target -value)])}
          [:option {:value ""} "Elige un módulo…"]
          (for [[track ms] (editor/modules-by-track modules)]
            ^{:key track}
            [:optgroup {:label track}
             (for [m ms]
               ^{:key (:id m)}
               [:option {:value (:id m)} (editor/module-label m)])])]]]

       (if (str/blank? (str module-id))
         [:div {:class "rounded-xl border border-dashed border-gray-300 px-4 py-10 text-center text-sm text-gray-500"}
          "Elige un módulo para empezar. "
          [:span {:class "block text-xs text-gray-400"}
           "Se cataloga de a un módulo: la migración 027 es explícita en que el catálogo "
           "tiene que crecer mucho más lento que el banco."]]

         [:<>
          [progress-bar]
          (if (empty? rows)
            [:div {:class "rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500"}
             "Ese módulo todavía no tiene ítems asignados."]
            [:div {:class "space-y-3"}
             (for [par (sort-by first por-item)]
               ^{:key (first par)} [item-card par])])])])))

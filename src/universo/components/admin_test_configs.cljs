(ns universo.components.admin-test-configs
  "Panel admin: configuración de parada IRT + cadena de prerequisitos por
   topic. No gestiona accesos por usuario — eso se deriva del historial real
   en `tests` (ver universo.access); aquí solo se edita el catálogo."
  (:require
   [clojure.string :as str]
   [re-frame.core :as re-frame]
   [universo.catalog :as catalog]))

(def ^:private input-class
  (str "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 "
       "placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none "
       "focus:ring-1 focus:ring-indigo-500"))

(defn- field [label hint body]
  [:label {:class "block"}
   [:span {:class "mb-1 block text-xs font-medium text-gray-600"} label]
   (when hint
     [:span {:class "mb-1 block text-xs text-gray-400"} hint])
   body])

;; El θ interno vive en la escala -3..3; el formulario lo muestra/edita en
;; 0-100 (misma convención que dashboard.cljs al mostrar "θ = X/100").
(defn- theta->display [theta]
  (when (and theta (not= theta ""))
    (js/Math.round (* (js/parseFloat theta) 100))))

(defn- display->theta [display]
  (when (and display (pos? (count (str display))))
    (/ (js/parseFloat display) 100.0)))

(defn- test-config-editor []
  (let [draft @(re-frame/subscribe [:admin/test-config-draft])
        saving? @(re-frame/subscribe [:admin/test-config-saving?])
        configs @(re-frame/subscribe [:admin/test-configs])
        other-topics (remove #(= % (:topic draft)) (map :topic configs))
        new? (str/blank? (:topic draft))]
    [:div {:class "mb-6 rounded-xl border border-indigo-100 bg-white p-5"}
     [:div {:class "mb-4 flex flex-wrap items-center justify-between gap-2"}
      [:h3 {:class "text-lg font-semibold text-gray-900"}
       (if new? "Nuevo topic" (str "Editar " (:topic draft)))]
      [:div {:class "flex flex-wrap gap-2"}
       [:button {:type "button"
                 :disabled saving?
                 :class (str "rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition "
                             "hover:bg-gray-200 disabled:opacity-50 focus:outline-none "
                             "focus-visible:ring-2 focus-visible:ring-gray-400")
                 :on-click #(re-frame/dispatch [:admin/cancel-test-config-edit])}
        "Cancelar"]
       [:button {:type "button"
                 :disabled saving?
                 :class (str "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition "
                             "hover:bg-indigo-700 disabled:opacity-50 focus:outline-none "
                             "focus-visible:ring-2 focus-visible:ring-indigo-400")
                 :on-click #(re-frame/dispatch [:admin/save-test-config])}
        (if saving? "Guardando…" "Guardar")]]]

     [:div {:class "mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2"}
      [field "Topic" "Identificador exacto en questions.topic"
       [:input {:class input-class
                :type "text"
                :disabled (not new?)
                :value (or (:topic draft) "")
                :on-change #(re-frame/dispatch
                             [:admin/update-test-config-draft :topic (.. % -target -value)])}]]

      [field "Nombre visible" "Lo que ve el estudiante. Vacío = nombre por defecto del topic"
       [:input {:class input-class
                :type "text"
                :placeholder (catalog/topic-label (:topic draft))
                :value (or (:display_name draft) "")
                :on-change #(re-frame/dispatch
                             [:admin/update-test-config-draft :display_name
                              (.. % -target -value)])}]]]

     [:div {:class "mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2"}
      [field "Activo" "Un topic inactivo no aparece para ningún estudiante (borrador)"
       [:label {:class "mt-2 flex items-center gap-2 text-sm text-gray-700"}
        [:input {:type "checkbox"
                 :checked (boolean (:active draft))
                 :on-change #(re-frame/dispatch
                              [:admin/update-test-config-draft :active (.. % -target -checked)])}]
        "Visible para estudiantes"]]]

     [:div {:class "mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3"}
      [field "Mín. ítems" "Piso antes de poder parar por precisión"
       [:input {:class input-class :type "number" :step "1"
                :value (or (:min_items draft) "")
                :on-change #(re-frame/dispatch
                             [:admin/update-test-config-draft :min_items (.. % -target -value)])}]]
      [field "Máx. ítems" "Techo duro, sin importar precisión"
       [:input {:class input-class :type "number" :step "1"
                :value (or (:max_items draft) "")
                :on-change #(re-frame/dispatch
                             [:admin/update-test-config-draft :max_items (.. % -target -value)])}]]
      [field "SE máximo" "Umbral de error estándar para parar por precisión"
       [:input {:class input-class :type "number" :step "0.01"
                :value (or (:se_threshold draft) "")
                :on-change #(re-frame/dispatch
                             [:admin/update-test-config-draft :se_threshold (.. % -target -value)])}]]]

     [:div {:class "mb-2 grid grid-cols-1 gap-4 sm:grid-cols-3"}
      [field "Tiempo máximo (min)" "Vacío = sin límite de tiempo"
       [:input {:class input-class :type "number" :step "1"
                :value (or (:max_minutes draft) "")
                :on-change #(re-frame/dispatch
                             [:admin/update-test-config-draft :max_minutes
                              (let [v (.. % -target -value)] (when (pos? (count v)) v))])}]]

      [field "Prerequisito" "Vacío = sin prerequisito (diagnóstico, siempre accesible)"
       [:select {:class input-class
                 :value (or (:prerequisite_topic draft) "")
                 :on-change #(re-frame/dispatch
                              [:admin/update-test-config-draft :prerequisite_topic
                               (let [v (.. % -target -value)] (when (pos? (count v)) v))])}
        [:option {:value ""} "— ninguno —"]
        (for [t other-topics]
          ^{:key t} [:option {:value t} t])]]

      [field "θ mínimo (0–100)" "Exige el prerequisito; vacío = sin umbral"
       [:input {:class input-class :type "number" :step "1" :min "0" :max "100"
                :disabled (str/blank? (:prerequisite_topic draft))
                :value (or (theta->display (:min_theta draft)) "")
                :on-change #(re-frame/dispatch
                             [:admin/update-test-config-draft :min_theta
                              (display->theta (.. % -target -value))])}]]]]))

(defn- question-count-cell
  "Preguntas del banco de un topic. Marca en ámbar cuando el banco no alcanza
   el máximo de ítems configurado: ese desajuste — pedir más ítems de los que
   existen — es justo el problema que motivó T-39, y aquí queda a la vista sin
   ir a contarlas a la pestaña Preguntas."
  [n max-items truncated?]
  (let [short? (and (number? n) (number? max-items) (< n max-items))]
    [:td {:class (str "px-3 py-2 tabular-nums "
                      (if short? "text-amber-700 font-medium" "text-gray-700"))
          :title (when short?
                   (str "El banco tiene " n " pregunta(s) y el máximo configurado es "
                        max-items ": el test va a terminar antes por falta de ítems."))}
     (cond
       (nil? n) "—"
       truncated? (str "≥ " n)
       :else (str n))
     (when short? [:span {:class "ml-1"} "⚠"])]))

(defn- test-configs-list []
  (let [rows @(re-frame/subscribe [:admin/test-configs])
        counts @(re-frame/subscribe [:admin/question-counts])
        truncated? @(re-frame/subscribe [:admin/question-counts-truncated?])]
    (if-not (seq rows)
      [:div {:class "rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center"}
       [:p {:class "text-sm text-gray-500"} "Sin configuración todavía."]]
      [:div {:class "overflow-x-auto rounded-xl border border-gray-200 bg-white"}
       [:table {:class "w-full text-left text-sm"}
        [:thead {:class "bg-gray-50 text-gray-600"}
         [:tr
          [:th {:class "px-3 py-2"} "Topic"]
          [:th {:class "px-3 py-2"} "Preguntas"]
          [:th {:class "px-3 py-2"} "Ítems"]
          [:th {:class "px-3 py-2"} "SE"]
          [:th {:class "px-3 py-2"} "Tiempo"]
          [:th {:class "px-3 py-2"} "Prerequisito"]
          [:th {:class "px-3 py-2"} "θ mín."]
          [:th {:class "px-3 py-2"} "Activo"]
          [:th {:class "px-3 py-2"} ""]]]
        [:tbody {:class "divide-y divide-gray-100"}
         (for [c rows]
           ^{:key (:topic c)}
           [:tr {:class "hover:bg-gray-50"}
            [:td {:class "px-3 py-2"}
             [:span {:class "font-medium text-gray-900"}
              (catalog/topic-label (:topic c) (:display_name c))]
             (when (:display_name c)
               [:span {:class "block text-xs text-gray-400"} (:topic c)])]
            [question-count-cell (get counts (:topic c)) (:max_items c) truncated?]
            [:td {:class "px-3 py-2 tabular-nums"} (str (:min_items c) "–" (:max_items c))]
            [:td {:class "px-3 py-2 tabular-nums"} (:se_threshold c)]
            [:td {:class "px-3 py-2 tabular-nums"} (or (:max_minutes c) "—")]
            [:td {:class "px-3 py-2"} (or (:prerequisite_topic c) "—")]
            [:td {:class "px-3 py-2 tabular-nums"} (or (theta->display (:min_theta c)) "—")]
            [:td {:class "px-3 py-2"} (if (:active c) "Sí" "No (borrador)")]
            [:td {:class "px-3 py-2"}
             [:button {:type "button"
                       :class "text-sm font-medium text-indigo-600 hover:text-indigo-900"
                       :on-click #(re-frame/dispatch [:admin/edit-test-config c])}
              "Editar"]]])]]])))

(defn test-configs-panel []
  (let [editing? @(re-frame/subscribe [:admin/test-config-editing?])
        loading? @(re-frame/subscribe [:admin/section-loading? :test-configs])
        error @(re-frame/subscribe [:admin/section-error :test-configs])]
    [:div {:class "space-y-4"}
     [:div {:class "mb-2"}
      [:h2 {:class "text-lg font-semibold text-gray-900"} "Configuración de tests"]
      [:p {:class "mt-0.5 text-sm text-gray-500"}
       "Parada IRT (ítems/SE/tiempo) y cadena de prerequisitos por topic. "
       "El acceso de cada estudiante se calcula solo a partir de lo que ya rindió."]]

     (when error
       [:div {:class "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"}
        error])

     (when-not editing?
       [:div {:class "flex justify-end"}
        [:button {:type "button"
                  :class "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  :on-click #(re-frame/dispatch [:admin/new-test-config])}
         "Nuevo topic"]])

     (cond
       (and loading? (not editing?))
       [:div {:class "flex justify-center py-10"}
        [:div {:class "h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-b-indigo-600"}]]

       editing?
       [test-config-editor]

       :else
       [test-configs-list])]))

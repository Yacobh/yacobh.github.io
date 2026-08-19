(ns universo.components.admin-misconceptions
  "Panel admin: catálogo de ideas erróneas (tabla `misconceptions`, migración 027).

   ── Por qué esta pestaña no es un CRUD más ─────────────────────────────────
   La propia migración 027 dejó escrita la única regla que decide si este
   catálogo sirve para algo:

   > El catálogo debe crecer **mucho más lento** que el banco. Con 387 ítems y
   > ~300 misconceptions no se modeló nada; con ~40 hay taxonomía. Corolario: una
   > misconception que aparece en un solo ítem es sospechosa.

   Por eso el veredicto de `misconceptions/health` va **arriba y visible**, no
   escondido en un detalle: es el instrumento que avisa cuando se está armando
   una lista de strings con otra forma en vez de una taxonomía. Y por eso las
   huérfanas se muestran al final de la lista en vez de filtrarse — son
   exactamente las que hay que revisar o borrar."
  (:require
   [clojure.string :as str]
   [re-frame.core :as re-frame]
   [universo.editor :as editor]
   [universo.misconceptions :as mis]))

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

(defn- pct [x]
  (str (js/Math.round (* 100 (or x 0))) " %"))

(defn- health-banner []
  (let [{:keys [total huerfanas singleton cobertura ratio veredicto]}
        @(re-frame/subscribe [:admin/misconceptions-health])
        bank @(re-frame/subscribe [:admin/misconception-bank-size])
        [tono titulo explicacion]
        (case veredicto
          :vacio ["border-gray-200 bg-gray-50 text-gray-700"
                  "Catálogo vacío"
                  (str "Ningún distractor está catalogado todavía. Se cataloga un módulo "
                       "a la vez, empezando por el más fallado.")]
          :disperso ["border-amber-200 bg-amber-50 text-amber-900"
                     "Catálogo disperso"
                     (str "Está creciendo casi tan rápido como el banco. Con menos de "
                          mis/items-por-misconception-saludable
                          " ítems por idea errónea no se está modelando: se está "
                          "renombrando cada error con otra forma.")]
          ["border-emerald-200 bg-emerald-50 text-emerald-900"
           "Catálogo sano"
           "Varios ítems por idea errónea: eso es una taxonomía y no una lista."])]
    [:div {:class (str "mb-5 rounded-xl border px-4 py-3 " tono)}
     [:div {:class "flex flex-wrap items-baseline justify-between gap-2"}
      [:p {:class "text-sm font-semibold"} titulo]
      [:p {:class "text-xs"}
       (str total " ideas · " bank " ítems"
            (when ratio (str " · " (.toFixed ratio 1) " ítems por idea")))]]
     [:p {:class "mt-1 text-xs"} explicacion]
     [:p {:class "mt-2 text-xs"}
      (str "Distractores catalogados: " (pct cobertura)
           " · huérfanas: " huerfanas
           " · en un solo ítem: " singleton)]
     ;; Sin este aviso el veredicto miente por omisión: hoy las 77 entradas del
     ;; experimento de cuántica son **todo** el catálogo, así que un «sano» se
     ;; leería como si el producto estuviera catalogado, y no lo está. Qué hacer
     ;; con ellas es OPEN_QUESTIONS Q-40, y no se decide desde acá.
     (let [{:keys [experimento]} (mis/split-experimento
                                  @(re-frame/subscribe [:admin/misconceptions]))]
       (when (seq experimento)
         [:p {:class "mt-2 text-xs italic"}
          (str (count experimento) " de estas ideas (" mis/experimento-slug-prefix
               "…) son del experimento de cuántica, no del producto, y el veredicto "
               "de arriba las incluye.")]))]))

(defn- editor-form []
  (let [draft @(re-frame/subscribe [:admin/misconception-draft])
        saving? @(re-frame/subscribe [:admin/misconception-saving?])
        modules @(re-frame/subscribe [:admin/modules])
        nuevo? (nil? (:id draft))
        slug (str/trim (str (:slug draft)))
        slug-ok? (mis/slug-valid? slug)
        guardar! #(when-not saving? (re-frame/dispatch [:admin/save-misconception]))
        on-key (fn [e]
                 (cond
                   (and (= (.-key e) "Enter") (or (.-metaKey e) (.-ctrlKey e)))
                   (do (.preventDefault e) (guardar!))
                   (= (.-key e) "Escape")
                   (do (.preventDefault e)
                       (re-frame/dispatch [:admin/cancel-misconception-edit]))))]
    [:div {:class "mb-6 rounded-xl border border-indigo-100 bg-white p-5"
           :on-key-down on-key}
     [:div {:class "mb-4 flex flex-wrap items-center justify-between gap-2"}
      [:div
       [:h3 {:class "text-lg font-semibold text-gray-900"}
        (if nuevo? "Nueva idea errónea" "Editar idea errónea")]
       [:span {:class "hidden text-xs text-gray-500 sm:inline"}
        "⌘/Ctrl+Enter guarda · Esc cancela"]]
      [:div {:class "flex flex-wrap gap-2"}
       (when-not nuevo?
         [:button {:type "button"
                   :disabled saving?
                   :class (str "rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 "
                               "transition hover:bg-red-100 disabled:opacity-50")
                   :on-click #(re-frame/dispatch
                               [:confirm/ask
                                {:message (str "¿Eliminar «" (:name draft) "»? "
                                               "Los distractores que la usan vuelven a «sin catalogar».")
                                 :confirm-label "Eliminar"
                                 :variant :danger
                                 :on-confirm [:admin/delete-misconception (:id draft)]}])}
          "Eliminar"])
       [:button {:type "button"
                 :disabled saving?
                 :class (str "rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 "
                             "transition hover:bg-gray-200 disabled:opacity-50")
                 :on-click #(re-frame/dispatch [:admin/cancel-misconception-edit])}
        "Cancelar"]
       [:button {:type "button"
                 :disabled (or saving? (not slug-ok?))
                 :class (str "rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white "
                             "transition hover:bg-indigo-700 disabled:opacity-50")
                 :on-click guardar!}
        (if saving? "Guardando…" "Guardar")]]]

     [:div {:class "grid grid-cols-1 gap-4 sm:grid-cols-2"}
      [field "Nombre" "En prosa, para el profesor y los reportes"
       [:input {:class input-class
                :type "text"
                :placeholder "Ej: Invierte el divisor al dividir fracciones"
                :value (or (:name draft) "")
                :on-change #(re-frame/dispatch
                             [:admin/update-misconception-name (.. % -target -value)])}]]
      [:div
       [field "Slug" "Se propone solo desde el nombre; se puede acortar"
        [:input {:class input-class
                 :type "text"
                 :placeholder "fracciones/invierte-divisor"
                 :value (or (:slug draft) "")
                 :on-change #(re-frame/dispatch
                              [:admin/update-misconception-draft :slug
                               (.. % -target -value)])}]]
       ;; El check de 027 rechaza mayúsculas, acentos y espacios. Sin este aviso,
       ;; el único que avisa es Postgres, después de escribir todo lo demás.
       (when-not slug-ok?
         [:p {:class "mt-1 text-xs text-amber-700"}
          "Solo minúsculas, dígitos y - o / como separadores; sin acentos ni espacios."])]

      [field "Módulo (opcional)" "Le da una pista de módulo a ítems que no lo tienen"
       [:select {:class input-class
                 :value (or (:module_id draft) "")
                 :on-change #(re-frame/dispatch
                              [:admin/update-misconception-draft :module_id
                               (.. % -target -value)])}
        [:option {:value ""} "— sin módulo —"]
        (for [[track ms] (editor/modules-by-track modules)]
          ^{:key track}
          [:optgroup {:label track}
           (for [m ms]
             ^{:key (:id m)}
             [:option {:value (:id m)} (editor/module-label m)])])]]

      [:div {:class "sm:col-span-2"}
       [field "Criterio editorial" "Cuándo usarla y cuándo no — es lo que evita duplicados"
        [:textarea {:class input-class
                    :rows 3
                    :placeholder "Usar cuando el estudiante multiplica por el recíproco equivocado…"
                    :value (or (:description draft) "")
                    :on-change #(re-frame/dispatch
                                 [:admin/update-misconception-draft :description
                                  (.. % -target -value)])}]]]]]))

(defn- row [m]
  (let [uso (:usage m 0)]
    [:div {:class "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3"}
     [:div {:class "min-w-0"}
      [:div {:class "flex flex-wrap items-center gap-2"}
       [:p {:class "font-medium text-gray-900"} (:name m)]
       (if (pos? uso)
         [:span {:class "rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"}
          (str uso (if (= 1 uso) " distractor" " distractores"))]
         [:span {:class "rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800"}
          "sin usar"])
       (when (= 1 uso)
         [:span {:class "rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700"}
          "en un solo ítem"])]
      [:p {:class "mt-0.5 font-mono text-xs text-gray-500"}
       (:slug m)
       (when-let [s (:module_slug m)] (str " · " s))]
      (when-let [d (:description m)]
        [:p {:class "mt-1 max-w-2xl text-xs text-gray-500"} d])]
     [:button {:type "button"
               :class (str "rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium "
                           "text-gray-700 transition hover:bg-gray-50")
               :on-click #(re-frame/dispatch [:admin/edit-misconception m])}
      "Editar"]]))

(defn misconceptions-panel []
  (let [rows @(re-frame/subscribe [:admin/misconceptions-view])
        draft @(re-frame/subscribe [:admin/misconception-draft])
        query @(re-frame/subscribe [:admin/misconception-search])
        loading? @(re-frame/subscribe [:admin/section-loading? :misconceptions])
        error @(re-frame/subscribe [:admin/section-error :misconceptions])]
    [:div {:class "space-y-4"}
     [:div {:class "mb-2"}
      [:h2 {:class "text-lg font-semibold text-gray-900"} "Ideas erróneas"]
      [:p {:class "mt-0.5 text-sm text-gray-500"}
       "Catálogo con identidad propia: le da nombre reusable al error que hay detrás "
       "de cada distractor. El texto de la explicación sigue viviendo en la pregunta."]]

     (when error
       [:div {:class "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"}
        error])

     [health-banner]

     (if draft
       [editor-form]
       [:div {:class "flex flex-wrap items-end justify-between gap-3"}
        [:div {:class "min-w-64 flex-1"}
         [field "Buscar" "Por nombre, slug o criterio"
          [:input {:class input-class
                   :type "search"
                   :placeholder "fracciones, signos, divisor…"
                   :value query
                   :on-change #(re-frame/dispatch
                                [:admin/set-misconception-search (.. % -target -value)])}]]]
        [:button {:type "button"
                  :class "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  :on-click #(re-frame/dispatch [:admin/new-misconception])}
         "Nueva idea errónea"]])

     (cond
       loading?
       [:div {:class "flex justify-center py-10"}
        [:div {:class "h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-b-indigo-600"}]]

       (empty? rows)
       [:div {:class "rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500"}
        (if (str/blank? query)
          "Todavía no hay ninguna idea errónea catalogada."
          "Ninguna idea errónea coincide con esa búsqueda.")]

       :else
       [:div {:class "space-y-2"}
        (for [m rows]
          ^{:key (:id m)} [row m])])]))

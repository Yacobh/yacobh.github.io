(ns universo.components.guestbook
  (:require [reagent.core :as r]
            [clojure.string :as str]
            [universo.db.supabase :as supabase]))

(defn validate-form [form-data]
  (let [{:keys [name message]} form-data
        errors {}]
    (cond-> errors
      (str/blank? name) (assoc :name "El nombre es requerido")
      (str/blank? message) (assoc :message "El mensaje es requerido")
      (and (:email form-data)
           (not (re-matches #".+@.+\..+" (:email form-data))))
      (assoc :email "Email inválido"))))

(defn guestbook-form [on-submit loading?]
  (let [form-data (r/atom {:name "" :email "" :phone "" :message ""})
        errors (r/atom {})
        success (r/atom false)]

    (fn []
      [:div.guestbook-form.bg-white.rounded-lg.shadow-lg.p-6.mb-8
       [:div.text-center.mb-6
        [:h2.text-2xl.font-bold.text-gray-800.mb-2
         "¡Hola! Soy Jacobo Córdova"]
        [:p.text-gray-600
         "Me encantaría conocerte. ¿Quieres escribir tu nombre en mi libro de visitas?"]]

       (if @success
         [:div.text-center.py-8
          [:div.text-green-600.text-6xl.mb-4 "✓"]
          [:h3.text-xl.font-semibold.text-gray-800.mb-2 "¡Gracias por firmar!"]
          [:p.text-gray-600 "Tu mensaje ha sido agregado al libro de visitas."]
          [:button.mt-4.px-4.py-2.bg-blue-500.text-white.rounded.hover:bg-blue-600
           {:on-click #(do (reset! success false)
                           (reset! form-data {:name "" :email "" :phone "" :message ""}))}
           "Agregar otro mensaje"]]

         [:form {:on-submit (fn [e]
                              (.preventDefault e)
                              (let [validation-errors (validate-form @form-data)]
                                (if (empty? validation-errors)
                                  (do
                                    (reset! errors {})
                                    (on-submit @form-data
                                               #(reset! success true)))
                                  (reset! errors validation-errors))))}

          [:div.grid.grid-cols-1.md:grid-cols-2.gap-4.mb-4
           [:div
            [:label.block.text-sm.font-medium.text-gray-700.mb-1
             "Nombre *"]
            [:input.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500
             {:type "text"
              :value (:name @form-data)
              :on-change #(swap! form-data assoc :name (-> % .-target .-value))
              :class (when (:name @errors) "border-red-500")}]
            (when (:name @errors)
              [:p.text-red-500.text-sm.mt-1 (:name @errors)])]

           [:div
            [:label.block.text-sm.font-medium.text-gray-700.mb-1
             "Email (opcional)"]
            [:input.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500
             {:type "email"
              :value (:email @form-data)
              :on-change #(swap! form-data assoc :email (-> % .-target .-value))
              :class (when (:email @errors) "border-red-500")}]
            (when (:email @errors)
              [:p.text-red-500.text-sm.mt-1 (:email @errors)])]]

          [:div.mb-4
           [:label.block.text-sm.font-medium.text-gray-700.mb-1
            "Teléfono (opcional)"]
           [:input.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500
            {:type "tel"
             :value (:phone @form-data)
             :on-change #(swap! form-data assoc :phone (-> % .-target .-value))}]]

          [:div.mb-6
           [:label.block.text-sm.font-medium.text-gray-700.mb-1
            "Mensaje *"]
           [:textarea.w-full.px-3.py-2.border.border-gray-300.rounded-md.focus:outline-none.focus:ring-2.focus:ring-blue-500.h-24
            {:value (:message @form-data)
             :on-change #(swap! form-data assoc :message (-> % .-target .-value))
             :placeholder "Escribe aquí tu mensaje..."
             :class (when (:message @errors) "border-red-500")}]
           (when (:message @errors)
             [:p.text-red-500.text-sm.mt-1 (:message @errors)])]

          [:div.text-center
           [:button.px-6.py-3.bg-blue-600.text-white.font-semibold.rounded-lg.hover:bg-blue-700.focus:outline-none.focus:ring-2.focus:ring-blue-500.disabled:opacity-50.disabled:cursor-not-allowed
            {:type "submit"
             :disabled loading?}
            (if loading?
              [:span.flex.items-center.justify-center
               [:svg.animate-spin.h-4.w-4.mr-2.text-white
                {:viewBox "0 0 24 24"}
                [:circle.opacity-25 {:cx "12" :cy "12" :r "10" :stroke "currentColor" :stroke-width "4"}]
                [:path.opacity-75 {:fill "currentColor" :d "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}]]
               "Enviando..."]
              "✍️ Firmar el libro de visitas")]]])])))

(defn guestbook-entry [entry]
  [:div.bg-gray-50.rounded-lg.p-4.mb-4.border-l-4.border-blue-500
   [:div.flex.justify-between.items-start.mb-2
    [:h4.font-semibold.text-gray-800 (:name entry)]
    [:span.text-sm.text-gray-500
     (.toLocaleDateString (js/Date. (:created_at entry)) "es-ES")]]
   [:p.text-gray-700.leading-relaxed (:message entry)]
   (when (and (:email entry) (not (str/blank? (:email entry))))
     [:p.text-sm.text-gray-500.mt-2
      [:span "📧 " (:email entry)]])])

(defn guestbook-list [entries loading?]
  [:div.guestbook-list
   [:h3.text-xl.font-bold.text-gray-800.mb-4.text-center
    "Mensajes del libro de visitas"]

   (if loading?
     [:div.text-center.py-8
      [:div.inline-block.animate-spin.rounded-full.h-8.w-8.border-b-2.border-blue-600]]

     (if (empty? entries)
       [:div.text-center.py-8.text-gray-500
        [:p "Sé el primero en firmar el libro de visitas"]]

       [:div
        (for [entry entries]
          ^{:key (:id entry)}
          [guestbook-entry entry])]))])

(defn guestbook-component []
  (let [entries (r/atom [])
        loading-entries? (r/atom true)
        loading-submit? (r/atom false)]

    ;; Cargar entradas al montar el componente
    (r/create-class
     {:component-did-mount
      (fn []
        (-> (supabase/get-guestbook-entries)
            (.then #(do (reset! entries %)
                        (reset! loading-entries? false)))
            (.catch #(do (js/console.error "Error loading guestbook:" %)
                         (reset! loading-entries? false)))))

      :reagent-render
      (fn []
        [:div.max-w-4xl.mx-auto.px-4.py-8
         [guestbook-form
          (fn [form-data on-success]
            (reset! loading-submit? true)
            (-> (supabase/add-guestbook-entry form-data)
                (.then (fn [new-entry]
                         (swap! entries #(vec (cons new-entry %)))
                         (reset! loading-submit? false)
                         (on-success)))
                (.catch #(do (js/console.error "Error submitting:" %)
                             (reset! loading-submit? false)))))
          @loading-submit?]

         [guestbook-list @entries @loading-entries?]])})))

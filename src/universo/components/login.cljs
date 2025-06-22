(ns universo.components.login
  (:require [reagent.core :as r]
            [universo.supabase :as sb]))

(defn login-form []
  (let [email (r/atom "")
        password (r/atom "")
        loading (r/atom false)
        error (r/atom nil)
        success (r/atom nil)]

    (fn []
      [:div.flex.items-center.justify-center.bg-gray-100.p-20
       ;; Contenedor principal
       [:div.bg-white.shadow-md.rounded-lg.p-6.w-full.max-w-md


        [:h2.text-2xl.font-bold.text-gray-800.mb-6.text-center "Iniciar Sesión"]

        ;; Mensaje de éxito
        (when @success
          [:div.bg-green-100.text-green-700.p-3.rounded.mb-4.text-sm
           @success])

        ;; Mensaje de error
        (when @error
          [:div.bg-red-100.text-red-700.p-3.rounded.mb-4.text-sm
           @error])

        [:form {:on-submit (fn [e]
                             (.preventDefault e)
                             (reset! loading true)
                             (reset! error nil)
                             (reset! success nil)

                             (-> (sb/sign-in @email @password)
                                 (.then (fn [response]
                                          (reset! loading false)
                                          (if (.-error response)
                                            (reset! error (.. response -error -message))
                                            (do
                                              (reset! success "¡Login exitoso!")
                                              (js/console.log "Usuario:" (.-user (.-data response)))))))
                                 (.catch (fn [err]
                                           (reset! loading false)
                                           (reset! error "Error de conexión")))))}

         ;; Email
         [:div.mb-4
          [:label.block.text-sm.font-medium.text-gray-700.mb-1 "Email"]
          [:input {:type "email"
                   :placeholder "tu@email.com"
                   :value @email
                   :on-change #(reset! email (.. % -target -value))
                   :required true
                   :disabled @loading
                   :class "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"}]]

         ;; Password
         [:div.mb-6
          [:label.block.text-sm.font-medium.text-gray-700.mb-1 "Contraseña"]
          [:input {:type "password"
                   :placeholder "Tu contraseña"
                   :value @password
                   :on-change #(reset! password (.. % -target -value))
                   :required true
                   :disabled @loading
                   :class "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"}]]

         ;; Botón submit
         [:button {:type "submit"
                   :disabled @loading
                   :class (str "w-full py-2 px-4 text-white font-semibold rounded-md transition-colors "
                               (if @loading
                                 "bg-gray-400 cursor-not-allowed"
                                 "bg-blue-600 hover:bg-blue-700"))}
          (if @loading "Iniciando sesión..." "Iniciar Sesión")]]]])))

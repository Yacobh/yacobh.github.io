(ns universo.components.login
  (:require [reagent.core :as r]
            [universo.supabase :as sb]
            [re-frame.core :as re-frame]))

(defn- session-from-response
  "Extrae session/user de la respuesta de Auth de Supabase."
  [response]
  (let [data (.-data response)]
    {:session (some-> data .-session)
     :user (some-> data .-user)}))

(defn- already-registered?
  "Supabase a veces responde OK con identities vacío si el email ya existe."
  [user]
  (let [identities (some-> user .-identities)]
    (and user identities (zero? (alength identities)))))

(defn- handle-auth-success!
  "Tras login o signup con sesión activa, entra a la app."
  [user set-success!]
  (set-success! "¡Listo!")
  (re-frame/dispatch [:auth/login-success user]))

(defn login-form []
  (let [mode (r/atom :login) ; :login | :register
        email (r/atom "")
        password (r/atom "")
        loading (r/atom false)
        error (r/atom nil)
        success (r/atom nil)]

    (fn []
      (let [register? (= @mode :register)]
        [:div.flex.items-center.justify-center.p-20
         [:div.bg-white.shadow-md.rounded-lg.p-6.w-full.max-w-md

          [:h2.text-2xl.font-bold.text-gray-800.mb-2.text-center
           (if register? "Crear cuenta" "Iniciar Sesión")]
          [:p.text-sm.text-gray-500.mb-6.text-center
           (if register?
             "Regístrate para acceder a tus evaluaciones"
             "Ingresa con tu correo institucional")]

          (when @success
            [:div.bg-green-100.text-green-700.p-3.rounded.mb-4.text-sm
             @success])

          (when @error
            [:div.bg-red-100.text-red-700.p-3.rounded.mb-4.text-sm
             @error])

          [:form
           {:on-submit
            (fn [e]
              (.preventDefault e)
              (reset! loading true)
              (reset! error nil)
              (reset! success nil)
              (let [auth-fn (if register? sb/sign-up sb/sign-in)]
                (-> (auth-fn @email @password)
                    (.then
                     (fn [response]
                       (reset! loading false)
                       (if (.-error response)
                         (reset! error (.. response -error -message))
                         (let [{:keys [session user]} (session-from-response response)]
                           (cond
                             ;; Email ya registrado (respuesta "silenciosa" de Supabase)
                             (and register? (already-registered? user))
                             (reset! error "Este correo ya tiene una cuenta. Inicia sesión.")

                             ;; Sesión activa → entrar (login o signup sin confirmación)
                             session
                             (handle-auth-success! (or user (.-user session))
                                                   #(reset! success %))

                             ;; Signup con Confirm email activo
                             (and register? user)
                             (do
                               (reset! success "Cuenta creada. Revisa tu correo para confirmar e inicia sesión.")
                               (reset! mode :login)
                               (reset! password ""))

                             ;; Login sin sesión (email no confirmado)
                             (and (not register?) user)
                             (reset! error "Confirma tu email antes de iniciar sesión.")

                             :else
                             (reset! error "No se pudo completar la operación."))))))
                    (.catch
                     (fn [_err]
                       (reset! loading false)
                       (reset! error "Error de conexión"))))))}

           [:div.mb-4
            [:label.block.text-sm.font-medium.text-gray-700.mb-1 "Email"]
            [:input {:type "email"
                     :placeholder "tu@email.com"
                     :value @email
                     :on-change #(reset! email (-> % .-target .-value))
                     :required true
                     :disabled @loading
                     :auto-complete "email"
                     :class "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"}]]

           [:div.mb-6
            [:label.block.text-sm.font-medium.text-gray-700.mb-1 "Contraseña"]
            [:input {:type "password"
                     :placeholder (if register? "Mínimo 6 caracteres" "Tu contraseña")
                     :value @password
                     :on-change #(reset! password (-> % .-target .-value))
                     :required true
                     :min-length (when register? 6)
                     :disabled @loading
                     :auto-complete (if register? "new-password" "current-password")
                     :class "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"}]]

           [:button {:type "submit"
                     :disabled @loading
                     :class (str "w-full py-2 px-4 text-white font-semibold rounded-md transition-colors "
                                 (if @loading
                                   "bg-gray-400 cursor-not-allowed"
                                   "bg-blue-600 hover:bg-blue-700"))}
            (cond
              @loading (if register? "Creando cuenta..." "Iniciando sesión...")
              register? "Registrarse"
              :else "Iniciar Sesión")]]

          [:p.text-sm.text-gray-600.text-center.mt-6
           (if register?
             [:span "¿Ya tienes cuenta? "
              [:button {:type "button"
                        :class "text-indigo-600 font-semibold hover:text-indigo-800"
                        :on-click #(do (reset! mode :login)
                                       (reset! error nil)
                                       (reset! success nil))}
               "Inicia sesión"]]
             [:span "¿No tienes cuenta? "
              [:button {:type "button"
                        :class "text-indigo-600 font-semibold hover:text-indigo-800"
                        :on-click #(do (reset! mode :register)
                                       (reset! error nil)
                                       (reset! success nil))}
               "Regístrate"]])]]]))))

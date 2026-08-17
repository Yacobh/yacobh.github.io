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
  ;; Iniciar sesión y registrarse son **dos rutas**, `/ingresar` y
  ;; `/registrarse`, no dos modos de una misma pantalla: el registro es el paso
  ;; más caro del embudo y tiene que sobrevivir a un refresh y medirse aparte
  ;; (ADR-026, T-20). Este componente sirve a las dos y deriva cuál mostrar de
  ;; la sección activa; el estado del formulario sobrevive al cambio porque
  ;; `main-content` monta el mismo componente en las dos ramas.
  (let [;; Última sección vista, para saber cuándo se cruzó de una a la otra.
        last-section (r/atom nil)
        email (r/atom "")
        password (r/atom "")
        consent (r/atom false)
        loading (r/atom false)
        error (r/atom nil)
        success (r/atom nil)]

    (fn []
      (let [section @(re-frame/subscribe [:current-section])
            register? (= section :registro)]
        ;; Al cruzar de una ruta a la otra se limpia el **error**: "este correo
        ;; ya tiene una cuenta" no significa nada en el otro formulario. El
        ;; mensaje de éxito sí sobrevive a propósito — es justo el caso de
        ;; "cuenta creada, revisa tu correo", que manda al usuario a
        ;; `/ingresar` y tiene que seguir leyéndose ahí. Va acá y no en el
        ;; on-click del enlace para cubrir también el botón atrás.
        (when (not= section @last-section)
          (reset! last-section section)
          (reset! error nil))
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
             {:role "alert"}
             @success])

          (when @error
            [:div.bg-red-100.text-red-700.p-3.rounded.mb-4.text-sm
             {:role "alert"}
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
                               (reset! password "")
                               (re-frame/dispatch [:navigate-to :login]))

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
                     :class "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"}]]

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
                     :class "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"}]]

           (when register?
             ;; No usamos <label> envolvente: el link de abajo quedaría anidado
             ;; dentro y un click ahí también alternaría el checkbox (comportamiento
             ;; nativo de <label>).
             [:div.mb-6.flex.items-start.gap-2.text-xs.text-gray-600
              [:input {:type "checkbox"
                       :id "consent-privacidad"
                       :checked @consent
                       :on-change #(reset! consent (-> % .-target .-checked))
                       :required true
                       :disabled @loading
                       :class "mt-0.5"}]
              [:label {:for "consent-privacidad"}
               "He leído y acepto el "
               [:button {:type "button"
                         :class "text-indigo-600 underline hover:text-indigo-800"
                         :on-click (fn [e]
                                     (.preventDefault e)
                                     (.stopPropagation e)
                                     (re-frame/dispatch [:navigate-to :privacidad]))}
                "Aviso de Privacidad"]
               ". Declaro tener 14 años o más, o contar con la autorización de mi madre, "
               "padre o tutor."]])

           [:button {:type "submit"
                     :disabled @loading
                     :class (str "w-full py-2 px-4 text-white font-semibold rounded-md transition-colors "
                                 (if @loading
                                   "bg-gray-400 cursor-not-allowed"
                                   "bg-indigo-600 hover:bg-indigo-700"))}
            (cond
              @loading (if register? "Creando cuenta..." "Iniciando sesión...")
              register? "Registrarse"
              :else "Iniciar Sesión")]]

          ;; Enlaces reales, no botones: cada uno apunta a una ruta que existe,
          ;; así que se pueden abrir en otra pestaña o copiar. El click navega
          ;; sin recargar (ADR-026).
          [:p.text-sm.text-gray-600.text-center.mt-6
           (let [go (fn [destino]
                      (fn [e]
                        (.preventDefault e)
                        (reset! success nil)
                        (re-frame/dispatch [:navigate-to destino])))
                 link-class "text-indigo-600 font-semibold hover:text-indigo-800"]
             (if register?
               [:span "¿Ya tienes cuenta? "
                [:a {:href "/ingresar" :class link-class :on-click (go :login)}
                 "Inicia sesión"]]
               [:span "¿No tienes cuenta? "
                [:a {:href "/registrarse" :class link-class :on-click (go :registro)}
                 "Regístrate"]]))]]]))))

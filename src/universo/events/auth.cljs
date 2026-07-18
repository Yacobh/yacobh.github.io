(ns universo.events.auth
  (:require
   [re-frame.core :as re-frame]
   [universo.supabase :as sb]))

;; -----------------------------------------------------------------------------
;; Secciones que requieren sesión Supabase válida
;; -----------------------------------------------------------------------------

(def protected-sections #{:dashboard :diagnostic-test})

(defn logged-in?
  "True si hay usuario de sesión en app-db."
  [db]
  (boolean (get-in db [:auth :user])))

(defn js-user->map
  "Extrae id/email de un User de Supabase (JS)."
  [user]
  (when user
    {:id (.-id user)
     :email (.-email user)}))

;; -----------------------------------------------------------------------------
;; Suscripciones
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :auth/ready?
 (fn [db _]
   (get-in db [:auth :ready?] false)))

(re-frame/reg-sub
 :auth/logged-in?
 (fn [db _]
   (logged-in? db)))

(re-frame/reg-sub
 :auth/user
 (fn [db _]
   (get-in db [:auth :user])))

;; -----------------------------------------------------------------------------
;; Aplicar / limpiar sesión en app-db
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :auth/session-established
 (fn [{:keys [db]} [_ {:keys [id email]} navigate?]]
   (let [prev-email (get-in db [:visitor :email])
         redirect (get-in db [:auth :redirect-after-login])
         target (when navigate? (or redirect :dashboard))
         load-dashboard? (not= prev-email email)]
     {:db (-> db
              (assoc-in [:auth :ready?] true)
              (assoc-in [:auth :user] {:id id :email email})
              (assoc-in [:auth :redirect-after-login] nil)
              (assoc-in [:visitor :email] email)
              (assoc-in [:visitor :logged-in] true)
              (assoc-in [:dashboard :user-id] id))
      :dispatch-n (cond-> []
                    load-dashboard? (conj [:dashboard/cargar email])
                    target (conj [:navigate-to target]))})))

(re-frame/reg-event-fx
 :auth/session-cleared
 (fn [{:keys [db]} [_ {:keys [navigate-to-login?]}]]
   (let [section (get-in db [:ui :current-section])
         on-protected? (contains? protected-sections section)]
     {:db (-> db
              (assoc-in [:auth :ready?] true)
              (assoc-in [:auth :user] nil)
              (assoc-in [:auth :redirect-after-login] nil)
              (assoc-in [:visitor :email] nil)
              (assoc-in [:visitor :logged-in] false)
              (assoc-in [:dashboard :user-id] nil)
              (assoc-in [:dashboard/stats] nil)
              (assoc-in [:dashboard/ultimo-test] nil))
      :dispatch-n (cond-> []
                    navigate-to-login?
                    (conj [:navigate-to :login])

                    (and (not navigate-to-login?) on-protected?)
                    (conj [:navigate-to :main]))})))

;; -----------------------------------------------------------------------------
;; Init: rehidratar getSession + escuchar cambios
;; -----------------------------------------------------------------------------

(re-frame/reg-fx
 :auth/get-session
 (fn [_]
   (-> (sb/get-session)
       (.then (fn [response]
                (let [error (.-error response)
                      session (some-> response .-data .-session)
                      user (some-> session .-user)]
                  (if error
                    (do
                      (js/console.error "❌ Error getSession:" error)
                      (re-frame/dispatch [:auth/session-cleared {:navigate-to-login? false}]))
                    (if-let [user-map (js-user->map user)]
                      (re-frame/dispatch [:auth/session-established user-map false])
                      (re-frame/dispatch [:auth/session-cleared {:navigate-to-login? false}]))))))
       (.catch (fn [err]
                 (js/console.error "❌ Excepción getSession:" err)
                 (re-frame/dispatch [:auth/session-cleared {:navigate-to-login? false}]))))))

(re-frame/reg-fx
 :auth/listen
 (fn [_]
   (sb/on-auth-state-change
    (fn [event session]
      (let [event-name (str event)]
        (js/console.log "🔐 Auth state:" event-name)
        (cond
          (#{"SIGNED_IN" "TOKEN_REFRESHED" "USER_UPDATED"} event-name)
          (when-let [user-map (js-user->map (some-> session .-user))]
            ;; No navegar aquí: el form de login dispara navigate vía :auth/login-success
            (re-frame/dispatch [:auth/session-established user-map false]))

          (= "SIGNED_OUT" event-name)
          (re-frame/dispatch [:auth/session-cleared {:navigate-to-login? false}])

          ;; INITIAL_SESSION lo cubre getSession
          :else nil))))))

(re-frame/reg-event-fx
 :auth/init
 (fn [_ _]
   {:auth/get-session nil
    :auth/listen nil}))

;; -----------------------------------------------------------------------------
;; Login / logout (UI)
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :auth/login-success
 (fn [_ [_ user]]
   (let [user-map (if (map? user) user (js-user->map user))]
     {:dispatch [:auth/session-established user-map true]})))

(re-frame/reg-fx
 :auth/sign-out
 (fn [_]
   (-> (sb/sign-out)
       (.then (fn [_]
                (re-frame/dispatch [:auth/session-cleared {:navigate-to-login? false}])))
       (.catch (fn [err]
                 (js/console.error "❌ Error signOut:" err)
                 ;; Limpiar estado local de todos modos
                 (re-frame/dispatch [:auth/session-cleared {:navigate-to-login? false}]))))))

(re-frame/reg-event-fx
 :auth/logout
 (fn [_ _]
   {:auth/sign-out nil}))

;; -----------------------------------------------------------------------------
;; Guards de navegación
;; -----------------------------------------------------------------------------

(defn- guard-section
  "Si la sección es protegida y no hay sesión, redirige a :login y guarda el destino."
  [db section]
  (if (and (contains? protected-sections section)
           (not (logged-in? db)))
    {:db (-> db
             (assoc-in [:auth :redirect-after-login] section)
             (assoc-in [:ui :transitioning] true))
     :dispatch-later [{:ms 240 :dispatch [:complete-navigation :login]}]}
    {:db (assoc-in db [:ui :transitioning] true)
     :dispatch-later [{:ms 240 :dispatch [:complete-navigation section]}]}))

(re-frame/reg-event-fx
 :navigate-to
 (fn [{:keys [db]} [_ section]]
   (guard-section db section)))

(re-frame/reg-event-fx
 :set-section
 (fn [{:keys [db]} [_ section]]
   (if (and (contains? protected-sections section)
            (not (logged-in? db)))
     {:db (assoc-in db [:auth :redirect-after-login] section)
      :dispatch [:navigate-to :login]}
     {:db (assoc-in db [:ui :current-section] section)})))

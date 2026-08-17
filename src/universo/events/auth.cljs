(ns universo.events.auth
  (:require
   [re-frame.core :as re-frame]
   [universo.supabase :as sb]))

;; -----------------------------------------------------------------------------
;; Secciones que requieren sesión Supabase válida
;; -----------------------------------------------------------------------------

(def protected-sections #{:dashboard :diagnostic-test :admin :plan :cupos :cuenta})

(defn logged-in?
  "True si hay usuario de sesión en app-db."
  [db]
  (boolean (get-in db [:auth :user])))

(defn admin?
  "True si el perfil cargado tiene role admin."
  [db]
  (boolean (get-in db [:auth :admin?])))

(defn js-user->map
  "Extrae id/email de un User de Supabase (JS)."
  [user]
  (when user
    {:id (.-id user)
     :email (.-email user)}))

(defn session-refresh?
  "True si el evento de Supabase corresponde a una sesión **ya establecida** para
   el mismo usuario, es decir: no hay nada que reconstruir.

   Existe por T-58: `@supabase/supabase-js` refresca la sesión cada vez que la
   pestaña recupera visibilidad y emite `TOKEN_REFRESHED`. Tratarlo como un login
   nuevo hace que `:auth/session-established` limpie `role`/`admin?`, lo que
   desmonta la sección activa (`admin-panel` cae a su rama `(nil? role)`) y con
   ella el estado local de sus formularios — el usuario pierde lo que estaba
   escribiendo.

   Se compara **id y email**: si cambió el correo (`USER_UPDATED`) sí hay que
   reestablecer la sesión, aunque el id sea el mismo."
  [db {:keys [id email]}]
  (boolean
   (and (get-in db [:auth :ready?])
        id
        (= id (get-in db [:auth :user :id]))
        (= email (get-in db [:auth :user :email])))))

;; -----------------------------------------------------------------------------
;; Resolución de destino tras un cambio de sesión (puro, testeable)
;; -----------------------------------------------------------------------------

(defn post-session-target
  "A qué sección navegar cuando la sesión queda **establecida**. Devuelve
   `[section opts]` o nil si no hay que navegar.

   Tres orígenes, en este orden de prioridad:
   1. login explícito (`navigate?`): al destino guardado, o al tablero;
   2. deep link a una sección protegida (`pending`, T-05): a esa sección, con
      `:history :replace` porque la URL **ya** es la correcta — apilar otra
      entrada dejaría el botón atrás girando en el mismo lugar;
   3. rehidratación normal de la sesión al cargar: a ninguna parte."
  [{:keys [navigate? redirect pending]}]
  (cond
    navigate? [(or redirect :dashboard) nil]
    pending   [pending {:history :replace}]
    :else     nil))

(defn post-clear-target
  "A qué sección navegar cuando la sesión se **limpia**. Devuelve `[section
   opts]` o nil.

   El caso nuevo es `pending`: alguien abrió `/plan` sin sesión (T-05). Va al
   login, y quien llama conserva el destino en `:redirect-after-login` para
   volver ahí después. Es distinto de cerrar sesión estando adentro, que
   devuelve al inicio."
  [{:keys [navigate-to-login? pending current-section]}]
  (cond
    pending            [:login {:history :replace}]
    navigate-to-login? [:login nil]
    (contains? protected-sections current-section) [:main nil]
    :else nil))

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

(re-frame/reg-sub
 :auth/admin?
 (fn [db _]
   (admin? db)))

(re-frame/reg-sub
 :auth/login-mode
 (fn [db _]
   (get-in db [:auth :login-mode])))

(re-frame/reg-event-db
 :auth/set-login-mode
 (fn [db [_ mode]]
   (assoc-in db [:auth :login-mode] mode)))

(re-frame/reg-sub
 :auth/role
 (fn [db _]
   (get-in db [:auth :role])))

;; -----------------------------------------------------------------------------
;; Aplicar / limpiar sesión en app-db
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :auth/session-established
 (fn [{:keys [db]} [_ {:keys [id email]} navigate?]]
   (let [prev-email (get-in db [:visitor :email])
         redirect (get-in db [:auth :redirect-after-login])
         pending (get-in db [:router :pending])
         target (post-session-target {:navigate? navigate?
                                      :redirect redirect
                                      :pending pending})
         load-dashboard? (not= prev-email email)]
     {:db (-> db
              (assoc-in [:auth :ready?] true)
              (assoc-in [:auth :user] {:id id :email email})
              ;; role/admin? se confirman al cargar profiles
              (assoc-in [:auth :admin?] false)
              (assoc-in [:auth :role] nil)
              (assoc-in [:auth :redirect-after-login] nil)
              ;; El deep link ya se consumió: dejarlo puesto haría que un
              ;; refresco de token volviera a arrastrar al usuario ahí.
              (assoc-in [:router :pending] nil)
              (assoc-in [:visitor :email] email)
              (assoc-in [:visitor :logged-in] true)
              (assoc-in [:dashboard :user-id] id))
      :dispatch-n (cond-> [[:auth/load-profile id]
                           [:profile/load id]
                           [:notifications/load]]
                    load-dashboard? (conj [:dashboard/cargar email])
                    target (conj (into [:navigate-to] target)))})))

(re-frame/reg-event-fx
 :auth/session-event
 ;; Punto único de entrada de los eventos de sesión de Supabase (T-58). Filtra los
 ;; refrescos de token —que no traen nada nuevo— antes de reconstruir la sesión.
 ;; Cortar acá evita de una vez los dos efectos del refresco: el desmontaje de la
 ;; sección activa y el `:admin/enter` que `:auth/profile-loaded` re-dispara.
 (fn [{:keys [db]} [_ user-map]]
   (if (session-refresh? db user-map)
     {}
     {:dispatch [:auth/session-established user-map false]})))

(re-frame/reg-event-fx
 :auth/session-cleared
 (fn [{:keys [db]} [_ {:keys [navigate-to-login?]}]]
   (let [section (get-in db [:ui :current-section])
         pending (get-in db [:router :pending])
         target (post-clear-target {:navigate-to-login? navigate-to-login?
                                    :pending pending
                                    :current-section section})]
     {:db (-> db
              (assoc-in [:auth :ready?] true)
              (assoc-in [:auth :user] nil)
              (assoc-in [:auth :admin?] false)
              (assoc-in [:auth :role] nil)
              ;; Un deep link a sección protegida sin sesión no se pierde: se
              ;; convierte en el destino de vuelta después del login (T-05).
              (assoc-in [:auth :redirect-after-login] pending)
              (assoc-in [:router :pending] nil)
              (assoc-in [:visitor :email] nil)
              (assoc-in [:visitor :logged-in] false)
              (assoc-in [:dashboard :user-id] nil)
              (assoc-in [:account :profile] nil)
              (assoc-in [:account :save-status] nil)
              (assoc-in [:account :deletion-request-status] nil)
              (assoc-in [:dashboard/stats] nil)
              (assoc-in [:dashboard/ultimo-test] nil)
              (assoc-in [:admin :profiles] [])
              (assoc-in [:admin :deletion-requests] [])
              (assoc-in [:admin :tests] [])
              (assoc-in [:admin :guestbook] [])
              (assoc-in [:admin :overview] nil)
              (assoc-in [:admin :rosters] {})
              ;; Invalida la caché por sección: al volver a entrar se recarga.
              (assoc-in [:admin :status] {}))
      :dispatch-n (cond-> []
                    target (conj (into [:navigate-to] target)))})))

;; -----------------------------------------------------------------------------
;; Perfil (role / admin?)
;; -----------------------------------------------------------------------------

(re-frame/reg-fx
 :auth/fetch-profile
 (fn [user-id]
   (when user-id
     (-> (.from sb/supabase-client "profiles")
         (.select "id,email,role,created_at")
         (.eq "id" (str user-id))
         (.maybeSingle)
         (.then (fn [result]
                  (if (.-error result)
                    (do
                      (js/console.error "❌ Error cargando profile:" (.-error result))
                      (re-frame/dispatch [:auth/profile-loaded nil]))
                    (let [data (.-data result)
                          profile (when data
                                    (js->clj data :keywordize-keys true))]
                      (re-frame/dispatch [:auth/profile-loaded profile])))))
         (.catch (fn [err]
                   (js/console.error "❌ Excepción profile:" err)
                   (re-frame/dispatch [:auth/profile-loaded nil])))))))

(re-frame/reg-event-fx
 :auth/load-profile
 (fn [_ [_ user-id]]
   {:auth/fetch-profile user-id}))

(re-frame/reg-event-fx
 :auth/profile-loaded
 (fn [{:keys [db]} [_ profile]]
   (let [role (or (:role profile) "user")
         admin? (= role "admin")
         section (get-in db [:ui :current-section])
         on-admin? (= section :admin)
         kick? (and on-admin? (not admin?))]
     (cond-> {:db (-> db
                      (assoc-in [:auth :role] role)
                      (assoc-in [:auth :admin?] admin?))}
       kick? (assoc :dispatch [:navigate-to :dashboard])
       ;; El panel puede haberse montado antes de conocer el rol: sus consultas
       ;; habrían chocado con RLS. Ahora que el rol está confirmado, se cargan.
       (and on-admin? admin?) (assoc :dispatch [:admin/enter])))))

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
            ;; No navegar aquí: el form de login dispara navigate vía :auth/login-success.
            ;; Va a :auth/session-event (no directo a session-established) porque solo
            ;; ahí, con acceso a db, se puede distinguir un refresco de token de una
            ;; sesión nueva (T-58).
            (re-frame/dispatch [:auth/session-event user-map]))

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
  "Protege secciones que requieren login; :admin también requiere role admin.

   `opts` se pasa tal cual a `:complete-navigation` (T-05): lleva el modo de
   historial (`:history`). Se propaga **también cuando el guard desvía**, para
   que un `atrás` hacia /admin sin permisos reemplace la entrada en vez de
   apilar una nueva."
  [db section opts]
  (cond
    (and (contains? protected-sections section)
         (not (logged-in? db)))
    {:db (-> db
             (assoc-in [:auth :redirect-after-login] section)
             (assoc-in [:ui :transitioning] true))
     :dispatch-later [{:ms 240 :dispatch [:complete-navigation :login opts]}]}

    ;; Solo redirigir si el perfil ya cargó (role known) y no es admin
    (and (= section :admin)
         (logged-in? db)
         (some? (get-in db [:auth :role]))
         (not (admin? db)))
    {:db (assoc-in db [:ui :transitioning] true)
     :dispatch-later [{:ms 240 :dispatch [:complete-navigation :dashboard opts]}]}

    ;; Currículum: transición de 350ms (más larga que el resto).
    (= section :jacobocordova)
    {:db (assoc-in db [:ui :transitioning] true)
     :dispatch-later [{:ms 350 :dispatch [:complete-navigation section opts]}]}

    :else
    {:db (assoc-in db [:ui :transitioning] true)
     :dispatch-later [{:ms 240 :dispatch [:complete-navigation section opts]}]}))

(re-frame/reg-event-fx
 :navigate-to
 (fn [{:keys [db]} [_ section opts]]
   (guard-section db section opts)))

;; ⚠ Sin llamadores hoy (verificado 2026-08-16). Cambia la sección **sin pasar
;; por la transición ni por el router**, así que dejaría la URL apuntando a la
;; sección anterior (T-05). Si alguna vez se necesita, usar `:navigate-to`.
(re-frame/reg-event-fx
 :set-section
 (fn [{:keys [db]} [_ section]]
   (cond
     (and (contains? protected-sections section)
          (not (logged-in? db)))
     {:db (assoc-in db [:auth :redirect-after-login] section)
      :dispatch [:navigate-to :login]}

     (and (= section :admin)
          (logged-in? db)
          (some? (get-in db [:auth :role]))
          (not (admin? db)))
     {:dispatch [:navigate-to :dashboard]}

     :else
     {:db (assoc-in db [:ui :current-section] section)})))

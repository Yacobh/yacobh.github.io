(ns universo.subs
  (:require
   [re-frame.core :as re-frame]
   [universo.db :as udb]
   [universo.router :as router]))

;;;; Subscriptions and events




;; Subscriptions


;; 1. Suscripción al estado de transición
(re-frame/reg-sub
 :transitioning
 (fn [db _]
   (get-in db [:ui :transitioning])))

;; dashboard- subscriptions
(re-frame/reg-sub
 :user-id
 (fn [db _]
   (get-in db [:dashboard :user-id])))

(re-frame/reg-sub
 :dashboard
 (fn [db _]
   (get-in db [:dashboard])))
;;------


(re-frame/reg-sub
 :db
 (fn [db _] db))

(re-frame/reg-sub
 :current-page
 (fn [db _]
   (get-in db [:ui :current-page])))

(re-frame/reg-sub
 :current-section
 (fn [db _]
   (get-in db [:ui :current-section])))

(re-frame/reg-sub
 :visitor
 (fn [db _]
   (get-in db [:visitor])))

(re-frame/reg-sub
 :visitor-id
 (fn [db _]
   (get-in db [:visitor :id])))

(re-frame/reg-sub
 :visitor-email
 (fn [db _]
   (get-in db [:visitor :email])))



;; Events

;; Vuelve al tope de la página al completar cualquier navegación entre
;; secciones — sin esto, cambiar de sección conserva el scroll de la
;; anterior (ej. entrar al currículum desde el link del footer aterrizaba
;; en el final de la página). Ocurre mientras el contenido está invisible
;; (opacity 0 durante la transición), así que no hay salto visible.
(re-frame/reg-fx
 :fx/scroll-window-top
 (fn [_]
   (.scrollTo js/window #js {:top 0 :left 0 :behavior "auto"})))

;; Completa la navegación tras la transición (el guard está en events.auth).
;;
;; Es también el **único** punto donde se escribe la URL (T-05, ADR-026):
;; ocurre después del guard, así que la barra de direcciones nunca muestra una
;; sección a la que el usuario no llegó. `opts` viene desde `:navigate-to`:
;;   :history → :push (default) | :replace | :none
;; `:replace` lo usan el popstate y la resolución de un deep link, donde la
;; entrada del historial ya existe y apilar otra rompería el botón atrás.
(re-frame/reg-event-fx
 :complete-navigation
 (fn [{:keys [db]} [_ section opts]]
   (let [path (router/section->path section)
         mode (:history opts :push)]
     (cond-> {:db (-> db
                      (assoc-in [:ui :current-section] section)
                      (assoc-in [:ui :transitioning] false))
              :fx/scroll-window-top nil}
       (and path (= mode :push))    (assoc :router/push path)
       (and path (= mode :replace)) (assoc :router/replace path)))))

;; dashboard events
(re-frame/reg-event-db
 :set-dashboard-user-id
 (fn [db [_ user-id]]
   (assoc-in db [:dashboard :user-id] user-id)))

(re-frame/reg-event-db
 :initialize-db
 (fn [_ _]
   udb/default-db))

(re-frame/reg-event-db
 :set-page
 (fn [db [_ new-page]]
   (assoc-in db [:ui :current-page] new-page)))

(re-frame/reg-sub
 :modal
 (fn [db _]
   (get-in db [:ui :modal])))

(re-frame/reg-event-db
 :show-modal
 (fn [db [_ modal-info]]
   (assoc-in db [:ui :modal] modal-info)))

(re-frame/reg-event-db
 :hide-modal
 (fn [db _]
   (assoc-in db [:ui :modal] nil)))

;; authentication

(re-frame/reg-event-db
 :set-visitor-id
 (fn [db [_ visitor-id]]
   (assoc-in db [:visitor :id] visitor-id)))

(re-frame/reg-event-db
 :set-visitor-email
 (fn [db [_ email]]
   (assoc-in db [:visitor :email] email)))

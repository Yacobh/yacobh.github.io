(ns universo.events.profile
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]
   [universo.profile :as profile]
   [universo.irt.progress :as progress]))

(re-frame/reg-sub
 :student-profile
 (fn [db _]
   (get-in db [:student-profile])))

(re-frame/reg-sub
 :student-profile/loading?
 (fn [db _]
   (get-in db [:student-profile :loading?] false)))

(re-frame/reg-sub
 :student-profile/theta-band
 (fn [db _]
   (or (get-in db [:student-profile :theta_band])
       (get-in db [:student-profile :profile :theta-band]))))

(re-frame/reg-sub
 :notifications
 (fn [db _]
   (get-in db [:notifications :items] [])))

(re-frame/reg-sub
 :notifications/unread
 (fn [db _]
   (->> (get-in db [:notifications :items] [])
        (remove :read)
        vec)))

(re-frame/reg-fx
 :profile/upsert!
 (fn [{:keys [user-id row]}]
   (when user-id
     (go
       (let [result (<! (crud/upsert-student-profile! row))]
         (if (:success result)
           (re-frame/dispatch [:profile/upserted (:data result)])
           (js/console.error "Error upsert perfil:" (:error result))))))))

(re-frame/reg-event-db
 :profile/upserted
 (fn [db [_ data]]
   (assoc db :student-profile
          (merge (or data {})
                 {:loading? false
                  :profile (or (:profile data)
                               (get-in db [:student-profile :profile]))}))))

(re-frame/reg-event-fx
 :profile/save-from-test
 (fn [{:keys [db]} _]
   (let [user-id (or (get-in db [:auth :user :id])
                     (get-in db [:dashboard :user-id]))
         test (:test db)
         responses (:responses test)
         questions (:questions test)
         theta (:theta test)
         se (progress/standard-error theta responses)
         built (profile/build {:theta theta
                              :se (when-not (infinite? se) se)
                              :topic (:topic test)
                              :responses responses
                              :questions questions
                              :theta-history (:theta-history test)
                              ;; Cortes del banco que se acaba de rendir, no los
                              ;; del banco tal como esté configurado el día que
                              ;; alguien lea este perfil (041).
                              :fluency-thresholds (get-in test [:stop-config :fluency-thresholds])})
         row {"user_id" user-id
              "theta" (:theta built)
              "theta_band" (:theta-band built)
              "profile" (clj->js built)
              "updated_at" (.toISOString (js/Date.))}]
     (if-not user-id
       {:db (assoc-in db [:student-profile :profile] built)}
       {:db (-> db
                (assoc-in [:student-profile :profile] built)
                (assoc-in [:student-profile :theta] (:theta built))
                (assoc-in [:student-profile :theta_band] (:theta-band built)))
        :profile/upsert! {:user-id user-id :row row}}))))

(re-frame/reg-fx
 :profile/fetch!
 (fn [user-id]
   (when user-id
     (go
       (let [result (<! (crud/fetch-student-profile user-id))]
         (if (:success result)
           (re-frame/dispatch [:profile/loaded (:data result)])
           (re-frame/dispatch [:profile/loaded nil])))))))

(re-frame/reg-event-fx
 :profile/load
 (fn [{:keys [db]} [_ user-id]]
   (let [uid (or user-id
                 (get-in db [:auth :user :id])
                 (get-in db [:dashboard :user-id]))]
     {:db (assoc-in db [:student-profile :loading?] true)
      :profile/fetch! uid})))

(re-frame/reg-event-fx
 :profile/loaded
 (fn [{:keys [db]} [_ data]]
   (let [profile-map (cond
                       (map? (:profile data)) (:profile data)
                       (string? (:profile data))
                       (try
                         (js->clj (.parse js/JSON (:profile data)) :keywordize-keys true)
                         (catch :default _ {}))
                       :else (or (:profile data) {}))
         section (get-in db [:ui :current-section])]
     (cond-> {:db (assoc db :student-profile
                         {:loading? false
                          :user_id (:user_id data)
                          :theta (:theta data)
                          :theta_band (:theta_band data)
                          :updated_at (:updated_at data)
                          :profile profile-map})}
       (#{:plan :cupos} section)
       (assoc :dispatch (if (= section :plan)
                          [:plan/load-resources]
                          [:slots/load]))))))

(re-frame/reg-fx
 :notifications/fetch!
 (fn [user-id]
   (when user-id
     (go
       (let [result (<! (crud/fetch-notifications user-id))]
         (if (:success result)
           (re-frame/dispatch [:notifications/loaded (:data result)])
           (re-frame/dispatch [:notifications/loaded []])))))))

(re-frame/reg-event-fx
 :notifications/load
 (fn [{:keys [db]} _]
   (let [uid (get-in db [:auth :user :id])]
     {:notifications/fetch! uid})))

(re-frame/reg-event-db
 :notifications/loaded
 (fn [db [_ items]]
   (assoc-in db [:notifications :items] (or items []))))

(re-frame/reg-fx
 :notifications/mark-read!
 (fn [ids]
   (go
     (doseq [id ids]
       (<! (crud/mark-notification-read! id)))
     (re-frame/dispatch [:notifications/load]))))

(re-frame/reg-event-fx
 :notifications/dismiss
 (fn [{:keys [db]} _]
   (let [ids (->> (get-in db [:notifications :items] [])
                  (remove :read)
                  (map :id)
                  vec)]
     {:db (assoc-in db [:notifications :items]
                    (mapv #(assoc % :read true)
                          (get-in db [:notifications :items] [])))
      :notifications/mark-read! ids})))

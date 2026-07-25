(ns universo.events.plan
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]))

(re-frame/reg-sub
 :plan/resources
 (fn [db _]
   (get-in db [:plan :resources] [])))

(re-frame/reg-sub
 :plan/loading?
 (fn [db _]
   (get-in db [:plan :loading?] false)))

(re-frame/reg-sub
 :plan/error
 (fn [db _]
   (get-in db [:plan :error])))

(re-frame/reg-sub
 :plan/layer0
 (fn [db _]
   (or (get-in db [:student-profile :profile :misconceptions])
       [])))

(re-frame/reg-sub
 :plan/deficits
 (fn [db _]
   (or (get-in db [:student-profile :profile :deficits])
       [])))

(re-frame/reg-event-fx
 :plan/enter
 (fn [{:keys [db]} _]
   (let [uid (get-in db [:auth :user :id])]
     {:db (assoc-in db [:plan :loading?] true)
      :dispatch-n [[:profile/load uid]
                   [:plan/load-resources]
                   [:notifications/load]]})))

(re-frame/reg-fx
 :plan/fetch-resources!
 (fn [module-ids]
   (go
     (let [result (if (seq module-ids)
                    (<! (crud/fetch-resources-for-modules module-ids))
                    (<! (crud/fetch-published-resources)))]
       (if (:success result)
         (re-frame/dispatch [:plan/resources-loaded (:data result)])
         (re-frame/dispatch [:plan/resources-failed
                             (or (:error result) "No se pudieron cargar recursos")]))))))

(re-frame/reg-event-fx
 :plan/load-resources
 (fn [{:keys [db]} _]
   (let [deficits (or (get-in db [:student-profile :profile :deficits]) [])
         ;; Prefer module ids from resources join; slug-only deficits → all published filtered client-side
         slugs (mapv :module-slug deficits)]
     {:db (-> db
              (assoc-in [:plan :loading?] true)
              (assoc-in [:plan :error] nil)
              (assoc-in [:plan :deficit-slugs] slugs))
      :plan/fetch-resources! nil})))

(re-frame/reg-event-db
 :plan/resources-loaded
 (fn [db [_ rows]]
   (let [slugs (set (get-in db [:plan :deficit-slugs] []))
         filtered (if (seq slugs)
                    (filterv (fn [r]
                               (or (contains? slugs (:module_slug r))
                                   (contains? slugs (get-in r [:modules :slug]))
                                   (empty? slugs)))
                             (or rows []))
                    (or rows []))]
     (-> db
         (assoc-in [:plan :resources] (if (seq filtered) filtered (or rows [])))
         (assoc-in [:plan :loading?] false)
         (assoc-in [:plan :error] nil)))))

(re-frame/reg-event-db
 :plan/resources-failed
 (fn [db [_ msg]]
   (-> db
       (assoc-in [:plan :loading?] false)
       (assoc-in [:plan :error] msg)
       (assoc-in [:plan :resources] []))))

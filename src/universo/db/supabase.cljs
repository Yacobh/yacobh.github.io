(ns universo.db.supabase
  (:require [cljs.core.async :as async]
            [universo.supabase :refer [supabase-client]]))

;; Asume que tienes tu cliente Supabase configurado


(defn add-guestbook-entry [entry-data]
  (-> supabase-client
      (.from "guestbook")
      (.insert (clj->js entry-data))
      (.select "*")
      (.single)
      (.then #(js->clj (.-data %) :keywordize-keys true))))

(defn get-guestbook-entries []
  (-> supabase-client
      (.from "guestbook")
      (.select "*")
      (.order "created_at" #js {:ascending false})
      (.limit 50)
      (.then #(js->clj (.-data %) :keywordize-keys true))))

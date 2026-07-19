(ns universo.db.supabase
  "API thin para guestbook (promises). Preferir universo.db.crud en código nuevo."
  (:require [cljs.core.async :refer [go <!]]
            [universo.db.crud :as crud]))

(defn- blank->nil [s]
  (when-not (or (nil? s) (= "" (str s)))
    s))

(defn- guestbook-row
  "Normaliza payload al esquema public.guestbook."
  [entry-data]
  (let [m (js->clj (clj->js entry-data) :keywordize-keys true)
        visitor (or (:id_visitor m) (:id-visitor m))
        vid (cond
              (nil? visitor) nil
              (number? visitor) visitor
              :else (let [n (js/parseInt (str visitor) 10)]
                      (when-not (js/isNaN n) n)))]
    (cond-> {"name" (str (:name m))
             "message" (blank->nil (:message m))
             "email" (blank->nil (:email m))
             "phone" (blank->nil (:phone m))
             "is_approved" false}
      vid (assoc "id_visitor" vid))))

(defn add-guestbook-entry
  "Insert sin .select(). Promise → true | reject error.
   Compatible con mathacademy y policies de solo-lectura de aprobados."
  [entry-data]
  (js/Promise.
   (fn [resolve reject]
     (go
       (let [result (<! (crud/insert-guestbook! (guestbook-row entry-data)))]
         (if (:success result)
           (resolve true)
           (reject (or (:error result) "Error al guardar en guestbook"))))))))

(defn get-guestbook-entries
  "Promise → vector de entradas aprobadas."
  []
  (js/Promise.
   (fn [resolve reject]
     (go
       (let [result (<! (crud/fetch-guestbook-entries))]
         (if (:success result)
           (resolve (:data result))
           (reject (or (:error result) "Error al cargar guestbook"))))))))

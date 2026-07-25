(ns universo.events.slots-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [re-frame.core :as re-frame]
   [re-frame.db :as rf-db]
   [universo.events.slots]))

(defn- set-db!
  "Fija app-db y limpia la caché de subs para forzar el recálculo."
  [m]
  (reset! rf-db/app-db m)
  (re-frame/clear-subscription-cache!))

(def ^:private slots
  [{:id 1 :theta_band "basico" :status "open"}
   {:id 2 :theta_band "basico" :status "cancelled"}
   {:id 3 :theta_band "intermedio" :status "open"}])

(defn- visible-ids []
  (mapv :id @(re-frame/subscribe [:slots/items])))

;; -----------------------------------------------------------------------------
;; Regresión: :slots/load y :profile/load salen en paralelo, así que los cupos
;; suelen llegar antes que la banda. Si el filtro se aplicara al guardar, la
;; lista quedaría vacía para siempre; al derivarse debe recalcularse sola.
;; -----------------------------------------------------------------------------

(deftest cupos-se-recalculan-cuando-el-perfil-llega-despues
  (testing "sin perfil todavía no se muestran cupos"
    (set-db! {:slots {:items slots}})
    (is (= [] (visible-ids))))

  (testing "al llegar la banda aparecen solo los cupos abiertos de esa banda"
    (set-db! {:slots {:items slots}
              :student-profile {:theta_band "basico"}})
    (is (= [1] (visible-ids))))

  (testing "los cupos crudos no se pierden al filtrar"
    (is (= [1 2 3] (mapv :id @(re-frame/subscribe [:slots/all-items]))))))

(deftest banda-se-lee-de-cualquiera-de-las-dos-formas
  (testing "perfil plano (columna theta_band)"
    (set-db! {:slots {:items slots}
              :student-profile {:theta_band "intermedio"}})
    (is (= "intermedio" @(re-frame/subscribe [:slots/band])))
    (is (= [3] (visible-ids))))

  (testing "perfil anidado (mapa :profile/:theta-band)"
    (set-db! {:slots {:items slots}
              :student-profile {:profile {:theta-band "basico"}}})
    (is (= "basico" @(re-frame/subscribe [:slots/band])))
    (is (= [1] (visible-ids)))))

(deftest banda-vacia-equivale-a-no-tener-banda
  (testing "cadena vacía se normaliza a nil para que la UI pida el diagnóstico"
    (set-db! {:slots {:items slots}
              :student-profile {:theta_band ""}})
    (is (nil? @(re-frame/subscribe [:slots/band])))
    (is (= [] (visible-ids)))))

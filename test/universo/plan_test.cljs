(ns universo.plan-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.plan :as plan]))

(def ^:private recursos
  "Muestra con las dos formas en que puede venir el slug (aplanado y desde el
   join de PostgREST), para que los tests cubran ambas rutas reales."
  [{:id "r1" :title "Enteros A" :module_slug "aritmetica/enteros"}
   {:id "r2" :title "Enteros B" :modules {:slug "aritmetica/enteros"}}
   {:id "r3" :title "Fracciones" :module_slug "aritmetica/fracciones"}
   {:id "r4" :title "Pitágoras" :module_slug "geometria/pitagoras"}])

(deftest resource-module-slug-acepta-ambas-formas
  (testing "slug aplanado por fetch-published-resources"
    (is (= "aritmetica/enteros"
           (plan/resource-module-slug {:module_slug "aritmetica/enteros"}))))

  (testing "slug dentro del join de PostgREST"
    (is (= "aritmetica/enteros"
           (plan/resource-module-slug {:modules {:slug "aritmetica/enteros"}}))))

  (testing "un recurso sin módulo no inventa slug"
    (is (nil? (plan/resource-module-slug {:id "huerfano"})))))

(deftest resources-for-deficits-personaliza
  (testing "solo devuelve los recursos de los módulos donde el estudiante falló"
    (let [{:keys [kind resources]}
          (plan/resources-for-deficits
           recursos
           [{:module-slug "aritmetica/fracciones" :errors 3 :total 4}])]
      (is (= :personalized kind))
      (is (= ["r3"] (mapv :id resources)))))

  (testing "respeta el orden de severidad: el módulo con más errores va primero"
    (let [{:keys [resources]}
          (plan/resources-for-deficits
           recursos
           ;; deficits-from-responses ya entrega ordenado de más a menos errores
           [{:module-slug "geometria/pitagoras" :errors 5 :total 5}
            {:module-slug "aritmetica/fracciones" :errors 1 :total 4}])]
      (is (= ["r4" "r3"] (mapv :id resources)))))

  (testing "agrupa todos los recursos de un mismo módulo, venga como venga el slug"
    (let [{:keys [resources]}
          (plan/resources-for-deficits
           recursos
           [{:module-slug "aritmetica/enteros" :errors 2 :total 3}])]
      (is (= ["r1" "r2"] (mapv :id resources))))))

(deftest resources-for-deficits-no-finge-personalizacion
  (testing "déficits sin módulo mapeado (unknown/*) NO se presentan como recomendación"
    ;; Este es el defecto que este namespace existe para impedir: antes el filtro
    ;; quedaba vacío y se devolvía la biblioteca completa como si fuera el plan.
    (let [{:keys [kind resources]}
          (plan/resources-for-deficits
           recursos
           [{:module-slug "unknown/PAES_M1" :errors 4 :total 6}])]
      (is (= :general kind))
      (is (= 4 (count resources)) "el material igual se ofrece, pero marcado como general")))

  (testing "sin déficits todavía (perfil recién cargado) tampoco hay recomendación"
    (is (= :general (:kind (plan/resources-for-deficits recursos []))))
    (is (= :general (:kind (plan/resources-for-deficits recursos nil)))))

  (testing "un déficit que sí mapea pero sin material publicado cae a general"
    (let [{:keys [kind resources]}
          (plan/resources-for-deficits
           recursos
           [{:module-slug "algebra/ecuaciones" :errors 3 :total 3}])]
      (is (= :general kind))
      (is (= 4 (count resources)))))

  (testing "sin recursos publicados no se rompe ni inventa lista"
    (let [{:keys [kind resources]}
          (plan/resources-for-deficits [] [{:module-slug "aritmetica/enteros"}])]
      (is (= :general kind))
      (is (= [] resources)))
    (is (= [] (:resources (plan/resources-for-deficits nil nil))))))

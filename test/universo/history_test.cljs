(ns universo.history-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.history :as hist]))

(def ^:private intentos
  [{:id 1 :tema "diagnostico" :fecha "2026-08-01T10:00:00Z" :theta -1.0 :porcentaje 20 :completado? true}
   {:id 2 :tema "diagnostico" :fecha "2026-08-05T10:00:00Z" :theta 0.5 :porcentaje 60 :completado? true}
   {:id 3 :tema "Diagnóstico" :fecha "2026-08-09T10:00:00Z" :theta 2.0 :porcentaje 90 :completado? true}
   {:id 4 :tema "mq_espin" :fecha "2026-08-07T10:00:00Z" :theta 0.2 :porcentaje 38 :completado? true}])

(deftest group-attempts-responde-la-pregunta-que-la-lista-cronologica-esconde
  (let [grupos (hist/group-attempts intentos)]
    (testing "una entrada por evaluación, la de actividad más reciente primero"
      (is (= 2 (count grupos)))
      (is (= ["diagnostico" "mq_espin"] (mapv :clave grupos))))

    (testing "los tres intentos de diagnóstico quedan juntos pese al acento y la mayúscula"
      ;; Es T-51 visto desde el tablero: sin canonizar, «Diagnóstico» sería una
      ;; evaluación aparte con un solo intento.
      (is (= 3 (:intentos (first grupos)))))

    (testing "el nombre mostrado es el del intento más reciente"
      (is (= "Diagnóstico" (:tema (first grupos)))))

    (testing "Δθ va del primer al último intento, no del peor al mejor"
      (is (= 3.0 (:delta (first grupos))))
      (is (= 2.0 (:theta-ultimo (first grupos))))
      (is (= 2.0 (:theta-mejor (first grupos)))))

    (testing "el historial completo sigue ahí, del más nuevo al más viejo"
      (is (= [3 2 1] (mapv :id (:historial (first grupos))))))))

(deftest delta-solo-existe-cuando-hay-con-que-comparar
  (testing "un solo intento no tiene delta: 0,0 se leería como «no avanzaste»"
    (is (nil? (:delta (first (hist/group-attempts
                              [{:id 1 :tema "t" :fecha "2026-08-01T10:00:00Z" :theta 1.0}]))))))

  (testing "un retroceso da delta negativo, no se esconde"
    (is (= -1.5 (:delta (first (hist/group-attempts
                                [{:id 1 :tema "t" :fecha "2026-08-01T10:00:00Z" :theta 1.0}
                                 {:id 2 :tema "t" :fecha "2026-08-02T10:00:00Z" :theta -0.5}])))))))

(deftest attempt-points-descarta-del-grafico-pero-no-del-conteo
  (let [con-abandono [{:id 1 :tema "t" :fecha "2026-08-01T10:00:00Z" :theta 1.0}
                      {:id 2 :tema "t" :fecha "2026-08-02T10:00:00Z" :theta nil}
                      {:id 3 :tema "t" :fecha "2026-08-03T10:00:00Z" :theta 1.5}]
        g (first (hist/group-attempts con-abandono))]
    (testing "el intento sin θ no es un punto del gráfico"
      (is (= 2 (count (:puntos g)))))

    (testing "…pero sí cuenta como intento: existió"
      (is (= 3 (:intentos g))))

    (testing "los puntos van del más viejo al más nuevo"
      (is (= [1.0 1.5] (mapv :theta (:puntos g)))))

    (testing "una fecha inválida no revienta ni ensucia el gráfico"
      (is (= [] (hist/attempt-points [{:fecha "no es fecha" :theta 1.0}]))))))

(deftest bordes
  (testing "vacío y nil"
    (is (= [] (hist/group-attempts [])))
    (is (= [] (hist/group-attempts nil))))

  (testing "un intento sin tema no crea un grupo fantasma"
    (is (= [] (hist/group-attempts [{:id 1 :tema nil :fecha "2026-08-01T10:00:00Z" :theta 1.0}])))
    (is (= [] (hist/group-attempts [{:id 1 :tema "   " :fecha "2026-08-01T10:00:00Z" :theta 1.0}])))))

(deftest totals-separa-evaluaciones-de-intentos
  (let [g (hist/group-attempts intentos)]
    (testing "«44 evaluaciones» eran en realidad 44 intentos sobre unas pocas"
      ;; `con-progreso` es 1 y no 2: `mq_espin` tiene un solo intento, así que no
      ;; tiene delta. Un intento único no es progreso ni estancamiento — todavía
      ;; no es nada, y contarlo como avance inflaría el número que más importa.
      (is (= {:evaluaciones 2 :intentos 4 :con-progreso 1} (hist/totals g)))))

  (testing "sin datos, todo en cero"
    (is (= {:evaluaciones 0 :intentos 0 :con-progreso 0} (hist/totals [])))))

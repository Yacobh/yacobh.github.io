(ns universo.events.dashboard-test
  (:require
   [cljs.test :refer-macros [deftest is testing run-tests]]
   [universo.events.dashboard :as dashboard]))

;; -----------------------------------------------------------------------------
;; Fixtures: filas tal como las devuelve Supabase (tests guardados con :save-test)
;; -----------------------------------------------------------------------------

(defn sample-test-row
  "Construye una fila de la tabla `tests` con el payload anidado en :test."
  [{:keys [id email end-time start-time theta-history responses created-at topic current-question]
    :or {id 1
         email "estudiante@unap.cl"
         end-time 1000000
         start-time 900000
         theta-history [-1.0 0.0 1.5]
         responses [{:correct? true  :question-id 1}
                    {:correct? false :question-id 2}
                    {:correct? true  :question-id 3}]
         created-at "2026-05-01T12:00:00.000Z"
         topic "numbers_V1"
         current-question 3}}]
  {:id id
   :email-user email
   :created_at created-at
   :test {:responses responses
          :end-time end-time
          :start-time start-time
          :theta-history theta-history
          :topic topic
          :current-question current-question
          :status :completed}})

(defn incomplete-test-row
  []
  (sample-test-row {:id 2
                    :end-time nil
                    :theta-history [-0.5]
                    :responses [{:correct? true :question-id 10}]}))

;; -----------------------------------------------------------------------------
;; Funciones que ya leen bien la estructura anidada (regresión)
;; -----------------------------------------------------------------------------

(deftest calcular-nota-lee-respuestas-anidadas
  (testing "calcular-nota usa [:test :responses]"
    (let [row (sample-test-row {})
          stats (dashboard/calcular-nota row)]
      (is (= 2 (:correctas stats)))
      (is (= 3 (:total stats)))
      (is (= 67 (:porcentaje stats))))))

(deftest procesar-ultimo-test-usa-estructura-supabase
  (testing "procesar-ultimo-test interpreta correctamente una fila de Supabase"
    (let [rows [(sample-test-row {:id 99 :topic "algebra"})]
          ultimo (dashboard/procesar-ultimo-test rows)]
      (is (= 99 (:id ultimo)))
      (is (= "algebra" (:tema ultimo)))
      (is (true? (:completado? ultimo)))
      (is (= 1.5 (:theta ultimo)))
      (is (= 2 (:correctas ultimo)))
      (is (= 3 (:total ultimo))))))

(deftest nota-de-test-con-fila-supabase
  (testing "nota-de-test calcula la nota desde el mapa anidado"
    ;; La nota es el porcentaje sin redondear
    (is (= 66.66666666666666 (dashboard/nota-de-test (sample-test-row {}))))))

(deftest duracion-y-promedio-por-pregunta
  (testing "duración se calcula sobre el mapa interno :test"
    (let [inner (:test (sample-test-row {}))]
      (is (= 100000 (dashboard/duracion-test-ms inner)))
      (is (= 1.7 (dashboard/duracion-test-min inner)))
      (is (= 33.3 (dashboard/promedio-tiempo-por-pregunta-seg inner))))))

;; -----------------------------------------------------------------------------
;; BUG TICKET-01: test-completado? y theta-final leen campos en la raíz
;; -----------------------------------------------------------------------------

(deftest test-completado-detecta-fila-supabase
  (testing "test-completado? debe mirar [:test :end-time], no :end-time en la raíz"
    (is (dashboard/test-completado? (sample-test-row {}))
        "Un test con end-time anidado debe contarse como completado")))

(deftest test-completado-rechaza-test-sin-fin
  (testing "test-completado? ignora filas sin end-time anidado"
    (is (not (dashboard/test-completado? (incomplete-test-row))))))

(deftest theta-final-lee-historial-anidado
  (testing "theta-final debe usar [:test :theta-history]"
    (is (= 1.5 (dashboard/theta-final (sample-test-row {})))
        "Debe retornar el último valor del historial IRT anidado")))

;; -----------------------------------------------------------------------------
;; BUG TICKET-01: calcular-estadisticas-generales queda en cero por el filtro roto
;; -----------------------------------------------------------------------------

(deftest calcular-estadisticas-cuenta-tests-completados
  (testing "tests-completados refleja filas con end-time en :test"
    (let [rows [(sample-test-row {:id 1})
                (sample-test-row {:id 2
                                  :end-time 2000000
                                  :start-time 1900000
                                  :theta-history [0.0 2.0]
                                  :responses [{:correct? true :question-id 1}]})]
          stats (dashboard/calcular-estadisticas-generales rows)]
      (is (= 2 (:total-tests stats)))
      (is (= 2 (:tests-completados stats))
          "Ambas filas tienen [:test :end-time]; ninguna debe quedar fuera del filtro"))))

(deftest calcular-estadisticas-promedio-nota
  (testing "promedio-nota promedia las notas de tests completados"
    (let [rows [(sample-test-row {:responses [{:correct? true :question-id 1}
                                              {:correct? false :question-id 2}]})
                (sample-test-row {:id 2
                                  :responses [{:correct? true :question-id 1}
                                              {:correct? true :question-id 2}]})]
          stats (dashboard/calcular-estadisticas-generales rows)]
      (is (= 75 (:promedio-nota stats))
          "Promedio de 50% y 100% debe ser 75"))))

(deftest calcular-estadisticas-theta-promedio
  (testing "theta-promedio usa el último theta de cada test completado"
    (let [rows [(sample-test-row {:theta-history [-1.0 0.5]})
                (sample-test-row {:id 2 :theta-history [0.0 1.5]})]
          stats (dashboard/calcular-estadisticas-generales rows)]
      (is (= 100 (:theta-promedio stats))))))

(deftest calcular-estadisticas-mezcla-completados-e-incompletos
  (testing "solo los tests con end-time cuentan para promedios"
    (let [rows [(sample-test-row {})
                (incomplete-test-row)]
          stats (dashboard/calcular-estadisticas-generales rows)]
      (is (= 2 (:total-tests stats)))
      (is (= 1 (:tests-completados stats)))
      (is (= 67 (:promedio-nota stats))
          "El promedio debe basarse solo en el test completado (67%)")
      (is (= 150 (:theta-promedio stats))
          "round(100 * 1.5) para el único test completado"))))

(deftest calcular-estadisticas-incluye-ultimo-test
  (testing "ultimo-test sigue presente aunque el filtro de completados falle"
    (let [rows [(sample-test-row {:id 42 :topic "geometria"})]
          stats (dashboard/calcular-estadisticas-generales rows)]
      (is (some? (:ultimo-test stats)))
      (is (= 42 (get-in stats [:ultimo-test :id])))
      (is (= "geometria" (get-in stats [:ultimo-test :tema]))))))

(deftest procesar-ultimo-elige-el-mas-reciente
  (testing "aunque el vector venga desordenado, gana el created_at más nuevo"
    (let [rows [(sample-test-row {:id 1 :created-at "2026-01-01T00:00:00.000Z" :topic "viejo"})
                (sample-test-row {:id 3 :created-at "2026-06-01T00:00:00.000Z" :topic "nuevo"})
                (sample-test-row {:id 2 :created-at "2026-03-01T00:00:00.000Z" :topic "medio"})]
          ultimo (dashboard/procesar-ultimo-test rows)
          historial (dashboard/procesar-historial rows)]
      (is (= 3 (:id ultimo)))
      (is (= "nuevo" (:tema ultimo)))
      (is (= [3 2 1] (mapv :id historial))))))

(run-tests)

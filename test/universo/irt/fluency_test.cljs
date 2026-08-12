(ns universo.irt.fluency-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.irt.effort :as effort]
   [universo.irt.fluency :as fluency]))

;; 200 caracteres ⇒ 10 s de lectura con `chars-per-second` = 20. Se usa un
;; enunciado de largo conocido para que los tiempos relativos den números
;; redondos y los tests digan qué esperan sin cuentas ocultas.
(def ^:private enunciado (apply str (repeat 200 "x")))
(def ^:private lectura-ms 10000) ;; 200 / 20 = 10 s

(defn- respuesta
  "Respuesta con tiempo expresado en múltiplos del tiempo de lectura."
  [{:keys [t-rel correct? weight text]
    :or {correct? true weight 1.0 text enunciado}}]
  (cond-> {:question-text text
           :correct? correct?
           :time-ms (* t-rel lectura-ms)
           :difficulty 0.0}
    (some? weight) (assoc :weight weight)))

;; -----------------------------------------------------------------------------
;; usable?
;; -----------------------------------------------------------------------------

(deftest usable-exige-las-tres-condiciones
  (testing "correcta, medida y esforzada"
    (is (fluency/usable? (respuesta {:t-rel 3}))))

  (testing "una respuesta incorrecta no es evidencia de fluidez"
    (is (not (fluency/usable? (respuesta {:t-rel 3 :correct? false})))))

  (testing "descartada por el filtro de esfuerzo (ADR-014) tampoco"
    (is (not (fluency/usable? (respuesta {:t-rel 0.5 :weight 0.0})))))

  (testing "sin tiempo medido tampoco: 0 es centinela de 'no medido'"
    (is (not (fluency/usable? {:question-text enunciado :correct? true :time-ms 0})))
    (is (not (fluency/usable? {:question-text enunciado :correct? true}))))

  (testing "sin :weight cuenta como esforzada — respuestas anteriores a ADR-014"
    (is (fluency/usable? {:question-text enunciado :correct? true :time-ms 30000}))))

;; -----------------------------------------------------------------------------
;; relative-time
;; -----------------------------------------------------------------------------

(deftest relative-time-normaliza-por-largo
  (testing "el mismo tiempo sobre enunciados distintos da fluidez distinta"
    (let [corto (apply str (repeat 20 "x"))  ;; 1 s de lectura
          largo (apply str (repeat 400 "x"))] ;; 20 s de lectura
      ;; 20 s de respuesta: sobre el corto es lentísimo, sobre el largo es
      ;; inmediato. Sin normalizar, los dos serían "20 segundos".
      (is (= 20.0 (fluency/relative-time {:time-ms 20000 :question-text corto})))
      (is (= 1.0 (fluency/relative-time {:time-ms 20000 :question-text largo})))))

  (testing "sin enunciado no hay con qué normalizar: nil, no división por cero"
    (is (nil? (fluency/relative-time {:time-ms 20000 :question-text ""})))
    (is (nil? (fluency/relative-time {:time-ms 20000}))))

  (testing "sin tiempo medido, nil"
    (is (nil? (fluency/relative-time {:time-ms 0 :question-text enunciado})))))

;; -----------------------------------------------------------------------------
;; classify
;; -----------------------------------------------------------------------------

(deftest classify-usa-mediana-y-resiste-el-outlier
  (testing "un ítem donde se fue a buscar agua no arrastra la medida"
    (let [rs [(respuesta {:t-rel 2}) (respuesta {:t-rel 2})
              (respuesta {:t-rel 2}) (respuesta {:t-rel 2})
              (respuesta {:t-rel 200})] ;; se distrajo 33 minutos
          {:keys [t-rel band n]} (fluency/classify rs)]
      (is (= 5 n))
      (is (= 2.0 t-rel) "la mediana ignora el outlier; el promedio daría 41,6")
      (is (= :fluida band)))))

(deftest classify-no-etiqueta-con-muestra-chica
  (testing "mide, pero no se pronuncia por debajo de min-responses"
    (let [{:keys [n t-rel band enough?]}
          (fluency/classify [(respuesta {:t-rel 2}) (respuesta {:t-rel 2})])]
      (is (= 2 n))
      (is (= 2.0 t-rel) "la medición existe")
      (is (nil? band) "la etiqueta no")
      (is (false? enough?))))

  (testing "sin ninguna respuesta usable devuelve mapa, no nil"
    (let [r (fluency/classify [])]
      (is (= 0 (:n r)))
      (is (nil? (:t-rel r)))
      (is (nil? (:lambda r)))
      (is (nil? (:band r))))))

(deftest classify-solo-cuenta-correctas-y-esforzadas
  (testing "las incorrectas y las descartadas no entran en la mediana"
    (let [rs [(respuesta {:t-rel 2}) (respuesta {:t-rel 2})
              (respuesta {:t-rel 2}) (respuesta {:t-rel 2})
              (respuesta {:t-rel 50 :correct? false})
              (respuesta {:t-rel 0.1 :weight 0.0})]
          {:keys [n t-rel]} (fluency/classify rs)]
      (is (= 4 n) "solo las cuatro correctas y esforzadas")
      (is (= 2.0 t-rel)))))

(deftest lambda-es-el-reciproco-y-va-en-la-direccion-del-libro
  (testing "λ alta = más fluido"
    (let [rapido (fluency/classify (repeat 4 (respuesta {:t-rel 2})))
          lento (fluency/classify (repeat 4 (respuesta {:t-rel 10})))]
      (is (= 0.5 (:lambda rapido)))
      (is (= 0.1 (:lambda lento)))
      (is (> (:lambda rapido) (:lambda lento))))))

;; -----------------------------------------------------------------------------
;; band
;; -----------------------------------------------------------------------------

(deftest band-respeta-los-umbrales-y-sus-bordes
  (is (= :fluida (fluency/band 1.0)))
  (is (= :fluida (fluency/band 3.0)) "el borde inferior es inclusivo")
  (is (= :media (fluency/band 3.01)))
  (is (= :media (fluency/band 6.0)) "el borde superior es inclusivo")
  (is (= :laboriosa (fluency/band 6.01)))
  (is (nil? (fluency/band nil)))

  (testing "los umbrales son parámetro, no constante enterrada — T-59 los va a mover"
    (is (= :laboriosa (fluency/band 3.0 {:fluida 1.0 :media 2.0})))))

;; -----------------------------------------------------------------------------
;; Umbrales por banco (041)
;; -----------------------------------------------------------------------------

(deftest thresholds-from-config-lee-la-configuracion-del-banco
  (testing "usa los cortes de la fila de test_configs"
    (is (= {:fluida 2.0 :media 4.5}
           (fluency/thresholds-from-config {:topic "mq_momento_angular"
                                            :fluency_fluida_max 2.0
                                            :fluency_media_max 4.5}))))

  (testing "sin config (041 sin aplicar, o banco inexistente) cae a los defaults"
    (is (= fluency/default-thresholds (fluency/thresholds-from-config nil)))
    (is (= fluency/default-thresholds (fluency/thresholds-from-config {})))
    (is (= fluency/default-thresholds
           (fluency/thresholds-from-config {:fluency_fluida_max nil
                                            :fluency_media_max nil}))))

  (testing "valores invertidos o absurdos caen a los defaults en vez de producir bandas imposibles"
    (is (= fluency/default-thresholds
           (fluency/thresholds-from-config {:fluency_fluida_max 6.0
                                            :fluency_media_max 3.0})))
    (is (= fluency/default-thresholds
           (fluency/thresholds-from-config {:fluency_fluida_max 0
                                            :fluency_media_max 6.0})))))

(deftest el-mismo-tiempo-cambia-de-banda-segun-el-banco
  (testing "es el punto de T-65: 2,19 en un banco conceptual no es lo mismo que en uno mecánico"
    (let [rs (repeat 5 (respuesta {:t-rel 2.19}))
          paes (fluency/thresholds-from-config {:fluency_fluida_max 3.0
                                                :fluency_media_max 6.0})
          cuantica (fluency/thresholds-from-config {:fluency_fluida_max 2.0
                                                    :fluency_media_max 4.5})]
      (is (= :fluida (:band (fluency/classify rs paes)))
          "con los cortes pensados para PAES, 2,19 es fluidez")
      (is (= :media (:band (fluency/classify rs cuantica)))
          "con cortes exigentes, el mismo tiempo deja de serlo")
      (is (= 2.19 (:t-rel (fluency/classify rs paes)))
          "la MEDICIÓN no cambia: lo que cambia es dónde se pone el corte"))))

;; -----------------------------------------------------------------------------
;; El cruce θ × λ
;; -----------------------------------------------------------------------------

(deftest profile-for-cubre-los-cuatro-cuadrantes
  (is (= :consolidado (:id (fluency/profile-for "avanzado" :fluida))))
  (is (= :consolidado (:id (fluency/profile-for "intermedio" :fluida))))
  (is (= :sabe-pero-lento (:id (fluency/profile-for "avanzado" :laboriosa))))
  (is (= :rapido-sin-base (:id (fluency/profile-for "basico" :fluida))))
  (is (= :en-construccion (:id (fluency/profile-for "inicial" :media))))

  (testing "la banda media cae del lado no fluido (ante la duda, ofrecer práctica)"
    (is (= :sabe-pero-lento (:id (fluency/profile-for "avanzado" :media)))))

  (testing "sobrevive al round-trip por JSONB, donde las keywords vuelven strings"
    ;; Este es el caso real: el perfil se guarda en student_profiles.profile y
    ;; al releerlo `:fluida` llegó como "fluida". Sin esto el cuadrante se vería
    ;; al terminar el test y desaparecería al recargar.
    (is (= :consolidado (:id (fluency/profile-for :avanzado :fluida))))
    (is (= :consolidado (:id (fluency/profile-for "avanzado" "fluida"))))
    (is (= :sabe-pero-lento (:id (fluency/profile-for "avanzado" "laboriosa"))))
    (is (= (fluency/profile-for :basico :media)
           (fluency/profile-for "basico" "media"))))

  (testing "sin alguno de los dos ejes no se etiqueta a nadie"
    (is (nil? (fluency/profile-for "avanzado" nil)))
    (is (nil? (fluency/profile-for nil :fluida)))
    (is (nil? (fluency/profile-for "desconocido" :fluida)))))

(deftest cada-perfil-trae-una-accion-distinta
  (testing "la razón de existir del eje: la acción cambia entre cuadrantes"
    (let [acciones (map :accion (vals fluency/profiles))]
      (is (= 4 (count fluency/profiles)))
      (is (= 4 (count (distinct acciones))))
      (is (every? seq acciones)))))

;; -----------------------------------------------------------------------------
;; Coherencia con el filtro de esfuerzo
;; -----------------------------------------------------------------------------

(deftest reusa-la-constante-de-lectura-de-effort
  (testing "no hay una segunda definición de 'cuánto se tarda en leer'"
    (is (= (effort/reading-seconds enunciado)
           (/ lectura-ms 1000.0))
        "si effort/chars-per-second cambia, este test avisa y fluency lo sigue")))

;; -----------------------------------------------------------------------------
;; calibration-report
;; -----------------------------------------------------------------------------

(deftest calibration-report-describe-sin-decidir
  (testing "entrega la distribución para reemplazar los umbrales autorales"
    (let [rs (map #(respuesta {:t-rel %}) (range 1 11))
          {:keys [n min max mediana deciles]} (fluency/calibration-report rs)]
      (is (= 10 n))
      (is (= 1.0 min))
      (is (= 10.0 max))
      (is (= 5.5 mediana))
      (is (= 9 (count deciles)))))

  (testing "sin datos usables, nil"
    (is (nil? (fluency/calibration-report [])))
    (is (nil? (fluency/calibration-report [(respuesta {:t-rel 3 :correct? false})])))))

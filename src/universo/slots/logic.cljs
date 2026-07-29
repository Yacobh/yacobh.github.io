(ns universo.slots.logic
  "Funciones puras para cupos e inscripción (espejo de reglas DB).")

(defn filter-slots-for-band
  "Cupos visibles para una banda: open/confirmed y misma theta_band.
   Si band es nil, ninguno (hace falta diagnóstico)."
  [slots band]
  (if-not (and band (seq (str band)))
    []
    (->> (or slots [])
         (filter (fn [s]
                   (and (= (str (:theta_band s)) (str band))
                        (contains? #{"open" "confirmed"} (str (:status s))))))
         vec)))

(defn active-enrollment-count
  "Cuenta enrollments activos (pending|confirmed)."
  [enrollments]
  (->> (or enrollments [])
       (filter #(contains? #{"pending" "confirmed"} (str (:status %))))
       count))

(defn remaining-to-confirm
  "Inscritos que faltan para alcanzar min_enrollments (0 si ya alcanza)."
  [active-count min-enrollments]
  (max 0 (- (long (or min-enrollments 0))
            (long (or active-count 0)))))

(defn capacity-reached?
  "Espejo del trigger enforce_slot_capacity: true si el cupo ya no admite más
   inscripciones activas."
  [active-count capacity]
  (>= (long (or active-count 0))
      (long (or capacity 0))))

(defn should-confirm-slot?
  "Espejo del trigger: confirma si hay al menos min_enrollments activos
   y el cupo sigue open."
  [slot-status active-count min-enrollments]
  (and (= (str slot-status) "open")
       (pos? (long (or min-enrollments 0)))
       (>= (long (or active-count 0))
           (long min-enrollments))))

(defn after-enrollment
  "Dado estado del cupo + conteo tras inscribir, devuelve status resultante
   y remaining."
  [{:keys [status min_enrollments]} active-count]
  (let [min-n (or min_enrollments 0)
        confirm? (should-confirm-slot? status active-count min-n)]
    {:status (if confirm? "confirmed" (str status))
     :confirmed? confirm?
     :remaining (if confirm? 0 (remaining-to-confirm active-count min-n))
     :active-count active-count}))

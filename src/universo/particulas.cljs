(ns universo.particulas)

(defn create-particle
  "Crea una partícula cuántica con propiedades iniciales."
  [{:keys [mass charge initial-position]}]
  (let [id (random-uuid)
        position (vec initial-position)
        momentum (vec (repeat 3 0))] ;; Inicializa el momentum a cero
    {:id id
     :mass mass
     :charge charge
     :position position
     :momentum momentum}))

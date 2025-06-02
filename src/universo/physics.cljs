(ns universo.physics)

;; Generador de partículas cuánticas simplificado
(defn generate-quantum-particles [n]
  (vec
   (for [i (range n)]
     {:id (random-uuid)
      :x (rand-int 800)
      :y (rand-int 600)
      :momentum (- (rand 2) 1)
      :energy (rand)})))

;; Función de movimiento simple
(defn update-particle-position [particle]
  (-> particle
      (update :x + (:momentum particle))
      (update :y + (:momentum particle))))

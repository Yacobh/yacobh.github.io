(ns universo.access
  "Funciones puras: qué tests (topics) puede iniciar un usuario según la
   cadena de prerrequisitos en test_configs y su propio historial en tests.
   El avance no se guarda en una tabla de permisos aparte: se deriva del
   historial real de tests rendidos (ver supabase/migrations/020, 021).")

(defn best-theta-by-topic
  "rows: [{:topic :theta} ...] del historial de tests de un usuario.
   Devuelve {topic -> mejor theta alcanzado}, porque un test se puede volver
   a rendir y el mejor intento es el que cuenta para desbloquear otros."
  [rows]
  (reduce (fn [acc {:keys [topic theta]}]
            (if (and topic theta)
              (update acc topic (fn [best] (if best (max best theta) theta)))
              acc))
          {}
          rows))

(defn unlocked-topics
  "configs: filas de test_configs tal como llegan de Supabase, con las
   columnas snake_case originales ({:topic :active :prerequisite_topic
   :min_theta} ...) — sin capa de conversión a kebab-case, siguiendo la
   convención ya usada en el proyecto (:theta_band, :module_id, etc.).
   achieved: {topic -> mejor theta}, resultado de best-theta-by-topic.
   Un topic está desbloqueado si está activo, y además:
   - no tiene prerequisite_topic (es un diagnóstico), o
   - el prerequisite_topic ya fue rendido y, si hay min_theta, se alcanzó."
  [configs achieved]
  (letfn [(prereq-met? [{:keys [prerequisite_topic]}]
            (or (nil? prerequisite_topic)
                (contains? achieved prerequisite_topic)))
          (theta-met? [{:keys [prerequisite_topic min_theta]}]
            (or (nil? min_theta)
                (when-let [theta (get achieved prerequisite_topic)]
                  (>= theta min_theta))))]
    (->> configs
         (filter :active)
         (filter prereq-met?)
         (filter theta-met?)
         (map :topic)
         set)))

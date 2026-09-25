(ns universo.vistos
  "Qué ítems ya vio un estudiante en intentos anteriores del mismo topic, y
   cuáles se excluyen al elegir el siguiente (Q-46, T-174).

   ── Por qué ────────────────────────────────────────────────────────────────
   Un segundo intento que repite ítems no es una medición nueva: el estudiante
   ya vio la pregunta, la corrección y la explicación de su error. Con el banco
   de `electronica` (16 ítems, máximo 8 por test) un reintento servía casi los
   mismos ítems, y el θ subía por memoria, no por aprendizaje. La regla del owner
   (2026-09-25): cada intento guarda su θ y no se toca; **cuál cuenta** se decide
   después, con varias variables — y una de ellas es si el intento repitió.

   ── Qué cuenta como visto ──────────────────────────────────────────────────
   Todo ítem que aparece en `:responses` de un intento anterior, **incluidos los
   escapes** (ADR-029): el estudiante leyó el enunciado aunque no respondiera.
   Se leen dos fuentes porque ninguna alcanza sola:

     · `tests.test`       — los diagnósticos terminados, también los anteriores
                            a `070`.
     · `intentos.parcial` — los abandonados, que desde `070` dejan rastro. Un
                            estudiante que vio cinco ítems y cerró la pestaña
                            ya los vio.

   ── Qué pasa cuando no quedan ítems sin ver ────────────────────────────────
   El test **no se corta**: se vuelve a pedir sin los vistos y el intento queda
   marcado con los ítems que repitió (`repetidos`). Cortarlo dejaría a un
   estudiante con cero ítems en su tercer intento de `electronica`, y la
   decisión de si el intento cuenta no le toca a la pantalla sino a quien lea
   la medición.

   Lógica pura (CLAUDE.md §5): quien lee de Supabase es `universo.db.crud`, y
   quien decide cuándo, `universo.events.test`.")

(defn ids-de-respuestas
  "Los `question-id` de un vector de respuestas, sin nulos."
  [responses]
  (into #{} (keep :question-id) responses))

(defn ids-vistos
  "Conjunto de ítems ya vistos a partir de filas con `:responses`. Cada fila es
   el jsonb de un intento (`tests.test` o `intentos.parcial`) o directamente un
   vector de respuestas; filas nulas o sin respuestas no aportan nada."
  [filas]
  (reduce (fn [acc fila]
            (into acc (ids-de-respuestas (if (map? fila) (:responses fila) fila))))
          #{}
          filas))

(defn a-excluir
  "Ids que no se pueden servir: los del intento en curso siempre, y los vistos
   en intentos anteriores salvo que ya se haya agotado el banco sin ellos."
  [respondidos vistos repitiendo?]
  (if repitiendo?
    (set respondidos)
    (into (set respondidos) vistos)))

(defn reintentar-con-vistos?
  "El banco devolvió nada con la exclusión completa: ¿vale la pena pedir de
   nuevo dejando entrar los vistos? Solo si había vistos que excluir y todavía
   no se estaba repitiendo."
  [vistos repitiendo?]
  (and (not repitiendo?) (seq vistos) true))

(defn repetidos
  "Ítems del intento en curso que ya se habían visto antes, en orden de
   aparición. Vacío en un intento que no repitió nada."
  [responses vistos]
  (let [vistos (set vistos)]
    (into [] (comp (keep :question-id) (filter vistos) (distinct)) responses)))

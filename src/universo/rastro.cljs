(ns universo.rastro
  "El rastro que deja un intento **en curso**: qué se persiste en `intentos`
   mientras el estudiante responde, y cuándo un intento abierto pasa a contar
   como abandonado (T-134, ADR-036, migración `070`).

   ── No confundir con `universo.intento` ────────────────────────────────────
   `universo.intento` reconstruye para el panel un intento **terminado**, a
   partir de una fila de `tests`. Este namespace es lo contrario: arma lo que se
   escribe **mientras** el intento todavía puede no terminar nunca.

   ── Qué problema resuelve ──────────────────────────────────────────────────
   Hasta `070` el único `insert` del diagnóstico salía de `:test/complete`. Un
   estudiante que respondía ocho ítems y cerraba la pestaña no dejaba nada: ni
   fila, ni respuestas, ni el ítem en el que se fue. Eso impedía responder
   «cuáles no lo hicieron» (G-1) y **sesgaba la calibración** (G-2), porque los
   ítems que hacen abandonar desaparecían de la muestra.

   ── Lógica pura, como todo lo que decide algo (CLAUDE.md §5) ───────────────
   Acá no hay I/O. Lo único que este namespace hace es **decidir qué se manda**
   y **decir si un intento está abandonado**; quien escribe en Supabase es
   `universo.db.crud`, y quien decide cuándo, `universo.events.test`.

   ── ⚠️ Dos reglas que este namespace **no** es dueño de ─────────────────────
   1. **La ventana de abandono.** La fuente de verdad es
      `public.intento_abandonado()` en `070`. `abandonado?` es su espejo y tiene
      test propio, con el mismo criterio con que la confirmación de cupo se
      testea en `universo.slots.logic` documentando que manda el trigger SQL
      (CLAUDE.md §8). Si cambia la ventana, cambia primero en SQL.
   2. **Que no viaje ninguna identidad.** `parcial` ya sale recortado, pero el
      límite real es el trigger `intentos_sellar`, que le saca `email` y
      `email-user` al jsonb venga de donde venga. Esto es UX; eso es seguridad
      (CLAUDE.md §7.4).")

;; -----------------------------------------------------------------------------
;; Qué se guarda de un test en curso
;; -----------------------------------------------------------------------------

(def claves-del-rastro
  "Las únicas claves del mapa `:test` que viajan a `intentos.parcial`.

   Es una **lista blanca y no una lista negra** a propósito: el mapa `:test` de
   `app-db` crece —ya le pasó con `:escape-resources`, `:editor` y
   `:stop-config`— y una lista negra deja entrar en silencio lo que nadie
   agregó a la lista. Lo que no está acá, no sale del navegador.

   Qué queda afuera y por qué:

     · `:questions` — el enunciado completo, las cuatro alternativas y el
       módulo de cada ítem servido. Pesa, y se reescribiría entero en cada una
       de las ~17 respuestas de un test. Lo que la calibración necesita está en
       cada respuesta: `question-id`, `difficulty`, `weight`, `module-slug`.
     · `:email` — la clave que obligó a crear `tests_sin_identidad` el
       2026-09-18 (L-46). Nunca sale de acá.
     · `:feedback`, `:current-question`, `:prefetched-question`, `:editor`,
       `:escape-resources`, `:configs`, `:available-topics`, `:scoring?` —
       estado de pantalla. No dice nada del intento.
     · `:traits` — stub muerto desde ADR-019."
  #{:responses :theta :theta-history :theta-initial :stop-reason :topic
    :stop-config :start-time})

(def ^:private claves-de-identidad
  "Lo que no puede viajar aunque alguien lo agregue a `claves-del-rastro`.
   Segundo cinturón del lado del cliente; el de la base es `intentos_sellar`."
  #{:email :email-user "email" "email-user"})

(defn parcial
  "El jsonb que se guarda en `intentos.parcial` a partir del mapa `:test` de
   `app-db`. Recortado por lista blanca y sin ninguna clave de identidad.

   Devuelve `{}` para un test nulo: una fila recién abierta es un intento sin
   respuestas, no un error."
  [test]
  (-> (select-keys (or test {}) claves-del-rastro)
      (as-> m (apply dissoc m claves-de-identidad))))

(defn n-respuestas
  "Cuántas respuestas lleva el intento. Se denormaliza en su propia columna
   porque `jsonb_array_length(parcial->'responses')` en un `where` no usa
   índice, y «cuántos respondieron al menos uno» es la consulta que más se va
   a hacer."
  [test]
  (count (:responses test)))

(defn fila-de-apertura
  "La fila que se inserta al abrir el diagnóstico.

   `origin` **no se manda**: lo escribe el trigger `intentos_marcar_origen` a
   partir de `public.is_admin()`, y mandarlo no serviría de nada porque el
   trigger pisa siempre el valor entrante (mismo criterio que `tests.origin` en
   `067`). Tampoco se mandan `iniciado_en` ni `updated_at`: el reloj del
   abandono es el del servidor.

   Claves string = nombres exactos de columnas en Postgres, como en
   `:save-test`."
  [{:keys [id user-id topic engine-version test]}]
  {"id" (str id)
   "user_id" (str user-id)
   "topic" topic
   "engine_version" engine-version
   "parcial" (parcial test)
   "n_respuestas" (n-respuestas test)})

(defn fila-de-latido
  "Lo que se reescribe después de cada respuesta. **El rastro entero, no un
   parche**: así deshacer la última respuesta (`:test/reintentar-ultimo`,
   ADR-032) queda reflejado solo, sin ninguna operación de borrado."
  [test]
  {"parcial" (parcial test)
   "n_respuestas" (n-respuestas test)})

(def marca-de-cierre
  "Lo que el cliente manda en `cerrado_en` para decir «ciérralo».

   ⚠️ **No es la hora del cierre, y a propósito.** La primera versión mandaba
   `(.toISOString (js/Date.))`, y la verificación contra PostgREST encontró el
   agujero: un navegador con el reloj atrasado hace fallar el `update` entero
   por el check `intentos_cierre_posterior`, el intento se queda abierto para
   siempre y **alguien que terminó su diagnóstico cuenta como abandono** — en la
   única métrica que T-134 existe para producir.

   Ahora el trigger `intentos_sellar` pisa este valor con `now()` del servidor.
   Se manda una época válida y no un string cualquiera porque PostgREST tiene
   que poder convertirlo a `timestamptz` antes de que el trigger llegue a
   mirarlo; cuál sea da igual, nunca se guarda."
  "1970-01-01T00:00:00.000Z")

(defn fila-de-cierre
  "El último latido, con el sello. A partir de acá la policy
   `intentos_update_own` deja la fila fuera de alcance para siempre: el rastro
   de un test terminado es tan inmutable como la fila de `tests` que lo
   acompaña."
  [test]
  (assoc (fila-de-latido test) "cerrado_en" marca-de-cierre))

;; -----------------------------------------------------------------------------
;; Cuándo un intento abierto cuenta como abandonado
;; -----------------------------------------------------------------------------

(def ventana-de-abandono-ms
  "Dos horas, **espejo de `public.intento_abandonado()`** en `070`.

   Por qué dos horas: el diagnóstico dura 5,8 minutos de mediana, medido sobre
   corridas reales (SESSION-046, que refutó el supuesto de los 20 minutos). Dos
   horas son ~20 veces esa mediana y más que cualquier `max_minutes` de
   `test_configs`, así que no existe la sesión lenta pero real que esta ventana
   pueda clasificar mal. Es ancha a propósito: el error caro es decirle
   «abandonó» a quien está pensando, no tardar en contarlo."
  (* 2 60 60 1000))

(defn abandonado?
  "true si el intento no se cerró y hace más de `ventana-de-abandono-ms` que no
   late. `ahora-ms` y `updated-at-ms` en milisegundos de época.

   Nadie escribe «abandonado» en ninguna parte: quien cierra la pestaña no
   avisa. El estado se deriva, y por eso no hace falta ningún job de limpieza."
  ([intento ahora-ms] (abandonado? intento ahora-ms ventana-de-abandono-ms))
  ([{:keys [cerrado-en updated-at-ms]} ahora-ms ventana-ms]
   (and (nil? cerrado-en)
        (number? updated-at-ms)
        (number? ahora-ms)
        (> (- ahora-ms updated-at-ms) ventana-ms))))

;; -----------------------------------------------------------------------------
;; Degradación cuando `070` todavía no está aplicada (R-39)
;; -----------------------------------------------------------------------------

(def ^:private senales-de-tabla-ausente
  "Fragmentos que PostgREST usa cuando la relación no existe. Se busca el
   nombre y no un código porque los códigos cambian entre versiones
   (mismo criterio que `motor/falta-la-columna-de-version?`):
   `PGRST205` («Could not find the table 'public.intentos' in the schema
   cache»), `PGRST204` para la columna, y `42P01`/`42703` de Postgres."
  ["intentos" "intento_id" "PGRST205" "PGRST204" "42P01" "42703"])

(defn falta-la-tabla?
  "true si un error de escritura se debe a que `070` no está aplicada todavía.

   Existe porque las migraciones de este proyecto se aplican **a mano** y el
   bundle puede adelantarse (R-39, materializado dos veces). Cuando esto da
   true, el cliente apaga el rastro para el resto de la sesión en vez de
   reintentar en cada respuesta: **el diagnóstico nunca se bloquea por no poder
   dejar rastro**. Perder el rastro de un intento es malo; perder el intento,
   peor."
  [error]
  (let [msg (str error)]
    (boolean (and (seq msg)
                  (some #(not= -1 (.indexOf msg %)) senales-de-tabla-ausente)))))

(defn fila-sin-intento
  "La fila de `tests` sin `intento_id`, para el reintento de `:save-test`
   cuando `070` no está aplicada. Mismo criterio que el reintento sin
   `engine_version` de `048`: un test sin enlace a su rastro se puede
   reconstruir mirando la fecha; un test que nunca se guardó, no."
  [row]
  (dissoc row "intento_id"))

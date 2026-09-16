(ns universo.fuente
  "La etiqueta de campaña que trae la URL (`?de=tarjeta`) — T-135, migración
   `061`, vector **G-5** de [[../../project-memory/TESIS_DE_CRECIMIENTO]].

   Es la mitad cliente de `061`: sin esto la columna `visitor.fuente` existe y
   queda siempre en `null`, o sea que el panel de visitantes puede decir cuánta
   gente nueva llegó pero no **por dónde**, que es la única pregunta que
   justifica volver a imprimir tarjetas.

   ── Qué es y qué no es ─────────────────────────────────────────────────────
   Es una etiqueta **que elegimos e imprimimos nosotros** —`tarjeta`, `afiche`,
   `instagram`—, no una huella de quien visita. No se guarda la query string
   entera a propósito: ahí es donde una etiqueta de campaña se convierte, sin
   querer, en un campo libre con datos personales (`CLAUDE.md` §7.6). No se
   agrega ningún dato nuevo sobre la persona.

   ── Por qué el formato se valida de los dos lados ──────────────────────────
   El valor viene de la URL, o sea de un input que cualquiera puede escribir.
   El límite real es el check `visitor_fuente_formato` de `061`; esto es el
   mismo criterio adelantado al cliente, para no mandar basura por la red.
   **La autoridad sigue siendo la base:** si las dos reglas se separan, gana la
   de `061` y hay que corregir esta.

   El invariante que hace que no puedan contradecirse en los datos: lo que sale
   de `normalizar` o es `nil` o ya cumple el check, así que la fila guardada
   dice exactamente lo que el cliente calculó.

   ── Se pierde la etiqueta, nunca la visita ─────────────────────────────────
   Una etiqueta que no cumple el formato devuelve `nil`, no un error: un QR mal
   impreso o una URL manipulada no puede impedir que la visita se registre.
   Perder la etiqueta es barato; perder la fila, no."
  (:require [clojure.string :as str]))

;; Espejo del check `visitor_fuente_formato` (`061`). Va sin anclas porque
;; `re-matches` ya exige coincidencia total: con `^…$` habría que acordarse
;; además de que en JavaScript el `$` no es multilínea, que es justo el agujero
;; por el que se cuela una etiqueta con salto de línea en otros lenguajes.
(def ^:private formato #"[a-z0-9._-]{1,40}")

;; La clave de la query string. Es `de` y no `utm_source` porque va impresa en
;; un QR de una tarjeta: se escribe a mano, se dicta por teléfono y se lee en la
;; barra de direcciones sin que parezca que rastreamos a nadie.
(def ^:private clave "de")

(def argumento
  "Nombre del argumento del RPC. Vive acá para que el cliente y el mensaje de
   error hablen del mismo string, igual que `motor/column-name`."
  "p_fuente")

(defn falta-el-argumento-de-fuente?
  "true si un error de PostgREST se debe a que la sobrecarga de cinco argumentos
   de `track_visitor` no existe todavía — o sea, a que `061` no está aplicada.

   Mismo patrón y misma razón que `motor/falta-la-columna-de-version?` (R-39):
   las migraciones de este proyecto se aplican a mano y el bundle puede
   adelantarse. Medido el 2026-09-16 contra PostgREST real, la respuesta es
   `PGRST202` («Could not find the function public.track_visitor(p_ciudad,
   p_fuente, …) in the schema cache»); se busca el nombre del argumento y no el
   código, que cambia entre versiones de PostgREST.

   El costo de equivocarse acá es alto en un solo sentido, y por eso la
   condición es estrecha: reintentar de más pierde la etiqueta, **no** la
   visita; no reintentar cuando corresponde pierde la fila entera y con ella el
   `visitor-id` que el guestbook usa como FK."
  [error]
  (let [msg (str error)]
    (and (seq msg)
         (not= -1 (.indexOf msg argumento)))))

(defn normalizar
  "Etiqueta cruda → forma canónica, o `nil` si no es una etiqueta usable.

   Mismo orden que `061`: se recortan los espacios, se baja a minúsculas, y
   recién ahí se valida el formato."
  [etiqueta]
  (when (string? etiqueta)
    (let [limpia (str/lower-case (str/trim etiqueta))]
      (when (re-matches formato limpia)
        limpia))))

(defn de-query
  "La etiqueta de campaña de una query string, o `nil` si no hay ninguna usable.

   `\"?de=tarjeta&x=1\"` → `\"tarjeta\"` · `\"?de=TARJETA\"` → `\"tarjeta\"` ·
   `\"?x=1\"` → `nil`

   Se mira **el primer** `de=` y no el primero que resulte válido: ante
   `?de=basura&de=tarjeta` la respuesta correcta es `nil`, porque dejar que el
   segundo rescate al primero es inventarse una atribución.

   No se decodifica `%XX` a propósito. Las etiquetas que imprimimos usan solo
   `[a-z0-9._-]`, que ningún navegador codifica; una que llegue codificada es,
   por definición, una que nosotros no imprimimos, y cae en la regla de la
   docstring del namespace."
  [query]
  (->> (-> (or query "")
           (str/replace #"^\?" "")
           (str/split #"&"))
       (map #(str/split % #"=" 2))
       (filter #(= clave (str/lower-case (str/trim (or (first %) "")))))
       first
       second
       normalizar))

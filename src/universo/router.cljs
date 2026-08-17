(ns universo.router
  "Traducción entre las secciones de `app-db` y las rutas de URL (T-05, ADR-026).

   Acá no se toca `js/window` ni `app-db` a propósito: esto es una tabla y tres
   funciones puras, para que `clj -M:test` pueda probarlas. El acceso al History
   API vive en `universo.events.router`.

   **La URL es un reflejo de la sección, nunca su origen de autoridad.** Quien
   decide qué sección se monta sigue siendo `:navigate-to`, con sus guards de
   sesión en `universo.events.auth`; este namespace solo dice qué sección
   *pretende* una URL. Si fuera al revés, un deep link a `/admin` se saltaría el
   guard."
  (:require
   [clojure.string :as str]))

;; Las rutas van en español porque son de cara al público: la URL es copy
;; (L-20). Las claves son exactamente las secciones del `case` de
;; `universo.home/main-content` — si se agrega una sección allá, va acá.
(def ^:private section->path-table
  {:main            "/"
   :login           "/ingresar"
   ;; Registro tiene ruta propia y no es un modo de `/ingresar`: es el paso más
   ;; caro del embudo, así que tiene que sobrevivir a un refresh y poder
   ;; medirse aparte del regreso de alguien que ya tiene cuenta (T-20).
   :registro        "/registrarse"
   :diagnostic-test "/diagnostico"
   :dashboard       "/tablero"
   :plan            "/plan"
   :cupos           "/cupos"
   :cuenta          "/cuenta"
   :admin           "/admin"
   :guestbook       "/libro-de-visitas"
   :jacobocordova   "/profesor"
   :privacidad      "/privacidad"})

(def ^:private path->section-table
  (reduce-kv (fn [m section path] (assoc m path section))
             {}
             section->path-table))

;; Rutas que no son canónicas pero que un usuario puede escribir o tener
;; guardadas. No se generan nunca: solo se reconocen al entrar, y `:router/init`
;; las normaliza con `replaceState`.
(def ^:private alias->section
  {"/index.html" :main})

(defn normalize-path
  "Lleva un path a la forma canónica de la tabla: sin query ni fragmento, en
   minúsculas, con `/` inicial, sin `/` finales ni `/` repetidos.

   `\"/Plan/?x=1#y\"` → `\"/plan\"` · `\"\"` → `\"/\"`"
  [path]
  (let [sin-query (first (str/split (or path "") #"[?#]"))
        s (-> (or sin-query "")
              str/lower-case
              (str/replace #"/+" "/"))
        s (if (str/starts-with? s "/") s (str "/" s))]
    (if (and (> (count s) 1) (str/ends-with? s "/"))
      (subs s 0 (dec (count s)))
      s)))

(defn section->path
  "Path canónico de una sección, o nil si la sección no es enrutable (ej.
   `:not-found`, que se muestra sin cambiar la URL que el usuario escribió)."
  [section]
  (get section->path-table section))

(defn path->section
  "Sección que pretende una URL, o nil si no corresponde a ninguna ruta."
  [path]
  (let [p (normalize-path path)]
    (or (get path->section-table p)
        (get alias->section p))))

(defn entry
  "Decide qué hacer con la URL con la que se abrió la aplicación.

   `protected?` es un predicado sobre la sección (en producción,
   `universo.events.auth/protected-sections`). Se recibe como argumento en vez
   de importarlo para no acoplar este namespace a auth y poder probarlo solo.

   - `{:kind :section :section s :path p}` — ruta pública: se monta de una.
   - `{:kind :pending :section s}` — ruta protegida: **no se puede decidir
     todavía**. La sesión se rehidrata de forma asíncrona (`:auth/init`), así
     que mandar al login en este momento echaría a un usuario que sí tiene
     sesión. Queda pendiente hasta que auth resuelva.
   - `{:kind :not-found}` — ruta desconocida: 404 del propio SPA, sin tocar la
     URL (la escribió el usuario y verla ayuda a entender el error)."
  [path protected?]
  (if-let [section (path->section path)]
    (if (protected? section)
      {:kind :pending :section section}
      {:kind :section :section section :path (section->path section)})
    {:kind :not-found}))

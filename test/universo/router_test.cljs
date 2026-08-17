(ns universo.router-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.events.auth :as auth]
   [universo.router :as router]))

;; -----------------------------------------------------------------------------
;; Tabla de rutas
;; -----------------------------------------------------------------------------

(deftest rutas-del-criterio-de-cierre
  (testing "las cuatro rutas que T-05 exige existen y son las esperadas"
    (is (= "/plan" (router/section->path :plan)))
    (is (= "/cupos" (router/section->path :cupos)))
    (is (= "/diagnostico" (router/section->path :diagnostic-test)))
    (is (= "/admin" (router/section->path :admin)))))

(deftest ida-y-vuelta-de-todas-las-secciones
  (testing "toda sección enrutable vuelve a sí misma pasando por su path"
    (doseq [section [:main :login :registro :diagnostic-test :dashboard :plan
                     :cupos :cuenta :admin :guestbook :jacobocordova :privacidad]]
      (is (= section (router/path->section (router/section->path section)))
          (str "no vuelve: " section)))))

(deftest secciones-de-home-tienen-ruta
  ;; Espejo del `case` de universo.home/main-content: si allá se agrega una
  ;; sección y acá no, queda una pantalla sin URL y este test lo dice.
  (testing "cada sección que main-content sabe montar tiene path"
    (doseq [section [:main :login :registro :diagnostic-test :dashboard :cuenta
                     :plan :cupos :admin :guestbook :jacobocordova :privacidad]]
      (is (some? (router/section->path section)) (str "sin ruta: " section)))))

(deftest registro-e-ingreso-son-rutas-distintas
  ;; El registro dejó de ser un modo de `/ingresar`: es el paso más caro del
  ;; embudo, tiene que sobrevivir a un refresh y medirse aparte (T-20).
  (testing "cada una tiene su propia ruta, y ninguna está protegida"
    (is (= "/ingresar" (router/section->path :login)))
    (is (= "/registrarse" (router/section->path :registro)))
    (is (not= (router/section->path :login) (router/section->path :registro)))
    (is (not (contains? auth/protected-sections :registro))))

  (testing "un deep link a /registrarse monta la sección de una, sin esperar a auth"
    (is (= {:kind :section :section :registro :path "/registrarse"}
           (router/entry "/Registrarse/" auth/protected-sections)))))

(deftest not-found-no-tiene-ruta
  (testing ":not-found no se escribe en la URL: se muestra sobre la que el usuario escribió"
    (is (nil? (router/section->path :not-found)))
    (is (nil? (router/section->path :inventada)))))

;; -----------------------------------------------------------------------------
;; Normalización
;; -----------------------------------------------------------------------------

(deftest normalize-path-forma-canonica
  (testing "path ya canónico no cambia"
    (is (= "/plan" (router/normalize-path "/plan")))
    (is (= "/" (router/normalize-path "/"))))

  (testing "corta query y fragmento"
    (is (= "/plan" (router/normalize-path "/plan?utm_source=x")))
    (is (= "/plan" (router/normalize-path "/plan#seccion")))
    (is (= "/plan" (router/normalize-path "/plan?a=1#b"))))

  (testing "minúsculas, barra inicial y sin barra final"
    (is (= "/plan" (router/normalize-path "/Plan/")))
    (is (= "/plan" (router/normalize-path "plan")))
    (is (= "/cupos" (router/normalize-path "//cupos//"))))

  (testing "entradas degeneradas no revientan"
    (is (= "/" (router/normalize-path "")))
    (is (= "/" (router/normalize-path nil)))
    (is (= "/" (router/normalize-path "?a=1")))))

(deftest path-desconocido-es-nil
  (is (nil? (router/path->section "/no-existe")))
  (is (nil? (router/path->section "/plan/extra"))))

(deftest alias-de-entrada
  (testing "/index.html es la raíz, no un 404"
    (is (= :main (router/path->section "/index.html")))
    (is (= :main (router/path->section "/INDEX.HTML")))))

;; -----------------------------------------------------------------------------
;; Decisión de entrada
;; -----------------------------------------------------------------------------

(deftest entry-ruta-publica
  (testing "una ruta pública se monta de inmediato y se normaliza"
    (is (= {:kind :section :section :privacidad :path "/privacidad"}
           (router/entry "/Privacidad/" auth/protected-sections)))
    (is (= {:kind :section :section :main :path "/"}
           (router/entry "/" auth/protected-sections)))))

(deftest entry-ruta-protegida-queda-pendiente
  ;; El punto del ticket: la sesión se rehidrata de forma asíncrona, así que
  ;; decidir en este momento mandaría al login a un usuario que sí tiene sesión.
  (testing "las cuatro rutas protegidas del criterio quedan pendientes"
    (doseq [[path section] [["/plan" :plan]
                            ["/cupos" :cupos]
                            ["/diagnostico" :diagnostic-test]
                            ["/admin" :admin]]]
      (is (= {:kind :pending :section section}
             (router/entry path auth/protected-sections))))))

(deftest entry-ruta-desconocida
  (is (= {:kind :not-found} (router/entry "/cualquier-cosa" auth/protected-sections))))

(deftest toda-seccion-protegida-es-enrutable
  ;; Si mañana se agrega una sección a protected-sections sin ruta, un deep link
  ;; a ella terminaría en 404 en vez de en el login.
  (testing "protected-sections ⊆ rutas conocidas"
    (doseq [section auth/protected-sections]
      (is (some? (router/section->path section)) (str "protegida sin ruta: " section)))))

;; -----------------------------------------------------------------------------
;; Destino tras resolverse la sesión (universo.events.auth, puro)
;; -----------------------------------------------------------------------------

(deftest post-session-target-prioridades
  (testing "login explícito manda al destino guardado"
    (is (= [:cupos nil] (auth/post-session-target {:navigate? true :redirect :cupos}))))

  (testing "login explícito sin destino guardado va al tablero"
    (is (= [:dashboard nil] (auth/post-session-target {:navigate? true}))))

  (testing "deep link pendiente se resuelve reemplazando la entrada del historial"
    (is (= [:plan {:history :replace}]
           (auth/post-session-target {:pending :plan}))))

  (testing "el login explícito gana sobre el deep link pendiente"
    (is (= [:cupos nil]
           (auth/post-session-target {:navigate? true :redirect :cupos :pending :plan}))))

  (testing "rehidratación normal de sesión no navega"
    (is (nil? (auth/post-session-target {})))
    (is (nil? (auth/post-session-target {:navigate? false :redirect :plan})))))

(deftest post-clear-target-prioridades
  (testing "deep link a ruta protegida sin sesión va al login"
    (is (= [:login {:history :replace}] (auth/post-clear-target {:pending :admin}))))

  (testing "logout pedido explícitamente hacia el login"
    (is (= [:login nil] (auth/post-clear-target {:navigate-to-login? true}))))

  (testing "cerrar sesión estando en una sección protegida devuelve al inicio"
    (is (= [:main nil] (auth/post-clear-target {:current-section :plan})))
    (is (= [:main nil] (auth/post-clear-target {:current-section :admin}))))

  (testing "cerrar sesión en una sección pública no mueve al usuario"
    (is (nil? (auth/post-clear-target {:current-section :main})))
    (is (nil? (auth/post-clear-target {:current-section :guestbook})))
    (is (nil? (auth/post-clear-target {})))))

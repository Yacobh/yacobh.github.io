(ns universo.fuente-test
  (:require [cljs.test :refer-macros [deftest is testing]]
            [universo.fuente :as f]))

;; Los casos hostiles de acá son los mismos que se corrieron contra un
;; PostgreSQL 14.18 desechable el 2026-09-16 (T-135): si alguno de los dos lados
;; cambia de opinión, este test y el check `visitor_fuente_formato` de `061`
;; dejan de coincidir, y el que manda es `061`.

(deftest normalizar-acepta-las-etiquetas-que-imprimimos
  (testing "las tres etiquetas reales de la campaña"
    (is (= "tarjeta" (f/normalizar "tarjeta")))
    (is (= "afiche" (f/normalizar "afiche")))
    (is (= "instagram" (f/normalizar "instagram"))))
  (testing "mayúsculas y espacios se corrigen en vez de descartarse: un QR mal
            tipeado sigue siendo atribuible"
    (is (= "tarjeta" (f/normalizar "TARJETA")))
    (is (= "tarjeta" (f/normalizar "  Tarjeta  "))))
  (testing "los separadores permitidos"
    (is (= "afiche-2026" (f/normalizar "afiche-2026")))
    (is (= "instagram.stories_1" (f/normalizar "instagram.stories_1")))))

(deftest normalizar-devuelve-nil-en-vez-de-fallar
  (testing "nada que normalizar"
    (is (nil? (f/normalizar nil)))
    (is (nil? (f/normalizar "")))
    (is (nil? (f/normalizar "   ")))
    (is (nil? (f/normalizar 42))))
  (testing "la etiqueta viene de la URL, así que se prueba con URL hostil"
    (is (nil? (f/normalizar "<script>alert(1)</script>")))
    (is (nil? (f/normalizar "' or 1=1--")))
    (is (nil? (f/normalizar "tarjeta qr")))
    (is (nil? (f/normalizar "tarjetá")))
    (is (nil? (f/normalizar "https://otro.sitio"))))
  (testing "el salto de línea no parte la etiqueta en dos: `re-matches` exige
            coincidencia total y no hay `$` que se deje engañar"
    (is (nil? (f/normalizar "tarjeta\nDROP TABLE visitor"))))
  (testing "el largo máximo es 40, igual que el check de 061"
    (is (= 40 (count (f/normalizar (apply str (repeat 40 "a"))))))
    (is (nil? (f/normalizar (apply str (repeat 41 "a")))))))

(deftest normalizar-nunca-produce-algo-que-la-base-rechace
  (testing "el invariante del namespace: o es nil, o pasa el check de 061"
    (doseq [crudo ["tarjeta" "  AFICHE-2026 " "instagram.stories_1"
                   "<script>" "" nil "tarjeta qr" (apply str (repeat 41 "a"))]]
      (let [r (f/normalizar crudo)]
        (is (or (nil? r) (re-matches #"^[a-z0-9._-]{1,40}$" r))
            (str "no cumple el check de 061: " (pr-str crudo) " → " (pr-str r)))))))

(deftest de-query-lee-la-etiqueta-de-la-url
  (testing "la URL del QR, con y sin el `?`"
    (is (= "tarjeta" (f/de-query "?de=tarjeta")))
    (is (= "tarjeta" (f/de-query "de=tarjeta"))))
  (testing "acompañada de otros parámetros, en cualquier posición"
    (is (= "tarjeta" (f/de-query "?de=tarjeta&x=1")))
    (is (= "afiche" (f/de-query "?x=1&de=afiche&y=2"))))
  (testing "la clave también se normaliza"
    (is (= "tarjeta" (f/de-query "?DE=Tarjeta"))))
  (testing "sin etiqueta no hay atribución, y eso no es un error"
    (is (nil? (f/de-query nil)))
    (is (nil? (f/de-query "")))
    (is (nil? (f/de-query "?")))
    (is (nil? (f/de-query "?x=1")))
    (is (nil? (f/de-query "?de=")))
    (is (nil? (f/de-query "?de")))
    (is (nil? (f/de-query "?desde=tarjeta")))))

(deftest de-query-no-deja-que-un-segundo-de-rescate-al-primero
  (testing "el primer `de=` manda: si es basura, la visita queda sin etiqueta"
    (is (nil? (f/de-query "?de=<script>&de=tarjeta"))))
  (testing "y si el primero es bueno, el segundo no lo pisa"
    (is (= "tarjeta" (f/de-query "?de=tarjeta&de=afiche")))))

;; ── La red que evita que R-39 pierda la visita entera ───────────────────────
;; Los dos mensajes de abajo son literales, capturados de un PostgREST real el
;; 2026-09-16: el primero contra una base sin `061`, el segundo es el error que
;; **no** debe reintentarse, porque reintentar sin `p_fuente` no lo arreglaría.

(def ^:private error-sin-061
  (str "Could not find the function public.track_visitor(p_ciudad, p_fuente, "
       "p_idioma, p_pais, p_timezone) in the schema cache"))

(deftest reintenta-solo-cuando-falta-la-migracion
  (testing "PGRST202 nombra el argumento que la base no conoce"
    (is (f/falta-el-argumento-de-fuente? error-sin-061)))
  (testing "un fallo de RLS no se reintenta: sin 061 igual habría fallado, y el
            reintento solo serviría para esconder el error de permisos"
    (is (not (f/falta-el-argumento-de-fuente?
              "new row violates row-level security policy for table \"visitor\""))))
  (testing "ni un error de red, ni uno vacío"
    (is (not (f/falta-el-argumento-de-fuente? "TypeError: Failed to fetch")))
    (is (not (f/falta-el-argumento-de-fuente? "")))
    (is (not (f/falta-el-argumento-de-fuente? nil))))
  (testing "el nombre del argumento es el mismo string de los dos lados"
    (is (= "p_fuente" f/argumento))))

(deftest de-query-no-decodifica-porcentajes
  (testing "una etiqueta codificada es una que nosotros no imprimimos"
    (is (nil? (f/de-query "?de=tarjeta%20qr")))
    (is (nil? (f/de-query "?de=%3Cscript%3E")))))

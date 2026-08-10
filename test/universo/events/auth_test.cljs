(ns universo.events.auth-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.events.auth :as auth]))

(deftest protected-sections-incluye-producto
  (testing "dashboard, diagnostic-test y admin requieren sesión"
    (is (contains? auth/protected-sections :dashboard))
    (is (contains? auth/protected-sections :diagnostic-test))
    (is (contains? auth/protected-sections :admin))
    (is (not (contains? auth/protected-sections :main)))
    (is (not (contains? auth/protected-sections :login)))))

(deftest logged-in-lee-auth-user
  (testing "logged-in? depende de :auth :user"
    (is (false? (auth/logged-in? {:auth {:user nil}})))
    (is (false? (auth/logged-in? {})))
    (is (true? (auth/logged-in? {:auth {:user {:id "1" :email "a@b.cl"}}})))))

(deftest admin-flag
  (testing "admin? lee :auth :admin?"
    (is (false? (auth/admin? {})))
    (is (false? (auth/admin? {:auth {:admin? false}})))
    (is (true? (auth/admin? {:auth {:admin? true}})))))

(deftest js-user-nil-seguro
  (is (nil? (auth/js-user->map nil))))

(def ^:private sesion-lista
  {:auth {:ready? true :user {:id "u-1" :email "a@b.cl"}}})

(deftest session-refresh-reconoce-el-refresco-de-token
  ;; T-58: Supabase emite TOKEN_REFRESHED al recuperar visibilidad la pestaña.
  ;; Si eso se trata como sesión nueva, se desmonta la sección activa y el
  ;; usuario pierde lo que estaba escribiendo.
  (testing "mismo usuario sobre una sesión ya lista: no hay nada que reconstruir"
    (is (true? (auth/session-refresh? sesion-lista {:id "u-1" :email "a@b.cl"}))))

  (testing "la sesión todavía no está lista: hay que establecerla"
    (is (false? (auth/session-refresh?
                 {:auth {:ready? false :user {:id "u-1" :email "a@b.cl"}}}
                 {:id "u-1" :email "a@b.cl"}))))

  (testing "otro usuario: es una sesión nueva, no un refresco"
    (is (false? (auth/session-refresh? sesion-lista {:id "u-2" :email "c@d.cl"}))))

  (testing "mismo id con correo distinto (USER_UPDATED) sí reestablece"
    (is (false? (auth/session-refresh? sesion-lista {:id "u-1" :email "nuevo@b.cl"}))))

  (testing "sin usuario en db no es refresco"
    (is (false? (auth/session-refresh? {:auth {:ready? true}} {:id "u-1" :email "a@b.cl"}))))

  (testing "evento sin id no cuenta como refresco"
    (is (false? (auth/session-refresh? sesion-lista {:id nil :email "a@b.cl"})))
    (is (false? (auth/session-refresh? sesion-lista {}))))

  (testing "db vacía no revienta"
    (is (false? (auth/session-refresh? {} {:id "u-1" :email "a@b.cl"})))))

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

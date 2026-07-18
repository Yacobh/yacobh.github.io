(ns universo.events.auth-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [universo.events.auth :as auth]))

(deftest protected-sections-incluye-producto
  (testing "dashboard y diagnostic-test requieren sesión"
    (is (contains? auth/protected-sections :dashboard))
    (is (contains? auth/protected-sections :diagnostic-test))
    (is (not (contains? auth/protected-sections :main)))
    (is (not (contains? auth/protected-sections :login)))))

(deftest logged-in-lee-auth-user
  (testing "logged-in? depende de :auth :user"
    (is (false? (auth/logged-in? {:auth {:user nil}})))
    (is (false? (auth/logged-in? {})))
    (is (true? (auth/logged-in? {:auth {:user {:id "1" :email "a@b.cl"}}})))))

(deftest js-user-nil-seguro
  (is (nil? (auth/js-user->map nil))))

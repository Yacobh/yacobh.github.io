(ns universo.user)

(go (let [res (<! (get-table "questions" {"topic" "enteros"
                                          "difficulty" [:lt 30]}))]
      (js/console.log res)))
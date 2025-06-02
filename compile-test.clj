(require '[cljs.build.api :as b])

(b/build "test"
         {:main 'core-test
          :output-to "out/tests.js"
          :output-dir "out"
          :target :nodejs})

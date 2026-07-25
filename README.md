
### Notas del proyecto

- Ejecuta el proyecto con: `clojure -M:shadow-cljs watch app`
- Schema MVP (módulos, perfil, recursos, cupos): ver `supabase/SCHEMA.md` y aplicar `supabase/migrations/` en orden
- Funnel: diagnóstico IRT → Mi plan → Cupos (confirmación al mínimo de inscritos)

### Development mode
```
clojure -M:shadow-cljs watch app
```
start a ClojureScript REPL
```
npx shadow-cljs browser-repl
```
### Building for production

```
npx shadow-cljs release app
```

clj -M:test

### to watch css
npm run watch:css

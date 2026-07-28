# Prompt: despliegue

Para publicar cambios en producción (<https://jacobocordova.com>).

> ⚠️ **`main` es producción.** No hay staging, no hay CI y **el bundle compilado es el mecanismo de
> deploy** (ADR-003): un cambio en `src/` no llega a producción hasta que se recompile y se commitee
> `public/js/app.js`.

---

## Prompt

```
Despliegue solicitado: <QUÉ SE VA A PUBLICAR>

Antes de publicar:
1. Lee CLAUDE.md §9 y adr/ADR-003-github-pages-artefacto-versionado.md.
2. Lee project-memory/CURRENT_STATUS.md §9 (estado del repositorio).
3. Ejecuta y muéstrame la salida de:
   git status
   git log main..HEAD --oneline
   clj -M:test

Entrega el plan de despliegue con verificación en cada paso, y detente antes de
cualquier push o merge para que yo lo autorice.

Después de publicar, verifica en el sitio real que el funnel completo funciona
(login → diagnóstico → perfil → plan → cupos) e informa qué comprobaste.
```

---

## Notas

### Procedimiento completo

```bash
# 1. Estado conocido
git status                       # el árbol debe estar limpio (salvo lo que vas a publicar)
git log main..HEAD --oneline      # ¿qué falta por publicar?

# 2. Verificación
clj -M:test                      # DEBE quedar en 0 failures / 0 errors — no hay CI

# 3. Compilación
npx shadow-cljs release app      # → public/js/app.js
npm run build:css                # → public/css/app.css (si cambiaron clases de Tailwind)

# 4. Commit del artefacto (ESTE commit es el deploy)
git add public/js/app.js public/css/app.css
git commit -m "Compilar bundle de producción"

# 5. Publicar
#    (con autorización explícita del owner)
git checkout main && git merge <rama>
git push origin main

# 6. Verificación en producción
#    https://jacobocordova.com — probar el funnel completo, no solo que la página cargue
```

### Estado actual a resolver antes de publicar

- `public/js/app.js` tiene **cambios sin commitear** (+73/−24) cuyo origen no está verificado (R-13,
  T-08). Decide: recompilar desde el fuente actual y commitear, o descartar.
- `cursor/mvp-operable-funnel` **puede no estar mergeada a `main`** (Q-13, T-19). Verifica antes de
  afirmar qué hay en producción.

### Checklist previo

- [ ] `clj -M:test` en verde
- [ ] `npx shadow-cljs release app` ejecutado **después** del último cambio en `src/`
- [ ] `npm run build:css` si cambiaron clases de Tailwind
- [ ] Si cambió copy: los **tres** lugares sincronizados (`index.html`, `public/index.html`,
      `landing.cljs`) — L-22
- [ ] Si el cambio requiere una migración SQL: **aplicada primero** en Supabase, en orden
      (`supabase/SCHEMA.md`). El código nuevo contra un esquema viejo falla en producción
- [ ] Si el cambio toca Edge Functions: `supabase functions deploy` + secretos verificados
- [ ] Sin secretos en el diff
- [ ] Autorización explícita del owner para tocar `main`

### Verificación posterior (no basta con que cargue)

1. La landing carga con estilos y sin errores en consola.
2. Login con una cuenta de prueba.
3. Diagnóstico: al menos 3 preguntas, con feedback y KaTeX renderizado.
4. Perfil: θ, banda y déficits visibles.
5. "Mi plan": muestra algo coherente (o el estado vacío correcto).
6. "Cupos": lista filtrada por la banda de la cuenta de prueba.
7. Panel admin (con cuenta admin): las pestañas cargan.

### Reversión

`git revert <commit-del-bundle>` + `git push` devuelve producción al estado anterior. **Ojo:** si el
cambio incluía una migración SQL, revertir el código **no** revierte el esquema — hay que revisar si el
código anterior sigue siendo compatible.

### Riesgos vigentes

R-13 (bundle desalineado del fuente) · R-04 (sin CI: nada impide publicar con tests rojos) · R-05
(divergencia del copy entre los tres lugares) · R-02 (las migraciones se aplican sobre producción).

### Al terminar

`CURRENT_STATUS.md` con qué quedó publicado y en qué commit; session log con los comandos y la
verificación realizada. Si algo del checklist se omitió, dilo explícitamente.

# ADR-003: GitHub Pages con el bundle compilado versionado en Git

## Estado

Aprobada

## Fecha

2025-09-16 (documentada retroactivamente el 2026-07-26)

## Contexto

> **Contexto reconstruido** desde `.gitignore`, `CNAME`, `shadow-cljs.edn`, la presencia de
> `public/js/app.js` en el índice de Git y el commit `3680cb4`.

El repositorio es `yacobh.github.io`, es decir un **user site** de GitHub Pages: GitHub sirve
automáticamente el contenido de la rama por defecto (`main`) desde la raíz, sin build step. El
dominio propio `jacobocordova.com` se configura con `CNAME`.

Situación:

- No hay CI ni pipeline de build (no existe `.github/`).
- El artefacto de la SPA se produce con `npx shadow-cljs release app`, que requiere JVM, Clojure CLI y
  dependencias Maven/npm — no algo que GitHub Pages ejecute por sí solo.
- GitHub Pages **puede** ejecutar Actions para construir, pero eso implica montar y mantener el
  workflow.
- Un solo desarrollador; el objetivo es publicar con `git push`.

En algún momento se versionó también el runtime de desarrollo (`public/js/cljs-runtime/`, miles de
archivos), lo que infló el repositorio; el commit `3680cb4` lo corrigió vía `.gitignore`.

## Decisión

Se publica en **GitHub Pages desde la rama `main`, raíz del repositorio**, y **el bundle compilado
`public/js/app.js` se versiona en Git**. También se versiona `public/css/app.css` (salida de Tailwind).

Se **excluyen** del control de versiones los artefactos de desarrollo:
`public/js/cljs-runtime/`, `public/js/manifest.edn`, `*.js.map`, `node_modules/`, `.shadow-cljs/`,
`.cpcache/`, `out/`.

**Corolario operativo:** el despliegue consiste en

```bash
clj -M:test                    # la única red de seguridad (no hay CI)
npx shadow-cljs release app    # produce public/js/app.js
npm run build:css              # si cambiaron clases de Tailwind
git commit                     # el commit del bundle ES el deploy
```

Un cambio en `src/` **no llega a producción** hasta que se recompile y se commitee el bundle.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| GitHub Actions que compile y publique en `gh-pages` | Es la opción correcta a mediano plazo: elimina el artefacto del historial y garantiza que el bundle corresponda al fuente. Se descartó por el costo inicial de montar y mantener el workflow (JDK + Clojure CLI + cachés) con un solo desarrollador. **Queda como candidata natural cuando se implemente T-06** |
| Netlify / Vercel / Cloudflare Pages con build remoto | Resuelve el build y da previews por rama, pero agrega un proveedor más al stack y el dominio ya está en Pages funcionando |
| Rama `gh-pages` manual con solo artefactos | Mantiene `main` limpio, pero duplica el trabajo manual de publicación y complica el flujo (dos ramas a sincronizar a mano) |
| Servir ClojureScript sin compilar (dev build) | Inviable: peso y rendimiento inaceptables en producción |

## Consecuencias

**Positivas**

- **Publicar es `git push`.** No hay build server que falle, ni credenciales de deploy, ni pipeline que
  mantener.
- Rollback trivial: `git revert` del commit del bundle devuelve producción al estado anterior.
- El artefacto exacto que corre en producción está en el historial: se puede inspeccionar qué se
  publicó en cada momento.
- Costo $0 y disponibilidad de la CDN de GitHub.

**Negativas / costos aceptados**

- **El bundle puede desalinearse del fuente.** Es posible commitear código sin recompilar (producción
  se queda atrás) o commitear un bundle que no corresponde al fuente actual. **Esto está ocurriendo
  hoy**: `public/js/app.js` tiene cambios sin commitear cuyo origen no está verificado (R-13, T-08).
- **Diffs ilegibles y crecimiento del repositorio:** cada publicación agrega una versión completa del
  bundle minificado al historial. Es irreversible sin reescribir la historia.
- **Doble fuente de verdad aparente:** quien lea `src/` no sabe si eso es lo que corre en producción sin
  verificarlo aparte (L-26).
- **Sin previews por rama:** no hay forma de ver un cambio publicado antes de mergear a `main`.
- **CSS con la misma trampa:** una clase de Tailwind nueva no existe en producción sin
  `npm run build:css`, y Tailwind purga por contenido, así que las clases construidas dinámicamente
  pueden desaparecer (L-06).
- **`main` es producción:** no hay entorno intermedio; cualquier merge publica.
- **Duplicación de HTML:** existen `index.html` (raíz, el que sirve Pages) y `public/index.html` (el que
  usa el dev server `:dev-http {:root "public"}`), casi idénticos, incluido el JSON-LD (R-05, T-12).

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Bundle publicado distinto del fuente | Regla dura en `CLAUDE.md` §9 y `AGENT_INSTRUCTIONS` §10; T-08 para limpiar el estado actual; T-06 podría añadir un check que avise si cambió `src/**.cljs` sin cambiar `app.js` | R-13 |
| Alguien edita `app.js` a mano | Prohibición explícita (L-05) | R-13 |
| Crecimiento del repositorio | Aceptado; mitigado parcialmente al dejar de versionar el runtime de desarrollo (`3680cb4`) | R-22 |
| Publicar sin correr los tests | `clj -M:test` obligatorio antes de commitear; T-06 para automatizarlo | R-04 |
| Divergencia entre los dos `index.html` | T-12; mientras exista la duplicación, sincronizar ambos en el mismo commit (L-22) | R-05 |

## Seguimiento

Esta decisión debería **reemplazarse por un ADR nuevo** cuando se implemente CI (T-06). El camino
natural: un workflow de GitHub Actions que corra los tests, compile y publique el artefacto,
eliminando el bundle del control de versiones.

Señales de que llegó el momento:

- El repositorio se vuelve pesado o lento de clonar.
- Un incidente causado por un bundle desalineado (el riesgo ya está activo).
- Aparece un segundo desarrollador (los conflictos de merge en un archivo minificado son
  irresolubles a mano).

---

Relacionado: [[../project-memory/TECH_STACK]] §7 · [[../project-memory/RISKS]] R-13, R-05 ·
[[../project-memory/BACKLOG]] T-06, T-08, T-12 · [[../project-memory/LESSONS_LEARNED]] L-05, L-06, L-26

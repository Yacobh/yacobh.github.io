# Prompt: troubleshooting

Para diagnosticar un fallo: algo que no funciona, un comportamiento inesperado, un error en producción.

---

## Prompt

```
Problema observado: <SÍNTOMA EXACTO — qué esperabas, qué pasó, dónde>

Antes de proponer un arreglo:
1. Lee project-memory/LESSONS_LEARNED.md COMPLETO. Es probable que este fallo ya
   esté descrito ahí.
2. Lee project-memory/CURRENT_STATUS.md (bloqueos y estado del repositorio) y
   RISKS.md.
3. Verifica el estado real:
   git status · git log --oneline -5 · clj -M:test
4. Reproduce el problema antes de teorizar. Si no puedes reproducirlo, dilo.

Entrega:

1. Reproducción: pasos exactos y qué observas
2. Hipótesis ordenadas por probabilidad, con cómo descartar cada una
3. Causa raíz, con la evidencia que la confirma (no la que la sugiere)
4. Arreglo propuesto, y por qué ataca la causa y no el síntoma
5. Cómo verificar que quedó arreglado
6. ¿Es una lección nueva para LESSONS_LEARNED.md?

No cambies código hasta tener la causa raíz identificada con evidencia.
Si el arreglo requiere una decisión, propón el ADR antes de implementar.
```

---

## Notas

### Tabla de diagnóstico rápido

| Síntoma | Causa más probable | Ref. |
|---------|-------------------|------|
| Un `dispatch` no hace nada (solo warning en consola) | El namespace de eventos no está en el `:require` de `src/universo/core.cljs`: los handlers no se registraron | L-03 |
| El build falla con error de namespace | Namespace ≠ ruta de archivo (guion en el ns = guion **bajo** en el archivo) | L-01 |
| Un `reg-fx` recibe `nil` o un valor raro | Los efectos reciben **un solo** argumento: usa un mapa o vector | L-02 |
| "Warnings" al correr los tests en `events/auth.cljs:172,193` | `:infer-warning` conocidos y benignos (objetos JS de supabase-js sin tipos). **No son fallos** | L-04 |
| Un estilo funciona en dev y no en producción | Falta `npm run build:css`, o la clase se construyó con `str` y Tailwind no la detectó al purgar | L-06 |
| El cambio de código no aparece en producción | Falta `npx shadow-cljs release app` + commit de `public/js/app.js` | L-05, ADR-003 |
| Producción se comporta distinto del código que leo | El bundle versionado está desalineado del fuente, o la rama no está mergeada a `main` | R-13, Q-13 |
| Una operación "funciona" pero no cambia nada | **RLS**: el UPDATE afectó 0 filas. En Postgres una policy que no autoriza no da error | L-09 |
| "Hacer admin" no promueve a nadie | Falta la migración `006_admin_role_management.sql` | L-09 |
| Una tabla nueva es inaccesible | Falta la policy: sin policy no hay acceso (no queda "abierta") | L-14 |
| Una migración falla por función o tabla inexistente | Orden de aplicación incorrecto (`supabase/SCHEMA.md`) | L-13 |
| "Mi plan" aparece vacío | O no hay `resources` publicados, o el déficit cayó en `unknown/*` por falta de mapeo de topic | L-18, R-10 |
| El diagnóstico termina demasiado pronto | `:exhausted`: no hay ítems candidatos en la ventana de dificultad. Banco pequeño | L-17 |
| θ no se mueve como esperas | Prior N(0,1) encoge hacia 0 y `|Δθ| ≤ 0,4` limita el salto. **Es intencional** | L-15, L-16 |
| Los cupos no aparecen | El estudiante no tiene `theta_band` (sin diagnóstico) o los cupos son de otra banda / estado | RF-5.1, RF-5.2 |
| El grupo no se confirma | Los activos (`pending` ∪ `confirmed`) no alcanzan `min_enrollments`, o el trigger no está aplicado | ADR-006 |
| Los emails no llegan | Sin `RESEND_API_KEY` (503, cola intacta), sin cron que drene la cola, o en spam por dominio no verificado | ADR-007, R-12 |
| `graphify` dice "No matching nodes found" | El grafo **no indexa `.cljs`**. No significa que el código no exista | L-23, R-20 |
| Fórmulas matemáticas sin estilo | El CDN de KaTeX no cargó (jsDelivr) | A-23 |

### Herramientas de diagnóstico

```bash
# Estado
git status && git log --oneline -5 && git log main..HEAD --oneline
clj -M:test

# Código
grep -rn "universo\.<ns>" src/            # quién requiere qué
grep -rn ":<evento>" src/                  # dónde se registra y se dispara un evento
graphify explain "<concepto>"              # solo para docs/SQL/HTML, no .cljs

# Base de datos (en el SQL Editor de Supabase)
select * from pg_policies where tablename = '<tabla>';
select tgname, tgrelid::regclass from pg_trigger where not tgisinternal;
select status, count(*) from email_outbox group by status;
select theta_band, count(*) from student_profiles group by theta_band;
select distinct topic from questions;      # para verificar mapeo (Q-06)
```

En el navegador: la consola muestra los logs de re-frame y de Supabase (el cliente hace
`console.log` explícitos en `supabase.cljs` y `events/auth.cljs`).

### Disciplina de diagnóstico

1. **Reproduce antes de teorizar.** Un fallo no reproducible que se "arregla" vuelve.
2. **Distingue evidencia de coincidencia.** "Cambié X y funcionó" no es causa raíz.
3. **Sospecha de RLS ante cualquier operación silenciosa.** Es el fallo silencioso más común aquí.
4. **Verifica qué está en producción** antes de depurar un bug reportado en el sitio: puede que el
   código que lees no sea el que corre (R-13).
5. **Arregla la causa, no el síntoma.** Si la lógica está en un handler y por eso no se pudo testear,
   el arreglo incluye extraerla a un namespace puro (ADR-009).

### Al terminar

- Si costó más de 15 minutos: **añade la lección** a `LESSONS_LEARNED.md` con el formato
  síntoma → causa → regla.
- Si reveló un riesgo: `RISKS.md`.
- Si reveló algo que no sabemos: `OPEN_QUESTIONS.md`.
- Session log con la reproducción, la causa raíz y la verificación del arreglo.

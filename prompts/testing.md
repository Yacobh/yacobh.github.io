# Prompt: testing

Para escribir tests, mejorar cobertura o diagnosticar un fallo de la suite.

---

## Prompt

```
Objetivo de testing: <QUÉ HAY QUE CUBRIR O DIAGNOSTICAR>

Antes de escribir tests:
1. Lee project-memory/AGENT_INSTRUCTIONS.md §5 y adr/ADR-009-logica-pura-testeable.md.
2. Lee project-memory/REQUIREMENTS.md §3 (reglas de negocio) y §6 (criterios de aceptación).
3. Ejecuta `clj -M:test` para conocer el estado de partida.
4. Revisa los tests existentes del área (test/**/…_test.cljs) para seguir su estilo.

Entrega:

1. Qué reglas de negocio quedan cubiertas y con qué casos
2. Los tests, en test/**/…_test.cljs con namespace terminado en -test
3. Casos borde incluidos explícitamente
4. Qué NO queda cubierto y por qué (I/O, UI, policies RLS)
5. Salida de `clj -M:test` tras el cambio

Si un test falla, muestra la salida real y explica la causa antes de proponer el arreglo.
No cambies el comportamiento del código para que un test pase sin entender por qué falla.
```

---

## Notas

### Cómo funciona la suite

```bash
clj -M:test
```

Compila el build `:test` de shadow-cljs (`:target :node-test`, `:autorun true`) y ejecuta todo
namespace que termine en `-test` (`:ns-regexp "-test$"`). Salida en `out/test.js` (ignorado por Git).

**Estado de referencia (2026-07-26):** `Ran 34 tests containing 129 assertions. 0 failures, 0 errors.`

Los `:infer-warning` en `events/auth.cljs:172` y `:193` son **conocidos y benignos** (L-04): vienen de
acceder a `.-user` en objetos de `supabase-js` sin tipos inferibles. No son fallos.

### Qué está cubierto hoy

| Namespace | Test |
|-----------|------|
| `universo.components.tetha` | `test/universo/components/tetha_test.cljs` |
| `universo.irt.progress` | `test/universo/irt/progress_test.cljs` |
| `universo.profile` | `test/universo/profile_test.cljs` |
| `universo.slots.logic` | `test/universo/slots/logic_test.cljs` |
| `universo.events.auth` (handlers puros) | `test/universo/events/auth_test.cljs` |
| `universo.events.dashboard` | `test/universo/events/dashboard_test.cljs` |
| `universo.events.slots` | `test/universo/events/slots_test.cljs` |

### Qué NO está cubierto (y por lo tanto exige prueba manual)

Componentes de UI · `db/crud.cljs` (I/O real) · `events/admin.cljs` · los efectos de `events/test.cljs`
· la Edge Function · **las policies RLS** (el hueco más peligroso, porque ahí vive la seguridad — T-11).

No pretendas que un test de función pura cubre estas cosas.

### Casos borde que este dominio exige

**Bandas de θ** (`profile/theta-band`): −0,01 → `inicial`; 0,0 → `basico`; 0,99 → `basico`;
1,0 → `intermedio`; 2,0 → `avanzado`. Los bordes exactos, no valores del medio.

**Clamps** (`tetha`): θ nunca sale de `[-3, 3]`; `|Δθ| ≤ 0,4` siempre; `newton-raphson-iteration` con
`d2 = 0` o `NaN` devuelve θ sin cambio.

**Parada** (`irt.progress/stop-reason`): `n = 4` con SE bajo → `nil` (no antes del mínimo);
`n = 5` con SE ≤ 0,35 → `:precision`; `n = 12` → `:max-items`; sin respuestas → `SE = ##Inf`.

**Cupos** (`slots.logic`): banda `nil` → `[]`; banda distinta → excluido; estado `cancelled` → excluido;
`active-enrollment-count` con lista vacía → 0; `remaining-to-confirm` nunca negativo;
`should-confirm-slot?` con `min_enrollments = 0` → `false`.

**Perfil** (`profile`): módulo sin errores no aparece en déficits; orden por **tasa** de error, no por
conteo absoluto; topic sin mapeo → `unknown/<topic>`; menos de 3 puntos de θ → sin `stability`.

### Reglas espejo

Si el test verifica una regla que **también** vive en SQL (confirmación de cupo, bandas), deja escrito
en el test o en el namespace que la **fuente de verdad es el trigger** y que esto es el espejo del
cliente (R-08).

### Idea pendiente

*Property-based testing* con `clojure.test.check` encajaría muy bien con las funciones numéricas:
invariantes como "θ ∈ [-3,3] para cualquier secuencia de respuestas", "más aciertos nunca bajan θ",
"`remaining-to-confirm ≥ 0`". Registrado en ADR-009 §Seguimiento.

### Al terminar

Si la cobertura cambió, anótalo en `TECH_STACK.md` §5 y en el session log con la salida real de
`clj -M:test`.

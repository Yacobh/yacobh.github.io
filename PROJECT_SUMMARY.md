# Universo - Plataforma de Evaluación Adaptativa

## 📋 Descripción General

**Universo** es una plataforma web interactiva de evaluación y seguimiento del aprendizaje basada en la **Teoría de Respuesta al Item (TRI - Item Response Theory)**. El proyecto combina un frontend moderno construido con **ClojureScript** y **re-frame** con un backend en **Supabase**, ofreciendo una experiencia personalizada de pruebas adaptativas para el aprendizaje matemático.

## 🛠️ Stack Tecnológico

### Frontend
- **ClojureScript**: Lenguaje base compilado a JavaScript
- **re-frame**: Framework de state management reactivo
- **Reagent**: Biblioteca de componentes React para ClojureScript
- **Tailwind CSS**: Framework de estilos utilities
- **PostCSS + Autoprefixer**: Procesamiento y optimización de CSS
- **KaTeX**: Renderizado de ecuaciones matemáticas

### Backend
- **Supabase**: BaaS con PostgreSQL, autenticación y APIs en tiempo real
- **JavaScript Runtime**: Node.js (para tests)

### Build & Development
- **shadow-cljs**: Compilador y herramienta de desarrollo para ClojureScript
- **npm**: Gestor de dependencias

## 📁 Estructura del Proyecto

```
src/universo/
├── core.cljs              # Punto de entrada principal
├── db.cljs               # Definición del estado global
├── subs.cljs             # Suscripciones (selectores de estado)
├── views.cljs            # Componentes principales de vista
├── db/                   # Operaciones de base de datos
│   └── crud.cljs        # Funciones CRUD con Supabase
├── events/               # Manejadores de eventos (acciones)
│   ├── contacto.cljs    # Lógica de formulario de contacto
│   ├── dashboard.cljs   # Eventos del dashboard
│   └── test.cljs        # Eventos de evaluaciones
├── components/           # Componentes reutilizables
│   └── dashboard.cljs   # Panel de control del usuario
└── [otros módulos]
    ├── animations.cljs   # Animaciones CSS
    ├── battery.cljs      # Estado de la batería (dispositivo)
    ├── geo.cljs          # Geolocalización
    ├── home.cljs         # Página de inicio
    ├── ip.cljs           # Detección de IP
    ├── jardin.cljs       # Componente de jardín
    ├── particulas.cljs   # Efectos de partículas
    ├── physics.cljs      # Simulación física
    ├── supabase.cljs     # Configuración Supabase
    ├── user.cljs         # Gestión de usuarios
    ├── visitor_tracker.cljs  # Seguimiento de visitantes
    └── voz.cljs          # Procesamiento de audio
```

## 🎯 Características Principales

### 1. **Dashboard de Aprendizaje**
- Panel personalizado para cada usuario
- Visualización de estadísticas: total de evaluaciones, últimas pruebas, promedios
- Indicadores del nivel estimado (Theta) usando Teoría de Respuesta al Item
- Barra de progreso y métricas detalladas

### 2. **Sistema de Evaluaciones Adaptativas**
- Tests adaptativos basados en TRI (Item Response Theory)
- Cálculo dinámico de dificultad según respuestas anteriores
- Seguimiento de:
  - Respuestas correctas/incorrectas
  - Porcentajes de acierto
  - Tiempo por pregunta
  - Duración total del test
  - Parámetro de habilidad (Theta)

### 3. **Seguimiento de Visitantes**
- Rastreo de información del usuario (email, IP, ubicación)
- Monitoreo de batería del dispositivo
- Captura de eventos de navegación

### 4. **Formulario de Contacto**
- Envío de mensajes que se guardan en Supabase
- Estados de carga y confirmación
- Manejo de errores

### 5. **Autenticación**
- Sistema de usuarios integrado con Supabase
- Seguimiento de sesiones
- Email de visitante como identificador

## 🔄 Flujo de Datos (re-frame)

```
Usuario Interacción
    ↓
Eventos (events/)
    ↓
Actualización de DB
    ↓
Suscripciones (subs.cljs)
    ↓
Re-render de Componentes
```

### Patrones Principales

**Eventos** (`reg-event-fx`, `reg-event-db`):
- `:enviar-contacto`: Inicia envío de contacto
- `:contacto/guardar`: Guarda contacto en base de datos
- `:test/start`: Inicia una nueva evaluación

**Efectos** (`reg-fx`):
- `:fx/insertar-contacto`: Inserta datos en Supabase

**Suscripciones** (`reg-sub`):
- `:visitor-email`: Email del visitante
- `:dashboard/total-tests`: Cantidad total de tests
- `:dashboard/promedio-nota`: Promedio de calificaciones

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo (watch mode)
clojure -M:shadow-cljs watch app

# REPL de ClojureScript
npx shadow-cljs browser-repl

# Compilar para producción
npx shadow-cljs release app

# Ver cambios de CSS en tiempo real
npm run watch:css

# Build optimizado de CSS
npm run build:css

# Ejecutar tests
clj -M:test
```

## 📊 Conceptos Clave

### Teoría de Respuesta al Item (TRI)
- **Theta (θ)**: Parámetro que representa el nivel de habilidad del usuario
  - θ < 0: Nivel inicial
  - 0 ≤ θ < 1: Nivel básico
  - 1 ≤ θ < 2: Nivel intermedio
  - θ ≥ 2: Nivel avanzado
- Las respuestas del usuario afectan dinámicamente la dificultad de preguntas posteriores

### Componentes Visuales
- **Tarjetas estadísticas**: Resumen de métricas clave
- **Barra de progreso**: Visualización del porcentaje de acierto
- **Nivel Theta**: Indicador visual del progreso con emojis

## 🔗 Integraciones Externas

- **Supabase**: Base de datos PostgreSQL en la nube
  - Tabla `contacto`: Mensajes de usuarios
  - Gestión de autenticación
  - APIs en tiempo real
- **Google Analytics** (potencial): Seguimiento de comportamiento

## 📱 Características de UX

- **Responsive Design**: Tailwind CSS para adaptación a dispositivos
- **Animaciones**: Transiciones suaves y spinners de carga
- **Feedback Visual**: Estados de éxito, error y carga
- **Accesibilidad**: Semántica HTML y atributos ARIA

## 🐛 Patches y Workarounds Conocidos

1. **Namespace Validation**: Nombres de namespace deben coincidir con la estructura de archivos
2. **Re-frame Effects**: Los efectos reciben un único argumento; usar vectores o maps para múltiples valores

## 📝 Notas de Mantenimiento

- Los archivos compilados están en `public/js/` y `public/css/`
- El runtime de ClojureScript está en `public/js/cljs-runtime/`
- Los cambios en ClojureScript se compilan automáticamente en modo watch
- El CSS de Tailwind se procesa desde `src/css/app.css` a `public/css/app.css`

## 🎓 Objetivo del Proyecto

Proporcionar una plataforma educativa moderna que:
- Adapte el nivel de dificultad al desempeño del usuario
- Proporcione feedback inmediato
- Recopile métricas detalladas de aprendizaje
- Mejore la experiencia educativa mediante tecnología adaptativa basada en IRT

---

**Autor**: yacobh  
**Repositorio**: https://github.com/Yacobh/yacobh.github.io  
**Versión**: 1.0.0

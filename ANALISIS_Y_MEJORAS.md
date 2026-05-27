# Libra Photos Studio · Análisis y Mejoras

> Documento de revisión técnica generado el 2026-05-27  
> Alcance: arquitectura, modelo de datos e interfaz de usuario

---

## 1. Contexto del Proyecto

**Libra Photos Studio** es una aplicación web de escritorio construida en React que permite al equipo de Libra Photos crear, personalizar y exportar plantillas de contenido para Instagram (Feed 4:5, Carrusel 1:1, Stories 9:16 y Perfil).

### Stack actual

| Capa | Tecnología |
|------|-----------|
| Framework UI | React 19.2.6 |
| Build tool | Vite 8.0.12 + @vitejs/plugin-react (Oxc) |
| Almacenamiento local | localStorage (metadatos) + IndexedDB via `idb-keyval` (fotos) |
| Exportación PNG | `html-to-image` ^1.11.13 |
| Tipografías | Archivo Black (display) + IBM Plex Mono (metadata) vía Google Fonts |
| Lenguaje | JavaScript / JSX (sin TypeScript) |
| Linter | ESLint 10 (flat config, React hooks) |

### Funcionalidades implementadas

- Gestión de proyectos (crear, abrir, eliminar) con persistencia offline
- Galería de 17 plantillas organizadas por 4 categorías
- Editor de textos con panel lateral y modal de configuración de marca
- Carga de fotos por clic o drag-and-drop, almacenadas en IndexedDB
- Exportación a PNG en tres formatos (1080×1350, 1080×1080, 1080×1920) con fuentes embebidas

---

## 2. Arquitectura

### 2.1 Estructura actual

```
src/
├── App.jsx              ← router de pantallas (state), orquestador de contextos
├── components/          ← pantallas y paneles
│   ├── ProjectList.jsx
│   ├── Gallery.jsx
│   ├── Editor.jsx
│   ├── BrandSettings.jsx
│   ├── TextPanel.jsx
│   └── PhotoSlot.jsx    ← re-exporta desde primitives
├── context/
│   ├── LPContent.jsx    ← estado de textos/marca
│   └── PhotoContext.jsx ← estado y storage de fotos
├── data/
│   ├── defaults.js      ← 40+ tokens de texto por defecto
│   └── templates-meta.js← registro de las 17 plantillas
├── lib/
│   ├── storage.js       ← API localStorage + IndexedDB
│   └── export.js        ← pipeline de exportación PNG
└── templates/
    ├── index.js         ← mapa ID → componente
    ├── primitives.jsx   ← tokens de diseño + componentes base
    ├── static1.jsx      ← T01–T10
    └── static2.jsx      ← T11–T17
```

El flujo de navegación es manejado con un `useState` en `App.jsx` que alterna entre tres "pantallas" (`projects`, `gallery`, `editor`). Los contextos `LPProvider` y `PhotoProvider` se montan solo cuando hay un proyecto activo.

### 2.2 Problemas detectados

#### A · Tokens de diseño duplicados

El objeto `LF` (colores y fuentes) está definido **tres veces** en el proyecto:

| Archivo | Línea |
|---------|-------|
| `primitives.jsx` | 5–10 |
| `Editor.jsx` | 8 |
| `ProjectList.jsx` | 4 |

`Editor.jsx` y `ProjectList.jsx` definen su propio objeto local en lugar de importar desde `primitives.jsx`. Cualquier cambio de color requiere modificar tres archivos.

#### B · Sin enrutamiento de URL

El estado de navegación vive únicamente en `useState`. Los botones de navegador (atrás/adelante), los marcadores y los deep links no funcionan. Al recargar la página siempre se vuelve a la lista de proyectos.

#### C · Numeración discontinua de plantillas

Las IDs van de `t01` a `t17` pero faltan `t05` y `t07`. Esto sugiere plantillas eliminadas que dejaron huecos, lo que podría causar confusión al agregar nuevas.

#### D · Contexto de textos monolítico

`LPContext` expone los 40+ tokens de un solo golpe. Los tokens de marca global (`brand`, `monogram`, `handle`) y los tokens específicos de plantilla (`t01TopLabel`, `t14S1Price`, etc.) conviven en el mismo plano, lo que dificulta entender qué campo pertenece a qué alcance.

#### E · Sin error boundaries

No hay ningún `React.ErrorBoundary`. Si una plantilla lanza un error en render (por ejemplo, por un valor inesperado en un token), toda la aplicación se rompe sin mensaje de error útil.

#### F · `handleContentUpdate` en `App.jsx` puede volverse stale

```js
// App.jsx línea 19–24
const handleContentUpdate = useCallback((content) => {
  if (!project) return;
  const updated = { ...project, content, updatedAt: Date.now() };
  setProject(updated);
  saveProjectMeta(updated);
}, [project]);
```

`project` está en la lista de dependencias, por lo que `LPProvider` recibe una nueva referencia de `onContentUpdate` cada vez que `project` cambia. Esto provoca que el contexto se re-instancie en cascada en cada keystroke del editor de textos. En proyectos con muchas fotos esto puede causar renders innecesarios.

#### G · Sin TypeScript

La ausencia de tipos hace que las interfaces entre módulos sean implícitas. Por ejemplo, la forma del objeto `project`, los campos de `LP_DEFAULTS` o los `EXPORT_PRESETS` no están documentados con tipos, lo que facilita errores de integración al escalar.

---

### 2.3 Mejoras sugeridas — Arquitectura

| Prioridad | Mejora | Descripción |
|-----------|--------|-------------|
| **Alta** | Centralizar tokens de diseño | Importar `LF` desde `primitives.jsx` en todos los componentes. Eliminar las definiciones locales en `Editor.jsx` y `ProjectList.jsx`. |
| **Alta** | Agregar React Router | Usar `react-router-dom` con rutas `/`, `/:projectId`, `/:projectId/:templateId`. Habilita navegación nativa, deep links y recarga sin perder contexto. |
| **Media** | Separar contexto en dos capas | `BrandContext` (datos globales: marca, edición) + `TemplateContext` (tokens específicos de la plantilla activa). Evita re-renders globales al editar campos de plantilla. |
| **Media** | Agregar Error Boundaries | Envolver cada componente de plantilla en un `ErrorBoundary`. Mostrar un estado de error visual en lugar de romper la app. |
| **Media** | Resolver numeración de plantillas | Renombrar las IDs para que sean secuenciales o usar slugs descriptivos (`editorial-cover`, `metadata-card`, etc.) en lugar de índices numéricos. |
| **Baja** | Migrar a TypeScript | Comenzar por los módulos de datos (`defaults.js`, `templates-meta.js`, `storage.js`) e ir avanzando hacia los componentes. |

---

## 3. Modelo de Datos

### 3.1 Estructura actual

#### Proyecto (localStorage)
```json
{
  "id": "uuid-v4",
  "name": "Drop Junio 2026",
  "createdAt": 1748000000000,
  "updatedAt": 1748000000000,
  "content": {
    "brand": "LIBRA PHOTOS",
    "monogram": "LP",
    "handle": "@_libraphotos",
    "edition": "07",
    "coverTitle": "RED\nLIGHTS",
    "...": "40+ campos"
  }
}
```

#### Fotos (IndexedDB)
```
clave:  "photo:{projectId}:{slotId}"
valor:  "data:image/jpeg;base64,/9j/4AAQ..."  ← data URI completo
```

### 3.2 Problemas detectados

#### A · Sin límite ni manejo de cuota en localStorage

`saveProjectMeta` escribe directamente sin capturar el error `QuotaExceededError`. Si el almacenamiento está lleno (límite típico ~5 MB), la operación falla silenciosamente y el usuario pierde sus cambios sin ningún aviso.

#### B · Fotos sin compresión ni límite de tamaño

Las fotos se almacenan como data URIs en base64 directamente tras la lectura con `FileReader`. Una foto DSLR de 8 MB ocupa ~10.7 MB en base64. Con múltiples slots y proyectos, IndexedDB puede saturarse.

#### C · `getProjectPhotos` escanea todas las claves

```js
// storage.js línea 26–36
export async function getProjectPhotos(pid) {
  const all = await keys();           // trae TODAS las claves del store
  const prefix = `photo:${pid}:`;
  // ...
}
```

Si hay cientos de fotos de múltiples proyectos, esta función recupera todas las claves para filtrar las del proyecto. Un índice secundario o un store dedicado por proyecto sería más eficiente.

#### D · Sin exportación ni importación de proyectos

No hay forma de hacer un backup, de compartir un proyecto entre dispositivos, ni de restaurar datos si se limpia el almacenamiento del navegador. Todo está atado al navegador y dispositivo donde se creó.

#### E · Fotos huérfanas al cambiar de slot

Si una plantilla cambia su `slotId` en una actualización del código (por ejemplo, `t01-main` renombrado a `t01-hero`), las fotos guardadas bajo la clave antigua quedan huérfanas en IndexedDB y no son eliminadas al borrar el proyecto.

#### F · Sin historial de cambios (undo/redo)

Cada cambio de texto se guarda inmediatamente en localStorage. No hay posibilidad de revertir una edición accidental.

#### G · Caché de fuentes a nivel de módulo sin invalidación

```js
// export.js línea 13
let _fontCSS = null;
```

La caché se llena una vez por sesión. Si Google Fonts falla al primer intento, `_fontCSS` queda como `''` y las exportaciones subsiguientes se hacen sin fuentes embebidas, sin que el usuario lo sepa.

### 3.3 Mejoras sugeridas — Datos

| Prioridad | Mejora | Descripción |
|-----------|--------|-------------|
| **Alta** | Manejar `QuotaExceededError` | Envolver `localStorage.setItem` en try/catch. Notificar al usuario con un mensaje visible cuando el almacenamiento esté lleno. |
| **Alta** | Comprimir imágenes antes de guardar | Dibujar la imagen en un `<canvas>` con dimensiones máximas (p.ej. 2000px) y calidad JPEG 0.85 antes de convertir a base64. Reducir el tamaño entre 70–90%. |
| **Alta** | Exportación/Importación de proyectos | Implementar serialización del proyecto a JSON (incluyendo fotos en base64 comprimidas) para descarga, y un flujo de importación desde archivo. |
| **Media** | Indexar fotos por proyecto en IndexedDB | Usar un `objectStore` con `keyPath` compuesto o índice secundario para evitar el scan global de claves. |
| **Media** | Historial de cambios (undo/redo) | Mantener una pila de estados del `content` (máx. 20 entradas). Agregar atajos `Ctrl+Z` / `Ctrl+Y`. |
| **Media** | Validar la caché de fuentes | Si `_fontCSS` es vacío tras un intento fallido, marcar el error y reintentar en la siguiente exportación en lugar de cachear el estado de fallo. |
| **Baja** | Separar tokens globales de tokens de plantilla | Los campos que son globales (`brand`, `monogram`, etc.) no necesitan estar en `content` del proyecto; podrían ser un perfil de marca separado reutilizable entre proyectos. |

---

## 4. Interfaz de Usuario

### 4.1 Descripción de pantallas

#### Pantalla 1 — Lista de Proyectos
Header negro con logo + botón "NUEVO PROYECTO". Lista de proyectos como filas con nombre, fecha y acciones. Estado vacío con texto centrado.

#### Pantalla 2 — Galería de Plantillas
Top bar con botón atrás, nombre del proyecto y botón de marca. Filtros por categoría. Grid de tarjetas de plantilla (160×200 px de preview en escala).

#### Pantalla 3 — Editor
Top bar con atrás, nombre de plantilla, selector de formato y botón de marca. Panel lateral izquierdo (280 px) con campos de texto expandibles. Centro con preview en tiempo real. Bottom bar con botón de exportación.

#### Modal — Configuración de Marca
Overlay oscuro. Dos secciones: Marca y Edición actual. Campos de texto simples. Se cierra al hacer clic fuera.

### 4.2 Problemas detectados

#### A · Sin diseño responsivo

La aplicación es desktop-only. En tablets o pantallas menores de ~900 px el layout se rompe. No hay media queries ni adaptaciones para pantallas pequeñas.

#### B · Diálogos nativos (`alert` / `confirm`) no personalizados

```js
// ProjectList.jsx línea 23
if (!confirm('¿Eliminar este proyecto?')) return;

// Editor.jsx línea 33
alert('Export failed: ' + e.message);
```

Los diálogos del navegador no siguen el sistema de diseño de la aplicación y bloquean el hilo de UI.

#### C · Sin miniatura de plantilla en la galería

Los previews de la galería renderizan el componente real escalado a 160×200 px. Esto funciona pero tiene un costo de render elevado: monta todos los componentes de plantilla simultáneamente. Tampoco hay un indicador visual de cuáles plantillas ya tienen contenido editado en el proyecto.

#### D · Sin indicación de qué campo afecta qué parte de la plantilla

El TextPanel muestra una lista de inputs sin contexto visual de dónde aparece ese texto en la plantilla. El usuario debe adivinar qué campo es `t01TopLabel` o `t14S1Price`.

#### E · El selector de formato no filtra por compatibilidad

Al estar en el editor de T01 (Editorial Cover, portrait), el botón "STORY 9:16" es clickeable y cambia las dimensiones del preview, aunque T01 es una plantilla de feed. No hay indicación de cuál es el formato recomendado ni advertencia de que el formato seleccionado puede no ser el diseñado para esa plantilla.

#### F · Sin duplicación de proyectos

No hay forma de clonar un proyecto para partir de una base existente. El usuario debe re-ingresar todos los datos desde cero en cada nuevo proyecto.

#### G · Sin acceso rápido entre plantillas del mismo proyecto

Desde el editor solo se puede volver a la galería y luego seleccionar otra plantilla. No hay una forma directa de navegar entre plantillas sin pasar por la galería.

#### H · Sin atajos de teclado

No existe ningún atajo de teclado documentado ni implementado (ni `Ctrl+S` para guardar, ni `Ctrl+Z` para deshacer, ni `Escape` para cerrar modal, ni flechas para navegar entre plantillas).

> **Excepción:** El modal `BrandSettings` y el formulario de creación de proyecto sí responden a `Escape` y `Enter` respectivamente, pero no está documentado.

#### I · Sin control de posición/zoom de la foto

La foto se muestra con `objectFit: cover` centrada. Si el punto de interés de la imagen no está centrado (por ejemplo, un rostro en la esquina), no hay forma de reposicionarla sin editar la foto externamente.

#### J · Galería sin opción "Todas las plantillas"

Los filtros de la galería son mutuamente excluyentes por categoría. No hay forma de ver todas las plantillas a la vez para hacer una comparación rápida.

#### K · Formulario de creación de proyecto no valida nombre vacío de forma clara

Si se presiona Enter con el campo vacío, se crea un proyecto con el nombre por defecto (`Proyecto DD/MM/YYYY`), lo cual puede ser confuso. No hay placeholder o texto de ayuda que explique este comportamiento.

#### L · Sin estado de carga al abrir un proyecto con muchas fotos

Al abrir un proyecto que tiene fotos grandes, `getProjectPhotos` carga todas las fotos de IndexedDB de forma asíncrona, pero no hay ningún indicador de carga. Los photo slots aparecen vacíos hasta que los datos llegan.

### 4.3 Mejoras sugeridas — Interfaz de Usuario

| Prioridad | Mejora | Descripción |
|-----------|--------|-------------|
| **Alta** | Reemplazar `alert`/`confirm` nativos | Implementar un sistema de diálogos / toasts propios, consistentes con el sistema de diseño negro+amber. |
| **Alta** | Indicador visual campo → plantilla | Mostrar un highlight en el preview cuando el usuario hace foco en un campo del TextPanel. O agregar una descripción breve de dónde aparece cada campo. |
| **Alta** | Control básico de posición de foto | Agregar `objectPosition` editable (p.ej. un picker de 9 puntos: top-left, center, bottom-right) para reposicionar la foto dentro de su frame sin salir de la app. |
| **Media** | Duplicar proyectos | Agregar botón "Duplicar" en la lista de proyectos que clone el contenido pero asigne nuevo ID y nombre + "(copia)". |
| **Media** | Navegación entre plantillas desde el editor | Agregar un selector de plantilla en el top bar del editor (dropdown o lista desplegable) para cambiar de plantilla sin volver a la galería. |
| **Media** | Indicar formato recomendado en la galería | Mostrar badge de aspecto en cada tarjeta de plantilla. Deshabilitar o marcar con advertencia los formatos incompatibles en el selector del editor. |
| **Media** | Estado de carga para fotos | Mostrar un spinner o skeleton en el `PhotoSlot` mientras la foto se carga desde IndexedDB. |
| **Media** | Opción "Todas" en filtros de galería | Agregar un filtro inicial "TODAS" que muestre las 17 plantillas sin filtrar por categoría. |
| **Baja** | Atajos de teclado | `Ctrl+S` (ya guarda automáticamente, pero puede mostrar feedback), `Ctrl+Z`/`Y` (undo/redo), `Escape` (cerrar modales), `←`/`→` (navegar entre plantillas). |
| **Baja** | Thumbnails estáticos en galería | Pre-generar imágenes PNG de preview para cada plantilla en build time. Reemplazar el render dinámico para reducir el costo de montado de la galería. |
| **Baja** | Adaptación básica para tablet | Media query para pantallas ≥ 768 px: colapsar el TextPanel en un drawer deslizable y ajustar el preview para usar el ancho disponible. |

---

## 5. Resumen Ejecutivo de Mejoras

### Por impacto y esfuerzo

```
ALTO IMPACTO / BAJO ESFUERZO (Quick wins)
──────────────────────────────────────────
✦ Centralizar LF tokens (eliminar duplicados)
✦ Reemplazar alert/confirm con diálogos propios
✦ Manejar QuotaExceededError en localStorage
✦ Agregar filtro "Todas" en la galería
✦ Validar caché de fuentes en export.js

ALTO IMPACTO / ESFUERZO MEDIO
──────────────────────────────────────────
✦ Comprimir imágenes antes de guardar en IndexedDB
✦ Indicador visual campo → plantilla en editor
✦ Control de posición de foto (objectPosition picker)
✦ Duplicar proyectos
✦ Historial de cambios (undo/redo)

ALTO IMPACTO / ALTO ESFUERZO
──────────────────────────────────────────
✦ Agregar React Router (navegación URL-based)
✦ Exportación/Importación de proyectos a JSON
✦ Separar BrandContext de TemplateContext
✦ Migración a TypeScript

BAJO IMPACTO / BAJO ESFUERZO
──────────────────────────────────────────
✦ Atajos de teclado (Escape, Enter en modales)
✦ Filtros de formato en galería (badge de aspecto)
✦ Opción "Todas" con recuento por categoría
```

### Deuda técnica crítica

1. **Triplicación del objeto `LF`** — rompe el principio DRY y dificulta cambios de identidad visual
2. **Sin manejo de errores de almacenamiento** — el usuario puede perder datos sin notificación
3. **Fotos sin compresión** — riesgo real de saturar el almacenamiento del navegador en producción
4. **Sin Error Boundaries** — cualquier error en un componente de plantilla rompe toda la app

---

## 6. Archivos de mayor impacto para las mejoras

| Archivo | Cambios priorizados |
|---------|---------------------|
| `src/templates/primitives.jsx` | Única fuente de verdad para `LF` tokens |
| `src/components/Editor.jsx` | Importar `LF` desde primitives, indicador campo↔preview, control de foto |
| `src/components/ProjectList.jsx` | Importar `LF`, diálogos propios, duplicar proyecto |
| `src/lib/storage.js` | Manejo de QuotaExceededError, compresión de fotos, exportación JSON |
| `src/lib/export.js` | Validación de caché de fuentes, manejo de error de red |
| `src/components/Gallery.jsx` | Filtro "Todas", badges de formato |
| `src/context/LPContent.jsx` | Separar en BrandContext + TemplateContext |
| `src/App.jsx` | Integrar React Router, Error Boundaries |

---

*Documento generado a partir del análisis del código fuente del repositorio `jatramolao/libraphotosbrand`, rama `claude/code-review-improvements-3QwqR`.*

# Libra Photos Studio — Contexto de Proyecto

## Qué es
App web para crear contenido de Instagram de la marca **Libra Photos** (fotografía de moda).  
Flujo: **Proyectos → Galería → Editor → Exportar PNG**.  
Todo local: sin backend, sin login. Datos en `localStorage` + `IndexedDB`.

## Stack
- Vite + React 19 · `idb-keyval` (fotos) · `html-to-image` (export) · Vitest (tests)
- Repo: `https://github.com/Jatramolao/libraphotosbrand`
- Carpeta del proyecto: `libra-studio/`

## Identidad visual
| Token | Valor |
|---|---|
| Negro | `#000000` |
| Ámbar | `#F7A810` |
| Violeta | `#4B0082` |
| Fondo | `#f0eee9` |
| Display | Archivo Black |
| Mono | IBM Plex Mono |
| Border-radius | 0 (brutalismo) |

## Arquitectura de archivos clave
```
src/
├── App.jsx                  # Router de pantallas (projects/gallery/editor)
├── context/
│   ├── LPContent.jsx        # Contexto de textos (tokens) por proyecto
│   └── PhotoContext.jsx     # Contexto de fotos vía IndexedDB
├── data/
│   ├── defaults.js          # ~80 tokens con valores por defecto
│   └── templates-meta.js   # Registry de 15 plantillas + campos editables
├── lib/
│   ├── storage.js           # CRUD proyectos (localStorage) + fotos (IDB)
│   └── export.js            # capturePng() + exportAsPng() vía html-to-image
├── templates/
│   ├── primitives.jsx       # Frame, PhotoSlot, LFMark, TechStrip, lpLines
│   ├── static1.jsx          # T01–T10
│   ├── static2.jsx          # T11–T17
│   └── index.js             # TEMPLATE_COMPONENTS map + NATIVE_SIZE
└── components/
    ├── ProjectList.jsx      # Crear / abrir / renombrar / eliminar proyectos
    ├── Gallery.jsx          # Grid de plantillas + filtros + botón Export All
    ├── Editor.jsx           # Preview + TextPanel + barra de export
    ├── TextPanel.jsx        # Campos de texto por plantilla (useLP)
    ├── BrandSettings.jsx    # Modal con tabs: Marca / Sesión / Datos Técnicos
    └── ExportAllModal.jsx   # Export batch de las 15 plantillas con progreso
```

## Plantillas implementadas (15)
| ID | Nombre | Aspecto | ¿Foto? |
|---|---|---|---|
| t01 | Editorial Cover | 4:5 | ✓ |
| t02 | Metadata Card | 4:5 | ✓ |
| t03 | Violet Drop | 4:5 | ✓ |
| t04 | Credits Slate | 4:5 | — |
| t06 | Type Poster | 1:1 | — |
| t08 | Quote Pull | 1:1 | — |
| t09 | Story Ticker | 9:16 | ✓ |
| t10 | Story Countdown | 9:16 | — |
| t11 | Drop Teaser | 4:5 | ✓ |
| t12 | Designer Spotlight | 4:5 | ✓ |
| t13 | Event Poster | 4:5 | — |
| t14 | Booking | 4:5 | — |
| t15 | Before/After | 1:1 | ✓ ×2 |
| t16 | Reel Cover | 9:16 | ✓ |
| t17 | Highlight Covers | 1:1 | — |

## Fixes aplicados
| Problema | Causa | Solución |
|---|---|---|
| Export negro | Render offscreen + CORS fonts | Export desde DOM vivo |
| Fuentes perdidas en PNG | `skipFonts: true` | `buildFontEmbedCSS()` incrusta Archivo Black + IBM Plex Mono como base64 |
| Imagen blanca en PNG | `html-to-image` clona DOM sin esperar carga de `<img>` | Doble llamada a `toPng()` (primera prima el caché) |
| No se podía reemplazar foto | Click ignorado si ya había foto | Overlay hover con botones **↺ CAMBIAR** y **× ELIMINAR** |

## Funcionalidades activas
- ✅ Proyectos con nombre, crear / abrir / renombrar / eliminar
- ✅ Galería con 15 plantillas en miniatura + filtros por categoría
- ✅ Editor: panel de texto en tiempo real + preview escalado
- ✅ Slots de foto: agregar, reemplazar y eliminar (hover overlay + drag & drop)
- ✅ Export PNG individual 2× (1080px) con fuentes e imágenes incrustadas
- ✅ Export All: modal con progreso, exporta las 15 plantillas en secuencia
- ✅ BrandSettings: 3 tabs (Marca / Sesión Actual / Datos Técnicos), campos globales compartidos por todas las plantillas del proyecto
- ✅ Tests: 17 casos (storage + export presets), `npm test`

## Backlog pendiente
### Alta prioridad
- **A5** — Foto principal de sesión: subir una foto una vez y propagarla a todos los slots principales
- **C1** — Export directo al portapapeles
- **Q4** — Undo en campos de texto (Ctrl+Z)
- **Q5** — Indicador visual en galería de qué plantillas ya tienen foto

### Media prioridad
- **A1** — Duplicar proyecto
- **Q2** — Ordenar proyectos por fecha / nombre
- **Q6** — Zoom en preview del editor

### V2
- Export MP4 / video loop para Reels
- Nuevas plantillas (carrusel secuencial, behind the scenes)
- Presets de color por sesión

## Comandos útiles
```bash
cd libra-studio
npm run dev        # servidor local en :5173
npm run build      # build de producción
npm test           # 17 tests Vitest
```

## Deploy
Vercel: importar repo `Jatramolao/libraphotosbrand`, Root Directory = `libra-studio`.

// exporter.jsx
// Export designs from Libra Photos as PNG (static templates) or MP4 (motion
// graphics). Runs entirely in-browser, no screen-capture permission required.
//
// Strategy for MP4:
//   1. Render the chosen motion at target resolution (e.g. 1080×1080) in a
//      hidden React root using the LIVE LP content context.
//   2. Pause all CSS animations on that subtree, then for each frame:
//        a. Seek animations: anim.currentTime = i * (1000/fps)
//        b. Snapshot via html-to-image → canvas
//        c. Push a VideoFrame to a VideoEncoder configured for H.264
//   3. Mux encoded chunks via mp4-muxer into a real .mp4 → download.
//
// Strategy for PNG: same offscreen mount, single html-to-image snapshot.
//
// IMPORTANT — image-slot photos:
//   <image-slot> stores user-dropped photos inside its shadow DOM, but
//   html-to-image cannot reliably traverse shadow roots, so a naïve snapshot
//   captures the placeholder stripes instead of the user's photo. To fix
//   this we shim each filled slot with a plain <img> overlay in the light
//   DOM before capture, then tear it down afterward.

const MOTION_EXPORTS = [
  { key: 'm01', Component: 'T_M01_Embers',         label: 'M01 · Embers',          loopMs: 14000, defaultAspect: 'square'   },
  { key: 'm02', Component: 'T_M02_Shutter',        label: 'M02 · Shutter Strobe',  loopMs: 4500,  defaultAspect: 'square'   },
  { key: 'm03', Component: 'T_M03_RunwayWalk',     label: 'M03 · Runway Walk',     loopMs: 24000, defaultAspect: 'square'   },
  { key: 'm04', Component: 'T_M04_Timecode',       label: 'M04 · Timecode',        loopMs: 8000,  defaultAspect: 'square', warning: 'M04 usa animación de React (no CSS). El export funciona pero el contador puede saltar fotogramas.' },
  { key: 'm05', Component: 'T_M05_VioletFlicker',  label: 'M05 · Violet Flicker',  loopMs: 7000,  defaultAspect: 'portrait' },
];

// Static templates (no animation) — exported as PNG.
const STATIC_EXPORTS = [
  { key: 't01', Component: 'T_EditorialCover',     label: 'T01 · Editorial Cover',     defaultAspect: 'portrait', hasPhoto: true  },
  { key: 't02', Component: 'T_MetadataCard',       label: 'T02 · Metadata Card',       defaultAspect: 'portrait', hasPhoto: true  },
  { key: 't03', Component: 'T_VioletDrop',         label: 'T03 · Violet Drop',         defaultAspect: 'portrait', hasPhoto: true  },
  { key: 't04', Component: 'T_CreditsSlate',       label: 'T04 · Credits Slate',       defaultAspect: 'portrait', hasPhoto: false },
  { key: 't06', Component: 'T_TypePoster',         label: 'T06 · Type Poster',         defaultAspect: 'square',   hasPhoto: false },
  { key: 't08', Component: 'T_QuotePull',          label: 'T08 · Quote Pull',          defaultAspect: 'square',   hasPhoto: false },
  { key: 't09', Component: 'T_StoryTicker',        label: 'T09 · Story Ticker',        defaultAspect: 'story',    hasPhoto: true  },
  { key: 't10', Component: 'T_StoryType',          label: 'T10 · Story Countdown',     defaultAspect: 'story',    hasPhoto: false },
  { key: 't11', Component: 'T_DropTeaser',         label: 'T11 · Drop Teaser',         defaultAspect: 'portrait', hasPhoto: true  },
  { key: 't12', Component: 'T_DesignerSpotlight',  label: 'T12 · Designer Spotlight',  defaultAspect: 'portrait', hasPhoto: true  },
  { key: 't13', Component: 'T_EventPoster',        label: 'T13 · Event Poster',        defaultAspect: 'portrait', hasPhoto: false },
  { key: 't14', Component: 'T_Booking',            label: 'T14 · Booking',             defaultAspect: 'portrait', hasPhoto: false },
  { key: 't15', Component: 'T_BeforeAfter',        label: 'T15 · Before / After',      defaultAspect: 'square',   hasPhoto: true  },
  { key: 't16', Component: 'T_ReelCover',          label: 'T16 · Reel Cover',          defaultAspect: 'story',    hasPhoto: true  },
];

const EXPORT_PRESETS = {
  square:   { w: 1080, h: 1080, label: 'POST 1:1',          hint: '1080 × 1080' },
  portrait: { w: 1080, h: 1350, label: 'FEED 4:5',          hint: '1080 × 1350' },
  story:    { w: 1080, h: 1920, label: 'REEL / STORY 9:16', hint: '1080 × 1920' },
};

// ── Image-slot → plain <img> shimming ───────────────────────────────────────
// Before snapshotting, overlay a regular <img> on top of every filled
// <image-slot>, copying the inner <img>'s positioning so the user's crop
// survives the capture. Returns a teardown fn.
function shimImageSlots(container) {
  const slots = container.querySelectorAll('image-slot');
  const overlays = [];
  slots.forEach((slot) => {
    if (!slot.hasAttribute('data-filled')) return;
    const innerImg = slot.shadowRoot && slot.shadowRoot.querySelector('.frame img');
    if (!innerImg || !innerImg.src) return;

    const slotRect = slot.getBoundingClientRect();
    const contRect = container.getBoundingClientRect();
    const frame = slot.shadowRoot.querySelector('.frame');
    const fStyle = frame ? getComputedStyle(frame) : null;
    const s = getComputedStyle(innerImg);

    const wrap = document.createElement('div');
    wrap.setAttribute('data-imgslot-shim', '1');
    wrap.style.cssText = `
      position: absolute;
      left: ${slotRect.left - contRect.left}px;
      top: ${slotRect.top - contRect.top}px;
      width: ${slotRect.width}px;
      height: ${slotRect.height}px;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
      border-radius: ${fStyle ? fStyle.borderRadius : '0'};
      clip-path: ${fStyle ? fStyle.clipPath : 'none'};
    `;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = innerImg.src;
    img.style.cssText = `
      position: absolute;
      width: ${s.width};
      height: ${s.height};
      left: ${s.left};
      top: ${s.top};
      max-width: none;
      transform: translate(-50%, -50%);
      object-fit: ${s.objectFit};
      object-position: ${s.objectPosition};
    `;
    wrap.appendChild(img);
    container.appendChild(wrap);
    overlays.push(wrap);

    slot.dataset.exportPrevVisibility = slot.style.visibility || '';
    slot.style.visibility = 'hidden';
  });
  return () => {
    overlays.forEach((o) => o.remove());
    container.querySelectorAll('image-slot').forEach((slot) => {
      if ('exportPrevVisibility' in slot.dataset) {
        slot.style.visibility = slot.dataset.exportPrevVisibility;
        delete slot.dataset.exportPrevVisibility;
      }
    });
  };
}

// Wait until every <img> in container has decoded (or timed out).
function waitForImages(container) {
  const imgs = Array.from(container.querySelectorAll('img'));
  return Promise.all(imgs.map((img) => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    return new Promise((resolve) => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
      setTimeout(resolve, 2000);
    });
  }));
}

async function mountOffscreen({ Component, w, h, lpValue }) {
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed; left: 0; top: 0;
    width: ${w}px; height: ${h}px;
    transform: translate(-99999px, -99999px);
    pointer-events: none; z-index: -1;
    background: #000;
  `;
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);
  await new Promise((resolve) => {
    root.render(
      React.createElement(LPContent.Provider, { value: lpValue },
        React.createElement(Component, { w, h })
      )
    );
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
  await new Promise((r) => setTimeout(r, 250));
  return {
    container, root,
    teardown: () => { try { root.unmount(); } catch (e) {} container.remove(); },
  };
}

// ── Static PNG export ───────────────────────────────────────────────────────
async function exportStaticAsPng({ Component, w, h, lpValue, onStatus }) {
  if (!window.htmlToImage) throw new Error('Falta html-to-image. Recarga la página.');
  onStatus && onStatus('Preparando lienzo…');
  const { container, teardown } = await mountOffscreen({ Component, w, h, lpValue });
  onStatus && onStatus('Cargando imágenes…');
  await waitForImages(container);
  const teardownShim = shimImageSlots(container);
  await waitForImages(container);
  onStatus && onStatus('Renderizando PNG…');
  const dataUrl = await window.htmlToImage.toPng(container, {
    width: w, height: h, pixelRatio: 1, cacheBust: false,
  });
  teardownShim();
  teardown();
  const res = await fetch(dataUrl);
  return await res.blob();
}

// ── Motion → MP4 export ─────────────────────────────────────────────────────
async function encodeMotionToMp4({
  Component, w, h, fps, durationMs, lpValue, onProgress, onStatus,
}) {
  if (typeof window.VideoEncoder === 'undefined') {
    throw new Error('Tu navegador no soporta WebCodecs. Usa Chrome, Edge o Safari 16.4+.');
  }
  if (!window.htmlToImage || !window.Mp4Muxer) {
    throw new Error('Faltan librerías (html-to-image / mp4-muxer). Recarga la página.');
  }
  const { Muxer, ArrayBufferTarget } = window.Mp4Muxer;
  const htmlToImage = window.htmlToImage;

  onStatus('Preparando lienzo…');
  const { container, teardown } = await mountOffscreen({ Component, w, h, lpValue });

  // Pause every CSS animation so we can seek deterministically.
  const anims = container.getAnimations ? container.getAnimations({ subtree: true }) : [];
  anims.forEach((a) => { try { a.pause(); } catch (e) {} });

  // Shim image-slots so user photos appear in the captured frames.
  await waitForImages(container);
  const teardownShim = shimImageSlots(container);
  await waitForImages(container);

  onStatus('Configurando encoder…');
  const muxer = new Muxer({
    target: new ArrayBufferTarget(),
    video: { codec: 'avc', width: w, height: h, frameRate: fps },
    fastStart: 'in-memory',
  });
  const codecString = (w * h * fps) > (1920 * 1080 * 30) ? 'avc1.4d0029' : 'avc1.4d0028';
  const bitrate = Math.min(12_000_000, Math.round(w * h * fps * 0.10));

  const encoder = new VideoEncoder({
    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
    error: (e) => { console.error('VideoEncoder error', e); throw e; },
  });
  try {
    encoder.configure({
      codec: codecString, width: w, height: h, bitrate, framerate: fps,
      avc: { format: 'avc' },
    });
  } catch (e) {
    encoder.configure({ codec: 'avc1.42001f', width: w, height: h, bitrate, framerate: fps });
  }

  const totalFrames = Math.max(1, Math.round((durationMs / 1000) * fps));
  const usecPerFrame = Math.round(1_000_000 / fps);

  onStatus('Renderizando frames…');
  for (let i = 0; i < totalFrames; i++) {
    const t = i * (1000 / fps);
    anims.forEach((a) => { try { a.currentTime = t; } catch (e) {} });
    await new Promise((r) => requestAnimationFrame(r));

    let canvas;
    try {
      canvas = await htmlToImage.toCanvas(container, {
        width: w, height: h, pixelRatio: 1, cacheBust: false, skipFonts: false,
      });
    } catch (e) {
      console.warn('Snapshot failed on frame', i, e);
      continue;
    }
    const frame = new VideoFrame(canvas, { timestamp: i * usecPerFrame, duration: usecPerFrame });
    encoder.encode(frame, { keyFrame: i % Math.max(1, fps) === 0 });
    frame.close();

    if (i % 4 === 0) onProgress((i + 1) / totalFrames);
    if (encoder.encodeQueueSize > 8) await new Promise((r) => setTimeout(r, 30));
  }
  onProgress(1);

  onStatus('Finalizando MP4…');
  await encoder.flush();
  muxer.finalize();

  teardownShim();
  teardown();

  return new Blob([muxer.target.buffer], { type: 'video/mp4' });
}

// ── Modal UI ────────────────────────────────────────────────────────────────

function ExporterModal({ lpValue, onClose }) {
  // PNG-only mode for now; motion/MP4 path still exists in the code for later.
  const mode = 'static';

  // Static state
  const [staticKey, setStaticKey] = React.useState('t01');
  const staticItem = STATIC_EXPORTS.find((s) => s.key === staticKey);

  // Motion state (unused while mode === 'static')
  const [motionKey, setMotionKey] = React.useState('m02');
  const motion = MOTION_EXPORTS.find((m) => m.key === motionKey);

  // Shared
  const [aspect, setAspect] = React.useState('portrait');
  const preset = EXPORT_PRESETS[aspect];
  const [fps, setFps] = React.useState(30);
  const [durationMs, setDurationMs] = React.useState(9000);

  // When item or mode changes, reset aspect + duration defaults
  React.useEffect(() => {
    if (mode === 'static') setAspect(staticItem.defaultAspect);
  }, [staticKey, mode]);
  React.useEffect(() => {
    if (mode === 'motion') {
      setAspect(motion.defaultAspect);
      setDurationMs(Math.min(15000, Math.max(4000, motion.loopMs * 2)));
    }
  }, [motionKey, mode]);

  const [status, setStatus] = React.useState('idle');
  const [progress, setProgress] = React.useState(0);
  const [statusText, setStatusText] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  const [blobUrl, setBlobUrl] = React.useState(null);
  const [filename, setFilename] = React.useState('');
  const [resultMime, setResultMime] = React.useState('');

  const supported = typeof window !== 'undefined' && typeof window.VideoEncoder !== 'undefined';

  async function handleGenerate() {
    setStatus('working'); setProgress(0); setErrorText('');
    setStatusText('Preparando…');
    try {
      if (mode === 'static') {
        const Component = window[staticItem.Component];
        if (!Component) throw new Error(`Componente ${staticItem.Component} no encontrado.`);
        const blob = await exportStaticAsPng({
          Component, w: preset.w, h: preset.h, lpValue, onStatus: setStatusText,
        });
        const url = URL.createObjectURL(blob);
        const fname = `libra_${staticItem.key}_${preset.w}x${preset.h}.png`;
        setBlobUrl(url); setFilename(fname); setResultMime('image/png');
        setStatus('done');
      } else {
        const Component = window[motion.Component];
        if (!Component) throw new Error(`Componente ${motion.Component} no encontrado.`);
        const blob = await encodeMotionToMp4({
          Component, w: preset.w, h: preset.h, fps, durationMs, lpValue,
          onProgress: setProgress, onStatus: setStatusText,
        });
        const url = URL.createObjectURL(blob);
        const fname = `libra_${motion.key}_${preset.w}x${preset.h}_${(durationMs/1000).toFixed(0)}s.mp4`;
        setBlobUrl(url); setFilename(fname); setResultMime('video/mp4');
        setStatus('done');
      }
    } catch (e) {
      console.error(e); setErrorText(e.message || String(e)); setStatus('error');
    }
  }

  function handleDownload() {
    if (!blobUrl) return;
    const a = document.createElement('a');
    a.href = blobUrl; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
  }
  function handleReset() {
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    setBlobUrl(null); setStatus('idle'); setProgress(0); setStatusText('');
  }

  const totalFrames = Math.round((durationMs / 1000) * fps);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget && status !== 'working') onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"IBM Plex Mono", monospace',
        padding: 24,
      }}
    >
      <div style={{
        width: 520, maxWidth: '100%',
        background: '#000', color: '#fff',
        border: `2px solid #F7A810`,
        padding: '20px 22px 22px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        maxHeight: '92vh', overflowY: 'auto',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 22, letterSpacing: '-0.03em', lineHeight: 1, textTransform: 'uppercase' }}>Exportar PNG</div>
            <div style={{ fontSize: 10, color: '#F7A810', letterSpacing: '0.18em', marginTop: 6, textTransform: 'uppercase' }}>PLANTILLA ESTÁTICA · LISTA PARA INSTAGRAM</div>
          </div>
          <button onClick={onClose} disabled={status === 'working'} style={{
            all: 'unset', cursor: status === 'working' ? 'not-allowed' : 'pointer',
            color: '#fff', fontSize: 22, lineHeight: 1, padding: '0 4px',
            opacity: status === 'working' ? 0.3 : 0.8,
          }}>×</button>
        </div>

        {/* Tabs removed — PNG-only for now. Re-enable when motion export is ready. */}

        {/* Static form */}
        {status === 'idle' && mode === 'static' && (
          <>
            <Field label="PLANTILLA">
              <select value={staticKey} onChange={(e) => setStaticKey(e.target.value)} style={selectStyle}>
                {STATIC_EXPORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}{s.hasPhoto ? '  · 📷' : ''}
                  </option>
                ))}
              </select>
            </Field>

            {staticItem.hasPhoto && (
              <div style={{
                fontSize: 10, lineHeight: 1.5, color: '#F7A810',
                padding: '8px 10px', background: 'rgba(247,168,16,0.08)',
                border: '1px solid rgba(247,168,16,0.4)',
                marginBottom: 14, letterSpacing: '0.04em',
              }}>
                📷 Esta plantilla usa una <b>foto editable</b>. La foto que dejaste en el canvas se exportará dentro del PNG.
              </div>
            )}

            <Field label="FORMATO">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                {Object.entries(EXPORT_PRESETS).map(([k, p]) => (
                  <button key={k} onClick={() => setAspect(k)} style={{
                    ...optionBtn,
                    background: aspect === k ? '#F7A810' : 'transparent',
                    color: aspect === k ? '#000' : '#fff',
                    borderColor: aspect === k ? '#F7A810' : 'rgba(255,255,255,0.3)',
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>{p.label}</div>
                    <div style={{ fontSize: 9, opacity: 0.7, marginTop: 2, letterSpacing: '0.06em' }}>{p.hint}</div>
                  </button>
                ))}
              </div>
            </Field>

            <button onClick={handleGenerate} style={primaryBtn}>GENERAR PNG ▸</button>

            <div style={hintStyle}>
              Render directo de la plantilla a {preset.w}×{preset.h} px. Mantiene tus textos del panel Tweaks y la foto que dejaste en el slot.
            </div>
          </>
        )}

        {/* Motion form */}
        {status === 'idle' && mode === 'motion' && (
          <>
            {!supported && (
              <div style={{
                background: '#4B0082', color: '#fff', padding: 12,
                fontSize: 11, lineHeight: 1.5, letterSpacing: '0.05em',
                border: '1px solid #F7A810', marginBottom: 14,
              }}>
                ⚠ Tu navegador no soporta WebCodecs.<br/>
                Usa <b>Chrome, Edge o Safari 16.4+</b> para exportar MP4.
              </div>
            )}

            <Field label="MOTION GRAPHIC">
              <select value={motionKey} onChange={(e) => setMotionKey(e.target.value)} style={selectStyle}>
                {MOTION_EXPORTS.map((m) => (
                  <option key={m.key} value={m.key}>{m.label}</option>
                ))}
              </select>
            </Field>

            {motion.warning && (
              <div style={{
                fontSize: 10, lineHeight: 1.5, color: '#F7A810',
                padding: '8px 10px', background: 'rgba(247,168,16,0.08)',
                border: '1px solid rgba(247,168,16,0.4)',
                marginBottom: 14, letterSpacing: '0.04em',
              }}>{motion.warning}</div>
            )}

            <Field label="FORMATO">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                {Object.entries(EXPORT_PRESETS).map(([k, p]) => (
                  <button key={k} onClick={() => setAspect(k)} style={{
                    ...optionBtn,
                    background: aspect === k ? '#F7A810' : 'transparent',
                    color: aspect === k ? '#000' : '#fff',
                    borderColor: aspect === k ? '#F7A810' : 'rgba(255,255,255,0.3)',
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>{p.label}</div>
                    <div style={{ fontSize: 9, opacity: 0.7, marginTop: 2, letterSpacing: '0.06em' }}>{p.hint}</div>
                  </button>
                ))}
              </div>
            </Field>

            <Field label={`DURACIÓN · ${(durationMs/1000).toFixed(1)}s · ${totalFrames} frames`}>
              <input type="range" min="2000" max="20000" step="500"
                value={durationMs} onChange={(e) => setDurationMs(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F7A810' }} />
              <div style={{ fontSize: 9, color: '#F7A810', marginTop: 4, letterSpacing: '0.06em' }}>
                Loop original ≈ {(motion.loopMs/1000).toFixed(1)}s · recomendado 2 ciclos.
              </div>
            </Field>

            <Field label="FPS">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                {[24, 30, 60].map((f) => (
                  <button key={f} onClick={() => setFps(f)} style={{
                    ...optionBtn,
                    background: fps === f ? '#F7A810' : 'transparent',
                    color: fps === f ? '#000' : '#fff',
                    borderColor: fps === f ? '#F7A810' : 'rgba(255,255,255,0.3)',
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{f}</div>
                    <div style={{ fontSize: 8, opacity: 0.7, letterSpacing: '0.06em' }}>FPS</div>
                  </button>
                ))}
              </div>
            </Field>

            <button onClick={handleGenerate} disabled={!supported} style={{
              ...primaryBtn,
              opacity: supported ? 1 : 0.3,
              cursor: supported ? 'pointer' : 'not-allowed',
            }}>GENERAR VIDEO ▸</button>

            <div style={hintStyle}>
              El render toma ≈ 1 minuto para 9s @ 30fps. No cierres la ventana.
            </div>
          </>
        )}

        {/* Working */}
        {status === 'working' && (
          <div style={{ padding: '8px 0 4px' }}>
            <div style={{ fontSize: 10, color: '#F7A810', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              {statusText || 'Trabajando…'}
            </div>
            <div style={{
              marginTop: 12, height: 14, width: '100%',
              background: 'rgba(255,255,255,0.1)', overflow: 'hidden',
            }}>
              <div style={{
                width: `${Math.round((mode === 'static' ? 1 : progress) * 100)}%`, height: '100%',
                background: '#F7A810', transition: 'width 120ms linear',
              }} />
            </div>
            {mode === 'motion' && (
              <div style={{
                marginTop: 8, fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 11, color: '#fff', letterSpacing: '0.06em',
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span>{Math.round(progress * 100)}%</span>
                <span>{Math.round(progress * totalFrames)} / {totalFrames}</span>
              </div>
            )}
          </div>
        )}

        {/* Done */}
        {status === 'done' && (
          <div style={{ padding: '4px 0' }}>
            <div style={{ fontSize: 10, color: '#F7A810', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              ✓ Listo
            </div>
            <div style={{
              marginTop: 8, padding: '12px 14px',
              border: '1px solid rgba(255,255,255,0.2)',
              fontFamily: '"IBM Plex Mono", monospace', fontSize: 11,
              letterSpacing: '0.04em', wordBreak: 'break-all',
            }}>{filename}</div>

            {resultMime === 'video/mp4' ? (
              <video src={blobUrl} controls loop autoPlay muted playsInline style={{
                width: '100%', marginTop: 12,
                border: '1px solid rgba(255,255,255,0.15)', background: '#000',
              }} />
            ) : (
              <img src={blobUrl} style={{
                width: '100%', marginTop: 12, display: 'block',
                border: '1px solid rgba(255,255,255,0.15)', background: '#000',
              }} />
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8, marginTop: 14 }}>
              <button onClick={handleDownload} style={{
                all: 'unset', cursor: 'pointer', display: 'block', textAlign: 'center',
                background: '#F7A810', color: '#000', padding: '12px 0',
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 14, letterSpacing: '-0.02em', textTransform: 'uppercase',
              }}>DESCARGAR ↓</button>
              <button onClick={handleReset} style={{
                all: 'unset', cursor: 'pointer', display: 'block', textAlign: 'center',
                background: 'transparent', color: '#fff',
                border: '1px solid rgba(255,255,255,0.4)',
                padding: '12px 0',
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>OTRO</button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div style={{ padding: '4px 0' }}>
            <div style={{ fontSize: 10, color: '#F7A810', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              ⚠ ERROR
            </div>
            <div style={{
              marginTop: 8, padding: '12px 14px',
              background: '#4B0082', color: '#fff',
              fontSize: 11, lineHeight: 1.5, letterSpacing: '0.04em',
            }}>{errorText}</div>
            <button onClick={handleReset} style={{
              ...primaryBtn, marginTop: 12,
            }}>VOLVER</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Style helpers ──────────────────────────────────────────────────────────

const selectStyle = {
  width: '100%', boxSizing: 'border-box',
  padding: '8px 10px',
  background: '#000', color: '#fff',
  border: '1px solid rgba(255,255,255,0.3)',
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: 12, letterSpacing: '0.06em',
  borderRadius: 0, appearance: 'auto',
};

const optionBtn = {
  all: 'unset', cursor: 'pointer', textAlign: 'center',
  padding: '8px 6px',
  border: '1px solid', boxSizing: 'border-box',
  fontFamily: '"IBM Plex Mono", monospace',
  textTransform: 'uppercase',
};

const primaryBtn = {
  all: 'unset', cursor: 'pointer', display: 'block', textAlign: 'center',
  width: '100%', boxSizing: 'border-box',
  background: '#F7A810', color: '#000',
  padding: '14px 18px', marginTop: 8,
  fontFamily: '"Archivo Black", sans-serif',
  fontSize: 16, letterSpacing: '-0.02em', textTransform: 'uppercase',
};

const hintStyle = {
  fontSize: 9, color: 'rgba(255,255,255,0.5)',
  marginTop: 12, lineHeight: 1.55, letterSpacing: '0.05em',
};

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        fontSize: 9, color: '#F7A810', letterSpacing: '0.2em',
        textTransform: 'uppercase', marginBottom: 6,
      }}>{label}</div>
      {children}
    </div>
  );
}

// ── Floating button entry point ────────────────────────────────────────────

function MotionExporterButton() {
  const lp = useLP();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Exportar plantilla como PNG para Instagram"
        style={{
          all: 'unset', cursor: 'pointer',
          position: 'fixed', left: 20, bottom: 20, zIndex: 9999,
          background: '#000', color: '#fff',
          border: '2px solid #F7A810',
          padding: '12px 18px',
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
        }}
      >
        <span style={{ color: '#F7A810', fontSize: 14 }}>↓</span>
        <span>EXPORTAR PNG</span>
      </button>
      {open && (
        <ExporterModal lpValue={lp} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

Object.assign(window, {
  MotionExporterButton,
  encodeMotionToMp4,
  exportStaticAsPng,
  MOTION_EXPORTS,
  STATIC_EXPORTS,
  EXPORT_PRESETS,
});

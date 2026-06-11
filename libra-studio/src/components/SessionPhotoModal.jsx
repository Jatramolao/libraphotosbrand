import { useMemo, useRef, useState } from 'react';
import { TEMPLATES } from '../data/templates-meta';
import { usePhotos } from '../context/PhotoContext';

const LF = { amber: '#F7A810', black: '#000', white: '#fff', mono: '"IBM Plex Mono", monospace', display: '"Archivo Black", sans-serif' };

// A5 — Foto de sesión: sube una foto una vez y se propaga a los slots
// protagonistas de todas las plantillas (mainSlot en el registry).
export default function SessionPhotoModal({ onClose }) {
  const { photos, setManyPhotos } = usePhotos();
  const [dataUrl, setDataUrl] = useState(null);
  const [overwrite, setOverwrite] = useState(false);
  const [over, setOver] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef();

  const mainTargets = useMemo(() => TEMPLATES.filter(t => t.mainSlot), []);
  const emptyTargets = mainTargets.filter(t => !photos[t.mainSlot]);
  const targets = overwrite ? mainTargets : emptyTargets;
  const occupied = mainTargets.length - emptyTargets.length;

  const handleFile = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = e => setDataUrl(e.target.result);
    r.readAsDataURL(file);
  };

  const apply = async () => {
    const map = {};
    for (const t of targets) map[t.mainSlot] = { url: dataUrl, scale: 1, x: 0, y: 0 };
    await setManyPhotos(map);
    setDone(true);
    setTimeout(onClose, 1200);
  };

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <div style={{ background: '#111', border: `2px solid ${LF.amber}`, width: 440, fontFamily: LF.mono, color: LF.white }}>
        {/* Header */}
        <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: LF.display, fontSize: 18, letterSpacing: '-0.03em' }}>
            FOTO DE <span style={{ color: LF.amber }}>SESIÓN</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 22, cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ padding: '20px 22px' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div style={{ fontFamily: LF.display, fontSize: 32, color: LF.amber }}>✓ APLICADA</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.14em', marginTop: 10 }}>
                {targets.length} PLANTILLAS ACTUALIZADAS
              </div>
            </div>
          ) : (
            <>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, letterSpacing: '0.04em', marginBottom: 16 }}>
                Sube una foto una sola vez y se aplicará al slot principal de las{' '}
                <strong style={{ color: LF.amber }}>{mainTargets.length} plantillas con foto protagonista</strong>.
                Después puedes encuadrar o reemplazar cada una individualmente.
              </p>

              {/* Drop zone / preview */}
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setOver(true); }}
                onDragLeave={() => setOver(false)}
                onDrop={e => { e.preventDefault(); setOver(false); handleFile(e.dataTransfer.files[0]); }}
                style={{
                  height: 180, marginBottom: 16, cursor: 'pointer',
                  border: `2px ${dataUrl ? 'solid' : 'dashed'} ${over ? LF.amber : 'rgba(255,255,255,0.25)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: dataUrl ? `#000 center/contain no-repeat url(${JSON.stringify(dataUrl)})` : 'rgba(255,255,255,0.03)',
                  fontSize: 10, letterSpacing: '0.16em', color: over ? LF.amber : 'rgba(255,255,255,0.45)',
                }}
              >
                {!dataUrl && (over ? '+ SOLTAR FOTO' : 'ARRASTRA TU FOTO O HAZ CLIC')}
              </div>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => { handleFile(e.target.files[0]); e.target.value = ''; }} />

              {/* Overwrite toggle */}
              {occupied > 0 && (
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 10, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', marginBottom: 16, cursor: 'pointer' }}>
                  <input type="checkbox" checked={overwrite} onChange={e => setOverwrite(e.target.checked)} style={{ accentColor: LF.amber }} />
                  SOBRESCRIBIR LAS {occupied} PLANTILLAS QUE YA TIENEN FOTO
                </label>
              )}

              <button
                onClick={apply}
                disabled={!dataUrl || targets.length === 0}
                style={{
                  width: '100%', border: 'none', padding: '15px',
                  background: dataUrl && targets.length > 0 ? LF.amber : 'rgba(255,255,255,0.1)',
                  color: dataUrl && targets.length > 0 ? LF.black : 'rgba(255,255,255,0.3)',
                  fontFamily: LF.display, fontSize: 17, letterSpacing: '-0.02em',
                  cursor: dataUrl && targets.length > 0 ? 'pointer' : 'not-allowed',
                }}
              >
                APLICAR A {targets.length} PLANTILLAS
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

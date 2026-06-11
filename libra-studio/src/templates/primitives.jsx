import { useContext, useRef, useState } from 'react';
import { LPContext } from '../context/LPContent';
import { PhotoContext } from '../context/PhotoContext';
import { normalizePhoto, withFraming, clampFraming, MIN_SCALE, MAX_SCALE } from '../lib/photoRecord';

export const LF = {
  black: '#000000', amber: '#F7A810', white: '#FFFFFF', violet: '#4B0082',
  gridLine: 'rgba(255,255,255,0.18)', gridLineDark: 'rgba(0,0,0,0.18)',
  display: '"Archivo Black", "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, monospace',
  serif: '"Lora", Georgia, serif',
};

export function useLP() { return useContext(LPContext); }

export function lpLines(str) {
  if (str == null) return null;
  const parts = String(str).split('\n');
  return parts.map((line, i) => (
    <span key={i}>{line}{i < parts.length - 1 ? <br /> : null}</span>
  ));
}

const slotBtn = (primary) => ({
  background: primary ? LF.amber : 'transparent',
  color: primary ? LF.black : 'rgba(255,255,255,0.75)',
  border: primary ? 'none' : '1px solid rgba(255,255,255,0.35)',
  padding: primary ? '7px 14px' : '5px 14px',
  fontFamily: LF.mono, fontSize: 9,
  letterSpacing: '0.16em', cursor: 'pointer', textTransform: 'uppercase',
});

export function PhotoSlot({ slotId, placeholder = 'FOTO · LIBRA', style = {}, tone = 'dark' }) {
  const ctx = useContext(PhotoContext);
  const photo = normalizePhoto(ctx?.photos?.[slotId]);
  const [over, setOver] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [adjusting, setAdjusting] = useState(false); // modo encuadre (A6)
  const [draft, setDraft] = useState(null);          // encuadre en edición
  const fileRef = useRef();
  const dragRef = useRef(null);
  const boxRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || !ctx) return;
    const url = await new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = e => res(e.target.result);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
    ctx.setPhoto(slotId, { url, scale: 1, x: 0, y: 0 });
  };

  const startAdjust = (e) => {
    e.stopPropagation();
    setDraft({ scale: photo.scale, x: photo.x, y: photo.y });
    setAdjusting(true);
  };
  const applyAdjust = (e) => {
    e.stopPropagation();
    ctx?.setPhoto(slotId, withFraming(photo, draft));
    setAdjusting(false);
    setDraft(null);
  };
  const zoomBy = (delta) => {
    setDraft(d => clampFraming({ scale: (d?.scale ?? 1) + delta, x: d?.x ?? 0, y: d?.y ?? 0 }));
  };
  const onPointerDown = (e) => {
    if (!adjusting) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { sx: e.clientX, sy: e.clientY, x: draft.x, y: draft.y };
  };
  const onPointerMove = (e) => {
    if (!adjusting || !dragRef.current) return;
    const box = boxRef.current?.getBoundingClientRect();
    if (!box) return;
    const dx = ((e.clientX - dragRef.current.sx) / box.width) * 100;
    const dy = ((e.clientY - dragRef.current.sy) / box.height) * 100;
    setDraft(d => clampFraming({ scale: d.scale, x: dragRef.current.x + dx, y: dragRef.current.y + dy }));
  };
  const onPointerUp = () => { dragRef.current = null; };
  const onWheel = (e) => {
    if (!adjusting) return;
    e.preventDefault();
    zoomBy(e.deltaY < 0 ? 0.08 : -0.08);
  };

  const bg = tone === 'dark'
    ? 'repeating-linear-gradient(135deg, #181818 0 8px, #1f1f1f 8px 16px)'
    : 'repeating-linear-gradient(135deg, #d6d2c9 0 8px, #ddd9d0 8px 16px)';

  const framing = adjusting && draft ? draft : photo;

  return (
    <div
      ref={boxRef}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setOver(false); }}
      onDragOver={e => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); handleFile(e.dataTransfer.files[0]); }}
      onClick={() => !photo && fileRef.current?.click()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onWheel={onWheel}
    >
      {photo ? (
        <>
          <img
            src={photo.url} alt=""
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              pointerEvents: 'none',
              transform: `translate(${framing.x}%, ${framing.y}%) scale(${framing.scale})`,
              transformOrigin: 'center',
            }}
          />
          {/* Modo encuadre: arrastra para mover, rueda o botones para zoom */}
          {adjusting && (
            <div style={{
              position: 'absolute', inset: 0,
              outline: `2px dashed ${LF.amber}`, outlineOffset: -2,
              cursor: 'grab',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{
                alignSelf: 'center', marginTop: 6,
                background: 'rgba(0,0,0,0.7)', color: LF.amber,
                fontFamily: LF.mono, fontSize: 8, letterSpacing: '0.14em',
                padding: '3px 8px', pointerEvents: 'none',
              }}>ARRASTRA · RUEDA = ZOOM</div>
              <div style={{
                alignSelf: 'center', marginBottom: 6,
                display: 'flex', gap: 4,
              }}>
                <button onClick={e => { e.stopPropagation(); zoomBy(-0.15); }} disabled={framing.scale <= MIN_SCALE}
                  style={{ ...slotBtn(false), background: 'rgba(0,0,0,0.7)', padding: '4px 10px' }}>−</button>
                <button onClick={e => { e.stopPropagation(); zoomBy(0.15); }} disabled={framing.scale >= MAX_SCALE}
                  style={{ ...slotBtn(false), background: 'rgba(0,0,0,0.7)', padding: '4px 10px' }}>+</button>
                <button onClick={e => { e.stopPropagation(); setDraft({ scale: 1, x: 0, y: 0 }); }}
                  style={{ ...slotBtn(false), background: 'rgba(0,0,0,0.7)', padding: '4px 10px' }}>RESET</button>
                <button onClick={applyAdjust} style={{ ...slotBtn(true), padding: '4px 12px' }}>✓ LISTO</button>
              </div>
            </div>
          )}
          {/* Hover overlay: encuadrar / cambiar / eliminar */}
          {!adjusting && (hovered || over) && (
            <div style={{
              position: 'absolute', inset: 0,
              background: over ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.42)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 7,
              outline: over ? `2px solid ${LF.amber}` : 'none',
              outlineOffset: -2,
            }}>
              {over ? (
                <span style={{ fontFamily: LF.mono, fontSize: 10, color: LF.amber, letterSpacing: '0.14em' }}>+ SOLTAR PARA REEMPLAZAR</span>
              ) : (
                <>
                  <button onClick={startAdjust} style={slotBtn(true)}>✥ ENCUADRAR</button>
                  <button onClick={e => { e.stopPropagation(); fileRef.current?.click(); }} style={slotBtn(false)}>↺ CAMBIAR FOTO</button>
                  <button onClick={e => { e.stopPropagation(); ctx?.deletePhoto(slotId); }} style={slotBtn(false)}>× ELIMINAR</button>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <div style={{
          width: '100%', height: '100%', background: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: LF.mono, fontSize: 10, letterSpacing: '0.1em',
          color: tone === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)',
          cursor: 'pointer',
          outline: over ? `2px solid ${LF.amber}` : 'none',
          outlineOffset: -2,
          textTransform: 'uppercase',
        }}>
          {over ? '+ SOLTAR' : placeholder}
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => { handleFile(e.target.files[0]); e.target.value = ''; }} />
    </div>
  );
}

export const Rule = ({ color = LF.white, vertical = false, style = {} }) => (
  <div style={{ background: color, width: vertical ? 1 : '100%', height: vertical ? '100%' : 1, ...style }} />
);

export const LFMark = ({ size = 14, color = LF.white, style = {}, text }) => {
  const lp = useLP();
  return (
    <span style={{ fontFamily: LF.display, fontSize: size, letterSpacing: '-0.04em', color, lineHeight: 1, display: 'inline-block', ...style }}>
      {text ?? lp?.monogram ?? 'LP'}
    </span>
  );
};

export const TechStrip = ({ children, color = LF.white, size = 9, style = {} }) => (
  <div style={{ fontFamily: LF.mono, fontSize: size, color, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 400, ...style }}>
    {children}
  </div>
);

export function Frame({ width, height, bg = LF.black, children, style = {} }) {
  return (
    <div style={{ width, height, background: bg, position: 'relative', overflow: 'hidden', fontFamily: LF.display, color: LF.white, ...style }}>
      {children}
    </div>
  );
}

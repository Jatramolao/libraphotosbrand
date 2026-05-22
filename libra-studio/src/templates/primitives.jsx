import { useContext, useRef, useState } from 'react';
import { LPContext } from '../context/LPContent';
import { PhotoContext } from '../context/PhotoContext';

export const LF = {
  black: '#000000', amber: '#F7A810', white: '#FFFFFF', violet: '#4B0082',
  gridLine: 'rgba(255,255,255,0.18)', gridLineDark: 'rgba(0,0,0,0.18)',
  display: '"Archivo Black", "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, monospace',
};

export function useLP() { return useContext(LPContext); }

export function lpLines(str) {
  if (str == null) return null;
  const parts = String(str).split('\n');
  return parts.map((line, i) => (
    <span key={i}>{line}{i < parts.length - 1 ? <br /> : null}</span>
  ));
}

export function PhotoSlot({ slotId, placeholder = 'FOTO · LIBRA', style = {}, tone = 'dark' }) {
  const ctx = useContext(PhotoContext);
  const photo = ctx?.photos?.[slotId];
  const [over, setOver] = useState(false);
  const fileRef = useRef();

  const handleFile = async (file) => {
    if (!file || !ctx) return;
    const url = await new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = e => res(e.target.result);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
    ctx.setPhoto(slotId, url);
  };

  const bg = tone === 'dark'
    ? 'repeating-linear-gradient(135deg, #181818 0 8px, #1f1f1f 8px 16px)'
    : 'repeating-linear-gradient(135deg, #d6d2c9 0 8px, #ddd9d0 8px 16px)';

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...style }}
      onDragOver={e => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); handleFile(e.dataTransfer.files[0]); }}
      onClick={() => !photo && fileRef.current?.click()}
    >
      {photo ? (
        <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }} />
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

// Plantillas T26–T28 — LIBRA FOTOS (lote 3 del diseño v2)
// T26/T27 espejan el "Portafolio Editorial" del sitio (blanco, limpio, sin
// overlays — estilo Vogue) y T28 cubre el core de eventos musicales.
import { LF, useLP, PhotoSlot, Frame, LFMark, TechStrip } from './primitives';

// ─── T26 · PORTAFOLIO EDITORIAL (4:5 · BLANCO) ──────────────────────────────
// Foto 3:4 limpia centrada, márgenes generosos, caption en Lora itálica,
// marca de agua LF violeta al 10% (spec del manual)
export function T26_PortfolioEditorial({ w = 540, h = 675 }) {
  const lp = useLP();
  const pad = 36;
  const photoH = Math.round(h * 0.705);
  const photoW = Math.round(photoH * 3 / 4);
  const photoX = Math.round((w - photoW) / 2);
  return (
    <Frame width={w} height={h} bg={LF.white}>
      <div style={{
        position: 'absolute', right: -8, bottom: -26,
        fontFamily: LF.display, fontSize: 170, lineHeight: 1,
        letterSpacing: '-0.06em', color: LF.violet, opacity: 0.10,
        pointerEvents: 'none',
      }}>{lp.monogram}</div>

      <div style={{
        position: 'absolute', top: 20, left: pad, right: pad,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <TechStrip size={9} color={LF.black} style={{ whiteSpace: 'nowrap' }}>{lp.t26Stamp}</TechStrip>
        <TechStrip size={9} color={LF.black} style={{ whiteSpace: 'nowrap' }}>{lp.t26Index}</TechStrip>
      </div>

      <div style={{
        position: 'absolute', top: 48, left: photoX, width: photoW, height: photoH,
        border: `1px solid ${LF.black}`, padding: 1, boxSizing: 'border-box',
        background: LF.white,
      }}>
        <PhotoSlot slotId="t26-photo" placeholder="EDITORIAL · 3:4 · SIN OVERLAYS" tone="light" />
      </div>

      <div style={{ position: 'absolute', left: pad, right: pad, bottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <div style={{
            fontFamily: LF.display, color: LF.black,
            fontSize: 25, lineHeight: 0.92, letterSpacing: '-0.04em', textTransform: 'uppercase',
          }}>{lp.designer}</div>
          <LFMark size={16} color={LF.black} />
        </div>
        <div style={{
          fontFamily: LF.serif, fontStyle: 'italic', color: LF.black,
          fontSize: 13.5, lineHeight: 1.45, marginTop: 7, textWrap: 'pretty',
        }}>{lp.t26Caption}</div>
        <div style={{
          marginTop: 10, paddingTop: 8, borderTop: `1px solid ${LF.black}`,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <TechStrip size={8.5} color="#666666">"{lp.collection}" · SS26</TechStrip>
          <TechStrip size={8.5} color="#666666">{lp.t26Meta}</TechStrip>
        </div>
      </div>
    </Frame>
  );
}

// ─── T27 · EDITORIAL SPREAD (1:1 · BLANCO) ──────────────────────────────────
// Doble página de revista: dos figuras 3:4 con numeración FIG. y caption Lora
export function T27_EditorialSpread({ w = 540, h = 540 }) {
  const lp = useLP();
  const pad = 30;
  const colW = (w - pad * 2 - 14) / 2;
  const photoH = Math.round(colW * 4 / 3);
  const figs = [
    { id: 't27-photo-1', label: lp.t27Fig1, ph: 'FIG. 01 · SILUETA' },
    { id: 't27-photo-2', label: lp.t27Fig2, ph: 'FIG. 02 · DETALLE' },
  ];
  return (
    <Frame width={w} height={h} bg={LF.white}>
      <div style={{
        position: 'absolute', top: 20, left: pad, right: pad,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <TechStrip size={9} color={LF.black}>{lp.t27Stamp}</TechStrip>
        <LFMark size={16} color={LF.black} />
      </div>

      <div style={{
        position: 'absolute', top: 52, left: pad, right: pad,
        display: 'flex', gap: 14,
      }}>
        {figs.map((f) => (
          <div key={f.id} style={{ width: colW }}>
            <div style={{
              width: '100%', height: photoH,
              border: `1px solid ${LF.black}`, padding: 1, boxSizing: 'border-box',
            }}>
              <PhotoSlot slotId={f.id} placeholder={f.ph} tone="light" />
            </div>
            <div style={{
              fontFamily: LF.mono, fontSize: 8.5, color: LF.black,
              letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 7,
            }}>{f.label}</div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', left: pad, right: pad, bottom: 20 }}>
        <div style={{
          fontFamily: LF.serif, fontStyle: 'italic', color: LF.black,
          fontSize: 13, lineHeight: 1.45, textWrap: 'pretty', maxWidth: '88%',
        }}>{lp.t27Caption}</div>
        <div style={{
          marginTop: 10, paddingTop: 8, borderTop: `1px solid ${LF.black}`,
          display: 'flex', justifyContent: 'space-between',
        }}>
          <TechStrip size={8.5} color="#666666">{lp.brand} — SS / 26</TechStrip>
          <TechStrip size={8.5} color="#666666">{lp.t27Pages}</TechStrip>
        </div>
      </div>
    </Frame>
  );
}

// ─── T28 · MUSIC EVENT / GIG REPORT (4:5 · NEGRO) ───────────────────────────
// Core #1 del ecosistema: eventos musicales. Banda lateral ámbar con specs
// y bloque tipográfico masivo
export function T28_GigReport({ w = 540, h = 675 }) {
  const lp = useLP();
  const bandW = 34;
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{ position: 'absolute', top: 0, left: bandW, right: 0, bottom: 168 }}>
        <PhotoSlot slotId="t28-photo" placeholder="LIVE · ADRENALINA CONGELADA"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 26%)',
          pointerEvents: 'none',
        }} />
      </div>

      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: bandW,
        background: LF.amber,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          writingMode: 'vertical-rl', transform: 'rotate(180deg)',
          fontFamily: LF.mono, fontSize: 9.5, color: LF.black,
          letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>{lp.t28VertLabel}</div>
      </div>

      <div style={{
        position: 'absolute', top: 16, left: bandW + 18, right: 18,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'rgba(0,0,0,0.65)', padding: '4px 8px',
        }}>
          <span style={{ width: 7, height: 7, background: LF.amber, display: 'inline-block' }} />
          <TechStrip size={9} color={LF.white}>{lp.t28Stamp}</TechStrip>
        </div>
        <LFMark size={20} color={LF.amber} />
      </div>

      <div style={{
        position: 'absolute', left: bandW, right: 0, bottom: 0, height: 168,
        background: LF.black, borderTop: `2px solid ${LF.amber}`,
        padding: '14px 18px 0',
      }}>
        <TechStrip size={9} color={LF.amber}>{lp.t28Kicker}</TechStrip>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 44, lineHeight: 0.86, letterSpacing: '-0.05em',
          textTransform: 'uppercase', marginTop: 6,
        }}>{(() => {
          const parts = (lp.t28Title || 'EL CAOS\nDOCUMENTADO.').split('\n');
          return parts.map((line, i) => {
            const isLast = i === parts.length - 1;
            return (
              <span key={i}>
                {isLast ? <span style={{ color: LF.amber }}>{line}</span> : line}
                {!isLast && <br />}
              </span>
            );
          });
        })()}</div>
      </div>

      <div style={{
        position: 'absolute', left: bandW + 18, right: 18, bottom: 12,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        borderTop: '1px solid rgba(255,255,255,0.22)', paddingTop: 9,
      }}>
        <TechStrip size={8.5} color={LF.white}>{lp.t28Venue} · {lp.t28Date}</TechStrip>
        <TechStrip size={8.5} color={LF.amber}>{lp.t28Cta}</TechStrip>
      </div>
    </Frame>
  );
}

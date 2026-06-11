// Plantillas T11–T17 — LIBRA FOTOS (diseño v2, jun-2026)
import { LF, useLP, lpLines, PhotoSlot, Frame, LFMark, TechStrip } from './primitives';

// ─── T11 · DROP / TEASER (4:5) ──────────────────────────────────────────────
// Anuncio de nueva edición — fecha + diseñador + locación, foto con corte diagonal
export function T11_DropTeaser({ w = 540, h = 675 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        background: LF.amber, color: LF.black,
        padding: '8px 22px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: LF.mono, fontSize: 10, letterSpacing: '0.22em',
        fontWeight: 700, textTransform: 'uppercase',
      }}>
        <span>PRÓXIMAMENTE · DROP {lp.date}</span>
        <span>{lp.monogram}</span>
      </div>

      <div style={{ position: 'absolute', top: 60, left: 22, right: 22 }}>
        <TechStrip size={10} color={LF.amber}>EDITORIAL · CHAPTER {String(Number(lp.edition) + 1).padStart(2, '0')}</TechStrip>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 96, lineHeight: 0.82, letterSpacing: '-0.05em',
          textTransform: 'uppercase', marginTop: 10,
        }}>{(() => {
          const parts = (lp.t11Title || 'NEW\nDROP.').split('\n');
          return parts.map((line, i) => {
            const isLast = i === parts.length - 1;
            const endsDot = line.endsWith('.');
            const head = endsDot ? line.slice(0, -1) : line;
            return (
              <span key={i}>
                {head}
                {endsDot && <span style={{ color: LF.amber }}>.</span>}
                {!isLast && <br />}
              </span>
            );
          });
        })()}</div>
      </div>

      <div style={{
        position: 'absolute', top: 290, left: 22, right: 22, bottom: 140,
        clipPath: 'polygon(0 12%, 100% 0, 100% 88%, 0 100%)',
      }}>
        <PhotoSlot slotId="t11-main" placeholder="TEASER · DROP 08" />
      </div>

      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 60,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12,
        borderTop: `1px solid ${LF.amber}`, paddingTop: 12,
      }}>
        {[
          ['DISEÑADOR', lp.designer],
          ['LOCACIÓN', lp.location],
          ['HORA', lp.hour],
        ].map((c, i) => (
          <div key={i}>
            <div style={{ fontFamily: LF.mono, fontSize: 8, color: LF.amber, letterSpacing: '0.2em' }}>{c[0]}</div>
            <div style={{ fontFamily: LF.mono, fontSize: 11, color: LF.white, letterSpacing: '0.06em', marginTop: 4, fontWeight: 600 }}>{c[1]}</div>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 22px',
        background: LF.amber, color: LF.black,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: LF.mono, fontSize: 11, letterSpacing: '0.18em',
        fontWeight: 700, textTransform: 'uppercase',
      }}>
        <span>{lp.t11Cta}</span>
        <span>{(lp.date || '').split('.').slice(0, 2).join('.')}</span>
      </div>
    </Frame>
  );
}

// ─── T12 · DESIGNER SPOTLIGHT (4:5 · BLANCO) ────────────────────────────────
// Feature card para una marca/diseñador fotografiado
export function T12_DesignerSpotlight({ w = 540, h = 675 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.white}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '14px 22px',
        borderBottom: `2px solid ${LF.black}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <TechStrip size={10} color={LF.black}>{lp.t12Stamp}</TechStrip>
        <LFMark size={14} color={LF.black} />
      </div>

      <div style={{ position: 'absolute', top: 56, left: 22, right: 22 }}>
        <div style={{
          fontFamily: LF.mono, fontSize: 10, color: LF.black,
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>{lp.t12SectionLabel}</div>
        <div style={{
          fontFamily: LF.display, fontSize: 56, color: LF.black,
          lineHeight: 0.88, letterSpacing: '-0.04em',
          textTransform: 'uppercase', marginTop: 6,
        }}>{lpLines((lp.designer || '').replace(' ', '\n') + '.')}</div>
      </div>

      <div style={{
        position: 'absolute', left: 22, right: 22, top: 240, height: 290,
        border: `2px solid ${LF.black}`,
      }}>
        <PhotoSlot slotId="t12-main" placeholder="LOOK · CAMPAÑA SS26" tone="dark" />
      </div>

      <div style={{ position: 'absolute', left: 22, right: 22, bottom: 18 }}>
        <div style={{
          borderTop: `1px solid ${LF.black}`, paddingTop: 10,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
          fontFamily: LF.mono, fontSize: 10, color: LF.black, letterSpacing: '0.08em',
        }}>
          <div>
            <div style={{ color: LF.amber, background: LF.black, padding: '2px 5px', display: 'inline-block', letterSpacing: '0.16em' }}>COLECCIÓN</div>
            <div style={{ marginTop: 4 }}>"{lp.collection}" · SS26</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: LF.amber, background: LF.black, padding: '2px 5px', display: 'inline-block', letterSpacing: '0.16em' }}>SHOT BY</div>
            <div style={{ marginTop: 4 }}>{lp.brand}</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─── T13 · EVENT POSTER (4:5) ───────────────────────────────────────────────
// Flyer brutalista para semanas de moda o eventos
export function T13_EventPoster({ w = 540, h = 675 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
        backgroundSize: '54px 100%', opacity: 0.4,
      }} />

      <div style={{
        position: 'absolute', top: 18, left: 22, right: 22,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <TechStrip size={9} color={LF.amber}>{lp.t13TopLeft}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t13TopRight}</TechStrip>
      </div>

      <div style={{ position: 'absolute', top: 60, left: 22, right: 22 }}>
        <div style={{
          fontFamily: LF.display, color: LF.amber,
          fontSize: 108, lineHeight: 0.82,
          letterSpacing: '-0.06em', textTransform: 'uppercase',
        }}>{(() => {
          const parts = (lp.t13Title || 'FASHION\nWEEK\nSTGO.').split('\n');
          return parts.map((line, i) => {
            const isLast = i === parts.length - 1;
            return (
              <span key={i}>
                {isLast ? <span style={{ color: LF.white }}>{line}</span> : line}
                {!isLast && <br />}
              </span>
            );
          });
        })()}</div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, top: 380,
        background: LF.white, color: LF.black,
        padding: '10px 22px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: LF.mono, fontSize: 14, letterSpacing: '0.14em',
        fontWeight: 700, textTransform: 'uppercase',
      }}>
        <span>{lp.t13Dates}</span>
        <span style={{ background: LF.amber, padding: '2px 8px' }}>{lp.t13Nights}</span>
      </div>

      <div style={{ position: 'absolute', left: 22, right: 22, top: 430 }}>
        <div style={{ fontFamily: LF.mono, fontSize: 10, color: LF.amber, letterSpacing: '0.2em' }}>{lp.t13LineupLabel}</div>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 20, lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: 8,
        }}>{lpLines(lp.t13Lineup)}</div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '12px 22px',
        background: LF.amber, color: LF.black,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: LF.mono, fontSize: 11, letterSpacing: '0.18em',
        fontWeight: 700, textTransform: 'uppercase',
      }}>
        <span>{lp.t13Footer}</span>
        <span>▸</span>
      </div>
    </Frame>
  );
}

// ─── T14 · BOOKING / SERVICIOS (4:5) ────────────────────────────────────────
// CTA para agendar editoriales — descripciones en Lora
export function T14_Booking({ w = 540, h = 675 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '14px 22px',
        borderBottom: `1px solid ${LF.amber}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <TechStrip size={10} color={LF.amber}>{lp.t14Stamp}</TechStrip>
        <LFMark size={16} color={LF.amber} />
      </div>

      <div style={{ position: 'absolute', top: 60, left: 22, right: 22 }}>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 60, lineHeight: 0.86, letterSpacing: '-0.04em', textTransform: 'uppercase',
        }}>{(() => {
          const parts = (lp.t14Headline || 'RESERVA\nTU\nEDITORIAL.').split('\n');
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

      <div style={{ position: 'absolute', left: 22, right: 22, top: 280 }}>
        {[
          [lp.t14S1Tag, lp.t14S1Desc, lp.t14S1Price],
          [lp.t14S2Tag, lp.t14S2Desc, lp.t14S2Price],
          [lp.t14S3Tag, lp.t14S3Desc, lp.t14S3Price],
        ].map((row, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '90px 1fr 100px',
            padding: '10px 0', gap: 12,
            borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.18)' : `1px solid ${LF.amber}`,
            fontFamily: LF.mono, fontSize: 11, color: LF.white,
            letterSpacing: '0.06em', alignItems: 'baseline',
          }}>
            <span style={{ color: LF.amber, letterSpacing: '0.16em', fontWeight: 700 }}>{row[0]}</span>
            <span style={{ fontFamily: LF.serif, fontSize: 12.5, letterSpacing: 0, opacity: 0.88 }}>{row[1]}</span>
            <span style={{ textAlign: 'right', color: LF.amber, fontWeight: 700 }}>{row[2]}</span>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 70,
        background: LF.amber, color: LF.black,
        padding: '16px 18px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: LF.display, fontSize: 22,
        letterSpacing: '-0.02em', textTransform: 'uppercase',
      }}>
        <span>{lp.t14CtaTitle}</span>
        <span style={{ fontFamily: LF.mono, fontSize: 11, letterSpacing: '0.18em', fontWeight: 700 }}>{lp.t14CtaSub}</span>
      </div>

      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 24,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: LF.mono, fontSize: 10, color: LF.white,
        letterSpacing: '0.14em', textTransform: 'uppercase',
      }}>
        <span>{(lp.handle || '').toUpperCase()}</span>
        <span style={{ color: LF.amber }}>{lp.site}</span>
      </div>
    </Frame>
  );
}

// ─── T15 · BEFORE / AFTER (1:1 / 4:5) ───────────────────────────────────────
// Díptico comparativo crudo vs editado
export function T15_BeforeAfter({ w = 540, h = 540 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '12px 18px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(0,0,0,0.9)', zIndex: 2,
      }}>
        <TechStrip size={9} color={LF.amber}>{lp.t15Stamp}</TechStrip>
        <LFMark size={14} color={LF.amber} />
      </div>

      <div style={{ position: 'absolute', top: 44, left: 14, width: (w - 30) / 2, bottom: 44 }}>
        <PhotoSlot slotId="t15-raw" placeholder="ANTES · RAW" tone="dark" />
        <div style={{
          position: 'absolute', top: 8, left: 8,
          background: LF.white, color: LF.black,
          padding: '3px 7px',
          fontFamily: LF.mono, fontSize: 9, letterSpacing: '0.18em', fontWeight: 700,
          pointerEvents: 'none',
        }}>{lp.t15RawTag}</div>
        <div style={{
          position: 'absolute', bottom: -22, left: 0,
          fontFamily: LF.mono, fontSize: 9, color: LF.white, letterSpacing: '0.18em',
        }}>{lp.t15RawSub}</div>
      </div>

      <div style={{
        position: 'absolute', top: 44, bottom: 44, left: w / 2 - 0.5, width: 1,
        background: LF.amber, zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', left: w / 2 - 14, top: '50%', transform: 'translateY(-50%)',
        width: 28, height: 28, background: LF.amber,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: LF.display, fontSize: 18, color: LF.black, zIndex: 3,
        pointerEvents: 'none',
      }}>▸</div>

      <div style={{ position: 'absolute', top: 44, right: 14, width: (w - 30) / 2, bottom: 44 }}>
        <PhotoSlot slotId="t15-final" placeholder="DESPUÉS · FINAL" tone="dark" />
        <div style={{
          position: 'absolute', top: 8, left: 8,
          background: LF.amber, color: LF.black,
          padding: '3px 7px',
          fontFamily: LF.mono, fontSize: 9, letterSpacing: '0.18em', fontWeight: 700,
          pointerEvents: 'none',
        }}>{lp.t15FinalTag}</div>
        <div style={{
          position: 'absolute', bottom: -22, right: 0,
          fontFamily: LF.mono, fontSize: 9, color: LF.amber, letterSpacing: '0.18em',
        }}>{lp.t15FinalSub}</div>
      </div>
    </Frame>
  );
}

// ─── T16 · REEL COVER (9:16) ────────────────────────────────────────────────
// Portada de Reel — alta densidad tipográfica
export function T16_ReelCover({ w = 405, h = 720 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <PhotoSlot slotId="t16-main" placeholder="REEL · COVER"
        style={{ position: 'absolute', inset: 0, width: w, height: h }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.15) 65%, rgba(0,0,0,0.92) 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', top: 18, left: 16, right: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: LF.amber, color: LF.black,
          padding: '4px 8px',
          fontFamily: LF.mono, fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
        }}>
          <span>{lp.t16ReelTag}</span>
          <span style={{ opacity: 0.7 }}>· {lp.t16Duration}</span>
        </div>
        <LFMark size={20} color={LF.white} />
      </div>

      <div style={{
        position: 'absolute', top: 70, left: 16,
        fontFamily: LF.display, color: LF.white,
        fontSize: 88, lineHeight: 0.82, letterSpacing: '-0.05em',
        textShadow: '0 4px 12px rgba(0,0,0,0.6)',
        pointerEvents: 'none',
      }}>{(() => {
        const ep = lp.t16Episode || 'EP.07';
        const m = ep.match(/^([^0-9]*)(\d+.*)$/);
        if (m) return <>{m[1]}<span style={{ color: LF.amber }}>{m[2]}</span></>;
        return ep;
      })()}</div>

      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 90, pointerEvents: 'none' }}>
        <div style={{ fontFamily: LF.mono, fontSize: 10, color: LF.amber, letterSpacing: '0.2em' }}>{lp.t16Tag}</div>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 48, lineHeight: 0.88,
          letterSpacing: '-0.04em', textTransform: 'uppercase',
          marginTop: 6, textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}>{(() => {
          const parts = (lp.t16Title || '3 MINUTOS\nEN EL\nBACK.').split('\n');
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
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '12px 16px',
        background: LF.black, borderTop: `1px solid ${LF.amber}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <TechStrip size={9} color={LF.white}>{lp.t16Footer}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t16Cta}</TechStrip>
      </div>
    </Frame>
  );
}

// ─── T17 · HIGHLIGHT COVERS (perfil) ────────────────────────────────────────
// Set de íconos circulares para destacadas — adaptado a artboard cuadrado
function HighlightCover({ label, size = 150, accent = false, glyph, monogram }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: accent ? LF.amber : LF.black,
        border: accent ? 'none' : `1.5px solid ${LF.amber}`,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: accent
            ? 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)'
            : `linear-gradient(${LF.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
          backgroundSize: '14px 14px', opacity: 0.6,
        }} />
        <div style={{
          fontFamily: LF.display,
          fontSize: (glyph || '').length <= 2 ? size * 0.42 : size * 0.18,
          color: accent ? LF.black : LF.amber,
          letterSpacing: '-0.04em', lineHeight: 0.9,
          textAlign: 'center', textTransform: 'uppercase',
          padding: '0 8px', position: 'relative',
        }}>{glyph}</div>
        <div style={{
          position: 'absolute', bottom: 8, right: 12,
          fontFamily: LF.mono, fontSize: 8,
          color: accent ? LF.black : LF.amber,
          letterSpacing: '0.18em', opacity: 0.7,
        }}>{monogram}</div>
      </div>
      <div style={{
        fontFamily: LF.mono, fontSize: 10,
        color: LF.black, letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>{label}</div>
    </div>
  );
}

export function T17_HighlightSet({ w = 540, h = 540 }) {
  const lp = useLP();
  const items = [
    { label: lp.t17H1Label, glyph: lp.t17H1Glyph, accent: false },
    { label: lp.t17H2Label, glyph: lp.t17H2Glyph, accent: true },
    { label: lp.t17H3Label, glyph: lp.t17H3Glyph, accent: false },
    { label: lp.t17H4Label, glyph: lp.t17H4Glyph, accent: false },
    { label: lp.t17H5Label, glyph: lp.t17H5Glyph, accent: true },
  ];
  const size = Math.round(w * 0.26);
  return (
    <Frame width={w} height={h} bg="#f0eee9" style={{ color: LF.black }}>
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, textAlign: 'center' }}>
        <TechStrip color="rgba(0,0,0,0.4)" size={9}>{lp.brand} · HIGHLIGHTS</TechStrip>
      </div>
      {/* fila 3 + fila 2 para encajar en cuadrado */}
      <div style={{
        position: 'absolute', inset: '60px 0 60px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: Math.round(w * 0.05),
      }}>
        <div style={{ display: 'flex', gap: Math.round(w * 0.045), justifyContent: 'center' }}>
          {items.slice(0, 3).map((it, i) => (
            <HighlightCover key={i} {...it} size={size} monogram={lp.monogram} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: Math.round(w * 0.045), justifyContent: 'center' }}>
          {items.slice(3).map((it, i) => (
            <HighlightCover key={i} {...it} size={size} monogram={lp.monogram} />
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 22, left: 0, right: 0, textAlign: 'center' }}>
        <TechStrip color="rgba(0,0,0,0.3)" size={8}>{lp.handle}</TechStrip>
      </div>
    </Frame>
  );
}

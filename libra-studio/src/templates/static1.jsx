// Plantillas T01–T10 — LIBRA FOTOS (diseño v2, jun-2026)
// Brutalismo de Lujo · Negro #000 · Ámbar #F7A810 · Violeta #4B0082 · Blanco #FFF
// Archivo Black (titulares) · IBM Plex Mono (técnico) · Lora (cuerpo)
import { LF, useLP, lpLines, PhotoSlot, Frame, LFMark, TechStrip } from './primitives';

// ─── T01 · EDITORIAL COVER (4:5) ─────────────────────────────────────────────
// Full-bleed photo + bloque de título ámbar masivo + monograma LF + tech strip
export function T01_EditorialCover({ w = 540, h = 675 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h}>
      <div style={{ position: 'absolute', inset: 0, width: w, height: h }}>
        <PhotoSlot slotId="t01-main" placeholder="FOTO EDITORIAL · 4:5"
          style={{ position: 'absolute', inset: 0, width: w, height: h }} />
      </div>

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 22px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0))',
        pointerEvents: 'none',
      }}>
        <TechStrip size={10}>{lp.brand} · {lp.t01TopLabel}</TechStrip>
        <LFMark size={22} color={LF.amber} />
      </div>

      <div style={{
        position: 'absolute', left: 0, bottom: 88,
        background: LF.amber, padding: '14px 20px 16px', maxWidth: '88%',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: LF.display, color: LF.black,
          fontSize: 64, lineHeight: 0.88, letterSpacing: '-0.04em', textTransform: 'uppercase',
        }}>{lpLines(lp.coverTitle)}</div>
      </div>

      <div style={{
        position: 'absolute', left: 22, bottom: 56,
        color: LF.white, fontFamily: LF.mono,
        fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
        pointerEvents: 'none',
      }}>{lp.coverCaption}</div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 22px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(0,0,0,0.85)', borderTop: `1px solid ${LF.amber}`,
      }}>
        <TechStrip size={9} color={LF.white}>{lp.t01TechMeta}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t01Cta}</TechStrip>
      </div>
    </Frame>
  );
}

// ─── T02 · METADATA CARD (4:5) ──────────────────────────────────────────────
// Foto arriba + bloque negro con columnas de metadata en mono
export function T02_MetadataCard({ w = 540, h = 675 }) {
  const lp = useLP();
  const photoH = Math.round(h * 0.72);
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: w, height: photoH }}>
        <PhotoSlot slotId="t02-main" placeholder="RETRATO · ALTA COSTURA" />
      </div>

      <div style={{ position: 'absolute', top: photoH, left: 0, right: 0, height: 2, background: LF.amber }} />

      <div style={{
        position: 'absolute', top: photoH + 2, left: 0, right: 0, height: 180,
        padding: '50px 24px 22px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18,
        color: LF.white, fontFamily: LF.mono, fontWeight: 300,
      }}>
        <div style={{ padding: 9 }}>
          <div style={{ fontSize: 9, color: LF.amber, letterSpacing: '0.2em' }}>{lp.t02FileLabel}</div>
          <div style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.08em' }}>{lp.t02FileValue}</div>
          <div style={{ fontSize: 9, color: LF.amber, letterSpacing: '0.2em', marginTop: 14 }}>{lp.t02CamLabel}</div>
          <div style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.08em' }}>{lp.t02CamValue}</div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: LF.amber, letterSpacing: '0.2em' }}>{lp.t02ExpLabel}</div>
          <div style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.08em' }}>{lp.t02ExpValue}</div>
          <div style={{ fontSize: 9, color: LF.amber, letterSpacing: '0.2em', marginTop: 14 }}>{lp.t02LocLabel}</div>
          <div style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.08em' }}>{lp.t02LocValue}</div>
        </div>
      </div>

      <div style={{ position: 'absolute', right: 22, bottom: 20 }}>
        <LFMark size={20} color={LF.amber} />
      </div>
    </Frame>
  );
}

// ─── T03 · ÁMBAR COLLECTION (4:5 · VIOLETA) ─────────────────────────────────
// Fondo violeta + foto desplazada con sombra dura + marcas de corte
export function T03_VioletDrop({ w = 540, h = 675 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.violet}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${LF.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
        backgroundSize: '60px 60px', opacity: 0.4,
      }} />

      <div style={{
        position: 'absolute', left: 18, top: 24, bottom: 24,
        writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        fontFamily: LF.mono, fontSize: 10, color: LF.white,
        letterSpacing: '0.32em', textTransform: 'uppercase',
      }}>{lp.t03VertLabel}</div>

      <div style={{
        position: 'absolute', top: 70, left: 52, width: w - 110, height: h - 220,
        boxShadow: `8px 8px 0 ${LF.black}`,
      }}>
        <PhotoSlot slotId="t03-main" placeholder="COLECCIÓN ARTE · 002" />
        {[
          { top: -1, left: -1, bt: [1, 0, 0, 1] }, { top: -1, right: -1, bt: [1, 1, 0, 0] },
          { bottom: -1, left: -1, bt: [0, 0, 1, 1] }, { bottom: -1, right: -1, bt: [0, 1, 1, 0] },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute', width: 14, height: 14,
            top: c.top, left: c.left, right: c.right, bottom: c.bottom,
            borderTop: c.bt[0] ? `2px solid ${LF.amber}` : 'none',
            borderRight: c.bt[1] ? `2px solid ${LF.amber}` : 'none',
            borderBottom: c.bt[2] ? `2px solid ${LF.amber}` : 'none',
            borderLeft: c.bt[3] ? `2px solid ${LF.amber}` : 'none',
            pointerEvents: 'none',
          }} />
        ))}
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '0 24px 22px',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <div>
          <TechStrip size={9} color={LF.amber}>{lp.t03Stamp}</TechStrip>
          <div style={{
            fontFamily: LF.display, fontSize: 48, lineHeight: 0.9,
            letterSpacing: '-0.04em', color: LF.white, marginTop: 6, textTransform: 'uppercase',
          }}>{lpLines(lp.noirTitle)}</div>
        </div>
        <LFMark size={28} color={LF.amber} />
      </div>
    </Frame>
  );
}

// ─── T04 · CREDITS SLATE (4:5) ──────────────────────────────────────────────
// Hoja de créditos tipográfica negro/ámbar, como claqueta de cine
export function T04_CreditsSlate({ w = 540, h = 675 }) {
  const lp = useLP();
  const rows = [
    [lp.t04DirectionLabel, lp.brand],
    [lp.t04StylingLabel, lp.t04StylingValue],
    [lp.t04MakeUpLabel, lp.t04MakeUpValue],
    [lp.t04ModelLabel, lp.t04ModelValue],
    ['DESIGNER', lp.designer],
    ['LOCATION', lp.location],
    ['DATE', lp.date],
  ];
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', top: 22, left: 22, right: 22,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <TechStrip size={10} color={LF.amber}>{lp.t04TopLabel}</TechStrip>
        <LFMark size={18} color={LF.amber} />
      </div>

      <div style={{ position: 'absolute', top: 70, left: 22, right: 22 }}>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 96, lineHeight: 0.84, letterSpacing: '-0.05em', textTransform: 'uppercase',
        }}>{lpLines(lp.t04Title)}</div>
      </div>

      <div style={{ position: 'absolute', left: 22, right: 22, bottom: 60, borderTop: `1px solid ${LF.white}` }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '90px 1fr',
            padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.18)',
            fontFamily: LF.mono, fontSize: 11, letterSpacing: '0.08em', color: LF.white,
          }}>
            <span style={{ color: LF.amber }}>{r[0]}</span>
            <span>{r[1]}</span>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 18,
        display: 'flex', justifyContent: 'space-between',
      }}>
        <TechStrip size={9} color={LF.white}>{lp.t04Copyright}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t04EndTag}</TechStrip>
      </div>
    </Frame>
  );
}

// ─── T06 · TYPE POSTER (1:1 / 4:5) ──────────────────────────────────────────
// Tipografía masiva proporcional — escala para cuadrado y portrait
export function T06_TypePoster({ w = 540, h = 540 }) {
  const lp = useLP();
  const isPortrait = h > w;

  const pad = Math.round(w * 0.041);
  const techSize = Math.max(8, Math.round(w * 0.0185));
  const subSize = Math.max(9, Math.round(w * 0.020));
  const titleSize = Math.round(w * (isPortrait ? 0.245 : 0.188));
  const ruleY = Math.round(pad + techSize + pad * 0.55);
  const indexSize = Math.round(w * 0.058);

  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${LF.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
        backgroundSize: `${Math.round(w / 6.75)}px ${Math.round(w / 6.75)}px`,
        opacity: 0.22,
      }} />

      <TechStrip size={techSize} color={LF.amber} style={{ position: 'absolute', top: pad, left: pad }}>{lp.t06TopLeft}</TechStrip>
      <TechStrip size={techSize} color={LF.amber} style={{ position: 'absolute', top: pad, right: pad }}>{lp.t06TopRight}</TechStrip>
      <TechStrip size={techSize} color={LF.white} style={{ position: 'absolute', bottom: pad, left: pad }}>{lp.t06BottomLeft}</TechStrip>
      <LFMark size={Math.round(techSize * 1.9)} color={LF.amber} style={{ position: 'absolute', bottom: pad - 2, right: pad }} />

      <div style={{ position: 'absolute', top: ruleY, left: pad, right: pad, height: 1, background: 'rgba(255,255,255,0.14)' }} />
      <div style={{ position: 'absolute', bottom: ruleY, left: pad, right: pad, height: 1, background: 'rgba(255,255,255,0.14)' }} />

      <div style={{
        position: 'absolute', top: ruleY + pad * 0.55, left: pad,
        fontFamily: LF.display, color: LF.amber,
        fontSize: indexSize, lineHeight: 1, letterSpacing: '-0.05em',
      }}>06</div>
      <div style={{
        position: 'absolute',
        top: ruleY + pad * 0.55 + indexSize * 0.12,
        left: pad + indexSize * 1.55,
        opacity: 0.7,
        display: 'flex', flexDirection: 'column', gap: Math.round(techSize * 0.35),
      }}>
        <TechStrip size={techSize} color={LF.white}>MANIFIESTO</TechStrip>
        <TechStrip size={techSize} color={LF.white}>— TYPE POSTER</TechStrip>
      </div>

      <div style={{
        position: 'absolute', left: pad, right: pad, bottom: ruleY + pad * 0.9,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      }}>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: titleSize, lineHeight: isPortrait ? 0.84 : 0.82,
          letterSpacing: '-0.055em', textTransform: 'uppercase', fontWeight: 400, textAlign: 'left',
        }}>{lpLines(lp.manifestTop)}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: pad * 0.55, marginTop: Math.round(pad * 0.85) }}>
          <div style={{ width: pad * 1.4, height: 2, background: LF.amber }} />
          <div style={{
            fontFamily: LF.mono, fontSize: subSize, color: LF.amber,
            letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500,
          }}>{lp.manifestSub}</div>
        </div>
      </div>
    </Frame>
  );
}

// ─── T08 · QUOTE PULL (1:1 / 4:5 · BLANCO) ──────────────────────────────────
// Cita brutalista sobre blanco con comilla gigante ámbar
export function T08_QuotePull({ w = 540, h = 540 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.white}>
      <div style={{
        position: 'absolute', top: 22, left: 22, right: 22,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <TechStrip size={10} color={LF.black}>{lp.t08Stamp}</TechStrip>
        <LFMark size={18} color={LF.black} />
      </div>

      <div style={{
        position: 'absolute', top: -40, right: -20,
        fontFamily: LF.display, color: LF.amber,
        fontSize: 360, lineHeight: 1, letterSpacing: '-0.1em',
        padding: '0 0 0 10px', height: 360,
      }}>“</div>

      <div style={{ position: 'absolute', left: 22, right: 22, top: 130 }}>
        <div style={{
          fontFamily: LF.display, color: LF.black,
          lineHeight: 0.95, letterSpacing: '-0.04em',
          textTransform: 'uppercase', textWrap: 'balance', fontSize: 60,
        }}>{lpLines(lp.quote)}</div>
      </div>

      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 22,
        borderTop: `2px solid ${LF.black}`, paddingTop: 12,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: LF.mono, fontSize: 10, color: LF.black,
        letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>
        <span>{lp.brand}</span>
        <span style={{ color: LF.amber, background: LF.black, padding: '2px 6px' }}>{lp.t08Tag}</span>
      </div>
    </Frame>
  );
}

// ─── T09 · STORY TICKER (9:16) ──────────────────────────────────────────────
// Foto full-bleed + ticker ámbar estilo breaking-news.
// El ticker se renderiza estático para que el texto siempre aparezca en el PNG.
export function T09_StoryTicker({ w = 405, h = 720 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <PhotoSlot slotId="t09-main" placeholder="BACKSTAGE · LIVE"
        style={{ position: 'absolute', inset: 0, width: w, height: h }} />

      <div style={{
        position: 'absolute', top: 16, left: 16, right: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.6)', padding: '4px 8px' }}>
          <span style={{ width: 8, height: 8, background: LF.amber, display: 'inline-block' }} />
          <span style={{ fontFamily: LF.mono, fontSize: 10, color: LF.white, letterSpacing: '0.18em' }}>{lp.t09Status}</span>
        </div>
        <LFMark size={20} color={LF.amber} />
      </div>

      <div style={{
        position: 'absolute', top: 90, right: 14,
        writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        fontFamily: LF.mono, fontSize: 10, color: LF.amber,
        letterSpacing: '0.32em', textTransform: 'uppercase',
        background: 'rgba(0,0,0,0.5)', padding: '6px 4px',
        pointerEvents: 'none',
      }}>{lp.t09VertLabel}</div>

      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 130, pointerEvents: 'none' }}>
        <div style={{
          background: LF.amber, color: LF.black,
          fontFamily: LF.display, fontSize: 44, lineHeight: 0.9,
          letterSpacing: '-0.04em', textTransform: 'uppercase',
          padding: '8px 12px 10px', display: 'inline-block',
        }}>{lpLines(lp.t09Headline)}</div>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 64,
        background: LF.amber, color: LF.black,
        padding: '8px 12px',
        fontFamily: LF.mono, fontSize: 11, letterSpacing: '0.22em',
        textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden',
        fontWeight: 700, pointerEvents: 'none',
      }}>{lp.t09Ticker}</div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '10px 16px', background: LF.black,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: `1px solid ${LF.amber}`,
      }}>
        <TechStrip size={9} color={LF.white}>{lp.t09Meta}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t09Cta}</TechStrip>
      </div>
    </Frame>
  );
}

// ─── T10 · STORY COUNTDOWN (9:16) ───────────────────────────────────────────
// Story solo tipografía — countdown / anuncio
export function T10_StoryType({ w = 405, h = 720 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${LF.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
        backgroundSize: '60px 60px', opacity: 0.3,
      }} />

      <div style={{
        position: 'absolute', top: 22, left: 16, right: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <TechStrip size={10} color={LF.amber}>{lp.t10TopLabel}</TechStrip>
        <LFMark size={20} color={LF.amber} />
      </div>

      <div style={{
        position: 'absolute', top: 80, left: 16, right: 16,
        fontFamily: LF.display, color: LF.amber,
        fontSize: 200, lineHeight: 0.8, letterSpacing: '-0.06em',
      }}>{lp.countdownDays}</div>
      <div style={{
        position: 'absolute', top: 264, left: 16, right: 16,
        fontFamily: LF.mono, color: LF.white,
        fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
        borderTop: `1px solid ${LF.amber}`, paddingTop: 10,
      }}>{lp.t10DaysCaption}</div>

      <div style={{ position: 'absolute', top: 330, left: 16, right: 16 }}>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 56, lineHeight: 0.88, letterSpacing: '-0.04em', textTransform: 'uppercase',
        }}>EDITORIAL<br />N° {lp.edition}<br /><span style={{ color: LF.amber }}>{lp.chapter}.</span></div>
      </div>

      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 84 }}>
        <div style={{
          background: LF.amber, color: LF.black,
          padding: '14px 16px',
          fontFamily: LF.mono, fontSize: 13, fontWeight: 700,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>{lp.t10Cta}</span>
          <span>▸</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 16, right: 16, bottom: 24,
        display: 'flex', justifyContent: 'space-between',
      }}>
        <TechStrip size={9} color={LF.white}>{lp.site}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t10MoreInfo}</TechStrip>
      </div>
    </Frame>
  );
}

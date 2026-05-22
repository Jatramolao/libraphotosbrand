// Plantillas Instagram para LIBRA PHOTOS
// Brutalismo de Lujo · Negro #000 · Ámbar #F7A810 · Violeta #4B0082 · Blanco #FFF
// Tipografías: Archivo Black (titulares) · IBM Plex Mono (técnico)

const LF = {
  black: '#000000',
  amber: '#F7A810',
  white: '#FFFFFF',
  violet: '#4B0082',
  gridLine: 'rgba(255,255,255,0.18)',
  gridLineDark: 'rgba(0,0,0,0.18)',
  display: '"Archivo Black", "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, monospace'
};

// ─── PRIMITIVES ─────────────────────────────────────────────────────────────

// Subtle film-grain noise (CSS-only via layered radial gradients turbo-fast).
const grainBg = `
  radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px) 0 0/3px 3px,
  radial-gradient(rgba(0,0,0,0.022) 1px, transparent 1px) 1px 2px/4px 4px
`;

// Image slot — drag-and-drop persistent image holder. Falls back to a
// brutalist striped placeholder. `id` MUST be unique per slot per page.
function PhotoSlot({ id, placeholder = "FOTO · LIBRA", style = {}, tone = "dark", shape = "rect" }) {
  // Use the <image-slot> web component
  return (
    <image-slot
      id={id}
      shape={shape}
      placeholder={placeholder}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        background:
        tone === 'dark' ?
        'repeating-linear-gradient(135deg, #181818 0 8px, #1f1f1f 8px 16px)' :
        'repeating-linear-gradient(135deg, #d6d2c9 0 8px, #ddd9d0 8px 16px)',
        color: tone === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
        fontFamily: LF.mono,
        fontSize: 11,
        letterSpacing: '0.08em',
        ...style
      }}>
    </image-slot>);

}

// Pixel-perfect 1px hairline divider
const Rule = ({ color = LF.white, vertical = false, style = {} }) =>
<div style={{
  background: color,
  width: vertical ? 1 : '100%',
  height: vertical ? '100%' : 1,
  ...style
}} />;


// LF Monogram — minimal typographic mark. Reads brand monogram from
// LP context so the Tweaks panel can swap it everywhere at once.
const LFMark = ({ size = 14, color = LF.white, style = {}, text }) => {
  const lp = useLP();
  return (
    <span style={{
      fontFamily: LF.display,
      fontSize: size,
      letterSpacing: '-0.04em',
      color,
      lineHeight: 1,
      display: 'inline-block',
      ...style
    }}>{text ?? lp.monogram}</span>);

};

// Mono technical strip: takes children inline-separated by · or /
const TechStrip = ({ children, color = LF.white, size = 9, style = {} }) =>
<div style={{
  fontFamily: LF.mono,
  fontSize: size,
  color,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 400,
  ...style
}}>{children}</div>;


// Generic artboard frame
function Frame({ width, height, bg = LF.black, children, style = {} }) {
  return (
    <div style={{
      width, height,
      background: bg,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: LF.display,
      color: LF.white,
      ...style
    }}>
      {children}
    </div>);

}

// ─── T01 · EDITORIAL COVER (4:5) ─────────────────────────────────────────────
// Full-bleed photo + massive amber title block + LF monogram + tech strip
function T_EditorialCover({ w = 540, h = 675 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h}>
      {/* Photo full-bleed */}
      <PhotoSlot id="t01-photo" placeholder="FOTO EDITORIAL · 4:5"
      style={{ position: 'absolute', inset: 0, width: w, height: h }} />

      {/* Top header bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 22px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0))'
      }}>
        <TechStrip size={10}>{lp.brand} · {lp.t01TopLabel}</TechStrip>
        <LFMark size={22} color={LF.amber} />
      </div>

      {/* Massive amber title block */}
      <div style={{
        position: 'absolute',
        left: 0, bottom: 88,
        background: LF.amber,
        padding: '14px 20px 16px',
        maxWidth: '88%'
      }}>
        <div style={{
          fontFamily: LF.display,
          color: LF.black,
          fontSize: 64,
          lineHeight: 0.88,
          letterSpacing: '-0.04em',
          textTransform: 'uppercase'
        }}>{lpLines(lp.coverTitle)}</div>
      </div>

      {/* Small caption strip */}
      <div style={{
        position: 'absolute', left: 22, bottom: 56,
        color: LF.white,
        fontFamily: LF.mono,
        fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase'
      }}>{lp.coverCaption}</div>

      {/* Bottom technical metadata strip */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 22px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(0,0,0,0.85)',
        borderTop: `1px solid ${LF.amber}`
      }}>
        <TechStrip size={9} color={LF.white}>{lp.t01TechMeta}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t01Cta}</TechStrip>
      </div>
    </Frame>);

}

// ─── T02 · METADATA CARD (4:5) ──────────────────────────────────────────────
// Photo top + thick black bar with mono metadata columns
function T_MetadataCard({ w = 540, h = 675 }) {
  const lp = useLP();
  const photoH = Math.round(h * 0.72);
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: w, height: photoH }}>
        <PhotoSlot id="t02-photo" placeholder="RETRATO · ALTA COSTURA" />
      </div>

      {/* 1px amber rule between photo and meta block */}
      <div style={{ position: 'absolute', top: photoH, left: 0, right: 0, height: 2, background: LF.amber }} />

      {/* Meta block */}
      <div style={{
        position: 'absolute', top: photoH + 2, left: 0, right: 0,
        height: 180,
        padding: '50px 24px 22px',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18,
        color: LF.white,
        fontFamily: LF.mono,
        fontWeight: 300
      }}>
        <div style={{ padding: 9 }}>
          <div style={{ fontSize: 9, color: LF.amber, letterSpacing: '0.2em' }}>{lp.t02FileLabel}</div>
          <div style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.08em' }}>{lp.t02FileValue}</div>
          <div style={{ fontSize: 9, color: LF.amber, letterSpacing: '0.2em', marginTop: 14 }}>{lp.t02CamLabel}</div>
          <div style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.08em' }}>{lp.t02CamValue}</div>
        </div>
        <div style={{ padding: 0 }}>
          <div style={{ fontSize: 9, color: LF.amber, letterSpacing: '0.2em' }}>{lp.t02ExpLabel}</div>
          <div style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.08em' }}>{lp.t02ExpValue}</div>
          <div style={{ fontSize: 9, color: LF.amber, letterSpacing: '0.2em', marginTop: 14 }}>{lp.t02LocLabel}</div>
          <div style={{ fontSize: 11, marginTop: 4, letterSpacing: '0.08em' }}>{lp.t02LocValue}</div>
        </div>
      </div>

      {/* Bottom right LF mark */}
      <LFMark size={20} color={LF.amber}
      style={{ position: 'absolute', right: 22, bottom: 20 }} />
    </Frame>);

}

// ─── T03 · VIOLET DISRUPTION (4:5) ───────────────────────────────────────────
// Violet bg + offset rotated photo + special edition stamp
function T_VioletDrop({ w = 540, h = 675 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.violet}>
      {/* faint noise grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${LF.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        opacity: 0.4
      }} />

      {/* Vertical caption left */}
      <div style={{
        position: 'absolute', left: 18, top: 24, bottom: 24,
        writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        fontFamily: LF.mono, fontSize: 10, color: LF.white,
        letterSpacing: '0.32em', textTransform: 'uppercase'
      }}>{lp.t03VertLabel}</div>

      {/* Offset photo */}
      <div style={{
        position: 'absolute', top: 70, left: 52, width: w - 110, height: h - 220,
        boxShadow: `8px 8px 0 ${LF.black}`
      }}>
        <PhotoSlot id="t03-photo" placeholder="COLECCIÓN ARTE · 002" />
        {/* corner crop marks */}
        {[
        { top: -1, left: -1, bt: [1, 0, 0, 1] }, { top: -1, right: -1, bt: [1, 1, 0, 0] },
        { bottom: -1, left: -1, bt: [0, 0, 1, 1] }, { bottom: -1, right: -1, bt: [0, 1, 1, 0] }].
        map((c, i) =>
        <div key={i} style={{
          position: 'absolute', width: 14, height: 14,
          top: c.top, left: c.left, right: c.right, bottom: c.bottom,
          borderTop: c.bt[0] ? `2px solid ${LF.amber}` : 'none',
          borderRight: c.bt[1] ? `2px solid ${LF.amber}` : 'none',
          borderBottom: c.bt[2] ? `2px solid ${LF.amber}` : 'none',
          borderLeft: c.bt[3] ? `2px solid ${LF.amber}` : 'none'
        }} />
        )}
      </div>

      {/* Bottom title block */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '0 24px 22px',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'
      }}>
        <div>
          <TechStrip size={9} color={LF.amber}>{lp.t03Stamp}</TechStrip>
          <div style={{
            fontFamily: LF.display, fontSize: 48, lineHeight: 0.9,
            letterSpacing: '-0.04em', color: LF.white, marginTop: 6,
            textTransform: 'uppercase'
          }}>{lpLines(lp.noirTitle)}</div>
        </div>
        <LFMark size={28} color={LF.amber} />
      </div>
    </Frame>);

}

// ─── T04 · CREDITS SLATE (4:5) ──────────────────────────────────────────────
// Pure black/amber type-driven credits sheet, like a film slate
function T_CreditsSlate({ w = 540, h = 675 }) {
  const lp = useLP();
  const rows = [
  [lp.t04DirectionLabel, lp.brand],
  [lp.t04StylingLabel, lp.t04StylingValue],
  [lp.t04MakeUpLabel, lp.t04MakeUpValue],
  [lp.t04ModelLabel, lp.t04ModelValue],
  ['DESIGNER', lp.designer],
  ['LOCATION', lp.location],
  ['DATE', lp.date]];

  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* Top stamp */}
      <div style={{
        position: 'absolute', top: 22, left: 22, right: 22,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <TechStrip size={10} color={LF.amber}>{lp.t04TopLabel}</TechStrip>
        <LFMark size={18} color={LF.amber} />
      </div>

      {/* Massive title */}
      <div style={{
        position: 'absolute', top: 70, left: 22, right: 22
      }}>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 96, lineHeight: 0.84, letterSpacing: '-0.05em',
          textTransform: 'uppercase'
        }}>{lpLines(lp.t04Title)}</div>
      </div>

      {/* Credits table */}
      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 60,
        borderTop: `1px solid ${LF.white}`
      }}>
        {rows.map((r, i) =>
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '90px 1fr',
          padding: '8px 0',
          borderBottom: `1px solid rgba(255,255,255,0.18)`,
          fontFamily: LF.mono, fontSize: 11, letterSpacing: '0.08em',
          color: LF.white
        }}>
            <span style={{ color: LF.amber }}>{r[0]}</span>
            <span>{r[1]}</span>
          </div>
        )}
      </div>

      {/* footer */}
      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 18,
        display: 'flex', justifyContent: 'space-between'
      }}>
        <TechStrip size={9} color={LF.white}>{lp.t04Copyright}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t04EndTag}</TechStrip>
      </div>
    </Frame>);

}

// ─── T05 · CONTACT SHEET (1:1) ──────────────────────────────────────────────
// 3×3 grid of photos like a film contact sheet, frame-numbered
function T_ContactSheet({ w = 540, h = 540 }) {
  const cellSize = (w - 44 - 4) / 3;
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '14px 22px 10px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1px solid ${LF.amber}`
      }}>
        <TechStrip size={10} color={LF.amber}>CONTACT SHEET · ED.07 / RUNWAY</TechStrip>
        <LFMark size={16} color={LF.amber} />
      </div>

      {/* grid */}
      <div style={{
        position: 'absolute', top: 56, left: 22, right: 22, bottom: 50,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr',
        gap: 2
      }}>
        {Array.from({ length: 9 }).map((_, i) => {
          const num = String(i + 1).padStart(2, '0');
          const highlight = i === 4;
          return (
            <div key={i} style={{
              position: 'relative',
              outline: highlight ? `2px solid ${LF.amber}` : 'none',
              outlineOffset: highlight ? -1 : 0
            }}>
              <PhotoSlot id={`t05-photo-${i}`} placeholder={`FRAME ${num}`} />
              <div style={{
                position: 'absolute', top: 4, left: 4,
                fontFamily: LF.mono, fontSize: 8,
                color: highlight ? LF.amber : LF.white,
                letterSpacing: '0.14em',
                background: 'rgba(0,0,0,0.6)',
                padding: '2px 4px'
              }}>{num} / 09</div>
              {highlight &&
              <div style={{
                position: 'absolute', bottom: 4, right: 4,
                fontFamily: LF.mono, fontSize: 7,
                color: LF.black, background: LF.amber,
                padding: '2px 4px', letterSpacing: '0.14em'
              }}>SELECT</div>
              }
            </div>);

        })}
      </div>

      {/* footer */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '12px 22px',
        display: 'flex', justifyContent: 'space-between',
        borderTop: `1px solid rgba(255,255,255,0.2)`
      }}>
        <TechStrip size={9} color={LF.white}>09 FRAMES · ROLL #14</TechStrip>
        <TechStrip size={9} color={LF.white}>SWIPE ▸ FINAL CUT</TechStrip>
      </div>
    </Frame>);

}

// ─── T06 · TYPE POSTER (1:1) ────────────────────────────────────────────────
// Black w/ massive amber typography, used as carousel divider
function T_TypePoster({ w = 540, h = 540 }) {
  const lp = useLP();
  // top-corner technical strips are pulled from lp.t06*
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* faint grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${LF.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        opacity: 0.25
      }} />
      {/* corner technical */}
      <TechStrip size={9} color={LF.amber} style={{ position: 'absolute', top: 18, left: 22 }}>{lp.t06TopLeft}</TechStrip>
      <TechStrip size={9} color={LF.amber} style={{ position: 'absolute', top: 18, right: 22 }}>{lp.t06TopRight}</TechStrip>
      <TechStrip size={9} color={LF.white} style={{ position: 'absolute', bottom: 18, left: 22 }}>{lp.t06BottomLeft}</TechStrip>
      <LFMark size={18} color={LF.amber} style={{ position: 'absolute', bottom: 16, right: 22 }} />

      {/* MASSIVE word */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        padding: '0 22px', justifyContent: "center", alignItems: "flex-end"
      }}>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          lineHeight: 0.82,
          letterSpacing: '-0.06em',
          textTransform: 'uppercase', fontWeight: "400", height: "3px", width: "500px", fontSize: "130px"
        }}>{lpLines(lp.manifestTop)}</div>
        <div style={{
          fontFamily: LF.mono, fontSize: 10, color: LF.amber,
          letterSpacing: '0.2em', marginTop: 18, textAlign: "left", width: "490px"
        }}>{lp.manifestSub}</div>
      </div>
    </Frame>);

}

// ─── T07 · DIPTYCH SPLIT (1:1) ──────────────────────────────────────────────
// Two photos side-by-side w/ 1px amber separator
function T_Diptych({ w = 540, h = 540 }) {
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* top label */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '12px 18px',
        display: 'flex', justifyContent: 'space-between',
        zIndex: 2
      }}>
        <TechStrip size={9} color={LF.amber}>DÍPTICO · 01 / 02</TechStrip>
        <LFMark size={14} color={LF.amber} />
      </div>

      {/* left photo */}
      <div style={{ position: 'absolute', top: 40, left: 14, width: (w - 30) / 2, bottom: 40 }}>
        <PhotoSlot id="t07-left" placeholder="ANTES · LOOK A" />
        <div style={{
          position: 'absolute', bottom: -22, left: 0,
          fontFamily: LF.mono, fontSize: 9, color: LF.white, letterSpacing: '0.18em'
        }}>A · BACKSTAGE</div>
      </div>

      {/* amber separator */}
      <div style={{
        position: 'absolute', top: 40, bottom: 40, left: w / 2 - 0.5, width: 1,
        background: LF.amber
      }} />
      <div style={{
        position: 'absolute', left: w / 2 - 8, top: '50%', transform: 'translateY(-50%)',
        width: 16, height: 16, background: LF.amber,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: LF.mono, fontSize: 9, color: LF.black, letterSpacing: 0
      }}>×</div>

      {/* right photo */}
      <div style={{ position: 'absolute', top: 40, right: 14, width: (w - 30) / 2, bottom: 40 }}>
        <PhotoSlot id="t07-right" placeholder="DESPUÉS · LOOK A" />
        <div style={{
          position: 'absolute', bottom: -22, right: 0,
          fontFamily: LF.mono, fontSize: 9, color: LF.white, letterSpacing: '0.18em'
        }}>B · PASARELA</div>
      </div>
    </Frame>);

}

// ─── T08 · QUOTE PULL (1:1) ─────────────────────────────────────────────────
// Brutalist quote slide, oversized opening glyph
function T_QuotePull({ w = 540, h = 540 }) {
  const lp = useLP();
  // stamp + tag from lp.t08*
  return (
    <Frame width={w} height={h} bg={LF.white}>
      {/* corner mark */}
      <div style={{
        position: 'absolute', top: 22, left: 22, right: 22,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
      }}>
        <TechStrip size={10} color={LF.black}>{lp.t08Stamp}</TechStrip>
        <LFMark size={18} color={LF.black} />
      </div>

      {/* giant open quote */}
      <div style={{
        position: 'absolute', top: -40, right: -20,
        fontFamily: LF.display, color: LF.amber,
        fontSize: 360, lineHeight: 1, letterSpacing: '-0.1em', padding: "0px 0px 0px 10px", height: "360px"
      }}>“</div>

      {/* the quote */}
      <div style={{
        position: 'absolute', left: 22, right: 22, top: 130
      }}>
        <div style={{
          fontFamily: LF.display, color: LF.black,
          lineHeight: 0.95, letterSpacing: '-0.04em',
          textTransform: 'uppercase', textWrap: 'balance', height: "152px", fontSize: "60px", padding: "0px"
        }}>{lpLines(lp.quote)}</div>
      </div>

      {/* attribution */}
      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 22,
        borderTop: `2px solid ${LF.black}`,
        paddingTop: 12,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: LF.mono, fontSize: 10, color: LF.black,
        letterSpacing: '0.18em', textTransform: 'uppercase'
      }}>
        <span>{lp.brand}</span>
        <span style={{ color: LF.amber, background: LF.black, padding: '2px 6px' }}>{lp.t08Tag}</span>
      </div>
    </Frame>);

}

// ─── T09 · STORY TICKER (9:16) ──────────────────────────────────────────────
// Full-bleed photo with amber breaking-news-style ticker + LF brand stamp
function T_StoryTicker({ w = 405, h = 720 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <PhotoSlot id="t09-photo" placeholder="BACKSTAGE · LIVE"
      style={{ position: 'absolute', inset: 0, width: w, height: h }} />

      {/* top status bar */}
      <div style={{
        position: 'absolute', top: 16, left: 16, right: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(0,0,0,0.6)', padding: '4px 8px'
        }}>
          <span style={{ width: 8, height: 8, background: LF.amber, display: 'inline-block' }} />
          <span style={{ fontFamily: LF.mono, fontSize: 10, color: LF.white, letterSpacing: '0.18em' }}>{lp.t09Status}</span>
        </div>
        <LFMark size={20} color={LF.amber} />
      </div>

      {/* top right vertical caption */}
      <div style={{
        position: 'absolute', top: 90, right: 14,
        writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        fontFamily: LF.mono, fontSize: 10, color: LF.amber,
        letterSpacing: '0.32em', textTransform: 'uppercase',
        background: 'rgba(0,0,0,0.5)', padding: '6px 4px'
      }}>{lp.t09VertLabel}</div>

      {/* center pull caption (overlay) */}
      <div style={{
        position: 'absolute', left: 16, right: 16, bottom: 130
      }}>
        <div style={{
          background: LF.amber, color: LF.black,
          fontFamily: LF.display, fontSize: 44, lineHeight: 0.9,
          letterSpacing: '-0.04em', textTransform: 'uppercase',
          padding: '8px 12px 10px', display: 'inline-block'
        }}>{lpLines(lp.t09Headline)}</div>
      </div>

      {/* amber ticker strip */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 64,
        background: LF.amber, color: LF.black,
        padding: '8px 0',
        fontFamily: LF.mono, fontSize: 11, letterSpacing: '0.22em',
        textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden',
        fontWeight: 700
      }}>
        <span style={{ display: 'inline-block', paddingLeft: '100%', animation: 'lfTicker 18s linear infinite' }}>
          {lp.t09Ticker}
        </span>
      </div>
      <style>{`@keyframes lfTicker { from { transform: translateX(0) } to { transform: translateX(-100%) } }`}</style>

      {/* bottom stamp */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '10px 16px',
        background: LF.black,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: `1px solid ${LF.amber}`
      }}>
        <TechStrip size={9} color={LF.white}>{lp.t09Meta}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t09Cta}</TechStrip>
      </div>
    </Frame>);

}

// ─── T10 · STORY TYPE (9:16) ────────────────────────────────────────────────
// Type-only story — countdown / announce style
function T_StoryType({ w = 405, h = 720 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${LF.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
        backgroundSize: '60px 60px', opacity: 0.3
      }} />

      <div style={{
        position: 'absolute', top: 22, left: 16, right: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <TechStrip size={10} color={LF.amber}>{lp.t10TopLabel}</TechStrip>
        <LFMark size={20} color={LF.amber} />
      </div>

      {/* big countdown number */}
      <div style={{
        position: 'absolute', top: 80, left: 16, right: 16,
        fontFamily: LF.display, color: LF.amber,
        fontSize: 200, lineHeight: 0.8, letterSpacing: '-0.06em'
      }}>{lp.countdownDays}</div>
      <div style={{
        position: 'absolute', top: 264, left: 16, right: 16,
        fontFamily: LF.mono, color: LF.white,
        fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
        borderTop: `1px solid ${LF.amber}`, paddingTop: 10
      }}>{lp.t10DaysCaption}</div>

      {/* mid title */}
      <div style={{
        position: 'absolute', top: 330, left: 16, right: 16
      }}>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 56, lineHeight: 0.88, letterSpacing: '-0.04em',
          textTransform: 'uppercase'
        }}>EDITORIAL<br />N° {lp.edition}<br /><span style={{ color: LF.amber }}>{lp.chapter}.</span></div>
      </div>

      {/* footer cta */}
      <div style={{
        position: 'absolute', left: 16, right: 16, bottom: 84
      }}>
        <div style={{
          background: LF.amber, color: LF.black,
          padding: '14px 16px',
          fontFamily: LF.mono, fontSize: 13, fontWeight: 700,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span>{lp.t10Cta}</span>
          <span>▸</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 16, right: 16, bottom: 24,
        display: 'flex', justifyContent: 'space-between'
      }}>
        <TechStrip size={9} color={LF.white}>{lp.site}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t10MoreInfo}</TechStrip>
      </div>
    </Frame>);

}

Object.assign(window, {
  LF,
  PhotoSlot, Frame, Rule, LFMark, TechStrip,
  T_EditorialCover, T_MetadataCard, T_VioletDrop, T_CreditsSlate,
  T_ContactSheet, T_TypePoster, T_Diptych, T_QuotePull,
  T_StoryTicker, T_StoryType
});
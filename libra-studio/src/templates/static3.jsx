// Plantillas T18–T25 — LIBRA FOTOS (lote 2 del diseño v2)
// Comparten el ADN brutalista: Archivo Black + IBM Plex Mono + Lora, border-radius 0.
import { LF, useLP, lpLines, PhotoSlot, Frame, LFMark, TechStrip } from './primitives';

// ─── T18 · PROCESO EN PASOS (4:5) ───────────────────────────────────────────
// Lista vertical numerada: briefing → sesión → selección → retoque → entrega
export function T18_Process({ w = 540, h = 675 }) {
  const lp = useLP();
  const steps = [
    [lp.t18S1Num, lp.t18S1Title, lp.t18S1Desc],
    [lp.t18S2Num, lp.t18S2Title, lp.t18S2Desc],
    [lp.t18S3Num, lp.t18S3Title, lp.t18S3Desc],
    [lp.t18S4Num, lp.t18S4Title, lp.t18S4Desc],
    [lp.t18S5Num, lp.t18S5Title, lp.t18S5Desc],
  ];
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '22px 24px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <TechStrip size={10} color={LF.amber}>{lp.t18Stamp}</TechStrip>
        <LFMark size={20} color={LF.amber} />
      </div>

      <div style={{
        position: 'absolute', top: 52, left: 24, right: 24,
        fontFamily: LF.display, color: LF.white,
        fontSize: 52, lineHeight: 0.86, letterSpacing: '-0.05em', textTransform: 'uppercase',
      }}>{lpLines(lp.t18Title)}</div>

      <div style={{
        position: 'absolute', left: 24, right: 24, bottom: 56, top: 196,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {steps.map(([num, title, desc], i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 16,
            paddingTop: 12,
            borderTop: `1px solid ${i === 0 ? LF.amber : 'rgba(255,255,255,0.18)'}`,
          }}>
            <div style={{
              fontFamily: LF.display, color: LF.amber,
              fontSize: 26, lineHeight: 0.9, letterSpacing: '-0.04em', minWidth: 42,
            }}>{num}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: LF.display, color: LF.white,
                fontSize: 21, lineHeight: 0.96, letterSpacing: '-0.03em', textTransform: 'uppercase',
              }}>{title}</div>
              <div style={{
                fontFamily: LF.serif, color: 'rgba(255,255,255,0.68)',
                fontSize: 11.5, letterSpacing: 0, marginTop: 4, lineHeight: 1.45,
              }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', left: 24, right: 24, bottom: 22,
        display: 'flex', justifyContent: 'space-between',
      }}>
        <TechStrip size={9} color={LF.white}>{lp.handle}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t18Footer}</TechStrip>
      </div>
    </Frame>
  );
}

// ─── T19 · SOBRE MÍ / PRESENTACIÓN (4:5) ────────────────────────────────────
// Foto + nombre masivo + bio (Lora) + fila de stats. Primer post de cuenta.
export function T19_About({ w = 540, h = 675 }) {
  const lp = useLP();
  const photoH = Math.round(h * 0.48);
  const stats = [
    [lp.t19Stat1Num, lp.t19Stat1Label],
    [lp.t19Stat2Num, lp.t19Stat2Label],
    [lp.t19Stat3Num, lp.t19Stat3Label],
  ];
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: w, height: photoH }}>
        <PhotoSlot slotId="t19-photo" placeholder="AUTORRETRATO · EN TERRENO" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.85) 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 18, left: 22, right: 22,
          display: 'flex', justifyContent: 'space-between', pointerEvents: 'none',
        }}>
          <TechStrip size={10} color={LF.amber}>{lp.t19Stamp}</TechStrip>
          <LFMark size={20} color={LF.amber} />
        </div>
      </div>

      <div style={{ position: 'absolute', top: photoH, left: 0, right: 0, height: 2, background: LF.amber }} />

      <div style={{
        position: 'absolute', top: photoH + 18, left: 24, right: 24,
        fontFamily: LF.display, color: LF.white,
        fontSize: 46, lineHeight: 0.84, letterSpacing: '-0.05em', textTransform: 'uppercase',
      }}>{lpLines(lp.t19Name)}</div>

      <div style={{
        position: 'absolute', top: photoH + 18 + 96, left: 24, right: 24,
        fontFamily: LF.mono, color: LF.amber,
        fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
      }}>{lp.t19Role}</div>

      <div style={{
        position: 'absolute', top: photoH + 18 + 124, left: 24, right: 24,
        fontFamily: LF.serif, color: 'rgba(255,255,255,0.78)',
        fontSize: 12.5, lineHeight: 1.55, letterSpacing: 0, textWrap: 'pretty',
      }}>{lpLines(lp.t19Bio)}</div>

      <div style={{
        position: 'absolute', left: 24, right: 24, bottom: 22,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12,
        borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 14,
      }}>
        {stats.map(([num, label], i) => (
          <div key={i}>
            <div style={{
              fontFamily: LF.display, color: LF.amber,
              fontSize: 30, lineHeight: 0.9, letterSpacing: '-0.04em',
            }}>{num}</div>
            <div style={{
              fontFamily: LF.mono, color: 'rgba(255,255,255,0.6)',
              fontSize: 8.5, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4,
            }}>{label}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ─── T20 · TOP 5 / RANKING (4:5) ────────────────────────────────────────────
// Lista numerada editorial — los mejores looks de la temporada
export function T20_Top5({ w = 540, h = 675 }) {
  const lp = useLP();
  const items = [
    [lp.t20I1Label, lp.t20I1Sub],
    [lp.t20I2Label, lp.t20I2Sub],
    [lp.t20I3Label, lp.t20I3Sub],
    [lp.t20I4Label, lp.t20I4Sub],
    [lp.t20I5Label, lp.t20I5Sub],
  ];
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${LF.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
        backgroundSize: '90px 90px', opacity: 0.18,
      }} />

      <div style={{
        position: 'absolute', top: 22, left: 24, right: 24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <TechStrip size={10} color={LF.amber}>{lp.t20Stamp}</TechStrip>
        <LFMark size={20} color={LF.amber} />
      </div>

      <div style={{
        position: 'absolute', top: 50, left: 24, right: 24,
        fontFamily: LF.display, color: LF.white,
        fontSize: 50, lineHeight: 0.84, letterSpacing: '-0.05em', textTransform: 'uppercase',
      }}>{lpLines(lp.t20Title)}</div>

      <div style={{
        position: 'absolute', left: 24, right: 24, bottom: 52, top: 188,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {items.map(([label, sub], i) => {
          const rank = i + 1;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              paddingBottom: 10,
              borderBottom: `1px solid ${rank === 1 ? LF.amber : 'rgba(255,255,255,0.16)'}`,
            }}>
              <div style={{
                fontFamily: LF.display,
                color: rank === 1 ? LF.amber : LF.white,
                fontSize: 54, lineHeight: 0.8, letterSpacing: '-0.06em',
                minWidth: 64, textAlign: 'left',
              }}>{String(rank).padStart(2, '0')}</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: LF.display, color: LF.white,
                  fontSize: 22, lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase',
                }}>{label}</div>
                <div style={{
                  fontFamily: LF.mono, color: 'rgba(255,255,255,0.6)',
                  fontSize: 9.5, letterSpacing: '0.1em', marginTop: 3, textTransform: 'uppercase',
                }}>{sub}</div>
              </div>
              {rank === 1 && (
                <div style={{
                  fontFamily: LF.mono, fontSize: 8, color: LF.black, background: LF.amber,
                  padding: '3px 6px', letterSpacing: '0.14em',
                }}>TOP</div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', left: 24, right: 24, bottom: 20,
        display: 'flex', justifyContent: 'space-between',
      }}>
        <TechStrip size={9} color={LF.white}>{lp.handle}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t20Footer}</TechStrip>
      </div>
    </Frame>
  );
}

// ─── T21 · TESTIMONIO / CLIENT QUOTE (1:1) ──────────────────────────────────
// Comilla masiva + cita + nombre del cliente + foto en miniatura
export function T21_Testimonial({ w = 540, h = 540 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', top: 20, left: 24, right: 24,
        display: 'flex', justifyContent: 'space-between',
      }}>
        <TechStrip size={10} color={LF.amber}>{lp.t21Stamp}</TechStrip>
        <LFMark size={18} color={LF.amber} />
      </div>

      <div style={{
        position: 'absolute', top: 30, left: 18,
        fontFamily: LF.display, color: LF.amber,
        fontSize: 200, lineHeight: 0.7, letterSpacing: '-0.06em',
        opacity: 0.9, pointerEvents: 'none',
      }}>”</div>

      <div style={{
        position: 'absolute', left: 26, right: 26, top: 150,
        fontFamily: LF.display, color: LF.white,
        fontSize: 30, lineHeight: 1.02, letterSpacing: '-0.03em', textTransform: 'uppercase',
      }}>{lpLines(lp.t21Quote)}</div>

      <div style={{
        position: 'absolute', left: 24, right: 24, bottom: 24,
        display: 'flex', alignItems: 'center', gap: 14,
        borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 16,
      }}>
        <div style={{ width: 56, height: 56, flexShrink: 0 }}>
          <PhotoSlot slotId="t21-photo" placeholder="CLIENTE" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: LF.display, color: LF.white,
            fontSize: 19, lineHeight: 1, letterSpacing: '-0.03em', textTransform: 'uppercase',
          }}>{lp.t21Name}</div>
          <div style={{
            fontFamily: LF.mono, color: LF.amber,
            fontSize: 9.5, letterSpacing: '0.12em', marginTop: 4, textTransform: 'uppercase',
          }}>{lp.t21Role}</div>
        </div>
        <div style={{
          fontFamily: LF.mono, color: 'rgba(255,255,255,0.4)',
          fontSize: 8, letterSpacing: '0.14em', textAlign: 'right', textTransform: 'uppercase',
        }}>{lpLines(lp.t21Tag)}</div>
      </div>
    </Frame>
  );
}

// ─── T22 · BEHIND-THE-SCENES (1:1) ──────────────────────────────────────────
// Polaroid rotada + anotaciones "manuscritas" ámbar
export function T22_BehindScenes({ w = 540, h = 540 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${LF.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
        backgroundSize: '60px 60px', opacity: 0.16,
      }} />

      <div style={{
        position: 'absolute', top: 18, left: 22, right: 22,
        display: 'flex', justifyContent: 'space-between',
      }}>
        <TechStrip size={10} color={LF.amber}>{lp.t22Stamp}</TechStrip>
        <LFMark size={18} color={LF.amber} />
      </div>

      <div style={{
        position: 'absolute', top: 56, left: 64, right: 64, bottom: 86,
        background: LF.white, padding: '12px 12px 0',
        transform: 'rotate(-2.5deg)',
        boxShadow: '0 18px 40px rgba(0,0,0,0.6)',
      }}>
        <div style={{ position: 'relative', width: '100%', height: '78%' }}>
          <PhotoSlot slotId="t22-photo" placeholder="TOMA CRUDA · BACKSTAGE" />
        </div>
        <div style={{
          fontFamily: LF.mono, color: LF.black,
          fontSize: 11, letterSpacing: '0.08em',
          padding: '10px 2px 0', textTransform: 'uppercase',
        }}>{lp.t22Caption}</div>
      </div>

      <div style={{
        position: 'absolute', top: 78, right: 30,
        transform: 'rotate(6deg)', textAlign: 'right', pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: LF.mono, color: LF.amber,
          fontSize: 12, letterSpacing: '0.04em', fontWeight: 600, lineHeight: 1.2,
        }}>{lpLines(lp.t22Note1)}</div>
        <div style={{ fontFamily: LF.display, color: LF.amber, fontSize: 26, marginTop: -2 }}>↙</div>
      </div>

      <div style={{
        position: 'absolute', bottom: 30, left: 26,
        transform: 'rotate(-4deg)', pointerEvents: 'none',
      }}>
        <div style={{ fontFamily: LF.display, color: LF.amber, fontSize: 24 }}>↗</div>
        <div style={{
          fontFamily: LF.mono, color: LF.amber,
          fontSize: 12, letterSpacing: '0.04em', fontWeight: 600, lineHeight: 1.2, marginTop: -2,
        }}>{lpLines(lp.t22Note2)}</div>
      </div>
    </Frame>
  );
}

// ─── T23 · DATOS / ESTADÍSTICA SESIÓN (1:1) ─────────────────────────────────
// Ficha técnica post-shoot: frames, looks, horas, selección
export function T23_SessionStats({ w = 540, h = 540 }) {
  const lp = useLP();
  const cells = [
    [lp.t23Stat1Num, lp.t23Stat1Label],
    [lp.t23Stat2Num, lp.t23Stat2Label],
    [lp.t23Stat3Num, lp.t23Stat3Label],
    [lp.t23Stat4Num, lp.t23Stat4Label],
  ];
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', top: 20, left: 24, right: 24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <TechStrip size={10} color={LF.amber}>{lp.t23Stamp}</TechStrip>
        <LFMark size={18} color={LF.amber} />
      </div>

      <div style={{
        position: 'absolute', top: 48, left: 24, right: 24,
        fontFamily: LF.display, color: LF.white,
        fontSize: 38, lineHeight: 0.86, letterSpacing: '-0.04em', textTransform: 'uppercase',
      }}>{lpLines(lp.t23Title)}</div>

      <div style={{
        position: 'absolute', left: 24, right: 24, top: 156, bottom: 78,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr',
        gap: 2, background: 'rgba(255,255,255,0.2)',
        border: '1px solid rgba(255,255,255,0.2)',
      }}>
        {cells.map(([num, label], i) => (
          <div key={i} style={{
            background: i === 0 ? LF.amber : LF.black,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '0 18px',
          }}>
            <div style={{
              fontFamily: LF.display,
              color: i === 0 ? LF.black : LF.amber,
              fontSize: 52, lineHeight: 0.84, letterSpacing: '-0.05em',
            }}>{num}</div>
            <div style={{
              fontFamily: LF.mono,
              color: i === 0 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.6)',
              fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6,
            }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', left: 24, right: 24, bottom: 22,
        display: 'flex', justifyContent: 'space-between',
        borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 12,
      }}>
        <TechStrip size={9} color={LF.white}>{lp.t23Footer}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.handle}</TechStrip>
      </div>
    </Frame>
  );
}

// ─── T24 · NEW DROP / LANZAMIENTO (4:5) ─────────────────────────────────────
// Anuncia editorial nueva con badge "NOW LIVE" rotado
export function T24_NewDrop({ w = 540, h = 675 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <PhotoSlot slotId="t24-photo" placeholder="EDITORIAL · CAMPAÑA NUEVA" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 28%, transparent 48%, rgba(0,0,0,0.92) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      <div style={{
        position: 'absolute', top: 18, left: 22, right: 22,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <TechStrip size={10} color={LF.white}>{lp.t24TopLabel}</TechStrip>
        <LFMark size={20} color={LF.amber} />
      </div>

      <div style={{
        position: 'absolute', top: 70, right: 28,
        background: LF.amber, color: LF.black,
        fontFamily: LF.display, fontSize: 16, letterSpacing: '0.02em',
        padding: '8px 14px', transform: 'rotate(4deg)',
        textTransform: 'uppercase',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
      }}>{lp.t24Badge}</div>

      <div style={{ position: 'absolute', left: 24, right: 24, bottom: 24, pointerEvents: 'none' }}>
        <TechStrip size={10} color={LF.amber}>{lp.t24Kicker}</TechStrip>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 64, lineHeight: 0.82, letterSpacing: '-0.05em',
          textTransform: 'uppercase', marginTop: 8,
        }}>{lpLines(lp.t24Title)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.3)' }} />
          <TechStrip size={10} color={LF.white}>{lp.t24Cta}</TechStrip>
        </div>
      </div>
    </Frame>
  );
}

// ─── T25 · POLAROID STACK (1:1) ─────────────────────────────────────────────
// 3 polaroids apiladas y rotadas para teaser informal
export function T25_PolaroidStack({ w = 540, h = 540 }) {
  const lp = useLP();
  const cards = [
    { id: 't25-photo-3', rot: 7, x: 60, y: 90, z: 1, ph: 'FRAME 03' },
    { id: 't25-photo-2', rot: -5, x: -50, y: 60, z: 2, ph: 'FRAME 02' },
    { id: 't25-photo-1', rot: 2, x: 8, y: 0, z: 3, ph: 'FRAME 01', cap: lp.t25Caption },
  ];
  const cardW = Math.round(w * 0.52);
  const cardH = Math.round(cardW * 1.18);
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${LF.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
        backgroundSize: '60px 60px', opacity: 0.16,
      }} />

      <div style={{
        position: 'absolute', top: 18, left: 22, right: 22,
        display: 'flex', justifyContent: 'space-between', zIndex: 10,
      }}>
        <TechStrip size={10} color={LF.amber}>{lp.t25Stamp}</TechStrip>
        <LFMark size={18} color={LF.amber} />
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'relative', width: cardW, height: cardH }}>
          {cards.map((c) => (
            <div key={c.id} style={{
              position: 'absolute', top: 0, left: 0,
              width: cardW, height: cardH,
              background: LF.white, padding: '10px 10px 0',
              transform: `translate(${c.x}px, ${c.y - 50}px) rotate(${c.rot}deg)`,
              boxShadow: '0 14px 36px rgba(0,0,0,0.55)',
              zIndex: c.z,
            }}>
              <div style={{ position: 'relative', width: '100%', height: c.cap ? '80%' : '88%' }}>
                <PhotoSlot slotId={c.id} placeholder={c.ph} />
              </div>
              {c.cap && (
                <div style={{
                  fontFamily: LF.mono, color: LF.black,
                  fontSize: 10, letterSpacing: '0.06em',
                  padding: '8px 2px 0', textTransform: 'uppercase',
                }}>{c.cap}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 18,
        display: 'flex', justifyContent: 'space-between', zIndex: 10,
      }}>
        <TechStrip size={9} color={LF.white}>{lp.handle}</TechStrip>
        <TechStrip size={9} color={LF.amber}>{lp.t25Footer}</TechStrip>
      </div>
    </Frame>
  );
}

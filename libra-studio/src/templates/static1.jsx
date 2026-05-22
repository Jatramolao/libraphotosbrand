import React from 'react';
import { useLP, LF, Frame, PhotoSlot, TechStrip, LFMark, Rule, lpLines } from './primitives';

// T01 — Editorial Cover (4:5)
export function T01_EditorialCover({ w = 540, h = 675 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* Full-bleed photo */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <PhotoSlot slotId="t01-main" placeholder="FOTO PRINCIPAL" tone="dark" />
      </div>
      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 18px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, transparent 100%)',
      }}>
        <TechStrip color={LF.white} size={9}>
          {lp?.brand ?? 'LIBRA PHOTOS'} · {lp?.t01TopLabel ?? 'EVENTO'}
        </TechStrip>
        <LFMark size={18} color={LF.amber} />
      </div>
      {/* Amber bottom title block */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: LF.amber,
        padding: '14px 18px 18px',
      }}>
        <div style={{
          fontFamily: LF.display, fontSize: Math.round(w * 0.12), color: LF.black,
          lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase',
        }}>
          {lpLines(lp?.coverTitle ?? 'RED\nLIGHTS')}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 10 }}>
          <TechStrip color={LF.black} size={9}>{lp?.coverCaption ?? 'SS / 26 · DALMORE'}</TechStrip>
          <TechStrip color={LF.black} size={9}>{lp?.t01Cta ?? 'SCROLL ▸'}</TechStrip>
        </div>
        <Rule color={LF.black} style={{ marginTop: 8 }} />
        <TechStrip color={LF.black} size={8} style={{ marginTop: 6 }}>{lp?.t01TechMeta ?? '200MM · Ƒ/2.8 · ISO 3200 · 1/200'}</TechStrip>
      </div>
    </Frame>
  );
}

// T02 — Metadata Card (4:5)
export function T02_MetadataCard({ w = 540, h = 675 }) {
  const lp = useLP();
  const photoH = Math.round(h * 0.72);
  const metaH = h - photoH;
  const rows = [
    [lp?.t02FileLabel ?? 'FILE', lp?.t02FileValue ?? 'DSC07591'],
    [lp?.t02CamLabel ?? 'CAM', lp?.t02CamValue ?? 'SONY α7 IV · 70-200 G'],
    [lp?.t02ExpLabel ?? 'EXPOSURE', lp?.t02ExpValue ?? 'ƒ/2.8 · 1/200 · ISO 3200'],
    [lp?.t02LocLabel ?? 'LOCATION', lp?.t02LocValue ?? 'SANTIAGO · CL · 23:42'],
  ];
  return (
    <Frame width={w} height={h} bg={LF.white}>
      {/* Photo top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: photoH }}>
        <PhotoSlot slotId="t02-main" placeholder="FOTO · METADATA" tone="dark" />
        {/* Top bar overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 16px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
        }}>
          <TechStrip color={LF.white} size={8}>{lp?.brand ?? 'LIBRA PHOTOS'}</TechStrip>
          <LFMark size={16} color={LF.amber} />
        </div>
      </div>
      {/* Amber rule */}
      <div style={{ position: 'absolute', top: photoH, left: 0, right: 0, height: 3, background: LF.amber }} />
      {/* Meta block */}
      <div style={{
        position: 'absolute', top: photoH + 3, left: 0, right: 0, bottom: 0,
        background: LF.black, padding: '12px 16px 14px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {rows.map(([label, value], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <TechStrip color={LF.amber} size={8} style={{ minWidth: 90, flexShrink: 0 }}>{label}</TechStrip>
            <TechStrip color={LF.white} size={9} style={{ flex: 1, opacity: 0.9 }}>{value}</TechStrip>
          </div>
        ))}
        <Rule color="rgba(255,255,255,0.15)" style={{ marginTop: 4 }} />
        <TechStrip color="rgba(255,255,255,0.35)" size={7} style={{ marginTop: 4 }}>{lp?.handle ?? '@_libraphotos'} · {lp?.site ?? 'LIBRAPHOTOS.CL'}</TechStrip>
      </div>
    </Frame>
  );
}

// T03 — Violet Drop (4:5)
export function T03_VioletDrop({ w = 540, h = 675 }) {
  const lp = useLP();
  const photoW = Math.round(w * 0.78);
  const photoH = Math.round(h * 0.62);
  const photoTop = Math.round(h * 0.07);
  const photoLeft = Math.round(w * 0.12);
  return (
    <Frame width={w} height={h} bg={LF.violet}>
      {/* Vertical label left */}
      <div style={{
        position: 'absolute', left: 12, top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        transformOrigin: 'center center',
        whiteSpace: 'nowrap',
      }}>
        <TechStrip color="rgba(255,255,255,0.5)" size={7}>{lp?.t03VertLabel ?? 'VOL · SPECIAL · ART COLLECTION · 002 — LIBRA PHOTOS'}</TechStrip>
      </div>
      {/* Offset photo block */}
      <div style={{ position: 'absolute', top: photoTop, left: photoLeft, width: photoW, height: photoH }}>
        <PhotoSlot slotId="t03-main" placeholder="FOTO · VIOLET DROP" tone="dark" />
        {/* Corner crop marks */}
        {[{ top: -6, left: -6 }, { top: -6, right: -6 }, { bottom: -6, left: -6 }, { bottom: -6, right: -6 }].map((pos, i) => (
          <div key={i} style={{ position: 'absolute', width: 12, height: 12, ...pos, border: `1px solid ${LF.amber}`, borderRadius: 0 }} />
        ))}
      </div>
      {/* Bottom title block */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: LF.black, padding: '16px 20px 20px',
      }}>
        <TechStrip color={LF.amber} size={8} style={{ marginBottom: 8 }}>{lp?.t03Stamp ?? 'EDICIÓN ÚNICA / DISRUPTIVA'}</TechStrip>
        <div style={{
          fontFamily: LF.display, fontSize: Math.round(w * 0.14), color: LF.white,
          lineHeight: 0.88, letterSpacing: '-0.04em', textTransform: 'uppercase',
        }}>
          {lpLines(lp?.noirTitle ?? 'LIBRA\nNOIR.')}
        </div>
        <Rule color={LF.amber} style={{ marginTop: 12 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <TechStrip color="rgba(255,255,255,0.5)" size={8}>{lp?.edition ? `ED.${lp.edition}` : 'ED.07'}</TechStrip>
          <LFMark size={14} color={LF.amber} />
        </div>
      </div>
      {/* Top brand bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TechStrip color="rgba(255,255,255,0.7)" size={8}>{lp?.brand ?? 'LIBRA PHOTOS'}</TechStrip>
        <TechStrip color={LF.amber} size={8}>{lp?.handle ?? '@_libraphotos'}</TechStrip>
      </div>
    </Frame>
  );
}

// T04 — Credits Slate (4:5)
export function T04_CreditsSlate({ w = 540, h = 675 }) {
  const lp = useLP();
  const credits = [
    [lp?.t04DirectionLabel ?? 'DIRECTION', lp?.brand ?? 'LIBRA PHOTOS'],
    [lp?.t04StylingLabel ?? 'STYLING', lp?.t04StylingValue ?? 'M. SOTO'],
    [lp?.t04MakeUpLabel ?? 'MAKE UP', lp?.t04MakeUpValue ?? 'C. NAVARRO'],
    [lp?.t04ModelLabel ?? 'MODEL', lp?.t04ModelValue ?? 'V. AGUIRRE @ ELITE'],
  ];
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* Top label */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <TechStrip color="rgba(255,255,255,0.45)" size={9}>{lp?.t04TopLabel ?? 'CREDITS · ED.07 / 03'}</TechStrip>
        <LFMark size={16} color={LF.amber} />
      </div>
      {/* Massive title */}
      <div style={{
        position: 'absolute', top: 64, left: 20,
        fontFamily: LF.display, fontSize: Math.round(w * 0.18), color: LF.white,
        lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase',
      }}>
        {lpLines(lp?.t04Title ?? 'CRE\nDITS')}
      </div>
      {/* Amber accent line */}
      <div style={{ position: 'absolute', top: 64, right: 20, width: 3, height: Math.round(w * 0.38), background: LF.amber }} />
      {/* Credits table */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 24px' }}>
        <Rule color="rgba(255,255,255,0.12)" style={{ marginBottom: 16 }} />
        {credits.map(([label, value], i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < credits.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
            <TechStrip color={LF.amber} size={8}>{label}</TechStrip>
            <TechStrip color={LF.white} size={9}>{value}</TechStrip>
          </div>
        ))}
        <Rule color="rgba(255,255,255,0.12)" style={{ marginTop: 16, marginBottom: 12 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TechStrip color="rgba(255,255,255,0.35)" size={8}>{lp?.t04Copyright ?? '© LIBRA PHOTOS · MMXXVI'}</TechStrip>
          <TechStrip color={LF.amber} size={8}>{lp?.t04EndTag ?? 'END / 09'}</TechStrip>
        </div>
      </div>
    </Frame>
  );
}

// T06 — Type Poster (1:1 or 4:5)
export function T06_TypePoster({ w = 540, h = 540 }) {
  const lp = useLP();
  const gridSize = Math.round(w / 8);
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* Faint grid lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }} xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: Math.ceil(w / gridSize) + 1 }, (_, i) => (
          <line key={`v${i}`} x1={i * gridSize} y1={0} x2={i * gridSize} y2={h} stroke="white" strokeWidth={0.5} />
        ))}
        {Array.from({ length: Math.ceil(h / gridSize) + 1 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * gridSize} x2={w} y2={i * gridSize} stroke="white" strokeWidth={0.5} />
        ))}
      </svg>
      {/* Corner stamps */}
      <div style={{ position: 'absolute', top: 14, left: 16 }}>
        <TechStrip color="rgba(255,255,255,0.4)" size={8}>{lp?.t06TopLeft ?? 'FILE / 0247'}</TechStrip>
      </div>
      <div style={{ position: 'absolute', top: 14, right: 16 }}>
        <TechStrip color="rgba(255,255,255,0.4)" size={8}>{lp?.t06TopRight ?? 'ED.07 · CHAP. 02'}</TechStrip>
      </div>
      {/* Massive amber manifesto text centered */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px',
      }}>
        <div style={{
          fontFamily: LF.display, fontSize: Math.round(w * 0.17), color: LF.amber,
          lineHeight: 0.88, letterSpacing: '-0.05em', textTransform: 'uppercase',
          textAlign: 'left',
        }}>
          {lpLines(lp?.manifestTop ?? 'CAOS\n\nCONTRO\nLADO.')}
        </div>
      </div>
      {/* Subtítulo */}
      <div style={{ position: 'absolute', bottom: 40, left: 16, right: 16 }}>
        <Rule color="rgba(255,255,255,0.18)" style={{ marginBottom: 10 }} />
        <TechStrip color="rgba(255,255,255,0.55)" size={9}>{lp?.manifestSub ?? 'UN PRINCIPIO · NO UN ACCIDENTE.'}</TechStrip>
      </div>
      {/* Bottom left */}
      <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
        <TechStrip color="rgba(255,255,255,0.3)" size={8}>{lp?.t06BottomLeft ?? 'LIBRA PHOTOS — SS / 26'}</TechStrip>
      </div>
      <div style={{ position: 'absolute', bottom: 14, right: 16 }}>
        <LFMark size={14} color={LF.amber} />
      </div>
    </Frame>
  );
}

// T08 — Quote Pull (1:1 or 4:5)
export function T08_QuotePull({ w = 540, h = 540 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.white}>
      {/* Giant amber quote glyph top-right */}
      <div style={{
        position: 'absolute', top: -10, right: 12,
        fontFamily: LF.display, fontSize: Math.round(w * 0.38), color: LF.amber,
        lineHeight: 1, letterSpacing: '-0.05em', opacity: 0.22, userSelect: 'none',
        pointerEvents: 'none',
      }}>"</div>
      {/* Quote text */}
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0,
        transform: 'translateY(-58%)',
        padding: '0 28px',
      }}>
        <div style={{
          fontFamily: LF.display, fontSize: Math.round(w * 0.075), color: LF.black,
          lineHeight: 1.1, letterSpacing: '-0.03em', textTransform: 'uppercase',
        }}>
          {lpLines(lp?.quote ?? 'NO FOTOGRAFÍO SOLO MOMENTOS.\nFOTOGRAFÍO\nACTITUD.')}
        </div>
      </div>
      {/* Bottom attribution bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: LF.black, padding: '14px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TechStrip color={LF.white} size={9}>{lp?.brand ?? 'LIBRA PHOTOS'}</TechStrip>
          <TechStrip color={LF.amber} size={9}>{lp?.t08Stamp ?? 'FILE / 2205'}</TechStrip>
          <TechStrip color="rgba(255,255,255,0.5)" size={8}>{lp?.t08Tag ?? 'SS26'}</TechStrip>
        </div>
      </div>
      {/* Top stamp */}
      <div style={{ position: 'absolute', top: 14, left: 20 }}>
        <TechStrip color="rgba(0,0,0,0.3)" size={8}>{lp?.handle ?? '@_libraphotos'}</TechStrip>
      </div>
    </Frame>
  );
}

// T09 — Story Ticker (9:16)
export function T09_StoryTicker({ w = 405, h = 720 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* Full-bleed photo */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <PhotoSlot slotId="t09-main" placeholder="FOTO · STORY" tone="dark" />
      </div>
      {/* Dark vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 35%, transparent 45%, rgba(0,0,0,0.8) 100%)',
        pointerEvents: 'none',
      }} />
      {/* LIVE badge top-left */}
      <div style={{ position: 'absolute', top: 20, left: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff3838', flexShrink: 0 }} />
        <TechStrip color={LF.white} size={9}>{lp?.t09Status ?? 'LIVE · 22:14'}</TechStrip>
      </div>
      {/* LP monogram top-right */}
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <LFMark size={20} color={LF.amber} />
      </div>
      {/* Vertical caption right */}
      <div style={{
        position: 'absolute', right: 16, top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        transformOrigin: 'center center',
        whiteSpace: 'nowrap',
      }}>
        <TechStrip color="rgba(255,255,255,0.55)" size={8}>{lp?.t09VertLabel ?? 'RUNWAY · CHAPTER 07'}</TechStrip>
      </div>
      {/* Amber headline block center-bottom */}
      <div style={{
        position: 'absolute', bottom: 100, left: 0, right: 0,
        background: LF.amber, padding: '14px 18px',
      }}>
        <div style={{
          fontFamily: LF.display, fontSize: Math.round(w * 0.12), color: LF.black,
          lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase',
        }}>
          {lpLines(lp?.t09Headline ?? 'EN VIVO\nDESDE EL\nBACK.')}
        </div>
      </div>
      {/* Ticker strip */}
      <div style={{
        position: 'absolute', bottom: 60, left: 0, right: 0,
        background: LF.black, padding: '6px 0', overflow: 'hidden',
      }}>
        <TechStrip color={LF.amber} size={8} style={{ whiteSpace: 'nowrap', paddingLeft: 16 }}>
          {lp?.t09Ticker ?? 'NOW LIVE · BACKSTAGE ED.07 · CASA ÍMPETU · SS26 · ▸ ▸ ▸ · ÚLTIMA HORA · FOTOGRAFÍA EN TIEMPO REAL · '}
        </TechStrip>
      </div>
      {/* Black bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
        background: LF.black, padding: '0 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <TechStrip color="rgba(255,255,255,0.55)" size={8}>{lp?.t09Meta ?? 'ƒ/2.0 · ISO 8000 · 1/500'}</TechStrip>
        <TechStrip color={LF.amber} size={9}>{lp?.t09Cta ?? '↑ DESLIZAR'}</TechStrip>
      </div>
    </Frame>
  );
}

// T10 — Story Countdown (9:16)
export function T10_StoryType({ w = 405, h = 720 }) {
  const lp = useLP();
  const gridSize = Math.round(w / 6);
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* Faint grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }} xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: Math.ceil(w / gridSize) + 1 }, (_, i) => (
          <line key={`v${i}`} x1={i * gridSize} y1={0} x2={i * gridSize} y2={h} stroke="white" strokeWidth={0.5} />
        ))}
        {Array.from({ length: Math.ceil(h / gridSize) + 1 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * gridSize} x2={w} y2={i * gridSize} stroke="white" strokeWidth={0.5} />
        ))}
      </svg>
      {/* Top label */}
      <div style={{ position: 'absolute', top: 20, left: 0, right: 0, padding: '0 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TechStrip color="rgba(255,255,255,0.55)" size={9}>{lp?.t10TopLabel ?? 'PROXIMAMENTE'}</TechStrip>
        <LFMark size={18} color={LF.amber} />
      </div>
      {/* Massive amber countdown number */}
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0,
        transform: 'translateY(-60%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: LF.display, fontSize: Math.round(w * 0.55), color: LF.amber,
          lineHeight: 0.85, letterSpacing: '-0.06em',
        }}>
          {lp?.countdownDays ?? '07'}
        </div>
      </div>
      {/* Days caption */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, textAlign: 'center', marginTop: 16 }}>
        <TechStrip color="rgba(255,255,255,0.55)" size={10}>{lp?.t10DaysCaption ?? 'DÍAS · HASTA EL DROP'}</TechStrip>
      </div>
      {/* Editorial info */}
      <div style={{ position: 'absolute', bottom: 140, left: 0, right: 0, padding: '0 18px' }}>
        <Rule color="rgba(255,255,255,0.15)" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <TechStrip color="rgba(255,255,255,0.4)" size={8}>{lp?.brand ?? 'LIBRA PHOTOS'}</TechStrip>
          <TechStrip color="rgba(255,255,255,0.4)" size={8}>{lp?.edition ? `ED.${lp.edition}` : 'ED.07'} · {lp?.chapter ?? 'RUNWAY'}</TechStrip>
        </div>
      </div>
      {/* Amber CTA button */}
      <div style={{ position: 'absolute', bottom: 60, left: 18, right: 18 }}>
        <div style={{
          background: LF.amber, padding: '16px',
          textAlign: 'center',
          fontFamily: LF.mono, fontSize: 11, letterSpacing: '0.16em',
          color: LF.black, textTransform: 'uppercase',
        }}>
          {lp?.t10Cta ?? 'ACTIVAR RECORDATORIO'}
        </div>
      </div>
      {/* More info CTA */}
      <div style={{ position: 'absolute', bottom: 22, left: 0, right: 0, textAlign: 'center' }}>
        <TechStrip color="rgba(255,255,255,0.45)" size={9}>{lp?.t10MoreInfo ?? '↑ MÁS INFO'}</TechStrip>
      </div>
    </Frame>
  );
}

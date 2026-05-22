import React from 'react';
import { useLP, LF, Frame, PhotoSlot, TechStrip, LFMark, Rule, lpLines } from './primitives';

// T11 — Drop / Teaser (4:5)
export function T11_DropTeaser({ w = 540, h = 675 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* Amber top band */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, background: LF.amber, display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
        <TechStrip color={LF.black} size={9}>
          PRÓXIMAMENTE · DROP {lp?.date ?? '14.06.26'}
        </TechStrip>
        <LFMark size={14} color={LF.black} />
      </div>
      {/* Massive title */}
      <div style={{
        position: 'absolute', top: 56, left: 16,
        fontFamily: LF.display, fontSize: Math.round(w * 0.19), color: LF.white,
        lineHeight: 0.88, letterSpacing: '-0.05em', textTransform: 'uppercase',
        zIndex: 2,
      }}>
        {(() => {
          const titleStr = lp?.t11Title ?? 'NEW\nDROP.';
          const parts = String(titleStr).split('\n');
          return parts.map((line, i) => (
            <div key={i}>
              {line.split('.').map((seg, j, arr) => (
                <span key={j}>
                  {seg}
                  {j < arr.length - 1 && <span style={{ color: LF.amber }}>.</span>}
                </span>
              ))}
              {i < parts.length - 1 ? null : null}
              {i < parts.length - 1 && <br />}
            </div>
          ));
        })()}
      </div>
      {/* Diagonal photo clip — bottom half */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: Math.round(h * 0.55),
        clipPath: 'polygon(0 18%, 100% 0%, 100% 100%, 0% 100%)',
        overflow: 'hidden',
      }}>
        <PhotoSlot slotId="t11-main" placeholder="FOTO · TEASER" tone="dark" />
      </div>
      {/* Gradient overlay on photo */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: Math.round(h * 0.55),
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 50%)',
        pointerEvents: 'none',
        clipPath: 'polygon(0 18%, 100% 0%, 100% 100%, 0% 100%)',
      }} />
      {/* Meta grid */}
      <div style={{ position: 'absolute', bottom: 56, left: 0, right: 0, padding: '0 16px', display: 'flex', gap: 12 }}>
        <div style={{ background: 'rgba(0,0,0,0.7)', padding: '8px 12px', flex: 1 }}>
          <TechStrip color={LF.amber} size={7}>{lp?.edition ? `EDICIÓN ${lp.edition}` : 'EDICIÓN 07'}</TechStrip>
          <TechStrip color={LF.white} size={9} style={{ marginTop: 3 }}>{lp?.designer ?? 'CASA ÍMPETU'}</TechStrip>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.7)', padding: '8px 12px', flex: 1 }}>
          <TechStrip color={LF.amber} size={7}>COLECCIÓN</TechStrip>
          <TechStrip color={LF.white} size={9} style={{ marginTop: 3 }}>{lp?.collection ?? 'AVE NEGRA'}</TechStrip>
        </div>
      </div>
      {/* Amber CTA bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: LF.amber, height: 46, padding: '0 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <TechStrip color={LF.black} size={11}>{lp?.t11Cta ?? 'GUARDA LA FECHA ▸'}</TechStrip>
        <TechStrip color={LF.black} size={8}>{lp?.handle ?? '@_libraphotos'}</TechStrip>
      </div>
    </Frame>
  );
}

// T12 — Designer Spotlight (4:5)
export function T12_DesignerSpotlight({ w = 540, h = 675 }) {
  const lp = useLP();
  const designerName = (lp?.designer ?? 'CASA ÍMPETU').replace(' ', '\n') + '.';
  return (
    <Frame width={w} height={h} bg={LF.white}>
      {/* Black top strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 50, background: LF.black, display: 'flex', alignItems: 'center', padding: '0 18px', justifyContent: 'space-between' }}>
        <TechStrip color={LF.amber} size={9}>{lp?.t12Stamp ?? 'SPOTLIGHT / N°03'}</TechStrip>
        <TechStrip color="rgba(255,255,255,0.5)" size={8}>{lp?.t12SectionLabel ?? 'DISEÑADOR FEATURED'}</TechStrip>
        <LFMark size={16} color={LF.amber} />
      </div>
      {/* Designer name big */}
      <div style={{
        position: 'absolute', top: 62, left: 18,
        fontFamily: LF.display, fontSize: Math.round(w * 0.13), color: LF.black,
        lineHeight: 0.88, letterSpacing: '-0.04em', textTransform: 'uppercase',
      }}>
        {lpLines(designerName)}
      </div>
      {/* Photo block — right side middle */}
      <div style={{
        position: 'absolute',
        top: 50,
        right: 0,
        width: Math.round(w * 0.58),
        height: Math.round(h * 0.52),
        overflow: 'hidden',
      }}>
        <PhotoSlot slotId="t12-main" placeholder="FOTO · DISEÑADOR" tone="dark" />
      </div>
      {/* Amber vertical accent */}
      <div style={{ position: 'absolute', top: 50, left: 0, width: 4, height: Math.round(h * 0.52), background: LF.amber }} />
      {/* Collection label */}
      <div style={{
        position: 'absolute',
        top: 50 + Math.round(h * 0.52) + 16,
        left: 18,
      }}>
        <TechStrip color={LF.amber} size={8}>COLECCIÓN</TechStrip>
        <div style={{ fontFamily: LF.display, fontSize: Math.round(w * 0.058), color: LF.black, letterSpacing: '-0.03em', textTransform: 'uppercase', marginTop: 4 }}>
          {lp?.collection ?? 'AVE NEGRA'}
        </div>
      </div>
      {/* Footer grid */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: LF.black, padding: '14px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TechStrip color={LF.white} size={8}>{lp?.brand ?? 'LIBRA PHOTOS'}</TechStrip>
          <TechStrip color={LF.amber} size={8}>{lp?.edition ? `ED.${lp.edition}` : 'ED.07'} · {lp?.chapter ?? 'RUNWAY'}</TechStrip>
          <TechStrip color="rgba(255,255,255,0.4)" size={8}>{lp?.handle ?? '@_libraphotos'}</TechStrip>
        </div>
      </div>
    </Frame>
  );
}

// T13 — Event Poster (4:5)
export function T13_EventPoster({ w = 540, h = 675 }) {
  const lp = useLP();
  const titleLines = (lp?.t13Title ?? 'FASHION\nWEEK\nSTGO.').split('\n');
  const lineupLines = (lp?.t13Lineup ?? 'CASA ÍMPETU · NÓMADA\nESTUDIO V · M.SOTO\nNEÓN PROYECTO · TRES').split('\n');
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* Vertical rule grid */}
      {[0.33, 0.66].map((frac, i) => (
        <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: `${frac * 100}%`, width: 1, background: 'rgba(255,255,255,0.08)' }} />
      ))}
      {/* Top corners */}
      <div style={{ position: 'absolute', top: 14, left: 16 }}>
        <TechStrip color="rgba(255,255,255,0.5)" size={8}>{lp?.t13TopLeft ?? 'SANTIAGO · MMXXVI'}</TechStrip>
      </div>
      <div style={{ position: 'absolute', top: 14, right: 16 }}>
        <TechStrip color="rgba(255,255,255,0.5)" size={8}>{lp?.t13TopRight ?? 'POSTER / V.02'}</TechStrip>
      </div>
      {/* Massive amber title */}
      <div style={{
        position: 'absolute', top: 44, left: 16,
        fontFamily: LF.display, textTransform: 'uppercase',
        lineHeight: 0.88, letterSpacing: '-0.05em',
      }}>
        {titleLines.map((line, i) => (
          <div key={i} style={{
            fontSize: Math.round(w * 0.175),
            color: i === titleLines.length - 1 ? LF.white : LF.amber,
          }}>{line}</div>
        ))}
      </div>
      {/* White date band */}
      <div style={{
        position: 'absolute', top: 44 + titleLines.length * Math.round(w * 0.155),
        left: 0, right: 0,
        background: LF.white, padding: '12px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ fontFamily: LF.display, fontSize: Math.round(w * 0.058), color: LF.black, letterSpacing: '-0.03em' }}>
          {lp?.t13Dates ?? '14 — 18.06.26'}
        </div>
        <TechStrip color={LF.black} size={9}>{lp?.t13Nights ?? '5 NOCHES'}</TechStrip>
      </div>
      {/* Lineup section */}
      <div style={{ position: 'absolute', bottom: 56, left: 0, right: 0, padding: '0 16px' }}>
        <TechStrip color={LF.amber} size={8} style={{ marginBottom: 10 }}>{lp?.t13LineupLabel ?? 'LINEUP / COVERAGE'}</TechStrip>
        <Rule color="rgba(255,255,255,0.15)" style={{ marginBottom: 10 }} />
        {lineupLines.map((line, i) => (
          <div key={i} style={{ padding: '6px 0', borderBottom: i < lineupLines.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
            <TechStrip color={LF.white} size={9}>{line}</TechStrip>
          </div>
        ))}
      </div>
      {/* Amber bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: LF.amber, height: 46,
        display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between',
      }}>
        <TechStrip color={LF.black} size={9}>{lp?.t13Footer ?? 'COBERTURA EXCLUSIVA · LIBRA PHOTOS'}</TechStrip>
        <LFMark size={14} color={LF.black} />
      </div>
    </Frame>
  );
}

// T14 — Booking (4:5)
export function T14_Booking({ w = 540, h = 675 }) {
  const lp = useLP();
  const headlineLines = (lp?.t14Headline ?? 'RESERVA\nTU\nEDITORIAL.').split('\n');
  const services = [
    { tag: lp?.t14S1Tag ?? 'EDITORIAL', desc: lp?.t14S1Desc ?? 'Campaña + lookbook', price: lp?.t14S1Price ?? 'DESDE $1.2M' },
    { tag: lp?.t14S2Tag ?? 'PASARELA', desc: lp?.t14S2Desc ?? 'Cobertura + backstage', price: lp?.t14S2Price ?? '$650K / noche' },
    { tag: lp?.t14S3Tag ?? 'CONCEPTUAL', desc: lp?.t14S3Desc ?? 'Arte de autor', price: lp?.t14S3Price ?? 'A CONVENIR' },
  ];
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* Amber top stamp */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, background: LF.amber, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <TechStrip color={LF.black} size={9}>{lp?.t14Stamp ?? 'AGENDA / 2026'}</TechStrip>
      </div>
      {/* Big headline */}
      <div style={{ position: 'absolute', top: 52, left: 16 }}>
        {headlineLines.map((line, i) => (
          <div key={i} style={{
            fontFamily: LF.display,
            fontSize: Math.round(w * 0.15),
            color: i === headlineLines.length - 1 ? LF.amber : LF.white,
            lineHeight: 0.88, letterSpacing: '-0.05em', textTransform: 'uppercase',
          }}>{line}</div>
        ))}
      </div>
      {/* Services table */}
      <div style={{ position: 'absolute', bottom: 110, left: 0, right: 0, padding: '0 16px' }}>
        <Rule color="rgba(255,255,255,0.12)" style={{ marginBottom: 0 }} />
        {services.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 0',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{
              background: LF.amber, color: LF.black,
              fontFamily: LF.mono, fontSize: 8, letterSpacing: '0.12em',
              padding: '4px 8px', flexShrink: 0, textTransform: 'uppercase',
            }}>{s.tag}</div>
            <TechStrip color="rgba(255,255,255,0.65)" size={9} style={{ flex: 1 }}>{s.desc}</TechStrip>
            <TechStrip color={LF.white} size={9} style={{ flexShrink: 0 }}>{s.price}</TechStrip>
          </div>
        ))}
      </div>
      {/* Amber CTA block */}
      <div style={{
        position: 'absolute', bottom: 46, left: 16, right: 16,
        background: LF.amber, padding: '14px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ fontFamily: LF.display, fontSize: Math.round(w * 0.065), color: LF.black, letterSpacing: '-0.03em' }}>
          {lp?.t14CtaTitle ?? 'BRIEFING ▸'}
        </div>
        <TechStrip color={LF.black} size={9}>{lp?.t14CtaSub ?? 'DM ABIERTO'}</TechStrip>
      </div>
      {/* Contact footer */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 36,
        background: 'rgba(255,255,255,0.04)', borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between',
      }}>
        <TechStrip color="rgba(255,255,255,0.4)" size={8}>{lp?.handle ?? '@_libraphotos'}</TechStrip>
        <TechStrip color="rgba(255,255,255,0.4)" size={8}>{lp?.site ?? 'LIBRAPHOTOS.CL'}</TechStrip>
      </div>
    </Frame>
  );
}

// T15 — Before/After (1:1 or 4:5)
export function T15_BeforeAfter({ w = 540, h = 540 }) {
  const lp = useLP();
  const splitX = Math.round(w / 2);
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* Top label */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, background: LF.black, zIndex: 3, display: 'flex', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <TechStrip color={LF.amber} size={9}>{lp?.t15Stamp ?? 'PROCESO · ANTES / DESPUÉS'}</TechStrip>
        <LFMark size={14} color={LF.amber} style={{ marginLeft: 'auto' }} />
      </div>
      {/* Left RAW photo */}
      <div style={{ position: 'absolute', top: 40, left: 0, width: splitX, bottom: 50, overflow: 'hidden' }}>
        <PhotoSlot slotId="t15-raw" placeholder="RAW · IZQUIERDA" tone="dark" />
        {/* RAW label overlay */}
        <div style={{ position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.7)', padding: '5px 10px' }}>
          <TechStrip color={LF.white} size={10}>{lp?.t15RawTag ?? 'RAW'}</TechStrip>
          <TechStrip color="rgba(255,255,255,0.55)" size={7} style={{ marginTop: 2 }}>{lp?.t15RawSub ?? 'SIN PRESET'}</TechStrip>
        </div>
      </div>
      {/* Right FINAL photo */}
      <div style={{ position: 'absolute', top: 40, right: 0, width: splitX, bottom: 50, overflow: 'hidden' }}>
        <PhotoSlot slotId="t15-final" placeholder="FINAL · DERECHA" tone="dark" />
        {/* FINAL label overlay */}
        <div style={{ position: 'absolute', bottom: 8, right: 8, background: LF.amber, padding: '5px 10px' }}>
          <TechStrip color={LF.black} size={10}>{lp?.t15FinalTag ?? 'FINAL'}</TechStrip>
          <TechStrip color="rgba(0,0,0,0.65)" size={7} style={{ marginTop: 2 }}>{lp?.t15FinalSub ?? 'PRESET · LP.01'}</TechStrip>
        </div>
      </div>
      {/* Amber vertical divider line */}
      <div style={{
        position: 'absolute', top: 40, bottom: 50, left: splitX - 1, width: 2,
        background: LF.amber, zIndex: 2,
      }} />
      {/* Arrow button at divider */}
      <div style={{
        position: 'absolute', top: '50%', left: splitX - 14, transform: 'translateY(-50%)',
        width: 28, height: 28, background: LF.amber,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: LF.mono, fontSize: 12, color: LF.black, zIndex: 3,
      }}>▸</div>
      {/* Bottom brand bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
        background: LF.black, borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between',
        zIndex: 2,
      }}>
        <TechStrip color="rgba(255,255,255,0.4)" size={8}>{lp?.brand ?? 'LIBRA PHOTOS'}</TechStrip>
        <TechStrip color="rgba(255,255,255,0.4)" size={8}>{lp?.handle ?? '@_libraphotos'}</TechStrip>
      </div>
    </Frame>
  );
}

// T16 — Reel Cover (9:16)
export function T16_ReelCover({ w = 405, h = 720 }) {
  const lp = useLP();
  const epNumber = (lp?.t16Episode ?? 'EP.07').replace(/[^0-9]/g, '') || '07';
  return (
    <Frame width={w} height={h} bg={LF.black}>
      {/* Full-bleed photo */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <PhotoSlot slotId="t16-main" placeholder="FOTO · REEL" tone="dark" />
      </div>
      {/* Dark vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 40%, transparent 50%, rgba(0,0,0,0.85) 100%)',
        pointerEvents: 'none',
      }} />
      {/* Amber REEL badge top-left */}
      <div style={{ position: 'absolute', top: 18, left: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ background: LF.amber, padding: '4px 10px' }}>
          <TechStrip color={LF.black} size={9}>{lp?.t16ReelTag ?? '▶ REEL'}</TechStrip>
        </div>
        <TechStrip color={LF.white} size={8}>{lp?.t16Duration ?? '00:24'}</TechStrip>
      </div>
      {/* LP monogram top-right */}
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <LFMark size={22} color={LF.amber} />
      </div>
      {/* Massive EP number amber */}
      <div style={{
        position: 'absolute', top: '28%', left: 16,
        fontFamily: LF.display, fontSize: Math.round(w * 0.55), color: LF.amber,
        lineHeight: 0.85, letterSpacing: '-0.06em', opacity: 0.18,
        pointerEvents: 'none',
      }}>
        {epNumber}
      </div>
      {/* Bottom title block */}
      <div style={{ position: 'absolute', bottom: 56, left: 0, right: 0, padding: '0 18px' }}>
        <TechStrip color={LF.amber} size={8} style={{ marginBottom: 8 }}>{lp?.t16Tag ?? 'BACKSTAGE FILM'} · {lp?.t16Episode ?? 'EP.07'}</TechStrip>
        <div style={{
          fontFamily: LF.display, fontSize: Math.round(w * 0.12), color: LF.white,
          lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase',
        }}>
          {lpLines(lp?.t16Title ?? '3 MINUTOS\nEN EL\nBACK.')}
        </div>
      </div>
      {/* Black bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 46,
        background: LF.black, display: 'flex', alignItems: 'center', padding: '0 18px', justifyContent: 'space-between',
      }}>
        <TechStrip color="rgba(255,255,255,0.5)" size={8}>{lp?.t16Footer ?? '@_LIBRAPHOTOS · ED.07'}</TechStrip>
        <TechStrip color={LF.amber} size={9}>{lp?.t16Cta ?? 'VER REEL ▸'}</TechStrip>
      </div>
    </Frame>
  );
}

// T17 — Highlight Set
export function T17_HighlightSet({ w = 540, h = 540 }) {
  const lp = useLP();
  const items = [
    { label: lp?.t17H1Label ?? 'RUNWAY', glyph: lp?.t17H1Glyph ?? '01', fill: LF.black },
    { label: lp?.t17H2Label ?? 'BACKSTAGE', glyph: lp?.t17H2Glyph ?? '02', fill: LF.amber },
    { label: lp?.t17H3Label ?? 'ARTE', glyph: lp?.t17H3Glyph ?? '03', fill: LF.black },
    { label: lp?.t17H4Label ?? 'FILMS', glyph: lp?.t17H4Glyph ?? '04', fill: LF.amber },
    { label: lp?.t17H5Label ?? 'CONTACTO', glyph: lp?.t17H5Glyph ?? 'LP', fill: LF.black },
  ];
  const circleSize = Math.round(w * 0.16);
  return (
    <Frame width={w} height={h} bg="#f0eee9">
      {/* Title */}
      <div style={{ position: 'absolute', top: 30, left: 0, right: 0, textAlign: 'center' }}>
        <TechStrip color="rgba(0,0,0,0.4)" size={9}>{lp?.brand ?? 'LIBRA PHOTOS'} · HIGHLIGHTS</TechStrip>
      </div>
      {/* Row of 5 circles */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: Math.round(w * 0.035),
      }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: circleSize, height: circleSize,
              borderRadius: '50%',
              background: item.fill,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${item.fill === LF.black ? 'transparent' : LF.black}`,
            }}>
              <span style={{
                fontFamily: LF.display,
                fontSize: Math.round(circleSize * 0.38),
                color: item.fill === LF.black ? LF.white : LF.black,
                letterSpacing: '-0.04em', lineHeight: 1,
              }}>{item.glyph}</span>
            </div>
            <TechStrip
              color="rgba(0,0,0,0.6)"
              size={7}
              style={{ textAlign: 'center', maxWidth: circleSize + 8 }}
            >{item.label}</TechStrip>
          </div>
        ))}
      </div>
      {/* Bottom brand */}
      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center' }}>
        <TechStrip color="rgba(0,0,0,0.3)" size={8}>{lp?.handle ?? '@_libraphotos'}</TechStrip>
      </div>
    </Frame>
  );
}

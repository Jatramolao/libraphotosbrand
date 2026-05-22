// Motion Graphics — Fondos animados para Libra Photos
// Cada motion tiene un concepto narrativo ligado a la fotografía editorial / pasarela.
// Pensados para reels, posts video y como fondos animados de los posts de tipografía.
//
// M01 EMBERS / RUNWAY DUST — partículas ámbar lentas, evocan luz de pasarela
// M02 SHUTTER STROBE       — flashes a corte, replican el disparo del obturador
// M03 RUNWAY WALK          — barras verticales pasando, modelo caminando frente a la cámara
// M04 TIMECODE / FILM ROLL  — timecode vivo + before/after, body de cámara en vivo
// M05 VIOLET FLICKER        — flicker tipo neón roto, momentos de quiebre (violeta)

// One-time CSS for keyframes (shared across motion templates)
if (typeof document !== 'undefined' && !document.getElementById('lp-motion-css')) {
  const s = document.createElement('style');
  s.id = 'lp-motion-css';
  s.textContent = `
    /* Embers — slow upward drift with horizontal sway */
    @keyframes lpEmberRise {
      0%   { transform: translate3d(0, 100%, 0) scale(0.6); opacity: 0; }
      8%   { opacity: 0.9; }
      85%  { opacity: 0.9; }
      100% { transform: translate3d(var(--lp-drift, 12px), -10%, 0) scale(1); opacity: 0; }
    }
    @keyframes lpEmberPulse {
      0%, 100% { opacity: 0.7; }
      50%      { opacity: 1; }
    }
    /* Shutter — hard cuts using steps() timing */
    @keyframes lpShutter {
      0%, 100% { background: #000; }
      4%       { background: #fff; }
      6%       { background: #000; }
      10%      { background: #F7A810; }
      13%      { background: #000; }
      48%      { background: #fff; }
      50%      { background: #000; }
    }
    /* Grain — high ISO simulated via animated background-position */
    @keyframes lpGrain {
      0%   { background-position: 0 0; }
      20%  { background-position: -7px 11px; }
      40%  { background-position: 13px -5px; }
      60%  { background-position: -3px -9px; }
      80%  { background-position: 9px 7px; }
      100% { background-position: 0 0; }
    }
    /* Runway walk — horizontal scroll of vertical bars */
    @keyframes lpRunwayScroll {
      from { transform: translate3d(0, 0, 0); }
      to   { transform: translate3d(-50%, 0, 0); }
    }
    /* Scan line — vertical sweep */
    @keyframes lpScan {
      0%   { transform: translateY(-12%); }
      100% { transform: translateY(110%); }
    }
    /* Violet flicker — broken neon */
    @keyframes lpFlicker {
      0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
      20%, 24%, 55% { opacity: 0.35; }
      22%           { opacity: 0.7; }
    }
    /* Type cut — hard cycle for typography */
    @keyframes lpTypeCut {
      0%, 49%   { opacity: 1; transform: translate3d(0,0,0); }
      50%, 100% { opacity: 0; transform: translate3d(-100%,0,0); }
    }
    @keyframes lpTypeCutB {
      0%, 49%   { opacity: 0; transform: translate3d(100%,0,0); }
      50%, 100% { opacity: 1; transform: translate3d(0,0,0); }
    }
    /* Tiny LIVE pulse */
    @keyframes lpLivePulse {
      0%, 100% { opacity: 1; }
      50%      { opacity: 0.25; }
    }
  `;
  document.head.appendChild(s);
}

// Reusable "MOTION" badge for stamping motion previews
function MotionBadge({ label = "MOTION · LOOP", color = LF.amber }) {
  return (
    <div style={{
      position: 'absolute', top: 12, left: 12, zIndex: 10,
      background: 'rgba(0,0,0,0.7)', padding: '4px 8px',
      display: 'flex', alignItems: 'center', gap: 6,
      fontFamily: LF.mono, fontSize: 9, letterSpacing: '0.22em',
      color: LF.white, fontWeight: 700
    }}>
      <span style={{
        width: 7, height: 7, background: color, display: 'inline-block',
        animation: 'lpLivePulse 1.4s steps(2,end) infinite'
      }} />
      {label}
    </div>);

}

// ─── M01 · EMBERS / RUNWAY DUST (1:1) ───────────────────────────────────────
// Partículas ámbar y violetas drifteando lento — evoca polvo iluminado bajo
// los focos de pasarela. Concepto: "el aire que respiras antes de un desfile".
function T_M01_Embers({ w = 540, h = 540 }) {
  const lp = useLP();
  // Pre-compute particle positions so they don't reshuffle each render
  const particles = React.useMemo(() => {
    const rng = ((seed) => () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    })(7);
    return Array.from({ length: 56 }).map((_, i) => {
      const r = rng();
      const isViolet = r > 0.92;
      const isWhite = r > 0.82 && r <= 0.92;
      const size = 1 + rng() * (isViolet ? 4 : 3);
      return {
        left: rng() * 100,
        size,
        delay: -rng() * 14,
        duration: 9 + rng() * 12,
        drift: (rng() - 0.5) * 60,
        color: isViolet ? LF.violet : isWhite ? LF.white : LF.amber,
        opacity: isViolet ? 0.7 : 0.85
      };
    });
  }, []);

  return (
    <Frame width={w} height={h} bg={LF.black}>
      <MotionBadge label="M01 · EMBERS" />

      {/* radial center glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 60%, rgba(247,168,16,0.18), transparent 65%)'
      }} />

      {/* particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {particles.map((p, i) =>
        <span key={i} style={{
          position: 'absolute', bottom: 0,
          left: `${p.left}%`,
          width: p.size, height: p.size,
          background: p.color, opacity: p.opacity,
          '--lp-drift': `${p.drift}px`,
          animation: `lpEmberRise ${p.duration}s linear ${p.delay}s infinite, lpEmberPulse ${2 + i % 4}s ease-in-out infinite`,
          boxShadow: p.color === LF.amber ? `0 0 6px ${LF.amber}80` : 'none'
        }} />
        )}
      </div>

      {/* corner grid marks */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${LF.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
        backgroundSize: '80px 80px', opacity: 0.2
      }} />

      {/* Type overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 28px'
      }}>
        <TechStrip size={10} color={LF.amber}>BAJO LAS LUCES · 22:14</TechStrip>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 88, lineHeight: 0.84,
          letterSpacing: '-0.06em', textTransform: 'uppercase',
          marginTop: 12,
          textShadow: '0 2px 12px rgba(0,0,0,0.65)'
        }}>{lpLines(lp.motion01Title)}</div>
        <div style={{
          fontFamily: LF.mono, fontSize: 10, color: LF.white,
          letterSpacing: '0.22em', marginTop: 16, opacity: 0.75
        }}>{lp.motion01Sub}</div>
      </div>

      {/* bottom mark */}
      <div style={{
        position: 'absolute', bottom: 14, left: 22, right: 22,
        display: 'flex', justifyContent: 'space-between'
      }}>
        <TechStrip size={9} color={LF.amber}>{lp.handle.toUpperCase()}</TechStrip>
        <LFMark size={14} color={LF.amber} />
      </div>
    </Frame>);

}

// ─── M02 · SHUTTER STROBE (1:1) ─────────────────────────────────────────────
// Flashes a corte que replican el disparo del obturador (1/500). Sin desvanecimientos.
// Concepto: el sonido seco del obturador, momento congelado.
function T_M02_Shutter({ w = 540, h = 540 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <MotionBadge label="M02 · SHUTTER 1/300" />

      {/* flashing background layer with steps timing */}
      <div style={{
        position: 'absolute', inset: 0,
        animation: 'lpShutter 4.5s steps(1, end) infinite',
        background: '#000'
      }} />

      {/* grain layer */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
          radial-gradient(rgba(0,0,0,0.22) 1px, transparent 1.5px)
        `,
        backgroundSize: '3px 3px, 4px 4px',
        animation: 'lpGrain 0.6s steps(8) infinite',
        mixBlendMode: 'overlay',
        opacity: 0.6
      }} />

      {/* dark vignette so type stays legible across flashes */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)'
      }} />

      {/* Type overlay — kept stable while bg flashes */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 28px', mixBlendMode: 'difference'
      }}>
        <TechStrip size={10} color={LF.white}>1/300 · ƒ/2.8 · ISO 6400</TechStrip>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          lineHeight: 0.84,
          letterSpacing: '-0.06em', textTransform: 'uppercase',
          marginTop: 12, fontSize: "108px"
        }}>{lpLines(lp.motion02Title)}</div>
      </div>

      {/* counter top right */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        background: LF.amber, color: LF.black, padding: '4px 8px',
        fontFamily: LF.mono, fontSize: 11, letterSpacing: '0.18em', fontWeight: 700
      }}>FRAME 0210</div>

      {/* bottom strip */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '10px 22px',
        background: LF.black, borderTop: `1px solid ${LF.amber}`,
        display: 'flex', justifyContent: 'space-between'
      }}>
        <TechStrip size={9} color={LF.amber}>M02 · HIGH ISO</TechStrip>
        <TechStrip size={9} color={LF.white}>LIBRA PHOTOS</TechStrip>
      </div>
    </Frame>);

}

// ─── M03 · RUNWAY WALK (1:1) ────────────────────────────────────────────────
// Barras verticales pasando lateralmente: la modelo caminando frente a la cámara.
// Las pausas son intencionales — algunas barras son más anchas (un cuerpo más cercano).
function T_M03_RunwayWalk({ w = 540, h = 540 }) {
  const lp = useLP();
  // Generate a repeating bar pattern programmatically (doubled so we can loop -50%)
  const bars = [];
  const rng = ((seed) => () => {seed = (seed * 9301 + 49297) % 233280;return seed / 233280;})(11);
  let x = 0;
  while (x < 200) {
    const isAmber = rng() > 0.85;
    const isWide = rng() > 0.9;
    const barW = isWide ? 14 + rng() * 28 : 1 + rng() * 4;
    const gap = 8 + rng() * 30;
    bars.push({ x, w: barW, amber: isAmber });
    x += barW + gap;
  }

  return (
    <Frame width={w} height={h} bg={LF.black}>
      <MotionBadge label="M03 · RUNWAY WALK" />

      {/* moving bar layer */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0,
        width: '200%', display: 'flex',
        animation: 'lpRunwayScroll 24s linear infinite'
      }}>
        {bars.map((b, i) =>
        <span key={i} style={{
          position: 'absolute', top: 0, bottom: 0,
          left: `${b.x}%`,
          width: b.w,
          background: b.amber ? LF.amber : 'rgba(255,255,255,0.85)',
          opacity: b.amber ? 0.85 : b.w > 10 ? 0.5 : 0.35
        }} />
        )}
      </div>

      {/* dark overlay so type reads */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.8) 100%)'
      }} />

      {/* Type overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 28px'
      }}>
        <TechStrip size={10} color={LF.amber}>INSTANTE EN PASARELA</TechStrip>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 96, lineHeight: 0.82,
          letterSpacing: '-0.06em', textTransform: 'uppercase',
          marginTop: 12, textShadow: '0 4px 14px rgba(0,0,0,0.7)'
        }}>{lpLines(lp.motion03Title)}</div>
      </div>

      {/* top + bottom rails */}
      <div style={{ position: 'absolute', top: 60, left: 0, right: 0, height: 1, background: LF.amber, opacity: 0.7 }} />
      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, height: 1, background: LF.amber, opacity: 0.7 }} />

      {/* bottom strip */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '10px 22px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: LF.black
      }}>
        <TechStrip size={9} color={LF.amber}>M03 ·HIGH ISO</TechStrip>
        <LFMark size={14} color={LF.amber} />
      </div>
    </Frame>);

}

// ─── M04 · TIMECODE / FILM ROLL (1:1) ───────────────────────────────────────
// Timecode HH:MM:SS:FF vivo + before/after lateral animado. Body de cámara en vivo.
function T_M04_Timecode({ w = 540, h = 540 }) {
  const [tc, setTc] = React.useState({ h: 22, m: 14, s: 0, f: 0 });
  React.useEffect(() => {
    let mounted = true;
    let frame = 0;
    const id = setInterval(() => {
      if (!mounted) return;
      frame = (frame + 1) % 24;
      setTc((prev) => {
        let { h, m, s, f } = prev;
        f = frame;
        if (f === 0) {
          s += 1;
          if (s >= 60) {s = 0;m += 1;}
          if (m >= 60) {m = 0;h = (h + 1) % 24;}
        }
        return { h, m, s, f };
      });
    }, 1000 / 24);
    return () => {mounted = false;clearInterval(id);};
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <Frame width={w} height={h} bg={LF.black}>
      <MotionBadge label="M04 · TIMECODE" />

      {/* faint grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${LF.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${LF.gridLine} 1px, transparent 1px)`,
        backgroundSize: '40px 40px', opacity: 0.3
      }} />

      {/* top status bar */}
      <div style={{
        position: 'absolute', top: 38, left: 22, right: 22,
        borderTop: `1px solid ${LF.amber}`, borderBottom: `1px solid ${LF.amber}`,
        padding: '10px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: LF.mono, fontSize: 11, letterSpacing: '0.18em',
        color: LF.amber, textTransform: 'uppercase'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 8, height: 8, background: LF.amber, display: 'inline-block',
            animation: 'lpLivePulse 1.2s steps(2) infinite'
          }} />
          REC · ROLL 14
        </span>
        <span>TAKE 03</span>
      </div>

      {/* MASSIVE timecode */}
      <div style={{
        position: 'absolute', top: 100, left: 22, right: 22,
        fontFamily: LF.display, color: LF.amber,
        fontSize: 96, lineHeight: 0.9, letterSpacing: '-0.05em',
        fontVariantNumeric: 'tabular-nums',
        textAlign: 'center'
      }}>
        {pad(tc.h)}:{pad(tc.m)}
      </div>
      <div style={{
        position: 'absolute', top: 200, left: 22, right: 22,
        fontFamily: LF.display, color: LF.white,
        fontSize: 56, lineHeight: 0.9, letterSpacing: '-0.05em',
        fontVariantNumeric: 'tabular-nums',
        textAlign: 'center'
      }}>
        {pad(tc.s)}<span style={{ color: LF.amber }}>:</span>{pad(tc.f)}<span style={{ color: LF.amber, fontFamily: LF.mono, fontSize: 18, marginLeft: 8, letterSpacing: 0 }}>FPS</span>
      </div>

      {/* photo strip — three frames simulating film roll */}
      <div style={{
        position: 'absolute', left: 22, right: 22, top: 290, height: 150,
        display: 'flex', gap: 6
      }}>
        {[0, 1, 2].map((i) =>
        <div key={i} style={{
          flex: 1, position: 'relative',
          border: i === 1 ? `2px solid ${LF.amber}` : `1px solid rgba(255,255,255,0.25)`
        }}>
            <PhotoSlot id={`m04-photo-${i}`} placeholder={`F${i + 1}`} tone="dark" />
            <div style={{
            position: 'absolute', top: 3, left: 3,
            fontFamily: LF.mono, fontSize: 8, color: LF.white,
            background: 'rgba(0,0,0,0.7)', padding: '1px 4px', letterSpacing: '0.14em'
          }}>{String((tc.s * 24 + tc.f - 2 + i + 9999) % 999).padStart(3, '0')}</div>
            {i === 1 &&
          <div style={{
            position: 'absolute', bottom: 3, right: 3,
            fontFamily: LF.mono, fontSize: 7, color: LF.black,
            background: LF.amber, padding: '1px 4px', letterSpacing: '0.16em', fontWeight: 700
          }}>SELECT</div>
          }
          </div>
        )}
      </div>

      {/* bottom strip */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '10px 22px',
        display: 'flex', justifyContent: 'space-between',
        borderTop: `1px solid ${LF.amber}`
      }}>
        <TechStrip size={9} color={LF.amber}>M04 · TIMECODE 24 FPS</TechStrip>
        <TechStrip size={9} color={LF.white}>SONY α7 IV · CL</TechStrip>
      </div>
    </Frame>);

}

// ─── M05 · VIOLET FLICKER (4:5) ─────────────────────────────────────────────
// Flicker tipo neón roto para los momentos de quiebre. Violeta = colección especial.
function T_M05_VioletFlicker({ w = 540, h = 675 }) {
  const lp = useLP();
  return (
    <Frame width={w} height={h} bg={LF.black}>
      <MotionBadge label="M05 · VIOLET FLICKER" />

      {/* Violet bg with flicker */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 40%, ${LF.violet} 0%, #2a0050 70%, #100020 100%)`,
        animation: 'lpFlicker 3.5s steps(1, end) infinite'
      }} />

      {/* horizontal scan lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px)`,
        opacity: 0.6
      }} />

      {/* sweeping scan bar */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 80,
        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06) 50%, transparent)',
        animation: 'lpScan 7s linear infinite'
      }} />

      {/* grain */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)`,
        backgroundSize: '3px 3px',
        animation: 'lpGrain 0.8s steps(6) infinite',
        opacity: 0.7
      }} />

      {/* Vertical text caption */}
      <div style={{
        position: 'absolute', left: 18, top: 60, bottom: 60,
        writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        fontFamily: LF.mono, fontSize: 10, color: LF.white,
        letterSpacing: '0.32em', textTransform: 'uppercase', opacity: 0.85
      }}>VOL · SPECIAL · ART COLLECTION · 002 — {lp.brand}</div>

      {/* Massive title */}
      <div style={{
        position: 'absolute', left: 50, right: 22, bottom: 90
      }}>
        <TechStrip size={10} color={LF.amber}>EDICIÓN ÚNICA / DISRUPTIVA</TechStrip>
        <div style={{
          fontFamily: LF.display, color: LF.white,
          fontSize: 96, lineHeight: 0.82, letterSpacing: '-0.06em',
          textTransform: 'uppercase', marginTop: 10,
          textShadow: `0 0 20px ${LF.violet}, 0 0 40px rgba(75,0,130,0.6)`,
          animation: 'lpFlicker 3.5s steps(1, end) infinite'
        }}>{lpLines(lp.noirTitle)}</div>
      </div>

      {/* corner LP */}
      <LFMark size={20} color={LF.amber}
      style={{ position: 'absolute', top: 18, right: 22 }} />

      {/* bottom strip */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '12px 22px',
        background: 'rgba(0,0,0,0.55)',
        display: 'flex', justifyContent: 'space-between',
        borderTop: `1px solid ${LF.amber}`
      }}>
        <TechStrip size={9} color={LF.amber}>M05 · VIOLET FLICKER</TechStrip>
        <TechStrip size={9} color={LF.white}>LOOP 3.5s · NEÓN ROTO</TechStrip>
      </div>
    </Frame>);

}

Object.assign(window, {
  T_M01_Embers, T_M02_Shutter, T_M03_RunwayWalk, T_M04_Timecode, T_M05_VioletFlicker,
  MotionBadge
});
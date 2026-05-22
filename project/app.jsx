// App entrypoint — Libra Photos IG templates canvas
// - Provee tokens de contenido editables vía LPContent.Provider
// - Expone un panel de Tweaks con secciones colapsables por plantilla
//   que controla TODO el texto visible en los diseños.

const FEED_W = 540, FEED_H = 675;   // 4:5 portrait, scaled from 1080×1350
const SQ = 540;                      // 1:1 square, scaled from 1080×1080
const STORY_W = 405, STORY_H = 720;  // 9:16 story, scaled from 1080×1920

// Editmode-persistable defaults. The Tweaks panel can rewrite this block on
// disk so changes survive reload.
//
// IMPORTANT: estas claves deben coincidir con LP_CONTENT_DEFAULTS en
// lp-content.jsx — ese archivo provee los valores que leen las plantillas
// cuando no hay tweak activo; este block contiene los valores editables.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brand": "LIBRA PHOTOS",
  "monogram": "LP",
  "handle": "@_libraphotos",
  "site": "LIBRAPHOTOS.CL",
  "edition": "07",
  "chapter": "RUNWAY",
  "designer": "CASA ÍMPETU",
  "collection": "AVE NEGRA",
  "location": "GAM · STGO",
  "date": "14.06.26",
  "hour": "20:00 CLT",
  "countdownDays": "07",
  "quote": "NO FOTOGRAFÍO SOLO MOMENTOS.\nFOTOGRAFÍO\nACTITUD.",
  "manifestTop": "CAOS\n\nCONTRO\nLADO.",
  "manifestSub": "UN PRINCIPIO · NO UN ACCIDENTE.",
  "coverTitle": "RED\nLIGHTS",
  "coverCaption": "SS / 26 · DALMORE",
  "noirTitle": "LIBRA\nNOIR.",

  "t01TopLabel": "EVENTO",
  "t01TechMeta": "200MM · Ƒ/2.8 · ISO 3200 · 1/200",
  "t01Cta": "SCROLL ▸",

  "t02FileLabel": "FILE",
  "t02FileValue": "DSC07591",
  "t02CamLabel": "CAM",
  "t02CamValue": "SONY α7 IV · 70-200 G",
  "t02ExpLabel": "EXPOSURE",
  "t02ExpValue": "ƒ/2.8 · 1/200 · ISO 3200",
  "t02LocLabel": "LOCATION",
  "t02LocValue": "SANTIAGO · CL · 23:42",

  "t03VertLabel": "VOL · SPECIAL · ART COLLECTION · 002 — LIBRA PHOTOS",
  "t03Stamp": "EDICIÓN ÚNICA / DISRUPTIVA",

  "t04TopLabel": "CREDITS · ED.07 / 03",
  "t04Title": "CRE\nDITS",
  "t04DirectionLabel": "DIRECTION",
  "t04StylingLabel": "STYLING",
  "t04StylingValue": "M. SOTO",
  "t04MakeUpLabel": "MAKE UP",
  "t04MakeUpValue": "C. NAVARRO",
  "t04ModelLabel": "MODEL",
  "t04ModelValue": "V. AGUIRRE @ ELITE",
  "t04Copyright": "© LIBRA PHOTOS · MMXXVI",
  "t04EndTag": "END / 09",

  "t06TopLeft": "FILE / 0247",
  "t06TopRight": "ED.07 · CHAP. 02",
  "t06BottomLeft": "LIBRA PHOTOS — SS / 26",

  "t08Stamp": "FILE / 2205",
  "t08Tag": "SS26",

  "t09Status": "LIVE · 22:14",
  "t09VertLabel": "RUNWAY · CHAPTER 07",
  "t09Headline": "EN VIVO\nDESDE EL\nBACK.",
  "t09Ticker": "NOW LIVE · BACKSTAGE ED.07 · CASA ÍMPETU · SS26 · ▸ ▸ ▸ · ÚLTIMA HORA · FOTOGRAFÍA EN TIEMPO REAL · ",
  "t09Meta": "ƒ/2.0 · ISO 8000 · 1/500",
  "t09Cta": "↑ DESLIZAR",

  "t10TopLabel": "PROXIMAMENTE",
  "t10DaysCaption": "DÍAS · HASTA EL DROP",
  "t10Cta": "ACTIVAR RECORDATORIO",
  "t10MoreInfo": "↑ MÁS INFO",

  "t11Title": "NEW\nDROP.",
  "t11Cta": "GUARDA LA FECHA ▸",

  "t12Stamp": "SPOTLIGHT / N°03",
  "t12SectionLabel": "DISEÑADOR FEATURED",

  "t13TopLeft": "SANTIAGO · MMXXVI",
  "t13TopRight": "POSTER / V.02",
  "t13Title": "FASHION\nWEEK\nSTGO.",
  "t13Dates": "14 — 18.06.26",
  "t13Nights": "5 NOCHES",
  "t13LineupLabel": "LINEUP / COVERAGE",
  "t13Lineup": "CASA ÍMPETU · NÓMADA\nESTUDIO V · M.SOTO\nNEÓN PROYECTO · TRES",
  "t13Footer": "COBERTURA EXCLUSIVA · LIBRA PHOTOS",

  "t14Stamp": "AGENDA / 2026",
  "t14Headline": "RESERVA\nTU\nEDITORIAL.",
  "t14S1Tag": "EDITORIAL",
  "t14S1Desc": "Campaña + lookbook",
  "t14S1Price": "DESDE $1.2M",
  "t14S2Tag": "PASARELA",
  "t14S2Desc": "Cobertura + backstage",
  "t14S2Price": "$650K / noche",
  "t14S3Tag": "CONCEPTUAL",
  "t14S3Desc": "Arte de autor",
  "t14S3Price": "A CONVENIR",
  "t14CtaTitle": "BRIEFING ▸",
  "t14CtaSub": "DM ABIERTO",

  "t15Stamp": "PROCESO · ANTES / DESPUÉS",
  "t15RawTag": "RAW",
  "t15RawSub": "SIN PRESET",
  "t15FinalTag": "FINAL",
  "t15FinalSub": "PRESET · LP.01",

  "t16ReelTag": "▶ REEL",
  "t16Duration": "00:24",
  "t16Episode": "EP.07",
  "t16Tag": "BACKSTAGE FILM",
  "t16Title": "3 MINUTOS\nEN EL\nBACK.",
  "t16Footer": "@_LIBRAPHOTOS · ED.07",
  "t16Cta": "VER REEL ▸",

  "t17H1Label": "RUNWAY",   "t17H1Glyph": "01",
  "t17H2Label": "BACKSTAGE","t17H2Glyph": "02",
  "t17H3Label": "ARTE",     "t17H3Glyph": "03",
  "t17H4Label": "FILMS",    "t17H4Glyph": "04",
  "t17H5Label": "CONTACTO", "t17H5Glyph": "LP",

  "motion01Title": "EL AIRE\nQUE\nRESPIRA.",
  "motion01Sub": "BACKSTAGE · ANTES DEL PRIMER PASO",
  "motion01TopLabel": "BAJO LAS LUCES · 22:14",
  "motion02Title": "UN\nSEGUNDO.\nUN GESTO.",
  "motion02TopMeta": "1/500 · ƒ/2.0 · ISO 6400",
  "motion02Frame": "FRAME 0247",
  "motion03Title": "EL PASO\nNO SE\nREPITE.",
  "motion03TopLabel": "PASARELA · LIVE FEED",
  "motion05Stamp": "EDICIÓN ÚNICA / DISRUPTIVA",
  "motion05VertLabel": "VOL · SPECIAL · ART COLLECTION · 002 — LIBRA PHOTOS"
}/*EDITMODE-END*/;

function CanvasIntro() {
  return (
    <div style={{
      width: 980, padding: '24px 32px',
      background: '#000',
      color: '#fff',
      fontFamily: '"IBM Plex Mono", monospace',
      marginBottom: 24,
      borderTop: '2px solid #F7A810',
      borderBottom: '2px solid #F7A810',
    }}>
      <div style={{
        fontFamily: '"Archivo Black", sans-serif',
        fontSize: 64, lineHeight: 0.86, letterSpacing: '-0.05em',
        textTransform: 'uppercase',
      }}>
        LIBRA PHOTOS<br/>
        <span style={{ color: '#F7A810' }}>/ SISTEMA IG.</span>
      </div>
      <div style={{
        marginTop: 18,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24,
        fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        <div>
          <div style={{ color: '#F7A810' }}>SISTEMA</div>
          <div style={{ marginTop: 6, lineHeight: 1.55, textTransform: 'none', letterSpacing: '0.04em' }}>Brutalismo elegante. 17 plantillas + 5 motion graphics que comparten ADN: negro absoluto, ámbar #F7A810, IBM Plex Mono, Archivo Black. border-radius: 0 en todo.</div>
        </div>
        <div>
          <div style={{ color: '#F7A810' }}>CÓMO EDITAR TEXTO</div>
          <div style={{ marginTop: 6, lineHeight: 1.55, textTransform: 'none', letterSpacing: '0.04em' }}>Abre el panel <b style={{color:'#F7A810'}}>TWEAKS</b> (abajo a la derecha). Está organizado en secciones colapsables: <b>MARCA · EDICIÓN · COPY</b> compartido, y luego una sección por cada plantilla con todos sus textos editables.</div>
        </div>
        <div>
          <div style={{ color: '#F7A810' }}>FOTOS</div>
          <div style={{ marginTop: 6, lineHeight: 1.55, textTransform: 'none', letterSpacing: '0.04em' }}>Arrastra tu imagen sobre cualquier slot — queda persistida. Los motion graphics son loops en CSS: grabálos con QuickTime / OBS para subir como reel.</div>
        </div>
      </div>
    </div>
  );
}

function CanvasBody() {
  return (
    <DesignCanvas>
      <CanvasIntro />

      <DCSection
        id="feed-portrait"
        title="FEED · POSTS VERTICALES 4:5"
        subtitle="1080 × 1350 — formato preferido para visibilidad en feed">
        <DCArtboard id="t01" label="01 · EDITORIAL COVER" width={FEED_W} height={FEED_H}>
          <T_EditorialCover w={FEED_W} h={FEED_H} />
        </DCArtboard>
        <DCArtboard id="t02" label="02 · METADATA CARD" width={FEED_W} height={FEED_H}>
          <T_MetadataCard w={FEED_W} h={FEED_H} />
        </DCArtboard>
        <DCArtboard id="t03" label="03 · VIOLET DROP" width={FEED_W} height={FEED_H}>
          <T_VioletDrop w={FEED_W} h={FEED_H} />
        </DCArtboard>
        <DCArtboard id="t04" label="04 · CREDITS SLATE" width={FEED_W} height={FEED_H}>
          <T_CreditsSlate w={FEED_W} h={FEED_H} />
        </DCArtboard>
        <DCArtboard id="t06-portrait" label="06 · TYPE POSTER · 4:5" width={FEED_W} height={FEED_H}>
          <T_TypePoster w={FEED_W} h={FEED_H} />
        </DCArtboard>
        <DCArtboard id="t08-portrait" label="08 · QUOTE PULL · 4:5" width={FEED_W} height={FEED_H}>
          <T_QuotePull w={FEED_W} h={FEED_H} />
        </DCArtboard>
        <DCArtboard id="t11" label="11 · DROP / TEASER" width={FEED_W} height={FEED_H}>
          <T_DropTeaser w={FEED_W} h={FEED_H} />
        </DCArtboard>
        <DCArtboard id="t12" label="12 · DESIGNER SPOTLIGHT" width={FEED_W} height={FEED_H}>
          <T_DesignerSpotlight w={FEED_W} h={FEED_H} />
        </DCArtboard>
        <DCArtboard id="t13" label="13 · EVENT POSTER" width={FEED_W} height={FEED_H}>
          <T_EventPoster w={FEED_W} h={FEED_H} />
        </DCArtboard>
        <DCArtboard id="t14" label="14 · BOOKING / SERVICIOS" width={FEED_W} height={FEED_H}>
          <T_Booking w={FEED_W} h={FEED_H} />
        </DCArtboard>
        <DCArtboard id="t15-portrait" label="15 · BEFORE / AFTER · 4:5" width={FEED_W} height={FEED_H}>
          <T_BeforeAfter w={FEED_W} h={FEED_H} />
        </DCArtboard>
      </DCSection>

      <DCSection
        id="square"
        title="CARRUSEL · NOTAS Y MANIFIESTO 1:1"
        subtitle="1080 × 1080 — bloques tipográficos y pull-quotes para tus pensamientos y notas">
        <DCArtboard id="t06" label="06 · TYPE POSTER" width={SQ} height={SQ}>
          <T_TypePoster w={SQ} h={SQ} />
        </DCArtboard>
        <DCArtboard id="t08" label="08 · QUOTE PULL" width={SQ} height={SQ}>
          <T_QuotePull w={SQ} h={SQ} />
        </DCArtboard>
        <DCArtboard id="t15" label="15 · BEFORE / AFTER" width={SQ} height={SQ}>
          <T_BeforeAfter w={SQ} h={SQ} />
        </DCArtboard>
      </DCSection>

      <DCSection
        id="stories"
        title="STORIES & REELS 9:16"
        subtitle="1080 × 1920 — formato vertical para Reels, Stories y video corto">
        <DCArtboard id="t09" label="09 · STORY · TICKER LIVE" width={STORY_W} height={STORY_H}>
          <T_StoryTicker w={STORY_W} h={STORY_H} />
        </DCArtboard>
        <DCArtboard id="t10" label="10 · STORY · COUNTDOWN" width={STORY_W} height={STORY_H}>
          <T_StoryType w={STORY_W} h={STORY_H} />
        </DCArtboard>
        <DCArtboard id="t16" label="16 · REEL COVER" width={STORY_W} height={STORY_H}>
          <T_ReelCover w={STORY_W} h={STORY_H} />
        </DCArtboard>
      </DCSection>

      <DCSection
        id="profile"
        title="PERFIL · DESTACADAS"
        subtitle="Íconos circulares para los highlights del perfil — dialogan con el feed sin competir">
        <DCArtboard id="t17" label="17 · HIGHLIGHT COVERS" width={920} height={240}>
          <T_HighlightSet w={920} h={240} />
        </DCArtboard>
      </DCSection>

      <DCSection
        id="motion"
        title="MOTION GRAPHICS · FONDOS ANIMADOS"
        subtitle="Loops conceptuales para reels, posts video y fondo de tipografías — cada motion tiene un motivo narrativo ligado a tu fotografía">
        <DCArtboard id="m01" label="M01 · EMBERS / DUST" width={SQ} height={SQ}>
          <T_M01_Embers w={SQ} h={SQ} />
        </DCArtboard>
        <DCArtboard id="m02" label="M02 · SHUTTER STROBE" width={SQ} height={SQ}>
          <T_M02_Shutter w={SQ} h={SQ} />
        </DCArtboard>
        <DCArtboard id="m03" label="M03 · RUNWAY WALK" width={SQ} height={SQ}>
          <T_M03_RunwayWalk w={SQ} h={SQ} />
        </DCArtboard>
        <DCArtboard id="m04" label="M04 · TIMECODE LIVE" width={SQ} height={SQ}>
          <T_M04_Timecode w={SQ} h={SQ} />
        </DCArtboard>
        <DCArtboard id="m05" label="M05 · VIOLET FLICKER" width={FEED_W} height={FEED_H}>
          <T_M05_VioletFlicker w={FEED_W} h={FEED_H} />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

// ─── Helpers de UI para el panel ────────────────────────────────────────────

// Multiline text editor — used for any field that benefits from \n
function TweakMultiline({ label, value, onChange, rows = 3 }) {
  return (
    <TweakRow label={label}>
      <textarea
        className="twk-field"
        style={{
          minHeight: rows * 20, padding: '6px 8px',
          font: 'inherit', lineHeight: 1.35, resize: 'vertical',
        }}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
      />
    </TweakRow>
  );
}

// Collapsible group inside the Tweaks panel — one per template.
// We collapse by default so the panel is navigable; click a header to expand.
function TweakGroup({ label, hint, defaultOpen = false, children }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{
      borderTop: '0.5px solid rgba(0,0,0,0.08)',
      paddingTop: 8, marginTop: 2,
    }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          all: 'unset',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', boxSizing: 'border-box',
          padding: '4px 6px',
          background: open ? 'rgba(247,168,16,0.14)' : 'rgba(0,0,0,0.03)',
          borderRadius: 6,
          fontSize: 10.5, fontWeight: 600, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'rgba(41,38,27,0.82)',
          cursor: 'default',
        }}
      >
        <span>{label}</span>
        <span style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 12, opacity: 0.55, marginLeft: 8,
        }}>{open ? '−' : '+'}</span>
      </button>
      {hint && open && (
        <div style={{
          fontSize: 10, color: 'rgba(41,38,27,0.5)',
          padding: '6px 6px 0', lineHeight: 1.45,
        }}>{hint}</div>
      )}
      {open && (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10,
          padding: '10px 0 6px',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

function LPTweaksPanel({ t, setTweak }) {
  const TM = TweakMultiline; // alias, shorter
  return (
    <TweaksPanel title="TWEAKS · LIBRA PHOTOS">

      {/* ─── GLOBALES ─────────────────────────────────────────── */}
      <TweakGroup label="Marca" defaultOpen>
        <TweakText label="Brand"     value={t.brand}    onChange={v => setTweak('brand', v)} />
        <TweakText label="Monograma" value={t.monogram} onChange={v => setTweak('monogram', v)} />
        <TweakText label="@ handle"  value={t.handle}   onChange={v => setTweak('handle', v)} />
        <TweakText label="Sitio"     value={t.site}     onChange={v => setTweak('site', v)} />
      </TweakGroup>

      <TweakGroup label="Edición actual">
        <TweakText label="Edición #"      value={t.edition}       onChange={v => setTweak('edition', v)} />
        <TweakText label="Chapter"        value={t.chapter}       onChange={v => setTweak('chapter', v)} />
        <TweakText label="Diseñador"      value={t.designer}      onChange={v => setTweak('designer', v)} />
        <TweakText label="Colección"      value={t.collection}    onChange={v => setTweak('collection', v)} />
        <TweakText label="Locación"       value={t.location}      onChange={v => setTweak('location', v)} />
        <TweakText label="Fecha"          value={t.date}          onChange={v => setTweak('date', v)} />
        <TweakText label="Hora"           value={t.hour}          onChange={v => setTweak('hour', v)} />
        <TweakText label="Countdown días" value={t.countdownDays} onChange={v => setTweak('countdownDays', v)} />
      </TweakGroup>

      <TweakGroup label="Copy editorial (compartido)" hint="Estos textos se usan en múltiples plantillas (cover, manifiesto, quote, etc.)">
        <TM label="Cover · título"     value={t.coverTitle}   onChange={v => setTweak('coverTitle', v)} />
        <TweakText label="Cover · caption" value={t.coverCaption} onChange={v => setTweak('coverCaption', v)} />
        <TM label="Quote / frase"      value={t.quote}        onChange={v => setTweak('quote', v)} rows={4} />
        <TM label="Manifiesto · titular" value={t.manifestTop}  onChange={v => setTweak('manifestTop', v)} />
        <TweakText label="Manifiesto · sub" value={t.manifestSub} onChange={v => setTweak('manifestSub', v)} />
        <TM label="Noir · título (T03/M05)" value={t.noirTitle} onChange={v => setTweak('noirTitle', v)} />
      </TweakGroup>

      {/* ─── POR PLANTILLA ─────────────────────────────────────── */}
      <TweakGroup label="T01 · Editorial Cover">
        <TweakText label="Top label"      value={t.t01TopLabel} onChange={v => setTweak('t01TopLabel', v)} />
        <TweakText label="Tech meta"      value={t.t01TechMeta} onChange={v => setTweak('t01TechMeta', v)} />
        <TweakText label="CTA inferior"   value={t.t01Cta}      onChange={v => setTweak('t01Cta', v)} />
      </TweakGroup>

      <TweakGroup label="T02 · Metadata Card">
        <TweakText label="Label 1"  value={t.t02FileLabel} onChange={v => setTweak('t02FileLabel', v)} />
        <TweakText label="Valor 1"  value={t.t02FileValue} onChange={v => setTweak('t02FileValue', v)} />
        <TweakText label="Label 2"  value={t.t02CamLabel}  onChange={v => setTweak('t02CamLabel', v)} />
        <TweakText label="Valor 2"  value={t.t02CamValue}  onChange={v => setTweak('t02CamValue', v)} />
        <TweakText label="Label 3"  value={t.t02ExpLabel}  onChange={v => setTweak('t02ExpLabel', v)} />
        <TweakText label="Valor 3"  value={t.t02ExpValue}  onChange={v => setTweak('t02ExpValue', v)} />
        <TweakText label="Label 4"  value={t.t02LocLabel}  onChange={v => setTweak('t02LocLabel', v)} />
        <TweakText label="Valor 4"  value={t.t02LocValue}  onChange={v => setTweak('t02LocValue', v)} />
      </TweakGroup>

      <TweakGroup label="T03 · Violet Drop">
        <TweakText label="Label vertical" value={t.t03VertLabel} onChange={v => setTweak('t03VertLabel', v)} />
        <TweakText label="Stamp inferior" value={t.t03Stamp}     onChange={v => setTweak('t03Stamp', v)} />
        <div style={{ fontSize: 10, color: 'rgba(41,38,27,0.5)' }}>
          Título grande se controla con <b>Noir · título</b> en Copy editorial.
        </div>
      </TweakGroup>

      <TweakGroup label="T04 · Credits Slate">
        <TweakText label="Top label"      value={t.t04TopLabel} onChange={v => setTweak('t04TopLabel', v)} />
        <TM        label="Título"         value={t.t04Title}    onChange={v => setTweak('t04Title', v)} />
        <TweakText label="Direction · etiqueta" value={t.t04DirectionLabel} onChange={v => setTweak('t04DirectionLabel', v)} />
        <TweakText label="Styling · etiqueta" value={t.t04StylingLabel} onChange={v => setTweak('t04StylingLabel', v)} />
        <TweakText label="Styling · valor"    value={t.t04StylingValue} onChange={v => setTweak('t04StylingValue', v)} />
        <TweakText label="Make Up · etiqueta" value={t.t04MakeUpLabel}  onChange={v => setTweak('t04MakeUpLabel', v)} />
        <TweakText label="Make Up · valor"    value={t.t04MakeUpValue}  onChange={v => setTweak('t04MakeUpValue', v)} />
        <TweakText label="Model · etiqueta"   value={t.t04ModelLabel}   onChange={v => setTweak('t04ModelLabel', v)} />
        <TweakText label="Model · valor"      value={t.t04ModelValue}   onChange={v => setTweak('t04ModelValue', v)} />
        <TweakText label="Copyright" value={t.t04Copyright} onChange={v => setTweak('t04Copyright', v)} />
        <TweakText label="End tag"   value={t.t04EndTag}    onChange={v => setTweak('t04EndTag', v)} />
      </TweakGroup>

      <TweakGroup label="T06 · Type Poster">
        <TweakText label="Esquina sup-izq"  value={t.t06TopLeft}    onChange={v => setTweak('t06TopLeft', v)} />
        <TweakText label="Esquina sup-der"  value={t.t06TopRight}   onChange={v => setTweak('t06TopRight', v)} />
        <TweakText label="Esquina inf-izq"  value={t.t06BottomLeft} onChange={v => setTweak('t06BottomLeft', v)} />
        <div style={{ fontSize: 10, color: 'rgba(41,38,27,0.5)' }}>
          Texto principal y subtítulo = <b>Manifiesto</b> en Copy editorial.
        </div>
      </TweakGroup>

      <TweakGroup label="T08 · Quote Pull">
        <TweakText label="Stamp" value={t.t08Stamp} onChange={v => setTweak('t08Stamp', v)} />
        <TweakText label="Tag"   value={t.t08Tag}   onChange={v => setTweak('t08Tag', v)} />
        <div style={{ fontSize: 10, color: 'rgba(41,38,27,0.5)' }}>
          La frase grande = <b>Quote</b> en Copy editorial.
        </div>
      </TweakGroup>

      <TweakGroup label="T09 · Story · Ticker Live">
        <TweakText label="Status (LIVE)"   value={t.t09Status}    onChange={v => setTweak('t09Status', v)} />
        <TweakText label="Label vertical"  value={t.t09VertLabel} onChange={v => setTweak('t09VertLabel', v)} />
        <TM        label="Headline ámbar"  value={t.t09Headline}  onChange={v => setTweak('t09Headline', v)} />
        <TM        label="Ticker (marquee)" value={t.t09Ticker}   onChange={v => setTweak('t09Ticker', v)} rows={3} />
        <TweakText label="Meta cámara"     value={t.t09Meta}      onChange={v => setTweak('t09Meta', v)} />
        <TweakText label="CTA"             value={t.t09Cta}       onChange={v => setTweak('t09Cta', v)} />
      </TweakGroup>

      <TweakGroup label="T10 · Story · Countdown">
        <TweakText label="Top label"      value={t.t10TopLabel}    onChange={v => setTweak('t10TopLabel', v)} />
        <TweakText label="Días · caption" value={t.t10DaysCaption} onChange={v => setTweak('t10DaysCaption', v)} />
        <TweakText label="CTA grande"     value={t.t10Cta}         onChange={v => setTweak('t10Cta', v)} />
        <TweakText label="CTA secundario" value={t.t10MoreInfo}    onChange={v => setTweak('t10MoreInfo', v)} />
        <div style={{ fontSize: 10, color: 'rgba(41,38,27,0.5)' }}>
          Días (número) = <b>Countdown días</b> en Edición.
        </div>
      </TweakGroup>

      <TweakGroup label="T11 · Drop / Teaser">
        <TM        label="Título grande"  value={t.t11Title} onChange={v => setTweak('t11Title', v)} />
        <TweakText label="CTA inferior"   value={t.t11Cta}   onChange={v => setTweak('t11Cta', v)} />
      </TweakGroup>

      <TweakGroup label="T12 · Designer Spotlight">
        <TweakText label="Stamp superior"   value={t.t12Stamp}        onChange={v => setTweak('t12Stamp', v)} />
        <TweakText label="Etiqueta sección" value={t.t12SectionLabel} onChange={v => setTweak('t12SectionLabel', v)} />
        <div style={{ fontSize: 10, color: 'rgba(41,38,27,0.5)' }}>
          Nombre, colección, etc. = sección <b>Edición</b>.
        </div>
      </TweakGroup>

      <TweakGroup label="T13 · Event Poster">
        <TweakText label="Esquina sup-izq"   value={t.t13TopLeft}     onChange={v => setTweak('t13TopLeft', v)} />
        <TweakText label="Esquina sup-der"   value={t.t13TopRight}    onChange={v => setTweak('t13TopRight', v)} />
        <TM        label="Título"            value={t.t13Title}       onChange={v => setTweak('t13Title', v)} />
        <TweakText label="Fechas"            value={t.t13Dates}       onChange={v => setTweak('t13Dates', v)} />
        <TweakText label="Noches / etiqueta" value={t.t13Nights}      onChange={v => setTweak('t13Nights', v)} />
        <TweakText label="Lineup · etiqueta" value={t.t13LineupLabel} onChange={v => setTweak('t13LineupLabel', v)} />
        <TM        label="Lineup"            value={t.t13Lineup}      onChange={v => setTweak('t13Lineup', v)} rows={4} />
        <TweakText label="Footer"            value={t.t13Footer}      onChange={v => setTweak('t13Footer', v)} />
      </TweakGroup>

      <TweakGroup label="T14 · Booking / Servicios">
        <TweakText label="Stamp"      value={t.t14Stamp}    onChange={v => setTweak('t14Stamp', v)} />
        <TM        label="Headline"   value={t.t14Headline} onChange={v => setTweak('t14Headline', v)} />
        <TweakText label="Servicio 1 · tag"   value={t.t14S1Tag}   onChange={v => setTweak('t14S1Tag', v)} />
        <TweakText label="Servicio 1 · desc"  value={t.t14S1Desc}  onChange={v => setTweak('t14S1Desc', v)} />
        <TweakText label="Servicio 1 · precio" value={t.t14S1Price} onChange={v => setTweak('t14S1Price', v)} />
        <TweakText label="Servicio 2 · tag"   value={t.t14S2Tag}   onChange={v => setTweak('t14S2Tag', v)} />
        <TweakText label="Servicio 2 · desc"  value={t.t14S2Desc}  onChange={v => setTweak('t14S2Desc', v)} />
        <TweakText label="Servicio 2 · precio" value={t.t14S2Price} onChange={v => setTweak('t14S2Price', v)} />
        <TweakText label="Servicio 3 · tag"   value={t.t14S3Tag}   onChange={v => setTweak('t14S3Tag', v)} />
        <TweakText label="Servicio 3 · desc"  value={t.t14S3Desc}  onChange={v => setTweak('t14S3Desc', v)} />
        <TweakText label="Servicio 3 · precio" value={t.t14S3Price} onChange={v => setTweak('t14S3Price', v)} />
        <TweakText label="CTA · título"       value={t.t14CtaTitle} onChange={v => setTweak('t14CtaTitle', v)} />
        <TweakText label="CTA · subtítulo"    value={t.t14CtaSub}   onChange={v => setTweak('t14CtaSub', v)} />
      </TweakGroup>

      <TweakGroup label="T15 · Before / After">
        <TweakText label="Stamp superior"  value={t.t15Stamp}    onChange={v => setTweak('t15Stamp', v)} />
        <TweakText label="Tag izquierda"   value={t.t15RawTag}   onChange={v => setTweak('t15RawTag', v)} />
        <TweakText label="Sub izquierda"   value={t.t15RawSub}   onChange={v => setTweak('t15RawSub', v)} />
        <TweakText label="Tag derecha"     value={t.t15FinalTag} onChange={v => setTweak('t15FinalTag', v)} />
        <TweakText label="Sub derecha"     value={t.t15FinalSub} onChange={v => setTweak('t15FinalSub', v)} />
      </TweakGroup>

      <TweakGroup label="T16 · Reel Cover">
        <TweakText label="Tag Reel"   value={t.t16ReelTag}  onChange={v => setTweak('t16ReelTag', v)} />
        <TweakText label="Duración"   value={t.t16Duration} onChange={v => setTweak('t16Duration', v)} />
        <TweakText label="Episodio"   value={t.t16Episode}  onChange={v => setTweak('t16Episode', v)} />
        <TweakText label="Etiqueta"   value={t.t16Tag}      onChange={v => setTweak('t16Tag', v)} />
        <TM        label="Título"     value={t.t16Title}    onChange={v => setTweak('t16Title', v)} />
        <TweakText label="Footer"     value={t.t16Footer}   onChange={v => setTweak('t16Footer', v)} />
        <TweakText label="CTA"        value={t.t16Cta}      onChange={v => setTweak('t16Cta', v)} />
      </TweakGroup>

      <TweakGroup label="T17 · Highlight Covers">
        <TweakText label="H1 · label" value={t.t17H1Label} onChange={v => setTweak('t17H1Label', v)} />
        <TweakText label="H1 · glyph" value={t.t17H1Glyph} onChange={v => setTweak('t17H1Glyph', v)} />
        <TweakText label="H2 · label" value={t.t17H2Label} onChange={v => setTweak('t17H2Label', v)} />
        <TweakText label="H2 · glyph" value={t.t17H2Glyph} onChange={v => setTweak('t17H2Glyph', v)} />
        <TweakText label="H3 · label" value={t.t17H3Label} onChange={v => setTweak('t17H3Label', v)} />
        <TweakText label="H3 · glyph" value={t.t17H3Glyph} onChange={v => setTweak('t17H3Glyph', v)} />
        <TweakText label="H4 · label" value={t.t17H4Label} onChange={v => setTweak('t17H4Label', v)} />
        <TweakText label="H4 · glyph" value={t.t17H4Glyph} onChange={v => setTweak('t17H4Glyph', v)} />
        <TweakText label="H5 · label" value={t.t17H5Label} onChange={v => setTweak('t17H5Label', v)} />
        <TweakText label="H5 · glyph" value={t.t17H5Glyph} onChange={v => setTweak('t17H5Glyph', v)} />
      </TweakGroup>

      <TweakGroup label="M01 · Embers / Dust">
        <TweakText label="Top label" value={t.motion01TopLabel} onChange={v => setTweak('motion01TopLabel', v)} />
        <TM        label="Título"    value={t.motion01Title}    onChange={v => setTweak('motion01Title', v)} />
        <TweakText label="Subtítulo" value={t.motion01Sub}      onChange={v => setTweak('motion01Sub', v)} />
      </TweakGroup>

      <TweakGroup label="M02 · Shutter Strobe">
        <TweakText label="Meta superior" value={t.motion02TopMeta} onChange={v => setTweak('motion02TopMeta', v)} />
        <TweakText label="Frame badge"   value={t.motion02Frame}   onChange={v => setTweak('motion02Frame', v)} />
        <TM        label="Título"        value={t.motion02Title}   onChange={v => setTweak('motion02Title', v)} />
      </TweakGroup>

      <TweakGroup label="M03 · Runway Walk">
        <TweakText label="Top label" value={t.motion03TopLabel} onChange={v => setTweak('motion03TopLabel', v)} />
        <TM        label="Título"    value={t.motion03Title}    onChange={v => setTweak('motion03Title', v)} />
      </TweakGroup>

      <TweakGroup label="M05 · Violet Flicker">
        <TweakText label="Label vertical" value={t.motion05VertLabel} onChange={v => setTweak('motion05VertLabel', v)} />
        <TweakText label="Stamp"          value={t.motion05Stamp}     onChange={v => setTweak('motion05Stamp', v)} />
        <div style={{ fontSize: 10, color: 'rgba(41,38,27,0.5)' }}>
          Título = <b>Noir · título</b> en Copy editorial.
        </div>
      </TweakGroup>

    </TweaksPanel>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <LPContent.Provider value={t}>
      <CanvasBody />
      <LPTweaksPanel t={t} setTweak={setTweak} />
      <MotionExporterButton />
    </LPContent.Provider>
  );
}

// Wait until templates.jsx + design-canvas.jsx + tweaks-panel + lp-content
// have published their exports before mounting.
(function mount() {
  if (
    !window.T_EditorialCover ||
    !window.DesignCanvas ||
    !window.T_DropTeaser ||
    !window.T_M01_Embers ||
    !window.LPContent ||
    !window.TweaksPanel ||
    !window.useTweaks ||
    !window.MotionExporterButton
  ) {
    setTimeout(mount, 30);
    return;
  }
  if (!window.__libraRoot) {
    window.__libraRoot = ReactDOM.createRoot(document.getElementById('root'));
  }
  window.__libraRoot.render(<App />);
})();

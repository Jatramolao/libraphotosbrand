// lp-content.jsx
// Sistema central de tokens de contenido para Libra Photos.
// Las plantillas leen sus textos clave desde aquí (vía React.useContext),
// y el Tweaks panel los modifica en tiempo real para todas las plantillas
// simultáneamente.
//
// Convención de claves:
//   <ámbito><Campo>   → claves cross-template (marca, edición, copy compartido)
//   t<NN><Campo>      → claves específicas de la plantilla NN
//   m<NN><Campo>      → claves específicas del motion graphic NN

const LP_CONTENT_DEFAULTS = {
  // ─── Marca ───────────────────────────────────────────────────────
  brand:      'LIBRA PHOTOS',
  monogram:   'LP',
  handle:     '@_LIBRAPHOTOS',
  site:       'LIBRAPHOTOS.CL',

  // ─── Edición / drop actual ──────────────────────────────────────
  edition:    '07',
  chapter:    'RUNWAY',
  designer:   'CASA ÍMPETU',
  collection: 'AVE NEGRA',
  location:   'GAM · STGO',
  date:       '14.06.26',
  hour:       '20:00 CLT',
  countdownDays: '07',

  // ─── Voz / copy compartido ──────────────────────────────────────
  quote:          'NO FOTOGRAFÍO ROPA. FOTOGRAFÍO ACTITUD.',
  manifestTop:    'CAOS\nCONTROLADO.',
  manifestSub:    'UN PRINCIPIO · NO UN ACCIDENTE.',
  coverTitle:     'ED.07\nRUNWAY',
  coverCaption:   'SS / 26 · BACKSTAGE COVERAGE',
  noirTitle:      'LIBRA\nNOIR.',

  // ─── T01 · EDITORIAL COVER ──────────────────────────────────────
  t01TopLabel:   'EDITORIAL',
  t01TechMeta:   '35MM · ƒ/2.8 · ISO 6400 · 1/640',
  t01Cta:        'SCROLL ▸',

  // ─── T02 · METADATA CARD ────────────────────────────────────────
  t02FileLabel:  'FILE',
  t02FileValue:  'LP_07_BCK_0247.RAW',
  t02CamLabel:   'CAM',
  t02CamValue:   'SONY α7 IV · 24-70 G',
  t02ExpLabel:   'EXPOSURE',
  t02ExpValue:   'ƒ/1.8 · 1/500 · ISO 4000',
  t02LocLabel:   'LOCATION',
  t02LocValue:   'SANTIAGO · CL · 22:14',

  // ─── T03 · VIOLET DROP ──────────────────────────────────────────
  t03VertLabel:  'VOL · SPECIAL · ART COLLECTION · 002 — LIBRA PHOTOS',
  t03Stamp:      'EDICIÓN ÚNICA / DISRUPTIVA',

  // ─── T04 · CREDITS SLATE ────────────────────────────────────────
  t04TopLabel:   'CREDITS · ED.07 / 03',
  t04Title:      'CRE\nDITS',
  t04DirectionLabel: 'DIRECTION',
  t04StylingLabel: 'STYLING',
  t04StylingValue: 'M. SOTO',
  t04MakeUpLabel: 'MAKE UP',
  t04MakeUpValue: 'C. NAVARRO',
  t04ModelLabel: 'MODEL',
  t04ModelValue: 'V. AGUIRRE @ ELITE',
  t04Copyright:  '© LIBRA PHOTOS · MMXXVI',
  t04EndTag:     'END / 09',

  // ─── T06 · TYPE POSTER ──────────────────────────────────────────
  t06TopLeft:    'FILE / 0247',
  t06TopRight:   'ED.07 · CHAP. 02',
  t06BottomLeft: 'LIBRA PHOTOS — SS / 26',

  // ─── T08 · QUOTE PULL ───────────────────────────────────────────
  t08Stamp:      'PULL · ED.07 / 05',
  t08Tag:        'SS26',

  // ─── T09 · STORY TICKER ─────────────────────────────────────────
  t09Status:     'LIVE · 22:14',
  t09VertLabel:  'RUNWAY · CHAPTER 07',
  t09Headline:   'EN VIVO\nDESDE EL\nBACK.',
  t09Ticker:     'NOW LIVE · BACKSTAGE ED.07 · CASA ÍMPETU · SS26 · ▸ ▸ ▸ · ÚLTIMA HORA · FOTOGRAFÍA EN TIEMPO REAL · ',
  t09Meta:       'ƒ/2.0 · ISO 8000 · 1/500',
  t09Cta:        '↑ DESLIZAR',

  // ─── T10 · STORY COUNTDOWN ──────────────────────────────────────
  t10TopLabel:   'PROXIMAMENTE',
  t10DaysCaption:'DÍAS · HASTA EL DROP',
  t10Cta:        'ACTIVAR RECORDATORIO',
  t10MoreInfo:   '↑ MÁS INFO',

  // ─── T11 · DROP TEASER ──────────────────────────────────────────
  t11Title:      'NEW\nDROP.',
  t11Cta:        'GUARDA LA FECHA ▸',

  // ─── T12 · DESIGNER SPOTLIGHT ───────────────────────────────────
  t12Stamp:      'SPOTLIGHT / N°03',
  t12SectionLabel: 'DISEÑADOR FEATURED',

  // ─── T13 · EVENT POSTER ─────────────────────────────────────────
  t13TopLeft:    'SANTIAGO · MMXXVI',
  t13TopRight:   'POSTER / V.02',
  t13Title:      'FASHION\nWEEK\nSTGO.',
  t13Dates:      '14 — 18.06.26',
  t13Nights:     '5 NOCHES',
  t13LineupLabel:'LINEUP / COVERAGE',
  t13Lineup:     'CASA ÍMPETU · NÓMADA\nESTUDIO V · M.SOTO\nNEÓN PROYECTO · TRES',
  t13Footer:     'COBERTURA EXCLUSIVA · LIBRA PHOTOS',

  // ─── T14 · BOOKING / SERVICIOS ──────────────────────────────────
  t14Stamp:      'AGENDA / 2026',
  t14Headline:   'RESERVA\nTU\nEDITORIAL.',
  t14S1Tag:      'EDITORIAL',
  t14S1Desc:     'Campaña + lookbook',
  t14S1Price:    'DESDE $1.2M',
  t14S2Tag:      'PASARELA',
  t14S2Desc:     'Cobertura + backstage',
  t14S2Price:    '$650K / noche',
  t14S3Tag:      'CONCEPTUAL',
  t14S3Desc:     'Arte de autor',
  t14S3Price:    'A CONVENIR',
  t14CtaTitle:   'BRIEFING ▸',
  t14CtaSub:     'DM ABIERTO',

  // ─── T15 · BEFORE / AFTER ───────────────────────────────────────
  t15Stamp:      'PROCESO · ANTES / DESPUÉS',
  t15RawTag:     'RAW',
  t15RawSub:     'SIN PRESET',
  t15FinalTag:   'FINAL',
  t15FinalSub:   'PRESET · LP.01',

  // ─── T16 · REEL COVER ───────────────────────────────────────────
  t16ReelTag:    '▶ REEL',
  t16Duration:   '00:24',
  t16Episode:    'EP.07',
  t16Tag:        'BACKSTAGE FILM',
  t16Title:      '3 MINUTOS\nEN EL\nBACK.',
  t16Footer:     '@_LIBRAPHOTOS · ED.07',
  t16Cta:        'VER REEL ▸',

  // ─── T17 · HIGHLIGHT COVERS ─────────────────────────────────────
  t17H1Label:    'RUNWAY',  t17H1Glyph: '01',
  t17H2Label:    'BACKSTAGE',t17H2Glyph:'02',
  t17H3Label:    'ARTE',    t17H3Glyph: '03',
  t17H4Label:    'FILMS',   t17H4Glyph: '04',
  t17H5Label:    'CONTACTO',t17H5Glyph: 'LP',

  // ─── Motion graphics · copy ─────────────────────────────────────
  motion01Title: 'EL AIRE\nQUE\nRESPIRA.',
  motion01Sub:   'BACKSTAGE · ANTES DEL PRIMER PASO',
  motion01TopLabel: 'BAJO LAS LUCES · 22:14',
  motion02Title: 'UN\nSEGUNDO.\nUN GESTO.',
  motion02TopMeta:'1/500 · ƒ/2.0 · ISO 6400',
  motion02Frame: 'FRAME 0247',
  motion03Title: 'EL PASO\nNO SE\nREPITE.',
  motion03TopLabel: 'PASARELA · LIVE FEED',
  motion05Stamp: 'EDICIÓN ÚNICA / DISRUPTIVA',
  motion05VertLabel: 'VOL · SPECIAL · ART COLLECTION · 002 — LIBRA PHOTOS',

  // ─── Aspecto ────────────────────────────────────────────────────
  accent:     'amber', // 'amber' | 'violet' | 'white'
};

// React context — templates lo consumen vía useLP()
const LPContent = React.createContext(LP_CONTENT_DEFAULTS);

function useLP() {
  return React.useContext(LPContent);
}

// Helper para dividir un string con '\n' en JSX con <br/>
function lpLines(str) {
  if (str == null) return null;
  const parts = String(str).split('\n');
  return parts.map((line, i) => (
    React.createElement(React.Fragment, { key: i },
      line,
      i < parts.length - 1 ? React.createElement('br') : null
    )
  ));
}

// Resolve accent color from token
function lpAccentColor(accent) {
  if (accent === 'violet') return '#4B0082';
  if (accent === 'white')  return '#FFFFFF';
  return '#F7A810'; // amber default
}

Object.assign(window, {
  LP_CONTENT_DEFAULTS, LPContent, useLP, lpLines, lpAccentColor,
});

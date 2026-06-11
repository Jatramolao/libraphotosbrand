// Template registry — cada entrada describe una plantilla.
// category: 'blanco' | 'negro' | 'ambar' | 'carousel' | 'stories' | 'profile'
//   (espeja las secciones del sitio: Portafolio Editorial blanco, Runway/
//    Backstage negro, Ámbar Collection violeta, carrusel 1:1, stories, perfil)
// defaultAspect: 'portrait'(4:5) | 'square'(1:1) | 'story'(9:16)
// hasPhoto: ¿tiene slots de foto?
// fields: tokens de texto editables — { key, label, multiline? }
export const TEMPLATES = [
  // ─── PORTAFOLIO EDITORIAL · FONDO BLANCO ──────────────────────────
  {
    id: 't26', label: '26 · Portafolio Editorial', category: 'blanco', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 't26Stamp', label: 'Stamp' },
      { key: 't26Index', label: 'Índice' },
      { key: 't26Caption', label: 'Caption (Lora)', multiline: true },
      { key: 't26Meta', label: 'Meta' },
      { key: 'designer', label: 'Diseñador' },
      { key: 'collection', label: 'Colección' },
    ],
  },
  {
    id: 't27', label: '27 · Editorial Spread', category: 'blanco', defaultAspect: 'square', hasPhoto: true,
    fields: [
      { key: 't27Stamp', label: 'Stamp' },
      { key: 't27Fig1', label: 'Fig. 1' },
      { key: 't27Fig2', label: 'Fig. 2' },
      { key: 't27Caption', label: 'Caption (Lora)', multiline: true },
      { key: 't27Pages', label: 'Folio' },
    ],
  },
  {
    id: 't12', label: '12 · Designer Spotlight', category: 'blanco', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 't12Stamp', label: 'Stamp' },
      { key: 't12SectionLabel', label: 'Etiqueta sección' },
      { key: 'designer', label: 'Diseñador' },
      { key: 'collection', label: 'Colección' },
    ],
  },
  {
    id: 't08', label: '08 · Quote Pull', category: 'blanco', defaultAspect: 'square', hasPhoto: false,
    fields: [
      { key: 'quote', label: 'Frase', multiline: true },
      { key: 't08Stamp', label: 'Stamp' },
      { key: 't08Tag', label: 'Tag' },
    ],
  },

  // ─── RUNWAY / BACKSTAGE · FONDO NEGRO ─────────────────────────────
  {
    id: 't01', label: '01 · Editorial Cover', category: 'negro', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 'coverTitle', label: 'Título', multiline: true },
      { key: 'coverCaption', label: 'Caption' },
      { key: 't01TopLabel', label: 'Top label' },
      { key: 't01TechMeta', label: 'Meta técnica' },
      { key: 't01Cta', label: 'CTA' },
    ],
  },
  {
    id: 't02', label: '02 · Metadata Card', category: 'negro', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 't02FileLabel', label: 'Label 1' }, { key: 't02FileValue', label: 'Valor 1' },
      { key: 't02CamLabel', label: 'Label 2' }, { key: 't02CamValue', label: 'Valor 2' },
      { key: 't02ExpLabel', label: 'Label 3' }, { key: 't02ExpValue', label: 'Valor 3' },
      { key: 't02LocLabel', label: 'Label 4' }, { key: 't02LocValue', label: 'Valor 4' },
    ],
  },
  {
    id: 't28', label: '28 · Music Event / Gig Report', category: 'negro', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 't28Stamp', label: 'Stamp' },
      { key: 't28VertLabel', label: 'Banda vertical' },
      { key: 't28Kicker', label: 'Kicker' },
      { key: 't28Title', label: 'Título', multiline: true },
      { key: 't28Venue', label: 'Venue' },
      { key: 't28Date', label: 'Fecha' },
      { key: 't28Cta', label: 'CTA' },
    ],
  },
  {
    id: 't04', label: '04 · Credits Slate', category: 'negro', defaultAspect: 'portrait', hasPhoto: false,
    fields: [
      { key: 't04Title', label: 'Título', multiline: true },
      { key: 't04TopLabel', label: 'Top label' },
      { key: 't04DirectionLabel', label: 'Direction · etiq.' },
      { key: 't04StylingLabel', label: 'Styling · etiq.' }, { key: 't04StylingValue', label: 'Styling · valor' },
      { key: 't04MakeUpLabel', label: 'Make up · etiq.' }, { key: 't04MakeUpValue', label: 'Make up · valor' },
      { key: 't04ModelLabel', label: 'Model · etiq.' }, { key: 't04ModelValue', label: 'Model · valor' },
      { key: 't04Copyright', label: 'Copyright' }, { key: 't04EndTag', label: 'End tag' },
    ],
  },
  {
    id: 't11', label: '11 · Drop / Teaser', category: 'negro', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 't11Title', label: 'Título', multiline: true },
      { key: 't11Cta', label: 'CTA' },
    ],
  },
  {
    id: 't13', label: '13 · Event Poster', category: 'negro', defaultAspect: 'portrait', hasPhoto: false,
    fields: [
      { key: 't13Title', label: 'Título', multiline: true },
      { key: 't13TopLeft', label: 'Sup-izq' }, { key: 't13TopRight', label: 'Sup-der' },
      { key: 't13Dates', label: 'Fechas' }, { key: 't13Nights', label: 'Noches' },
      { key: 't13LineupLabel', label: 'Lineup etiq.' }, { key: 't13Lineup', label: 'Lineup', multiline: true },
      { key: 't13Footer', label: 'Footer' },
    ],
  },
  {
    id: 't14', label: '14 · Booking', category: 'negro', defaultAspect: 'portrait', hasPhoto: false,
    fields: [
      { key: 't14Headline', label: 'Headline', multiline: true },
      { key: 't14Stamp', label: 'Stamp' },
      { key: 't14S1Tag', label: 'Serv. 1 tag' }, { key: 't14S1Desc', label: 'Serv. 1 desc' }, { key: 't14S1Price', label: 'Serv. 1 precio' },
      { key: 't14S2Tag', label: 'Serv. 2 tag' }, { key: 't14S2Desc', label: 'Serv. 2 desc' }, { key: 't14S2Price', label: 'Serv. 2 precio' },
      { key: 't14S3Tag', label: 'Serv. 3 tag' }, { key: 't14S3Desc', label: 'Serv. 3 desc' }, { key: 't14S3Price', label: 'Serv. 3 precio' },
      { key: 't14CtaTitle', label: 'CTA título' }, { key: 't14CtaSub', label: 'CTA sub' },
    ],
  },
  {
    id: 't24', label: '24 · New Drop', category: 'negro', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 't24TopLabel', label: 'Top label' },
      { key: 't24Badge', label: 'Badge' },
      { key: 't24Kicker', label: 'Kicker' },
      { key: 't24Title', label: 'Título', multiline: true },
      { key: 't24Cta', label: 'CTA' },
    ],
  },
  {
    id: 't19', label: '19 · Sobre Mí / Presentación', category: 'negro', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 't19Stamp', label: 'Stamp' },
      { key: 't19Name', label: 'Nombre', multiline: true },
      { key: 't19Role', label: 'Rol' },
      { key: 't19Bio', label: 'Bio (Lora)', multiline: true },
      { key: 't19Stat1Num', label: 'Stat 1 nº' }, { key: 't19Stat1Label', label: 'Stat 1 label' },
      { key: 't19Stat2Num', label: 'Stat 2 nº' }, { key: 't19Stat2Label', label: 'Stat 2 label' },
      { key: 't19Stat3Num', label: 'Stat 3 nº' }, { key: 't19Stat3Label', label: 'Stat 3 label' },
    ],
  },
  {
    id: 't18', label: '18 · Proceso en Pasos', category: 'negro', defaultAspect: 'portrait', hasPhoto: false,
    fields: [
      { key: 't18Stamp', label: 'Stamp' },
      { key: 't18Title', label: 'Título', multiline: true },
      { key: 't18S1Num', label: 'Paso 1 nº' }, { key: 't18S1Title', label: 'Paso 1 título' }, { key: 't18S1Desc', label: 'Paso 1 desc' },
      { key: 't18S2Num', label: 'Paso 2 nº' }, { key: 't18S2Title', label: 'Paso 2 título' }, { key: 't18S2Desc', label: 'Paso 2 desc' },
      { key: 't18S3Num', label: 'Paso 3 nº' }, { key: 't18S3Title', label: 'Paso 3 título' }, { key: 't18S3Desc', label: 'Paso 3 desc' },
      { key: 't18S4Num', label: 'Paso 4 nº' }, { key: 't18S4Title', label: 'Paso 4 título' }, { key: 't18S4Desc', label: 'Paso 4 desc' },
      { key: 't18S5Num', label: 'Paso 5 nº' }, { key: 't18S5Title', label: 'Paso 5 título' }, { key: 't18S5Desc', label: 'Paso 5 desc' },
      { key: 't18Footer', label: 'Footer' },
    ],
  },
  {
    id: 't20', label: '20 · Top 5 / Ranking', category: 'negro', defaultAspect: 'portrait', hasPhoto: false,
    fields: [
      { key: 't20Stamp', label: 'Stamp' },
      { key: 't20Title', label: 'Título', multiline: true },
      { key: 't20I1Label', label: 'Item 1' }, { key: 't20I1Sub', label: 'Item 1 sub' },
      { key: 't20I2Label', label: 'Item 2' }, { key: 't20I2Sub', label: 'Item 2 sub' },
      { key: 't20I3Label', label: 'Item 3' }, { key: 't20I3Sub', label: 'Item 3 sub' },
      { key: 't20I4Label', label: 'Item 4' }, { key: 't20I4Sub', label: 'Item 4 sub' },
      { key: 't20I5Label', label: 'Item 5' }, { key: 't20I5Sub', label: 'Item 5 sub' },
      { key: 't20Footer', label: 'Footer' },
    ],
  },

  // ─── ÁMBAR COLLECTION · VIOLETA ───────────────────────────────────
  {
    id: 't03', label: '03 · Ámbar Collection', category: 'ambar', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 'noirTitle', label: 'Título grande', multiline: true },
      { key: 't03Stamp', label: 'Stamp' },
      { key: 't03VertLabel', label: 'Caption vertical' },
    ],
  },

  // ─── CARRUSEL · NOTAS Y MANIFIESTO 1:1 ────────────────────────────
  {
    id: 't06', label: '06 · Type Poster', category: 'carousel', defaultAspect: 'square', hasPhoto: false,
    fields: [
      { key: 'manifestTop', label: 'Manifiesto', multiline: true },
      { key: 'manifestSub', label: 'Subtítulo' },
      { key: 't06TopLeft', label: 'Esquina sup-izq' }, { key: 't06TopRight', label: 'Esquina sup-der' },
      { key: 't06BottomLeft', label: 'Esquina inf-izq' },
    ],
  },
  {
    id: 't15', label: '15 · Before / After', category: 'carousel', defaultAspect: 'square', hasPhoto: true,
    fields: [
      { key: 't15Stamp', label: 'Stamp' },
      { key: 't15RawTag', label: 'Tag izq.' }, { key: 't15RawSub', label: 'Sub izq.' },
      { key: 't15FinalTag', label: 'Tag der.' }, { key: 't15FinalSub', label: 'Sub der.' },
    ],
  },
  {
    id: 't21', label: '21 · Testimonio / Quote', category: 'carousel', defaultAspect: 'square', hasPhoto: true,
    fields: [
      { key: 't21Stamp', label: 'Stamp' },
      { key: 't21Quote', label: 'Cita', multiline: true },
      { key: 't21Name', label: 'Nombre' },
      { key: 't21Role', label: 'Rol' },
      { key: 't21Tag', label: 'Tag esquina', multiline: true },
    ],
  },
  {
    id: 't22', label: '22 · Behind the Scenes', category: 'carousel', defaultAspect: 'square', hasPhoto: true,
    fields: [
      { key: 't22Stamp', label: 'Stamp' },
      { key: 't22Caption', label: 'Pie polaroid' },
      { key: 't22Note1', label: 'Nota 1', multiline: true },
      { key: 't22Note2', label: 'Nota 2', multiline: true },
    ],
  },
  {
    id: 't23', label: '23 · Datos / Sesión', category: 'carousel', defaultAspect: 'square', hasPhoto: false,
    fields: [
      { key: 't23Stamp', label: 'Stamp' },
      { key: 't23Title', label: 'Título', multiline: true },
      { key: 't23Stat1Num', label: 'Stat 1 nº' }, { key: 't23Stat1Label', label: 'Stat 1 label' },
      { key: 't23Stat2Num', label: 'Stat 2 nº' }, { key: 't23Stat2Label', label: 'Stat 2 label' },
      { key: 't23Stat3Num', label: 'Stat 3 nº' }, { key: 't23Stat3Label', label: 'Stat 3 label' },
      { key: 't23Stat4Num', label: 'Stat 4 nº' }, { key: 't23Stat4Label', label: 'Stat 4 label' },
      { key: 't23Footer', label: 'Footer' },
    ],
  },
  {
    id: 't25', label: '25 · Polaroid Stack', category: 'carousel', defaultAspect: 'square', hasPhoto: true,
    fields: [
      { key: 't25Stamp', label: 'Stamp' },
      { key: 't25Caption', label: 'Pie polaroid' },
      { key: 't25Footer', label: 'Footer' },
    ],
  },

  // ─── STORIES 9:16 ─────────────────────────────────────────────────
  {
    id: 't09', label: '09 · Story Ticker', category: 'stories', defaultAspect: 'story', hasPhoto: true,
    fields: [
      { key: 't09Status', label: 'Status LIVE' },
      { key: 't09Headline', label: 'Headline', multiline: true },
      { key: 't09Ticker', label: 'Ticker texto', multiline: true },
      { key: 't09VertLabel', label: 'Label vertical' },
      { key: 't09Meta', label: 'Meta cámara' },
      { key: 't09Cta', label: 'CTA' },
    ],
  },
  {
    id: 't10', label: '10 · Story Countdown', category: 'stories', defaultAspect: 'story', hasPhoto: false,
    fields: [
      { key: 'countdownDays', label: 'Días' },
      { key: 't10TopLabel', label: 'Top label' },
      { key: 't10DaysCaption', label: 'Caption días' },
      { key: 't10Cta', label: 'CTA grande' },
      { key: 't10MoreInfo', label: 'CTA secundario' },
    ],
  },
  {
    id: 't16', label: '16 · Reel Cover', category: 'stories', defaultAspect: 'story', hasPhoto: true,
    fields: [
      { key: 't16Title', label: 'Título', multiline: true },
      { key: 't16ReelTag', label: 'Tag Reel' }, { key: 't16Duration', label: 'Duración' },
      { key: 't16Episode', label: 'Episodio' }, { key: 't16Tag', label: 'Etiqueta' },
      { key: 't16Footer', label: 'Footer' }, { key: 't16Cta', label: 'CTA' },
    ],
  },

  // ─── PERFIL · DESTACADAS ──────────────────────────────────────────
  {
    id: 't17', label: '17 · Highlight Covers', category: 'profile', defaultAspect: 'square', hasPhoto: false,
    fields: [
      { key: 't17H1Label', label: 'H1 label' }, { key: 't17H1Glyph', label: 'H1 glyph' },
      { key: 't17H2Label', label: 'H2 label' }, { key: 't17H2Glyph', label: 'H2 glyph' },
      { key: 't17H3Label', label: 'H3 label' }, { key: 't17H3Glyph', label: 'H3 glyph' },
      { key: 't17H4Label', label: 'H4 label' }, { key: 't17H4Glyph', label: 'H4 glyph' },
      { key: 't17H5Label', label: 'H5 label' }, { key: 't17H5Glyph', label: 'H5 glyph' },
    ],
  },
];

export const TEMPLATES_BY_ID = Object.fromEntries(TEMPLATES.map(t => [t.id, t]));

export const CATEGORY_LABELS = {
  blanco: 'Editorial Blanco',
  negro: 'Runway / Backstage',
  ambar: 'Ámbar Collection',
  carousel: 'Carrusel 1:1',
  stories: 'Stories 9:16',
  profile: 'Perfil',
};

export const CATEGORIES = ['blanco', 'negro', 'ambar', 'carousel', 'stories', 'profile'];

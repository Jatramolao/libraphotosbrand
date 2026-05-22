// Template registry — each entry describes a template
// category: 'feed' | 'carousel' | 'stories' | 'profile'
// defaultAspect: 'portrait'(4:5) | 'square'(1:1) | 'story'(9:16)
// hasPhoto: does this template have photo slots?
// fields: array of { key, label, multiline? } — text tokens editable for this template
export const TEMPLATES = [
  {
    id: 't01', label: '01 · Editorial Cover', category: 'feed', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 'coverTitle', label: 'Título', multiline: true },
      { key: 'coverCaption', label: 'Caption' },
      { key: 't01TopLabel', label: 'Top label' },
      { key: 't01TechMeta', label: 'Meta técnica' },
      { key: 't01Cta', label: 'CTA' },
    ],
  },
  {
    id: 't02', label: '02 · Metadata Card', category: 'feed', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 't02FileLabel', label: 'Label 1' }, { key: 't02FileValue', label: 'Valor 1' },
      { key: 't02CamLabel', label: 'Label 2' }, { key: 't02CamValue', label: 'Valor 2' },
      { key: 't02ExpLabel', label: 'Label 3' }, { key: 't02ExpValue', label: 'Valor 3' },
      { key: 't02LocLabel', label: 'Label 4' }, { key: 't02LocValue', label: 'Valor 4' },
    ],
  },
  {
    id: 't03', label: '03 · Violet Drop', category: 'feed', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 'noirTitle', label: 'Título grande', multiline: true },
      { key: 't03Stamp', label: 'Stamp' },
      { key: 't03VertLabel', label: 'Caption vertical' },
    ],
  },
  {
    id: 't04', label: '04 · Credits Slate', category: 'feed', defaultAspect: 'portrait', hasPhoto: false,
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
    id: 't06', label: '06 · Type Poster', category: 'carousel', defaultAspect: 'square', hasPhoto: false,
    fields: [
      { key: 'manifestTop', label: 'Manifiesto', multiline: true },
      { key: 'manifestSub', label: 'Subtítulo' },
      { key: 't06TopLeft', label: 'Esquina sup-izq' }, { key: 't06TopRight', label: 'Esquina sup-der' },
      { key: 't06BottomLeft', label: 'Esquina inf-izq' },
    ],
  },
  {
    id: 't08', label: '08 · Quote Pull', category: 'carousel', defaultAspect: 'square', hasPhoto: false,
    fields: [
      { key: 'quote', label: 'Frase', multiline: true },
      { key: 't08Stamp', label: 'Stamp' },
      { key: 't08Tag', label: 'Tag' },
    ],
  },
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
    id: 't11', label: '11 · Drop / Teaser', category: 'feed', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 't11Title', label: 'Título', multiline: true },
      { key: 't11Cta', label: 'CTA' },
    ],
  },
  {
    id: 't12', label: '12 · Designer Spotlight', category: 'feed', defaultAspect: 'portrait', hasPhoto: true,
    fields: [
      { key: 't12Stamp', label: 'Stamp' },
      { key: 't12SectionLabel', label: 'Etiqueta sección' },
      { key: 'designer', label: 'Diseñador' },
      { key: 'collection', label: 'Colección' },
    ],
  },
  {
    id: 't13', label: '13 · Event Poster', category: 'feed', defaultAspect: 'portrait', hasPhoto: false,
    fields: [
      { key: 't13Title', label: 'Título', multiline: true },
      { key: 't13TopLeft', label: 'Sup-izq' }, { key: 't13TopRight', label: 'Sup-der' },
      { key: 't13Dates', label: 'Fechas' }, { key: 't13Nights', label: 'Noches' },
      { key: 't13LineupLabel', label: 'Lineup etiq.' }, { key: 't13Lineup', label: 'Lineup', multiline: true },
      { key: 't13Footer', label: 'Footer' },
    ],
  },
  {
    id: 't14', label: '14 · Booking', category: 'feed', defaultAspect: 'portrait', hasPhoto: false,
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
    id: 't15', label: '15 · Before / After', category: 'carousel', defaultAspect: 'square', hasPhoto: true,
    fields: [
      { key: 't15Stamp', label: 'Stamp' },
      { key: 't15RawTag', label: 'Tag izq.' }, { key: 't15RawSub', label: 'Sub izq.' },
      { key: 't15FinalTag', label: 'Tag der.' }, { key: 't15FinalSub', label: 'Sub der.' },
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
  feed: 'Feed 4:5',
  carousel: 'Carrusel 1:1',
  stories: 'Stories 9:16',
  profile: 'Perfil',
};

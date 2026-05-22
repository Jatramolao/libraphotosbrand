import { toPng } from 'html-to-image';

export const EXPORT_PRESETS = {
  portrait: { w: 1080, h: 1350, label: 'FEED 4:5', hint: '1080 × 1350' },
  square:   { w: 1080, h: 1080, label: 'POST 1:1', hint: '1080 × 1080' },
  story:    { w: 1080, h: 1920, label: 'STORY 9:16', hint: '1080 × 1920' },
};

export async function exportAsPng(element, preset, filename = 'libra-export') {
  if (!element) throw new Error('No preview element found');
  const rect = element.getBoundingClientRect();
  const pixelRatio = preset.w / rect.width;
  const dataUrl = await toPng(element, { pixelRatio, skipFonts: true, cacheBust: false });
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${filename}_${preset.w}x${preset.h}.png`;
  a.click();
}

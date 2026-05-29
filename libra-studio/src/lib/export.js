import { toPng } from 'html-to-image';

export const EXPORT_PRESETS = {
  portrait: { w: 1080, h: 1350, label: 'FEED 4:5', hint: '1080 × 1350' },
  square:   { w: 1080, h: 1080, label: 'POST 1:1', hint: '1080 × 1080' },
  story:    { w: 1080, h: 1920, label: 'STORY 9:16', hint: '1080 × 1920' },
};

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Archivo+Black&family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap';

// Cache so we only fetch once per session
let _fontCSS = null;

async function buildFontEmbedCSS() {
  if (_fontCSS) return _fontCSS;
  try {
    const cssResp = await fetch(FONTS_URL);
    let css = await cssResp.text();

    // Extract every font file URL from the CSS
    const fontUrls = [...css.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)].map(m => m[2]);

    await Promise.all(fontUrls.map(async (url) => {
      try {
        const buf = await fetch(url).then(r => r.arrayBuffer());
        // Safe base64 conversion that works for large buffers
        const bytes = new Uint8Array(buf);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        const b64 = btoa(binary);
        const mime = url.includes('.woff2') ? 'font/woff2' : 'font/woff';
        css = css.replace(url, `data:${mime};base64,${b64}`);
      } catch { /* leave original URL on failure */ }
    }));

    _fontCSS = css;
    return css;
  } catch {
    return '';
  }
}

// Captures element as PNG data URL without triggering a download.
// Used by ExportAllModal to collect images before offering them.
export async function capturePng(element, preset) {
  if (!element) throw new Error('No element');
  const rect = element.getBoundingClientRect();
  const pixelRatio = preset.w / rect.width;
  const fontEmbedCSS = await buildFontEmbedCSS();
  const opts = { pixelRatio, fontEmbedCSS, cacheBust: false };
  await toPng(element, opts); // prime image cache in cloned document
  return toPng(element, opts);
}

export async function exportAsPng(element, preset, filename = 'libra-export') {
  const dataUrl = await capturePng(element, preset);
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${filename}_${preset.w}x${preset.h}.png`;
  a.click();
}

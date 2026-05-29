import { describe, it, expect } from 'vitest';
import { EXPORT_PRESETS } from '../lib/export';

describe('EXPORT_PRESETS', () => {
  it('portrait is 4:5 at 1080px wide', () => {
    const { w, h } = EXPORT_PRESETS.portrait;
    expect(w).toBe(1080);
    expect(h).toBe(1350);
    expect(h / w).toBeCloseTo(5 / 4, 5);
  });

  it('square is 1:1 at 1080px', () => {
    const { w, h } = EXPORT_PRESETS.square;
    expect(w).toBe(h);
    expect(w).toBe(1080);
  });

  it('story is 9:16 at 1080px wide', () => {
    const { w, h } = EXPORT_PRESETS.story;
    expect(w).toBe(1080);
    expect(h).toBe(1920);
    expect(h / w).toBeCloseTo(16 / 9, 5);
  });

  it('all presets have a label and hint string', () => {
    for (const [key, preset] of Object.entries(EXPORT_PRESETS)) {
      expect(preset.label, `${key}.label`).toBeTruthy();
      expect(preset.hint, `${key}.hint`).toBeTruthy();
    }
  });
});

describe('pixelRatio calculation', () => {
  it('portrait template (540px native) exports at exactly 2×', () => {
    const pixelRatio = EXPORT_PRESETS.portrait.w / 540;
    expect(pixelRatio).toBe(2);
  });

  it('square template (540px native) exports at exactly 2×', () => {
    const pixelRatio = EXPORT_PRESETS.square.w / 540;
    expect(pixelRatio).toBe(2);
  });

  it('story template (405px native) exports at ~2.67× giving 1920px height', () => {
    const pixelRatio = EXPORT_PRESETS.story.w / 405;
    const exportedHeight = Math.round(720 * pixelRatio);
    expect(exportedHeight).toBe(1920);
  });
});

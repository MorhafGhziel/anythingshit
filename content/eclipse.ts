import type { CSSProperties } from 'react';

/**
 * The page is one total solar eclipse. Each section is a moment of it: as it scrolls in, the page takes
 * its sky and the indicator's moon slides to its position. `moon` is the moon's offset from the sun's
 * centre in sun diameters: negative while it arrives, 0 at totality, positive as it leaves.
 * `sky` is also the section's own background when scripting or motion is off.
 */
export type Phase = 'first' | 'partial' | 'totality' | 'diamond' | 'third' | 'last';

export interface EclipseStop {
  sky: string;
  tone: 'light' | 'dark';
  phase: Phase;
  moon: number;
}

export const eclipse = {
  top: { sky: '#58606d', tone: 'light', phase: 'partial', moon: -0.35 },
  statement: { sky: '#06070b', tone: 'light', phase: 'totality', moon: 0 },
  drop: { sky: '#06070b', tone: 'light', phase: 'totality', moon: 0 },
  shop: { sky: '#0b1020', tone: 'light', phase: 'totality', moon: 0 },
  signature: { sky: '#06070b', tone: 'light', phase: 'totality', moon: 0 },
  details: { sky: '#0e1322', tone: 'light', phase: 'totality', moon: 0 },
  fit: { sky: '#1a1411', tone: 'light', phase: 'diamond', moon: 0.06 },
  crowd: { sky: '#2a3040', tone: 'light', phase: 'third', moon: 0.3 },
  delivery: { sky: '#bdbab3', tone: 'dark', phase: 'third', moon: 0.62 },
  footer: { sky: '#efeae2', tone: 'dark', phase: 'last', moon: 1.1 },
} as const satisfies Record<string, EclipseStop>;

export type EclipseKey = keyof typeof eclipse;

/** HTML attributes that register a section with the eclipse (sky, tone and moon). */
export function eclipseAttrs(key: EclipseKey) {
  const stop = eclipse[key];
  return {
    'data-eclipse': key,
    'data-sky': stop.sky,
    'data-tone': stop.tone,
    'data-phase': stop.phase,
    'data-moon': String(stop.moon),
    style: { '--stop-sky': stop.sky } as CSSProperties,
  };
}

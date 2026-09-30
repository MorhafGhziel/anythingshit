import type { Garment } from '@/content/types';

/**
 * PLACEHOLDER product artwork: a flat silhouette of each garment, rim-lit as if by the corona.
 * Replace with the product renders (brief step 8) once they exist; the cards take any image.
 */
const SHAPES: Record<Garment, { body: string; detail: string[]; emblem: [number, number, number] }> = {
  hoodie: {
    body: 'M64 56C60 20 140 20 136 56L170 70 194 152 172 160 156 104 156 214 44 214 44 104 28 160 6 152 30 70Z',
    detail: ['M76 60C76 34 124 34 124 60C118 72 82 72 76 60Z', 'M70 150H130V184H70Z', 'M44 200H156'],
    emblem: [80, 102, 7],
  },
  tee: {
    body: 'M62 34Q100 54 138 34L182 50 198 96 166 106 158 84 158 214 42 214 42 84 34 106 2 96 18 50Z',
    detail: ['M74 38Q100 58 126 38'],
    emblem: [80, 92, 7],
  },
  cargo: {
    body: 'M54 18H146L164 226H112L100 92 88 226H36Z',
    detail: ['M54 32H146', 'M42 112H74V152H42Z', 'M126 112H158V152H126Z', 'M100 32V92'],
    emblem: [128, 50, 5],
  },
  cap: {
    body: 'M46 150C46 70 154 70 154 150ZM40 150Q18 176 66 178L176 168Q188 160 154 150Z',
    detail: ['M100 76V150', 'M72 90Q86 120 84 150', 'M128 90Q114 120 116 150'],
    emblem: [100, 118, 9],
  },
  beanie: {
    body: 'M54 150C54 58 146 58 146 150ZM48 132H152V178Q100 188 48 178Z',
    detail: ['M48 132H152', 'M60 140V172M76 140V174M92 140V176M108 140V176M124 140V174M140 140V172'],
    emblem: [100, 104, 9],
  },
};

export function GarmentArt({ garment, tint, className = '' }: { garment: Garment; tint: string; className?: string }) {
  const shape = SHAPES[garment];
  const [ex, ey, er] = shape.emblem;
  const id = `rim-${garment}`;
  return (
    <svg viewBox="-10 -10 220 250" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2efe8" stopOpacity="0.75" />
          <stop offset="0.45" stopColor="#f2efe8" stopOpacity="0.08" />
          <stop offset="1" stopColor="#e2582e" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path d={shape.body} fill={tint} stroke={`url(#${id})`} strokeWidth="1.6" strokeLinejoin="round" />
      {shape.detail.map((d) => (
        <path key={d} d={d} fill="none" stroke="#ffffff" strokeOpacity="0.09" strokeWidth="1.4" strokeLinecap="round" />
      ))}
      <circle cx={ex} cy={ey} r={er} fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="2" />
      <circle cx={ex + er * 0.72} cy={ey - er * 0.72} r={Math.max(1.4, er * 0.22)} fill="#f08a5d" />
    </svg>
  );
}

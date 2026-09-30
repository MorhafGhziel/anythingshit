import type { CSSProperties } from 'react';

/** Inline CSS custom properties, e.g. `style={cssVars({ '--i': 2 })}` for staggered reveals. */
export function cssVars(vars: Record<`--${string}`, string | number>): CSSProperties {
  return vars as CSSProperties;
}

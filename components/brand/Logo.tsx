import type { CSSProperties } from 'react';

interface MarkProps {
  className?: string;
  /** Show the diamond-ring bead (the one warm point in the identity). */
  bead?: boolean;
  style?: CSSProperties;
}

/**
 * The mark: a black disc inside a thin ring, with one bright bead at the upper right, the diamond ring,
 * the last light before totality. Colours come from `currentColor` and `--mark-disc`.
 */
export function Mark({ className = '', bead = true, style }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="28.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="23.5" fill="var(--mark-disc, currentColor)" />
      {bead ? <circle cx="51.5" cy="12.5" r="4" fill="var(--ember-light)" data-mark-bead /> : null}
    </svg>
  );
}

/** Mark and wordmark. The wordmark is set in Syne with open tracking; the Arabic reads as a transliteration. */
export function Logo({ locale, className = '' }: { locale: string; className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <Mark className="logo-mark" />
      <span className="logo-word" lang={locale === 'ar' ? 'ar' : 'en'}>
        {locale === 'ar' ? 'أمبرا' : 'UMBRA'}
      </span>
    </span>
  );
}

/** The name set as wide as the page, for the footer. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 190" className={className} aria-hidden="true" focusable="false">
      <text x="500" y="160" textAnchor="middle" textLength="990" lengthAdjust="spacingAndGlyphs" className="wordmark-text">
        UMBRA
      </text>
    </svg>
  );
}

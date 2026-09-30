import { useTranslations } from 'next-intl';
import type { Phase } from '@/content/eclipse';

const PHASES: Phase[] = ['first', 'partial', 'totality', 'diamond', 'third', 'last'];

/**
 * The page's eclipse: the moon slides across the sun as you read, and the phase is named beside it.
 * Decorative (the sections carry the content), so hidden from assistive tech.
 */
export function EclipseIndicator({ children }: { children?: React.ReactNode }) {
  const t = useTranslations('Eclipse');
  const phases = Object.fromEntries(PHASES.map((key) => [key, t(`phases.${key}`)]));

  return (
    <div className="indicator" data-indicator data-phases={JSON.stringify(phases)} data-visible="false">
      <div className="flex items-center gap-3" aria-hidden="true">
        <svg viewBox="0 0 40 40" className="indicator-disc">
          <circle cx="20" cy="20" r="12" className="indicator-sun" />
          <circle cx="20" cy="20" r="12.4" className="indicator-moon" />
        </svg>
        <span className="grid gap-1">
          <span className="indicator-label">{t('label')}</span>
          <span className="indicator-phase" data-indicator-phase>
            {phases.first}
          </span>
        </span>
      </div>
      {children}
    </div>
  );
}

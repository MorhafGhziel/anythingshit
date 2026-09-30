import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { dropAt } from '@/content/business';
import { dropCount, dropUnits } from '@/content/catalog';
import { eclipseAttrs } from '@/content/eclipse';
import { photos } from '@/content/media';
import { sectionIds } from '@/content/navigation';
import type { Locale } from '@/i18n/routing';
import { cssVars } from '@/lib/style';
import { ActionLink } from '@/components/ui/ActionLink';
import { Countdown } from './Countdown';

/** Drop 01: a countdown to totality, set over the diamond ring. */
export function Drop({ locale }: { locale: Locale }) {
  const t = useTranslations('Drop');
  return (
    <section id={sectionIds.drop} data-section className="stop drop relative overflow-clip" aria-labelledby="drop-title" {...eclipseAttrs('drop')}>
      <div className="drop-photo" aria-hidden="true">
        <Image src={photos.diamond.src} alt="" fill sizes="100vw" quality={80} style={{ objectPosition: photos.diamond.focus }} />
      </div>
      <div className="wrap relative grid gap-12 py-[var(--sec)] lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow rv">{t('eyebrow')}</p>
          <h2 id="drop-title" className="title rv mt-6" style={cssVars({ '--i': 1 })}>
            {t('title')}
          </h2>
          <p className="rv mt-6 text-lg opacity-80" style={cssVars({ '--i': 2 })}>
            {t('date')}
          </p>
        </div>
        <div className="rv lg:col-span-12" style={cssVars({ '--i': 3 })}>
          <Countdown target={dropAt} labels={{ days: t('units.days'), hours: t('units.hours'), minutes: t('units.minutes'), seconds: t('units.seconds') }} live={t('live')} />
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ActionLink href={`#${sectionIds.shop}`} variant="ember">
              {t('cta')}
            </ActionLink>
            <p className="text-sm opacity-70">{t('pieces', { count: dropCount, units: new Intl.NumberFormat(locale === 'ar' ? 'ar-u-nu-latn' : 'en').format(dropUnits) })}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

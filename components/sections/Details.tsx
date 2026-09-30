import { useTranslations } from 'next-intl';
import { eclipseAttrs } from '@/content/eclipse';
import { sectionIds } from '@/content/navigation';
import { coronaLoop } from '@/content/site';
import { cssVars } from '@/lib/style';
import { LoopFilm } from './LoopFilm';

const STEPS = ['fleece', 'ring', 'hardware'] as const;

/** The corona: how the pieces are made, as three cards that stack as you scroll, beside the corona film. */
export function Details() {
  const t = useTranslations('Details');
  return (
    <section id={sectionIds.details} data-section className="stop sec" aria-labelledby="details-title" {...eclipseAttrs('details')}>
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow rv">{t('eyebrow')}</p>
            <h2 id="details-title" className="title rv mt-6" style={cssVars({ '--i': 1 })}>
              {t('title')}
            </h2>
            <div className="loop-frame rv mt-10" style={cssVars({ '--i': 2 })}>
              <LoopFilm {...coronaLoop} className="loop-video" />
            </div>
          </div>
        </div>
        <ol className="stack lg:col-span-6 lg:col-start-7">
          {STEPS.map((key, index) => (
            <li key={key} className={`stack-card stack-${key}`} style={cssVars({ '--i': index })} data-stack-card>
              <div className="stack-texture" aria-hidden="true" />
              <p className="stack-num num" aria-hidden="true">
                0{index + 1}
              </p>
              <h3 className="stack-title">{t(`steps.${key}.title`)}</h3>
              <p className="stack-body">{t(`steps.${key}.body`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

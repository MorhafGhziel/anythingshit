import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { eclipseAttrs } from '@/content/eclipse';
import { photos, type PhotoKey } from '@/content/media';
import { sectionIds } from '@/content/navigation';
import type { Locale } from '@/i18n/routing';
import { cssVars } from '@/lib/style';

const ROWS: PhotoKey[][] = [
  ['plaza', 'rooftop', 'lattice', 'towers', 'birds'],
  ['diamond', 'latticeClose', 'returns', 'turned', 'deepening'],
];

/** Third contact: the day in pictures, two rows drifting past in opposite directions. */
export function Crowd({ locale }: { locale: Locale }) {
  const t = useTranslations('Crowd');
  return (
    <section id={sectionIds.crowd} data-section className="stop sec overflow-clip" aria-labelledby="crowd-title" {...eclipseAttrs('crowd')}>
      <div className="wrap mb-12 lg:mb-16">
        <p className="eyebrow rv">{t('eyebrow')}</p>
        <h2 id="crowd-title" className="title rv mt-6" style={cssVars({ '--i': 1 })}>
          {t('title')}
        </h2>
      </div>
      <div className="grid gap-5">
        {ROWS.map((row, r) => (
          <div key={r} className="reel-viewport" data-reel={r % 2 === 0 ? 1 : -1}>
            <ul className="reel">
              {row.map((key) => {
                const photo = photos[key];
                return (
                  <li key={key}>
                    <figure>
                      <div className="photo" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
                        <Image src={photo.src} width={photo.width} height={photo.height} alt={photo.alt[locale]} sizes="(max-width: 767px) 80vw, 40vw" quality={75} style={{ objectPosition: photo.focus }} />
                      </div>
                      <figcaption className="mt-3 text-sm opacity-70">{t(`captions.${key}`)}</figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

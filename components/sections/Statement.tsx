import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { eclipseAttrs } from '@/content/eclipse';
import { photos } from '@/content/media';
import { sectionIds } from '@/content/navigation';
import { cssVars } from '@/lib/style';

/** Totality: one sentence with pictures where the words would be. */
export function Statement() {
  const t = useTranslations('Statement');
  return (
    <section id={sectionIds.statement} data-section className="stop sec relative overflow-clip" aria-labelledby="statement-title" {...eclipseAttrs('statement')}>
      <div className="stars" aria-hidden="true" />
      <div className="wrap relative text-center">
        <p className="eyebrow rv justify-center">{t('eyebrow')}</p>
        <h2 id="statement-title" className="statement rv mx-auto mt-10" style={cssVars({ '--i': 1 })}>
          {t('a')}{' '}
          <span className="chip chip-ring rv-pop" style={cssVars({ '--i': 2 })} aria-hidden="true" />{' '}
          {t('b')}{' '}
          <span className="chip rv-pop" style={cssVars({ '--i': 3 })} aria-hidden="true">
            <Image src={photos.towers.src} alt="" width={240} height={135} sizes="10rem" style={{ objectPosition: '70% 80%' }} />
          </span>{' '}
          {t('c')}{' '}
          <span className="chip rv-pop" style={cssVars({ '--i': 4 })} aria-hidden="true">
            <Image src={photos.turned.src} alt="" width={240} height={135} sizes="10rem" style={{ objectPosition: '12% 40%' }} />
          </span>{' '}
          {t('d')}
        </h2>
        <p className="lead rv mx-auto mt-12" style={cssVars({ '--i': 2 })}>
          {t('body')}
        </p>
      </div>
    </section>
  );
}

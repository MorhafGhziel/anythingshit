import { getImageProps } from 'next/image';
import { useTranslations } from 'next-intl';
import { media } from '@/content/site';
import { sectionIds } from '@/content/navigation';
import { eclipseAttrs } from '@/content/eclipse';
import { ActionLink } from '@/components/ui/ActionLink';
import { ArrowDownIcon } from '@/components/ui/Icons';
import { FilmPlayer } from './FilmPlayer';

const DESKTOP_SIZES = '(min-aspect-ratio: 16/9) 100vw, 178vh';
const MOBILE_SIZES = '100vw';

/**
 * The opening: the campaign film follows the scroll. He stands on a pale plaza under the eclipse at
 * noon, the birds settle, the camera drops into the lattice shadow and the frame goes black: totality.
 * Without JavaScript or with reduced motion it is a single, fully readable frame.
 */
export function HeroFilm() {
  const t = useTranslations('Hero');
  const alt = t('imageAlt');

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ alt, ...media.hero.desktopImage, quality: 80, sizes: DESKTOP_SIZES });
  const {
    props: { srcSet: mobileSrcSet, ...image },
  } = getImageProps({ alt, ...media.hero.mobileImage, quality: 80, sizes: MOBILE_SIZES, loading: 'eager', fetchPriority: 'high' });

  return (
    <div className="film-track" data-film-track {...eclipseAttrs('top')}>
      <link rel="preload" as="image" imageSrcSet={mobileSrcSet} imageSizes={MOBILE_SIZES} media="(max-width: 767px)" fetchPriority="high" />
      <link rel="preload" as="image" imageSrcSet={desktopSrcSet} imageSizes={DESKTOP_SIZES} media="(min-width: 768px)" fetchPriority="high" />

      <section id={sectionIds.top} data-section className="film-stage" aria-labelledby="hero-title" data-film-stage>
        <div className="film-media" data-film-media>
          <picture>
            <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes={DESKTOP_SIZES} />
            <img {...image} srcSet={mobileSrcSet} alt={alt} data-hero-image />
          </picture>
          <FilmPlayer desktop={media.hero.desktopFilm} mobile={media.hero.mobileFilm} />
        </div>
        <div className="film-shade" data-film-shade aria-hidden="true" />

        <div className="film-copy">
          <div className="film-intro" data-film-intro>
            <h1 id="hero-title" className="film-title">
              <span className="line-mask">
                <span data-hero-line>{t('lineA')}</span>
              </span>
              <span className="line-mask">
                <span data-hero-line className="film-title-accent">
                  {t('lineB')}
                </span>
              </span>
            </h1>
            <p className="film-sub" data-hero-fade="sub">
              {t('sub')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-hero-fade="cta">
              <ActionLink href={`#${sectionIds.shop}`} variant="dark">
                {t('shop')}
              </ActionLink>
              <ActionLink href={`#${sectionIds.fit}`} variant="line">
                {t('fit')}
              </ActionLink>
            </div>
          </div>

          <p className="film-beat" data-film-beat aria-hidden="true">
            <span>{t('beatA')}</span>
            <span>{t('beatB')}</span>
          </p>
          <p className="film-beat film-beat-2" data-film-beat2 aria-hidden="true">
            <span>{t('beatC')}</span>
            <span>{t('beatD')}</span>
          </p>
          <p className="film-totality" data-film-sip aria-hidden="true">
            {t('totality')}
          </p>

          <div className="film-foot" data-hero-fade="foot">
            <a href={`#${sectionIds.statement}`} className="nav-link gap-2">
              {t('scroll')}
              <ArrowDownIcon />
            </a>
          </div>
        </div>

        <div className="film-progress" aria-hidden="true" />
      </section>
    </div>
  );
}

import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { brandName } from '@/lib/content';
import { MotionRoot } from '@/lib/motion/MotionRoot';
import { Loader } from '@/components/layout/Loader';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { EclipseIndicator } from '@/components/layout/EclipseIndicator';
import { HeroFilm } from '@/components/sections/HeroFilm';
import { Statement } from '@/components/sections/Statement';
import { Drop } from '@/components/sections/Drop';
import { Shop } from '@/components/sections/Shop';
import { Details } from '@/components/sections/Details';
import { Crowd } from '@/components/sections/Crowd';
import { Delivery } from '@/components/sections/Delivery';

/** One total solar eclipse, from the light draining away to the sun whole again. */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('Loader');

  return (
    <>
      <Loader label={t('label')} />
      <SiteHeader brand={brandName(locale)} />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroFilm />
        <Statement />
        <Drop locale={locale} />
        <Shop locale={locale} />
        <Details />
        <Crowd locale={locale} />
        <Delivery locale={locale} />
      </main>
      <SiteFooter />
      <EclipseIndicator />
      <MotionRoot key={locale} />
    </>
  );
}

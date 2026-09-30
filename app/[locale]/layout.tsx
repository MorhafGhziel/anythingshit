import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { localeDirection, routing } from '@/i18n/routing';
import { media, siteUrl } from '@/content/site';
import { brandName } from '@/lib/content';
import { newsreader, plexMono, readex, syne } from '@/lib/fonts';
import { motionBootScript } from '@/lib/motion/boot';
import { InlineScript } from '@/components/ui/InlineScript';
import '../globals.css';

type LayoutProps = { children: ReactNode; params: Promise<{ locale: string }> };

/** Only these namespaces are needed by client components. */
const CLIENT_NAMESPACES = ['Common', 'Language', 'Header', 'Shop', 'Bag', 'Fit'] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: '#06070b', colorScheme: 'dark', viewportFit: 'cover' };

export async function generateMetadata({ params }: Omit<LayoutProps, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const brand = brandName(locale);
  const title = t('title', { brand });
  const description = t('description', { brand });
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: brand,
    alternates: { canonical: `/${locale}`, languages: { ar: '/ar', en: '/en', 'x-default': '/ar' } },
    openGraph: {
      type: 'website',
      url: `/${locale}`,
      siteName: brand,
      title,
      description,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      images: [{ url: media.og.src, width: media.og.width, height: media.og.height, alt: t('ogAlt') }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: media.og.src, alt: t('ogAlt') }] },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const [messages, t] = await Promise.all([getMessages(), getTranslations('Common')]);
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((namespace) => [namespace, messages[namespace]]));

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      className={`${syne.variable} ${readex.variable} ${newsreader.variable} ${plexMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={motionBootScript} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {t('skipToContent')}
        </a>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

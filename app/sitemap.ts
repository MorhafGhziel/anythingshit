import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteUrl } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(routing.locales.map((locale) => [locale, `${siteUrl}/${locale}`]));
  return routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}

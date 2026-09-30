import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always',
  // Arabic is the brand's default language: `/` always resolves to `/ar`.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeDirection: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  en: 'ltr',
};

/** BCP 47 tags used for metadata, Open Graph and number formatting. */
export const localeTag: Record<Locale, string> = {
  ar: 'ar-SA',
  en: 'en-SA',
};

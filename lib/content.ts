import { business } from '@/content/business';
import type { Locale } from '@/i18n/routing';

export function otherLocale(locale: Locale): Locale {
  return locale === 'ar' ? 'en' : 'ar';
}

export function brandName(locale: Locale): string {
  return business.name[locale];
}

export function whatsappLink(text: string): string {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Whole riyals, Latin digits in both languages. */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(amount);
}

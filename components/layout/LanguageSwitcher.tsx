'use client';

import NextLink from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useActiveSection } from '@/lib/active-section';
import { sectionIds } from '@/content/navigation';

/**
 * Links to the same page in the other language and keeps the visitor's place:
 * the href carries the section currently in view, so `/ar#menu` becomes `/en#menu`.
 */
export function LanguageSwitcher({ className = '', onNavigate }: { className?: string; onNavigate?: () => void }) {
  const locale = useLocale();
  const t = useTranslations('Language');
  const section = useActiveSection();
  const target = locale === 'ar' ? 'en' : 'ar';
  const hash = section && section !== sectionIds.top ? `#${section}` : '';

  return (
    <NextLink
      href={`/${target}${hash}`}
      hrefLang={target}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center font-medium ${className}`}
      onClick={onNavigate}
    >
      <span className="sr-only">{t('label')}: </span>
      <span lang={target} dir={target === 'ar' ? 'rtl' : 'ltr'}>
        {t('targetName')}
      </span>
    </NextLink>
  );
}

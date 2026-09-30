import type { ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { business } from '@/content/business';
import { eclipseAttrs } from '@/content/eclipse';
import { primaryNav, sectionIds } from '@/content/navigation';
import type { Locale } from '@/i18n/routing';
import { brandName, whatsappLink } from '@/lib/content';
import { Mark, Wordmark } from '@/components/brand/Logo';
import { ArrowUpIcon } from '@/components/ui/Icons';
import { LanguageSwitcher } from './LanguageSwitcher';

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-sm opacity-60">{title}</h2>
      <div className="mt-3 grid justify-items-start gap-1">{children}</div>
    </div>
  );
}

/** Last contact: full daylight again, and the name set as wide as the page. */
export function SiteFooter() {
  const t = useTranslations('Footer');
  const th = useTranslations('Header');
  const tc = useTranslations('Common');
  const locale = useLocale() as Locale;
  const brand = brandName(locale);
  return (
    <footer className="stop footer relative overflow-clip pt-24 lg:pt-32" {...eclipseAttrs('footer')}>
      <div className="wrap">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <p className="title lg:col-span-8">{t('closing')}</p>
          <Mark className="footer-sun size-24 justify-self-start lg:col-span-3 lg:col-start-10 lg:size-36 lg:justify-self-end" bead={false} />
        </div>
        <div className="mt-20 grid gap-10 border-t border-current/15 pt-12 sm:grid-cols-3">
          <Column title={t('shop')}>
            {primaryNav.map((item) => (
              <a key={item.section} href={`#${item.section}`} className="nav-link">
                {th(`nav.${item.labelKey}`)}
              </a>
            ))}
          </Column>
          <Column title={t('contact')}>
            <a href={whatsappLink(brand)} className="nav-link" target="_blank" rel="noopener noreferrer">
              WhatsApp<span className="sr-only"> ({tc('newTab')})</span>
            </a>
            <p className="opacity-75">{business.city[locale]}</p>
          </Column>
          <Column title={t('info')}>
            <p className="max-w-[36ch] text-sm opacity-75">{t('sampleNote')}</p>
          </Column>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-current/15 py-6 text-sm opacity-80">
          <p>{t('rights', { year: new Date().getFullYear(), brand })}</p>
          <div className="flex flex-wrap items-center gap-x-6">
            <LanguageSwitcher className="nav-link" />
            <a href={`#${sectionIds.top}`} className="nav-link gap-2">
              {t('backToTop')}
              <ArrowUpIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="wrap -mb-[1%] select-none" aria-hidden="true" data-footer-mark>
        <Wordmark className="footer-word" />
      </div>
    </footer>
  );
}

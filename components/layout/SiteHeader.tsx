'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { primaryNav, sectionIds } from '@/content/navigation';
import { useActiveSection } from '@/lib/active-section';
import { cssVars } from '@/lib/style';
import { Logo } from '@/components/brand/Logo';
import { CloseIcon, MenuIcon } from '@/components/ui/Icons';
import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * A floating bar. Its tone and glass follow the section under it (the eclipse scene sets
 * `data-tone` and `data-glass` as the page scrolls).
 */
export function SiteHeader({ brand, bag }: { brand: string; bag?: ReactNode }) {
  const t = useTranslations('Header');
  const locale = useLocale();
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openMenu = useCallback(() => {
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = 'hidden';
    setMenuOpen(true);
  }, []);
  const closeMenu = useCallback(() => dialogRef.current?.close(), []);
  const onDialogClose = useCallback(() => {
    document.documentElement.style.overflow = '';
    setMenuOpen(false);
  }, []);

  return (
    <header className="site-header" data-tone="light" data-glass="false" data-site-header>
      <div className="wrap header-bar" data-hero-fade="nav">
        <a href={`#${sectionIds.top}`} className="flex min-h-11 items-center" aria-label={t('home', { brand })}>
          <Logo locale={locale} />
        </a>

        <nav aria-label={t('navLabel')} className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {primaryNav.map((item) => (
              <li key={item.section}>
                <a href={`#${item.section}`} className="nav-link" aria-current={active === item.section ? 'location' : undefined}>
                  {t(`nav.${item.labelKey}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher className="nav-link px-2" />
          {bag}
          <button
            type="button"
            className="icon-btn lg:hidden"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={openMenu}
          >
            <MenuIcon />
            <span className="sr-only">{t('openMenu')}</span>
          </button>
        </div>
      </div>

      <dialog ref={dialogRef} id="site-menu" className="menu-dialog pointer-events-auto" aria-label={t('menuTitle')} onClose={onDialogClose}>
        <div className="flex min-h-full flex-col">
          <div className="wrap flex h-[5.5rem] items-center justify-between">
            <a href={`#${sectionIds.top}`} className="flex min-h-11 items-center" onClick={closeMenu} aria-label={t('home', { brand })}>
              <Logo locale={locale} />
            </a>
            <button type="button" className="icon-btn icon-btn-solid" onClick={closeMenu} autoFocus>
              <CloseIcon />
              <span className="sr-only">{t('closeMenu')}</span>
            </button>
          </div>
          <nav aria-label={t('navLabel')} className="wrap mt-8 flex-1">
            <ul>
              {primaryNav.map((item, index) => (
                <li key={item.section} className="menu-item" style={cssVars({ '--i': index })}>
                  <a href={`#${item.section}`} onClick={closeMenu} className="menu-link">
                    <span>{t(`nav.${item.labelKey}`)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="wrap flex items-center justify-between gap-4 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <LanguageSwitcher className="btn btn-line" onNavigate={closeMenu} />
          </div>
        </div>
      </dialog>
    </header>
  );
}

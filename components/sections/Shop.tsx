import { useTranslations } from 'next-intl';
import { categories } from '@/content/catalog';
import { eclipseAttrs } from '@/content/eclipse';
import { sectionIds } from '@/content/navigation';
import type { Locale } from '@/i18n/routing';
import { cssVars } from '@/lib/style';
import { ProductCard } from './ProductCard';
import { ShopBoard } from './ShopBoard';
import type { ReactNode } from 'react';

/** The pieces, by category. Cards are rendered on the server; the board only switches tabs. */
export function Shop({ locale, buy }: { locale: Locale; buy?: (productId: string) => ReactNode }) {
  const t = useTranslations('Shop');
  const board = categories.map((category) => ({
    id: category.id,
    name: category.name[locale],
    intro: category.intro[locale],
    cards: category.products.map((product) => <ProductCard key={product.id} product={product} locale={locale} buy={buy?.(product.id)} />),
  }));

  return (
    <section id={sectionIds.shop} data-section className="stop sec" aria-labelledby="shop-title" {...eclipseAttrs('shop')}>
      <div className="wrap">
        <header className="mb-12 grid items-end gap-6 lg:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow rv">{t('eyebrow')}</p>
            <h2 id="shop-title" className="title rv mt-6" style={cssVars({ '--i': 1 })}>
              {t('title')}
            </h2>
          </div>
          <p className="rv text-sm opacity-70 lg:col-span-4 lg:text-end" style={cssVars({ '--i': 2 })}>
            {t('pricesNote')}
          </p>
        </header>
        <ShopBoard categories={board} tabsLabel={t('tabsLabel')} />
      </div>
    </section>
  );
}

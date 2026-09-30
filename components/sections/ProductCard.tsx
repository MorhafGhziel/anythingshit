import { useTranslations } from 'next-intl';
import type { Product } from '@/content/types';
import type { Locale } from '@/i18n/routing';
import { formatPrice, otherLocale } from '@/lib/content';
import { GarmentArt } from '@/components/ui/GarmentArt';
import type { ReactNode } from 'react';

/** One piece: artwork on its own small eclipse, name, price, stock, and the buy control. */
export function ProductCard({ product, locale, buy }: { product: Product; locale: Locale; buy?: ReactNode }) {
  const t = useTranslations('Shop');
  const tc = useTranslations('Common');
  const other = otherLocale(locale);
  return (
    <article className="card" aria-labelledby={`p-${product.id}`}>
      <div className="card-art">
        <GarmentArt garment={product.garment} tint={product.tint} className="card-garment" />
        <span className="card-left num">{t('left', { count: product.left })}</span>
      </div>
      <div className="card-body">
        <div className="flex items-baseline justify-between gap-4">
          <h4 id={`p-${product.id}`} className="card-name">
            {product.name[locale]}
          </h4>
          <p className="price">
            <span className="num">{formatPrice(product.price)}</span> <small>{tc('currency')}</small>
          </p>
        </div>
        <p className="card-alt" lang={other} dir={other === 'ar' ? 'rtl' : 'ltr'}>
          {product.name[other]} · {product.colour[locale]}
        </p>
        <p className="card-desc">{product.description[locale]}</p>
        {buy}
      </div>
    </article>
  );
}

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { business } from '@/content/business';
import { eclipseAttrs } from '@/content/eclipse';
import { photos } from '@/content/media';
import { sectionIds } from '@/content/navigation';
import type { Locale } from '@/i18n/routing';
import { brandName, whatsappLink } from '@/lib/content';
import { cssVars } from '@/lib/style';
import { ActionLink } from '@/components/ui/ActionLink';
import { WhatsAppIcon } from '@/components/ui/Icons';

const ITEMS = ['kingdom', 'free', 'returns', 'cod'] as const;

/** The light returns: delivery, returns and payment, in the first grey light after totality. */
export function Delivery({ locale }: { locale: Locale }) {
  const t = useTranslations('Delivery');
  return (
    <section id={sectionIds.delivery} data-section className="stop sec" aria-labelledby="delivery-title" {...eclipseAttrs('delivery')}>
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-x-[var(--gutter)]">
        <div className="lg:col-span-6">
          <p className="eyebrow rv">{t('eyebrow')}</p>
          <h2 id="delivery-title" className="title rv mt-6" style={cssVars({ '--i': 1 })}>
            {t('title')}
          </h2>
          <dl className="rv mt-12 grid gap-x-10 gap-y-8 border-t border-current/15 pt-10 sm:grid-cols-2" style={cssVars({ '--i': 2 })}>
            {ITEMS.map((key) => (
              <div key={key}>
                <dt className="text-lg font-semibold">{t(`items.${key}.title`, { amount: business.freeShippingFrom })}</dt>
                <dd className="mt-1 opacity-75">{t(`items.${key}.body`, { shipping: business.shipping })}</dd>
              </div>
            ))}
          </dl>
          <div className="rv mt-10" style={cssVars({ '--i': 3 })}>
            <ActionLink href={whatsappLink(brandName(locale))} external variant="dark" icon={<WhatsAppIcon />}>
              {t('whatsapp')}
            </ActionLink>
          </div>
        </div>
        <div className="delivery-photo rv lg:col-span-5 lg:col-start-8" style={cssVars({ '--i': 2 })}>
          <Image src={photos.returns.src} width={photos.returns.width} height={photos.returns.height} alt={photos.returns.alt[locale]} sizes="(max-width: 1023px) 92vw, 40vw" quality={78} style={{ objectPosition: '50% 50%' }} />
        </div>
      </div>
    </section>
  );
}

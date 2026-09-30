import { useTranslations } from 'next-intl';
import { Mark } from '@/components/brand/Logo';

export default function LocaleNotFound() {
  const t = useTranslations('NotFound');
  return (
    <main id="main" className="grid min-h-svh place-items-center bg-void px-6 text-center text-corona">
      <div className="max-w-xl">
        <Mark className="mx-auto size-24" />
        <h1 className="title mt-10">{t('title')}</h1>
        <p className="lead mx-auto mt-6">{t('body')}</p>
        <a href="./" className="btn btn-light mt-10">
          {t('home')}
        </a>
      </div>
    </main>
  );
}

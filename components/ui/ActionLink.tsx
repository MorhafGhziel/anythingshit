import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

type Variant = 'light' | 'dark' | 'ember' | 'line';

const variantClass: Record<Variant, string> = { light: 'btn-light', dark: 'btn-dark', ember: 'btn-ember', line: 'btn-line' };

/** A link styled as a button. External links open in a new tab and say so to screen readers. */
export function ActionLink({
  href,
  external = false,
  variant = 'light',
  icon,
  className = '',
  children,
}: {
  href: string;
  external?: boolean;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const t = useTranslations('Common');
  return (
    <a href={href} className={`btn ${variantClass[variant]} ${className}`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {icon}
      <span>{children}</span>
      {external ? <span className="sr-only"> ({t('newTab')})</span> : null}
    </a>
  );
}

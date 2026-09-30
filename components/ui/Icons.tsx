import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const;

/** Points in the reading direction; mirrored automatically in RTL. */
export function ArrowForwardIcon({ className = '', ...props }: IconProps) {
  return (
    <svg {...base} {...props} className={`rtl:-scale-x-100 ${className}`}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/** Direction-neutral: never mirrored. */
export function ArrowDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3v10M4 9l4 4 4-4" />
    </svg>
  );
}

/** Direction-neutral: never mirrored. */
export function ArrowUpIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 13V3M4 7l4-4 4 4" />
    </svg>
  );
}

/** "Opens elsewhere" arrow. Mirrored in RTL so it points away from the reading start. */
export function ExternalIcon({ className = '', ...props }: IconProps) {
  return (
    <svg {...base} {...props} className={`rtl:-scale-x-100 ${className}`}>
      <path d="M5 11l6-6M6 5h5v5" />
    </svg>
  );
}


export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} viewBox="0 0 20 20" {...props}>
      <path d="M3 7h14M3 13h14" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} viewBox="0 0 20 20" {...props}>
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} viewBox="0 0 20 20" {...props}>
      <path d="M3.2 16.8l1-3.4A7.3 7.3 0 1 1 7 16.1z" />
      <path d="M7.4 7.2c.2-.6.6-.7.9-.7.3 0 .5.4.8 1.1.1.3 0 .6-.3.9-.2.2-.2.4 0 .7.5.8 1.2 1.4 2 1.9.3.2.5.1.7-.1.3-.3.6-.4.9-.3.6.3 1.2.6 1.2.9 0 .5-.4 1.2-1.3 1.4-.9.2-2.4-.3-3.8-1.6-1.3-1.3-1.9-2.9-1.1-4.2z" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} viewBox="0 0 20 20" {...props}>
      <path d="M10 17.5s5.5-4.9 5.5-9.3a5.5 5.5 0 0 0-11 0c0 4.4 5.5 9.3 5.5 9.3z" />
      <circle cx="10" cy="8.2" r="2" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} viewBox="0 0 20 20" {...props}>
      <path d="M5.6 3.2l2 .3 1 3-1.6 1.1a9 9 0 0 0 5.4 5.4l1.1-1.6 3 1 .3 2c-.1.8-.8 1.4-1.6 1.4A13.3 13.3 0 0 1 4.2 4.8c0-.8.6-1.5 1.4-1.6z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} width={20} height={20} viewBox="0 0 20 20" {...props}>
      <rect x="3" y="3" width="14" height="14" rx="4" />
      <circle cx="10" cy="10" r="3.2" />
      <circle cx="14.2" cy="5.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" {...props}>
      <path d="M5 8h14l-1.2 12H6.2L5 8Z" strokeLinejoin="round" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

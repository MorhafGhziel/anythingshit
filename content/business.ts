import type { Localized } from './types';

/**
 * SAMPLE DATA. «UMBRA» is a working name and the contact details are placeholders (zeros).
 * Replace them before launch.
 */
export const business = {
  name: { ar: 'أمبرا', en: 'UMBRA' } as Localized,
  city: { ar: 'الرياض', en: 'Riyadh' } as Localized,
  whatsapp: '966500000000',
  instagram: null as string | null,
  email: null as string | null,
  /** Free delivery from this subtotal, SAR. */
  freeShippingFrom: 400,
  shipping: 25,
};

/**
 * Drop 01 lands at totality of the total solar eclipse of 2 August 2027 (Jeddah is in the path of totality).
 * PLACEHOLDER TIME: confirm the local contact times with a proper eclipse calculator before announcing.
 */
export const dropAt = '2027-08-02T13:25:00+03:00';

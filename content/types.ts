import type { Locale } from '@/i18n/routing';

/** A string written once per language. */
export type Localized<T = string> = Record<Locale, T>;

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  /** Focal point for `object-position`, e.g. "50% 40%". */
  focus?: string;
}

export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'OS';
export type Garment = 'hoodie' | 'tee' | 'cargo' | 'cap' | 'beanie';

export interface Product {
  id: string;
  name: Localized;
  description: Localized;
  /** SAR, whole riyals. */
  price: number;
  colour: Localized;
  /** Fill colour for the placeholder artwork until the real render exists. */
  tint: string;
  garment: Garment;
  sizes: Size[];
  /** Pieces left in the drop. */
  left: number;
}

export interface Category {
  id: 'hoodies' | 'tees' | 'cargos' | 'caps';
  name: Localized;
  intro: Localized;
  products: Product[];
}

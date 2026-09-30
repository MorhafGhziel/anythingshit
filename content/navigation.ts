export const sectionIds = {
  top: 'top',
  statement: 'shadow',
  drop: 'drop',
  shop: 'shop',
  signature: 'totality-hoodie',
  details: 'details',
  fit: 'fit',
  crowd: 'crowd',
  delivery: 'delivery',
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

export interface NavItem {
  labelKey: 'drop' | 'shop' | 'fit' | 'delivery';
  section: SectionId;
}

export const primaryNav: readonly NavItem[] = [
  { labelKey: 'drop', section: sectionIds.drop },
  { labelKey: 'shop', section: sectionIds.shop },
  { labelKey: 'fit', section: sectionIds.fit },
  { labelKey: 'delivery', section: sectionIds.delivery },
];

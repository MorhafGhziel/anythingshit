import type { Category, Product, Size } from './types';

/**
 * SAMPLE CATALOGUE for Drop 01. Names, descriptions, prices (SAR) and stock are demo values.
 * Every section (shop board, signature piece, fit finder, bag) reads from here.
 */

const APPAREL: Size[] = ['S', 'M', 'L', 'XL', 'XXL'];
const ONE: Size[] = ['OS'];

export const categories: Category[] = [
  {
    id: 'hoodies',
    name: { ar: 'هوديز', en: 'Hoodies' },
    intro: { ar: 'فليس 420 غرام، ثقيل ويمسك شكله.', en: '420 GSM fleece. Heavy, and it keeps its shape.' },
    products: [
      {
        id: 'totality-hoodie',
        name: { ar: 'هودي الكسوف', en: 'Totality Hoodie' },
        description: {
          ar: 'أسود على أسود، قصّة واسعة، كبّوس مزدوج. الخاتم مطرّز بنفس اللون ومعه حبّة جمر وحدة.',
          en: 'Black on black, boxy fit, double-lined hood. A tonal ring on the chest with one ember bead.',
        },
        price: 349,
        colour: { ar: 'أسود الظل', en: 'Umbra black' },
        tint: '#111216',
        garment: 'hoodie',
        sizes: APPAREL,
        left: 120,
      },
      {
        id: 'corona-hoodie',
        name: { ar: 'هودي الهالة', en: 'Corona Hoodie' },
        description: {
          ar: 'فحمي مغسول، والهالة مطرّزة على الظهر بخيط كريمي.',
          en: 'Washed charcoal, with the corona embroidered across the back in cream thread.',
        },
        price: 369,
        colour: { ar: 'فحمي مغسول', en: 'Washed charcoal' },
        tint: '#2b2d33',
        garment: 'hoodie',
        sizes: APPAREL,
        left: 80,
      },
    ],
  },
  {
    id: 'tees',
    name: { ar: 'تيشيرتات', en: 'Tees' },
    intro: { ar: 'قطن 280 غرام، قصّة مربّعة وكم نازل.', en: '280 GSM cotton, boxy, dropped shoulder.' },
    products: [
      {
        id: 'umbra-tee',
        name: { ar: 'تيشيرت أمبرا', en: 'Umbra Tee' },
        description: { ar: 'الأساسي. أسود، ثقيل، بدون أي طباعة.', en: 'The essential. Black, heavy, nothing printed.' },
        price: 149,
        colour: { ar: 'أسود', en: 'Black' },
        tint: '#141519',
        garment: 'tee',
        sizes: APPAREL,
        left: 200,
      },
      {
        id: 'penumbra-tee',
        name: { ar: 'تيشيرت شبه الظل', en: 'Penumbra Tee' },
        description: { ar: 'رمادي فحمي، الظل الخفيف اللي قبل الكلي.', en: 'Charcoal grey: the lighter shadow before totality.' },
        price: 149,
        colour: { ar: 'فحمي', en: 'Charcoal' },
        tint: '#3a3c43',
        garment: 'tee',
        sizes: APPAREL,
        left: 160,
      },
      {
        id: 'diamond-ring-tee',
        name: { ar: 'تيشيرت الخاتم الماسي', en: 'Diamond Ring Tee' },
        description: { ar: 'طباعة كبيرة على الظهر: آخر حبّة ضوء قبل الظلام.', en: 'Large back print: the last bead of light before the dark.' },
        price: 169,
        colour: { ar: 'أسود', en: 'Black' },
        tint: '#0f1014',
        garment: 'tee',
        sizes: APPAREL,
        left: 90,
      },
    ],
  },
  {
    id: 'cargos',
    name: { ar: 'كارغو', en: 'Cargos' },
    intro: { ar: 'قصّة واسعة، وحبل يشدّ الرجل من تحت.', en: 'Wide leg, with a drawcord to cinch the hem.' },
    products: [
      {
        id: 'shadow-cargo',
        name: { ar: 'كارغو الظل', en: 'Shadow Cargo' },
        description: { ar: 'تويل ثقيل، ست جيوب، وقطع معدنية مطفية.', en: 'Heavy twill, six pockets, matte hardware.' },
        price: 329,
        colour: { ar: 'أسود', en: 'Black' },
        tint: '#16171b',
        garment: 'cargo',
        sizes: APPAREL,
        left: 110,
      },
      {
        id: 'night-cargo',
        name: { ar: 'كارغو الليل', en: 'Night Cargo' },
        description: { ar: 'أوسع قصّة عندنا، لون كحلي داكن مثل سما الظهر وقت الكسوف.', en: 'Our widest cut, in the dark navy of a noon sky at totality.' },
        price: 349,
        colour: { ar: 'كحلي الليل', en: 'Night navy' },
        tint: '#151a2a',
        garment: 'cargo',
        sizes: APPAREL,
        left: 70,
      },
    ],
  },
  {
    id: 'caps',
    name: { ar: 'كابات', en: 'Caps' },
    intro: { ar: 'مقاس واحد يناسب الكل.', en: 'One size fits all.' },
    products: [
      {
        id: 'disc-cap',
        name: { ar: 'كاب القرص', en: 'Disc Cap' },
        description: { ar: 'خمس قطع، قرص مطرّز من قدّام، وقفل معدني من ورا.', en: 'Five-panel, embroidered disc on the front, metal clasp at the back.' },
        price: 129,
        colour: { ar: 'أسود', en: 'Black' },
        tint: '#131418',
        garment: 'cap',
        sizes: ONE,
        left: 150,
      },
      {
        id: 'ring-beanie',
        name: { ar: 'بيني الخاتم', en: 'Ring Beanie' },
        description: { ar: 'صوف ميرينو، والخاتم محبوك بنفس اللون.', en: 'Merino knit with a tonal knitted ring.' },
        price: 99,
        colour: { ar: 'فحمي', en: 'Charcoal' },
        tint: '#2e3036',
        garment: 'beanie',
        sizes: ONE,
        left: 130,
      },
    ],
  },
];

export const products: Product[] = categories.flatMap((category) => category.products);

export const signatureId = 'totality-hoodie';

export function findProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export const dropCount = products.length;
export const dropUnits = products.reduce((sum, product) => sum + product.left, 0);

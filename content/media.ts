import type { Photo } from './types';

/**
 * Photographs: frames and stills from the generated campaign (Higgsfield · Kling 3.0). Real customer photos
 * replace the crowd reel later; keep width and height in step with the file.
 */
const photo = (name: string, ar: string, en: string, focus?: string, width = 1800, height = 1013): Photo => ({
  src: `/media/photos/${name}.webp`,
  width,
  height,
  alt: { ar, en },
  focus,
});

export const photos = {
  rooftop: photo('rooftop-ring', 'شاب بهودي أسود يرفع راسه لخاتم الكسوف فوق المدينة', 'A young man in a black hoodie looks up at the eclipse ring over the city', '30% 50%'),
  diamond: photo('diamond-ring', 'شاب بهودي أسود يطالع الخاتم الماسي والأفق أحمر', 'A young man in a black hoodie watches the diamond ring over a red horizon', '35% 50%'),
  towers: photo('towers', 'شاب بالهودي والأبراج مظلمة تحت سما سوداء', 'A hooded figure beside dark towers under a black noon sky', '20% 50%'),
  returns: photo('light-returns', 'الضوء يرجع والسما رمادية والكسوف ما زال فوق', 'The light returning, the sky grey, the eclipse still overhead', '35% 50%', 1800, 1013),
  turned: photo('turned-away', 'شاب يلف ظهره للكاميرا والهودي مرفوع', 'A figure turning away, hood up', '15% 50%'),
  lookingUp: photo('looking-up', 'وجه يطالع لفوق تحت السما السوداء', 'A face turned up to the black sky', '30% 50%'),
  deepening: photo('deepening', 'السما تغمق والكسوف يكتمل فوق المدينة', 'The sky deepening as the eclipse completes over the city', '40% 50%'),
  plaza: photo('plaza', 'شاب بهودي أسود واقف في ساحة بيضا والكسوف فوقه في عزّ الظهر', 'A figure in a black hoodie stands on a pale plaza under the eclipse at noon', '50% 60%'),
  lattice: photo('lattice', 'ظل مشربية يرسم دواير ضوء على الأرض وعلى الهودي', 'A lattice shadow scatters discs of light across the ground and the hoodie', '50% 70%'),
  latticeClose: photo('lattice-close', 'قرب الكارغو الأسود وحبّات الضوء على الأرض', 'Close on black cargos and the discs of light on the ground', '40% 60%'),
  birds: photo('birds', 'طيور تنزل على الساحة وقت الكسوف', 'Birds settling on the plaza as the light drops', '50% 60%'),
  corona: photo('corona', 'هالة الشمس حول القرص الأسود', 'The corona around the black disc', '50% 50%', 840, 840),
} as const;

export type PhotoKey = keyof typeof photos;

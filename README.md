# UMBRA · أمبرا — made for the shadow

A bilingual (Arabic / English) streetwear store built as **one total solar eclipse**. The page opens as the
light drains out of the sky, goes to totality where the shop lives, and ends in full daylight again. The
page's sky blends between stops as you scroll, and an indicator at the bottom slides the moon across the sun.

| Stop | Section |
| --- | --- |
| Partial → totality | **Film**: three generated shots cut into one scroll-scrubbed film, ending on black. |
| Totality | **Statement**: one sentence with pictures in it. |
| Totality | **Drop 01**: countdown to totality, 2 August 2027 (time is a placeholder). |
| Totality | **Shop**: categories as giant outlined tabs; nine sample pieces. |
| Corona | **Details**: stacked cards beside the lattice-shadow film. |
| Third contact | **Crowd**: two reels drifting in opposite directions. |
| Returning light | **Delivery**: shipping, returns, payment. |
| Last contact | **Footer**: daylight, the name as wide as the page. |

Still to come: bag drawer and WhatsApp checkout, the signature-piece turntable, and the fit finder.

## Stack

Next.js 16 · TypeScript · Tailwind CSS 4 · next-intl 4 (`/ar` default, `/en`) · GSAP 3 + ScrollTrigger.
Same architecture as the Sahw site.

```bash
npm install
npm run dev
npm run lint && npm run typecheck && npm run build
```

## Where things live

| Path | What |
| --- | --- |
| `messages/*.json` | All copy, Arabic written in a light Saudi voice. |
| `content/eclipse.ts` | Each section's sky, tone, phase and moon position. |
| `content/catalog.ts` | SAMPLE products, prices (SAR) and stock. |
| `content/business.ts` | SAMPLE contact details and the drop time. |
| `content/site.ts` | Film, posters and loop files (content-hashed names). |
| `components/ui/GarmentArt.tsx` | PLACEHOLDER garment artwork until product renders exist. |
| `lib/motion/` | Eclipse scene (sky, indicator, header) and GSAP scenes. |

Campaign imagery is AI-generated (Higgsfield · Kling 3.0).

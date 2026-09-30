/**
 * Public origin used for canonical URLs, hreflang alternates, the sitemap and Open Graph.
 * PLACEHOLDER until NEXT_PUBLIC_SITE_URL is set to the production domain.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

/**
 * The hero film: three generated shots of the plaza cut together. He stands under the eclipse at noon,
 * the birds settle, then the camera drops as a lattice shadow scatters light across the ground, and the
 * frame fades to black: totality. Every frame is within 8 of a keyframe so scroll can seek almost
 * instantly. File names carry a content hash: /media is cached for a year.
 */
export const media = {
  hero: {
    desktopImage: { src: '/media/hero/film-desktop-poster.0f0ddbc6.webp', width: 1920, height: 1080 },
    mobileImage: { src: '/media/hero/film-mobile-poster.529a7aca.webp', width: 720, height: 1280 },
    desktopFilm: { mp4: '/media/hero/film-desktop.994cf483.mp4', webm: '/media/hero/film-desktop.d650cce9.webm' },
    mobileFilm: { mp4: '/media/hero/film-mobile.95bf71af.mp4', webm: '/media/hero/film-mobile.3c9153fa.webm' },
    duration: 8.54,
  },
  og: { src: '/media/og/og.jpg', width: 1200, height: 630 },
} as const;

/** The corona shot: the camera tilts up from the hood to the corona and the frame goes to stars. */
export const coronaLoop = {
  mp4: '/media/loops/corona.89f522bf.mp4',
  webm: '/media/loops/corona.1e618ee6.webm',
  poster: '/media/loops/corona-poster.7cb1f4f4.webp',
} as const;

/**
 * Public origin used for canonical URLs, hreflang alternates, the sitemap and Open Graph.
 * PLACEHOLDER until NEXT_PUBLIC_SITE_URL is set to the production domain.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

/**
 * The hero film: three generated shots cut together. The first shot plays in reverse, so the light
 * drains out of the sky; the second holds on totality; the third tilts up to the corona and ends on black.
 * Every frame is within 8 of a keyframe so scroll can seek almost instantly. File names carry a
 * content hash: /media is cached for a year, so a changed file must get a new name.
 */
export const media = {
  hero: {
    desktopImage: { src: '/media/hero/film-desktop-poster.eede9e42.webp', width: 1920, height: 1080 },
    mobileImage: { src: '/media/hero/film-mobile-poster.3be1e1e7.webp', width: 720, height: 1280 },
    desktopFilm: { mp4: '/media/hero/film-desktop.4435f0cc.mp4', webm: '/media/hero/film-desktop.2bfeeb9a.webm' },
    mobileFilm: { mp4: '/media/hero/film-mobile.054cf13b.mp4', webm: '/media/hero/film-mobile.bea4ff21.webm' },
    duration: 8.54,
  },
  og: { src: '/media/og/og.jpg', width: 1200, height: 630 },
} as const;

/** The lattice shot: the camera drops as a mashrabiya shadow scatters light across the plaza. */
export const latticeLoop = {
  mp4: '/media/loops/lattice.3f8c8019.mp4',
  webm: '/media/loops/lattice.19f26df7.webm',
  poster: '/media/loops/lattice-poster.e57e843b.webp',
} as const;

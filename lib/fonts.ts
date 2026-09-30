import { IBM_Plex_Mono, Newsreader, Readex_Pro, Syne } from 'next/font/google';

/** Latin display: wide, heavy, set with open tracking for the wordmark and headlines. */
export const syne = Syne({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-syne', display: 'swap' });

/** Arabic display and body in both languages. */
export const readex = Readex_Pro({ subsets: ['arabic', 'latin'], weight: 'variable', variable: '--font-readex', display: 'swap' });

/** English accent: the italic second voice. */
export const newsreader = Newsreader({ subsets: ['latin'], style: ['italic'], weight: '400', variable: '--font-newsreader', display: 'swap' });

/** Numerals and data: prices, countdown, sizes. */
export const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

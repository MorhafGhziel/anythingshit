import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 80],
    localPatterns: [{ pathname: '/media/**', search: '' }],
  },
  async headers() {
    return [
      // Browsers keep /media files for a year without checking back, so a file that changes must get a new
      // name (the hero film carries a content hash: hero-desktop.<hash>.mp4). Never overwrite one in place.
      {
        source: '/media/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

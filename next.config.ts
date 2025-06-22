// import createMDX from '@next/mdx';
import { createContentlayerPlugin } from 'next-contentlayer2';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  // pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: (config: { cache: boolean }) => {
    config.cache = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
});

export default withNextIntl(withContentlayer(nextConfig));

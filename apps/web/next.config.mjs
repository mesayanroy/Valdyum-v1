/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@valdyum/ui-kit',
    '@valdyum/hooks',
    '@valdyum/config',
    '@valdyum/3d-engine',
    '@valdyum/solana-client',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.arweave.net' },
      { protocol: 'https', hostname: '**.ipfs.io' },
    ],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
};

export default nextConfig;

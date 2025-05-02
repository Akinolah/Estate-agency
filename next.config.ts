import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      { // Added for potential YouTube thumbnails or video previews
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      { // Allow images from placeholder domain (used in PropertyCard/Recommendations)
        protocol: 'https',
        hostname: 'your-image-provider.com', // Replace if using a real image provider
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;

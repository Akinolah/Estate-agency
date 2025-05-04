
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Removed TypeScript and ESLint ignore options as they are less relevant for JS
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

module.exports = nextConfig; // Use module.exports for JS

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dynamic Next.js configuration for VPS hosting
  
  // Image optimization enabled
  images: {
    domains: ['forststalstudio.com'], // Add your domain for external images
  },

  // Environment variables
  env: {
    SITE_URL: 'https://forststalstudio.com',
  },

  // Compression for better performance
  compress: true,
  
  // Bundle analyzer for production optimization
  webpack: (config, { isServer }) => {
    return config;
  },
};

export default nextConfig;
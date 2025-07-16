/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Netlify compatibility
  trailingSlash: true,
  // Skip type checking in build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Keep standard distDir
  distDir: '.next',
  // Support Clerk authentication
  images: {
    domains: ['img.clerk.com'],
  }
};

module.exports = nextConfig;

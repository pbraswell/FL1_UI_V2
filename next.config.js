/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    unoptimized: true,
  },
  // Critical for Netlify + Next.js + Clerk compatibility
  output: 'standalone',
};

module.exports = nextConfig;

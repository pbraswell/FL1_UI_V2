/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Skip type checking in build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Support Clerk authentication
  images: {
    domains: ['img.clerk.com'],
    unoptimized: true,
  },
  // Do NOT use export mode - use server components instead
  // This solves the HTML import error and React context issues
};

module.exports = nextConfig;

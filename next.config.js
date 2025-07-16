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
  // Standard settings for Next.js on Netlify
  distDir: '.next',
  // Ensure we're NOT using static export which causes HTML import errors
  // The Netlify Next.js plugin will handle SSR appropriately
  env: {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/sign-in',
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/sign-up',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: '/',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: '/',
  }
};

module.exports = nextConfig;

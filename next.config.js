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
  // Disable static export to force server rendering
  // This is critical for compatibility with Clerk's React context
  distDir: '.next',
  // Explicitly configure Clerk URLs
  env: {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/sign-in',
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/sign-up',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: '/',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: '/',
  }
};

module.exports = nextConfig;

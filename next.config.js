/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure that 404 pages are generated statically
  output: 'standalone',
  // Disable minification for clearer debugging
  swcMinify: process.env.NODE_ENV === 'production',
  // Clerk requires this setting for their auth to work correctly
  images: {
    domains: ['img.clerk.com'],
  },
};

module.exports = nextConfig;

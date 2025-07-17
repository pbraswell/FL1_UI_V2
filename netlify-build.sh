#!/bin/bash
echo "Starting Netlify build script..."

# Don't fail on SWC errors
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production
export SKIP_INSTALL_DEPS=true

# Use Babel transpiler instead of SWC
echo "Configuring to use Babel instead of SWC..."
export DISABLE_SWC=1
export SWCMINIFY=false

# Create a minimal next.config.js backup in case we need it
echo "Creating Next.js config backup..."
cp next.config.js next.config.js.orig 2>/dev/null || true

# Create a simplified next.config.js that works with Clerk
cat > next.config.js << 'EOL'
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
  // Explicitly configure Clerk URLs
  env: {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/sign-in',
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/sign-up',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: '/',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: '/'
  },
  swcMinify: false,
  // Compiler options to avoid SWC
  compiler: {
    styledComponents: false,
  }
};

module.exports = nextConfig;
EOL

# Install all dependencies including TypeScript
echo "Installing all dependencies..."
npm ci

# Install specific versions of required packages
echo "Installing critical dependencies..."
npm install --no-save tailwindcss@3.3.0 postcss@8.4.32 autoprefixer@10.4.16

# Build with increased memory and without SWC
echo "Building with fallback configuration..."
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Exit with build status
BUILD_RESULT=$?
if [ $BUILD_RESULT -eq 0 ]; then
  echo "Build completed successfully!"
else
  echo "Build failed with exit code $BUILD_RESULT"
fi

exit $BUILD_RESULT


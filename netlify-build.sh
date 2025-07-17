#!/bin/bash
echo "Starting Netlify build script..."

# Set Next.js options
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production

# Use Babel transpiler instead of SWC to avoid issues
echo "Configuring to use Babel instead of SWC..."
export DISABLE_SWC=1
export SWCMINIFY=false

# Create a backup of the next.config.js file
echo "Creating Next.js config backup..."
cp next.config.js next.config.js.orig 2>/dev/null || true
if [ -f next.config.ts ]; then
  cp next.config.ts next.config.ts.orig
  echo "Backed up next.config.ts"
fi

# Temporarily move tsconfig.json out of the way for the build
echo "Temporarily moving TypeScript configuration..."
if [ -f tsconfig.json ]; then
  mv tsconfig.json tsconfig.json.backup
  echo "TypeScript config backed up."
fi

# Create a simplified next.config.js for static export
cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
    domains: ['img.clerk.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  env: {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/sign-in',
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/sign-up',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: '/',
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: '/'
  }
};

module.exports = nextConfig;
EOL

# Install ALL dependencies including dev dependencies
echo "Installing all dependencies (including devDependencies)..."
npm ci

# Explicitly install TypeScript and related packages to ensure they're available
echo "Installing TypeScript dependencies explicitly..."
npm install --no-save typescript@5 @types/react@18 @types/node@20 @types/react-dom@18

# Build with Next.js static export
echo "Building with Next.js static export..."
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Check build result
BUILD_STATUS=$?
if [ $BUILD_STATUS -ne 0 ]; then
  echo "Build failed with exit code $BUILD_STATUS"
  # Clean up before exiting
  if [ -f tsconfig.json.backup ]; then
    mv tsconfig.json.backup tsconfig.json
  fi
  if [ -f next.config.js.orig ]; then
    mv next.config.js.orig next.config.js
  fi
  if [ -f next.config.ts.orig ]; then
    mv next.config.ts.orig next.config.ts
  fi
  exit $BUILD_STATUS
fi

# Verify the output directory exists and has content
echo "Verifying output directory..."
if [ ! -d "out" ]; then
  echo "ERROR: Output directory 'out' not found"
  # Clean up before exiting
  if [ -f tsconfig.json.backup ]; then
    mv tsconfig.json.backup tsconfig.json
  fi
  if [ -f next.config.js.orig ]; then
    mv next.config.js.orig next.config.js
  fi
  if [ -f next.config.ts.orig ]; then
    mv next.config.ts.orig next.config.ts
  fi
  exit 1
fi

if [ ! "$(ls -A out 2>/dev/null)" ]; then
  echo "ERROR: Output directory 'out' is empty"
  # Clean up before exiting
  if [ -f tsconfig.json.backup ]; then
    mv tsconfig.json.backup tsconfig.json
  fi
  if [ -f next.config.js.orig ]; then
    mv next.config.js.orig next.config.js
  fi
  if [ -f next.config.ts.orig ]; then
    mv next.config.ts.orig next.config.ts
  fi
  exit 1
fi

echo "Static export generated successfully in 'out' directory"

# Restore the original tsconfig.json
if [ -f tsconfig.json.backup ]; then
  echo "Restoring original TypeScript configuration..."
  mv tsconfig.json.backup tsconfig.json
fi

# Restore original next.config.js if backup exists
if [ -f next.config.js.orig ]; then
  echo "Restoring original Next.js configuration..."
  mv next.config.js.orig next.config.js
fi

# Restore next.config.ts if it existed
if [ -f next.config.ts.orig ]; then
  mv next.config.ts.orig next.config.ts
fi

# Output build result
if [ $BUILD_STATUS -eq 0 ]; then
  echo "Build completed successfully!"
else
  echo "Build failed with exit code $BUILD_STATUS"
fi

exit $BUILD_STATUS


#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status
echo "Starting Netlify build script..."

# Set Next.js options
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production

# Set Node options for more memory
export NODE_OPTIONS="--max-old-space-size=4096"

# Allow SWC to handle Next.js font system
echo "Configuring to use SWC for Next.js font support..."
# DO NOT set DISABLE_SWC=1 as it conflicts with next/font

# Create package.json backup
echo "Creating package.json backup..."
cp package.json package.json.backup

# Modify package.json to move TypeScript dependencies from devDependencies to dependencies
echo "Ensuring TypeScript is in main dependencies..."
node -e '
  const fs = require("fs");
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

  // Dependencies to move
  const depsToMove = [
    "typescript",
    "@types/react",
    "@types/node",
    "@types/react-dom"
  ];

  // Ensure dependencies section exists
  if (!pkg.dependencies) pkg.dependencies = {};

  // Move dependencies from devDependencies to dependencies
  if (pkg.devDependencies) {
    depsToMove.forEach(dep => {
      if (pkg.devDependencies[dep]) {
        pkg.dependencies[dep] = pkg.devDependencies[dep];
      }
    });
  }

  // Make sure the deps exist
  pkg.dependencies.typescript = pkg.dependencies.typescript || "^5.0.0";
  pkg.dependencies["@types/react"] = pkg.dependencies["@types/react"] || "^18.0.0";
  pkg.dependencies["@types/node"] = pkg.dependencies["@types/node"] || "^20.0.0";
  pkg.dependencies["@types/react-dom"] = pkg.dependencies["@types/react-dom"] || "^18.0.0";
  
  // Add Netlify plugin to dependencies
  pkg.dependencies["@netlify/plugin-nextjs"] = pkg.dependencies["@netlify/plugin-nextjs"] || "^5.0.0";

  // Write the modified package.json
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
  console.log("Updated package.json to include TypeScript in main dependencies");
'

# Install dependencies with a clean slate
echo "Cleaning node_modules..."
rm -rf node_modules
rm -rf .next

echo "Installing ALL dependencies..."
npm install

# Create optimized Next.js configuration for standalone mode...
cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['img.clerk.com'],
  },
  swcMinify: true,
  // Use standalone output for Netlify functions approach
  output: 'standalone',
};

module.exports = nextConfig;
EOL

# Do NOT create .babelrc as it conflicts with next/font
echo "Skipping .babelrc creation to allow SWC to handle fonts..."

# Install the Netlify plugin properly since it's enabled in netlify.toml
echo "Installing Netlify plugin properly..."
npm install @netlify/plugin-nextjs@5.11.6 --save

# Verify TypeScript is installed
echo "Verifying TypeScript installation..."
if [ -f "./node_modules/typescript/package.json" ]; then
  echo "TypeScript is properly installed"
  ls -la ./node_modules/typescript
  echo "TypeScript version:"
  node_modules/.bin/tsc --version
else
  echo "TypeScript not found! Installing again directly..."
  npm install typescript@5 --no-save
  npm install @types/react@18 --no-save
  npm install @types/node@20 --no-save
  npm install @types/react-dom@18 --no-save
fi

# Build the application with SSR
echo "Building Next.js application with SSR..."
npm run build

# Check build result
BUILD_STATUS=$?

# Merge back original package.json but keep the plugin
echo "Merging back original package.json while preserving plugin..."
# First, extract the plugin version from current package.json
PLUGIN_VERSION=$(node -e "console.log(require('./package.json').dependencies['@netlify/plugin-nextjs'] || '5.11.6')")

# Now restore the original package.json
mv package.json.backup package.json

# Add the plugin to the restored package.json
echo "Adding Netlify plugin to package.json permanently..."
node -e "const fs=require('fs');const pkg=JSON.parse(fs.readFileSync('./package.json'));pkg.dependencies=pkg.dependencies||{};pkg.dependencies['@netlify/plugin-nextjs']='$PLUGIN_VERSION';fs.writeFileSync('./package.json',JSON.stringify(pkg,null,2));"

# Install plugin again to make sure it's available in node_modules
npm install --no-save

if [ $BUILD_STATUS -ne 0 ]; then
  echo "Build failed with exit code $BUILD_STATUS"
  exit $BUILD_STATUS
fi

# Verify .next directory exists and has content
if [ ! -d ".next" ] || [ ! "$(ls -A .next 2>/dev/null)" ]; then
  echo "ERROR: .next directory missing or empty"
  exit 1
fi

echo "Using Netlify plugin for server-side rendering..."

# List directories to help with debugging
echo "Listing .next directory structure:"
find .next -type d -maxdepth 2 | sort

echo "Build completed successfully!"
exit 0


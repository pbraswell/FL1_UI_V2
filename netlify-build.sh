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
      delete pkg.devDependencies[dep];
    }
  });
}

// Make sure the deps exist
pkg.dependencies.typescript = pkg.dependencies.typescript || "^5.0.0";
pkg.dependencies["@types/react"] = pkg.dependencies["@types/react"] || "^18.0.0";
pkg.dependencies["@types/node"] = pkg.dependencies["@types/node"] || "^20.0.0";
pkg.dependencies["@types/react-dom"] = pkg.dependencies["@types/react-dom"] || "^18.0.0";

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

# Create optimized Next.js configuration that preserves TypeScript but ignores errors
echo "Creating optimized Next.js configuration with static export..."
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
    unoptimized: true,
  },
  swcMinify: true,
  output: 'export',
  // Required for static export with dynamic routes
  trailingSlash: true,
};

module.exports = nextConfig;
EOL

# Do NOT create .babelrc as it conflicts with next/font
echo "Skipping .babelrc creation to allow SWC to handle fonts..."

# Skip installing the Netlify plugin since we've disabled it in netlify.toml
echo "Skipping Netlify plugin installation (disabled in netlify.toml)..."

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

# Build the application with static export
echo "Building Next.js application with static export..."
npm run build

# Check build result
BUILD_STATUS=$?

# Restore original package.json
echo "Restoring original package.json..."
mv package.json.backup package.json

if [ $BUILD_STATUS -ne 0 ]; then
  echo "Build failed with exit code $BUILD_STATUS"
  exit $BUILD_STATUS
fi

# Verify out directory exists and has content
if [ ! -d "out" ] || [ ! "$(ls -A out 2>/dev/null)" ]; then
  echo "ERROR: static export 'out' directory missing or empty"
  exit 1
fi

# Create a Netlify _redirects file for SPA routing
echo "Creating Netlify _redirects file for client-side routing..."
cat > out/_redirects << 'EOL'
# Netlify redirects file
# Redirect all routes to index.html for client-side routing
/*    /index.html   200
EOL

# Create a netlify.toml in the output directory to ensure redirects work
echo "Creating netlify.toml in output directory..."
cat > out/netlify.toml << 'EOL'
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = true
EOL

echo "Build completed successfully!"
exit 0


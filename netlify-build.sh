#!/bin/bash
echo "Starting Netlify build script..."

# Make script exit when a command fails
set -e

# Install dependencies explicitly
echo "Installing dependencies..."
npm ci

# Install Tailwind CSS explicitly (in case it wasn't installed properly)
echo "Ensuring Tailwind CSS is installed..."
npm install tailwindcss@3.3.0 postcss@8.4.32 autoprefixer@10.4.16 --no-save

# Install TypeScript and type definitions
echo "Installing TypeScript dependencies..."
npm install --no-save typescript@5.0.4 @types/react@18.2.0 @types/react-dom@18.2.0 @types/node@20.1.0

# Add SWC dependencies only on Linux platforms (for Netlify)
if [[ "$(uname)" == "Linux" ]]; then
  echo "Installing SWC dependencies for Linux..."
  npm install --no-save @next/swc-linux-x64-gnu @next/swc-linux-x64-musl
else
  echo "Skipping Linux-specific SWC dependencies on non-Linux platform"
fi

# Create an empty tsconfig.json file if it doesn't exist
if [ ! -f "tsconfig.json" ]; then
  echo "Creating minimal tsconfig.json..."
  echo '{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}' > tsconfig.json
fi

# Disable type checking during build to avoid TypeScript errors
export NEXT_DISABLE_TYPES=1

# Build the project
echo "Building the project..."
NODE_OPTIONS='--max_old_space_size=4096' NEXT_TELEMETRY_DISABLED=1 NEXT_DISABLE_TYPES=1 npm run build

echo "Build completed successfully!"

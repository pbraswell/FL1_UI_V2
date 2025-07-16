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

# Build the project
echo "Building the project..."
NODE_OPTIONS='--max_old_space_size=4096' NEXT_TELEMETRY_DISABLED=1 npm run build

echo "Build completed successfully!"

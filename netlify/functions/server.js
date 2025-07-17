// netlify/functions/server.js
// This file routes all requests to the Next.js server

const path = require('path');
const { createRequestHandler } = require('@netlify/next');

const nextDir = path.join(process.cwd(), '.next');

// Create a Next.js request handler that can be used in a Netlify Function
const handler = createRequestHandler({
  dir: nextDir,
});

// Export the handler for Netlify Functions
exports.handler = async (event, context) => {
  // Return a response from Next.js
  return handler(event, context);
};

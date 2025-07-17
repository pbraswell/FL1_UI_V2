// netlify/functions/nextjs-server.js
const { Builder } = require('@netlify/functions');
const path = require('path');

// Use Next.js's built-in server for SSR
const nextPath = path.join(process.cwd(), '.next/standalone');
const nextServer = require(path.join(nextPath, 'server.js'));

// Get the request handler from Next.js's server
const app = nextServer.default;

// Export the Netlify function handler
const handler = async (event) => {
  // Prepare the request object for Next.js
  const request = new Request(event.rawUrl, {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body ? Buffer.from(event.body, 'base64') : undefined,
  });

  // Let Next.js handle the request
  const response = await app.respond(request, {
    waitUntil: Promise.resolve.bind(Promise),
  });

  // Convert Next.js response to Netlify function response
  const responseHeaders = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  const body = await response.text();
  return {
    statusCode: response.status,
    headers: responseHeaders,
    body,
  };
};

// Use the Builder to create an optimized handler for Netlify
exports.handler = Builder(handler);

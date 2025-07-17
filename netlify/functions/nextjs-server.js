// netlify/functions/nextjs-server.js
exports.handler = async (event, context) => {
  const { createServerlessHandler } = await import('@netlify/next');
  
  // Call Next.js serverless handler
  const handler = createServerlessHandler({
    distDir: './.next', // Path to Next.js build output
  });
  
  return handler(event, context);
};

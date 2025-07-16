import { Html, Head, Main, NextScript } from 'next/document';

// This custom document is required to properly handle the HTML import error
// Since the error occurs in prerendering of 404 and 500 pages,
// we need to have a proper _document.js file in the pages directory
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

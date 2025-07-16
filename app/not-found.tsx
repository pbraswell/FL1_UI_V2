// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="mb-8">Sorry, the page you are looking for doesn't exist.</p>
      <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors">
        Return to Home
      </Link>
    </div>
  );
}

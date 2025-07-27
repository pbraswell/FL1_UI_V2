'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, isLoaded, router]);

  // Show a loading state while checking authentication
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-700 text-white">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">
            🛫 Flight Level One
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/dashboard/logbook" className="hover:underline">Logbook</Link>
            <SignOutButton>
              <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-6">
        <h1 className="text-3xl font-bold mb-6">Pilot Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Flights</h2>
            <p className="text-gray-600 mb-4">You have no recent flights recorded.</p>
            <Link 
              href="/dashboard/logbook"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Add a flight →
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Flight Time Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Time:</span>
                <span className="font-medium">0.0 hrs</span>
              </div>
              <div className="flex justify-between">
                <span>PIC Time:</span>
                <span className="font-medium">0.0 hrs</span>
              </div>
              <div className="flex justify-between">
                <span>Instrument Time:</span>
                <span className="font-medium">0.0 hrs</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Currency Status</h2>
            <p className="text-yellow-600 font-medium mb-4">Some currencies may be expiring soon.</p>
            <Link 
              href="/dashboard/currency"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Check all currencies →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import '../../styles/locofy-globals.css';
import '../../locofy-ui-code/src/global.css';
import LocofyDashboardAdapter from '../../components/LocofyDashboardAdapter';

export default function DashboardPage() {
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
    <>
      {/* Use adapter component to render the Locofy dashboard */}
      <LocofyDashboardAdapter />
    </>
  );
}

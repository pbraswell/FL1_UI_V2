'use client';

import { ClerkProvider, useAuth } from '@clerk/nextjs';

// Add SSR options to prevent hydration errors
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
          footerActionLink: 'text-blue-600 hover:text-blue-700'
        }
      }}
    >
      {children}
    </ClerkProvider>
  );
}

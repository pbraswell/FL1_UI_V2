'use client';

import { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';

// Import the Locofy Dashboard component using dynamic import to handle any SSR/CSR compatibility issues
const LocofyDashboard = dynamic(
  () => import('../locofy-ui-code/src/components/Dashboard'),
  { ssr: false } // Disable SSR for this component to avoid hydration issues
);

/**
 * Adapter component that wraps the Locofy Dashboard component for Next.js compatibility
 * This handles any framework-specific differences and ensures proper rendering
 */
const LocofyDashboardAdapter: FunctionComponent = () => {
  return (
    <div style={{ 
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <LocofyDashboard />
    </div>
  );
};

export default LocofyDashboardAdapter;

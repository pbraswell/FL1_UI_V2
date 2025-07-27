// app/page.tsx
import dynamic from "next/dynamic";

// Use dynamic import with SSR disabled to prevent hydration errors with Clerk
const LandingPage = dynamic(() => import("../components/LandingPage"), {
  ssr: false,
});

export default function Home() {
  return <LandingPage />;
}
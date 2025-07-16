'use client';

import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b">
      <h1 className="text-xl font-bold">🛫 Flight Level One</h1>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </header>
  );
}

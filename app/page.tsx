// app/page.tsx
import Link from "next/link";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-8">
        <SignedIn>
          <h1 className="text-2xl font-bold">Welcome, pilot! ✈️</h1>
          <p className="mt-4">You are signed in. Navigate to your dashboard or logbook.</p>
          <SignOutButton>
            <button className="bg-red-500 text-white px-4 py-2 rounded mt-4">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>

        <SignedOut>
          <h1 className="text-2xl font-bold">Flight Level One</h1>
          <p className="mt-4">Please <Link href="/sign-in" className="text-blue-600 underline">sign in</Link> to get started.</p>
        </SignedOut>
      </main>
    </>
  );
}
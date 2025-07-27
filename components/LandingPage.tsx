'use client';

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  
  // Redirect to dashboard if user is already signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, router]);
  
  const onBlogTextClick = useCallback(() => {
    window.open("https://blog.flightlevelone.io", "_blank");
  }, []);

  return (
    <div className={styles.landingPage}>
      <main className={styles.heroFrame}>
        <header className={styles.topHeader}>
          <div className={styles.menu}>
            <Link href="/" className={styles.home}>Home</Link>
            <div className={styles.blog} onClick={onBlogTextClick}>Blog</div>
          </div>
          
          {/* Clerk Authentication UI */}
          <div className={styles.menu}>
            <SignedIn>
              {/* Show user button for signed in users */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
            <SignedOut>
              {/* Show sign in button for signed out users */}
              <SignInButton mode="modal">
                <button className={styles.login}>Login</button>
              </SignInButton>
            </SignedOut>
          </div>
        </header>
        
        <div className="flex flex-col items-center justify-center mt-20 text-white">
          <Image
            className={styles.logoIcon}
            src="/logo@2x.png" 
            alt="Flight Level One Logo"
            width={297}
            height={100}
            priority
          />
          
          <div className="mt-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Flight Level One</h1>
            <p className="text-xl mb-6">Helping pilots fly smarter</p>
            
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg inline-block">
                Go to Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

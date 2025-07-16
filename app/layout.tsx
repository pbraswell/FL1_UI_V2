// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flight Level One",
  description: "Helping pilots fly smarter.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <header className="flex justify-between items-center px-6 py-4 border-b">
            <h1 className="text-xl font-bold">🛫 Flight Level One</h1>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          <main className="p-6">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
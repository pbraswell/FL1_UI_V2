// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flight Level One",
  description: "Helping pilots fly smarter.",
};

// Updated layout with Providers moved to a separate client component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div id="app-container">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
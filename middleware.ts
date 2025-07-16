// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// 👇 This matcher ensures Clerk runs on all routes except static files
export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
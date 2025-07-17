// app/sign-in/[[...rest]]/page.tsx
import { SignIn } from "@clerk/nextjs";

// Required for static export with dynamic routes
export function generateStaticParams() {
  // Generate the common sign-in paths that Clerk might use
  return [
    { rest: [] },           // /sign-in
    { rest: ['factor-one'] },  // /sign-in/factor-one
    { rest: ['factor-two'] },  // /sign-in/factor-two
    { rest: ['verify'] },     // /sign-in/verify
    { rest: ['reset-password'] } // /sign-in/reset-password
  ];
}

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
}
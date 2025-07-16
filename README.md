# ✈️ Flight Level One UI (V2)

Flight Level One is a general aviation proficiency platform designed to help pilots fly smarter and safer using logbook analysis, AI-driven training recommendations, and real-time weather/context alerts.

This repository contains the **Next.js (App Router)** frontend powered by:
- ✅ [Clerk](https://clerk.dev) for authentication
- ✅ TailwindCSS for styling
- ✅ [Locofy.ai](https://locofy.ai) for Figma-to-React UI exports
- ✅ Windsurf IDE with Locofy MCP integration for context-aware development
- ✅ Hosted on Vercel (`main` branch is production)

## 🧠 Development Philosophy
This project uses a **hybrid codegen + human logic** approach:
- Visual layout is defined in **Figma**
- Components are exported via **Locofy → `ui-locofy` branch**
- Logic, auth wrappers, and API integration are layered via **Windsurf → `dev` branch**

## 🧱 Project Structure
```plaintext
/app/                ← Next.js App Router
  └── page.tsx       ← Public landing (SignedIn/SignedOut logic)
  └── sign-in/       ← Clerk UI route
/components/         ← Visual components (mostly Locofy-generated)
/lib/                ← API utils, client hooks
/layout.tsx          ← Global layout + UserButton
/middleware.ts       ← Clerk session middleware
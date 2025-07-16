# ✈️ Flight Level One UI (V2)

**Flight Level One** is a general aviation proficiency platform that helps pilots fly smarter and safer using:
- 🧠 Logbook analysis
- 🎯 AI-generated training plans
- 🌤️ Real-time weather + flight context alerts

This repository contains the **Next.js (App Router)** frontend for **V2** of the platform.

## ✅ Tech Stack
- Framework: Next.js 15 (App Router)
- Styling: TailwindCSS
- Auth: Clerk.dev
- UI Codegen: Locofy (Figma → React)
- IDE: Windsurf + Locofy MCP plug-in
- Deployment: Netlify (via `main` branch)

## 🧠 Development Philosophy
We use a hybrid approach that combines codegen and human-written logic:
- Layouts & components are designed in Figma
- Locofy exports them to the `ui-locofy` branch
- Windsurf is used to wire up business logic in the `dev` branch
- Final production code is merged to `main` and deployed via Netlify

## 🌳 Git Workflow

| Branch        | Purpose                                          |
|---------------|--------------------------------------------------|
| `ui-locofy`   | Auto-generated UI from Figma via Locofy          |
| `dev`         | App logic, Clerk auth, integrations (Windsurf)   |
| `main`        | Stable production code deployed via Netlify      |

Recommended merge strategy:
```bash
# Pull UI updates from Locofy
git checkout dev
git merge ui-locofy --no-ff

# Do your dev work, then...
git checkout main
git merge dev --no-ff
git push origin main
/app/                  → App Router logic
  └── page.tsx         → SignedIn/SignedOut home
  └── sign-in/         → Catch-all Clerk sign-in route
  └── dashboard/       → (Planned) Authenticated pages
  └── layout.tsx       → Global layout, includes <UserButton />

/components/           → Mostly Locofy-generated UI components
/lib/                  → Custom hooks, API utilities
/middleware.ts         → Clerk auth/session middleware

## 📦 Project Structure
```plaintext
/app/                  → App Router logic
  └── page.tsx         → SignedIn/SignedOut home
  └── sign-in/         → Catch-all Clerk sign-in route
  └── dashboard/       → (Planned) Authenticated pages
  └── layout.tsx       → Global layout, includes <UserButton />

/components/           → Mostly Locofy-generated UI components
/lib/                  → Custom hooks, API utilities
/middleware.ts         → Clerk auth/session middleware

Deployment
npm install
npm run dev      # for local dev
npm run build && npm start  # for production build

Deployment:
	•	Live URL: https://app-v2.flightlevelone.io
	•	Deployed from main branch on Netlify
	•	All Clerk DNS records (including email CNAMEs) must be verified

✅ Current Status
	•	✅ Clerk working in local + production
	•	✅ Locofy → Windsurf code pipeline live
	•	✅ Netlify deployment stable
	•	🔜 Next: Build out signed-in dashboard and AI recommendations
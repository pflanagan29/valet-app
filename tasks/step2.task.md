# Step 2 – Auth and Dashboard Shell

## 🔐 Authentication (Frontend + API)
- [x] Create a login form in `/login` route (email/username + password fields)
- [x] On successful login, redirect to `/dashboard`
- [x] Set up cookie/session-based auth (use httpOnly cookies or JWT in cookie)
- [x] Add simple FastAPI route for POST `/login` that:
  - Accepts username/password
  - Returns success + token/cookie (no DB validation yet — use hardcoded dummy creds)
- [x] Add a placeholder `/logout` route (both frontend and backend)
- [x] Protect `/dashboard` route — redirect to `/login` if no auth cookie is found

## 🧱 App Shell Layout
- [x] Create persistent layout using App Router (`app/layout.tsx`)
- [x] Add drawer navigation with links to:
  - `/dashboard` (default landing post-login)
  - `/vehicles` (Active Vehicles)
  - `/settings` (User Settings)
- [x] Add page placeholders with route-based files:
  - `/dashboard/page.tsx` → "Dashboard Overview"
  - `/vehicles/page.tsx` → "Active Vehicles"
  - `/settings/page.tsx` → "Settings"

## 🧪 Test
- [x] Test full login flow: 
  - login → dashboard → nav to pages → logout → back to login
- [x] Ensure protected routes redirect to `/login` if no session present

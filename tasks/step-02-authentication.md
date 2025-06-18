# ✅ Step 2: Authentication & Authorization

## 🐍 Backend Tasks (`apps/api`)
- [x] Install FastAPI dependencies:
  - `fastapi`, `uvicorn`, `python-jose`, `passlib[bcrypt]`, `pydantic`, `sqlalchemy`
- [x] Set up basic User model in `/models/user.py`
- [x] Create Pydantic schemas in `/schemas/user.py`
- [x] Configure database connection in `/db/session.py`
- [x] Implement JWT token generation and verification in `/auth/jwt.py`
- [x] Create `/auth/register` route (user signup)
- [x] Create `/auth/login` route (user login, return JWT)
- [x] Add `/auth/me` route (JWT required, returns user info)
- [x] Add OAuth2PasswordBearer for protected routes
- [x] Add `.env` file(s) for secret keys, DB credentials
- [x] Use `dotenv` support in backend (via `python-dotenv` or similar)

## 🌐 Frontend Tasks (`apps/web`)
- [x] Create login form UI using Tailwind CSS
- [x] Add login logic:
  - [x] Collect username & password
  - [x] Call backend `/auth/login` API
  - [x] Save returned JWT securely (e.g., in memory or HttpOnly cookie)
- [x] Add auth context provider to track user state
- [x] Use middleware (or protected route HOC) to redirect unauthenticated users
- [x] Create basic dashboard page at `/dashboard` with placeholder "Welcome, {username}"
- [x] Add `auth` service in frontend to centralize API calls

## 🛠 Tooling & DX
- [ ] Add `.env` file(s) for secret keys, DB credentials
- [ ] Use `dotenv` support in backend (via `python-dotenv` or similar)

## ✅ Final Check
- [ ] Log in as test user and access protected dashboard route
- [ ] Unauthenticated users redirected back to login
- [ ] Git commit: "Add auth system with JWT and login UI"

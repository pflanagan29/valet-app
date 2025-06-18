# Step 1 – Monorepo Setup and Scaffolding

## ✅ General
- [x] Create a monorepo root with `.gitignore`, `README.md`, and `.editorconfig` (if desired)
- [x] Add separate directories for frontend (`/web`) and backend (`/api`)

## 🖥 Frontend (Next.js with App Router)
- [x] Scaffold a new Next.js app in `/web` with:
  - TypeScript enabled
  - App Router selected
  - ESLint configured
  - Tailwind CSS installed and set up
- [x] Add a `README.md` in `/web` describing setup commands and structure

## 🐍 Backend (FastAPI with uv)
- [x] Run `uv init` in `/api` to initialize the Python environment
- [x] Set up FastAPI project structure (`main.py`, `/app`, etc.)
- [x] Add a placeholder route at `/` that returns JSON: `{"message": "API is running"}`
- [x] Add a `README.md` in `/api` describing uv usage (e.g., `uv pip install`, `uv sync`)

## 🗃 Database
- [x] Create a top-level `.env.example` file with placeholders for PostgreSQL DB config:
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=

## 🧪 Verify
- [x] Ensure both `web` and `api` folders are functional independently via dev commands
- [ ] Commit everything to the monorepo GitHub repo

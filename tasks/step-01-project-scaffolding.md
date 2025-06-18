# ✅ Step 1: Project Scaffolding

## 🧱 Monorepo Structure
- [ ] Create root folder structure:
  - `/apps/web` for the Next.js frontend
  - `/apps/api` for the Python backend
  - `/packages` for any shared libraries (optional)
- [ ] Create `.gitignore`, `README.md`, and LICENSE at root

## 🌐 Frontend Setup (`apps/web`)
- [ ] Scaffold a new Next.js project using the App Router (`npx create-next-app@latest`)
- [ ] Use TypeScript
- [ ] Select App Router
- [ ] Include Tailwind CSS
- [ ] Enable ESLint
- [ ] Move the project into `/apps/web`
- [ ] Add basic home page with "Hello Valet" placeholder

## 🐍 Backend Setup (`apps/api`)
- [ ] Create a Python virtual environment using `uv`
- [ ] Use latest Python version
- [ ] Initialize backend structure:
  - `main.py` for FastAPI entry point
  - `/routers`, `/models`, `/schemas`, `/db`
- [ ] Create a basic `/health` endpoint to test

## 🛠 Tooling
- [ ] Add a root-level `dev` script for easy run:
  ```bash
  # e.g., dev.sh
  cd apps/web && npm run dev
  # In another terminal/tab:
  cd apps/api && uv venv .venv && uv pip install -r requirements.txt && uvicorn main:app --reload

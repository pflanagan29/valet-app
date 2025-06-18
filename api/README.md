# Valet App Backend

The backend API for the Valet App, built with FastAPI and PostgreSQL.

## 🛠 Tech Stack

- FastAPI
- UV package manager
- PostgreSQL
- Python 3.13+

## 📁 Project Structure

```
app/
├── api/            # API routes and endpoints
├── core/           # Core functionality and config
├── models/         # Database models
└── schemas/        # Pydantic schemas
```

## 🚀 Getting Started

1. Create and activate virtual environment:
   ```bash
   uv venv
   source .venv/bin/activate  # On Unix/macOS
   # or
   .venv\Scripts\activate     # On Windows
   ```

2. Install dependencies:
   ```bash
   uv pip install -r requirements.txt
   ```

3. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

4. Open [http://localhost:8000/docs](http://localhost:8000/docs) to view the Swagger documentation

## 📝 Available Commands

- Create virtual environment: `uv venv`
- Install package: `uv pip install <package>`
- Install all requirements: `uv pip install -r requirements.txt`
- Update requirements.txt: `uv pip freeze > requirements.txt`
- Run development server: `uvicorn app.main:app --reload`
- Run production server: `uvicorn app.main:app`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=valet_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
```

## 📚 API Endpoints

- `GET /` - Health check endpoint
- More endpoints coming soon...

from fastapi import FastAPI, HTTPException, Response, Cookie
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import jwt
from datetime import datetime, timedelta
from .api.vehicles import router as vehicles_router

app = FastAPI(
    title="Valet App API",
    description="Backend API for the Valet Parking Management System",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3005"],  # Updated Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Secret key for JWT token (in production, use environment variable)
SECRET_KEY = "your-secret-key-here"
ALGORITHM = "HS256"

# Hardcoded credentials for development
DUMMY_USER = {
    "username": "admin",
    "password": "password123"
}

class LoginRequest(BaseModel):
    username: str
    password: str

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> bool:
    try:
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return True
    except jwt.ExpiredSignatureError:
        return False
    except jwt.JWTError:
        return False

# Include routers
app.include_router(vehicles_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Valet App API"}

@app.get("/check-session")
async def check_session(session: Optional[str] = Cookie(None)):
    """Check if the current session is valid"""
    if not session:
        raise HTTPException(status_code=401, detail="No session cookie found")
    
    if not verify_token(session):
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    
    return {"message": "Session is valid"}

@app.get("/login")
async def get_login():
    """Handle GET requests to /login - returns 405 with a helpful message"""
    raise HTTPException(
        status_code=405,
        detail="GET method not allowed. Please use POST for login requests."
    )

@app.post("/login")
async def login(login_data: LoginRequest, response: Response):
    if (login_data.username == DUMMY_USER["username"] and 
        login_data.password == DUMMY_USER["password"]):
        
        access_token = create_access_token(
            data={"sub": login_data.username},
            expires_delta=timedelta(minutes=30)
        )
        
        # Set HTTP-only cookie with SameSite attribute
        response.set_cookie(
            key="session",
            value=access_token,
            httponly=True,
            secure=False,  # Set to True in production with HTTPS
            samesite="lax",
            max_age=1800  # 30 minutes
        )
        
        return {"message": "Login successful"}
    
    raise HTTPException(
        status_code=401,
        detail="Invalid credentials"
    )

@app.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="session")
    return {"message": "Logout successful"} 
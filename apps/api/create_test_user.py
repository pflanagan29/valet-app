from passlib.context import CryptContext
import asyncpg
import asyncio
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_test_user():
    # Database connection
    conn = await asyncpg.connect(
        user="postgres",
        password="password",
        database="valet_db",
        host="localhost",
        port="5432"
    )
    
    try:
        # Hash the password
        hashed_password = pwd_context.hash("testpassword")
        
        # Insert test user
        await conn.execute('''
            INSERT INTO users (username, email, hashed_password, is_active)
            VALUES ($1, $2, $3, $4)
        ''', 'testuser', 'test@example.com', hashed_password, True)
        
        print("Test user created successfully!")
        print("Username: testuser")
        print("Password: testpassword")
        print("Email: test@example.com")
    except Exception as e:
        print(f"Error creating test user: {e}")
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(create_test_user()) 
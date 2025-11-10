from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./db_apiweb.db") # la BD del proyecto
ALLOWED_ORIGINS: List[str] = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

# Configuraciones de JWT
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# Configuraciones de Rate Limiting
RATE_LIMIT_DEFAULT = os.getenv("RATE_LIMIT_DEFAULT", "1000/hour")
RATE_LIMIT_AUTH_PER_MIN = os.getenv("RATE_LIMIT_AUTH_PER_MIN", "5/minute")
RATE_LIMIT_API_PER_MIN = os.getenv("RATE_LIMIT_API_PER_MIN", "60/minute")
RATE_LIMIT_BURST = os.getenv("RATE_LIMIT_BURST", "10/second")

if not SECRET_KEY:
    raise ValueError("No se ha definido SECRET_KEY en el entorno (archivo .env)")
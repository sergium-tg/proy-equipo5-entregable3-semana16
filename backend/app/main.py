from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import ALLOWED_ORIGINS, RATE_LIMIT_DEFAULT
from app.api.routes import clientes as clientes_router
from app.api.routes import ordenes as ordenes_router
from app.api.routes import tecnicos as tecnicos_router
from app.api.routes import articulos as articulos_router
from app.api.routes import mantenimientos as mantenimientos_router
from app.api.routes import ventas as ventas_router
from app.api.routes import auth as auth_router
from app.db.session import engine, Base
import app.models.models

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware


app = FastAPI(title="Proyecto Api Web_v1", version="1.1.0")

# Configuracion de Rate Limiter
limiter = Limiter(key_func=get_remote_address, default_limits=[RATE_LIMIT_DEFAULT])
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["ApiWeb"])
def root():
    return {"Carga inicial de Apiweb"}

app.include_router(auth_router.router)
app.include_router(clientes_router.router)
app.include_router(ordenes_router.router)
app.include_router(tecnicos_router.router)
app.include_router(articulos_router.router)
app.include_router(mantenimientos_router.router)
app.include_router(ventas_router.router)
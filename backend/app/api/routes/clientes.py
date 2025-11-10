from fastapi import APIRouter, status, Response, Query, Depends
from typing import List
from app.models.schemas import Cliente, ClienteCreate, ClienteUpdate
from app.services.clientes import ClienteService
from app.models import schemas
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.auth import AuthService

router = APIRouter(prefix="/clientes", tags=["clientes"])

@router.post("/", response_model=Cliente, status_code=201)
def crear_clientes(payload: ClienteCreate, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)):
    return ClienteService.crea_clientes(db, payload)

@router.get("/todos/", response_model=List[schemas.Cliente])
def listar_todos(db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> List[schemas.Cliente]:
    return ClienteService.lista_todos(db)

@router.get("/{cliente_id}", response_model=schemas.Cliente)
def buscar_id(cliente_id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> schemas.Cliente:
    return ClienteService.busca_id(db, cliente_id)

@router.get("/", response_model=List[schemas.Cliente])
def buscar_clientes(
    response: Response,
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario),
    q: int | str | None = Query(None, description="Palabra clave a buscar del CLIENTE"),
    sort: str = Query("nombre", regex="^(nombre|apellido|correo)$", description="Ordenar por: nombre | apellido | correo"),
    order: str = Query("asc", regex="^(asc|desc)$", description="Forma de ordenar: asc | desc"),
    offset: int = Query(0, ge=0, description="Inicio de los resultados"),
    limit: int = Query(10, ge=1, le=100, description="Número máximo de resultados a retornar"),
) -> List[schemas.Cliente]:
    results, total = ClienteService.busca_clientes(db, q, sort, order, offset, limit)
    response.headers["X-Total-Clientes"] = str(total)
    return results

@router.put("/{cliente_id}", response_model=Cliente, status_code=200)
def actualizar_clientes(cliente_id: int, payload: ClienteUpdate, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)):
    return ClienteService.actualiza_clientes(db, cliente_id, payload)

@router.delete("/{cliente_id}", response_model=None, status_code=204)
def eliminar_clientes(cliente_id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)):
    return ClienteService.elimina_clientes(db, cliente_id)
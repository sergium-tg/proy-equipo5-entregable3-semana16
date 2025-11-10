from fastapi import APIRouter, Response, Query, status, Depends
from typing import List
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models import schemas
from app.services.tecnicos import TecnicoService
from app.services.auth import AuthService

router = APIRouter(prefix="/tecnicos", tags=["tecnicos"])

@router.post("/", response_model=schemas.Tecnico, status_code=status.HTTP_201_CREATED)
def crear_tecnico(payload: schemas.TecnicoCreate, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> schemas.Tecnico:
    return TecnicoService.crea_tecnico(db, payload)

@router.get("/todos/", response_model=List[schemas.Tecnico])
def listar_todos(db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> List[schemas.Tecnico]:
    return TecnicoService.lista_todos(db)

@router.get("/{id_tecnico}", response_model=schemas.Tecnico)
def buscar_id(id_tecnico: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> schemas.Tecnico:
    return TecnicoService.busca_id(db, id_tecnico)

@router.get("/", response_model=List[schemas.Tecnico])
def buscar_tecnicos(
    response: Response,
    q: str | None = Query(None, description="Palabra clave a buscar del TECNICO"),
    sort: str = Query("apellido", regex="^(nombre|apellido|especialidad)$", description="Ordenar por: nombre | apellido | especialidad"),
    order: str = Query("asc", regex="^(asc|desc)$", description="Forma de ordenar: asc | desc"),
    offset: int = Query(0, ge=0, description="Inicio de los resultados"),
    limit: int = Query(10, ge=1, le=100, description="Cantidad de resultados por página"),
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> List[schemas.Tecnico]:
    results, total = TecnicoService.busca_tecnicos(db, q, sort, order, offset, limit)
    response.headers["X-Total-Tecnicos"] = str(total)
    return results

@router.get("/{id_tecnico}/mantenimientos/", response_model=List[schemas.Mantenimiento])
def listar_mantenimientos(
    id_tecnico: int, 
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> List[schemas.Mantenimiento]:
    return TecnicoService.lista_mantenimientos(db, id_tecnico)

@router.put("/{id_tecnico}", response_model=schemas.Tecnico)
def actualizar_tecnico(id_tecnico: int, tecnico_data: schemas.TecnicoUpdate, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> schemas.Tecnico:
    return TecnicoService.actualiza_tecnico(db, id_tecnico, tecnico_data)

@router.delete("/{id_tecnico}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_tecnico(id_tecnico: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> Response:
    TecnicoService.elimina_tecnico(db, id_tecnico)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
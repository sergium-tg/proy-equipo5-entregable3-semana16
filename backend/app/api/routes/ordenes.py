from fastapi import APIRouter, status, Response, Query, Depends
from typing import List, Literal
from app.models.schemas import Orden, CrearOrden, UpdateOrden
from app.services.ordenes import OrdenService
from app.models import schemas
from sqlalchemy.orm import Session
from app.db.session import get_db
from datetime import datetime
from app.services.auth import AuthService

router = APIRouter(prefix="/ordenes", tags=["ordenes"])

@router.post("/", response_model=Orden, status_code=status.HTTP_201_CREATED)
def crear_ordenes(payload: CrearOrden, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)):
    return OrdenService.crea_ordenes(db, payload)

@router.get("/todos/", response_model=List[schemas.Orden])
def listar_todos(db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> List[schemas.Orden]:
    return OrdenService.lista_todos(db)

@router.get("/{consecutivo}", response_model=schemas.Orden)
def buscar_consecutivo(consecutivo: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> schemas.Orden:
    return OrdenService.busca_consecutivo(db, consecutivo)

@router.get("/tipo/{tipo_orden}", response_model=List[schemas.Orden])
def listar_por_tipo(
    tipo_orden: Literal["solo Ventas", "solo Mantenimientos", "Mantenimiento con ventas"],
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> List[schemas.Orden]:
    return OrdenService.lista_por_tipo(db, tipo_orden)

@router.get("/rango/fechas/", response_model=List[schemas.Orden])
def listar_rango_fechas(
    fecha_inicio: datetime = Query(..., description="Digine una fecha inicial para la busqueda"),
    fecha_fin: datetime = Query(..., description="Digine una fecha final para la busqueda"),
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> List[schemas.Orden]:
    return OrdenService.lista_rango_fechas(db, fecha_inicio, fecha_fin)

@router.get("/cliente/{cliente_id}", response_model=List[schemas.Orden])
def listar_clientes(cliente_id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> List[schemas.Orden]:
    return OrdenService.lista_clientes(db, cliente_id)

@router.put("/{consecutivo}", response_model=Orden, status_code=status.HTTP_200_OK)
def actualizar_ordenes(consecutivo: int, payload: UpdateOrden, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)):
    return OrdenService.actualiza_ordenes(db, consecutivo, payload)

@router.delete("/{consecutivo}", response_model=None, status_code=status.HTTP_204_NO_CONTENT)
def eliminar_ordenes(consecutivo: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)):
    return OrdenService.elimina_ordenes(db, consecutivo)
from fastapi import APIRouter, Response, status, Depends, Query
from typing import List, Dict
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models import schemas
from app.services.ventas import VentaService
from datetime import datetime
from app.services.auth import AuthService

router = APIRouter(prefix="/ventas", tags=["ventas"])

@router.post("/", response_model=schemas.Venta, status_code=status.HTTP_201_CREATED)
def crear_venta(payload: schemas.VentaCreate, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> schemas.Venta:
    return VentaService.crea_venta(db, payload)

@router.get("/todos/", response_model=List[schemas.Venta])
def listar_todos(db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> List[schemas.Venta]:
    return VentaService.lista_todos(db)

@router.get("/{venta_numero}", response_model=schemas.Venta)
def buscar_numero(venta_numero: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> schemas.Venta:
    return VentaService.busca_numero(db, venta_numero)

@router.get("/rango/fechas/", response_model=List[schemas.Venta])
def listar_rango_fechas(
    fecha_inicio: datetime = Query(..., description="Digine una fecha inicial para la busqueda"),
    fecha_fin: datetime = Query(..., description="Digine una fecha final para la busqueda"),
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> List[schemas.Venta]:
    return VentaService.lista_rango_fechas(db, fecha_inicio, fecha_fin)

@router.put("/{venta_numero}", response_model=schemas.Venta)
def actualizar_venta(venta_numero: int, venta_datos: schemas.VentaUpdate, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> schemas.Venta:
    return VentaService.actualiza_venta(db, venta_numero, venta_datos)

@router.delete("/{venta_numero}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_venta(venta_numero: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> Response:
    VentaService.elimina_venta(db, venta_numero)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


####### Logica con entidades asociadas 

@router.post("/{numero_venta}/articulos/", response_model=schemas.VentaArticulo, status_code=status.HTTP_201_CREATED)
def asignar_articulo(
    numero_venta: int,
    payload: schemas.ArticuloVentaPayload,
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> schemas.VentaArticulo:
    service_payload = schemas.VentaArticuloCreate(
        numero_venta=numero_venta,
        id_articulo=payload.id_articulo,
        cantidad=payload.cantidad
    )
    return VentaService.asigna_articulo(db, service_payload)

@router.get("/{numero_venta}/articulos/", response_model=List[Dict])
def listar_articulos(
    numero_venta: int, 
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> List[Dict]:
    return VentaService.lista_articulos(db, numero_venta)

@router.put("/{numero_venta}/articulos/{id_articulo}", response_model=schemas.VentaArticulo)
def actualizar_articulo(
    numero_venta: int,
    id_articulo: int,
    payload: schemas.VentaArticuloUpdate,
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> schemas.VentaArticulo:
    return VentaService.actualiza_articulo(db, numero_venta, id_articulo, payload)

@router.delete("/{numero_venta}/articulos/{id_articulo}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_articulo(
    numero_venta: int, 
    id_articulo: int, 
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> Response:
    VentaService.quita_articulo(db, numero_venta, id_articulo)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
from fastapi import APIRouter, Response, Query, status, Depends
from typing import List, Literal, Dict
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models import schemas
from app.services.articulos import ArticuloService
from app.services.auth import AuthService

router = APIRouter(prefix="/articulos", tags=["articulos"])

@router.post("/", response_model=schemas.Articulo, status_code=status.HTTP_201_CREATED)
def crear_articulo(
    payload: schemas.ArticuloCreate, 
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> schemas.Articulo:
    return ArticuloService.crea_articulo(db, payload)

@router.get("/todos/", response_model=List[schemas.Articulo])
def listar_todos(db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> List[schemas.Articulo]:
    return ArticuloService.lista_todos(db)

@router.get("/{id_articulo}", response_model=schemas.Articulo)
def buscar_id(
    id_articulo: int, 
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> schemas.Articulo:
    return ArticuloService.busca_id(db, id_articulo)

@router.get("/", response_model=List[schemas.Articulo])
def buscar_articulos(
    response: Response,
    q: str | None = Query(None, description="Palabra clave a buscar del ARTICULO"),
    sort: str = Query("nombre", regex="^(nombre|descripcion)$", description="Ordenar por: nombre | descripcion"),
    order: str = Query("asc", regex="^(asc|desc)$", description="Forma de ordenar: asc | desc"),
    offset: int = Query(0, ge=0, description="Inicio de los resultados"),
    limit: int = Query(10, ge=1, le=100, description="Cantidad de resultados por página"),
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> List[schemas.Articulo]:
    results, total = ArticuloService.busca_articulos(db, q, sort, order, offset, limit)
    response.headers["X-Total-Articulos"] = str(total)
    return results

@router.get("/existencia/{disponibilidad}", response_model=List[schemas.Articulo])
def listar_por_existencia(
    disponibilidad: Literal["disponible", "no disponible"],
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> List[schemas.Articulo]:
    return ArticuloService.lista_por_existencia(db, disponibilidad)

@router.get("/{id_articulo}/ventas/", response_model=List[Dict])
def listar_ventas(
    id_articulo: int, 
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> List[Dict]:
    return ArticuloService.lista_ventas(db, id_articulo)

@router.put("/{id_articulo}", response_model=schemas.Articulo)
def actualizar_articulo(
    id_articulo: int, 
    articulo_data: schemas.ArticuloUpdate, 
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> schemas.Articulo:
    return ArticuloService.actualiza_articulo(db, id_articulo, articulo_data)

@router.delete("/{id_articulo}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_articulo(
    id_articulo: int, 
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> Response:
    ArticuloService.elimina_articulo(db, id_articulo)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
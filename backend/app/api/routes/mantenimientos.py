from fastapi import APIRouter, Response, Query, status, Depends
from typing import List, Literal
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models import schemas
from app.services.mantenimientos import MantenimientoService
from datetime import datetime
from app.services.auth import AuthService

router = APIRouter(prefix="/mantenimientos", tags=["mantenimientos"])

@router.post("/", response_model=schemas.Mantenimiento, status_code=status.HTTP_201_CREATED)
def crear_mantenimiento(payload: schemas.MantenimientoCreate, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> schemas.Mantenimiento:
    return MantenimientoService.crea_mantenimiento(db, payload)

@router.get("/todos/", response_model=List[schemas.Mantenimiento])
def listar_todos(db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> List[schemas.Mantenimiento]:
    return MantenimientoService.lista_todos(db)

@router.get("/numero/{mto_numero}", response_model=schemas.Mantenimiento)
def buscar_numero(mto_numero: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> schemas.Mantenimiento:
    return MantenimientoService.busca_numero(db, mto_numero)

@router.get("/", response_model=List[schemas.Mantenimiento])
def buscar_mantenimientos(
    response: Response,
    q: str | None = Query(None, description="Palabra clave a buscar del MANTENIMIENTO"),
    sort: str = Query("descripcion", regex="^(descripcion)$", description="Ordenar por: descripcion"),
    order: str = Query("asc", regex="^(asc|desc)$", description="Forma de ordenar: asc | desc"),
    offset: int = Query(0, ge=0, description="Inicio de los resultados"),
    limit: int = Query(10, ge=1, le=100, description="Número máximo de resultados a retornar"),
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> List[schemas.Mantenimiento]:
    results, total = MantenimientoService.busca_mantenimientos(db, q, sort, order, offset, limit)
    response.headers["X-Total-Mantenimientos"] = str(total)
    return results

@router.get("/tipo/{tipo_mto}", response_model=List[schemas.Mantenimiento])
def listar_por_tipo(tipo_mto: Literal["Correctivo", "Preventivo"], db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> List[schemas.Mantenimiento]:
    return MantenimientoService.lista_por_tipo(db, tipo_mto)
    
@router.get("/orden/{consecutivo_orden}", response_model=List[schemas.Mantenimiento])
def listar_orden(consecutivo_orden: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> List[schemas.Mantenimiento]:
    return MantenimientoService.lista_orden(db, consecutivo_orden)

@router.get("/rango/fechas/", response_model=List[schemas.Mantenimiento])
def listar_rango_fechas(
    fecha_inicio: datetime = Query(..., description="Digine una fecha inicial para la busqueda"),
    fecha_fin: datetime = Query(..., description="Digine una fecha final para la busqueda"),
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> List[schemas.Mantenimiento]:
    return MantenimientoService.lista_rango_fechas(db, fecha_inicio, fecha_fin)

@router.put("/{mto_numero}", response_model=schemas.Mantenimiento)
def actualizar_mantenimiento(mto_numero: int, mto_data: schemas.MantenimientoUpdate, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> schemas.Mantenimiento:
    return MantenimientoService.actualiza_mantenimiento(db, mto_numero, mto_data)

@router.delete("/{mto_numero}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_mantenimiento(mto_numero: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)) -> Response:
    MantenimientoService.elimina_mantenimiento(db, mto_numero)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


####### Logica con entidades asociadas 


@router.post("/{numero_mto}/tecnicos/{id_tecnico}", response_model=schemas.MtoTecnico, status_code=status.HTTP_201_CREATED)
def asignar_tecnico(
    numero_mto: int, 
    id_tecnico: int, 
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> schemas.MtoTecnico:
    return MantenimientoService.asigna_tecnico(db, numero_mto, id_tecnico)

@router.get("/{numero_mto}/tecnicos/", response_model=List[schemas.Tecnico])
def listar_tecnicos(
    numero_mto: int, 
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> List[schemas.Tecnico]:
    return MantenimientoService.lista_tecnicos(db, numero_mto)

@router.put("/{numero_mto}/tecnicos/{id_tecnico_antiguo}", response_model=schemas.MtoTecnico)
def actualizar_tecnico(
    numero_mto: int,
    id_tecnico_antiguo: int,
    payload: schemas.MtoTecnicoUpdate,
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> schemas.MtoTecnico:
    return MantenimientoService.actualiza_tecnico(db, numero_mto, id_tecnico_antiguo, payload)

@router.delete("/{numero_mto}/tecnicos/{id_tecnico}", status_code=status.HTTP_204_NO_CONTENT)
def quitar_tecnico(
    numero_mto: int, 
    id_tecnico: int, 
    db: Session = Depends(get_db), current_user: schemas.User = Depends(AuthService.revisa_usuario)
) -> Response:
    MantenimientoService.quita_tecnico(db, numero_mto, id_tecnico)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
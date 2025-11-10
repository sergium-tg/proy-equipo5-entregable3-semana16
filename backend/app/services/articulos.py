from fastapi import HTTPException, status
from typing import List, Tuple, Literal, Dict
from sqlalchemy.orm import Session
from app.models import schemas, models
from app.services.busqueda import busca_ordena

class ArticuloService:
    @staticmethod
    def crea_articulo(db: Session, payload: schemas.ArticuloCreate) -> models.Articulo:
        db_item = db.get(models.Articulo, payload.id)
        if db_item:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="ARTICULO ya existe en la BD")
        
        db_item = models.Articulo(**payload.model_dump())
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item

    @staticmethod
    def lista_todos(db: Session) -> List[models.Articulo]:
        resultados = db.query(models.Articulo).all()
        if not resultados:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron articulos")
        return resultados

    @staticmethod
    def busca_id(db: Session, articulo_id: int) -> models.Articulo:
        db_item = db.get(models.Articulo, articulo_id)
        if not db_item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Articulo con ID: '{articulo_id}' no encontrado")
        return db_item
    
    @staticmethod
    def busca_articulos(db: Session, q: str | None, sort: str, order: str, offset: int, limit: int) -> Tuple[List[models.Articulo], int]:
        all_items_list = db.query(models.Articulo).all()
        items_dict = {item.id: schemas.Articulo.model_validate(item) for item in all_items_list}
  
        resultados, total = busca_ordena(
            items_dict=items_dict,
            q=q,
            search_fields=["nombre", "descripcion"],
            sort=sort,
            order=order,
            offset=offset,
            limit=limit
        )

        ids_retorno = [item.id for item in resultados]
        modelos_retorno = db.query(models.Articulo).filter(models.Articulo.id.in_(ids_retorno)).all()
        
        model_map = {model.id: model for model in modelos_retorno}
        modelos_ordenados = [model_map[id_val] for id_val in ids_retorno if id_val in model_map]
        
        return modelos_ordenados, total

    @staticmethod
    def lista_por_existencia(db: Session, disponibilidad: Literal["disponible", "no disponible"]) -> List[models.Articulo]:
        existencia_bool = True if disponibilidad == "disponible" else False
        
        resultados = db.query(models.Articulo).filter(models.Articulo.existencia == existencia_bool).all()
        
        if not resultados:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No se encontraron articulos con existencia='{disponibilidad}'")
        
        return resultados

    @staticmethod
    def lista_ventas(db: Session, id_articulo: int) -> List[Dict]:

        if not db.get(models.Articulo, id_articulo):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Articulo con ID: '{id_articulo}' NO fue encontrado")
        
        asignaciones = db.query(models.VentaArticulo)\
            .join(models.Venta)\
            .filter(models.VentaArticulo.id_articulo == id_articulo)\
            .all()

        if not asignaciones:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontró Ventas para ese Articulo")
            
        ventas_asignados = []
        for item in asignaciones:
            venta_schema = schemas.Venta.model_validate(item.venta)
            asignacion_schema = schemas.VentaArticulo.model_validate(item)
            
            ventas_asignados.append({
                "venta": venta_schema.model_dump(),
                "asignacion": asignacion_schema.model_dump()
            })
            
        return ventas_asignados

    @staticmethod
    def actualiza_articulo(db: Session, articulo_id: int, articulo_datos: schemas.ArticuloUpdate) -> models.Articulo:
        db_item = db.get(models.Articulo, articulo_id)
        if not db_item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Articulo con ID: '{articulo_id}' NO fue encontrado")
        
        dato = articulo_datos.model_dump(exclude_unset=True) 
        
        if not dato:
            return db_item

        is_modified = False
        for key, value in dato.items():
            if getattr(db_item, key) != value:
                setattr(db_item, key, value)
                is_modified = True
        
        if is_modified:
            db.commit()
            db.refresh(db_item)
        
        return db_item


    @staticmethod
    def elimina_articulo(db: Session, articulo_id: int) -> None:
        db_item = db.get(models.Articulo, articulo_id)
        if not db_item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="ARTICULO no encontrado en la BD")
        
        tiene_asignaciones = db.query(models.VentaArticulo).filter(models.VentaArticulo.id_articulo == articulo_id).first()
        if tiene_asignaciones:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No se puede eliminar el ARTICULO porque tiene VENTAS asignados.")
            
        db.delete(db_item)
        db.commit()
        return None
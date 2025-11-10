from fastapi import HTTPException, status
from typing import List, Tuple, Dict
from sqlalchemy.orm import Session
from app.models import schemas, models
from app.services.busqueda import busca_ordena

class TecnicoService:
    @staticmethod
    def crea_tecnico(db: Session, payload: schemas.TecnicoCreate) -> models.Tecnico:
        db_tecnico = db.get(models.Tecnico, payload.id)
        if db_tecnico:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="TECNICO ya existe en la BD")
        
        db_tecnico = models.Tecnico(**payload.model_dump())
        db.add(db_tecnico)
        db.commit()
        db.refresh(db_tecnico)
        return db_tecnico

    @staticmethod
    def lista_todos(db: Session) -> List[models.Tecnico]:
        resultados = db.query(models.Tecnico).all()
        if not resultados:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron técnicos")
        return resultados

    @staticmethod
    def busca_id(db: Session, tecnico_id: int) -> models.Tecnico:
        db_tecnico = db.get(models.Tecnico, tecnico_id)
        if not db_tecnico:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Técnico con ID: '{tecnico_id}' no encontrado")
        return db_tecnico

    @staticmethod
    def busca_tecnicos(db: Session, q: str | None, sort: str, order: str, offset: int, limit: int) -> Tuple[List[models.Tecnico], int]:
        all_items_list = db.query(models.Tecnico).all()
        items_dict = {item.id: schemas.Tecnico.model_validate(item) for item in all_items_list}
        
        resultados, total = busca_ordena(
            items_dict=items_dict,
            q=q,
            search_fields=["nombre", "apellido", "especialidad"],
            sort=sort,
            order=order,
            offset=offset,
            limit=limit
        )

        ids_retorno = [item.id for item in resultados]
        modelos_retorno = db.query(models.Tecnico).filter(models.Tecnico.id.in_(ids_retorno)).all()
        
        model_map = {model.id: model for model in modelos_retorno}
        modelos_ordenados = [model_map[id_val] for id_val in ids_retorno if id_val in model_map]
        
        return modelos_ordenados, total
       
    @staticmethod
    def lista_mantenimientos(db: Session, id_tecnico: int) -> List[models.Mantenimiento]:
        if not db.get(models.Tecnico, id_tecnico):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"tecnico con ID: '{id_tecnico}' NO fue encontrado")

        mantenimientos = db.query(models.Mantenimiento)\
            .join(models.MtoTecnico)\
            .filter(models.MtoTecnico.id_tecnico == id_tecnico)\
            .all()

        if not mantenimientos:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontró mantenimiento para ese técnico")
        
        return mantenimientos

    
    @staticmethod
    def actualiza_tecnico(db: Session, tecnico_id: int, tecnico_datos: schemas.TecnicoUpdate) -> models.Tecnico:
        db_tecnico = db.get(models.Tecnico, tecnico_id)
        
        if not db_tecnico:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Técnico con ID: '{tecnico_id}' no encontrado")
        
        dato = tecnico_datos.model_dump(exclude_unset=True) 

        if not dato:
            return db_tecnico

        is_modified = False
        for key, value in dato.items():
            if getattr(db_tecnico, key) != value:
                setattr(db_tecnico, key, value)
                is_modified = True

        if not is_modified:
            return db_tecnico

        db.commit()
        db.refresh(db_tecnico)
        return db_tecnico

    @staticmethod
    def elimina_tecnico(db: Session, tecnico_id: int) -> None:
        db_tecnico = db.get(models.Tecnico, tecnico_id)
        if not db_tecnico:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="TECNICO no encontrado en la BD")
        
        tiene_asignaciones = db.query(models.MtoTecnico).filter(models.MtoTecnico.id_tecnico == tecnico_id).first()
        if tiene_asignaciones:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No se puede eliminar el TECNICO porque tiene MANTENIMIENTOS asignados.")
            
        db.delete(db_tecnico)
        db.commit()
        return None
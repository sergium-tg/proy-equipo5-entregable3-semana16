from fastapi import HTTPException, status
from typing import List, Tuple, Literal
from sqlalchemy.orm import Session
from app.models import schemas, models
from app.services.busqueda import busca_ordena
from datetime import datetime
from sqlalchemy import or_

class MantenimientoService:
    @staticmethod
    def crea_mantenimiento(db: Session, payload: schemas.MantenimientoCreate) -> models.Mantenimiento:
        db_orden = db.get(models.Orden, payload.consecutivo_orden)
        if not db_orden:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Orden con consecutivo: '{payload.consecutivo_orden}' no existe en la BD.")
        
        db_mto = models.Mantenimiento(**payload.model_dump())
        
        db.add(db_mto)
        db.commit()
        db.refresh(db_mto)
        return db_mto

    @staticmethod
    def lista_todos(db: Session) -> List[models.Mantenimiento]:
        resultados = db.query(models.Mantenimiento).all()
        if not resultados:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron mantenimientos")
        return resultados

    @staticmethod
    def busca_numero(db: Session, mto_numero: int) -> models.Mantenimiento:
        db_mto = db.get(models.Mantenimiento, mto_numero)
        if not db_mto:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Mantenimiento con NUMERO: '{mto_numero}' NO fue encontrado")
        return db_mto

    @staticmethod
    def busca_mantenimientos(db: Session, q: str | None, sort: str, order: str, offset: int, limit: int) -> Tuple[List[models.Mantenimiento], int]:
        all_items_list = db.query(models.Mantenimiento).all()
        items_dict = {item.numero: schemas.Mantenimiento.model_validate(item) for item in all_items_list}
        
        resultados, total = busca_ordena(
            items_dict=items_dict,
            q=q,
            search_fields=["descripcion"],
            sort=sort,
            order=order,
            offset=offset,
            limit=limit
        )
        
        ids_retorno = [item.numero for item in resultados]
        modelos_retorno = db.query(models.Mantenimiento).filter(models.Mantenimiento.numero.in_(ids_retorno)).all()
        
        model_map = {model.numero: model for model in modelos_retorno}
        modelos_ordenados = [model_map[id_val] for id_val in ids_retorno if id_val in model_map]
        
        return modelos_ordenados, total

    @staticmethod
    def lista_por_tipo(db: Session, tipo: Literal["Correctivo", "Preventivo"]) -> List[models.Mantenimiento]:
        resultados = db.query(models.Mantenimiento).filter(models.Mantenimiento.tipo == tipo).all()
        if not resultados:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No se encontraron mantenimientos de tipo: '{tipo}'")
        return resultados

    @staticmethod
    def lista_orden(db: Session, consecutivo: int) -> List[models.Mantenimiento]:
        if not db.get(models.Orden, consecutivo):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Orden con CONSECUTIVO: '{consecutivo}' no fue encontrada")
        
        resultados = db.query(models.Mantenimiento).filter(models.Mantenimiento.consecutivo_orden == consecutivo).all()
        
        if not resultados:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No se encontraron mantenimientos para la orden: '{consecutivo}'")
        return resultados

    @staticmethod
    def lista_rango_fechas(db: Session, fecha_inicio: datetime, fecha_fin: datetime) -> List[models.Mantenimiento]:
        if fecha_inicio > fecha_fin:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="La fecha de inicio no puede ser posterior a la fecha de fin")
        
        resultados = db.query(models.Mantenimiento).filter(
            or_(
                models.Mantenimiento.apertura.between(fecha_inicio, fecha_fin),
                models.Mantenimiento.cierre.between(fecha_inicio, fecha_fin)
            )
        ).all()
        
        if not resultados:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron mantenimientos en ese rango de fechas")
        return resultados

    @staticmethod
    def actualiza_mantenimiento(db: Session, mto_numero: int, mto_datos: schemas.MantenimientoUpdate) -> models.Mantenimiento:
        db_mto = db.get(models.Mantenimiento, mto_numero)
        if not db_mto:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Mantenimiento con NUMERO: '{mto_numero}' NO fue encontrado")
        
        actualizar = mto_datos.model_dump(exclude_unset=True)
        
        if not actualizar:
            return db_mto 

        is_modified = False

        if 'consecutivo_orden' in actualizar:
            nuevo_consecutivo = actualizar['consecutivo_orden']
         
            if db_mto.consecutivo_orden != nuevo_consecutivo:

                if not db.get(models.Orden, nuevo_consecutivo):
                    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"La Orden con CONSECUTIVO: '{nuevo_consecutivo}' no fue encontrada")
                
                setattr(db_mto, 'consecutivo_orden', nuevo_consecutivo)
                is_modified = True

            del actualizar['consecutivo_orden']

        for campo, valor in actualizar.items():
            if getattr(db_mto, campo) != valor:
                setattr(db_mto, campo, valor)
                is_modified = True
                
        if not is_modified:
            return db_mto

        db.commit()
        db.refresh(db_mto)
        return db_mto

    @staticmethod
    def elimina_mantenimiento(db: Session, mto_numero: int) -> None:
        db_mto = db.get(models.Mantenimiento, mto_numero)
        if not db_mto:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="MANTENIMIENTO no encontrado en la BD")
        
        tiene_tecnicos = db.query(models.MtoTecnico).filter(models.MtoTecnico.numero_mantenimiento == mto_numero).first()
        if tiene_tecnicos:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No se puede eliminar el MANTENIMIENTO porque tiene TECNICOS asignados.")
        
        db.delete(db_mto)
        db.commit()
        return None


####### Logica con entidades asociadas 


    @staticmethod
    def asigna_tecnico(db: Session, numero_mto: int, id_tecnico: int) -> models.MtoTecnico:
        if not db.get(models.Mantenimiento, numero_mto):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="MANTENIMIENTO no encontrado en BD")
        if not db.get(models.Tecnico, id_tecnico):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="TECNICO no encontrado en BD")
        
        clave = (numero_mto, id_tecnico)
        db_item = db.get(models.MtoTecnico, clave)
        if db_item:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Relacion MANTENIMIENTO - TECNICO ya existe en la BD")

        db_item = models.MtoTecnico(numero_mantenimiento=numero_mto, id_tecnico=id_tecnico)
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item

    @staticmethod
    def lista_tecnicos(db: Session, numero_mto: int) -> List[models.Tecnico]:
        if not db.get(models.Mantenimiento, numero_mto):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Mantenimiento con numero: '{numero_mto}' NO fue encontrado")

        tecnicos_asignados = db.query(models.Tecnico)\
            .join(models.MtoTecnico)\
            .filter(models.MtoTecnico.numero_mantenimiento == numero_mto)\
            .all()
        
        if not tecnicos_asignados:
             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontró TECNICO para ese mantenimiento")
        
        return tecnicos_asignados


    @staticmethod
    def actualiza_tecnico(db: Session, numero_mto: int, id_tecnico_antiguo: int, payload: schemas.MtoTecnicoUpdate) -> models.MtoTecnico:
        if not db.get(models.Mantenimiento, numero_mto):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Mantenimiento con numero: '{numero_mto}' NO fue encontrado")

        clave_actual = (numero_mto, id_tecnico_antiguo)
        db_item_antiguo = db.get(models.MtoTecnico, clave_actual)
        
        if not db_item_antiguo:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Asignación Mantenimiento+Tecnico (antigua) no encontrada")

        id_tecnico_nuevo = payload.id_tecnico_nuevo
        if not db.get(models.Tecnico, id_tecnico_nuevo):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Técnico (nuevo) con ID: '{id_tecnico_nuevo}' no encontrado en BD")

        if id_tecnico_antiguo == id_tecnico_nuevo:
            return db_item_antiguo

        clave_nueva = (numero_mto, id_tecnico_nuevo)
        if db.get(models.MtoTecnico, clave_nueva):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="La nueva asignación (Mantenimiento+TEcnico) ya existe")

        db.delete(db_item_antiguo)

        db_item_nuevo = models.MtoTecnico(
            numero_mantenimiento=numero_mto,
            id_tecnico=id_tecnico_nuevo
        )
        db.add(db_item_nuevo)
        
        db.commit()
        db.refresh(db_item_nuevo)
        return db_item_nuevo
    
    @staticmethod
    def quita_tecnico(db: Session, numero_mto: int, id_tecnico: int) -> None:
        clave = (numero_mto, id_tecnico)
        db_item = db.get(models.MtoTecnico, clave)
        if not db_item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Asignación Mantenimiento+Tecnico no encontrada")
        
        db.delete(db_item)
        db.commit()
        return None
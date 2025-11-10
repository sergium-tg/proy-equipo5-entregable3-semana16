from fastapi import HTTPException, status
from typing import Dict, Tuple, List, Any, Literal
from app.models.schemas import Orden, CrearOrden, UpdateOrden
from app.services.busqueda import busca_ordena
from sqlalchemy.orm import Session
from app.models import models
from sqlalchemy.orm import joinedload
from datetime import datetime

class OrdenService:

    @staticmethod
    def crea_ordenes(db: Session, payload: CrearOrden) -> Orden:
        cliente = db.query(models.Cliente).filter(models.Cliente.id == payload.id_cliente).first()
        if not cliente:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Cliente con id {payload.id_cliente} NO EXISTE en la BD. La orden no puede ser creada.")

        orden = models.Orden(**payload.model_dump())
        
        db.add(orden)
        db.commit()
        db.refresh(orden)
        
        return Orden.model_validate(orden)

    @staticmethod
    def lista_todos(db: Session) -> List[Orden]:
        ordenes_models = db.query(models.Orden).options(
            joinedload(models.Orden.ventas),
            joinedload(models.Orden.mantenimientos)
        ).all()
        if not ordenes_models:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron órdenes")
        return [Orden.model_validate(o) for o in ordenes_models]

    @staticmethod
    def busca_consecutivo(db: Session, consecutivo: int) -> Orden:
        orden = db.query(models.Orden).options(
            joinedload(models.Orden.ventas),
            joinedload(models.Orden.mantenimientos)
        ).filter(models.Orden.consecutivo == consecutivo).first()
        
        if not orden:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Orden con consecutivo {consecutivo} NO EXISTE en la BD.")
        return Orden.model_validate(orden)

    @staticmethod
    def lista_por_tipo(db: Session, tipo: Literal["solo Ventas", "solo Mantenimientos", "Mantenimiento con ventas"]) -> List[Orden]:
        ordenes = db.query(models.Orden).options(
            joinedload(models.Orden.ventas),
            joinedload(models.Orden.mantenimientos)
        ).all()
        
        resultados = []
        for orden_model in ordenes:
            tiene_ventas = bool(orden_model.ventas)
            tiene_mantenimientos = bool(orden_model.mantenimientos)
            
            if tipo == "solo Ventas" and tiene_ventas and not tiene_mantenimientos:
                resultados.append(Orden.model_validate(orden_model))
            elif tipo == "solo Mantenimientos" and not tiene_ventas and tiene_mantenimientos:
                resultados.append(Orden.model_validate(orden_model))
            elif tipo == "Mantenimiento con ventas" and tiene_ventas and tiene_mantenimientos:
                resultados.append(Orden.model_validate(orden_model))
        
        if not resultados:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No se encontraron órdenes del tipo: '{tipo}'")
        
        return resultados
     
    @staticmethod
    def lista_rango_fechas(db: Session, fecha_inicio: datetime, fecha_fin: datetime) -> List[Orden]:
        if fecha_inicio > fecha_fin:
            raise HTTPException(status_code=400, detail="La fecha de inicio no puede ser posterior a la fecha de fin")
        
        ordenes_models = db.query(models.Orden).options(
            joinedload(models.Orden.ventas),
            joinedload(models.Orden.mantenimientos)
        ).filter(
            models.Orden.apertura.between(fecha_inicio, fecha_fin)
        ).all()
        
        if not ordenes_models:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron órdenes en ese rango de fechas")
        return [Orden.model_validate(o) for o in ordenes_models]
    
    @staticmethod
    def lista_clientes(db: Session, cliente_id: int) -> List[Orden]:
        if not db.get(models.Cliente, cliente_id):
             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Cliente con id {cliente_id} NO EXISTE en la BD.")
        
        ordenes_models = db.query(models.Orden).options(
            joinedload(models.Orden.ventas),
            joinedload(models.Orden.mantenimientos)
        ).filter(models.Orden.id_cliente == cliente_id).all()
        
        if not ordenes_models:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No se encontraron órdenes para el cliente {cliente_id}")
        return [Orden.model_validate(o) for o in ordenes_models]

    @staticmethod
    def actualiza_ordenes(db: Session, consecutivo: int, payload: UpdateOrden) -> Orden:
        
        orden = db.query(models.Orden).filter(models.Orden.consecutivo == consecutivo).first()
        if not orden:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Orden con consecutivo {consecutivo} NO EXISTE en la BD.")

        datos_actualizacion = payload.model_dump(exclude_unset=True)
        
        if not datos_actualizacion:
            return Orden.model_validate(orden)

        if "id_cliente" in datos_actualizacion:
            nuevo_id_cliente = datos_actualizacion["id_cliente"]
            nuevo_cliente = db.query(models.Cliente).filter(models.Cliente.id == nuevo_id_cliente).first()
            if not nuevo_cliente:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"El nuevo Cliente con id {nuevo_id_cliente} NO EXISTE en la BD. La orden no puede ser reasignada.")

        for key, value in datos_actualizacion.items():
            setattr(orden, key, value)

        db.add(orden)
        db.commit()
        db.refresh(orden)
        
        return Orden.model_validate(orden)

    @staticmethod
    def elimina_ordenes(db: Session, consecutivo: int) -> None:
        db_orden = db.query(models.Orden).filter(models.Orden.consecutivo == consecutivo).first()
        if not db_orden:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Orden con consecutivo {consecutivo} NO EXISTE en la BD.")
        
        db.delete(db_orden)
        db.commit()
        return None
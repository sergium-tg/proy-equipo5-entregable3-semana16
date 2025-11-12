from fastapi import HTTPException, status
from typing import Dict, Tuple, List
from app.models.schemas import Cliente, ClienteCreate, ClienteUpdate
from app.services.busqueda import busca_ordena
from sqlalchemy.orm import Session
from app.models import models


class ClienteService:

    @staticmethod
    def crea_clientes(db: Session, payload: ClienteCreate) -> Cliente:
        cliente = db.query(models.Cliente).filter(models.Cliente.id == payload.id).first()
        if cliente:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="CLIENTE ya existe en la BD.")
        
        # creacion instancia para SQL
        cliente = models.Cliente(**payload.model_dump())
        # pasos para la BD
        db.add(cliente)
        db.commit()
        db.refresh(cliente)
        
        return Cliente.model_validate(cliente)

    @staticmethod
    def lista_todos(db: Session) -> List[Cliente]:
        # toma todos los clientes  de la BD
        clientes_models = db.query(models.Cliente).all()
        if not clientes_models:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron clientes")
        # de Alchemy a pydantic
        return [Cliente.model_validate(c) for c in clientes_models]

    @staticmethod
    def busca_id(db: Session, cliente_id: int) -> Cliente:
        cliente = db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()
        if not cliente:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Cliente con id {cliente_id} NO EXISTE en la BD.")
        return Cliente.model_validate(cliente)

    @staticmethod
    def busca_clientes(db: Session, q: int | str | None, sort: str, order: str, offset: int, limit: int) -> Tuple[List[Cliente], int]:
        # toma todos los clientes  de la BD
        los_clientes = db.query(models.Cliente).all()

        clientes: Dict[int, Cliente] = {
            client.id: Cliente.model_validate(client) for client in los_clientes
        }

        return busca_ordena(
            items_dict=clientes,
            q=q,
            search_fields=["nombre", "apellido", "correo"],
            sort=sort,
            order=order,
            offset=offset,
            limit=limit
        )

    @staticmethod
    def actualiza_clientes(db: Session, cliente_id: int, payload: ClienteUpdate) -> Cliente:
        cliente = db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()
        if not cliente:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente NO EXISTE en la BD.")
        
        # pydantic a dict. solo los diligenciados
        datos_actualizacion = payload.model_dump(exclude_unset=True)
        if not datos_actualizacion:
            return Cliente.model_validate(cliente)
        # actualiza datos en SQL
        for key, value in datos_actualizacion.items():
            setattr(cliente, key, value)
        
        db.add(cliente)
        db.commit()
        db.refresh(cliente)
        
        return Cliente.model_validate(cliente)
    
    @staticmethod
    def elimina_clientes(db: Session, cliente_id: int) -> None:
        db_cliente = db.query(models.Cliente).filter(models.Cliente.id == cliente_id).first()
        if not db_cliente:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente NO EXISTE en la BD.")
        
        if db_cliente.ordenes:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="CLIENTE tiene órdenes asociadas y NO puede ser eliminado.")
            
        db.delete(db_cliente)
        db.commit()
        return None
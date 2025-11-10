from fastapi import HTTPException, status
from typing import List, Tuple, Dict
from sqlalchemy.orm import Session
from app.models import schemas, models
from app.services.busqueda import busca_ordena
from datetime import datetime

class VentaService:
    @staticmethod
    def crea_venta(db: Session, payload: schemas.VentaCreate) -> models.Venta:
        db_orden = db.get(models.Orden, payload.consecutivo_orden)
        if not db_orden:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Orden con consecutivo: '{payload.consecutivo_orden}' no existe en la BD.")
        
        db_venta = models.Venta(**payload.model_dump())

        db.add(db_venta)
        db.commit()
        db.refresh(db_venta)
        
        return db_venta
    
    @staticmethod
    def lista_todos(db: Session) -> List[models.Venta]:
        resultados = db.query(models.Venta).all()
        if not resultados:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron ventas")
        return resultados

    @staticmethod
    def busca_numero(db: Session, venta_numero: int) -> models.Venta:
        db_venta = db.get(models.Venta, venta_numero)
        if not db_venta:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Venta NO encontrada")
        return db_venta

    @staticmethod
    def lista_rango_fechas(db: Session, fecha_inicio: datetime, fecha_fin: datetime) -> List[models.Venta]:
        if fecha_inicio > fecha_fin:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="La fecha de inicio no puede ser posterior a la fecha de fin")
        
        resultados = db.query(models.Venta).filter(
            models.Venta.fecha.between(fecha_inicio, fecha_fin)
        ).all()
        
        if not resultados:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron ventas en ese rango de fechas")
        return resultados
    
    @staticmethod
    def actualiza_venta(db: Session, venta_numero: int, venta_datos: schemas.VentaUpdate) -> models.Venta:
        db_venta = db.get(models.Venta, venta_numero)
        if not db_venta:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Venta NO encontrada")
        
        actualizar = venta_datos.model_dump(exclude_unset=True)

        if not actualizar:
           return db_venta

        is_modified = False

        if 'consecutivo_orden' in actualizar:
            nuevo_consecutivo = actualizar['consecutivo_orden']
            if db_venta.consecutivo_orden != nuevo_consecutivo:
                if not db.get(models.Orden, nuevo_consecutivo):
                    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Orden con CONSECUTIVO: '{nuevo_consecutivo}' no fue encontrado")
                db_venta.consecutivo_orden = nuevo_consecutivo
                is_modified = True

        if 'fecha' in actualizar:
            nueva_fecha = actualizar['fecha']
            if db_venta.fecha != nueva_fecha:
                db_venta.fecha = nueva_fecha
                is_modified = True

        if not is_modified:
             return db_venta

        db.commit()
        db.refresh(db_venta)
        return db_venta

    @staticmethod
    def elimina_venta(db: Session, venta_numero: int) -> None:
        db_venta = db.get(models.Venta, venta_numero)
        if not db_venta:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Venta NO encontrada en la BD")
        
        tiene_articulos = db.query(models.VentaArticulo).filter(models.VentaArticulo.numero_venta == venta_numero).first()
        if tiene_articulos:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No se puede eliminar la VENTA porque tiene ARTICULOS asociados.")
        
        db.delete(db_venta)
        db.commit()
        return None
    

    ####### Logica con entidades asociadas 

    @staticmethod
    def asigna_articulo(db: Session, payload: schemas.VentaArticuloCreate) -> models.VentaArticulo:
        if not db.get(models.Venta, payload.numero_venta):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="VENTA no encontrada en BD")
        
        articulo = db.get(models.Articulo, payload.id_articulo)
        if not articulo:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="ARTICULO no encontrado en BD")

        if not articulo.existencia:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="El articulo no tiene existencias.")

        clave = (payload.numero_venta, payload.id_articulo)
        if db.get(models.VentaArticulo, clave):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Asignación VENTA+ARTICULO ya existe en la BD.")

        precio_calculado = articulo.precio * payload.cantidad
        
        db_item = models.VentaArticulo(
            numero_venta=payload.numero_venta,
            id_articulo=payload.id_articulo,
            cantidad=payload.cantidad,
            precio_registrado=precio_calculado
        )
        
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item

    @staticmethod
    def lista_articulos(db: Session, numero_venta: int) -> List[Dict]:
        if not db.get(models.Venta, numero_venta):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Venta con numero: '{numero_venta}' NO fue encontrada")
        
        asignaciones = db.query(models.VentaArticulo)\
            .join(models.Articulo)\
            .filter(models.VentaArticulo.numero_venta == numero_venta)\
            .all()
        
        if not asignaciones:
             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontró ARTICULO para esa venta")

        articulos_asignados = []
        for item in asignaciones:
            articulo_schema = schemas.Articulo.model_validate(item.articulo)
            articulo_info = articulo_schema.model_dump()
            articulo_info["cantidad"] = item.cantidad
            articulo_info["precio_registrado"] = item.precio_registrado
            articulos_asignados.append(articulo_info)
        
        return articulos_asignados

    @staticmethod
    def actualiza_articulo(db: Session, numero_venta: int, id_articulo: int, payload: schemas.VentaArticuloUpdate) -> models.VentaArticulo:
        clave_actual = (numero_venta, id_articulo)
        db_item = db.get(models.VentaArticulo, clave_actual)
        
        if not db_item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Asignacion Venta+Articulo no encontrada")

        actualizar_datos = payload.model_dump(exclude_unset=True)

        if not actualizar_datos:
            return db_item

        nuevo_numero_venta = actualizar_datos.get('numero_venta', numero_venta)
        nuevo_id_articulo = actualizar_datos.get('id_articulo', id_articulo)
        clave_nueva = (nuevo_numero_venta, nuevo_id_articulo)

        if clave_actual == clave_nueva:
            is_modified = False
            
            if 'cantidad' in actualizar_datos and db_item.cantidad != actualizar_datos['cantidad']:
                db_item.cantidad = actualizar_datos['cantidad']
                is_modified = True
                if 'precio_registrado' not in actualizar_datos:
                    articulo = db.get(models.Articulo, db_item.id_articulo)
                    if articulo:
                        db_item.precio_registrado = articulo.precio * db_item.cantidad

            if 'precio_registrado' in actualizar_datos and db_item.precio_registrado != actualizar_datos['precio_registrado']:
                db_item.precio_registrado = actualizar_datos['precio_registrado']
                is_modified = True

            if not is_modified:
                return db_item
            
            db.commit()
            db.refresh(db_item)
            return db_item

        else:
            if db.get(models.VentaArticulo, clave_nueva):
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="La nueva Asignacion Venta+Articulo ya existe")

            if not db.get(models.Venta, nuevo_numero_venta):
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"La VENTA (nueva) con numero {nuevo_numero_venta} no existe")
            
            nuevo_articulo = db.get(models.Articulo, nuevo_id_articulo)
            if not nuevo_articulo:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"El ARTICULO (nuevo) con id {nuevo_id_articulo} no existe")
            
            if not nuevo_articulo.existencia:
                 raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"El ARTICULO (nuevo) con id {nuevo_id_articulo} no tiene existencias.")

            nueva_cantidad = actualizar_datos.get('cantidad', db_item.cantidad)
            
            if 'precio_registrado' in actualizar_datos:
                nuevo_precio = actualizar_datos['precio_registrado']
            else:
                nuevo_precio = nuevo_articulo.precio * nueva_cantidad

            db.delete(db_item)
            
            db_item_nuevo = models.VentaArticulo(
                numero_venta=nuevo_numero_venta,
                id_articulo=nuevo_id_articulo,
                cantidad=nueva_cantidad,
                precio_registrado=nuevo_precio
            )
            db.add(db_item_nuevo)
            
            db.commit()
            db.refresh(db_item_nuevo)
            return db_item_nuevo

    @staticmethod
    def elimina_articulo(db: Session, numero_venta: int, id_articulo: int) -> None:
        clave = (numero_venta, id_articulo)
        db_item = db.get(models.VentaArticulo, clave)
        if not db_item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Asignación Venta+Articulo no encontrada")
        
        db.delete(db_item)
        db.commit()
        return None
# para ejecutar desde Linux/Mac: python3 seed_db.py
# para ejecutar desde Windows: python seed_db.py

import sys
import os
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import inspect, select

try:
    from app.db.session import SessionLocal, engine, Base
    from app.models import models
except ImportError:
    print("Error: No se pudieron importar los módulos de la app.")
    print("Este script se debe ejecutar en la ruta 'ApiWeb/backend/'.")
    sys.exit(1)


def populate_db_data(db: Session):
    try:
        # --- Casos CLIENTE ---
        cliente1 = models.Cliente(id=18008332, nombre="Juan", apellido="Duran", correo="judu1@mail.com", contacto=3001000000, direccion="Av Caracas #123")
        cliente2 = models.Cliente(id=12350011, nombre="Diana", apellido=" Valentina", correo="diva1@mail.com", contacto=3002000000, direccion="Av Quito #772")
        cliente3 = models.Cliente(id=22315085, nombre="Adam", apellido="Santana", contacto=3003000000)
        cliente4 = models.Cliente(id=19332410, nombre="Andres", apellido="Guzman", correo="angu1@mail.com")
        db.add_all([cliente1, cliente2, cliente3, cliente4])
        
        # --- Casos ORDEN ---
        orden1 = models.Orden(consecutivo=1, apertura=datetime(2025, 7, 17, 8, 0), id_cliente=12350011)
        orden2 = models.Orden(consecutivo=2, apertura=datetime(2025, 8, 1, 9, 0), id_cliente=12350011)
        orden3 = models.Orden(consecutivo=3, apertura=datetime(2025, 8, 1, 13, 0), id_cliente=22315085)
        orden4 = models.Orden(consecutivo=4, apertura=datetime(2025, 8, 1, 9, 30), id_cliente=18008332)
        db.add_all([orden1, orden2, orden3, orden4])
        
        # --- Casos MANTENIMIENTO ---
        mto1 = models.Mantenimiento(numero=1, tipo="Preventivo", apertura=datetime(2025, 7, 17, 8, 30), precio=150000, consecutivo_orden=2, descripcion="Cambio aceite")
        mto2 = models.Mantenimiento(numero=2, tipo="Correctivo", apertura=datetime(2025, 8, 1, 10, 0), precio=1000000, consecutivo_orden=1, descripcion="Pintura")
        mto3 = models.Mantenimiento(numero=3, tipo="Preventivo", apertura=datetime(2025, 8, 1, 14, 0), precio=500000, consecutivo_orden=3, descripcion="Alineacion")
        mto4 = models.Mantenimiento(numero=4, tipo="Correctivo", apertura=datetime(2025, 8, 1, 10, 0), precio=100000, consecutivo_orden=3, descripcion="Cambio bujia")
        mto5 = models.Mantenimiento(numero=5, tipo="Correctivo", apertura=datetime(2025, 8, 1, 10, 0), precio=100000, consecutivo_orden=4, descripcion="Reparacion Cableado")
        db.add_all([mto1, mto2, mto3, mto4, mto5])
        
        # --- Casos VENTAS ---
        venta1 = models.Venta(numero=1, fecha=datetime(2025, 8, 1, 13, 0), consecutivo_orden=2)
        venta2 = models.Venta(numero=2, fecha=datetime(2025, 8, 1, 13, 30), consecutivo_orden=4)
        venta3 = models.Venta(numero=3, fecha=datetime(2025, 8, 1, 10, 30), consecutivo_orden=4)
        db.add_all([venta1, venta2, venta3])
        
        # --- Casos TECNICO ---
        tecnico1 = models.Tecnico(id=123400, nombre="Andres", apellido="Molina", especialidad="Refrigeracion")
        tecnico2 = models.Tecnico(id=156300, nombre="Juan", apellido="Jaimes", especialidad="Electrico")
        tecnico3 = models.Tecnico(id=189011, nombre="Diana", apellido="Diaz", especialidad="Sensores")
        tecnico4 = models.Tecnico(id=200148, nombre="Eider", apellido="Molina", especialidad="Programacion")
        db.add_all([tecnico1, tecnico2, tecnico3, tecnico4])
        
        # --- Casos ARTICULO ---
        articulo1 = models.Articulo(id=1140, nombre="Splitter 3 inch", descripcion="Splitter usado", precio=11000, existencia=True)
        articulo2 = models.Articulo(id=2455, nombre="Fusible 5A", precio=2000, existencia=True)
        articulo3 = models.Articulo(id=523, nombre="Aspas AC 24 inch", descripcion="usado", precio=58000, existencia=True)
        articulo4 = models.Articulo(id=556, nombre="Jumper 16 AWG", descripcion="Jumber en calibre 16 con terminales M-M", precio=2000, existencia=True)
        articulo5 = models.Articulo(id=333, nombre="Radiador R2U2", descripcion="Radiador para AC", precio=550000, existencia=True)
        db.add_all([articulo1, articulo2, articulo3, articulo4, articulo5])
        
        db.commit()

        # --- Relaciones MANTENIMIENTOS_TECNICO (M2M) ---
        mtoTec1 = models.MtoTecnico(numero_mantenimiento=1, id_tecnico=123400)
        mtoTec2 = models.MtoTecnico(numero_mantenimiento=2, id_tecnico=189011)
        mtoTec3 = models.MtoTecnico(numero_mantenimiento=2, id_tecnico=200148)
        mtoTec6 = models.MtoTecnico(numero_mantenimiento=3, id_tecnico=200148)
        mtoTec4 = models.MtoTecnico(numero_mantenimiento=4, id_tecnico=123400)
        mtoTec5 = models.MtoTecnico(numero_mantenimiento=5, id_tecnico=123400)
        db.add_all([mtoTec1, mtoTec2, mtoTec3, mtoTec6, mtoTec4, mtoTec5])
        
        # --- Relaciones VENTAS_ARTICULOS (M2M) ---
        ventaArticulo1 = models.VentaArticulo(numero_venta=1, id_articulo=1140, cantidad=2, precio_registrado=22000)
        ventaArticulo2 = models.VentaArticulo(numero_venta=2, id_articulo=2455, cantidad=1, precio_registrado=2000)
        ventaArticulo3 = models.VentaArticulo(numero_venta=2, id_articulo=556, cantidad=3, precio_registrado=4500)
        ventaArticulo4 = models.VentaArticulo(numero_venta=3, id_articulo=523, cantidad=1, precio_registrado=58000)
        ventaArticulo5 = models.VentaArticulo(numero_venta=3, id_articulo=2455, cantidad=2, precio_registrado=4000)
        db.add_all([ventaArticulo1, ventaArticulo2, ventaArticulo3, ventaArticulo4, ventaArticulo5])
        
        db.commit()
    
    except Exception as e:
        print(f"Fallo al cargar los datos en le DB: {e}")
        db.rollback()
        raise

def check_if_data_exists(db: Session, inspector) -> bool:
    existing_tables = inspector.get_table_names()
    
    for table_name, table_model in Base.metadata.tables.items():
        if table_name in existing_tables:
            try:
                first_row = db.execute(select(table_model).limit(1)).first()
                if first_row:
                    print(f"Las tablas tienen datos: '{table_name}'")
                    return True
            except Exception as e:
                print(f"Falla al consultar las tablas. '{table_name}'Error: {e}")
                return True
                
    return False

def main():
    print("Inicializacion del script de carga de datos...")
    db: Session = SessionLocal()
    inspector = inspect(engine)
    
    try:
        Base.metadata.create_all(bind=engine)
        
        data_exists = check_if_data_exists(db, inspector)

        if data_exists:
            print("\nLa base de datos ya tiene datos.")
            respuesta = input("¿Desea borrar TODOS los registros actuales y cargar los casos de prueba? (s/n): ").strip().lower()
            
            if respuesta in ['s', 'si', 'yes']:
                print("Borrando todos los registros actuales...")
                Base.metadata.drop_all(bind=engine)
                Base.metadata.create_all(bind=engine)
                print("Registros borrados. Cargando nuevos casos de prueba...")
                
                populate_db_data(db)
                print("\nCasos de prueba cargados exitosamente.")
            
            else:
                print("Operación cancelada. No se modifico la base de datos.")
        
        else:
            print("Base de datos vacia. Cargando casos de prueba...")
            populate_db_data(db)
            print("\nCasos de prueba cargados exitosamente.")

    except Exception as e:
        print(f"Error durante la operación: {e}")
        db.rollback()
    finally:
        db.close()
        print("Script finalizado.")

if __name__ == "__main__":
    main()

from sqlalchemy import Column, Integer, String, BigInteger, DateTime, ForeignKey, Float, Boolean
from sqlalchemy.orm import relationship 
from app.db.session import Base
from datetime import datetime

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    apellido = Column(String, index=True)
    correo = Column(String, unique=True, index=True, nullable=True) 
    contacto = Column(BigInteger, nullable=True) 
    direccion = Column(String, nullable=True)
    
    ordenes = relationship("Orden", back_populates="cliente", cascade="all, delete-orphan") 

class Orden(Base):
    __tablename__ = "ordenes"

    consecutivo = Column(Integer, primary_key=True, index=True, autoincrement=True)
    apertura = Column(DateTime)
    
    id_cliente = Column(Integer, ForeignKey("clientes.id"))
    
    cliente = relationship("Cliente", back_populates="ordenes")
    
    mantenimientos = relationship("Mantenimiento", back_populates="orden", cascade="all, delete-orphan")
    ventas = relationship("Venta", back_populates="orden", cascade="all, delete-orphan")


class Tecnico(Base):
    __tablename__ = "tecnicos"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    apellido = Column(String, index=True)
    especialidad = Column(String)

    mantenimientos = relationship("MtoTecnico", back_populates="tecnico")

class Articulo(Base):
    __tablename__ = "articulos"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    descripcion = Column(String, nullable=True)
    precio = Column(Float)
    existencia = Column(Boolean, default=False)
    
    ventas = relationship("VentaArticulo", back_populates="articulo")

class Mantenimiento(Base):
    __tablename__ = "mantenimientos"
    numero = Column(Integer, primary_key=True, index=True, autoincrement=True)
    tipo = Column(String)
    descripcion = Column(String, nullable=False)
    apertura = Column(DateTime)
    cierre = Column(DateTime, nullable=True)
    precio = Column(Float)
    consecutivo_orden = Column(Integer, ForeignKey("ordenes.consecutivo"))
    
    orden = relationship("Orden", back_populates="mantenimientos")
    tecnicos = relationship("MtoTecnico", back_populates="mantenimiento", cascade="all, delete-orphan")

class Venta(Base):
    __tablename__ = "ventas"
    numero = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fecha = Column(DateTime)
    consecutivo_orden = Column(Integer, ForeignKey("ordenes.consecutivo"))
    
    orden = relationship("Orden", back_populates="ventas")
    articulos = relationship("VentaArticulo", back_populates="venta", cascade="all, delete-orphan")

#### para las entidades asociadas ####

class MtoTecnico(Base):
    __tablename__ = "mto_tecnicos"
    numero_mantenimiento = Column(Integer, ForeignKey("mantenimientos.numero"), primary_key=True)
    id_tecnico = Column(Integer, ForeignKey("tecnicos.id"), primary_key=True)
    
    mantenimiento = relationship("Mantenimiento", back_populates="tecnicos")
    tecnico = relationship("Tecnico", back_populates="mantenimientos")

class VentaArticulo(Base):
    __tablename__ = "venta_articulos"
    numero_venta = Column(Integer, ForeignKey("ventas.numero"), primary_key=True)
    id_articulo = Column(Integer, ForeignKey("articulos.id"), primary_key=True)
    cantidad = Column(Integer)
    precio_registrado = Column(Float, nullable=False)
    
    venta = relationship("Venta", back_populates="articulos")
    articulo = relationship("Articulo", back_populates="ventas")


#### para jwt

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    disabled = Column(Boolean, default=False)
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional, List, Literal
from datetime import datetime


###### Usuario para JWT ######

class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class User(BaseModel):
    username: str
    model_config = ConfigDict(from_attributes=True)


###### Entidad Tecnico ######

class Tecnico(BaseModel):
    id: int
    nombre: str
    apellido: str
    especialidad: str
    model_config = ConfigDict(from_attributes=True)

class TecnicoCreate(Tecnico):
    pass

class TecnicoUpdate(BaseModel):
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    especialidad: Optional[str] = None


###### Entidad ARTICULO ######

class Articulo(BaseModel):
    id: int
    nombre: str
    descripcion: Optional[str] = None
    precio: float
    existencia: bool = False
    model_config = ConfigDict(from_attributes=True)

class ArticuloCreate(Articulo):
    pass

class ArticuloUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    precio: Optional[float] = None
    existencia: Optional[bool] = None


###### Entidad MANTENIMIENTO ######

class Mantenimiento(BaseModel):
    numero: int
    tipo: str
    descripcion: str
    apertura: datetime
    cierre: Optional[datetime] = None
    precio: float
    consecutivo_orden: int
    model_config = ConfigDict(from_attributes=True)

class MantenimientoCreate(BaseModel):
    tipo: Literal["Correctivo", "Preventivo"]
    descripcion: str
    apertura: datetime
    precio: float
    consecutivo_orden: int

class MantenimientoUpdate(BaseModel):
    consecutivo_orden: Optional[int] = None 
    tipo: Optional[Literal["Correctivo", "Preventivo"]] = None
    descripcion: Optional[str] = None
    apertura: Optional[datetime] = None    
    cierre: Optional[datetime] = None
    precio: Optional[float] = None


###### Entidad VENTA ######

class Venta(BaseModel):
    numero: int
    fecha: datetime
    consecutivo_orden: int
    model_config = ConfigDict(from_attributes=True)

class VentaCreate(BaseModel):
    fecha: datetime
    consecutivo_orden: int

class VentaUpdate(BaseModel):
    fecha: Optional[datetime] = None
    consecutivo_orden: Optional[int] = None 


###### Entidad MANTENIMIENTO_TECNICO ######

class MtoTecnico(BaseModel):
    numero_mantenimiento: int
    id_tecnico: int
    model_config = ConfigDict(from_attributes=True)

class MtoTecnicoCreate(MtoTecnico):
    pass

class MtoTecnicoUpdate(BaseModel):
    id_tecnico_nuevo: int = Field(..., description="El ID del nuevo tecnico a asignar")


###### Entidad VENTA_ARTICULO ######

class VentaArticulo(BaseModel):
    numero_venta: int
    id_articulo: int
    cantidad: int
    precio_registrado: float
    model_config = ConfigDict(from_attributes=True)

class VentaArticuloCreate(BaseModel):
    numero_venta: int
    id_articulo: int
    cantidad: int = Field(..., gt=0, description="Solo numeros desde el 1")

class ArticuloVentaPayload(BaseModel):
    id_articulo: int
    cantidad: int = Field(..., gt=0, description="Solo numeros desde el 1")

class VentaArticuloUpdate(BaseModel):
    numero_venta: Optional[int] = None
    id_articulo: Optional[int] = None  
    cantidad: Optional[int] = Field(None, gt=0, description="Solo numeros desde el 1")
    precio_registrado: Optional[float] = None


###### Entidad ORDEN ######

class Orden(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    consecutivo: int
    apertura: datetime
    id_cliente: int 
    mantenimientos: List[Mantenimiento] = []
    ventas: List[Venta] = []

class CrearOrden(BaseModel):
    apertura: Optional[datetime] = Field(default_factory=datetime.now)
    id_cliente: int

class UpdateOrden(BaseModel):
    apertura: Optional[datetime] = None
    id_cliente: Optional[int] = None


###### Entidad CLIENTE ######

class Cliente(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    nombre: str
    apellido: str
    correo: Optional[EmailStr] = None
    contacto: Optional[int] = None
    direccion: Optional[str] = None
    ordenes: List[Orden] = []

class ClienteCreate(BaseModel):
    id: int = Field(..., ge=100000, description="Ingresar el ID de la persona, minimo 6 digitos")
    nombre: str = Field(..., min_length=1, description="Digitar el NOMBRE del cliente")
    apellido: str = Field(..., min_length=1, description="Digitar el APELLIDO del cliente")
    correo: Optional[EmailStr] = Field(None, description="Agregar correo electronico válido")
    contacto: Optional[int] = Field(None, ge=3000000000, description="Número de teléfono fijo o celular (Opcional)")
    direccion: Optional[str] = None

class ClienteUpdate(BaseModel):
    nombre: Optional[str] = None
    apellido: Optional[str] = None
    correo: Optional[EmailStr] = None
    contacto: Optional[int] = None
    direccion: Optional[str] = None


###### Para autenticacion ######

class UserInDB(User):
    hashed_password: str

class TokenData(BaseModel):
    username: Optional[str] = None
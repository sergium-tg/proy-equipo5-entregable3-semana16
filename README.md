# project-web
Web application for Radiadores Alejo, designed to manage sales, and maintenance services. The system supports product registration, tracking of sells (radiators, compressors, valves, hoses, condensers), and monitoring of repair and air conditioning maintenance services.

## Elevator pitch
Radiadores Alejo enfrenta dificultades en el control de ventas y servicios de mantenimiento. Este proyecto desarrolla una aplicación web que permitirá gestionar ventas y reparaciones de radiadores y aires acondicionados. La solución está orientada a optimizar la administración, reducir pérdidas y mejorar la trazabilidad del negocio.

## Usuarios y segmentos
Administradores internos: personal de la empresa encargado de registrar ventas, y dar seguimiento a los mantenimientos.

## Casos de uso principales
- Registrar y actualizar inventario (radiadores, compresores, válvulas, mangueras, condensadores).
- Controlar ventas y salidas de repuestos.
- Consultar stock en tiempo real.

## Casos de uso verificables:

Módulo: Autenticación	
1. Autenticar Usuario (/auth/token).
2. Registrar Nuevo Usuario (/auth/register).

Módulo: Dashboard

3. Visualizar Métricas Clave (Artículos Totales, Clientes Activos, Ventas del Mes, Mantenimientos, Órdenes Activas, Técnicos).
4. Revisar Actividad Reciente.

Módulo: Artículos

5. Crear Nuevo Artículo (Inventario).
6. Buscar y Filtrar Artículos (por nombre o disponibilidad).
7. Listar Todos los Artículos. 
8. Buscar, Actualizar, Eliminar un Artículo por ID. 
9. Listar Ventas de un Artículo específico.

Módulo: Clientes	

10. Crear Nuevo Cliente. 
11. Buscar Clientes (por nombre, email, teléfono). 
12. Listar Todos los Clientes. 
13. Buscar, Actualizar, Eliminar un Cliente por ID.

Módulo: Ventas	

14. Crear Nueva Venta (incluye registro de Total y Artículos). 
15. Buscar y Filtrar Ventas (por número, cliente o rango de fechas). 
16. Listar Todos los Artículos de una Venta. 
17. Actualizar/Eliminar Ventas y Artículos en la Venta.

Módulo: Mantenimientos	

18. Crear Nuevo Mantenimiento (Tipo, Prioridad, Estimación de Costo/Duración). 
19. Buscar Mantenimientos (por número, tipo o descripción, rango de fechas). 
20. Asignar/Quitar/Actualizar Técnico a un Mantenimiento. 
21. Actualizar/Eliminar Mantenimiento por Número.

Módulo: Órdenes (de Trabajo)

22. Crear Nueva Orden (Tipo, Prioridad, Tiempo Estimado). 
23. Buscar y Filtrar Órdenes (por consecutivo, tipo, rango de fechas o cliente). 
24. Actualizar/Eliminar una Orden.

Módulo: Técnicos	

25. Crear Nuevo Técnico (con especialidad, experiencia y calificación). 
26. Buscar Técnicos (por nombre, especialidad o email). 
27. Listar Mantenimientos asignados a un Técnico. 
28. Actualizar/Eliminar Técnico por ID.

## Objetivos 
- Centralizar la gestión de inventario y servicios.
- Reducir errores manuales en registros.
- Dar visibilidad en tiempo real de existencias.

## No objetivos
- No manejar facturación electrónica.
- No implementar pagos en línea en esta versión.
- No se gestionará compras de proovedores.

## Historias de usuario y alcance (MVP)
A continuación se propone algunas historias de usuario y se estima su importancia.

**Must-have:**

**HU1:** Como administrador, quiero registrar nuevos repuestos en el inventario para mantener el catálogo actualizado.
Criterios de Aceptación: El sistema debe permitir ingresar el nombre del repuesto, una descripción, el precio de venta.

Escenario 1.1: Registro exitoso de un repuesto.
Dado que estoy en la página de registro de inventario. Cuando ingreso todos los datos válidos para un repuesto. Entonces el repuesto se guarda correctamente.

Escenario 1.2: Intento de registro sin campos obligatorios.
Dado que estoy en la página de registro de inventario. Cuando intento guardar un repuesto sin ingresar el nombre o la cantidad. Entonces el sistema muestra un mensaje de error indicando los campos faltantes.

**HU2:** Como administrador, quiero registrar una orden de servicio para una reparación para llevar un control de los trabajos realizados.
Criterios de Aceptación: La orden de servicio debe incluir datos del cliente (nombre, teléfono), descripción del problema, repuestos utilizados y el costo total del servicio.

Escenario 2.1: Como administrador creación de una orden de servicio completa.
Dado que un cliente solicita un mantenimiento. Cuando creo una nueva orden de servicio con toda la información requerida.Entonces cuando se finaliza el mantenimiento,la  orden y el servicio se guardan.

**HU3:** Como administrador, quiero registrar una venta para tener un registro de los ingresos y las actividades.
Criterios de Aceptación: El sistema debe permitir generar un total de la venta, guardando el detalle de los articulos que se vendieron.

Escenario 3.1: Venta de un solo repuesto.
Dado que un cliente compra un repuesto. Cuando registro la venta del repuesto en el sistema. Entonces se genera la factura, se cierra la venta y se guarda la orden.


**Should-have:**

**HU4:** Como administrador, quiero generar reportes de ventas mensuales para analizar el desempeño del negocio.
Criterios de Aceptación: El sistema debe permitir filtrar las ventas por rango de fechas y generar un reporte que incluya la cantidad de ventas, los ingresos totales y los repuestos más vendidos en ese período.

Escenario 4.1: Generación de un reporte mensual.
Dado que quiero analizar las ventas de septiembre. Cuando filtro las ventas del 1 al 30 de septiembre. Entonces el sistema me muestra un reporte con el total de ingresos y los repuestos más vendidos del mes.


**Could-have:**

**HU5:** Como administrador, necesito usar credenciales para acceso seguro a la aplicación.
Criterios de Aceptación: Una vez establecido un usuario administrador, el sistema debera exigir las credenciales y permitir acceso en caso de que éstas sean correctas.

Escenario 5.1: Registro exitoso de un repuesto.
Dado que necesito hacer alguna operación en la pagina. Cuando ingreso el dato de usuario y contraseña. Entonces el sistema me permite acceder a las diferentes funcionalidades del aplicativo.


**Won't-have**

**HU6:** Como cliente, quiero recibir notificaciones por correo o SMS sobre el estado de mi mantenimiento para estar al tanto del progreso.
Criterios de Aceptación: El sistema debe permitir el envío de mensajes automatizados a los clientes cuando el estado de su orden de servicio cambie a finalizado pero no se cuenta con el recurso de tiempo ni las herramientas tecnicas/tecnológicas para dicja tarea.

Escenario 6.1: Envío de notificación de finalización.
Dado que la reparación de un cliente ha finalizado. Cuando el técnico actualiza el estado de la orden a "finalizada". Entonces el sistema envía un mensaje de texto automático al número del cliente.

**HU7:** Como vendedor, quiero procesar pagos directamente desde la aplicación para agilizar la transacción.
Criterios de Aceptación: La aplicación no procesará pagos, ya que se ha decidido que esta funcionalidad es muy compleja y no es prioritaria en esta fase inicial. La facturación se maneja de forma externa.

Escenario 7.1: Intento de pago desde la aplicación.
Dado que se ha generado una venta. Cuando busco una opción para procesar el pago con tarjeta de crédito. Entonces la aplicación no muestra ninguna opción de pago y el vendedor debe procesar el pago por métodos externos.


## Mapa de versiones:

**MVP (Semana 11):** Historias Must y Could (HU1, HU2, HU5).
**Postergado (Semana 16):** Incluye las historia Must y Should (HU3, HU4).

## Métricas KPIs de éxito:

Para confiar en los resultados del desarrollo de éste proyecto, se valorará las siguientes métricas:

Rendimiento del backend (FastAPI):
- Tiempo de respuesta de la API: El 95% de las solicitudes a los endpoints clave (por ejemplo /items, /ordenes, /ventas y /mantenimientso) deben completarse en menos de 200 ms.
- Tasa de éxito de la API: La tasa de solicitudes exitosas (códigos de estado 200 y 201) debe ser superior al 98%.

Rendimiento del frontend (React):
- Tiempo de carga inicial: La página principal debe carga y muestra su contenido principal en menos de 1s segundo.
- Tiempo de carga de la lista de ítems: La lista de ítems y/o ordenes y/o mantenimientos debe renderizarse en la interfaz de usuario en menos de 500 ms después de que la respuesta de la API.

Usabilidad:
- Tasa de éxito en cada uso: El 100% de los usuarios deben ser capaces de crear, actualizar y eliminar un ítem sin errores funcionales en un flujo de trabajo típico.
- Errores del usuario: El número de errores al interactuar con los diferentes formularios de creación de ítems y otras opciones, debe ser mínimo y completarse en menos de 300 ms.

## Variables de entorno y puerto
Variables de entorno y puertos
La configuración de variables de entorno es de suma importancia para la gestión de la configuración entre diferentes ambientes (desarrollo, producción).

## Variables de Entorno:
- Frontend (.env.development): VITE_API_URL=http://127.0.0.1:8000 para que el frontend sepa la URL a la que le debe hacer sus peticiones a la API.
- Backend (.env o configuración del servidor): CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173 crea la lista las URLs del frontend que están permitidas para hacer peticiones.

## Puertos:
-Backend (FastAPI): Puerto 8000.
-Frontend (React/Vite): Puerto 5173.


## Librerias Clave usadas
**Backend (Python)**
El uso de FastAPI en el backend se refleja en proyecto por brindar velocidad y facilidad de uso.

- FastAPI: Para la creación de endpoints de la API que manejan la lógica de negocio para los clientes, órdenes, mantenimientos, ventas, tecnicos y articulos.

- Pydantic: De gran ayuda sobretodo con el tipado, para la validación de datos y la serialización.

- APIRouter: Permite organizar la API en módulos lógicos, como clientes.py y ordenes.py, etc, para un códifo más manejable y escalable.

- BaseModel: Usado para definir estructura de los datos que se esperan en las solicitudes (CrearCliente, CrearOrden) y las respuestas (Cliente, Orden), etc, asegurando que los datos sean válidos y consistentes.

**Frontend :**
Construido en React, una popular biblioteca de JavaScript para crear interfaces de usuario interactivas.

- React: Se usa para crear la interfaz de usuario con componentes reutilizables, como Clientes y Ordenes, que gestionan su propio estado.

- Componentes Funcionales (function ...): Permiten crear componentes de manera simple.

- Hooks (useState, useEffect): Los hooks son cruciales para el manejo del estado y los efectos secundarios en los componentes.

- useState: Para gestionar el estado de los componentes, como los datos del formulario (form), los resultados de la búsqueda (q), y la información de la orden (orden).

- useEffect: Se usa para ejecutar efectos secundarios, como cargar datos del servidor al inicio del componente (useEffect(()=>{ load() },[]) en Clientes.jsx), asegurando que la información esté actualizada cuando el componente se renderiza.

- Vite: El archivo main.jsx sugiere que el proyecto fue creado con Vite, una herramienta de desarrollo que se usa para iniciar proyectos de React de manera rápida, proporcionando un entorno de desarrollo veloz.

- Fetch API: Se usa para interactuar con el backend. La función fetch() en api.js permite realizar solicitudes HTTP (POST, GET, PUT, DELETE) para crear, leer, actualizar y eliminar datos de la API de FastAPI.

- Uvicorn: Servidor ASGI (Asynchronous Server Gateway Interface) de alto rendimiento que ejecuta la aplicación FastAPI. Es el equivalente a "npm run dev" en frontend, pero para Python.

- python-jose: Librería para trabajar con tokens JWT (JSON Web Tokens), esta ermite implementar autenticación stateless.

- passlib y bcrypt: Esta es una librería para hashear contraseñas de forma segura.

- python-multipart: Para permitir a FastAPI procesar datos de formularios


## Estrategia de estados en FrontEnd
A continuación una breve descripción de cómo el uso de React en nuestro proyecto.

Estados locales con useState: El método más básico y fundamental que explica el uso de hook useState para manejar el estado de componentes individuales, como el valor de un campo de formulario o el estado de visibilidad de un modal.

## Manejo de errores y patrones de respuesta

**Manejo de errores:**

	422 (Unprocessable Entity): Respuesta que se devuelve cuando los datos de una solicitud son inválidos o no cumplen con el formato esperado.
	404 (Not Found): Para cuando se intenta acceder a un recurso que no existe en el servidor.
	409 (Conflict): Para indicar que un recurso ya existe y no se puede volver a crear o incluso asociar.

**Patrones de respuesta:*

	200 OK: Para indicar las peticiones GET y PUT exitosas. Se retorna este código cuando se recupera un recurso o se actualiza de forma exitosa PUT. También se usa para listar recursos con GET
	201 Created: Respuesta tras crear un nuevo recurso. Lo usaremos para la creación de una nueva orden POST de Orden o un nuevo Cliente.
	204 No Content: Estado mostrado tras operaciones DELETE exitosa, indicando que la acción se completó con éxito. NO devuelve contenido de la entidad eliminada.

## ROUDMAP
```
+----------+-------------------------------------------------+------------------------+-----------------------------------------------------+----------------------------------+
| Semanas  |  1 a 10                                         |  11                    |  12 a 15                                            |  16                              |
+----------+-------------------------------------------------+------------------------+-----------------------------------------------------+----------------------------------+
|Hitos     |  Preparación para Entrega 2                     |  Entrega 2             |  Preparación para Final                             |  Entrega Final                   |
|          |                                                 |                        |                                                     |                                  |
|Objetivos |  Elaboración de un frontend con las logicas de  |  Revisión y segunta    |  Acabado de detalles de GUI y la logica de Backend  |  Entrega final del proyecto.     |
|          |  negocio en una etapa a nivel intermedio        |  entrega del proyecto  |  finalizada. Mejora del performance y responsividad |  Presentación del producto final |
+----------+-------------------------------------------------+------------------------+-----------------------------------------------------+----------------------------------+

## Tablero Kanban

| To do | Doing                 | Done                        |
|-------:|----------------------|-----------------------------------|
| Replanteamiento entidades MER   | Implementacion logica Orde -> mto -> tecnico| docs 2da entrega del proyecto|
|Depuracion backend| modelado Pydantic con fastAPI y JWT| Definición del modelo MER y logica autenticación                     |
| Finalizacion de la UI| Implementado funcionalidades del 60% de las relaciones         |   |


## Diagrama SPA
```
+----------------+      +----------------+      +-------------------+   +-----------------+
|   Usuario      |      |    Navegador   |      | Servidor Frontend |   | Servidor Backend|
| (Dispositivo)  |      |  (SPA en React)|      |     (Nginx)       |   |   (FastAPI)     |
+----------------+      +----------------+      +-------------------+   +-----------------+
        |                     |                       |                      |
        |  Petición de Carga  |                       |                      |
        |  del SPA (GET /)    |                       |                      |
        +-------------------->|                       |                      |
        |                     | Petición de Carga del |                      |
        |                     |    SPA (GET /)        |                      |
        |                     +---------------------->|                      |
        |                     |                       |                      |
        |                     |                       |  Servir archivos     |
        |                     |                       |    estáticos         |
        |                     |                       | (HTML, JS, CSS)      |
        |                     |                       +--------------------->|
        |                     |                       |                      |
        |  SPA Cargado en el  |                       |                      |
        |       Navegador     |                       |                      |
        |<--------------------+                       |                      |
        |                     |                       |                      |
        |                     |  Petición de API      |                      |
        |                     |  (Ej: POST /login)    |                      |
        |                     +--------------------------------------------->|
        |                     |                       |                      |  Procesar solicitud,
        |                     |                       |                      |  acceder a la base de
        |                     |                       |                      |  datos, etc.
        |                     |                       |                      |<------------------+
        |                     |                       |                      |  Respuesta JSON   |
        |                     |<------------------------------------------+----------------------+
        |                     |                       |                   |
        |                     |  Respuesta JSON       |                   |
        |<----------------------------------------------------------------+
        |                     |                       |                   |
        +---------------------+-----------------------+-------------------+
```


## MODELADO DE DATOS MRD (version 2)
```

  +----------------+             +-----------+
  |     Orden      |             |  Cliente  |
  | consecutivo PK |             | id PK     |   +--------------+
  | tipo           |  n        1 | nombre    |   |   Tecnico    | 
  | id_cliente FK  |<------------| apeliido  |   | id PK        |
  |                |             | email     |   | nombre       |
  +----------------+             | Contacto  |   | apellido     |
      1 |       | 1              | direccion |   | especialidad |
        |       |                +-----------+   +--------------+
        |       |                                      | 1
        |       |     +------------------+             | 
        |       |     |   Mantenimiento  |            <  n
        |       |     | numero PK        |       +---------------+
        |       |     | tipo             | 1     |    MoTecnico  |
        |       | --->| descripcion      |------>| numero_mto FK |
        |          n  | apertura         |     n | id_tenico  Fk |
        |             | cierre           |       +---------------+
        |             | precio           |               nueva entidad
        |             | consecutivo FK   |
        |  n          +------------------+
         >
  +-----------------+                                    +------------+
  |      Venta      |        +-------------------+        |  Articulo  |
  | numero PK       | 1    n |   VentaArticulo   |      1 | id         |
  | consecutivo FK  |------->| numero_venta PK   |<-------| nombre     |
  | fecha           |        | id_articulo  PK   | n      | precio     |
  +-----------------+        | cantidad          |        | Existencia |
                             | precio_registrado |        +------------+
                             +------------------+
```
## Reglas/Constraints (version 2)

|   Entidad     |      Atributo     |          Regla de Unicidad       |Regla de Obligatoriedad|                   Reglas de Rango/Validación               |
|--------------:|-------------------|----------------------------------|-----------------------|------------------------------------------------------------|
|Cliente        |Id                 |Clave Primaria (PK), única        |Obligatoria            |Debe ser un entero positivo y >= 100000                     |
|               |Nombre             |Opcional                          |Obligatoria            |No debe ser solo espacios                                   |
|               |Apellido           |Opcional                          |Obligatoria            |No debe ser solo espacios                                   |
|               |Email              |Única                             |Opcional               |Formato de email válido                                     |
|               |Contacto           |Única                             |Obligatoria            |Debe ser un entero positivo entre 3000000000 y 39999999999  |
|               |Direccion          |Opcional                          |Opcional               |Ninguna                                                     |
|Orden          |Consecutivo        |Clave Primaria (PK), única        |Obligatoria            |Valores enteros positivos                                   |
|               |Tipo               |Opcional                          |Obligatoria            |"Solo ""V"" (venta) o ""M"" (mantenimiento)"                |
|               |Id_Cliente         |Opcional                          |Obligatoria            |Debe existir en la tabla db_cliente                         |
|Venta          |Numero             |Clave Primaria (PK), única        |Obligatoria            |Valores enteros positivos                                   |
|               |Fecha              |Opcional                          |Obligatoria            |Fecha y hora válidas                                        |
|               |Consecutivo_Orden  |Única                             |Obligatoria            |Debe existir en la tabla db_orden                           |
|Mantenimiento  |Numero             |Clave Primaria (PK), única        |Obligatoria            |Valores enteros positivos                                   |
|               |Tipo               |Opcional                          |Obligatoria            |"Solo ""C"" (correctivo) o ""P"" (preventivo)"              |
|               |Descripcion        |Opcional                          |Obligatoria            |Ninguna                                                     |
|               |Apertura           |Opcional                          |Obligatoria            |Fecha y hora válidas                                        |
|               |Cierre             |Opcional                          |Opcional               |Debe ser igual o posterior a la Fecha(de creacion)          |
|               |Precio             |Opcional                          |Obligatoria            |Valor double no negativo                                    |
|               |Consecutivo_Orden  |Única                             |Obligatoria            |Debe existir en la tabla db_orden                           |
|Tecnico        |Id                 |Clave Primaria (PK), única        |Obligatoria            |Valores enteros positivos                                   |
|               |Nombre             |Opcional                          |Obligatoria            |No debe ser solo espacios                                   |
|               |Apellido           |Opcional                          |Obligatoria            |No debe ser solo espacios                                   |
|               |Especialidad       |Opcional                          |Obligatoria            |No debe ser solo espacios                                   |
|Articulo       |Id                 |Clave Primaria (PK), única        |Obligatoria            |Valores enteros positivos                                   |
|               |Nombre             |Opcional                          |Obligatoria            |No debe ser solo espacios                                   |
|               |Precio             |Opcional                          |Obligatoria            |Valor double no negativo                                    |
|               |Existencias        |Opcional                          |Obligatoria            |Solo true o false                                           |
|VentaArticulo  |Numero_Venta       |Parte de la Clave Compuesta       |Obligatoria            |Debe existir en la tabla db_venta                           |
|               |Id_Articulo        |Parte de la Clave Compuesta       |Obligatoria            |Debe existir en la tabla db_articulos                       |
|               |cantidad           |Opcional                          |Obligatoria            |valor >= 1                                                  |
|               |precio_registrado  |Opcional                          |Obligatoria            |valor >= 0                                                  |


## TABLA DE API

| Método | Ruta                 | Query/Body                                       | Respuestas (códigos)                      |                                       Notas/Validaciones                                             |
|-------:|----------------------|--------------------------------------------------|-------------------------------------------|------------------------------------------------------------------------------------------------------|
| POST   | /clientes            | {"id": "int", "nombre": "str"...} parcial o comp | 201 (Location), 409 (duplicado), 422      | Campos unicos: id  y nombre. El servidor devolverá un error 409 si nombre o id ya existe             |
| PUT    | /clientes/{id}       | {"id": "int", "nombre": "str"...}                | 200, 404, 409, 422 		       | Revisión de tipo para los atributos a cambiar. Si falla, se devuelve un error 402                    |
| GET    | /clientes/{id}       | —                                                | 200, 404                                  | Error 404 si el {id} no existe en db_clientes                                                        |
| GET    | /clientes            | q, order, offset, limit                          | 200 (lista) + `Total-Count_clientes`      | Filtros por q (búsqueda por nombre), order(asc|desc), y paginación con offset y limit                |
| GET    | /clientes/todos      |                                                  | 200 (lista)                               | Retorna el arreglo de los clientes con sus arreglos de ordenes                                       |
| DELETE | /clientes/{id}       | —                                                | 204, 404                                  | Si no tiene ordenes se elimina un Cliente que en futuros GETs retorna status 404                     |
|        |                      |                                                  |                                           |                                                                                                      |
| POST   | /ordenes             | {"tipo: "string",...,"id_cliente": "int"}        | 201 (Location), 422, 409 (conflicto)      | Unicidad. Requiere id_cliente en bd_clientes. Retorna 404 cuando un id_cliente no existe             |
| PUT    | /ordenes/{id}        | {"id": "int"}                                    | 200, 404, 422     			       | Requiere id_cedula existente en bd_clientes. Se devuelve un error 404 si no existe                   |
| GET    | /ordenes/{id}        | —                                                | 200, 404                                  | Error 404 si el {consecutivo_orden} no existe en db_ordenes                                          |
| GET    | /ordenes             | q, order, offset, limit                          | 200 (lista) + `Total-Count_ordenes`       | Filtros por q: (búsqueda por tipo), order(asc|desc), y paginación con offset y limit                 |
| GET    | /ordenes/todos       |                                                  | 200 (lista)                               | Retorna el arreglo de las ordenes con sus arreglos de matenimientos                                  |
| DELETE | /ordenes/{id}        | —                                                | 204, 404                                  | Solo se puede eliminar si el mantenimiento/venta está cerrado. Error 404 si no existe                |
|        |                      |                                                  |                                           |                                                                                                      |
| POST   | /ventas              |{"consecutivo_orden": "int", "fecha": "datetime"  | 201 (Location), 422, 409 (conflicto)      | Unicidad. Requiere consecutivo en bd_orden. Retorna 404 cuando un si no existe en orden              |
| GET    | /ventas/{id}         | —                                                | 200, 404                                  | Requiere id_cedula existente en bd_ventas. Se devuelve un error 404 si no existe                     |
| GET    | /ventas              | q, order, offset, limit                          | 200 (lista) + `Total-Count_ventas`        | Filtros por q (búsqueda por articulo), order(asc|desc), y paginación con offset y limit              |
| GET    | /ventas/todos        |                                                  | 200 (lista)                               | Retorna el arreglo de las ventas                                                                     |
|        |                      |                                                  |                                           |                                                                                                      |
| POST   | /mantenimientos      | {"consecutivo_orden": "int"..."existencia": "int"| 201 (Location), 409 (conflicto), 422      | Unicidad. Requiere consecutivo_orden en bd_orden. Retorna 404 cuando un consecutivo no existe        |
| PUT    | /mantenimientos/{id} | {"consecutivo_orden": "int"..."existencia": "int"| 200, 404, 422 		               | Rev de tipo para los atributos a cambiar y existencia de tecnico. Si falla, se devuelve un error 402 |
| GET    | /mantenimientos/{id} | —                                                | 200, 404                                  | Error 404 si el {numero} no existe en db_ventas                                                      |
| GET    | /mantenimientos      | q, sort, order, offset, limit                    | 200 (lista) + `Total-Count_mantenimientos`| Filtros por q, sort (tipo|descripcion|tecnico), order(asc|desc), y paginación con offset y limit     |
| GET    | /mantenimientos/todos|                                                  | 200 (lista)                               | Retorna el arreglo de los mantenimientos                                                             |
| DELETE | /mantenimientos/{id} | —                                                | 204, 404                                  | Solo se puede eliminar si el mantenimiento está cerrado. Error 404 si no existe                      |
|        |                      |                                                  |                                           |                                                                                                      |
| POST   | /articulos           | {"id"= "int", "nombre": "str"...} parcial o comp | 201 (Location), 409 (duplicado), 422      | Unicidad: id                                                                                         |
| PUT    | /articulos/{id}      | {"id"= "int", "nombre": "str"...} parcial o comp | 200, 404, 422 		               | Rev de tipo para los atributos a cambiar. Si falla, se devuelve un error 402                         |
| GET    | /articulos/{id}      | —                                                | 200, 404                                  | Error 404 si el {id} no existe en db_articulos                                                       |
| GET    | /articulos           | q, order, offset, limit                          | 200 (lista) + `Total-Count_articulos`     | Filtros por q (búsqueda por nombre), order(asc|desc), y paginación con offset y limit                |
| GET    | /articulos/todos     |                                                  | 200 (lista)                               | Retorna el arreglo de los articulos                                                                  |
| DELETE | /articulos/{id}      | —                                                | 204, 404                                  | Si no hace parte de una venta se puede eliminar, error 404 si no existe en la bd_articulo            |
|        |                      |                                                  |                                           |                                                                                                      |
| POST   | /tecnicos            | {"id": "int"..."especialidad": "str"} completo   | 201 (Location), 409 (conflicto), 422      | Unicidad. Requiere consecutivo_orden en bd_orden. Retorna 404 cuando un consecutivo no existe        |
| PUT    | /tecnicos/{id}       | {"id": "int"..."especialidad": "str"} parc o comp|200, 404, 422 		               | Rev de tipo para los atributos a cambiar y existencia de tecnico. Si falla, se devuelve un error 402 |
| GET    | /tecnicos/{id}       | —                                                | 200, 404                                  | Error 404 si el {numero} no existe en db_tecnicos                                                    |
| GET    | /tecnicos            | q, sort, order, offset, limit                    | 200 (lista) + `Total-Count_tecnicos`      | Filtros por q, sort (nombre|apellido), order(asc|desc), y paginación con offset y limit              |
| GET    | /tecnicos/todos      |                                                  | 200 (lista)                               | Retorna el arreglo de los tecnicos                                                                   |
| DELETE | /tecnicos/{id}       | —                                                | 204, 404                                  | Solo se puede eliminar si no tiene mantenimientos asociados                                          |
|        |                      |                                                  |                                           |                                                                                                      |
| POST   | /mtoTecs             | {"num_mto": "int"..."id_tecico": "int"} completo | 201 (Location), 409 (conflicto), 422      | Unicidad. Req numero_mantenimiento e id_tecnico en bds, retorna 404 si no                            |
| PUT    | /mtoTecs/{num}/{id}  | {"num_mto": "int"..."id_tecico": "int"} completo |200, 404, 422 		               | Rev de tipo para los atributos a cambiar y en DBs. Si falla, se devuelve un error 402                |
| GET    | /mtoTecs/mto/{num}   | —                                                | 200, 404                                  | Error 404 si el {numero_mantenimiento} no existe en db_mtoTecnicos                                   |
| GET    | /mtoTecs/tecnico/{id}| —                                                | 200 (lista) + `Total-Count_tecnicos`      | Error 404 si el {id_tecnico} no existe en db_mtoTecnicos                                             |
| GET    | /mtoTecs/todos       |                                                  | 200 (lista)                               | Retorna el arreglo de las asignaciones de tecnico a mantenimiento                                    |
| DELETE | /mtoTecs/{id}        | —                                                | 204, 404                                  | Solo se puede eliminar si no tiene mantenimientos asociados                                          |


## Convenciones

El endpoint base para acceder a la lista de ordenes es /ordenes.

	Paginación: Para manejar grandes listas de datos, usamos los parámetros offset y limit.
		offset: Indica el número de elementos que se deben omitir desde el inicio de la lista.
		limit: Define la cantidad máxima de elementos a devolver en una sola respuesta.
  
	Ordenamiento: Los parámetros sort y order se utilizan para ordenar la lista de resultados.
		sort: Especifica el campo por el cual se ordenarán los datos (por ejemplo, created_at, price, name).
		order: Determina la dirección del orden, que puede ser asc (ascendente) o desc (descendente).
  
	Filtros: Los filtros se aplican a través de parámetros de consulta (query parameters).
		q: Se usa para realizar una búsqueda de texto completo en campos como el nombre o la descripción.
		category: Permite filtrar los productos por una categoría específica.
		min_price y max_price: Sirven para filtrar productos dentro de un rango de precios.

 Ejemplo de la consulta:
		GET /ordenes?V=P&order=asc&offset=0&limit=20
	Esta solicitud pide:
		Ordenes de Venta "V" (valor entregado a q es V) en su atributo de tipo(de orden).
		Ordenados por precio de menor a mayor (order=desc).
		Saltando los primeros 0 resultados (offset=0).
		Devolviendo un máximo de 20 ventas (limit=20).

	Respuesta Esperada
		Códigos de estado: La respuesta del servidor debe incluir un código de estado HTTP para indicar el resultado de la operación.
		200 OK: La solicitud se procesó correctamente y se devuelven los datos.
		404 Not Found: El recurso solicitado no existe.
		422 Bad Request: La solicitud contiene parámetros inválidos o incorrectos.
		Encabezados (Headers): Es una convención común incluir un encabezado como X-Total-ordenes para informar al usuario el número total de registros de ordenes, sin importar la paginación. X-Total-ordenes: 133Cuerpo de la Respuesta (Body): El cuerpo de la respuesta es una matriz de objetos JSON, donde cada objeto representa una orden.

## Ejemplos JSON
```
# creación de una instancia Cliente
POST /clientes
200 OK
X-Total-Count: 1
[
  { "id": 100100100,
    "nombre": "Pepito",
    "apellido": "Perez",   
	"email": "pepitoperez2000@mail.com",
	"contacto": 3012223344,
	"direccion": "Av. Colombia 1432"
  }
]

# consulta y modificación Cliente por id
# PUT /clientes/100100100
GET /clientes/100100100
200 OK
 [
   { "id": 100100100,
     "nombre": "Pepito Perez",
	   "email": "pepitoperez2000@mail.com",
	   "contacto": 3012223344,
	   "direccion": "Av. Colombia 1432"
   }
 ]

# consulta con criterios y ordenamiento
GET /mantenimientos?q=C&sort=tipo&order=asc&offset=0&limit=5
200 OK
X-Total-Count: 20
[
  { "numero;" 12",
    "tipo": "C",
    "descripcion": "Se cambió el cuchuflí del coso del aire",
    "fecha": '2025-09-01T15:30:00',
    "finalizacion": '2025-09-01T16:15:00',
    "precio": 225000.0
    "consecutivo_orden": 55   
  },
  {
    "numero;" 12",
    "tipo": "P",
    "descripcion": "Engrase de poleas set aire",
    "fecha": '2025-09-01T16:15:00',
    "finalizacion": '2025-09-01T17:00:00',
    "precio": 110000.0
    "consecutivo_orden": 55   
  }
]

## Carga de la base de datos con persistencia ##
Dentro del directorio de "backend" digitamos:
```bash
python carga_casos_db.py
```

## Instalacion **uv** (fast Python packaging)
- Windows (PowerShell):
```powershell
powershell -ExecutionPolicy Bypass -c "irm https://astral.sh/uv/install.ps1 | iex"
uv --version
```
- macOS/Linux:
```bash
curl -Ls https://astral.sh/uv/install.sh | sh
# then restart your shell or:
source ~/.cargo/env 2>/dev/null || true
uv --version
```

## Instrucciones para ejecutar backend_FastAPI (port 8000)

```bash
Paso 1. (dirigirse al directorio ded backend).
cd backend

Paso 2. (creacion y gestión de entorno virtual).
uv venv

En PowerShell (windows): .venv\Scripts\Activate
# Para macOS/Linux: source .venv/bin/activate

Paso 3. Instalación de dependencias necesarias.
uv pip install -r requirements.txt
uv sync

Paso 4. Ejecutar servicdor
uv run uvicorn app.main:app --reload --port 8000

Paso 5. Probar
http://127.0.0.1:8000/docs
```

## Instrucciones para ejecutar Frontend — React (Vite, port 5173)
```bash
npm ci
cp .env.example .env   # VITE_API_URL=http://localhost:8000
npm run dev
# App: http://localhost:5173 (por defecto)
# open http://localhost:5173
```
## Soportes de la entrega
**Capturas de pantalla y grabacion:**
https://drive.google.com/file/d/1ckSHOZiI7edQq0cSrZOZJL4X7DP_6awq/view?usp=sharing

## NOTAS:
Debido a dificultades tecnicas el resultado final esta contenido en la rama...
El link de la entrega: https://github.com/sergium-tg/proy-equipo5-entregable2-semana11.git

## CAMBIOS EN EL APLICATIVO/DESARROLLO:
Se realizó los siguientes cambios:
Se establece la entidad MtoTecnico para el manejo de la relacion M:N (un mantenimiento puede tener muchos tecnicos y un tecnico puede estar a cargo de muchos antenimientos.
Se agregó el endpoint de consulta ../todos para listar todas las instancias de cada entidad.
En la entidad CLIENTE y TECNICO se cambio el atributo "nombre"(completo) por "nombre" y "apellido".
En la entidad MANTENIMIENTO se cambió fecha por "apertura" y finalizacion por "cierre".
La entidad DETALLE se cambio por VentaArticulo, para el manejo de la relacion M:N.

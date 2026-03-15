# Guía de Endpoints del Backend

Esta guía contiene toda la información necesaria para conectar el frontend con este backend desarrollado en Next.js.

## Información General
- **Base URL**: Generalmente `http://localhost:3000` en desarrollo.
- **Content-Type**: `application/json`
- **Autenticación**: Se utiliza **Supabase Auth** mediante un token Bearer en el header de `Authorization`.

---

## 1. Registro de Usuario (Register)
Crea una nueva cuenta de usuario en el sistema.

- **Endpoint**: `/api/users/register`
- **Método**: `POST`
- **Cuerpo de la Solicitud (JSON)**:
| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `email` | String | Sí | Correo electrónico p.ej. `usuario@gmail.com` |
| `password` | String | Sí | Mínimo 8 caracteres. |
| `username` | String | Sí | Nombre de usuario único (letras, números, `_`). |
| `role` | String | Sí | Debe ser `"FRONTEND"` o `"BACKEND"`. |

- **Respuesta Exitosa (201 Created)**:
```json
{
  "message": "Usuario registrado exitosamente.",
  "user": { "id": "uuid", "email": "...", "username": "...", "role": "..." }
}
```

---

## 2. Inicio de Sesión (Login)
Autentica al usuario y proporciona un token de acceso.

- **Endpoint**: `/api/users/login`
- **Método**: `POST`
- **Cuerpo de la Solicitud (JSON)**:
| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `email` | String | Sí | Correo registrado. |
| `password` | String | Sí | Contraseña del usuario. |

- **Respuesta Exitosa (200 OK)**:
```json
{
  "message": "Inicio de sesión exitoso.",
  "user": { "id": "...", "email": "...", "username": "..." },
  "accessToken": "eyJhbGciOiJIUzI1..."
}
```
> [!IMPORTANT]
> El `accessToken` debe guardarse en el frontend (p.ej. en cookies o localStorage) para enviarlo en las peticiones protegidas.

---

## 3. Cerrar Sesión (Logout)
Invalida la sesión actual del usuario.

- **Endpoint**: `/api/users/logout`
- **Método**: `POST`
- **Headers Obligatorios**:
  - `Authorization: Bearer <accessToken>`

- **Respuesta Exitosa (200 OK)**:
```json
{ "message": "Sesión cerrada exitosamente." }
```

---

## Cómo realizar peticiones protegidas
Cualquier endpoint que no esté en la lista de rutas públicas (`/api/users/login`, `/api/users/register`) requerirá el token de acceso. Debes incluirlo en el header de la siguiente manera:

```http
Authorization: Bearer <TU_ACCESS_TOKEN>
```

## Manejo de Errores Comunes
El backend devuelve objetos de error consistentes:
- **400 (Bad Request)**: Datos inválidos o faltantes.
- **401 (Unauthorized)**: Token ausente o inválido, o credenciales incorrectas.
- **409 (Conflict)**: El email o nombre de usuario ya existen.
- **500 (Internal Server Error)**: Error inesperado en el servidor.

Estructura de error:
```json
{
  "error": "Descripción corta del error",
  "details": "Detalles técnicos (opcional)"
}
```

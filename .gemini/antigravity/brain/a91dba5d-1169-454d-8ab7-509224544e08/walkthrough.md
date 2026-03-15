# Guía de Verificación Paso a Paso

Sigue estos pasos para asegurarte de que tu backend y frontend estén perfectamente sincronizados.

## 1. Preparación del Entorno
Asegúrate de haber seguido los pasos en el [README.md](file:///Users/santiagovalencia/backend%20proyecto%20inf%201/Proyecto_Informatico/README.md):
1. Ejecuta `npm install` para instalar las librerías necesarias.
2. Configura tu archivo `.env` con las credenciales de Supabase.
3. Ejecuta `npm run db:push` para preparar la base de datos.
4. Inicia el servidor con `npm run dev`.

## 2. Verificación Manual de Endpoints
Puedes probar los endpoints directamente desde tu terminal para confirmar que responden correctamente antes de usar el frontend.

### Prueba de Registro
Copia y pega este comando en tu terminal:
```bash
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "email": "test_user@example.com",
  "password": "password123",
  "username": "test_dev",
  "role": "FRONTEND"
}'
```
*Si recibes un JSON con un mensaje de éxito, el registro funciona.*

### Prueba de Login
Una vez registrado, prueba iniciar sesión:
```bash
curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test_user@example.com",
  "password": "password123"
}'
```
*Deberías recibir un `accessToken`. Este es el token que el frontend guardará automáticamente.*

## 3. Verificación en el Frontend
1. Abre tu aplicación frontend.
2. Ve a la página de registro e intenta crear un usuario con un rol (FRONTEND/BACKEND).
3. Abre las herramientas de desarrollador del navegador (F12) -> pestaña **Red (Network)**.
4. Verifica que la petición a `/api/users/register` devuelva un estatus `201`.
5. Intenta hacer login y verifica que el token se guarde en el `localStorage`.

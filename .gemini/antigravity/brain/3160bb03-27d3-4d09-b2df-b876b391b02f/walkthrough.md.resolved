## Arquitectura Modular del Proyecto

Siguiendo el estilo de los proyectos de Aceternity y las mejores prácticas de Next.js, he reestructurado completamente el frontend:

- **Centralización en `src`**: He eliminado la carpeta externa `frontend` y movido todos los componentes a `src/components`, organizados por capas (`layout`, `auth`, `home`, `ui`).
- **Páginas Minimalistas**: Los archivos `page.tsx` en `src/app` ahora actúan únicamente como puntos de entrada que llaman a sus respectivos componentes UI, manteniendo el código limpio y mantenible.
- **Estandarización de Estilos**: He corregido el archivo `src/app/globals.css` para que sea 100% compatible con Tailwind v4, asegurando que los estilos se apliquen correctamente en todas las páginas.

---

### Página de Inicio (Home)
- **[page.tsx](file:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico/src/app/page.tsx)**: Ahora solo invoca al componente `Hero`.
- **[Hero.tsx](file:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico/src/components/home/Hero.tsx)**: Componente modular con diseño centrado y volumétrico.

### Páginas de Autenticación
- **[login/page.tsx](file:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico/src/app/login/page.tsx)** y **[register/page.tsx](file:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico/src/app/register/page.tsx)**: Ahora solo invocan al `AuthContainer`.
- **[AuthContainer.tsx](file:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico/src/components/auth/AuthContainer.tsx)**: Lógica y UI de autenticación centralizada.

## Verificación Final

- **Compilación**: `npm run build` finalizado sin errores.
- **Consistencia**: Todos los componentes comparten un sistema de diseño basado en `slate-950`, `blue-500` y `purple-500`.
- **Organización**: El código está separado lógicamente entre lógica de ruteo (`src/app`) y componentes de UI (`frontend/components`).

---
Puedes ver los cambios en vivo ejecutando `npm run dev`.

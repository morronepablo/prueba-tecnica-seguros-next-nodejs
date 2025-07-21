# Proyecto: Tienda Online Avanzada

Aplicación full-stack de una tienda online con CRUD de productos, autenticación y un dashboard para administradores.

## Capturas de Pantalla / Video

_(Opcional, pero muy recomendado. Añade aquí GIFs o imágenes de tu app funcionando)_

## Stack Tecnológico

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Zustand
- **Backend:** Node.js, Express
- **Base de Datos:** MongoDB (Mongoose)
- **Autenticación:** JWT (JSON Web Tokens)
- **Almacenamiento de Imágenes:** Cloudinary

## Funcionalidades

- [x] CRUD completo de productos.
- [x] Búsqueda, filtros y paginación de productos.
- [x] Registro y Login de usuarios con roles (admin, cliente).
- [x] Rutas protegidas y autorización por rol.
- [x] Dashboard para administradores con métricas clave.
- [x] Diseño responsivo (Mobile-First).

## Instalación y Puesta en Marcha

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repo.git
    cd tu-repo
    ```
2.  **Configurar Backend:**
    ```bash
    cd backend
    npm install
    # Crea un archivo .env y añade las variables necesarias (ver .env.example)
    npm run dev
    ```
3.  **Configurar Frontend:**
    ```bash
    cd ../frontend
    npm install
    # Crea un archivo .env.local y añade NEXT_PUBLIC_API_URL
    npm run dev
    ```

## Consideraciones Técnicas

- Se utilizó una arquitectura monorepo-like para separar frontend y backend.
- El estado global del frontend se maneja con Zustand, persistiendo la sesión del usuario en localStorage.
- La autenticación se basa en JWT, con middleware en el backend para proteger rutas y verificar roles.

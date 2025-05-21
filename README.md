# LinkedIn Node Clean Architecture

Este proyecto es una API de autenticación y gestión de usuarios construida con Node.js, Express, MongoDB y una arquitectura limpia (Clean Architecture). Incluye un frontend en React + Vite para la autenticación y registro de usuarios.

## Características

- **Backend Node.js + Express**
  - Registro y login de usuarios con JWT.
  - Hash de contraseñas con bcryptjs.
  - Validación de datos y manejo de errores personalizados.
  - Arquitectura limpia: separación de capas (domain, data, infrastructure, presentation).
  - Conexión a MongoDB usando Mongoose.
  - Middleware de autenticación JWT.
  - Variables de entorno para configuración segura.
- **Frontend React + Vite**
  - Formularios de login y registro.
  - Consumo de la API usando Axios.
  - Manejo de rutas protegidas.
  - Estilos modernos y responsivos.

## Estructura del Proyecto

```
.
├── src/
│   ├── app.ts
│   ├── config/
│   ├── data/
│   ├── domain/
│   ├── infrastructure/
│   └── presentation/
│       ├── auth/
│       ├── middlewares/
│       ├── FrontEnd/
│       ├── routes.ts
│       └── server.ts
├── docker-compose.yml
├── .env.template
├── .env
├── package.json
└── README.md
```

## Instalación

### 1. Clona el repositorio

```sh
git clone https://github.com/tu-usuario/linkedin-node-clean.git
cd linkedin-node-clean
```

### 2. Configura las variables de entorno

Copia el archivo `.env.template` a `.env` y completa los valores necesarios:

```sh
cp .env.template .env
```

Asegúrate de tener configurado el `MONGO_URL`, `MONGO_DB_NAME` y `JWT_SEED`.

### 3. Instala las dependencias

```sh
npm install
```

### 4. Levanta la base de datos MongoDB con Docker

```sh
docker-compose up -d
```

Esto iniciará un contenedor de MongoDB en el puerto 27017.

### 5. Ejecuta el backend en modo desarrollo

```sh
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

### 6. Ejecuta el frontend

```sh
cd src/presentation/FrontEnd
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173`.

## Endpoints principales

- `POST /api/auth/register` — Registro de usuario
- `POST /api/auth/login` — Login de usuario
- `GET /api/auth/` — Obtener usuarios (requiere JWT)

## Variables de entorno

Ejemplo de `.env`:

```
PORT=3000
MONGO_URL=mongodb://localhost:27017/mystore
MONGO_DB_NAME=mystore
JWT_SEED=tu_jwt_seed_secreto
```

## Scripts útiles

- `npm run dev` — Ejecuta el backend en modo desarrollo (con hot reload)
- `npm run build` — Compila el backend a producción
- `npm start` — Ejecuta el backend compilado
- `cd src/presentation/FrontEnd && npm run dev` — Ejecuta el frontend

## Licencia

MIT

---

Desarrollado con ❤️ siguiendo principios de Clean Architecture.

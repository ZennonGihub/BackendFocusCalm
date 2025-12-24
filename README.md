# 🍅 API FocusCalm 🍅

A brief description of what this project does and who it's for

API RESTful completa para una aplicación de productividad basada en la técnica Pomodoro. Diseñada con una arquitectura modular y escalable en Node.js, permite la gestión integral de tareas, sesiones de enfoque, estadísticas en tiempo real y seguridad mediante JWT y gestión de roles.

## 🔑 Credenciales para probar la API

Para probar los endpoints protegidos, puedes registrar un usuario nuevo o utilizar las siguientes credenciales (si ejecutaste el seed):

|       Usuario        | Contraseña |
| :------------------: | :--------: |
| `test@focuscalm.com` | `admin123` |

📝 Cómo probar las rutas protegidas
El sistema utiliza autenticación vía Bearer Token.

Ve al endpoint POST /api/v1/auth/login y usa las credenciales.

Copia el token que recibes en la respuesta.

En tu cliente API (Postman/Insomnia), ve a la pestaña Headers o Auth.

Agrega el header: Authorization: Bearer <TU_TOKEN>.

Agrega el header: api: <TU_API_KEY>

## 🏗️ Arquitectura y Diseño

El proyecto sigue una arquitectura Monolítica Modular, diseñada para facilitar la escalabilidad y el mantenimiento, separando claramente las responsabilidades.

Patrón de Diseño
Se utiliza el patrón Controller-Service-Data Access:

Router (Network): Define los endpoints y pasa la petición al controlador.

Controller: Gestiona la petición HTTP (Request/Response) y maneja los errores.

Service: Contiene toda la lógica de negocio pura (Cálculo de rachas, validación de tareas activas, lógica Pomodoro).

Prisma (ORM): Abstrae la conexión y consultas a la base de datos PostgreSQL.

🗂️ Diagrama Entidad-Relación
La base de datos está normalizada, utilizando relaciones robustas para manejar el historial de sesiones y estados de tareas.

![Diagrama de Base de Datos](./img/imagenDiagrama.jpeg)

## 🚀 Tecnologías

Lenguaje y Base de Datos
Node.js & Express: Arquitectura del servidor.

PostgreSQL: Base de datos relacional robusta.

Prisma ORM: Manejo de modelos, migraciones y tipado seguro de datos.

Librerías y Herramientas
Seguridad:

👮 Passport.js: Estrategia de autenticación JWT.

🔐 Bcrypt: Hashing de contraseñas.

🛡️ Joi: Validación estricta de datos de entrada.

Utilidades:

💥 Boom: Manejo de errores HTTP estandarizados.

🌐 Cors: Gestión de acceso cruzado.

⚙️ Dotenv: Variables de entorno.

## ⚙️ Instalación y Configuración Local

1. Clonar el repositorio

```bash
git clone https://github.com/TuUsuario/FocusCalmBackend.git
cd FocusCalmBackend
```

```bash
npm install
```

```bash
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/focus_calm_db?schema=public"
API_KEY=tu_api_key_secreta
JWT_SECRET=tu_secreto_jwt
```

```bash
# Ejecutar migraciones
npx prisma migrate dev --name init

# Poblar la base de datos (Roles y Status)
node prisma/seed.js
```

```bash
npm run dev
```

## 👨‍💻 Desarrollado por [Diego Araya]

Proyecto de Portafolio - Full Stack Developer

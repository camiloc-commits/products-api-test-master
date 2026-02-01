# Products API

API REST para gestión de productos e inventario.

## Stack Tecnológico
- Node.js + Express
- MongoDB
- JWT para autenticación

## Instalación

### Opción 1: Con Docker (Recomendado)

```bash
# Copiar variables de entorno
cp .env.example .env

# Levantar todos los servicios (MongoDB + API)
docker-compose up -d

# Ver logs
docker-compose logs -f api
```

### Opción 2: Manual (sin Docker)

```bash
# Instalar dependencias
npm install

# Asegúrate de tener MongoDB corriendo
mongod

# Copiar variables de entorno
cp .env.example .env

# Ejecutar
npm start
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto (o copia `.env.example`):

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/products_db
JWT_SECRET=tu_secreto_super_seguro
NODE_ENV=development
```

**Nota:** Si usas Docker, cambia `MONGODB_URI` a:
```
MONGODB_URI=mongodb://mongodb:27017/products_db
```

## Ejecución

### Con Docker:
```bash
docker-compose up
```

### Sin Docker:
```bash
npm start
```

Para desarrollo:
```bash
npm run dev
```

### Comandos útiles de Docker:

```bash
# Detener servicios
docker-compose down

# Reconstruir imagen
docker-compose build

# Ver logs de MongoDB
docker-compose logs -f mongodb

# Entrar al contenedor de MongoDB
docker-compose exec mongodb mongosh

# Limpiar volúmenes (resetear BD)
docker-compose down -v
```

## Endpoints

### Productos
- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener un producto
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Usuarios
- `POST /api/users/register` - Registrar usuario
- `POST /api/users/login` - Iniciar sesión

## Base de datos

### Con Docker:
MongoDB se levanta automáticamente con `docker-compose up`

### Sin Docker:
Asegúrate de tener MongoDB corriendo en tu máquina:

```bash
mongod
```

## Arquitectura del proyecto

```
├── config/         # Configuración de la base de datos
├── controllers/    # Lógica de negocio (usuarios, productos)
├── middlewares/    # Middlewares de autenticación, validación y errores
├── models/         # Modelos de Mongoose (User, Product)
├── routes/         # Rutas de la API (users, products)
├── utils/          # Utilidades (generar token, helpers)
├── api.http        # Pruebas de endpoints para REST Client
├── server.js       # Punto de entrada principal
├── Dockerfile      # Imagen Docker de la API
├── docker-compose.yml  # Orquestación de servicios
├── .env            # Variables de entorno
├── .env.example    # Ejemplo de configuración de entorno
└── package.json    # Dependencias y scripts
```

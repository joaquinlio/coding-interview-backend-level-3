# coding-interview-backend-level-3

## Descripción

Este proyecto es una API REST que permite realizar operaciones CRUD sobre una entidad de tipo `Item`. La entidad tiene los siguientes campos:

- `id`: Identificador único del item.
- `name`: Nombre del item.
- `price`: Precio del item (debe ser un valor no negativo).

---

## Tecnologías Utilizadas

- **Node.js** con **TypeScript**.
- **Hapi.js** como framework web.
- **PostgreSQL** como base de datos.
- **Docker** y **Docker Compose** para la configuración del entorno.
- **Jest** para pruebas unitarias y E2E.

---

## Configuración del Proyecto

### Dependencias

Asegúrate de tener instalados los siguientes requisitos en tu máquina:

- **Node.js** (v16 o superior)
- **Docker** y **Docker Compose**

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```plaintext
# Base de datos principal
DATABASE_URL=postgresql://postgres:password@localhost:5432/items_db

# Base de datos para pruebas
DATABASE_URL_TEST=postgresql://postgres:password@localhost:5434/items_test_db
```

---

### Instalación y Uso

1. Clonar el Repositorio
   Clona este repositorio en tu máquina local:

```sh
git clone https://github.com/joaquinlio/coding-interview-backend-level-3
cd coding-interview-backend-level-3
```

2. Instalar Dependencias
   Instala las dependencias del proyecto:

```sh
npm install
```

3. Iniciar el Servidor
   Inicia el servidor en modo desarrollo:

```sh
npm run start
```

El servidor estará disponible en `http://localhost:3000`.

---

### Pruebas

Ejecutar Todas las Pruebas
Ejecuta las pruebas unitarias y E2E:

```sh
npm test
```

---

### Endpoints Disponibles

CRUD de `Item`

- **POST /items**: Crear un nuevo item.
- **GET /items**: Obtener todos los items.
- **GET /items/{id}**: Obtener un item por su ID.
- **PUT /items/{id}**: Actualizar un item por su ID.
- **DELETE /items/{id}**: Eliminar un item por su ID.

Endpoint de Salud

- **GET /ping:**: Verifica que el servidor esté funcionando correctamente.

---

### Estructura del Proyecto

```plaintext
src/
├── controllers/        # Controladores HTTP
├── models/             # Modelos de datos
├── repositories/       # Acceso a la base de datos
├── routes/             # Definición de rutas
├── services/           # Lógica de negocio
├── utils/              # Utilidades (e.g., conexión a la base de datos)
test/
├── controllers/        # Pruebas unitarias de controladores
├── repositories/       # Pruebas unitarias de repositorios
├── services/           # Pruebas unitarias de servicios
e2e/                    # Pruebas E2E
```

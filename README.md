# Restaurante - API de platos con MongoDB y Mongoose

API REST para gestionar los platos de un restaurante, hecha con Node.js, Express, Mongoose y MongoDB Atlas.

Cada plato tiene: nombre, descripción, ingredientes, precio, si es apto para celíacos, veganos y diabéticos, calorías e imagen (URL).

## Tecnologías

- Node.js + Express
- MongoDB Atlas
- Mongoose

## Estructura

```
src/
├── controllers/platos.controller.js   # lógica del CRUD
├── models/Plato.js                    # schema de Mongoose
├── routes/platos.routes.js            # endpoints
├── db.js                              # conexión a MongoDB
└── index.js                           # servidor Express
sentencias-mongosh.js                  # sentencias de creación, altas, bajas y modificaciones
requests.http                          # pruebas de los endpoints
```

## Cómo ejecutarlo

1. Instalar dependencias: `npm install`
2. Copiar `.env.example` como `.env` y completar `MONGODB_URI` con la conexión propia.
3. Cargar los datos: ejecutar en mongosh las sentencias de `sentencias-mongosh.js`.
4. Levantar el servidor: `npm run dev`

## Endpoints

| Método | URL | Descripción |
|---|---|---|
| GET | `/api/platos` | Lista todos los platos. Filtros: `celiacos`, `veganos`, `diabeticos`, `maxCalorias` |
| GET | `/api/platos/:id` | Obtiene un plato por su id |
| POST | `/api/platos` | Crea un plato |
| PUT | `/api/platos/:id` | Modifica un plato |
| DELETE | `/api/platos/:id` | Elimina un plato |

## Pruebas

Abrir `requests.http` en VS Code con la extensión **REST Client** y ejecutar los pedidos en orden con *Send Request*.
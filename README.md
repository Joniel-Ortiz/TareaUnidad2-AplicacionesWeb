# API de Inventario de Productos

API REST desarrollada con Node.js, Express y MongoDB para la gestion de inventario de productos.

## Requisitos

- Node.js 18+
- MongoDB

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
npm start
```

El servidor se ejecuta en http://localhost:3000

## Endpoints

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| POST | /productos | Crear un producto |
| GET | /productos | Listar todos los productos |
| GET | /productos/:id | Obtener un producto por ID |
| PUT | /productos/:id | Actualizar un producto |
| DELETE | /productos/:id | Eliminar un producto |
| GET | /productos/exportar | Exportar productos a CSV |

## Eventos en Tiempo Real (Socket.IO)

- `producto_creado` - Se emite al crear un producto
- `producto_actualizado` - Se emite al actualizar un producto
- `producto_eliminado` - Se emite al eliminar un producto

## Ejemplo de Peticion POST /productos

```json
{
  "id": 1,
  "nombre": "Laptop HP",
  "categoria": "Tecnologia",
  "precioCompra": 800000,
  "precioVenta": 1200000,
  "stock": 10,
  "tieneIva": true
}
```

## Ejemplo de Respuesta

```json
{
  "mensaje": "Producto creado con exito",
  "producto": {
    "id": 1,
    "nombre": "Laptop HP",
    "categoria": "Tecnologia",
    "precioCompra": 800000,
    "precioVenta": 1200000,
    "stock": 10,
    "tieneIva": true,
    "_id": "64f..."
  }
}
```

## Estructura del Proyecto

```
src/
  controllers/
    productoController.js
  middlewares/
    errorHandler.js
    validar.js
  model/
    producto.js
  routes/
    productoRoutes.js
  services/
    productoService.js
  public/
    app.js
```

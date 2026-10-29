const productoService = require('../services/productoService');

const crear = async (req, res, next) => {
    try {
        const producto = await productoService.crearProducto(req.body);
        req.app.get('io').emit('producto_creado', producto);
        res.status(201).json({
            mensaje: 'Producto creado con exito',
            producto
        });
    } catch (error) {
        next(error);
    }
};

const obtenerTodos = async (req, res, next) => {
    try {
        const productos = await productoService.obtenerTodos();
        res.status(200).json({
            total: productos.length,
            productos
        });
    } catch (error) {
        next(error);
    }
};

const obtenerPorId = async (req, res, next) => {
    try {
        const producto = await productoService.obtenerPorId(req.params.id);
        res.status(200).json({ producto });
    } catch (error) {
        next(error);
    }
};

const actualizar = async (req, res, next) => {
    try {
        const producto = await productoService.actualizarProducto(req.params.id, req.body);
        req.app.get('io').emit('producto_actualizado', producto);
        res.status(200).json({
            mensaje: 'Producto actualizado con exito',
            producto
        });
    } catch (error) {
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        const producto = await productoService.eliminarProducto(req.params.id);
        req.app.get('io').emit('producto_eliminado', producto);
        res.status(200).json({
            mensaje: 'Producto eliminado con exito',
            producto
        });
    } catch (error) {
        next(error);
    }
};

const exportarCSV = async (req, res, next) => {
    try {
        const csv = await productoService.exportarProductos();
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=productos.csv');
        res.status(200).send(csv);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    crear,
    obtenerTodos,
    obtenerPorId,
    actualizar,
    eliminar,
    exportarCSV
};

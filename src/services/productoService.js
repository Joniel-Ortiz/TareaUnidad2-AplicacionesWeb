const Producto = require('../model/producto');

const crearProducto = async (datos) => {
    const existente = await Producto.findOne({ id: datos.id });
    if (existente) {
        const error = new Error('Ya existe un producto con este ID');
        error.status = 409;
        throw error;
    }
    const nuevoProducto = new Producto(datos);
    return await nuevoProducto.save();
};

const obtenerTodos = async () => {
    return await Producto.find();
};

const obtenerPorId = async (id) => {
    const producto = await Producto.findOne({ id: Number(id) });
    if (!producto) {
        const error = new Error('Producto no encontrado');
        error.status = 404;
        throw error;
    }
    return producto;
};

const actualizarProducto = async (id, datos) => {
    const producto = await Producto.findOneAndUpdate(
        { id: Number(id) },
        datos,
        { new: true, runValidators: true }
    );
    if (!producto) {
        const error = new Error('Producto no encontrado');
        error.status = 404;
        throw error;
    }
    return producto;
};

const eliminarProducto = async (id) => {
    const producto = await Producto.findOneAndDelete({ id: Number(id) });
    if (!producto) {
        const error = new Error('Producto no encontrado');
        error.status = 404;
        throw error;
    }
    return producto;
};

const calcularPrecioFinal = (precioVenta, tieneIva) => {
    const IVA = 0.19;
    if (tieneIva) {
        return Math.round((precioVenta * (1 + IVA)) * 100) / 100;
    }
    return precioVenta;
};

const exportarProductos = async () => {
    const productos = await Producto.find();
    const encabezados = 'id,nombre,categoria,precioCompra,precioVenta,stock,tieneIva,precioFinal';
    const filas = productos.map(p => {
        const precioFinal = calcularPrecioFinal(p.precioVenta, p.tieneIva);
        return `${p.id},${p.nombre},${p.categoria},${p.precioCompra},${p.precioVenta},${p.stock},${p.tieneIva},${precioFinal}`;
    });
    return [encabezados, ...filas].join('\n');
};

module.exports = {
    crearProducto,
    obtenerTodos,
    obtenerPorId,
    actualizarProducto,
    eliminarProducto,
    calcularPrecioFinal,
    exportarProductos
};

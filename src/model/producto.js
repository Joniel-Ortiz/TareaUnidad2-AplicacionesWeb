const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    precioCompra: { type: Number, required: true },
    precioVenta: { type: Number, required: true },
    stock: { type: Number, required: true },
    tieneIva: { type: Boolean, required: true }
});

module.exports = mongoose.model('Producto', productoSchema);
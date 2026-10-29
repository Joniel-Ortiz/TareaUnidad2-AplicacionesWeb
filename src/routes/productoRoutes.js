const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const productoController = require('../controllers/productoController');
const validar = require('../middlewares/validar');

const validacionesCrear = [
    body('id').isInt().withMessage('El ID debe ser un numero entero'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('categoria').notEmpty().withMessage('La categoria es obligatoria'),
    body('precioCompra').isFloat({ min: 0 }).withMessage('El precio de compra debe ser un numero positivo'),
    body('precioVenta').isFloat({ min: 0 }).withMessage('El precio de venta debe ser un numero positivo'),
    body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un numero entero positivo'),
    body('tieneIva').isBoolean().withMessage('El campo tieneIva debe ser un booleano')
];

const validacionesActualizar = [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacio'),
    body('categoria').optional().notEmpty().withMessage('La categoria no puede estar vacia'),
    body('precioCompra').optional().isFloat({ min: 0 }).withMessage('El precio de compra debe ser un numero positivo'),
    body('precioVenta').optional().isFloat({ min: 0 }).withMessage('El precio de venta debe ser un numero positivo'),
    body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un numero entero positivo'),
    body('tieneIva').optional().isBoolean().withMessage('El campo tieneIva debe ser un booleano')
];

router.post('/', validacionesCrear, validar, productoController.crear);
router.get('/', productoController.obtenerTodos);
router.get('/exportar', productoController.exportarCSV);
router.get('/:id', productoController.obtenerPorId);
router.put('/:id', validacionesActualizar, validar, productoController.actualizar);
router.delete('/:id', productoController.eliminar);

module.exports = router;

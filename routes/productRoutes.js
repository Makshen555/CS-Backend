const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Crear producto
router.post('/products', ProductController.create);

// Listar productos
router.get('/products', ProductController.list);

// Actualizar producto
router.put('/products/:id', ProductController.update);

// Borrar producto
router.delete('/products/:id', ProductController.delete);

module.exports = router;

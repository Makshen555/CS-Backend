const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { isAuthenticated, hasRole } = require('../middlewares/authMiddleware');

// Crear producto
router.post('/products', isAuthenticated, hasRole('Registrador'), ProductController.create);

// Listar productos
router.get('/products', isAuthenticated, hasRole(['Auditor','Registrador']), ProductController.list);

// Actualizar producto
router.put('/products/:id', isAuthenticated, hasRole('Registrador'), ProductController.update);

// Borrar producto
router.delete('/products/:id', isAuthenticated, hasRole('Registrador'), ProductController.delete);

module.exports = router;
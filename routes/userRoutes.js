// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Crear usuario
router.post('/users', UserController.create);

// Listar usuarios
router.get('/users', UserController.list);

module.exports = router;
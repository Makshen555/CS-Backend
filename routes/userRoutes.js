// backend/routes/userRoutes.js 
const express = require('express'); 
const router = express.Router(); 
const UserController = require('../controllers/userController'); 
const { isAuthenticated, hasRole } = require('../middlewares/authMiddleware');

// Crear usuario 
router.post('/users', UserController.create);

// Listar usuarios 
router.get('/users', UserController.list); 

// Ruta protegida
router.get('/profile', isAuthenticated, (req, res) => {
    res.json({
        message: 'Ruta protegida',
        user: req.session.user
    });
});

module.exports = router;

// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');
const { isAuthenticated, hasRole } = require('../middlewares/authMiddleware');

router.post('/roles', isAuthenticated, hasRole('SuperAdmin'), RoleController.create);
router.get('/roles', isAuthenticated, hasRole('SuperAdmin'), RoleController.list);
router.put('/roles/:id', isAuthenticated, hasRole('SuperAdmin'), RoleController.update);
router.delete('/roles/:id', isAuthenticated, hasRole('SuperAdmin'), RoleController.delete);

module.exports = router;
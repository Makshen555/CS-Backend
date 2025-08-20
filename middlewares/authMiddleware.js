// backend/middlewares/authMiddleware.js

// Middleware para verificar si el usuario está logueado
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        // El usuario tiene sesión activa
        return next();
    } else {
        // No hay sesión, acceso denegado
        return res.status(401).json({ message: 'No autorizado' });
    }
}

// Middleware para verificar rol específico
function hasRole(role) {
    return (req, res, next) => {
        if (req.session.user && req.session.user.role === role) {
            return next();
        } else {
            return res.status(403).json({ message: 'Acceso denegado. No tiene permisos.' });
        }
    }
}

module.exports = { isAuthenticated, hasRole };

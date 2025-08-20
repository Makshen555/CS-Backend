// backend/middlewares/authMiddleware.js
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        // El usuario tiene sesión activa
        return next();
    } else {
        // No hay sesión, acceso denegado
        return res.status(401).json({ message: 'No autorizado' });
    }
}

module.exports = isAuthenticated;

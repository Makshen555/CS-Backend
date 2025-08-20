const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

const AuthController = {
    async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: 'Usuario y contraseña requeridos' });
            }

            const user = await UserModel.getUserByUsername(username);
            if (!user) return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });

            await UserModel.updateLastLogin(user.id);

            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role_name
            };

            res.json({ message: 'Login exitoso', user: req.session.user });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    logout(req, res) {
        req.session.destroy(err => {
            if (err) return res.status(500).json({ message: 'Error cerrando sesión' });
            res.clearCookie('connect.sid');
            res.json({ message: 'Logout exitoso' });
        });
    }
};

module.exports = AuthController;
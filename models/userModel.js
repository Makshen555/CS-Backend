// backend/models/userModel.js
const pool = require('./db');
const bcrypt = require('bcryptjs');

const UserModel = {
    async createUser(username, password, roleName) {
        try {
            // Verificar si ya existe
            const existing = await pool.query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            );
            if (existing.rows.length > 0) {
                throw new Error('El usuario ya existe');
            }

            // Obtener rol
            const roleResult = await pool.query(
                'SELECT id FROM roles WHERE name = $1',
                [roleName]
            );
            if (roleResult.rows.length === 0) {
                throw new Error(`El rol '${roleName}' no existe`);
            }
            const roleId = roleResult.rows[0].id;

            // Encriptar password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar usuario
            const result = await pool.query(
                'INSERT INTO users (username, password, role_id) VALUES ($1, $2, $3) RETURNING *',
                [username, hashedPassword, roleId]
            );

            return result.rows[0];
        } catch (err) {
            throw err;
        }
    },

    // Método para obtener usuario por username
    async getAllUsers() {
        const result = await pool.query(
            'SELECT u.id, u.username, r.name AS role, u.last_login FROM users u JOIN roles r ON u.role_id = r.id'
        );
        return result.rows;
    },
    // Método para obtener usuario por username
    async getUserByUsername(username) {
        const result = await pool.query(
            `SELECT u.id, u.username, u.password, r.name AS role_name
       FROM users u
       JOIN roles r ON u.role_id = r.id
       WHERE u.username = $1`,
            [username]
        );
        return result.rows[0];
    },

    // Método para actualizar la última fecha de login
    async updateLastLogin(userId) {
        await pool.query(`UPDATE users SET last_login = NOW() WHERE id = $1`, [userId]);
    }

};

module.exports = UserModel;
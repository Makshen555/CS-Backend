// backend/scripts/initAdmin.js
require('dotenv').config({ path: __dirname + '/../.env' });

const pool = require('../models/db');
const bcrypt = require('bcryptjs');

async function crearSuperAdmin() {
    try {
        const username = process.env.ADMIN_USER || 'Makshen';
        const plainPassword = process.env.ADMIN_PASSWORD || 'PapitoLindo1234';

        // Hashear contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        // 1. Obtener el id del rol 'admin'
        const roleResult = await pool.query(
            `SELECT id FROM roles WHERE name = $1 LIMIT 1`,
            ['SuperAdmin']
        );

        if (roleResult.rows.length === 0) {
            console.error("No existe el rol 'admin' en la tabla roles. Crea ese rol primero.");
            pool.end();
            return;
        }

        const roleId = roleResult.rows[0].id;

        // 2. Insertar superadmin en la tabla users
        const query = `
            INSERT INTO users (username, password, role_id, last_login)
            VALUES ($1, $2, $3, NOW())
            ON CONFLICT (username) DO NOTHING
            RETURNING id, username;
        `;
        const result = await pool.query(query, [username, hashedPassword, roleId]);

        if (result.rows.length > 0) {
            console.log(`Superadmin creado: ${result.rows[0].username}`);
        } else {
            console.log('El superadmin ya existe.');
        }

        pool.end();
    } catch (err) {
        console.error('Error creando superadmin:', err);
        pool.end();
    }
}

crearSuperAdmin();
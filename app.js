require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const pool = require('./models/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173', // 👈 URL EXACTA de tu frontend en React
    credentials: true                // 👈 Necesario para enviar/recibir cookies
}));

app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hora
        httpOnly: false,         // 👈 seguridad, evita acceso desde JS
        secure: false,          // ⚠️ ponlo en true SOLO si usas HTTPS
        sameSite: 'Lax'        // 👈 NECESARIO para cookies cross-site
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`Conexión funcionando, hora actual: ${result.rows[0].now}`);
    } catch (err) {
        res.status(500).send('Error en la base de datos');
    }
});

// Rutas
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// backend/app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const pool = require('./models/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'supersecretkey', // luego lo reemplazamos por una variable de entorno
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 1 minuto de inactividad
}));

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Conexión funcionando, hora actual: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Error en la base de datos');
  }
});

// Rutas

//Rutas de Usuarios
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Rutas de Autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Rutas de Productos
const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
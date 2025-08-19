// backend/app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Backend funcionando!');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

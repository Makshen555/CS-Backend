# Backend - Proyecto Final Calidad de Software

Este repositorio contiene el backend del proyecto final de Calidad de Software, desarrollado con **Node.js**, **Express** y **PostgreSQL**.

## Tecnologías utilizadas

- **Node.js**: entorno de ejecución de JavaScript.
- **Express**: framework web para Node.js.
- **PostgreSQL**: base de datos relacional.
- **dotenv**: para manejar variables de entorno.
- **bcrypt**: para cifrar contraseñas de usuarios.
- **pg**: cliente oficial de PostgreSQL para Node.js.
- **cors**: habilitar solicitudes cross-origin desde el frontend.

## Instalación

1. Instalar dependencias:
```bash
npm install
```
2. Configurar un archivo `.env` y configurar tus variables de entorno:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=calidad_software
PORT=3000
```
## Inicializar Proyecto:
```bash
nmp start
```

## Estructura del Backend
```bash
backend/
│
├─ node_modules/          # Dependencias de Node.js
├─ routes/                # Rutas de la API
├─ controllers/           # Lógica de controladores
├─ models/                # Modelos de base de datos
├─ middleware/            # Middlewares de seguridad, autenticación, etc.
├─ .env                   # Variables de entorno (no subir al repositorio)
├─ .env.example           # Ejemplo de variables de entorno
├─ package.json
└─ app.js                 # Archivo principal del servidor
```
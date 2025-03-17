// Importa express, un framework de Node.js para crear aplicaciones web y APIs
const express = require('express');

// Importa cors para habilitar solicitudes de origen cruzado (Cross-Origin Resource Sharing)
const cors = require('cors');

// Crea una instancia de la aplicación con express
const app = express();

// Middleware para interpretar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware para habilitar el intercambio de recursos entre dominios distintos (CORS)
app.use(cors());

// Importa las rutas desde los módulos correspondientes
const userRoutes = require('./routes/user.routes'); // Rutas para manejar funcionalidades relacionadas con usuarios
const authRoutes = require('./routes/auth.routes'); // Rutas para autenticación (inicio de sesión, registro, etc.)
const projectRoutes = require('./routes/project.routes'); // Rutas relacionadas con proyectos

// Configura las rutas en la aplicación, agrupándolas bajo el prefijo '/api/v1'
app.use('./api/v1', UserRoutes); // Ruta para funcionalidades de usuarios
app.use('./api/v1', authRoutes); // Ruta para funcionalidades de autenticación
app.use('./api/v1', projectRoutes); // Ruta para funcionalidades de proyectos

// Exporta la instancia de la aplicación para usarla en otros módulos, como el servidor principal
module.exports = app;

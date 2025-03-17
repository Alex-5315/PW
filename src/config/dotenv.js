// Importa el módulo 'dotenv' para cargar las variables de entorno desde un archivo .env
const dotenv = require('dotenv');

// Configura 'dotenv' para leer el archivo .env y establecer las variables de entorno
dotenv.config();

// Exporta un objeto que contiene las variables de entorno necesarias para la aplicación
module.exports = {
    // Puerto donde se ejecutará el servidor de la aplicación
    PORT: process.env.PORT,

    // Configuración de la base de datos
    DB_NAME: process.env.DB_NAME, // Nombre de la base de datos
    DB_USER: process.env.DB_USER, // Usuario de la base de datos
    DB_PASSWORD: process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos
    DB_HOST: process.env.DB_HOST, // Host (servidor) de la base de datos
    DB_PORT: process.env.DB_PORT, // Puerto usado por la base de datos

    // Llave secreta usada para generar y verificar tokens JWT
    JWT_SECRET: process.env.JWT_SECRET,
};

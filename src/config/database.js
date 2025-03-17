// Importa Sequelize, un ORM (Object-Relational Mapper) para interactuar con bases de datos
const { Sequelize } = require('sequelize');

// Importa dotenv para cargar las variables de entorno desde un archivo .env
const dotenv = require('dotenv');

// Configura dotenv para que lea y configure las variables de entorno
dotenv.config();

// Crea una nueva instancia de Sequelize con las credenciales y configuraciones de la base de datos
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la base de datos
    process.env.DB_USER, // Usuario de la base de datos
    process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos
    {
        host: process.env.DB_HOST, // Dirección del host de la base de datos
        dialect: 'postgres', // Especifica el tipo de base de datos (en este caso, PostgreSQL)
        port: process.env.DB_PORT, // Puerto utilizado para conectarse a la base de datos
        logging: false, // Desactiva el registro de consultas SQL en la consola
        timezone: '-05:00' // Establece la zona horaria del servidor para sincronización
    }
);

// Exporta la instancia de Sequelize para que pueda ser utilizada en otras partes de la aplicación
module.exports = sequelize;

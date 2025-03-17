// Importa la configuración de Sequelize para conectarse a la base de datos
const sequelize = require('./config/database');

// Importa la aplicación Express configurada en el archivo 'app.js'
const app = require('./app');

// Importa dotenv para cargar las variables de entorno desde un archivo .env
const dotenv = require('dotenv');

// Importa las asociaciones de los modelos para definir las relaciones entre ellos
require('./models/associations');

// Configura dotenv para cargar las variables de entorno
dotenv.config();

// Establece el puerto para el servidor (utiliza el definido en las variables de entorno o el valor por defecto 3000)
const PORT = process.env.PORT || 3000;

// Verifica la conexión con la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conectando a PostgreSQL con Sequelize');
        // Inicia el servidor si la conexión con la base de datos es exitosa
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en https://localhost:${PORT}`);
        });
    })
    .catch(err => 
        // Muestra un mensaje de error en caso de que la conexión falle
        console.error('Error conectando a la base de datos:', err)
    );

// Sincroniza los modelos con la base de datos (sin eliminar datos existentes: force: false)
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch(err => 
        // Muestra un mensaje de error si la sincronización falla
        console.error('Error al sincronizar la base de datos:', err)
    );

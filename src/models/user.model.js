// Importa DataTypes de Sequelize para definir los tipos de datos de los atributos del modelo
const { DataTypes } = require('sequelize'); // Corrección: 'sequelize' debe estar entre comillas como cadena de texto
// Importa la configuración de la instancia de Sequelize desde el archivo de configuración
const sequelize = require("../config/database");

// Define el modelo 'User' asociado a la tabla 'usuarios'
const User = sequelize.define('usuarios', {
    // Identificador único para cada usuario (clave primaria, autoincremental)
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    // Nombre del usuario (requerido)
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    // Correo electrónico del usuario (requerido y único)
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    // Contraseña del usuario (requerida)
    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    // Identificador del rol del usuario (clave foránea hacia la tabla 'usuarios')
    rol_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { 
            model: 'usuarios', // Tabla referenciada
            key: 'id' // Columna de la tabla referenciada
        }
    },
    // Identificador del administrador asociado (opcional, clave foránea hacia la tabla 'usuarios')
    administrador_id: { 
        type: DataTypes.INTEGER, 
        allowNull: true, 
        references: { 
            model: 'usuarios', // Tabla referenciada
            key: 'id' // Columna de la tabla referenciada
        }
    }
}, {
    // Configuración adicional del modelo
    timestamps: false, // Desactiva las columnas predeterminadas de tiempo (createdAt y updatedAt)
    tableName: 'usuarios' // Especifica el nombre exacto de la tabla en la base de datos
});

// Exporta el modelo para que pueda ser utilizado en otras partes del proyecto
module.exports = User;

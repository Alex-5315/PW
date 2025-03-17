// Importa DataTypes de Sequelize para definir los tipos de datos de los atributos del modelo
const { DataTypes } = require('sequelize');

// Importa la configuración de la instancia de Sequelize desde el archivo de configuración
const sequelize = require('../config/database');

// Define el modelo RolePermission asociado a la tabla 'roles_permisos'
const RolePermission = sequelize.define('roles_permisos', {
    // Identificador del rol (clave foránea hacia la tabla 'roles')
    rol_id: { 
        type: DataTypes.INTEGER, // Tipo de dato entero
        allowNull: false, // No permite valores nulos
        references: { 
            model: 'roles', // Tabla referenciada
            key: 'id' // Columna de la tabla referenciada
        }
    },
    // Identificador del permiso (clave foránea hacia la tabla 'permisos')
    permisos_id: { 
        type: DataTypes.INTEGER, // Tipo de dato entero
        allowNull: false, // No permite valores nulos
        references: { 
            model: 'permisos', // Tabla referenciada
            key: 'id' // Columna de la tabla referenciada
        }
    }
}, {
    // Configuraciones adicionales del modelo
    timestamps: false, // Desactiva las columnas de timestamps (createdAt y updatedAt)
    tableName: 'roles_permisos' // Especifica el nombre exacto de la tabla en la base de datos
});

// Exporta el modelo para que pueda ser utilizado en otras partes del proyecto
module.exports = RolePermission;

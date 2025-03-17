// Importa DataTypes de Sequelize para definir los tipos de datos de los atributos del modelo
const { DataTypes } = require('sequelize');

// Importa la configuración de la instancia de Sequelize desde el archivo de configuración
const sequelize = require('../config/database');

// Define el modelo 'UsuarioProyecto' asociado a la tabla intermedia 'usuarios_proyectos'
const UsuarioProyecto = sequelize.define('usuarios_proyectos', {
    // Identificador único para cada relación (clave primaria, autoincremental)
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    // Identificador del usuario (clave foránea hacia la tabla 'usuarios')
    usuario_id: {
        type: DataTypes.INTEGER, 
        allowNull: false, // No permite valores nulos
        references: {
            model: 'usuarios', // Tabla referenciada
            key: 'id' // Columna referenciada
        },
        onDelete: 'CASCADE' // Elimina las relaciones si el usuario asociado es eliminado
    },
    // Identificador del proyecto (clave foránea hacia la tabla 'proyectos')
    proyecto_id: {
        type: DataTypes.INTEGER, 
        allowNull: false, // No permite valores nulos
        references: {
            model: 'proyectos', // Tabla referenciada
            key: 'id' // Columna referenciada
        },
        onDelete: 'CASCADE' // Elimina las relaciones si el proyecto asociado es eliminado
    }
}, {
    // Configuración adicional del modelo
    timestamps: false, // Desactiva las columnas predeterminadas de tiempo (createdAt y updatedAt)
    tableName: 'usuarios_proyectos' // Especifica el nombre exacto de la tabla en la base de datos
});

// Exporta el modelo para que pueda ser utilizado en otras partes del proyecto
module.exports = UsuarioProyecto;

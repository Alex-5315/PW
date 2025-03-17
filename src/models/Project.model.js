// Importa DataTypes para definir los tipos de datos de los atributos del modelo
const { DataTypes } = require('sequelize');

// Importa la configuración de Sequelize desde el archivo correspondiente
const sequelize = require("../config/database");

// Define el modelo 'Project' asociado a la tabla 'proyectos'
const Project = sequelize.define('proyectos', {
    // Identificador único para cada proyecto (clave primaria, autoincremental)
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    // Nombre del proyecto (máximo 50 caracteres, requerido)
    nombre: { 
        type: DataTypes.STRING(50), 
        allowNull: false 
    },
    // Descripción del proyecto (opcional, campo de texto más extenso)
    descripcion: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    // Fecha de creación del proyecto (valor predeterminado: fecha y hora actual)
    fecha_creacion: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
    },
    // Identificador del administrador del proyecto (clave foránea hacia 'usuarios')
    administrador_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { 
            model: 'usuarios', // Tabla a la que hace referencia
            key: 'id' // Columna de la tabla referenciada
        },
        onDelete: 'CASCADE' // Elimina el proyecto si el administrador asociado es eliminado
    }
}, {
    // Configuración adicional del modelo
    timestamps: false, // No utiliza las columnas predeterminadas de tiempo (createdAt, updatedAt)
    tableName: 'proyectos', // Especifica el nombre exacto de la tabla en la base de datos

    // Hooks para realizar operaciones después de ciertos eventos
    hooks: {
        // Hook que se ejecuta después de crear un proyecto
        afterCreate: (Project, options) => {
            if (Project.fecha_creacion) {
                // Ajusta la hora para la zona horaria '-05:00' (ejemplo para Colombia)
                Project.fecha_creacion.setHours(Project.fecha_creacion.getHours() - 5);
            }
        }
    }
});

// Corrige el nombre de exportación a 'Project' para evitar errores de referencia
module.exports = Project;



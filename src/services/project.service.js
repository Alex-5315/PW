// Importar el modelo Project que representa los proyectos en la base de datos
const Project = require('../models/Project.model');
// Importar el modelo User que representa los usuarios en la base de datos
const User = require('../models/user.model');
// Importar dotenv para cargar las variables de entorno
const dotenv = require('dotenv');
// Importar jsonwebtoken para manejar tokens JWT
const jwt = require('jsonwebtoken'); 

// Cargar las variables de entorno
dotenv.config();

// Obtener la clave secreta para los tokens JWT desde las variables de entorno
const SECRET_KEY = process.env.JWT_SECRET;

// Función para crear un proyecto
exports.createProject = async (projectData, userId) => {
    try {
        // Verificar si el usuario existe en la base de datos
        const user = await User.findByPk(userId);
        if (!user) {
            // Lanzar un error si el usuario no existe
            throw new Error('Usuario no encontrado');
        }

        // Crear un nuevo proyecto con los datos proporcionados
        const project = await Project.create({
            ...projectData, // Descomponer los datos del proyecto para insertar sus propiedades
            userId, // Asociar el proyecto al ID del usuario
        });

        // Retornar el proyecto creado
        return project;
    } catch (error) {
        // Capturar cualquier error y lanzarlo con un mensaje descriptivo
        throw new Error(error.message || 'Error al crear el proyecto');
    }
};

// Función para obtener todos los proyectos de un usuario
exports.getUserProjects = async (userId) => {
    try {
        // Consultar todos los proyectos asociados al ID del usuario
        const projects = await Project.findAll({
            where: { userId },
        });

        // Verificar si no se encontraron proyectos para el usuario
        if (projects.length === 0) {
            throw new Error('No se encontraron proyectos para este usuario');
        }

        // Retornar los proyectos obtenidos
        return projects;
    } catch (error) {
        // Capturar cualquier error y lanzarlo con un mensaje descriptivo
        throw new Error(error.message || 'Error al obtener proyectos');
    }
};

// Función para eliminar un proyecto
exports.deleteProject = async (projectId, userId) => {
    try {
        // Verificar si el proyecto existe y pertenece al usuario especificado
        const project = await Project.findOne({
            where: {
                id: projectId, // ID del proyecto a buscar
                userId, // Verificar que el proyecto esté asociado al usuario
            },
        });

        // Si el proyecto no existe o no pertenece al usuario, lanzar un error
        if (!project) {
            throw new Error('Proyecto no encontrado o no pertenece al usuario');
        }

        // Eliminar el proyecto de la base de datos
        await project.destroy();

        // Retornar un mensaje de éxito tras la eliminación
        return { message: 'Proyecto eliminado exitosamente' };
    } catch (error) {
        // Capturar cualquier error y lanzarlo con un mensaje descriptivo
        throw new Error(error.message || 'Error al eliminar el proyecto');
    }
};

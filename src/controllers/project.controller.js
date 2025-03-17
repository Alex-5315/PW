// Importar el servicio que contiene la lógica relacionada con los proyectos
const projectService = require('../services/project.service');

// Controlador para crear un proyecto
exports.createProject = async (req, res) => {
    try {
        // Obtener el ID del usuario autenticado desde el token
        const userId = req.user.id;

        // Obtener los datos del proyecto enviados en el cuerpo de la solicitud
        const projectData = req.body;

        // Llamar al servicio para crear un proyecto con los datos proporcionados y el ID del usuario
        const project = await projectService.createProject(projectData, userId);

        // Responder con el proyecto creado y un código 201 (creado)
        return res.status(201).json(project);
    } catch (error) {
        // Capturar cualquier error y responder con un código 400 y un mensaje descriptivo
        return res.status(400).json({ error: error.message || 'Error al crear el proyecto' });
    }
};

// Controlador para obtener proyectos de un usuario
exports.getUserProjects = async (req, res) => {
    try {
        // Obtener el ID del usuario autenticado desde el token
        const userId = req.user.id;

        // Llamar al servicio para obtener la lista de proyectos del usuario
        const projects = await projectService.getUserProjects(userId);

        // Responder con la lista de proyectos y un código 200 (éxito)
        return res.status(200).json(projects);
    } catch (error) {
        // Capturar cualquier error y responder con un código 400 y un mensaje descriptivo
        return res.status(400).json({ error: error.message || 'Error al obtener proyectos' });
    }
};

// Controlador para eliminar un proyecto
exports.deleteProject = async (req, res) => {
    try {
        // Obtener el ID del usuario autenticado desde el token
        const userId = req.user.id;

        // Obtener el ID del proyecto desde los parámetros de la URL
        const projectId = req.params.id;

        // Llamar al servicio para eliminar el proyecto especificado
        const result = await projectService.deleteProject(projectId, userId);

        // Responder con un mensaje de confirmación y un código 200 (éxito)
        return res.status(200).json(result);
    } catch (error) {
        // Capturar cualquier error y responder con un código 400 y un mensaje descriptivo
        return res.status(400).json({ error: error.message || 'Error al eliminar el proyecto' });
    }
};

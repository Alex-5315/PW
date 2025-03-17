// Importa el framework Express para manejar rutas y middleware
const express = require('express');

// Crea un enrutador para manejar las rutas relacionadas con proyectos
const router = express.Router();

// Importa los controladores que contienen la lógica de negocio para los proyectos
const projectController = require('../controllers/project.controller');

// Ruta para crear un nuevo proyecto
// Método POST: el cliente enviará los datos del proyecto para ser creados
router.post('/projects', projectController.createProject);

// Ruta para obtener los proyectos de un usuario
// Método GET: el cliente solicita información sobre proyectos
router.get('/projects', projectController.getUserProjects);

// Ruta para eliminar un proyecto existente
// Método DELETE: el cliente solicita eliminar un proyecto por su ID
router.delete('/projects/:id', projectController.deleteProject);

// Exporta el enrutador para que pueda ser usado en el archivo principal de rutas o en app.js
module.exports = router;

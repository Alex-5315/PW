const express = require('express');
const router = express.Router();
//controlador del usuario
const userController = require('../controllers/user.controller');
// Middleware para autenticar usuarios
const authenticate = require('../middleware/authenticate');

// Ruta para crear un usuario
router.post('/users', authenticate, userController.createUser);

// Ruta para actualizar un usuario
router.put('/users/:id', authenticate, userController.updateUser);

// Ruta para obtener todos los usuarios asociados a un administrador
router.get('/users/administrador', authenticate, userController.getAllUserByAdministradorId);

// Ruta para obtener todos los usuarios por rol ID
router.get('/users/rol/:id', authenticate, userController.getAllUserByRolId);

// Ruta para eliminar un usuario
router.delete('/users/:id', authenticate, userController.deleteUser);

module.exports = router;

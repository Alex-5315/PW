// Importar la librería jsonwebtoken para manejar la generación y verificación de tokens JWT
const jwt = require('jsonwebtoken');
// Importar la librería bcryptjs para manejar la encriptación de contraseñas
const bcrypt = require('bcryptjs');
// Importar dotenv para cargar las variables de entorno
const dotenv = require('dotenv');
// Importar el modelo User que representa a los usuarios en la base de datos
const User = require('../models/user.model');
// Importar el modelo RolePermission para manejar los permisos asociados a roles
const RolePermission = require('../models/RolePermission.model');

// Cargar las variables de entorno
dotenv.config();

// Obtener la clave secreta para los tokens JWT desde las variables de entorno
const SECRET_KEY = process.env.JWT_SECRET;

// Función para autenticar a un usuario mediante su email y contraseña
exports.loginUser = async (email, password) => {
    try {
        // Buscar el usuario en la base de datos utilizando su email
        const user = await User.findOne({ where: { email } });
        if (!user) { 
            // Lanzar un error si no se encuentra el usuario
            throw new Error('Usuario no encontrado');
        }

        // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // Lanzar un error si la contraseña es incorrecta
            throw new Error('Contraseña incorrecta');
        }

        // Consultar los permisos asociados al rol del usuario
        const rolePermissions = await RolePermission.findAll({
            where: { rol_id: user.rol_id }, // Filtrar por el rol del usuario
            attributes: ['permiso_id'] // Seleccionar únicamente los IDs de los permisos
        });

        // Obtener los IDs de los permisos como un array
        const permisos = rolePermissions.map(rp => rp.permiso_id);

        // Generar un token JWT con los datos del usuario y sus permisos
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id, permisos }, // Datos incluidos en el token
            SECRET_KEY, // Clave secreta para firmar el token
            { expiresIn: '1h' } // Tiempo de expiración del token
        );

        // Retornar el token generado
        return token;
    } catch (error) {
        // Capturar cualquier error y lanzarlo con un mensaje descriptivo
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};

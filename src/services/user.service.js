// Se importa el modelo de usuario que interactúa con la base de datos
const User = require('../models/user.model');
// Se importa la biblioteca bcrypt para manejar el hash de contraseñas
const bcrypt = require('bcryptjs');

// Función para crear un usuario
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        // Se verifica si ya existe un usuario con el email proporcionado
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            throw new Error('El usuario ya existe'); // Se lanza un error si el usuario ya está registrado
        }

        // Se genera un hash de la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Se crea un nuevo usuario en la base de datos con los datos proporcionados
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        // Se retorna el nuevo usuario creado
        return newUser;
    } catch (err) {
        // Se lanza un error personalizado en caso de fallo durante la creación del usuario
        throw new Error(`Error al crear el usuario: ${err.message}`);
    }
};

// Función para obtener todos los usuarios asociados a un administrador
exports.getAllUserByAdministradorId = async (administrador_id, email) => {
    try {
        // Se construye la cláusula WHERE con el ID del administrador
        const whereClause = { administrador_id };
        // Si se proporciona un email, se agrega como condición adicional
        if (email) {
            whereClause.email = email;
        }

        // Se realiza una consulta para obtener los usuarios asociados, excluyendo la contraseña de los resultados
        const users = await User.findAll({ where: whereClause, attributes: { exclude: ['password'] } });
        return users;
    } catch (err) {
        // Se lanza un error personalizado en caso de fallo durante la obtención de usuarios
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};

// Función para obtener usuarios según el rol
exports.getAllUserByRolId = async (rol_id) => {
    try {
        // Se realiza una consulta para obtener usuarios con un rol específico, excluyendo la contraseña
        const users = await User.findAll({ where: { rol_id }, attributes: { exclude: ['password'] } });
        return users;
    } catch (err) {
        // Se lanza un error personalizado en caso de fallo durante la obtención de usuarios
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};

// Función para actualizar un usuario
exports.updateUser = async (id, nombre, email, rol_id, administrador_id, admin_from_token) => {
    try {
        // Se busca el usuario por su ID
        const user = await User.findByPk(id);

        // Se verifica si el usuario está bajo la administración del ID del token
        if (user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no está bajo su administración');
        }

        // Se verifica si el usuario existe
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Si se proporciona un nuevo email, se verifica que no esté en uso por otro usuario
        if (email && email !== user.email) {
            const userExist = await User.findOne({ where: { email } });
            if (userExist) {
                throw new Error('El email ya está en uso');
            }
        }

        // Se actualizan los datos del usuario con los valores proporcionados
        await user.update({
            nombre,
            email,
            rol_id,
            administrador_id,
        });

        return user; // Se retorna el usuario actualizado
    } catch (err) {
        // Se lanza un error personalizado en caso de fallo durante la actualización
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};

// Función para eliminar un usuario
exports.deleteUser = async (id, admin_from_token) => {
    try {
        // Se busca el usuario por su ID
        const user = await User.findByPk(id);

        // Se verifica si el usuario está bajo la administración del ID del token
        if (user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no está bajo su administración');
        }

        // Se verifica si el usuario existe
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Se elimina el usuario de la base de datos
        await user.destroy();

        // Se retorna un mensaje de éxito
        return { message: 'Usuario eliminado con éxito' };
    } catch (err) {
        // Se lanza un error personalizado en caso de fallo durante la eliminación
        throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
};

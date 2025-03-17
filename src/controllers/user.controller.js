// Importa el servicio de usuario donde se encuentra la lógica de negocio
const userService = require('../services/user.service');

// Función para crear un usuario
exports.createUser = async (req, res) => {
    try {
        // Se extraen los datos enviados en el cuerpo de la solicitud para crear un nuevo usuario
        const { nombre, email, password, rol_id, administrador_id } = req.body;

        // Se utiliza el servicio para manejar la lógica de creación del usuario
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);

        // Se devuelve una respuesta con un código 201 indicando que la creación fue exitosa
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (err) {
        // Se captura cualquier error y se devuelve un mensaje junto con un código 500
        res.status(500).json({ message: err.message });
    }
};

// Función para actualizar un usuario (en construcción)
exports.update.User = async (req, res) => {
    const { id } = req.params; // Se obtiene el ID del usuario desde los parámetros de la URL
    // La lógica para esta función aún no está implementada
};

// Función para obtener todos los usuarios asociados a un administrador
exports.getAllUserByAdministradorId = async (req, res) => {
    try {
        // Se extrae el identificador del administrador desde el token del usuario autenticado
        const email_from_token = req.user.id;

        // Se permite filtrar por correo electrónico si este se envía como parámetro en la consulta
        const { email } = req.query;

        // Se llama al servicio para obtener la lista de usuarios asociados al administrador
        const users = await userService.getAllUserByAdministradorId(email_from_token, email);

        // Se devuelve una respuesta con un código 200 junto con los datos obtenidos
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        // Se captura cualquier error y se devuelve un mensaje junto con un código 500
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Función para obtener usuarios por su rol
exports.getAllUserByRolId = async (req , res) => {
    try {
        // Se llama al servicio para obtener los usuarios según el ID del rol proporcionado
        const users = await userService.getAllUserByRolId(req.params.id);

        // Se devuelve una respuesta con los usuarios obtenidos y un mensaje de éxito
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        // Se captura el error y se responde con un mensaje y un código 500
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Función para actualizar un usuario
exports.updateUser = async (req, res) => {
    // Se obtiene el ID del usuario desde los parámetros y los nuevos datos del cuerpo de la solicitud
    const { id } = req.params;
    const { nombre, email, rol_id, administrador_id } = req.body;

    // Se extrae el ID del administrador autenticado desde el token
    const admin_from_token = req.user.id;

    try {
        // Se llama al servicio para realizar la actualización del usuario
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);

        // Se devuelve una respuesta indicando que la actualización fue exitosa
        res.status(200).json({ message: 'Usuario actualizado con éxito', user });
    } catch (err) {
        // Se captura el error y se responde con un mensaje y un código 500
        res.status(500).json({ message: err.message });
    }
};

// Función para eliminar un usuario
exports.deleteUser = async (req, res) => {
    // Se obtiene el ID del usuario desde los parámetros de la URL
    const { id } = req.params;

    // Se extrae el ID del administrador autenticado desde el token
    const admin_from_token = req.user.id;

    try {
        // Se utiliza el servicio para eliminar el usuario especificado
        const result = await userService.deleteUser(id, admin_from_token);

        // Se devuelve el resultado de la operación en la respuesta
        res.status(200).json(result);
    } catch (err) {
        // Se captura cualquier error y se devuelve un mensaje con un código 500
        res.status(500).json({ message: err.message });
    }
};

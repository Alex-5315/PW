// Importa el servicio de autenticación desde la carpeta de servicios
const authServicie = require('../services/auth.service');

// Controlador para manejar la lógica de inicio de sesión
exports.login = async (req, res) => {
    // Extrae el email y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;
    try {
        // Llama al servicio de autenticación para validar las credenciales
        const token = await authServicie.loginUser(email, password);
        
        // Responde con un estado 200 (éxito) y devuelve un mensaje junto con el token
        res.status(200).json({message: 'Inicio de sesión exitoso', token });
    } catch (err) {
        // En caso de error, responde con un estado 400 (solicitud incorrecta) y un mensaje de error
        res.status(400).json({message: err.message });
    }
};

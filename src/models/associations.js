// Importa los modelos necesarios
const User = require('./user.model');
const Project = require('./project.model'); // Corrección: './project.model' en lugar de 'project.model'
const UserProject = require('./UserProject.model'); // Corrección: 'UserProject' estaba mal escrito como 'UserProjetc'

// Relaciones muchos a muchos
// Un usuario puede estar asociado a muchos proyectos, y un proyecto puede incluir a muchos usuarios
User.belongsToMany(Project, { 
    through: UserProject, // Modelo intermediario que conecta usuarios y proyectos
    foreignKey: 'usuario_id', // Llave foránea de usuario en la tabla intermediaria
    as: 'proyectos' // Alias para acceder a los proyectos del usuario
});

Project.belongsToMany(User, { 
    through: UserProject, // Modelo intermediario que conecta proyectos y usuarios
    foreignKey: 'proyecto_id', // Llave foránea de proyecto en la tabla intermediaria
    as: 'usuarios' // Alias para acceder a los usuarios del proyecto
});

// Relación de administrador
// Un proyecto pertenece a un administrador, que es un usuario
Project.belongsTo(User, { 
    foreignKey: 'administrador_id', // Llave foránea del administrador en el proyecto
    as: 'administrador' // Alias para acceder al administrador del proyecto
});

// Exporta los modelos para que puedan ser utilizados en otras partes del proyecto
module.exports = { User, Project, UserProject };

const { Schema, model } = require('mongoose');

/**
 * Es el esquema que se usa para obtener o insertar en la BBDD  de los roles
 * lo usa mongo para saber que es lo requerido o no
 */
const RolSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});


module.exports = model('Role', RolSchema);


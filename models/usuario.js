const { Schema, model } = require('mongoose');

/**
 * Es el esquema que se usa para obtener o insertar en la BBDD de los usuarios
 * lo usa mongo para saber que es lo requerido o no
 */

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La password es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

// En esta funcion se sobre escribe la funcion .toJSON eliminando asi el 'passwors' y '__v' del Schema del usuario
UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );
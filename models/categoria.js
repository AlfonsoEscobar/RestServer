const { Schema, model } = require('mongoose');

/**
 * Es el esquema que se usa para obtener o insertar en la BBDD de las categorias
 * lo usa mongo para saber que es lo requerido o no
 */
const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function(){
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Categoria', CategoriaSchema);


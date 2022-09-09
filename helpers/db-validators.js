
const Categoria = require('../models/categoria');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

/**
 * Se usa para hacer las validaciones contra la BBDD
 */


// Verificar si el rol existe en la BBDD
const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta en la BBDD`)
    }
}

// Verificar si el correo ya existe en la BBDD
const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail ){
        throw new Error(`El correo '${correo}' ya existe en la BBDD`);
    }
}

// Verificar si el id ya existe en la BBDD
const existeUsuarioPorID = async ( id ) => {
    const existeID = await Usuario.findById(id);
    if( !existeID ){
        throw new Error(`El id '${id}' no existe en la BBDD`);
    }
}

// Verificar si el id ya existe en la BBDD
const existeCategoriaPorID = async ( id ) => {
    const existeID = await Categoria.findById(id);
    if( !existeID ){
        throw new Error(`El id '${id}' no existe en la BBDD`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoriaPorID
}
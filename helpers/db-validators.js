
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta en la BBDD`)
    }
}


// Verificar si el correo ya existe
const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail ){
        throw new Error(`El correo '${correo}' ya existe en la BBDD`);
    }
}

// Verificar si el id ya existe
const existeUsuarioPorID = async ( id ) => {
    const existeID = await Usuario.findById(id);
    if( !existeID ){
        throw new Error(`El id '${id}' no existe en la BBDD`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorID
}
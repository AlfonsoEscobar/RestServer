const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const usuarioGet = (req = request, res = response) => {
    res.json({
        'msg':'get method - Controller'
    });
}

const usuarioPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo ya existe
    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail ){
        return res.status(400).json({
            msg: 'Ese correo ya esta registrado'
        })
    }
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar el usuario
    await usuario.save();

    res.json({
        usuario
    });
}

const usuarioPut = (req = request, res = response) => {

    const {id} = req.params;

    res.json({
        'msg':'put method - Controller',
        id
    });
}

const usuarioDelete = (req = request, res = response) => {
    res.json({
        'msg':'delete method - Controller'
    });
}

const usuarioPatch = (req = request, res = response) => {
    res.json({
        'msg':'patch method - Controller'
    });
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPatch
}
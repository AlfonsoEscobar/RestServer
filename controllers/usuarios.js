const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

/**
 * En esta clase se contruye los servicios web que tendran acceso a la BBDD
 * toda la logica que haran esta aqui
 */

const usuarioGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);


    res.json({
        "Total usuarios": total,
        usuarios
    });
}

const usuarioPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar el usuario
    await usuario.save();

    res.json(usuario);
}

const usuarioPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;

    if( password ){
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        'msg':'Usuario actualizado:'
    });
}

const usuarioDelete = async (req = request, res = response) => {

    const { id } = req.params;

    //Eliminar por completo el registro de la BBDD
    // const usuario = await Usuario.findByIdAndDelete(id);

    // En vez de eliminar por completo el usuario, lo unico que vamos hacer es
    // poner su estado a false para que este dado de baja.
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario
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
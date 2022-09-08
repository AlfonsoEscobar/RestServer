const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { response, request } = require('express');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);

        // leer al usuario que pertenece el uid
        const usuario = await Usuario.findById({_id: uid});

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido. Usuario no existe en BBDD'
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido. Estado: false'
            });
        }

        req.usuario = usuario;
        // Es importante poner el next() para que continue la peticion o si no no funcionara.
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}
const { response, request } = require("express");
const role = require("../models/role");

/**
 * Aqui validamos que tengan los Roles necesarios para las acciones necesarias 
 */

const validarRoles = (req = request, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Error, no se esta verificando el token antes.'
        });
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no tiene permisos para hacer esto.`
        })
    }

    next();
}

const tieneRol = (...roles) => {
    return (req = request, res = response, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Error, no se esta verificando el token antes.'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio necesita uno de estos roles ${roles}`
            });
        }

        next();
    }
}


module.exports = {
    validarRoles,
    tieneRol
}
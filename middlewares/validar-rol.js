const { response, request } = require("express")

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


module.exports = {
    validarRoles
}
const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

/**
 * En esta clase es donde esta toda la logica del login
 */

const login = async(req = request, res = response) => {

    try {
        
        const { correo, password } = req.body;
        
        //Verificar que el usuario existe en la BBDD
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                'msg': 'Correo / password incorrectos. Correo'
            });
        }

        //Verificar que el usuario esta activo en la BBDD
        if(!usuario.estado){
            return res.status(400).json({
                'msg': 'Correo / password incorrectos. Estado: false'
            });
        }

        // Verificar la password
        const validPass = bcrypt.compareSync(password, usuario.password);
        if(!validPass){
            return res.status(400).json({
                'msg': 'Correo / password incorrectos. Password'
            });
        }

        // Generar Token
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            'msg': 'Contacte con el administrador.'
        })
    }

}

module.exports = {
    login
}
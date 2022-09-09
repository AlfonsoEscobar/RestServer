const jwt = require('jsonwebtoken');

/**
 * Aqui es donde se genera el token y se devuelve al usuario
 */

const generarJWT = (uid = '') =>{

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        });
    } );
}

module.exports = {
    generarJWT
}
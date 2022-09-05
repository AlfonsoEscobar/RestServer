
const { validationResult } = require('express-validator');

/**
 * Se usa para validar los resultados de express-validator (que es un middleware) y se usan en las rutas con los check()
 */
const validarErrores = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    // Es importante poner el next() para que continue la peticion o si no no funcionara.
    next();
}

module.exports = {
    validarErrores
}
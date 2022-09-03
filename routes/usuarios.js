const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGet, usuarioPost,  usuarioPut, usuarioDelete, usuarioPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');
const { validarErrores } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuarioGet );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password tiene que ser de 6 caracteres').isLength({min: 6}),
    check('rol').custom( esRoleValido ),
    validarErrores
],usuarioPost );

router.put('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom( esRoleValido ),
    validarErrores
] ,usuarioPut );

router.delete('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarErrores
] ,usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;
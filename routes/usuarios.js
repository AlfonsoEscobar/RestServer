const { Router } = require('express');
const { usuarioGet, usuarioPost,  usuarioPut, usuarioDelete, usuarioPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarErrores } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuarioGet );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password tiene que ser de 6 caracteres').isLength({min: 6}),
    check('rol', 'El rol no es valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    validarErrores
],usuarioPost );

router.put('/:id', usuarioPut );

router.delete('/', usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;
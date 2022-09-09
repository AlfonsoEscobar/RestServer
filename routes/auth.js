const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');

const { validarErrores } = require('../middlewares/validar-campos');
const router = Router();

/**
 * En este js se indican las rutas que hara referencia al login
 * Los 'check()' son validaciones (middlewares) que se usan con 'express-validator'
 */

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarErrores
] ,login );

module.exports = router;

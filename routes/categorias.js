const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, categoriaDelete, categoriaPut, categoriaGet, categoriaGetID } = require('../controllers/categorias');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarErrores } = require('../middlewares/validar-campos');
const { existeCategoriaPorID } = require('../helpers/db-validators');
const { esAdminRol } = require('../middlewares/validar-rol');

const router = Router();

/**
 * En este js se indican las rutas que hara referencia al login
 * Los 'check()' son validaciones (middlewares) que se usan con 'express-validator'
 */

// listar todas las categorias - Publico
router.get('/', categoriaGet);

// listar una categoria - Publico
router.get('/:id', [
    check('id', 'No es un id valido.').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarErrores
], categoriaGetID);

// crear una categoria - Para cualquier token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarErrores
] , crearCategoria);

// modificar una categoria - Para cualquier token valido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeCategoriaPorID),
    validarErrores
], categoriaPut);

// Borrar una categoria - solo para admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id valido.').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarErrores
], categoriaDelete);

module.exports = router;
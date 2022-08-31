const { Router } = require('express');
const { usuarioGet, usuarioPost,  usuarioPut, usuarioDelete, usuarioPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuarioGet );

router.put('/', usuarioPut );

router.post('/', usuarioPost );

router.delete('/', usuarioDelete);

router.patch('/', usuarioPatch);


module.exports = router;
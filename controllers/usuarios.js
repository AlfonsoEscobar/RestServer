const { response, request } = require('express');

const usuarioGet = (req = request, res = response) => {
    res.json({
        'msg':'get method - Controller'
    });
}

const usuarioPost = (req = request, res = response) => {
    res.json({
        'msg':'post method - Controller'
    });
}

const usuarioPut = (req = request, res = response) => {
    res.json({
        'msg':'put method - Controller'
    });
}

const usuarioDelete = (req = request, res = response) => {
    res.json({
        'msg':'delete method - Controller'
    });
}

const usuarioPatch = (req = request, res = response) => {
    res.json({
        'msg':'patch method - Controller'
    });
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    usuarioPatch
}
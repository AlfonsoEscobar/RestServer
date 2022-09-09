const { request, response } = require("express");
const Categoria = require('../models/categoria');


// obtenerCategorias - paginado - total - populate
const categoriaGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = { estado: true };

    const [ total, categoria ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);


    res.json({
        "Total usuarios": total,
        categoria
    });
}


// obtenerCategoria - populate {}
const categoriaGetID = async (req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id ).populate('usuario', 'nombre');

    res.status(201).json({
        categoria
    });
}


const crearCategoria = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe.`
        });
    }

    //Generar data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);

}

// actualizarCategoria
const categoriaPut = async (req = request, res = response) => {

    const { id } = req.params;

    

    const categoria = await Categoria.findByIdAndUpdate( id, resto );

    res.status(201).json({
        'msg':'Categoria actualizada'
    });
}

const categoriaDelete = async (req = request, res = response) => {

    const { id } = req.params;

    //Eliminar por completo el registro de la BBDD
    // const categoria = await Usuario.findByIdAndDelete(id);

    // En vez de eliminar por completo la categoria, lo unico que vamos hacer es
    // poner su estado a false para que este dado de baja.
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});

    res.json({
        categoria
    });
}


module.exports = {
    categoriaGet,
    categoriaGetID,
    crearCategoria,
    categoriaPut,
    categoriaDelete
}
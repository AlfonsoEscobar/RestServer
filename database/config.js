const mongoose = require('mongoose');


const conexion = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Conexion a la base de datos OK!!');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion de la BBDD');
    }

}



module.exports ={
    conexion
}
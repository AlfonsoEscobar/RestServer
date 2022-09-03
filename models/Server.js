const express = require('express');
const cors = require('cors');
const { conexion } =require('../database/config');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        this.conexionDB();

        this.middlewares();

        this.routes();

    }

    async conexionDB() {
        await conexion();
    }

    middlewares(){
        
        //CORS
        this.app.use( cors() );

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(' Servidor corriendo en el puerto: ', this.port);
        });
    }


}



module.exports = Server;
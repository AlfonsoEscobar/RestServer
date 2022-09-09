const express = require('express');
const cors = require('cors');
const { conexion } =require('../database/config');

class Server{

    /* 
        En el constructor se inicializan todas las variables que se necesitan en esta clase
        y se lanzan las funciones necesarias para que funcione
    */
    constructor(){

        this.app    = express();
        this.port   = process.env.PORT;

        // Path para las conexiones
        this.usuariosPath       = '/api/usuarios';
        this.categoriasPath     = '/api/categorias';
        this.authPath           = '/api/auth';

        // Se inicia la conexion a la BBDD
        this.conexionDB();

        // Se usan todos los middleware que se necesitan
        this.middlewares();

        // Se inicializan las rutas que se van a usar
        this.routes();

    }

    /* 
        En esta funcion se llama a otra funcion que hace la conexion a la BBDD
        asi la logica a la conexion de la BBDD queda en un archivo aparte
        ademas si se necesitara tener varias conexiones se pondrian aqui.
    */
    async conexionDB() {
        await conexion();
    }

    /*
        Esta funcion middlewares() se usa para iniciar los middleware que va a usar express
        en este caso los 'cors' para que no se tengan problemas a la hora de las conexiones desde distintos 
        navegadores,
        'express.json()' para que se pueda leer el json que llega en el body de la peticional servidor,
        'express.static('public')' con esto se usa para servir contenido estatico como una pagina web estatica
    */
    middlewares(){
        
        //CORS
        this.app.use( cors() );

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    /*
        Se usa para poner las rutas que se van a necesitar para haceder a la API 
    */
    routes(){
        // El primer argumento es el String que hara de conexion y el segundo donde se encuentran todas las rutas
        // para asi tenerlas separadas, aqui se pondria si se necesitaran mas rutas para diversos recursos
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.categoriasPath, require('../routes/categorias'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    // Crea la conexion en el puerto indicado y muestra por consola que todo a ido bien
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto:', this.port);
        });
    }


}



module.exports = Server;
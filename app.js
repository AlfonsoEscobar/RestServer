const Server = require('./models/server');
// Con esta importacion podemos acceder facilmente a las variables de entorno que se configuran en el
// archivo de .env
require('dotenv').config();

// Creamos iuna instancia de la clase Server que es donde esta la logica para crear el servidor
const server = new Server();

// Con esto ponemos a la escucha el servidor y estaria levantado
server.listen();
const express = require('express');
const cors = require('cors');
require('colors');
const {socketController} = require('../sockets/controller');

class Server {

    constructor() {
        console.clear();
        console.log('\n');

        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths   = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // sockets
        this.sockets()
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    sockets(){

        this.io.on('connection', socketController)

    }

    routes() {
        /*this.app.use( this.paths.auth, require('../routes/auth'));*/
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log(`${'Servidor corriendo'.cyan} en https://localhost:${this.port}`);
        });
    }

}




module.exports = Server;

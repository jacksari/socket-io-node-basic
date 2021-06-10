const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;   

        // Http server
        this.server = http.createServer(this.app);

        // Configuracion de sockets
        this.io = socketio( this.server, {
        } );
    }

    middlewares () {
        this.app.use( express.static( path.resolve( __dirname,  '../public' ) ) );
        this.app.use(cors());
    }

    configSockets () {   
        new Sockets( this.io );
    }

    execute() {
        // inicializar middlewares
        this.middlewares();

        // configuraciones sockets
        this.configSockets();

        // inicializar server
        this.server.listen(this.port, () => {
            console.log('Server corriendo', this.port);
        });
    }

}

module.exports = Server;
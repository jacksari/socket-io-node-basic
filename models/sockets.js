const BandList = require("./band-list");

class Sockets {

    constructor( io ) {
        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        // on conection
        this.io.on('connection', ( socket ) => {
            console.log('cliente conectado');

            // Emitir al cliente conectado todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands() );

            // votar por la banda
            socket.on('votar-banda', (id) => {
                this.bandList.increaseVotes(id)
                this.io.emit('current-bands', this.bandList.getBands() );
            });
        
            // eliminar voto
            socket.on('eliminar-banda', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands() );
            });

            socket.on('update-name', ({id, name}) => {
                this.bandList.changeName(id, name);
                this.io.emit('current-bands', this.bandList.getBands() );
            });

            socket.on('add-band', (name) => {
                this.bandList.addBand(name);
                this.io.emit('current-bands', this.bandList.getBands() );
            })

        });
        
    }

}

module.exports = Sockets;
const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app        = express();
        this.port       = process.env.PORT;
        this.server     = require('http').createServer( this.app );
        this.io         = require('socket.io')( this.server );

        this.paths = {
            
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );
    }

    routes() { 
        // this.app.use( this.paths.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on('connection', socket => {
            // console.log('Cliente Conectado', socket.id);
            
            socket.on('disconnect', () => {
                // console.log('Cliente desconectado', socket.id);
            });

            // Informacion llega la servidor
            socket.on('enviar-mensaje', ( payload, callback ) => {
                // Podemos regresar valor por callback al cliente que mando el mensaje
                const id = 123456;
                // Tratar de mandar la menor informacion posible
                callback( { id, fecha: new Date().getTime() } );

                // Emitimos el mensaje a los clientes conectados
                // this.io.emit('enviar-mensaje', payload);
            });
        });
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
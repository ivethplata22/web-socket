const socketController = (socket) => {
    console.log('Cliente Conectado', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    // Informacion llega la servidor
    socket.on('enviar-mensaje', ( payload, callback ) => {
        // Podemos regresar valor por callback al cliente que mando el mensaje
        const id = 123456;
        // Tratar de mandar la menor informacion posible
        callback( { id, fecha: new Date().getTime() } );

        // Emitimos el mensaje a los clientes conectados menos al que envio el mensaje
        socket.broadcast.emit('enviar-mensaje', payload);
    });
}

module.exports = {
    socketController
}
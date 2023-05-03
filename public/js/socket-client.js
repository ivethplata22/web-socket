// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const btnEnviar = document.querySelector('#btnEnviar');
const txtMensaje = document.querySelector('#txtMensaje');

const socket = io();

// Escuchar eventos
socket.on('connect', () => {
    // console.log('Conectado');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

// Escuchamos los eventos que el servidor emita
socket.on('enviar-mensaje', (payload) => {
    console.log('Recibimos payload: ', payload);
});

// Cada que se presiona el boton lo escuchamos con este evento
btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: 'ABC123',
        fecha: new Date().getTime()
    }
    
    // Emitimos evento hacia el servidor y le mandamos el mensaje
    socket.emit('enviar-mensaje', payload, ( id ) => {
        console.log('Desde el server', id);
    });
});
const socketController = (socket, io) => {
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    })

    socket.on('mensaje-de-cliente', (payload, callback) =>{
        callback('Tu mensaje fue recibido');

        payload.from = 'desde el server'
        socket.broadcast.emit('mensaje-de-server', payload);
    })
}

module.exports = { socketController }


const socketController = socket => {
    console.log('Cliente conectado ', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado ', socket.id);
    })

    socket.on('mensaje-enviado', payload => {
        socket.broadcast.emit('mensaje-enviado', payload)
    })
}

module.exports = {socketController}
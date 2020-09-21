const socket = require('socket.io')
const io = socket(8080)

io.on('connection', socket => {
    const teamId = socket.handshake.query.teamid
    socket.join(teamId)
    socket.on('send-message', data => {
        const roomId = data.teamId
        socket.to(roomId).broadcast.emit('new-message', data)
    })
})


const http = require('http')
const express = require('express')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoyPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoyPath))

io.on('connection', (socket) => {
    console.log('new websocket connection')
    // socket.emit('countUpdated', count)   //event
    // socket.on('increment', () => {
    //     count++
    //     //socket.emit('countUpdated', count)
    //     io.emit('countUpdated', count)
    // })

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user joined')

    socket.on('sendMessage', (message)=>{
        io.emit('message', message)
    })
    socket.on('disconnect',()=>{
        io.emit('message', 'A user has left!')
    })
})

server.listen(port, () => {
    console.log('server is started on http://localhost:3000')
})


//socket.emit - This method is responsible for sending messages.
// socket.on - This method is responsible for listening for incoming messages
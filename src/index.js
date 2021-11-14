const http = require('http')
const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')

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

    socket.on('sendMessage', (message, callback)=>{
        const filter = new Filter()
        if(filter.isProfane(message)){
            return callback('bad words not allowed!')
        }
        io.emit('message', message)
        callback()
    })

    socket.on('SendLocation', (coords, callback) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback('Location shared')
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
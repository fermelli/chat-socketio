const express = require('express')
const app = express();
const path = require('path')
const { Server } = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const port = 3000
const io = new Server(server)

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado')

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado')
    })

    socket.on('chat', (chat) => {
        console.log(chat)

        io.emit('chat', chat)
    })
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
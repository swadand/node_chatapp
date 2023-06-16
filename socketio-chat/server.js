const app = require("express")();
const http = require('http').Server(app);

const { Server } = require('socket.io');
const io = new Server(http);

port = process.env.port | 8080;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

http.listen(port, (req, res)=> {
    console.log(`server started at http://localhost:${port}/`);
});
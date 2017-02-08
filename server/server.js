const path = require('path');
const express = require('express');
const app = express();
const forwarded = require('forwarded-for');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, './../')));

io.on('connection', () => {
    console.log('A user connected!');
});

io.total = 0;
io.users = [];

io.on('connection', (socket) => {
    const req = socket.request;
    const ip = forwarded(req, req.headers);

    io.total += 1;

    socket.on('disconnect', () => {
        io.total -= 1;
        io.users = io.users.filter((item) => {
            return item !== socket.name;
        });
        console.log('Disc', socket.name, io.users);
        io.emit('onlineUsers', io.total, io.users);
    });

    // socket.broadcast.emit('onlineUsers', 'online users message');

    socket.on('join', (data) => {
        // if (socket.name) return;
        socket.name = data.name;
        // To client.
        socket.emit('joined');
        io.users.push(data.name);
        io.emit('onlineUsers', io.total, io.users);
    });

});

server.listen(8080, () => {
    console.log('Listening on port 8080');
});

module.exports = app;

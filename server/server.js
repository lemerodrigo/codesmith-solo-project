const path = require('path');
const express = require('express');
const app = express();
const forwarded = require('forwarded-for');
const server = require('http').createServer(app);
const sio = require('socket.io')(server);

app.use(express.static(path.join(__dirname, './../')));

sio.on('connection', () => {
    console.log('A user connected!');
});

sio.total = 0;
sio.users = [];
sio.allBalls = [];

sio.on('connection', (socket) => {
    // const req = socket.request;
    // const ip = forwarded(req, req.headers);

    sio.total += 1;

    // socket.on('disconnect', () => {
    //     sio.total -= 1;
    //     sio.users = sio.users.filter((item) => {
    //         return item.id !== socket.id;
    //     });
    //     sio.emit('onlineUsers', sio.total, sio.users);
    // });

    // socket.broadcast.emit('onlineUsers', 'online users message');

    // socket.on('join', (obj) => {
    //     socket.id = obj.id;
    //     socket.emit('joined');
    //     sio.users.push(obj);
    //     sio.emit('onlineUsers', sio.total, sio.users);
    // });

    socket.on('appendNewBallServer', (lightBall) => {
        console.log('append new ball server ###', lightBall);
        sio.allBalls.push(lightBall);
        // socket.broadcast.emit('updateBalls', sio.allBalls);
        sio.emit('updateBalls', sio.allBalls);
    });

    // socket.on('newBall', (obj) => {
    //     socket.broadcast.emit('newBall', obj);
    // });

});

server.listen(8080, () => {
    console.log('Listening on port 8080');
});
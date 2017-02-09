const clientSocket = require('socket.io-client')();

class Socket {
    constructor(board) {
        this.startListeners();
        this.board = board;
    }

    // join(jqueryObj) {
    //     this.ms.emit('join', {
    //         id: 'client' + Math.floor(Math.random() * 100),
    //         // name: name,
    //         jqueryObj: jqueryObj,
    //     });
    // }

    appendNewBall(lightBall) {
        clientSocket.emit('appendNewBallServer', lightBall);
    }

    startListeners() {
        // console.log('Starting IO listeners...');

        clientSocket.on('updateBalls', (allBalls) => {
            console.log('updateBalls', allBalls);
            // const $ball = ball.render();
            // allBalls.forEach((item) => {
                // this.board.$el.append(item.get(0));
                // console.log(item);
                this.board.renderAllBalls(allBalls);
                // $('#board').append(item.$el);
            // });
        });

        // this.ms.on('joined', () => {
        //     // console.log('This client joined the game...');
        // });

        // this.ms.on('onlineUsers', (n, objs) => {
        //     console.log('onlineUsers', JSON.stringify(objs));
        //     let html = 'Online users: ' + n;
        //     // for (let i in objs) {
        //     //     const obj = objs[i];
        //     //     html += ' <span>' + obj.name + '</span> ';
        //     // }
        //     $('#onlineUsers').html(html);
        // });

        // this.ms.on('updateBalls', () => {
        //     console.log('Updating balls');
        //     //  socket.emit('join', {
        //     //     name: userName
        //     //   });
        // });
    }
}

module.exports = Socket;
import React, { Component } from 'react';

let Snake = require('./Snake.jsx');

class Board extends Component {
    constructor() {
        super();
        this.boardWidth = null;
        this.boardHeight = null;
        this.totalBlocks = null;
        this.totalCols = null;
        this.totalRows = null;
        this.blockSize = 10;
        // this.setEvents();
        this.state = {
            freeSlots: [],
            busySlots: []
        };
    }

    render() {

        // Just getting the size of the window.
        const dw = $(document).width();
        const dh = $(document).height();

        // Just doing some math to adjust document size according to the block size.
        this.boardWidth = dw - (dw % this.blockSize);
        this.boardHeight = dh - (dh % this.blockSize);
        this.totalCols = this.boardWidth / this.blockSize;
        this.totalRows = this.boardHeight / this.blockSize;
        this.totalBlocks = this.totalCols * this.totalRows;

        // console.log(this.boardWidth, this.boardHeight, this.totalCols, this.totalRows, this.totalBlocks);

        // Rendering the board.
        return (
            <div id="board">
                <Snake id={'snake' + 1} blockSize={this.blockSize} />
            </div>
        );
    }

    componentDidMount() {
        // Setup board properties.
        this.setBoardSize();
        this.setBoardPosition();
        this.setBoardBackground();
    }

    setBoardSize() {
        $('#board').css({
            width: this.boardWidth,
            height: this.boardHeight,
        });
    }

    setBoardPosition() {
        $('#board').css({
            margin: 'auto',
            position: 'relative',
        });
    }

    setBoardBackground() {
        $('#board').css({
            background: '#cccccc',
        });
    }

    // All boards events are setted here.
    setEvents() {
        $('body').on('keydown', e => this.eventHandler(e));
    }

    // Event listener for user inputs.
    // eventHandler(e) {
    //     // Space key.
    //     if (e.keyCode === 32) {
    //         console.log('space');
    //         // this.move.bind(this)();
    //         // this.head.move();
    //     }
    //     // Left arrow key.
    //     if (e.keyCode === 37) {
    //         console.log('left');
    //         // this.head.currentDirection = 'left';
    //     }
    //     // Right arrow key.
    //     if (e.keyCode === 39) {
    //         console.log('right');
    //         // this.head.currentDirection = 'right';
    //     }
    //     // Up arrow key.
    //     if (e.keyCode === 38) {
    //         console.log('up');
    //         // this.head.currentDirection = 'up';
    //     }
    //     // Down arrow key.
    //     if (e.keyCode === 40) {
    //         console.log('down');
    //         // this.head.currentDirection = 'down';
    //     }
    // }

    // append() {
    //     let snake = {
    //         el: <Snake key={"1"} snakeId={1} />,
    //     };
    //     console.log(snake.el);
    //     $('#board').append(snake.el);
    // }
}

module.exports = Board;
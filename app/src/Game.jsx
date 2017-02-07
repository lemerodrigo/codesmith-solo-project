import React, { Component } from 'react';

class Game extends Component {
  constructor() {
    super();
    this.state = {
        debug: true,
        xpto: 'new  sswwwwssasdads',
    };
  }

  render() {
    return (
      <div>Debug: {this.state.xpto}</div>
    );
  }
}

module.exports = Game;


class BoardX {
    constructor() {
        this.head = new Head($('#board'));
        this.apple = new Apple($('#board'));
        this.width = 700;
        this.height = 700;
        this.gridBlockSize = 50;
        this.rows = this.height / this.gridBlockSize;
        // console.log('rows', this.rows);

        const gridSize = Math.pow(this.width / this.gridBlockSize, 2);
        // console.log('gridSize', gridSize);
        this.grid = new Array(gridSize);
        this.setRandomAppleLocation();
    }

    render() {
        $('body').on('keydown', (e) => this.eventHandler(e));
    }

    setRandomAppleLocation() {
        let randomPositionX = (Math.floor(Math.random() * 13) + 1) * 50;
        let randomPositionY = (Math.floor(Math.random() * 13) + 1) * 50;

        this.apple.x = randomPositionX;
        this.apple.y = randomPositionY;

        // console.log('this.apple.x', this.apple.x, 'this.apple.y', this.apple.y);

        let newX = this.apple.x / this.gridBlockSize;
        let newY = (this.apple.y / this.gridBlockSize) * this.rows;

        // console.log('newX', newX, 'newY', newY);

        this.apple.current = newX + newY;
        this.grid[this.apple.current] = this.apple;

        // console.log('apple current', this.apple.current);

        // Just for the very start of the game.
        if (this.current === this.apple.current) {
            setRandomAppleLocation();
        }

        this.apple.node.css({ top: randomPositionY, left: randomPositionX });

        $('#board').append(this.apple.node);
    }

    eventHandler(e) {
        // Space key.
        if (e.keyCode === 32) {
            // this.move.bind(this)();
            this.head.move();
        }
        if (e.keyCode === 37) {
            this.head.currentDirection = 'left';
        }
        if (e.keyCode === 39) {
            this.head.currentDirection = 'right';
        }
        if (e.keyCode === 38) {
            this.head.currentDirection = 'up';
        }
        if (e.keyCode === 40) {
            this.head.currentDirection = 'down';
        }
    }
}


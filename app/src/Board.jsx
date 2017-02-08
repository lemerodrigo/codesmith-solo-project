import React, { Component } from 'react';

let Ball = require('./Ball.jsx');
let Food = require('./Food.jsx');

class Board extends Component {
    constructor() {
        super();
        this.boardWidth = null;
        this.boardHeight = null;
        this.totalBlocks = null;
        this.totalCols = null;
        this.totalRows = null;
        this.ballSize = 20;
        this.totalFoods = 50;
        this.radius = true;
        this.foodSize = 5;
        this.state = {
        };
    }

    foodsGenerator() {
        let foods = [];
        for (let i = 0; i < this.totalFoods; i++) {
            foods.push(<Food key={i} id={'food' + i} foodSize={this.foodSize} boardWidth={this.boardWidth} boardHeight={this.boardHeight} ballSize={this.ballSize} radius={this.radius} />);
        }
        return foods;
    }

    render() {

        // Just getting the size of the window.
        const dw = $(document).width() - 100;
        const dh = $(document).height() - 100;

        // Just doing some math to adjust document size according to the block size.
        this.boardWidth = dw - (dw % this.ballSize);
        this.boardHeight = dh - (dh % this.ballSize);
        this.totalCols = this.boardWidth / this.ballSize;
        this.totalRows = this.boardHeight / this.ballSize;
        this.totalBlocks = this.totalCols * this.totalRows;

        // console.log(this.boardWidth, this.boardHeight, this.totalCols, this.totalRows, this.totalBlocks);

        // Rendering the board.
        return (
            <div id="board">
                <Ball id={'ball' + 1} ballSize={this.ballSize} boardWidth={this.boardWidth} boardHeight={this.boardHeight} radius={this.radius} />
                {this.foodsGenerator()}
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
            margin: '50px auto',
            position: 'relative',
        });
    }

    setBoardBackground() {
        $('#board').css({
            overflow: 'hidden',
            background: '#000',
        });
    }
}

module.exports = Board;
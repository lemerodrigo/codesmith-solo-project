let Ball = require('./Ball.js');
let Food = require('./Food.js');

class Board {
    constructor() {
        this.$el = null;
        this.boardWidth = null;
        this.boardHeight = null;
        this.totalBlocks = null;
        this.totalCols = null;
        this.totalRows = null;
        this.gridSize = 10;
        this.totalFoods = 10;
        this.radius = false;
        this.foodSize = 5;
        this.init();
    }

    init() {
        this.$el = $('<div />', {
            id: 'board'
        });

        // Just getting the size of the window.
        const dw = $(document).width() - 100;
        const dh = $(document).height() - 100;

        // Just doing some math to adjust document size according to the block size.
        this.boardWidth = dw - (dw % this.gridSize);
        this.boardHeight = dh - (dh % this.gridSize);
        this.totalCols = this.boardWidth / this.gridSize;
        this.totalRows = this.boardHeight / this.gridSize;
        this.totalBlocks = this.totalCols * this.totalRows;

        this.setElementProps();
        this.newPlayer();
        this.initFoods();
    }

    render() {
        return this.$el;
    }

    setElementProps() {
        this.setBoardSize();
        this.setBoardPosition();
        this.setBoardBackground();
    }

    setBoardSize() {
        this.$el.css({
            width: this.boardWidth,
            height: this.boardHeight,
        });
    }

    setBoardPosition() {
        this.$el.css({
            margin: '50px auto',
            position: 'relative',
        });
    }

    setBoardBackground() {
        this.$el.css({
            overflow: 'hidden',
            background: '#000',
        });
    }

    newPlayer() {
        const ball = new Ball(0, 'R', this);
        this.$el.append(ball.render().get(0));
    }

    newFood() {
        return new Food(this);
    }

    initFoods() {
        for (let i = 0; i < this.totalFoods; i++) {
            this.$el.append(this.newFood().render().get(0));
        }
    }
}

module.exports = Board;
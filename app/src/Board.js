// let Ball = require('./Ball.js');
let Food = require('./Food.js');
const sioClass = require('./Socket.js');

class Board {
    constructor() {
        this.$el = null;
        this.ballId = null;
        this.sioObject = new sioClass(this);
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

        this.setBoardProps();
        this.initFoods();
        this.setEvents();
    }

    render() {
        return this.$el;
    }

    renderAllBalls(allBalls) {
        $('.ball').remove();
        const factor = this.gridSize * 1;
        allBalls.forEach((ball) => {

            let $ball = $('<div />', {
                id: ball.id,
                class: 'ball',
            });
            $ball.css({
                top: ball.top,
                left: ball.left,
                background: 'white',
                position: 'absolute',
                fontWeight: 'bold',
                fontFamily: 'Arial',
                textAlign: 'center',
                width: factor + 'px',
                height: factor + 'px',
                // fontSize: factor / 2 + 'px',
                // lineHeight: factor + 'px',
            });
            // if (this.radius) {
            //     $ball.css({
            //         borderRadius: this.size * this.gridSize + 'px',
            //     });
            // }
            this.$el.append($ball.get(0));
        });
    }

    setBoardProps() {
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

    getRandomColor() {
        let rgb = [];
        for (let i = 0; i < 3; i++) {
            rgb.push(Math.floor(Math.random() * 255));
        }
        return rgb.join(',');
    }

    getRandomBallId() {
        return 'ball' + this.randomIntFromInterval(0, 10000);
    }

    newBall() {
        this.ballId = this.getRandomBallId();
        const factor = this.gridSize * 1;
        const top = this.getRandomTop();
        const left = this.getRandomLeft();
        let $ball = $('<div />', {
            id: this.ballId,
            class: 'ball',
            top: top,
            left: left,
            position: 'absolute',
            background: 'rgb('+this.getRandomColor()+')',
            fontWeight: 'bold',
            fontFamily: 'Arial',
            textAlign: 'center',
            width: factor + 'px',
            height: factor + 'px',
            fontSize: factor / 2 + 'px',
            lineHeight: factor + 'px',
        });
        if (this.radius) {
            $ball.css({
                borderRadius: this.size * this.gridSize + 'px',
            });
        }
        const lightBall = {
            id: this.ballId,
            top: top,
            left: left,
        };
        // this.$el.append($ball.get(0));
        this.sioObject.appendNewBall(lightBall);
    }

    setEvents() {
        $('body').on('keydown', e => this.eventHandler(e));
    }

    eventHandler(e) {
        if (e.keyCode === 37) this.move('left');
        if (e.keyCode === 38) this.move('up');
        if (e.keyCode === 39) this.move('right');
        if (e.keyCode === 40) this.move('down');
    }

    move(direction) {
        let $ball = $('#' + this.ballId);
        let curTop = $ball.position().top;
        let curLeft = $ball.position().left;
        if (direction === 'right' && curLeft < (this.boardWidth - (1 * this.gridSize))) curLeft = curLeft + this.gridSize;
        if (direction === 'left' && curLeft > 0) curLeft = curLeft - this.gridSize;
        if (direction === 'up' && curTop > 0) curTop = curTop - this.gridSize;
        if (direction === 'down' && curTop < (this.boardHeight - (1 * this.gridSize))) curTop = curTop + this.gridSize;
        
        // Make the movement.
        $ball.css({top: curTop, left: curLeft});

        // Colission detector.
        // this.collisionDetector();

        // Looper.
        // clearTimeout(this.moving);
        // this.moving = setTimeout(this.move.bind(this, direction), this.speed);
    }

    newFood() {
        return new Food(this);
    }

    initFoods() {
        for (let i = 0; i < this.totalFoods; i++) {
            this.$el.append(this.newFood().render().get(0));
        }
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getRandomTop() {
        const limit = this.boardHeight - this.gridSize;
        const rnd = this.randomIntFromInterval(0, limit);
        return rnd - (rnd % this.gridSize);
    }

    getRandomLeft() {
        const limit = this.boardWidth - this.gridSize;
        const rnd = this.randomIntFromInterval(0, limit);
        return rnd - (rnd % this.gridSize);
    }

}

module.exports = Board;
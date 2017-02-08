class Ball {

  constructor(id, name, board) {
    this.board = board;
    this.id = id;
    this.$el = null;
    this.moving = null;
    this.size = 2;
    this.name = name;
    this.init();
  }

  init() {
      this.$el = $('<div />', {
          id: 'ball' + this.id,
          class: 'ball',
          text: this.name,
      });

      this.setElementProps();
      this.setEvents();
  }

  render() {
    return this.$el;
  }

  setElementProps() {
    const factor = this.board.gridSize * this.size;
    this.$el.css({
        top: '100',
        left: '100',
        position: 'absolute',
        background: '#ccc',
        fontSize: (this.board.gridSize * this.size) / 2 + 'px',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        textAlign: 'center',
    });
    this.setElementSize();
  }

  setElementSize() {
    const factor = this.size * this.board.gridSize;
    this.$el.css({
        width: factor,
        height: factor,
        fontSize: factor / 2 + 'px',
        lineHeight: factor + 'px',
    });
    if (this.board.radius) {
        this.$el.css({
          borderRadius: this.size * this.board.gridSize + 'px',
        });
    }
  }

  setEvents() {
    $('body').on('keydown', e => this.eventHandler(e));
  }

  // Keyboard arrows event handler.
  eventHandler(e) {
    if (e.keyCode === 37) this.move('left');
    if (e.keyCode === 38) this.move('up');
    if (e.keyCode === 39) this.move('right');
    if (e.keyCode === 40) this.move('down');
  }

  move(direction) {
    let curTop = this.$el.position().top;
    let curLeft = this.$el.position().left;
    if (direction === 'right' && curLeft < (this.board.boardWidth - (this.size * this.board.gridSize))) curLeft = curLeft + this.board.gridSize;
    if (direction === 'left' && curLeft > 0) curLeft = curLeft - this.board.gridSize;
    if (direction === 'up' && curTop > 0) curTop = curTop - this.board.gridSize;
    if (direction === 'down' && curTop < (this.board.boardHeight - (this.size * this.board.gridSize))) curTop = curTop + this.board.gridSize;
    
    // Make the movement.
    this.$el.css({top: curTop, left: curLeft});

    // Colission detector.
    this.collisionDetector();

    // Looper.
    // clearTimeout(this.moving);
    // this.moving = setTimeout(this.move.bind(this, direction), this.speed);
  }

  collisionDetector() {
    this.foodCollisionDetector();
  }

  checkTwoElsCollision($div1, $div2) {
    const x1 = $div1.offset().left;
    const y1 = $div1.offset().top;
    const h1 = $div1.outerHeight(true);
    const w1 = $div1.outerWidth(true);
    const b1 = y1 + h1;
    const r1 = x1 + w1;
    const x2 = $div2.offset().left;
    const y2 = $div2.offset().top;
    const h2 = $div2.outerHeight(true);
    const w2 = $div2.outerWidth(true);
    const b2 = y2 + h2;
    const r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }

  foodCollisionDetector() {
      $('.ball').each((idx, ballEl) => {
          $('.food').each((idx, foodEl) => {
              if (this.checkTwoElsCollision($(ballEl), $(foodEl))) {
                $(foodEl).remove();
                this.board.$el.append(this.board.newFood().render().get(0));
                this.size += 1;
                this.setElementSize();
              }
          });
      });
  }

  borderCollisionDetector() {
    if (this.$el.position().left <= 0) {
      console.log('BOOOOOOMMM LEFT');
    }

    if (this.$el.position().left >= (this.props.boardWidth - (this.size * this.props.ballSize))) {
      console.log('BOOOOOOMMM RIGHT');
    }

    if (this.$el.position().top <= 0) {
      console.log('BOOOOOOMMM TOP');
    }

    if (this.$el.position().top >= (this.props.boardHeight - (this.size * this.props.ballSize))) {
      console.log('BOOOOOOMMM BOT');
    }
  }
}

module.exports = Ball;

class Food {

  constructor(board) {
    this.$el = null;
    this.board = board;
    this.init();
  }

  init() {
    this.$el = $('<div />', {
        id: 'food' + this.id,
        class: 'food',
    });
    this.setElementProps();
  }

  render() {
    return this.$el;
  }

  setElementProps() {
    const left = this.getRandomLeft();
    const top = this.getRandomTop();
    this.$el.css({
        width: this.board.foodSize,
        height: this.board.foodSize,
        position: 'absolute',
        background: '#5bef13',
        top: top,
        left: left,
    });
    if (this.board.radius) {
      this.$el.css({
        borderRadius: (this.board.foodSize / 2) + 'px',
      })
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomTop() {
    const limit = this.board.boardHeight - this.board.foodSize;
    const rnd = this.randomIntFromInterval(0, limit);
    return rnd - (rnd % this.board.gridSize);
  }

  getRandomLeft() {
    const limit = this.board.boardWidth - this.board.foodSize;
    const rnd = this.randomIntFromInterval(0, limit);
    return rnd - (rnd % this.board.gridSize);
  }
}

module.exports = Food;
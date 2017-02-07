class Head {

  constructor($el) {
    this.running = false;
    this.node = $('<div id="head"></div>');
    this.currentDirection = 'right';
    // this.tail = $('<div class="tail"></div>');
    this.SPEED = 200;
    this.x = 0;
    this.y = 0;
    this.current = 0;
    this.previous = 0;
    this.previousObj = null;
    $el.append(this.node);
    this.node.css({ top: self.y, left: self.x });
  }

  stop() {
    clearTimeout(this.running);
  }

  trackPosition() {
    this.previous = this.current;
    let newX = this.x / window.board.gridBlockSize;
    let newY = (this.y / window.board.gridBlockSize) * window.board.rows;
    // console.log('this.x', this.x, 'this.y', this.y, newX, newY);
    this.current = newX + newY;
    // window.board.grid[this.current] = this;
    // console.log('head current', this.current, 'previous value', this.previous);
  }

  updateBody() {
    let head = this;
    while (head.previousObj) {
      head.previousObj.current = head.previous;
      let top = Math.floor(head.previousObj.current / 14) * 50;
      let left = (head.previousObj.current % 14) * 50;
      head.previousObj.node.css({ top: top, left: left });

      head = head.previousObj;
    }
    // console.log('head', head);
  }

  // insert(arg) {
  //   let top = Math.floor(arg.previous / 14) * 50;
  //   let left = (arg.previous % 14) * 50;
  //   arg.node.css({ top: top, left: left });
  // //  this.node.position().left = left;
  // //  this.node.position().top = top;
  // //  console.log(this.node.position())
  // }

  move() {
    let direction = this.currentDirection;
    let position = this.node.position();

    if (direction === 'right') {
      position.left += 50;
      this.node.offset(position);
      this.x = Math.round(position.left);
      this.trackPosition();
      this.collisionDetector();
    }
    if (direction === 'left') {
      position.left -= 50;
      this.node.offset(position);
      this.x = Math.round(position.left);
      this.trackPosition();
      this.collisionDetector();
    }
    if (direction === 'up') {
      position.top -= 50;
      this.node.offset(position);
      this.y = Math.round(position.top);
      this.trackPosition();
      this.collisionDetector();
    }
    if (direction === 'down') {
      position.top += 50;
      this.node.offset(position);
      this.y = Math.round(position.top);
      this.trackPosition();
      this.collisionDetector();
    }

    // if (this.running) {
    //   clearTimeout(this.running)
    // }
    this.running = setTimeout(this.move.bind(this), this.SPEED);
  }

  collisionDetector() {
    this.appleCollisionDetector();
    this.borderCollisionDetector();
  }

  // When the head of the snake has the same position as the apple.
  appleCollisionDetector() {
    // console.log('window.board.apple.x', window.board.apple.x, 'window.board.apple.y', window.board.apple.y);

    // Collision!
    if (this.current === window.board.apple.current) {

      if (this.previousObj === null) {
          this.previousObj = new Body(this.current);
      } else {
        let head = this;

        // Working.        
        while (head.previousObj) {
            head.previousObj.previous = head.previousObj.current;
            head.previousObj.current = head.current;
            head = head.previousObj;
        }
        head.previousObj = new Body(head.previous);

      }
      window.board.setRandomAppleLocation();
    }
    this.updateBody();
  }

  borderCollisionDetector() {
    console.log();
    if (this.node.position().left > 650 || this.node.position().left < 0) {
      this.stop()
      $('h1').html('Game over!');
    }
    if (this.node.position().top > 650 || this.node.position().top < 0) {
      this.stop()
      $('h1').html('Game over!');
    }
  }
}

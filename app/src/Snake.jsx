import React, { Component } from 'react';

class Snake extends Component {

  constructor() {
    super(); 
    this.SPEED = 50;
    this.direction = 'right';
    this.running = null;
  }

  render() {
    this.setEvents();
    return (
      <div className="snake" id={this.props.id} />
    );
  }

  componentDidMount() {
    // All snakes setup.
    $('.snake').css({
        width: this.props.blockSize,
        height: this.props.blockSize,
        top: '100',
        left: '100',
        position: 'absolute',
        background: 'black',
    });
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
    let $el = $('#' + this.props.id);
    let curTop = $el.position().top;
    let curLeft = $el.position().left;
    if (direction === 'right') curLeft = curLeft + this.props.blockSize;
    if (direction === 'left') curLeft = curLeft - this.props.blockSize;
    if (direction === 'up') curTop = curTop - this.props.blockSize;
    if (direction === 'down') curTop = curTop + this.props.blockSize;
    console.log($el.position());

    $el.css({top: curTop, left: curLeft});
    clearTimeout(this.running);
    this.running = setTimeout(this.move.bind(this, direction), this.SPEED);
  }

  collisionDetector() {
    this.appleCollisionDetector();
    this.borderCollisionDetector();
  }

  // When the head of the snake has the same position as the apple.
  // appleCollisionDetector() {
  //   // console.log('window.board.apple.x', window.board.apple.x, 'window.board.apple.y', window.board.apple.y);

  //   // Collision!
  //   if (this.current === window.board.apple.current) {

  //     if (this.previousObj === null) {
  //         this.previousObj = new Body(this.current);
  //     } else {
  //       let head = this;

  //       // Working.        
  //       while (head.previousObj) {
  //           head.previousObj.previous = head.previousObj.current;
  //           head.previousObj.current = head.current;
  //           head = head.previousObj;
  //       }
  //       head.previousObj = new Body(head.previous);

  //     }
  //     window.board.setRandomAppleLocation();
  //   }
  //   this.updateBody();
  // }

  // borderCollisionDetector() {
  //   console.log();
  //   if (this.node.position().left > 650 || this.node.position().left < 0) {
  //     this.stop()
  //     $('h1').html('Game over!');
  //   }
  //   if (this.node.position().top > 650 || this.node.position().top < 0) {
  //     this.stop()
  //     $('h1').html('Game over!');
  //   }
  // }
}

module.exports = Snake;

import React, { Component } from 'react';

class Ball extends Component {

  constructor() {
    super(); 
    this.moving = null;
    this.size = 1;
    this.player = 'R';
  }

  render() {
    this.setEvents();
    return (
      <div className="ball" id={this.props.id}>{this.player}</div>
    );
  }

  componentDidMount() {
    // All balls setup.
    $('.ball').css({
        width: this.size * this.props.ballSize,
        height: this.size * this.props.ballSize,
        top: '100',
        left: '100',
        position: 'absolute',
        background: '#ccc',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        textAlign: 'center',
        fontSize: (this.props.ballSize * this.size) / 2 + 'px',
        lineHeight: this.props.ballSize * this.size + 'px',
    });
    if (this.props.radius) {
        $('.ball').css({
          borderRadius: this.size * (this.props.ballSize / 2) + 'px',
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
    let $el = $('#' + this.props.id);
    let curTop = $el.position().top;
    let curLeft = $el.position().left;

    if (direction === 'right' && curLeft < (this.props.boardWidth - (this.size * this.props.ballSize))) curLeft = curLeft + this.props.ballSize;
    if (direction === 'left' && curLeft > 0) curLeft = curLeft - this.props.ballSize;
    if (direction === 'up' && curTop > 0) curTop = curTop - this.props.ballSize;
    if (direction === 'down' && curTop < (this.props.boardHeight - (this.size * this.props.ballSize))) curTop = curTop + this.props.ballSize;
    console.log($el.position());
    
    // Make the movement.
    $el.css({top: curTop, left: curLeft});

    // Colission detector.
    // this.collisionDetector($el);

    // Looper.
    // clearTimeout(this.moving);
    // this.moving = setTimeout(this.move.bind(this, direction), this.speed);
  }

  collisionDetector($el) {
    // this.borderCollisionDetector($el);
    // this.appleCollisionDetector();
  }

  borderCollisionDetector($el) {
    if ($el.position().left <= 0) {
      console.log('BOOOOOOMMM LEFT');
    }

    if ($el.position().left >= (this.props.boardWidth - (this.size * this.props.ballSize))) {
      console.log('BOOOOOOMMM RIGHT');
    }

    if ($el.position().top <= 0) {
      console.log('BOOOOOOMMM TOP');
    }

    if ($el.position().top >= (this.props.boardHeight - (this.size * this.props.ballSize))) {
      console.log('BOOOOOOMMM BOT');
    }
  }
}

module.exports = Ball;

import React, { Component } from 'react';

class Food extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div id={this.props.id} className="food" />
    );
  }

  componentDidMount() {
    $('.food').css({
        width: this.props.foodSize,
        height: this.props.foodSize,
        position: 'absolute',
        background: '#5bef13',
    });
    if (this.props.radius) {
      $('.food').css({
        borderRadius: (this.props.foodSize / 2) + 'px',
      })
    }
    $('#' + this.props.id).css({
        top: this.getRandomTop(),
        left: this.getRandomLeft(),
    });
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomTop() {
    const limit = this.props.boardHeight - this.props.foodSize;
    const rnd = this.randomIntFromInterval(0, limit);
    return rnd - (rnd % this.props.ballSize);
  }

  getRandomLeft() {
    const limit = this.props.boardWidth - this.props.foodSize;
    const rnd = this.randomIntFromInterval(0, limit);
    return rnd - (rnd % this.props.ballSize);
  }
}

module.exports = Food;
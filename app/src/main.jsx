import React, { Component } from 'react';
import { render } from 'react-dom';

var Game = require('./Game.jsx');

render(
  <Game />,
  document.getElementById('main-container')
);
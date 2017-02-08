import React, { Component } from 'react';
import { render } from 'react-dom';

var Board = require('./Board.jsx');

render(
  <Board />,
  document.getElementById('main-container')
);
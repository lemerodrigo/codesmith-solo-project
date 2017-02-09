const Board = require('./Board.js');

const board = new Board();

$('#main-container').html(board.render().get(0));
board.newBall();

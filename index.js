'use strict';

var game = require('./game.js');

var maxRow = 25;
var maxCol = 25;
var grid = game.createGrid(maxRow, maxCol);
game.setGliderPattern(grid);
// game.setRandomPattern(grid);

setInterval(function () {
  game.printGrid(grid);
  grid = game.evolve(grid, maxRow, maxCol);
}, 200);

'use strict';


function run() {
  var maxRow = 25;
  var maxCol = 25;
  var grid = createGrid(maxRow, maxCol);
  setPattern(grid);

  setInterval(function () {
    printGrid(grid);
    grid = evolve(grid, maxRow, maxCol);
  }, 200);
}

function createGrid(maxRow, maxCol) {
  var grid = [];
  var row;
  for (var i = 0; i < maxRow; i++) {
    row = [];
    for (var j = 0; j < maxCol; j++) {
      // using 0/1 instead of true/false, in case we want to introduce new state
      row.push(0);
    }
    grid.push(row);
  }

  return grid;
}

function setPattern(grid) {
  grid[0][1] = 1;
  grid[1][2] = 1;
  grid[2][0] = 1;
  grid[2][1] = 1;
  grid[2][2] = 1;
}

function printGrid(grid) {
  if (grid.length > 0) {
    console.log(new Array(grid[0].length+1).join('='));
  }

  for (var i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''));
  }
}

function evolve(grid, maxRow, maxCol) {
  var neighbourCount
  // for really large grid, creating a separate grid will be slow and memory-unfriendly
  // it will make more sense to store an array of changes and make in-place update
  // after all the evolution calculations are complete
  var newGrid = createGrid(maxRow, maxCol);
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      neighbourCount = getNeighbourCount(grid, maxRow, maxCol, i, j);
      if (neighbourCount === 3) {
        newGrid[i][j] = 1;
      } else if (neighbourCount === 2) {
        newGrid[i][j] = grid[i][j];
      }
    }
  }

  return newGrid;
}

function getNeighbourCount(grid, maxRow, maxCol, row, col) {
  var count = 0;
  var ii, jj;

  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      ii = row + i;
      jj = col + j;
      if (ii < 0) ii = ii + maxRow;
      else if (ii >= maxRow) ii = ii - maxRow;
      if (jj < 0) jj = jj + maxCol;
      else if (jj >= maxRow) jj = jj - maxCol;

      count += grid[ii][jj];
    }
  }

  return count;
}

run();

module.exports = {
  createGrid,
  evolve,
  getNeighbourCount
};

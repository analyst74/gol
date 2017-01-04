'use strict';

function createGrid(maxRow, maxCol) {
  var grid = [];
  var row;
  for (let i = 0; i < maxRow; i++) {
    row = [];
    for (let j = 0; j < maxCol; j++) {
      // using 0/1 instead of true/false, in case we want to introduce new state
      row.push(0);
    }
    grid.push(row);
  }

  return grid;
}

function setRandomPattern(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = Math.round(Math.random(0, 1));
    }
  }
}

function setGliderPattern(grid) {
  // this is hard-coded for now, but could potentially be modified
  // to support pre-defined patterns or random patterns
  // or even user-drawn initial patterns
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

  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''));
  }
}

function evolve3(grid, maxRow, maxCol) {
  var inverseGrid = createGrid(maxRow, maxCol);
}

function evolve2(grid, maxRow, maxCol) {
  var neighbourCounter = {};

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        incrementAt(neighbourCounter, maxRow, maxCol, i - 1, j - 1);
        incrementAt(neighbourCounter, maxRow, maxCol, i - 1, j);
        incrementAt(neighbourCounter, maxRow, maxCol, i - 1, j + 1);
        incrementAt(neighbourCounter, maxRow, maxCol, i, j - 1);
        incrementAt(neighbourCounter, maxRow, maxCol, i, j + 1);
        incrementAt(neighbourCounter, maxRow, maxCol, i + 1, j - 1);
        incrementAt(neighbourCounter, maxRow, maxCol, i + 1, j);
        incrementAt(neighbourCounter, maxRow, maxCol, i + 1, j + 1);
      }
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1 && (!neighbourCounter[i] || !neighbourCounter[i][j] ||
        neighbourCounter[i][j] < 2 || neighbourCounter[i][j] > 3)) {
          grid[i][j] = 0;
      }
    }
  }

  for (let i in neighbourCounter) {
    for (let j in neighbourCounter[i]) {
      if (neighbourCounter[i][j] === 3) {
        grid[i][j] = 1;
      }
    }
  }

  return grid;
}

function incrementAt(counter, maxRow, maxCol, row, col) {
  if (row < 0) row += maxRow;
  else if (row >= maxRow) row -= maxRow;
  if (col < 0) col += maxCol;
  else if (col >= maxCol) col -= maxCol;

  if (!counter[row]) counter[row] = {};
  if (!counter[row][col]) counter[row][col] = 0;
  counter[row][col] += 1;
}

function evolve1(grid, maxRow, maxCol) {
  var neighbourCount
  // for really large grid, creating a separate grid will be slow and memory-unfriendly
  // it will make more sense to store an array of changes and make in-place update
  // after all the evolution calculations are complete
  var newGrid = createGrid(maxRow, maxCol);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
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
  let ii, jj;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
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

module.exports = {
  setRandomPattern,
  setGliderPattern,
  createGrid,
  evolve: evolve2,
  getNeighbourCount,
  printGrid
};

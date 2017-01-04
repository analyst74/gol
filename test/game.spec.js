var assert = require('assert');
var game = require('../game');

describe('Game Module', function() {
  describe('#createGrid', function() {
    it('should create grid of 0s with given size', function() {
      var grid = game.createGrid(5, 4);

      assert.equal(grid.length, 5);
      for (var i = 0; i < grid.length; i++) {
        assert.equal(grid[i].length, 4);
        for (var j = 0; j < grid[i].length; j++) {
          assert.equal(grid[i][j], 0);
        }
      }
    });
  });

  describe('#evolve', function() {
    it('live cell with fewer than two live neighbours dies', function() {
      var grid = game.createGrid(5, 5);
      grid[0][0] = 1;
      grid[0][1] = 1;
      grid[3][3] = 1;

      var resultGrid = game.evolve(grid, 5, 5);

      assert.equal(resultGrid[0][0], 0);
      assert.equal(resultGrid[0][1], 0);
      assert.equal(resultGrid[3][3], 0);
    });

    it('live cell with two or three live neighbours lives', function() {
      var grid = game.createGrid(5, 5);
      grid[0][0] = 1;
      grid[0][1] = 1;
      grid[0][2] = 1;
      grid[1][1] = 1;

      var resultGrid = game.evolve(grid, 5, 5);

      assert.equal(resultGrid[0][0], 1);
      assert.equal(resultGrid[0][1], 1);
      assert.equal(resultGrid[0][2], 1);
      assert.equal(resultGrid[1][1], 1);
    });

    it('live cell with more than three live neighbours dies', function() {
      var grid = game.createGrid(5, 5);
      grid[0][0] = 1;
      grid[0][1] = 1;
      grid[1][0] = 1;
      grid[4][0] = 1;
      grid[0][4] = 1;

      var resultGrid = game.evolve(grid, 5, 5);

      assert.equal(resultGrid[0][0], 0);
    });

    it('dead cell with exactly three live neighbours becomes a live cell', function() {
      var grid = game.createGrid(5, 5);
      grid[0][0] = 1;
      grid[0][1] = 1;
      grid[1][0] = 1;

      var resultGrid = game.evolve(grid, 5, 5);

      assert.equal(resultGrid[1][1], 1);
    });

    it('blinker', function() {
      var grid = game.createGrid(5, 5);
      grid[0][0] = 1;
      grid[0][1] = 1;
      grid[0][2] = 1;

      var grid = game.evolve(grid, 5, 5);

      assert.equal(grid[0][0], 0);
      assert.equal(grid[0][1], 1);
      assert.equal(grid[0][2], 0);
      assert.equal(grid[1][0], 0);
      assert.equal(grid[1][1], 1);
      assert.equal(grid[1][2], 0);
      assert.equal(grid[4][0], 0);
      assert.equal(grid[4][1], 1);
      assert.equal(grid[4][2], 0);

      var grid = game.evolve(grid, 5, 5);

      assert.equal(grid[0][0], 1);
      assert.equal(grid[0][1], 1);
      assert.equal(grid[0][2], 1);
      assert.equal(grid[1][0], 0);
      assert.equal(grid[1][1], 0);
      assert.equal(grid[1][2], 0);
      assert.equal(grid[4][0], 0);
      assert.equal(grid[4][1], 0);
      assert.equal(grid[4][2], 0);
    });
  });

  describe('#getNeighbourCount', function() {
    it('should count neighbours correctly', function() {
      var grid = game.createGrid(5, 5);
      grid[0][0] = 1;
      grid[0][1] = 1;
      grid[1][0] = 1;

      var result = game.getNeighbourCount(grid, 5, 5, 0, 0);

      assert.equal(result, 2);
    });

    it('should count neighbours correctly across the edge', function() {
      var grid = game.createGrid(5, 5);
      grid[0][1] = 1;
      grid[1][0] = 1;
      grid[4][0] = 1;
      grid[4][4] = 1;

      var result = game.getNeighbourCount(grid, 5, 5, 0, 0);

      assert.equal(result, 4);
    });
  });
});

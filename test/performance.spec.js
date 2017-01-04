var assert = require('assert');
var game = require('../game');

describe.skip('Performance Tests', function() {
  this.timeout(100000);

  var largeSize = 2000;
  var mediumSize = 500;

  describe('#evolve', function() {
    it('large grid with glider', function () {
      var initialRam = process.memoryUsage().heapUsed;
      var grid = game.createGrid(largeSize, largeSize);
      game.setGliderPattern(grid);

      for (let i = 0; i < 10; i++) {
        grid = game.evolve(grid, largeSize, largeSize);
      }

      var finalRam = process.memoryUsage().heapUsed;
      console.log((finalRam - initialRam) / 1024 / 1024, 'M');
    });

    it('large grid with random pattern', function() {
      var initialRam = process.memoryUsage().heapUsed;
      var grid = game.createGrid(largeSize, largeSize);
      game.setRandomPattern(grid);

      for (let i = 0; i < 10; i++) {
        grid = game.evolve(grid, largeSize, largeSize);
      }

      var finalRam = process.memoryUsage().heapUsed;
      console.log((finalRam - initialRam) / 1024 / 1024, 'M');
    });

    it('long-running small grid with random pattern', function() {
      var initialRam = process.memoryUsage().heapUsed;
      var grid = game.createGrid(mediumSize, mediumSize);
      game.setRandomPattern(grid);

      for (let i = 0; i < 1000; i++) {
        grid = game.evolve(grid, mediumSize, mediumSize);
      }

      var finalRam = process.memoryUsage().heapUsed;
      console.log((finalRam - initialRam) / 1024 / 1024, 'M');
    });
  });
});

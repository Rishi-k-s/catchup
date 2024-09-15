class MazeGenerator {
  constructor(width, height, difficulty) {
    this.width = width;
    this.height = height;
    this.difficulty = difficulty
    this.maze = [];
  }

  generate() {
    this.initializeMaze();
    this.carvePassagesFrom(Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height));
    this.addLoops();
    this.addDeadEnds();
    return this.maze;
  }

  initializeMaze() {
    for (let y = 0; y < this.height; y++) {
      this.maze[y] = Array(this.width).fill(1); // 1 represents a wall
    }
  }

  carvePassagesFrom(x, y) {
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    directions.sort(() => Math.random() - 0.5);

    for (let [dx, dy] of directions) {
      let nx = x + dx * 2, ny = y + dy * 2;
      if (nx >= 0 && ny >= 0 && nx < this.width && ny < this.height && this.maze[ny][nx] === 1) {
        this.maze[y + dy][x + dx] = 0;
        this.maze[ny][nx] = 0;
        this.carvePassagesFrom(nx, ny);
      }
    }
  }

  addLoops() {
    const loopCount = Math.floor(this.width * this.height * this.difficulty * 0.1);
    for (let i = 0; i < loopCount; i++) {
      let x = Math.floor(Math.random() * (this.width - 2)) + 1;
      let y = Math.floor(Math.random() * (this.height - 2)) + 1;
      if (this.maze[y][x] === 1 && this.countAdjacentPassages(x, y) >= 2) {
        this.maze[y][x] = 0;
      }
    }
  }

  addDeadEnds() {
    const deadEndCount = Math.floor(this.width * this.height * (1 - this.difficulty) * 0.1);
    for (let i = 0; i < deadEndCount; i++) {
      let x = Math.floor(Math.random() * (this.width - 2)) + 1;
      let y = Math.floor(Math.random() * (this.height - 2)) + 1;
      if (this.maze[y][x] === 0 && this.countAdjacentWalls(x, y) === 3) {
        this.maze[y][x] = 1;
      }
    }
  }

  countAdjacentPassages(x, y) {
    return this.getAdjacentCells(x, y).filter(([ax, ay]) => this.maze[ay][ax] === 0).length;
  }

  countAdjacentWalls(x, y) {
    return this.getAdjacentCells(x, y).filter(([ax, ay]) => this.maze[ay][ax] === 1).length;
  }

  getAdjacentCells(x, y) {
    return [
      [x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y]
    ].filter(([ax, ay]) => ax >= 0 && ay >= 0 && ax < this.width && ay < this.height);
  }
}

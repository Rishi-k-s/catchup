class MazeGame {
  constructor(width, height, difficulty = 0.5) {
    this.width = width;
    this.height = height;
    this.difficulty = Math.max(0, Math.min(1, difficulty));
    this.maze = [];
    this.playerPositions = [];
    this.enemy = null;
    this.moveLimit = 0;
    this.moves = 0;
    this.selectedPlayer = 0;
    this.gameOver = false;
    this.gameWon = false;
  }

  initializeGame() {
    const mazeGenerator = new MazeGenerator(this.width, this.height, this.difficulty);
    this.maze = mazeGenerator.generate();
    this.placePieces();
    this.setDifficulty(this.difficulty);
    this.moves = 0;
    this.gameOver = false;
    this.gameWon = false;
  }

  placePieces() {
    const emptySpaces = this.getEmptySpaces();

    // Calculate minimum and maximum distances based on difficulty
    const maxDimension = Math.max(this.width, this.height);
    const minDistance = Math.floor(maxDimension * (0.2 + this.difficulty * 0.3)); // 20% to 50% of max dimension
    const maxDistance = Math.floor(maxDimension * (0.5 + this.difficulty * 0.3)); // 50% to 80% of max dimension

    // Place first player
    const player1 = this.getRandomPosition(emptySpaces);
    this.playerPositions.push(player1);
    this.removePosition(emptySpaces, player1);

    // Place second player
    const player2 = this.findPositionWithinRange(emptySpaces, player1, minDistance, maxDistance);
    this.playerPositions.push(player2);
    this.removePosition(emptySpaces, player2);

    // Place enemy
    let enemyPos;
    if (this.difficulty < 0.5) {
      // For lower difficulties, place the enemy farther from players
      enemyPos = this.findFarthestPosition(emptySpaces, this.playerPositions);
    } else {
      // For higher difficulties, place the enemy closer to the center of the players
      const centerX = (player1[0] + player2[0]) / 2;
      const centerY = (player1[1] + player2[1]) / 2;
      enemyPos = this.findClosestPosition(emptySpaces, [centerX, centerY]);
    }
    this.enemy = new Enemy(enemyPos[0], enemyPos[1]);
  }

  getEmptySpaces() {
    const emptySpaces = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.maze[y][x] === 0) {
          emptySpaces.push([x, y]);
        }
      }
    }
    return emptySpaces;
  }

  getRandomPosition(positions) {
    return positions[Math.floor(Math.random() * positions.length)];
  }

  removePosition(positions, pos) {
    const index = positions.findIndex(p => p[0] === pos[0] && p[1] === pos[1]);
    if (index !== -1) {
      positions.splice(index, 1);
    }
  }

  findPositionWithinRange(positions, referencePos, minDistance, maxDistance) {
    const validPositions = positions.filter(pos => {
      const distance = this.manhattanDistance(pos, referencePos);
      return distance >= minDistance && distance <= maxDistance;
    });
    return this.getRandomPosition(validPositions) || this.getRandomPosition(positions);
  }

  findFarthestPosition(positions, referencePositions) {
    let farthestPos = null;
    let maxMinDistance = -1;

    for (const pos of positions) {
      const minDistance = Math.min(...referencePositions.map(refPos => this.manhattanDistance(pos, refPos)));
      if (minDistance > maxMinDistance) {
        maxMinDistance = minDistance;
        farthestPos = pos;
      }
    }

    return farthestPos || this.getRandomPosition(positions);
  }

  findClosestPosition(positions, referencePos) {
    let closestPos = null;
    let minDistance = Infinity;

    for (const pos of positions) {
      const distance = this.manhattanDistance(pos, referencePos);
      if (distance < minDistance) {
        minDistance = distance;
        closestPos = pos;
      }
    }

    return closestPos || this.getRandomPosition(positions);
  }

  manhattanDistance(pos1, pos2) {
    return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
  }

  setDifficulty(difficulty) {
    this.difficulty = Math.max(0, Math.min(1, difficulty));
    this.moveLimit = Math.floor(30 + (1 - this.difficulty) * 30); // 30 to 60 moves based on difficulty
  }

  checkFailState() {
    return this.moves >= this.moveLimit;
  }

  movePlayer(dx, dy) {
    if (this.gameOver) return false;

    let [x, y] = this.playerPositions[this.selectedPlayer];
    let newX = x + dx;
    let newY = y + dy;

    while (this.isValidMove(newX, newY)) {
      x = newX;
      y = newY;
      newX += dx;
      newY += dy;
    }

    if (x !== this.playerPositions[this.selectedPlayer][0] || y !== this.playerPositions[this.selectedPlayer][1]) {
      this.playerPositions[this.selectedPlayer] = [x, y];
      this.moves++;

      if (this.checkFailState()) {
        this.gameOver = true;
        return false;
      }

      const enemyMoved = this.enemy.makeMove(this.maze, this.playerPositions);
      if (!enemyMoved) {
        this.gameOver = true;
        this.gameWon = true;
      }

      return true;
    }

    return false; // Player didn't move
  }

  isValidMove(x, y) {
    // Check if the move is within the maze bounds and not a wall
    if (x < 0 || x >= this.width || y < 0 || y >= this.height || this.maze[y][x] === 1) {
      return false;
    }

    // Check if the move collides with the other player
    const otherPlayerIndex = 1 - this.selectedPlayer;
    if (x === this.playerPositions[otherPlayerIndex][0] && y === this.playerPositions[otherPlayerIndex][1]) {
      return false;
    }

    // Check if the move collides with the enemy
    return !(x === this.enemy.x && y === this.enemy.y);
  }

  switchPlayer() {
    this.selectedPlayer = 1 - this.selectedPlayer;
  }

  getGameState() {
    return {
      maze: this.maze,
      playerPositions: this.playerPositions,
      enemyPosition: [this.enemy.x, this.enemy.y],
      selectedPlayer: this.selectedPlayer,
      moves: this.moves,
      moveLimit: this.moveLimit,
      gameOver: this.gameOver,
      gameWon: this.gameWon
    };
  }
}

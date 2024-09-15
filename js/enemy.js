class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getPossibleMoves(maze, playerPositions) {
    const moves = [];
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    for (let [dx, dy] of directions) {
      let newX = this.x + dx;
      let newY = this.y + dy;

      while (
        newX >= 0 && newX < maze[0].length &&
        newY >= 0 && newY < maze.length &&
        maze[newY][newX] === 0 &&
        !playerPositions.some(([px, py]) => px === newX && py === newY)
        ) {
        moves.push([newX, newY]);
        newX += dx;
        newY += dy;
      }
    }

    return moves;
  }

  move(newX, newY) {
    this.x = newX;
    this.y = newY;
  }

  makeMove(maze, playerPositions) {
    const possibleMoves = this.getPossibleMoves(maze, playerPositions);
    if (possibleMoves.length === 0) {
      return false; // No moves available, game over
    }

    // Intelligent move selection
    const bestMove = this.findBestMove(possibleMoves, maze, playerPositions);
    this.move(bestMove[0], bestMove[1]);
    return true;
  }

  findBestMove(possibleMoves, maze, playerPositions) {
    let bestMove = null;
    let maxFutureMoves = -1;

    for (const move of possibleMoves) {
      const futureMoves = this.countFutureMoves(move[0], move[1], maze, playerPositions);
      if (futureMoves > maxFutureMoves) {
        maxFutureMoves = futureMoves;
        bestMove = move;
      }
    }

    return bestMove;
  }

  countFutureMoves(x, y, maze, playerPositions) {
    const tempEnemy = new Enemy(x, y);
    return tempEnemy.getPossibleMoves(maze, playerPositions).length;
  }
}

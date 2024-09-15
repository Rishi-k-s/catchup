class MazeRenderer {
  constructor(game, canvasId) {
    this.game = game;
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.cellSize = 0;
  }

  drawMaze() {
    this.cellSize = Math.min(this.canvas.width / this.game.width, this.canvas.height / this.game.height);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw maze
    for (let y = 0; y < this.game.height; y++) {
      for (let x = 0; x < this.game.width; x++) {
        if (this.game.maze[y][x] === 1) {
          this.ctx.fillStyle = 'black';
          this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }

    // Draw players
    this.ctx.fillStyle = 'blue';
    this.game.playerPositions.forEach(([x, y]) => {
      this.ctx.beginPath();
      this.ctx.arc((x + 0.5) * this.cellSize, (y + 0.5) * this.cellSize, this.cellSize / 3, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Draw enemy
    this.ctx.fillStyle = 'red';
    this.ctx.beginPath();
    this.ctx.arc((this.game.enemy.x + 0.5) * this.cellSize, (this.game.enemy.y + 0.5) * this.cellSize, this.cellSize / 3, 0, Math.PI * 2);
    this.ctx.fill();

    // Highlight selected player
    this.ctx.strokeStyle = 'yellow';
    this.ctx.lineWidth = 3;
    const [x, y] = this.game.playerPositions[this.game.selectedPlayer];
    this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
  }

  handleKeyPress(event) {
    let moved = false;
    switch(event.key) {
      case 'ArrowUp': moved = this.game.movePlayer(0, -1); break;
      case 'ArrowDown': moved = this.game.movePlayer(0, 1); break;
      case 'ArrowLeft': moved = this.game.movePlayer(-1, 0); break;
      case 'ArrowRight': moved = this.game.movePlayer(1, 0); break;
      case ' ': this.game.switchPlayer(); moved = true; break; // Space bar to switch players
    }
    if (moved) {
      this.drawMaze();
    }
  }
}

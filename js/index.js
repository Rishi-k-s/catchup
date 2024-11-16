import DPadController from './joystick.js';

const moves = document.getElementById("moves");
const movesLeft = document.getElementById("movesLeft");
const state = document.getElementById("state");
const hardness = document.getElementById("hardness");
let game, renderer, dpadController;

function setUpGame(){
    const hardnessValue = parseFloat(hardness.value);
    const grid = hardnessValue < 0.5 ? 10 : hardnessValue > 0.8 ? 20 : 15;
    game = new MazeGame(grid, grid, hardnessValue);
    renderer = new MazeRenderer(game, 'gameCanvas');
    game.initializeGame();
    renderer.drawMaze();
}

function showGameState(){
    const { moves: movesMade, moveLimit, gameWon, gameOver } = game.getGameState();
    moves.innerText = movesMade;
    movesLeft.innerText = String(moveLimit - movesMade);
    state.innerText = gameWon ? 'Game Won' : gameOver ? 'Game Over' : 'On Going';
}

document.addEventListener('keydown', (event) => {
    renderer.handleKeyPress(event);
    showGameState();
});

hardness.addEventListener('change', () => {
    setUpGame();
    showGameState();
});

// Initialize the game and D-pad controller
setUpGame();
showGameState();
dpadController = new DPadController();
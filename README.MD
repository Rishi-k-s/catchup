# CatchUp: Strategic Maze Trapping Game

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [How to Play](#how-to-play)
- [Game Rules](#game-rules)
- [Technical Details](#technical-details)

## Introduction

CatchUp is an engaging, browser-based maze game that challenges players' strategic thinking and spatial awareness. In this unique twist on traditional maze games, players control two blue pieces with the goal of trapping a red enemy piece within the confines of a procedurally generated maze.

## Features

- **Dynamic Maze Generation**: Each game presents a new, procedurally generated maze, ensuring a fresh challenge every time.
- **Dual Player Control**: Maneuver two player pieces strategically, switching between them to outmaneuver the enemy.
- **Intelligent Enemy AI**: Face off against a smart opponent that calculates its moves to avoid entrapment.
- **Adjustable Difficulty**: Customize your gaming experience with a sliding difficulty scale, affecting maze complexity and enemy behavior.
- **Limited Moves**: Race against a move counter, adding an element of urgency to your strategic planning.

## How to Play

1. Go to the [CatchUp Game](https://rohittp.com/catchup/) website.
2. Use the arrow keys (↑, ↓, ←, →) to move the active player piece.
3. Press the spacebar to switch control between your two pieces.
4. Strategically position your pieces to cut off all escape routes for the enemy (red piece).
5. Win by trapping the enemy with no valid moves left, before running out of moves yourself.

## Game Rules

- Players control two blue pieces, while the AI controls one red piece.
- All pieces can move any number of steps in a straight line until they hit a wall or another piece.
- Players and the enemy take turns moving.
- The game ends when either:
    - The enemy has no valid moves left (Player wins)
    - The player runs out of moves (Player loses)
- The difficulty slider adjusts:
    - Maze complexity
    - Initial piece placement
    - Number of moves allowed

## Technical Details

- **Maze Generation**: Randomized Depth-First Search algorithm
- **Enemy AI**: Implements a look-ahead algorithm to maximize survival chances

---

Enjoy playing CatchUp, and may the best strategist win!

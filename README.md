### README

# Conway's Game of Life

This project is a web-based implementation of Conway's Game of Life using JavaScript for the logic and HTML Canvas and CSS for the interface. The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
The game can be played [here](https://carie21.github.io/Game-of-Life/)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Code Structure](#code-structure)


## Introduction

Conway's Game of Life is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. It consists of a grid of cells that can live, die, or multiply based on specific rules:

1. Any live cell with fewer than two live neighbors dies (underpopulation).
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies (overpopulation).
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction).

## Features

- Interactive grid for drawing the initial state
- Start, Pause, and Clear controls
- Zoom In and Zoom Out functionality
- Generation counter

## Code Structure

- `index.html`: The main HTML file containing the structure of the web page.
- `styles.css`: The CSS file for styling the web page.
- `life.js`: The JavaScript file containing the logic for the Game of Life.

### JavaScript (`life.js`)

- **Event Listeners**: Handles user interactions such as drawing on the grid, starting, stopping, clearing, and zooming.
- **drawGrid**: Renders the grid on the canvas.
- **colourCells**: Colors the live cells on the grid.
- **updateCells**: Applies the rules of the Game of Life to update the cells.
- **game**: Manages the simulation loop.


Enjoy playing with Conway's Game of Life! If you have any questions or feedback, feel free to reach out.

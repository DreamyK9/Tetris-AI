"use strict";

const STATE = {
  EMPTY: 255,
  FILLED: 0,
};

const colours = [
  "00FFFF",
  "FFFF00",
  "800080",
  "00FF00",
  "FF0000",
  "0000FF",
  "FF7F00",
  "7F7F7F",
];

class Grid {
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.pixels = {
      height: this.height * this.cellSize,
      width: this.width * this.cellSize,
    };
    this.cells = [];
    this.init();
  }

  init() {
    for (let x = 0; x < this.width; x++) {
      this.cells[x] = [];
      for (let y = 0; y < this.height; y++) {
        this.cells[x][y] = new Cell(x, y, this.cellSize);
      }
    }
  }

  draw() {
    this.drawCells();
    this.drawOutline();
  }

  drawCells() {
    strokeWeight(1);
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.cells[x][y].draw(x, y);
      }
    }
  }

  drawOutline() {
    strokeWeight(5);
    line(0, 0, 0, this.pixels.height);
    line(0, 0, this.pixels.width, 0);
    line(this.pixels.width, 0, this.pixels.width, this.pixels.height);
    line(0, this.pixels.height, this.pixels.width, this.pixels.height);
  }

  addPiece(piece) {
    // iterate through the piece's cells
    for (let row = 0; row < piece.size; row++) {
      for (let col = 0; col < piece.size; col++) {
        // if the cell is occupied, draw it
        if (piece.representation[row][col]) {
          // activate the state of the cell
          this.cells[piece.x + col][piece.y + row].state = STATE.FILLED;
        }
      }
    }
  }

  clearPiece(piece) {
    for (let row = 0; row < piece.size; row++) {
      for (let col = 0; col < piece.size; col++) {
        if (piece.representation[row][col]) {
          this.cells[piece.x + col][piece.y + row].state = STATE.EMPTY;
        }
      }
    }
  }

  isValid(piece) {
    for (let row = 0; row < piece.size; row++) {
      for (let col = 0; col < piece.size; col++) {
        if (piece.representation[row][col] != 0) {
          let gridRow = piece.y + row;
          let gridCol = piece.x + col;

          if (
            gridRow < 0 ||
            gridRow >= this.height ||
            gridCol < 0 ||
            gridCol >= this.width
          ) {
            return false;
          }

          if (this.cells[gridCol][gridRow].state == STATE.FILLED) {
            return false;
          }
        }
      }
    }

    return true;
  }

  resetGrid() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.cells[x][y].state = STATE.EMPTY;
      }
    }
  }
}

class Cell {
  constructor(x, y, size) {
    this.state = STATE.EMPTY;
    this.size = size;
    this.offset = new Vector(x * this.size, y * this.size);
  }

  draw() {
    if (this.state === STATE.FILLED) {
      fill(50);
    } else {
      fill(255);
    }
    stroke(0);
    square(this.offset.x, this.offset.y, CELL_SIZE);
  }
}

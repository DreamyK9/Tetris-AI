"use strict";
import {Vector} from "./Utils.mjs";

export const COLOR = {
    cyan: "00ffff",
    yellow: "ffff00",
    purple:"800080",
    green: "00ff00",
    red: "ff0000",
    blue: "0000ff",
    orange: "ff7f00",
    grey: "7f7f7f",
    black: "000000",
}

// representation of the game grid
export class Grid {
    constructor(p5, width, height, cellSize) {
        // p5 instance
        this.p5 = p5;

        // mathematical representation of the grid

        // width in cells
        this.width = width;

        // height in cells
        this.height = height;

        // size of cells in pixels
        this.cellSize = cellSize;

        // dimensions of the grid in pixels
        this.pixel = {
            height: this.height * this.cellSize,
            width: this.width * this.cellSize,
        };

        // array as graphical representation of the grid
        this.cells = [];
        this.init();
    }

    // initialize the cells
    init() {
        // create a new array for each row of the grid
        for (let row = 0; row < this.height; row++) {
            this.cells[row] = [];
            // and fill each row with cells
            for (let col = 0; col < this.width; col++) {
                this.cells[row][col] = new Cell(this.p5, col, row, this.cellSize);
            }
        }
    }

    // reset grid to default (remove all pieces)
    reset() {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++)
                this.cells[row][col].reset();
        }
    }

    // draw entirety of the grid - CALLED IN GAME LOOP
    draw() {
        this.drawCells();
        this.drawOutline();
    }

    // draw all cells of the grid
    drawCells() {
        // set outline thickness for cells
        this.p5.strokeWeight(1);

        // call draw() for each cell in each row
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                this.cells[row][col].draw();
            }
        }
    }

    // draw the grids border/outline
    drawOutline() {
       this.p5.strokeWeight(5);
        // left border
        this.p5.line(0, 0, 0, this.pixel.height);
        // upper border
        this.p5.line(0, 0, this.pixel.width, 0);
        // right border
        this.p5.line(this.pixel.width, 0, this.pixel.width, this.pixel.height);
        // bottom border
        this.p5.line(0, this.pixel.height, this.pixel.width, this.pixel.height);
    }

    // insert a piece into the grid, so that it's drawn
    insertPiece(piece) {
        // iterate through the piece's cells
        for (let row = 0; row < piece.size; row++) {
            for (let col = 0; col < piece.size; col++) {
                // if the cell is occupied, draw it
                if (piece.representation[row][col]) {
                    // activate the state of the cell
                    this.cells[piece.y + row][piece.x + col].fill(piece.color);
                }
            }
        }
    }

    // stop a piece from being drawn into the grid
    clearPiece(piece) {
        for (let row = 0; row < piece.size; row++) {
            for (let col = 0; col < piece.size; col++) {
                if (piece.representation[row][col]) {
                    this.cells[piece.y + row][piece.x + col].reset();
                }
            }
        }
    }

    // check for full lines and clear them
    clearFullLines() {
        // for every line in the grid
        for (let row = this.height - 1; row >= 0; row--) {
            // check if it's full
            if (this.isLineFull(row)) {
                // if yes, clear it
                this.clearLine(row);
            }
        }
    }

    // remove a line from the grid
    clearLine(n) {
        // splice the row out of the array
        this.cells.splice(n, 1);

        // create new row
        let newRow = [];
        // fill the new row with cells
        for (let x = 0; x < this.width; x++)
            newRow.push(new Cell(x, 0, this.cellSize));

        // add the new row to the top of the grid
        this.cells.unshift(newRow);
    }

    // check if a row is full
    isLineFull(row) {
        for (let col = 0; col < this.width; col++) {
            if (! this.cells[row][col].active) {
                return false;
            }
        }
        return true;
    }

    // check if a piece is in a valid position
    isValid(piece) {
        for (let row = 0; row < piece.size; row++) {
            for (let col = 0; col < piece.size; col++) {
                if (piece.representation[row][col] != 0) {
                    let gridRow = piece.y + row;
                    let gridCol = piece.x + col;

                    // check if piece is inside the grid
                    if (
                        gridRow < 0 ||
                        gridRow >= this.height ||
                        gridCol < 0 ||
                        gridCol >= this.width
                    ) {
                        return false;
                    }

                    // check if piece overlaps with another piece
                    if (this.cells[gridRow][gridCol].active) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}

// representation of the singles cells in the grid
export class Cell {
    constructor(p5, x, y, size) {
        this.p5 = p5;
        this.color = COLOR.grey;
        this.active = false;
        this.size = size;
        this.offset = new Vector(x * this.size, y * this.size);
    }

    // fill cell with a color
    fill(color) {
        this.active = true;
        this.color = color;
    }

    // reset cell to empty
    reset() {
        this.color = COLOR.grey;
        this.active = false;
    }

    draw() {
        // set fill color to color of current cell
        this.p5.fill(this.color);
        // set stroke color to black
        this.p5.stroke(0);

        // draw cell
        this.p5.square(this.offset.x, this.offset.y, this.size);
    }
}
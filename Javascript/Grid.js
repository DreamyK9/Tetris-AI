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
        // create a new array for each row of the grid
        for (let y = 0; y < this.height; y++) {
            this.cells[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.cells[y][x] = new Cell(x, y, this.cellSize);
            }
        }
    }

    draw() {
        this.drawCells();
        this.drawOutline();
    }

    drawCells() {
        strokeWeight(1);
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.cells[y][x].draw();
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
                    this.cells[piece.y + row][piece.x + col].state =
                        STATE.FILLED;
                }
            }
        }
    }

    clearPiece(piece) {
        for (let row = 0; row < piece.size; row++) {
            for (let col = 0; col < piece.size; col++) {
                if (piece.representation[row][col]) {
                    this.cells[piece.y + row][piece.x + col].state =
                        STATE.EMPTY;
                }
            }
        }
    }

    clearLines() {
        for (let y = this.height - 1; y >= 0; y--) {
            if (this.isRowFull(y)) {
                console.log("row full");
                // splice the row out of the array
                this.cells.splice(y, 1);
                // add a new row to the top of the array
                let newRow = [];
                for (let x = 0; x < this.width; x++) {
                    newRow.push(new Cell(x, 0, CELL_SIZE));
                }
                this.cells.unshift(newRow);
            }
        }
        return 1;
    }

    isRowFull(row) {
        for (let col = 0; col < this.width; col++) {
            if (this.cells[row][col].state === STATE.EMPTY) {
                return false;
            }
        }
        return true;
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

                    if (this.cells[gridRow][gridCol].state == STATE.FILLED) {
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
                this.cells[y][x].state = STATE.EMPTY;
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

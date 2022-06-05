"use strict";

const STATE = {
    EMPTY: 255,
    FILLED: 0
}

class Grid {
    constructor(width, height, cellSize) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.pixels = {
            height: this.height * this.cellSize,
            width: this.width * this.cellSize
        }
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
}
class Cell {
    constructor(x, y, size) {
        this.state = STATE.EMPTY;
        this.size = size;
        this.offset = new Vector(x * this.size, y * this.size);
    }

    draw() {
        if (this.used) {
            fill(0);
        } else {
            fill(255);
        }
        stroke(0);
        square(this.offset.x, this.offset.y, CELL_SIZE);
    }
}

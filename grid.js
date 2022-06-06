"use strict";

const COLOR = {
    Grey: () => fill(127, 127, 127),
    Cyan: () => fill(0, 255, 255),
    Yellow: () => fill(255, 255, 0),
    Purple: () => fill(128, 128, 0),
    Green: () => fill(0, 255, 0),
    Red: () => fill(255, 0, 0),
    Blue: () => fill(0, 0, 255),
    Orange: () => fill(255, 127, 0),
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
        this.color = COLOR.Grey;
        this.size = size;
        this.offset = new Vector(x * this.size, y * this.size);
    }

    draw() {
        this.color();
        stroke(0);
        square(this.offset.x, this.offset.y, this.size);
    }
}

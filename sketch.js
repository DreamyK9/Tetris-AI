"use strict";

const CELL_SIZE = 50;
const GRID = {
    WIDTH: 10,
    HEIGHT: 15,
}

let grid;
function setup() {
    grid = new Grid(GRID.WIDTH, GRID.HEIGHT, CELL_SIZE);
    createCanvas(GRID.WIDTH * CELL_SIZE, GRID.HEIGHT * CELL_SIZE);
    grid.init();
}

function draw() {
    grid.draw();
}

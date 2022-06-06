"use strict";

const CELL_SIZE = 50;
const GRID = {
    WIDTH: 10,
    HEIGHT: 10,
}

let grid, activePiece;

function setup() {
    grid = new Grid(GRID.WIDTH, GRID.HEIGHT, CELL_SIZE);
    createCanvas(GRID.WIDTH * CELL_SIZE, GRID.HEIGHT * CELL_SIZE);
    updatePiece();
    updatePiece();
}

function draw() {
    grid.draw();
}

function updatePiece() {
    if (activePiece) {
        console.log("updatePiece");
        grid.addPiece(activePiece);
    }
    
	const pieceType = random(['O', 'J', 'L', 'S', 'Z', 'T', 'I']);
    activePiece = new Piece(GRID.WIDTH/2-1, 0, pieceType);
    redraw();
}

"use strict";

const CELL_SIZE = 30;
const GRID = {
    WIDTH: 10,
    HEIGHT: 20,
};

let grid,
    activePiece,
    paused = false;

function setup() {
    grid = new Grid(GRID.WIDTH, GRID.HEIGHT, CELL_SIZE);
    console.log(grid);
    createCanvas(GRID.WIDTH * CELL_SIZE, GRID.HEIGHT * CELL_SIZE);
    updatePiece();
}

let prev = 0;
function draw() {
    //============================
    // Get time passed since last frame
    //============================

    let curr = millis();
    let delta = curr - prev;
    prev = curr;

    //============================
    // Update
    //============================

    if (!paused) activePiece.update(delta);

    if (activePiece.timeToFall()) {
        activePiece.resetBuffer();

        // clear the previous piece from the grid before drawing the new one
        grid.clearPiece(activePiece);
        activePiece.moveDown();

        if (!grid.isValid(activePiece)) {
            activePiece.moveUp();
            updatePiece();
        }
    }
    //============================
    // Draw
    //============================
    if (activePiece) grid.addPiece(activePiece);
    grid.draw();

    // clearLines doesnt work yet
    //grid.clearLines();
}

function updatePiece() {
    if (activePiece) {
        grid.addPiece(activePiece);
    }

    const pieceType = random(["O", "J", "L", "S", "Z", "T", "I"]);
    activePiece = new Piece(pieceType);

    if (!grid.isValid(activePiece)) {
        // The game is over
        noLoop();
        grid.resetGrid();
        grid.addPiece(new Piece("Gameover", 1));
        grid.draw();
        activePiece = undefined;
        return;
    }
    grid.addPiece(activePiece);
}

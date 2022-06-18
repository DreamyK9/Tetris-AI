"use strict";

const CELL_SIZE = 30;
const GRID_SIZE = {
    W: 10,
    H: 20,
};

let grid,
    activePiece,
    paused = false;

function setup() {
    grid = new Grid(GRID_SIZE.W, GRID_SIZE.H, CELL_SIZE);
    console.log(grid);
    createCanvas(GRID_SIZE.W * CELL_SIZE, GRID_SIZE.H * CELL_SIZE);
    updatePiece();
}

let prev = 0;
function draw() {
    //============================
    // Get time passed since last frame
    //============================

    let current = millis();
    let delta = current - prev;
    prev = current;

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
    if (activePiece) grid.insertPiece(activePiece);
    grid.draw();

    // clearLines doesnt work yet
    //grid.clearLines();
}

function updatePiece() {
    if (activePiece) {
        grid.insertPiece(activePiece);
    }

    const PIECE_TYPE = random(["O", "J", "L", "S", "Z", "T", "I"]);
    activePiece = new Piece(PIECE_TYPE);

    if (!grid.isValid(activePiece)) {
        // The game is over
        noLoop();
        grid.reset();
        grid.insertPiece(new Piece("Gameover", 1, 1));
        grid.draw();
        activePiece = undefined;
        return;
    }
    grid.insertPiece(activePiece);
}

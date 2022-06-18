"use strict";


const CELL_SIZE = 35;
const GRID_SIZE = {
    W: 10,
    H: 20,
};

const GAME = {
    paused: false,
    controlsLocked: false,
};

// runtime variables
let grid, activePiece;

// setup called once at the start
function setup() {
    // initialize canvas, grid and first active piece
    createCanvas(GRID_SIZE.W * CELL_SIZE, GRID_SIZE.H * CELL_SIZE);
    grid = new Grid(GRID_SIZE.W, GRID_SIZE.H, CELL_SIZE);
    activePiece = spawnPiece();
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

    // update piece position
    if (!GAME.paused) activePiece.update(delta);

    // Drop piece if timer is up
    if (activePiece.dropReady) {
        activePiece.resetBuffer();

        // clear the previous representation from the grid
        grid.clearPiece(activePiece);
        // move piece down
        activePiece.moveDown();

        // if active piece hits the ground
        if (!grid.isValid(activePiece)) {

            // move it up into valid position
            while (!grid.isValid(activePiece))
                activePiece.moveUp();
            grid.insertPiece(activePiece);

            // switch to new piece
            activePiece = spawnPiece();
        }
    }
    //============================
    // Draw
    //============================
    if (activePiece) grid.insertPiece(activePiece);
    grid.draw();

    //! clearLines doesn't work yet
    //grid.clearLines();
}

// spawn new piece at top center of grid
function spawnPiece() {

    // get random piece type
    const PIECE_TYPE = random(["O", "J", "L", "S", "Z", "T", "I"]);
    // create new piece of that type
    const PIECE = new Piece(PIECE_TYPE);

    // if there is no space for the new element
    if (!grid.isValid(PIECE)) {
        // end the game
        gameOver();
        return undefined;
    }

    // give back new piece
    return PIECE;
}

function gameOver() {
        // The game is over!

        // break out of game loop
        noLoop();

        // draw "Game Over" text
        grid.reset();
        grid.insertPiece(new Piece("Gameover", 1, 1));
        grid.draw();

        // give back no piece to control
}

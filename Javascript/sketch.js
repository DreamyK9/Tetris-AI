"use strict";
import {GAME} from "./Utils.mjs";
import {Grid} from "./Grid.mjs";
import {Piece} from "./Piece.mjs";
import {setupInput} from "./InputManager.mjs";

// control variables
const CELL_SIZE = 35;
const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

// runtime variables
let grid, activePiece, prev;

new p5((p5) => {

    // setup called once at the start
    p5.setup = function() {
        // initialize canvas, grid and first active piece
        p5.createCanvas(GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE);
        grid = new Grid(p5, GRID_WIDTH, GRID_HEIGHT, CELL_SIZE);
        activePiece = spawnPiece(p5);
        setupInput(p5, grid, activePiece);
    }

    // game loop called every frame
    p5.draw = function() {
        //============================
        // Get time passed since last frame
        //============================
        let current = p5.millis();
        let delta = current - prev;
        prev = current;
        console.log(current, delta, prev);
        if (current > 1000) p5.noLoop();
        //============================
        // Update
        //============================

        // update piece position
        if (!GAME.paused) activePiece.update(delta);
        console.log(activePiece.dropBuffer);

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
                activePiece = spawnPiece(p5);
            }
        }
        //============================
        // Draw
        //============================
        if (activePiece) grid.insertPiece(activePiece);
        grid.draw();

        //! clearLines doesn't work yet
        //grid.clearFullLines();
    }
});

// spawn new piece at top center of grid
function spawnPiece(p5) {

    // get random piece type
    const PIECE_TYPE = p5.random(["O", "J", "L", "S", "Z", "T", "I"]);
    // create new piece of that type
    const PIECE = new Piece(grid, PIECE_TYPE);

    // if there is no space for the new element
    if (!grid.isValid(PIECE)) {
        // end the game
        gameOver(p5);
        return undefined;
    }

    // give back new piece
    return PIECE;
}

function gameOver(p5) {
        // The game is over!

        // break out of game loop
        p5.noLoop();

        // draw "Game Over" text
        grid.reset();
        grid.insertPiece(new Piece("Gameover", 1, 1));
        grid.draw();
}

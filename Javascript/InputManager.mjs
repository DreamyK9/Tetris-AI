"use strict";
import { GAME, togglePause } from "./Utils.mjs";

export function setupInput(p5, grid, activePiece) {
    window.addEventListener(
        "keydown",
        function (event) {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }

            if (activePiece) grid.clearPiece(activePiece);

            switch (event.key) {
                // move left
                case "ArrowLeft":
                    if (!GAME.controlsLocked) {
                        activePiece.moveLeft();

                        if (!grid.isValid(activePiece)) {
                            activePiece.moveRight();
                        }
                    }
                    break;

                // move right
                case "ArrowRight":
                    if (!GAME.controlsLocked) {
                        activePiece.moveRight();

                        if (!grid.isValid(activePiece)) {
                            activePiece.moveLeft();
                        }
                    }
                    break;

                // move down
                case "ArrowDown":
                    if (!GAME.controlsLocked) {
                        activePiece.moveDown();
                        if (!grid.isValid(activePiece)) {
                            activePiece.moveUp();
                        } else activePiece.resetBuffer();
                    }
                    break;

                // rotate
                case "ArrowUp":
                    activePiece.rotate();

                    while (!grid.isValid(activePiece)) {
                        //TODO: need to handle rotation into ground or other pieces
                        if (activePiece.x < grid.width / 2)
                            activePiece.moveRight();
                        else activePiece.moveLeft();
                    }
                    break;

                // instant drop
                case " ": // space
                    activePiece.hardDrop();
                    spawnPiece();
                    break;

                // pause
                case "p":
                    togglePause();
                    break;

                // reset
                case "r":
                    grid.reset();
                    activePiece = spawnPiece();
                    // start game loop, in case it was stopped before
                    loop();
                    break;
            }

            // Cancel the default action to avoid it being handled twice
            event.preventDefault();
        },
        true
    );
}

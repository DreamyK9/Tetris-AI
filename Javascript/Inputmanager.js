"use strict";

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
                activePiece.moveLeft();

                if (!grid.isValid(activePiece)) {
                    activePiece.moveRight();
                }

                break;

            // move right
            case "ArrowRight":
                activePiece.moveRight();

                if (!grid.isValid(activePiece)) {
                    activePiece.moveLeft();
                }
                break;

            // move down
            case "ArrowDown":
                activePiece.moveDown();
                if (!grid.isValid(activePiece)) {
                    activePiece.moveUp();
                } else activePiece.resetBuffer();

                break;

            // rotate
            case "ArrowUp":
                activePiece.rotate();
                break;

            // instant drop
            case " ": // space
                activePiece.hardDrop();
                spawnPiece();
                break;

            // pause
            case "p":
                paused = !paused;
                updatePauseInfo();
                break;

            // reset
            case "r":
                grid.reset();
                activePiece = undefined;
                spawnPiece();
                grid.draw();
                loop();
                break;
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    },
    true
);

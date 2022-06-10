window.addEventListener(
    "keydown",
    function (event) {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        if (activePiece) grid.clearPiece(activePiece);

        switch (event.key) {
            case "ArrowLeft":
                activePiece.moveLeft();

                if (!grid.isValid(activePiece)) {
                    activePiece.moveRight();
                }

                break;

            case "ArrowRight":
                activePiece.moveRight();

                if (!grid.isValid(activePiece)) {
                    activePiece.moveLeft();
                }
                break;

            case "ArrowDown":
                activePiece.moveDown();
                if (!grid.isValid(activePiece)) {
                    activePiece.moveUp();
                } else activePiece.resetBuffer();

                break;

            //case space
            case " ":
                activePiece.hardDrop();
                updatePiece();
                break;

            case "p":
                paused = !paused;
                break;

            // key r
            case "r":
                grid.resetGrid();
                activePiece = undefined;
                updatePiece();
                grid.draw();
                loop();
                break;
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    },
    true
);

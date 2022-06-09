"use strict";

const CELL_SIZE = 50;
const GRID = {
    WIDTH: 10,
    HEIGHT: 10,
}

let grid, activePiece, paused = false;

function setup() {
    grid = new Grid(GRID.WIDTH, GRID.HEIGHT, CELL_SIZE);
    createCanvas(GRID.WIDTH * CELL_SIZE, GRID.HEIGHT * CELL_SIZE);
    updatePiece();
}

let prev = 0
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

    // clear the previous piece from the grid before drawing the new one
    
    grid.draw();
    
    if (!paused)
		activePiece.update(delta);

    if (activePiece.timeToFall()) {
        activePiece.resetBuffer();

        grid.clearPiece(activePiece);
        activePiece.moveDown();
        
        if (!grid.isValid(activePiece)) {
            console.log("collision");
            activePiece.moveUp();
            grid.addPiece(activePiece);
            updatePiece();
        }

        else {
            grid.addPiece(activePiece);
        }
    }
    
}

function updatePiece() {
    
	const pieceType = random(['O', 'J', 'L', 'S', 'Z', 'T', 'I']);
    activePiece = new Piece(GRID.WIDTH/2-1, 0, pieceType);
    grid.addPiece(activePiece);
    redraw();
}

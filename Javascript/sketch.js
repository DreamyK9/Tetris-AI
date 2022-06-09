"use strict";

const CELL_SIZE = 50;
const GRID = {
  WIDTH: 10,
  HEIGHT: 10,
};

let grid,
  activePiece,
  paused = false;

function setup() {
  grid = new Grid(GRID.WIDTH, GRID.HEIGHT, CELL_SIZE);
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

  // clear the previous piece from the grid before drawing the new one

  grid.draw();

  if (!paused) activePiece.update(delta);

  if (activePiece.timeToFall()) {
    activePiece.resetBuffer();

    grid.clearPiece(activePiece);
    activePiece.moveDown();

    if (!grid.isValid(activePiece)) {
      activePiece.moveUp();
      updatePiece();
    }

    grid.addPiece(activePiece);
  }
}

function updatePiece() {
  if (activePiece) {
    grid.addPiece(activePiece);
  }

  const pieceType = random(["O", "J", "L", "S", "Z", "T", "I"]);
  activePiece = new Piece(pieceType);

  if (!grid.isValid(activePiece)) {
    // The game is over
    console.log("game over");
    grid.resetGrid();
    grid.addPiece(new Piece("Gameover"));
    grid.draw();
    noLoop();
  }

  grid.addPiece(activePiece);
  redraw();
}

function keyPressed() {
  switch (key.toLowerCase()) {
    case "r":
      grid.resetGrid();
      activePiece = null;
      updatePiece();
      break;

    case "p":
      paused = !paused;
      break;
  }
}

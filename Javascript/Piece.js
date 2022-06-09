class Piece {
  constructor(type, x, y) {
    this.representation = pieces[type];
    this.size = this.representation.length;
    this.x = x == null ? ceil((GRID.WIDTH - this.size) / 2) : x;
    this.y = y || 0;
    this.dropInterval = 300; // in ms
    this.dropBuffer = 0; // time since last drop
  }

  update(time) {
    this.dropBuffer += time;
  }

  timeToFall() {
    return this.dropBuffer > this.dropInterval;
  }

  draw() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.representation[row][col]) {
          this.cells[col][row].draw(this.x + col, this.y + row);
        }
      }
    }
  }

  resetBuffer() {
    this.dropBuffer = 0;
  }

  moveDown() {
    this.y++;
  }
  moveRight() {
    this.x++;
  }
  moveLeft() {
    this.x--;
  }
  moveUp() {
    this.y--;
  }

  rotate() {
    // Rotate Piece
  }
}

const pieces = {
  O: [
    [1, 1],
    [1, 1],
  ],

  J: [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
  ],

  L: [
    [1, 1, 1],
    [1, 0, 0],
    [0, 0, 0],
  ],

  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],

  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],

  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],

  I: [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],

  Gameover: [
    [1, 0, 1, 0, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

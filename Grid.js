class Grid {
    constructor (rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.cellSize = 20;
        this.horizontal_offset = (width / 2) - (this.cellSize * this.columns / 2);
        this.vertical_offset = (height / 2) - (this.cellSize * this.rows / 2);

      // Tetris Grid
        this.grid = [];
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = [];

            for (let j = 0; j < this.columns; j++) {
                this.grid[i][j] = 0;
            }
        }
        
    }

    // Draws the grid in the center of the canvas
    drawGrid() {
        stroke(0); // Black border
        strokeWeight(0.75); // Border thickness

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                rect(this.vertical_offset + i * this.cellSize, this.horizontal_offset + j * this.cellSize, this.cellSize);
            }
        }

    }



  }

class Tetromino {
    constructor(position) {
        this.pos = position;
    }
}
////////////////////////

class IPiece extends Tetromino {
    constructor(position) {
        super(position);
        this.type = "I";
        this.rotation = 0;
        this.cells = [
            new Vector(0, 0),
            new Vector(1, 0),
            new Vector(2, 0),
            new Vector(3, 0)
        ];
    }
}

"use strict";

// time between piece drops
let DROP_INTERVAL = 799; // ms

const PIECE_COLORS = {
    I: COLOR.cyan,
    J: COLOR.blue,
    L: COLOR.orange,
    O: COLOR.yellow,
    S: COLOR.green,
    T: COLOR.purple,
    Z: COLOR.red,
    Gameover: COLOR.black,
};

class Piece {
    constructor(type, x, y) {
        // visual representation
        this.type = type;
        this.representation = PATTERNS[type][0];
        this.color = PIECE_COLORS[type];

        // physical properties
        this.rotation = 0;
        this.size = this.representation.length;
        this.x = x == undefined ? ceil((grid.width - this.size) / 2) : x;
        this.y = y == undefined ? 0 : y;

        // time since last drop
        this.dropBuffer = 0;
    }

    // update drop timer
    update(time) {
        this.dropBuffer += time;
    }

    // whether drop time is up
    get dropReady() {
        return this.dropBuffer > DROP_INTERVAL;
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

    hardDrop() {
        while (grid.isValid(activePiece)) {
            activePiece.moveDown();
        }
        activePiece.moveUp();
        this.dropBuffer = DROP_INTERVAL;
    }

    rotate() {
        this.rotation = (this.rotation + 1) % 4;
        this.representation = PATTERNS[this.type][this.rotation];
    }
}

const PATTERNS = {
    O: [
        [
            [1, 1],
            [1, 1],
        ],
        [
            [1, 1],
            [1, 1],
        ],
        [
            [1, 1],
            [1, 1],
        ],
        [
            [1, 1],
            [1, 1],
        ],
    ],

    J: [
        [
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 0],
        ],
        [
            [0, 0, 1],
            [0, 0, 1],
            [0, 1, 1],
        ],
        [
            [0, 0, 0],
            [1, 0, 0],
            [1, 1, 1],
        ],
        [
            [1, 1, 0],
            [1, 0, 0],
            [1, 0, 0],
        ],
    ],

    L: [
        [
            [1, 1, 1],
            [1, 0, 0],
            [0, 0, 0],
        ],
        [
            [0, 1, 1],
            [0, 0, 1],
            [0, 0, 1],
        ],
        [
            [0, 0, 0],
            [0, 0, 1],
            [1, 1, 1],
        ],
        [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 0],
        ],
    ],

    S: [
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1],
        ],
        [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0],
        ],
        [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
        ],
    ],

    Z: [
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0],
        ],
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1],
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0],
        ],
    ],

    T: [
        [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0],
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 0, 1],
        ],
        [
            [0, 0, 0],
            [0, 1, 0],
            [1, 1, 1],
        ],
        [
            [1, 0, 0],
            [1, 1, 0],
            [1, 0, 0],
        ],
    ],

    I: [
        [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],
    ],

    Gameover: [
        [
            [1, 0, 1, 0, 0, 1, 0, 1],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [1, 0, 1, 0, 0, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
    ],
};

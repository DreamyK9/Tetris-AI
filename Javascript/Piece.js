class Piece {
    constructor (x, y, type) {
        this.representation = pieces[type];
        this.size = this.representation.length;
        this.position = new Vector(x, y);
    }

    rotate() {
        // Rotate Piece
    }
}

const pieces = {

	O: [
		[1, 1],
		[1, 1]
	],


	J: [
		[1, 1, 1],
		[0, 0, 1],
		[0, 0, 0]
	],


	L: [
		[1, 1, 1],
		[1, 0, 0],
		[0, 0, 0]
	],


	S: [
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],


	Z: [
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],


	T: [
		[1, 1, 1],
		[0, 1, 0],
		[0, 0, 0]
	],


	I: [
		[1, 1, 1 ,1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	]

}
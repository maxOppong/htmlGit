
/*
  ========================================
  VARIABLES
  ========================================
*/

const NUM_OF_PEGS = 3;
const WIDTH_DIFF = 10;
const BASE_WIDTH = 25;
const DISC_HEIGHT = 6;
const DISC_GAP = 20;
const PEG_GAP = 185;
const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');

let num_of_discs = null;
let Peg;
let pegs = [];
let sortPeg;
let pegPositions = [];
let Discs;
let smallerDiscs = [];
let baseDisc;
let orderOfMovement = [];
let discsColors = [
	'#FF5252',
	'#E040FB',
	'#4483FF',
	'#69F0AE',
	'#FFAB40',
	'#FF6E40',
	'#607D8B',
	'#00E5FF',
	'#1DE9B6',
	'#C0CA33',
];
let isPaused = false;
let errors = [];

// Peg Object
Peg = {
	init: function(pos, xPos, yPos, width, height) {
		this.pos = pos;
		this.sortPeg = false;
		this.initialPeg = false;
		this.finalPeg = false;
		this.discs = [];
		this.xPos = xPos;
		this.yPos = yPos;
		this.width = width;
		this.height = height;
	},
	drawPeg: function() {
	  CTX.strokeStyle = '#000';
		CTX.strokeRect(this.xPos, this.yPos, this.width, this.height);
	}
}

// Disc Object
Disc = {
	init: function(num, xPos, yPos, width, height) {
		this.num = num;
		this.currentPeg = null;
		this.destinationPeg = null;
		this.xPos = xPos;
		this.yPos = yPos;
		this.width = width;
		this.height = height;
	},
	drawDisc: function(color) {

		CTX.fillStyle = color;
		CTX.fillRect(this.xPos, this.yPos, this.width, this.height);
	},
	move: function() {
		this.yPos -= 1;
	}
}



/*
As Oppossed To:

var baseDisc = {
	num: null,
	currentPeg: undefined,
	destinationPeg: undefined,
};
*/

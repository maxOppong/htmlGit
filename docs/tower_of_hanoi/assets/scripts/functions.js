
/*
  ========================================
  FUNCTIONS
  ========================================
*/

function createCanvas() {
	CANVAS.width = 600;
	CANVAS.height = 500;

	// draw Table
	CTX.fillStyle = '#795548';
	CTX.fillRect(50, 400, 500, 20);

	createPegs();
}

function createPegs() {
	let xPos = 100;
	const yPos = 150;
	const width = 5;
	const height = 250;
	for (let i = 0; i < NUM_OF_PEGS; i++) {
		let pos = i+1;
		pegs[i] = Object.create(Peg);
		pegs[i].init(pos, xPos, yPos, width, height);
		xPos += PEG_GAP;
	}

	// Draw Pegs
	for (let i = 0; i < NUM_OF_PEGS; i++) {
		pegs[i].drawPeg();
	}
}

function createDiscs(peg) {
	if (peg === null) {
		return console.log('Error');
	}
	num_of_discs = document.getElementById("numOfDiscs").selectedIndex + 1;
	let discWidth;
	let xPos;
	let yPos = 400;

	let i = num_of_discs;
	while (i) {
		discWidth = WIDTH_DIFF * (i-1) + BASE_WIDTH;
		xPos = calc(peg.xPos, i, discXPos);
		yPos -= DISC_GAP;
		peg.discs.unshift(Object.create(Disc));
		peg.discs[0].init(i, xPos, yPos, discWidth, DISC_HEIGHT);
		i--;
	}

	// Draw Discs
	if (peg.discs.length != 0) {
		for (let i = 0; i < peg.discs.length; i++) {
			peg.discs[i].drawDisc(discsColors[i]);
		}
	}
	return 1;
}

function setBaseDisc(peg) {
	if (peg === null) {
		return console.log('Error');
	}
	baseDisc = peg.discs[0];
	baseDisc.currentPeg = peg.pos;
	baseDisc.destinationPeg = (function IIFE() {
		for(let peg of pegs) {
			if (peg.sortPeg === true) {
				return peg.pos;
			}
		}
		console.log('Error'); debugger;
	})();
	return 1;
}

function getInitialPeg() {
	for (let peg of pegs) {
		if (peg.initialPeg === true) {
			return peg;
		}
	}
	return null;
}

function getLengthOfInitialPeg() {
	for (let peg of pegs) {
		if (peg.initialPeg) {
			return peg.discs.length;
		}
	}
	console.log('Error'); debugger;
}

function setSortPeg() {
	for (let peg of pegs) {
		if (peg.sortPeg === true) {
			peg.sortPeg = false;
		}
	}

	if (getLengthOfInitialPeg() != 0) {
		let biggestDiscNumberType = num_of_discs % 2;
		if (!biggestDiscNumberType) {
			// Even Numbers are sorted on the Final Peg
			if (!(getInitialPeg().discs[0].num % 2)) {
				for (peg of pegs) {
					if (peg.finalPeg & !peg.initialPeg) {
						peg.sortPeg = true;
						return 1;
					}
				}
			} else {
				for (peg of pegs) {
					if (!peg.finalPeg & !peg.initialPeg) {
						peg.sortPeg = true;
						return 1;
					}
				}
			}
			console.log('Error'); debugger;
		} else {
				// Odd Numbers are sorted on the Final Peg
				if (getInitialPeg().discs[0].num % 2) {
					for (peg of pegs) {
						if (peg.finalPeg & !peg.initialPeg) {
							peg.sortPeg = true;
							return 1;
						}
					}
				} else {
					for (peg of pegs) {
						if (!peg.finalPeg & !peg.initialPeg) {
							peg.sortPeg = true;
							return 1;
						}
					}
				}
				console.log('Error'); debugger;
			}
	} else {
		for (peg of pegs) {
			if (peg.finalPeg) {
				peg.sortPeg = true;
				return 1;
			}
		}
	}
	console.log('Error'); debugger;
}

function moveToNewPeg(disc) {
	newOrderOfMovement(disc);
	addDiscToNewPeg(disc);
	deleteDiscFromOldPeg(disc);
	update(disc);
	deleteDestinationPeg(disc);
}

function createSmallerDiscs() {
	for (let peg of pegs) {
		if (!peg.sortPeg && !peg.initialPeg) {
			for(let i = 0; i < peg.discs.length; i++) {
				smallerDiscs[i] = peg.discs[i];
			}
		}
	}
}


function setDestinationPeg() {
	// set biggest Disc Destination Peg
	let peg = getSortPeg();
	smallerDiscs[smallerDiscs.length - 1].destinationPeg = peg.pos;

	// set Remainder Discs Destination Peg
	for (let i = smallerDiscs.length - 2; i >= 0; i--) {
		updateDestinationPeg(smallerDiscs[i], smallerDiscs[i+1]);
	}
}

function moveDisc(disc) {
	let flag = 1;
	while (flag) {
		let lower = LowestDiscInCurrentPeg(disc);
		if (lower === disc) {
			lower = LowestDiscInDestinationPeg(disc);
			if (lower === disc) {
				moveToNewPeg(lower);
				flag = 0;
			} else {
				updateDestinationPeg(lower, disc);
				moveDisc(lower);
			}
		} else {
			updateDestinationPeg(lower, disc);
			moveDisc(lower);
		}
	}
}

function LowestDiscInCurrentPeg(disc) {
	let lower;
	let peg = getCurrentPeg(disc);
	for (let i in peg.discs) {
		if (peg.discs[i].num === disc.num) {
			lower = peg.discs[i-1];
			if (lower != undefined) {
				return lower;
			} else {
				return disc;
			}
		}
	}
}

function LowestDiscInDestinationPeg(disc) {
	let peg = getDestinationPeg(disc);
	let lengthOfPeg = peg.discs.length;
	for (let i = lengthOfPeg - 1; i >= 0; ) {
		if (peg.discs[i].num > disc.num) {
			i--;
		} else {
			return getLowerDisc(peg.discs[i].num)
		}
	}
	return disc;
}

function updateDestinationPeg(lowerDisc, higherDisc) {

	let currentPeg;
	let destinationPeg;

  let i = 0;
	for (let peg of pegs) {
		pegPositions[i] = peg.pos;
		i++;
	}

  // eliminate Disc Current Peg
	currentPeg = pegPositions.indexOf(lowerDisc.currentPeg);
	if (currentPeg !== -1 ) {
		reducePegPositions(currentPeg);
	}

  // eliminate Higher Disc Current Peg
  currentPeg = pegPositions.indexOf(higherDisc.currentPeg);
  if (currentPeg !== -1) {
    reducePegPositions(currentPeg);
  }

  // eliminate Higher Disc Destination Peg
  destinationPeg = pegPositions.indexOf(higherDisc.destinationPeg);
	if (destinationPeg !== -1) {
		reducePegPositions(destinationPeg);
	}

  // assign Destination Peg
  if (pegPositions.length == 1) {
		lowerDisc.destinationPeg = pegPositions[0];
	} else {
		console.log('Error'); debugger;
	}
}

			/*
			  ========================================
			  USER INTERACTION
			  ========================================
			*/

function setInitialPeg(pos) {
	let peg;
	//reset Initial & final pegs
	if (peg = getInitialPeg()) {
		peg.initialPeg = false;
	}

	for (let peg of pegs) {
		if (peg.pos === pos) {
			peg.initialPeg = true;
			showFinalPegOptions(peg.pos);
		}
	}
	console.log(pegs);
}

function setFinalPeg(pos) {
	for (let peg of pegs) {
		peg.finalPeg = false;
	}
	for (let peg of pegs) {
		if (!peg.initialPeg && peg.pos === pos) {
			peg.finalPeg = true;
			console.log(pegs);
			showBlockElement(document.getElementById("discsForm"));
			return 1;
		}
	}
}

function getFinalPeg() {
	for (let peg of pegs) {
		if (peg.finalPeg === true) {
			return peg;
		}
	}
	return null;
}

/*
  ========================================
  HELPER FUNCTIONS
  ========================================
*/

function newOrderOfMovement(disc) {
  orderOfMovement.push(Object.create(Disc));
  orderOfMovement[orderOfMovement.length - 1].init(disc.num, disc.xPos, disc.yPos, disc.width, disc.height);
  orderOfMovement[orderOfMovement.length - 1].currentPeg = disc.currentPeg;
  orderOfMovement[orderOfMovement.length - 1].destinationPeg = disc.destinationPeg;
  orderOfMovement[orderOfMovement.length - 1].discsCP = {
    total: getCurrentPeg(disc).discs.length - 1,
    nums: [],
  };
  orderOfMovement[orderOfMovement.length - 1].discsDP = {
    total: getDestinationPeg(disc).discs.length,
    nums: [],
  };

  for (let one of getCurrentPeg(disc).discs) {
    if (one.num != disc.num)
    orderOfMovement[orderOfMovement.length - 1].discsCP.nums.push(one.num);
  }
  for (let one of getDestinationPeg(disc).discs) {
    orderOfMovement[orderOfMovement.length - 1].discsDP.nums.push(one.num);
  }
}

function addDiscToNewPeg(disc) {
	for (let peg of pegs) {
		if (peg.pos === disc.destinationPeg) {
			peg.discs.splice(0, 0, disc);
			return 1;
		}
	}
	console.log('Error'); debugger;
}

function deleteDiscFromOldPeg(disc) {
	for (let peg of pegs) {
		if (peg.pos === disc.currentPeg) {
			peg.discs.splice(0, 1);
			return 1;
		}
	}
	console.log('Error'); debugger;
}


function update(disc) {
	for (let peg of pegs) {
		if (peg.pos === disc.destinationPeg) {
			disc.currentPeg = disc.destinationPeg;
			disc.xPos = calc(peg.xPos, disc.num, discXPos);
			if (peg.discs.length == 1) {
				disc.yPos = 380;
			} else {
				disc.yPos = 400 - (peg.discs.length * DISC_GAP);
			}
			return 1;
		}
	}
	console.log('Error'); debugger;
}

function deleteDestinationPeg(disc) {
	disc.destinationPeg = null;
	return 1;
}

function getCurrentPeg(disc) {
	for (let peg of pegs) {
		if (peg.pos === disc.currentPeg) {
			return peg;
		}
	}
	console.log('Error'); debugger;
}

function getDestinationPeg(disc) {
	for (let peg of pegs) {
		if (peg.pos === disc.destinationPeg) {
			return peg;
		}
	}
	console.log('Error'); debugger;
}

function getSortPeg() {
	for (let peg of pegs) {
		if (peg.sortPeg === true) {
			return peg;
		}
	}
	console.log('Error'); debugger;
}

function getLowerDisc(lower) {
	for (let lowerDisc of smallerDiscs) {
		if (lowerDisc.num == lower) {
			return lowerDisc;
		}
	}
	console.log('Error'); debugger;
}

function eliminateDiscCP(disc) {
	let currentPeg = pegPositions.indexOf(disc.currentPeg);
	if (currentPeg !== -1 ) {
		reducePegPositions(currentPeg);
	}
}

function eliminateHigherDiscCurrentPeg(disc) {
	let currentPeg = pegPositions.indexOf(disc.currentPeg);
	if (currentPeg !== -1) {
		reducePegPositions(currentPeg);
	}
}

function eliminateHigherDiscDestinationPeg(disc) {
	let destinationPeg = pegPositions.indexOf(disc.destinationPeg);
	if (destinationPeg !== -1) {
		reducePegPositions(destinationPeg);
	}
}

function assignDestinationPeg(disc) {
	if (pegPositions.length == 1) {
		disc.destinationPeg = pegPositions[0];
	} else {
		console.log('Error'); debugger;
	}
}

function reducePegPositions(pos) {
	pegPositions.splice(pos, 1);
}

function getPegPositions() {
	let i = 0;
	for (let peg of pegs) {
		pegPositions[i] = peg.pos;
		i++;
	}
}

function nextOccurrenceOfDisc(disc) {
	for (let i = 1; i < orderOfMovement.length; i++) {
		if (orderOfMovement[i].num == disc.num) {
			return i;
		}
	}
	return false;
}

function calc(numA, numB, callback) {
	if (typeof callback === 'function') {
		return callback(numA, numB);
	}
}

function discXPos(pegXPos, discNum) {
	return (pegXPos - WIDTH_DIFF) - (WIDTH_DIFF / 2) * (discNum - 1);
}


function checkPegState() {
	let allSet = 0;
	for (let peg of pegs) {
		if (peg.initialPeg) {
			if (!peg.finalPeg) {
				allSet++;
				console.log("initialPeg is set at Peg" + peg.pos);
			} else {
				errors.push('Initial Peg cannot be the Final Peg');
			}
		}
		if (peg.finalPeg) {
			if (!peg.initialPeg) {
				allSet++;
				console.log("finalPeg is set at Peg" + peg.pos);
			} else {
				errors.push(`Final Peg ${peg.pos} cannot be the Initial Peg ${peg.pos}`);
			}
		}
	}
	return allSet;
}

function changeState(state) {
	if(state) {
		isPaused = false;
	} else {
		isPaused = true;
	}
}




			/*
			  ========================================
			  HTML VISUAL UPDATE
			  ========================================
			*/

function showFinalPegOptions(initialPegPos) {
	if(initialPegPos == 1) {
		document.getElementById("finalPeg").innerHTML =
			`<div class="btn-group" role="group" aria-label="pegs">
				<button type="button" class="btn btn-outline-light btn-sm" onclick="setFinalPeg(2);" value="2">Two</button>
				<button type="button" class="btn btn-outline-light btn-sm" onclick="setFinalPeg(3);" value="3">Three</button>
			</div>`;
	}
	if(initialPegPos == 2) {
		document.getElementById("finalPeg").innerHTML =
			"<div class=\"btn-group\" role=\"group\" aria-label=\"pegs\">" +
				"<button type=\"button\" class=\"btn btn-outline-light btn-sm\" onclick=\"setFinalPeg(1);\" value=\"1\">One</button>"+
				"<button type=\"button\" class=\"btn btn-outline-light btn-sm\" onclick=\"setFinalPeg(3);\" value=\"3\">Three</button>" +
			"</div>";
	}
	if(initialPegPos == 3) {
		document.getElementById("finalPeg").innerHTML =
			"<div class=\"btn-group\" role=\"group\" aria-label=\"pegs\">" +
				"<button type=\"button\" class=\"btn btn-outline-light btn-sm\" onclick=\"setFinalPeg(1);\" value=\"1\">One</button>"+
				"<button type=\"button\" class=\"btn btn-outline-light btn-sm\" onclick=\"setFinalPeg(2);\" value=\"2\">Two</button>" +
			"</div>";
	}
}

function showBlockElement(e, callback) {
	e.classList.remove("hide");
	e.classList.add("show-block");
	if (typeof callback === 'function') {
		callback(e);
	}
}
function hideBlockElement(e) {
	e.classList.remove("show-block");
	e.classList.add("hide");
}
function showErrors(e) {
	for (error of errors) {
		e.firstElementChild.innerHTML =	`<li>Error: ${error}</li>`;
	}
	errors.length = 0;
}

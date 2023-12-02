const data = require('./parser');

const pickedData = data[process.argv[2]];

function drawNumber() {
	return pickedData.drawings.shift();
}

function markNumberOnBoards(num, scoreBoards) {
	pickedData.boards.forEach((board, idx) => {
		board.forEach((field) => {
			if (field.value === num) {
				field.marked = true;
				scoreBoards[idx].rows[field.x] += 1
				scoreBoards[idx].columns[field.y] += 1
			}
		})
	});
}

function checkWinner(scoreBoards) {
	let winner;
	scoreBoards.forEach((scoreBoard, idx) => {
		if (scoreBoard.rows.includes(5) || scoreBoard.columns.includes(5)) {
			winner = idx;
			return;
		}
	})
	return winner;
}

function createScoreBoards(boards) {
	const scoreBoards = boards.reduce((acc, board) => {
		const scoreBoard = {};
		scoreBoard.rows = [0, 0, 0, 0, 0];
		scoreBoard.columns = [0, 0, 0, 0, 0];
		acc.push(scoreBoard);
		return acc;
	}, []);
	return scoreBoards;
}

function playTheGame() {
	const scoreBoards = createScoreBoards(pickedData.boards);
	let winner;
	let ber;
	while(winner === undefined) {
		ber = drawNumber();
		console.log('drawing', ber);
		markNumberOnBoards(ber, scoreBoards);
		winner = checkWinner(scoreBoards);
	}
	console.log(winner);
	console.log('Final result', calculateResult(pickedData.boards[winner], ber));
}

function playTheGameUntilLast() {
	const scoreBoards = createScoreBoards(pickedData.boards);
	let winner;
	let ber;
	while(winner === undefined) {
		ber = drawNumber();
		console.log('drawing', ber);
		markNumberOnBoards(ber, scoreBoards);
		winner = checkWinner(scoreBoards);
	}
	console.log(winner);
	console.log('Final result', calculateResult(pickedData.boards[winner], ber));
}

function calculateResult(winningBoard, lastNumber) {
	const unmarkedSum = winningBoard.reduce((acc, field) => {
		if (!field.marked) {
			acc += parseInt(field.value, 10);
		}
		return acc;
	}, 0);
	console.log(`result: ${unmarkedSum} * ${lastNumber}`);
	return unmarkedSum * lastNumber;
}

console.log('asdasd', data);
playTheGame();
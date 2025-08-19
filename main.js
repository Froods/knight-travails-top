const board = makeBoard();
const queue = [];

function knightMoves(start, end) {
	/// Check for valid input
	// If input values aren't arrays
	if (!Array.isArray(start) || !Array.isArray(end)) {
		console.log('Input must be arrays!');
		return;
	}

	// If array lenth isn't 2
	if (start.length !== 2 || end.length !== 2) {
		console.log('Each array must have a length of 2!');
		return;
	}

	// If coordinates aren't valid
	if (!coordsValid(start)) {
		console.log('Coordinates has to be between 0 and 7!');
		return;
	}
	if (!coordsValid(end)) {
		console.log('Coordinates has to be between 0 and 7!');
		return;
	}

	bfs(start, end);
}

function coordsValid(coords) {
	const x = coords[0];
	const y = coords[1];

	if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
		return true;
	}
	return false;
}

function makeBoard() {
	const newBoard = [];

	// Make adjecency list for vertices
	let i = 0;
	while (i <= 7) {
		let j = 0;
		while (j <= 7) {
			const moves = moveableCoords(i, j);
			newBoard.push(moves);
			j++;
		}
		i++;
	}
	return newBoard;
}

function moveableCoords(x, y) {
	const moves = [];
	// Top right
	moves.push([x + 1, y + 2]);
	moves.push([x + 2, y + 1]);
	// Bottom right
	moves.push([x + 1, y - 2]);
	moves.push([x + 2, y - 1]);
	// Bottom left
	moves.push([x - 1, y - 2]);
	moves.push([x - 2, y - 1]);
	// Top left
	moves.push([x - 1, y + 2]);
	moves.push([x - 2, y + 1]);

	const moveableCoords = [];
	for (let move of moves) {
		if (coordsValid(move)) {
			moveableCoords.push(move);
		}
	}

	return moveableCoords;
}

function coordsToIndex(coords) {
	let x = coords[0];
	let y = coords[1];

	return y * 7 + y + x;
}

function bfs(
	curVertex,
	end,
	steps = 0,
	path = [curVertex],
	alreadyTraversed = []
) {
	if (curVertex[0] === end[0] && curVertex[1] === end[1]) {
		console.log(`You made it in ${steps} moves! Here's your path:`);
		for (let coords of path) {
			console.log(coords);
		}
		return;
	}

	let curIndex = coordsToIndex(curVertex);
	let edges = board[curIndex];
	alreadyTraversed.push(curVertex);

	for (let edge of edges) {
		let newVertex = true;
		for (let oldEdge of alreadyTraversed) {
			if (edge[0] === oldEdge[0] && edge[1] === oldEdge[1]) {
				newVertex = false;
			}
		}
		if (newVertex) {
			let newPath = [...path, edge];
			queue.push(() => bfs(edge, end, steps + 1, newPath, alreadyTraversed));
		}
	}

	if (steps > 0) queue.shift();
	queue[0]();
}

knightMoves([0, 0], [6, 7]);

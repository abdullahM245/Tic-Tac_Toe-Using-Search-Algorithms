let board = Array(9).fill(null);
let currentPlayer = 'X';
let algorithm = 'BFS';

const descriptions = {
  BFS: 'Breadth-First Search explores nodes level by level.',
  DFS: 'Depth-First Search explores as deep as possible along a branch.',
  UCS: 'Uniform-Cost Search expands the least-cost nodes first.',
  IDS: 'Iterative Deepening Search uses increasing depth limits.'
};

const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const chosenAlgorithmLabel = document.getElementById('chosen-algorithm');
const algorithmDescription = document.getElementById('algorithm-description');
const futureBoardsContainer = document.getElementById('future-boards');
const resetButton = document.getElementById('reset-button');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(event) {
  const index = parseInt(event.target.dataset.index);
  if (!board[index] && currentPlayer === 'X') {
    makeMove(index, 'X');
    if (checkWinner(board, 'X')) {
      endGame('Human wins :)');
    } else if (board.every(cell => cell !== null)) {
      endGame("Draw!");
    } else {
      currentPlayer = 'O';
      setTimeout(aiMove, 400); // Delay
    }
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].innerText = player;
}

// Ai move
function aiMove() {
  const move = searchAlgorithms[algorithm](board, 'O');
  if (move !== null) {
    makeMove(move, 'O');
    if (checkWinner(board, 'O')) {
      endGame('AI wins :)');
    } else if (board.every(cell => cell !== null)) {
      endGame("Draw!");
    } else {
      currentPlayer = 'X';
      displayFutureBoards(board, 'O'); //future moves (where to put O (AI Move))
    }
  }
}

function checkWinner(board, player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  return winningCombinations.some(combo =>
    combo.every(index => board[index] === player)
  );
}

function endGame(message) {
  statusMessage.innerText = message;
  cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function setAlgorithm(alg) {
  algorithm = alg;
  chosenAlgorithmLabel.innerText = `Chosen Search Technique: ${alg}`;
  algorithmDescription.innerText = descriptions[alg];
  resetGame();
}

// Set up event listeners
resetButton.addEventListener('click', resetGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function resetGame() {
  board.fill(null);
  cells.forEach(cell => (cell.innerText = ''));
  statusMessage.innerText = '';
  currentPlayer = 'X';
  futureBoardsContainer.innerHTML = ''; // Clear future boards
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

function displayFutureBoards(board, player) {
  futureBoardsContainer.innerHTML = ''; // Clear previous boards
  const futureMoves = getPossibleMoves(board, player);

  futureMoves.forEach(([move, newBoard]) => {
    const boardElement = createBoardElement(newBoard);
    futureBoardsContainer.appendChild(boardElement);
  });
}

function getPossibleMoves(board, player) {
  const moves = [];
  board.forEach((cell, index) => {
    if (!cell) {
      const newBoard = [...board];
      newBoard[index] = player;
      moves.push([index, newBoard]);
    }
  });
  return moves;
}

function createBoardElement(board) {
  const boardDiv = document.createElement('div');
  boardDiv.className = 'future-board';

  board.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = 'future-cell';
    cellDiv.innerText = cell || '';
    boardDiv.appendChild(cellDiv);
  });

  return boardDiv;
}

const searchAlgorithms = {
  BFS: bfs,
  DFS: dfs,
  UCS: ucs,
  IDS: ids
};

function bfs(board, player) {
  const queue = [[board, null]];
  while (queue.length > 0) {
    const [currentBoard, move] = queue.shift();
    if (checkWinner(currentBoard, player)) return move;

    getPossibleMoves(currentBoard, player).forEach(([newMove, newBoard]) => {
      if (!move) queue.push([newBoard, newMove]);
    });
  }
  return getRandomEmptyCell(board);
}

function dfs(board, player) {
  const stack = [[board, null]];
  while (stack.length > 0) {
    const [currentBoard, move] = stack.pop();
    if (checkWinner(currentBoard, player)) return move;

    getPossibleMoves(currentBoard, player).forEach(([newMove, newBoard]) => {
      if (!move) stack.push([newBoard, newMove]);
    });
  }
  return getRandomEmptyCell(board);
}

function ucs(board, player) {
  const priorityQueue = [[board, null, 0]]; // [board, move, cost]
  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a[2] - b[2]); // Sort cost
    const [currentBoard, move] = priorityQueue.shift();
    if (checkWinner(currentBoard, player)) return move;

    getPossibleMoves(currentBoard, player).forEach(([newMove, newBoard]) => {
      priorityQueue.push([newBoard, newMove, 1]); // Uniform cost
    });
  }
  return getRandomEmptyCell(board);
}

function ids(board, player) {
  const MAX_DEPTH = 50; // Set a max depth to avoid infinite loops :)
  for (let depth = 0; depth <= MAX_DEPTH; depth++) {
    const result = depthLimitedSearch(board, player, depth);
    if (result !== null) return result;
  }
  console.warn("No solution for IDS search technique"); // if the solve enter loop
  return getRandomEmptyCell(board); // Fallback if there's no solution found
}

function depthLimitedSearch(board, player, limit) {
  const stack = [[board, null, 0]]; // [board, move, depth]

  while (stack.length > 0) {
    const [currentBoard, move, depth] = stack.pop();
    if (checkWinner(currentBoard, player)) {
      console.log(`Found winning move at depth ${depth}`);
      return move;
    }
    if (depth < limit) {
      getPossibleMoves(currentBoard, player).forEach(([newMove, newBoard]) => {
        stack.push([newBoard, newMove, depth + 1]);
      });
    }
  }
  return null;
}

function getRandomEmptyCell(board) {
  const emptyCells = board
    .map((cell, index) => (cell === null ? index : null))
    .filter(index => index !== null);
  return emptyCells.length ? emptyCells[Math.floor(Math.random() * emptyCells.length)] : null;
}

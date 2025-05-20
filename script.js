let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameOver = false;
let gameMode = null;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function setMode(mode) {
  gameMode = mode;
  resetGame();
  document.getElementById("status").textContent =
    `Mode: ${mode === 'cpu' ? 'Vs Computer' : '2 Player'} | Player X's turn`;
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (isGameOver || board[index] !== "") return;

  makeMove(index, currentPlayer);
  if (checkWinner()) {
    document.getElementById("status").textContent = `Player ${currentPlayer} wins!`;
    isGameOver = true;
    return;
  }

  if (board.every(cell => cell !== "")) {
    document.getElementById("status").textContent = "It's a draw!";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("status").textContent = `Player ${currentPlayer}'s turn`;

  if (gameMode === "cpu" && currentPlayer === "O") {
    setTimeout(cpuMove, 500);
  }
}

function makeMove(index, player) {
  board[index] = player;
  document.querySelectorAll(".cell")[index].textContent = player;
}

function cpuMove() {
  // Very basic AI: first empty cell
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      makeMove(i, "O");
      break;
    }
  }

  if (checkWinner()) {
    document.getElementById("status").textContent = "Computer wins!";
    isGameOver = true;
    return;
  }

  if (board.every(cell => cell !== "")) {
    document.getElementById("status").textContent = "It's a draw!";
    isGameOver = true;
    return;
  }

  currentPlayer = "X";
  document.getElementById("status").textContent = "Player X's turn";
}

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinningCells(combo);
      return true;
    }
  }
  return false;
}

function highlightWinningCells(combo) {
  combo.forEach(index => {
    document.querySelectorAll(".cell")[index].classList.add("winning-cell");
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameOver = false;
  document.getElementById("status").textContent =
    gameMode ? `Player X's turn` : `Choose a mode to start!`;
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winning-cell");
  });
}

document.querySelectorAll(".cell").forEach(cell =>
  cell.addEventListener("click", handleCellClick)
);

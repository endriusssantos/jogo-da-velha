let board = Array(9).fill("");
const winningCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const cells = document.querySelectorAll(".cell");
const phrase = document.getElementById("phrase");
const resetBtn = document.getElementById("reset-game");
const toggleThemeBtn = document.getElementById("toggle-theme");
const scoreXDisplay = document.getElementById("score-x");
const scoreODisplay = document.getElementById("score-o");
const resetScore = document.getElementById("reset-score");

let currentPlayer = "X";
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

loadScore();
applySavedTheme();
addCellListeners();
addButtonListeners();

function winChecker() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      phrase.innerText = `Parabéns! Jogador ${board[a]} venceu! 🥳`;

      if (board[a] === "X") {
        scoreX++;
        scoreXDisplay.innerText = scoreX;
      } else {
        scoreO++;
        scoreODisplay.innerText = scoreO;
      }

      saveScore();
      return true;
    }
  }

  if (!board.includes("")) {
    phrase.innerText = "Empate! 🙁";
    return false;
  }

  return false;
}

function saveScore() {
  const score = { X: scoreX, O: scoreO };
  localStorage.setItem("score", JSON.stringify(score));
}

function loadScore() {
  const scoreSave = localStorage.getItem("score");

  if (scoreSave) {
    const score = JSON.parse(scoreSave);
    scoreX = score.X;
    scoreO = score.O;

    scoreXDisplay.innerText = scoreX;
    scoreODisplay.innerText = scoreO;
  }
}

function applySavedTheme() {
  const themeSave = localStorage.getItem("theme");

  if (themeSave === "dark") {
    document.body.classList.add("dark-mode");
    toggleThemeBtn.innerText = "☀️ Modo Claro";
  } else {
    toggleThemeBtn.innerText = "🌙 Modo Escuro";
  }
}

function resetBoard() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  phrase.innerText = "";
  cells.forEach((cell) => (cell.innerText = ""));
}

function addCellListeners() {
  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      const index = e.target.dataset.index;

      if (!gameActive || board[index] !== "") return;

      board[index] = currentPlayer;
      e.target.innerText = currentPlayer;

      const win = winChecker();

      if (win || !board.includes("")) {
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    });
  });
}

function addButtonListeners() {
  resetBtn.addEventListener("click", resetBoard);

  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleThemeBtn.innerText = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  resetScore.addEventListener("click", () => {
    scoreX = 0;
    scoreO = 0;
    scoreXDisplay.innerText = 0;
    scoreODisplay.innerText = 0;
    localStorage.removeItem("score");
  });
}

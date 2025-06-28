const boxes = document.querySelectorAll(".box");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const modeBtn = document.getElementById("modeBtn");
const body = document.body;
const gameBoard = document.getElementById("gameBoard");
const grid = document.querySelector(".grid");

let turn0 = true;
let gameActive = true;
let vsComputer = false;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

modeBtn.addEventListener("click", () => {
  vsComputer = !vsComputer;
  modeBtn.innerText = vsComputer ? "Play vs Player" : "Play vs Computer";
  body.style.backgroundColor = vsComputer ? "#001f3f" : "#004d00";
  gameBoard.style.backgroundColor = vsComputer ? "#ff6347" : "crimson";
  grid.style.backgroundColor = vsComputer ? "#003366" : "blue";
  resetGame();
});

function resetGame() {
  boxes.forEach((box) => (box.innerText = ""));
  msgContainer.classList.add("hide");
  turn0 = true;
  gameActive = true;
}

function showWinner(winner) {
  gameActive = false;
  setTimeout(() => {
    alert(`🎉 Winner is ${winner}!\nClick OK to play again.`);
    resetGame();
  }, 200);
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const valA = boxes[a].innerText;
    const valB = boxes[b].innerText;
    const valC = boxes[c].innerText;

    if (valA && valA === valB && valB === valC) {
      showWinner(valA);
      return true;
    }
  }

  const allFilled = Array.from(boxes).every((box) => box.innerText !== "");
  if (allFilled) {
    setTimeout(() => {
      alert("🤝 It's a Draw!\nClick OK to play again.");
      resetGame();
    }, 200);
    return true;
  }

  return false;
}

function makeComputerMove() {
  if (!gameActive) return;

  const emptyBoxes = Array.from(boxes).filter((box) => box.innerText === "");
  if (emptyBoxes.length === 0) return;

  const move = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  move.innerText = "0";
  turn0 = true;
  checkWinner();
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || !gameActive) return;

    if (vsComputer) {
      box.innerText = "X";
      turn0 = false;
      const won = checkWinner();

      if (!won && gameActive) {
        setTimeout(() => {
          makeComputerMove();
        }, 500);
      }
    } else {
      box.innerText = turn0 ? "0" : "X";
      turn0 = !turn0;
      checkWinner();
    }
  });
});

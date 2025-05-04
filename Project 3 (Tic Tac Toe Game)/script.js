let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".message-container");
let msg = document.querySelector("#message");
let mode = document.querySelector("#toggle");
let curMode = "dark";

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  stopMusic();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw. \n Wanna try again?`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

let winAudio = new Audio("win.mp3");

function playMusic() {
  winAudio.currentTime = 0; // Restart from beginning
  winAudio.play();
}

function stopMusic() {
  winAudio.pause();
  winAudio.currentTime = 0; // Reset position
}

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}! \n Wanna try again?`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  playMusic();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

mode.addEventListener("click", () => {
  if (curMode === "dark") {
    curMode = "light";
  } else {
    curMode = "dark";
  }
  console.log(curMode);
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

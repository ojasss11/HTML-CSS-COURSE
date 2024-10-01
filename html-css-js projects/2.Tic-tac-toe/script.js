// Select all the grid boxes (the clickable areas in the game)
let boxes = document.querySelectorAll(".box");

// Initialize the current turn to "X" and a flag to check if the game is over
let turn = "X";
let isGameOver = false;

// Loop through each box and add an event listener for clicks
boxes.forEach((e) => {
  // Clear any existing values in the box (in case of a replay)
  e.innerHTML = "";

  // Add click event to each box
  e.addEventListener("click", () => {
    // Only allow changes if the game isn't over and the box is empty
    if (!isGameOver && e.innerHTML === "") {
      // Mark the box with the current player's symbol (X or O)
      e.innerHTML = turn;

      // Check if the current move resulted in a win
      cheakWin();

      // Check if the game resulted in a draw
      cheakDraw();

      // Switch to the next player's turn
      changeTurn();
    }
  });
});

// Function to change the turn between "X" and "O"
function changeTurn() {
  if (turn === "X") {
    turn = "O"; // Change turn to "O"
    document.querySelector(".bg").style.left = "85px"; // Move turn indicator
  } else {
    turn = "X"; // Change turn to "X"
    document.querySelector(".bg").style.left = "0"; // Move turn indicator
  }
}

// Function to check if any player has won the game
function cheakWin() {
  // Define all possible win conditions (3 in a row, column, or diagonal)
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Loop through each win condition and check if any is met
  for (let i = 0; i < winConditions.length; i++) {
    let v0 = boxes[winConditions[i][0]].innerHTML;
    let v1 = boxes[winConditions[i][1]].innerHTML;
    let v2 = boxes[winConditions[i][2]].innerHTML;

    // If all three boxes are marked with the same value (X or O), declare a winner
    if (v0 != "" && v0 === v1 && v0 === v2) {
      isGameOver = true; // Game is over
      document.querySelector("#results").innerHTML = turn + " wins"; // Show result
      document.querySelector("#play-again").style.display = "inline"; // Show "Play Again" button

      // Highlight the winning combination
      for (j = 0; j < 3; j++) {
        boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
        boxes[winConditions[i][j]].style.color = "#000";
      }
    }
  }
}

// Function to check if the game ended in a draw
function cheakDraw() {
  if (!isGameOver) {
    let isDraw = true;

    // Check if all boxes are filled
    boxes.forEach((e) => {
      if (e.innerHTML === "") isDraw = false; // If any box is empty, it's not a draw
    });

    // If all boxes are filled and no winner, declare a draw
    if (isDraw) {
      isGameOver = true;
      document.querySelector("#results").innerHTML = "Draw"; // Show "Draw" result
      document.querySelector("#play-again").style.display = "inline"; // Show "Play Again" button
    }
  }
}

// Reset the game when the "Play Again" button is clicked
document.querySelector("#play-again").addEventListener("click", () => {
  isGameOver = false; // Reset game over flag
  turn = "X"; // Reset turn to "X"
  document.querySelector(".bg").style.left = "0"; // Reset turn indicator
  document.querySelector("#results").innerHTML = ""; // Clear result message
  document.querySelector("#play-again").style.display = "none"; // Hide "Play Again" button

  // Clear all boxes and reset their styles
  boxes.forEach((e) => {
    e.innerHTML = "";
    e.style.removeProperty("background-color");
    e.style.color = "#fff";
  });
});

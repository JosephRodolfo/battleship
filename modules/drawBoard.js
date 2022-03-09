export function drawBoard(rows, cols, boardNumber) {
  const gameBoardGridContainer = document.getElementById("game-board-grid-" + boardNumber.toString());
 gameBoardGridContainer.style.setProperty("--grid-rows", rows); //rows);
gameBoardGridContainer.style.setProperty("--grid-cols", cols); //cols);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = document.createElement("div");
      //        cell.id = "x" + (x) + "y" + (y);
      let cellId = "x" + x + "y" + y;
      cell.id = "x" + x + "y" + y;
      cell.innerText = cellId;
      //     cell.innerText = "b" + (c + 1) + "" + (i + 1);

      gameBoardGridContainer.appendChild(cell).className = "game-board-grid-item";
    }
  }
}

//module.exports = drawBoard;

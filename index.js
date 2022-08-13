// creating a state to store all the game data
const state = {
  gameElement: document.querySelector(".game"),
  buttonElement: document.getElementsByClassName("btn"),
  cells: Array(9).fill(null),
  symbols: ["O", "X"],
  clicks: 0,
  winningCombinations: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  gameFinished: false
};

function drawBoard() {
  state.gameElement.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    // create a cell and added the css class to it
    const cell = document.createElement("div");
    cell.classList.add("cell");

    if (state.cells[i]) {
      // does cell contain x or o? is so, this code runs
      const cellSymbol = document.createElement("p"); // para element
      cellSymbol.innerText = state.cells[i];
      cellSymbol.classList.add("symbol");
      cell.append(cellSymbol);
    } else {
      // otherwise it must be empty, so run next section
      cell.addEventListener("click", function () {
        if (state.gameFinished) {
          return;
        } else {
          // check for players turn
          state.clicks++;
          if (state.clicks % 2 === 0) {
            state.cells[i] = state.symbols[1];
          } else {
            state.cells[i] = state.symbols[0];
          }

          drawBoard();
        }

        if (checkForWinner()) {
          state.gameFinished = true;
          drawMessage(`Congratulations! ${state.cells[i]} won!`);
        }

        if (checkForDraw()) {
          drawMessage("It's a draw!");
        }
      });
    }

    // added cell to the game element
    state.gameElement.append(cell);
  }
}

function checkForDraw() {
  if (!state.cells.includes(null)) {
    return true;
  }
}

function checkForWinner() {
  // check whether any of the winning combinations match the function
  return state.winningCombinations.some(function (combo) {
    const cells = combo.map(function (index) {
      return state.cells[index];
    });
    const winningSymbol = new Set(cells);
    return !cells.includes(null) && winningSymbol.size === 1;
  });
}

function drawMessage(message) {
  const banner = document.createElement("div");
  banner.classList.add("banner");

  const h1 = document.createElement("h1");
  h1.innerText = message;

  banner.append(h1);
  state.gameElement.append(banner);
}

drawBoard();

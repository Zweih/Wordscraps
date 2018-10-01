const board = require("./pine1.json");

let word = "";
const pool = {};

$(document).ready(() => {
  for(let y = 0; y < board.y; y++) {
    const gridRow = $(`<div class="grid-row" id="${y}"></div>`);
    for(let x = 0; x < board.x; x++) {
      const className = `square${board[y][x] ? " letter" : " no-letter"}`;
      const square = $(`<div class="${className}" id="${x}"></div>`);
      square.appendTo(gridRow);
    }

    gridRow.appendTo(".board");
  }

  for(let i = 0; i < board.letters.length; i++) {  
    const letter = $(
      `<div
        class="pool-letter"
        id="${i}"
      >
        ${board.letters[i]}
      </div>`
    );

    letter.appendTo(`#${i % 3}.pool-row`).click(letterClick);
  }
});

const letterClick = (event) => {
  word += event.target.outerText;

  if(!pool[event.target.outerText]) {
    pool[event.target.outerText] = true;
    console.log(pool);
  }
}


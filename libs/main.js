const board = require("./puzzle.json");

let word = "";
let pool = {};

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

    if(i === 1 || i === 4) {
      letter.appendTo(`#${i - 1}.pool-row`).click(letterClick);
    } else {
      letter.appendTo(`#${(i % 2) + 1}.pool-row`).click(letterClick);
    }
  }

  $(".pool-button").click(tryWord);
});

const letterClick = (event) => {
  const letter = event.target.outerText;

  if(!pool[letter]) {
    pool[letter] = true;
    console.log(pool);
    word += letter;
  }
}

const tryWord = () => {
  debugger

  if(Object.keys(board.words).includes(word)){
    uncoverWord(word);
  }

  word = "";
  pool = {};
}

const uncoverWord = (word) => {
  const letterArr = word.split("");
  const posArr = board.words[word];

  for(let i = 0; i < letterArr.length; i++) {
    const square = $(`#${posArr[i][0]}.grid-row #${posArr[i][1]}.square`);
    square.html(letterArr[i]);
  } 
}
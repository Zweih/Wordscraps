const board = require("./puzzle.json");

let word = "";
const goal = JSON.parse(JSON.stringify(board.words));

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
  $(event.target).toggleClass("selected");
  $(event.target).off("click");
  const letter = event.target.outerText;
  word += letter;
  $(".current-word").text(word);
  console.log(letter);
}

const tryWord = () => {
  $(".pool-letter").off("click");
  $(".pool-button").off("click");
  console.log(word);

  if(Object.keys(board.words).includes(word)){
    uncoverWord(word);
    $(".current-word").addClass("correct");
  } else {
    $(".current-word").addClass("incorrect");
  }

  setTimeout(() => {
    reset();
  }, 1000);  
}

const reset = () => {
  word = "";
  $(".current-word").text(word);
  $(".current-word").removeClass("incorrect");
  $(".current-word").removeClass("correct");
  $(".square").removeClass("square-correct");
  $(".pool-letter").click(letterClick);
  $(".pool-button").click(tryWord);
  $(".pool-letter").removeClass("selected");
}

const uncoverWord = (word) => {
  const letterArr = word.split("");
  const posArr = board.words[word];

  for(let i = 0; i < letterArr.length; i++) {
    const square = $(`#${posArr[i][0]}.grid-row #${posArr[i][1]}.square`);
    square.addClass("square-correct square-reveal");
    square.text(letterArr[i]);
  }

  delete goal[word];

  if(Object.keys(goal).length < 1) { 
    $(".current-word").text("ROUND WIN"); 
  };
}
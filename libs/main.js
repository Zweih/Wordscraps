let board = null;
let level = 0;
const levels = 15;
let word = "";
let goal = {};
const boards = [];
const dictionary = require("./valid-dictionary/40000-dictionary.json");
let points = 0;
let alreadyDone = [];
let letterStack = [];
let time = 60;
let timer = null;

$(document).ready(() => {
  $(".backspace").click(backspace);
  $("body").keydown(specialClick);
  $("body").keypress(keyClick);
  $("input.score-submit").click(saveScore);
  startGame();
});

const saveScore = () => {
  const name = $("input.name").val() || 'noname';
  const score = points;

  firebase.database().ref().child('scores/').push({
    name,
    score,
  });
};

const shuffleBoards = (boards) => {
  for(let i = boards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [boards[i], boards[j]] = [boards[j], boards[i]];
  }
}

const startGame = () => {
  for(let i = 0; i < levels; i++) {
    boards.push(require(`./puzzles/${i}.json`));
  }

  shuffleBoards(boards);
  
  board = boards[level];
  goal = JSON.parse(JSON.stringify(board.words));
  generateBoard();

  timer = setInterval(() => {
    timeCheck();
  }, 1000);
}

const generateBoard = () => {
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
    ).click(letterClick);

    if($("body").data(board.letters[i])) {
      $("body").data(board.letters[i]).push(letter);
    } else {
      $("body").data(board.letters[i], [letter]);
    }

    if(i === 1 || i === 4) {
      letter.appendTo(`#${i - 1}.pool-row`);
    } else {
      letter.appendTo(`#${(i % 2) + 1}.pool-row`);
    }
  }

  $(".pool-button").click(tryWord);
};

const letterClick = (event) => {
  event = event || window.event;

  $(event.target).toggleClass("selected");
  $(event.target).off("click");
  const letter = event.target.innerText;
  $("body").data()[letter].pop();
  letterStack.push(event.target);
  word += letter;
  $(".current-word").text(word);
}

const keyClick = (event) => {
  event = event || window.event;

  const key = event.key.toUpperCase();
  const events = $("body").data()[key];

  if(events && events.length > 0) {
    events[events.length - 1].trigger("click");
  }
}

const specialClick = (event) => {
  event = event || window.event;
  console.log(event.keyCode);

  if(event.keyCode === 8) {
    backspace();
  } else if(event.keyCode === 13) {
    $(".pool-button").trigger("click");
  }
}

const backspace = () => {
  $(".backspace").toggleClass("down");

  if(word.length > 0) {
    const char = word[word.length - 1];
    word = word.slice(0, -1);
    $(".current-word").text(word);
    const tempLetter = letterStack.pop();
    $(tempLetter).removeClass("selected");
    $(tempLetter).click(letterClick);
    $("body").data()[char].push($(tempLetter));
  }

  setTimeout( () => {
    $(".backspace").removeClass("down");
  }, 100)
}

const tryWord = (evt) => {
  const event = evt || window.event;
  $(".pool-letter").off("click");
  $(".pool-letter").off("keypress");
  $(event.target).off("click");
  $(event.target).addClass("clicked");

  if(!alreadyDone.includes(word)) {
    if(Object.keys(board.words).includes(word)){
      uncoverWord(word);
      addPoints(word.length, 2);
      alreadyDone.push(word)
      $(".current-word").addClass("correct");
    } else if(dictionary.includes(word.toLowerCase())) {
        addPoints(word.length, 1);
        alreadyDone.push(word)
    } else {
      $(".current-word").addClass("incorrect");
    }
  } else {
    $(".current-word").addClass("used");
  }

  if(Object.keys(goal).length < 1) { 
    reset();
    roundWin();
  } else {
    setTimeout( () => {
      reset();
    }, 500)
  }
}

const reset = () => {
  word = "";
  $(".current-word").text(word);
  letterStack = [];
  $(".current-word").removeClass("incorrect");
  $(".current-word").removeClass("correct");
  $(".current-word").removeClass("used");
  $(".info div").removeClass("correct");
  $(".square").removeClass("square-correct");
  $(".pool-letter").removeClass("selected");
  $(".pool-button").removeClass("clicked")
  $(".pool-letter").click(letterClick);
  $(".pool-button").click(tryWord);
  $("body").removeData();

  $(".pool-letter").each(function() {
    const letter = this.innerText;

    if($("body").data(letter)) {
      $("body").data(letter).push($(this));
    } else {
      $("body").data(letter, [$(this)]);
    }
  });
}

const roundWin = () => {
  $(".current-word").text("ROUND WIN");
  $(".current-word").addClass("correct");
  $(".pool-letter").off("click");
  $(".pool-letter").off("keypress");
  $(".pool-button").off("click");
  level++;

  if(level < levels) {
    board = boards[level];
    goal = JSON.parse(JSON.stringify(board.words));
    alreadyDone = [];
    setTimeout(() => {
      $(".current-word").removeClass("correct");
      $(".info div").removeClass("correct");
      $(".current-word").text("");
      $(".board").empty();
      $(".pool-row").empty();
      generateBoard(level);
    }, 2000);
  } else {
    gameOver();
  }
}

const addPoints = (value, multiplier) => {
  points += 10 * value * multiplier;
  time += 5 * multiplier;
  displayTime(time);
  $(".info div").addClass("correct");
  $(".points").text(points);
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
}

const displayTime = (timeLeft) => { 
  const mins = ~~((timeLeft % 3600) / 60);
  const secs = ~~timeLeft % 60;

  let ret = "";

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  $(".time").text(ret);
}

const timeCheck = () => {
  if(time <= 0) {
    gameOver();
  } else {
    displayTime(--time);

    if(time < 30) {
      $(".time").addClass("warning");
    } else {
      $(".time").removeClass("warning");
    }
  }
}
const gameOver = () => {
  clearInterval(timer);
  points += time * 500;
  $(".pool-letter").off("click");
  $(".pool-letter").off("keypress");
  $(".pool-button").off("click");
  $("p.score").text(points);
  $("#game-over-form").modal({
    escapeClose: false,
    clickClose: false,
    showClose: false
  });
}
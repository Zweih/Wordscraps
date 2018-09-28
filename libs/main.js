// const $ = require('jquery');
// window.jQuery = $;
// window.$ = $;
const Board = require("./board").default;


$(document).ready(() => {
  const board = new Board();

  for(let y = 0; y < 10; y++) {
    const gridRow = $(`<div class="grid-row" id="${y}"></div>`);
    for(let x = 0; x < 10; x++) {
      const className = `square${board.grid[y][x] ? " letter" : " no-letter"}`;
      const square = $(`<div class="${className}" id="${x}">${board.grid[y][x] || ""}</div>`);
      square.appendTo(gridRow);
    }

    gridRow.appendTo(".board");
  }
});
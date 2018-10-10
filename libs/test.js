const boards = [];
const levels = 15;

for(let i = 0; i < levels; i++) {
  boards.push(require(`./puzzles/${i}.json`));
}

let max = 0;

for(let i = 0; i < levels; i++) {
  console.log(`board ${i}:`, boards[i]["y"]);

  if(boards[i]["y"] > max) {
    max = boards[i]["y"];
  }
}

console.log("max:", max);
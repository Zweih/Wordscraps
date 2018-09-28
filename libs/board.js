const wordPools = require("./valid-dictionary/word-pools");

class Board {
  constructor() {
    this.grid = new Array(10);
    this.letterPool = this.randLetterPool(wordPools);
    this.wordPool = wordPools[this.letterPool];

    this.letterPool = this.shufflePool(this.letterPool.split()).toString();
    this.wordPool = this.shufflePool(this.wordPool);

    for(let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(10);
    }

    console.log(this.letterPool);
    console.log(this.wordPool);

    this.grid = this.across(this.wordPool[0], [5,5], 0)
    console.log(this.grid);
  }

  // 0, 1 for right or left
  across(word, startPos, dir) {
    const dupGrid = JSON.parse(JSON.stringify(this.grid))
    let valid = this.isInBounds(word, startPos, 2 + dir);

    for(let i = 0; i < word.length && valid; i++) {
      if(!dupGrid[startPos[0]][startPos[1] + i]) {
        dupGrid[startPos[0]][startPos[1] + i] = word[i];
      } else {
        return this.grid;
      }
    }

    return dupGrid;
  }

  // 0,1,2,3 for up, down, right, or left (respectively).
  isInBounds(word, startPos, dir) {
    const start = (dir < 2) ? startPos[0] : startPos[1];
    const end = (dir % 2 === 0) ? start + word.length : start - word.length;

    return end < 10 && end > -1;
  }

  createWord(string, dir) {
    return {word: string, dir: dir, links: 0}
  }

  randLetterPool(pools) {
    const keys = Object.keys(pools);
    const randomKey = keys[keys.length * Math.random() << 0];
    return randomKey;
  }

  shufflePool(pool) {
    for(let i = 0; i < pool.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pool[i];
      pool[i] = pool[j];
      pool[j] = temp;
    }

    return pool;
  }
}

export default Board;
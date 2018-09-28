const wordPools = require("./valid-dictionary/word-pools");

class Board {
  constructor() {
    this.grid = new Array(10);
    this.letterPool = this.randLetterPool(wordPools);
    this.wordPool = wordPools[this.letterPool];
    
    this.letterPool = this.shufflePool(this.letterPool.split());
    this.wordPool = this.shufflePool(this.wordPool);

    for(let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(10);
    }
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

const board = new Board;
console.log(board.letterPool);
console.log(board.wordPool);
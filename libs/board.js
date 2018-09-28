const wordPools = require("./valid-dictionary/word-pools");

class Board {
  constructor() {
    this.grid = new Array(10);
    this.currentWords = [];
    this.posArr = [];
    this.isNextVert = false;

    this.letterPool = this.randLetterPool(wordPools);
    this.wordPool = wordPools[this.letterPool];
    this.letterPool = this.shuffleArr(this.letterPool.split()).toString();
    this.wordPool = this.shuffleArr(this.wordPool);

    for(let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(10);
      
      for(let j = 0; j < this.grid.length; j++) {
        this.grid[i][j] = [null, false];
      }
    }

    console.log(this.letterPool);
    console.log(this.wordPool);

    this.firstWord();
    this.continue();
  }

  firstWord() {
    let valid = false;
    
    for(let i = 0; i < this.wordPool.length && !valid; i++) {
      const valid = this.horz(this.wordPool[i], [5,5], 0);
    }
  }

  // 0, 1 for right or left
  horz(word, startPos, dir) {
    const dupGrid = JSON.parse(JSON.stringify(this.grid))
    const spots = [];
    let valid = this.isInBounds(word, startPos, 2 + dir);

    for(let i = 0; i < word.length && valid; i++) {
      if(!dupGrid[startPos[0]][startPos[1] + i][0] || dupGrid[startPos[0]][startPos[1] + i][0] === word[i]) {
        dupGrid[startPos[0]][startPos[1] + i][0] = word[i];
        spots.push([startPos[0] ,startPos[1] + i]);
      } else {
        valid = false;
      }
    }

    if(!valid) {
      return false;
    }

    this.isNextVert = true;

    this.grid = dupGrid;
    this.posArr = this.posArr.concat(spots);
    this.wordPool.splice(this.wordPool.indexOf(word), 1);
    this.currentWords.push(word);

    return true;
  }

  // 0, 1 for down or up
  vert(word, startPos, dir) {
    const dupGrid = JSON.parse(JSON.stringify(this.grid))
    const spots = [];
    let valid = this.isInBounds(word, startPos, dir);

    for(let i = 0; i < word.length && valid; i++) {
      if(!dupGrid[startPos[0] + i][startPos[1]][0]
      || dupGrid[startPos[0] + i][startPos[1]][0] === word[i]) {
        dupGrid[startPos[0] + i][startPos[1]][0] = word[i];
        spots.push([startPos[0] + i],startPos[1]);
      } else {
        valid = false;
      }
    }

    if(!valid) {
      return false;
    }

    this.isNextVert = false;

    this.grid = dupGrid;
    this.posArr = this.posArr.concat(spots);
    this.wordPool.splice(this.wordPool.indexOf(word), 1);
    this.currentWords.push(word);

    return true;
  }

  continue() {
    let valid = false;

    while(!valid) {
      const data = this.nextWord();

      if(this.isNextVert) {
        valid = this.vert(data[0], data[1], 0);
      } else {
        valid = this.horz(data[0], data[1], 0);
      }
    }
  }

  nextWord() {
    let valid = false;
    let pos;
    let word;

    while(!valid) {
      word = this.wordPool[Math.floor(Math.random() * this.wordPool.length)];

      for(let i = 0; i < this.posArr.length && !valid; i++) {
        const letter = this.grid[this.posArr[i][0]][this.posArr[i][1]][0]
        pos = this.posArr[i];

        valid = letter === word[0];
        // if(letter === word[0]) {
        //   const rand = Math.floor(Math.random() * 2);

        //   if(this.isNextVert) {
        //     valid = this.vert(word, pos, rand);
        //   } else {
        //     valid = this.horz(this.wordPool[0], pos, 2 + rand);
        //   }
        // }
      }
    }

    return [word, pos];
  }

  // 0,1,2,3 for down, up, right, or left (respectively).
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

  shuffleArr(arr) {
    for(let i = 0; i < arr.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  }
}

export default Board;
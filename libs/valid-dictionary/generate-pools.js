const allWords = require("./words.json");
const fs = require("fs");

const validWords = {};
const subPools = {};

for(let i = 0; i < allWords.length; i++) {
  currentWord = allWords[i].toString();

  if(currentWord.length > 2 && currentWord.length < 7) {
    let alphaKey = currentWord.split("").sort().join("");
    
    if(validWords[alphaKey]) {
      validWords[alphaKey].push(currentWord);
    } else {
      validWords[alphaKey] = [currentWord];
    }

    if(currentWord.length === 6) {
      subPools[alphaKey] = []; 
    }
  }
}

const validKeys = Object.keys(validWords);
const poolKeys = Object.keys(subPools);

for(let i = 0; i < validKeys.length; i++) {
  for(let j = 0; j < poolKeys.length; j++) {
    if(poolKeys[j].includes(validKeys[i])) {
      subPools[poolKeys[j]] = subPools[poolKeys[j]].concat(validWords[validKeys[i]]);
    }
  }
}

const letterPools = {};

for(let i = 0; i < poolKeys.length; i++) {
  if(subPools[poolKeys[i]].length > 5) {
    letterPools[poolKeys[i]] = subPools[poolKeys[i]];
  }
}

const content = JSON.stringify(letterPools);
console.log(Object.keys(letterPools).length);

fs.writeFile("./letter-pools.json", content, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 


const allWords = require("./words.json");
const fs = require("fs");

const validWords = {};
const letterPools = {};

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
      letterPools[alphaKey] = []; 
    }
  }
}

const validKeys = Object.keys(validWords);
const poolKeys = Object.keys(letterPools);

for(let i = 0; i < validKeys.length; i++) {
  for(let j = 0; j < poolKeys.length; j++) {
    if(poolKeys[j].includes(validKeys[i])) {
      letterPools[poolKeys[j]] = letterPools[poolKeys[j]].concat(validWords[validKeys[i]]);
    }
  }
}

const content = JSON.stringify(letterPools);

fs.writeFile("./letter-pools.json", content, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 


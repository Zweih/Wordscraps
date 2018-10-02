const allWords = require("./other-words");
const fs = require("fs");

const validWords = {};
const subPools = [];


for(let i = 0; i < Object.keys(allWords).length - 2; i++) {
  const currentWord = allWords[i];
  console.log(i, allWords[i]);

  if(currentWord.length > 2 && currentWord.length < 7) {
    subPools.push(currentWord.toUpperCase());
  }
}



// for(let i = 0; i < Object.keys(allWords).length - 2; i++) {
//   const currentWord = allWords[i];
//   console.log(i, allWords[i]);

//   if(currentWord.length > 2 && currentWord.length < 7) {
//     let alphaKey = currentWord.split("").sort().join("");
    
//     if(validWords[alphaKey]) {
//       validWords[alphaKey].push(currentWord);
//     } else {
//       validWords[alphaKey] = [currentWord];
//     }

//     if(currentWord.length === 6) {
//       subPools[alphaKey] = [];
//     }
//   }
// }

// const validKeys = Object.keys(validWords);
// const poolKeys = Object.keys(subPools);

// for(let i = 0; i < validKeys.length; i++) {
//   for(let j = 0; j < poolKeys.length; j++) {
//     if(poolKeys[j].includes(validKeys[i])) {
//       subPools[poolKeys[j]] = subPools[poolKeys[j]].concat(validWords[validKeys[i]]);
//     }
//   }
// }

// const wordPools = {};

// for(let i = 0; i < poolKeys.length; i++) {
//   if(subPools[poolKeys[i]].length > 5) {
//     wordPools[poolKeys[i]] = subPools[poolKeys[i]];
//   }
// }

const content = JSON.stringify(subPools);
console.log(Object.keys(subPools).length);

fs.writeFile("./valid-words.json", content, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 


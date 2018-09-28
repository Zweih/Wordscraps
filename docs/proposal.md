# Proposal

### Background

The game is essentially a crossword puzzle, but instead of hints you get a pool of letters. You can only use each letter once per word. Words are matched against an predetermined dictionary. 

### Functionality & MVP 

In Wordscraps the user will be able to:

- [ ] Guess words by dragging the mouse across each letter in the pool
- [ ] Play against a timer
- [ ] Restart the game
- [ ] Get a high score

In addition, this project will include:

- [ ] A modal that gives a quick rundown of rules
- [ ] A production README

### Architecture and Technologies

- JavaScript for game logic
- Browserfy to bundle JS files
- Canvas for mouse dragging and selecting words
- AWS for storing high scores

The scripts includes will be:

- `board.js` to display a board and manipulate the words columns and rows
- `word.js` to handle word logic 
- `dictionary.js` to generate boards from a predetermined dictionary

### Wireframe

![wireframe](https://raw.githubusercontent.com/Zweih/wordscraps/master/docs/wireframe.png)

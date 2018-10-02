/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./libs/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./libs/main.js":
/*!**********************!*\
  !*** ./libs/main.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let board = null;\nlet level = 0;\nconst levels = 10\nlet word = \"\";\nlet goal = {};\nconst boards = [];\n\n$(document).ready(() => {\n  for(let i = level; i < levels; i++) {\n    boards.push(__webpack_require__(\"./libs/puzzles sync recursive ^\\\\.\\\\/.*\\\\.json$\")(`./${i}.json`));\n  }\n\n  board = boards[level];\n  goal = JSON.parse(JSON.stringify(board.words));\n  generateBoard(level);\n});\n\nconst generateBoard = (levelNum) => {\n  for(let y = 0; y < board.y; y++) {\n    const gridRow = $(`<div class=\"grid-row\" id=\"${y}\"></div>`);\n    for(let x = 0; x < board.x; x++) {\n      const className = `square${board[y][x] ? \" letter\" : \" no-letter\"}`;\n      const square = $(`<div class=\"${className}\" id=\"${x}\"></div>`);\n      square.appendTo(gridRow);\n    }\n\n    gridRow.appendTo(\".board\");\n  }\n\n  for(let i = 0; i < board.letters.length; i++) {  \n    const letter = $(\n      `<div\n        class=\"pool-letter\"\n        id=\"${i}\"\n      >\n        ${board.letters[i]}\n      </div>`\n    ); \n\n    if(i === 1 || i === 4) {\n      letter.appendTo(`#${i - 1}.pool-row`).click(letterClick);\n    } else {\n      letter.appendTo(`#${(i % 2) + 1}.pool-row`).click(letterClick);\n    }\n  }\n\n  $(\".pool-button\").click(tryWord);\n};\n\nconst letterClick = (event) => {\n  event = event || window.event;\n  $(event.target).toggleClass(\"selected\");\n  $(event.target).off(\"click\");\n  const letter = event.target.innerText;\n  word += letter;\n  $(\".current-word\").text(word);\n  console.log(letter);\n}\n\nconst tryWord = (evt) => {\n  const event = evt || window.event;\n  $(\".pool-letter\").off(\"click\");\n  $(event.target).off(\"click\");\n  console.log(word);\n\n  if(Object.keys(board.words).includes(word)){\n    uncoverWord(word);\n    $(\".current-word\").addClass(\"correct\");\n  } else {\n    $(\".current-word\").addClass(\"incorrect\");\n  }\n\n  if(Object.keys(goal).length < 1) { \n    reset();\n    roundWin();\n  } else {\n    setTimeout( () => {\n      reset();\n    }, 500)\n  }\n}\n\nconst reset = () => {\n  word = \"\";\n  $(\".current-word\").text(word);\n  $(\".current-word\").removeClass(\"incorrect\");\n  $(\".current-word\").removeClass(\"correct\");\n  $(\".square\").removeClass(\"square-correct\");\n  $(\".pool-letter\").click(letterClick);\n  $(\".pool-button\").click(tryWord);\n  $(\".pool-letter\").removeClass(\"selected\");\n}\n\nconst roundWin = () => {\n  $(\".current-word\").text(\"ROUND WIN\");\n  $(\".current-word\").addClass(\"correct\");\n  $(\".pool-letter\").off(\"click\");\n  $(\".pool-button\").off(\"click\");\n  board = boards[++level];\n  goal = JSON.parse(JSON.stringify(board.words));\n\n  setTimeout(() => {\n    $(\".current-word\").removeClass(\"correct\");\n    $(\".current-word\").text(\"\");\n    $(\".board\").empty();\n    $(\".pool-row\").empty();\n    generateBoard(level);\n  }, 2000);\n}\n\nconst uncoverWord = (word) => {\n  const letterArr = word.split(\"\");\n  const posArr = board.words[word];\n\n  for(let i = 0; i < letterArr.length; i++) {\n    const square = $(`#${posArr[i][0]}.grid-row #${posArr[i][1]}.square`);\n    square.addClass(\"square-correct square-reveal\");\n    square.text(letterArr[i]);\n  }\n\n  delete goal[word];\n}\n\n//# sourceURL=webpack:///./libs/main.js?");

/***/ }),

/***/ "./libs/puzzles sync recursive ^\\.\\/.*\\.json$":
/*!******************************************!*\
  !*** ./libs/puzzles sync ^\.\/.*\.json$ ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./0.json\": \"./libs/puzzles/0.json\",\n\t\"./1.json\": \"./libs/puzzles/1.json\",\n\t\"./2.json\": \"./libs/puzzles/2.json\",\n\t\"./3.json\": \"./libs/puzzles/3.json\",\n\t\"./4.json\": \"./libs/puzzles/4.json\",\n\t\"./5.json\": \"./libs/puzzles/5.json\",\n\t\"./6.json\": \"./libs/puzzles/6.json\",\n\t\"./7.json\": \"./libs/puzzles/7.json\",\n\t\"./8.json\": \"./libs/puzzles/8.json\",\n\t\"./9.json\": \"./libs/puzzles/9.json\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tvar id = map[req];\n\tif(!(id + 1)) { // check for number or string\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn id;\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./libs/puzzles sync recursive ^\\\\.\\\\/.*\\\\.json$\";\n\n//# sourceURL=webpack:///./libs/puzzles_sync_^\\.\\/.*\\.json$?");

/***/ }),

/***/ "./libs/puzzles/0.json":
/*!*****************************!*\
  !*** ./libs/puzzles/0.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, y, x, words, letters, pool, default */
/***/ (function(module) {

eval("module.exports = {\"0\":{\"4\":\"T\"},\"1\":{\"3\":\"T\",\"4\":\"R\",\"5\":\"U\",\"6\":\"E\",\"7\":\"S\",\"8\":\"T\"},\"2\":{\"2\":\"T\",\"4\":\"U\"},\"3\":{\"2\":\"R\",\"3\":\"U\",\"4\":\"S\",\"5\":\"E\",\"9\":\"S\"},\"4\":{\"2\":\"U\",\"4\":\"T\",\"7\":\"S\",\"8\":\"U\",\"9\":\"E\"},\"5\":{\"0\":\"U\",\"1\":\"S\",\"2\":\"E\",\"3\":\"R\",\"5\":\"R\",\"6\":\"U\",\"7\":\"T\",\"9\":\"T\"},\"6\":{\"1\":\"U\",\"3\":\"U\",\"4\":\"S\",\"5\":\"E\",\"7\":\"R\"},\"7\":{\"1\":\"R\",\"3\":\"S\",\"5\":\"S\",\"7\":\"U\"},\"8\":{\"0\":\"T\",\"1\":\"E\",\"2\":\"S\",\"3\":\"T\",\"5\":\"T\",\"7\":\"T\"},\"y\":9,\"x\":10,\"words\":{\"SURE\":[[5,1],[6,1],[7,1],[8,1]],\"TRUE\":[[2,2],[3,2],[4,2],[5,2]],\"RUST\":[[5,3],[6,3],[7,3],[8,3]],\"TRUST\":[[0,4],[1,4],[2,4],[3,4],[4,4]],\"REST\":[[5,5],[6,5],[7,5],[8,5]],\"STRUT\":[[4,7],[5,7],[6,7],[7,7],[8,7]],\"SET\":[[3,9],[4,9],[5,9]],\"TRUEST\":[[1,3],[1,4],[1,5],[1,6],[1,7],[1,8]],\"RUSE\":[[3,2],[3,3],[3,4],[3,5]],\"SUE\":[[4,7],[4,8],[4,9]],\"USER\":[[5,0],[5,1],[5,2],[5,3]],\"RUT\":[[5,5],[5,6],[5,7]],\"USE\":[[6,3],[6,4],[6,5]],\"TEST\":[[8,0],[8,1],[8,2],[8,3]]},\"letters\":[\"E\",\"U\",\"T\",\"R\",\"S\",\"T\"],\"pool\":{\"E\":{\"max\":1,\"current\":0},\"U\":{\"max\":1,\"current\":0},\"T\":{\"max\":2,\"current\":0},\"R\":{\"max\":1,\"current\":0},\"S\":{\"max\":1,\"current\":0}}};\n\n//# sourceURL=webpack:///./libs/puzzles/0.json?");

/***/ }),

/***/ "./libs/puzzles/1.json":
/*!*****************************!*\
  !*** ./libs/puzzles/1.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, y, x, words, letters, pool, default */
/***/ (function(module) {

eval("module.exports = {\"0\":{\"0\":\"T\",\"1\":\"I\",\"2\":\"N\",\"3\":\"N\",\"4\":\"Y\",\"6\":\"N\"},\"1\":{\"0\":\"I\",\"2\":\"I\",\"4\":\"E\",\"6\":\"I\"},\"2\":{\"0\":\"E\",\"2\":\"N\",\"4\":\"T\",\"5\":\"I\",\"6\":\"N\"},\"3\":{\"1\":\"Y\",\"2\":\"E\",\"3\":\"N\",\"6\":\"E\"},\"4\":{\"3\":\"I\",\"6\":\"T\"},\"5\":{\"3\":\"T\",\"4\":\"I\",\"5\":\"N\",\"6\":\"Y\"},\"y\":6,\"x\":7,\"words\":{\"TIE\":[[0,0],[1,0],[2,0]],\"NINE\":[[0,2],[1,2],[2,2],[3,2]],\"NIT\":[[3,3],[4,3],[5,3]],\"YET\":[[0,4],[1,4],[2,4]],\"NINETY\":[[0,6],[1,6],[2,6],[3,6],[4,6],[5,6]],\"TINNY\":[[0,0],[0,1],[0,2],[0,3],[0,4]],\"TIN\":[[2,4],[2,5],[2,6]],\"YEN\":[[3,1],[3,2],[3,3]],\"TINY\":[[5,3],[5,4],[5,5],[5,6]]},\"letters\":[\"I\",\"E\",\"N\",\"Y\",\"N\",\"T\"],\"pool\":{\"I\":{\"max\":1,\"current\":0},\"E\":{\"max\":1,\"current\":0},\"N\":{\"max\":2,\"current\":0},\"Y\":{\"max\":1,\"current\":0},\"T\":{\"max\":1,\"current\":0}}};\n\n//# sourceURL=webpack:///./libs/puzzles/1.json?");

/***/ }),

/***/ "./libs/puzzles/2.json":
/*!*****************************!*\
  !*** ./libs/puzzles/2.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, y, x, words, letters, pool, default */
/***/ (function(module) {

eval("module.exports = {\"0\":{\"8\":\"L\"},\"1\":{\"8\":\"I\",\"11\":\"S\"},\"2\":{\"5\":\"S\",\"6\":\"L\",\"7\":\"I\",\"8\":\"N\",\"9\":\"G\",\"11\":\"I\"},\"3\":{\"3\":\"L\",\"5\":\"I\",\"8\":\"E\",\"11\":\"N\"},\"4\":{\"2\":\"S\",\"3\":\"I\",\"4\":\"G\",\"5\":\"N\",\"8\":\"S\",\"9\":\"I\",\"10\":\"N\",\"11\":\"G\",\"12\":\"E\"},\"5\":{\"3\":\"E\",\"5\":\"G\",\"9\":\"S\",\"11\":\"L\"},\"6\":{\"0\":\"L\",\"1\":\"E\",\"2\":\"G\",\"3\":\"S\",\"7\":\"L\",\"9\":\"L\",\"10\":\"I\",\"11\":\"E\",\"12\":\"N\",\"13\":\"S\"},\"7\":{\"2\":\"E\",\"5\":\"G\",\"7\":\"E\",\"9\":\"E\"},\"8\":{\"2\":\"L\",\"5\":\"L\",\"6\":\"I\",\"7\":\"N\",\"8\":\"E\"},\"9\":{\"2\":\"S\",\"3\":\"I\",\"4\":\"N\",\"5\":\"E\",\"7\":\"S\"},\"10\":{\"5\":\"N\"},\"y\":11,\"x\":14,\"words\":{\"GELS\":[[6,2],[7,2],[8,2],[9,2]],\"LIES\":[[3,3],[4,3],[5,3],[6,3]],\"SING\":[[2,5],[3,5],[4,5],[5,5]],\"GLEN\":[[7,5],[8,5],[9,5],[10,5]],\"LENS\":[[6,7],[7,7],[8,7],[9,7]],\"LINES\":[[0,8],[1,8],[2,8],[3,8],[4,8]],\"ISLE\":[[4,9],[5,9],[6,9],[7,9]],\"SINGLE\":[[1,11],[2,11],[3,11],[4,11],[5,11],[6,11]],\"SLING\":[[2,5],[2,6],[2,7],[2,8],[2,9]],\"SIGN\":[[4,2],[4,3],[4,4],[4,5]],\"SINGE\":[[4,8],[4,9],[4,10],[4,11],[4,12]],\"LEGS\":[[6,0],[6,1],[6,2],[6,3]],\"LIENS\":[[6,9],[6,10],[6,11],[6,12],[6,13]],\"LINE\":[[8,5],[8,6],[8,7],[8,8]],\"SINE\":[[9,2],[9,3],[9,4],[9,5]]},\"letters\":[\"E\",\"L\",\"G\",\"I\",\"N\",\"S\"],\"pool\":{\"E\":{\"max\":1,\"current\":0},\"L\":{\"max\":1,\"current\":0},\"G\":{\"max\":1,\"current\":0},\"I\":{\"max\":1,\"current\":0},\"N\":{\"max\":1,\"current\":0},\"S\":{\"max\":1,\"current\":0}}};\n\n//# sourceURL=webpack:///./libs/puzzles/2.json?");

/***/ }),

/***/ "./libs/puzzles/3.json":
/*!*****************************!*\
  !*** ./libs/puzzles/3.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, y, x, words, letters, pool, default */
/***/ (function(module) {

eval("module.exports = {\"0\":{\"3\":\"G\"},\"1\":{\"3\":\"R\",\"7\":\"R\"},\"2\":{\"3\":\"I\",\"7\":\"I\"},\"3\":{\"3\":\"L\",\"4\":\"E\",\"5\":\"G\",\"7\":\"L\"},\"4\":{\"0\":\"G\",\"1\":\"I\",\"2\":\"R\",\"3\":\"L\",\"5\":\"I\",\"6\":\"R\",\"7\":\"E\"},\"5\":{\"2\":\"I\",\"5\":\"L\"},\"6\":{\"2\":\"G\",\"3\":\"R\",\"4\":\"I\",\"5\":\"L\",\"6\":\"L\",\"7\":\"E\"},\"y\":7,\"x\":8,\"words\":{\"RIG\":[[4,2],[5,2],[6,2]],\"GRILL\":[[0,3],[1,3],[2,3],[3,3],[4,3]],\"GILL\":[[3,5],[4,5],[5,5],[6,5]],\"RILE\":[[1,7],[2,7],[3,7],[4,7]],\"LEG\":[[3,3],[3,4],[3,5]],\"GIRL\":[[4,0],[4,1],[4,2],[4,3]],\"IRE\":[[4,5],[4,6],[4,7]],\"GRILLE\":[[6,2],[6,3],[6,4],[6,5],[6,6],[6,7]]},\"letters\":[\"E\",\"L\",\"G\",\"L\",\"I\",\"R\"],\"pool\":{\"E\":{\"max\":1,\"current\":0},\"L\":{\"max\":2,\"current\":0},\"G\":{\"max\":1,\"current\":0},\"I\":{\"max\":1,\"current\":0},\"R\":{\"max\":1,\"current\":0}}};\n\n//# sourceURL=webpack:///./libs/puzzles/3.json?");

/***/ }),

/***/ "./libs/puzzles/4.json":
/*!*****************************!*\
  !*** ./libs/puzzles/4.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, y, x, words, letters, pool, default */
/***/ (function(module) {

eval("module.exports = {\"0\":{\"2\":\"M\",\"3\":\"O\",\"4\":\"B\",\"5\":\"I\",\"6\":\"L\",\"7\":\"E\"},\"1\":{\"0\":\"L\",\"2\":\"I\",\"4\":\"I\",\"6\":\"I\"},\"2\":{\"0\":\"O\",\"1\":\"I\",\"2\":\"L\",\"4\":\"L\",\"5\":\"I\",\"6\":\"M\",\"7\":\"B\",\"8\":\"O\"},\"3\":{\"0\":\"B\",\"4\":\"E\",\"6\":\"O\"},\"4\":{\"0\":\"E\",\"1\":\"L\",\"2\":\"M\",\"8\":\"L\"},\"5\":{\"1\":\"O\",\"3\":\"M\",\"4\":\"I\",\"5\":\"L\",\"6\":\"E\",\"8\":\"I\"},\"6\":{\"1\":\"B\",\"2\":\"I\",\"3\":\"O\",\"5\":\"I\",\"8\":\"M\"},\"7\":{\"3\":\"B\",\"5\":\"M\",\"8\":\"E\"},\"8\":{\"5\":\"B\"},\"y\":9,\"x\":9,\"words\":{\"LOBE\":[[1,0],[2,0],[3,0],[4,0]],\"LOB\":[[4,1],[5,1],[6,1]],\"MIL\":[[0,2],[1,2],[2,2]],\"MOB\":[[5,3],[6,3],[7,3]],\"BILE\":[[0,4],[1,4],[2,4],[3,4]],\"LIMB\":[[5,5],[6,5],[7,5],[8,5]],\"LIMO\":[[0,6],[1,6],[2,6],[3,6]],\"LIME\":[[4,8],[5,8],[6,8],[7,8]],\"MOBILE\":[[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]],\"OIL\":[[2,0],[2,1],[2,2]],\"LIMBO\":[[2,4],[2,5],[2,6],[2,7],[2,8]],\"ELM\":[[4,0],[4,1],[4,2]],\"MILE\":[[5,3],[5,4],[5,5],[5,6]],\"BIO\":[[6,1],[6,2],[6,3]]},\"letters\":[\"B\",\"M\",\"I\",\"O\",\"L\",\"E\"],\"pool\":{\"B\":{\"max\":1,\"current\":0},\"M\":{\"max\":1,\"current\":0},\"I\":{\"max\":1,\"current\":0},\"O\":{\"max\":1,\"current\":0},\"L\":{\"max\":1,\"current\":0},\"E\":{\"max\":1,\"current\":0}}};\n\n//# sourceURL=webpack:///./libs/puzzles/4.json?");

/***/ }),

/***/ "./libs/puzzles/5.json":
/*!*****************************!*\
  !*** ./libs/puzzles/5.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, y, x, words, letters, pool, default */
/***/ (function(module) {

eval("module.exports = {\"0\":{\"3\":\"S\",\"4\":\"E\",\"5\":\"E\",\"6\":\"D\"},\"1\":{\"0\":\"D\",\"4\":\"D\",\"6\":\"I\"},\"2\":{\"0\":\"E\",\"2\":\"S\",\"3\":\"I\",\"4\":\"D\",\"5\":\"E\",\"6\":\"D\"},\"3\":{\"0\":\"E\",\"2\":\"I\",\"4\":\"I\"},\"4\":{\"0\":\"D\",\"2\":\"D\",\"3\":\"I\",\"4\":\"E\",\"5\":\"D\"},\"5\":{\"0\":\"S\",\"1\":\"E\",\"2\":\"E\",\"4\":\"S\"},\"y\":6,\"x\":7,\"words\":{\"DEEDS\":[[1,0],[2,0],[3,0],[4,0],[5,0]],\"SIDE\":[[2,2],[3,2],[4,2],[5,2]],\"EDDIES\":[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4]],\"DID\":[[0,6],[1,6],[2,6]],\"SEED\":[[0,3],[0,4],[0,5],[0,6]],\"SIDED\":[[2,2],[2,3],[2,4],[2,5],[2,6]],\"DIED\":[[4,2],[4,3],[4,4],[4,5]],\"SEE\":[[5,0],[5,1],[5,2]]},\"letters\":[\"E\",\"D\",\"E\",\"S\",\"I\",\"D\"],\"pool\":{\"E\":{\"max\":2,\"current\":0},\"D\":{\"max\":2,\"current\":0},\"S\":{\"max\":1,\"current\":0},\"I\":{\"max\":1,\"current\":0}}};\n\n//# sourceURL=webpack:///./libs/puzzles/5.json?");

/***/ }),

/***/ "./libs/puzzles/6.json":
/*!*****************************!*\
  !*** ./libs/puzzles/6.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, y, x, words, letters, pool, default */
/***/ (function(module) {

eval("module.exports = {\"0\":{\"2\":\"F\",\"3\":\"L\",\"4\":\"A\",\"5\":\"W\"},\"1\":{\"2\":\"L\",\"5\":\"O\"},\"2\":{\"2\":\"O\",\"5\":\"L\",\"8\":\"A\"},\"3\":{\"0\":\"F\",\"1\":\"O\",\"2\":\"W\",\"3\":\"L\",\"5\":\"F\",\"6\":\"A\",\"7\":\"L\",\"8\":\"L\"},\"4\":{\"3\":\"O\",\"8\":\"L\"},\"5\":{\"3\":\"A\",\"8\":\"O\"},\"6\":{\"3\":\"F\",\"4\":\"A\",\"5\":\"L\",\"6\":\"L\",\"7\":\"O\",\"8\":\"W\"},\"y\":7,\"x\":9,\"words\":{\"FLOW\":[[0,2],[1,2],[2,2],[3,2]],\"LOAF\":[[3,3],[4,3],[5,3],[6,3]],\"WOLF\":[[0,5],[1,5],[2,5],[3,5]],\"ALLOW\":[[2,8],[3,8],[4,8],[5,8],[6,8]],\"FLAW\":[[0,2],[0,3],[0,4],[0,5]],\"FOWL\":[[3,0],[3,1],[3,2],[3,3]],\"FALL\":[[3,5],[3,6],[3,7],[3,8]],\"FALLOW\":[[6,3],[6,4],[6,5],[6,6],[6,7],[6,8]]},\"letters\":[\"W\",\"L\",\"L\",\"O\",\"F\",\"A\"],\"pool\":{\"W\":{\"max\":1,\"current\":0},\"L\":{\"max\":2,\"current\":0},\"O\":{\"max\":1,\"current\":0},\"F\":{\"max\":1,\"current\":0},\"A\":{\"max\":1,\"current\":0}}};\n\n//# sourceURL=webpack:///./libs/puzzles/6.json?");

/***/ }),

/***/ "./libs/puzzles/7.json":
/*!*****************************!*\
  !*** ./libs/puzzles/7.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, y, x, words, letters, pool, default */
/***/ (function(module) {

eval("module.exports = {\"0\":{\"0\":\"V\",\"4\":\"A\"},\"1\":{\"0\":\"A\",\"4\":\"V\",\"5\":\"A\",\"6\":\"N\"},\"2\":{\"0\":\"N\",\"2\":\"E\",\"3\":\"V\",\"4\":\"E\",\"6\":\"A\"},\"3\":{\"0\":\"E\",\"2\":\"V\",\"4\":\"N\",\"6\":\"V\"},\"4\":{\"2\":\"E\",\"4\":\"U\",\"6\":\"E\"},\"5\":{\"0\":\"V\",\"1\":\"E\",\"2\":\"N\",\"3\":\"U\",\"4\":\"E\"},\"y\":6,\"x\":7,\"words\":{\"VANE\":[[0,0],[1,0],[2,0],[3,0]],\"EVEN\":[[2,2],[3,2],[4,2],[5,2]],\"AVENUE\":[[0,4],[1,4],[2,4],[3,4],[4,4],[5,4]],\"NAVE\":[[1,6],[2,6],[3,6],[4,6]],\"VAN\":[[1,4],[1,5],[1,6]],\"EVE\":[[2,2],[2,3],[2,4]],\"VENUE\":[[5,0],[5,1],[5,2],[5,3],[5,4]]},\"letters\":[\"E\",\"E\",\"V\",\"U\",\"A\",\"N\"],\"pool\":{\"E\":{\"max\":2,\"current\":0},\"V\":{\"max\":1,\"current\":0},\"U\":{\"max\":1,\"current\":0},\"A\":{\"max\":1,\"current\":0},\"N\":{\"max\":1,\"current\":0}}};\n\n//# sourceURL=webpack:///./libs/puzzles/7.json?");

/***/ }),

/***/ "./libs/puzzles/8.json":
/*!*****************************!*\
  !*** ./libs/puzzles/8.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, y, x, words, letters, pool, default */
/***/ (function(module) {

eval("module.exports = {\"0\":{\"2\":\"B\",\"3\":\"U\",\"4\":\"N\",\"5\":\"D\",\"6\":\"L\",\"7\":\"E\"},\"1\":{\"0\":\"B\",\"2\":\"E\",\"5\":\"U\"},\"2\":{\"0\":\"L\",\"1\":\"E\",\"2\":\"N\",\"3\":\"D\",\"5\":\"E\"},\"3\":{\"0\":\"U\",\"2\":\"D\",\"4\":\"B\",\"5\":\"L\",\"6\":\"E\",\"7\":\"D\"},\"4\":{\"0\":\"E\",\"4\":\"L\",\"7\":\"U\"},\"5\":{\"1\":\"L\",\"2\":\"U\",\"3\":\"B\",\"4\":\"E\",\"7\":\"N\"},\"6\":{\"4\":\"N\",\"5\":\"U\",\"6\":\"D\",\"7\":\"E\"},\"7\":{\"4\":\"D\"},\"y\":8,\"x\":8,\"words\":{\"BLUE\":[[1,0],[2,0],[3,0],[4,0]],\"BEND\":[[0,2],[1,2],[2,2],[3,2]],\"BLEND\":[[3,4],[4,4],[5,4],[6,4],[7,4]],\"DUEL\":[[0,5],[1,5],[2,5],[3,5]],\"DUNE\":[[3,7],[4,7],[5,7],[6,7]],\"BUNDLE\":[[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]],\"LEND\":[[2,0],[2,1],[2,2],[2,3]],\"BLED\":[[3,4],[3,5],[3,6],[3,7]],\"LUBE\":[[5,1],[5,2],[5,3],[5,4]],\"NUDE\":[[6,4],[6,5],[6,6],[6,7]]},\"letters\":[\"N\",\"B\",\"D\",\"U\",\"L\",\"E\"],\"pool\":{\"N\":{\"max\":1,\"current\":0},\"B\":{\"max\":1,\"current\":0},\"D\":{\"max\":1,\"current\":0},\"U\":{\"max\":1,\"current\":0},\"L\":{\"max\":1,\"current\":0},\"E\":{\"max\":1,\"current\":0}}};\n\n//# sourceURL=webpack:///./libs/puzzles/8.json?");

/***/ }),

/***/ "./libs/puzzles/9.json":
/*!*****************************!*\
  !*** ./libs/puzzles/9.json ***!
  \*****************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, y, x, words, letters, pool, default */
/***/ (function(module) {

eval("module.exports = {\"0\":{\"2\":\"E\",\"3\":\"J\",\"4\":\"E\",\"5\":\"C\",\"6\":\"T\"},\"1\":{\"0\":\"T\"},\"2\":{\"0\":\"R\",\"1\":\"E\",\"2\":\"J\",\"3\":\"E\",\"4\":\"C\",\"5\":\"T\"},\"3\":{\"0\":\"E\",\"2\":\"E\"},\"4\":{\"0\":\"E\",\"1\":\"R\",\"2\":\"E\",\"3\":\"C\",\"4\":\"T\"},\"5\":{\"2\":\"R\",\"4\":\"E\"},\"6\":{\"3\":\"J\",\"4\":\"E\",\"5\":\"T\"},\"y\":7,\"x\":7,\"words\":{\"TREE\":[[1,0],[2,0],[3,0],[4,0]],\"JEER\":[[2,2],[3,2],[4,2],[5,2]],\"TEE\":[[4,4],[5,4],[6,4]],\"EJECT\":[[0,2],[0,3],[0,4],[0,5],[0,6]],\"REJECT\":[[2,0],[2,1],[2,2],[2,3],[2,4],[2,5]],\"ERECT\":[[4,0],[4,1],[4,2],[4,3],[4,4]],\"JET\":[[6,3],[6,4],[6,5]]},\"letters\":[\"E\",\"J\",\"T\",\"R\",\"C\",\"E\"],\"pool\":{\"E\":{\"max\":2,\"current\":0},\"J\":{\"max\":1,\"current\":0},\"T\":{\"max\":1,\"current\":0},\"R\":{\"max\":1,\"current\":0},\"C\":{\"max\":1,\"current\":0}}};\n\n//# sourceURL=webpack:///./libs/puzzles/9.json?");

/***/ })

/******/ });
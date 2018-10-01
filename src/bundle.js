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

eval("const board = __webpack_require__(/*! ./puzzle.json */ \"./libs/puzzle.json\");\n\nlet word = \"\";\nlet pool = {};\n\n$(document).ready(() => {\n  for(let y = 0; y < board.y; y++) {\n    const gridRow = $(`<div class=\"grid-row\" id=\"${y}\"></div>`);\n    for(let x = 0; x < board.x; x++) {\n      const className = `square${board[y][x] ? \" letter\" : \" no-letter\"}`;\n      const square = $(`<div class=\"${className}\" id=\"${x}\"></div>`);\n      square.appendTo(gridRow);\n    }\n\n    gridRow.appendTo(\".board\");\n  }\n\n  for(let i = 0; i < board.letters.length; i++) {  \n    const letter = $(\n      `<div\n        class=\"pool-letter\"\n        id=\"${i}\"\n      >\n        ${board.letters[i]}\n      </div>`\n    );\n\n    if(i === 1 || i === 4) {\n      letter.appendTo(`#${i - 1}.pool-row`).click(letterClick);\n    } else {\n      letter.appendTo(`#${(i % 2) + 1}.pool-row`).click(letterClick);\n    }\n  }\n\n  $(\".pool-button\").click(tryWord);\n});\n\nconst letterClick = (event) => {\n  const letter = event.target.outerText;\n\n  if(!pool[letter]) {\n    pool[letter] = true;\n    console.log(pool);\n    word += letter;\n  }\n}\n\nconst tryWord = () => {\n  debugger\n\n  if(Object.keys(board.words).includes(word)){\n    uncoverWord(word);\n  }\n\n  word = \"\";\n  pool = {};\n}\n\nconst uncoverWord = (word) => {\n  const letterArr = word.split(\"\");\n  const posArr = board.words[word];\n\n  for(let i = 0; i < letterArr.length; i++) {\n    const square = $(`#${posArr[i][0]}.grid-row #${posArr[i][1]}.square`);\n    square.html(letterArr[i]);\n  } \n}\n\n//# sourceURL=webpack:///./libs/main.js?");

/***/ }),

/***/ "./libs/puzzle.json":
/*!**************************!*\
  !*** ./libs/puzzle.json ***!
  \**************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, y, x, words, letters, default */
/***/ (function(module) {

eval("module.exports = {\"0\":{\"2\":\"E\",\"3\":\"J\",\"4\":\"E\",\"5\":\"C\",\"6\":\"T\"},\"1\":{\"0\":\"T\"},\"2\":{\"0\":\"R\",\"1\":\"E\",\"2\":\"J\",\"3\":\"E\",\"4\":\"C\",\"5\":\"T\"},\"3\":{\"0\":\"E\",\"2\":\"E\"},\"4\":{\"0\":\"E\",\"1\":\"R\",\"2\":\"E\",\"3\":\"C\",\"4\":\"T\"},\"5\":{\"2\":\"R\",\"4\":\"E\"},\"6\":{\"3\":\"J\",\"4\":\"E\",\"5\":\"T\"},\"y\":7,\"x\":7,\"words\":{\"TREE\":[[1,0],[2,0],[3,0],[4,0]],\"JEER\":[[2,2],[3,2],[4,2],[5,2]],\"TEE\":[[4,4],[5,4],[6,4]],\"EJECT\":[[0,2],[0,3],[0,4],[0,5],[0,6]],\"REJECT\":[[2,0],[2,1],[2,2],[2,3],[2,4],[2,5]],\"ERECT\":[[4,0],[4,1],[4,2],[4,3],[4,4]],\"JET\":[[6,3],[6,4],[6,5]]},\"letters\":[\"E\",\"J\",\"T\",\"R\",\"C\",\"E\"]};\n\n//# sourceURL=webpack:///./libs/puzzle.json?");

/***/ })

/******/ });
var CanvasLyrics =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas-lyrics.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas-lyrics.js":
/*!******************************!*\
  !*** ./src/canvas-lyrics.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CanvasLyrics; });\nclass CanvasLyrics {\n  constructor(player, context, lyrics, width, height) {\n    this.player = player;\n    this.ctx = context;\n    this.lyrics = lyrics;\n    this.idx = 0;\n    this.widx = 0;\n    this.width = width;\n    this.height = height;\n    this.displayed = false;\n\n    // Check if video element\n    if(this.player.nodeName === \"VIDEO\") {\n      this.time = function() { return this.player.currentTime};\n    }\n    // Check if audio alement\n    else if (this.player.nodeName === \"AUDIO\") {\n      console.log(\"audiotype\");\n    }\n\n    // Check if youtube player\n    else if (this.player instanceof YT.Player) {\n      console.log(\"ytplayer\");\n      this.time = this.player.getCurrentTime\n\n      // add player state change\n    }\n    this.ctx.font = \"24pt Helvetica\";\n    this.timer = setInterval(this.update.bind(this), 10);\n  }\n  \n  currentTime() {\n    return this.player.currentTime;\n  }\n  update() {\n    console.log('update');\n    if(this.type === 'ytplayer') {\n      var currTime = this.player.getCurrentTime();\n    } else {\n      var currTime = this.player.currentTime;\n    }\n    // var currTime = this.player.getCurrentTime();\n    // Display and advance to next word\n    if(this.displayed == true &&\n         currTime >= this.lyrics[this.idx].words[this.widx] && \n       this.widx < this.lyrics[this.idx].words.length)\n    {\n        this.clearDisplay();\n      this.displayText(this.widx);\n      this.widx++;\n    }\n    // Clear display && advance to next lyric idx\n    // Reset word idx to 0\n    else if(\n        this.displayed == true &&\n      currTime >= this.lyrics[this.idx].end) \n   {\n        this.clearDisplay();\n      this.widx = 0;\n      this.displayed = false;\n      if(this.idx + 1 < this.lyrics.length)\n          this.idx++;\n        this.currLine = this.lyrics[this.idx].text;\n    }\n    // Display lyric line\n      else if(\n        this.displayed == false &&\n        currTime >= this.lyrics[this.idx].start &&\n        currTime < this.lyrics[this.idx].end) \n    {\n      this.displayed = true;\n      this.displayText(-1);\n    } \n    // requestAnimationFrame(this.update.bind(this));\n  }\n  \n  displayText(widx) {\n    var space = this.ctx.measureText(\" \").width;\n    var height = this.ctx.measureText(\"M\").width * 1.5;\n\n    // var fs = '#d62d20';\n    // var fs = \"#FFFFFF\";\n    var fs = \"black\"\n    // var fs = \"#162447\";\n\n    var x = 0;\n    var y = (this.height*1.6 - height*this.lyrics[this.idx].text.length) / 2;\n    var w = 0;\n    var display = \"scroll\";\n    // Display Type\n    if(typeof lyrics[this.idx].display !== 'undefined') {\n      display = lyrics[this.idx].display;\n    }\n    this.ctx.shadowOffsetX = 1.5;\n    this.ctx.shadowOffsetY = 1.5;\n\n    this.ctx.shadowBlur = 3;\n    this.ctx.shadowColor = \"white\";\n\n    if(display == 'scroll') {\n      for(let i = 0; i < this.lyrics[this.idx].text.length; i++) {\n        // Center line text horizontally\n        var lineWidth = this.ctx.measureText(this.lyrics[this.idx].text[i]).width;\n        x = (this.width - lineWidth)/2;\n\n        // Center vertically\n        \n        let line = this.lyrics[this.idx].text[i];\n        let splt = line.split(\" \");\n        let limit = Math.min(widx+1, splt.length);\n        for(var j = 0; w < widx+1; j++) {\n          this.ctx.fillStyle = fs;\n          this.ctx.fillText(splt[j], x, y);\n          x += this.ctx.measureText(splt[j]).width + space;\n          w++;\n          if(j+1 >= splt.length) { \n            j++;\n            break;\n          }\n        }\n\n        for(; j < splt.length; j++) {\n          this.ctx.fillStyle = \"#0634a400\";\n          // this.ctx.fillStyle = \"black\";\n          this.ctx.fillText(splt[j], x, y);\n          x += this.ctx.measureText(splt[j]).width + space;\n          w++;\n        }\n        y += height\n      }      \n    }\n    else if(display == 'roll') {\n      for(let i = 0; i < this.lyrics[this.idx].text.length; i++) {\n      // Center line text horizontally\n      var lineWidth = this.ctx.measureText(this.lyrics[this.idx].text[i]).width;\n      x = (this.width - lineWidth)/2;\n      \n      let line = this.lyrics[this.idx].text[i];\n      let splt = line.split(\" \");\n      \n      for(let j = 0; j < splt.length; j++) {\n        if(w == widx) {\n          this.ctx.fillStyle = fs;\n        } else {\n          this.ctx.fillStyle = \"#0634a400\"; \n          // this.ctx.fillStyle = \"black\"; \n        }\n        this.ctx.fillText(splt[j], x, y);\n        x += this.ctx.measureText(splt[j]).width + space;\n        w++\n      }\n      y += height\n    }\n    }\n  }\n\n  clearDisplay() {\n      this.ctx.clearRect(0, 0, this.width, this.height);\n  }\n\n  reset() {\n    this.idx = 0;\n    this.displayed = false;\n    this.clearDisplay();\n    this.widx = 0;\n    // var m = this.player.getCurrentTime();\n    if(this.type === 'ytplayer') {\n      var m = this.player.getCurrentTime();\n    } else {\n      var m = this.player.currentTime;\n    }\n    for(let i = 0; i < this.lyrics.length; i++) {\n      if(m > this.lyrics[i].end && i+1 < this.lyrics.length) {\n        this.idx++;\n      }\n    }\n  }\n\n};\n\n//# sourceURL=webpack://CanvasLyrics/./src/canvas-lyrics.js?");

/***/ })

/******/ });
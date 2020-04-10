"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scroll = function Scroll() {
  _classCallCheck(this, Scroll);

  this.x = 0; // left

  this.y = 0; // top

  this.ri = 0; // cell row-index

  this.ci = 0; // cell col-index
};

exports["default"] = Scroll;
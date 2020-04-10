"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint no-bitwise: "off" */

/*
  v: int value
  digit: bit len of v
  flag: true or false
*/
var bitmap = function bitmap(v, digit, flag) {
  var b = 1 << digit;
  return flag ? v | b : v ^ b;
};

var _default = bitmap;
exports["default"] = _default;
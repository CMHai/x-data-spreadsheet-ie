"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.dpr = exports.cssPrefix = void 0;

/* global window */
var cssPrefix = 'x-spreadsheet';
exports.cssPrefix = cssPrefix;
var dpr = window.devicePixelRatio || 1;
exports.dpr = dpr;
var _default = {
  cssPrefix: cssPrefix,
  dpr: dpr
};
exports["default"] = _default;
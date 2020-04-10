"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _config = require("../config");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var themeColorPlaceHolders = ['#ffffff', '#000100', '#e7e5e6', '#445569', '#5b9cd6', '#ed7d31', '#a5a5a5', '#ffc001', '#4371c6', '#71ae47'];
var themeColors = [['#f2f2f2', '#7f7f7f', '#d0cecf', '#d5dce4', '#deeaf6', '#fce5d5', '#ededed', '#fff2cd', '#d9e2f3', '#e3efd9'], ['#d8d8d8', '#595959', '#afabac', '#adb8ca', '#bdd7ee', '#f7ccac', '#dbdbdb', '#ffe59a', '#b3c6e7', '#c5e0b3'], ['#bfbfbf', '#3f3f3f', '#756f6f', '#8596b0', '#9cc2e6', '#f4b184', '#c9c9c9', '#fed964', '#8eaada', '#a7d08c'], ['#a5a5a5', '#262626', '#3a3839', '#333f4f', '#2e75b5', '#c45a10', '#7b7b7b', '#bf8e01', '#2f5596', '#538136'], ['#7f7f7f', '#0c0c0c', '#171516', '#222a35', '#1f4e7a', '#843c0a', '#525252', '#7e6000', '#203864', '#365624']];
var standardColors = ['#c00000', '#fe0000', '#fdc101', '#ffff01', '#93d051', '#00b04e', '#01b0f1', '#0170c1', '#012060', '#7030a0'];

function buildTd(bgcolor) {
  var _this = this;

  return (0, _element.h)('td', '').child((0, _element.h)('div', "".concat(_config.cssPrefix, "-color-palette-cell")).on('click.stop', function () {
    return _this.change(bgcolor);
  }).css('background-color', bgcolor));
}

var ColorPalette = function ColorPalette() {
  var _h,
      _h2,
      _this2 = this,
      _h4;

  _classCallCheck(this, ColorPalette);

  this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-color-palette"));

  this.change = function () {};

  var table = (0, _element.h)('table', '').children((_h = (0, _element.h)('tbody', '')).children.apply(_h, [(_h2 = (0, _element.h)('tr', "".concat(_config.cssPrefix, "-theme-color-placeholders"))).children.apply(_h2, _toConsumableArray(themeColorPlaceHolders.map(function (color) {
    return buildTd.call(_this2, color);
  })))].concat(_toConsumableArray(themeColors.map(function (it) {
    var _h3;

    return (_h3 = (0, _element.h)('tr', "".concat(_config.cssPrefix, "-theme-colors"))).children.apply(_h3, _toConsumableArray(it.map(function (color) {
      return buildTd.call(_this2, color);
    })));
  })), [(_h4 = (0, _element.h)('tr', "".concat(_config.cssPrefix, "-standard-colors"))).children.apply(_h4, _toConsumableArray(standardColors.map(function (color) {
    return buildTd.call(_this2, color);
  })))])));
  this.el.child(table);
};

exports["default"] = ColorPalette;
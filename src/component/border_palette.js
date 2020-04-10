"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _icon = _interopRequireDefault(require("./icon"));

var _dropdown_color = _interopRequireDefault(require("./dropdown_color"));

var _dropdown_linetype = _interopRequireDefault(require("./dropdown_linetype"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function buildTable() {
  var _h;

  return (0, _element.h)('table', '').child((_h = (0, _element.h)('tbody', '')).children.apply(_h, arguments));
}

function buildTd(iconName) {
  var _this = this;

  return (0, _element.h)('td', '').child((0, _element.h)('div', "".concat(_config.cssPrefix, "-border-palette-cell")).child(new _icon["default"]("border-".concat(iconName))).on('click', function () {
    _this.mode = iconName;
    var mode = _this.mode,
        style = _this.style,
        color = _this.color;

    _this.change({
      mode: mode,
      style: style,
      color: color
    });
  }));
}

var BorderPalette = function BorderPalette() {
  var _this2 = this,
      _h2,
      _h3;

  _classCallCheck(this, BorderPalette);

  this.color = '#000';
  this.style = 'thin';
  this.mode = 'all';

  this.change = function () {};

  this.ddColor = new _dropdown_color["default"]('line-color', this.color);

  this.ddColor.change = function (color) {
    _this2.color = color;
  };

  this.ddType = new _dropdown_linetype["default"](this.style);

  this.ddType.change = function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        s = _ref2[0];

    _this2.style = s;
  };

  this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-border-palette"));
  var table = buildTable((0, _element.h)('tr', '').children((0, _element.h)('td', "".concat(_config.cssPrefix, "-border-palette-left")).child(buildTable((_h2 = (0, _element.h)('tr', '')).children.apply(_h2, _toConsumableArray(['all', 'inside', 'horizontal', 'vertical', 'outside'].map(function (it) {
    return buildTd.call(_this2, it);
  }))), (_h3 = (0, _element.h)('tr', '')).children.apply(_h3, _toConsumableArray(['left', 'top', 'right', 'bottom', 'none'].map(function (it) {
    return buildTd.call(_this2, it);
  }))))), (0, _element.h)('td', "".concat(_config.cssPrefix, "-border-palette-right")).children((0, _element.h)('div', "".concat(_config.cssPrefix, "-toolbar-btn")).child(this.ddColor.el), (0, _element.h)('div', "".concat(_config.cssPrefix, "-toolbar-btn")).child(this.ddType.el))));
  this.el.child(table);
};

exports["default"] = BorderPalette;
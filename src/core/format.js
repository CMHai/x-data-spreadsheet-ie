"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseFormats = exports.formatm = exports["default"] = void 0;

var _locale = require("../locale/locale");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var formatStringRender = function formatStringRender(v) {
  return v;
};

var formatNumberRender = function formatNumberRender(v) {
  // match "-12.1" or "12" or "12.1"
  if (/^(-?\d*.?\d*)$/.test(v)) {
    var v1 = Number(v).toFixed(2).toString();

    var _v1$split = v1.split('\\.'),
        _v1$split2 = _toArray(_v1$split),
        first = _v1$split2[0],
        parts = _v1$split2.slice(1);

    return [first.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')].concat(_toConsumableArray(parts));
  }

  return v;
};

var baseFormats = [{
  key: 'normal',
  title: (0, _locale.tf)('format.normal'),
  type: 'string',
  render: formatStringRender
}, {
  key: 'text',
  title: (0, _locale.tf)('format.text'),
  type: 'string',
  render: formatStringRender
}, {
  key: 'number',
  title: (0, _locale.tf)('format.number'),
  type: 'number',
  label: '1,000.12',
  render: formatNumberRender
}, {
  key: 'percent',
  title: (0, _locale.tf)('format.percent'),
  type: 'number',
  label: '10.12%',
  render: function render(v) {
    return "".concat(v, "%");
  }
}, {
  key: 'rmb',
  title: (0, _locale.tf)('format.rmb'),
  type: 'number',
  label: '￥10.00',
  render: function render(v) {
    return "\uFFE5".concat(formatNumberRender(v));
  }
}, {
  key: 'usd',
  title: (0, _locale.tf)('format.usd'),
  type: 'number',
  label: '$10.00',
  render: function render(v) {
    return "$".concat(formatNumberRender(v));
  }
}, {
  key: 'eur',
  title: (0, _locale.tf)('format.eur'),
  type: 'number',
  label: '€10.00',
  render: function render(v) {
    return "\u20AC".concat(formatNumberRender(v));
  }
}, {
  key: 'date',
  title: (0, _locale.tf)('format.date'),
  type: 'date',
  label: '26/09/2008',
  render: formatStringRender
}, {
  key: 'time',
  title: (0, _locale.tf)('format.time'),
  type: 'date',
  label: '15:59:00',
  render: formatStringRender
}, {
  key: 'datetime',
  title: (0, _locale.tf)('format.datetime'),
  type: 'date',
  label: '26/09/2008 15:59:00',
  render: formatStringRender
}, {
  key: 'duration',
  title: (0, _locale.tf)('format.duration'),
  type: 'date',
  label: '24:01:00',
  render: formatStringRender
}]; // const formats = (ary = []) => {
//   const map = {};
//   baseFormats.concat(ary).forEach((f) => {
//     map[f.key] = f;
//   });
//   return map;
// };

exports.baseFormats = baseFormats;
var formatm = {};
exports.formatm = formatm;
baseFormats.forEach(function (f) {
  formatm[f.key] = f;
});
var _default = {};
exports["default"] = _default;
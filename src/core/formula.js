"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseFormulas = exports.formulas = exports.formulam = exports["default"] = void 0;

var _locale = require("../locale/locale");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/** @type {Formula[]} */
var baseFormulas = [{
  key: 'SUM',
  title: (0, _locale.tf)('formula.sum'),
  render: function render(ary) {
    return ary.reduce(function (a, b) {
      return Number(a) + Number(b);
    }, 0);
  }
}, {
  key: 'AVERAGE',
  title: (0, _locale.tf)('formula.average'),
  render: function render(ary) {
    return ary.reduce(function (a, b) {
      return Number(a) + Number(b);
    }, 0) / ary.length;
  }
}, {
  key: 'MAX',
  title: (0, _locale.tf)('formula.max'),
  render: function render(ary) {
    return Math.max.apply(Math, _toConsumableArray(ary.map(function (v) {
      return Number(v);
    })));
  }
}, {
  key: 'MIN',
  title: (0, _locale.tf)('formula.min'),
  render: function render(ary) {
    return Math.min.apply(Math, _toConsumableArray(ary.map(function (v) {
      return Number(v);
    })));
  }
}, {
  key: 'IF',
  title: (0, _locale.tf)('formula._if'),
  render: function render(_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        b = _ref2[0],
        t = _ref2[1],
        f = _ref2[2];

    return b ? t : f;
  }
}, {
  key: 'AND',
  title: (0, _locale.tf)('formula.and'),
  render: function render(ary) {
    return ary.every(function (it) {
      return it;
    });
  }
}, {
  key: 'OR',
  title: (0, _locale.tf)('formula.or'),
  render: function render(ary) {
    return ary.some(function (it) {
      return it;
    });
  }
}, {
  key: 'CONCAT',
  title: (0, _locale.tf)('formula.concat'),
  render: function render(ary) {
    return ary.join('');
  }
}
/* support:  1 + A1 + B2 * 3
{
  key: 'DIVIDE',
  title: tf('formula.divide'),
  render: ary => ary.reduce((a, b) => Number(a) / Number(b)),
},
{
  key: 'PRODUCT',
  title: tf('formula.product'),
  render: ary => ary.reduce((a, b) => Number(a) * Number(b),1),
},
{
  key: 'SUBTRACT',
  title: tf('formula.subtract'),
  render: ary => ary.reduce((a, b) => Number(a) - Number(b)),
},
*/
];
exports.baseFormulas = baseFormulas;
var formulas = baseFormulas; // const formulas = (formulaAry = []) => {
//   const formulaMap = {};
//   baseFormulas.concat(formulaAry).forEach((f) => {
//     formulaMap[f.key] = f;
//   });
//   return formulaMap;
// };

exports.formulas = formulas;
var formulam = {};
exports.formulam = formulam;
baseFormulas.forEach(function (f) {
  formulam[f.key] = f;
});
var _default = {};
exports["default"] = _default;
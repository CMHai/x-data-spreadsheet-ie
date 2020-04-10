"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringAt = stringAt;
exports.indexAt = indexAt;
exports.expr2xy = expr2xy;
exports.xy2expr = xy2expr;
exports.expr2expr = expr2expr;
exports["default"] = void 0;

require("./_.prototypes");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
/** index number 2 letters
 * @example stringAt(26) ==> 'AA'
 * @date 2019-10-10
 * @export
 * @param {number} index
 * @returns {string}
 */

function stringAt(index) {
  var str = '';
  var cindex = index;

  while (cindex >= alphabets.length) {
    cindex /= alphabets.length;
    cindex -= 1;
    str += alphabets[parseInt(cindex, 10) % alphabets.length];
  }

  var last = index % alphabets.length;
  str += alphabets[last];
  return str;
}
/** translate letter in A1-tag to number
 * @date 2019-10-10
 * @export
 * @param {string} str "AA" in A1-tag "AA1"
 * @returns {number}
 */


function indexAt(str) {
  var ret = 0;

  for (var i = 0; i < str.length - 1; i += 1) {
    var cindex = str.charCodeAt(i) - 65;
    var exponet = str.length - 1 - i;
    ret += Math.pow(alphabets.length, exponet) + alphabets.length * cindex;
  }

  ret += str.charCodeAt(str.length - 1) - 65;
  return ret;
} // B10 => x,y

/** translate A1-tag to XY-tag
 * @date 2019-10-10
 * @export
 * @param {tagA1} src
 * @returns {tagXY}
 */


function expr2xy(src) {
  var x = '';
  var y = '';

  for (var i = 0; i < src.length; i += 1) {
    if (src.charAt(i) >= '0' && src.charAt(i) <= '9') {
      y += src.charAt(i);
    } else {
      x += src.charAt(i);
    }
  }

  return [indexAt(x), parseInt(y, 10) - 1];
}
/** translate XY-tag to A1-tag
 * @example x,y => B10
 * @date 2019-10-10
 * @export
 * @param {number} x
 * @param {number} y
 * @returns {tagA1}
 */


function xy2expr(x, y) {
  return "".concat(stringAt(x)).concat(y + 1);
}
/** translate A1-tag src by (xn, yn)
 * @date 2019-10-10
 * @export
 * @param {tagA1} src
 * @param {number} xn
 * @param {number} yn
 * @returns {tagA1}
 */


function expr2expr(src, xn, yn) {
  var _expr2xy = expr2xy(src),
      _expr2xy2 = _slicedToArray(_expr2xy, 2),
      x = _expr2xy2[0],
      y = _expr2xy2[1];

  return xy2expr(x + xn, y + yn);
}

var _default = {
  stringAt: stringAt,
  indexAt: indexAt,
  expr2xy: expr2xy,
  xy2expr: xy2expr,
  expr2expr: expr2expr
};
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cell_range = require("./cell_range");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Selector = /*#__PURE__*/function () {
  function Selector() {
    _classCallCheck(this, Selector);

    this.range = new _cell_range.CellRange(0, 0, 0, 0);
    this.ri = 0;
    this.ci = 0;
  }

  _createClass(Selector, [{
    key: "multiple",
    value: function multiple() {
      return this.range.multiple();
    }
  }, {
    key: "setIndexes",
    value: function setIndexes(ri, ci) {
      this.ri = ri;
      this.ci = ci;
    }
  }, {
    key: "size",
    value: function size() {
      return this.range.size();
    }
  }]);

  return Selector;
}();

exports["default"] = Selector;
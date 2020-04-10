"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Clipboard = /*#__PURE__*/function () {
  function Clipboard() {
    _classCallCheck(this, Clipboard);

    this.range = null; // CellRange

    this.state = 'clear';
  }

  _createClass(Clipboard, [{
    key: "copy",
    value: function copy(cellRange) {
      this.range = cellRange;
      this.state = 'copy';
      return this;
    }
  }, {
    key: "cut",
    value: function cut(cellRange) {
      this.range = cellRange;
      this.state = 'cut';
      return this;
    }
  }, {
    key: "isCopy",
    value: function isCopy() {
      return this.state === 'copy';
    }
  }, {
    key: "isCut",
    value: function isCut() {
      return this.state === 'cut';
    }
  }, {
    key: "isClear",
    value: function isClear() {
      return this.state === 'clear';
    }
  }, {
    key: "clear",
    value: function clear() {
      this.range = null;
      this.state = 'clear';
    }
  }]);

  return Clipboard;
}();

exports["default"] = Clipboard;
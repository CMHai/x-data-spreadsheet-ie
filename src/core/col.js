"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cols = exports["default"] = void 0;

var _helper = _interopRequireDefault(require("./helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cols = /*#__PURE__*/function () {
  function Cols(_ref) {
    var len = _ref.len,
        width = _ref.width,
        indexWidth = _ref.indexWidth,
        minWidth = _ref.minWidth;

    _classCallCheck(this, Cols);

    this._ = {};
    this.len = len;
    this.width = width;
    this.indexWidth = indexWidth;
    this.minWidth = minWidth;
  }

  _createClass(Cols, [{
    key: "setData",
    value: function setData(d) {
      if (d.len) {
        this.len = d.len;
        delete d.len;
      }

      this._ = d;
    }
  }, {
    key: "getData",
    value: function getData() {
      var len = this.len;
      return Object.assign({
        len: len
      }, this._);
    }
  }, {
    key: "getWidth",
    value: function getWidth(i) {
      if (this.isHide(i)) return 0;
      var col = this._[i];

      if (col && col.width) {
        return col.width;
      }

      return this.width;
    }
  }, {
    key: "getOrNew",
    value: function getOrNew(ci) {
      this._[ci] = this._[ci] || {};
      return this._[ci];
    }
  }, {
    key: "setWidth",
    value: function setWidth(ci, width) {
      var col = this.getOrNew(ci);
      col.width = width;
    }
  }, {
    key: "unhide",
    value: function unhide(idx) {
      var index = idx;

      while (index > 0) {
        index -= 1;

        if (this.isHide(index)) {
          this.setHide(index, false);
        } else break;
      }
    }
  }, {
    key: "isHide",
    value: function isHide(ci) {
      var col = this._[ci];
      return col && col.hide;
    }
  }, {
    key: "setHide",
    value: function setHide(ci, v) {
      var col = this.getOrNew(ci);
      if (v === true) col.hide = true;else delete col.hide;
    }
  }, {
    key: "setStyle",
    value: function setStyle(ci, style) {
      var col = this.getOrNew(ci);
      col.style = style;
    }
  }, {
    key: "sumWidth",
    value: function sumWidth(min, max) {
      var _this = this;

      return _helper["default"].rangeSum(min, max, function (i) {
        return _this.getWidth(i);
      });
    }
  }, {
    key: "totalWidth",
    value: function totalWidth() {
      return this.sumWidth(0, this.len);
    }
  }]);

  return Cols;
}();

exports.Cols = Cols;
var _default = {};
exports["default"] = _default;
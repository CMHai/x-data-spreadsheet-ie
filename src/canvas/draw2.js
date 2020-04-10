"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Draw = exports["default"] = void 0;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Draw = /*#__PURE__*/function () {
  function Draw(el) {
    _classCallCheck(this, Draw);

    this.el = el;
    this.ctx = el.getContext('2d');
  }

  _createClass(Draw, [{
    key: "clear",
    value: function clear() {
      var _this$el = this.el,
          width = _this$el.width,
          height = _this$el.height;
      this.ctx.clearRect(0, 0, width, height);
      return this;
    }
  }, {
    key: "attr",
    value: function attr(m) {
      Object.assign(this.ctx, m);
      return this;
    }
  }, {
    key: "save",
    value: function save() {
      this.ctx.save();
      this.ctx.beginPath();
      return this;
    }
  }, {
    key: "restore",
    value: function restore() {
      this.ctx.restore();
      return this;
    }
  }, {
    key: "beginPath",
    value: function beginPath() {
      this.ctx.beginPath();
      return this;
    }
  }, {
    key: "closePath",
    value: function closePath() {
      this.ctx.closePath();
      return this;
    }
  }, {
    key: "measureText",
    value: function measureText(text) {
      return this.ctx.measureText(text);
    }
  }, {
    key: "rect",
    value: function rect(x, y, width, height) {
      this.ctx.rect(x, y, width, height);
      return this;
    }
  }, {
    key: "scale",
    value: function scale(x, y) {
      this.ctx.scale(x, y);
      return this;
    }
  }, {
    key: "rotate",
    value: function rotate(angle) {
      this.ctx.rotate(angle);
      return this;
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      this.ctx.translate(x, y);
      return this;
    }
  }, {
    key: "transform",
    value: function transform(a, b, c, d, e) {
      this.ctx.transform(a, b, c, d, e);
      return this;
    }
  }, {
    key: "fillRect",
    value: function fillRect(x, y, w, h) {
      this.ctx.fillRect(x, y, w, h);
      return this;
    }
  }, {
    key: "strokeRect",
    value: function strokeRect(x, y, w, h) {
      this.ctx.strokeRect(x, y, w, h);
      return this;
    }
  }, {
    key: "fillText",
    value: function fillText(text, x, y, maxWidth) {
      this.ctx.fillText(text, x, y, maxWidth);
      return this;
    }
  }, {
    key: "strokeText",
    value: function strokeText(text, x, y, maxWidth) {
      this.ctx.strokeText(text, x, y, maxWidth);
      return this;
    }
  }]);

  return Draw;
}();

exports.Draw = Draw;
var _default = {};
exports["default"] = _default;
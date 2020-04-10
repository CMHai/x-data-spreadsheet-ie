"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _config = require("../config");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormInput = /*#__PURE__*/function () {
  function FormInput(width, hint) {
    var _this = this;

    _classCallCheck(this, FormInput);

    this.vchange = function () {};

    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-form-input"));
    this.input = (0, _element.h)('input', '').css('width', width).on('input', function (evt) {
      return _this.vchange(evt);
    }).attr('placeholder', hint);
    this.el.child(this.input);
  }

  _createClass(FormInput, [{
    key: "focus",
    value: function focus() {
      var _this2 = this;

      setTimeout(function () {
        _this2.input.el.focus();
      }, 10);
    }
  }, {
    key: "hint",
    value: function hint(v) {
      this.input.attr('placeholder', v);
    }
  }, {
    key: "val",
    value: function val(v) {
      return this.input.val(v);
    }
  }]);

  return FormInput;
}();

exports["default"] = FormInput;
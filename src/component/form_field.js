"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _config = require("../config");

var _locale = require("../locale/locale");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var patterns = {
  number: /(^\d+$)|(^\d+(\.\d{0,4})?$)/,
  date: /^\d{4}-\d{1,2}-\d{1,2}$/
}; // rule: { required: false, type, pattern: // }

var FormField = /*#__PURE__*/function () {
  function FormField(input, rule, label, labelWidth) {
    var _this = this;

    _classCallCheck(this, FormField);

    this.label = '';
    this.rule = rule;

    if (label) {
      this.label = (0, _element.h)('label', 'label').css('width', "".concat(labelWidth, "px")).html(label);
    }

    this.tip = (0, _element.h)('div', 'tip').child('tip').hide();
    this.input = input;

    this.input.vchange = function () {
      return _this.validate();
    };

    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-form-field")).children(this.label, input.el, this.tip);
  }

  _createClass(FormField, [{
    key: "isShow",
    value: function isShow() {
      return this.el.css('display') !== 'none';
    }
  }, {
    key: "show",
    value: function show() {
      this.el.show();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.el.hide();
      return this;
    }
  }, {
    key: "val",
    value: function val(v) {
      return this.input.val(v);
    }
  }, {
    key: "hint",
    value: function hint(_hint) {
      this.input.hint(_hint);
    }
  }, {
    key: "validate",
    value: function validate() {
      var input = this.input,
          rule = this.rule,
          tip = this.tip,
          el = this.el;
      var v = input.val();

      if (rule.required) {
        if (/^\s*$/.test(v)) {
          tip.html((0, _locale.t)('validation.required'));
          el.addClass('error');
          return false;
        }
      }

      if (rule.type || rule.pattern) {
        var pattern = rule.pattern || patterns[rule.type];

        if (!pattern.test(v)) {
          tip.html((0, _locale.t)('validation.notMatch'));
          el.addClass('error');
          return false;
        }
      }

      el.removeClass('error');
      return true;
    }
  }]);

  return FormField;
}();

exports["default"] = FormField;
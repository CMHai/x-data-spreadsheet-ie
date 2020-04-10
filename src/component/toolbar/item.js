"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = require("../../config");

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _element = require("../element");

var _locale = require("../../locale/locale");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Item = /*#__PURE__*/function () {
  // tooltip
  // tag: the subclass type
  // shortcut: shortcut key
  function Item(tag, shortcut, value) {
    _classCallCheck(this, Item);

    this.tip = (0, _locale.t)("toolbar.".concat(tag.replace(/-[a-z]/g, function (c) {
      return c[1].toUpperCase();
    })));
    if (shortcut) this.tip += " (".concat(shortcut, ")");
    this.tag = tag;
    this.shortcut = shortcut;
    this.value = value;
    this.el = this.element();

    this.change = function () {};
  }

  _createClass(Item, [{
    key: "element",
    value: function element() {
      var tip = this.tip;
      return (0, _element.h)('div', "".concat(_config.cssPrefix, "-toolbar-btn")).on('mouseenter', function (evt) {
        (0, _tooltip["default"])(tip, evt.target);
      }).attr('data-tooltip', tip);
    }
  }, {
    key: "setState",
    value: function setState() {}
  }]);

  return Item;
}();

exports["default"] = Item;
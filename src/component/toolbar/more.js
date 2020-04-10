"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dropdown = _interopRequireDefault(require("../dropdown"));

var _dropdown_item = _interopRequireDefault(require("./dropdown_item"));

var _config = require("../../config");

var _element = require("../element");

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DropdownMore = /*#__PURE__*/function (_Dropdown) {
  _inherits(DropdownMore, _Dropdown);

  function DropdownMore() {
    var _this;

    _classCallCheck(this, DropdownMore);

    var icon = new _icon["default"]('ellipsis');
    var moreBtns = (0, _element.h)('div', "".concat(_config.cssPrefix, "-toolbar-more"));
    _this = _possibleConstructorReturn(this, (DropdownMore.__proto__ || Object.getPrototypeOf(DropdownMore)).call(this, icon, 'auto', false, 'bottom-right', moreBtns));
    _this.moreBtns = moreBtns;

    _this.contentEl.css('max-width', '420px');

    return _this;
  }

  return DropdownMore;
}(_dropdown["default"]);

var More = /*#__PURE__*/function (_DropdownItem) {
  _inherits(More, _DropdownItem);

  function More() {
    var _this2;

    _classCallCheck(this, More);

    _this2 = _possibleConstructorReturn(this, (More.__proto__ || Object.getPrototypeOf(More)).call(this, 'more'));

    _this2.el.hide();

    return _this2;
  }

  _createClass(More, [{
    key: "dropdown",
    value: function dropdown() {
      return new DropdownMore();
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
    }
  }]);

  return More;
}(_dropdown_item["default"]);

exports["default"] = More;
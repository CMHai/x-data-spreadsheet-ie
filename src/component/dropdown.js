"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _event = require("./event");

var _config = require("../config");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Dropdown = /*#__PURE__*/function (_Element) {
  _inherits(Dropdown, _Element);

  function Dropdown(title, width, showArrow, placement) {
    var _this2;

    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, 'div', "".concat(_config.cssPrefix, "-dropdown ").concat(placement)));
    _this.title = title;

    _this.change = function () {};

    _this.headerClick = function () {};

    if (typeof title === 'string') {
      _this.title = (0, _element.h)('div', "".concat(_config.cssPrefix, "-dropdown-title")).child(title);
    } else if (showArrow) {
      _this.title.addClass('arrow-left');
    }

    _this.contentEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-dropdown-content")).css('width', width).hide();

    for (var _len = arguments.length, children = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
      children[_key - 4] = arguments[_key];
    }

    (_this2 = _this).setContentChildren.apply(_this2, children);

    _this.headerEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-dropdown-header"));

    _this.headerEl.on('click', function () {
      if (_this.contentEl.css('display') !== 'block') {
        _this.show();
      } else {
        _this.hide();
      }
    }).children(_this.title, showArrow ? (0, _element.h)('div', "".concat(_config.cssPrefix, "-icon arrow-right")).child((0, _element.h)('div', "".concat(_config.cssPrefix, "-icon-img arrow-down"))) : '');

    _this.children(_this.headerEl, _this.contentEl);

    return _this;
  }

  _createClass(Dropdown, [{
    key: "setContentChildren",
    value: function setContentChildren() {
      this.contentEl.html('');

      if (arguments.length > 0) {
        var _this$contentEl;

        (_this$contentEl = this.contentEl).children.apply(_this$contentEl, arguments);
      }
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.title.html(title);
      this.hide();
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this;

      var contentEl = this.contentEl;
      contentEl.show();
      this.parent().active();
      (0, _event.bindClickoutside)(this.parent(), function () {
        _this3.hide();
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.parent().active(false);
      this.contentEl.hide();
      (0, _event.unbindClickoutside)(this.parent());
    }
  }]);

  return Dropdown;
}(_element.Element);

exports["default"] = Dropdown;
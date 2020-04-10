"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _icon = _interopRequireDefault(require("./icon"));

var _border_palette = _interopRequireDefault(require("./border_palette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DropdownBorder = /*#__PURE__*/function (_Dropdown) {
  _inherits(DropdownBorder, _Dropdown);

  function DropdownBorder() {
    var _this;

    _classCallCheck(this, DropdownBorder);

    var icon = new _icon["default"]('border-all');
    var borderPalette = new _border_palette["default"]();

    borderPalette.change = function (v) {
      _this.change(v);

      _this.hide();
    };

    return _this = _possibleConstructorReturn(this, (DropdownBorder.__proto__ || Object.getPrototypeOf(DropdownBorder)).call(this, icon, 'auto', false, 'bottom-left', borderPalette.el));
  }

  return DropdownBorder;
}(_dropdown["default"]);

exports["default"] = DropdownBorder;
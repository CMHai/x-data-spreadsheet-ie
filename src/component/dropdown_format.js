"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _element = require("./element");

var _format = require("../core/format");

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DropdownFormat = /*#__PURE__*/function (_Dropdown) {
  _inherits(DropdownFormat, _Dropdown);

  function DropdownFormat() {
    var _ref;

    var _this;

    _classCallCheck(this, DropdownFormat);

    var nformats = _format.baseFormats.slice(0);

    nformats.splice(2, 0, {
      key: 'divider'
    });
    nformats.splice(8, 0, {
      key: 'divider'
    });
    nformats = nformats.map(function (it) {
      var item = (0, _element.h)('div', "".concat(_config.cssPrefix, "-item"));

      if (it.key === 'divider') {
        item.addClass('divider');
      } else {
        item.child(it.title()).on('click', function () {
          _this.setTitle(it.title());

          _this.change(it);
        });
        if (it.label) item.child((0, _element.h)('div', 'label').html(it.label));
      }

      return item;
    });
    return _this = _possibleConstructorReturn(this, (_ref = DropdownFormat.__proto__ || Object.getPrototypeOf(DropdownFormat)).call.apply(_ref, [this, 'Normal', '220px', true, 'bottom-left'].concat(_toConsumableArray(nformats))));
  }

  _createClass(DropdownFormat, [{
    key: "setTitle",
    value: function setTitle(key) {
      for (var i = 0; i < _format.baseFormats.length; i += 1) {
        if (_format.baseFormats[i].key === key) {
          this.title.html(_format.baseFormats[i].title());
        }
      }

      this.hide();
    }
  }]);

  return DropdownFormat;
}(_dropdown["default"]);

exports["default"] = DropdownFormat;
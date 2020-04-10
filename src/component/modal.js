"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _icon = _interopRequireDefault(require("./icon"));

var _config = require("../config");

var _event = require("./event");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal = /*#__PURE__*/function () {
  function Modal(title, content) {
    var _this = this,
        _h;

    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '600px';

    _classCallCheck(this, Modal);

    this.title = title;
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-modal")).css('width', width).children((0, _element.h)('div', "".concat(_config.cssPrefix, "-modal-header")).children(new _icon["default"]('close').on('click.stop', function () {
      return _this.hide();
    }), this.title), (_h = (0, _element.h)('div', "".concat(_config.cssPrefix, "-modal-content"))).children.apply(_h, _toConsumableArray(content))).hide();
  }

  _createClass(Modal, [{
    key: "show",
    value: function show() {
      var _this2 = this;

      // dimmer
      this.dimmer = (0, _element.h)('div', "".concat(_config.cssPrefix, "-dimmer active"));
      document.body.appendChild(this.dimmer.el);

      var _this$el$show$box = this.el.show().box(),
          width = _this$el$show$box.width,
          height = _this$el$show$box.height;

      var _document$documentEle = document.documentElement,
          clientHeight = _document$documentEle.clientHeight,
          clientWidth = _document$documentEle.clientWidth;
      this.el.offset({
        left: (clientWidth - width) / 2,
        top: (clientHeight - height) / 3
      });

      window.xkeydownEsc = function (evt) {
        if (evt.keyCode === 27) {
          _this2.hide();
        }
      };

      (0, _event.bind)(window, 'keydown', window.xkeydownEsc);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.el.hide();
      document.body.removeChild(this.dimmer.el);
      (0, _event.unbind)(window, 'keydown', window.xkeydownEsc);
      delete window.xkeydownEsc;
    }
  }]);

  return Modal;
}();

exports["default"] = Modal;
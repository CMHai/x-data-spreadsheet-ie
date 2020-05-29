"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _event = require("./event");

var _config = require("../config");

var _icon = _interopRequireDefault(require("./icon"));

var _form_input = _interopRequireDefault(require("./form_input"));

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _message = require("./message");

var _locale = require("../locale/locale");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var DropdownMore = /*#__PURE__*/function (_Dropdown) {
  _inherits(DropdownMore, _Dropdown);

  function DropdownMore(click) {
    var _this;

    _classCallCheck(this, DropdownMore);

    var icon = new _icon["default"]('ellipsis');
    _this = _possibleConstructorReturn(this, (DropdownMore.__proto__ || Object.getPrototypeOf(DropdownMore)).call(this, icon, 'auto', false, 'top-left'));
    _this.contentClick = click;
    return _this;
  }

  _createClass(DropdownMore, [{
    key: "reset",
    value: function reset(items) {
      var _this2 = this;

      var eles = items.map(function (it, i) {
        return (0, _element.h)('div', "".concat(_config.cssPrefix, "-item")).css('width', '150px').css('font-weight', 'normal').on('click', function () {
          _this2.contentClick(i);

          _this2.hide();
        }).child(it);
      });
      this.setContentChildren.apply(this, _toConsumableArray(eles));
    }
  }, {
    key: "setTitle",
    value: function setTitle() {}
  }]);

  return DropdownMore;
}(_dropdown["default"]);

var menuItems = [{
  key: 'delete',
  title: (0, _locale.tf)('contextmenu.deleteSheet')
}];

function buildMenuItem(item) {
  var _this3 = this;

  return (0, _element.h)('div', "".concat(_config.cssPrefix, "-item")).child(item.title()).on('click', function () {
    _this3.itemClick(item.key);

    _this3.hide();
  });
}

function buildMenu() {
  var _this4 = this;

  return menuItems.map(function (it) {
    return buildMenuItem.call(_this4, it);
  });
}

var ContextMenu = /*#__PURE__*/function () {
  function ContextMenu() {
    var _h$css;

    _classCallCheck(this, ContextMenu);

    this.el = (_h$css = (0, _element.h)('div', "".concat(_config.cssPrefix, "-contextmenu")).css('width', '160px')).children.apply(_h$css, _toConsumableArray(buildMenu.call(this))).hide();

    this.itemClick = function () {};
  }

  _createClass(ContextMenu, [{
    key: "hide",
    value: function hide() {
      var el = this.el;
      el.hide();
      (0, _event.unbindClickoutside)(el);
    }
  }, {
    key: "setOffset",
    value: function setOffset(offset) {
      var el = this.el;
      el.offset(offset);
      el.show();
      (0, _event.bindClickoutside)(el);
    }
  }]);

  return ContextMenu;
}();

var Bottombar = /*#__PURE__*/function () {
  function Bottombar() {
    var _this5 = this;

    var addFunc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    var swapFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var deleteFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var updateFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    _classCallCheck(this, Bottombar);

    this.swapFunc = swapFunc;
    this.updateFunc = updateFunc;
    this.dataNames = [];
    this.activeEl = null;
    this.deleteEl = null;
    this.items = [];
    this.moreEl = new DropdownMore(function (i) {
      _this5.clickSwap2(_this5.items[i]);
    });
    this.contextMenu = new ContextMenu();
    this.contextMenu.itemClick = deleteFunc;
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-bottombar")).children(this.contextMenu.el, this.menuEl = (0, _element.h)('ul', "".concat(_config.cssPrefix, "-menu")).child((0, _element.h)('li', '').children(new _icon["default"]('add').on('click', function () {
      if (_this5.dataNames.length < 10) {
        addFunc();
      } else {
        (0, _message.xtoast)('tip', 'it less than or equal to 10');
      }
    }), (0, _element.h)('span', '').child(this.moreEl))));
  }

  _createClass(Bottombar, [{
    key: "addItem",
    value: function addItem(name, active) {
      var _this6 = this;

      this.dataNames.push(name);
      var item = (0, _element.h)('li', active ? 'active' : '').child(name);
      item.on('click', function () {
        _this6.clickSwap2(item);
      }).on('contextmenu', function (evt) {
        var _evt$target = evt.target,
            offsetLeft = _evt$target.offsetLeft,
            offsetHeight = _evt$target.offsetHeight;

        _this6.contextMenu.setOffset({
          left: offsetLeft,
          bottom: offsetHeight + 1
        });

        _this6.deleteEl = item;
      }).on('dblclick', function () {
        var v = item.html();
        var input = new _form_input["default"]('auto', '');
        input.val(v);
        input.input.on('blur', function (_ref) {
          var target = _ref.target;
          var value = target.value;

          var nindex = _this6.dataNames.findIndex(function (it) {
            return it === v;
          });

          _this6.renameItem(nindex, value);
          /*
          this.dataNames.splice(nindex, 1, value);
          this.moreEl.reset(this.dataNames);
          item.html('').child(value);
          this.updateFunc(nindex, value);
          */

        });
        item.html('').child(input.el);
        input.focus();
      });

      if (active) {
        this.clickSwap(item);
      }

      this.items.push(item);
      this.menuEl.child(item);
      this.moreEl.reset(this.dataNames);
    }
  }, {
    key: "renameItem",
    value: function renameItem(index, value) {
      this.dataNames.splice(index, 1, value);
      this.moreEl.reset(this.dataNames);
      this.items[index].html('').child(value);
      this.updateFunc(index, value);
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this7 = this;

      this.items.forEach(function (it) {
        _this7.menuEl.removeChild(it.el);
      });
      this.items = [];
      this.dataNames = [];
      this.moreEl.reset(this.dataNames);
    }
  }, {
    key: "deleteItem",
    value: function deleteItem() {
      var activeEl = this.activeEl,
          deleteEl = this.deleteEl;

      if (this.items.length > 1) {
        var index = this.items.findIndex(function (it) {
          return it === deleteEl;
        });
        this.items.splice(index, 1);
        this.dataNames.splice(index, 1);
        this.menuEl.removeChild(deleteEl.el);
        this.moreEl.reset(this.dataNames);

        if (activeEl === deleteEl) {
          var _this$items = _slicedToArray(this.items, 1),
              f = _this$items[0];

          this.activeEl = f;
          this.activeEl.toggle();
          return [index, 0];
        }

        return [index, -1];
      }

      return [-1];
    }
  }, {
    key: "clickSwap2",
    value: function clickSwap2(item) {
      var index = this.items.findIndex(function (it) {
        return it === item;
      });
      this.clickSwap(item);
      this.activeEl.toggle();
      this.swapFunc(index);
    }
  }, {
    key: "clickSwap",
    value: function clickSwap(item) {
      if (this.activeEl !== null) {
        this.activeEl.toggle();
      }

      this.activeEl = item;
    }
  }]);

  return Bottombar;
}();

exports["default"] = Bottombar;
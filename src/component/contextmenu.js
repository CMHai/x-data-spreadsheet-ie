"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _event = require("./event");

var _config = require("../config");

var _locale = require("../locale/locale");

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

var menuItems = [{
  key: 'copy',
  title: (0, _locale.tf)('contextmenu.copy'),
  label: 'Ctrl+C'
}, {
  key: 'cut',
  title: (0, _locale.tf)('contextmenu.cut'),
  label: 'Ctrl+X'
}, {
  key: 'paste',
  title: (0, _locale.tf)('contextmenu.paste'),
  label: 'Ctrl+V'
}, {
  key: 'paste-value',
  title: (0, _locale.tf)('contextmenu.pasteValue'),
  label: 'Ctrl+Shift+V'
}, {
  key: 'paste-format',
  title: (0, _locale.tf)('contextmenu.pasteFormat'),
  label: 'Ctrl+Alt+V'
}, {
  key: 'divider'
}, {
  key: 'insert-row',
  title: (0, _locale.tf)('contextmenu.insertRow')
}, {
  key: 'insert-column',
  title: (0, _locale.tf)('contextmenu.insertColumn')
}, {
  key: 'divider'
}, {
  key: 'delete-row',
  title: (0, _locale.tf)('contextmenu.deleteRow')
}, {
  key: 'delete-column',
  title: (0, _locale.tf)('contextmenu.deleteColumn')
}, {
  key: 'delete-cell-text',
  title: (0, _locale.tf)('contextmenu.deleteCellText')
}, {
  key: 'hide',
  title: (0, _locale.tf)('contextmenu.hide')
}, {
  key: 'divider'
}, {
  key: 'validation',
  title: (0, _locale.tf)('contextmenu.validation')
}, {
  key: 'divider'
}, {
  key: 'cell-printable',
  title: (0, _locale.tf)('contextmenu.cellprintable')
}, {
  key: 'cell-non-printable',
  title: (0, _locale.tf)('contextmenu.cellnonprintable')
},
 {
//   key: 'divider'
// }, {
//   key: 'cell-editable',
//   title: (0, _locale.tf)('contextmenu.celleditable')
// }, {
//   key: 'cell-non-editable',
//   title: (0, _locale.tf)('contextmenu.cellnoneditable')
// }
];

function buildMenuItem(item) {
  var _this = this;

  if (item.key === 'divider') {
    return (0, _element.h)('div', "".concat(_config.cssPrefix, "-item divider"));
  }

  return (0, _element.h)('div', "".concat(_config.cssPrefix, "-item")).on('click', function () {
    _this.itemClick(item.key);

    _this.hide();
  }).children(item.title(), (0, _element.h)('div', 'label').child(item.label || ''));
}

function buildMenu() {
  var _this2 = this;

  return menuItems.map(function (it) {
    return buildMenuItem.call(_this2, it);
  });
}

var ContextMenu = /*#__PURE__*/function () {
  function ContextMenu(viewFn) {
    var _h;

    var isHide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, ContextMenu);

    this.menuItems = buildMenu.call(this);
    this.el = (_h = (0, _element.h)('div', "".concat(_config.cssPrefix, "-contextmenu"))).children.apply(_h, _toConsumableArray(this.menuItems)).hide();
    this.viewFn = viewFn;

    this.itemClick = function () {};

    this.isHide = isHide;
    this.setMode('range');
  } // row-col: the whole rows or the whole cols
  // range: select range


  _createClass(ContextMenu, [{
    key: "setMode",
    value: function setMode(mode) {
      var hideEl = this.menuItems[12];

      if (mode === 'row-col') {
        hideEl.show();
      } else {
        hideEl.hide();
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var el = this.el;
      el.hide();
      (0, _event.unbindClickoutside)(el);
    }
  }, {
    key: "setPosition",
    value: function setPosition(x, y) {
      if (this.isHide) return;
      var el = this.el;

      var _el$show$offset = el.show().offset(),
          width = _el$show$offset.width;

      var view = this.viewFn();
      var vhf = view.height / 2;
      var left = x;

      if (view.width - x <= width) {
        left -= width;
      }

      el.css('left', "".concat(left, "px"));

      if (y > vhf) {
        el.css('bottom', "".concat(view.height - y, "px")).css('max-height', "".concat(y, "px")).css('top', 'auto');
      } else {
        el.css('top', "".concat(y, "px")).css('max-height', "".concat(view.height - y, "px")).css('bottom', 'auto');
      }

      (0, _event.bindClickoutside)(el);
    }
  }]);

  return ContextMenu;
}();

exports["default"] = ContextMenu;
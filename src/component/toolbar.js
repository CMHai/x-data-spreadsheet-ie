"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _event = require("./event");

var _tooltip = _interopRequireDefault(require("./tooltip"));

var _dropdown_font = _interopRequireDefault(require("./dropdown_font"));

var _dropdown_fontsize = _interopRequireDefault(require("./dropdown_fontsize"));

var _dropdown_format = _interopRequireDefault(require("./dropdown_format"));

var _dropdown_formula = _interopRequireDefault(require("./dropdown_formula"));

var _dropdown_color = _interopRequireDefault(require("./dropdown_color"));

var _dropdown_align = _interopRequireDefault(require("./dropdown_align"));

var _dropdown_border = _interopRequireDefault(require("./dropdown_border"));

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _icon = _interopRequireDefault(require("./icon"));

var _config = require("../config");

var _locale = require("../locale/locale");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function buildIcon(name) {
  return new _icon["default"](name);
}

function buildButton(tooltipdata) {
  return (0, _element.h)('div', "".concat(_config.cssPrefix, "-toolbar-btn")).on('mouseenter', function (evt) {
    (0, _tooltip["default"])(tooltipdata, evt.target);
  }).attr('data-tooltip', tooltipdata);
}

function buildDivider() {
  return (0, _element.h)('div', "".concat(_config.cssPrefix, "-toolbar-divider"));
}

function buildButtonWithIcon(tooltipdata, iconName) {
  var change = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  return buildButton(tooltipdata).child(buildIcon(iconName)).on('click', function () {
    return change();
  });
}

function bindDropdownChange() {
  var _this = this;

  this.ddFormat.change = function (it) {
    return _this.change('format', it.key);
  };

  this.ddFont.change = function (it) {
    return _this.change('font-name', it.key);
  };

  this.ddFormula.change = function (it) {
    return _this.change('formula', it.key);
  };

  this.ddFontSize.change = function (it) {
    return _this.change('font-size', it.pt);
  };

  this.ddTextColor.change = function (it) {
    return _this.change('color', it);
  };

  this.ddFillColor.change = function (it) {
    return _this.change('bgcolor', it);
  };

  this.ddAlign.change = function (it) {
    return _this.change('align', it);
  };

  this.ddVAlign.change = function (it) {
    return _this.change('valign', it);
  };

  this.ddBorder.change = function (it) {
    return _this.change('border', it);
  };
}

function toggleChange(type) {
  var elName = type;
  var types = type.split('-');

  if (types.length > 1) {
    types.forEach(function (it, i) {
      if (i === 0) elName = it;else elName += it[0].toUpperCase() + it.substring(1);
    });
  }

  var el = this["".concat(elName, "El")];
  el.toggle();
  this.change(type, el.hasClass('active'));
}

var DropdownMore = /*#__PURE__*/function (_Dropdown) {
  _inherits(DropdownMore, _Dropdown);

  function DropdownMore() {
    var _this2;

    _classCallCheck(this, DropdownMore);

    var icon = new _icon["default"]('ellipsis');
    var moreBtns = (0, _element.h)('div', "".concat(_config.cssPrefix, "-toolbar-more"));
    _this2 = _possibleConstructorReturn(this, (DropdownMore.__proto__ || Object.getPrototypeOf(DropdownMore)).call(this, icon, 'auto', false, 'bottom-right', moreBtns));
    _this2.moreBtns = moreBtns;

    _this2.contentEl.css('max-width', '420px');

    return _this2;
  }

  return DropdownMore;
}(_dropdown["default"]);

function initBtns2() {
  this.btns2 = this.btnChildren.map(function (it) {
    var rect = it.box();

    var _it$computedStyle = it.computedStyle(),
        marginLeft = _it$computedStyle.marginLeft,
        marginRight = _it$computedStyle.marginRight;

    return [it, rect.width + parseInt(marginLeft, 10) + parseInt(marginRight, 10)];
  });
}

function moreResize() {
  var _btns$html, _moreBtns$html;

  var el = this.el,
      btns = this.btns,
      moreEl = this.moreEl,
      ddMore = this.ddMore,
      btns2 = this.btns2;
  var moreBtns = ddMore.moreBtns,
      contentEl = ddMore.contentEl;
  el.css('width', "".concat(this.widthFn() - 60, "px"));
  var elBox = el.box();
  var sumWidth = 160;
  var sumWidth2 = 12;
  var list1 = [];
  var list2 = [];
  btns2.forEach(function (_ref, index) {
    var _ref2 = _slicedToArray(_ref, 2),
        it = _ref2[0],
        w = _ref2[1];

    sumWidth += w;

    if (index === btns2.length - 1 || sumWidth < elBox.width) {
      list1.push(it);
    } else {
      sumWidth2 += w;
      list2.push(it);
    }
  });

  (_btns$html = btns.html('')).children.apply(_btns$html, list1);

  (_moreBtns$html = moreBtns.html('')).children.apply(_moreBtns$html, list2);

  contentEl.css('width', "".concat(sumWidth2, "px"));

  if (list2.length > 0) {
    moreEl.show();
  } else {
    moreEl.hide();
  }
}

var Toolbar = /*#__PURE__*/function () {
  function Toolbar(data, widthFn) {
    var _this3 = this,
        _h;

    var isHide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Toolbar);

    this.data = data;

    this.change = function () {};

    this.widthFn = widthFn;
    var style = data.defaultStyle(); // console.log('data:', data);

    this.ddFormat = new _dropdown_format["default"]();
    this.ddFont = new _dropdown_font["default"]();
    this.ddFormula = new _dropdown_formula["default"]();
    this.ddFontSize = new _dropdown_fontsize["default"]();
    this.ddTextColor = new _dropdown_color["default"]('text-color', style.color);
    this.ddFillColor = new _dropdown_color["default"]('fill-color', style.bgcolor);
    this.ddAlign = new _dropdown_align["default"](['left', 'center', 'right'], style.align);
    this.ddVAlign = new _dropdown_align["default"](['top', 'middle', 'bottom'], style.valign);
    this.ddBorder = new _dropdown_border["default"]();
    this.ddMore = new DropdownMore();
    this.btnChildren = [this.undoEl = buildButtonWithIcon("".concat((0, _locale.t)('toolbar.undo'), " (Ctrl+Z)"), 'undo', function () {
      return _this3.change('undo');
    }), this.redoEl = buildButtonWithIcon("".concat((0, _locale.t)('toolbar.undo'), " (Ctrl+Y)"), 'redo', function () {
      return _this3.change('redo');
    }), // this.printEl = buildButtonWithIcon('Print (Ctrl+P)', 'print', () => this.change('print')),
    this.paintformatEl = buildButtonWithIcon("".concat((0, _locale.t)('toolbar.paintformat')), 'paintformat', function () {
      return toggleChange.call(_this3, 'paintformat');
    }), this.clearformatEl = buildButtonWithIcon("".concat((0, _locale.t)('toolbar.clearformat')), 'clearformat', function () {
      return _this3.change('clearformat');
    }), buildDivider(), buildButton("".concat((0, _locale.t)('toolbar.format'))).child(this.ddFormat.el), buildDivider(), buildButton("".concat((0, _locale.t)('toolbar.font'))).child(this.ddFont.el), buildButton("".concat((0, _locale.t)('toolbar.fontSize'))).child(this.ddFontSize.el), buildDivider(), this.fontBoldEl = buildButtonWithIcon("".concat((0, _locale.t)('toolbar.fontBold'), " (Ctrl+B)"), 'bold', function () {
      return toggleChange.call(_this3, 'font-bold');
    }), this.fontItalicEl = buildButtonWithIcon("".concat((0, _locale.t)('toolbar.fontItalic'), " (Ctrl+I)"), 'italic', function () {
      return toggleChange.call(_this3, 'font-italic');
    }), this.underlineEl = buildButtonWithIcon("".concat((0, _locale.t)('toolbar.underline'), " (Ctrl+U)"), 'underline', function () {
      return toggleChange.call(_this3, 'underline');
    }), this.strikeEl = buildButtonWithIcon("".concat((0, _locale.t)('toolbar.strike')), 'strike', function () {
      return toggleChange.call(_this3, 'strike');
    }), buildButton("".concat((0, _locale.t)('toolbar.textColor'))).child(this.ddTextColor.el), buildDivider(), buildButton("".concat((0, _locale.t)('toolbar.fillColor'))).child(this.ddFillColor.el), buildButton("".concat((0, _locale.t)('toolbar.border'))).child(this.ddBorder.el), this.mergeEl = buildButtonWithIcon("".concat((0, _locale.t)('toolbar.merge')), 'merge', function () {
      return toggleChange.call(_this3, 'merge');
    }), buildDivider(), buildButton("".concat((0, _locale.t)('toolbar.align'))).child(this.ddAlign.el), buildButton("".concat((0, _locale.t)('toolbar.valign'))).child(this.ddVAlign.el), this.textwrapEl = buildButtonWithIcon("".concat((0, _locale.t)('toolbar.textwrap')), 'textwrap', function () {
      return toggleChange.call(_this3, 'textwrap');
    }), buildDivider(), // this.linkEl = buildButtonWithIcon('Insert link', 'link'),
    // this.chartEl = buildButtonWithIcon('Insert chart', 'chart'),
    this.freezeEl = buildButtonWithIcon("".concat((0, _locale.t)('toolbar.freeze')), 'freeze', function () {
      return toggleChange.call(_this3, 'freeze');
    }), this.autofilterEl = buildButtonWithIcon("".concat((0, _locale.t)('toolbar.autofilter')), 'autofilter', function () {
      return toggleChange.call(_this3, 'autofilter');
    }), buildButton("".concat((0, _locale.t)('toolbar.formula'))).child(this.ddFormula.el), // buildDivider(),
    this.moreEl = buildButton("".concat((0, _locale.t)('toolbar.more'))).child(this.ddMore.el).hide()];
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-toolbar"));
    this.btns = (_h = (0, _element.h)('div', "".concat(_config.cssPrefix, "-toolbar-btns"))).children.apply(_h, _toConsumableArray(this.btnChildren));
    this.el.child(this.btns);
    if (isHide) this.el.hide();
    bindDropdownChange.call(this);
    this.reset();
    setTimeout(function () {
      initBtns2.call(_this3);
      moreResize.call(_this3);
    }, 0);
    (0, _event.bind)(window, 'resize', function () {
      moreResize.call(_this3);
    });
  }

  _createClass(Toolbar, [{
    key: "paintformatActive",
    value: function paintformatActive() {
      return this.paintformatEl.hasClass('active');
    }
  }, {
    key: "paintformatToggle",
    value: function paintformatToggle() {
      this.paintformatEl.toggle();
    }
  }, {
    key: "trigger",
    value: function trigger(type) {
      toggleChange.call(this, type);
    }
  }, {
    key: "reset",
    value: function reset() {
      var data = this.data;
      var style = data.getSelectedCellStyle();
      var cell = data.getSelectedCell(); // console.log('canUndo:', data.canUndo());

      this.undoEl.disabled(!data.canUndo());
      this.redoEl.disabled(!data.canRedo());
      this.mergeEl.active(data.canUnmerge()).disabled(!data.selector.multiple());
      this.autofilterEl.active(!data.canAutofilter()); // this.mergeEl.disabled();
      // console.log('selectedCell:', style, cell);

      var font = style.font;
      this.ddFont.setTitle(font.name);
      this.ddFontSize.setTitle(font.size);
      this.fontBoldEl.active(font.bold);
      this.fontItalicEl.active(font.italic);
      this.underlineEl.active(style.underline);
      this.strikeEl.active(style.strike);
      this.ddTextColor.setTitle(style.color);
      this.ddFillColor.setTitle(style.bgcolor);
      this.ddAlign.setTitle(style.align);
      this.ddVAlign.setTitle(style.valign);
      this.textwrapEl.active(style.textwrap); // console.log('freeze is Active:', data.freezeIsActive());

      this.freezeEl.active(data.freezeIsActive());

      if (cell) {
        if (cell.format) {
          this.ddFormat.setTitle(cell.format);
        }
      }
    }
  }]);

  return Toolbar;
}();

exports["default"] = Toolbar;
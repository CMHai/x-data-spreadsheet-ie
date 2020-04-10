"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _align = _interopRequireDefault(require("./align"));

var _valign = _interopRequireDefault(require("./valign"));

var _autofilter = _interopRequireDefault(require("./autofilter"));

var _bold = _interopRequireDefault(require("./bold"));

var _italic = _interopRequireDefault(require("./italic"));

var _strike = _interopRequireDefault(require("./strike"));

var _underline = _interopRequireDefault(require("./underline"));

var _border = _interopRequireDefault(require("./border"));

var _clearformat = _interopRequireDefault(require("./clearformat"));

var _paintformat = _interopRequireDefault(require("./paintformat"));

var _text_color = _interopRequireDefault(require("./text_color"));

var _fill_color = _interopRequireDefault(require("./fill_color"));

var _font_size = _interopRequireDefault(require("./font_size"));

var _font = _interopRequireDefault(require("./font"));

var _format = _interopRequireDefault(require("./format"));

var _formula = _interopRequireDefault(require("./formula"));

var _freeze = _interopRequireDefault(require("./freeze"));

var _merge = _interopRequireDefault(require("./merge"));

var _redo = _interopRequireDefault(require("./redo"));

var _undo = _interopRequireDefault(require("./undo"));

var _print = _interopRequireDefault(require("./print"));

var _textwrap = _interopRequireDefault(require("./textwrap"));

var _more = _interopRequireDefault(require("./more"));

var _element = require("../element");

var _config = require("../../config");

var _event = require("../event");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function buildDivider() {
  return (0, _element.h)('div', "".concat(_config.cssPrefix, "-toolbar-divider"));
}

function initBtns2() {
  var _this = this;
  this.btns2 = [];
  this.items.forEach(function (it) {
    if (Array.isArray(it)) {
      it.forEach(function (_ref) {
        var el = _ref.el;
        var rect = el.box();

        var _el$computedStyle = el.computedStyle(),
          marginLeft = _el$computedStyle.marginLeft,
          marginRight = _el$computedStyle.marginRight;

        _this.btns2.push([el, rect.width + parseInt(marginLeft, 10) + parseInt(marginRight, 10)]);
      });
    } else {
      var rect = it.box();

      var _it$computedStyle = it.computedStyle(),
        marginLeft = _it$computedStyle.marginLeft,
        marginRight = _it$computedStyle.marginRight;

      _this.btns2.push([it, rect.width + parseInt(marginLeft, 10) + parseInt(marginRight, 10)]);
    }
  });
}

function moreResize() {
  var _btns$html, _moreBtns$html;

  var el = this.el,
    btns = this.btns,
    moreEl = this.moreEl,
    btns2 = this.btns2;

  var _moreEl$dd = moreEl.dd,
    moreBtns = _moreEl$dd.moreBtns,
    contentEl = _moreEl$dd.contentEl;
  el.css('width', "".concat(this.widthFn() - 60, "px"));
  var elBox = el.box();
  var sumWidth = 160;
  var sumWidth2 = 12;
  var list1 = [];
  var list2 = [];
  
  btns2.forEach(function (_ref2, index) {
    var _ref3 = _slicedToArray(_ref2, 2),
      it = _ref3[0],
      w = _ref3[1];

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
    var _this2 = this;

    var isHide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Toolbar);

    this.data = data;

    this.change = function () { };

    this.widthFn = widthFn;
    this.isHide = isHide;
    var style = data.defaultStyle();
    this.items = [[this.undoEl = new _undo["default"](), this.redoEl = new _redo["default"](), new _print["default"](), this.paintformatEl = new _paintformat["default"](), this.clearformatEl = new _clearformat["default"]()], buildDivider(), [this.formatEl = new _format["default"]()], buildDivider(), [this.fontEl = new _font["default"](), this.fontSizeEl = new _font_size["default"]()], buildDivider(), [this.boldEl = new _bold["default"](), this.italicEl = new _italic["default"](), this.underlineEl = new _underline["default"](), this.strikeEl = new _strike["default"](), this.textColorEl = new _text_color["default"](style.color)], buildDivider(), [this.fillColorEl = new _fill_color["default"](style.bgcolor), this.borderEl = new _border["default"](), this.mergeEl = new _merge["default"]()], buildDivider(), [this.alignEl = new _align["default"](style.align), this.valignEl = new _valign["default"](style.valign), this.textwrapEl = new _textwrap["default"]()], buildDivider(), [this.freezeEl = new _freeze["default"](), this.autofilterEl = new _autofilter["default"](), this.formulaEl = new _formula["default"](), this.moreEl = new _more["default"]()]];

    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-toolbar"));
    this.btns = (0, _element.h)('div', "".concat(_config.cssPrefix, "-toolbar-btns"));

    // this.undoEl = new _undo["default"]();
    // this.redoEl = new _redo["default"]();
    // this.paintformatEl = new _paintformat["default"]();
    // this.clearformatEl = new _clearformat["default"]();
    // this.formatEl = new _format["default"]();
    // this.fontEl = new _font["default"]();
    // this.fontSizeEl = new _font_size["default"]();
    // this.boldEl = new _bold["default"]();
    // this.italicEl = new _italic["default"]();
    // this.underlineEl = new _underline["default"]()
    // this.strikeEl = new _strike["default"]()
    // this.textColorEl = new _text_color["default"](style.color)
    // this.fillColorEl = new _fill_color["default"](style.bgcolor)
    // this.borderEl = new _border["default"]()
    // this.mergeEl = new _merge["default"]()
    // this.alignEl = new _align["default"](style.align)
    // this.valignEl = new _valign["default"](style.valign)
    // this.textwrapEl = new _textwrap["default"]()
    // this.freezeEl = new _freeze["default"]()
    // this.autofilterEl = new _autofilter["default"]()
    // this.formulaEl = new _formula["default"]()
    // this.moreEl = new _more["default"]()

    // var br = buildDivider();

    // [this.undoEl, this.redoEl, new _print["default"](), this.paintformatEl, this.clearformatEl].forEach(function (i, index) {
    //   console.log('item00', i)
    //   _this2.btns.child(i.el);
    //   i.change = function () {
    //     _this2.change.apply(_this2, arguments);
    //   };
    // });
    // _this2.btns.child(br.el);

    // [this.formatEl].forEach(function (i, index) {
    //   console.log('item00', i)
    //   _this2.btns.child(i.el);
    //   i.change = function () {
    //     _this2.change.apply(_this2, arguments);
    //   };
    // });
    // _this2.btns.child(br.el);

    // [this.fontEl, this.fontSizeEl].forEach(function (i, index) {
    //   console.log('item00', i)
    //   _this2.btns.child(i.el);
    //   i.change = function () {
    //     _this2.change.apply(_this2, arguments);
    //   };
    // });
    // _this2.btns.child(br.el);

    // [this.boldEl, this.italicEl, this.underlineEl, this.strikeEl, this.textColorEl].forEach(function (i, index) {
    //   console.log('item00', i)
    //   _this2.btns.child(i.el);
    //   i.change = function () {
    //     _this2.change.apply(_this2, arguments);
    //   };
    // });
    // _this2.btns.child(br.el);

    // [this.fillColorEl, this.borderEl, this.mergeEl].forEach(function (i, index) {
    //   console.log('item00', i)
    //   _this2.btns.child(i.el);
    //   i.change = function () {
    //     _this2.change.apply(_this2, arguments);
    //   };
    // });
    // _this2.btns.child(br.el);
    // [this.alignEl, this.valignEl, this.textwrapEl].forEach(function (i, index) {
    //   console.log('item00', i)
    //   _this2.btns.child(i.el);
    //   i.change = function () {
    //     _this2.change.apply(_this2, arguments);
    //   };
    // });
    // _this2.btns.child(br.el);
    // [this.freezeEl, this.autofilterEl, this.formulaEl, this.moreEl].forEach(function (i, index) {
    //   console.log('item00', i)
    //   _this2.btns.child(i.el);
    //   i.change = function () {
    //     _this2.change.apply(_this2, arguments);
    //   };
    // });
    // _this2.btns.child(br.el);


    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      var IE =true;
      this.items.forEach(function (it) {
        if (Array.isArray(it)) {
          it.forEach(function (i, index) {
            // _this2.btns.child(i.el);
            i.change = function () {
              _this2.change.apply(_this2, arguments);
            };
          });
        } else {
          _this2.btns.child(it.el);
        }
      });
    } else {
      var IE =false;
      this.items.forEach(function (it) {
        if (Array.isArray(it)) {
          it.forEach(function (i) {
            _this2.btns.child(i.el);

            i.change = function () {
              _this2.change.apply(_this2, arguments);
            };
          });
        } else {
          _this2.btns.child(it.el);
        }
      });
    }

    this.el.child(this.btns);
    if (isHide) {
      this.el.hide();
    } else {
      this.reset();
      setTimeout(function () {
        initBtns2.call(_this2);
        moreResize.call(_this2);
      }, 0);
      (0, _event.bind)(window, 'resize', function () {
        if(!IE){
          moreResize.call(_this2);
        }
      });
    }
  }

  _createClass(Toolbar, [{
    key: "paintformatActive",
    value: function paintformatActive() {
      return this.paintformatEl.active();
    }
  }, {
    key: "paintformatToggle",
    value: function paintformatToggle() {
      this.paintformatEl.toggle();
    }
  }, {
    key: "trigger",
    value: function trigger(type) {
      this["".concat(type, "El")].click();
    }
  }, {
    key: "resetData",
    value: function resetData(data) {
      this.data = data;
      this.reset();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.isHide) return;
      var data = this.data;
      var style = data.getSelectedCellStyle();
      var cell = data.getSelectedCell(); // console.log('canUndo:', data.canUndo());

      this.undoEl.setState(!data.canUndo());
      this.redoEl.setState(!data.canRedo());
      this.mergeEl.setState(data.canUnmerge(), !data.selector.multiple());
      this.autofilterEl.setState(!data.canAutofilter()); // this.mergeEl.disabled();
      // console.log('selectedCell:', style, cell);

      var font = style.font;
      this.fontEl.setState(font.name);
      this.fontSizeEl.setState(font.size);
      this.boldEl.setState(font.bold);
      this.italicEl.setState(font.italic);
      this.underlineEl.setState(style.underline);
      this.strikeEl.setState(style.strike);
      this.textColorEl.setState(style.color);
      this.fillColorEl.setState(style.bgcolor);
      this.alignEl.setState(style.align);
      this.valignEl.setState(style.valign);
      this.textwrapEl.setState(style.textwrap); // console.log('freeze is Active:', data.freezeIsActive());

      this.freezeEl.setState(data.freezeIsActive());

      if (cell) {
        if (cell.format) {
          this.formatEl.setState(cell.format);
        }
      }
    }
  }]);

  return Toolbar;
}();

exports["default"] = Toolbar;
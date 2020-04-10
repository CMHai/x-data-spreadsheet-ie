"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _suggest = _interopRequireDefault(require("./suggest"));

var _datepicker = _interopRequireDefault(require("./datepicker"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// import { mouseMoveUp } from '../event';
function resetTextareaSize() {
  var inputText = this.inputText;

  if (!/^\s*$/.test(inputText)) {
    var textlineEl = this.textlineEl,
        textEl = this.textEl,
        areaOffset = this.areaOffset;
    var txts = inputText.split('\n');
    var maxTxtSize = Math.max.apply(Math, _toConsumableArray(txts.map(function (it) {
      return it.length;
    })));
    var tlOffset = textlineEl.offset();
    var fontWidth = tlOffset.width / inputText.length;
    var tlineWidth = (maxTxtSize + 1) * fontWidth + 5;
    var maxWidth = this.viewFn().width - areaOffset.left - fontWidth;
    var h1 = txts.length;

    if (tlineWidth > areaOffset.width) {
      var twidth = tlineWidth;

      if (tlineWidth > maxWidth) {
        twidth = maxWidth;
        h1 += parseInt(tlineWidth / maxWidth, 10);
        h1 += tlineWidth % maxWidth > 0 ? 1 : 0;
      }

      textEl.css('width', "".concat(twidth, "px"));
    }

    h1 *= this.rowHeight;

    if (h1 > areaOffset.height) {
      textEl.css('height', "".concat(h1, "px"));
    }
  }
}

function insertText(_ref, itxt) {
  var target = _ref.target;
  var value = target.value,
      selectionEnd = target.selectionEnd;
  var ntxt = "".concat(value.slice(0, selectionEnd)).concat(itxt).concat(value.slice(selectionEnd));
  target.value = ntxt;
  target.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
  this.inputText = ntxt;
  this.textlineEl.html(ntxt);
  resetTextareaSize.call(this);
}

function keydownEventHandler(evt) {
  var keyCode = evt.keyCode,
      altKey = evt.altKey;
  if (keyCode !== 13 && keyCode !== 9) evt.stopPropagation();

  if (keyCode === 13 && altKey) {
    insertText.call(this, evt, '\n');
    evt.stopPropagation();
  }

  if (keyCode === 13 && !altKey) evt.preventDefault();
}

function inputEventHandler(evt) {
  var v = evt.target.value; // console.log(evt, 'v:', v);

  var suggest = this.suggest,
      textlineEl = this.textlineEl,
      validator = this.validator;
  var cell = this.cell;

  if (cell !== null) {
    if ('editable' in cell && cell.editable === true || cell.editable === undefined) {
      this.inputText = v;

      if (validator) {
        if (validator.type === 'list') {
          suggest.search(v);
        } else {
          suggest.hide();
        }
      } else {
        var start = v.lastIndexOf('=');

        if (start !== -1) {
          suggest.search(v.substring(start + 1));
        } else {
          suggest.hide();
        }
      }

      textlineEl.html(v);
      resetTextareaSize.call(this);
      this.change('input', v);
    } else {
      evt.target.value = '';
    }
  } else {
    this.inputText = v;

    if (validator) {
      if (validator.type === 'list') {
        suggest.search(v);
      } else {
        suggest.hide();
      }
    } else {
      var _start = v.lastIndexOf('=');

      if (_start !== -1) {
        suggest.search(v.substring(_start + 1));
      } else {
        suggest.hide();
      }
    }

    textlineEl.html(v);
    resetTextareaSize.call(this);
    this.change('input', v);
  }
}

function setTextareaRange(position) {
  var el = this.textEl.el;
  setTimeout(function () {
    el.focus();
    el.setSelectionRange(position, position);
  }, 0);
}

function _setText(text, position) {
  var textEl = this.textEl,
      textlineEl = this.textlineEl; // firefox bug

  textEl.el.blur();
  textEl.val(text);
  textlineEl.html(text);
  setTextareaRange.call(this, position);
}

function suggestItemClick(it) {
  var inputText = this.inputText,
      validator = this.validator;
  var position = 0;

  if (validator && validator.type === 'list') {
    this.inputText = it;
    position = this.inputText.length;
  } else {
    var start = inputText.lastIndexOf('=');
    var sit = inputText.substring(0, start + 1);
    var eit = inputText.substring(start + 1);

    if (eit.indexOf(')') !== -1) {
      eit = eit.substring(eit.indexOf(')'));
    } else {
      eit = '';
    }

    this.inputText = "".concat(sit + it.key, "("); // console.log('inputText:', this.inputText);

    position = this.inputText.length;
    this.inputText += ")".concat(eit);
  }

  _setText.call(this, this.inputText, position);
}

function resetSuggestItems() {
  this.suggest.setItems(this.formulas);
}

function dateFormat(d) {
  var month = d.getMonth() + 1;
  var date = d.getDate();
  if (month < 10) month = "0".concat(month);
  if (date < 10) date = "0".concat(date);
  return "".concat(d.getFullYear(), "-").concat(month, "-").concat(date);
}

var Editor = /*#__PURE__*/function () {
  function Editor(formulas, viewFn, rowHeight) {
    var _this = this;

    _classCallCheck(this, Editor);

    this.viewFn = viewFn;
    this.rowHeight = rowHeight;
    this.formulas = formulas;
    this.suggest = new _suggest["default"](formulas, function (it) {
      suggestItemClick.call(_this, it);
    });
    this.datepicker = new _datepicker["default"]();
    this.datepicker.change(function (d) {
      // console.log('d:', d);
      _this.setText(dateFormat(d));

      _this.clear();
    });
    this.areaEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-editor-area")).children(this.textEl = (0, _element.h)('textarea', '').on('input', function (evt) {
      return inputEventHandler.call(_this, evt);
    }).on('paste.stop', function () {}).on('keydown', function (evt) {
      return keydownEventHandler.call(_this, evt);
    }), this.textlineEl = (0, _element.h)('div', 'textline'), this.suggest.el, this.datepicker.el).on('mousemove.stop', function () {}).on('mousedown.stop', function () {});
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-editor")).child(this.areaEl).hide();
    this.suggest.bindInputEvents(this.textEl);
    this.areaOffset = null;
    this.freeze = {
      w: 0,
      h: 0
    };
    this.cell = null;
    this.inputText = '';

    this.change = function () {};
  }

  _createClass(Editor, [{
    key: "setFreezeLengths",
    value: function setFreezeLengths(width, height) {
      this.freeze.w = width;
      this.freeze.h = height;
    }
  }, {
    key: "clear",
    value: function clear() {
      // const { cell } = this;
      // const cellText = (cell && cell.text) || '';
      if (this.inputText !== '') {
        this.change('finished', this.inputText);
      }

      this.cell = null;
      this.areaOffset = null;
      this.inputText = '';
      this.el.hide();
      this.textEl.val('');
      this.textlineEl.html('');
      resetSuggestItems.call(this);
      this.datepicker.hide();
    }
  }, {
    key: "setOffset",
    value: function setOffset(offset) {
      var suggestPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
      var textEl = this.textEl,
          areaEl = this.areaEl,
          suggest = this.suggest,
          freeze = this.freeze,
          el = this.el;

      if (offset) {
        this.areaOffset = offset;
        var left = offset.left,
            top = offset.top,
            width = offset.width,
            height = offset.height,
            l = offset.l,
            t = offset.t; // console.log('left:', left, ',top:', top, ', freeze:', freeze);

        var elOffset = {
          left: 0,
          top: 0
        }; // top left

        if (freeze.w > l && freeze.h > t) {//
        } else if (freeze.w < l && freeze.h < t) {
          elOffset.left = freeze.w;
          elOffset.top = freeze.h;
        } else if (freeze.w > l) {
          elOffset.top = freeze.h;
        } else if (freeze.h > t) {
          elOffset.left = freeze.w;
        }

        el.offset(elOffset);
        areaEl.offset({
          left: left - elOffset.left - 0.8,
          top: top - elOffset.top - 0.8
        });
        textEl.offset({
          width: width - 9 + 0.8,
          height: height - 3 + 0.8
        });
        var sOffset = {
          left: 0
        };
        sOffset[suggestPosition] = height;
        suggest.setOffset(sOffset);
        suggest.hide();
      }
    }
  }, {
    key: "setCell",
    value: function setCell(cell, validator) {
      // console.log('::', validator);
      var el = this.el,
          datepicker = this.datepicker,
          suggest = this.suggest;
      el.show();
      this.cell = cell;
      var text = cell && cell.text || '';
      this.setText(text);
      this.validator = validator;

      if (validator) {
        var type = validator.type;

        if (type === 'date') {
          datepicker.show();

          if (!/^\s*$/.test(text)) {
            datepicker.setValue(text);
          }
        }

        if (type === 'list') {
          suggest.setItems(validator.values());
          suggest.search('');
        }
      }
    }
  }, {
    key: "setText",
    value: function setText(text) {
      this.inputText = text; // console.log('text>>:', text);

      _setText.call(this, text, text.length);

      resetTextareaSize.call(this);
    }
  }]);

  return Editor;
}();

exports["default"] = Editor;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _event = require("./event");

var _config = require("../config");

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

function inputMovePrev(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  var filterItems = this.filterItems;
  if (filterItems.length <= 0) return;
  if (this.itemIndex >= 0) filterItems[this.itemIndex].toggle();
  this.itemIndex -= 1;

  if (this.itemIndex < 0) {
    this.itemIndex = filterItems.length - 1;
  }

  filterItems[this.itemIndex].toggle();
}

function inputMoveNext(evt) {
  evt.stopPropagation();
  var filterItems = this.filterItems;
  if (filterItems.length <= 0) return;
  if (this.itemIndex >= 0) filterItems[this.itemIndex].toggle();
  this.itemIndex += 1;

  if (this.itemIndex > filterItems.length - 1) {
    this.itemIndex = 0;
  }

  filterItems[this.itemIndex].toggle();
}

function inputEnter(evt) {
  evt.preventDefault();
  var filterItems = this.filterItems;
  if (filterItems.length <= 0) return;
  evt.stopPropagation();
  if (this.itemIndex < 0) this.itemIndex = 0;
  filterItems[this.itemIndex].el.click();
  this.hide();
}

function inputKeydownHandler(evt) {
  var keyCode = evt.keyCode;

  if (evt.ctrlKey) {
    evt.stopPropagation();
  }

  switch (keyCode) {
    case 37:
      // left
      evt.stopPropagation();
      break;

    case 38:
      // up
      inputMovePrev.call(this, evt);
      break;

    case 39:
      // right
      evt.stopPropagation();
      break;

    case 40:
      // down
      inputMoveNext.call(this, evt);
      break;

    case 13:
      // enter
      inputEnter.call(this, evt);
      break;

    case 9:
      inputEnter.call(this, evt);
      break;

    default:
      evt.stopPropagation();
      break;
  }
}

var Suggest = /*#__PURE__*/function () {
  function Suggest(items, itemClick) {
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '200px';

    _classCallCheck(this, Suggest);

    this.filterItems = [];
    this.items = items;
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-suggest")).css('width', width).hide();
    this.itemClick = itemClick;
    this.itemIndex = -1;
  }

  _createClass(Suggest, [{
    key: "setOffset",
    value: function setOffset(v) {
      this.el.cssRemoveKeys('top', 'bottom').offset(v);
    }
  }, {
    key: "hide",
    value: function hide() {
      var el = this.el;
      this.filterItems = [];
      this.itemIndex = -1;
      el.hide();
      (0, _event.unbindClickoutside)(this.el.parent());
    }
  }, {
    key: "setItems",
    value: function setItems(items) {
      this.items = items; // this.search('');
    }
  }, {
    key: "search",
    value: function search(word) {
      var _this = this,
          _el$html;

      var items = this.items;

      if (!/^\s*$/.test(word)) {
        items = items.filter(function (it) {
          return (it.key || it).startsWith(word.toUpperCase());
        });
      }

      items = items.map(function (it) {
        var title = it.title;

        if (title) {
          if (typeof title === 'function') {
            title = title();
          }
        } else {
          title = it;
        }

        var item = (0, _element.h)('div', "".concat(_config.cssPrefix, "-item")).child(title).on('click.stop', function () {
          _this.itemClick(it);

          _this.hide();
        });

        if (it.label) {
          item.child((0, _element.h)('div', 'label').html(it.label));
        }

        return item;
      });
      this.filterItems = items;

      if (items.length <= 0) {
        return;
      }

      var el = this.el; // items[0].toggle();

      (_el$html = el.html('')).children.apply(_el$html, _toConsumableArray(items)).show();

      (0, _event.bindClickoutside)(el.parent(), function () {
        _this.hide();
      });
    }
  }, {
    key: "bindInputEvents",
    value: function bindInputEvents(input) {
      var _this2 = this;

      input.on('keydown', function (evt) {
        return inputKeydownHandler.call(_this2, evt);
      });
    }
  }]);

  return Suggest;
}();

exports["default"] = Suggest;
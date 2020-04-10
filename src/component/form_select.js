"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _suggest = _interopRequireDefault(require("./suggest"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormSelect = /*#__PURE__*/function () {
  function FormSelect(key, items, width) {
    var _this = this;

    var getTitle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (it) {
      return it;
    };
    var change = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

    _classCallCheck(this, FormSelect);

    this.key = key;
    this.getTitle = getTitle;

    this.vchange = function () {};

    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-form-select"));
    this.suggest = new _suggest["default"](items.map(function (it) {
      return {
        key: it,
        title: _this.getTitle(it)
      };
    }), function (it) {
      _this.itemClick(it.key);

      change(it.key);

      _this.vchange(it.key);
    }, width, this.el);
    this.el.children(this.itemEl = (0, _element.h)('div', 'input-text').html(this.getTitle(key)), this.suggest.el).on('click', function () {
      return _this.show();
    });
  }

  _createClass(FormSelect, [{
    key: "show",
    value: function show() {
      this.suggest.search('');
    }
  }, {
    key: "itemClick",
    value: function itemClick(it) {
      this.key = it;
      this.itemEl.html(this.getTitle(it));
    }
  }, {
    key: "val",
    value: function val(v) {
      if (v !== undefined) {
        this.key = v;
        this.itemEl.html(this.getTitle(v));
        return this;
      }

      return this.key;
    }
  }]);

  return FormSelect;
}();

exports["default"] = FormSelect;
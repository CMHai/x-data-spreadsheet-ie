"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _calendar = _interopRequireDefault(require("./calendar"));

var _element = require("./element");

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Datepicker = /*#__PURE__*/function () {
  function Datepicker() {
    _classCallCheck(this, Datepicker);

    this.calendar = new _calendar["default"](new Date());
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-datepicker")).child(this.calendar.el).hide();
  }

  _createClass(Datepicker, [{
    key: "setValue",
    value: function setValue(date) {
      // console.log(':::::::', date, typeof date, date instanceof string);
      var calendar = this.calendar;

      if (typeof date === 'string') {
        // console.log(/^\d{4}-\d{1,2}-\d{1,2}$/.test(date));
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(date)) {
          calendar.setValue(new Date(date.replace(new RegExp('-', 'g'), '/')));
        }
      } else if (_instanceof(date, Date)) {
        calendar.setValue(date);
      }

      return this;
    }
  }, {
    key: "change",
    value: function change(cb) {
      var _this = this;

      this.calendar.selectChange = function (d) {
        cb(d);

        _this.hide();
      };
    }
  }, {
    key: "show",
    value: function show() {
      this.el.show();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.el.hide();
    }
  }]);

  return Datepicker;
}();

exports["default"] = Datepicker;
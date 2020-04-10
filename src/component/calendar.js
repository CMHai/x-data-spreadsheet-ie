"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _icon = _interopRequireDefault(require("./icon"));

var _locale = require("../locale/locale");

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

function addMonth(date, step) {
  date.setMonth(date.getMonth() + step);
}

function weekday(date, index) {
  var d = new Date(date);
  d.setDate(index - date.getDay() + 1);
  return d;
}

function monthDays(year, month, cdate) {
  // the first day of month
  var startDate = new Date(year, month, 1, 23, 59, 59);
  var datess = [[], [], [], [], [], []];

  for (var i = 0; i < 6; i += 1) {
    for (var j = 0; j < 7; j += 1) {
      var index = i * 7 + j;
      var d = weekday(startDate, index);
      var disabled = d.getMonth() !== month; // console.log('d:', d, ', cdate:', cdate);

      var active = d.getMonth() === cdate.getMonth() && d.getDate() === cdate.getDate();
      datess[i][j] = {
        d: d,
        disabled: disabled,
        active: active
      };
    }
  }

  return datess;
}

var Calendar = /*#__PURE__*/function () {
  function Calendar(value) {
    var _this = this,
        _h;

    _classCallCheck(this, Calendar);

    this.value = value;
    this.cvalue = new Date(value);
    this.headerLeftEl = (0, _element.h)('div', 'calendar-header-left');
    this.bodyEl = (0, _element.h)('tbody', '');
    this.buildAll();
    this.el = (0, _element.h)('div', 'x-spreadsheet-calendar').children((0, _element.h)('div', 'calendar-header').children(this.headerLeftEl, (0, _element.h)('div', 'calendar-header-right').children((0, _element.h)('a', 'calendar-prev').on('click.stop', function () {
      return _this.prev();
    }).child(new _icon["default"]('chevron-left')), (0, _element.h)('a', 'calendar-next').on('click.stop', function () {
      return _this.next();
    }).child(new _icon["default"]('chevron-right')))), (0, _element.h)('table', 'calendar-body').children((0, _element.h)('thead', '').child((_h = (0, _element.h)('tr', '')).children.apply(_h, _toConsumableArray((0, _locale.t)('calendar.weeks').map(function (week) {
      return (0, _element.h)('th', 'cell').child(week);
    })))), this.bodyEl));

    this.selectChange = function () {};
  }

  _createClass(Calendar, [{
    key: "setValue",
    value: function setValue(value) {
      this.value = value;
      this.cvalue = new Date(value);
      this.buildAll();
    }
  }, {
    key: "prev",
    value: function prev() {
      var value = this.value;
      addMonth(value, -1);
      this.buildAll();
    }
  }, {
    key: "next",
    value: function next() {
      var value = this.value;
      addMonth(value, 1);
      this.buildAll();
    }
  }, {
    key: "buildAll",
    value: function buildAll() {
      this.buildHeaderLeft();
      this.buildBody();
    }
  }, {
    key: "buildHeaderLeft",
    value: function buildHeaderLeft() {
      var value = this.value;
      this.headerLeftEl.html("".concat((0, _locale.t)('calendar.months')[value.getMonth()], " ").concat(value.getFullYear()));
    }
  }, {
    key: "buildBody",
    value: function buildBody() {
      var _this2 = this,
          _bodyEl$html;

      var value = this.value,
          cvalue = this.cvalue,
          bodyEl = this.bodyEl;
      var mDays = monthDays(value.getFullYear(), value.getMonth(), cvalue);
      var trs = mDays.map(function (it) {
        var _h2;

        var tds = it.map(function (it1) {
          var cls = 'cell';
          if (it1.disabled) cls += ' disabled';
          if (it1.active) cls += ' active';
          return (0, _element.h)('td', '').child((0, _element.h)('div', cls).on('click.stop', function () {
            _this2.selectChange(it1.d);
          }).child(it1.d.getDate().toString()));
        });
        return (_h2 = (0, _element.h)('tr', '')).children.apply(_h2, _toConsumableArray(tds));
      });

      (_bodyEl$html = bodyEl.html('')).children.apply(_bodyEl$html, _toConsumableArray(trs));
    }
  }]);

  return Calendar;
}();

exports["default"] = Calendar;
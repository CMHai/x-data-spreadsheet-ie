"use strict";

require("./polyfill");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spreadsheet = exports["default"] = void 0;

var _element = require("./component/element");

var _data_proxy = _interopRequireDefault(require("./core/data_proxy"));

var _sheet = _interopRequireDefault(require("./component/sheet"));

var _bottombar = _interopRequireDefault(require("./component/bottombar"));

var _config = require("./config");

var _locale2 = require("./locale/locale");

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Spreadsheet = /*#__PURE__*/function () {
  function Spreadsheet(selectors) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Spreadsheet);

    var targetEl = selectors;
    this.options = options;
    this.sheetIndex = 1;
    this.datas = [];

    if (typeof selectors === 'string') {
      targetEl = document.querySelector(selectors);
    }

    this.bottombar = new _bottombar["default"](function () {
      var d = _this.addSheet();

      _this.sheet.resetData(d);
    }, function (index) {
      var d = _this.datas[index];

      _this.sheet.resetData(d);
    }, function () {
      _this.deleteSheet();
    }, function (index, value) {
      _this.datas[index].name = value;
    });
    this.data = this.addSheet();
    var rootEl = (0, _element.h)('div', "".concat(_config.cssPrefix)).on('contextmenu', function (evt) {
      return evt.preventDefault();
    }); // create canvas element

    targetEl.appendChild(rootEl.el);
    this.sheet = new _sheet["default"](rootEl, this.data);
    rootEl.child(this.bottombar.el);
  }

  _createClass(Spreadsheet, [{
    key: "addSheet",
    value: function addSheet(name) {
      var _this2 = this;

      var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var n = name || "sheet".concat(this.sheetIndex);
      var d = new _data_proxy["default"](n, this.options);

      d.change = function () {
        var _this2$sheet;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_this2$sheet = _this2.sheet).trigger.apply(_this2$sheet, ['change'].concat(args));
      };

      this.datas.push(d); // console.log('d:', n, d, this.datas);

      this.bottombar.addItem(n, active);
      this.sheetIndex += 1;
      return d;
    }
  }, {
    key: "deleteSheet",
    value: function deleteSheet() {
      var _this$bottombar$delet = this.bottombar.deleteItem(),
          _this$bottombar$delet2 = _slicedToArray(_this$bottombar$delet, 2),
          oldIndex = _this$bottombar$delet2[0],
          nindex = _this$bottombar$delet2[1];

      if (oldIndex >= 0) {
        this.datas.splice(oldIndex, 1);
        if (nindex >= 0) this.sheet.resetData(this.datas[nindex]);
      }
    }
  }, {
    key: "loadData",
    value: function loadData(data) {
      // const d = Array.isArray(data) ? data[0] : data;
      var ds = Array.isArray(data) ? data : [data];

      if (ds.length > 0) {
        ds[0].name = ds[0].name || this.data.name;

        for (var i = 1; i < ds.length; i += 1) {
          var it = ds[i];
          var nd = this.addSheet(it.name, false);
          nd.setData(it);
        }

        this.bottombar.renameItem(0, ds[0].name);
        this.sheet.loadData(ds[0]);
      }

      return this;
    }
  }, {
    key: "getData",
    value: function getData() {
      return this.datas.map(function (it) {
        return it.getData();
      });
    }
  }, {
    key: "on",
    value: function on(eventName, func) {
      this.sheet.on(eventName, func);
      return this;
    }
  }, {
    key: "validate",
    value: function validate() {
      var validations = this.data.validations;
      return validations.errors.size <= 0;
    }
  }, {
    key: "change",
    value: function change(cb) {
      this.sheet.on('change', cb);
      return this;
    }
  }], [{
    key: "locale",
    value: function locale(lang, message) {
      (0, _locale2.locale)(lang, message);
    }
  }]);

  return Spreadsheet;
}();

var spreadsheet = function spreadsheet(el) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Spreadsheet(el, options);
};

exports.spreadsheet = spreadsheet;

if (window) {
  window.x_spreadsheet = spreadsheet;

  window.x_spreadsheet.locale = function (lang, message) {
    return (0, _locale2.locale)(lang, message);
  };
}

var _default = Spreadsheet;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _locale = require("../locale/locale");

var _helper = _interopRequireDefault(require("./helper"));

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

var rules = {
  phone: /^[1-9]\d{10}$/,
  email: /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/
};

function returnMessage(flag, key) {
  var message = '';

  if (!flag) {
    for (var _len = arguments.length, arg = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      arg[_key - 2] = arguments[_key];
    }

    message = _locale.t.apply(void 0, ["validation.".concat(key)].concat(arg));
  }

  return [flag, message];
}

var Validator = /*#__PURE__*/function () {
  // operator: b|nb|eq|neq|lt|lte|gt|gte
  // type: date|number|list|phone|email
  function Validator(type, required, value, operator) {
    _classCallCheck(this, Validator);

    this.required = required;
    this.value = value;
    this.type = type;
    this.operator = operator;
    this.message = '';
  }

  _createClass(Validator, [{
    key: "parseValue",
    value: function parseValue(v) {
      var type = this.type;

      if (type === 'date') {
        return new Date(v);
      }

      if (type === 'number') {
        return Number(v);
      }

      return v;
    }
  }, {
    key: "equals",
    value: function equals(other) {
      var flag = this.type === other.type && this.required === other.required && this.operator === other.operator;

      if (flag) {
        if (Array.isArray(this.value)) {
          flag = _helper["default"].arrayEquals(this.value, other.value);
        } else {
          flag = this.value === other.value;
        }
      }

      return flag;
    }
  }, {
    key: "values",
    value: function values() {
      return this.value.split(',');
    }
  }, {
    key: "validate",
    value: function validate(v) {
      var required = this.required,
          operator = this.operator,
          value = this.value,
          type = this.type;

      if (required && /^\s*$/.test(v)) {
        return returnMessage(false, 'required');
      }

      if (/^\s*$/.test(v)) return [true];

      if (rules[type] && !rules[type].test(v)) {
        return returnMessage(false, 'notMatch');
      }

      if (type === 'list') {
        return returnMessage(this.values().includes(v), 'notIn');
      }

      if (operator) {
        var v1 = this.parseValue(v);

        if (operator === 'be') {
          var _value = _slicedToArray(value, 2),
              min = _value[0],
              max = _value[1];

          return returnMessage(v1 >= this.parseValue(min) && v1 <= this.parseValue(max), 'between', min, max);
        }

        if (operator === 'nbe') {
          var _value2 = _slicedToArray(value, 2),
              _min = _value2[0],
              _max = _value2[1];

          return returnMessage(v1 < this.parseValue(_min) || v1 > this.parseValue(_max), 'notBetween', _min, _max);
        }

        if (operator === 'eq') {
          return returnMessage(v1 === this.parseValue(value), 'equal', value);
        }

        if (operator === 'neq') {
          return returnMessage(v1 !== this.parseValue(value), 'notEqual', value);
        }

        if (operator === 'lt') {
          return returnMessage(v1 < this.parseValue(value), 'lessThan', value);
        }

        if (operator === 'lte') {
          return returnMessage(v1 <= this.parseValue(value), 'lessThanEqual', value);
        }

        if (operator === 'gt') {
          return returnMessage(v1 > this.parseValue(value), 'greaterThan', value);
        }

        if (operator === 'gte') {
          return returnMessage(v1 >= this.parseValue(value), 'greaterThanEqual', value);
        }
      }

      return [true];
    }
  }]);

  return Validator;
}();

exports["default"] = Validator;
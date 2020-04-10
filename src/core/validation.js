"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validations = exports["default"] = void 0;

var _validator = _interopRequireDefault(require("./validator"));

var _cell_range = require("./cell_range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validation = /*#__PURE__*/function () {
  function Validation(mode, refs, validator) {
    _classCallCheck(this, Validation);

    this.refs = refs;
    this.mode = mode; // cell

    this.validator = validator;
  }

  _createClass(Validation, [{
    key: "includes",
    value: function includes(ri, ci) {
      var refs = this.refs;

      for (var i = 0; i < refs.length; i += 1) {
        var cr = _cell_range.CellRange.valueOf(refs[i]);

        if (cr.includes(ri, ci)) return true;
      }

      return false;
    }
  }, {
    key: "addRef",
    value: function addRef(ref) {
      this.remove(_cell_range.CellRange.valueOf(ref));
      this.refs.push(ref);
    }
  }, {
    key: "remove",
    value: function remove(cellRange) {
      var nrefs = [];
      this.refs.forEach(function (it) {
        var cr = _cell_range.CellRange.valueOf(it);

        if (cr.intersects(cellRange)) {
          var crs = cr.difference(cellRange);
          crs.forEach(function (it1) {
            return nrefs.push(it1.toString());
          });
        } else {
          nrefs.push(it);
        }
      });
      this.refs = nrefs;
    }
  }, {
    key: "getData",
    value: function getData() {
      var refs = this.refs,
          mode = this.mode,
          validator = this.validator;
      var type = validator.type,
          required = validator.required,
          operator = validator.operator,
          value = validator.value;
      return {
        refs: refs,
        mode: mode,
        type: type,
        required: required,
        operator: operator,
        value: value
      };
    }
  }], [{
    key: "valueOf",
    value: function valueOf(_ref) {
      var refs = _ref.refs,
          mode = _ref.mode,
          type = _ref.type,
          required = _ref.required,
          operator = _ref.operator,
          value = _ref.value;
      return new Validation(mode, refs, new _validator["default"](type, required, value, operator));
    }
  }]);

  return Validation;
}();

var Validations = /*#__PURE__*/function () {
  function Validations() {
    _classCallCheck(this, Validations);

    this._ = []; // ri_ci: errMessage

    this.errors = new Map();
  }

  _createClass(Validations, [{
    key: "getError",
    value: function getError(ri, ci) {
      return this.errors.get("".concat(ri, "_").concat(ci));
    }
  }, {
    key: "validate",
    value: function validate(ri, ci, text) {
      var v = this.get(ri, ci);
      var key = "".concat(ri, "_").concat(ci);
      var errors = this.errors;

      if (v !== null) {
        var _v$validator$validate = v.validator.validate(text),
            _v$validator$validate2 = _slicedToArray(_v$validator$validate, 2),
            flag = _v$validator$validate2[0],
            message = _v$validator$validate2[1];

        if (!flag) {
          errors.set(key, message);
        } else {
          errors["delete"](key);
        }
      } else {
        errors["delete"](key);
      }

      return true;
    } // type: date|number|phone|email|list
    // validator: { required, value, operator }

  }, {
    key: "add",
    value: function add(mode, ref, _ref2) {
      var type = _ref2.type,
          required = _ref2.required,
          value = _ref2.value,
          operator = _ref2.operator;
      var validator = new _validator["default"](type, required, value, operator);
      var v = this.getByValidator(validator);

      if (v !== null) {
        v.addRef(ref);
      } else {
        this._.push(new Validation(mode, [ref], validator));
      }
    }
  }, {
    key: "getByValidator",
    value: function getByValidator(validator) {
      for (var i = 0; i < this._.length; i += 1) {
        var v = this._[i];

        if (v.validator.equals(validator)) {
          return v;
        }
      }

      return null;
    }
  }, {
    key: "get",
    value: function get(ri, ci) {
      for (var i = 0; i < this._.length; i += 1) {
        var v = this._[i];
        if (v.includes(ri, ci)) return v;
      }

      return null;
    }
  }, {
    key: "remove",
    value: function remove(cellRange) {
      this.each(function (it) {
        it.remove(cellRange);
      });
    }
  }, {
    key: "each",
    value: function each(cb) {
      this._.forEach(function (it) {
        return cb(it);
      });
    }
  }, {
    key: "getData",
    value: function getData() {
      return this._.filter(function (it) {
        return it.refs.length > 0;
      }).map(function (it) {
        return it.getData();
      });
    }
  }, {
    key: "setData",
    value: function setData(d) {
      this._ = d.map(function (it) {
        return Validation.valueOf(it);
      });
    }
  }]);

  return Validations;
}();

exports.Validations = Validations;
var _default = {};
exports["default"] = _default;
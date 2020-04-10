"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _modal = _interopRequireDefault(require("./modal"));

var _form_input = _interopRequireDefault(require("./form_input"));

var _form_select = _interopRequireDefault(require("./form_select"));

var _form_field = _interopRequireDefault(require("./form_field"));

var _button = _interopRequireDefault(require("./button"));

var _locale = require("../locale/locale");

var _element = require("./element");

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var fieldLabelWidth = 100;

var ModalValidation = /*#__PURE__*/function (_Modal) {
  _inherits(ModalValidation, _Modal);

  function ModalValidation() {
    var _this;

    _classCallCheck(this, ModalValidation);

    var mf = new _form_field["default"](new _form_select["default"]('cell', ['cell'], // cell|row|column
    '100%', function (it) {
      return (0, _locale.t)("dataValidation.modeType.".concat(it));
    }), {
      required: true
    }, "".concat((0, _locale.t)('dataValidation.range'), ":"), fieldLabelWidth);
    var rf = new _form_field["default"](new _form_input["default"]('120px', 'E3 or E3:F12'), {
      required: true,
      pattern: /^([A-Z]{1,2}[1-9]\d*)(:[A-Z]{1,2}[1-9]\d*)?$/
    });
    var cf = new _form_field["default"](new _form_select["default"]('list', ['list', 'number', 'date', 'phone', 'email'], '100%', function (it) {
      return (0, _locale.t)("dataValidation.type.".concat(it));
    }, function (it) {
      return _this.criteriaSelected(it);
    }), {
      required: true
    }, "".concat((0, _locale.t)('dataValidation.criteria'), ":"), fieldLabelWidth); // operator

    var of = new _form_field["default"](new _form_select["default"]('be', ['be', 'nbe', 'eq', 'neq', 'lt', 'lte', 'gt', 'gte'], '160px', function (it) {
      return (0, _locale.t)("dataValidation.operator.".concat(it));
    }, function (it) {
      return _this.criteriaOperatorSelected(it);
    }), {
      required: true
    }).hide(); // min, max

    var minvf = new _form_field["default"](new _form_input["default"]('70px', '10'), {
      required: true
    }).hide();
    var maxvf = new _form_field["default"](new _form_input["default"]('70px', '100'), {
      required: true,
      type: 'number'
    }).hide(); // value

    var svf = new _form_field["default"](new _form_input["default"]('120px', 'a,b,c'), {
      required: true
    });
    var vf = new _form_field["default"](new _form_input["default"]('70px', '10'), {
      required: true,
      type: 'number'
    }).hide();
    _this = _possibleConstructorReturn(this, (ModalValidation.__proto__ || Object.getPrototypeOf(ModalValidation)).call(this, (0, _locale.t)('contextmenu.validation'), [(0, _element.h)('div', "".concat(_config.cssPrefix, "-form-fields")).children(mf.el, rf.el), (0, _element.h)('div', "".concat(_config.cssPrefix, "-form-fields")).children(cf.el, of.el, minvf.el, maxvf.el, vf.el, svf.el), (0, _element.h)('div', "".concat(_config.cssPrefix, "-buttons")).children(new _button["default"]('cancel').on('click', function () {
      return _this.btnClick('cancel');
    }), new _button["default"]('remove').on('click', function () {
      return _this.btnClick('remove');
    }), new _button["default"]('save', 'primary').on('click', function () {
      return _this.btnClick('save');
    }))]));
    _this.mf = mf;
    _this.rf = rf;
    _this.cf = cf;
    _this.of = of;
    _this.minvf = minvf;
    _this.maxvf = maxvf;
    _this.vf = vf;
    _this.svf = svf;

    _this.change = function () {};

    return _this;
  }

  _createClass(ModalValidation, [{
    key: "showVf",
    value: function showVf(it) {
      var hint = it === 'date' ? '2018-11-12' : '10';
      var vf = this.vf;
      vf.input.hint(hint);
      vf.show();
    }
  }, {
    key: "criteriaSelected",
    value: function criteriaSelected(it) {
      var of = this.of,
          minvf = this.minvf,
          maxvf = this.maxvf,
          vf = this.vf,
          svf = this.svf;

      if (it === 'date' || it === 'number') {
        of.show();
        minvf.rule.type = it;
        maxvf.rule.type = it;

        if (it === 'date') {
          minvf.hint('2018-11-12');
          maxvf.hint('2019-11-12');
        } else {
          minvf.hint('10');
          maxvf.hint('100');
        }

        minvf.show();
        maxvf.show();
        vf.hide();
        svf.hide();
      } else {
        if (it === 'list') {
          svf.show();
        } else {
          svf.hide();
        }

        vf.hide();
        of.hide();
        minvf.hide();
        maxvf.hide();
      }
    }
  }, {
    key: "criteriaOperatorSelected",
    value: function criteriaOperatorSelected(it) {
      if (!it) return;
      var minvf = this.minvf,
          maxvf = this.maxvf,
          vf = this.vf;

      if (it === 'be' || it === 'nbe') {
        minvf.show();
        maxvf.show();
        vf.hide();
      } else {
        var type = this.cf.val();
        vf.rule.type = type;

        if (type === 'date') {
          vf.hint('2018-11-12');
        } else {
          vf.hint('10');
        }

        vf.show();
        minvf.hide();
        maxvf.hide();
      }
    }
  }, {
    key: "btnClick",
    value: function btnClick(action) {
      if (action === 'cancel') {
        this.hide();
      } else if (action === 'remove') {
        this.change('remove');
        this.hide();
      } else if (action === 'save') {
        // validate
        var attrs = ['mf', 'rf', 'cf', 'of', 'svf', 'vf', 'minvf', 'maxvf'];

        for (var i = 0; i < attrs.length; i += 1) {
          var field = this[attrs[i]]; // console.log('field:', field);

          if (field.isShow()) {
            // console.log('it:', it);
            if (!field.validate()) return;
          }
        }

        var mode = this.mf.val();
        var ref = this.rf.val();
        var type = this.cf.val();
        var operator = this.of.val();
        var value = this.svf.val();

        if (type === 'number' || type === 'date') {
          if (operator === 'be' || operator === 'nbe') {
            value = [this.minvf.val(), this.maxvf.val()];
          } else {
            value = this.vf.val();
          }
        } // console.log(mode, ref, type, operator, value);


        this.change('save', mode, ref, {
          type: type,
          operator: operator,
          required: false,
          value: value
        });
        this.hide();
      }
    } // validation: { mode, ref, validator }

  }, {
    key: "setValue",
    value: function setValue(v) {
      if (v) {
        var mf = this.mf,
            rf = this.rf,
            cf = this.cf,
            of = this.of,
            svf = this.svf,
            vf = this.vf,
            minvf = this.minvf,
            maxvf = this.maxvf;
        var mode = v.mode,
            ref = v.ref,
            validator = v.validator;

        var _ref = validator || {
          type: 'list'
        },
            type = _ref.type,
            operator = _ref.operator,
            value = _ref.value;

        mf.val(mode || 'cell');
        rf.val(ref);
        cf.val(type);
        of.val(operator);

        if (Array.isArray(value)) {
          minvf.val(value[0]);
          maxvf.val(value[1]);
        } else {
          svf.val(value || '');
          vf.val(value || '');
        }

        this.criteriaSelected(type);
        this.criteriaOperatorSelected(operator);
      }

      this.show();
    }
  }]);

  return ModalValidation;
}(_modal["default"]);

exports["default"] = ModalValidation;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CellRange = exports["default"] = void 0;

var _alphabet = require("./alphabet");

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

var CellRange = /*#__PURE__*/function () {
  function CellRange(sri, sci, eri, eci) {
    var w = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var h = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    _classCallCheck(this, CellRange);

    this.sri = sri;
    this.sci = sci;
    this.eri = eri;
    this.eci = eci;
    this.w = w;
    this.h = h;
  }

  _createClass(CellRange, [{
    key: "set",
    value: function set(sri, sci, eri, eci) {
      this.sri = sri;
      this.sci = sci;
      this.eri = eri;
      this.eci = eci;
    }
  }, {
    key: "multiple",
    value: function multiple() {
      return this.eri - this.sri > 0 || this.eci - this.sci > 0;
    } // cell-index: ri, ci
    // cell-ref: A10

  }, {
    key: "includes",
    value: function includes() {
      var ri = 0,
          ci = 0;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length === 1) {
        var _expr2xy = (0, _alphabet.expr2xy)(args[0]);

        var _expr2xy2 = _slicedToArray(_expr2xy, 2);

        ci = _expr2xy2[0];
        ri = _expr2xy2[1];
      } else if (args.length === 2) {
        ri = args[0];
        ci = args[1];
      }

      var sri = this.sri,
          sci = this.sci,
          eri = this.eri,
          eci = this.eci;
      return sri <= ri && ri <= eri && sci <= ci && ci <= eci;
    }
  }, {
    key: "each",
    value: function each(cb) {
      var rowFilter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return true;
      };
      var sri = this.sri,
          sci = this.sci,
          eri = this.eri,
          eci = this.eci;

      for (var i = sri; i <= eri; i += 1) {
        if (rowFilter(i)) {
          for (var j = sci; j <= eci; j += 1) {
            cb(i, j);
          }
        }
      }
    }
  }, {
    key: "contains",
    value: function contains(other) {
      return this.sri <= other.sri && this.sci <= other.sci && this.eri >= other.eri && this.eci >= other.eci;
    } // within

  }, {
    key: "within",
    value: function within(other) {
      return this.sri >= other.sri && this.sci >= other.sci && this.eri <= other.eri && this.eci <= other.eci;
    } // disjoint

  }, {
    key: "disjoint",
    value: function disjoint(other) {
      return this.sri > other.eri || this.sci > other.eci || other.sri > this.eri || other.sci > this.eci;
    } // intersects

  }, {
    key: "intersects",
    value: function intersects(other) {
      return this.sri <= other.eri && this.sci <= other.eci && other.sri <= this.eri && other.sci <= this.eci;
    } // union

  }, {
    key: "union",
    value: function union(other) {
      var sri = this.sri,
          sci = this.sci,
          eri = this.eri,
          eci = this.eci;
      return new CellRange(other.sri < sri ? other.sri : sri, other.sci < sci ? other.sci : sci, other.eri > eri ? other.eri : eri, other.eci > eci ? other.eci : eci);
    } // intersection
    // intersection(other) {}
    // Returns Array<CellRange> that represents that part of this that does not intersect with other
    // difference

  }, {
    key: "difference",
    value: function difference(other) {
      var ret = [];

      var addRet = function addRet(sri, sci, eri, eci) {
        ret.push(new CellRange(sri, sci, eri, eci));
      };

      var sri = this.sri,
          sci = this.sci,
          eri = this.eri,
          eci = this.eci;
      var dsr = other.sri - sri;
      var dsc = other.sci - sci;
      var der = eri - other.eri;
      var dec = eci - other.eci;

      if (dsr > 0) {
        addRet(sri, sci, other.sri - 1, eci);

        if (der > 0) {
          addRet(other.eri + 1, sci, eri, eci);

          if (dsc > 0) {
            addRet(other.sri, sci, other.eri, other.sci - 1);
          }

          if (dec > 0) {
            addRet(other.sri, other.eci + 1, other.eri, eci);
          }
        } else {
          if (dsc > 0) {
            addRet(other.sri, sci, eri, other.sci - 1);
          }

          if (dec > 0) {
            addRet(other.sri, other.eci + 1, eri, eci);
          }
        }
      } else if (der > 0) {
        addRet(other.eri + 1, sci, eri, eci);

        if (dsc > 0) {
          addRet(sri, sci, other.eri, other.sci - 1);
        }

        if (dec > 0) {
          addRet(sri, other.eci + 1, other.eri, eci);
        }
      }

      if (dsc > 0) {
        addRet(sri, sci, eri, other.sci - 1);

        if (dec > 0) {
          addRet(sri, other.eri + 1, eri, eci);

          if (dsr > 0) {
            addRet(sri, other.sci, other.sri - 1, other.eci);
          }

          if (der > 0) {
            addRet(other.sri + 1, other.sci, eri, other.eci);
          }
        } else {
          if (dsr > 0) {
            addRet(sri, other.sci, other.sri - 1, eci);
          }

          if (der > 0) {
            addRet(other.sri + 1, other.sci, eri, eci);
          }
        }
      } else if (dec > 0) {
        addRet(eri, other.eci + 1, eri, eci);

        if (dsr > 0) {
          addRet(sri, sci, other.sri - 1, other.eci);
        }

        if (der > 0) {
          addRet(other.eri + 1, sci, eri, other.eci);
        }
      }

      return ret;
    }
  }, {
    key: "size",
    value: function size() {
      return [this.eri - this.sri + 1, this.eci - this.sci + 1];
    }
  }, {
    key: "toString",
    value: function toString() {
      var sri = this.sri,
          sci = this.sci,
          eri = this.eri,
          eci = this.eci;
      var ref = (0, _alphabet.xy2expr)(sci, sri);

      if (this.multiple()) {
        ref = "".concat(ref, ":").concat((0, _alphabet.xy2expr)(eci, eri));
      }

      return ref;
    }
  }, {
    key: "clone",
    value: function clone() {
      var sri = this.sri,
          sci = this.sci,
          eri = this.eri,
          eci = this.eci,
          w = this.w,
          h = this.h;
      return new CellRange(sri, sci, eri, eci, w, h);
    }
    /*
    toJSON() {
      return this.toString();
    }
    */

  }, {
    key: "equals",
    value: function equals(other) {
      return this.eri === other.eri && this.eci === other.eci && this.sri === other.sri && this.sci === other.sci;
    }
  }], [{
    key: "valueOf",
    value: function valueOf(ref) {
      // B1:B8, B1 => 1 x 1 cell range
      var refs = ref.split(':');

      var _expr2xy3 = (0, _alphabet.expr2xy)(refs[0]),
          _expr2xy4 = _slicedToArray(_expr2xy3, 2),
          sci = _expr2xy4[0],
          sri = _expr2xy4[1];

      var eri = sri,
          eci = sci;

      if (refs.length > 1) {
        var _expr2xy5 = (0, _alphabet.expr2xy)(refs[1]);

        var _expr2xy6 = _slicedToArray(_expr2xy5, 2);

        eci = _expr2xy6[0];
        eri = _expr2xy6[1];
      }

      return new CellRange(sri, sci, eri, eci);
    }
  }]);

  return CellRange;
}();

exports.CellRange = CellRange;
var _default = CellRange;
exports["default"] = _default;
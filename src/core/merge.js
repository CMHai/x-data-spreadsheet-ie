"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Merges = exports["default"] = void 0;

var _cell_range = require("./cell_range");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Merges = /*#__PURE__*/function () {
  function Merges() {
    var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Merges);

    this._ = d;
  }

  _createClass(Merges, [{
    key: "forEach",
    value: function forEach(cb) {
      this._.forEach(cb);
    }
  }, {
    key: "deleteWithin",
    value: function deleteWithin(cr) {
      this._ = this._.filter(function (it) {
        return !it.within(cr);
      });
    }
  }, {
    key: "getFirstIncludes",
    value: function getFirstIncludes(ri, ci) {
      for (var i = 0; i < this._.length; i += 1) {
        var it = this._[i];

        if (it.includes(ri, ci)) {
          return it;
        }
      }

      return null;
    }
  }, {
    key: "filterIntersects",
    value: function filterIntersects(cellRange) {
      return new Merges(this._.filter(function (it) {
        return it.intersects(cellRange);
      }));
    }
  }, {
    key: "intersects",
    value: function intersects(cellRange) {
      for (var i = 0; i < this._.length; i += 1) {
        var it = this._[i];

        if (it.intersects(cellRange)) {
          // console.log('intersects');
          return true;
        }
      }

      return false;
    }
  }, {
    key: "union",
    value: function union(cellRange) {
      var cr = cellRange;

      this._.forEach(function (it) {
        if (it.intersects(cr)) {
          cr = it.union(cr);
        }
      });

      return cr;
    }
  }, {
    key: "add",
    value: function add(cr) {
      this.deleteWithin(cr);

      this._.push(cr);
    } // type: row | column

  }, {
    key: "shift",
    value: function shift(type, index, n, cbWithin) {
      this._.forEach(function (cellRange) {
        var sri = cellRange.sri,
            sci = cellRange.sci,
            eri = cellRange.eri,
            eci = cellRange.eci;
        var range = cellRange;

        if (type === 'row') {
          if (sri >= index) {
            range.sri += n;
            range.eri += n;
          } else if (sri < index && index <= eri) {
            range.eri += n;
            cbWithin(sri, sci, n, 0);
          }
        } else if (type === 'column') {
          if (sci >= index) {
            range.sci += n;
            range.eci += n;
          } else if (sci < index && index <= eci) {
            range.eci += n;
            cbWithin(sri, sci, 0, n);
          }
        }
      });
    }
  }, {
    key: "move",
    value: function move(cellRange, rn, cn) {
      this._.forEach(function (it1) {
        var it = it1;

        if (it.within(cellRange)) {
          it.eri += rn;
          it.sri += rn;
          it.sci += cn;
          it.eci += cn;
        }
      });
    }
  }, {
    key: "setData",
    value: function setData(merges) {
      this._ = merges.map(function (merge) {
        return _cell_range.CellRange.valueOf(merge);
      });
      return this;
    }
  }, {
    key: "getData",
    value: function getData() {
      return this._.map(function (merge) {
        return merge.toString();
      });
    }
  }]);

  return Merges;
}();

exports.Merges = Merges;
var _default = {};
exports["default"] = _default;
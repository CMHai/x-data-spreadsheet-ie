"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cell_range = require("./cell_range");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// operator: all|eq|neq|gt|gte|lt|lte|in|be
// value:
//   in => []
//   be => [min, max]
var Filter = /*#__PURE__*/function () {
  function Filter(ci, operator, value) {
    _classCallCheck(this, Filter);

    this.ci = ci;
    this.operator = operator;
    this.value = value;
  }

  _createClass(Filter, [{
    key: "set",
    value: function set(operator, value) {
      this.operator = operator;
      this.value = value;
    }
  }, {
    key: "includes",
    value: function includes(v) {
      var operator = this.operator,
          value = this.value;

      if (operator === 'all') {
        return true;
      }

      if (operator === 'in') {
        return value.includes(v);
      }

      return false;
    }
  }, {
    key: "vlength",
    value: function vlength() {
      var operator = this.operator,
          value = this.value;

      if (operator === 'in') {
        return value.length;
      }

      return 0;
    }
  }, {
    key: "getData",
    value: function getData() {
      var ci = this.ci,
          operator = this.operator,
          value = this.value;
      return {
        ci: ci,
        operator: operator,
        value: value
      };
    }
  }]);

  return Filter;
}();

var Sort = /*#__PURE__*/function () {
  function Sort(ci, order) {
    _classCallCheck(this, Sort);

    this.ci = ci;
    this.order = order;
  }

  _createClass(Sort, [{
    key: "asc",
    value: function asc() {
      return this.order === 'asc';
    }
  }, {
    key: "desc",
    value: function desc() {
      return this.order === 'desc';
    }
  }]);

  return Sort;
}();

var AutoFilter = /*#__PURE__*/function () {
  function AutoFilter() {
    _classCallCheck(this, AutoFilter);

    this.ref = null;
    this.filters = [];
    this.sort = null;
  }

  _createClass(AutoFilter, [{
    key: "setData",
    value: function setData(_ref) {
      var ref = _ref.ref,
          filters = _ref.filters,
          sort = _ref.sort;

      if (ref != null) {
        this.ref = ref;
        this.fitlers = filters.map(function (it) {
          return new Filter(it.ci, it.operator, it.value);
        });

        if (sort) {
          this.sort = new Sort(sort.ci, sort.order);
        }
      }
    }
  }, {
    key: "getData",
    value: function getData() {
      if (this.active()) {
        var ref = this.ref,
            filters = this.filters,
            sort = this.sort;
        return {
          ref: ref,
          filters: filters.map(function (it) {
            return it.getData();
          }),
          sort: sort
        };
      }

      return {};
    }
  }, {
    key: "addFilter",
    value: function addFilter(ci, operator, value) {
      var filter = this.getFilter(ci);

      if (filter == null) {
        this.filters.push(new Filter(ci, operator, value));
      } else {
        filter.set(operator, value);
      }
    }
  }, {
    key: "setSort",
    value: function setSort(ci, order) {
      this.sort = order ? new Sort(ci, order) : null;
    }
  }, {
    key: "includes",
    value: function includes(ri, ci) {
      if (this.active()) {
        return this.hrange().includes(ri, ci);
      }

      return false;
    }
  }, {
    key: "getSort",
    value: function getSort(ci) {
      var sort = this.sort;

      if (sort && sort.ci === ci) {
        return sort;
      }

      return null;
    }
  }, {
    key: "getFilter",
    value: function getFilter(ci) {
      var filters = this.filters;

      for (var i = 0; i < filters.length; i += 1) {
        if (filters[i].ci === ci) {
          return filters[i];
        }
      }

      return null;
    }
  }, {
    key: "filteredRows",
    value: function filteredRows(getCell) {
      // const ary = [];
      // let lastri = 0;
      var rset = new Set();
      var fset = new Set();

      if (this.active()) {
        var _this$range = this.range(),
            sri = _this$range.sri,
            eri = _this$range.eri;

        var filters = this.filters;

        for (var ri = sri + 1; ri <= eri; ri += 1) {
          for (var i = 0; i < filters.length; i += 1) {
            var filter = filters[i];
            var cell = getCell(ri, filter.ci);
            var ctext = cell ? cell.text : '';

            if (!filter.includes(ctext)) {
              rset.add(ri);
              break;
            } else {
              fset.add(ri);
            }
          }
        }
      }

      return {
        rset: rset,
        fset: fset
      };
    }
  }, {
    key: "items",
    value: function items(ci, getCell) {
      var m = {};

      if (this.active()) {
        var _this$range2 = this.range(),
            sri = _this$range2.sri,
            eri = _this$range2.eri;

        for (var ri = sri + 1; ri <= eri; ri += 1) {
          var cell = getCell(ri, ci);

          if (cell !== null && !/^\s*$/.test(cell.text)) {
            var key = cell.text;
            var cnt = (m[key] || 0) + 1;
            m[key] = cnt;
          } else {
            m[''] = (m[''] || 0) + 1;
          }
        }
      }

      return m;
    }
  }, {
    key: "range",
    value: function range() {
      return _cell_range.CellRange.valueOf(this.ref);
    }
  }, {
    key: "hrange",
    value: function hrange() {
      var r = this.range();
      r.eri = r.sri;
      return r;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ref = null;
      this.filters = [];
      this.sort = null;
    }
  }, {
    key: "active",
    value: function active() {
      return this.ref !== null;
    }
  }]);

  return AutoFilter;
}();

exports["default"] = AutoFilter;
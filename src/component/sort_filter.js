"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _button = _interopRequireDefault(require("./button"));

var _event = require("./event");

var _config = require("../config");

var _locale = require("../locale/locale");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function buildMenu(clsName) {
  return (0, _element.h)('div', "".concat(_config.cssPrefix, "-item ").concat(clsName));
}

function buildSortItem(it) {
  var _this = this;

  return buildMenu('state').child((0, _locale.t)("sort.".concat(it))).on('click.stop', function () {
    return _this.itemClick(it);
  });
}

function buildFilterBody(items) {
  var _this2 = this;

  var filterbEl = this.filterbEl,
      filterValues = this.filterValues;
  filterbEl.html('');
  var itemKeys = Object.keys(items);
  itemKeys.forEach(function (it, index) {
    var cnt = items[it];
    var active = filterValues.includes(it) ? 'checked' : '';
    filterbEl.child((0, _element.h)('div', "".concat(_config.cssPrefix, "-item state ").concat(active)).on('click.stop', function () {
      return _this2.filterClick(index, it);
    }).children(it === '' ? (0, _locale.t)('filter.empty') : it, (0, _element.h)('div', 'label').html("(".concat(cnt, ")"))));
  });
}

function resetFilterHeader() {
  var filterhEl = this.filterhEl,
      filterValues = this.filterValues,
      values = this.values;
  filterhEl.html("".concat(filterValues.length, " / ").concat(values.length));
  filterhEl.checked(filterValues.length === values.length);
}

var SortFilter = /*#__PURE__*/function () {
  function SortFilter() {
    var _this3 = this;

    _classCallCheck(this, SortFilter);

    this.filterbEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-body"));
    this.filterhEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-header state")).on('click.stop', function () {
      return _this3.filterClick(0, 'all');
    });
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-sort-filter")).children(this.sortAscEl = buildSortItem.call(this, 'asc'), this.sortDescEl = buildSortItem.call(this, 'desc'), buildMenu('divider'), (0, _element.h)('div', "".concat(_config.cssPrefix, "-filter")).children(this.filterhEl, this.filterbEl), (0, _element.h)('div', "".concat(_config.cssPrefix, "-buttons")).children(new _button["default"]('cancel').on('click', function () {
      return _this3.btnClick('cancel');
    }), new _button["default"]('ok', 'primary').on('click', function () {
      return _this3.btnClick('ok');
    }))).hide(); // this.setFilters(['test1', 'test2', 'text3']);

    this.ci = null;
    this.sortDesc = null;
    this.values = null;
    this.filterValues = [];
  }

  _createClass(SortFilter, [{
    key: "btnClick",
    value: function btnClick(it) {
      if (it === 'ok') {
        var ci = this.ci,
            sort = this.sort,
            filterValues = this.filterValues;

        if (this.ok) {
          this.ok(ci, sort, 'in', filterValues);
        }
      }

      this.hide();
    }
  }, {
    key: "itemClick",
    value: function itemClick(it) {
      // console.log('it:', it);
      this.sort = it;
      var sortAscEl = this.sortAscEl,
          sortDescEl = this.sortDescEl;
      sortAscEl.checked(it === 'asc');
      sortDescEl.checked(it === 'desc');
    }
  }, {
    key: "filterClick",
    value: function filterClick(index, it) {
      // console.log('index:', index, it);
      var filterbEl = this.filterbEl,
          filterValues = this.filterValues,
          values = this.values;
      var children = filterbEl.children();

      if (it === 'all') {
        if (children.length === filterValues.length) {
          this.filterValues = [];
          children.forEach(function (i) {
            return (0, _element.h)(i).checked(false);
          });
        } else {
          this.filterValues = Array.from(values);
          children.forEach(function (i) {
            return (0, _element.h)(i).checked(true);
          });
        }
      } else {
        var checked = (0, _element.h)(children[index]).toggle('checked');

        if (checked) {
          filterValues.push(it);
        } else {
          filterValues.splice(filterValues.findIndex(function (i) {
            return i === it;
          }), 1);
        }
      }

      resetFilterHeader.call(this);
    } // v: autoFilter
    // items: {value: cnt}
    // sort { ci, order }

  }, {
    key: "set",
    value: function set(ci, items, filter, sort) {
      this.ci = ci;
      var sortAscEl = this.sortAscEl,
          sortDescEl = this.sortDescEl;

      if (sort !== null) {
        this.sort = sort.order;
        sortAscEl.checked(sort.asc());
        sortDescEl.checked(sort.desc());
      } else {
        this.sortDesc = null;
        sortAscEl.checked(false);
        sortDescEl.checked(false);
      } // this.setFilters(items, filter);


      this.values = Object.keys(items);
      this.filterValues = filter ? Array.from(filter.value) : Object.keys(items);
      buildFilterBody.call(this, items, filter);
      resetFilterHeader.call(this);
    }
  }, {
    key: "setOffset",
    value: function setOffset(v) {
      var _this4 = this;

      this.el.offset(v).show();
      var tindex = 1;
      (0, _event.bindClickoutside)(this.el, function () {
        if (tindex <= 0) {
          _this4.hide();
        }

        tindex -= 1;
      });
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
      (0, _event.unbindClickoutside)(this.el);
    }
  }]);

  return SortFilter;
}();

exports["default"] = SortFilter;
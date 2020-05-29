"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rows = exports["default"] = void 0;

var _helper = _interopRequireDefault(require("./helper"));

var _alphabet = require("./alphabet");

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

var Rows = /*#__PURE__*/function () {
  function Rows(_ref) {
    var len = _ref.len,
        height = _ref.height;

    _classCallCheck(this, Rows);

    this._ = {};
    this.len = len; // default row height

    this.height = height;
  }

  _createClass(Rows, [{
    key: "getHeight",
    value: function getHeight(ri) {
      if (this.isHide(ri)) return 0;
      var row = this.get(ri);

      if (row && row.height) {
        return row.height;
      }

      return this.height;
    }
  }, {
    key: "setHeight",
    value: function setHeight(ri, v) {
      var row = this.getOrNew(ri);
      row.height = v;
    }
  }, {
    key: "unhide",
    value: function unhide(idx) {
      var index = idx;

      while (index > 0) {
        index -= 1;

        if (this.isHide(index)) {
          this.setHide(index, false);
        } else break;
      }
    }
  }, {
    key: "isHide",
    value: function isHide(ri) {
      var row = this.get(ri);
      return row && row.hide;
    }
  }, {
    key: "setHide",
    value: function setHide(ri, v) {
      var row = this.getOrNew(ri);
      if (v === true) row.hide = true;else delete row.hide;
    }
  }, {
    key: "setStyle",
    value: function setStyle(ri, style) {
      var row = this.getOrNew(ri);
      row.style = style;
    }
  }, {
    key: "sumHeight",
    value: function sumHeight(min, max, exceptSet) {
      var _this = this;

      return _helper["default"].rangeSum(min, max, function (i) {
        if (exceptSet && exceptSet.has(i)) return 0;
        return _this.getHeight(i);
      });
    }
  }, {
    key: "totalHeight",
    value: function totalHeight() {
      return this.sumHeight(0, this.len);
    }
  }, {
    key: "get",
    value: function get(ri) {
      return this._[ri];
    }
  }, {
    key: "getOrNew",
    value: function getOrNew(ri) {
      this._[ri] = this._[ri] || {
        cells: {}
      };
      return this._[ri];
    }
  }, {
    key: "getCell",
    value: function getCell(ri, ci) {
      var row = this.get(ri);

      if (row !== undefined && row.cells !== undefined && row.cells[ci] !== undefined) {
        return row.cells[ci];
      }

      return null;
    }
  }, {
    key: "getCellMerge",
    value: function getCellMerge(ri, ci) {
      var cell = this.getCell(ri, ci);
      if (cell && cell.merge) return cell.merge;
      return [0, 0];
    }
  }, {
    key: "getCellOrNew",
    value: function getCellOrNew(ri, ci) {
      var row = this.getOrNew(ri);
      row.cells[ci] = row.cells[ci] || {};
      return row.cells[ci];
    } // what: all | text | format

  }, {
    key: "setCell",
    value: function setCell(ri, ci, cell) {
      var what = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'all';
      var row = this.getOrNew(ri);

      if (what === 'all') {
        row.cells[ci] = cell;
      } else if (what === 'text') {
        row.cells[ci] = row.cells[ci] || {};
        row.cells[ci].text = cell.text;
      } else if (what === 'format') {
        row.cells[ci] = row.cells[ci] || {};
        row.cells[ci].style = cell.style;
        if (cell.merge) row.cells[ci].merge = cell.merge;
      }
    }
  }, {
    key: "setCellText",
    value: function setCellText(ri, ci, text) {
      var cell = this.getCellOrNew(ri, ci);
      cell.text = text;
    } // what: all | format | text

  }, {
    key: "copyPaste",
    value: function copyPaste(srcCellRange, dstCellRange, what) {
      var autofill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var cb = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};
      var sri = srcCellRange.sri,
          sci = srcCellRange.sci,
          eri = srcCellRange.eri,
          eci = srcCellRange.eci;
      var dsri = dstCellRange.sri;
      var dsci = dstCellRange.sci;
      var deri = dstCellRange.eri;
      var deci = dstCellRange.eci;

      var _srcCellRange$size = srcCellRange.size(),
          _srcCellRange$size2 = _slicedToArray(_srcCellRange$size, 2),
          rn = _srcCellRange$size2[0],
          cn = _srcCellRange$size2[1];

      var _dstCellRange$size = dstCellRange.size(),
          _dstCellRange$size2 = _slicedToArray(_dstCellRange$size, 2),
          drn = _dstCellRange$size2[0],
          dcn = _dstCellRange$size2[1]; // console.log(srcIndexes, dstIndexes);


      var isAdd = true;
      var dn = 0;

      if (deri < sri || deci < sci) {
        isAdd = false;
        if (deri < sri) dn = drn;else dn = dcn;
      } // console.log('drn:', drn, ', dcn:', dcn, dn, isAdd);


      for (var i = sri; i <= eri; i += 1) {
        if (this._[i]) {
          for (var j = sci; j <= eci; j += 1) {
            if (this._[i].cells && this._[i].cells[j]) {
              for (var ii = dsri; ii <= deri; ii += rn) {
                for (var jj = dsci; jj <= deci; jj += cn) {
                  var nri = ii + (i - sri);
                  var nci = jj + (j - sci);

                  var ncell = _helper["default"].cloneDeep(this._[i].cells[j]); // ncell.text


                  if (autofill && ncell && ncell.text && ncell.text.length > 0) {
                    (function () {
                      var text = ncell.text;
                      var n = jj - dsci + (ii - dsri) + 2;

                      if (!isAdd) {
                        n -= dn + 1;
                      }

                      if (text[0] === '=') {
                        ncell.text = text.replace(/\w{1,3}\d/g, function (word) {
                          var xn = 0,
                              yn = 0;

                          if (sri === dsri) {
                            xn = n - 1; // if (isAdd) xn -= 1;
                          } else {
                            yn = n - 1;
                          }

                          if (/^\d+$/.test(word)) return word;
                          return (0, _alphabet.expr2expr)(word, xn, yn);
                        });
                      } else {
                        var result = /[\\.\d]+$/.exec(text); // console.log('result:', result);

                        if (result !== null) {
                          var index = Number(result[0]) + n - 1;
                          ncell.text = text.substring(0, result.index) + index;
                        }
                      }
                    })();
                  }

                  this.setCell(nri, nci, ncell, what);
                  cb(nri, nci, ncell);
                }
              }
            }
          }
        }
      }
    }
  }, {
    key: "cutPaste",
    value: function cutPaste(srcCellRange, dstCellRange) {
      var _this2 = this;

      var ncellmm = {};
      this.each(function (ri) {
        _this2.eachCells(ri, function (ci) {
          var nri = parseInt(ri, 10);
          var nci = parseInt(ci, 10);

          if (srcCellRange.includes(ri, ci)) {
            nri = dstCellRange.sri + (nri - srcCellRange.sri);
            nci = dstCellRange.sci + (nci - srcCellRange.sci);
          }

          ncellmm[nri] = ncellmm[nri] || {
            cells: {}
          };
          ncellmm[nri].cells[nci] = _this2._[ri].cells[ci];
        });
      });
      this._ = ncellmm;
    } // src: Array<Array<String>>

  }, {
    key: "paste",
    value: function paste(src, dstCellRange) {
      var _this3 = this;

      if (src.length <= 0) return;
      var sri = dstCellRange.sri,
          sci = dstCellRange.sci;
      src.forEach(function (row, i) {
        var ri = sri + i;
        row.forEach(function (cell, j) {
          var ci = sci + j;

          _this3.setCellText(ri, ci, cell);
        });
      });
    }
  }, {
    key: "insert",
    value: function insert(sri) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var ndata = {};
      this.each(function (ri, row) {
        var nri = parseInt(ri, 10);

        if (nri >= sri) {
          nri += n;
        }

        ndata[nri] = row;
      });
      this._ = ndata;
      this.len += n;
    }
  }, {
    key: "delete",
    value: function _delete(sri, eri) {
      var n = eri - sri + 1;
      var ndata = {};
      this.each(function (ri, row) {
        var nri = parseInt(ri, 10);

        if (nri < sri) {
          ndata[nri] = row;
        } else if (ri > eri) {
          ndata[nri - n] = row;
        }
      });
      this._ = ndata;
      this.len -= n;
    }
  }, {
    key: "insertColumn",
    value: function insertColumn(sci) {
      var _this4 = this;

      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      this.each(function (ri, row) {
        var rndata = {};

        _this4.eachCells(ri, function (ci, cell) {
          var nci = parseInt(ci, 10);

          if (nci >= sci) {
            nci += n;
          }

          rndata[nci] = cell;
        });

        row.cells = rndata;
      });
    }
  }, {
    key: "deleteColumn",
    value: function deleteColumn(sci, eci) {
      var _this5 = this;

      var n = eci - sci + 1;
      this.each(function (ri, row) {
        var rndata = {};

        _this5.eachCells(ri, function (ci, cell) {
          var nci = parseInt(ci, 10);

          if (nci < sci) {
            rndata[nci] = cell;
          } else if (nci > eci) {
            rndata[nci - n] = cell;
          }
        });

        row.cells = rndata;
      });
    } // what: all | text | format | merge

  }, {
    key: "deleteCells",
    value: function deleteCells(cellRange) {
      var _this6 = this;

      var what = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
      cellRange.each(function (i, j) {
        _this6.deleteCell(i, j, what);
      });
    } // what: all | text | format | merge

  }, {
    key: "deleteCell",
    value: function deleteCell(ri, ci) {
      var what = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'all';
      var row = this.get(ri);

      if (row !== null) {
        var cell = this.getCell(ri, ci);

        if (cell !== null) {
          if (what === 'all') {
            delete row.cells[ci];
          } else if (what === 'text') {
            if (cell.text) delete cell.text;
            if (cell.value) delete cell.value;
          } else if (what === 'format') {
            if (cell.style !== undefined) delete cell.style;
            if (cell.merge) delete cell.merge;
          } else if (what === 'merge') {
            if (cell.merge) delete cell.merge;
          }
        }
      }
    }
  }, {
    key: "maxCell",
    value: function maxCell() {
      var keys = Object.keys(this._);
      var ri = keys[keys.length - 1];
      var col = this._[ri];

      if (col) {
        var cells = col.cells;
        var ks = Object.keys(cells);
        var ci = ks[ks.length - 1];
        return [parseInt(ri, 10), parseInt(ci, 10)];
      }

      return [0, 0];
    }
  }, {
    key: "each",
    value: function each(cb) {
      Object.entries(this._).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            ri = _ref3[0],
            row = _ref3[1];

        cb(ri, row);
      });
    }
  }, {
    key: "eachCells",
    value: function eachCells(ri, cb) {
      if (this._[ri] && this._[ri].cells) {
        Object.entries(this._[ri].cells).forEach(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              ci = _ref5[0],
              cell = _ref5[1];

          cb(ci, cell);
        });
      }
    }
  }, {
    key: "setData",
    value: function setData(d) {
      if (d.len) {
        this.len = d.len;
        delete d.len;
      }

      this._ = d;
    }
  }, {
    key: "getData",
    value: function getData() {
      var len = this.len;
      return Object.assign({
        len: len
      }, this._);
    }
  }]);

  return Rows;
}();

exports.Rows = Rows;
var _default = {};
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _selector = _interopRequireDefault(require("./selector"));

var _scroll = _interopRequireDefault(require("./scroll"));

var _history = _interopRequireDefault(require("./history"));

var _clipboard = _interopRequireDefault(require("./clipboard"));

var _auto_filter = _interopRequireDefault(require("./auto_filter"));

var _merge = require("./merge");

var _helper = _interopRequireDefault(require("./helper"));

var _row = require("./row");

var _col = require("./col");

var _validation = require("./validation");

var _cell_range = require("./cell_range");

var _alphabet = require("./alphabet");

var _locale = require("../locale/locale");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// private methods

/*
 * {
 *  name: ''
 *  freeze: [0, 0],
 *  formats: [],
 *  styles: [
 *    {
 *      bgcolor: '',
 *      align: '',
 *      valign: '',
 *      textwrap: false,
 *      strike: false,
 *      underline: false,
 *      color: '',
 *      format: 1,
 *      border: {
 *        left: [style, color],
 *        right: [style, color],
 *        top: [style, color],
 *        bottom: [style, color],
 *      },
 *      font: {
 *        name: 'Helvetica',
 *        size: 10,
 *        bold: false,
 *        italic: false,
 *      }
 *    }
 *  ],
 *  merges: [
 *    'A1:F11',
 *    ...
 *  ],
 *  rows: {
 *    1: {
 *      height: 50,
 *      style: 1,
 *      cells: {
 *        1: {
 *          style: 2,
 *          type: 'string',
 *          text: '',
 *          value: '', // cal result
 *        }
 *      }
 *    },
 *    ...
 *  },
 *  cols: {
 *    2: { width: 100, style: 1 }
 *  }
 * }
 */
var defaultSettings = {
  mode: 'edit',
  // edit | read
  view: {
    height: function height() {
      return document.documentElement.clientHeight;
    },
    width: function width() {
      return document.documentElement.clientWidth;
    }
  },
  showGrid: true,
  showToolbar: true,
  showContextmenu: true,
  row: {
    len: 100,
    height: 25
  },
  col: {
    len: 26,
    width: 100,
    indexWidth: 60,
    minWidth: 60
  },
  style: {
    bgcolor: '#ffffff',
    align: 'left',
    valign: 'middle',
    textwrap: false,
    strike: false,
    underline: false,
    color: '#0a0a0a',
    font: {
      name: 'Arial',
      size: 10,
      bold: false,
      italic: false
    }
  }
};
var toolbarHeight = 41;
var bottombarHeight = 41; // src: cellRange
// dst: cellRange

function canPaste(src, dst) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var merges = this.merges;
  var cellRange = dst.clone();

  var _src$size = src.size(),
      _src$size2 = _slicedToArray(_src$size, 2),
      srn = _src$size2[0],
      scn = _src$size2[1];

  var _dst$size = dst.size(),
      _dst$size2 = _slicedToArray(_dst$size, 2),
      drn = _dst$size2[0],
      dcn = _dst$size2[1];

  if (srn > drn) {
    cellRange.eri = dst.sri + srn - 1;
  }

  if (scn > dcn) {
    cellRange.eci = dst.sci + scn - 1;
  }

  if (merges.intersects(cellRange)) {
    error((0, _locale.t)('error.pasteForMergedCell'));
    return false;
  }

  return true;
}

function copyPaste(srcCellRange, dstCellRange, what) {
  var autofill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var rows = this.rows,
      merges = this.merges; // delete dest merge

  if (what === 'all' || what === 'format') {
    rows.deleteCells(dstCellRange, what);
    merges.deleteWithin(dstCellRange);
  }

  rows.copyPaste(srcCellRange, dstCellRange, what, autofill, function (ri, ci, cell) {
    if (cell && cell.merge) {
      // console.log('cell:', ri, ci, cell);
      var _cell$merge = _slicedToArray(cell.merge, 2),
          rn = _cell$merge[0],
          cn = _cell$merge[1];

      if (rn <= 0 && cn <= 0) return;
      merges.add(new _cell_range.CellRange(ri, ci, ri + rn, ci + cn));
    }
  });
}

function cutPaste(srcCellRange, dstCellRange) {
  var clipboard = this.clipboard,
      rows = this.rows,
      merges = this.merges;
  rows.cutPaste(srcCellRange, dstCellRange);
  merges.move(srcCellRange, dstCellRange.sri - srcCellRange.sri, dstCellRange.sci - srcCellRange.sci);
  clipboard.clear();
} // bss: { top, bottom, left, right }


function setStyleBorder(ri, ci, bss) {
  var styles = this.styles,
      rows = this.rows;
  var cell = rows.getCellOrNew(ri, ci);
  var cstyle = {};

  if (cell.style !== undefined) {
    cstyle = _helper["default"].cloneDeep(styles[cell.style]);
  }

  cstyle = _helper["default"].merge(cstyle, {
    border: bss
  });
  cell.style = this.addStyle(cstyle);
}

function setStyleBorders(_ref) {
  var _this = this;

  var mode = _ref.mode,
      style = _ref.style,
      color = _ref.color;
  var styles = this.styles,
      selector = this.selector,
      rows = this.rows;
  var _selector$range = selector.range,
      sri = _selector$range.sri,
      sci = _selector$range.sci,
      eri = _selector$range.eri,
      eci = _selector$range.eci;
  var multiple = !this.isSignleSelected();

  if (!multiple) {
    if (mode === 'inside' || mode === 'horizontal' || mode === 'vertical') {
      return;
    }
  }

  if (mode === 'outside' && !multiple) {
    setStyleBorder.call(this, sri, sci, {
      top: [style, color],
      bottom: [style, color],
      left: [style, color],
      right: [style, color]
    });
  } else if (mode === 'none') {
    selector.range.each(function (ri, ci) {
      var cell = rows.getCell(ri, ci);

      if (cell && cell.style !== undefined) {
        var ns = _helper["default"].cloneDeep(styles[cell.style]);

        delete ns.border; // ['bottom', 'top', 'left', 'right'].forEach((prop) => {
        //   if (ns[prop]) delete ns[prop];
        // });

        cell.style = _this.addStyle(ns);
      }
    });
  } else if (mode === 'all' || mode === 'inside' || mode === 'outside' || mode === 'horizontal' || mode === 'vertical') {
    (function () {
      var merges = [];

      for (var ri = sri; ri <= eri; ri += 1) {
        for (var ci = sci; ci <= eci; ci += 1) {
          // jump merges -- start
          var mergeIndexes = [];

          for (var ii = 0; ii < merges.length; ii += 1) {
            var _merges$ii = _slicedToArray(merges[ii], 4),
                mri = _merges$ii[0],
                mci = _merges$ii[1],
                _rn2 = _merges$ii[2],
                _cn2 = _merges$ii[3];

            if (ri === mri + _rn2 + 1) mergeIndexes.push(ii);

            if (mri <= ri && ri <= mri + _rn2) {
              if (ci === mci) {
                ci += _cn2 + 1;
                break;
              }
            }
          }

          mergeIndexes.forEach(function (it) {
            return merges.splice(it, 1);
          });
          if (ci > eci) break; // jump merges -- end

          var cell = rows.getCell(ri, ci);
          var rn = 0,
              cn = 0;

          if (cell && cell.merge) {
            var _cell$merge2 = _slicedToArray(cell.merge, 2);

            rn = _cell$merge2[0];
            cn = _cell$merge2[1];
            merges.push([ri, ci, rn, cn]);
          }

          var mrl = rn > 0 && ri + rn === eri;
          var mcl = cn > 0 && ci + cn === eci;
          var bss = {};

          if (mode === 'all') {
            bss = {
              bottom: [style, color],
              top: [style, color],
              left: [style, color],
              right: [style, color]
            };
          } else if (mode === 'inside') {
            if (!mcl && ci < eci) bss.right = [style, color];
            if (!mrl && ri < eri) bss.bottom = [style, color];
          } else if (mode === 'horizontal') {
            if (!mrl && ri < eri) bss.bottom = [style, color];
          } else if (mode === 'vertical') {
            if (!mcl && ci < eci) bss.right = [style, color];
          } else if (mode === 'outside' && multiple) {
            if (sri === ri) bss.top = [style, color];
            if (mrl || eri === ri) bss.bottom = [style, color];
            if (sci === ci) bss.left = [style, color];
            if (mcl || eci === ci) bss.right = [style, color];
          }

          if (Object.keys(bss).length > 0) {
            setStyleBorder.call(_this, ri, ci, bss);
          }

          ci += cn;
        }
      }
    })();
  } else if (mode === 'top' || mode === 'bottom') {
    for (var ci = sci; ci <= eci; ci += 1) {
      if (mode === 'top') {
        setStyleBorder.call(this, sri, ci, {
          top: [style, color]
        });
        ci += rows.getCellMerge(sri, ci)[1];
      }

      if (mode === 'bottom') {
        setStyleBorder.call(this, eri, ci, {
          bottom: [style, color]
        });
        ci += rows.getCellMerge(eri, ci)[1];
      }
    }
  } else if (mode === 'left' || mode === 'right') {
    for (var ri = sri; ri <= eri; ri += 1) {
      if (mode === 'left') {
        setStyleBorder.call(this, ri, sci, {
          left: [style, color]
        });
        ri += rows.getCellMerge(ri, sci)[0];
      }

      if (mode === 'right') {
        setStyleBorder.call(this, ri, eci, {
          right: [style, color]
        });
        ri += rows.getCellMerge(ri, eci)[0];
      }
    }
  }
}

function getCellRowByY(y, scrollOffsety) {
  var rows = this.rows;
  var fsh = this.freezeTotalHeight(); // console.log('y:', y, ', fsh:', fsh);

  var inits = rows.height;
  if (fsh + rows.height < y) inits -= scrollOffsety; // handle ri in autofilter

  var frset = this.exceptRowSet;
  var ri = 0;
  var top = inits;
  var height = rows.height;

  for (; ri < rows.len; ri += 1) {
    if (top > y) break;

    if (!frset.has(ri)) {
      height = rows.getHeight(ri);
      top += height;
    }
  }

  top -= height; // console.log('ri:', ri, ', top:', top, ', height:', height);

  if (top <= 0) {
    return {
      ri: -1,
      top: 0,
      height: height
    };
  }

  return {
    ri: ri - 1,
    top: top,
    height: height
  };
}

function getCellColByX(x, scrollOffsetx) {
  var cols = this.cols;
  var fsw = this.freezeTotalWidth();
  var inits = cols.indexWidth;
  if (fsw + cols.indexWidth < x) inits -= scrollOffsetx;

  var _helper$rangeReduceIf = _helper["default"].rangeReduceIf(0, cols.len, inits, cols.indexWidth, x, function (i) {
    return cols.getWidth(i);
  }),
      _helper$rangeReduceIf2 = _slicedToArray(_helper$rangeReduceIf, 3),
      ci = _helper$rangeReduceIf2[0],
      left = _helper$rangeReduceIf2[1],
      width = _helper$rangeReduceIf2[2];

  if (left <= 0) {
    return {
      ci: -1,
      left: 0,
      width: cols.indexWidth
    };
  }

  return {
    ci: ci - 1,
    left: left,
    width: width
  };
}

var DataProxy = /*#__PURE__*/function () {
  function DataProxy(name, settings) {
    _classCallCheck(this, DataProxy);

    this.settings = _helper["default"].merge(defaultSettings, settings || {}); // save data begin

    this.name = name || 'sheet';
    this.freeze = [0, 0];
    this.styles = []; // Array<Style>

    this.merges = new _merge.Merges(); // [CellRange, ...]

    this.rows = new _row.Rows(this.settings.row);
    this.cols = new _col.Cols(this.settings.col);
    this.validations = new _validation.Validations();
    this.hyperlinks = {};
    this.comments = {}; // save data end
    // don't save object

    this.selector = new _selector["default"]();
    this.scroll = new _scroll["default"]();
    this.history = new _history["default"]();
    this.clipboard = new _clipboard["default"]();
    this.autoFilter = new _auto_filter["default"]();

    this.change = function () {};

    this.exceptRowSet = new Set();
    this.sortedRowMap = new Map();
    this.unsortedRowMap = new Map();
  }

  _createClass(DataProxy, [{
    key: "addValidation",
    value: function addValidation(mode, ref, validator) {
      var _this2 = this;

      // console.log('mode:', mode, ', ref:', ref, ', validator:', validator);
      this.changeData(function () {
        _this2.validations.add(mode, ref, validator);
      });
    }
  }, {
    key: "removeValidation",
    value: function removeValidation() {
      var _this3 = this;

      var range = this.selector.range;
      this.changeData(function () {
        _this3.validations.remove(range);
      });
    }
  }, {
    key: "getSelectedValidator",
    value: function getSelectedValidator() {
      var _this$selector = this.selector,
          ri = _this$selector.ri,
          ci = _this$selector.ci;
      var v = this.validations.get(ri, ci);
      return v ? v.validator : null;
    }
  }, {
    key: "getSelectedValidation",
    value: function getSelectedValidation() {
      var _this$selector2 = this.selector,
          ri = _this$selector2.ri,
          ci = _this$selector2.ci,
          range = _this$selector2.range;
      var v = this.validations.get(ri, ci);
      var ret = {
        ref: range.toString()
      };

      if (v !== null) {
        ret.mode = v.mode;
        ret.validator = v.validator;
      }

      return ret;
    }
  }, {
    key: "canUndo",
    value: function canUndo() {
      return this.history.canUndo();
    }
  }, {
    key: "canRedo",
    value: function canRedo() {
      return this.history.canRedo();
    }
  }, {
    key: "undo",
    value: function undo() {
      var _this4 = this;

      this.history.undo(this.getData(), function (d) {
        _this4.setData(d);
      });
    }
  }, {
    key: "redo",
    value: function redo() {
      var _this5 = this;

      this.history.redo(this.getData(), function (d) {
        _this5.setData(d);
      });
    }
  }, {
    key: "copy",
    value: function copy() {
      this.clipboard.copy(this.selector.range);
    }
  }, {
    key: "cut",
    value: function cut() {
      this.clipboard.cut(this.selector.range);
    } // what: all | text | format

  }, {
    key: "paste",
    value: function paste() {
      var _this6 = this;

      var what = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      // console.log('sIndexes:', sIndexes);
      var clipboard = this.clipboard,
          selector = this.selector;
      if (clipboard.isClear()) return false;
      if (!canPaste.call(this, clipboard.range, selector.range, error)) return false;
      this.changeData(function () {
        if (clipboard.isCopy()) {
          copyPaste.call(_this6, clipboard.range, selector.range, what);
        } else if (clipboard.isCut()) {
          cutPaste.call(_this6, clipboard.range, selector.range);
        }
      });
      return true;
    }
  }, {
    key: "pasteFromText",
    value: function pasteFromText(txt) {
      var lines = txt.split('\r\n').map(function (it) {
        return it.replace(/"/g, '').split('\t');
      });
      if (lines.length > 0) lines.length -= 1;
      var rows = this.rows,
          selector = this.selector;
      this.changeData(function () {
        rows.paste(lines, selector.range);
      });
    }
  }, {
    key: "autofill",
    value: function autofill(cellRange, what) {
      var _this7 = this;

      var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      var srcRange = this.selector.range;
      if (!canPaste.call(this, srcRange, cellRange, error)) return false;
      this.changeData(function () {
        copyPaste.call(_this7, srcRange, cellRange, what, true);
      });
      return true;
    }
  }, {
    key: "clearClipboard",
    value: function clearClipboard() {
      this.clipboard.clear();
    }
  }, {
    key: "calSelectedRangeByEnd",
    value: function calSelectedRangeByEnd(ri, ci) {
      var selector = this.selector,
          rows = this.rows,
          cols = this.cols,
          merges = this.merges;
      var _selector$range2 = selector.range,
          sri = _selector$range2.sri,
          sci = _selector$range2.sci,
          eri = _selector$range2.eri,
          eci = _selector$range2.eci;
      var cri = selector.ri;
      var cci = selector.ci;
      var nri = ri,
          nci = ci;
      if (ri < 0) nri = rows.len - 1;
      if (ci < 0) nci = cols.len - 1;

      if (nri > cri) {
        sri = cri;
        eri = nri;
      } else {
        sri = nri;
        eri = cri;
      }

      if (nci > cci) {
        sci = cci;
        eci = nci;
      } else {
        sci = nci;
        eci = cci;
      }

      selector.range = merges.union(new _cell_range.CellRange(sri, sci, eri, eci));
      selector.range = merges.union(selector.range); // console.log('selector.range:', selector.range);

      return selector.range;
    }
  }, {
    key: "calSelectedRangeByStart",
    value: function calSelectedRangeByStart(ri, ci) {
      var selector = this.selector,
          rows = this.rows,
          cols = this.cols,
          merges = this.merges;
      var cellRange = merges.getFirstIncludes(ri, ci); // console.log('cellRange:', cellRange, ri, ci, merges);

      if (cellRange === null) {
        cellRange = new _cell_range.CellRange(ri, ci, ri, ci);

        if (ri === -1) {
          cellRange.sri = 0;
          cellRange.eri = rows.len - 1;
        }

        if (ci === -1) {
          cellRange.sci = 0;
          cellRange.eci = cols.len - 1;
        }
      }

      selector.range = cellRange;
      return cellRange;
    }
  }, {
    key: "setSelectedCellAttr",
    value: function setSelectedCellAttr(property, value) {
      var _this8 = this;

      this.changeData(function () {
        var selector = _this8.selector,
            styles = _this8.styles,
            rows = _this8.rows;

        if (property === 'merge') {
          if (value) _this8.merge();else _this8.unmerge();
        } else if (property === 'border') {
          setStyleBorders.call(_this8, value);
        } else if (property === 'formula') {
          // console.log('>>>', selector.multiple());
          var ri = selector.ri,
              ci = selector.ci,
              range = selector.range;

          if (selector.multiple()) {
            var _selector$size = selector.size(),
                _selector$size2 = _slicedToArray(_selector$size, 2),
                rn = _selector$size2[0],
                cn = _selector$size2[1];

            var sri = range.sri,
                sci = range.sci,
                eri = range.eri,
                eci = range.eci;

            if (rn > 1) {
              for (var i = sci; i <= eci; i += 1) {
                var cell = rows.getCellOrNew(eri + 1, i);
                cell.text = "=".concat(value, "(").concat((0, _alphabet.xy2expr)(i, sri), ":").concat((0, _alphabet.xy2expr)(i, eri), ")");
              }
            } else if (cn > 1) {
              var _cell = rows.getCellOrNew(ri, eci + 1);

              _cell.text = "=".concat(value, "(").concat((0, _alphabet.xy2expr)(sci, ri), ":").concat((0, _alphabet.xy2expr)(eci, ri), ")");
            }
          } else {
            var _cell2 = rows.getCellOrNew(ri, ci);

            _cell2.text = "=".concat(value, "()");
          }
        } else {
          selector.range.each(function (ri, ci) {
            var cell = rows.getCellOrNew(ri, ci);
            var cstyle = {};

            if (cell.style !== undefined) {
              cstyle = _helper["default"].cloneDeep(styles[cell.style]);
            }

            if (property === 'format') {
              cstyle.format = value;
              cell.style = _this8.addStyle(cstyle);
            } else if (property === 'font-bold' || property === 'font-italic' || property === 'font-name' || property === 'font-size') {
              var nfont = {};
              nfont[property.split('-')[1]] = value;
              cstyle.font = Object.assign(cstyle.font || {}, nfont);
              cell.style = _this8.addStyle(cstyle);
            } else if (property === 'strike' || property === 'textwrap' || property === 'underline' || property === 'align' || property === 'valign' || property === 'color' || property === 'bgcolor') {
              cstyle[property] = value;
              cell.style = _this8.addStyle(cstyle);
            } else {
              cell[property] = value;
            }
          });
        }
      });
    } // state: input | finished

  }, {
    key: "setSelectedCellText",
    value: function setSelectedCellText(text) {
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'input';
      var autoFilter = this.autoFilter,
          selector = this.selector,
          rows = this.rows;
      var ri = selector.ri,
          ci = selector.ci;
      var nri = ri;

      if (this.unsortedRowMap.has(ri)) {
        nri = this.unsortedRowMap.get(ri);
      }

      var oldCell = rows.getCell(nri, ci);
      var oldText = oldCell ? oldCell.text : '';
      this.setCellText(nri, ci, text, state); // replace filter.value

      if (autoFilter.active()) {
        var filter = autoFilter.getFilter(ci);

        if (filter) {
          var vIndex = filter.value.findIndex(function (v) {
            return v === oldText;
          });

          if (vIndex >= 0) {
            filter.value.splice(vIndex, 1, text);
          } // console.log('filter:', filter, oldCell);

        }
      } // this.resetAutoFilter();

    }
  }, {
    key: "getSelectedCell",
    value: function getSelectedCell() {
      var _this$selector3 = this.selector,
          ri = _this$selector3.ri,
          ci = _this$selector3.ci;
      var nri = ri;

      if (this.unsortedRowMap.has(ri)) {
        nri = this.unsortedRowMap.get(ri);
      }

      return this.rows.getCell(nri, ci);
    }
  }, {
    key: "xyInSelectedRect",
    value: function xyInSelectedRect(x, y) {
      var _this$getSelectedRect = this.getSelectedRect(),
          left = _this$getSelectedRect.left,
          top = _this$getSelectedRect.top,
          width = _this$getSelectedRect.width,
          height = _this$getSelectedRect.height;

      var x1 = x - this.cols.indexWidth;
      var y1 = y - this.rows.height; // console.log('x:', x, ',y:', y, 'left:', left, 'top:', top);

      return x1 > left && x1 < left + width && y1 > top && y1 < top + height;
    }
  }, {
    key: "getSelectedRect",
    value: function getSelectedRect() {
      return this.getRect(this.selector.range);
    }
  }, {
    key: "getClipboardRect",
    value: function getClipboardRect() {
      var clipboard = this.clipboard;

      if (!clipboard.isClear()) {
        return this.getRect(clipboard.range);
      }

      return {
        left: -100,
        top: -100
      };
    }
  }, {
    key: "getRect",
    value: function getRect(cellRange) {
      var scroll = this.scroll,
          rows = this.rows,
          cols = this.cols,
          exceptRowSet = this.exceptRowSet;
      var sri = cellRange.sri,
          sci = cellRange.sci,
          eri = cellRange.eri,
          eci = cellRange.eci; // console.log('sri:', sri, ',sci:', sci, ', eri:', eri, ', eci:', eci);
      // no selector

      if (sri < 0 && sci < 0) {
        return {
          left: 0,
          l: 0,
          top: 0,
          t: 0,
          scroll: scroll
        };
      }

      var left = cols.sumWidth(0, sci);
      var top = rows.sumHeight(0, sri, exceptRowSet);
      var height = rows.sumHeight(sri, eri + 1, exceptRowSet);
      var width = cols.sumWidth(sci, eci + 1); // console.log('sri:', sri, ', sci:', sci, ', eri:', eri, ', eci:', eci);

      var left0 = left - scroll.x;
      var top0 = top - scroll.y;
      var fsh = this.freezeTotalHeight();
      var fsw = this.freezeTotalWidth();

      if (fsw > 0 && fsw > left) {
        left0 = left;
      }

      if (fsh > 0 && fsh > top) {
        top0 = top;
      }

      return {
        l: left,
        t: top,
        left: left0,
        top: top0,
        height: height,
        width: width,
        scroll: scroll
      };
    }
  }, {
    key: "getCellRectByXY",
    value: function getCellRectByXY(x, y) {
      var scroll = this.scroll,
          merges = this.merges,
          rows = this.rows,
          cols = this.cols;

      var _getCellRowByY$call = getCellRowByY.call(this, y, scroll.y),
          ri = _getCellRowByY$call.ri,
          top = _getCellRowByY$call.top,
          height = _getCellRowByY$call.height;

      var _getCellColByX$call = getCellColByX.call(this, x, scroll.x),
          ci = _getCellColByX$call.ci,
          left = _getCellColByX$call.left,
          width = _getCellColByX$call.width;

      if (ci === -1) {
        width = cols.totalWidth();
      }

      if (ri === -1) {
        height = rows.totalHeight();
      }

      if (ri >= 0 || ci >= 0) {
        var merge = merges.getFirstIncludes(ri, ci);

        if (merge) {
          ri = merge.sri;
          ci = merge.sci;

          var _this$cellRect = this.cellRect(ri, ci);

          left = _this$cellRect.left;
          top = _this$cellRect.top;
          width = _this$cellRect.width;
          height = _this$cellRect.height;
        }
      }

      return {
        ri: ri,
        ci: ci,
        left: left,
        top: top,
        width: width,
        height: height
      };
    }
  }, {
    key: "isSignleSelected",
    value: function isSignleSelected() {
      var _this$selector$range = this.selector.range,
          sri = _this$selector$range.sri,
          sci = _this$selector$range.sci,
          eri = _this$selector$range.eri,
          eci = _this$selector$range.eci;
      var cell = this.getCell(sri, sci);

      if (cell && cell.merge) {
        var _cell$merge3 = _slicedToArray(cell.merge, 2),
            rn = _cell$merge3[0],
            cn = _cell$merge3[1];

        if (sri + rn === eri && sci + cn === eci) return true;
      }

      return !this.selector.multiple();
    }
  }, {
    key: "canUnmerge",
    value: function canUnmerge() {
      var _this$selector$range2 = this.selector.range,
          sri = _this$selector$range2.sri,
          sci = _this$selector$range2.sci,
          eri = _this$selector$range2.eri,
          eci = _this$selector$range2.eci;
      var cell = this.getCell(sri, sci);

      if (cell && cell.merge) {
        var _cell$merge4 = _slicedToArray(cell.merge, 2),
            rn = _cell$merge4[0],
            cn = _cell$merge4[1];

        if (sri + rn === eri && sci + cn === eci) return true;
      }

      return false;
    }
  }, {
    key: "merge",
    value: function merge() {
      var _this9 = this;

      var selector = this.selector,
          rows = this.rows;
      if (this.isSignleSelected()) return;

      var _selector$size3 = selector.size(),
          _selector$size4 = _slicedToArray(_selector$size3, 2),
          rn = _selector$size4[0],
          cn = _selector$size4[1]; // console.log('merge:', rn, cn);


      if (rn > 1 || cn > 1) {
        var _selector$range3 = selector.range,
            sri = _selector$range3.sri,
            sci = _selector$range3.sci;
        this.changeData(function () {
          var cell = rows.getCellOrNew(sri, sci);
          cell.merge = [rn - 1, cn - 1];

          _this9.merges.add(selector.range); // delete merge cells


          _this9.rows.deleteCells(selector.range); // console.log('cell:', cell, this.d);


          _this9.rows.setCell(sri, sci, cell);
        });
      }
    }
  }, {
    key: "unmerge",
    value: function unmerge() {
      var _this10 = this;

      var selector = this.selector;
      if (!this.isSignleSelected()) return;
      var _selector$range4 = selector.range,
          sri = _selector$range4.sri,
          sci = _selector$range4.sci;
      this.changeData(function () {
        _this10.rows.deleteCell(sri, sci, 'merge');

        _this10.merges.deleteWithin(selector.range);
      });
    }
  }, {
    key: "canAutofilter",
    value: function canAutofilter() {
      return !this.autoFilter.active();
    }
  }, {
    key: "autofilter",
    value: function autofilter() {
      var _this11 = this;

      var autoFilter = this.autoFilter,
          selector = this.selector;
      this.changeData(function () {
        if (autoFilter.active()) {
          autoFilter.clear();
          _this11.exceptRowSet = new Set();
          _this11.sortedRowMap = new Map();
          _this11.unsortedRowMap = new Map();
        } else {
          autoFilter.ref = selector.range.toString();
        }
      });
    }
  }, {
    key: "setAutoFilter",
    value: function setAutoFilter(ci, order, operator, value) {
      var autoFilter = this.autoFilter;
      autoFilter.addFilter(ci, operator, value);
      autoFilter.setSort(ci, order);
      this.resetAutoFilter();
    }
  }, {
    key: "resetAutoFilter",
    value: function resetAutoFilter() {
      var _this12 = this;

      var autoFilter = this.autoFilter,
          rows = this.rows;
      if (!autoFilter.active()) return;
      var sort = autoFilter.sort;

      var _autoFilter$filteredR = autoFilter.filteredRows(function (r, c) {
        return rows.getCell(r, c);
      }),
          rset = _autoFilter$filteredR.rset,
          fset = _autoFilter$filteredR.fset;

      var fary = Array.from(fset);
      var oldAry = Array.from(fset);

      if (sort) {
        fary.sort(function (a, b) {
          if (sort.order === 'asc') return a - b;
          if (sort.order === 'desc') return b - a;
          return 0;
        });
      }

      this.exceptRowSet = rset;
      this.sortedRowMap = new Map();
      this.unsortedRowMap = new Map();
      fary.forEach(function (it, index) {
        _this12.sortedRowMap.set(oldAry[index], it);

        _this12.unsortedRowMap.set(it, oldAry[index]);
      });
    }
  }, {
    key: "deleteCell",
    value: function deleteCell() {
      var _this13 = this;

      var what = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
      var selector = this.selector;
      this.changeData(function () {
        _this13.rows.deleteCells(selector.range, what);

        if (what === 'all' || what === 'format') {
          _this13.merges.deleteWithin(selector.range);
        }
      });
    } // type: row | column

  }, {
    key: "insert",
    value: function insert(type) {
      var _this14 = this;

      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      this.changeData(function () {
        var _this14$selector$rang = _this14.selector.range,
            sri = _this14$selector$rang.sri,
            sci = _this14$selector$rang.sci;
        var rows = _this14.rows,
            merges = _this14.merges,
            cols = _this14.cols;
        var si = sri;

        if (type === 'row') {
          rows.insert(sri, n);
        } else if (type === 'column') {
          rows.insertColumn(sci, n);
          si = sci;
          cols.len += 1;
        }

        merges.shift(type, si, n, function (ri, ci, rn, cn) {
          var cell = rows.getCell(ri, ci);
          cell.merge[0] += rn;
          cell.merge[1] += cn;
        });
      });
    } // type: row | column

  }, {
    key: "delete",
    value: function _delete(type) {
      var _this15 = this;

      this.changeData(function () {
        var rows = _this15.rows,
            merges = _this15.merges,
            selector = _this15.selector,
            cols = _this15.cols;
        var range = selector.range;
        var _selector$range5 = selector.range,
            sri = _selector$range5.sri,
            sci = _selector$range5.sci,
            eri = _selector$range5.eri,
            eci = _selector$range5.eci;

        var _selector$range$size = selector.range.size(),
            _selector$range$size2 = _slicedToArray(_selector$range$size, 2),
            rsize = _selector$range$size2[0],
            csize = _selector$range$size2[1];

        var si = sri;
        var size = rsize;

        if (type === 'row') {
          rows["delete"](sri, eri);
        } else if (type === 'column') {
          rows.deleteColumn(sci, eci);
          si = range.sci;
          size = csize;
          cols.len -= 1;
        } // console.log('type:', type, ', si:', si, ', size:', size);


        merges.shift(type, si, -size, function (ri, ci, rn, cn) {
          // console.log('ri:', ri, ', ci:', ci, ', rn:', rn, ', cn:', cn);
          var cell = rows.getCell(ri, ci);
          cell.merge[0] += rn;
          cell.merge[1] += cn;

          if (cell.merge[0] === 0 && cell.merge[1] === 0) {
            delete cell.merge;
          }
        });
      });
    }
  }, {
    key: "scrollx",
    value: function scrollx(x, cb) {
      var scroll = this.scroll,
          freeze = this.freeze,
          cols = this.cols;

      var _freeze = _slicedToArray(freeze, 2),
          fci = _freeze[1];

      var _helper$rangeReduceIf3 = _helper["default"].rangeReduceIf(fci, cols.len, 0, 0, x, function (i) {
        return cols.getWidth(i);
      }),
          _helper$rangeReduceIf4 = _slicedToArray(_helper$rangeReduceIf3, 3),
          ci = _helper$rangeReduceIf4[0],
          left = _helper$rangeReduceIf4[1],
          width = _helper$rangeReduceIf4[2]; // console.log('fci:', fci, ', ci:', ci);


      var x1 = left;
      if (x > 0) x1 += width;

      if (scroll.x !== x1) {
        scroll.ci = x > 0 ? ci : 0;
        scroll.x = x1;
        cb();
      }
    }
  }, {
    key: "scrolly",
    value: function scrolly(y, cb) {
      var scroll = this.scroll,
          freeze = this.freeze,
          rows = this.rows;

      var _freeze2 = _slicedToArray(freeze, 1),
          fri = _freeze2[0];

      var _helper$rangeReduceIf5 = _helper["default"].rangeReduceIf(fri, rows.len, 0, 0, y, function (i) {
        return rows.getHeight(i);
      }),
          _helper$rangeReduceIf6 = _slicedToArray(_helper$rangeReduceIf5, 3),
          ri = _helper$rangeReduceIf6[0],
          top = _helper$rangeReduceIf6[1],
          height = _helper$rangeReduceIf6[2];

      var y1 = top;
      if (y > 0) y1 += height; // console.log('ri:', ri, ' ,y:', y1);

      if (scroll.y !== y1) {
        scroll.ri = y > 0 ? ri : 0;
        scroll.y = y1;
        cb();
      }
    }
  }, {
    key: "cellRect",
    value: function cellRect(ri, ci) {
      var rows = this.rows,
          cols = this.cols;
      var left = cols.sumWidth(0, ci);
      var top = rows.sumHeight(0, ri);
      var cell = rows.getCell(ri, ci);
      var width = cols.getWidth(ci);
      var height = rows.getHeight(ri);

      if (cell !== null) {
        if (cell.merge) {
          var _cell$merge5 = _slicedToArray(cell.merge, 2),
              rn = _cell$merge5[0],
              cn = _cell$merge5[1]; // console.log('cell.merge:', cell.merge);


          if (rn > 0) {
            for (var i = 1; i <= rn; i += 1) {
              height += rows.getHeight(ri + i);
            }
          }

          if (cn > 0) {
            for (var _i2 = 1; _i2 <= cn; _i2 += 1) {
              width += cols.getWidth(ci + _i2);
            }
          }
        }
      } // console.log('data:', this.d);


      return {
        left: left,
        top: top,
        width: width,
        height: height,
        cell: cell
      };
    }
  }, {
    key: "getCell",
    value: function getCell(ri, ci) {
      return this.rows.getCell(ri, ci);
    }
  }, {
    key: "getCellTextOrDefault",
    value: function getCellTextOrDefault(ri, ci) {
      var cell = this.getCell(ri, ci);
      return cell && cell.text ? cell.text : '';
    }
  }, {
    key: "getCellStyle",
    value: function getCellStyle(ri, ci) {
      var cell = this.getCell(ri, ci);

      if (cell && cell.style !== undefined) {
        return this.styles[cell.style];
      }

      return null;
    }
  }, {
    key: "getCellStyleOrDefault",
    value: function getCellStyleOrDefault(ri, ci) {
      var styles = this.styles,
          rows = this.rows;
      var cell = rows.getCell(ri, ci);
      var cellStyle = cell && cell.style !== undefined ? styles[cell.style] : {};
      return _helper["default"].merge(this.defaultStyle(), cellStyle);
    }
  }, {
    key: "getSelectedCellStyle",
    value: function getSelectedCellStyle() {
      var _this$selector4 = this.selector,
          ri = _this$selector4.ri,
          ci = _this$selector4.ci;
      return this.getCellStyleOrDefault(ri, ci);
    } // state: input | finished

  }, {
    key: "setCellText",
    value: function setCellText(ri, ci, text, state) {
      var rows = this.rows,
          history = this.history,
          validations = this.validations;

      if (state === 'finished') {
        rows.setCellText(ri, ci, '');
        history.add(this.getData());
        rows.setCellText(ri, ci, text);
      } else {
        rows.setCellText(ri, ci, text);
        this.change(this.getData());
      } // validator


      validations.validate(ri, ci, text);
    }
  }, {
    key: "freezeIsActive",
    value: function freezeIsActive() {
      var _this$freeze = _slicedToArray(this.freeze, 2),
          ri = _this$freeze[0],
          ci = _this$freeze[1];

      return ri > 0 || ci > 0;
    }
  }, {
    key: "setFreeze",
    value: function setFreeze(ri, ci) {
      var _this16 = this;

      this.changeData(function () {
        _this16.freeze = [ri, ci];
      });
    }
  }, {
    key: "freezeTotalWidth",
    value: function freezeTotalWidth() {
      return this.cols.sumWidth(0, this.freeze[1]);
    }
  }, {
    key: "freezeTotalHeight",
    value: function freezeTotalHeight() {
      return this.rows.sumHeight(0, this.freeze[0]);
    }
  }, {
    key: "setRowHeight",
    value: function setRowHeight(ri, height) {
      var _this17 = this;

      this.changeData(function () {
        _this17.rows.setHeight(ri, height);
      });
    }
  }, {
    key: "setColWidth",
    value: function setColWidth(ci, width) {
      var _this18 = this;

      this.changeData(function () {
        _this18.cols.setWidth(ci, width);
      });
    }
  }, {
    key: "viewHeight",
    value: function viewHeight() {
      var _this$settings = this.settings,
          view = _this$settings.view,
          showToolbar = _this$settings.showToolbar;
      var h = view.height();
      h -= bottombarHeight;

      if (showToolbar) {
        h -= toolbarHeight;
      }

      return h;
    }
  }, {
    key: "viewWidth",
    value: function viewWidth() {
      return this.settings.view.width();
    }
  }, {
    key: "freezeViewRange",
    value: function freezeViewRange() {
      var _this$freeze2 = _slicedToArray(this.freeze, 2),
          ri = _this$freeze2[0],
          ci = _this$freeze2[1];

      return new _cell_range.CellRange(0, 0, ri - 1, ci - 1, this.freezeTotalWidth(), this.freezeTotalHeight());
    }
  }, {
    key: "contentRange",
    value: function contentRange() {
      var rows = this.rows,
          cols = this.cols;

      var _rows$maxCell = rows.maxCell(),
          _rows$maxCell2 = _slicedToArray(_rows$maxCell, 2),
          ri = _rows$maxCell2[0],
          ci = _rows$maxCell2[1];

      var h = rows.sumHeight(0, ri + 1);
      var w = cols.sumWidth(0, ci + 1);
      return new _cell_range.CellRange(0, 0, ri, ci, w, h);
    }
  }, {
    key: "exceptRowTotalHeight",
    value: function exceptRowTotalHeight(sri, eri) {
      var exceptRowSet = this.exceptRowSet,
          rows = this.rows;
      var exceptRows = Array.from(exceptRowSet);
      var exceptRowTH = 0;
      exceptRows.forEach(function (ri) {
        if (ri < sri || ri > eri) {
          var height = rows.getHeight(ri);
          exceptRowTH += height;
        }
      });
      return exceptRowTH;
    }
  }, {
    key: "viewRange",
    value: function viewRange() {
      var scroll = this.scroll,
          rows = this.rows,
          cols = this.cols,
          freeze = this.freeze,
          exceptRowSet = this.exceptRowSet;
      var ri = scroll.ri,
          ci = scroll.ci;

      if (ri <= 0) {
        var _freeze3 = _slicedToArray(freeze, 1);

        ri = _freeze3[0];
      }

      if (ci <= 0) {
        var _freeze4 = _slicedToArray(freeze, 2);

        ci = _freeze4[1];
      }

      var x = 0,
          y = 0;
      var _ref2 = [rows.len, cols.len],
          eri = _ref2[0],
          eci = _ref2[1];

      for (var i = ri; i < rows.len; i += 1) {
        if (!exceptRowSet.has(i)) {
          y += rows.getHeight(i);
          eri = i;
        }

        if (y > this.viewHeight()) break;
      }

      for (var j = ci; j < cols.len; j += 1) {
        x += cols.getWidth(j);
        eci = j;
        if (x > this.viewWidth()) break;
      } // console.log(ri, ci, eri, eci, x, y);


      return new _cell_range.CellRange(ri, ci, eri, eci, x, y);
    }
  }, {
    key: "eachMergesInView",
    value: function eachMergesInView(viewRange, cb) {
      this.merges.filterIntersects(viewRange).forEach(function (it) {
        return cb(it);
      });
    }
  }, {
    key: "hideRowsOrCols",
    value: function hideRowsOrCols() {
      var rows = this.rows,
          cols = this.cols,
          selector = this.selector;

      var _selector$size5 = selector.size(),
          _selector$size6 = _slicedToArray(_selector$size5, 2),
          rlen = _selector$size6[0],
          clen = _selector$size6[1];

      var _selector$range6 = selector.range,
          sri = _selector$range6.sri,
          sci = _selector$range6.sci,
          eri = _selector$range6.eri,
          eci = _selector$range6.eci;

      if (rlen === rows.len) {
        for (var ci = sci; ci <= eci; ci += 1) {
          cols.setHide(ci, true);
        }
      } else if (clen === cols.len) {
        for (var ri = sri; ri <= eri; ri += 1) {
          rows.setHide(ri, true);
        }
      }
    } // type: row | col
    // index row-index | col-index

  }, {
    key: "unhideRowsOrCols",
    value: function unhideRowsOrCols(type, index) {
      this["".concat(type, "s")].unhide(index);
    }
  }, {
    key: "rowEach",
    value: function rowEach(min, max, cb) {
      var y = 0;
      var rows = this.rows;
      var frset = this.exceptRowSet;
      var frary = [].concat(_toConsumableArray(frset));
      var offset = 0;

      for (var i = 0; i < frary.length; i += 1) {
        if (frary[i] < min) {
          offset += 1;
        }
      } // console.log('min:', min, ', max:', max, ', scroll:', scroll);


      for (var _i3 = min + offset; _i3 <= max + offset; _i3 += 1) {
        if (frset.has(_i3)) {
          offset += 1;
        } else {
          var rowHeight = rows.getHeight(_i3);

          if (rowHeight > 0) {
            cb(_i3, y, rowHeight);
            y += rowHeight;
            if (y > this.viewHeight()) break;
          }
        }
      }
    }
  }, {
    key: "colEach",
    value: function colEach(min, max, cb) {
      var x = 0;
      var cols = this.cols;

      for (var i = min; i <= max; i += 1) {
        var colWidth = cols.getWidth(i);

        if (colWidth > 0) {
          cb(i, x, colWidth);
          x += colWidth;
          if (x > this.viewWidth()) break;
        }
      }
    }
  }, {
    key: "defaultStyle",
    value: function defaultStyle() {
      return this.settings.style;
    }
  }, {
    key: "addStyle",
    value: function addStyle(nstyle) {
      var styles = this.styles; // console.log('old.styles:', styles, nstyle);

      for (var i = 0; i < styles.length; i += 1) {
        var style = styles[i];
        if (_helper["default"].equals(style, nstyle)) return i;
      }

      styles.push(nstyle);
      return styles.length - 1;
    }
  }, {
    key: "changeData",
    value: function changeData(cb) {
      this.history.add(this.getData());
      cb();
      this.change(this.getData());
    }
  }, {
    key: "setData",
    value: function setData(d) {
      var _this19 = this;

      Object.keys(d).forEach(function (property) {
        if (property === 'merges' || property === 'rows' || property === 'cols' || property === 'validations') {
          _this19[property].setData(d[property]);
        } else if (property === 'freeze') {
          var _expr2xy = (0, _alphabet.expr2xy)(d[property]),
              _expr2xy2 = _slicedToArray(_expr2xy, 2),
              x = _expr2xy2[0],
              y = _expr2xy2[1];

          _this19.freeze = [y, x];
        } else if (d[property] !== undefined) {
          _this19[property] = d[property];
        }
      });
      return this;
    }
  }, {
    key: "getData",
    value: function getData() {
      var name = this.name,
          freeze = this.freeze,
          styles = this.styles,
          merges = this.merges,
          rows = this.rows,
          cols = this.cols,
          validations = this.validations,
          autoFilter = this.autoFilter;
      return {
        name: name,
        freeze: (0, _alphabet.xy2expr)(freeze[1], freeze[0]),
        styles: styles,
        merges: merges.getData(),
        rows: rows.getData(),
        cols: cols.getData(),
        validations: validations.getData(),
        autofilter: autoFilter.getData()
      };
    }
  }]);

  return DataProxy;
}();

exports["default"] = DataProxy;
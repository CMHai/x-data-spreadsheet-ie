"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _event = require("./event");

var _resizer = _interopRequireDefault(require("./resizer"));

var _scrollbar = _interopRequireDefault(require("./scrollbar"));

var _selector = _interopRequireDefault(require("./selector"));

var _editor = _interopRequireDefault(require("./editor"));

var _print = _interopRequireDefault(require("./print"));

var _contextmenu = _interopRequireDefault(require("./contextmenu"));

var _table = _interopRequireDefault(require("./table"));

var _index = _interopRequireDefault(require("./toolbar/index"));

var _modal_validation = _interopRequireDefault(require("./modal_validation"));

var _sort_filter = _interopRequireDefault(require("./sort_filter"));

var _message = require("./message");

var _config = require("../config");

var _formula = require("../core/formula");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @desc throttle fn
 * @param func function
 * @param wait Delay in milliseconds
 */
function throttle(func, wait) {
  var _this = this;

  var timeout;
  return function () {
    var that = _this;

    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    var args = arg;

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(that, args);
      }, wait);
    }
  };
}

function scrollbarMove() {
  var data = this.data,
      verticalScrollbar = this.verticalScrollbar,
      horizontalScrollbar = this.horizontalScrollbar;

  var _data$getSelectedRect = data.getSelectedRect(),
      l = _data$getSelectedRect.l,
      t = _data$getSelectedRect.t,
      left = _data$getSelectedRect.left,
      top = _data$getSelectedRect.top,
      width = _data$getSelectedRect.width,
      height = _data$getSelectedRect.height;

  var tableOffset = this.getTableOffset(); // console.log(',l:', l, ', left:', left, ', tOffset.left:', tableOffset.width);

  if (Math.abs(left) + width > tableOffset.width) {
    horizontalScrollbar.move({
      left: l + width - tableOffset.width
    });
  } else {
    var fsw = data.freezeTotalWidth();

    if (left < fsw) {
      horizontalScrollbar.move({
        left: l - 1 - fsw
      });
    }
  } // console.log('top:', top, ', height:', height, ', tof.height:', tableOffset.height);


  if (Math.abs(top) + height > tableOffset.height) {
    verticalScrollbar.move({
      top: t + height - tableOffset.height - 1
    });
  } else {
    var fsh = data.freezeTotalHeight();

    if (top < fsh) {
      verticalScrollbar.move({
        top: t - 1 - fsh
      });
    }
  }
}

function selectorSet(multiple, ri, ci) {
  var indexesUpdated = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var moving = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (ri === -1 && ci === -1) return;
  var table = this.table,
      selector = this.selector,
      toolbar = this.toolbar,
      data = this.data,
      contextMenu = this.contextMenu;
  contextMenu.setMode(ri === -1 || ci === -1 ? 'row-col' : 'range');
  var cell = data.getCell(ri, ci);

  if (multiple) {
    selector.setEnd(ri, ci, moving);
    this.trigger('cells-selected', cell, selector.range);
  } else {
    // trigger click event
    selector.set(ri, ci, indexesUpdated);
    this.trigger('cell-selected', cell, ri, ci);
  }

  toolbar.reset();
  table.render();
} // multiple: boolean
// direction: left | right | up | down | row-first | row-last | col-first | col-last


function selectorMove(multiple, direction) {
  var selector = this.selector,
      data = this.data;
  var rows = data.rows,
      cols = data.cols;

  var _selector$indexes = _slicedToArray(selector.indexes, 2),
      ri = _selector$indexes[0],
      ci = _selector$indexes[1];

  var _selector$range = selector.range,
      eri = _selector$range.eri,
      eci = _selector$range.eci;

  if (multiple) {
    var _selector$moveIndexes = _slicedToArray(selector.moveIndexes, 2);

    ri = _selector$moveIndexes[0];
    ci = _selector$moveIndexes[1];
  } // console.log('selector.move:', ri, ci);


  if (direction === 'left') {
    if (ci > 0) ci -= 1;
  } else if (direction === 'right') {
    if (eci !== ci) ci = eci;
    if (ci < cols.len - 1) ci += 1;
  } else if (direction === 'up') {
    if (ri > 0) ri -= 1;
  } else if (direction === 'down') {
    if (eri !== ri) ri = eri;
    if (ri < rows.len - 1) ri += 1;
  } else if (direction === 'row-first') {
    ci = 0;
  } else if (direction === 'row-last') {
    ci = cols.len - 1;
  } else if (direction === 'col-first') {
    ri = 0;
  } else if (direction === 'col-last') {
    ri = rows.len - 1;
  }

  if (multiple) {
    selector.moveIndexes = [ri, ci];
  }

  selectorSet.call(this, multiple, ri, ci);
  scrollbarMove.call(this);
} // private methods


function overlayerMousemove(evt) {
  // console.log('x:', evt.offsetX, ', y:', evt.offsetY);
  if (evt.buttons !== 0) return;
  if (evt.target.className === "".concat(_config.cssPrefix, "-resizer-hover")) return;
  var offsetX = evt.offsetX,
      offsetY = evt.offsetY;
  var rowResizer = this.rowResizer,
      colResizer = this.colResizer,
      tableEl = this.tableEl,
      data = this.data;
  var rows = data.rows,
      cols = data.cols;

  if (offsetX > cols.indexWidth && offsetY > rows.height) {
    rowResizer.hide();
    colResizer.hide();
    return;
  }

  var tRect = tableEl.box();
  var cRect = data.getCellRectByXY(evt.offsetX, evt.offsetY);

  if (cRect.ri >= 0 && cRect.ci === -1) {
    cRect.width = cols.indexWidth;
    rowResizer.show(cRect, {
      width: tRect.width
    });

    if (rows.isHide(cRect.ri - 1)) {
      rowResizer.showUnhide(cRect.ri);
    } else {
      rowResizer.hideUnhide();
    }
  } else {
    rowResizer.hide();
  }

  if (cRect.ri === -1 && cRect.ci >= 0) {
    cRect.height = rows.height;
    colResizer.show(cRect, {
      height: tRect.height
    });

    if (cols.isHide(cRect.ci - 1)) {
      colResizer.showUnhide(cRect.ci);
    } else {
      colResizer.hideUnhide();
    }
  } else {
    colResizer.hide();
  }
}

function overlayerMousescroll(evt) {
  var verticalScrollbar = this.verticalScrollbar,
      horizontalScrollbar = this.horizontalScrollbar,
      data = this.data;

  var _verticalScrollbar$sc = verticalScrollbar.scroll(),
      top = _verticalScrollbar$sc.top;

  var _horizontalScrollbar$ = horizontalScrollbar.scroll(),
      left = _horizontalScrollbar$.left; // console.log('evt:::', evt.wheelDelta, evt.detail * 40);


  var rows = data.rows,
      cols = data.cols; // deltaY for vertical delta

  var deltaY = evt.deltaY,
      deltaX = evt.deltaX;

  var loopValue = function loopValue(ii, vFunc) {
    var i = ii;
    var v = 0;

    do {
      v = vFunc(i);
      i += 1;
    } while (v <= 0);

    return v;
  }; // console.log('deltaX', deltaX, 'evt.detail', evt.detail);
  // if (evt.detail) deltaY = evt.detail * 40;


  var moveY = function moveY(vertical) {
    if (vertical > 0) {
      // up
      var ri = data.scroll.ri + 1;

      if (ri < rows.len) {
        var rh = loopValue(ri, function (i) {
          return rows.getHeight(i);
        });
        verticalScrollbar.move({
          top: top + rh - 1
        });
      }
    } else {
      // down
      var _ri = data.scroll.ri - 1;

      if (_ri >= 0) {
        var _rh = loopValue(_ri, function (i) {
          return rows.getHeight(i);
        });

        verticalScrollbar.move({
          top: _ri === 0 ? 0 : top - _rh
        });
      }
    }
  }; // deltaX for Mac horizontal scroll


  var moveX = function moveX(horizontal) {
    if (horizontal > 0) {
      // left
      var ci = data.scroll.ci + 1;

      if (ci < cols.len) {
        var cw = loopValue(ci, function (i) {
          return cols.getWidth(i);
        });
        horizontalScrollbar.move({
          left: left + cw - 1
        });
      }
    } else {
      // right
      var _ci = data.scroll.ci - 1;

      if (_ci >= 0) {
        var _cw = loopValue(_ci, function (i) {
          return cols.getWidth(i);
        });

        horizontalScrollbar.move({
          left: _ci === 0 ? 0 : left - _cw
        });
      }
    }
  };

  var tempY = Math.abs(deltaY);
  var tempX = Math.abs(deltaX);
  var temp = Math.max(tempY, tempX); // detail for windows/mac firefox vertical scroll

  if (/Firefox/i.test(window.navigator.userAgent)) throttle(moveY(evt.detail), 50);
  if (temp === tempX) throttle(moveX(deltaX), 50);
  if (temp === tempY) throttle(moveY(deltaY), 50);
}

function overlayerTouch(direction, distance) {
  var verticalScrollbar = this.verticalScrollbar,
      horizontalScrollbar = this.horizontalScrollbar;

  var _verticalScrollbar$sc2 = verticalScrollbar.scroll(),
      top = _verticalScrollbar$sc2.top;

  var _horizontalScrollbar$2 = horizontalScrollbar.scroll(),
      left = _horizontalScrollbar$2.left;

  if (direction === 'left' || direction === 'right') {
    horizontalScrollbar.move({
      left: left - distance
    });
  } else if (direction === 'up' || direction === 'down') {
    verticalScrollbar.move({
      top: top - distance
    });
  }
}

function verticalScrollbarSet() {
  var data = this.data,
      verticalScrollbar = this.verticalScrollbar;

  var _this$getTableOffset = this.getTableOffset(),
      height = _this$getTableOffset.height;

  var erth = data.exceptRowTotalHeight(0, -1); // console.log('erth:', erth);

  verticalScrollbar.set(height, data.rows.totalHeight() - erth);
}

function horizontalScrollbarSet() {
  var data = this.data,
      horizontalScrollbar = this.horizontalScrollbar;

  var _this$getTableOffset2 = this.getTableOffset(),
      width = _this$getTableOffset2.width;

  if (data) {
    horizontalScrollbar.set(width, data.cols.totalWidth());
  }
}

function sheetFreeze() {
  var selector = this.selector,
      data = this.data,
      editor = this.editor;

  var _data$freeze = _slicedToArray(data.freeze, 2),
      ri = _data$freeze[0],
      ci = _data$freeze[1];

  if (ri > 0 || ci > 0) {
    var fwidth = data.freezeTotalWidth();
    var fheight = data.freezeTotalHeight();
    editor.setFreezeLengths(fwidth, fheight);
  }

  selector.resetAreaOffset();
}

function sheetReset() {
  var tableEl = this.tableEl,
      overlayerEl = this.overlayerEl,
      overlayerCEl = this.overlayerCEl,
      table = this.table,
      toolbar = this.toolbar,
      selector = this.selector,
      el = this.el;
  var tOffset = this.getTableOffset();
  var vRect = this.getRect();
  tableEl.attr(vRect);
  overlayerEl.offset(vRect);
  overlayerCEl.offset(tOffset);
  el.css('width', "".concat(vRect.width, "px"));
  verticalScrollbarSet.call(this);
  horizontalScrollbarSet.call(this);
  sheetFreeze.call(this);
  table.render();
  toolbar.reset();
  selector.reset();
}

function clearClipboard() {
  var data = this.data,
      selector = this.selector;
  data.clearClipboard();
  selector.hideClipboard();
}

function copy() {
  var data = this.data,
      selector = this.selector;
  data.copy();
  selector.showClipboard();
}

function cut() {
  var data = this.data,
      selector = this.selector;
  data.cut();
  selector.showClipboard();
}

function paste(what, evt) {
  var data = this.data;
  if (data.settings.mode === 'read') return;

  if (data.paste(what, function (msg) {
    return (0, _message.xtoast)('Tip', msg);
  })) {
    sheetReset.call(this);
  } else if (evt) {
    var cdata = evt.clipboardData.getData('text/plain');
    this.data.pasteFromText(cdata);
    sheetReset.call(this);
  }
}

function hideRowsOrCols() {
  this.data.hideRowsOrCols();
  sheetReset.call(this);
}

function unhideRowsOrCols(type, index) {
  this.data.unhideRowsOrCols(type, index);
  sheetReset.call(this);
}

function autofilter() {
  var data = this.data;
  data.autofilter();
  sheetReset.call(this);
}

function toolbarChangePaintformatPaste() {
  var toolbar = this.toolbar;

  if (toolbar.paintformatActive()) {
    paste.call(this, 'format');
    clearClipboard.call(this);
    toolbar.paintformatToggle();
  }
}

function overlayerMousedown(evt) {
  var _this2 = this;

  // console.log(':::::overlayer.mousedown:', evt.detail, evt.button, evt.buttons, evt.shiftKey);
  // console.log('evt.target.className:', evt.target.className);
  var selector = this.selector,
      data = this.data,
      table = this.table,
      sortFilter = this.sortFilter;
  var offsetX = evt.offsetX,
      offsetY = evt.offsetY;
  var isAutofillEl = evt.target.className === "".concat(_config.cssPrefix, "-selector-corner");
  var cellRect = data.getCellRectByXY(offsetX, offsetY);
  var left = cellRect.left,
      top = cellRect.top,
      width = cellRect.width,
      height = cellRect.height;
  var ri = cellRect.ri,
      ci = cellRect.ci; // sort or filter

  var autoFilter = data.autoFilter;

  if (autoFilter.includes(ri, ci)) {
    if (left + width - 20 < offsetX && top + height - 20 < offsetY) {
      var items = autoFilter.items(ci, function (r, c) {
        return data.rows.getCell(r, c);
      });
      sortFilter.set(ci, items, autoFilter.getFilter(ci), autoFilter.getSort(ci));
      sortFilter.setOffset({
        left: left,
        top: top + height + 2
      });
      return;
    }
  } // console.log('ri:', ri, ', ci:', ci);


  if (!evt.shiftKey) {
    // console.log('selectorSetStart:::');
    if (isAutofillEl) {
      selector.showAutofill(ri, ci);
    } else {
      selectorSet.call(this, false, ri, ci);
    } // mouse move up


    (0, _event.mouseMoveUp)(window, function (e) {
      // console.log('mouseMoveUp::::');
      var _data$getCellRectByXY = data.getCellRectByXY(e.offsetX, e.offsetY);

      ri = _data$getCellRectByXY.ri;
      ci = _data$getCellRectByXY.ci;

      if (isAutofillEl) {
        selector.showAutofill(ri, ci);
      } else if (e.buttons === 1 && !e.shiftKey) {
        selectorSet.call(_this2, true, ri, ci, true, true);
      }
    }, function () {
      if (isAutofillEl && selector.arange && data.settings.mode !== 'read') {
        if (data.autofill(selector.arange, 'all', function (msg) {
          return (0, _message.xtoast)('Tip', msg);
        })) {
          table.render();
        }
      }

      selector.hideAutofill();
      toolbarChangePaintformatPaste.call(_this2);
    });
  }

  if (!isAutofillEl && evt.buttons === 1) {
    if (evt.shiftKey) {
      // console.log('shiftKey::::');
      selectorSet.call(this, true, ri, ci);
    }
  }
}

function editorSetOffset() {
  var editor = this.editor,
      data = this.data;
  var sOffset = data.getSelectedRect();
  var tOffset = this.getTableOffset();
  var sPosition = 'top'; // console.log('sOffset:', sOffset, ':', tOffset);

  if (sOffset.top > tOffset.height / 2) {
    sPosition = 'bottom';
  }

  editor.setOffset(sOffset, sPosition);
}

function editorSet() {
  var editor = this.editor,
      data = this.data;
  if (data.settings.mode === 'read') return;
  editorSetOffset.call(this);
  editor.setCell(data.getSelectedCell(), data.getSelectedValidator());
  clearClipboard.call(this);
}

function verticalScrollbarMove(distance) {
  var _this3 = this;

  var data = this.data,
      table = this.table,
      selector = this.selector;
  data.scrolly(distance, function () {
    selector.resetBRLAreaOffset();
    editorSetOffset.call(_this3);
    table.render();
  });
}

function horizontalScrollbarMove(distance) {
  var _this4 = this;

  var data = this.data,
      table = this.table,
      selector = this.selector;
  data.scrollx(distance, function () {
    selector.resetBRTAreaOffset();
    editorSetOffset.call(_this4);
    table.render();
  });
}

function rowResizerFinished(cRect, distance) {
  var ri = cRect.ri;
  var table = this.table,
      selector = this.selector,
      data = this.data;
  data.rows.setHeight(ri, distance);
  table.render();
  selector.resetAreaOffset();
  verticalScrollbarSet.call(this);
  editorSetOffset.call(this);
}

function colResizerFinished(cRect, distance) {
  var ci = cRect.ci;
  var table = this.table,
      selector = this.selector,
      data = this.data;
  data.cols.setWidth(ci, distance); // console.log('data:', data);

  table.render();
  selector.resetAreaOffset();
  horizontalScrollbarSet.call(this);
  editorSetOffset.call(this);
}

function dataSetCellText(text) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'finished';
  var data = this.data,
      table = this.table; // const [ri, ci] = selector.indexes;

  if (data.settings.mode === 'read') return;
  data.setSelectedCellText(text, state);

  if (state === 'finished') {
    var _data$selector = data.selector,
        ri = _data$selector.ri,
        ci = _data$selector.ci;
    this.trigger('cell-edited', text, ri, ci);
    table.render();
  }
}

function insertDeleteRowColumn(type) {
  var data = this.data;

  if (type === 'insert-row') {
    data.insert('row');
  } else if (type === 'delete-row') {
    data["delete"]('row');
  } else if (type === 'insert-column') {
    data.insert('column');
  } else if (type === 'delete-column') {
    data["delete"]('column');
  } else if (type === 'delete-cell') {
    data.deleteCell();
  } else if (type === 'delete-cell-format') {
    data.deleteCell('format');
  } else if (type === 'delete-cell-text') {
    data.deleteCell('text');
  } else if (type === 'cell-printable') {
    data.setSelectedCellAttr('printable', true);
  } else if (type === 'cell-non-printable') {
    data.setSelectedCellAttr('printable', false);
  } else if (type === 'cell-editable') {
    data.setSelectedCellAttr('editable', true);
  } else if (type === 'cell-non-editable') {
    data.setSelectedCellAttr('editable', false);
  }

  clearClipboard.call(this);
  sheetReset.call(this);
}

function toolbarChange(type, value) {
  var data = this.data;

  if (type === 'undo') {
    this.undo();
  } else if (type === 'redo') {
    this.redo();
  } else if (type === 'print') {
    this.print.preview();
  } else if (type === 'paintformat') {
    if (value === true) copy.call(this);else clearClipboard.call(this);
  } else if (type === 'clearformat') {
    insertDeleteRowColumn.call(this, 'delete-cell-format');
  } else if (type === 'link') {// link
  } else if (type === 'chart') {// chart
  } else if (type === 'autofilter') {
    // filter
    autofilter.call(this);
  } else if (type === 'freeze') {
    if (value) {
      var _data$selector2 = data.selector,
          ri = _data$selector2.ri,
          ci = _data$selector2.ci;
      this.freeze(ri, ci);
    } else {
      this.freeze(0, 0);
    }
  } else {
    data.setSelectedCellAttr(type, value);

    if (type === 'formula' && !data.selector.multiple()) {
      editorSet.call(this);
    }

    sheetReset.call(this);
  }
}

function sortFilterChange(ci, order, operator, value) {
  // console.log('sort:', sortDesc, operator, value);
  this.data.setAutoFilter(ci, order, operator, value);
  sheetReset.call(this);
}

function sheetInitEvents() {
  var _this5 = this;

  var selector = this.selector,
      overlayerEl = this.overlayerEl,
      rowResizer = this.rowResizer,
      colResizer = this.colResizer,
      verticalScrollbar = this.verticalScrollbar,
      horizontalScrollbar = this.horizontalScrollbar,
      editor = this.editor,
      contextMenu = this.contextMenu,
      toolbar = this.toolbar,
      modalValidation = this.modalValidation,
      sortFilter = this.sortFilter; // overlayer

  overlayerEl.on('mousemove', function (evt) {
    overlayerMousemove.call(_this5, evt);
  }).on('mousedown', function (evt) {
    editor.clear();
    contextMenu.hide(); // the left mouse button: mousedown → mouseup → click
    // the right mouse button: mousedown → contenxtmenu → mouseup

    if (evt.buttons === 2) {
      if (_this5.data.xyInSelectedRect(evt.offsetX, evt.offsetY)) {
        contextMenu.setPosition(evt.offsetX, evt.offsetY);
      } else {
        overlayerMousedown.call(_this5, evt);
        contextMenu.setPosition(evt.offsetX, evt.offsetY);
      }

      evt.stopPropagation();
    } else if (evt.detail === 2) {
      editorSet.call(_this5);
    } else {
      overlayerMousedown.call(_this5, evt);
    }
  }).on('mousewheel.stop', function (evt) {
    overlayerMousescroll.call(_this5, evt);
  }).on('mouseout', function (evt) {
    var offsetX = evt.offsetX,
        offsetY = evt.offsetY;
    if (offsetY <= 0) colResizer.hide();
    if (offsetX <= 0) rowResizer.hide();
  });

  selector.inputChange = function (v) {
    dataSetCellText.call(_this5, v, 'input');
    editorSet.call(_this5);
  }; // slide on mobile


  (0, _event.bindTouch)(overlayerEl.el, {
    move: function move(direction, d) {
      overlayerTouch.call(_this5, direction, d);
    }
  }); // toolbar change

  toolbar.change = function (type, value) {
    return toolbarChange.call(_this5, type, value);
  }; // sort filter ok


  sortFilter.ok = function (ci, order, o, v) {
    return sortFilterChange.call(_this5, ci, order, o, v);
  }; // resizer finished callback


  rowResizer.finishedFn = function (cRect, distance) {
    rowResizerFinished.call(_this5, cRect, distance);
  };

  colResizer.finishedFn = function (cRect, distance) {
    colResizerFinished.call(_this5, cRect, distance);
  }; // resizer unhide callback


  rowResizer.unhideFn = function (index) {
    unhideRowsOrCols.call(_this5, 'row', index);
  };

  colResizer.unhideFn = function (index) {
    unhideRowsOrCols.call(_this5, 'col', index);
  }; // scrollbar move callback


  verticalScrollbar.moveFn = function (distance, evt) {
    verticalScrollbarMove.call(_this5, distance, evt);
  };

  horizontalScrollbar.moveFn = function (distance, evt) {
    horizontalScrollbarMove.call(_this5, distance, evt);
  }; // editor


  editor.change = function (state, itext) {
    dataSetCellText.call(_this5, itext, state);
  }; // modal validation


  modalValidation.change = function (action) {
    if (action === 'save') {
      var _this5$data;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (_this5$data = _this5.data).addValidation.apply(_this5$data, args);
    } else {
      _this5.data.removeValidation();
    }
  }; // contextmenu


  contextMenu.itemClick = function (type) {
    // console.log('type:', type);
    if (type === 'validation') {
      modalValidation.setValue(_this5.data.getSelectedValidation());
    } else if (type === 'copy') {
      copy.call(_this5);
    } else if (type === 'cut') {
      cut.call(_this5);
    } else if (type === 'paste') {
      paste.call(_this5, 'all');
    } else if (type === 'paste-value') {
      paste.call(_this5, 'text');
    } else if (type === 'paste-format') {
      paste.call(_this5, 'format');
    } else if (type === 'hide') {
      hideRowsOrCols.call(_this5);
    } else {
      insertDeleteRowColumn.call(_this5, type);
    }
  };

  (0, _event.bind)(window, 'resize', function () {
    _this5.reload();
  });
  (0, _event.bind)(window, 'click', function (evt) {
    _this5.focusing = overlayerEl.contains(evt.target);
  });
  (0, _event.bind)(window, 'paste', function (evt) {
    paste.call(_this5, 'all', evt);
    evt.preventDefault();
  }); // for selector

  (0, _event.bind)(window, 'keydown', function (evt) {
    if (!_this5.focusing) return;
    var keyCode = evt.keyCode || evt.which;
    var key = evt.key,
        ctrlKey = evt.ctrlKey,
        shiftKey = evt.shiftKey,
        metaKey = evt.metaKey; // console.log('keydown.evt: ', keyCode);

    if (ctrlKey || metaKey) {
      // const { sIndexes, eIndexes } = selector;
      // let what = 'all';
      // if (shiftKey) what = 'text';
      // if (altKey) what = 'format';
      switch (keyCode) {
        case 90:
          // undo: ctrl + z
          _this5.undo();

          evt.preventDefault();
          break;

        case 89:
          // redo: ctrl + y
          _this5.redo();

          evt.preventDefault();
          break;

        case 67:
          // ctrl + c
          copy.call(_this5);
          evt.preventDefault();
          break;

        case 88:
          // ctrl + x
          cut.call(_this5);
          evt.preventDefault();
          break;

        case 85:
          // ctrl + u
          toolbar.trigger('underline');
          evt.preventDefault();
          break;

        case 86:
          // ctrl + v
          // => paste
          // evt.preventDefault();
          break;

        case 37:
          // ctrl + left
          selectorMove.call(_this5, shiftKey, 'row-first');
          evt.preventDefault();
          break;

        case 38:
          // ctrl + up
          selectorMove.call(_this5, shiftKey, 'col-first');
          evt.preventDefault();
          break;

        case 39:
          // ctrl + right
          selectorMove.call(_this5, shiftKey, 'row-last');
          evt.preventDefault();
          break;

        case 40:
          // ctrl + down
          selectorMove.call(_this5, shiftKey, 'col-last');
          evt.preventDefault();
          break;

        case 32:
          // ctrl + space, all cells in col
          selectorSet.call(_this5, false, -1, _this5.data.selector.ci, false);
          evt.preventDefault();
          break;

        case 66:
          // ctrl + B
          toolbar.trigger('bold');
          break;

        case 73:
          // ctrl + I
          toolbar.trigger('italic');
          break;

        default:
          break;
      }
    } else {
      // console.log('evt.keyCode:', evt.keyCode);
      switch (keyCode) {
        case 32:
          if (shiftKey) {
            // shift + space, all cells in row
            selectorSet.call(_this5, false, _this5.data.selector.ri, -1, false);
          }

          break;

        case 27:
          // esc
          contextMenu.hide();
          clearClipboard.call(_this5);
          break;

        case 37:
          // left
          selectorMove.call(_this5, shiftKey, 'left');
          evt.preventDefault();
          break;

        case 38:
          // up
          selectorMove.call(_this5, shiftKey, 'up');
          evt.preventDefault();
          break;

        case 39:
          // right
          selectorMove.call(_this5, shiftKey, 'right');
          evt.preventDefault();
          break;

        case 40:
          // down
          selectorMove.call(_this5, shiftKey, 'down');
          evt.preventDefault();
          break;

        case 9:
          // tab
          editor.clear(); // shift + tab => move left
          // tab => move right

          selectorMove.call(_this5, false, shiftKey ? 'left' : 'right');
          evt.preventDefault();
          break;

        case 13:
          // enter
          editor.clear(); // shift + enter => move up
          // enter => move down

          selectorMove.call(_this5, false, shiftKey ? 'up' : 'down');
          evt.preventDefault();
          break;

        case 8:
          // backspace
          insertDeleteRowColumn.call(_this5, 'delete-cell-text');
          evt.preventDefault();
          break;

        default:
          break;
      }

      if (key === 'Delete') {
        insertDeleteRowColumn.call(_this5, 'delete-cell-text');
        evt.preventDefault();
      } else if (keyCode >= 65 && keyCode <= 90 || keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105 || evt.key === '=') {
        dataSetCellText.call(_this5, evt.key, 'input');
        editorSet.call(_this5);
      } else if (keyCode === 113) {
        // F2
        editorSet.call(_this5);
      }
    }
  });
}

var Sheet = /*#__PURE__*/function () {
  function Sheet(targetEl, data) {
    var _this6 = this;

    _classCallCheck(this, Sheet);

    this.eventMap = new Map();
    var _data$settings = data.settings,
        view = _data$settings.view,
        showToolbar = _data$settings.showToolbar,
        showContextmenu = _data$settings.showContextmenu;
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-sheet"));
    this.toolbar = new _index["default"](data, view.width, !showToolbar);
    this.print = new _print["default"](data);
    targetEl.children(this.toolbar.el, this.el, this.print.el);
    this.data = data; // table

    this.tableEl = (0, _element.h)('canvas', "".concat(_config.cssPrefix, "-table")); // resizer

    this.rowResizer = new _resizer["default"](false, data.rows.height);
    this.colResizer = new _resizer["default"](true, data.cols.minWidth); // scrollbar

    this.verticalScrollbar = new _scrollbar["default"](true);
    this.horizontalScrollbar = new _scrollbar["default"](false); // editor

    this.editor = new _editor["default"](_formula.formulas, function () {
      return _this6.getTableOffset();
    }, data.rows.height); // data validation

    this.modalValidation = new _modal_validation["default"](); // contextMenu

    this.contextMenu = new _contextmenu["default"](function () {
      return _this6.getRect();
    }, !showContextmenu); // selector

    this.selector = new _selector["default"](data);
    this.overlayerCEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-overlayer-content")).children(this.editor.el, this.selector.el);
    this.overlayerEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-overlayer")).child(this.overlayerCEl); // sortFilter

    this.sortFilter = new _sort_filter["default"](); // root element

    this.el.children(this.tableEl, this.overlayerEl.el, this.rowResizer.el, this.colResizer.el, this.verticalScrollbar.el, this.horizontalScrollbar.el, this.contextMenu.el, this.modalValidation.el, this.sortFilter.el); // table

    this.table = new _table["default"](this.tableEl.el, data);
    sheetInitEvents.call(this);
    sheetReset.call(this); // init selector [0, 0]

    selectorSet.call(this, false, 0, 0);
  }

  _createClass(Sheet, [{
    key: "on",
    value: function on(eventName, func) {
      this.eventMap.set(eventName, func);
      return this;
    }
  }, {
    key: "trigger",
    value: function trigger(eventName) {
      var eventMap = this.eventMap;

      if (eventMap.has(eventName)) {
        var _eventMap$get;

        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        (_eventMap$get = eventMap.get(eventName)).call.apply(_eventMap$get, [this].concat(args));
      }
    }
  }, {
    key: "resetData",
    value: function resetData(data) {
      // before
      this.editor.clear(); // after

      this.data = data;
      this.toolbar.resetData(data);
      this.print.resetData(data);
      this.selector.resetData(data);
      this.table.resetData(data);
    }
  }, {
    key: "loadData",
    value: function loadData(data) {
      this.data.setData(data);
      sheetReset.call(this);
      return this;
    } // freeze rows or cols

  }, {
    key: "freeze",
    value: function freeze(ri, ci) {
      var data = this.data;
      data.setFreeze(ri, ci);
      sheetReset.call(this);
      return this;
    }
  }, {
    key: "undo",
    value: function undo() {
      this.data.undo();
      sheetReset.call(this);
    }
  }, {
    key: "redo",
    value: function redo() {
      this.data.redo();
      sheetReset.call(this);
    }
  }, {
    key: "reload",
    value: function reload() {
      sheetReset.call(this);
      return this;
    }
  }, {
    key: "getRect",
    value: function getRect() {
      var data = this.data;
      return {
        width: data.viewWidth(),
        height: data.viewHeight()
      };
    }
  }, {
    key: "getTableOffset",
    value: function getTableOffset() {
      var _this$data = this.data,
          rows = _this$data.rows,
          cols = _this$data.cols;

      var _this$getRect = this.getRect(),
          width = _this$getRect.width,
          height = _this$getRect.height;

      return {
        width: width - cols.indexWidth,
        height: height - rows.height,
        left: cols.indexWidth,
        top: rows.height
      };
    }
  }]);

  return Sheet;
}();

exports["default"] = Sheet;